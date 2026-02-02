import type { Point } from '../../../types';

interface GuideDotsProps {
  dots: Point[];
  size: number;
  hitDots: Set<number>;
  dotRadius?: number;
  unhitColor?: string;
  hitColor?: string;
}

/**
 * SVG component rendering ordered guide dots for tracing.
 * Dots change color when hit by the user's stroke.
 */
export function GuideDots({
  dots,
  size,
  hitDots,
  dotRadius = 0.03,
  unhitColor = '#FFB6C1', // Princess pink
  hitColor = '#FFD700', // Princess gold
}: GuideDotsProps) {
  return (
    <svg
      viewBox="0 0 1 1"
      width={size}
      height={size}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      {dots.map((dot, index) => (
        <circle
          key={index}
          cx={dot.x}
          cy={dot.y}
          r={dotRadius}
          fill={hitDots.has(index) ? hitColor : unhitColor}
          className="transition-colors duration-200"
        />
      ))}
    </svg>
  );
}
