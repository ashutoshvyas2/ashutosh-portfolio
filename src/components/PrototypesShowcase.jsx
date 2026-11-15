import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  ShieldAlert,
  UtensilsCrossed,
  UserCheck,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Play,
  RotateCcw,
  FileSpreadsheet,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { prototypes } from '../data/portfolioData';
import { playTactileClick, playSuccessChime } from '../utils/soundEffects';

export default function PrototypesShowcase() {
  const [activeId, setActiveId] = useState(prototypes[0].id);

  // QuickScan demo state
  const [selectedBasket, setSelectedBasket] = useState('groceries');

  // SubTrap demo state
  const [killSwitchArmed, setKillSwitchArmed] = useState(false);

  // PantryPanic demo state (interactive 10m timer)
  const [cookingTime, setCookingTime] = useState(600); // 10 minutes in seconds
  const [timerRunning, setTimerRunning] = useState(false);

  // GroupProjectGuard demo state
  const [auditExported, setAuditExported] = useState(false);

  const activeProto = prototypes.find((p) => p.id === activeId) || prototypes[0];

  const handleArmKillSwitch = () => {
    setKillSwitchArmed(true);
    playSuccessChime();
    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#2997ff', '#60a5fa', '#ffffff']
      });
    } catch (e) {}
  };

  const handleExportAudit = () => {
    setAuditExported(true);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#a855f7', '#c084fc', '#ffffff']
      });
    } catch (e) {}
    setTimeout(() => setAuditExported(false), 3000);
  };

  return (
    <section id="prototypes" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Apple Labs Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Side Projects & Prototypes
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Built to solve everyday problems.
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg">
          Functional applications I built to scratch real everyday itches — from comparing quick-commerce grocery carts to stopping zombie subscriptions before they charge your card.
        </p>

        {/* Prototype Segmented Navigation */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
          {prototypes.map((proto) => {
            const isActive = proto.id === activeId;
            return (
              <button
                key={proto.id}
                onClick={() => {
                  playTactileClick();
                  setActiveId(proto.id);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-black shadow-lg shadow-white/10 scale-105'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                <span>{proto.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Flagship Active Prototype Showcase Card */}
      <div className="apple-glass rounded-3xl p-6 sm:p-10 border border-white/15 relative overflow-hidden shadow-2xl transition-all duration-500">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10 mb-8 z-10 relative">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold font-mono">
                {activeProto.category}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {activeProto.status}
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              {activeProto.title}
            </h3>
            <p className="text-sm font-medium text-blue-300 mt-1">{activeProto.tagline}</p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-4 bg-black/40 px-4 py-2.5 rounded-2xl border border-white/10">
            <div className="text-right">
              <div className="text-lg font-bold text-white font-mono">{activeProto.metrics.primary}</div>
              <div className="text-[10px] text-zinc-400 uppercase">{activeProto.metrics.label}</div>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div className="text-left">
              <div className="text-xs font-semibold text-zinc-200">{activeProto.metrics.secondary}</div>
              <div className="text-[10px] text-zinc-400">{activeProto.metrics.secLabel}</div>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Left (Deep Details) / Right (Interactive Visual Simulator) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          {/* Left Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                Problem Solved
              </h4>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed bg-black/30 p-4 rounded-2xl border border-white/5">
                {activeProto.problem}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                Engineering & Functional Capabilities
              </h4>
              <div className="space-y-2.5">
                {activeProto.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                    <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <span className="leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                Tech Stack Architecture
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeProto.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-200 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Interactive Simulator (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#090a0f] rounded-2xl p-5 border border-white/15 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-zinc-400">
                <div className="flex items-center gap-1.5 font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  <span className="text-white font-medium">LIVE INTERACTIVE PREVIEW</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">v1.0.beta</span>
              </div>

              {/* Dynamic Interactive Mini-Widget Depending on Prototype */}
              {activeProto.id === 'quickscan' && (
                <div className="space-y-3">
                  <div className="text-xs text-zinc-400 flex justify-between">
                    <span>Sample Basket: 1L Milk, Eggs, Paracetamol</span>
                    <span className="text-emerald-400 font-medium">Auto-Comparing 4 Apps</span>
                  </div>

                  <div className="space-y-2">
                    {[
                      { app: 'Zepto', price: '₹142', time: '9 mins', best: true },
                      { app: 'Blinkit', price: '₹154', time: '12 mins', best: false },
                      { app: 'Swiggy Instamart', price: '₹149', time: '14 mins', best: false },
                      { app: 'BB Now', price: '₹159', time: '18 mins', best: false },
                    ].map((item) => (
                      <div
                        key={item.app}
                        className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                          item.best
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                            : 'bg-black/40 border-white/5 text-zinc-400'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{item.app}</span>
                          {item.best && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold uppercase">
                              Best Value
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 font-mono">
                          <span className="text-zinc-400">{item.time}</span>
                          <span className={`font-bold ${item.best ? 'text-emerald-400' : 'text-zinc-200'}`}>
                            {item.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px] text-center">
                    💡 Saves an estimated ₹450 - ₹1,200/month on household quick-commerce.
                  </div>
                </div>
              )}

              {activeProto.id === 'subtrap' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>Adobe Acrobat Pro Free Trial</span>
                    </div>
                    <span className="font-mono text-[11px]">2 Days Left</span>
                  </div>

                  <div className="bg-black/50 p-3 rounded-xl border border-white/5 space-y-1.5 text-xs text-zinc-300">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Recurring Price at Risk:</span>
                      <span className="text-rose-400 font-mono font-bold">₹1,999 / mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Dark-Pattern Traps:</span>
                      <span className="text-amber-400 font-mono">3 Steps Deep (Bypassed)</span>
                    </div>
                  </div>

                  <button
                    onClick={handleArmKillSwitch}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      killSwitchArmed
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>
                      {killSwitchArmed
                        ? '✓ 1-Click Kill-Switch Armed in Google Calendar!'
                        : 'Arm 1-Click Calendar Kill-Switch'}
                    </span>
                  </button>

                  <div className="text-[11px] text-zinc-500 text-center font-mono">
                    Manifest V3 Chrome Extension + RFC 5545 .ics generator
                  </div>
                </div>
              )}

              {activeProto.id === 'pantrypanic' && (
                <div className="space-y-3">
                  <div className="text-xs text-zinc-400 flex justify-between items-center">
                    <span>Fridge Leftovers: Eggs, Spinach, Cheddar</span>
                    <span className="text-amber-400 font-mono">10m Rescue</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-white">Single-Pan Garden Frittata</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                        Easy Rescue
                      </span>
                    </div>
                    <div className="text-xs text-zinc-400">
                      Saves an estimated <strong>₹480</strong> on takeout food delivery.
                    </div>
                  </div>

                  {/* Interactive Timer Controls */}
                  <div className="bg-black/60 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span className="font-mono text-lg font-bold text-white">
                        {Math.floor(cookingTime / 60)}:00 MIN
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTimerRunning(!timerRunning)}
                        className="px-3 py-1 rounded-lg bg-amber-500 text-black text-xs font-bold hover:bg-amber-400 transition-colors"
                      >
                        {timerRunning ? 'Pause' : 'Start Timer'}
                      </button>
                      <button
                        onClick={() => {
                          setTimerRunning(false);
                          setCookingTime(600);
                        }}
                        className="p-1 rounded-lg bg-white/10 text-zinc-300 hover:text-white"
                        title="Reset"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-[11px] text-zinc-500 text-center">
                    Web Audio API kitchen chime + Spoonacular smart matcher
                  </div>
                </div>
              )}

              {activeProto.id === 'groupprojectguard' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs text-zinc-400">
                    <span>Assignment: Cloud Architecture Case Study</span>
                    <span className="text-purple-400 font-mono">Audit Active</span>
                  </div>

                  {/* Contribution breakdown */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-white">You (3:14 AM Effort Bonus)</span>
                      <span className="text-purple-400 font-bold font-mono">88%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden flex">
                      <div className="w-[88%] bg-gradient-to-r from-purple-500 to-indigo-500" />
                      <div className="w-[8%] bg-zinc-600" />
                      <div className="w-[4%] bg-zinc-700" />
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-500 pt-1">
                      <span>Peer B: 8% (Minor formatting)</span>
                      <span>Peer C: 4% (Ghosted)</span>
                    </div>
                  </div>

                  <button
                    onClick={handleExportAudit}
                    className="w-full py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 transition-all"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>
                      {auditExported
                        ? '✓ Professor-Ready Grade Audit Generated!'
                        : 'Generate Fair Grade Audit Report'}
                    </span>
                  </button>

                  <div className="text-[11px] text-zinc-500 text-center font-mono">
                    Chart.js + LocalStorage Persistence + Evidence Link Hash
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
