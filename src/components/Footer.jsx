import React from 'react';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#040406] py-12 px-4 sm:px-6 text-zinc-500 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 font-medium text-zinc-300">
            <span>{personalInfo.name}</span>
            <span>•</span>
            <span className="text-zinc-500">Full-Stack Developer (MERN Core) & Financial Analyst</span>
          </div>
          <p className="text-[11px] text-zinc-600">
            © {new Date().getFullYear()} Ashutosh Gautam. All rights reserved.
          </p>
        </div>

        {/* Status Pill & Back to Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Systems Optimal</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
