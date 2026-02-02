import { Home, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigationContext } from '../hooks/useNavigation';

const CATEGORY_LABELS = {
  letter: 'Letters',
  number: 'Numbers',
  shape: 'Shapes',
};

export function CategoryCompletePage() {
  const { state, goHome, goToItem } = useNavigationContext();
  const { currentCategory } = state;

  if (!currentCategory) return null;

  const categoryLabel = CATEGORY_LABELS[currentCategory];

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 gap-8 text-center">
      {/* Celebration */}
      <div className="text-8xl animate-bounce-gentle">
        🎉
      </div>

      <div>
        <h1 className="font-display text-3xl font-bold text-purple-800 mb-2">
          Amazing Job!
        </h1>
        <p className="font-body text-lg text-purple-600">
          You finished all the {categoryLabel}!
        </p>
      </div>

      {/* Decorative elements */}
      <div className="flex gap-4 text-4xl">
        <span className="animate-sparkle">⭐</span>
        <span className="animate-sparkle" style={{ animationDelay: '0.2s' }}>🌟</span>
        <span className="animate-sparkle" style={{ animationDelay: '0.4s' }}>✨</span>
        <span className="animate-sparkle" style={{ animationDelay: '0.6s' }}>🌟</span>
        <span className="animate-sparkle" style={{ animationDelay: '0.8s' }}>⭐</span>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button onClick={() => goToItem(0)} variant="secondary" size="lg" className="w-full">
          <RotateCcw size={20} className="mr-2" />
          Practice Again
        </Button>

        <Button onClick={goHome} variant="primary" size="lg" className="w-full">
          <Home size={20} className="mr-2" />
          Choose Another
        </Button>
      </div>

      {/* Footer decoration */}
      <div className="text-4xl animate-float">
        👑
      </div>
    </div>
  );
}
