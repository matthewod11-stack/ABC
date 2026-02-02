import type { TracingItem } from '../types';

/**
 * Numbers 0-9 with guide dots for tracing.
 * Each number uses normalized 0-1 coordinates.
 * Guide dots follow natural handwriting stroke order.
 *
 * Numbers are ordered 1-9, then 0 for educational purposes
 * (children typically learn 1-9 before 0).
 */

export const number1: TracingItem = {
  id: 'number-1',
  category: 'number',
  label: '1',
  path: 'M 0.35 0.25 L 0.5 0.15 L 0.5 0.85 M 0.35 0.85 L 0.65 0.85',
  guideDots: [
    // Angled start
    { x: 0.35, y: 0.25 },
    { x: 0.42, y: 0.2 },
    { x: 0.5, y: 0.15 },
    // Vertical
    { x: 0.5, y: 0.3 },
    { x: 0.5, y: 0.45 },
    { x: 0.5, y: 0.6 },
    { x: 0.5, y: 0.75 },
    { x: 0.5, y: 0.85 },
    // Base
    { x: 0.35, y: 0.85 },
    { x: 0.65, y: 0.85 },
  ],
  difficulty: 1,
};

export const number2: TracingItem = {
  id: 'number-2',
  category: 'number',
  label: '2',
  path: 'M 0.25 0.3 Q 0.25 0.15 0.5 0.15 Q 0.75 0.15 0.75 0.35 Q 0.75 0.5 0.25 0.85 L 0.75 0.85',
  guideDots: [
    { x: 0.28, y: 0.3 },
    { x: 0.32, y: 0.2 },
    { x: 0.42, y: 0.15 },
    { x: 0.5, y: 0.15 },
    { x: 0.6, y: 0.15 },
    { x: 0.7, y: 0.22 },
    { x: 0.73, y: 0.32 },
    { x: 0.7, y: 0.42 },
    { x: 0.6, y: 0.52 },
    { x: 0.45, y: 0.65 },
    { x: 0.32, y: 0.78 },
    { x: 0.25, y: 0.85 },
    { x: 0.45, y: 0.85 },
    { x: 0.6, y: 0.85 },
    { x: 0.75, y: 0.85 },
  ],
  difficulty: 2,
};

export const number3: TracingItem = {
  id: 'number-3',
  category: 'number',
  label: '3',
  path: 'M 0.25 0.2 Q 0.25 0.15 0.5 0.15 Q 0.75 0.15 0.75 0.32 Q 0.75 0.5 0.5 0.5 Q 0.75 0.5 0.75 0.68 Q 0.75 0.85 0.5 0.85 Q 0.25 0.85 0.25 0.8',
  guideDots: [
    { x: 0.28, y: 0.2 },
    { x: 0.38, y: 0.15 },
    { x: 0.5, y: 0.15 },
    { x: 0.62, y: 0.17 },
    { x: 0.72, y: 0.25 },
    { x: 0.72, y: 0.35 },
    { x: 0.65, y: 0.45 },
    { x: 0.5, y: 0.5 },
    { x: 0.65, y: 0.55 },
    { x: 0.72, y: 0.65 },
    { x: 0.72, y: 0.75 },
    { x: 0.62, y: 0.83 },
    { x: 0.5, y: 0.85 },
    { x: 0.38, y: 0.83 },
    { x: 0.28, y: 0.78 },
  ],
  difficulty: 3,
};

export const number4: TracingItem = {
  id: 'number-4',
  category: 'number',
  label: '4',
  path: 'M 0.6 0.85 L 0.6 0.15 L 0.2 0.6 L 0.8 0.6',
  guideDots: [
    // Vertical down then up to start
    { x: 0.6, y: 0.85 },
    { x: 0.6, y: 0.7 },
    { x: 0.6, y: 0.55 },
    { x: 0.6, y: 0.4 },
    { x: 0.6, y: 0.25 },
    { x: 0.6, y: 0.15 },
    // Diagonal
    { x: 0.5, y: 0.27 },
    { x: 0.4, y: 0.4 },
    { x: 0.3, y: 0.5 },
    { x: 0.2, y: 0.6 },
    // Horizontal
    { x: 0.35, y: 0.6 },
    { x: 0.5, y: 0.6 },
    { x: 0.65, y: 0.6 },
    { x: 0.8, y: 0.6 },
  ],
  difficulty: 2,
};

export const number5: TracingItem = {
  id: 'number-5',
  category: 'number',
  label: '5',
  path: 'M 0.7 0.15 L 0.3 0.15 L 0.3 0.45 Q 0.3 0.45 0.5 0.45 Q 0.75 0.45 0.75 0.65 Q 0.75 0.85 0.5 0.85 Q 0.25 0.85 0.25 0.75',
  guideDots: [
    // Top horizontal
    { x: 0.7, y: 0.15 },
    { x: 0.55, y: 0.15 },
    { x: 0.4, y: 0.15 },
    { x: 0.3, y: 0.15 },
    // Vertical
    { x: 0.3, y: 0.25 },
    { x: 0.3, y: 0.35 },
    { x: 0.3, y: 0.45 },
    // Curve
    { x: 0.42, y: 0.45 },
    { x: 0.55, y: 0.47 },
    { x: 0.68, y: 0.52 },
    { x: 0.73, y: 0.62 },
    { x: 0.73, y: 0.72 },
    { x: 0.65, y: 0.82 },
    { x: 0.5, y: 0.85 },
    { x: 0.35, y: 0.82 },
    { x: 0.27, y: 0.75 },
  ],
  difficulty: 2,
};

export const number6: TracingItem = {
  id: 'number-6',
  category: 'number',
  label: '6',
  path: 'M 0.65 0.2 Q 0.5 0.15 0.35 0.2 Q 0.2 0.3 0.2 0.5 Q 0.2 0.85 0.5 0.85 Q 0.8 0.85 0.8 0.65 Q 0.8 0.45 0.5 0.45 Q 0.2 0.45 0.2 0.55',
  guideDots: [
    { x: 0.65, y: 0.2 },
    { x: 0.55, y: 0.16 },
    { x: 0.42, y: 0.17 },
    { x: 0.32, y: 0.22 },
    { x: 0.24, y: 0.32 },
    { x: 0.22, y: 0.45 },
    { x: 0.22, y: 0.58 },
    { x: 0.28, y: 0.72 },
    { x: 0.4, y: 0.82 },
    { x: 0.5, y: 0.85 },
    { x: 0.62, y: 0.82 },
    { x: 0.72, y: 0.72 },
    { x: 0.75, y: 0.6 },
    { x: 0.7, y: 0.5 },
    { x: 0.58, y: 0.45 },
    { x: 0.42, y: 0.47 },
  ],
  difficulty: 2,
};

export const number7: TracingItem = {
  id: 'number-7',
  category: 'number',
  label: '7',
  path: 'M 0.2 0.15 L 0.8 0.15 L 0.4 0.85',
  guideDots: [
    // Top horizontal
    { x: 0.2, y: 0.15 },
    { x: 0.35, y: 0.15 },
    { x: 0.5, y: 0.15 },
    { x: 0.65, y: 0.15 },
    { x: 0.8, y: 0.15 },
    // Diagonal
    { x: 0.72, y: 0.28 },
    { x: 0.62, y: 0.42 },
    { x: 0.52, y: 0.57 },
    { x: 0.46, y: 0.7 },
    { x: 0.4, y: 0.85 },
  ],
  difficulty: 1,
};

export const number8: TracingItem = {
  id: 'number-8',
  category: 'number',
  label: '8',
  path: 'M 0.5 0.5 Q 0.25 0.5 0.25 0.32 Q 0.25 0.15 0.5 0.15 Q 0.75 0.15 0.75 0.32 Q 0.75 0.5 0.5 0.5 Q 0.2 0.5 0.2 0.68 Q 0.2 0.85 0.5 0.85 Q 0.8 0.85 0.8 0.68 Q 0.8 0.5 0.5 0.5',
  guideDots: [
    // Top loop
    { x: 0.5, y: 0.5 },
    { x: 0.38, y: 0.48 },
    { x: 0.28, y: 0.42 },
    { x: 0.27, y: 0.32 },
    { x: 0.32, y: 0.2 },
    { x: 0.42, y: 0.15 },
    { x: 0.5, y: 0.15 },
    { x: 0.58, y: 0.15 },
    { x: 0.68, y: 0.2 },
    { x: 0.73, y: 0.32 },
    { x: 0.72, y: 0.42 },
    { x: 0.62, y: 0.48 },
    // Bottom loop
    { x: 0.5, y: 0.5 },
    { x: 0.35, y: 0.53 },
    { x: 0.24, y: 0.6 },
    { x: 0.22, y: 0.7 },
    { x: 0.28, y: 0.8 },
    { x: 0.4, y: 0.85 },
    { x: 0.5, y: 0.85 },
    { x: 0.6, y: 0.85 },
    { x: 0.72, y: 0.8 },
    { x: 0.78, y: 0.7 },
    { x: 0.76, y: 0.6 },
    { x: 0.65, y: 0.53 },
  ],
  difficulty: 3,
};

export const number9: TracingItem = {
  id: 'number-9',
  category: 'number',
  label: '9',
  path: 'M 0.35 0.8 Q 0.5 0.85 0.65 0.8 Q 0.8 0.7 0.8 0.5 Q 0.8 0.15 0.5 0.15 Q 0.2 0.15 0.2 0.35 Q 0.2 0.55 0.5 0.55 Q 0.8 0.55 0.8 0.45',
  guideDots: [
    { x: 0.35, y: 0.8 },
    { x: 0.45, y: 0.84 },
    { x: 0.58, y: 0.83 },
    { x: 0.68, y: 0.78 },
    { x: 0.76, y: 0.68 },
    { x: 0.78, y: 0.55 },
    { x: 0.78, y: 0.42 },
    { x: 0.72, y: 0.28 },
    { x: 0.6, y: 0.18 },
    { x: 0.5, y: 0.15 },
    { x: 0.38, y: 0.18 },
    { x: 0.28, y: 0.28 },
    { x: 0.25, y: 0.4 },
    { x: 0.3, y: 0.5 },
    { x: 0.42, y: 0.55 },
    { x: 0.58, y: 0.53 },
  ],
  difficulty: 2,
};

export const number0: TracingItem = {
  id: 'number-0',
  category: 'number',
  label: '0',
  path: 'M 0.5 0.15 Q 0.8 0.15 0.8 0.5 Q 0.8 0.85 0.5 0.85 Q 0.2 0.85 0.2 0.5 Q 0.2 0.15 0.5 0.15',
  guideDots: [
    { x: 0.5, y: 0.15 },
    { x: 0.62, y: 0.17 },
    { x: 0.72, y: 0.25 },
    { x: 0.78, y: 0.38 },
    { x: 0.78, y: 0.5 },
    { x: 0.78, y: 0.62 },
    { x: 0.72, y: 0.75 },
    { x: 0.62, y: 0.83 },
    { x: 0.5, y: 0.85 },
    { x: 0.38, y: 0.83 },
    { x: 0.28, y: 0.75 },
    { x: 0.22, y: 0.62 },
    { x: 0.22, y: 0.5 },
    { x: 0.22, y: 0.38 },
    { x: 0.28, y: 0.25 },
    { x: 0.38, y: 0.17 },
  ],
  difficulty: 2,
};

/**
 * All numbers in educational order: 1-9, then 0.
 * Ready to use in the tracing application.
 */
export const numbers: TracingItem[] = [
  number1,
  number2,
  number3,
  number4,
  number5,
  number6,
  number7,
  number8,
  number9,
  number0,
];
