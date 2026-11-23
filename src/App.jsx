import React, { useState, useEffect } from 'react';
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
import F1Cursor from './components/F1Cursor';
import { ChevronLeft, ChevronRight, RotateCcw, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playChapterPop, playSuccessChime, playTactileClick } from './utils/soundEffects';
import { recordVisit, toggleOwnerMode, subscribeOwnerMode } from './utils/visitorTracker';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [ownerToast, setOwnerToast] = useState(null);

  // Initialize visit tracking & secret global shortcut (Ctrl+Shift+A or Alt+V)
  useEffect(() => {
    // Increment visitor count in cloud (deduplicated per session)
    recordVisit();

    const handleKeyDown = (e) => {
      // Secret Keybind: Ctrl + Shift + A or Alt + V
      if (
        (e.ctrlKey && e.shiftKey && (e.key.toLowerCase() === 'a' || e.code === 'KeyA')) ||
        (e.altKey && (e.key.toLowerCase() === 'v' || e.code === 'KeyV'))
      ) {
        e.preventDefault();
        const nextOwner = toggleOwnerMode();
        if (nextOwner) {
          playSuccessChime();
          setOwnerToast('unlocked');
        } else {
          playTactileClick();
          setOwnerToast('locked');
        }
        setTimeout(() => setOwnerToast(null), 3500);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const chapters = [
    { id: 'overview', label: 'About Me' },
    { id: 'innovations', label: 'Featured Work' },
    { id: 'prototypes', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'specs', label: 'Skills & Tools' },
    { id: 'gallery', label: 'Life Outside Code' },
    { id: 'contact', label: 'Get in Touch' },
  ];

  const currentIndex = chapters.findIndex((c) => c.id === activeTab);
  const prevTab = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextTab = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  const handleTabChange = (tabId) => {
    playChapterPop();
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#f5f5f7] relative selection:bg-blue-500/30 selection:text-white">
      {/* Native CSS Scroll-driven progress indicator */}
      <ScrollProgress />

      {/* Interactive Cursor-Chasing F1 Car & Pit Crew Companion */}
      <F1Cursor />

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

      {/* Secret Owner Mode Notification Toast */}
      {ownerToast && (
        <div className="fixed top-24 right-4 sm:right-6 z-50 px-4 py-2.5 rounded-2xl apple-glass border border-amber-500/35 bg-[#0e0e14]/90 text-amber-300 text-xs font-mono shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-3">
          <Lock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>
            {ownerToast === 'unlocked'
              ? '🔒 Owner Mode Unlocked — Scroll down to "Systems Optimal" in footer to view live visitor counts!'
              : '🔒 Owner Mode Locked — Visitor telemetry hidden.'}
          </span>
        </div>
      )}

      {/* Minimalist Apple Footer */}
      <Footer />

      {/* Interactive Resume View & Print Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
