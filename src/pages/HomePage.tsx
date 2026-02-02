import { Sparkles, Hash, Circle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigationContext } from '../hooks/useNavigation';
import type { Category } from '../types';

interface CategoryButtonProps {
  category: Category;
  label: string;
  icon: React.ReactNode;
  color: string;
}

function CategoryButton({ category, label, icon, color }: CategoryButtonProps) {
  const { selectCategory } = useNavigationContext();

  return (
    <Button
      onClick={() => selectCategory(category)}
      variant="primary"
      size="lg"
      className={`w-full ${color} flex-col gap-2 py-6`}
    >
      <span className="animate-float">{icon}</span>
      <span>{label}</span>
    </Button>
  );
}

export function HomePage() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 gap-8">
      {/* Title */}
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold text-purple-800 mb-2">
          Princess Paws
        </h1>
        <p className="font-body text-lg text-purple-600">
          Let's learn to trace! ✨
        </p>
      </div>

      {/* Decorative paw */}
      <div className="text-6xl animate-bounce-gentle">
        🐾
      </div>

      {/* Category buttons */}
      <div className="w-full max-w-xs flex flex-col gap-4">
        <CategoryButton
          category="letter"
          label="Letters"
          icon={<Sparkles size={32} />}
          color="!bg-princess-pink"
        />
        <CategoryButton
          category="number"
          label="Numbers"
          icon={<Hash size={32} />}
          color="!bg-princess-lavender !text-purple-800"
        />
        <CategoryButton
          category="shape"
          label="Shapes"
          icon={<Circle size={32} />}
          color="!bg-princess-peach !text-orange-800"
        />
      </div>

      {/* Footer decoration */}
      <div className="flex gap-2 text-2xl">
        <span className="animate-sparkle">✨</span>
        <span className="animate-sparkle" style={{ animationDelay: '0.3s' }}>👑</span>
        <span className="animate-sparkle" style={{ animationDelay: '0.6s' }}>✨</span>
      </div>
    </div>
  );
}
