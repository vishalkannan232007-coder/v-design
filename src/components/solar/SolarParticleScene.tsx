import { useEffect, useMemo, useRef, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

/* =====================================================================
 * SOLAR PARTICLE FORMATION
 *
 * Adapted from the supplied stand-alone "solar particle simulator" (kept
 * verbatim in `reference/solar-particle-simulator.original.jsx`).
 *
 * The supplied model — a layered sun (fusing core, radiative zone,
 * convective cells, photosphere, chromosphere, coronal loops, prominences
 * and solar wind) built from 20,000 instanced tetrahedra — is preserved
 * exactly. What changed:
 *
 *  - simulator scaffolding removed: the dat-gui style `addControl` reads,
 *    the `setInfo` / `annotate` read-outs, OrbitControls and the broken
 *    `fog` (near 0.01, no far) are all gone.
 *  - the per-frame loop was rewritten. The supplied version called
 *    `addControl` six times per particle per frame (120k calls), recomputed
 *    six static hashes and the rotation angle per particle, allocated a
 *    Vector3 per frame for annotations, and built a Matrix4 per instance.
 *    Everything invariant is now precomputed once, layers are evaluated in
 *    their own tight loops with band constants hoisted out, and instance
 *    transforms are written straight into the matrix buffer (translation
 *    only — the instances are never rotated or scaled individually).
 *  - bloom now runs through three's own `EffectComposer` + `OutputPass`
 *    instead of the deprecated drei `<Effects>` wrapper, which is what
 *    makes the output colour-correct.
 *  - the palette was nudged toward the V DESIGN art direction: a warm
 *    gold/amber sun against a teal corona and wind, matching the teal,
 *    ember and violet light forms already in `CinematicBackground`.
 * ===================================================================== */

const TAU = Math.PI * 2;

/** Mirrors of the supplied `PARAMS` — the simulator sliders are gone, so these are fixed. */
const SCALE_R = 120;
const FUSION = 2.5;
const CONVECT = 1.2;
const MAGNETIC = 1.4;
const WIND = 1.8;
const LOOPS = 16;

/** Layer radii, each one the supplied multiplication resolved. */
const CORE_R = SCALE_R * 0.22;
const RAD_MIN = SCALE_R * 0.22;
const RAD_MAX = SCALE_R * 0.46;
const CONV_MIN = SCALE_R * 0.46;
const CONV_MAX = SCALE_R * 0.72;
const PHOTO_R = SCALE_R * 0.76;
const CHROMO_R = SCALE_R * 0.79;
const SPICULE_LEN = SCALE_R * 0.05;
const LOOP_A_R = SCALE_R * 0.8;
const LOOP_B_R = SCALE_R * 0.79;
const WIND_A_R = SCALE_R * 0.82;
const WIND_B_R = SCALE_R * 0.95;

/** Hoisted band constants (previously recomputed per particle, per frame). */
const CORE_JITTER = CORE_R * 0.03;
const RADIATIVE_WANDER = SCALE_R * 0.02;
const CONVECT_FLOW = CONVECT * SCALE_R * 0.015;
const GRANULE_FLOW = SCALE_R * 0.004;
const WIND_SPIN_INNER = WIND * 0.6;
const WIND_SPIN_OUTER = WIND * 1.1;

/** Layer occupancy thresholds from the supplied model. */
const BAND_EDGES = [0.12, 0.32, 0.55, 0.68, 0.78, 0.9, 0.97];

/** Camera framing. The formation reads as one luminous mass with room to breathe. */
const CAMERA_Z = 260;
const FORMATION_RADIUS = 130;
/** Reference time used for the settle frame and as the animation's starting clock. */
const SETTLE_TIME = 6;

const LERP_BASE = 0.1;
const SPEED = 1;

/**
 * Restrained bloom. The supplied defaults (threshold 0 / strength 1.8 /
 * radius 0.4) bloomed everything, which on 20k additive motes clipped the
 * whole formation to white. A high threshold means only the genuine hot cores
 * glow; the strength only has to lift them a little.
 */
const BLOOM_STRENGTH = 0.5;
const BLOOM_RADIUS = 0.6;
const BLOOM_THRESHOLD = 0.4;

/** Scratch colour reused every frame — no per-particle allocation. */
const COLOR = new THREE.Color();

/** Deterministic per-particle hash, verbatim from the supplied model (`h6` was unused → dropped). */
function hash(i: number, mul: number, amp: number): number {
  return Math.abs(Math.sin(i * mul) * amp) % 1;
}

/** The 16 active-region parameter sets used by both coronal-loop layers. */
const REGIONS_A = Array.from({ length: LOOPS }, (_, k) => [
  hash(k, 17.17, 6543.21),
  hash(k, 29.71, 7654.32),
  hash(k, 53.13, 8765.43),
  hash(k, 71.91, 9876.54),
]);
const REGIONS_B = Array.from({ length: LOOPS }, (_, k) => [
  hash(k, 21.31, 5432.19),
  hash(k, 37.77, 6321.98),
  hash(k, 59.59, 7219.87),
  hash(k, 83.13, 8123.65),
]);

interface Arch {
  dx: number;
  dy: number;
  dz: number;
  bulge: number;
}

/**
 * Footpoint frame for one magnetic loop. Every cross product, normalisation
 * and the along-arch direction depend only on static inputs, so this whole
 * block — the most expensive part of the supplied loop — is evaluated once
 * at build time instead of 20k times per frame.
 */
function buildArch(
  h1: number,
  lh1: number,
  lh2: number,
  lh3: number,
  refX: number,
  refY: number,
  refZ: number,
  hwBase: number,
  hwScale: number,
): Arch {
  const pcphi = lh2 * 2 - 1;
  const psphi = Math.sqrt(Math.max(0, 1 - pcphi * pcphi));
  const pTheta = lh1 * TAU;
  const pX = psphi * Math.cos(pTheta);
  const pY = psphi * Math.sin(pTheta);
  const pZ = pcphi;

  let e1x = refY * pZ - refZ * pY;
  let e1y = refZ * pX - refX * pZ;
  let e1z = refX * pY - refY * pX;
  const len1 = Math.max(Math.sqrt(e1x * e1x + e1y * e1y + e1z * e1z), 1e-5);
  e1x /= len1;
  e1y /= len1;
  e1z /= len1;

  let e2x = pY * e1z - pZ * e1y;
  let e2y = pZ * e1x - pX * e1z;
  let e2z = pX * e1y - pY * e1x;
  const len2 = Math.max(Math.sqrt(e2x * e2x + e2y * e2y + e2z * e2z), 1e-5);
  e2x /= len2;
  e2y /= len2;
  e2z /= len2;

  const halfWidth = hwBase + lh3 * hwScale;
  const alpha = (h1 - 0.5) * halfWidth * 2;
  const caA = Math.cos(alpha);
  const saA = Math.sin(alpha);

  let dx = e1x * caA + e2x * saA;
  let dy = e1y * caA + e2y * saA;
  let dz = e1z * caA + e2z * saA;
  const len3 = Math.max(Math.sqrt(dx * dx + dy * dy + dz * dz), 1e-5);
  dx /= len3;
  dy /= len3;
  dz /= len3;

  return { dx, dy, dz, bulge: Math.cos((h1 - 0.5) * Math.PI) };
}

/** Rotate the target position about Z and ease the particle toward it. */
function place(
  i: number,
  px: number,
  py: number,
  pz: number,
  ca: number,
  sa: number,
  k: number,
  cur: Float32Array,
  matrix: Float32Array,
): void {
  const fx = px * ca - py * sa;
  const fy = px * sa + py * ca;
  const o3 = i * 3;
  const nx = cur[o3] + (fx - cur[o3]) * k;
  const ny = cur[o3 + 1] + (fy - cur[o3 + 1]) * k;
  const nz = cur[o3 + 2] + (pz - cur[o3 + 2]) * k;
  cur[o3] = nx;
  cur[o3 + 1] = ny;
  cur[o3 + 2] = nz;

  const o = i * 16;
  matrix[o + 12] = nx;
  matrix[o + 13] = ny;
  matrix[o + 14] = nz;
}

function setColor(i: number, r: number, g: number, b: number, colors: Float32Array): void {
  const o = i * 3;
  colors[o] = r;
  colors[o + 1] = g;
  colors[o + 2] = b;
}

interface Swarm {
  count: number;
  /** Live per-particle positions (x, y, z). */
  cur: Float32Array;
  /** Instance colour buffer, written in place. */
  colors: Float32Array;
  /** Advance every particle one frame. `k` is the position easing factor. */
  update: (time: number, k: number, matrix: Float32Array) => void;
}

function createSwarm(count: number): Swarm {
  const cur = new Float32Array(count * 3);
  for (let i = 0; i < cur.length; i += 1) cur[i] = (Math.random() - 0.5) * 100;
  const colors = new Float32Array(count * 3);

  // ---- per-layer static tables (built once) -------------------------------
  const i0: number[] = [];
  const p0sx: number[] = [];
  const p0sy: number[] = [];
  const p0cphi: number[] = [];
  const p0rr: number[] = [];
  const p0h4: number[] = [];
  const p0h5: number[] = [];

  const i1: number[] = [];
  const p1rr: number[] = [];
  const p1th2: number[] = [];
  const p1h3w: number[] = [];
  const p1cphi: number[] = [];
  const p1sphi: number[] = [];
  const p1h4w: number[] = [];

  const i2: number[] = [];
  const p2rr: number[] = [];
  const p2a: number[] = [];
  const p2b: number[] = [];
  const p2c: number[] = [];
  const p2theta: number[] = [];
  const p2cphi: number[] = [];
  const p2sphi: number[] = [];

  const i3: number[] = [];
  const p3a: number[] = [];
  const p3b: number[] = [];
  const p3c: number[] = [];
  const p3e: number[] = [];
  const p3sd: number[] = [];
  const p3sx: number[] = [];
  const p3sy: number[] = [];
  const p3cphi: number[] = [];

  const i4: number[] = [];
  const p4sx: number[] = [];
  const p4sy: number[] = [];
  const p4cphi: number[] = [];
  const p4h3w: number[] = [];

  const i5l: number[] = [];
  const p5ldx: number[] = [];
  const p5ldy: number[] = [];
  const p5ldz: number[] = [];
  const p5lbulge: number[] = [];
  const p5larch: number[] = [];
  const p5lh4w: number[] = [];

  const i5w: number[] = [];
  const p5wsx: number[] = [];
  const p5wsy: number[] = [];
  const p5wcphi: number[] = [];
  const p5wh3: number[] = [];

  const i6: number[] = [];
  const p6dx: number[] = [];
  const p6dy: number[] = [];
  const p6dz: number[] = [];
  const p6bulge: number[] = [];
  const p6arch: number[] = [];
  const p6h4w: number[] = [];

  const i7: number[] = [];
  const p7sx: number[] = [];
  const p7sy: number[] = [];
  const p7cphi: number[] = [];
  const p7h3: number[] = [];

  for (let i = 0; i < count; i += 1) {
    const t = i / count;
    const h1 = hash(i, 12.9898, 43758.5453);
    const h2 = hash(i, 78.233, 12543.123);
    const h3 = hash(i, 45.164, 98765.432);
    const h4 = hash(i, 33.719, 54321.987);
    const h5 = hash(i, 61.431, 31415.9265);

    if (t < BAND_EDGES[0]) {
      // 0 — FUSION CORE: a solid sphere with a pulsing brightness burst.
      const theta = h1 * TAU;
      const cphi = h2 * 2 - 1;
      const sphi = Math.sqrt(Math.max(0, 1 - cphi * cphi));
      i0.push(i);
      p0sx.push(sphi * Math.cos(theta));
      p0sy.push(sphi * Math.sin(theta));
      p0cphi.push(cphi);
      p0rr.push(Math.cbrt(Math.max(h3, 0.0001)) * CORE_R);
      p0h4.push(h4 * TAU);
      p0h5.push(h5 * 18.85);
    } else if (t < BAND_EDGES[1]) {
      // 1 — RADIATIVE ZONE: dense inner shell, very slow drift. Colour is static.
      const cphi = h3 * 2 - 1;
      const sphi = Math.sqrt(Math.max(0, 1 - cphi * cphi));
      i1.push(i);
      p1rr.push(RAD_MIN + h1 * (RAD_MAX - RAD_MIN));
      p1th2.push(h2 * TAU);
      p1h3w.push(h3 * TAU);
      p1cphi.push(cphi);
      p1sphi.push(sphi);
      p1h4w.push(h4 * TAU);
      COLOR.setHSL(0.075, 0.9, 0.25 + h5 * 0.1);
      setColor(i, COLOR.r, COLOR.g, COLOR.b, colors);
    } else if (t < BAND_EDGES[2]) {
      // 2 — CONVECTIVE ZONE: three interfering waves make granulation cells.
      const theta = h2 * TAU;
      const cphi = h3 * 2 - 1;
      i2.push(i);
      p2rr.push(CONV_MIN + h1 * (CONV_MAX - CONV_MIN));
      p2a.push(theta * 6);
      p2b.push(cphi * 18 + h4 * TAU);
      p2c.push((theta + cphi) * 12);
      p2theta.push(theta);
      p2cphi.push(cphi);
      p2sphi.push(Math.sqrt(Math.max(0, 1 - cphi * cphi)));
    } else if (t < BAND_EDGES[3]) {
      // 3 — PHOTOSPHERE: fine granulation plus dark sunspots.
      const theta = h1 * TAU;
      const cphi = h2 * 2 - 1;
      const sphi = Math.sqrt(Math.max(0, 1 - cphi * cphi));
      i3.push(i);
      p3a.push(theta * 24);
      p3b.push(cphi * 30 + h3 * TAU);
      p3c.push(theta * 17 + cphi * 13);
      p3e.push(cphi * 4);
      p3sd.push(Math.sin(theta * 3 + h4 * TAU));
      p3cphi.push(cphi);
      p3sx.push(sphi * Math.cos(theta));
      p3sy.push(sphi * Math.sin(theta));
    } else if (t < BAND_EDGES[4]) {
      // 4 — CHROMOSPHERE: spicules flicking off the limb.
      const theta = h1 * TAU;
      const cphi = h2 * 2 - 1;
      const sphi = Math.sqrt(Math.max(0, 1 - cphi * cphi));
      i4.push(i);
      p4cphi.push(cphi);
      p4sx.push(sphi * Math.cos(theta));
      p4sy.push(sphi * Math.sin(theta));
      p4h3w.push(h3 * 18.85);
    } else if (t < BAND_EDGES[5]) {
      // 5 — mixed layer: half is coronal loops, half is the inner solar wind.
      if (h5 < 0.5) {
        const region = i % LOOPS;
        const lh1 = REGIONS_A[region][0];
        const lh2 = REGIONS_A[region][1];
        const lh3 = REGIONS_A[region][2];
        const lh4 = REGIONS_A[region][3];
        const arch = buildArch(h1, lh1, lh2, lh3, 0, 1, 0.15, 0.2, 0.35);
        i5l.push(i);
        p5ldx.push(arch.dx);
        p5ldy.push(arch.dy);
        p5ldz.push(arch.dz);
        p5lbulge.push(arch.bulge);
        p5larch.push(SCALE_R * (0.1 + lh3 * 0.15) * Math.max(0.1, MAGNETIC));
        p5lh4w.push(lh4 * TAU);
        COLOR.setHSL(0.075, 0.95, 0.42 + arch.bulge * 0.35);
        setColor(i, COLOR.r, COLOR.g, COLOR.b, colors);
      } else {
        const theta = h1 * TAU;
        const cphi = h2 * 2 - 1;
        const sphi = Math.sqrt(Math.max(0, 1 - cphi * cphi));
        i5w.push(i);
        p5wcphi.push(cphi);
        p5wsx.push(sphi * Math.cos(theta));
        p5wsy.push(sphi * Math.sin(theta));
        p5wh3.push(h3 * 18);
      }
    } else if (t < BAND_EDGES[6]) {
      // 6 — PROMINENCES: taller, hotter erupting loops.
      const region = i % LOOPS;
      const lh1 = REGIONS_B[region][0];
      const lh2 = REGIONS_B[region][1];
      const lh3 = REGIONS_B[region][2];
      const lh4 = REGIONS_B[region][3];
      const arch = buildArch(h1, lh1, lh2, lh3, 0.15, 0, 1, 0.3, 0.5);
      i6.push(i);
      p6dx.push(arch.dx);
      p6dy.push(arch.dy);
      p6dz.push(arch.dz);
      p6bulge.push(arch.bulge);
      p6arch.push(SCALE_R * (0.2 + lh3 * 0.3) * Math.max(0.1, MAGNETIC));
      p6h4w.push(lh4 * TAU);
    } else {
      // 7 — OUTER SOLAR WIND: sparse, fading teal drift for depth.
      const theta = h1 * TAU;
      const cphi = h2 * 2 - 1;
      const sphi = Math.sqrt(Math.max(0, 1 - cphi * cphi));
      i7.push(i);
      p7cphi.push(cphi);
      p7sx.push(sphi * Math.cos(theta));
      p7sy.push(sphi * Math.sin(theta));
      p7h3.push(h3 * 70);
    }
  }

  // ---- frozen typed copies ------------------------------------------------
  const t0 = Float32Array.from(p0sx);
  const t0b = Float32Array.from(p0sy);
  const t0c = Float32Array.from(p0cphi);
  const t0d = Float32Array.from(p0rr);
  const t0e = Float32Array.from(p0h4);
  const t0f = Float32Array.from(p0h5);

  const t1 = Float32Array.from(p1rr);
  const t1b = Float32Array.from(p1th2);
  const t1c = Float32Array.from(p1h3w);
  const t1d = Float32Array.from(p1cphi);
  const t1e = Float32Array.from(p1sphi);
  const t1f = Float32Array.from(p1h4w);

  const t2 = Float32Array.from(p2rr);
  const t2b = Float32Array.from(p2a);
  const t2c = Float32Array.from(p2b);
  const t2d = Float32Array.from(p2c);
  const t2e = Float32Array.from(p2theta);
  const t2f = Float32Array.from(p2cphi);
  const t2g = Float32Array.from(p2sphi);

  const t3 = Float32Array.from(p3a);
  const t3b = Float32Array.from(p3b);
  const t3c = Float32Array.from(p3c);
  const t3d = Float32Array.from(p3e);
  const t3e = Float32Array.from(p3sd);
  const t3f = Float32Array.from(p3sx);
  const t3g = Float32Array.from(p3sy);
  const t3h = Float32Array.from(p3cphi);

  const t4 = Float32Array.from(p4sx);
  const t4b = Float32Array.from(p4sy);
  const t4c = Float32Array.from(p4cphi);
  const t4d = Float32Array.from(p4h3w);

  const t5 = Float32Array.from(p5ldx);
  const t5b = Float32Array.from(p5ldy);
  const t5c = Float32Array.from(p5ldz);
  const t5d = Float32Array.from(p5lbulge);
  const t5e = Float32Array.from(p5larch);
  const t5f = Float32Array.from(p5lh4w);

  const t6 = Float32Array.from(p5wsx);
  const t6b = Float32Array.from(p5wsy);
  const t6c = Float32Array.from(p5wcphi);
  const t6d = Float32Array.from(p5wh3);

  const t7 = Float32Array.from(p6dx);
  const t7b = Float32Array.from(p6dy);
  const t7c = Float32Array.from(p6dz);
  const t7d = Float32Array.from(p6bulge);
  const t7e = Float32Array.from(p6arch);
  const t7f = Float32Array.from(p6h4w);

  const t8 = Float32Array.from(p7sx);
  const t8b = Float32Array.from(p7sy);
  const t8c = Float32Array.from(p7cphi);
  const t8d = Float32Array.from(p7h3);

  const g0 = Uint32Array.from(i0);
  const g1 = Uint32Array.from(i1);
  const g2 = Uint32Array.from(i2);
  const g3 = Uint32Array.from(i3);
  const g4 = Uint32Array.from(i4);
  const g5 = Uint32Array.from(i5l);
  const g6 = Uint32Array.from(i5w);
  const g7 = Uint32Array.from(i6);
  const g8 = Uint32Array.from(i7);

  const n0 = g0.length;
  const n1 = g1.length;
  const n2 = g2.length;
  const n3 = g3.length;
  const n4 = g4.length;
  const n5 = g5.length;
  const n6 = g6.length;
  const n7 = g7.length;
  const n8 = g8.length;

  const update = (time: number, k: number, matrix: Float32Array): void => {
    // Shared for every layer — was recomputed inside the loop 20k times.
    const ca = Math.cos(time * 0.03);
    const sa = Math.sin(time * 0.03);

    // 0 — fusion core (warm white-yellow incandescent core)
    const coreTwist = time * 3;
    const coreBurst = time * FUSION * 4;
    for (let j = 0; j < n0; j += 1) {
      const i = g0[j];
      const rad = t0d[j] + Math.sin(coreTwist + t0e[j]) * CORE_JITTER;
      const burst = Math.pow(0.5 + 0.5 * Math.sin(coreBurst + t0f[j]), 6);
      COLOR.setHSL(0.11 - burst * 0.03, 0.98, Math.min(0.96, 0.68 + burst * 0.28));
      setColor(i, COLOR.r, COLOR.g, COLOR.b, colors);
      place(i, rad * t0[j], rad * t0b[j], rad * t0c[j], ca, sa, k, cur, matrix);
    }

    // 1 — radiative zone (static colour)
    const slow = time * 0.03;
    const drift = time * 0.08;
    for (let j = 0; j < n1; j += 1) {
      const i = g1[j];
      const theta = t1b[j] + Math.sin(slow + t1c[j]) * 0.3;
      const rad = t1[j] + Math.sin(drift + t1f[j]) * RADIATIVE_WANDER;
      const s = rad * t1e[j];
      place(i, s * Math.cos(theta), s * Math.sin(theta), rad * t1d[j], ca, sa, k, cur, matrix);
    }

    // 2 — convective cells (molten amber-orange granulation)
    const c1 = time * CONVECT * 0.5;
    const c2 = time * CONVECT * 0.4;
    const c3 = -time * CONVECT * 0.6;
    for (let j = 0; j < n2; j += 1) {
      const i = g2[j];
      const cell = Math.sin(t2b[j] + c1) + Math.sin(t2c[j] + c2) + Math.sin(t2d[j] + c3);
      const flow = cell * CONVECT_FLOW;
      const rot = t2e[j] + flow * 0.01;
      const rad = t2[j] + flow;
      const s = rad * t2g[j];
      const heat = (cell + 3) / 6;
      COLOR.setHSL(Math.max(0.045, 0.08 - heat * 0.03), 0.96, 0.36 + heat * 0.32);
      setColor(i, COLOR.r, COLOR.g, COLOR.b, colors);
      place(i, s * Math.cos(rot), s * Math.sin(rot), rad * t2f[j], ca, sa, k, cur, matrix);
    }

    // 3 — photosphere (radiant solar surface)
    const ga = time * 0.6;
    const gb = time * 0.5;
    const gc = time * 0.4;
    const gd = time * 0.05;
    for (let j = 0; j < n3; j += 1) {
      const i = g3[j];
      const granule = Math.sin(t3[j] + ga) + Math.sin(t3b[j] - gb) + Math.sin(t3c[j] + gc);
      const spotNoise = t3e[j] + Math.sin(t3d[j] + gd);
      const spotDark = Math.max(0, -spotNoise - 1.1) * 0.8;
      const rad = PHOTO_R + granule * GRANULE_FLOW;
      const bright = 0.6 + granule * 0.1 - spotDark;
      COLOR.setHSL(0.085, 0.96, Math.max(0.24, Math.min(0.85, bright)));
      setColor(i, COLOR.r, COLOR.g, COLOR.b, colors);
      place(i, rad * t3f[j], rad * t3g[j], rad * t3h[j], ca, sa, k, cur, matrix);
    }

    // 4 — chromospheric spicules (fiery orange flares)
    const flick = time * 2;
    for (let j = 0; j < n4; j += 1) {
      const i = g4[j];
      const spicule = Math.abs(Math.sin(flick + t4d[j])) * SPICULE_LEN;
      const rad = CHROMO_R + spicule;
      COLOR.setHSL(0.068, 0.98, 0.38 + (spicule / SPICULE_LEN) * 0.28);
      setColor(i, COLOR.r, COLOR.g, COLOR.b, colors);
      place(i, rad * t4[j], rad * t4b[j], rad * t4c[j], ca, sa, k, cur, matrix);
    }

    // 5 — coronal loops (static colour, one sine each)
    const flareA = time * 0.4 * MAGNETIC;
    for (let j = 0; j < n5; j += 1) {
      const i = g5[j];
      const pulse = 0.6 + 0.4 * Math.sin(flareA + t5f[j]);
      const radius = LOOP_A_R + t5e[j] * pulse * t5d[j];
      place(i, t5[j] * radius, t5b[j] * radius, t5c[j] * radius, ca, sa, k, cur, matrix);
    }

    // 6 — inner solar wind (warm amber drift, no cyan)
    const windA = time * WIND_SPIN_INNER;
    for (let j = 0; j < n6; j += 1) {
      const i = g6[j];
      const travel = (windA + t6d[j]) % 18;
      const rad = WIND_A_R + travel * 6;
      const fade = Math.max(0, 1 - travel / 18);
      COLOR.setHSL(0.078, 0.9, 0.18 + fade * 0.44);
      setColor(i, COLOR.r, COLOR.g, COLOR.b, colors);
      place(i, rad * t6[j], rad * t6b[j], rad * t6c[j], ca, sa, k, cur, matrix);
    }

    // 7 — prominences (hot erupting orange loops)
    const flareB = time * 0.5 * MAGNETIC;
    for (let j = 0; j < n7; j += 1) {
      const i = g7[j];
      const pulse = 0.5 + 0.5 * Math.sin(flareB + t7f[j]);
      const radius = LOOP_B_R + t7e[j] * pulse * t7d[j];
      COLOR.setHSL(Math.max(0.04, 0.07 - pulse * 0.02), 0.98, 0.44 + pulse * 0.34 + t7d[j] * 0.1);
      setColor(i, COLOR.r, COLOR.g, COLOR.b, colors);
      place(i, t7[j] * radius, t7b[j] * radius, t7c[j] * radius, ca, sa, k, cur, matrix);
    }

    // 8 — outer solar wind (soft amber motes dispersing into charcoal void)
    const windB = time * WIND_SPIN_OUTER;
    for (let j = 0; j < n8; j += 1) {
      const i = g8[j];
      const travel = (windB + t8d[j]) % 70;
      const rad = WIND_B_R + travel * 5.4;
      const fade = Math.max(0, 1 - travel / 70);
      COLOR.setHSL(0.075, 0.85, 0.12 + fade * 0.36);
      setColor(i, COLOR.r, COLOR.g, COLOR.b, colors);
      place(i, rad * t8[j], rad * t8b[j], rad * t8c[j], ca, sa, k, cur, matrix);
    }
  };

  return { count, cur, colors, update };
}

/** Fits the formation to the viewport and biases it into the hero's negative space. */
function Framing({ children }: { children: ReactNode }) {
  const viewport = useThree((state) => state.viewport);
  const portrait = viewport.width <= viewport.height;
  const fit = (Math.min(viewport.width, viewport.height) * 0.42) / FORMATION_RADIUS;
  const x = portrait ? 0 : viewport.width * 0.16;
  const y = portrait ? viewport.height * 0.05 : 0;
  return (
    <group position={[x, y, 0]} scale={fit}>
      {children}
    </group>
  );
}

interface ParticlesProps {
  count: number;
  size: number;
  opacity: number;
}

function SolarParticles({ count, size, opacity }: ParticlesProps) {
  const invalidate = useThree((state) => state.invalidate);
  const clock = useRef(SETTLE_TIME);

  const geometry = useMemo(() => new THREE.TetrahedronGeometry(size), [size]);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity,
        // Additive + no depth means the cloud reads as light rather than
        // geometry, and instance order stops mattering.
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
      }),
    [opacity],
  );
  const swarm = useMemo(() => createSwarm(count), [count]);

  // Built imperatively so the colour attribute exists before the first
  // compile — otherwise the material would compile without instancing colour.
  const mesh = useMemo(() => {
    const instanced = new THREE.InstancedMesh(geometry, material, count);
    instanced.instanceColor = new THREE.InstancedBufferAttribute(swarm.colors, 3);
    instanced.frustumCulled = false;

    // Particles only ever translate, so the matrix is seeded as identity and
    // each frame touches just the three translation slots.
    const matrix = instanced.instanceMatrix.array as Float32Array;
    for (let i = 0; i < count; i += 1) {
      const o = i * 16;
      matrix[o] = 1;
      matrix[o + 5] = 1;
      matrix[o + 10] = 1;
      matrix[o + 15] = 1;
    }
    return instanced;
  }, [geometry, material, swarm, count]);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
      mesh.dispose();
    },
    [geometry, material, mesh],
  );

  // Draw the scattered cloud once so the formation has somewhere to assemble
  // from when the hero reveal starts.
  useEffect(() => {
    const matrix = mesh.instanceMatrix.array as Float32Array;
    swarm.update(clock.current, 0, matrix);
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    invalidate();
  }, [swarm, mesh, invalidate]);

  useFrame((_state, delta) => {
    const step = Math.min(delta, 0.1);
    clock.current += step * SPEED;
    // Frame-rate independent equivalent of the supplied `lerp(target, 0.1)`.
    const k = 1 - Math.pow(1 - LERP_BASE, step * 60);
    const matrix = mesh.instanceMatrix.array as Float32Array;
    swarm.update(clock.current, k, matrix);
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return <primitive object={mesh} />;
}

/**
 * Extracts bright areas and blurs them. `OutputPass` is the piece the
 * supplied drei/three-stdlib setup could not provide — without it the
 * composer would hand back linear-space colour and the hero would look washed
 * out. Only enabled on capable devices.
 */
function BloomPipeline() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);

  const composer = useMemo(() => {
    const instance = new EffectComposer(gl);
    instance.addPass(new RenderPass(scene, camera));
    instance.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(size.width, size.height),
        BLOOM_STRENGTH,
        BLOOM_RADIUS,
        BLOOM_THRESHOLD,
      ),
    );
    instance.addPass(new OutputPass());
    return instance;
    // Bloom tuning is static; the composer is rebuilt only if the renderer,
    // scene or camera identity changes.
  }, [gl, scene, camera]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    composer.setPixelRatio(gl.getPixelRatio());
    composer.setSize(size.width, size.height);
  }, [composer, gl, size]);

  useEffect(() => () => composer.dispose(), [composer]);

  // A positive priority hands the render loop over to the composer.
  useFrame(() => composer.render(), 1);

  return null;
}

interface SceneProps {
  /** The hero reveal has begun — releases the formation into its assembly. */
  active: boolean;
  /** Hero off-screen or tab hidden. */
  paused: boolean;
  count: number;
  size: number;
  opacity: number;
  bloom: boolean;
  dpr: [number, number];
  onReady: () => void;
}

export default function SolarParticleScene({
  active,
  paused,
  count,
  size,
  opacity,
  bloom,
  dpr,
  onReady,
}: SceneProps) {
  const frameloop = active && !paused ? 'always' : 'never';

  return (
    <Canvas
      frameloop={frameloop}
      dpr={dpr}
      // R3F sets `pointerEvents: 'auto'` inline unless `eventSource` is set;
      // this style is spread last, so it wins. Keeps the canvas out of the
      // way of clicks, text selection and scrolling.
      style={{ pointerEvents: 'none' }}
      camera={{ position: [0, 0, CAMERA_Z], fov: 45, near: 1, far: 2000 }}
      // Opaque black + `mix-blend-mode: screen` on the host element: black
      // leaves the existing backdrop untouched, particles add light to it.
      gl={{ alpha: false, antialias: !bloom, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 1);
        onReady();
      }}
    >
      <Framing>
        <SolarParticles count={count} size={size} opacity={opacity} />
      </Framing>
      {bloom ? <BloomPipeline /> : null}
    </Canvas>
  );
}
