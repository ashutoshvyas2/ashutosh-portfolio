import React, { useState, useEffect } from 'react';
import { FileText, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'highlights', 'prototypes', 'experience', 'specs', 'gallery', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Overview' },
    { id: 'highlights', label: 'Innovations' },
    { id: 'prototypes', label: 'Prototypes' },
    { id: 'experience', label: 'Experience' },
    { id: 'specs', label: 'Tech Specs' },
    { id: 'gallery', label: 'Creative' },
    { id: 'contact', label: 'Connect' },
  ];

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out flex justify-center px-4 sm:px-6 ${
          scrolled ? 'pt-3 pb-2' : 'pt-6 pb-4'
        }`}
      >
        <nav
          className={`flex items-center justify-between transition-all duration-500 w-full max-w-5xl rounded-full px-5 py-2.5 sm:px-6 sm:py-3 ${
            scrolled
              ? 'apple-glass shadow-2xl shadow-black/80 border border-white/15'
              : 'bg-black/30 backdrop-blur-md border border-white/5'
          }`}
          aria-label="Main Navigation"
        >
          {/* Brand & Live Status */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-500 p-[1px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#090a0f] rounded-full flex items-center justify-center font-bold text-xs tracking-wider text-white">
                AG
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="font-semibold text-sm tracking-tight text-white group-hover:text-blue-400 transition-colors">
                {personalInfo.name}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open to Roles</span>
              </div>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 text-xs font-medium text-zinc-400">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-3 py-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-white/10 font-semibold shadow-inner'
                      : 'hover:text-zinc-100 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/25 transition-all duration-200 active:scale-95"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Resume</span>
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 transition-all duration-200 active:scale-95"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/85 backdrop-blur-2xl md:hidden pt-24 px-6 flex flex-col justify-between pb-12 animate-in fade-in duration-200">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold px-3">
              Navigation
            </p>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="w-full text-left px-4 py-3 text-lg font-medium text-zinc-200 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/15"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>View Full Verified Resume</span>
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/30"
            >
              <span>Contact Ashutosh</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
