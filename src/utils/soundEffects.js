/**
 * Apple-Grade Synthesized Micro-Sound System (Web Audio API)
 * 
 * Features:
 * - 100% Pure mathematical sound synthesis (zero external audio files or downloads).
 * - Instantaneous 0ms latency tactile audio feedback.
 * - Respects browser autoplay restrictions with lazy AudioContext initialization.
 * - Persistent preference saved in localStorage ('ashutosh_portfolio_sound_enabled').
 * - Gentle, warm volume curves tuned to Apple iOS/macOS UI aesthetics.
 */

let audioCtx = null;
const STORAGE_KEY = 'ashutosh_portfolio_sound_enabled';

// In-memory state and subscriber registry
let soundEnabled = false;
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem(STORAGE_KEY);
  // Default to false to respect user preference until explicitly toggled
  soundEnabled = saved === 'true';
}

const subscribers = new Set();

function notifySubscribers() {
  subscribers.forEach((callback) => {
    try {
      callback(soundEnabled);
    } catch (e) {
      console.error('Sound subscriber error:', e);
    }
  });
}

/**
 * Returns current sound enabled status
 */
export function isSoundEnabled() {
  return soundEnabled;
}

/**
 * Subscribe to sound enabled state changes
 */
export function subscribeSound(callback) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

/**
 * Lazy initialization of the browser AudioContext
 */
function getAudioContext() {
  if (typeof window === 'undefined') return null;

  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  return audioCtx;
}

/**
 * Toggle sound on or off
 */
export function toggleSound() {
  soundEnabled = !soundEnabled;

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, String(soundEnabled));
  }

  if (soundEnabled) {
    const ctx = getAudioContext();
    if (ctx) {
      // Play a cheerful confirmation chime on activation
      playSuccessChime();
    }
  }

  notifySubscribers();
  return soundEnabled;
}

/**
 * Warm, rounded bubble pop for chapter navigation and major tabs
 * Inspired by iOS tab switching
 */
export function playChapterPop() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.exponentialRampToValueAtTime(260, now + 0.07);

  // Soft attack and smooth exponential decay to prevent clicks
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.08, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.07);
}

/**
 * Crisp, subtle tactile haptic click for buttons, cards, and filter pills
 * Inspired by Apple Watch Digital Crown & Taptic Engine
 */
export function playTactileClick() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(450, now + 0.022);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.045, now + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.022);
}

/**
 * Crystal two-tone glass chime for actions like copying email, downloading resume, or sending message
 * Pentatonic harmony: C6 (1046.5 Hz) -> G6 (1567.98 Hz)
 */
export function playSuccessChime() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [1046.5, 1567.98];
  notes.forEach((freq, idx) => {
    const startTime = ctx.currentTime + idx * 0.065;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(0.07, startTime + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.28);
  });
}

/**
 * Pneumatic air gun ratchet click for F1 tire compound switches
 */
export function playTireRatchet() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  [0, 0.028].forEach((offset) => {
    const startTime = ctx.currentTime + offset;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(750, startTime);
    osc.frequency.exponentialRampToValueAtTime(160, startTime + 0.02);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(0.04, startTime + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.02);
  });
}
