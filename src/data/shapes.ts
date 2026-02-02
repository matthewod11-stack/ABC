import type { TracingItem } from '../types';

/**
 * Basic shapes with guide dots for tracing.
 * Each shape uses normalized 0-1 coordinates.
 * Guide dots follow natural drawing order.
 *
 * Shapes are ordered by difficulty:
 * 1 = Circle (continuous curve)
 * 2 = Square, Triangle (straight lines with turns)
 * 3 = Star, Heart (complex paths)
 */

export const shapeCircle: TracingItem = {
  id: 'shape-circle',
  category: 'shape',
  label: 'Circle',
  path: 'M 0.5 0.15 A 0.35 0.35 0 1 1 0.5 0.85 A 0.35 0.35 0 1 1 0.5 0.15',
  guideDots: [
    // Start at top, go clockwise
    { x: 0.5, y: 0.15 },
    { x: 0.65, y: 0.18 },
    { x: 0.78, y: 0.28 },
    { x: 0.85, y: 0.42 },
    { x: 0.85, y: 0.5 },
    { x: 0.85, y: 0.58 },
    { x: 0.78, y: 0.72 },
    { x: 0.65, y: 0.82 },
    { x: 0.5, y: 0.85 },
    { x: 0.35, y: 0.82 },
    { x: 0.22, y: 0.72 },
    { x: 0.15, y: 0.58 },
    { x: 0.15, y: 0.5 },
    { x: 0.15, y: 0.42 },
    { x: 0.22, y: 0.28 },
    { x: 0.35, y: 0.18 },
  ],
  difficulty: 1,
};

export const shapeSquare: TracingItem = {
  id: 'shape-square',
  category: 'shape',
  label: 'Square',
  path: 'M 0.2 0.2 L 0.8 0.2 L 0.8 0.8 L 0.2 0.8 Z',
  guideDots: [
    // Top edge (left to right)
    { x: 0.2, y: 0.2 },
    { x: 0.35, y: 0.2 },
    { x: 0.5, y: 0.2 },
    { x: 0.65, y: 0.2 },
    { x: 0.8, y: 0.2 },
    // Right edge (top to bottom)
    { x: 0.8, y: 0.35 },
    { x: 0.8, y: 0.5 },
    { x: 0.8, y: 0.65 },
    { x: 0.8, y: 0.8 },
    // Bottom edge (right to left)
    { x: 0.65, y: 0.8 },
    { x: 0.5, y: 0.8 },
    { x: 0.35, y: 0.8 },
    { x: 0.2, y: 0.8 },
    // Left edge (bottom to top)
    { x: 0.2, y: 0.65 },
    { x: 0.2, y: 0.5 },
    { x: 0.2, y: 0.35 },
  ],
  difficulty: 2,
};

export const shapeTriangle: TracingItem = {
  id: 'shape-triangle',
  category: 'shape',
  label: 'Triangle',
  path: 'M 0.5 0.15 L 0.85 0.85 L 0.15 0.85 Z',
  guideDots: [
    // Top to bottom-right
    { x: 0.5, y: 0.15 },
    { x: 0.57, y: 0.3 },
    { x: 0.64, y: 0.45 },
    { x: 0.71, y: 0.6 },
    { x: 0.78, y: 0.75 },
    { x: 0.85, y: 0.85 },
    // Bottom edge (right to left)
    { x: 0.7, y: 0.85 },
    { x: 0.55, y: 0.85 },
    { x: 0.4, y: 0.85 },
    { x: 0.25, y: 0.85 },
    { x: 0.15, y: 0.85 },
    // Bottom-left to top
    { x: 0.22, y: 0.7 },
    { x: 0.29, y: 0.55 },
    { x: 0.36, y: 0.4 },
    { x: 0.43, y: 0.27 },
  ],
  difficulty: 2,
};

export const shapeStar: TracingItem = {
  id: 'shape-star',
  category: 'shape',
  label: 'Star',
  // 5-point star drawn as continuous path
  path: 'M 0.5 0.1 L 0.61 0.4 L 0.95 0.4 L 0.68 0.58 L 0.79 0.9 L 0.5 0.7 L 0.21 0.9 L 0.32 0.58 L 0.05 0.4 L 0.39 0.4 Z',
  guideDots: [
    // Top point down to right
    { x: 0.5, y: 0.1 },
    { x: 0.55, y: 0.25 },
    { x: 0.61, y: 0.4 },
    // Across to right point
    { x: 0.72, y: 0.4 },
    { x: 0.83, y: 0.4 },
    { x: 0.95, y: 0.4 },
    // Down to right inner
    { x: 0.82, y: 0.48 },
    { x: 0.68, y: 0.58 },
    // Down to bottom right point
    { x: 0.73, y: 0.72 },
    { x: 0.79, y: 0.9 },
    // Up to center inner
    { x: 0.65, y: 0.8 },
    { x: 0.5, y: 0.7 },
    // Down to bottom left point
    { x: 0.35, y: 0.8 },
    { x: 0.21, y: 0.9 },
    // Up to left inner
    { x: 0.27, y: 0.72 },
    { x: 0.32, y: 0.58 },
    // Up to left point
    { x: 0.18, y: 0.48 },
    { x: 0.05, y: 0.4 },
    // Across to left inner
    { x: 0.17, y: 0.4 },
    { x: 0.28, y: 0.4 },
    { x: 0.39, y: 0.4 },
    // Back up to top
    { x: 0.45, y: 0.25 },
  ],
  difficulty: 3,
};

export const shapeHeart: TracingItem = {
  id: 'shape-heart',
  category: 'shape',
  label: 'Heart',
  // Heart shape: start at bottom point, go up left side, curve at top, down right side
  path: 'M 0.5 0.85 C 0.2 0.6 0.1 0.35 0.25 0.2 C 0.4 0.1 0.5 0.25 0.5 0.35 C 0.5 0.25 0.6 0.1 0.75 0.2 C 0.9 0.35 0.8 0.6 0.5 0.85',
  guideDots: [
    // Start at bottom point, go up left side
    { x: 0.5, y: 0.85 },
    { x: 0.4, y: 0.72 },
    { x: 0.28, y: 0.58 },
    { x: 0.18, y: 0.45 },
    { x: 0.15, y: 0.35 },
    { x: 0.18, y: 0.25 },
    // Left top curve
    { x: 0.25, y: 0.18 },
    { x: 0.35, y: 0.15 },
    { x: 0.42, y: 0.2 },
    { x: 0.48, y: 0.28 },
    // Center dip
    { x: 0.5, y: 0.35 },
    // Right top curve
    { x: 0.52, y: 0.28 },
    { x: 0.58, y: 0.2 },
    { x: 0.65, y: 0.15 },
    { x: 0.75, y: 0.18 },
    // Right side down
    { x: 0.82, y: 0.25 },
    { x: 0.85, y: 0.35 },
    { x: 0.82, y: 0.45 },
    { x: 0.72, y: 0.58 },
    { x: 0.6, y: 0.72 },
  ],
  difficulty: 3,
};

/**
 * All shapes in order of difficulty.
 * Ready to use in the tracing application.
 */
export const shapes: TracingItem[] = [
  shapeCircle,
  shapeSquare,
  shapeTriangle,
  shapeStar,
  shapeHeart,
];
