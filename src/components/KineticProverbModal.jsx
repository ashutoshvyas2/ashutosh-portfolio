import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, CheckCircle2 } from 'lucide-react';
import { playTactileClick, playSuccessChime } from '../utils/soundEffects';

/**
 * KineticProverbModal (High-Performance 60/120 FPS Edition)
 * 
 * Performance Optimizations for Laptop Trackpads & Integrated GPUs:
 * - Zero React re-renders during micro-scrolling: React state only updates when crossing
 *   one of the 4 discrete text steps (0 -> 1 -> 2 -> 3 -> 4).
 * - Direct DOM manipulation for the progress line, text counter, and scroll prompt.
 * - Eliminated heavy GPU blur filters (backdrop-blur-2xl, blur-[140px], and text blur filters).
 * - Uses hardware-accelerated CSS transforms and opacity with will-change.
 * - rAF-throttled scroll listener for butter-smooth 60/120 FPS performance.
 */
export default function KineticProverbModal({ isOpen, onClose }) {
  // Only 2 lightweight states: active step (0-4) and completion boolean
  const [activeStep, setActiveStep] = useState(0); // 0: none, 1: JACK, 2: OF ALL TRADES, 3: MASTER OF NONE, 4: GOLDEN TWIST
  const [isCompleted, setIsCompleted] = useState(false);

  // Direct DOM refs for zero-re-render high frequency updates
  const scrollContainerRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressTextRef = useRef(null);
  const scrollPromptRef = useRef(null);
  const ambientGlowRef = useRef(null);

  // Internal tracking refs
  const activeStepRef = useRef(0);
  const playedMilestones = useRef({ 1: false, 2: false, 3: false, 4: false });
  const completionTriggered = useRef(false);
  const autoCloseTimer = useRef(null);
  const rafPending = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
      activeStepRef.current = 0;
      setActiveStep(0);
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

    activeStepRef.current = 0;
    setActiveStep(0);
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

  // High-performance rAF-throttled scroll handler
  const handleScroll = (e) => {
    if (rafPending.current) return;
    rafPending.current = true;

    const el = e.currentTarget;
    requestAnimationFrame(() => {
      rafPending.current = false;
      if (!el) return;

      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 0) return;

      const progress = Math.min(1, Math.max(0, el.scrollTop / maxScroll));

      // 1. Direct DOM updates (0 React re-renders at 60/120 FPS)
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress * 100}%`;
      }
      if (progressTextRef.current) {
        progressTextRef.current.innerText = `Scroll Progress: ${Math.round(progress * 100)}%`;
      }
      if (scrollPromptRef.current) {
        scrollPromptRef.current.style.opacity = progress > 0.08 ? '0' : '1';
        scrollPromptRef.current.style.pointerEvents = progress > 0.08 ? 'none' : 'auto';
      }

      // 2. Discrete Step Detection (ONLY re-renders React when changing step 0 -> 1 -> 2 -> 3 -> 4)
      let nextStep = 0;
      if (progress >= 0.76) nextStep = 4;
      else if (progress >= 0.52) nextStep = 3;
      else if (progress >= 0.28) nextStep = 2;
      else if (progress >= 0.08) nextStep = 1;

      if (nextStep !== activeStepRef.current) {
        activeStepRef.current = nextStep;
        setActiveStep(nextStep);

        // Ambient glow brightness
        if (ambientGlowRef.current) {
          ambientGlowRef.current.style.opacity = nextStep === 4 ? '1' : '0.35';
        }

        // Trigger sound once per step
        if (nextStep === 1 && !playedMilestones.current[1]) {
          playedMilestones.current[1] = true;
          playTactileClick();
        } else if (nextStep === 2 && !playedMilestones.current[2]) {
          playedMilestones.current[2] = true;
          playTactileClick();
        } else if (nextStep === 3 && !playedMilestones.current[3]) {
          playedMilestones.current[3] = true;
          playTactileClick();
        } else if (nextStep === 4 && !playedMilestones.current[4]) {
          playedMilestones.current[4] = true;
          playSuccessChime();
        }
      }

      // 3. Auto-dismiss trigger when reaching end (progress >= 96%)
      if (progress >= 0.96 && !completionTriggered.current) {
        completionTriggered.current = true;
        setIsCompleted(true);
        autoCloseTimer.current = setTimeout(() => {
          handleClose();
        }, 1400);
      }
    });
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="scroll-proverb-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
          className="fixed inset-0 z-[100] transform-gpu"
        >
          {/* Top Control Bar: Progress Counter & Skip Button */}
          <div className="fixed top-6 right-6 sm:top-8 sm:right-8 z-30 flex items-center gap-3 pointer-events-auto">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 border border-white/10 text-[11px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span ref={progressTextRef}>Scroll Progress: 0%</span>
            </div>

            <button
              onClick={handleClose}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-zinc-300 hover:text-white text-xs font-mono transition-all active:scale-95 cursor-pointer shadow-xl backdrop-blur-sm"
              title="Skip (Esc)"
            >
              <span>Skip</span>
              <X className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </div>

          {/* Top Thin Progress Line (Direct DOM transform for zero jank) */}
          <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-30 pointer-events-none">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 will-change-transform"
              style={{ width: '0%' }}
            />
          </div>

          {/* Scrollable Container (Native browser compositor scrolling) */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="w-full h-full overflow-y-auto bg-[#050507]/97 backdrop-blur-md select-none transform-gpu"
          >
            {/* Scroll Track: 260vh gives ample physical travel */}
            <div className="relative h-[260vh] w-full">
              {/* Sticky Center Stage (Pinned to viewport) */}
              <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-4 sm:p-10 pointer-events-none">
                {/* Lightweight Radial Ambient Shader (Zero Gaussian blur cost) */}
                <div
                  ref={ambientGlowRef}
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-40"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.15) 0%, rgba(6, 182, 212, 0.06) 45%, transparent 70%)',
                  }}
                />

                {/* Main Glass Card (Pure Typography) */}
                <div className="w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-3xl p-6 sm:p-12 md:p-16 border border-white/15 bg-gradient-to-b from-[#0e0e14]/98 via-[#07070b] to-[#040407] shadow-[0_25px_80px_rgba(0,0,0,0.95)] relative pointer-events-auto my-auto transform-gpu">
                  {/* Kinetic Typography Stack */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Line 1: JACK */}
                    <div
                      className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[1.12] transition-all duration-200 will-change-transform ${
                        activeStep >= 1
                          ? 'opacity-100 text-white translate-y-0 scale-100'
                          : 'opacity-15 text-zinc-600 translate-y-1 scale-[0.98]'
                      }`}
                    >
                      JACK
                    </div>

                    {/* Line 2: OF ALL TRADES. */}
                    <div
                      className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[1.12] transition-all duration-200 will-change-transform ${
                        activeStep >= 2
                          ? 'opacity-100 text-zinc-200 translate-y-0 scale-100'
                          : 'opacity-15 text-zinc-600 translate-y-1 scale-[0.98]'
                      }`}
                    >
                      OF ALL TRADES.
                    </div>

                    {/* Line 3: MASTER OF NONE. */}
                    <div
                      className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[1.12] transition-all duration-200 will-change-transform ${
                        activeStep >= 3
                          ? 'opacity-100 text-zinc-400 translate-y-0 scale-100'
                          : 'opacity-15 text-zinc-600 translate-y-1 scale-[0.98]'
                      }`}
                    >
                      MASTER OF NONE.
                    </div>

                    {/* Line 4: THE GOLDEN TWIST */}
                    <div
                      className={`pt-6 sm:pt-8 mt-4 sm:mt-6 border-t border-white/10 transition-all duration-300 will-change-transform ${
                        activeStep >= 4
                          ? 'opacity-100 translate-y-0 scale-100'
                          : 'opacity-0 translate-y-3 scale-95'
                      }`}
                    >
                      <div className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-normal leading-[1.25] bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(251,191,36,0.45)]">
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
                  ref={scrollPromptRef}
                  className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-zinc-400 text-xs font-mono transition-opacity duration-300 pointer-events-none"
                >
                  <span className="tracking-wider uppercase text-[10px] text-amber-400 font-bold bg-black/80 px-3 py-1 rounded-full border border-amber-400/30">
                    Scroll down with mouse wheel or trackpad ↓
                  </span>
                  <ChevronDown className="w-4 h-4 text-amber-400 animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
