import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Waves, 
  ChevronDown, 
  ChevronUp, 
  Heart, 
  Timer, 
  Flame, 
  Activity, 
  Award,
  Sparkles
} from 'lucide-react';
import { playWaterSplash, playTactileClick, playSuccessChime } from '../utils/soundEffects';

/**
 * Mini 25-Meter Olympic Lap Pool Simulator
 * 
 * Features:
 * - Top-down FINA-regulation 25m swimming lane (touch pads, floating lane ropes, floor T-turn markers).
 * - Animated top-down swimmer with synchronized freestyle/breaststroke arm cycles and kick wake.
 * - Automatic 180° tumble turn (flip-turn) at the wall with propulsion bubbles and lap counter.
 * - Real-time swimming telemetry (Laps, Distance, Pace clock, Aerobic heart rate, Burned kcal).
 * - F1 CAR SUPPRESSION: Dispatches 'f1-suppress' event so the F1 car stays completely away while
 *   the pool is playing, and immediately resumes when paused or minimized!
 */
export default function LapPoolSimulator() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [strokeType, setStrokeType] = useState('freestyle'); // 'freestyle' | 'breaststroke' | 'butterfly'
  const [laps, setLaps] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [swimmerX, setSwimmerX] = useState(6); // 6% to 94% along the 25m lane
  const [swimmerDir, setSwimmerDir] = useState(1); // 1 = swimming right, -1 = swimming left
  const [isTurning, setIsTurning] = useState(false);
  const [armPhase, setArmPhase] = useState(0); // 0 to 360 for arm stroke rotation

  const animRef = useRef(null);
  const lastTimeRef = useRef(Date.now());
  const swimmerPosRef = useRef(6);
  const swimmerDirRef = useRef(1);
  const turningRef = useRef(false);
  const lapsRef = useRef(0);

  // Synchronize F1 Car suppression with play state and minimize state
  useEffect(() => {
    const shouldSuppress = isPlaying && !isMinimized;
    window.dispatchEvent(
      new CustomEvent('f1-suppress', { detail: { suppress: shouldSuppress } })
    );

    return () => {
      // Ensure suppression is cleared on component unmount
      window.dispatchEvent(
        new CustomEvent('f1-suppress', { detail: { suppress: false } })
      );
    };
  }, [isPlaying, isMinimized]);

  // Swimming physics loop
  useEffect(() => {
    if (!isPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    lastTimeRef.current = Date.now();

    const loop = () => {
      const now = Date.now();
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      setElapsedTime((prev) => prev + dt);

      // Stroke speed modifiers
      let swimSpeed = 16.5; // % of pool per second (approx 6s per 25m lap)
      if (strokeType === 'breaststroke') swimSpeed = 13.5;
      if (strokeType === 'butterfly') swimSpeed = 19.0;

      if (!turningRef.current) {
        swimmerPosRef.current += swimmerDirRef.current * swimSpeed * dt;
        setArmPhase((prev) => (prev + dt * 480) % 360);

        // Right Wall Flip-Turn Detection (92%)
        if (swimmerDirRef.current === 1 && swimmerPosRef.current >= 92) {
          swimmerPosRef.current = 92;
          triggerFlipTurn(-1);
        }
        // Left Wall Flip-Turn Detection (8%)
        else if (swimmerDirRef.current === -1 && swimmerPosRef.current <= 8) {
          swimmerPosRef.current = 8;
          triggerFlipTurn(1);
        }

        setSwimmerX(swimmerPosRef.current);
      }

      animRef.current = requestAnimationFrame(loop);
    };

    const triggerFlipTurn = (newDir) => {
      turningRef.current = true;
      setIsTurning(true);
      playWaterSplash();

      // Complete the flip turn rotation and push-off
      setTimeout(() => {
        swimmerDirRef.current = newDir;
        setSwimmerDir(newDir);
        lapsRef.current += 1;
        setLaps(lapsRef.current);
        turningRef.current = false;
        setIsTurning(false);

        // Milestone cheer every 4 laps (100m)
        if (lapsRef.current % 4 === 0) {
          playSuccessChime();
        }
      }, 340);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, strokeType]);

  const handlePlayToggle = () => {
    playTactileClick();
    if (isMinimized) {
      setIsMinimized(false);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    playTactileClick();
    setIsPlaying(false);
    setLaps(0);
    lapsRef.current = 0;
    setElapsedTime(0);
    swimmerPosRef.current = 6;
    setSwimmerX(6);
    swimmerDirRef.current = 1;
    setSwimmerDir(1);
    turningRef.current = false;
    setIsTurning(false);
    window.dispatchEvent(
      new CustomEvent('f1-suppress', { detail: { suppress: false } })
    );
  };

  const handleMinimizeToggle = () => {
    playTactileClick();
    const nextMinimized = !isMinimized;
    setIsMinimized(nextMinimized);

    // If minimizing while playing, stop or release F1 car suppression
    if (nextMinimized) {
      window.dispatchEvent(
        new CustomEvent('f1-suppress', { detail: { suppress: false } })
      );
    } else if (isPlaying) {
      window.dispatchEvent(
        new CustomEvent('f1-suppress', { detail: { suppress: true } })
      );
    }
  };

  // Formatted pace clock mm:ss.t
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = Math.floor(elapsedTime % 60);
  const tenths = Math.floor((elapsedTime * 10) % 10);
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`;

  const totalMeters = laps * 25;
  const simulatedHeartRate = isPlaying ? Math.min(156, 128 + Math.floor(laps * 2.2)) : 68;
  const burnedCalories = Math.round(laps * 12.5 + (elapsedTime / 60) * 8.5);

  return (
    <div className="mt-8 apple-glass rounded-3xl p-5 sm:p-7 border border-cyan-500/25 shadow-2xl relative overflow-hidden transition-all duration-300">
      {/* Ambient water shimmer backdrop */}
      <div className="absolute top-0 right-1/4 w-96 h-48 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Control Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Waves className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                25M OLYMPIC LAP POOL // LANE 4
              </span>
              <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-cyan-400 animate-ping' : 'bg-zinc-500'}`} />
            </div>
            <p className="text-[11px] text-zinc-400">
              Interactive endurance training simulator • F1 companion parks when active
            </p>
          </div>
        </div>

        {/* Action Controls: Play / Reset / Minimize */}
        <div className="flex items-center gap-2">
          {/* Stroke Type Switcher */}
          {!isMinimized && (
            <div className="hidden md:flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/10 text-[10px] font-mono mr-1">
              {[
                { id: 'freestyle', label: 'Freestyle' },
                { id: 'breaststroke', label: 'Breaststroke' },
                { id: 'butterfly', label: 'Butterfly' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    playTactileClick();
                    setStrokeType(s.id);
                  }}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    strokeType === s.id
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {/* Main Play / Pause Button */}
          <button
            onClick={handlePlayToggle}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-lg ${
              isPlaying
                ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/20'
                : 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-cyan-400/20'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause Lap</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                <span>Swim Laps</span>
              </>
            )}
          </button>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            title="Reset lap counter and pace clock"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Minimize / Expand Button */}
          <button
            onClick={handleMinimizeToggle}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            title={isMinimized ? 'Expand Pool Simulator' : 'Minimize Pool Simulator'}
          >
            {isMinimized ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* EXPANDED SIMULATOR VIEW */}
      {!isMinimized && (
        <div className="pt-4 space-y-4 animate-in fade-in duration-200">
          {/* ========================================================
              25-METER SWIMMING POOL SVG / CANVAS LANE
             ======================================================== */}
          <div className="relative w-full h-32 sm:h-36 rounded-2xl overflow-hidden border border-cyan-400/30 shadow-[inset_0_4px_25px_rgba(0,0,0,0.6)] select-none">
            {/* Azure pool water background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0284c7] via-[#0369a1] to-[#075985]" />

            {/* Subtle animated water ripple shimmer */}
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.4)_0%,transparent_60%)] animate-pulse" />

            {/* Left and Right Wall Electronic Touch Pads */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#e0f2fe] border-r-2 border-yellow-400 z-10 flex items-center justify-center">
              <span className="text-[6px] font-mono font-bold text-black rotate-90 whitespace-nowrap">START</span>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-[#e0f2fe] border-l-2 border-yellow-400 z-10 flex items-center justify-center">
              <span className="text-[6px] font-mono font-bold text-black -rotate-90 whitespace-nowrap">25M</span>
            </div>

            {/* Top Lane Float Rope (Red 0-5m & 20-25m, White/Blue alternating in center) */}
            <div className="absolute top-1 left-3 right-3 h-2 flex items-center justify-between z-10 pointer-events-none opacity-90">
              <div className="flex gap-0.5">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="w-2 h-1.5 rounded-sm bg-red-500 shadow-sm" />
                ))}
              </div>
              <div className="flex gap-1">
                {[...Array(16)].map((_, i) => (
                  <span key={i} className={`w-2 h-1.5 rounded-sm shadow-sm ${i % 2 === 0 ? 'bg-white' : 'bg-blue-600'}`} />
                ))}
              </div>
              <div className="flex gap-0.5">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="w-2 h-1.5 rounded-sm bg-red-500 shadow-sm" />
                ))}
              </div>
            </div>

            {/* Bottom Lane Float Rope */}
            <div className="absolute bottom-1 left-3 right-3 h-2 flex items-center justify-between z-10 pointer-events-none opacity-90">
              <div className="flex gap-0.5">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="w-2 h-1.5 rounded-sm bg-red-500 shadow-sm" />
                ))}
              </div>
              <div className="flex gap-1">
                {[...Array(16)].map((_, i) => (
                  <span key={i} className={`w-2 h-1.5 rounded-sm shadow-sm ${i % 2 === 0 ? 'bg-white' : 'bg-blue-600'}`} />
                ))}
              </div>
              <div className="flex gap-0.5">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="w-2 h-1.5 rounded-sm bg-red-500 shadow-sm" />
                ))}
              </div>
            </div>

            {/* Pool Floor Centerline & 2m "T" Turn Markers */}
            <div className="absolute inset-0 flex items-center justify-between px-8 pointer-events-none">
              {/* Left Wall Floor "T" Marker */}
              <div className="w-3 h-12 bg-slate-950/40 rounded-sm" />
              {/* Center Black Guide Line */}
              <div className="flex-1 h-2 bg-slate-950/30 mx-2" />
              {/* Right Wall Floor "T" Marker */}
              <div className="w-3 h-12 bg-slate-950/40 rounded-sm" />
            </div>

            {/* Distance Markers */}
            <div className="absolute bottom-3 left-4 right-4 flex justify-between text-[8px] font-mono text-cyan-200/70 font-semibold pointer-events-none">
              <span>0m</span>
              <span>5m</span>
              <span>10m</span>
              <span>15m</span>
              <span>20m</span>
              <span>25m</span>
            </div>

            {/* ========================================================
                THE TOP-DOWN SWIMMER (With wake foam & arm cycle)
               ======================================================== */}
            <div
              className="absolute top-1/2 -translate-y-1/2 transition-transform pointer-events-none z-20"
              style={{
                left: `${swimmerX}%`,
                transform: `translate(-50%, -50%) ${isTurning ? 'rotate(180deg) scale(0.95)' : swimmerDir === -1 ? 'scaleX(-1)' : 'scaleX(1)'}`,
                transitionDuration: isTurning ? '300ms' : '0ms',
              }}
            >
              {/* Trailing Kick Wake Water Bubbles */}
              {isPlaying && !isTurning && (
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-80 pointer-events-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/70 animate-ping" />
                  <span className="w-2 h-2 rounded-full bg-cyan-100/60 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                </div>
              )}

              {/* Flip-turn water burst splash */}
              {isTurning && (
                <div className="absolute -inset-3 flex items-center justify-center pointer-events-none animate-ping">
                  <span className="w-8 h-8 rounded-full bg-white/60 blur-[1px]" />
                </div>
              )}

              {/* Swimmer Vector Graphic */}
              <svg width="44" height="24" viewBox="0 0 60 32" className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                {/* Torso & Legs */}
                <ellipse cx="26" cy="16" rx="14" ry="5.5" fill="#e0a96d" />
                {/* Black Swimming Jammers / Trunks */}
                <rect x="15" y="11" width="9" height="10" rx="2" fill="#0f172a" />
                {/* Flutter Kicking Feet */}
                <circle cx="10" cy={14 + Math.sin(armPhase * 0.1) * 3} r="2" fill="#e0a96d" />
                <circle cx="10" cy={18 - Math.sin(armPhase * 0.1) * 3} r="2" fill="#e0a96d" />

                {/* Left Arm Stroke */}
                <path
                  d={`M 26 11 Q ${26 + Math.cos(armPhase * 0.05) * 8} ${4 + Math.sin(armPhase * 0.05) * 4} ${38 + Math.cos(armPhase * 0.05) * 6} 8`}
                  stroke="#e0a96d"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Right Arm Stroke */}
                <path
                  d={`M 26 21 Q ${26 - Math.cos(armPhase * 0.05) * 8} ${28 - Math.sin(armPhase * 0.05) * 4} ${38 - Math.cos(armPhase * 0.05) * 6} 24`}
                  stroke="#e0a96d"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Head & High-Visibility Neon Yellow Silicone Cap */}
                <ellipse cx="38" cy="16" rx="5" ry="4.5" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
                {/* Mirror Goggles */}
                <rect x="40" y="14" width="2" height="4" rx="1" fill="#06b6d4" />
              </svg>
            </div>
          </div>

          {/* Telemetry Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Laps & Distance */}
            <div className="bg-black/40 rounded-2xl p-3 border border-white/5 flex flex-col justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                Laps Completed
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-mono font-bold text-white">{laps}</span>
                <span className="text-xs font-mono text-cyan-300">({totalMeters}m)</span>
              </div>
            </div>

            {/* Pace Timer */}
            <div className="bg-black/40 rounded-2xl p-3 border border-white/5 flex flex-col justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                <Timer className="w-3 h-3 text-cyan-400" />
                <span>Pace Clock</span>
              </span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-cyan-400 mt-1">
                {formattedTime}
              </span>
            </div>

            {/* Heart Rate / Energy Zone */}
            <div className="bg-black/40 rounded-2xl p-3 border border-white/5 flex flex-col justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                <Heart className={`w-3 h-3 ${isPlaying ? 'text-rose-500 animate-ping' : 'text-zinc-500'}`} />
                <span>Heart Rate</span>
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-mono font-bold text-white">{simulatedHeartRate}</span>
                <span className="text-[10px] font-mono text-zinc-400">BPM</span>
              </div>
            </div>

            {/* Calories Burned */}
            <div className="bg-black/40 rounded-2xl p-3 border border-white/5 flex flex-col justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" />
                <span>Active Energy</span>
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-mono font-bold text-amber-400">{burnedCalories}</span>
                <span className="text-[10px] font-mono text-zinc-400">kcal</span>
              </div>
            </div>
          </div>

          {/* Discipline Mindset Quote */}
          <div className="p-3 bg-cyan-950/30 rounded-2xl border border-cyan-500/20 text-xs text-zinc-300 leading-relaxed italic flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Philosophy on Code & Water:</strong> "Fighting the water creates turbulent drag; staying relaxed and rhythmic creates effortless speed. The exact same rule applies to complex software architecture."
            </span>
          </div>
        </div>
      )}

      {/* MINIMIZED PILL VIEW */}
      {isMinimized && (
        <div className="pt-2 flex items-center justify-between text-xs text-zinc-400">
          <span className="font-mono text-[11px] text-cyan-300 flex items-center gap-1.5">
            <span>🏊</span>
            <span>25m Pool Minimized • {laps} Laps ({totalMeters}m)</span>
          </span>
          <button
            onClick={handleMinimizeToggle}
            className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold cursor-pointer"
          >
            Expand Simulator
          </button>
        </div>
      )}
    </div>
  );
}
