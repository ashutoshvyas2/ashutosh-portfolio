import React, { useState } from 'react';
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronRight,
  Sparkles,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { experiences } from '../data/portfolioData';

export default function ExperienceTimeline() {
  const [selectedId, setSelectedId] = useState(experiences[0].id);
  const activeExp = experiences.find((e) => e.id === selectedId) || experiences[0];

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
          <Briefcase className="w-3.5 h-3.5" />
          Professional Track Record
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Experience & Impact
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg">
          Proven contributions across software development, financial analysis, operational leadership, and digital growth.
        </p>
      </div>

      {/* Interactive Apple-Style Keynote Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Selector List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold px-2 mb-2">
            Select Organization
          </p>
          {experiences.map((exp) => {
            const isSelected = exp.id === selectedId;
            return (
              <button
                key={exp.id}
                onClick={() => setSelectedId(exp.id)}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 border relative group ${
                  isSelected
                    ? 'apple-glass border-blue-500/40 shadow-xl shadow-blue-500/10 bg-white/[0.08]'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                }`}
              >
                {isSelected && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-r-full" />
                )}
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                  <span className="font-mono text-[11px]">{exp.period}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                    {exp.type}
                  </span>
                </div>
                <div className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">
                  {exp.company}
                </div>
                <div className="text-xs text-zinc-400 truncate mt-0.5">{exp.role}</div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep-Dive Detail View (7 cols) */}
        <div className="lg:col-span-7">
          <div className="apple-glass rounded-3xl p-6 sm:p-8 border border-white/15 relative overflow-hidden transition-all duration-300 shadow-2xl">
            {/* Top ambient glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[90px] pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Header Badging */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-5">
                <div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold uppercase tracking-wider inline-block mb-2">
                    {activeExp.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {activeExp.role}
                  </h3>
                  <div className="text-base font-medium text-blue-400 mt-1">
                    {activeExp.company}
                  </div>
                </div>

                <div className="text-right text-xs text-zinc-400 space-y-1">
                  <div className="flex items-center gap-1.5 justify-end">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{activeExp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-end text-zinc-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{activeExp.location}</span>
                  </div>
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {activeExp.description}
              </p>

              {/* Key Deliverables & Achievements */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                  Core Responsibilities & Delivery
                </h4>
                <div className="space-y-2.5">
                  {activeExp.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="w-3 h-3" />
                      </span>
                      <span className="leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies & Domain Stack */}
              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                  Applied Tech Stack & Competencies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeExp.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-200 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
