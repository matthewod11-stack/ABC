import { useState, useCallback, useMemo } from 'react';
import type { Point } from '../../../types';
import {
  calculateHitDots,
  calculateCoverage,
  getHitOrder,
  isValidSequence,
  HIT_RADIUS,
  COMPLETION_THRESHOLD,
} from '../utils/completionDetection';

interface CompletionState {
  hitDots: Set<number>;
  coverage: number;
  validSequence: boolean;
  isComplete: boolean;
}

interface UseCompletionDetectionResult {
  hitDots: Set<number>;
  coverage: number;
  validSequence: boolean;
  isComplete: boolean;
  updateWithStrokes: (strokes: Point[][]) => void;
  reset: () => void;
}

const initialState: CompletionState = {
  hitDots: new Set(),
  coverage: 0,
  validSequence: false,
  isComplete: false,
};

export function useCompletionDetection(
  dots: Point[],
  coverageThreshold: number = COMPLETION_THRESHOLD,
  hitRadius: number = HIT_RADIUS
): UseCompletionDetectionResult {
  const [state, setState] = useState<CompletionState>(initialState);

  const updateWithStrokes = useCallback(
    (strokes: Point[][]) => {
      if (dots.length === 0) return;

      const hitDots = calculateHitDots(dots, strokes, hitRadius);
      const coverage = calculateCoverage(hitDots, dots.length);
      const hitOrder = getHitOrder(dots, strokes, hitRadius);
      const validSequence = isValidSequence(hitOrder);
      const isComplete = coverage >= coverageThreshold && validSequence;

      setState({
        hitDots,
        coverage,
        validSequence,
        isComplete,
      });
    },
    [dots, coverageThreshold, hitRadius]
  );

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  // Memoize the return value to prevent unnecessary re-renders
  return useMemo(
    () => ({
      hitDots: state.hitDots,
      coverage: state.coverage,
      validSequence: state.validSequence,
      isComplete: state.isComplete,
      updateWithStrokes,
      reset,
    }),
    [state, updateWithStrokes, reset]
  );
}
