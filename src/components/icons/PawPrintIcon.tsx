interface PawPrintIconProps {
  size?: number;
  className?: string;
}

/**
 * Cute paw print silhouette icon.
 * Features a palm pad and four toe pads.
 */
export function PawPrintIcon({ size = 24, className = '' }: PawPrintIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {/* Main palm pad */}
      <ellipse cx="12" cy="16" rx="5" ry="4.5" />
      {/* Toe pads */}
      <ellipse cx="7" cy="9" rx="2.2" ry="2.8" />
      <ellipse cx="17" cy="9" rx="2.2" ry="2.8" />
      <ellipse cx="10" cy="6" rx="2" ry="2.5" />
      <ellipse cx="14" cy="6" rx="2" ry="2.5" />
    </svg>
  );
}
