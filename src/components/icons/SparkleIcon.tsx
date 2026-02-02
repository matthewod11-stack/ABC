interface SparkleIconProps {
  size?: number;
  className?: string;
}

/**
 * 4-point star burst sparkle icon.
 * Perfect for magical/princess effects.
 */
export function SparkleIcon({ size = 24, className = '' }: SparkleIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {/* Main 4-point star */}
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
      {/* Small accent sparkle */}
      <circle cx="19" cy="5" r="1.5" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  );
}
