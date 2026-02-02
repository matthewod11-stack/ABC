import { TraceItem, Category } from './types';

// Helper to create a standard item
const createItem = (id: string, path: string, viewBox: string = "0 0 100 100"): TraceItem => ({
  id,
  label: id,
  path,
  viewBox
});

const TEXT_VIEWBOX = "0 0 100 100";
// Switched to Comic Sans stack for a kid-friendly look
const COMIC_FONT = '"Comic Sans MS", "Comic Sans", "Chalkboard SE", "Comic Neue", sans-serif';

// Generate A-Z
export const LETTERS: TraceItem[] = Array.from({ length: 26 }, (_, i) => {
  const char = String.fromCharCode(65 + i);
  return {
    id: char,
    label: char,
    char: char,
    fontFamily: COMIC_FONT,
    viewBox: TEXT_VIEWBOX
  };
});

// Generate 1-10
export const NUMBERS: TraceItem[] = [
    { id: '1', label: '1', char: '1', fontFamily: COMIC_FONT, viewBox: TEXT_VIEWBOX },
    { id: '2', label: '2', char: '2', fontFamily: COMIC_FONT, viewBox: TEXT_VIEWBOX },
    { id: '3', label: '3', char: '3', fontFamily: COMIC_FONT, viewBox: TEXT_VIEWBOX },
    { id: '4', label: '4', char: '4', fontFamily: COMIC_FONT, viewBox: TEXT_VIEWBOX },
    { id: '5', label: '5', char: '5', fontFamily: COMIC_FONT, viewBox: TEXT_VIEWBOX },
    { id: '6', label: '6', char: '6', fontFamily: COMIC_FONT, viewBox: TEXT_VIEWBOX },
    { id: '7', label: '7', char: '7', fontFamily: COMIC_FONT, viewBox: TEXT_VIEWBOX },
    { id: '8', label: '8', char: '8', fontFamily: COMIC_FONT, viewBox: TEXT_VIEWBOX },
    { id: '9', label: '9', char: '9', fontFamily: COMIC_FONT, viewBox: TEXT_VIEWBOX },
    { id: '10', label: '10', char: '10', fontFamily: COMIC_FONT, viewBox: "0 0 120 100" }, // Slightly wider for 10
];

// Shapes keep their manual paths
export const SHAPES: TraceItem[] = [
  { id: 'Circle', label: 'Circle', viewBox: "0 0 24 24", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" },
  { id: 'Square', label: 'Square', viewBox: "0 0 24 24", path: "M3 3v18h18V3H3zm15 15H6V6h12v12z" },
  { id: 'Star', label: 'Star', viewBox: "0 0 24 24", path: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" },
  { id: 'Heart', label: 'Heart', viewBox: "0 0 24 24", path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" },
  { id: 'Triangle', label: 'Triangle', viewBox: "0 0 24 24", path: "M12 2L2 22h20L12 2zm0 4l6.5 13h-13L12 6z" }
];