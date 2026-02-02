export enum AppScreen {
  HOME = 'HOME',
  CATEGORY_SELECT = 'CATEGORY_SELECT', // e.g. ABC, 123, Shapes
  TRACING = 'TRACING'
}

export enum Category {
  LETTERS = 'LETTERS',
  NUMBERS = 'NUMBERS',
  SHAPES = 'SHAPES'
}

export interface TraceItem {
  id: string;
  label: string; // The character or name
  path?: string; // The SVG path data (for shapes)
  char?: string; // The character to render (for letters/numbers)
  fontFamily?: string; // Font to use
  viewBox: string; // SVG viewbox
  strokePaths?: string[]; // Optional: internal paths for arrows
}

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
}