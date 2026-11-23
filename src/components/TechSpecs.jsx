import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Cpu,
  Code2,
  TrendingUp,
  Briefcase,
  Search,
  Sparkles,
  Layers,
  CheckCircle2,
  Languages,
  Play
} from 'lucide-react';
import { technicalSkills, personalInfo } from '../data/portfolioData';
import { playTactileClick } from '../utils/soundEffects';
import KineticProverbModal from './KineticProverbModal';

export default function TechSpecs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bottomSentinelRef = useRef(null);
  const hasAutoTriggeredRef = useRef(false);

  // Auto-trigger kinetic proverb modal when user scrolls to bottom of Skills & Tools
  useEffect(() => {
    const alreadySeen = sessionStorage.getItem('proverb_modal_seen');
    if (alreadySeen) {
      hasAutoTriggeredRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAutoTriggeredRef.current) {
          hasAutoTriggeredRef.current = true;
          sessionStorage.setItem('proverb_modal_seen', 'true');
          // Brief 350ms pause as user settles at bottom of section
          setTimeout(() => {
            setIsModalOpen(true);
          }, 350);
        }
      },
      { threshold: 0.5 }
    );

    if (bottomSentinelRef.current) {
      observer.observe(bottomSentinelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = ['All', ...technicalSkills.map((c) => c.category)];

  const filteredCategories = useMemo(() => {
    return technicalSkills
      .map((cat) => {
        const matchesCategory = selectedCategory === 'All' || cat.category === selectedCategory;
        if (!matchesCategory) return null;

        const filteredSkills = cat.skills.filter(
          (s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.level.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredSkills.length === 0 && searchQuery) return null;

        return {
          ...cat,
          skills: searchQuery ? filteredSkills : cat.skills
        };
      })
      .filter(Boolean);
  }, [searchQuery, selectedCategory]);

  return (
    <section id="specs" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5" />
          Skills & Toolkit
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Technologies I use to build.
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg">
          The languages, frameworks, databases, and analytical tools I rely on to turn concepts into reliable software.
        </p>
      </div>

      {/* Filter and Search Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search specifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-blue-500/60 transition-colors"
            />
          </div>

          {/* Category Dropdown/Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playTactileClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

      {/* Spec Matrix Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((group) => (
          <div
            key={group.category}
            className="apple-glass rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden"
          >
            {/* Category Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {group.category}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">{group.description}</p>
              </div>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 font-mono">
                {group.skills.length} Specs
              </span>
            </div>

            {/* Spec Items List */}
            <div className="space-y-3">
              {group.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-black/30 hover:bg-white/[0.04] border border-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-[10px] ml-2 text-zinc-500 uppercase tracking-wider">
                        {skill.tag}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-white/5 text-zinc-300 border border-white/10 font-mono">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Multilingual Capabilities Pill Sheet */}
      <div className="mt-8 apple-glass rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Languages className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Linguistic Architecture</h4>
            <p className="text-xs text-zinc-400">Multi-lingual fluency enabling clear cross-cultural collaboration</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {personalInfo.languages.map((lang) => (
            <div
              key={lang.name}
              className="px-3.5 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs flex items-center gap-2"
            >
              <span className="font-semibold text-white">{lang.name}</span>
              <span className="text-zinc-500 font-mono text-[11px]">• {lang.level}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Engineering Philosophy Banner & Replay Trigger */}
      <div className="mt-6 apple-glass rounded-2xl p-6 border border-amber-500/25 bg-gradient-to-r from-amber-500/10 via-transparent to-cyan-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white">Engineering Philosophy</h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono border border-amber-400/30 font-semibold">
                THE COMPLETE PROVERB
              </span>
            </div>
            <p className="text-xs text-zinc-300 mt-0.5">
              "Jack of all trades, master of none... but oftentimes better than a master of one."
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            playTactileClick();
            setIsModalOpen(true);
          }}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 active:scale-95 text-black text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-400/20 shrink-0"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Experience Philosophy</span>
        </button>
      </div>

      {/* Invisible Bottom Sentinel for Auto-Triggering Pop-Up */}
      <div ref={bottomSentinelRef} className="h-4 w-full" aria-hidden="true" />

      {/* Kinetic Typography Proverb Pop-Up Modal */}
      <KineticProverbModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
