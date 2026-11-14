import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#2997ff', '#9333ea', '#34d399', '#ffffff']
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    triggerConfetti();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    triggerConfetti();
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    // Launch mailto directly with prefilled user message
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name}`);
    const body = encodeURIComponent(
      `Hello Ashutosh,\n\n${formState.message}\n\nFrom: ${formState.name} (${formState.email})`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;

    setSubmitted(true);
    triggerConfetti();
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" />
          Direct Dispatch
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Let's Build Something Exceptional.
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg">
          Currently open to full-stack engineering roles, financial analytics positions, and visionary product collaborations.
        </p>
      </div>

      {/* Main Grid: Direct Contact Cards + Fast Message Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Contact Information Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email Quick Action Card */}
          <div className="apple-glass rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-300 font-mono">
                Primary Channel
              </span>
            </div>
            <div className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
              Email Address
            </div>
            <div className="text-base sm:text-lg font-bold text-white mt-1 break-all">
              {personalInfo.email}
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
              <button
                onClick={handleCopyEmail}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-white border border-white/10 transition-colors"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-xs font-semibold text-white shadow-md shadow-blue-500/20 transition-colors"
              >
                <span>Compose</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Direct Phone / Call Card */}
          <div className="apple-glass rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 font-mono">
                Direct Line
              </span>
            </div>
            <div className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
              Mobile Contact
            </div>
            <div className="text-base sm:text-lg font-bold text-white mt-1 font-mono">
              {personalInfo.phoneDisplay}
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
              <button
                onClick={handleCopyPhone}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-white border border-white/10 transition-colors"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPhone ? 'Copied' : 'Copy Number'}</span>
              </button>
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-xs font-semibold text-white shadow-md shadow-emerald-500/20 transition-colors"
              >
                <span>Call Directly</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Location Badge Card */}
          <div className="apple-glass rounded-2xl p-4 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-zinc-400">Based in</div>
              <div className="text-sm font-semibold text-white">{personalInfo.location}</div>
            </div>
          </div>
        </div>

        {/* Right Side: Message Dispatch Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="apple-glass rounded-3xl p-6 sm:p-8 border border-white/15 relative overflow-hidden shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6">
              Share details about your project, team opportunity, or inquiry. I typically respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-zinc-300">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-blue-500/80 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-zinc-300">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-blue-500/80 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-semibold text-zinc-300">
                  Message / Project Scope
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your vision, role opportunity, or project requirements..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-blue-500/80 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold text-sm shadow-xl shadow-blue-500/25 transition-all duration-300 active:scale-95 disabled:opacity-70"
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Opening Mail Client...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message via Email Client</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
