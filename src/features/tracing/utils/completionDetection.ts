import type { Point } from '../../../types';

/** Hit radius as percentage of canvas (12% = forgiving for small fingers) */
export const HIT_RADIUS = 0.12;

/** Minimum coverage required for completion (99%) */
export const COMPLETION_THRESHOLD = 0.99;

/** Minimum forward progressions required to prevent scribbling */
export const MIN_FORWARD_PROGRESSIONS = 2;

/** How many positions ahead counts as "forward" */
export const FORWARD_TOLERANCE = 3;

/**
 * Calculate Euclidean distance between two points
 */
export function distance(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Check if a dot is hit by any point in the stroke
 */
export function isDotHit(
  dot: Point,
  strokePoints: Point[],
  radius: number = HIT_RADIUS
): boolean {
  return strokePoints.some((point) => distance(dot, point) <= radius);
}

/**
 * Calculate which dots have been hit by the strokes
 */
export function calculateHitDots(
  dots: Point[],
  strokes: Point[][],
  radius: number = HIT_RADIUS
): Set<number> {
  const hitDots = new Set<number>();
  const allPoints = strokes.flat();

  dots.forEach((dot, index) => {
    if (isDotHit(dot, allPoints, radius)) {
      hitDots.add(index);
    }
  });

  return hitDots;
}

/**
 * Calculate coverage percentage (0-1)
 */
export function calculateCoverage(hitDots: Set<number>, totalDots: number): number {
  if (totalDots === 0) return 0;
  return hitDots.size / totalDots;
}

/**
 * Track the order in which dots were hit for sequence validation.
 * Returns the dot indices in the order they were first hit.
 */
export function getHitOrder(
  dots: Point[],
  strokes: Point[][],
  radius: number = HIT_RADIUS
): number[] {
  const hitOrder: number[] = [];
  const alreadyHit = new Set<number>();

  for (const stroke of strokes) {
    for (const point of stroke) {
      dots.forEach((dot, index) => {
        if (!alreadyHit.has(index) && distance(dot, point) <= radius) {
          hitOrder.push(index);
          alreadyHit.add(index);
        }
      });
    }
  }

  return hitOrder;
}

/**
 * Count forward progressions in the hit order.
 * A forward progression is when a dot is hit within FORWARD_TOLERANCE
 * positions ahead of the previous hit.
 */
export function countForwardProgressions(
  hitOrder: number[],
  tolerance: number = FORWARD_TOLERANCE
): number {
  if (hitOrder.length < 2) return 0;

  let progressions = 0;
  for (let i = 1; i < hitOrder.length; i++) {
    const diff = hitOrder[i] - hitOrder[i - 1];
    // Forward progression: moving to a nearby higher index
    if (diff > 0 && diff <= tolerance) {
      progressions++;
    }
  }

  return progressions;
}

/**
 * Check if the tracing follows a valid sequence (anti-scribble check)
 */
export function isValidSequence(
  hitOrder: number[],
  minProgressions: number = MIN_FORWARD_PROGRESSIONS
): boolean {
  return countForwardProgressions(hitOrder) >= minProgressions;
}

/**
 * Full completion check: coverage threshold + sequence validation
 */
export function isComplete(
  dots: Point[],
  strokes: Point[][],
  coverageThreshold: number = COMPLETION_THRESHOLD,
  radius: number = HIT_RADIUS
): { complete: boolean; coverage: number; hitDots: Set<number>; validSequence: boolean } {
  const hitDots = calculateHitDots(dots, strokes, radius);
  const coverage = calculateCoverage(hitDots, dots.length);
  const hitOrder = getHitOrder(dots, strokes, radius);
  const validSequence = isValidSequence(hitOrder);

  return {
    complete: coverage >= coverageThreshold && validSequence,
    coverage,
    hitDots,
    validSequence,
  };
}
