import React, { useState } from 'react';
import { Camera, Waves, Globe2, Sparkles, Sliders, Aperture, Eye } from 'lucide-react';
import { hobbies } from '../data/portfolioData';
import { playTactileClick } from '../utils/soundEffects';

export default function CreativeGallery() {
  const [activeFilter, setActiveFilter] = useState('natural');
  const [activePhoto, setActivePhoto] = useState(0);

  const photos = [
    {
      id: 0,
      title: "Solitude in Chiaroscuro",
      location: "Sealdah Railway Station • Kolkata",
      specs: "4.81 mm • f/1.8 • 1/3000s • ISO 411",
      description: "A candid moment of stillness amidst Kolkata's historic transit corridor — capturing a dog curled inside a solitary shaft of sunlight carved against deep platform shadows.",
      image: "/gallery/dog-solitude.jpg"
    },
    {
      id: 1,
      title: "Ridge Twilight & Sunset Glow",
      location: "Gap Road, Munnar • Kerala",
      specs: "24mm • f/2.2 • 1/1250s • ISO 80",
      description: "Golden hour luminescence breaking across the Western Ghats mountain ridges along Gap Road, Munnar, framed by native highland branches.",
      image: "/gallery/mountain-sunset.jpg?v=2"
    },
    {
      id: 2,
      title: "Dusk on Juhu Shoreline",
      location: "Juhu Beach • Mumbai, Maharashtra",
      specs: "26mm • f/1.8 • 1/640s • ISO 160",
      description: "A vivid sunset gradient igniting the Arabian Sea horizon, with Mumbai's coastal skyline silhouetted against the energetic beach crowd.",
      image: "/gallery/juhu-sunset.jpg"
    }
  ];

  const filterStyles = {
    natural: '',
    mono: 'grayscale contrast-125',
    vibrant: 'saturate-150 contrast-105',
    noir: 'grayscale contrast-150 brightness-90'
  };

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5" />
          Life Outside Code
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Perspective & everyday moments.
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg">
          When I step away from the monitor, I take my camera out for walks across Kolkata and Mumbai, train for endurance swimming, and study languages.
        </p>
      </div>

      {/* Apple 'Shot on' Interactive Gallery Showcase */}
      <div className="apple-glass rounded-3xl p-6 sm:p-8 border border-white/15 relative overflow-hidden shadow-2xl mb-12">
        {/* Apple Camera UI Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10 mb-6 text-xs text-zinc-400">
          <div className="flex items-center gap-2 font-mono">
            <Aperture className="w-4 h-4 text-amber-400" />
            <span className="text-white font-semibold uppercase tracking-wider">PRO RAW STUDIO</span>
            <span className="text-zinc-400 font-mono">• {photos[activePhoto].specs}</span>
          </div>

          {/* Interactive Tone Filter Controls */}
          <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-full border border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 px-2 font-semibold">
              Filter:
            </span>
            {['natural', 'mono', 'vibrant', 'noir'].map((f) => (
              <button
                key={f}
                onClick={() => {
                  playTactileClick();
                  setActiveFilter(f);
                }}
                className={`px-2.5 py-1 rounded-full text-[11px] capitalize transition-all ${
                  activeFilter === f
                    ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Image Display with Apple Bezel & Ambient Blur Backdrop */}
        <div className="relative rounded-2xl overflow-hidden min-h-[420px] sm:min-h-[500px] max-h-[580px] flex items-center justify-center bg-black/90 border border-white/10 group">
          {/* Ambient blurred reflection behind the photo */}
          <div
            className={`absolute inset-0 bg-cover bg-center blur-3xl opacity-25 scale-110 pointer-events-none transition-all duration-700 ${filterStyles[activeFilter]}`}
            style={{ backgroundImage: `url(${photos[activePhoto].image})` }}
          />

          {/* Actual Uncropped Photograph */}
          <img
            src={photos[activePhoto].image}
            alt={photos[activePhoto].title}
            loading="lazy"
            className={`relative z-10 max-h-[520px] max-w-full w-auto object-contain transition-all duration-700 ${filterStyles[activeFilter]} group-hover:scale-[1.02] rounded-lg shadow-2xl`}
          />

          {/* Bottom Gradient Overlay & Meta */}
          <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-5 sm:p-7 pointer-events-none">
            <div className="max-w-xl space-y-1">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold font-mono">
                {photos[activePhoto].location}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {photos[activePhoto].title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2">
                {photos[activePhoto].description}
              </p>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Row */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {photos.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                playTactileClick();
                setActivePhoto(idx);
              }}
              className={`relative rounded-xl overflow-hidden h-24 sm:h-28 border transition-all ${
                activePhoto === idx
                  ? 'border-amber-400 ring-2 ring-amber-400/20 scale-[1.01]'
                  : 'border-white/10 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-2.5 text-left">
                <span className="text-xs text-white font-medium truncate">{p.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 3 Pillar Cards (Photography • Swimming • Polyglot) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hobbies.map((h, i) => (
          <div
            key={i}
            className="apple-glass rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${h.accent} rounded-full blur-[60px] pointer-events-none`} />

            <div className="space-y-3 relative z-10">
              <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold font-mono">
                {h.tagline}
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">{h.title}</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {h.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                {h.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
