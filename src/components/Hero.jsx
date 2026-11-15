import React, { useState } from 'react';
import { ArrowDown, Code2, Copy, Check, ChevronRight, TrendingUp, MapPin, Sparkles } from 'lucide-react';
import { personalInfo, stats } from '../data/portfolioData';
import { playSuccessChime, playChapterPop } from '../utils/soundEffects';

export default function Hero({ onOpenResume, onExplore }) {
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    playSuccessChime();
    setTimeout(() => setCopied(false), 2200);
  };

  const handleExplore = () => {
    playChapterPop();
    if (onExplore) onExplore();
  };

  const handleResume = () => {
    playSuccessChime();
    if (onOpenResume) onOpenResume();
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - card.left) / card.width - 0.5;
    const y = (e.clientY - card.top) / card.height - 0.5;
    setTilt({ x: x * 12, y: -y * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Warm Ambient Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] sm:w-[900px] sm:h-[450px] bg-gradient-to-tr from-blue-600/15 via-indigo-500/10 to-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[300px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Headline */}
      <div className="text-center max-w-4xl mx-auto space-y-5 z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Full-Stack Developer • Financial Data Analyst</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08]">
          Building software with <span className="text-gradient-accent">craft</span>. <br />
          Exploring data with <span className="text-gradient-apple">curiosity</span>.
        </h1>

        <p className="text-base sm:text-xl text-zinc-300 font-normal max-w-2xl mx-auto tracking-normal leading-relaxed">
          I'm <span className="text-white font-semibold">{personalInfo.name}</span> — a developer based in West Bengal, India. I enjoy building clean, responsive web apps and turning complex market data into clear, human-friendly tools.
        </p>

        {/* Action Button Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <button
            onClick={handleExplore}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all duration-300 shadow-xl shadow-white/10 active:scale-95 cursor-pointer"
          >
            <span>Explore Featured Work</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleResume}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/10 hover:border-white/20 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <span>Read Resume (PDF)</span>
          </button>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white text-sm border border-white/10 transition-all active:scale-95 cursor-pointer"
            title="Copy Email to Clipboard"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-zinc-400" />
                <span>{personalInfo.email}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive 3D Apple-Glass Showcase Card */}
      <div
        className="w-full max-w-3xl mt-12 z-10 perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="apple-glass rounded-2xl p-6 sm:p-8 shadow-2xl transition-transform duration-200 ease-out border border-white/15 relative overflow-hidden group"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          }}
        >
          {/* Card Top Light Reflection Bar */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

          {/* Interactive Window Header */}
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-white/10 mb-6 text-xs text-zinc-400 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                AG
              </div>
              <div>
                <span className="text-white font-medium text-xs">Ashutosh Gautam</span>
                <span className="text-zinc-500 text-[11px] ml-1.5 flex-inline items-center gap-1">
                  • Kolkata, West Bengal
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Full-Time & Intern Roles</span>
            </div>
          </div>

          {/* Card Body - Dual Focus Split (Web Development + Market Analytics) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Card: Full-Stack Web Development */}
            <div className="bg-black/40 rounded-xl p-4.5 border border-white/5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  Full-Stack Web Apps
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-medium">
                  MERN Stack
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Building responsive frontends and reliable backend services with React 19, Next.js, Node, Express, and MongoDB.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['React 19', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'TypeScript'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Card: Financial & Data Analysis */}
            <div className="bg-black/40 rounded-xl p-4.5 border border-white/5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Financial Analysis
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
                  Equity Research
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Auditing company balance sheets, monitoring global macroeconomic trends, and formulating executive digest presentations.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Stock Trends', 'Company Fundamentals', 'Macro Tracking', 'Excel Modeling'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats Ticker */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-white/10 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="text-2xl font-bold tracking-tight text-white">{s.value}</div>
                <div className="text-xs text-zinc-400 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <button
        onClick={onExplore}
        aria-label="Continue to Featured Work"
        className="mt-10 p-2 rounded-full text-zinc-500 hover:text-white transition-colors animate-bounce cursor-pointer focus:outline-none"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </section>
  );
}
