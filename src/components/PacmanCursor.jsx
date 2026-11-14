import React, { useEffect, useRef, useState } from 'react';

/**
 * PacmanCursor
 * An interactive, playful companion that chases the mouse cursor.
 * - When cursor moves: Pacman chases the cursor with realistic waka-waka mouth chomping and smooth direction tracking.
 * - When cursor is at rest: Pacman slows to a stop near the cursor, closes its eyes, breathes, and dreams with floating 'Zzz's.
 * - Non-intrusive: pointer-events-none ensures zero interference with clicking.
 */
export default function PacmanCursor() {
  const [enabled, setEnabled] = useState(true);
  const [isSleeping, setIsSleeping] = useState(false);
  const [mouthAngle, setMouthAngle] = useState(0.2);
  const [facingLeft, setFacingLeft] = useState(false);
  const [rotation, setRotation] = useState(0);

  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastMoveTimeRef = useRef(Date.now());
  const chompPhaseRef = useRef(0);
  const sleepingRef = useRef(false);
  const animFrameRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Only initialize on devices with precise pointer (mouse/trackpad)
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    if (!isPointerFine) {
      setEnabled(false);
      return;
    }

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      lastMoveTimeRef.current = Date.now();
      if (sleepingRef.current) {
        sleepingRef.current = false;
        setIsSleeping(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Initial position placed near screen center if not yet moved
    if (posRef.current.x < 0) {
      const initX = window.innerWidth / 2;
      const initY = window.innerHeight / 2;
      posRef.current = { x: initX, y: initY };
      targetRef.current = { x: initX, y: initY };
    }

    let currentRotation = 0;

    const loop = () => {
      const now = Date.now();
      const timeSinceMove = now - lastMoveTimeRef.current;

      const dx = targetRef.current.x - posRef.current.x;
      const dy = targetRef.current.y - posRef.current.y;
      const dist = Math.hypot(dx, dy);

      // Sleep threshold: if cursor hasn't moved for 1.6s and pacman is close to cursor
      if (timeSinceMove > 1600 && dist < 35) {
        if (!sleepingRef.current) {
          sleepingRef.current = true;
          setIsSleeping(true);
        }
      } else {
        if (sleepingRef.current) {
          sleepingRef.current = false;
          setIsSleeping(false);
        }
      }

      if (!sleepingRef.current) {
        // Chase physics: smooth spring lerp towards cursor
        // Target an offset so Pacman doesn't sit exactly on the tip of the cursor
        const speed = Math.min(0.14, Math.max(0.06, dist * 0.0008));
        posRef.current.x += dx * speed;
        posRef.current.y += dy * speed;

        // Calculate direction angle
        if (dist > 8) {
          const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
          // Smooth rotation
          let diff = targetAngle - currentRotation;
          while (diff < -180) diff += 360;
          while (diff > 180) diff -= 360;
          currentRotation += diff * 0.2;
          setRotation(currentRotation);

          const isLeft = Math.abs(currentRotation) > 90;
          setFacingLeft(isLeft);
        }

        // Chomp animation speed scales with speed of movement
        if (dist > 12) {
          chompPhaseRef.current += 0.28;
          const openAmount = 0.08 + 0.42 * Math.abs(Math.sin(chompPhaseRef.current));
          setMouthAngle(openAmount);
        } else {
          // Slow relaxed chewing when hovering close
          chompPhaseRef.current += 0.08;
          setMouthAngle(0.08 + 0.2 * Math.abs(Math.sin(chompPhaseRef.current)));
        }
      } else {
        // In sleep state: mouth is closed, gentle relaxation
        setMouthAngle(0.03);
      }

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  // Compute SVG arc path for Pacman with dynamic mouthAngle
  const cx = 22;
  const cy = 22;
  const r = 18;
  const theta = mouthAngle; // In radians
  const x1 = cx + r * Math.cos(theta);
  const y1 = cy - r * Math.sin(theta);
  const x2 = cx + r * Math.cos(-theta);
  const y2 = cy - r * Math.sin(-theta);

  // Path arc from (x1, y1) counter-clockwise to (x2, y2)
  const pacmanPath = `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 1 0 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;

  return (
    <>
      {/* Floating Pacman Container */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-50 pointer-events-none select-none transition-opacity duration-300"
        style={{
          willChange: 'transform',
          marginLeft: '-22px',
          marginTop: '-22px',
        }}
      >
        <div
          className={`relative transition-transform duration-150 ${
            isSleeping ? 'animate-pacman-breathe' : ''
          }`}
          style={{
            transform: `rotate(${rotation}deg) ${facingLeft ? 'scaleY(-1)' : ''}`,
            transformOrigin: '22px 22px',
          }}
        >
          {/* Ambient Glow Aura */}
          <div className="absolute inset-0 rounded-full bg-amber-400/25 blur-[10px] pointer-events-none" />

          {/* Pacman SVG */}
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            className="overflow-visible filter drop-shadow-[0_2px_8px_rgba(250,204,21,0.5)]"
          >
            <defs>
              <linearGradient id="pacmanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="60%" stopColor="#FACC15" />
                <stop offset="100%" stopColor="#EAB308" />
              </linearGradient>
            </defs>

            {/* Yellow Body */}
            <path d={pacmanPath} fill="url(#pacmanGrad)" />

            {/* Gloss highlight */}
            <circle cx="16" cy="12" r="2.5" fill="#FFFFFF" opacity="0.35" />

            {/* Eyes */}
            {isSleeping ? (
              /* Closed sleeping eye (curved eyelid) */
              <path
                d="M 18 15 Q 22 11 26 15"
                stroke="#1c1917"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              /* Awake open eye with gloss reflection */
              <g>
                <circle cx="21" cy="13" r="2.8" fill="#18181b" />
                <circle cx="22.2" cy="12" r="1.1" fill="#ffffff" />
              </g>
            )}
          </svg>

          {/* Floating 'Zzz' Sleep Particles */}
          {isSleeping && (
            <div className="absolute -top-6 left-5 pointer-events-none font-mono font-bold select-none">
              <span className="absolute text-blue-300 text-xs animate-zzz-1">Z</span>
              <span className="absolute text-indigo-300 text-[10px] animate-zzz-2">z</span>
              <span className="absolute text-purple-300 text-[8px] animate-zzz-3">z</span>
            </div>
          )}
        </div>
      </div>

      {/* Subtle Companion Toggle Pill (Fixed in Bottom-Left Corner) */}
      <div className="fixed bottom-4 left-4 z-40 hidden sm:block">
        <button
          onClick={() => setEnabled(!enabled)}
          title={enabled ? "Hide Pac-Companion" : "Wake Pac-Companion"}
          className="apple-glass px-2.5 py-1 rounded-full text-[10px] text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 transition-all flex items-center gap-1.5 shadow-lg active:scale-95 cursor-pointer"
        >
          <span className="text-amber-400 font-mono text-xs">●</span>
          <span>{enabled ? (isSleeping ? 'Pacman: Asleep 💤' : 'Pacman: Chasing 🏃') : 'Pacman: Off'}</span>
        </button>
      </div>
    </>
  );
}
