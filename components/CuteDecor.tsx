import React, { useState, useEffect } from 'react';

// Static lists of cute "Stickers"
const KITTIES = ['🐱', '😸', '😻', '😽', '🐈', '🐯', '🦁'];
const PUPPIES = ['🐶', '🐕', '🐩', '🐺', '🦊', '🐻', '🐼'];
const EXTRAS = ['🦄', '🦋', '🐞', '🐝', '👑', '🌈', '🎀'];

const CuteDecor: React.FC = () => {
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);

  // Cycle images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
        setLeftIndex(prev => (prev + 1) % KITTIES.length);
        setRightIndex(prev => (prev + 1) % PUPPIES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentLeft = KITTIES[leftIndex];
  const currentRight = PUPPIES[rightIndex];
  // Add a little random magic for the extra floating item
  const currentExtra = EXTRAS[(leftIndex + rightIndex) % EXTRAS.length];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      
      {/* Left Character (Kitty side) */}
      <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 w-32 h-32 md:w-48 md:h-48 transition-all duration-500 ease-in-out flex items-center justify-center">
         <div className="text-[80px] md:text-[120px] animate-bounce filter drop-shadow-xl transform hover:scale-110 transition-transform cursor-pointer" style={{ textShadow: '0 0 20px white, 0 0 10px pink' }}>
            {currentLeft}
         </div>
      </div>

      {/* Right Character (Puppy side) */}
      <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 w-32 h-32 md:w-48 md:h-48 transition-all duration-500 ease-in-out flex items-center justify-center">
         <div className="text-[80px] md:text-[120px] animate-bounce filter drop-shadow-xl transform hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: '0.5s', textShadow: '0 0 20px white, 0 0 10px purple' }}>
            {currentRight}
         </div>
      </div>

      {/* Floating Extra (Top Left) */}
      <div className="absolute top-20 left-10 opacity-60 animate-pulse hidden md:block">
         <div className="text-[60px] animate-float" style={{ animationDuration: '6s' }}>
            {currentExtra}
         </div>
      </div>

    </div>
  );
};

export default CuteDecor;