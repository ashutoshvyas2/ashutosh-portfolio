/**
 * Visitor Tracking & Private Owner Mode Utility
 * 
 * Tracks global portfolio visits via visitorbadge.io API.
 * Deduplicates per session so page reloads do not inflate the count.
 * Keeps the counter 100% private and invisible to the public.
 * 
 * Private Owner Mode Triggers:
 * 1. URL Parameter: Opening the site with ?owner=true or ?admin=ashutosh
 * 2. Secret Keyboard Shortcut: Ctrl + Shift + A (or Alt + V)
 * 3. Secret Triple-Click: Clicking the AG avatar in the Hero 3 times
 */

const OWNER_STORAGE_KEY = 'ashutosh_portfolio_owner_mode';
const CACHED_COUNT_KEY = 'ashutosh_portfolio_cached_visitors';
const SESSION_COUNTED_KEY = 'ashutosh_portfolio_session_visited';
const VISITOR_API_ENDPOINT = 'https://api.visitorbadge.io/api/visitors?path=ashutoshvyas2.ashutosh-portfolio';

let isOwner = false;
let visitorCount = null;
const ownerSubscribers = new Set();
const countSubscribers = new Set();

// Initialize in browser
if (typeof window !== 'undefined') {
  // Check local storage for persistent owner status
  isOwner = localStorage.getItem(OWNER_STORAGE_KEY) === 'true';

  // Check URL query parameters: ?owner=true or ?admin=ashutosh or #owner
  const urlParams = new URLSearchParams(window.location.search);
  if (
    urlParams.get('owner') === 'true' || 
    urlParams.get('admin') === 'ashutosh' || 
    window.location.hash === '#owner'
  ) {
    isOwner = true;
    localStorage.setItem(OWNER_STORAGE_KEY, 'true');
    // Clean URL so the secret parameter is removed from the address bar
    const cleanUrl = window.location.pathname + window.location.hash.replace('#owner', '');
    window.history.replaceState({}, document.title, cleanUrl || '/');
  }

  // Restore cached count if available
  const savedCount = localStorage.getItem(CACHED_COUNT_KEY);
  if (savedCount) {
    visitorCount = parseInt(savedCount, 10);
  }
}

function notifyOwnerSubscribers() {
  ownerSubscribers.forEach((cb) => {
    try { cb(isOwner); } catch (e) { console.error(e); }
  });
}

function notifyCountSubscribers() {
  countSubscribers.forEach((cb) => {
    try { cb(visitorCount); } catch (e) { console.error(e); }
  });
}

export function isOwnerMode() {
  return isOwner;
}

export function toggleOwnerMode() {
  isOwner = !isOwner;
  if (typeof window !== 'undefined') {
    localStorage.setItem(OWNER_STORAGE_KEY, isOwner ? 'true' : 'false');
  }
  notifyOwnerSubscribers();
  return isOwner;
}

export function setOwnerMode(val) {
  isOwner = Boolean(val);
  if (typeof window !== 'undefined') {
    localStorage.setItem(OWNER_STORAGE_KEY, isOwner ? 'true' : 'false');
  }
  notifyOwnerSubscribers();
}

export function subscribeOwnerMode(cb) {
  ownerSubscribers.add(cb);
  cb(isOwner);
  return () => ownerSubscribers.delete(cb);
}

export function subscribeVisitorCount(cb) {
  countSubscribers.add(cb);
  if (visitorCount !== null) cb(visitorCount);
  return () => countSubscribers.delete(cb);
}

export function getVisitorCount() {
  return visitorCount;
}

export function parseCountFromSvg(svgText) {
  if (!svgText) return null;
  const titleMatch = svgText.match(/<title>VISITORS:\s*([0-9,]+)<\/title>/i);
  if (titleMatch && titleMatch[1]) {
    return parseInt(titleMatch[1].replace(/,/g, ''), 10);
  }
  const ariaMatch = svgText.match(/aria-label="VISITORS:\s*([0-9,]+)"/i);
  if (ariaMatch && ariaMatch[1]) {
    return parseInt(ariaMatch[1].replace(/,/g, ''), 10);
  }
  return null;
}

/**
 * Record a visit on page load.
 * Deduplicates per session so page refreshes don't inflate counts.
 */
export async function recordVisit() {
  if (typeof window === 'undefined') return;

  const alreadyCountedInSession = sessionStorage.getItem(SESSION_COUNTED_KEY) === 'true';

  try {
    const res = await fetch(VISITOR_API_ENDPOINT);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const svgText = await res.text();
    const count = parseCountFromSvg(svgText);

    if (count !== null) {
      visitorCount = count;
      localStorage.setItem(CACHED_COUNT_KEY, count.toString());
      notifyCountSubscribers();
    }

    if (!alreadyCountedInSession) {
      sessionStorage.setItem(SESSION_COUNTED_KEY, 'true');
    }
  } catch (err) {
    console.warn('Visitor counter fetch notice:', err.message);
  }
}

/**
 * Refresh count on demand (for owner mode)
 */
export async function refreshVisitorCount() {
  try {
    const res = await fetch(VISITOR_API_ENDPOINT);
    if (!res.ok) return null;
    const svgText = await res.text();
    const count = parseCountFromSvg(svgText);
    if (count !== null) {
      visitorCount = count;
      localStorage.setItem(CACHED_COUNT_KEY, count.toString());
      notifyCountSubscribers();
      return count;
    }
  } catch (err) {
    console.warn('Visitor refresh error:', err);
  }
  return visitorCount;
}
