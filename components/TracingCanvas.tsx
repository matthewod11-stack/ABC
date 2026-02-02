import React, { useRef, useEffect, useState, useCallback } from 'react';
import { TraceItem } from '../types';
import Confetti from './Confetti';
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface TracingCanvasProps {
  item: TraceItem;
  onBack: () => void;
}

const TracingCanvas: React.FC<TracingCanvasProps> = ({ item, onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Offscreen canvases for scoring analysis
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const scratchCanvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [percentFilled, setPercentFilled] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [targetPixelCount, setTargetPixelCount] = useState(1);

  // Constants
  const FILL_COLOR = "#FF69B4"; // Hot pink
  const GUIDE_COLOR = "#D1D5DB"; // Gray-300
  const ARROW_COLOR = "#EC4899"; // Pink-500
  // Brush size 
  const LINE_WIDTH = 70; 
  // Require virtually full coverage (99%) to trigger the win.
  const WIN_THRESHOLD = 99; 

  // Reset function
  const resetCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    setPercentFilled(0);
    setShowConfetti(false);
  }, []);

  // --- SCORING LOGIC ---
  
  // Initialize the scoring mask (runs when item or size changes)
  const initScoring = (width: number, height: number) => {
    // Safety check: Don't initialize if dimensions are invalid
    if (!width || !height || width <= 0 || height <= 0) return;

    // We use a low-res canvas for performance (100px wide is plenty for percentage accuracy)
    const analysisWidth = 100;
    const aspectRatio = width / height;
    
    // Safety check: Prevent Infinity/NaN
    const calculatedHeight = analysisWidth / aspectRatio;
    if (!Number.isFinite(calculatedHeight) || calculatedHeight <= 0) return;

    const analysisHeight = Math.max(1, Math.round(calculatedHeight));

    // 1. Create Mask Canvas (The target shape)
    const maskC = document.createElement('canvas');
    maskC.width = analysisWidth;
    maskC.height = analysisHeight;
    const maskCtx = maskC.getContext('2d');
    
    // 2. Create Scratch Canvas (For downscaling user drawing)
    const scratchC = document.createElement('canvas');
    scratchC.width = analysisWidth;
    scratchC.height = analysisHeight;

    if (maskCtx) {
        // Parse ViewBox to map the SVG content to our canvas
        const vb = item.viewBox.split(' ').map(Number); // [x, y, w, h]
        const vbX = vb[0] || 0;
        const vbY = vb[1] || 0;
        const vbW = vb[2] || 100;
        const vbH = vb[3] || 100;

        // Scale and translate to fit the content exactly into our analysis canvas
        const scaleX = analysisWidth / vbW;
        const scaleY = analysisHeight / vbH;
        
        maskCtx.scale(scaleX, scaleY);
        maskCtx.translate(-vbX, -vbY);
        
        // Draw the Target
        maskCtx.fillStyle = 'red';
        
        if (item.char) {
            // Text Rendering for Scoring
            maskCtx.font = `bold 85px ${item.fontFamily || 'sans-serif'}`;
            maskCtx.textAlign = 'center';
            maskCtx.textBaseline = 'middle';
            
            // Reduced stroke to remove "bubble" effect but keep thickness
            maskCtx.lineWidth = 4;
            maskCtx.lineJoin = 'round';
            maskCtx.strokeStyle = 'red';
            
            // Assuming 100x100 viewBox, center is roughly 50, 55 (visual tweaks)
            const cx = 50; 
            const cy = 55;
            
            maskCtx.fillText(item.char, cx, cy);
            maskCtx.strokeText(item.char, cx, cy);
        } else if (item.path) {
            // Path Rendering
            const p = new Path2D(item.path);
            maskCtx.fill(p);
        }

        // Count how many pixels are inside the shape (The Target)
        // Reset transform to get data
        maskCtx.setTransform(1, 0, 0, 1, 0, 0); 
        
        try {
            const pixels = maskCtx.getImageData(0, 0, analysisWidth, analysisHeight).data;
            let count = 0;
            // Check alpha channel (every 4th byte)
            for (let i = 3; i < pixels.length; i += 4) {
                if (pixels[i] > 128) count++;
            }
            setTargetPixelCount(count);
        } catch (e) {
            console.error("Error getting mask data", e);
        }
    }

    maskCanvasRef.current = maskC;
    scratchCanvasRef.current = scratchC;
  };

  // Check how much is filled
  const checkProgress = useCallback(() => {
    if (!canvasRef.current || !maskCanvasRef.current || !scratchCanvasRef.current) return;
    if (targetPixelCount === 0) return;

    const scratchCtx = scratchCanvasRef.current.getContext('2d');
    const maskCtx = maskCanvasRef.current.getContext('2d');
    if (!scratchCtx || !maskCtx) return;

    const w = scratchCanvasRef.current.width;
    const h = scratchCanvasRef.current.height;
    
    // Safety check for getImageData
    if (w <= 0 || h <= 0) return;

    // Draw user's current high-res drawing onto low-res scratch pad
    scratchCtx.clearRect(0, 0, w, h);
    scratchCtx.drawImage(canvasRef.current, 0, 0, w, h);

    try {
        const userData = scratchCtx.getImageData(0, 0, w, h).data;
        const maskData = maskCtx.getImageData(0, 0, w, h).data;

        let filledCount = 0;
        // Iterate pixels
        for (let i = 3; i < userData.length; i += 4) {
            // If user has drawn here (alpha > 50) AND it is part of the shape (mask alpha > 128)
            if (userData[i] > 50 && maskData[i] > 128) {
                filledCount++;
            }
        }

        // 1. Calculate the raw percentage of pixels filled
        const rawPercentage = (filledCount / targetPixelCount) * 100;

        // 2. Scale it so the "Win Threshold" feels like 100% to the user.
        // e.g. If threshold is 99%, then 99% real fill displays as 100%.
        const scaledPercentage = Math.min(100, (rawPercentage / WIN_THRESHOLD) * 100);
        
        if (scaledPercentage >= 100) {
            if (percentFilled < 100) {
                setPercentFilled(100);
                setShowConfetti(true);
                try {
                    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3');
                    audio.volume = 0.5;
                    audio.play().catch(e => {});
                } catch (e) {}
            }
        } else {
            setPercentFilled(scaledPercentage);
        }
    } catch (e) {
        console.warn("Skipping scoring frame due to context error");
    }
  }, [targetPixelCount, percentFilled, WIN_THRESHOLD]);

  // --- DRAWING LOGIC ---

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) ctx.beginPath(); // Reset path
    checkProgress(); // Final check on lift
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart') return;
    if (percentFilled >= 100) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get coordinates
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const rect = canvas.getBoundingClientRect();
    
    // Safety check: Prevent drawing if rect is invalid
    if (rect.width === 0 || rect.height === 0) return;

    // Scale coordinates if canvas buffer size != CSS size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.lineWidth = LINE_WIDTH;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = FILL_COLOR;

    // Draw Line
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Reset path origin to avoid connecting disparate touches
    ctx.beginPath();
    ctx.moveTo(x, y);

    // Draw Dot (for single taps)
    ctx.beginPath();
    ctx.arc(x, y, LINE_WIDTH / 2, 0, Math.PI * 2);
    ctx.fillStyle = FILL_COLOR;
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(x, y);

    // Throttle progress checks to every ~5th event to keep drawing smooth
    if (Math.random() > 0.8) {
        checkProgress();
    }
  };

  // --- SETUP ---
  
  useEffect(() => {
    const handleResize = () => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (container && canvas) {
            const w = container.offsetWidth;
            const h = container.offsetHeight;
            // Only initialize if we have valid dimensions to prevent errors
            if (w > 0 && h > 0) {
               canvas.width = w;
               canvas.height = h;
               initScoring(w, h);
               resetCanvas();
            }
        }
    };

    window.addEventListener('resize', handleResize);
    // Use a small timeout to ensure layout is computed
    const timer = setTimeout(handleResize, 50);

    return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(timer);
    };
  }, [item, resetCanvas]);

  // Generate SVG Content for Text or Path
  const renderSvgContent = (forMask = false) => {
    if (item.char) {
        return (
            <text 
                x="50%" 
                y="55%" 
                fontFamily={item.fontFamily} 
                fontSize="85" 
                fontWeight="bold" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill={forMask ? "black" : "currentColor"}
                stroke={forMask ? "black" : "currentColor"}
                // Much smaller stroke just to smooth edges
                strokeWidth="4" 
                strokeLinejoin="round"
                paintOrder="stroke fill"
            >
                {item.char}
            </text>
        );
    } else if (item.path) {
        return <path d={item.path} fill={forMask ? "black" : "currentColor"} />;
    }
    return null;
  };

  const renderOutlineContent = () => {
     if (item.char) {
        return (
             <text 
                x="50%" 
                y="55%" 
                fontFamily={item.fontFamily} 
                fontSize="85" 
                fontWeight="bold" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill="none"
                stroke={GUIDE_COLOR}
                strokeWidth="4" 
                strokeLinejoin="round"
                strokeDasharray="2 2"
            >
                {item.char}
            </text>
        );
    } else if (item.path) {
        return (
            <path 
                d={item.path} 
                fill="none" 
                stroke={GUIDE_COLOR} 
                strokeWidth="0.5" 
                strokeDasharray="1 1"
             />
        );
    }
    return null;
  };

  const renderAnimatedContent = () => {
     if (item.char) {
        return (
             <text 
                x="50%" 
                y="55%" 
                fontFamily={item.fontFamily} 
                fontSize="85" 
                fontWeight="bold" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill="none"
                stroke="rgba(255, 182, 193, 0.5)" 
                strokeWidth="4" 
                strokeLinejoin="round"
                className="animate-pulse"
            >
                {item.char}
            </text>
        );
    } else if (item.path) {
        return (
            <path 
                d={item.path} 
                fill="none" 
                stroke="rgba(255, 182, 193, 0.5)" 
                strokeWidth="0.5"
                className="animate-pulse"
            />
        );
    }
    return null;
  };


  // Masking SVG Data URL
  // We need to render the content as a string for the maskImage URL
  const svgContentString = item.char 
    ? `<text x="50%" y="55%" font-family="${item.fontFamily}" font-size="85" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="black" stroke="black" stroke-width="4" stroke-linejoin="round" paint-order="stroke fill">${item.char}</text>`
    : `<path d="${item.path}" fill="black"/>`;

  const svgDataUrl = `data:image/svg+xml,${encodeURIComponent(
    `<svg viewBox="${item.viewBox}" xmlns="http://www.w3.org/2000/svg">${svgContentString}</svg>`
  )}`;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative bg-pink-50 overflow-hidden select-none">
      {/* Confetti Overlay */}
      {showConfetti && <Confetti />}

      {/* Header */}
      <div className="absolute top-4 left-4 z-20">
        <button 
          onClick={onBack}
          className="bg-white p-3 rounded-full shadow-lg text-pink-500 hover:bg-pink-100 transition-colors"
        >
          <ArrowLeft size={32} />
        </button>
      </div>

      <div className="absolute top-4 right-4 z-20">
         <button 
          onClick={resetCanvas}
          className="bg-white p-3 rounded-full shadow-lg text-blue-400 hover:bg-blue-100 transition-colors"
        >
          <RefreshCw size={32} />
        </button>
      </div>
      
      {/* Title */}
      <h2 className="text-4xl md:text-6xl font-bold text-pink-600 font-bubble mb-4 animate-float">
        {item.label}
      </h2>

      {/* Tracing Area Container */}
      <div 
        ref={containerRef}
        className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
      >
         {/* 1. Background Outline (Grey) - Shows where to draw */}
         <svg 
            viewBox={item.viewBox} 
            className="absolute inset-0 w-full h-full text-gray-200 pointer-events-none"
            style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))' }}
         >
             {renderSvgContent()}
         </svg>

         {/* 2. Drawing Canvas (Masked) - Contains the pink ink */}
         {/* The mask ensures the ink only shows inside the shape */}
         <div 
            className="absolute inset-0 w-full h-full"
            style={{
                maskImage: `url("${svgDataUrl}")`,
                WebkitMaskImage: `url("${svgDataUrl}")`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat'
            }}
         >
            <canvas
                ref={canvasRef}
                className="w-full h-full touch-none cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
            />
         </div>

         {/* 3. Guides (Animated Overlay) */}
         <svg 
            viewBox={item.viewBox} 
            className="absolute inset-0 w-full h-full pointer-events-none"
         >
             <defs>
                 <pattern id="arrowPattern" viewBox="0 0 10 10" width="10%" height="10%">
                    <path d="M0,5 L10,5 M5,0 L10,5 L5,10" stroke={ARROW_COLOR} strokeWidth="2" fill="none" opacity="0.5" />
                 </pattern>
             </defs>
             {/* Dashed outline to guide */}
             {renderOutlineContent()}
             
             {/* Animated stroke showing direction */}
             {renderAnimatedContent()}
         </svg>
      </div>

      {/* Progress Indicator */}
      <div className="mt-8 flex items-center gap-4">
        <div className="w-48 h-6 bg-white rounded-full overflow-hidden shadow-inner border-2 border-pink-100">
            <div 
                className="h-full bg-gradient-to-r from-pink-300 to-pink-500 transition-all duration-300 ease-out"
                style={{ width: `${percentFilled}%` }}
            />
        </div>
        <div className="text-pink-600 font-bold text-xl">
            {Math.floor(percentFilled)}%
        </div>
      </div>
      
      {percentFilled >= 100 && (
          <div className="mt-4 animate-bounce">
              <span className="text-3xl font-bold text-pink-600 bg-white px-6 py-2 rounded-full shadow-lg">
                  Great Job! 😻
              </span>
          </div>
      )}

    </div>
  );
};

export default TracingCanvas;