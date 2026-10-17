import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

interface WhiteMagneticFieldSceneProps {
  active?: boolean;
  paused?: boolean;
  count?: number;
  bloom?: boolean;
  dpr?: [number, number];
  onReady?: () => void;
}

/**
 * Precomputed constant attributes for high performance.
 * Avoids any per-frame Vector3, Matrix4, or trigonometric allocations.
 */
interface SimulationBuffers {
  totalCount: number;
  coreCount: number;
  loopCount: number;
  flareCount: number;
  // Core (Group 0)
  phi: Float32Array;
  theta: Float32Array;
  sinPhi: Float32Array;
  cosPhi: Float32Array;
  sinTheta: Float32Array;
  cosTheta: Float32Array;
  // Magnetic Field Lines (Group 1)
  posOnLine: Float32Array;
  L: Float32Array;
  sinLineAngle: Float32Array;
  cosLineAngle: Float32Array;
  // Solar Flares (Group 2)
  flareId: Float32Array;
  posOnFlare: Float32Array;
  sinPolar: Float32Array;
  cosPolar: Float32Array;
  sinAngleOffset: Float32Array;
  cosAngleOffset: Float32Array;
  // Dynamic smoothed coordinates (for zero-allocation lerping)
  currentX: Float32Array;
  currentY: Float32Array;
  currentZ: Float32Array;
}

function buildSimulationBuffers(count: number, scale: number, fieldStrength: number): SimulationBuffers {
  const coreCount = Math.floor(count / 3);
  const loopCount = Math.floor(count / 3);
  const flareCount = count - coreCount - loopCount;

  const phi = new Float32Array(coreCount);
  const theta = new Float32Array(coreCount);
  const sinPhi = new Float32Array(coreCount);
  const cosPhi = new Float32Array(coreCount);
  const sinTheta = new Float32Array(coreCount);
  const cosTheta = new Float32Array(coreCount);

  for (let i = 0; i < coreCount; i++) {
    const normIdx = i / Math.max(1, coreCount);
    const p = Math.acos(1 - 2 * normIdx);
    const th = Math.PI * (1 + Math.sqrt(5)) * i;
    phi[i] = p;
    theta[i] = th;
    sinPhi[i] = Math.sin(p);
    cosPhi[i] = Math.cos(p);
    sinTheta[i] = Math.sin(th);
    cosTheta[i] = Math.cos(th);
  }

  const posOnLine = new Float32Array(loopCount);
  const L = new Float32Array(loopCount);
  const sinLineAngle = new Float32Array(loopCount);
  const cosLineAngle = new Float32Array(loopCount);
  const numLines = 50;

  for (let j = 0; j < loopCount; j++) {
    const localN = j / Math.max(1, loopCount);
    const lineId = Math.floor(localN * numLines);
    posOnLine[j] = (localN * numLines) - lineId;
    const lineAngle = (lineId / numLines) * Math.PI * 2.0;
    const shellLevel = (lineId % 5) / 5;
    L[j] = scale * 1.2 + shellLevel * scale * fieldStrength;
    sinLineAngle[j] = Math.sin(lineAngle);
    cosLineAngle[j] = Math.cos(lineAngle);
  }

  const flareId = new Float32Array(flareCount);
  const posOnFlare = new Float32Array(flareCount);
  const sinPolar = new Float32Array(flareCount);
  const cosPolar = new Float32Array(flareCount);
  const sinAngleOffset = new Float32Array(flareCount);
  const cosAngleOffset = new Float32Array(flareCount);
  const numFlares = 30;

  for (let k = 0; k < flareCount; k++) {
    const localN = k / Math.max(1, flareCount);
    const fId = Math.floor(localN * numFlares);
    flareId[k] = fId;
    posOnFlare[k] = (localN * numFlares) - fId;
    const angleOffset = (fId / numFlares) * Math.PI * 2.0;
    sinAngleOffset[k] = Math.sin(angleOffset);
    cosAngleOffset[k] = Math.cos(angleOffset);

    const basePhi = (fId % 3 === 0) ? 0.1 : (fId % 3 === 1) ? Math.PI - 0.1 : Math.PI / 2;
    const spread = (fId % 5) / 5 * 0.5;
    const polarAngle = basePhi + spread * Math.sin(fId * 13.37);
    sinPolar[k] = Math.sin(polarAngle);
    cosPolar[k] = Math.cos(polarAngle);
  }

  return {
    totalCount: count,
    coreCount,
    loopCount,
    flareCount,
    phi,
    theta,
    sinPhi,
    cosPhi,
    sinTheta,
    cosTheta,
    posOnLine,
    L,
    sinLineAngle,
    cosLineAngle,
    flareId,
    posOnFlare,
    sinPolar,
    cosPolar,
    sinAngleOffset,
    cosAngleOffset,
    currentX: new Float32Array(count),
    currentY: new Float32Array(count),
    currentZ: new Float32Array(count),
  };
}

function WhiteMagnetosphereSwarm({
  count = 6000,
  active = true,
  paused = false,
  onReady,
}: {
  count?: number;
  active?: boolean;
  paused?: boolean;
  onReady?: () => void;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const initializedRef = useRef(false);
  const { viewport } = useThree();

  // Model parameters calibrated for website layout:
  // Central sun radius: 26 units
  // Magnetic field size: 3.4
  // Flow speed: 1.25
  // Flare intensity: 1.6
  const scale = 26;
  const fieldStrength = 3.4;
  const flowSpeed = 1.25;
  const flareIntensity = 1.6;

  // Precomputed buffers
  const sim = useMemo(() => buildSimulationBuffers(count, scale, fieldStrength), [count]);

  // Geometry: small sharp tetrahedra
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.32, 0), []);

  // Material: additive blending for incandescent white glow at intersecting fields
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  // Responsive offset:
  // On desktop, shift rightwards so the hero headline on the left sits in clean dark negative space.
  // On mobile/narrow screens, keep closer to center and slightly lower.
  const isMobile = viewport.width < 70;
  const targetOffsetX = isMobile ? 0 : 36;
  const targetOffsetY = isMobile ? -6 : -2;

  // Initialize identity matrices for all instances
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const dummy = new THREE.Object3D();
    const c = new THREE.Color(1, 1, 1);
    for (let i = 0; i < count; i++) {
      dummy.position.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, c);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    onReady?.();
  }, [count, onReady]);

  // Animation frame loop
  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh || paused || !active) return;

    const time = state.clock.getElapsedTime();
    const t = time * flowSpeed;
    const rotY = time * 0.08;
    const cy = Math.cos(rotY);
    const sy = Math.sin(rotY);

    const mArr = mesh.instanceMatrix.array as Float32Array;
    const cArr = mesh.instanceColor?.array as Float32Array | undefined;

    const {
      coreCount,
      loopCount,
      flareCount,
      phi,
      theta,
      sinPhi,
      cosPhi,
      sinTheta,
      cosTheta,
      posOnLine,
      L,
      sinLineAngle,
      cosLineAngle,
      flareId,
      posOnFlare,
      sinPolar,
      cosPolar,
      sinAngleOffset,
      cosAngleOffset,
      currentX,
      currentY,
      currentZ,
    } = sim;

    const initialized = initializedRef.current;
    const wrapThresholdSq = (scale * 1.5) * (scale * 1.5);

    // ==========================================
    // GROUP 0: CORE BOILING SPHERE (First 1/3)
    // ==========================================
    for (let i = 0; i < coreCount; i++) {
      const surfaceBoil =
        Math.sin(phi[i] * 10 + t * 2) * Math.cos(theta[i] * 10 + t * 2.5) * (scale * 0.05);
      const r = scale + surfaceBoil;

      const px = r * sinPhi[i] * cosTheta[i];
      const py = r * sinPhi[i] * sinTheta[i];
      const pz = r * cosPhi[i];

      const targetX = px * cy + pz * sy + targetOffsetX;
      const targetY = py + targetOffsetY;
      const targetZ = -px * sy + pz * cy;

      if (!initialized) {
        currentX[i] = targetX;
        currentY[i] = targetY;
        currentZ[i] = targetZ;
      } else {
        currentX[i] += (targetX - currentX[i]) * 0.15;
        currentY[i] += (targetY - currentY[i]) * 0.15;
        currentZ[i] += (targetZ - currentZ[i]) * 0.15;
      }

      const mIdx = i * 16;
      mArr[mIdx + 12] = currentX[i];
      mArr[mIdx + 13] = currentY[i];
      mArr[mIdx + 14] = currentZ[i];

      if (cArr) {
        const lit = 0.65 + (surfaceBoil > 0 ? 0.35 : 0.0);
        const cIdx = i * 3;
        cArr[cIdx] = lit;
        cArr[cIdx + 1] = lit;
        cArr[cIdx + 2] = lit;
      }
    }

    // ==========================================
    // GROUP 1: MAGNETIC FIELD LINES (Second 1/3)
    // ==========================================
    const minTheta = 0.1;
    const maxTheta = Math.PI - 0.1;
    const thetaSpan = maxTheta - minTheta;
    const maxFieldBound = scale * fieldStrength * 1.5;

    for (let j = 0; j < loopCount; j++) {
      const globalIdx = coreCount + j;
      const flowPos = ((posOnLine[j] + t * 0.2) % 1.0 + 1.0) % 1.0;
      const polarAngle = minTheta + flowPos * thetaSpan;
      const sPolar = Math.sin(polarAngle);

      const r = L[j] * (sPolar * sPolar);
      const finalR = r > scale * 1.01 ? r : scale * 1.01;

      const px = finalR * sPolar * cosLineAngle[j];
      const pz = finalR * sPolar * sinLineAngle[j];
      const py = finalR * Math.cos(polarAngle);

      const targetX = px * cy + pz * sy + targetOffsetX;
      const targetY = py + targetOffsetY;
      const targetZ = -px * sy + pz * cy;

      if (!initialized) {
        currentX[globalIdx] = targetX;
        currentY[globalIdx] = targetY;
        currentZ[globalIdx] = targetZ;
      } else {
        const dx = targetX - currentX[globalIdx];
        const dy = targetY - currentY[globalIdx];
        const dz = targetZ - currentZ[globalIdx];
        if (dx * dx + dy * dy + dz * dz > wrapThresholdSq) {
          currentX[globalIdx] = targetX;
          currentY[globalIdx] = targetY;
          currentZ[globalIdx] = targetZ;
        } else {
          currentX[globalIdx] += dx * 0.12;
          currentY[globalIdx] += dy * 0.12;
          currentZ[globalIdx] += dz * 0.12;
        }
      }

      const mIdx = globalIdx * 16;
      mArr[mIdx + 12] = currentX[globalIdx];
      mArr[mIdx + 13] = currentY[globalIdx];
      mArr[mIdx + 14] = currentZ[globalIdx];

      if (cArr) {
        let lit = 0.85 * (1.0 - (finalR / maxFieldBound));
        if (lit < 0.15) lit = 0.15;
        if (lit > 0.95) lit = 0.95;
        const cIdx = globalIdx * 3;
        cArr[cIdx] = lit;
        cArr[cIdx + 1] = lit;
        cArr[cIdx + 2] = lit;
      }
    }

    // ==========================================
    // GROUP 2: SOLAR FLARES (Last 1/3)
    // ==========================================
    for (let k = 0; k < flareCount; k++) {
      const globalIdx = coreCount + loopCount + k;
      const flowPos = ((posOnFlare[k] + t * 0.4) % 1.0 + 1.0) % 1.0;
      const r = scale + flowPos * scale * flareIntensity;

      const wiggleAmount = flowPos * scale * 0.18;
      const fId = flareId[k];
      const wiggleX = Math.sin(flowPos * 10 + t * 5 + fId) * wiggleAmount;
      const wiggleZ = Math.cos(flowPos * 10 + t * 5 + fId) * wiggleAmount;

      const px = r * sinPolar[k] * cosAngleOffset[k] + wiggleX;
      const pz = r * sinPolar[k] * sinAngleOffset[k] + wiggleZ;
      const py = r * cosPolar[k];

      const targetX = px * cy + pz * sy + targetOffsetX;
      const targetY = py + targetOffsetY;
      const targetZ = -px * sy + pz * cy;

      if (!initialized) {
        currentX[globalIdx] = targetX;
        currentY[globalIdx] = targetY;
        currentZ[globalIdx] = targetZ;
      } else {
        const dx = targetX - currentX[globalIdx];
        const dy = targetY - currentY[globalIdx];
        const dz = targetZ - currentZ[globalIdx];
        if (dx * dx + dy * dy + dz * dz > wrapThresholdSq) {
          currentX[globalIdx] = targetX;
          currentY[globalIdx] = targetY;
          currentZ[globalIdx] = targetZ;
        } else {
          currentX[globalIdx] += dx * 0.12;
          currentY[globalIdx] += dy * 0.12;
          currentZ[globalIdx] += dz * 0.12;
        }
      }

      const mIdx = globalIdx * 16;
      mArr[mIdx + 12] = currentX[globalIdx];
      mArr[mIdx + 13] = currentY[globalIdx];
      mArr[mIdx + 14] = currentZ[globalIdx];

      if (cArr) {
        const inv = 1.0 - flowPos;
        let lit = inv * inv * 0.9;
        if (lit < 0.08) lit = 0.08;
        const cIdx = globalIdx * 3;
        cArr[cIdx] = lit;
        cArr[cIdx + 1] = lit;
        cArr[cIdx + 2] = lit;
      }
    }

    if (!initialized) {
      initializedRef.current = true;
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} frustumCulled={false} />;
}

/**
 * Post-processing bloom stage for luminous white magnetic loops.
 */
function BloomEffectComposer({ enabled = true }: { enabled?: boolean }) {
  const { gl, scene, camera, size } = useThree();

  const composer = useMemo(() => {
    if (!enabled) return null;
    const comp = new EffectComposer(gl);
    comp.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      1.1, // Strength: lifted highlights without blinding wash
      0.45, // Radius: soft luminous halo
      0.28, // Threshold: only intense cores and overlapping field loops bloom
    );
    comp.addPass(bloom);
    comp.addPass(new OutputPass());
    return comp;
  }, [gl, scene, camera, size.width, size.height, enabled]);

  useEffect(() => {
    return () => {
      composer?.dispose();
    };
  }, [composer]);

  useFrame((_, delta) => {
    if (composer && enabled) {
      composer.render(delta);
    }
  }, 1);

  return null;
}

export default function WhiteMagneticFieldScene({
  active = true,
  paused = false,
  count = 6000,
  bloom = true,
  dpr = [1, 1.5],
  onReady,
}: WhiteMagneticFieldSceneProps) {
  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 180], fov: 50, near: 1, far: 800 }}
      gl={{
        antialias: false,
        powerPreference: 'high-performance',
        alpha: true,
      }}
      style={{ pointerEvents: 'none' }}
    >
      <fog attach="fog" args={['#090B09', 150, 420]} />
      <WhiteMagnetosphereSwarm count={count} active={active} paused={paused} onReady={onReady} />
      {bloom && <BloomEffectComposer enabled={bloom} />}
    </Canvas>
  );
}
