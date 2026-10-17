import vDesignLogoTransparent from '../assets/brand/V-DESIGN-LOGO-transparent.png';

interface BrandMarkProps {
  className?: string;
  alt?: string;
  onError?: () => void;
}

/**
 * Authentic V DESIGN brandmark rendered with pristine alpha transparency.
 * No black box, no background clipping artifact, exact original typography and colors.
 */
export function BrandMark({ className = '', alt = 'V DESIGN', onError }: BrandMarkProps) {
  return (
    <span
      className={`relative inline-block ${className}`}
      role="img"
      aria-label={alt}
    >
      <img
        src={vDesignLogoTransparent}
        alt=""
        aria-hidden="true"
        draggable={false}
        onError={onError}
        className="w-full h-auto object-contain select-none pointer-events-none"
      />
    </span>
  );
}
