import { useRef, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Home } from 'lucide-react';
import { IconButton } from '../components/ui/IconButton';
import { useNavigationContext } from '../hooks/useNavigation';
import { TracingCanvas, type TracingCanvasRef } from '../features/tracing';
import { letterA } from '../data/testLetter';
import type { TracingItem } from '../types';

// Test data for Phase 1 - only letter A is fully implemented
const TRACING_ITEMS: Record<string, TracingItem[]> = {
  letter: [letterA],
  number: [],
  shape: [],
};

// Fallback placeholder items for categories without tracing data
const PLACEHOLDER_ITEMS = {
  letter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
  number: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  shape: ['Circle', 'Square', 'Triangle', 'Star', 'Heart'],
};

export function TracingPage() {
  const { state, prevItem, nextItem, goHome, markComplete } = useNavigationContext();
  const { currentCategory, currentIndex } = state;
  const tracingCanvasRef = useRef<TracingCanvasRef>(null);

  // Check for debug mode via URL param or dev environment
  const debugMode = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('debug') === 'true' || import.meta.env.DEV;
  }, []);

  if (!currentCategory) return null;

  const tracingItems = TRACING_ITEMS[currentCategory];
  const placeholderItems = PLACEHOLDER_ITEMS[currentCategory];

  // Use tracing item if available, otherwise show placeholder
  const currentTracingItem = tracingItems[currentIndex];
  const hasTracingData = !!currentTracingItem;

  // For display purposes, get the count and label
  const totalItems = Math.max(tracingItems.length, placeholderItems.length);
  const isFirstItem = currentIndex === 0;
  const isLastItem = currentIndex >= totalItems - 1;

  const handleNext = () => {
    if (isLastItem) {
      markComplete();
    } else {
      nextItem();
    }
  };

  const handleClear = useCallback(() => {
    tracingCanvasRef.current?.clear();
  }, []);

  const handleComplete = useCallback(() => {
    // For now, just log completion - celebration will be added later
    console.log('Tracing complete!');
  }, []);

  return (
    <div className="h-full flex flex-col no-select">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white/30">
        <IconButton onClick={goHome} label="Go home">
          <Home size={24} />
        </IconButton>

        <div className="font-display text-lg text-purple-800">
          {currentIndex + 1} / {totalItems}
        </div>

        <IconButton onClick={handleClear} label="Clear tracing" variant="secondary">
          <RotateCcw size={24} />
        </IconButton>
      </header>

      {/* Tracing canvas */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {hasTracingData ? (
            <TracingCanvas
              ref={tracingCanvasRef}
              item={currentTracingItem}
              onComplete={handleComplete}
              debugMode={debugMode}
            />
          ) : (
            // Fallback placeholder for items without tracing data
            <div className="w-full aspect-square bg-white/50 rounded-3xl shadow-lg flex items-center justify-center">
              <span className="font-display text-9xl text-purple-300">
                {placeholderItems[currentIndex]}
              </span>
            </div>
          )}
        </div>
      </main>

      {/* Navigation footer */}
      <footer className="flex items-center justify-between p-4 bg-white/30">
        <IconButton
          onClick={prevItem}
          label="Previous"
          disabled={isFirstItem}
          variant="secondary"
        >
          <ChevronLeft size={32} />
        </IconButton>

        <div className="flex gap-1">
          {Array.from({ length: totalItems }).map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentIndex
                  ? 'bg-princess-pink'
                  : idx < currentIndex
                    ? 'bg-princess-gold'
                    : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        <IconButton
          onClick={handleNext}
          label={isLastItem ? 'Complete' : 'Next'}
          variant="primary"
        >
          <ChevronRight size={32} />
        </IconButton>
      </footer>
    </div>
  );
}
