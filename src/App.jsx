import React, { useState } from 'react';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoShowcase from './components/BentoShowcase';
import PrototypesShowcase from './components/PrototypesShowcase';
import ExperienceTimeline from './components/ExperienceTimeline';
import TechSpecs from './components/TechSpecs';
import CreativeGallery from './components/CreativeGallery';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import { Sparkles, ChevronDown, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [viewMode, setViewMode] = useState('overview'); // 'overview' | 'showcase'

  const handleNavigate = (sectionId) => {
    if (sectionId === 'hero') {
      setViewMode('overview');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setViewMode('showcase');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const yOffset = -80;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 75);
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#f5f5f7] relative selection:bg-blue-500/30 selection:text-white">
      {/* Native CSS Scroll-driven progress indicator */}
      <ScrollProgress />

      {/* Floating Island Apple Navigation Dock */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onNavigate={handleNavigate}
        viewMode={viewMode}
      />

      {/* Main Content Sections */}
      <main>
        {/* Apple Keynote Hero Showcase (Always Visible) */}
        <Hero
          onOpenResume={() => setResumeOpen(true)}
          onExplore={() => handleNavigate('highlights')}
        />

        {/* When in Overview Mode: Apple-style Teaser before Footer */}
        {viewMode === 'overview' && (
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <div className="apple-glass rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
              
              <div className="relative z-10 space-y-4 max-w-xl mx-auto">
                <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Full Portfolio Showcase
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Discover Live Work & Systems
                </h3>
                
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                  Interactive Bento Grid, 4 active software prototypes, real-world industry timeline, technical spec sheet, and creative photography studio.
                </p>
                
                <div className="pt-2">
                  <button
                    onClick={() => handleNavigate('highlights')}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all duration-300 shadow-xl shadow-white/10 active:scale-95 cursor-pointer"
                  >
                    <span>Unfold Innovations & Showcase</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Showcase Sections: Unfold upon clicking Innovations or any nav item */}
        <AnimatePresence>
          {viewMode === 'showcase' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Bento Grid Innovations */}
              <BentoShowcase />

              {/* Ashutosh Labs • Active Prototypes & MVPs */}
              <PrototypesShowcase />

              {/* Experience & Impact Timeline */}
              <ExperienceTimeline />

              {/* Apple-style Tech Specifications Sheet */}
              <TechSpecs />

              {/* Creative Photography & Personal Perspective */}
              <CreativeGallery />

              {/* Dispatch & Contact Suite */}
              <ContactSection />

              {/* Bottom Quick Return Bar */}
              <div className="text-center py-8">
                <button
                  onClick={() => handleNavigate('hero')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white text-xs font-medium transition-all cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Return to Minimal Overview</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Minimalist Apple Footer */}
      <Footer />

      {/* Interactive Resume View & Print Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
