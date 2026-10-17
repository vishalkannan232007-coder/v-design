import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface LiquidGlassOverlayProps {
  className?: string;
  intensity?: 'subtle' | 'medium';
}

/**
 * LiquidGlassOverlay
 *
 * A reusable translucent liquid-glass visual layer inspired by the user's
 * green shader reference (translucent lime, muted olive, fluid refraction).
 *
 * Note: Workspace does not contain original GLSL shader source, so this is
 * an optimized hardware-accelerated optical approximation composing:
 *  1. SVG fractal noise displacement map (providing genuine liquid refraction/caustic distortion).
 *  2. Multi-stop translucent lime (#C8F52F) and muted olive (#858B42) fluid gradient fields.
 *  3. Frosted optical glass transmission (`backdrop-filter`) allowing white particles beneath to shine through cleanly.
 *  4. Micro-texture grain and subtle specular reflections without neon oversaturation.
 */
export function LiquidGlassOverlay({
  className = '',
  intensity = 'medium',
}: LiquidGlassOverlayProps) {
  const reduce = usePrefersReducedMotion();

  const isMedium = intensity === 'medium';
  const limeAlpha = isMedium ? 0.16 : 0.10;
  const oliveAlpha = isMedium ? 0.18 : 0.12;
  const ivoryAlpha = isMedium ? 0.08 : 0.05;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* SVG Liquid Refraction Filter */}
      <svg className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <defs>
          <filter id="liquid-glass-caustic" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.009 0.007"
              numOctaves="3"
              seed="18"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          </filter>
        </defs>
      </svg>

      {/* Layer A: Dynamic Fluid Translucent Caustic Fields (focused toward right/center-right) */}
      <div
        className="absolute inset-[-15%] w-[130%] h-[130%]"
        style={{
          background: [
            // Soft warm ivory highlight
            `radial-gradient(ellipse 45% 40% at 75% 35%, rgba(243, 240, 232, ${ivoryAlpha}) 0%, transparent 60%)`,
            // Translucent brand lime
            `radial-gradient(ellipse 55% 50% at 80% 48%, rgba(200, 245, 47, ${limeAlpha}) 0%, transparent 65%)`,
            // Muted olive grounding tone
            `radial-gradient(ellipse 60% 55% at 65% 62%, rgba(133, 139, 66, ${oliveAlpha}) 0%, transparent 70%)`,
            // Ambient deep forest depth
            `radial-gradient(ellipse 40% 40% at 90% 20%, rgba(162, 169, 85, ${limeAlpha * 0.7}) 0%, transparent 60%)`,
          ].join(', '),
          filter: 'url(#liquid-glass-caustic) blur(36px)',
          animation: reduce ? 'none' : 'fluid-slow-drift 22s ease-in-out infinite alternate',
          transform: reduce ? 'none' : undefined,
          willChange: reduce ? 'auto' : 'transform',
        }}
      />

      {/* Layer B: Translucent Frosted Glass Refraction Pane */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          background:
            'radial-gradient(ellipse 85% 70% at 75% 50%, rgba(20, 26, 18, 0.12) 0%, rgba(9, 11, 9, 0.40) 80%, rgba(9, 11, 9, 0.65) 100%)',
        }}
      />

      {/* Layer C: Specular Prism Rim Sheen */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(125deg, rgba(200, 245, 47, 0.08) 0%, rgba(255, 255, 255, 0.03) 30%, transparent 60%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Layer D: Fine Surface Micro-Grain */}
      <div className="film-grain absolute inset-0 opacity-40" />
    </div>
  );
}
