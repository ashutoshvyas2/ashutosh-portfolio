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
import PacmanCursor from './components/PacmanCursor';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const chapters = [
    { id: 'overview', label: 'Overview' },
    { id: 'innovations', label: 'Innovations' },
    { id: 'prototypes', label: 'Prototypes' },
    { id: 'experience', label: 'Experience' },
    { id: 'specs', label: 'Tech Specs' },
    { id: 'gallery', label: 'Creative Studio' },
    { id: 'contact', label: 'Connect' },
  ];

  const currentIndex = chapters.findIndex((c) => c.id === activeTab);
  const prevTab = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextTab = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#f5f5f7] relative selection:bg-blue-500/30 selection:text-white">
      {/* Native CSS Scroll-driven progress indicator */}
      <ScrollProgress />

      {/* Interactive Cursor-Chasing Sleeping Pacman Companion */}
      <PacmanCursor />

      {/* Floating Island Apple Navigation Dock */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        activeTab={activeTab}
        onSelectTab={handleTabChange}
      />

      {/* Main Chapter Content */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pt-4 sm:pt-6"
          >
            {activeTab === 'overview' && (
              <Hero
                onOpenResume={() => setResumeOpen(true)}
                onExplore={() => handleTabChange('innovations')}
              />
            )}
            {activeTab === 'innovations' && <BentoShowcase />}
            {activeTab === 'prototypes' && <PrototypesShowcase />}
            {activeTab === 'experience' && <ExperienceTimeline />}
            {activeTab === 'specs' && <TechSpecs />}
            {activeTab === 'gallery' && <CreativeGallery />}
            {activeTab === 'contact' && <ContactSection />}

            {/* Chapter Progression Controller */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 pt-6">
              <div className="apple-glass rounded-3xl p-5 sm:p-7 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono">
                    Chapter {currentIndex + 1} of {chapters.length}
                  </span>
                  <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${((currentIndex + 1) / chapters.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
                    • {chapters[currentIndex].label}
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  {prevTab && (
                    <button
                      onClick={() => handleTabChange(prevTab.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-medium transition-all active:scale-95 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Previous: {prevTab.label}</span>
                    </button>
                  )}

                  {nextTab ? (
                    <button
                      onClick={() => handleTabChange(nextTab.id)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-all active:scale-95 shadow-lg shadow-white/10 cursor-pointer"
                    >
                      <span>Continue to {nextTab.label}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleTabChange('overview')}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-all active:scale-95 shadow-lg shadow-white/10 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Back to Overview</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Minimalist Apple Footer */}
      <Footer />

      {/* Interactive Resume View & Print Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
