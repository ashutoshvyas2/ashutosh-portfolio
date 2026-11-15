import React, { useEffect, useRef, useState } from 'react';
import { 
  Gauge, 
  Radio, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Sliders, 
  Power, 
  RotateCcw,
  Flag,
  Crosshair,
  Volume2,
  VolumeX
} from 'lucide-react';
import { 
  playTireRatchet, 
  playTactileClick, 
  isSoundEnabled, 
  toggleSound, 
  subscribeSound 
} from '../utils/soundEffects';

/**
 * Formula 1 Tire Compound Configurations
 */
const TIRE_COMPOUNDS = {
  soft: {
    id: 'soft',
    name: 'Soft',
    code: 'C5',
    color: '#ef4444',
    bgBadge: 'bg-red-500/20 text-red-400 border-red-500/40',
    grip: 1.15,
    gripLabel: '+15% Grip (High Bite)',
    desc: 'Max downforce & instantaneous steering responsiveness',
  },
  medium: {
    id: 'medium',
    name: 'Medium',
    code: 'C3',
    color: '#eab308',
    bgBadge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
    grip: 1.0,
    gripLabel: 'Standard Grip (Balanced)',
    desc: 'Optimal aerodynamic balance between speed and glide',
  },
  hard: {
    id: 'hard',
    name: 'Hard',
    code: 'C1',
    color: '#f4f4f5',
    bgBadge: 'bg-zinc-300/20 text-zinc-200 border-zinc-400/40',
    grip: 0.85,
    gripLabel: '-15% Grip (Long Drift)',
    desc: 'High aerodynamic momentum with floaty, smooth trailing lag',
  },
  inter: {
    id: 'inter',
    name: 'Inter',
    code: 'WET',
    color: '#10b981',
    bgBadge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    grip: 0.95,
    gripLabel: 'Wet Grooved (Spray Trail)',
    desc: 'Active tire tread grooves with water spray wake behind car',
  },
};

/**
 * Radio Voice Messages triggered by telemetry events
 */
const RADIO_MESSAGES = {
  idle: 'Box, box, box! Hit your marks in the pit lane.',
  pitStop: 'Crew ready on jacks. Wheel guns firing, changing all four.',
  drsActive: 'DRS flap open! Battery deployment mode 8 active.',
  highSpeed: 'Push push, purple in sector 2! Pace is flying.',
  highG: 'Heavy lateral load through the apex, watch tire graining.',
  normal: 'Telemetry normal. Power unit operating at peak thermal window.',
};

/**
 * F1Cursor with Live Pit Wall Telemetry HUD (Option 2)
 */
export default function F1Cursor() {
  const [enabled, setEnabled] = useState(true);
  const [hudOpen, setHudOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [selectedTire, setSelectedTire] = useState('soft');
  const [isPitStop, setIsPitStop] = useState(false);
  const [pitTime, setPitTime] = useState('0.00');
  const [pitStatus, setPitStatus] = useState('BOX BOX');
  const [tiresFitted, setTiresFitted] = useState(false);
  const [launchSmoke, setLaunchSmoke] = useState(false);
  const [steerAngle, setSteerAngle] = useState(0);
  const [isDrsOpen, setIsDrsOpen] = useState(false);

  // High-frequency telemetry refs (Direct DOM updates for 60/120 FPS zero-jank)
  const speedTextRef = useRef(null);
  const speedPillRef = useRef(null);
  const gearTextRef = useRef(null);
  const gearPillRef = useRef(null);
  const rpmTextRef = useRef(null);
  const rpmBarRef = useRef(null);
  const gForceTextRef = useRef(null);
  const gDotRef = useRef(null);
  const drsBadgeRef = useRef(null);
  const radioTextRef = useRef(null);
  const shiftLightRefs = useRef([]);

  // Physics & Animation tracking refs
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const rotationRef = useRef(0);
  const lastMoveTimeRef = useRef(Date.now());
  const pitActiveRef = useRef(false);
  const pitStartRef = useRef(0);
  const animFrameRef = useRef(null);
  const containerRef = useRef(null);
  const smoothSpeedRef = useRef(0);
  const lateralGRef = useRef(0);
  const tireRef = useRef(TIRE_COMPOUNDS.soft);
  const lastRadioMsgRef = useRef('');

  // Keep sound state in sync
  useEffect(() => {
    const unsubscribe = subscribeSound((val) => setSoundOn(val));
    return unsubscribe;
  }, []);

  // Keep tireRef up to date with selected tire
  useEffect(() => {
    tireRef.current = TIRE_COMPOUNDS[selectedTire] || TIRE_COMPOUNDS.soft;
  }, [selectedTire]);

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

      // Pit Stop detection: cursor still for > 1300ms & car within stopping range
      if (timeSinceMove > 1300 && dist < 42) {
        if (!pitActiveRef.current) {
          pitActiveRef.current = true;
          pitStartRef.current = now;
          setIsPitStop(true);
          setPitStatus('BOX BOX');
          setTiresFitted(false);
          setSteerAngle(0);
          setIsDrsOpen(false);
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

      let currentSteer = 0;
      let drsActive = false;

      if (!pitActiveRef.current) {
        // Dynamic grip factor from selected tire compound
        const grip = tireRef.current.grip || 1.0;
        const baseSpeed = Math.min(0.12, Math.max(0.06, dist * 0.00065));
        const effectiveSpeed = baseSpeed * grip;

        posRef.current.x += dx * effectiveSpeed;
        posRef.current.y += dy * effectiveSpeed;

        // Aerodynamic steering: rotate smoothly towards cursor direction
        if (dist > 6) {
          const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
          let diff = targetAngle - currentRotation;
          while (diff < -180) diff += 360;
          while (diff > 180) diff -= 360;
          currentRotation += diff * 0.20;
          rotationRef.current = currentRotation;

          // Articulated Front Steering & Active Front Wing Flaps
          currentSteer = Math.max(-22, Math.min(22, diff * 1.35));
          setSteerAngle(currentSteer);

          // Active Rear Wing DRS on straights
          drsActive = dist > 45 && Math.abs(diff) < 9;
          setIsDrsOpen(drsActive);
        } else {
          setSteerAngle(0);
          setIsDrsOpen(false);
        }
      } else {
        setSteerAngle(0);
        setIsDrsOpen(false);
      }

      // ========================================================
      // TELEMETRY CALCULATIONS (Speed, Gear, RPM, G-Force, Radio)
      // ========================================================
      const rawSpeed = pitActiveRef.current ? 0 : Math.min(348, Math.round(dist * 4.9));
      smoothSpeedRef.current += (rawSpeed - smoothSpeedRef.current) * 0.14;
      const speedKmH = Math.max(0, Math.round(smoothSpeedRef.current));

      // F1 Gear ratio calculation
      let currentGear = 'N';
      if (speedKmH > 15) {
        if (speedKmH < 65) currentGear = '1';
        else if (speedKmH < 115) currentGear = '2';
        else if (speedKmH < 165) currentGear = '3';
        else if (speedKmH < 220) currentGear = '4';
        else if (speedKmH < 265) currentGear = '5';
        else if (speedKmH < 305) currentGear = '6';
        else if (speedKmH < 330) currentGear = '7';
        else currentGear = '8';
      }

      // RPM calculation (idle: 4,200 RPM, peak rev: 14,850 RPM)
      let rpm = 4200;
      if (speedKmH > 15) {
        const gearNum = parseInt(currentGear) || 1;
        const speedInGear = speedKmH - (gearNum - 1) * 38;
        rpm = Math.min(14850, Math.round(7200 + (speedInGear / 60) * 7200));
      } else if (pitActiveRef.current) {
        rpm = 4000 + Math.round(Math.sin(now / 150) * 120);
      }

      // Lateral G-Force calculation
      const rawG = (Math.abs(currentSteer) / 22) * (speedKmH / 300) * 4.8;
      lateralGRef.current += (rawG - lateralGRef.current) * 0.16;
      const lateralG = lateralGRef.current.toFixed(1);

      // Contextual Pit Wall Radio Message
      let currentRadioMsg = RADIO_MESSAGES.normal;
      if (pitActiveRef.current) {
        currentRadioMsg = tiresFitted ? 'Tires fitted. Green light at pit exit!' : RADIO_MESSAGES.pitStop;
      } else if (drsActive) {
        currentRadioMsg = RADIO_MESSAGES.drsActive;
      } else if (speedKmH > 295) {
        currentRadioMsg = RADIO_MESSAGES.highSpeed;
      } else if (lateralGRef.current > 2.6) {
        currentRadioMsg = RADIO_MESSAGES.highG;
      }

      // ========================================================
      // DIRECT DOM TELEMETRY UPDATES (Zero React Re-render Lag)
      // ========================================================
      if (speedTextRef.current) speedTextRef.current.innerText = speedKmH;
      if (speedPillRef.current) speedPillRef.current.innerText = `${speedKmH} km/h`;
      if (gearTextRef.current) gearTextRef.current.innerText = currentGear;
      if (gearPillRef.current) gearPillRef.current.innerText = currentGear === 'N' ? 'N' : `G${currentGear}`;
      if (rpmTextRef.current) rpmTextRef.current.innerText = `${rpm.toLocaleString()} RPM`;
      if (gForceTextRef.current) gForceTextRef.current.innerText = `${lateralG} G`;

      // Update Rev Bar percentage
      if (rpmBarRef.current) {
        const pct = Math.min(100, Math.max(0, ((rpm - 4000) / 10850) * 100));
        rpmBarRef.current.style.width = `${pct}%`;
      }

      // Update Shift Lights (10 LEDs: 3 Green, 4 Red, 3 Purple)
      const litCount = Math.floor(((rpm - 6000) / 8850) * 10);
      shiftLightRefs.current.forEach((led, idx) => {
        if (!led) return;
        const isLit = idx < litCount;
        if (isLit) {
          if (idx < 3) led.style.backgroundColor = '#10b981'; // Green
          else if (idx < 7) led.style.backgroundColor = '#ef4444'; // Red
          else led.style.backgroundColor = '#a855f7'; // Purple (Optimal Shift)
          led.style.boxShadow = '0 0 6px currentColor';
        } else {
          led.style.backgroundColor = '#27272a';
          led.style.boxShadow = 'none';
        }
      });

      // Update 2D Friction Circle Dot (Lateral G Vector)
      if (gDotRef.current) {
        const xOffset = (currentSteer / 22) * 14;
        const yOffset = (Math.min(1, speedKmH / 320) * 10) - 5;
        gDotRef.current.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      }

      // Update DRS Active Badge
      if (drsBadgeRef.current) {
        if (drsActive) {
          drsBadgeRef.current.innerText = 'DRS ACTIVE ⚡';
          drsBadgeRef.current.className = 'text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse font-bold';
        } else {
          drsBadgeRef.current.innerText = 'DRS OFF';
          drsBadgeRef.current.className = 'text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-white/5';
        }
      }

      // Update Radio Message
      if (radioTextRef.current && lastRadioMsgRef.current !== currentRadioMsg) {
        lastRadioMsgRef.current = currentRadioMsg;
        radioTextRef.current.innerText = currentRadioMsg;
      }

      // Move Car Position
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

  const currentTireObj = TIRE_COMPOUNDS[selectedTire] || TIRE_COMPOUNDS.soft;

  return (
    <>
      {/* ========================================================
          FLOATING F1 CAR & PIT CREW CANVAS (30px Precision Racer)
         ======================================================== */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-50 pointer-events-none select-none"
        style={{
          willChange: 'transform',
          marginLeft: '-15px',
          marginTop: '-8px',
        }}
      >
        <div
          className="relative transition-transform duration-75"
          style={{
            transform: `rotate(${rotationRef.current}deg)`,
            transformOrigin: '15px 8px',
          }}
        >
          {/* ========================================================
              PIT STOP BOX & PIT CREW
             ======================================================== */}
          {isPitStop && (
            <div className="absolute pointer-events-none inset-0">
              {/* Pit Box Yellow Border Floor Markings */}
              <div className="absolute -top-2 -bottom-2 -left-3 -right-3 border border-dashed border-yellow-400/60 rounded-md animate-pulse" />
              
              {/* Pit Stop LED Timing Board */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/95 px-2 py-0.5 rounded-full border border-yellow-400/40 text-[9px] font-mono text-yellow-400 shadow-xl whitespace-nowrap flex items-center gap-1.5 z-20">
                <span className="w-1 h-1 rounded-full bg-red-500 animate-ping" />
                <span>PIT: {pitTime}s</span>
                <span className="text-zinc-400">•</span>
                <span className={tiresFitted ? 'text-emerald-400 font-bold' : 'text-yellow-300'}>
                  {pitStatus}
                </span>
              </div>

              {/* Front Jack Operator */}
              <div className="absolute top-[2px] -right-3 flex items-center">
                <div className="w-3 h-3 rounded-full bg-cyan-500/80 border border-white/20 shadow-md flex items-center justify-center text-[5px] font-bold text-black animate-bounce">
                  FJ
                </div>
              </div>

              {/* Rear Jack Operator */}
              <div className="absolute top-[2px] -left-3 flex items-center">
                <div className="w-3 h-3 rounded-full bg-cyan-500/80 border border-white/20 shadow-md flex items-center justify-center text-[5px] font-bold text-black animate-bounce">
                  RJ
                </div>
              </div>

              {/* 4 Tire Mechanics with Impact Wheel Guns & Sparks */}
              <div className="absolute -top-2.5 left-[19px] flex flex-col items-center animate-pulse">
                <span className="text-[7px] animate-spin">⚡</span>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 text-[5px] flex items-center justify-center font-bold text-black">
                  W
                </div>
              </div>

              <div className="absolute -bottom-2.5 left-[19px] flex flex-col items-center animate-pulse">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 text-[5px] flex items-center justify-center font-bold text-black">
                  W
                </div>
                <span className="text-[7px] animate-spin">⚡</span>
              </div>

              <div className="absolute -top-2.5 left-[4px] flex flex-col items-center animate-pulse">
                <span className="text-[7px] animate-spin">⚡</span>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 text-[5px] flex items-center justify-center font-bold text-black">
                  W
                </div>
              </div>

              <div className="absolute -bottom-2.5 left-[4px] flex flex-col items-center animate-pulse">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 text-[5px] flex items-center justify-center font-bold text-black">
                  W
                </div>
                <span className="text-[7px] animate-spin">⚡</span>
              </div>
            </div>
          )}

          {/* ========================================================
              F1 CAR VECTOR (30px Dynamic Color-Coded Tire Compounds)
             ======================================================== */}
          <svg
            width="30"
            height="16"
            viewBox="0 0 76 40"
            className={`overflow-visible filter drop-shadow-[0_2px_6px_rgba(6,182,212,0.45)] transition-transform ${
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

            {/* Slipstream Wake Trail (Standard or Wet Spray) */}
            {!isPitStop && (
              <g opacity="0.75">
                <line x1="-42" y1="11" x2="2" y2="11" stroke={selectedTire === 'inter' ? '#10b981' : '#22d3ee'} strokeWidth="1.5" strokeDasharray="6 4" />
                <line x1="-42" y1="29" x2="2" y2="29" stroke={selectedTire === 'inter' ? '#10b981' : '#22d3ee'} strokeWidth="1.5" strokeDasharray="6 4" />
                <line x1="-54" y1="20" x2="-6" y2="20" stroke="#38bdf8" strokeWidth="1" strokeDasharray="8 6" opacity="0.6" />
                {selectedTire === 'inter' && (
                  <circle cx="-25" cy="11" r="1.5" fill="#38bdf8" opacity="0.7" className="animate-ping" />
                )}
              </g>
            )}

            {/* Rear Wing Endplates */}
            <rect x="2" y="6" width="6" height="28" rx="1.5" fill="#09090b" stroke="#06b6d4" strokeWidth="1" />
            <rect x="4" y="9" width="3" height="22" fill="#0e7490" />

            {/* Active Upper DRS Flap */}
            <g
              transform={isDrsOpen ? 'translate(-3.5, 0)' : 'translate(0, 0)'}
              className="transition-transform duration-150"
            >
              <rect x="5" y="9" width="3" height="22" rx="0.5" fill="#22d3ee" stroke="#0891b2" strokeWidth="0.5" />
              {isDrsOpen && (
                <rect x="4.5" y="17" width="2" height="6" rx="0.5" fill="#10b981" className="animate-pulse" />
              )}
            </g>

            {/* Rear Tires with Dynamic Compound Color Stripe */}
            <g>
              <rect x="12" y="1" width="14" height="7" rx="2" fill="url(#tireGrad)" stroke="#111" strokeWidth="0.8" />
              <line x1="12" y1="4.5" x2="26" y2="4.5" stroke={currentTireObj.color} strokeWidth="1.2" />

              <rect x="12" y="32" width="14" height="7" rx="2" fill="url(#tireGrad)" stroke="#111" strokeWidth="0.8" />
              <line x1="12" y1="35.5" x2="26" y2="35.5" stroke={currentTireObj.color} strokeWidth="1.2" />
            </g>

            {/* Floor & Chassis */}
            <path d="M 8 13 L 26 10 L 46 12 L 46 28 L 26 30 L 8 27 Z" fill="#050507" stroke="#27272a" strokeWidth="0.8" />
            <path d="M 8 16 L 24 13 L 42 14 L 64 19 L 68 20 L 64 21 L 42 26 L 24 27 L 8 24 Z" fill="url(#chassisGrad)" />

            {/* Sidepod Intakes */}
            <path d="M 28 13 L 38 13 L 42 15 L 28 15 Z" fill="#0891b2" />
            <path d="M 28 27 L 38 27 L 42 25 L 28 25 Z" fill="#0891b2" />

            {/* Halo Safety Cockpit & Helmet */}
            <g>
              <ellipse cx="36" cy="20" rx="6" ry="3.5" fill="#09090b" />
              <circle cx="36" cy="20" r="2.5" fill="#facc15" />
              <rect x="36.5" y="19" width="2" height="2" rx="0.5" fill="#18181b" />
              <line x1="32" y1="20" x2="42" y2="20" stroke="#71717a" strokeWidth="1.2" />
            </g>

            {/* Front Suspension Wishbones */}
            <line x1="44" y1="16" x2="52" y2="7" stroke="#71717a" strokeWidth="0.9" />
            <line x1="44" y1="24" x2="52" y2="33" stroke="#71717a" strokeWidth="0.9" />

            {/* Front Left Tire (Dynamic Compound Stripe) */}
            <g transform={`rotate(${steerAngle}, 54, 6)`} className="transition-transform duration-75">
              <rect x="48" y="3" width="12" height="6" rx="2" fill="url(#tireGrad)" stroke="#111" strokeWidth="0.8" />
              <line x1="48" y1="6" x2="60" y2="6" stroke={currentTireObj.color} strokeWidth="1.2" />
            </g>

            {/* Front Right Tire (Dynamic Compound Stripe) */}
            <g transform={`rotate(${steerAngle}, 54, 34)`} className="transition-transform duration-75">
              <rect x="48" y="31" width="12" height="6" rx="2" fill="url(#tireGrad)" stroke="#111" strokeWidth="0.8" />
              <line x1="48" y1="34" x2="60" y2="34" stroke={currentTireObj.color} strokeWidth="1.2" />
            </g>

            {/* Front Wing Flap Cascades */}
            <g transform={`rotate(${steerAngle * 0.65}, 68, 20)`} className="transition-transform duration-75">
              <path d="M 64 8 L 74 11 L 75 20 L 74 29 L 64 32 L 63 26 L 68 20 L 63 14 Z" fill="#06b6d4" stroke="#0891b2" strokeWidth="0.8" />
              <line x1="66" y1="10" x2="73" y2="13" stroke="#ffffff" strokeWidth="1" opacity="0.9" />
              <line x1="66" y1="30" x2="73" y2="27" stroke="#ffffff" strokeWidth="1" opacity="0.9" />
              <rect x="63" y="7" width="9" height="1.8" rx="0.5" fill="#22d3ee" />
              <rect x="63" y="31.2" width="9" height="1.8" rx="0.5" fill="#22d3ee" />
            </g>

            {/* Rear Rain Light */}
            <circle cx="2.5" cy="20" r="1.5" fill="#ef4444" className="animate-pulse" />
          </svg>

          {/* Launch Smoke */}
          {launchSmoke && (
            <div className="absolute -left-4 top-0 flex items-center pointer-events-none animate-ping">
              <span className="text-[10px]">💨</span>
              <span className="text-[9px] text-cyan-400 font-bold font-mono">GO!</span>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================
          F1 PIT WALL TELEMETRY HUD (Option 2 - Collapsible Dock)
         ======================================================== */}
      <div className="fixed bottom-4 left-4 z-40 hidden sm:block font-sans select-none">
        {/* EXPANDED TELEMETRY HUD DASHBOARD */}
        {hudOpen && (
          <div className="mb-2 w-80 sm:w-88 apple-glass rounded-2xl p-4 border border-cyan-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-300">
            {/* Header / Title Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
                <span className="text-xs font-mono font-bold tracking-wider text-white">
                  PIT WALL TELEMETRY
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => toggleSound()}
                  className={`p-1 rounded-md transition-colors cursor-pointer ${
                    soundOn ? 'text-cyan-400 bg-cyan-500/10' : 'text-zinc-500 hover:text-white hover:bg-white/10'
                  }`}
                  title={soundOn ? 'Mute interface sound' : 'Enable interface sound'}
                >
                  {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    playTactileClick();
                    setHudOpen(false);
                  }}
                  className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Collapse Telemetry HUD"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* F1 Steering Wheel Rev Lights (10 LEDs) */}
            <div className="pt-3 pb-2">
              <div className="flex items-center justify-between gap-1 px-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    ref={(el) => (shiftLightRefs.current[i] = el)}
                    className="h-2 flex-1 rounded-sm bg-zinc-800 transition-colors duration-75"
                  />
                ))}
              </div>
              {/* Rev Progress Bar */}
              <div className="mt-1 h-0.5 w-full bg-zinc-800/80 rounded-full overflow-hidden">
                <div
                  ref={rpmBarRef}
                  className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-purple-500 transition-all duration-75"
                  style={{ width: '0%' }}
                />
              </div>
            </div>

            {/* Primary Gauges: Speedometer + Gear + RPM */}
            <div className="grid grid-cols-3 gap-2 py-2 items-center text-center bg-black/40 rounded-xl p-2.5 border border-white/5">
              {/* Speedometer */}
              <div className="flex flex-col items-center">
                <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-mono">
                  Speed
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span
                    ref={speedTextRef}
                    className="text-2xl sm:text-3xl font-mono font-black text-cyan-400"
                  >
                    0
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">km/h</span>
                </div>
              </div>

              {/* Gear Indicator */}
              <div className="flex flex-col items-center border-x border-white/10">
                <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-mono">
                  Gear
                </span>
                <span
                  ref={gearTextRef}
                  className="text-3xl font-mono font-black text-yellow-400 mt-0.5 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                >
                  N
                </span>
              </div>

              {/* Engine RPM */}
              <div className="flex flex-col items-center">
                <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-mono">
                  Engine
                </span>
                <span
                  ref={rpmTextRef}
                  className="text-xs sm:text-sm font-mono font-bold text-zinc-200 mt-1"
                >
                  4,200 RPM
                </span>
              </div>
            </div>

            {/* Secondary Telemetry: Lateral G-Force + DRS Flap */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              {/* Lateral G-Force & 2D Friction Circle */}
              <div className="bg-black/30 rounded-xl p-2 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-mono block">
                    Lateral G
                  </span>
                  <span
                    ref={gForceTextRef}
                    className="text-sm font-mono font-bold text-white mt-0.5 block"
                  >
                    0.0 G
                  </span>
                </div>
                {/* 2D Vector Crosshair */}
                <div className="relative w-7 h-7 rounded-full border border-white/20 bg-zinc-900/80 flex items-center justify-center">
                  <div className="absolute w-full h-[1px] bg-white/10" />
                  <div className="absolute h-full w-[1px] bg-white/10" />
                  <div
                    ref={gDotRef}
                    className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] transition-transform duration-75"
                  />
                </div>
              </div>

              {/* DRS & Pit Delta */}
              <div className="bg-black/30 rounded-xl p-2 border border-white/5 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-mono">
                    Aero Wing
                  </span>
                  <span
                    ref={drsBadgeRef}
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-white/5"
                  >
                    DRS OFF
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mt-1">
                  <span>PIT RECORD:</span>
                  <span className="text-emerald-400 font-bold">1.82s ✓</span>
                </div>
              </div>
            </div>

            {/* Interactive Pirelli Tire Compound Selector */}
            <div className="mt-3 pt-2.5 border-t border-white/10">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Sliders className="w-3 h-3 text-cyan-400" />
                  <span>Tire Compound</span>
                </span>
                <span className="text-[9px] font-mono text-zinc-400">
                  {currentTireObj.gripLabel}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {Object.values(TIRE_COMPOUNDS).map((compound) => {
                  const isActive = selectedTire === compound.id;
                  return (
                    <button
                      key={compound.id}
                      onClick={() => {
                        playTireRatchet();
                        setSelectedTire(compound.id);
                      }}
                      className={`px-2 py-1.5 rounded-lg text-center transition-all cursor-pointer border ${
                        isActive
                          ? `${compound.bgBadge} shadow-[0_0_12px_rgba(255,255,255,0.15)] ring-1 ring-white/20 scale-[1.02]`
                          : 'bg-black/20 text-zinc-400 hover:text-white border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: compound.color }}
                        />
                        <span className="text-[10px] font-mono font-bold">
                          {compound.code}
                        </span>
                      </div>
                      <span className="text-[8px] font-mono block text-zinc-400 uppercase">
                        {compound.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pit Wall Team Radio Feed */}
            <div className="mt-3 bg-black/50 rounded-xl p-2 border border-white/5 flex items-start gap-2">
              <Radio className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5 animate-pulse" />
              <div className="overflow-hidden">
                <span className="text-[8px] font-mono uppercase tracking-wider text-zinc-400 block">
                  Team Radio
                </span>
                <p
                  ref={radioTextRef}
                  className="text-[10px] font-mono text-zinc-300 leading-tight italic truncate"
                >
                  Telemetry online. Car in optimal thermal window.
                </p>
              </div>
            </div>

            {/* Footer Power Toggle */}
            <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-400">
              <span className="font-mono text-[9px] text-zinc-400">
                Move cursor to accelerate • Hold still to Box
              </span>
              <button
                onClick={() => setEnabled(false)}
                className="text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors cursor-pointer text-[9px] font-mono"
                title="Turn off F1 cursor companion"
              >
                <Power className="w-2.5 h-2.5" />
                <span>Disable</span>
              </button>
            </div>
          </div>
        )}

        {/* COMPACT DOCK PILL (Always visible when companion is enabled) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playTactileClick();
              setHudOpen(!hudOpen);
            }}
            className="apple-glass px-3 py-1.5 rounded-full text-[11px] text-zinc-300 hover:text-white border border-white/10 hover:border-cyan-500/40 transition-all flex items-center gap-2 shadow-2xl active:scale-95 cursor-pointer group"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isPitStop ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-pulse'
              }`}
            />
            <span className="font-mono font-bold text-cyan-300 flex items-center gap-1">
              <span>🏎️</span>
              <span ref={speedPillRef}>0 km/h</span>
            </span>
            <span className="text-zinc-500">•</span>
            <span
              ref={gearPillRef}
              className="font-mono text-yellow-400 font-bold"
            >
              N
            </span>
            <span className="text-zinc-500">•</span>
            {/* Tire Compound Mini Badge */}
            <span
              className="w-2 h-2 rounded-full border border-black/40"
              style={{ backgroundColor: currentTireObj.color }}
              title={`Tire: ${currentTireObj.name}`}
            />
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-400 group-hover:text-cyan-300 flex items-center gap-1 font-mono text-[10px]">
              <span>Telemetry</span>
              {hudOpen ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronUp className="w-3 h-3" />
              )}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
