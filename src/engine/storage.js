// Saved data lives behind this module so its format can change without wiping streaks.

export const STORAGE_KEY = "animle_state";
// The game was called WildGuess before 15 November 2026; saves under its keys are still read.
export const LEGACY_KEYS = ["wildguess_state", "wildguess_state_v1"];
export const LEGACY_KEY_V1 = "wildguess_state_v1";
export const SCHEMA_VERSION = 4;

export function emptyData() {
  return {
    schemaVersion: SCHEMA_VERSION,
    streak: 0,
    bestStreak: 0,
    lastCompletedDate: null,
    dailyProgress: {},
    scoreHistory: [],
    archiveResults: {},
    zoo: {},
    missed: {},
    retake: null,
    retakes: {},
    seenHowTo: false
  };
}

/** Bring any older saved shape up to the current one. Pure, unit-tested. */
export function migrate(parsed) {
  const base = emptyData();
  if (!parsed || typeof parsed !== "object") return base;
  const history = (Array.isArray(parsed.scoreHistory) ? parsed.scoreHistory : []).map(item => ({
    ...item,
    mode: item.mode || (String(item.id || "").startsWith("practice") ? "practice" : "daily")
  }));
  return {
    ...base,
    streak: Number(parsed.streak) || 0,
    bestStreak: Number(parsed.bestStreak) || Number(parsed.streak) || 0,
    lastCompletedDate: parsed.lastCompletedDate || null,
    dailyProgress: parsed.dailyProgress && typeof parsed.dailyProgress === "object" ? parsed.dailyProgress : {},
    // v1 entries always carried an id of "daily-<date>" or "practice-<time>".
    scoreHistory: history,
    archiveResults: parsed.archiveResults && typeof parsed.archiveResults === "object" ? parsed.archiveResults : {},
    // Before v3 there was no zoo: rebuild it from the games already played.
    zoo: parsed.zoo && typeof parsed.zoo === "object" ? parsed.zoo : zooFromHistory(history),
    // Animals played but not earned, and the day the last retake was used (both new in v4).
    missed: parsed.missed && typeof parsed.missed === "object" ? parsed.missed : {},
    retake: parsed.retake && typeof parsed.retake === "object" && parsed.retake.date ? parsed.retake : null,
    // How many retakes have been started on each animal; every one raises that animal's bar.
    retakes: parsed.retakes && typeof parsed.retakes === "object" ? parsed.retakes : {},
    seenHowTo: Boolean(parsed.seenHowTo)
  };
}

let available = null;

export function storageAvailable() {
  if (available !== null) return available;
  try {
    localStorage.setItem("__wg_probe", "1");
    localStorage.removeItem("__wg_probe");
    available = true;
  } catch {
    available = false;
  }
  return available;
}

let memory = null; // used when the browser blocks storage, so a session still works

export function loadData() {
  if (!storageAvailable()) return memory || (memory = emptyData());
  try {
    const raw = [STORAGE_KEY, ...LEGACY_KEYS].map(key => localStorage.getItem(key)).find(value => value !== null);
    return migrate(raw ? JSON.parse(raw) : null);
  } catch {
    return emptyData();
  }
}

export function saveData(data) {
  const next = { ...data, schemaVersion: SCHEMA_VERSION };
  if (!storageAvailable()) { memory = next; return; }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (err) {
    console.warn("Could not save progress", err);
  }
}

/** Stats shown to the player use daily games only; practice never counts. */
export function dailyHistory(data) {
  return (data.scoreHistory || []).filter(item => item.mode === "daily");
}


// ---------------------------------------------------------------------------
// The zoo: every species the player has finished a game on, with their best score.
// ---------------------------------------------------------------------------
const slug = (name) => String(name || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function addToZoo(zoo, animalId, total, date) {
  const prev = zoo[animalId];
  return {
    ...zoo,
    [animalId]: {
      best: Math.max(prev?.best ?? 0, total),
      plays: (prev?.plays ?? 0) + 1,
      first: prev?.first ?? date
    }
  };
}

/** A daily or a retake must score at least this much for the animal to join the zoo. */
export const ZOO_MIN_SCORE = 1500;
/** Retakes are available from a daily streak of this many days, one per day. */
export const RETAKE_STREAK = 3;

/**
 * Apply a finished game to the zoo.
 * - An animal already in the zoo: any game can raise its best score.
 * - Otherwise only a daily scoring ZOO_MIN_SCORE or more, or a retake reaching its raised bar, adds it.
 * - Anything else lands on the missed list, which is what a retake picks from.
 */
/** Each retake of the same animal raises its bar by this much, up to RETAKE_MAX_SCORE. */
export const RETAKE_STEP = 250;
export const RETAKE_MAX_SCORE = 2500;

/** The score needed on an animal's nth retake (n starts at 1). */
export const retakeBar = (n) => Math.min(RETAKE_MAX_SCORE, ZOO_MIN_SCORE + RETAKE_STEP * Math.max(1, n));

/** The score a game in `mode` needs to add this animal. Retakes started so far are counted in data.retakes. */
export function zooBar(data, animalId, mode) {
  return mode === "retake" ? retakeBar((data.retakes || {})[animalId] || 1) : ZOO_MIN_SCORE;
}

/** Spend today's retake on an animal: marks the day as used and counts the attempt. */
export function beginRetake(data, animalId, today) {
  const retakes = data.retakes || {};
  return { ...data, retake: { date: today, animalId }, retakes: { ...retakes, [animalId]: (retakes[animalId] || 0) + 1 } };
}

export function recordZooResult(data, animalId, total, date, mode) {
  const zoo = data.zoo || {}, missed = data.missed || {};
  if (zoo[animalId]) return { ...data, zoo: addToZoo(zoo, animalId, total, date) };
  if ((mode === "daily" || mode === "retake") && total >= zooBar(data, animalId, mode)) {
    const { [animalId]: _earned, ...rest } = missed;
    return { ...data, zoo: addToZoo(zoo, animalId, total, date), missed: rest };
  }
  const prev = missed[animalId];
  return {
    ...data,
    missed: { ...missed, [animalId]: { best: Math.max(prev?.best ?? 0, total), plays: (prev?.plays ?? 0) + 1, last: date } }
  };
}

/** "locked" below the streak, "used" once today's retake has started, otherwise "ready". */
export function retakeStatus(data, today, streak) {
  if (streak < RETAKE_STREAK) return "locked";
  return data.retake && data.retake.date === today ? "used" : "ready";
}

function zooFromHistory(history) {
  let zoo = {};
  for (const item of history) {
    const id = item.animalId || slug(item.animalName);
    if (id) zoo = addToZoo(zoo, id, Number(item.total) || 0, item.date || null);
  }
  return zoo;
}

// ---------------------------------------------------------------------------
// Backup codes: the whole save as one line of text, to move between devices.
// ---------------------------------------------------------------------------
const PREFIX = "AN1.";
// Codes made while the game was called WildGuess still restore.
const OLD_PREFIXES = ["WG3."];
const toBase64 = (text) => btoa(String.fromCharCode(...new TextEncoder().encode(text)));
const fromBase64 = (b64) => new TextDecoder().decode(Uint8Array.from(atob(b64), c => c.charCodeAt(0)));

export function exportCode(data) {
  // Games in progress stay on this device; a backup carries finished results only.
  const { dailyProgress, ...rest } = data;
  const finished = Object.fromEntries(Object.entries(dailyProgress || {}).filter(([, p]) => p && p.stage === 4));
  return PREFIX + toBase64(JSON.stringify({ ...rest, dailyProgress: finished }));
}

/** Returns migrated data, or null when the code is not an Animle backup. */
export function importCode(code) {
  const text = String(code || "").trim();
  const prefix = [PREFIX, ...OLD_PREFIXES].find(p => text.startsWith(p));
  if (!prefix) return null;
  try {
    const parsed = JSON.parse(fromBase64(text.slice(prefix.length)));
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.scoreHistory)) return null;
    return migrate(parsed);
  } catch {
    return null;
  }
}

/** Averages for the stats panel, daily games only. */
export function dailyAverages(data) {
  const games = dailyHistory(data);
  if (games.length === 0) return null;
  const avg = (key) => Math.round(games.reduce((sum, g) => sum + (Number(g[key]) || 0), 0) / games.length);
  return { total: avg("total"), r1: avg("r1"), r2: avg("r2"), r3: avg("r3"), games: games.length };
}
