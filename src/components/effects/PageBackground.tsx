import { useEffect } from 'react';

type PageType = 'home' | 'tracing' | 'complete';

interface PageBackgroundProps {
  page: PageType;
}

const PAGE_CLASSES: Record<PageType, string> = {
  home: 'bg-page-home',
  tracing: 'bg-page-tracing',
  complete: 'bg-page-complete',
};

/**
 * Applies per-page gradient backgrounds to the document body.
 *
 * Gradients:
 * - home: lavender → pink (welcoming)
 * - tracing: mint → lavender → pink (calmer, focused)
 * - complete: gold → pink → lavender (celebratory)
 */
export function PageBackground({ page }: PageBackgroundProps) {
  useEffect(() => {
    const className = PAGE_CLASSES[page];

    // Remove any existing page background classes
    Object.values(PAGE_CLASSES).forEach((cls) => {
      document.body.classList.remove(cls);
    });

    // Add the new background class
    document.body.classList.add(className);

    // Cleanup on unmount or page change
    return () => {
      document.body.classList.remove(className);
    };
  }, [page]);

  // This component doesn't render anything visible
  return null;
}
