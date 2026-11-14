import React, { useEffect, useRef } from 'react';

/**
 * ScrollProgress
 * Implements native CSS scroll-driven progress indicator with JS fallback
 * Following modern-web-guidance specifications.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    // Progressive enhancement: JS fallback for browsers lacking native CSS scroll() timeline
    const supportsScrollTimeline =
      typeof CSS !== 'undefined' &&
      CSS.supports &&
      CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)');

    if (!supportsScrollTimeline && barRef.current) {
      const handleScroll = () => {
        const docElem = document.documentElement;
        const scrollable = docElem.scrollHeight - window.innerHeight;
        if (scrollable > 0) {
          const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${progress})`;
          }
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 h-[3px] pointer-events-none bg-transparent"
    >
      <div
        ref={barRef}
        id="scroll-progress-bar"
        className="h-full w-full bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-400 origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
