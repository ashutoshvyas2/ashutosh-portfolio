import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, CheckCircle2 } from 'lucide-react';
import { playTactileClick, playSuccessChime } from '../utils/soundEffects';

/**
 * KineticProverbModal
 * 
 * Clean, minimalist scroll-driven kinetic typography pop-up modal.
 * Triggers automatically at the bottom of "Skills & Tools".
 * 
 * Features pure bold typography:
 * 1. JACK
 * 2. OF ALL TRADES.
 * 3. MASTER OF NONE.
 * 4. ...BUT OFTENTIMES BETTER THAN A MASTER OF ONE.
 */
export default function KineticProverbModal({ isOpen, onClose }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const scrollContainerRef = useRef(null);
  const playedMilestones = useRef({ 1: false, 2: false, 3: false, 4: false });
  const completionTriggered = useRef(false);
  const autoCloseTimer = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
      setScrollProgress(0);
      setIsCompleted(false);
      playedMilestones.current = { 1: false, 2: false, 3: false, 4: false };
      completionTriggered.current = false;
      document.body.style.overflow = '';
      window.dispatchEvent(
        new CustomEvent('f1-suppress', { detail: { suppress: false } })
      );
      return;
    }

    // Lock page background scroll and suppress F1 car
    document.body.style.overflow = 'hidden';
    window.dispatchEvent(
      new CustomEvent('f1-suppress', { detail: { suppress: true } })
    );

    setScrollProgress(0);
    setIsCompleted(false);
    playedMilestones.current = { 1: false, 2: false, 3: false, 4: false };
    completionTriggered.current = false;

    // Reset container scroll to top
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      window.dispatchEvent(
        new CustomEvent('f1-suppress', { detail: { suppress: false } })
      );
    };
  }, [isOpen]);

  const handleScroll = (e) => {
    const el = e.currentTarget;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 0) return;

    const progress = Math.min(1, Math.max(0, el.scrollTop / maxScroll));
    setScrollProgress(progress);

    // Audio cues for scroll milestones
    if (progress >= 0.12 && !playedMilestones.current[1]) {
      playedMilestones.current[1] = true;
      playTactileClick();
    }
    if (progress >= 0.35 && !playedMilestones.current[2]) {
      playedMilestones.current[2] = true;
      playTactileClick();
    }
    if (progress >= 0.58 && !playedMilestones.current[3]) {
      playedMilestones.current[3] = true;
      playTactileClick();
    }
    if (progress >= 0.78 && !playedMilestones.current[4]) {
      playedMilestones.current[4] = true;
      playSuccessChime();
    }

    // Once user scrolls to completion (>= 95%)
    if (progress >= 0.95 && !completionTriggered.current) {
      completionTriggered.current = true;
      setIsCompleted(true);
      // Auto-dismiss smoothly after reading (~1.5s)
      autoCloseTimer.current = setTimeout(() => {
        handleClose();
      }, 1500);
    }
  };

  const handleClose = () => {
    playTactileClick();
    if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
    document.body.style.overflow = '';
    window.dispatchEvent(
      new CustomEvent('f1-suppress', { detail: { suppress: false } })
    );
    onClose();
  };

  // Milestone thresholds
  const isLine1Active = scrollProgress >= 0.10; // JACK
  const isLine2Active = scrollProgress >= 0.32; // OF ALL TRADES.
  const isLine3Active = scrollProgress >= 0.55; // MASTER OF NONE.
  const isLine4Active = scrollProgress >= 0.78; // ...BUT OFTENTIMES BETTER THAN A MASTER OF ONE.

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="scroll-proverb-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100]"
        >
          {/* Top Fixed Control Bar: Scroll Progress + Skip Button */}
          <div className="fixed top-6 right-6 sm:top-8 sm:right-8 z-30 flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono text-zinc-400 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Scroll Progress: {Math.round(scrollProgress * 100)}%</span>
            </div>

            <button
              onClick={handleClose}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-zinc-300 hover:text-white text-xs font-mono transition-all active:scale-95 cursor-pointer shadow-xl backdrop-blur-md"
              title="Skip (Esc)"
            >
              <span>Skip</span>
              <X className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </div>

          {/* Top Thin Progress Line */}
          <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-30">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 transition-all duration-75"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* Scrollable Container (User scrolls this element) */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="w-full h-full overflow-y-auto bg-black/92 backdrop-blur-2xl select-none"
          >
            {/* Scroll Track: 280vh gives generous physical scrolling travel */}
            <div className="relative h-[280vh] w-full">
              {/* Sticky Center Stage (Pinned to viewport while user scrolls) */}
              <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-4 sm:p-10 pointer-events-none">
                {/* Ambient Radial Glow */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-amber-500/15 via-cyan-500/10 to-transparent rounded-full blur-[140px] transition-opacity duration-500"
                    style={{ opacity: isLine4Active ? 1 : 0.4 }}
                  />
                </div>

                {/* Main Glass Card (Pure Typography) */}
                <div className="w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-3xl p-6 sm:p-12 md:p-16 border border-white/15 bg-gradient-to-b from-[#0e0e14]/95 via-[#07070b]/98 to-[#040407]/98 shadow-[0_25px_80px_rgba(0,0,0,0.95)] relative pointer-events-auto my-auto">
                  {/* Kinetic Typography Stack */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Line 1: JACK */}
                    <div
                      className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[1.12] transition-all duration-300 ${
                        isLine1Active
                          ? 'opacity-100 text-white scale-100 blur-0 translate-y-0'
                          : 'opacity-15 text-zinc-600 scale-[0.98] blur-[1px] translate-y-1'
                      }`}
                    >
                      JACK
                    </div>

                    {/* Line 2: OF ALL TRADES. */}
                    <div
                      className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[1.12] transition-all duration-300 ${
                        isLine2Active
                          ? 'opacity-100 text-zinc-200 scale-100 blur-0 translate-y-0'
                          : 'opacity-15 text-zinc-600 scale-[0.98] blur-[1px] translate-y-1'
                      }`}
                    >
                      OF ALL TRADES.
                    </div>

                    {/* Line 3: MASTER OF NONE. */}
                    <div
                      className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[1.12] transition-all duration-300 ${
                        isLine3Active
                          ? 'opacity-100 text-zinc-400 scale-100 blur-0 translate-y-0'
                          : 'opacity-15 text-zinc-600 scale-[0.98] blur-[1px] translate-y-1'
                      }`}
                    >
                      MASTER OF NONE.
                    </div>

                    {/* Line 4: THE GOLDEN TWIST */}
                    <div
                      className={`pt-6 sm:pt-8 mt-4 sm:mt-6 border-t border-white/10 transition-all duration-500 ${
                        isLine4Active
                          ? 'opacity-100 scale-100 blur-0 translate-y-0'
                          : 'opacity-0 scale-95 blur-md translate-y-3'
                      }`}
                    >
                      <div className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-normal leading-[1.25] bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(251,191,36,0.55)]">
                        ...BUT OFTENTIMES BETTER THAN A MASTER OF ONE.
                      </div>
                    </div>
                  </div>

                  {/* Minimal Closing Status (Fades in only upon completion) */}
                  {isCompleted && (
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end text-emerald-400 font-mono text-[11px] animate-pulse">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Closing message...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Initial Scroll Prompt (Positioned safely at viewport bottom, never overlapping card) */}
                <div
                  className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-zinc-400 text-xs font-mono transition-opacity duration-300 pointer-events-none ${
                    scrollProgress > 0.08 ? 'opacity-0' : 'opacity-100 animate-bounce'
                  }`}
                >
                  <span className="tracking-wider uppercase text-[10px] text-amber-400 font-bold bg-black/60 px-2.5 py-0.5 rounded-full border border-amber-400/30 backdrop-blur-sm">
                    Scroll down with mouse wheel ↓
                  </span>
                  <ChevronDown className="w-4 h-4 text-amber-400" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
