import React, { useState } from 'react';
import { ArrowDown, Code2, Database, Sparkles, Terminal, Copy, Check, ChevronRight, Layers, TrendingUp } from 'lucide-react';
import { personalInfo, stats } from '../data/portfolioData';

export default function Hero({ onOpenResume }) {
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - card.left) / card.width - 0.5;
    const y = (e.clientY - card.top) / card.height - 0.5;
    setTilt({ x: x * 14, y: -y * 14 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Apple Keynote Ambient Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] sm:w-[900px] sm:h-[450px] bg-gradient-to-tr from-blue-600/15 via-indigo-500/10 to-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[300px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />


      {/* Main Headline */}
      <div className="text-center max-w-4xl mx-auto space-y-5 z-10">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08]">
          Engineered for <span className="text-gradient-accent">scale</span>. <br />
          Driven by <span className="text-gradient-apple">precision</span>.
        </h1>

        <p className="text-lg sm:text-2xl text-zinc-400 font-light max-w-2xl mx-auto tracking-normal leading-relaxed">
          I'm <span className="text-white font-medium">{personalInfo.name}</span> — a Full-Stack Developer & Financial Data Analyst transforming high-performance web systems, MERN architectures, and market data into seamless user experiences.
        </p>

        {/* Action Button Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <a
            href="#highlights"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all duration-300 shadow-xl shadow-white/10 active:scale-95"
          >
            <span>Explore Innovations</span>
            <ChevronRight className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/10 hover:border-white/20 transition-all duration-300 active:scale-95"
          >
            <span>Read Verified Resume</span>
          </button>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white text-sm border border-white/10 transition-all active:scale-95"
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

      {/* Interactive 3D Apple Silicone / Terminal Hardware Showcase Card */}
      <div
        className="w-full max-w-3xl mt-14 z-10 perspective-1000"
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
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-zinc-500 text-[11px]">ashutosh.engine.v2.jsx</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-500 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>STATUS: PRODUCTION_READY</span>
            </div>
          </div>

          {/* Card Body - Dual Core Split (Full-Stack Engine + Equity Analytics) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Core: MERN Architecture */}
            <div className="bg-black/40 rounded-xl p-4 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  Full-Stack Engine (MERN)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono">
                  Production
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Full-stack React & Next.js lifecycles, Express routing, Node.js backend services, and MongoDB document indexing engineered for scale.
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

            {/* Right Core: Financial Analytics */}
            <div className="bg-black/40 rounded-xl p-4 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Financial Intelligence
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                  Edify Equity
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Macroeconomic trend tracking, fundamental ratio audits, weekly analytical digests, and enterprise modeling.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Stock Trends', 'Macroeconomics', 'Company Fundamentals', 'Adv. Excel'].map((tag) => (
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10 text-center">
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
      <a
        href="#highlights"
        aria-label="Scroll down to Innovations"
        className="mt-10 p-2 rounded-full text-zinc-500 hover:text-white transition-colors animate-bounce"
      >
        <ArrowDown className="w-5 h-5" />
      </a>
    </section>
  );
}
