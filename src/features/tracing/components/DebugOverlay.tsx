import type { Point } from '../../../types';
import { HIT_RADIUS } from '../utils/completionDetection';

interface DebugOverlayProps {
  dots: Point[];
  size: number;
  hitDots: Set<number>;
  coverage: number;
  validSequence: boolean;
  hitRadius?: number;
}

/**
 * Development-only overlay showing hit detection visualization.
 * Displays hit radii, dot indices, and completion stats.
 */
export function DebugOverlay({
  dots,
  size,
  hitDots,
  coverage,
  validSequence,
  hitRadius = HIT_RADIUS,
}: DebugOverlayProps) {
  return (
    <>
      {/* Hit radius circles and labels */}
      <svg
        viewBox="0 0 1 1"
        width={size}
        height={size}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {dots.map((dot, index) => {
          const isHit = hitDots.has(index);
          return (
            <g key={index}>
              {/* Hit radius circle */}
              <circle
                cx={dot.x}
                cy={dot.y}
                r={hitRadius}
                fill="none"
                stroke={isHit ? '#22c55e' : '#ef4444'}
                strokeWidth={0.005}
                strokeDasharray="0.02 0.01"
                opacity={0.6}
              />
              {/* Dot index label */}
              <text
                x={dot.x}
                y={dot.y - 0.06}
                fontSize={0.04}
                fill={isHit ? '#22c55e' : '#ef4444'}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="monospace"
              >
                {index}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Stats badge */}
      <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-mono px-2 py-1 rounded">
        <div>Coverage: {(coverage * 100).toFixed(0)}%</div>
        <div>Hit: {hitDots.size}/{dots.length}</div>
        <div className={validSequence ? 'text-green-400' : 'text-red-400'}>
          Sequence: {validSequence ? '✓' : '✗'}
        </div>
      </div>
    </>
  );
}
