import type { TracingItem } from '../types';

/**
 * Uppercase letters A-Z with guide dots for tracing.
 * Each letter uses normalized 0-1 coordinates.
 * Guide dots follow natural handwriting stroke order for educational correctness.
 *
 * Difficulty ratings:
 * 1 = Simple (mostly straight lines: I, L, T, etc.)
 * 2 = Medium (diagonals or curves: A, C, S, etc.)
 * 3 = Complex (multiple strokes or intricate curves: M, W, B, etc.)
 */

export const letterA: TracingItem = {
  id: 'letter-a',
  category: 'letter',
  label: 'A',
  path: 'M 0.5 0.15 L 0.2 0.85 M 0.5 0.15 L 0.8 0.85 M 0.3 0.55 L 0.7 0.55',
  guideDots: [
    { x: 0.5, y: 0.15 },
    { x: 0.35, y: 0.5 },
    { x: 0.2, y: 0.85 },
    { x: 0.5, y: 0.15 },
    { x: 0.65, y: 0.5 },
    { x: 0.8, y: 0.85 },
    { x: 0.3, y: 0.55 },
    { x: 0.5, y: 0.55 },
    { x: 0.7, y: 0.55 },
  ],
  difficulty: 2,
};

export const letterB: TracingItem = {
  id: 'letter-b',
  category: 'letter',
  label: 'B',
  path: 'M 0.25 0.15 L 0.25 0.85 M 0.25 0.15 L 0.6 0.15 Q 0.8 0.15 0.8 0.35 Q 0.8 0.5 0.6 0.5 L 0.25 0.5 M 0.25 0.5 L 0.65 0.5 Q 0.85 0.5 0.85 0.675 Q 0.85 0.85 0.65 0.85 L 0.25 0.85',
  guideDots: [
    // Vertical stroke
    { x: 0.25, y: 0.15 },
    { x: 0.25, y: 0.35 },
    { x: 0.25, y: 0.5 },
    { x: 0.25, y: 0.675 },
    { x: 0.25, y: 0.85 },
    // Top bump
    { x: 0.4, y: 0.15 },
    { x: 0.6, y: 0.15 },
    { x: 0.75, y: 0.25 },
    { x: 0.75, y: 0.35 },
    { x: 0.6, y: 0.5 },
    // Bottom bump
    { x: 0.45, y: 0.5 },
    { x: 0.65, y: 0.5 },
    { x: 0.8, y: 0.6 },
    { x: 0.8, y: 0.75 },
    { x: 0.65, y: 0.85 },
    { x: 0.45, y: 0.85 },
  ],
  difficulty: 3,
};

export const letterC: TracingItem = {
  id: 'letter-c',
  category: 'letter',
  label: 'C',
  path: 'M 0.8 0.25 Q 0.8 0.15 0.5 0.15 Q 0.2 0.15 0.2 0.5 Q 0.2 0.85 0.5 0.85 Q 0.8 0.85 0.8 0.75',
  guideDots: [
    { x: 0.75, y: 0.22 },
    { x: 0.6, y: 0.15 },
    { x: 0.5, y: 0.15 },
    { x: 0.35, y: 0.18 },
    { x: 0.22, y: 0.3 },
    { x: 0.2, y: 0.5 },
    { x: 0.22, y: 0.7 },
    { x: 0.35, y: 0.82 },
    { x: 0.5, y: 0.85 },
    { x: 0.6, y: 0.85 },
    { x: 0.75, y: 0.78 },
  ],
  difficulty: 2,
};

export const letterD: TracingItem = {
  id: 'letter-d',
  category: 'letter',
  label: 'D',
  path: 'M 0.25 0.15 L 0.25 0.85 M 0.25 0.15 L 0.5 0.15 Q 0.8 0.15 0.8 0.5 Q 0.8 0.85 0.5 0.85 L 0.25 0.85',
  guideDots: [
    // Vertical stroke
    { x: 0.25, y: 0.15 },
    { x: 0.25, y: 0.35 },
    { x: 0.25, y: 0.5 },
    { x: 0.25, y: 0.65 },
    { x: 0.25, y: 0.85 },
    // Curve
    { x: 0.4, y: 0.15 },
    { x: 0.55, y: 0.15 },
    { x: 0.72, y: 0.25 },
    { x: 0.78, y: 0.4 },
    { x: 0.78, y: 0.5 },
    { x: 0.78, y: 0.6 },
    { x: 0.72, y: 0.75 },
    { x: 0.55, y: 0.85 },
    { x: 0.4, y: 0.85 },
  ],
  difficulty: 2,
};

export const letterE: TracingItem = {
  id: 'letter-e',
  category: 'letter',
  label: 'E',
  path: 'M 0.75 0.15 L 0.25 0.15 L 0.25 0.85 L 0.75 0.85 M 0.25 0.5 L 0.65 0.5',
  guideDots: [
    // Top horizontal
    { x: 0.75, y: 0.15 },
    { x: 0.5, y: 0.15 },
    { x: 0.25, y: 0.15 },
    // Vertical
    { x: 0.25, y: 0.35 },
    { x: 0.25, y: 0.5 },
    { x: 0.25, y: 0.65 },
    { x: 0.25, y: 0.85 },
    // Bottom horizontal
    { x: 0.5, y: 0.85 },
    { x: 0.75, y: 0.85 },
    // Middle horizontal
    { x: 0.25, y: 0.5 },
    { x: 0.45, y: 0.5 },
    { x: 0.65, y: 0.5 },
  ],
  difficulty: 1,
};

export const letterF: TracingItem = {
  id: 'letter-f',
  category: 'letter',
  label: 'F',
  path: 'M 0.75 0.15 L 0.25 0.15 L 0.25 0.85 M 0.25 0.5 L 0.65 0.5',
  guideDots: [
    // Top horizontal
    { x: 0.75, y: 0.15 },
    { x: 0.5, y: 0.15 },
    { x: 0.25, y: 0.15 },
    // Vertical
    { x: 0.25, y: 0.35 },
    { x: 0.25, y: 0.5 },
    { x: 0.25, y: 0.65 },
    { x: 0.25, y: 0.85 },
    // Middle horizontal
    { x: 0.25, y: 0.5 },
    { x: 0.45, y: 0.5 },
    { x: 0.65, y: 0.5 },
  ],
  difficulty: 1,
};

export const letterG: TracingItem = {
  id: 'letter-g',
  category: 'letter',
  label: 'G',
  path: 'M 0.8 0.25 Q 0.8 0.15 0.5 0.15 Q 0.2 0.15 0.2 0.5 Q 0.2 0.85 0.5 0.85 Q 0.8 0.85 0.8 0.55 L 0.55 0.55',
  guideDots: [
    { x: 0.75, y: 0.22 },
    { x: 0.6, y: 0.15 },
    { x: 0.5, y: 0.15 },
    { x: 0.35, y: 0.18 },
    { x: 0.22, y: 0.3 },
    { x: 0.2, y: 0.5 },
    { x: 0.22, y: 0.7 },
    { x: 0.35, y: 0.82 },
    { x: 0.5, y: 0.85 },
    { x: 0.65, y: 0.82 },
    { x: 0.78, y: 0.7 },
    { x: 0.78, y: 0.55 },
    { x: 0.65, y: 0.55 },
    { x: 0.55, y: 0.55 },
  ],
  difficulty: 3,
};

export const letterH: TracingItem = {
  id: 'letter-h',
  category: 'letter',
  label: 'H',
  path: 'M 0.25 0.15 L 0.25 0.85 M 0.75 0.15 L 0.75 0.85 M 0.25 0.5 L 0.75 0.5',
  guideDots: [
    // Left vertical
    { x: 0.25, y: 0.15 },
    { x: 0.25, y: 0.35 },
    { x: 0.25, y: 0.5 },
    { x: 0.25, y: 0.65 },
    { x: 0.25, y: 0.85 },
    // Right vertical
    { x: 0.75, y: 0.15 },
    { x: 0.75, y: 0.35 },
    { x: 0.75, y: 0.5 },
    { x: 0.75, y: 0.65 },
    { x: 0.75, y: 0.85 },
    // Horizontal
    { x: 0.25, y: 0.5 },
    { x: 0.5, y: 0.5 },
    { x: 0.75, y: 0.5 },
  ],
  difficulty: 1,
};

export const letterI: TracingItem = {
  id: 'letter-i',
  category: 'letter',
  label: 'I',
  path: 'M 0.35 0.15 L 0.65 0.15 M 0.5 0.15 L 0.5 0.85 M 0.35 0.85 L 0.65 0.85',
  guideDots: [
    // Top serif
    { x: 0.35, y: 0.15 },
    { x: 0.5, y: 0.15 },
    { x: 0.65, y: 0.15 },
    // Vertical
    { x: 0.5, y: 0.3 },
    { x: 0.5, y: 0.5 },
    { x: 0.5, y: 0.7 },
    { x: 0.5, y: 0.85 },
    // Bottom serif
    { x: 0.35, y: 0.85 },
    { x: 0.65, y: 0.85 },
  ],
  difficulty: 1,
};

export const letterJ: TracingItem = {
  id: 'letter-j',
  category: 'letter',
  label: 'J',
  path: 'M 0.35 0.15 L 0.75 0.15 M 0.6 0.15 L 0.6 0.7 Q 0.6 0.85 0.45 0.85 Q 0.25 0.85 0.25 0.7',
  guideDots: [
    // Top serif
    { x: 0.35, y: 0.15 },
    { x: 0.5, y: 0.15 },
    { x: 0.6, y: 0.15 },
    { x: 0.75, y: 0.15 },
    // Vertical
    { x: 0.6, y: 0.3 },
    { x: 0.6, y: 0.5 },
    { x: 0.6, y: 0.7 },
    // Hook
    { x: 0.55, y: 0.8 },
    { x: 0.45, y: 0.85 },
    { x: 0.35, y: 0.8 },
    { x: 0.28, y: 0.7 },
  ],
  difficulty: 2,
};

export const letterK: TracingItem = {
  id: 'letter-k',
  category: 'letter',
  label: 'K',
  path: 'M 0.25 0.15 L 0.25 0.85 M 0.75 0.15 L 0.25 0.5 L 0.75 0.85',
  guideDots: [
    // Vertical
    { x: 0.25, y: 0.15 },
    { x: 0.25, y: 0.35 },
    { x: 0.25, y: 0.5 },
    { x: 0.25, y: 0.65 },
    { x: 0.25, y: 0.85 },
    // Upper diagonal
    { x: 0.75, y: 0.15 },
    { x: 0.55, y: 0.3 },
    { x: 0.35, y: 0.45 },
    { x: 0.25, y: 0.5 },
    // Lower diagonal
    { x: 0.35, y: 0.55 },
    { x: 0.55, y: 0.7 },
    { x: 0.75, y: 0.85 },
  ],
  difficulty: 2,
};

export const letterL: TracingItem = {
  id: 'letter-l',
  category: 'letter',
  label: 'L',
  path: 'M 0.25 0.15 L 0.25 0.85 L 0.75 0.85',
  guideDots: [
    // Vertical
    { x: 0.25, y: 0.15 },
    { x: 0.25, y: 0.35 },
    { x: 0.25, y: 0.5 },
    { x: 0.25, y: 0.65 },
    { x: 0.25, y: 0.85 },
    // Horizontal
    { x: 0.4, y: 0.85 },
    { x: 0.55, y: 0.85 },
    { x: 0.75, y: 0.85 },
  ],
  difficulty: 1,
};

export const letterM: TracingItem = {
  id: 'letter-m',
  category: 'letter',
  label: 'M',
  path: 'M 0.15 0.85 L 0.15 0.15 L 0.5 0.55 L 0.85 0.15 L 0.85 0.85',
  guideDots: [
    // Left vertical up
    { x: 0.15, y: 0.85 },
    { x: 0.15, y: 0.65 },
    { x: 0.15, y: 0.45 },
    { x: 0.15, y: 0.25 },
    { x: 0.15, y: 0.15 },
    // Left diagonal down
    { x: 0.25, y: 0.25 },
    { x: 0.35, y: 0.4 },
    { x: 0.5, y: 0.55 },
    // Right diagonal up
    { x: 0.65, y: 0.4 },
    { x: 0.75, y: 0.25 },
    { x: 0.85, y: 0.15 },
    // Right vertical down
    { x: 0.85, y: 0.35 },
    { x: 0.85, y: 0.55 },
    { x: 0.85, y: 0.75 },
    { x: 0.85, y: 0.85 },
  ],
  difficulty: 3,
};

export const letterN: TracingItem = {
  id: 'letter-n',
  category: 'letter',
  label: 'N',
  path: 'M 0.2 0.85 L 0.2 0.15 L 0.8 0.85 L 0.8 0.15',
  guideDots: [
    // Left vertical up
    { x: 0.2, y: 0.85 },
    { x: 0.2, y: 0.65 },
    { x: 0.2, y: 0.45 },
    { x: 0.2, y: 0.25 },
    { x: 0.2, y: 0.15 },
    // Diagonal down
    { x: 0.35, y: 0.35 },
    { x: 0.5, y: 0.5 },
    { x: 0.65, y: 0.65 },
    { x: 0.8, y: 0.85 },
    // Right vertical up
    { x: 0.8, y: 0.65 },
    { x: 0.8, y: 0.45 },
    { x: 0.8, y: 0.25 },
    { x: 0.8, y: 0.15 },
  ],
  difficulty: 2,
};

export const letterO: TracingItem = {
  id: 'letter-o',
  category: 'letter',
  label: 'O',
  path: 'M 0.5 0.15 Q 0.8 0.15 0.8 0.5 Q 0.8 0.85 0.5 0.85 Q 0.2 0.85 0.2 0.5 Q 0.2 0.15 0.5 0.15',
  guideDots: [
    { x: 0.5, y: 0.15 },
    { x: 0.65, y: 0.18 },
    { x: 0.78, y: 0.3 },
    { x: 0.8, y: 0.5 },
    { x: 0.78, y: 0.7 },
    { x: 0.65, y: 0.82 },
    { x: 0.5, y: 0.85 },
    { x: 0.35, y: 0.82 },
    { x: 0.22, y: 0.7 },
    { x: 0.2, y: 0.5 },
    { x: 0.22, y: 0.3 },
    { x: 0.35, y: 0.18 },
  ],
  difficulty: 2,
};

export const letterP: TracingItem = {
  id: 'letter-p',
  category: 'letter',
  label: 'P',
  path: 'M 0.25 0.85 L 0.25 0.15 L 0.6 0.15 Q 0.8 0.15 0.8 0.35 Q 0.8 0.55 0.6 0.55 L 0.25 0.55',
  guideDots: [
    // Vertical
    { x: 0.25, y: 0.85 },
    { x: 0.25, y: 0.65 },
    { x: 0.25, y: 0.45 },
    { x: 0.25, y: 0.25 },
    { x: 0.25, y: 0.15 },
    // Top curve
    { x: 0.4, y: 0.15 },
    { x: 0.6, y: 0.15 },
    { x: 0.75, y: 0.22 },
    { x: 0.78, y: 0.35 },
    { x: 0.75, y: 0.48 },
    { x: 0.6, y: 0.55 },
    { x: 0.4, y: 0.55 },
  ],
  difficulty: 2,
};

export const letterQ: TracingItem = {
  id: 'letter-q',
  category: 'letter',
  label: 'Q',
  path: 'M 0.5 0.15 Q 0.8 0.15 0.8 0.5 Q 0.8 0.85 0.5 0.85 Q 0.2 0.85 0.2 0.5 Q 0.2 0.15 0.5 0.15 M 0.55 0.65 L 0.8 0.9',
  guideDots: [
    // Circle
    { x: 0.5, y: 0.15 },
    { x: 0.65, y: 0.18 },
    { x: 0.78, y: 0.3 },
    { x: 0.8, y: 0.5 },
    { x: 0.78, y: 0.7 },
    { x: 0.65, y: 0.82 },
    { x: 0.5, y: 0.85 },
    { x: 0.35, y: 0.82 },
    { x: 0.22, y: 0.7 },
    { x: 0.2, y: 0.5 },
    { x: 0.22, y: 0.3 },
    { x: 0.35, y: 0.18 },
    // Tail
    { x: 0.55, y: 0.65 },
    { x: 0.65, y: 0.75 },
    { x: 0.8, y: 0.9 },
  ],
  difficulty: 3,
};

export const letterR: TracingItem = {
  id: 'letter-r',
  category: 'letter',
  label: 'R',
  path: 'M 0.25 0.85 L 0.25 0.15 L 0.6 0.15 Q 0.8 0.15 0.8 0.35 Q 0.8 0.55 0.6 0.55 L 0.25 0.55 M 0.5 0.55 L 0.8 0.85',
  guideDots: [
    // Vertical
    { x: 0.25, y: 0.85 },
    { x: 0.25, y: 0.65 },
    { x: 0.25, y: 0.45 },
    { x: 0.25, y: 0.25 },
    { x: 0.25, y: 0.15 },
    // Top curve
    { x: 0.4, y: 0.15 },
    { x: 0.6, y: 0.15 },
    { x: 0.75, y: 0.22 },
    { x: 0.78, y: 0.35 },
    { x: 0.75, y: 0.48 },
    { x: 0.6, y: 0.55 },
    { x: 0.4, y: 0.55 },
    // Leg
    { x: 0.5, y: 0.55 },
    { x: 0.6, y: 0.65 },
    { x: 0.7, y: 0.75 },
    { x: 0.8, y: 0.85 },
  ],
  difficulty: 3,
};

export const letterS: TracingItem = {
  id: 'letter-s',
  category: 'letter',
  label: 'S',
  path: 'M 0.75 0.25 Q 0.75 0.15 0.5 0.15 Q 0.25 0.15 0.25 0.35 Q 0.25 0.5 0.5 0.5 Q 0.75 0.5 0.75 0.65 Q 0.75 0.85 0.5 0.85 Q 0.25 0.85 0.25 0.75',
  guideDots: [
    { x: 0.72, y: 0.22 },
    { x: 0.6, y: 0.15 },
    { x: 0.5, y: 0.15 },
    { x: 0.38, y: 0.18 },
    { x: 0.28, y: 0.28 },
    { x: 0.28, y: 0.38 },
    { x: 0.38, y: 0.48 },
    { x: 0.5, y: 0.5 },
    { x: 0.62, y: 0.52 },
    { x: 0.72, y: 0.62 },
    { x: 0.72, y: 0.72 },
    { x: 0.62, y: 0.82 },
    { x: 0.5, y: 0.85 },
    { x: 0.38, y: 0.82 },
    { x: 0.28, y: 0.75 },
  ],
  difficulty: 3,
};

export const letterT: TracingItem = {
  id: 'letter-t',
  category: 'letter',
  label: 'T',
  path: 'M 0.2 0.15 L 0.8 0.15 M 0.5 0.15 L 0.5 0.85',
  guideDots: [
    // Top horizontal
    { x: 0.2, y: 0.15 },
    { x: 0.35, y: 0.15 },
    { x: 0.5, y: 0.15 },
    { x: 0.65, y: 0.15 },
    { x: 0.8, y: 0.15 },
    // Vertical
    { x: 0.5, y: 0.3 },
    { x: 0.5, y: 0.45 },
    { x: 0.5, y: 0.6 },
    { x: 0.5, y: 0.75 },
    { x: 0.5, y: 0.85 },
  ],
  difficulty: 1,
};

export const letterU: TracingItem = {
  id: 'letter-u',
  category: 'letter',
  label: 'U',
  path: 'M 0.2 0.15 L 0.2 0.65 Q 0.2 0.85 0.5 0.85 Q 0.8 0.85 0.8 0.65 L 0.8 0.15',
  guideDots: [
    // Left side down
    { x: 0.2, y: 0.15 },
    { x: 0.2, y: 0.3 },
    { x: 0.2, y: 0.45 },
    { x: 0.2, y: 0.6 },
    { x: 0.2, y: 0.72 },
    // Bottom curve
    { x: 0.3, y: 0.82 },
    { x: 0.5, y: 0.85 },
    { x: 0.7, y: 0.82 },
    // Right side up
    { x: 0.8, y: 0.72 },
    { x: 0.8, y: 0.6 },
    { x: 0.8, y: 0.45 },
    { x: 0.8, y: 0.3 },
    { x: 0.8, y: 0.15 },
  ],
  difficulty: 2,
};

export const letterV: TracingItem = {
  id: 'letter-v',
  category: 'letter',
  label: 'V',
  path: 'M 0.15 0.15 L 0.5 0.85 L 0.85 0.15',
  guideDots: [
    // Left diagonal down
    { x: 0.15, y: 0.15 },
    { x: 0.25, y: 0.35 },
    { x: 0.35, y: 0.55 },
    { x: 0.45, y: 0.75 },
    { x: 0.5, y: 0.85 },
    // Right diagonal up
    { x: 0.55, y: 0.75 },
    { x: 0.65, y: 0.55 },
    { x: 0.75, y: 0.35 },
    { x: 0.85, y: 0.15 },
  ],
  difficulty: 2,
};

export const letterW: TracingItem = {
  id: 'letter-w',
  category: 'letter',
  label: 'W',
  path: 'M 0.1 0.15 L 0.3 0.85 L 0.5 0.45 L 0.7 0.85 L 0.9 0.15',
  guideDots: [
    // First stroke down
    { x: 0.1, y: 0.15 },
    { x: 0.15, y: 0.35 },
    { x: 0.22, y: 0.55 },
    { x: 0.28, y: 0.75 },
    { x: 0.3, y: 0.85 },
    // Second stroke up to middle
    { x: 0.35, y: 0.7 },
    { x: 0.42, y: 0.55 },
    { x: 0.5, y: 0.45 },
    // Third stroke down
    { x: 0.58, y: 0.55 },
    { x: 0.65, y: 0.7 },
    { x: 0.7, y: 0.85 },
    // Fourth stroke up
    { x: 0.75, y: 0.7 },
    { x: 0.82, y: 0.45 },
    { x: 0.9, y: 0.15 },
  ],
  difficulty: 3,
};

export const letterX: TracingItem = {
  id: 'letter-x',
  category: 'letter',
  label: 'X',
  path: 'M 0.2 0.15 L 0.8 0.85 M 0.8 0.15 L 0.2 0.85',
  guideDots: [
    // First diagonal
    { x: 0.2, y: 0.15 },
    { x: 0.35, y: 0.32 },
    { x: 0.5, y: 0.5 },
    { x: 0.65, y: 0.68 },
    { x: 0.8, y: 0.85 },
    // Second diagonal
    { x: 0.8, y: 0.15 },
    { x: 0.65, y: 0.32 },
    { x: 0.5, y: 0.5 },
    { x: 0.35, y: 0.68 },
    { x: 0.2, y: 0.85 },
  ],
  difficulty: 2,
};

export const letterY: TracingItem = {
  id: 'letter-y',
  category: 'letter',
  label: 'Y',
  path: 'M 0.2 0.15 L 0.5 0.5 L 0.8 0.15 M 0.5 0.5 L 0.5 0.85',
  guideDots: [
    // Left diagonal
    { x: 0.2, y: 0.15 },
    { x: 0.3, y: 0.27 },
    { x: 0.4, y: 0.38 },
    { x: 0.5, y: 0.5 },
    // Right diagonal
    { x: 0.6, y: 0.38 },
    { x: 0.7, y: 0.27 },
    { x: 0.8, y: 0.15 },
    // Vertical down
    { x: 0.5, y: 0.6 },
    { x: 0.5, y: 0.72 },
    { x: 0.5, y: 0.85 },
  ],
  difficulty: 2,
};

export const letterZ: TracingItem = {
  id: 'letter-z',
  category: 'letter',
  label: 'Z',
  path: 'M 0.2 0.15 L 0.8 0.15 L 0.2 0.85 L 0.8 0.85',
  guideDots: [
    // Top horizontal
    { x: 0.2, y: 0.15 },
    { x: 0.4, y: 0.15 },
    { x: 0.6, y: 0.15 },
    { x: 0.8, y: 0.15 },
    // Diagonal
    { x: 0.65, y: 0.32 },
    { x: 0.5, y: 0.5 },
    { x: 0.35, y: 0.68 },
    { x: 0.2, y: 0.85 },
    // Bottom horizontal
    { x: 0.4, y: 0.85 },
    { x: 0.6, y: 0.85 },
    { x: 0.8, y: 0.85 },
  ],
  difficulty: 2,
};

/**
 * All 26 uppercase letters in alphabetical order.
 * Ready to use in the tracing application.
 */
export const letters: TracingItem[] = [
  letterA,
  letterB,
  letterC,
  letterD,
  letterE,
  letterF,
  letterG,
  letterH,
  letterI,
  letterJ,
  letterK,
  letterL,
  letterM,
  letterN,
  letterO,
  letterP,
  letterQ,
  letterR,
  letterS,
  letterT,
  letterU,
  letterV,
  letterW,
  letterX,
  letterY,
  letterZ,
];
