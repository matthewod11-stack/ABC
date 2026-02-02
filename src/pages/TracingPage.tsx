import { useRef, useMemo, useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Home } from 'lucide-react';
import { IconButton } from '../components/ui/IconButton';
import { useNavigationContext } from '../hooks/useNavigation';
import { TracingCanvas, type TracingCanvasRef } from '../features/tracing';
import { Fireworks } from '../components/effects';
import { letters } from '../data/letters';
import { numbers } from '../data/numbers';
import { shapes } from '../data/shapes';
import type { TracingItem } from '../types';

// All tracing items organized by category
const TRACING_ITEMS: Record<string, TracingItem[]> = {
  letter: letters,   // A-Z (26 letters)
  number: numbers,   // 1-9, 0 (10 numbers)
  shape: shapes,     // Circle, Square, Triangle, Star, Heart
};

export function TracingPage() {
  const { state, prevItem, nextItem, goHome, markComplete } = useNavigationContext();
  const { currentCategory, currentIndex } = state;
  const tracingCanvasRef = useRef<TracingCanvasRef>(null);
  const [showFireworks, setShowFireworks] = useState(false);

  // Check for debug mode via URL param or dev environment
  const debugMode = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('debug') === 'true';
  }, []);

  const handleClear = useCallback(() => {
    tracingCanvasRef.current?.clear();
  }, []);

  const handleComplete = useCallback(() => {
    console.log('Tracing complete!');
    setShowFireworks(true);
  }, []);

  const handleFireworksComplete = useCallback(() => {
    setShowFireworks(false);
  }, []);

  // Early return must come AFTER all hooks
  if (!currentCategory) return null;

  const tracingItems = TRACING_ITEMS[currentCategory];
  const currentTracingItem = tracingItems[currentIndex];
  const totalItems = tracingItems.length;
  const isFirstItem = currentIndex === 0;
  const isLastItem = currentIndex >= totalItems - 1;

  const handleNext = () => {
    if (isLastItem) {
      markComplete();
    } else {
      nextItem();
    }
  };

  return (
    <div className="h-full flex flex-col no-select">
      {/* Celebration fireworks */}
      <Fireworks show={showFireworks} onComplete={handleFireworksComplete} />

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
          <TracingCanvas
            ref={tracingCanvasRef}
            item={currentTracingItem}
            onComplete={handleComplete}
            debugMode={debugMode}
          />
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
