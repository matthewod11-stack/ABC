import {
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import type { Point } from '../../../types';

export interface DrawingLayerRef {
  clear: () => void;
  getStrokes: () => Point[][];
}

interface DrawingLayerProps {
  width: number;
  height: number;
  onStrokeUpdate?: (strokes: Point[][]) => void;
  onStrokeEnd?: () => void;
  strokeColor?: string;
  strokeWidth?: number;
}

/**
 * Canvas-based drawing layer with pointer event handling.
 * Supports multi-stroke drawing (lifting finger continues on same canvas).
 * Touch-hardened for iOS Safari.
 */
export const DrawingLayer = forwardRef<DrawingLayerRef, DrawingLayerProps>(
  function DrawingLayer(
    {
      width,
      height,
      onStrokeUpdate,
      onStrokeEnd,
      strokeColor = '#9333ea', // Purple-600
      strokeWidth = 8,
    },
    ref
  ) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const isDrawingRef = useRef(false);
    const currentStrokeRef = useRef<Point[]>([]);
    const allStrokesRef = useRef<Point[][]>([]);
    const lastPointRef = useRef<Point | null>(null);

    // Initialize canvas with proper DPR scaling
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctxRef.current = ctx;

      // Redraw existing strokes after resize
      redrawAllStrokes();
    }, [width, height, strokeColor, strokeWidth]);

    // Redraw all strokes (after resize or clear)
    const redrawAllStrokes = useCallback(() => {
      const ctx = ctxRef.current;
      const canvas = canvasRef.current;
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, width, height);

      for (const stroke of allStrokesRef.current) {
        if (stroke.length < 2) continue;
        ctx.beginPath();
        ctx.moveTo(stroke[0].x * width, stroke[0].y * height);
        for (let i = 1; i < stroke.length; i++) {
          ctx.lineTo(stroke[i].x * width, stroke[i].y * height);
        }
        ctx.stroke();
      }
    }, [width, height]);

    // Convert pointer coordinates to normalized 0-1 range
    const normalizePoint = useCallback(
      (e: React.PointerEvent<HTMLCanvasElement>): Point => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };

        const rect = canvas.getBoundingClientRect();
        return {
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        };
      },
      []
    );

    // Draw line segment from last point to current point
    const drawSegment = useCallback(
      (from: Point, to: Point) => {
        const ctx = ctxRef.current;
        if (!ctx) return;

        ctx.beginPath();
        ctx.moveTo(from.x * width, from.y * height);
        ctx.lineTo(to.x * width, to.y * height);
        ctx.stroke();
      },
      [width, height]
    );

    // Pointer event handlers
    const handlePointerDown = useCallback(
      (e: React.PointerEvent<HTMLCanvasElement>) => {
        // Capture pointer for drag tracking
        e.currentTarget.setPointerCapture(e.pointerId);
        e.preventDefault();

        isDrawingRef.current = true;
        const point = normalizePoint(e);
        currentStrokeRef.current = [point];
        lastPointRef.current = point;

        // Draw a dot at the start position
        const ctx = ctxRef.current;
        if (ctx) {
          ctx.beginPath();
          ctx.arc(point.x * width, point.y * height, strokeWidth / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      },
      [normalizePoint, width, height, strokeWidth]
    );

    const handlePointerMove = useCallback(
      (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (!isDrawingRef.current) return;
        e.preventDefault();

        const point = normalizePoint(e);

        // Draw segment from last point
        if (lastPointRef.current) {
          drawSegment(lastPointRef.current, point);
        }

        currentStrokeRef.current.push(point);
        lastPointRef.current = point;

        // Notify parent of stroke update
        const allStrokes = [
          ...allStrokesRef.current,
          [...currentStrokeRef.current],
        ];
        onStrokeUpdate?.(allStrokes);
      },
      [normalizePoint, drawSegment, onStrokeUpdate]
    );

    const handlePointerEnd = useCallback(
      (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (!isDrawingRef.current) return;
        e.currentTarget.releasePointerCapture(e.pointerId);

        isDrawingRef.current = false;

        // Save completed stroke
        if (currentStrokeRef.current.length > 0) {
          allStrokesRef.current.push([...currentStrokeRef.current]);
        }

        currentStrokeRef.current = [];
        lastPointRef.current = null;

        // Notify parent of stroke end
        onStrokeUpdate?.(allStrokesRef.current);
        onStrokeEnd?.();
      },
      [onStrokeUpdate, onStrokeEnd]
    );

    // Clear all strokes
    const clear = useCallback(() => {
      allStrokesRef.current = [];
      currentStrokeRef.current = [];
      lastPointRef.current = null;
      isDrawingRef.current = false;

      const ctx = ctxRef.current;
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
      }

      onStrokeUpdate?.([]);
    }, [width, height, onStrokeUpdate]);

    // Expose methods via ref
    useImperativeHandle(
      ref,
      () => ({
        clear,
        getStrokes: () => [...allStrokesRef.current],
      }),
      [clear]
    );

    // Prevent context menu on long press (iOS Safari)
    const handleContextMenu = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        style={{
          touchAction: 'none', // Critical for iOS Safari
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerLeave={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onContextMenu={handleContextMenu}
      />
    );
  }
);
