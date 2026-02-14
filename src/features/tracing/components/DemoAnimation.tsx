import { useRef, useEffect, useState, useMemo } from 'react';

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
 * Splits multi-stroke paths into individual subpaths and animates
 * them sequentially (one stroke at a time) like a real pen.
 */
export function DemoAnimation({
  path,
  size,
  isPlaying,
  onComplete,
  duration = 1500,
  strokeColor = '#9333ea', // Purple-600
  strokeWidth = 0.08,
}: DemoAnimationProps) {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [strokeLengths, setStrokeLengths] = useState<number[] | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Split path into individual strokes (each subpath starts with M)
  const strokes = useMemo(() => {
    return path
      .split(/(?=M\s)/i)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [path]);

  // Reset when path changes
  useEffect(() => {
    setStrokeLengths(null);
    pathRefs.current = [];
    setAnimationKey((k) => k + 1);
  }, [path]);

  // Measure each stroke's length after paths render
  useEffect(() => {
    if (strokeLengths !== null || !isPlaying) return;

    const raf = requestAnimationFrame(() => {
      const lengths = strokes.map((_, i) => {
        const el = pathRefs.current[i];
        return el ? el.getTotalLength() : 0;
      });

      if (lengths.length > 0 && lengths.every((l) => l > 0)) {
        setStrokeLengths(lengths);
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [isPlaying, strokes, strokeLengths]);

  // Fire onComplete after all strokes finish
  useEffect(() => {
    if (!isPlaying || strokeLengths === null) return;

    const timer = setTimeout(() => {
      onComplete();
    }, duration + 200);

    return () => clearTimeout(timer);
  }, [isPlaying, strokeLengths, duration, onComplete]);

  if (!isPlaying) return null;

  const isReady = strokeLengths !== null;
  const perStrokeDuration = isReady ? duration / strokes.length : 0;

  return (
    <svg
      key={animationKey}
      viewBox="0 0 1 1"
      width={size}
      height={size}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: isReady ? 1 : 0 }}
      aria-hidden="true"
    >
      {strokes.map((d, i) => (
        <path
          key={i}
          ref={(el) => {
            pathRefs.current[i] = el;
          }}
          d={d}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeOpacity={0.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={
            isReady
              ? {
                  strokeDasharray: strokeLengths![i],
                  strokeDashoffset: strokeLengths![i],
                  animation: `draw-stroke ${perStrokeDuration}ms ease-in-out ${i * perStrokeDuration}ms forwards`,
                }
              : undefined
          }
        />
      ))}
    </svg>
  );
}
