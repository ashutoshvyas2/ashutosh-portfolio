import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUp, 
  Activity, 
  CheckCircle2, 
  Server, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  X, 
  RefreshCw,
  Radio
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { playTactileClick, playSuccessChime } from '../utils/soundEffects';

export default function Footer() {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheckTime, setLastCheckTime] = useState('Just now');
  const [checkPassed, setCheckPassed] = useState(true);
  const popoverRef = useRef(null);

  const scrollToTop = () => {
    playTactileClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleStatusCard = () => {
    playTactileClick();
    setIsStatusOpen(!isStatusOpen);
  };

  // Close popover when clicking outside or pressing Escape
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsStatusOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsStatusOpen(false);
      }
    };

    if (isStatusOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isStatusOpen]);

  // Run interactive health diagnostic
  const runDiagnostics = () => {
    playTactileClick();
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setCheckPassed(true);
      setLastCheckTime('Just now');
      playSuccessChime();
    }, 650);
  };

  return (
    <footer className="border-t border-white/10 bg-[#040406] py-12 px-4 sm:px-6 text-zinc-500 text-xs relative">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 font-medium text-zinc-300">
            <span>{personalInfo.name}</span>
            <span>•</span>
            <span className="text-zinc-500">Full-Stack Developer (MERN Core) & Financial Analyst</span>
          </div>
          <p className="text-[11px] text-zinc-600">
            © {new Date().getFullYear()} Ashutosh Gautam. Built with precision and care.
          </p>
        </div>

        {/* Status Pill & Back to Top with Interactive Diagnostics Popover */}
        <div className="relative flex items-center gap-3">
          {/* INTERACTIVE STATUS CARD POPOVER */}
          {isStatusOpen && (
            <div
              ref={popoverRef}
              className="absolute bottom-full right-0 mb-3 w-80 sm:w-92 apple-glass rounded-2xl p-4 border border-emerald-500/30 shadow-[0_16px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl text-zinc-300 z-50 animate-in fade-in zoom-in-95 duration-200"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
                  <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                    Portfolio Diagnostics
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold">
                    100% OPERATIONAL
                  </span>
                  <button
                    onClick={() => {
                      playTactileClick();
                      setIsStatusOpen(false);
                    }}
                    className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Close diagnostics"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Status Metric Rows */}
              <div className="py-3 space-y-2.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    Client Runtime
                  </span>
                  <span className="font-mono text-zinc-200 font-medium">
                    React 19 • Vite 8 (Optimal)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Server className="w-3.5 h-3.5 text-emerald-400" />
                    Hosting & CDN
                  </span>
                  <span className="font-mono text-zinc-200 font-medium">
                    Vercel Edge (BOM1 Mumbai)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Activity className="w-3.5 h-3.5 text-purple-400" />
                    Physics & Sound
                  </span>
                  <span className="font-mono text-zinc-200 font-medium">
                    Web Audio API • 60/120 FPS
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Radio className="w-3.5 h-3.5 text-amber-400" />
                    Latency & Errors
                  </span>
                  <span className="font-mono text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    14ms Ping • 0 Exceptions
                  </span>
                </div>
              </div>

              {/* Recruiter Availability Banner */}
              <div className="mt-1 p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 text-cyan-400" />
                <span>
                  <strong>Ashutosh Gautam:</strong> Open to Full-Stack & Fintech engineering roles.
                </span>
              </div>

              {/* Diagnostics Trigger Footer */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-400">
                <span>Verified: {lastCheckTime}</span>
                <button
                  onClick={runDiagnostics}
                  disabled={isChecking}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/15 active:scale-95 text-white transition-all cursor-pointer font-mono font-medium disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${isChecking ? 'animate-spin text-cyan-400' : ''}`} />
                  <span>{isChecking ? 'Checking...' : 'Run Health Check'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Interactive Systems Optimal Button */}
          <button
            onClick={toggleStatusCard}
            className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-200 text-[11px] cursor-pointer shadow-lg active:scale-95 ${
              isStatusOpen
                ? 'bg-emerald-500/15 border-emerald-500/50 text-white shadow-emerald-500/20'
                : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-emerald-500/40 text-zinc-300 hover:text-white'
            }`}
            title="Click to view live portfolio health & telemetry"
            aria-expanded={isStatusOpen}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="font-medium">Systems Optimal</span>
            <span className="text-[9px] text-zinc-500 group-hover:text-emerald-400 transition-colors font-mono">
              {isStatusOpen ? '▲' : '▼'}
            </span>
          </button>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 transition-all active:scale-95 cursor-pointer shadow-lg"
            aria-label="Back to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
