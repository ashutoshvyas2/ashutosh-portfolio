import React, { useEffect, useRef, useState } from 'react';

/**
 * F1Cursor
 * High-performance F1 race car that chases the cursor like a racing line.
 * When the cursor comes to a stop:
 * - A full F1 Pit Crew arrives with tire gunners, jacks, and impact wrenches.
 * - Car lifts up into the Pit Box, tires get swapped with micro-sparks.
 * - A digital F1 stopwatch counts a lightning 1.8s pit stop.
 * - Moving the mouse releases the car with green lights and wheelspin smoke!
 */
export default function F1Cursor() {
  const [enabled, setEnabled] = useState(true);
  const [isPitStop, setIsPitStop] = useState(false);
  const [pitTime, setPitTime] = useState('0.00');
  const [pitStatus, setPitStatus] = useState('BOX BOX');
  const [tiresFitted, setTiresFitted] = useState(false);
  const [launchSmoke, setLaunchSmoke] = useState(false);

  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef(0);
  const lastMoveTimeRef = useRef(Date.now());
  const pitActiveRef = useRef(false);
  const pitStartRef = useRef(0);
  const animFrameRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Only initialize on desktop pointer devices
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    if (!isPointerFine) {
      setEnabled(false);
      return;
    }

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      lastMoveTimeRef.current = Date.now();

      if (pitActiveRef.current) {
        // Pit exit / launch
        pitActiveRef.current = false;
        setIsPitStop(false);
        setPitStatus('GO GO GO!');
        setLaunchSmoke(true);
        setTimeout(() => setLaunchSmoke(false), 600);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Place initial position near screen center
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

      // Pit Stop detection: cursor motionless for > 1200ms and car has smoothly decelerated into the pit box
      const currentSpeed = Math.hypot(velocityRef.current.x, velocityRef.current.y);
      if (timeSinceMove > 1200 && dist < 50 && currentSpeed < 1.6) {
        if (!pitActiveRef.current) {
          pitActiveRef.current = true;
          pitStartRef.current = now;
          setIsPitStop(true);
          setPitStatus('BOX BOX');
          setTiresFitted(false);
          velocityRef.current = { x: 0, y: 0 };
        } else {
          // Timer progression for pit stop
          const elapsed = (now - pitStartRef.current) / 1000;
          if (elapsed < 1.82) {
            setPitTime(elapsed.toFixed(2));
            setPitStatus('CHANGING TIRES...');
          } else {
            setPitTime('1.82');
            setPitStatus('TIRES FITTED ✓');
            setTiresFitted(true);
          }
        }
      } else {
        if (pitActiveRef.current) {
          pitActiveRef.current = false;
          setIsPitStop(false);
          setLaunchSmoke(true);
          setTimeout(() => setLaunchSmoke(false), 600);
        }
      }

      if (!pitActiveRef.current) {
        // Realistic aerodynamic F1 racing lag & momentum:
        // Car trails ~70-120px behind the cursor with smooth cornering inertia
        const accel = 0.045;
        const friction = 0.70;

        velocityRef.current.x = (velocityRef.current.x + dx * accel) * friction;
        velocityRef.current.y = (velocityRef.current.y + dy * accel) * friction;

        posRef.current.x += velocityRef.current.x;
        posRef.current.y += velocityRef.current.y;

        // Aerodynamic steering: smoothly bank towards the velocity vector
        const speed = Math.hypot(velocityRef.current.x, velocityRef.current.y);
        if (speed > 0.6) {
          const targetAngle = Math.atan2(velocityRef.current.y, velocityRef.current.x) * (180 / Math.PI);
          let diff = targetAngle - currentRotation;
          while (diff < -180) diff += 360;
          while (diff > 180) diff -= 360;
          currentRotation += diff * 0.16; // Smooth banking rotation
          rotationRef.current = currentRotation;
        }
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

  return (
    <>
      {/* Floating F1 Car & Pit Crew Canvas */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-50 pointer-events-none select-none"
        style={{
          willChange: 'transform',
          marginLeft: '-38px',
          marginTop: '-20px',
        }}
      >
        <div
          className="relative transition-transform duration-75"
          style={{
            transform: `rotate(${rotationRef.current}deg)`,
            transformOrigin: '38px 20px',
          }}
        >
          {/* ========================================================
              PIT STOP BOX & PIT CREW (Appears when cursor rests)
             ======================================================== */}
          {isPitStop && (
            <div className="absolute -inset-16 pointer-events-none">
              {/* Pit Box Yellow Border Floor Markings */}
              <div className="absolute top-10 left-6 right-6 bottom-10 border-2 border-dashed border-yellow-400/50 rounded-lg animate-pulse" />
              
              {/* Pit Stop LED Timing Board */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 px-3 py-1 rounded-full border border-yellow-400/40 text-[10px] font-mono text-yellow-400 shadow-xl whitespace-nowrap flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span>PIT: {pitTime}s</span>
                <span className="text-zinc-400">•</span>
                <span className={tiresFitted ? 'text-emerald-400 font-bold' : 'text-yellow-300'}>
                  {pitStatus}
                </span>
              </div>

              {/* Front Jack Operator */}
              <div className="absolute top-[28px] right-[4px] flex items-center">
                <div className="w-4 h-4 rounded-full bg-cyan-500/80 border border-white/20 shadow-md flex items-center justify-center text-[7px] font-bold text-black animate-bounce">
                  FJ
                </div>
                {/* Jack lever bar */}
                <div className="w-3 h-1 bg-zinc-400 rounded-sm" />
              </div>

              {/* Rear Jack Operator */}
              <div className="absolute top-[28px] left-[6px] flex items-center flex-row-reverse">
                <div className="w-4 h-4 rounded-full bg-cyan-500/80 border border-white/20 shadow-md flex items-center justify-center text-[7px] font-bold text-black animate-bounce">
                  RJ
                </div>
                {/* Jack lever bar */}
                <div className="w-3 h-1 bg-zinc-400 rounded-sm" />
              </div>

              {/* 4 Tire Mechanics with Impact Wheel Guns & Sparks */}
              {/* Front-Left Tire Gunner */}
              <div className="absolute top-[6px] right-[24px] flex flex-col items-center animate-pulse">
                <span className="text-[10px] animate-spin">⚡</span>
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500 border border-white/20 text-[6px] flex items-center justify-center font-bold text-black">
                  W
                </div>
              </div>

              {/* Front-Right Tire Gunner */}
              <div className="absolute bottom-[6px] right-[24px] flex flex-col items-center animate-pulse">
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500 border border-white/20 text-[6px] flex items-center justify-center font-bold text-black">
                  W
                </div>
                <span className="text-[10px] animate-spin">⚡</span>
              </div>

              {/* Rear-Left Tire Gunner */}
              <div className="absolute top-[4px] left-[26px] flex flex-col items-center animate-pulse">
                <span className="text-[10px] animate-spin">⚡</span>
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500 border border-white/20 text-[6px] flex items-center justify-center font-bold text-black">
                  W
                </div>
              </div>

              {/* Rear-Right Tire Gunner */}
              <div className="absolute bottom-[4px] left-[26px] flex flex-col items-center animate-pulse">
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500 border border-white/20 text-[6px] flex items-center justify-center font-bold text-black">
                  W
                </div>
                <span className="text-[10px] animate-spin">⚡</span>
              </div>
            </div>
          )}

          {/* ========================================================
              F1 CAR VECTOR (Precision Aerodynamic Top-Down View)
             ======================================================== */}
          <svg
            width="76"
            height="40"
            viewBox="0 0 76 40"
            className={`overflow-visible filter drop-shadow-[0_4px_10px_rgba(6,182,212,0.45)] transition-transform ${
              isPitStop ? 'scale-105' : ''
            }`}
          >
            <defs>
              {/* Carbon chassis gradient */}
              <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0a0a0c" />
                <stop offset="40%" stopColor="#18181b" />
                <stop offset="70%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>

              {/* Tire rubber gradient */}
              <linearGradient id="tireGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1c1917" />
                <stop offset="50%" stopColor="#292524" />
                <stop offset="100%" stopColor="#0c0a09" />
              </linearGradient>
            </defs>

            {/* Slipstream Aerodynamic Wake Trail (Visualizes high-speed trailing lag) */}
            {!isPitStop && (
              <g opacity="0.75">
                <line x1="-42" y1="11" x2="2" y2="11" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="6 4" />
                <line x1="-42" y1="29" x2="2" y2="29" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="6 4" />
                <line x1="-54" y1="20" x2="-6" y2="20" stroke="#38bdf8" strokeWidth="1" strokeDasharray="8 6" opacity="0.6" />
              </g>
            )}

            {/* Rear Wing Endplates & Main Plane */}
            <rect x="2" y="6" width="6" height="28" rx="1.5" fill="#09090b" stroke="#06b6d4" strokeWidth="1" />
            <rect x="4" y="9" width="4" height="22" fill="#22d3ee" />

            {/* Rear Tires with Red Pirelli Soft Compound Stripes */}
            <g>
              {/* Rear Left Tire */}
              <rect x="12" y="1" width="14" height="7" rx="2" fill="url(#tireGrad)" stroke="#111" strokeWidth="0.8" />
              <line x1="12" y1="4.5" x2="26" y2="4.5" stroke="#ef4444" strokeWidth="1.2" />

              {/* Rear Right Tire */}
              <rect x="12" y="32" width="14" height="7" rx="2" fill="url(#tireGrad)" stroke="#111" strokeWidth="0.8" />
              <line x1="12" y1="35.5" x2="26" y2="35.5" stroke="#ef4444" strokeWidth="1.2" />
            </g>

            {/* Aerodynamic Floor & Diffuser Strakes */}
            <path
              d="M 8 13 L 26 10 L 46 12 L 46 28 L 26 30 L 8 27 Z"
              fill="#050507"
              stroke="#27272a"
              strokeWidth="0.8"
            />

            {/* Main Chassis & Engine Cover */}
            <path
              d="M 8 16 L 24 13 L 42 14 L 64 19 L 68 20 L 64 21 L 42 26 L 24 27 L 8 24 Z"
              fill="url(#chassisGrad)"
            />

            {/* Sidepod Air Intakes */}
            <path d="M 28 13 L 38 13 L 42 15 L 28 15 Z" fill="#0891b2" />
            <path d="M 28 27 L 38 27 L 42 25 L 28 25 Z" fill="#0891b2" />

            {/* Halo Safety Cockpit & Driver Helmet */}
            <g>
              {/* Cockpit opening */}
              <ellipse cx="36" cy="20" rx="6" ry="3.5" fill="#09090b" />
              {/* Driver Helmet (Neon Cyan / Visor) */}
              <circle cx="36" cy="20" r="2.5" fill="#facc15" />
              <rect x="36.5" y="19" width="2" height="2" rx="0.5" fill="#18181b" />
              {/* Halo Titanium Spine */}
              <line x1="32" y1="20" x2="42" y2="20" stroke="#71717a" strokeWidth="1.2" />
            </g>

            {/* Front Wishbone Suspension Arms */}
            <line x1="44" y1="16" x2="52" y2="7" stroke="#71717a" strokeWidth="0.9" />
            <line x1="44" y1="24" x2="52" y2="33" stroke="#71717a" strokeWidth="0.9" />

            {/* Front Tires with Red Pirelli Soft Compound Stripes */}
            <g>
              {/* Front Left Tire */}
              <rect x="48" y="3" width="12" height="6" rx="2" fill="url(#tireGrad)" stroke="#111" strokeWidth="0.8" />
              <line x1="48" y1="6" x2="60" y2="6" stroke="#ef4444" strokeWidth="1.2" />

              {/* Front Right Tire */}
              <rect x="48" y="31" width="12" height="6" rx="2" fill="url(#tireGrad)" stroke="#111" strokeWidth="0.8" />
              <line x1="48" y1="34" x2="60" y2="34" stroke="#ef4444" strokeWidth="1.2" />
            </g>

            {/* Front Nose Cone & Multi-Element Front Wing */}
            <path
              d="M 64 8 L 74 12 L 74 28 L 64 32 L 63 26 L 68 20 L 63 14 Z"
              fill="#06b6d4"
              stroke="#0891b2"
              strokeWidth="0.8"
            />
            {/* Front Wing Cascade elements */}
            <line x1="66" y1="10" x2="72" y2="13" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />
            <line x1="66" y1="30" x2="72" y2="27" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />

            {/* Rear Rain Safety Light (Pulsing Red) */}
            <circle cx="2.5" cy="20" r="1.5" fill="#ef4444" className="animate-pulse" />
          </svg>

          {/* Launch Wheelspin Smoke / Exhaust Boost */}
          {launchSmoke && (
            <div className="absolute -left-6 top-1.5 flex items-center pointer-events-none animate-ping">
              <span className="text-xs">💨</span>
              <span className="text-xs text-cyan-400 font-bold font-mono">GO!</span>
            </div>
          )}
        </div>
      </div>

      {/* Companion Telemetry Control Pill (Bottom-Left Corner) */}
      <div className="fixed bottom-4 left-4 z-40 hidden sm:block">
        <button
          onClick={() => setEnabled(!enabled)}
          title={enabled ? "Disable F1 Cursor" : "Enable F1 Cursor"}
          className="apple-glass px-3 py-1.5 rounded-full text-[10px] text-zinc-300 hover:text-white border border-white/10 hover:border-cyan-500/30 transition-all flex items-center gap-2 shadow-2xl active:scale-95 cursor-pointer font-mono"
        >
          <span className={`w-2 h-2 rounded-full ${enabled ? (isPitStop ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-pulse') : 'bg-zinc-600'}`} />
          <span>
            {enabled
              ? isPitStop
                ? `🏎️ PIT BOX (${pitTime}s)`
                : '🏎️ F1 TELEMETRY: RACING'
              : '🏎️ F1: OFF'}
          </span>
        </button>
      </div>
    </>
  );
}
