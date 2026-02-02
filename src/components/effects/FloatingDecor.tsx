import { useMemo } from 'react';
import { SparkleIcon, PawPrintIcon, CrownIcon } from '../icons';
import { useTracingStateOptional } from '../../hooks/useTracingState';

type DecorType = 'sparkle' | 'paw' | 'crown';

interface DecorItem {
  id: number;
  type: DecorType;
  size: number;
  x: number;
  y: number;
  delay: number;
  animation: 'float-slow' | 'float-drift';
  color: string;
}

const PRINCESS_COLORS = [
  'text-princess-pink',
  'text-princess-lavender',
  'text-princess-peach',
  'text-princess-gold',
];

/**
 * Generate deterministic floating decorations for screen edges.
 * Items are positioned to avoid the center tracing area.
 */
function generateDecorItems(count: number): DecorItem[] {
  const items: DecorItem[] = [];
  const types: DecorType[] = ['sparkle', 'paw', 'crown'];

  for (let i = 0; i < count; i++) {
    // Pseudo-random values based on index for consistency
    const seed = i * 17 + 7;
    const type = types[i % types.length];
    const size = 16 + (seed % 13); // 16-28px

    // Position at edges: left 5-15%, right 85-95%, top/bottom varied
    const isLeft = i % 2 === 0;
    const xBase = isLeft ? 3 + (seed % 12) : 85 + (seed % 12);
    const yBase = 10 + ((seed * 3) % 75);

    items.push({
      id: i,
      type,
      size,
      x: xBase,
      y: yBase,
      delay: (seed % 40) / 10, // 0-4s delay
      animation: i % 3 === 0 ? 'float-drift' : 'float-slow',
      color: PRINCESS_COLORS[i % PRINCESS_COLORS.length],
    });
  }

  return items;
}

const DECOR_ICONS: Record<DecorType, typeof SparkleIcon> = {
  sparkle: SparkleIcon,
  paw: PawPrintIcon,
  crown: CrownIcon,
};

interface FloatingDecorProps {
  count?: number;
}

/**
 * Ambient floating decorations at screen edges.
 * Automatically pauses (fades out) when user is actively tracing.
 * Uses CSS animations for GPU-accelerated, main-thread-free animation.
 */
export function FloatingDecor({ count = 10 }: FloatingDecorProps) {
  const tracingState = useTracingStateOptional();
  const isTracing = tracingState?.isTracing ?? false;

  const items = useMemo(() => generateDecorItems(count), [count]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{
        opacity: isTracing ? 0 : 1,
        transition: 'opacity 0.3s ease-out',
      }}
      aria-hidden="true"
    >
      {items.map((item) => {
        const Icon = DECOR_ICONS[item.type];
        return (
          <div
            key={item.id}
            className={`absolute ${item.color} animate-${item.animation}`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              animationDelay: `${item.delay}s`,
              opacity: 0.6,
            }}
          >
            <Icon size={item.size} />
          </div>
        );
      })}
    </div>
  );
}
