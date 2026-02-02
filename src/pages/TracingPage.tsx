import { ChevronLeft, ChevronRight, RotateCcw, Home } from 'lucide-react';
import { IconButton } from '../components/ui/IconButton';
import { useNavigationContext } from '../hooks/useNavigation';

// Placeholder data - will be replaced with actual tracing items
const PLACEHOLDER_ITEMS = {
  letter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
  number: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  shape: ['Circle', 'Square', 'Triangle', 'Star', 'Heart'],
};

export function TracingPage() {
  const { state, prevItem, nextItem, goHome, markComplete } = useNavigationContext();
  const { currentCategory, currentIndex } = state;

  if (!currentCategory) return null;

  const items = PLACEHOLDER_ITEMS[currentCategory];
  const currentItem = items[currentIndex];
  const isFirstItem = currentIndex === 0;
  const isLastItem = currentIndex >= items.length - 1;

  const handleNext = () => {
    if (isLastItem) {
      markComplete();
    } else {
      nextItem();
    }
  };

  return (
    <div className="h-full flex flex-col no-select">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white/30">
        <IconButton onClick={goHome} label="Go home">
          <Home size={24} />
        </IconButton>

        <div className="font-display text-lg text-purple-800">
          {currentIndex + 1} / {items.length}
        </div>

        <IconButton label="Clear tracing" variant="secondary">
          <RotateCcw size={24} />
        </IconButton>
      </header>

      {/* Tracing canvas placeholder */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md aspect-square bg-white/50 rounded-3xl shadow-lg flex items-center justify-center">
          <span className="font-display text-9xl text-purple-300">
            {currentItem}
          </span>
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
          {items.map((_, idx) => (
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
