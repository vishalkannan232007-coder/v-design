import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface FluidShaderBackgroundProps {
  className?: string;
  intensity?: 'subtle' | 'vibrant';
  children?: React.ReactNode;
}

/**
 * FluidShaderBackground — Inspired by Reference 3
 * Features soft ivory (#F3F0E8) and lime-green (#C8F52F) illumination,
 * muted olive (#858B42) transitions, fine-grain texture, and fluid organic depth.
 * Zero-overhead CSS mesh GPU shaders with complete mobile compatibility and
 * reduced-motion respect.
 */
export function FluidShaderBackground({
  className = '',
  intensity = 'vibrant',
  children,
}: FluidShaderBackgroundProps) {
  const reduce = usePrefersReducedMotion();

  return (
    <div className={`relative overflow-hidden rounded-[inherit] ${className}`}>
      {/* Dynamic Fluid Colour Fields */}
      <div
        className="pointer-events-none absolute inset-[-25%] w-[150%] h-[150%]"
        style={{
          background:
            intensity === 'vibrant'
              ? [
                  'radial-gradient(ellipse 60% 55% at 25% 30%, rgba(243, 240, 232, 0.48) 0%, transparent 60%)',
                  'radial-gradient(ellipse 65% 60% at 75% 40%, rgba(200, 245, 47, 0.45) 0%, transparent 65%)',
                  'radial-gradient(ellipse 70% 65% at 40% 80%, rgba(133, 139, 66, 0.50) 0%, transparent 70%)',
                  'radial-gradient(ellipse 50% 50% at 85% 20%, rgba(162, 169, 85, 0.40) 0%, transparent 60%)',
                  '#141712',
                ].join(', ')
              : [
                  'radial-gradient(ellipse 55% 50% at 30% 35%, rgba(243, 240, 232, 0.22) 0%, transparent 60%)',
                  'radial-gradient(ellipse 60% 55% at 70% 45%, rgba(200, 245, 47, 0.20) 0%, transparent 65%)',
                  'radial-gradient(ellipse 65% 60% at 45% 75%, rgba(133, 139, 66, 0.25) 0%, transparent 70%)',
                  '#141712',
                ].join(', '),
          filter: 'blur(60px)',
          animation: reduce ? 'none' : 'fluid-slow-drift 24s ease-in-out infinite alternate',
          transform: reduce ? 'none' : undefined,
          willChange: reduce ? 'auto' : 'transform',
        }}
        aria-hidden="true"
      />

      {/* Atmospheric Soft Light Scrim for optimal contrast */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(20,23,18,0.2) 0%, rgba(9,11,9,0.65) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Fine-grain Texture Layer */}
      <div className="film-grain pointer-events-none absolute inset-0 z-[2]" aria-hidden="true" />

      {/* Embedded Children */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
