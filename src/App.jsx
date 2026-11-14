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

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050507] text-[#f5f5f7] relative selection:bg-blue-500/30 selection:text-white">
      {/* Native CSS Scroll-driven progress indicator */}
      <ScrollProgress />

      {/* Floating Island Apple Navigation Dock */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* Main Content Sections */}
      <main>
        {/* Apple Keynote Hero Showcase */}
        <Hero onOpenResume={() => setResumeOpen(true)} />

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
      </main>

      {/* Minimalist Apple Footer */}
      <Footer />

      {/* Interactive Resume View & Print Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
