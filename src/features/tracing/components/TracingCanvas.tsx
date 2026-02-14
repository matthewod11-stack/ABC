import {
  useRef,
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import type { TracingItem, Point } from '../../../types';
import { DrawingLayer, type DrawingLayerRef } from './DrawingLayer';
import { GhostLetter } from './GhostLetter';
import { GuideDots } from './GuideDots';
import { DemoAnimation } from './DemoAnimation';
import { DebugOverlay } from './DebugOverlay';
import { useCompletionDetection } from '../hooks/useCompletionDetection';

export interface TracingCanvasRef {
  clear: () => void;
}

interface TracingCanvasProps {
  item: TracingItem;
  onComplete?: () => void;
  debugMode?: boolean;
}

/**
 * Main tracing canvas component that composes all layers:
 * - GhostLetter: Faded path guide
 * - GuideDots: Ordered dots that light up when hit
 * - DrawingLayer: Canvas for user drawing
 * - DebugOverlay: Dev visualization (optional)
 */
export const TracingCanvas = forwardRef<TracingCanvasRef, TracingCanvasProps>(
  function TracingCanvas({ item, onComplete, debugMode = false }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const drawingRef = useRef<DrawingLayerRef>(null);
    const [size, setSize] = useState(0);
    const hasCompletedRef = useRef(false);
    const [showDemo, setShowDemo] = useState(true);

    const {
      hitDots,
      coverage,
      validSequence,
      isComplete,
      updateWithStrokes,
      reset: resetCompletion,
    } = useCompletionDetection(item.guideDots);

    // Responsive sizing via ResizeObserver
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const updateSize = () => {
        const rect = container.getBoundingClientRect();
        // Use the smaller dimension for square aspect ratio
        const newSize = Math.min(rect.width, rect.height);
        setSize(newSize);
      };

      const resizeObserver = new ResizeObserver(updateSize);
      resizeObserver.observe(container);
      updateSize();

      return () => resizeObserver.disconnect();
    }, []);

    // Handle stroke updates
    const handleStrokeUpdate = useCallback(
      (strokes: Point[][]) => {
        updateWithStrokes(strokes);
      },
      [updateWithStrokes]
    );

    // Handle stroke end - check for completion
    const handleStrokeEnd = useCallback(() => {
      if (isComplete && !hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onComplete?.();
      }
    }, [isComplete, onComplete]);

    // Check completion on isComplete change (for real-time feedback)
    useEffect(() => {
      if (isComplete && !hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onComplete?.();
      }
    }, [isComplete, onComplete]);

    // Clear canvas and reset state
    const clear = useCallback(() => {
      drawingRef.current?.clear();
      resetCompletion();
      hasCompletedRef.current = false;
    }, [resetCompletion]);

    // Reset when item changes
    useEffect(() => {
      clear();
      setShowDemo(true); // Restart demo animation for new letter
    }, [item.id, clear]);

    // Handle demo animation completion
    const handleDemoComplete = useCallback(() => {
      setShowDemo(false);
    }, []);

    // Expose clear method via ref
    useImperativeHandle(ref, () => ({ clear }), [clear]);

    return (
      <div
        ref={containerRef}
        className="relative w-full aspect-square bg-white/50 rounded-3xl overflow-hidden shadow-lg"
      >
        {size > 0 && (
          <>
            {/* Layer 1: Faded ghost letter (always visible) */}
            <GhostLetter path={item.path} size={size} />

            {/* Layer 2: Demo animation (plays once on load) */}
            <DemoAnimation
              path={item.path}
              size={size}
              isPlaying={showDemo}
              onComplete={handleDemoComplete}
            />

            {/* Layer 3: Guide dots (debug only — hidden in normal mode to reduce clutter) */}
            {debugMode && (
              <GuideDots dots={item.guideDots} size={size} hitDots={hitDots} />
            )}

            {/* Layer 4: User drawing */}
            <DrawingLayer
              ref={drawingRef}
              width={size}
              height={size}
              onStrokeUpdate={handleStrokeUpdate}
              onStrokeEnd={handleStrokeEnd}
            />

            {/* Layer 5: Debug overlay (optional) */}
            {debugMode && (
              <DebugOverlay
                dots={item.guideDots}
                size={size}
                hitDots={hitDots}
                coverage={coverage}
                validSequence={validSequence}
              />
            )}
          </>
        )}
      </div>
    );
  }
);
