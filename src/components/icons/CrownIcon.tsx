interface CrownIconProps {
  size?: number;
  className?: string;
}

/**
 * Small princess tiara/crown icon.
 * Features three peaks with gem accents.
 */
export function CrownIcon({ size = 24, className = '' }: CrownIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {/* Crown body with three peaks */}
      <path d="M2 18 L4 8 L8 12 L12 4 L16 12 L20 8 L22 18 Z" />
      {/* Base band */}
      <rect x="2" y="18" width="20" height="3" rx="1" />
      {/* Gem accents on peaks */}
      <circle cx="12" cy="7" r="1.5" fill="white" opacity="0.6" />
      <circle cx="5" cy="12" r="1" fill="white" opacity="0.4" />
      <circle cx="19" cy="12" r="1" fill="white" opacity="0.4" />
    </svg>
  );
}
