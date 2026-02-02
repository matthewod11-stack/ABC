import type { TracingItem } from '../types';

/**
 * Test letter "A" with guide dots for Phase 1 validation.
 * Path uses normalized 0-1 coordinates.
 * Guide dots follow the natural stroke order for writing "A":
 * 1. Left diagonal down
 * 2. Right diagonal down
 * 3. Horizontal crossbar
 */
export const letterA: TracingItem = {
  id: 'letter-a',
  category: 'letter',
  label: 'A',
  // SVG path: left stroke, right stroke, crossbar
  path: 'M 0.5 0.15 L 0.2 0.85 M 0.5 0.15 L 0.8 0.85 M 0.3 0.55 L 0.7 0.55',
  guideDots: [
    // Left diagonal stroke
    { x: 0.5, y: 0.15 },   // 0: Top apex
    { x: 0.35, y: 0.5 },   // 1: Left mid
    { x: 0.2, y: 0.85 },   // 2: Bottom left
    // Right diagonal stroke (back to top)
    { x: 0.5, y: 0.15 },   // 3: Top apex (restart)
    { x: 0.65, y: 0.5 },   // 4: Right mid
    { x: 0.8, y: 0.85 },   // 5: Bottom right
    // Crossbar
    { x: 0.3, y: 0.55 },   // 6: Crossbar left
    { x: 0.5, y: 0.55 },   // 7: Crossbar mid
    { x: 0.7, y: 0.55 },   // 8: Crossbar right
  ],
  difficulty: 2,
};

// Map for quick lookup by category and index
export const testTracingItems: Record<string, TracingItem[]> = {
  letter: [letterA],
  number: [],
  shape: [],
};
