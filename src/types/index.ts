export interface Point {
  x: number;  // Normalized 0-1 range
  y: number;
}

export interface TracingItem {
  id: string;
  category: 'letter' | 'number' | 'shape';
  label: string;
  path: string;
  guideDots: Point[];
  difficulty: 1 | 2 | 3;
}

export type Category = 'letter' | 'number' | 'shape';

export interface AppState {
  currentCategory: Category | null;
  currentIndex: number;
  isComplete: boolean;
}
