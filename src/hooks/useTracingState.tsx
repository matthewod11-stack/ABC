import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface TracingStateContextValue {
  isTracing: boolean;
  setIsTracing: (value: boolean) => void;
}

const TracingStateContext = createContext<TracingStateContextValue | null>(null);

interface TracingStateProviderProps {
  children: ReactNode;
}

/**
 * Provider for tracking when user is actively drawing.
 * Used to pause ambient effects during tracing for better focus and performance.
 */
export function TracingStateProvider({ children }: TracingStateProviderProps) {
  const [isTracing, setIsTracingState] = useState(false);

  const setIsTracing = useCallback((value: boolean) => {
    setIsTracingState(value);
  }, []);

  return (
    <TracingStateContext.Provider value={{ isTracing, setIsTracing }}>
      {children}
    </TracingStateContext.Provider>
  );
}

/**
 * Hook to access tracing state.
 * Returns isTracing boolean and setIsTracing function.
 */
export function useTracingState() {
  const context = useContext(TracingStateContext);
  if (!context) {
    throw new Error('useTracingState must be used within TracingStateProvider');
  }
  return context;
}

/**
 * Optional hook that returns null if outside provider.
 * Useful for components that may exist outside the tracing context.
 */
export function useTracingStateOptional() {
  return useContext(TracingStateContext);
}
