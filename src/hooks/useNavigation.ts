import { createContext, useContext, useCallback, useMemo, useSyncExternalStore } from 'react';
import type { Category, AppState } from '../types';

// Simple state management using browser history
interface NavigationContextValue {
  state: AppState;
  selectCategory: (category: Category) => void;
  goToItem: (index: number) => void;
  nextItem: () => void;
  prevItem: () => void;
  markComplete: () => void;
  goHome: () => void;
}

const defaultState: AppState = {
  currentCategory: null,
  currentIndex: 0,
  isComplete: false,
};

// Cache for getSnapshot to avoid infinite loops with useSyncExternalStore
let cachedHash = '';
let cachedState: AppState = defaultState;

// Parse state from URL hash (with caching for React 18 useSyncExternalStore)
function getStateFromHash(): AppState {
  const hash = window.location.hash.slice(1);

  // Return cached state if hash hasn't changed
  if (hash === cachedHash) {
    return cachedState;
  }

  cachedHash = hash;

  if (!hash) {
    cachedState = defaultState;
    return cachedState;
  }

  const params = new URLSearchParams(hash);
  const category = params.get('category') as Category | null;
  const index = parseInt(params.get('index') || '0', 10);
  const complete = params.get('complete') === 'true';

  if (category && ['letter', 'number', 'shape'].includes(category)) {
    cachedState = {
      currentCategory: category,
      currentIndex: index,
      isComplete: complete,
    };
  } else {
    cachedState = defaultState;
  }

  return cachedState;
}

// Convert state to URL hash
function stateToHash(state: AppState): string {
  if (!state.currentCategory) return '';

  const params = new URLSearchParams();
  params.set('category', state.currentCategory);
  params.set('index', state.currentIndex.toString());
  if (state.isComplete) params.set('complete', 'true');

  return params.toString();
}

// Subscribe to popstate events
function subscribe(callback: () => void): () => void {
  window.addEventListener('popstate', callback);
  return () => window.removeEventListener('popstate', callback);
}

// Get current snapshot
function getSnapshot(): AppState {
  return getStateFromHash();
}

export function useNavigation(): NavigationContextValue {
  // Use useSyncExternalStore for proper React 18+ integration
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const navigate = useCallback((newState: AppState) => {
    const hash = stateToHash(newState);
    if (hash) {
      window.history.pushState(null, '', `#${hash}`);
    } else {
      window.history.pushState(null, '', window.location.pathname);
    }
    // Dispatch popstate to trigger re-render
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, []);

  const selectCategory = useCallback((category: Category) => {
    navigate({ currentCategory: category, currentIndex: 0, isComplete: false });
  }, [navigate]);

  const goToItem = useCallback((index: number) => {
    navigate({ ...state, currentIndex: index, isComplete: false });
  }, [navigate, state]);

  const nextItem = useCallback(() => {
    navigate({ ...state, currentIndex: state.currentIndex + 1, isComplete: false });
  }, [navigate, state]);

  const prevItem = useCallback(() => {
    if (state.currentIndex > 0) {
      navigate({ ...state, currentIndex: state.currentIndex - 1, isComplete: false });
    }
  }, [navigate, state]);

  const markComplete = useCallback(() => {
    navigate({ ...state, isComplete: true });
  }, [navigate, state]);

  const goHome = useCallback(() => {
    navigate(defaultState);
  }, [navigate]);

  return useMemo(() => ({
    state,
    selectCategory,
    goToItem,
    nextItem,
    prevItem,
    markComplete,
    goHome,
  }), [state, selectCategory, goToItem, nextItem, prevItem, markComplete, goHome]);
}

// Context for providing navigation to deeply nested components
export const NavigationContext = createContext<NavigationContextValue | null>(null);

export function useNavigationContext(): NavigationContextValue {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigationContext must be used within a NavigationProvider');
  }
  return context;
}
