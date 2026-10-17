import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

type RGB = [number, number, number];

interface BlobConfig {
  color: RGB;
  /** Radius as a fraction of the larger viewport dimension. */
  size: number;
  /** Base position, 0..1 of viewport. */
  bx: number;
  by: number;
  /** Drift amplitude, 0..1 of viewport. */
  ax: number;
  ay: number;
  /** Angular speed (radians per ms). */
  speed: number;
  phase: number;
  alpha: number;
}

/**
 * Art-directed palette: deep teal + violet depth, restrained ember warmth,
 * a cool sky accent and the brand lime used only as a quiet highlight.
 */
const BLOBS: BlobConfig[] = [
  { color: [26, 143, 122], size: 0.98, bx: 0.2, by: 0.74, ax: 0.06, ay: 0.05, speed: 0.00012, phase: 0.0, alpha: 0.52 },
  { color: [124, 58, 237], size: 0.86, bx: 0.86, by: 0.82, ax: 0.05, ay: 0.06, speed: 0.0001, phase: 3.1, alpha: 0.4 },
  { color: [194, 65, 12], size: 0.7, bx: 0.62, by: 0.12, ax: 0.07, ay: 0.05, speed: 0.00016, phase: 2.2, alpha: 0.32 },
  { color: [14, 165, 233], size: 0.62, bx: 0.07, by: 0.18, ax: 0.06, ay: 0.07, speed: 0.00014, phase: 4.4, alpha: 0.28 },
  { color: [212, 255, 0], size: 0.4, bx: 0.76, by: 0.34, ax: 0.08, ay: 0.06, speed: 0.00019, phase: 1.6, alpha: 0.24 },
];

const PARTICLE_COUNT = 46;

interface Particle {
  x: number;
  y: number;
  r: number;
  sp: number;
  ph: number;
  tw: number;
  a: number;
  color: string;
}

const PARTICLE_COLORS = ['rgba(212,255,0,', 'rgba(255,255,255,', 'rgba(120,220,200,'];

function makeSprite([cr, cg, cb]: RGB, size = 256): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grd = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grd.addColorStop(0, `rgba(${cr},${cg},${cb},1)`);
    grd.addColorStop(0.28, `rgba(${cr},${cg},${cb},0.55)`);
    grd.addColorStop(0.62, `rgba(${cr},${cg},${cb},0.16)`);
    grd.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, size, size);
  }
  return canvas;
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/**
 * Procedural cinematic backdrop for the hero.
 *
 * A handful of large, additive "light forms" drift on slow Lissajous paths
 * over a deep base, with a sparse particle field for depth. Rendered on a 2D
 * canvas using pre-baked gradient sprites (cheap to blit) rather than per-frame
 * gradient construction.
 *
 * Performance / accessibility:
 *  - device pixel ratio is capped (mobile lower) to bound fill cost.
 *  - the loop pauses when the hero is off-screen or the tab is hidden.
 *  - prefers-reduced-motion renders a single composed frame instead of a loop.
 *  - a static CSS gradient layer sits behind the canvas, so the hero always
 *    has a rich visual even if the canvas cannot initialise.
 */
export function CinematicBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const sprites = BLOBS.map((blob) => makeSprite(blob.color));
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: rand(0.6, 1.9),
      sp: rand(0.00005, 0.00013),
      ph: Math.random() * Math.PI * 2,
      tw: rand(0.0006, 0.0016),
      a: rand(0.16, 0.46),
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
    }));

    let width = 0;
    let height = 0;
    let baseGradient: CanvasGradient | null = null;
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      const cap = width < 768 ? 1.25 : 1.5;
      const dpr = Math.min(window.devicePixelRatio || 1, cap);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      baseGradient = ctx.createLinearGradient(0, 0, width, height);
      baseGradient.addColorStop(0, '#060608');
      baseGradient.addColorStop(0.55, '#080a0b');
      baseGradient.addColorStop(1, '#050506');
    };

    const draw = (elapsed: number) => {
      // Deep cinematic base
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.fillStyle = baseGradient ?? '#060608';
      ctx.fillRect(0, 0, width, height);

      const maxDim = Math.max(width, height);

      // Additive light forms
      ctx.globalCompositeOperation = 'lighter';
      BLOBS.forEach((blob, i) => {
        const angle = elapsed * blob.speed + blob.phase;
        const x = (blob.bx + Math.sin(angle) * blob.ax) * width;
        const y = (blob.by + Math.cos(angle * 0.82 + blob.phase) * blob.ay) * height;
        const pulse = 1 + Math.sin(elapsed * blob.speed * 2.2 + blob.phase) * 0.08;
        const radius = blob.size * maxDim * 0.5 * pulse;
        const alpha = blob.alpha * (0.82 + Math.sin(elapsed * blob.speed * 1.7 + blob.phase) * 0.18);
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.drawImage(sprites[i], x - radius, y - radius, radius * 2, radius * 2);
      });

      // Sparse depth particles
      particles.forEach((p) => {
        const px = (p.x + Math.sin(elapsed * p.sp + p.ph) * 0.02) * width;
        const py = (p.y + Math.cos(elapsed * p.sp * 0.9 + p.ph) * 0.025) * height;
        const alpha = p.a * (0.5 + 0.5 * Math.sin(elapsed * p.tw + p.ph));
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = `${p.color}1)`;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    const loop = (now: number) => {
      raf = 0;
      if (document.hidden || !visible) return;
      draw(now - start);
      raf = requestAnimationFrame(loop);
    };

    const kick = () => {
      if (reduce || raf || document.hidden || !visible) return;
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduce) {
      // A settled, well-composed single frame
      draw(5200);
    } else {
      kick();
    }

    const onResize = () => {
      resize();
      if (reduce) draw(5200);
      else kick();
    };
    window.addEventListener('resize', onResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          kick();
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const onVisibility = () => {
      if (!document.hidden) kick();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
    };
  }, [reduce]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Static fallback if the canvas never renders */}
      <div className="absolute inset-0 bg-charcoal-950" />
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 70% 60% at 22% 78%, rgba(26,143,122,0.30) 0%, transparent 62%)',
            'radial-gradient(ellipse 55% 55% at 84% 80%, rgba(124,58,237,0.24) 0%, transparent 62%)',
            'radial-gradient(ellipse 50% 40% at 62% 12%, rgba(194,65,12,0.20) 0%, transparent 60%)',
            'radial-gradient(ellipse 40% 40% at 8% 18%, rgba(14,165,233,0.16) 0%, transparent 60%)',
            'radial-gradient(ellipse 30% 26% at 76% 34%, rgba(212,255,0,0.12) 0%, transparent 60%)',
          ].join(', '),
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
