interface GhostLetterProps {
  path: string;
  size: number;
  opacity?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

/**
 * SVG component rendering a faded letter path as a tracing guide.
 * Uses normalized 0-1 viewBox coordinates.
 */
export function GhostLetter({
  path,
  size,
  opacity = 0.25,
  strokeColor = '#9333ea', // Purple-600
  strokeWidth = 0.08,
}: GhostLetterProps) {
  return (
    <svg
      viewBox="0 0 1 1"
      width={size}
      height={size}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <path
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeOpacity={opacity}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
