import { useRef, useEffect, useState } from 'react';

interface DemoAnimationProps {
  path: string;
  size: number;
  isPlaying: boolean;
  onComplete: () => void;
  duration?: number; // ms, default 1500
  strokeColor?: string;
  strokeWidth?: number;
}

/**
 * Animated demo that shows how to trace the letter/shape.
 * Uses CSS stroke-dasharray animation to create a "drawing" effect.
 *
 * The animation works by:
 * 1. Setting stroke-dasharray to the path's total length (one big dash)
 * 2. Starting with stroke-dashoffset equal to path length (hidden)
 * 3. Animating stroke-dashoffset to 0 (fully revealed)
 */
export function DemoAnimation({
  path,
  size,
  isPlaying,
  onComplete,
  duration = 1500,
  strokeColor = '#9333ea', // Purple-600 (same as GhostLetter)
  strokeWidth = 0.08,
}: DemoAnimationProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Measure path length after mount and when path changes
  useEffect(() => {
    // Reset for new path
    setPathLength(null);
    setAnimationKey((k) => k + 1);

    // Use requestAnimationFrame to ensure DOM is ready
    const raf = requestAnimationFrame(() => {
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        setPathLength(length);
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [path]);

  // Handle animation completion
  useEffect(() => {
    if (!isPlaying || pathLength === null) return;

    const timer = setTimeout(() => {
      onComplete();
    }, duration + 200); // Add buffer for visual completion

    return () => clearTimeout(timer);
  }, [isPlaying, pathLength, duration, onComplete]);

  // Don't render if not playing
  if (!isPlaying) return null;

  // Render path for measurement, but hide until we have the length
  const isReady = pathLength !== null;

  return (
    <svg
      key={animationKey}
      viewBox="0 0 1 1"
      width={size}
      height={size}
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: isReady ? 1 : 0,
      }}
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeOpacity={0.6} // Brighter than ghost (0.25)
        strokeLinecap="round"
        strokeLinejoin="round"
        style={
          isReady
            ? {
                strokeDasharray: pathLength,
                strokeDashoffset: pathLength,
                animation: `draw-stroke ${duration}ms ease-in-out forwards`,
              }
            : undefined
        }
      />
    </svg>
  );
}
