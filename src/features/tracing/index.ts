// Components
export { TracingCanvas, type TracingCanvasRef } from './components/TracingCanvas';
export { DrawingLayer, type DrawingLayerRef } from './components/DrawingLayer';
export { GhostLetter } from './components/GhostLetter';
export { GuideDots } from './components/GuideDots';
export { DemoAnimation } from './components/DemoAnimation';
export { DebugOverlay } from './components/DebugOverlay';

// Hooks
export { useCompletionDetection } from './hooks/useCompletionDetection';

// Utils
export {
  HIT_RADIUS,
  COMPLETION_THRESHOLD,
  calculateHitDots,
  calculateCoverage,
  isComplete,
  distance,
} from './utils/completionDetection';
