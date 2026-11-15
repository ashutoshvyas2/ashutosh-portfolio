import React, { useState } from 'react';
import {
  Code2,
  TrendingUp,
  Award,
  HeartHandshake,
  Gauge,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BentoShowcase() {
  const [focusedRow1, setFocusedRow1] = useState('playtplus'); // 'playtplus' | 'tripleone'
  const [focusedRow2, setFocusedRow2] = useState('edify'); // 'edify' | 'adore'

  const springTransition = {
    layout: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
  };

  const contentFade = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.25, ease: 'easeOut' }
  };

  return (
    <section id="highlights" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Featured Work & Experience
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Real-world work & team impact.
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg">
          A look at the production software, financial research, and community initiatives I've contributed to across four internships.
        </p>
      </div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* =========================================================================
            ROW 1: CARD 1 - PLAYTPLUS TECHNOLOGIES
           ========================================================================= */}
        <motion.div
          layout
          transition={springTransition}
          onClick={() => {
            if (focusedRow1 !== 'playtplus') setFocusedRow1('playtplus');
          }}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && focusedRow1 !== 'playtplus') {
              e.preventDefault();
              setFocusedRow1('playtplus');
            }
          }}
          className={`${
            focusedRow1 === 'playtplus'
              ? 'md:col-span-2'
              : 'md:col-span-1 cursor-pointer hover:border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50'
          } apple-glass apple-glass-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group border border-white/10`}
          role={focusedRow1 !== 'playtplus' ? 'button' : undefined}
          tabIndex={focusedRow1 !== 'playtplus' ? 0 : undefined}
          aria-label="Playtplus Technologies card"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <AnimatePresence mode="wait">
            {focusedRow1 === 'playtplus' ? (
              <motion.div
                key="playtplus-expanded"
                {...contentFade}
                className="flex flex-col justify-between h-full z-10"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold flex items-center gap-2">
                      <Code2 className="w-4 h-4" />
                      Playtplus Technologies • MERN Stack Core
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-300 font-mono">
                      Production Tested
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Scalable Web Architecture & Live Production Systems
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                    Engineered live enterprise web applications, structured RESTful API endpoints, and fluid React frontend states with complete database indexing on MongoDB.
                  </p>

                  {/* Engineering Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-1">
                      <div className="text-white text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                        Scalable Architecture
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Hands-on engineering across MongoDB schemas, Express middleware, and Node.js backend pipelines.
                      </p>
                    </div>

                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-1">
                      <div className="text-white text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                        Live Production Delivery
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Successfully deployed core web features directly into client-facing websites and corporate applications.
                      </p>
                    </div>

                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-1">
                      <div className="text-white text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                        RESTful API Integrations
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Structured multi-endpoint APIs with input validation, error handling, and optimized JSON payloads.
                      </p>
                    </div>

                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-1">
                      <div className="text-white text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                        Testing & Structured Debugging
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Rigorous browser testing, state inspection, and performance profiling across modern desktop and mobile browsers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-6 z-10">
                  {['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs', 'App Debugging'].map((s) => (
                    <span
                      key={s}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="playtplus-collapsed"
                {...contentFade}
                className="flex flex-col justify-between h-full z-10"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono">
                      Click to Expand ↗
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">
                      Playtplus Technologies
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      MERN Stack Engineering
                    </h3>
                  </div>

                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    Full-stack web architectures, REST APIs, and scalable corporate application deployments with MongoDB and React.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Architecture</span>
                    <span className="text-blue-300 font-semibold flex items-center gap-1">
                      MERN Core Engine
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* =========================================================================
            ROW 1: CARD 2 - TRIPLE ONE SOLUTION
           ========================================================================= */}
        <motion.div
          layout
          transition={springTransition}
          onClick={() => {
            if (focusedRow1 !== 'tripleone') setFocusedRow1('tripleone');
          }}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && focusedRow1 !== 'tripleone') {
              e.preventDefault();
              setFocusedRow1('tripleone');
            }
          }}
          className={`${
            focusedRow1 === 'tripleone'
              ? 'md:col-span-2 border-amber-500/30 shadow-2xl shadow-amber-500/10'
              : 'md:col-span-1 cursor-pointer hover:border-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50'
          } apple-glass apple-glass-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group border border-white/10`}
          role={focusedRow1 !== 'tripleone' ? 'button' : undefined}
          tabIndex={focusedRow1 !== 'tripleone' ? 0 : undefined}
          aria-label="Triple One Solution card"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />

          <AnimatePresence mode="wait">
            {focusedRow1 === 'tripleone' ? (
              <motion.div
                key="tripleone-expanded"
                {...contentFade}
                className="flex flex-col justify-between h-full z-10"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Triple One Solution • Digital Outreach & Networking
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                      Award Winner • Top Intern
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Enterprise Outreach Campaigns & Lead Generation Networks
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                    Strategized target-driven outreach campaigns using sophisticated professional email marketing suites. Recognized officially as one of the top-performing corporate interns of the month for exemplary delivery execution.
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-1">
                      <div className="text-white text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                        Targeted Outreach Strategy
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Designed high-yield corporate outreach pipelines utilizing sophisticated professional email marketing suites.
                      </p>
                    </div>

                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-1">
                      <div className="text-white text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                        Top Intern Recognition
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Formally honored as the top-performing corporate intern of the month for exemplary speed and execution quality.
                      </p>
                    </div>

                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-1">
                      <div className="text-white text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                        Lead Generation Networks
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Analyzed enterprise digital networking models to build reliable, high-intent corporate lead pipelines.
                      </p>
                    </div>

                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-1">
                      <div className="text-white text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                        Performance & SEO Optimization
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Monitored email deliverability, landing page website optimization, and search engine discoverability.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-6 z-10">
                  {[
                    'Email Marketing Suites',
                    'Lead Generation',
                    'SEO',
                    'Enterprise Networking',
                    'Campaign Strategy',
                    'Advanced Excel'
                  ].map((s) => (
                    <span
                      key={s}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="tripleone-collapsed"
                {...contentFade}
                className="flex flex-col justify-between h-full z-10"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                      <Award className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                      Click to Expand ↗
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                      Triple One Solution
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Corporate Intern of the Month
                    </h3>
                  </div>

                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    Officially recognized and awarded for exemplary delivery execution, automated corporate outreach campaigns, and enterprise lead generation models.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Recognition Status</span>
                    <span className="text-amber-300 font-semibold flex items-center gap-1">
                      Top 1% Intern Cohort
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* =========================================================================
            ROW 2: CARD 1 - EDIFY EQUITY
           ========================================================================= */}
        <motion.div
          layout
          transition={springTransition}
          onClick={() => {
            if (focusedRow2 !== 'edify') setFocusedRow2('edify');
          }}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && focusedRow2 !== 'edify') {
              e.preventDefault();
              setFocusedRow2('edify');
            }
          }}
          className={`${
            focusedRow2 === 'edify'
              ? 'md:col-span-2 border-emerald-500/30 shadow-2xl shadow-emerald-500/10'
              : 'md:col-span-1 cursor-pointer hover:border-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/50'
          } apple-glass apple-glass-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group border border-white/10`}
          role={focusedRow2 !== 'edify' ? 'button' : undefined}
          tabIndex={focusedRow2 !== 'edify' ? 0 : undefined}
          aria-label="Edify Equity card"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

          <AnimatePresence mode="wait">
            {focusedRow2 === 'edify' ? (
              <motion.div
                key="edify-expanded"
                {...contentFade}
                className="flex flex-col justify-between h-full z-10"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Edify Equity • Finance & Market Research
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                      Financial Intelligence
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Stock Market Analysis & Company Fundamental Research
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                    Conducted deep dives into stock market trends, analyzed company fundamentals, and tracked macroeconomic indicators influencing global markets. Formulated periodic analytical insights and review presentations for senior leadership.
                  </p>

                  {/* Stock Chart Simulator */}
                  <div className="bg-black/50 rounded-2xl p-4 border border-white/10 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-400 font-mono">GLOBAL EQUITY BENCHMARK</span>
                      <span className="text-emerald-400 font-bold font-mono">+14.8% YTD Active</span>
                    </div>

                    <svg className="w-full h-14 stroke-emerald-400 fill-none" viewBox="0 0 200 50">
                      <path
                        d="M0 40 Q 30 30, 60 35 T 120 15 T 170 20 T 200 5"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <circle cx="200" cy="5" r="4" className="fill-emerald-400" />
                    </svg>

                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] pt-1 border-t border-white/10 text-zinc-400">
                      <div>
                        <div className="text-white font-mono font-medium">P/E 21.4</div>
                        <div>Valuation Multiple</div>
                      </div>
                      <div>
                        <div className="text-white font-mono font-medium">18.6%</div>
                        <div>Return on Equity</div>
                      </div>
                      <div>
                        <div className="text-white font-mono font-medium">Macro</div>
                        <div>Global Indicator</div>
                      </div>
                      <div>
                        <div className="text-white font-mono font-medium">Alpha</div>
                        <div>Risk/Yield Edge</div>
                      </div>
                    </div>
                  </div>

                  {/* 4 Pillars Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    <div className="bg-black/40 rounded-2xl p-3.5 border border-white/5 space-y-1">
                      <div className="text-white text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Macroeconomic Indicators
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Monitored global interest rates, inflation trends, and foreign institutional flows influencing Indian indices.
                      </p>
                    </div>

                    <div className="bg-black/40 rounded-2xl p-3.5 border border-white/5 space-y-1">
                      <div className="text-white text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Fundamental Equity Valuation
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Evaluated company balance sheets, revenue quality, debt-to-equity ratios, and competitive moats.
                      </p>
                    </div>

                    <div className="bg-black/40 rounded-2xl p-3.5 border border-white/5 space-y-1">
                      <div className="text-white text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Executive Leadership Briefings
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Synthesized market developments into concise weekly analytical digests and internal review presentations.
                      </p>
                    </div>

                    <div className="bg-black/40 rounded-2xl p-3.5 border border-white/5 space-y-1">
                      <div className="text-white text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Advanced Excel Modeling
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Formulated dynamic spreadsheet matrices, pivot models, and automated financial calculation sheets.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-6 z-10">
                  {[
                    'Financial Market Analysis',
                    'Company Fundamentals',
                    'Macroeconomics',
                    'Advanced Excel',
                    'Data Analysis',
                    'Equity Valuation'
                  ].map((s) => (
                    <span
                      key={s}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="edify-collapsed"
                {...contentFade}
                className="flex flex-col justify-between h-full z-10"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                      Click to Expand ↗
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                      Edify Equity
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Stock Market & Fundamental Research
                    </h3>
                  </div>

                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    Tracked stock market dynamics, synthesized company fundamentals, and formulated weekly presentation decks for senior leadership.
                  </p>

                  {/* Mini Sparkline Preview */}
                  <div className="bg-black/50 rounded-2xl p-3 border border-white/5">
                    <div className="flex justify-between items-center text-[11px] mb-1">
                      <span className="text-zinc-400 font-mono">Index Trend</span>
                      <span className="text-emerald-400 font-bold font-mono">+14.8% YTD</span>
                    </div>
                    <svg className="w-full h-8 stroke-emerald-400 fill-none" viewBox="0 0 200 40">
                      <path
                        d="M0 35 Q 30 25, 60 30 T 120 15 T 170 20 T 200 5"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Domain</span>
                    <span className="text-emerald-300 font-semibold flex items-center gap-1">
                      Financial Analytics
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* =========================================================================
            ROW 2: CARD 2 - ADORE (SIMTRAK)
           ========================================================================= */}
        <motion.div
          layout
          transition={springTransition}
          onClick={() => {
            if (focusedRow2 !== 'adore') setFocusedRow2('adore');
          }}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && focusedRow2 !== 'adore') {
              e.preventDefault();
              setFocusedRow2('adore');
            }
          }}
          className={`${
            focusedRow2 === 'adore'
              ? 'md:col-span-2 border-purple-500/30 shadow-2xl shadow-purple-500/10'
              : 'md:col-span-1 cursor-pointer hover:border-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50'
          } apple-glass apple-glass-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group border border-white/10`}
          role={focusedRow2 !== 'adore' ? 'button' : undefined}
          tabIndex={focusedRow2 !== 'adore' ? 0 : undefined}
          aria-label="Adore Simtrak card"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/15 rounded-full blur-[100px] pointer-events-none" />

          <AnimatePresence mode="wait">
            {focusedRow2 === 'adore' ? (
              <motion.div
                key="adore-expanded"
                {...contentFade}
                className="flex flex-col justify-between h-full z-10"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold flex items-center gap-2">
                      <HeartHandshake className="w-4 h-4" />
                      Adore (Simtrak) • Operations & Social Impact
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                      NGO Education & Ops
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Curriculum Engineering & Institutional Management
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                    Acquired comprehensively deep domain insights regarding core corporate management framework structures. Designed and executed structured educational curriculums to teach underprivileged students across partnered NGOs.
                  </p>

                  {/* 4 Pillars Operations Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-1">
                      <div className="text-white text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                        Curriculum Design & Execution
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Designed and executed structured educational curriculums to teach underprivileged students across partnered NGOs.
                      </p>
                    </div>

                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-1">
                      <div className="text-white text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                        Management Frameworks
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Acquired deep insights into organizational leadership, reporting hierarchies, and enterprise operations structures.
                      </p>
                    </div>

                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-1">
                      <div className="text-white text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                        Operational Spreadsheet Systems
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Maintained high-precision operational intelligence spreadsheets to coordinate daily scheduling and deliverables.
                      </p>
                    </div>

                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-1">
                      <div className="text-white text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                        Research-Driven Analytics
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Spearheaded internal research-driven analytical projects evaluating student learning outcomes and engagement metrics.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-6 z-10">
                  {[
                    'Corporate Management',
                    'Curriculum Design',
                    'Operational Spreadsheets',
                    'NGO Partnerships',
                    'Analytical Research'
                  ].map((s) => (
                    <span
                      key={s}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="adore-collapsed"
                {...contentFade}
                className="flex flex-col justify-between h-full z-10"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                      <HeartHandshake className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                      Click to Expand ↗
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
                      Adore (Simtrak)
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      NGO Education & Operations
                    </h3>
                  </div>

                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    Designed structured educational curricula to teach underprivileged students across partnered NGOs, maintaining high-precision operational spreadsheets.
                  </p>
                </div>

                <div className="space-y-2 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>Partnered NGO Network Outreach</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>Research-driven analytical frameworks</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* =========================================================================
            ROW 3: FULL-WIDTH PRODUCTION BENCHMARK BANNER
           ========================================================================= */}
        <div className="md:col-span-3 apple-glass apple-glass-hover rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group border border-white/10">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="space-y-2 z-10 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Engineering Philosophy
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                Clean & Fast
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Crafted with care. Fast, responsive, and accessible.
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              I believe the best software feels effortless — instant page loads, intuitive typography, and smooth micro-interactions that respect the user's time and device.
            </p>

            <div className="pt-1 flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Semantic HTML • Accessible Contrast (WCAG 2.2 AA) • Responsive Layouts</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center shrink-0 w-full md:w-auto z-10">
            <div className="bg-black/50 rounded-2xl px-5 py-4 border border-white/5 min-w-[90px]">
              <div className="text-cyan-400 font-bold text-2xl font-mono">99+</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Performance</div>
            </div>
            <div className="bg-black/50 rounded-2xl px-5 py-4 border border-white/5 min-w-[90px]">
              <div className="text-cyan-400 font-bold text-2xl font-mono">0ms</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">FID Delay</div>
            </div>
            <div className="bg-black/50 rounded-2xl px-5 py-4 border border-white/5 min-w-[90px]">
              <div className="text-cyan-400 font-bold text-2xl font-mono">100</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">SEO / Quality</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
