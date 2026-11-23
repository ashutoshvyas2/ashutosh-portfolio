import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight, Play, RotateCcw } from 'lucide-react';
import { playTactileClick, playSuccessChime } from '../utils/soundEffects';

/**
 * KineticProverbModal
 * 
 * Cinematic pop-up inspired by the bold kinetic scrolling typography of arddev.in,
 * featuring the full proverb and golden twist:
 * "JACK OF ALL TRADES. MASTER OF NONE. ...BUT OFTENTIMES BETTER THAN A MASTER OF ONE."
 * 
 * Features:
 * - Timed kinetic typography entrance line-by-line with sound cues.
 * - Golden glowing punchline resolution celebrating multidisciplinary engineering.
 * - Suppresses F1 companion cursor while active.
 * - Auto-dismisses smoothly after the full message is displayed.
 * - Skip (Esc / click) support.
 */
export default function KineticProverbModal({ isOpen, onClose }) {
  const [animStep, setAnimStep] = useState(0); // 0: enter, 1: JACK, 2: OF ALL TRADES, 3: MASTER OF NONE, 4: GOLDEN TWIST, 5: SUBTEXT
  const [progress, setProgress] = useState(0);
  const timersRef = useRef([]);

  // Clear all pending timeouts
  const clearTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    if (!isOpen) {
      clearTimers();
      setAnimStep(0);
      setProgress(0);
      // Ensure F1 car suppression is cleared
      window.dispatchEvent(
        new CustomEvent('f1-suppress', { detail: { suppress: false } })
      );
      return;
    }

    // Suppress F1 car while dramatic pop-up is active
    window.dispatchEvent(
      new CustomEvent('f1-suppress', { detail: { suppress: true } })
    );

    clearTimers();
    setAnimStep(0);
    setProgress(0);

    // Sequence timings
    const t0 = setTimeout(() => {
      setAnimStep(1); // JACK
      playTactileClick();
    }, 250);

    const t1 = setTimeout(() => {
      setAnimStep(2); // OF ALL TRADES.
      playTactileClick();
    }, 850);

    const t2 = setTimeout(() => {
      setAnimStep(3); // MASTER OF NONE.
      playTactileClick();
    }, 1550);

    const t3 = setTimeout(() => {
      setAnimStep(4); // ...BUT OFTENTIMES BETTER THAN A MASTER OF ONE.
      playSuccessChime();
    }, 2450);

    const t4 = setTimeout(() => {
      setAnimStep(5); // Subtext badge
    }, 3050);

    // Auto-dismiss after user reads the full revelation (~5.8s total)
    const tDismiss = setTimeout(() => {
      handleClose();
    }, 5800);

    timersRef.current = [t0, t1, t2, t3, t4, tDismiss];

    // Smooth progress countdown for auto-dismiss indicator
    const startTime = Date.now();
    const totalDuration = 5800;
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / totalDuration) * 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(interval);
    }, 50);

    timersRef.current.push(interval);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimers();
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
      window.dispatchEvent(
        new CustomEvent('f1-suppress', { detail: { suppress: false } })
      );
    };
  }, [isOpen]);

  const handleClose = () => {
    playTactileClick();
    clearTimers();
    window.dispatchEvent(
      new CustomEvent('f1-suppress', { detail: { suppress: false } })
    );
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="proverb-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl select-none"
          onClick={handleClose}
        >
          {/* Ambient Radial Spotlight */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-amber-500/10 via-cyan-500/10 to-transparent rounded-full blur-[120px]" />
          </div>

          {/* Top Control Bar: Skip Button with Circular Countdown */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20 flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-zinc-300 hover:text-white text-xs font-mono transition-all active:scale-95 cursor-pointer shadow-xl backdrop-blur-md"
              title="Skip animation (Esc)"
            >
              <span>Skip</span>
              <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/20"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-amber-400 transition-all duration-75"
                    strokeDasharray={`${progress}, 100`}
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
              <X className="w-3.5 h-3.5 ml-0.5 text-zinc-400" />
            </button>
          </div>

          {/* Center Card Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: -15, transition: { duration: 0.35 } }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-12 md:p-16 border border-white/15 bg-gradient-to-b from-[#0e0e14]/90 via-[#07070b]/95 to-[#040407]/95 shadow-[0_25px_80px_rgba(0,0,0,0.95)] relative"
          >
            {/* Top Philosophy Tag */}
            <div className="flex items-center gap-2 pb-6 sm:pb-8 text-xs font-mono uppercase tracking-widest text-zinc-500 border-b border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Engineering Philosophy</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400 font-sans normal-case">The Complete Proverb</span>
            </div>

            {/* Kinetic Typography Block */}
            <div className="py-6 sm:py-8 space-y-2 sm:space-y-4">
              {/* Line 1: JACK */}
              <AnimatePresence>
                {animStep >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-[0.95]"
                  >
                    JACK
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Line 2: OF ALL TRADES. */}
              <AnimatePresence>
                {animStep >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-zinc-300 uppercase leading-[0.95]"
                  >
                    OF ALL TRADES.
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Line 3: MASTER OF NONE. */}
              <AnimatePresence>
                {animStep >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-zinc-500 uppercase leading-[0.95]"
                  >
                    MASTER OF NONE.
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Line 4: THE GOLDEN TWIST */}
              <AnimatePresence>
                {animStep >= 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 25, scale: 0.96, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="pt-4 sm:pt-6"
                  >
                    <div className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(251,191,36,0.45)] leading-tight">
                      ...BUT OFTENTIMES BETTER THAN A MASTER OF ONE.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Context Badge */}
            <AnimatePresence>
              {animStep >= 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-2.5 text-zinc-400">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-ping" />
                    <span className="font-mono text-zinc-300 font-semibold tracking-wide">
                      Ashutosh Gautam: Full-Stack MERN Core × Financial Data Analytics
                    </span>
                  </div>

                  <span className="text-zinc-500 text-[11px] font-mono">
                    Auto-closing in 2s • or click anywhere
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
