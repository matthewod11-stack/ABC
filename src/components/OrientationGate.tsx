import type { ReactNode } from 'react';
import { RotateCcw } from 'lucide-react';

interface OrientationGateProps {
  children: ReactNode;
}

export function OrientationGate({ children }: OrientationGateProps) {
  return (
    <>
      {/* Landscape orientation warning - CSS controlled visibility */}
      <div className="orientation-message">
        <div className="animate-wiggle">
          <RotateCcw size={64} className="text-purple-600" />
        </div>
        <p className="font-display text-2xl text-purple-800 text-center px-8">
          Please rotate your device to portrait mode
        </p>
        <p className="font-body text-purple-600 text-center px-8">
          This app works best when your device is upright 📱
        </p>
      </div>

      {/* Main app content - hidden in landscape via CSS */}
      <div className="app-content h-full">
        {children}
      </div>
    </>
  );
}
