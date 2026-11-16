import "@fontsource-variable/fraunces";
import "@fontsource-variable/plus-jakarta-sans";
import "./styles.css";

import { select } from "d3-selection";
import { scaleBand, scaleLinear } from "d3-scale";
import {
  createIcons, Compass, Flame, Shuffle, Calendar, CalendarDays, Award, ZoomIn, FileText, Search, ArrowRight,
  CircleCheck, Map as MapIcon, Hand, Paintbrush, Eraser, Undo2, Trash2, Info, Globe, Share2, X,
  CirclePlay, Lock, CircleHelp, RefreshCw, Timer, Menu, PawPrint, Copy, Trophy, Users, CircleUserRound
} from "lucide";

import { WILDLIFE_DB, PRACTICE_DB, ALL_SPECIES, speciesById, ZOO_REGIONS } from "./data/species.js";
import { GUESSABLE } from "./data/taxonomy.js";
import { SCHEDULE } from "./data/schedule.js";
import PHOTOS from "./data/photos.json";
import {
  MAX_GUESSES, ROUND_MAX, MAX_TOTAL, scoreIdentification, scorePopulation, populationLabel, scoreCells, rankFor,
  relatedness, closestLevel, RELATED_POINTS, badgeFor
} from "./engine/scoring.js";
import { normalizeName, judgeGuess } from "./engine/matching.js";
import {
  dateString, scheduledId, upcomingIds, puzzleNumber, activeStreak, completeDaily,
  msUntilNextPuzzle, formatCountdown, pastDailies
} from "./engine/daily.js";
import {
  loadData, saveData, storageAvailable, dailyHistory, exportCode, importCode, dailyAverages,
  recordZooResult, retakeStatus, ZOO_MIN_SCORE, RETAKE_STREAK, RETAKE_STEP, retakeBar, zooBar, beginRetake
} from "./engine/storage.js";
import { cellsForPolygons, neighbours, cellDistance } from "./engine/grid.js";
import { createHabitatMap } from "./map.js";

const ICONS = {
  Compass, Flame, Shuffle, Calendar, CalendarDays, Award, ZoomIn, FileText, Search, ArrowRight, CircleCheck,
  Map: MapIcon, Hand, Paintbrush, Eraser, Undo2, Trash2, Info, Globe, Share2, X, CirclePlay, Lock,
  CircleHelp, RefreshCw, Timer, Menu, PawPrint, Copy, Trophy, Users, CircleUserRound
};
const refreshIcons = () => createIcons({ icons: ICONS });

const $ = (id) => document.getElementById(id);
const SKIP_MARKER = "Skipped (Hint)";
const FULL_PHOTO = 5;   // index of the uncropped photo; 0-4 are the in-play zoom levels
// The artifact build has a file-count limit, so there each species' six views are stacked in one
// tall image ("sprite") and the right view is picked with object-position.
const SPRITES = import.meta.env.VITE_WG_SPRITES === "1";
const photoUrl = (animal, level) => SPRITES
  ? `${import.meta.env.BASE_URL}p/${PHOTOS[animal.id].files[0]}.webp#${level}`
  : `${import.meta.env.BASE_URL}p/${PHOTOS[animal.id].files[level]}.webp`;
/** Point an <img> at one view of a species photo. */
function setPhoto(img, url) {
  if (SPRITES) {
    img.style.objectFit = "cover";
    img.style.objectPosition = `0 ${Number(url.split("#")[1].split("?")[0]) * 20}%`;
  }
  img.src = url;
}

// ===========================================================================
// State
// ===========================================================================
function freshState(mode, animal, today) {
  return {
    mode, todayKey: today, animal, stage: 1,
    r1Guesses: [], r1Levels: [], r1Solved: false, r1Score: 0,
    r2Estimate: null, r2Submitted: false, r2Score: 0,
    r3Submitted: false, r3Score: 0, r3OverlapPct: 0, r3Cells: [],
    recordedInHistory: false
  };
}
let appState = freshState("daily", WILDLIFE_DB[0], dateString());

const dailyAnimalFor = (dateStr) => speciesById(scheduledId(dateStr, SCHEDULE));

const targetCache = new Map();
/** The cells that make up a species' true range. */
function targetCellsFor(animal) {
  if (!targetCache.has(animal.id)) targetCache.set(animal.id, cellsForPolygons(animal.ranges));
  return targetCache.get(animal.id);
}

/** Species that must stay hidden: today's (until finished) and those due soon. */
function lockedIds() {
  const today = dateString();
  const locked = new Set();
  for (const id of upcomingIds(today, SCHEDULE)) locked.add(id);
  const todays = dailyAnimalFor(today);
  const progress = loadData().dailyProgress[today];
  if (!(progress && progress.stage === 4)) locked.add(todays.id);
  else locked.delete(todays.id);
  return locked;
}

// ===========================================================================
// Toasts and dialogs
// ===========================================================================
function showToast(message, type = "info") {
  const colors = {
    success: "bg-forest-900 text-emerald-100 border-emerald-500/40",
    warn: "bg-amber-900 text-amber-100 border-amber-500/40",
    info: "bg-parchment-900 text-parchment-50 border-parchment-700"
  };
  const toast = document.createElement("div");
  toast.className = `px-4 py-2.5 rounded-xl shadow-lg border text-sm font-medium transition-all duration-300 ${colors[type] || colors.info}`;
  toast.textContent = message;
  $("toast-container").appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(6px)";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

let openModalEl = null;
let modalOpener = null;

function openModal(id) {
  closeModal();
  modalOpener = document.activeElement;
  openModalEl = $(id);
  openModalEl.classList.remove("hidden");
  openModalEl.querySelector("[role=dialog]").focus();
}

function closeModal() {
  if (!openModalEl) return;
  openModalEl.classList.add("hidden");
  openModalEl = null;
  if (modalOpener && document.contains(modalOpener)) modalOpener.focus();
  modalOpener = null;
}

document.addEventListener("keydown", (e) => {
  if (!openModalEl) return;
  if (e.key === "Escape") { e.preventDefault(); closeModal(); return; }
  if (e.key !== "Tab") return;
  // Keep keyboard focus inside the open dialog.
  const focusable = [...openModalEl.querySelectorAll("button:not([disabled]), a[href], input, textarea")].filter(el => el.offsetParent !== null);
  if (focusable.length === 0) return;
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (e.shiftKey && (document.activeElement === first || !openModalEl.contains(document.activeElement) || document.activeElement.getAttribute("role") === "dialog")) {
    e.preventDefault(); last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault(); first.focus();
  }
});


// ===========================================================================
// Saving progress, history, the zoo and streaks
// ===========================================================================
function updateStreakDisplay() {
  const data = loadData();
  $("streak-count").textContent = activeStreak(data, dateString());
  $("zoo-pill-count").textContent = WILDLIFE_DB.filter(a => data.zoo[a.id]).length;
}

function recordCompletedGame(data) {
  if (appState.recordedInHistory) return data;
  appState.recordedInHistory = true;
  const total = appState.r1Score + appState.r2Score + appState.r3Score;
  const id = appState.mode === "practice" ? `practice-${Date.now()}` : `${appState.mode}-${appState.todayKey}`;
  const record = {
    id, date: appState.todayKey, mode: appState.mode, animalId: appState.animal.id, animalName: appState.animal.name,
    r1: appState.r1Score, r2: appState.r2Score, r3: appState.r3Score, total
  };
  const history = [...data.scoreHistory];
  const existing = history.findIndex(item => item.id === id);
  if (existing >= 0) history[existing] = record; else history.push(record);
  const next = recordZooResult({ ...data, scoreHistory: history }, appState.animal.id, total, appState.todayKey, appState.mode);
  if (appState.mode === "archive") {
    const best = Math.max(total, data.archiveResults[appState.todayKey]?.total ?? 0);
    next.archiveResults = { ...data.archiveResults, [appState.todayKey]: { total: best } };
  }
  return next;
}

function saveProgress() {
  let data = loadData();
  if (appState.stage === 4) data = recordCompletedGame(data);
  if (appState.mode === "daily") {
    const { mode, todayKey, animal, ...rest } = appState;
    data = { ...data, dailyProgress: { ...data.dailyProgress, [todayKey]: { animalId: animal.id, ...rest } } };
    if (appState.stage === 4) data = completeDaily(data, todayKey);
  }
  saveData(data);
  updateStreakDisplay();
}

// ===========================================================================
// Starting a game
// ===========================================================================
const BADGE_STYLES = {
  daily: "bg-forest-700 text-emerald-200 border border-forest-500/40",
  practice: "bg-amber-600/30 text-amber-300 border border-amber-400/40",
  archive: "bg-sky-600/30 text-sky-200 border border-sky-400/40",
  retake: "bg-rose-600/30 text-rose-200 border border-rose-400/40"
};
function setModeBadge(mode, label, dateLabel) {
  const badge = $("mode-badge");
  badge.textContent = label;
  badge.className = `text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${BADGE_STYLES[mode]}`;
  $("header-date-label").textContent = dateLabel;
  $("btn-daily").classList.toggle("hidden", mode === "daily");
}
const prettyDate = (dateStr) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
};

function loadDailyChallenge() {
  const today = dateString();
  const animal = dailyAnimalFor(today);
  const saved = loadData().dailyProgress[today];
  appState = freshState("daily", animal, today);
  if (saved && saved.animalId === animal.id) {
    const { animalId, r3UserPolygons, ...rest } = saved;
    Object.assign(appState, rest);
    // Games saved by the earlier polygon-drawing version.
    if (!Array.isArray(saved.r3Cells)) appState.r3Cells = r3UserPolygons ? cellsForPolygons(r3UserPolygons) : [];
    if (!Array.isArray(saved.r1Levels)) appState.r1Levels = appState.r1Guesses.map(g => levelOfGuess(g, animal));
  }
  const n = puzzleNumber(today);
  setModeBadge("daily", "Daily", n >= 1 ? `No. ${n} · ${prettyDate(today)}` : prettyDate(today));
  closeModal();
  hydrate();
}

function startPractice(animal) {
  appState = freshState("practice", animal, dateString());
  setModeBadge("practice", "Practice", "Practice round · not counted");
  closeModal();
  hydrate();
}

function startArchive(dateStr) {
  if (dateStr >= dateString()) return;
  appState = freshState("archive", dailyAnimalFor(dateStr), dateStr);
  setModeBadge("archive", "Archive", `No. ${puzzleNumber(dateStr)} · ${prettyDate(dateStr)} · no streak`);
  closeModal();
  hydrate();
}

/**
 * Animals a retake can be spent on: played but not earned, or a past daily that was skipped.
 * Map of id -> { animal, best } (played) or { animal, number } (skipped daily, still a mystery).
 */
function missedAnimals(data) {
  const today = dateString();
  const out = new Map();
  for (const a of WILDLIFE_DB) {
    if (data.missed[a.id] && !data.zoo[a.id]) out.set(a.id, { animal: a, best: data.missed[a.id].best });
  }
  for (const { date, number } of pastDailies(today)) {
    const a = dailyAnimalFor(date);
    if (!data.zoo[a.id] && !out.has(a.id)) out.set(a.id, { animal: a, number });
  }
  // Today's animal stays out of reach until today's daily is finished.
  if (data.dailyProgress[today]?.stage !== 4) out.delete(dailyAnimalFor(today).id);
  return out;
}

function startRetake(id) {
  const data = loadData();
  const today = dateString();
  const animal = speciesById(id);
  if (!animal || !missedAnimals(data).has(id)) return;
  if (retakeStatus(data, today, activeStreak(data, today)) !== "ready") return;
  // The retake is spent when it starts, so it cannot be restarted after seeing the answers.
  const next = beginRetake(data, id, today);
  saveData(next);
  const bar = zooBar(next, id, "retake").toLocaleString();
  appState = freshState("retake", animal, today);
  setModeBadge("retake", "Retake", `Retake · ${bar} points adds it to your zoo`);
  closeModal();
  hydrate();
  showToast(`Today's retake has started. Score ${bar} or more to add this animal to your zoo.`, "info");
}

function startRandomPractice() {
  // Practice has its own small set of easy animals, so it never spoils a daily.
  const pool = PRACTICE_DB.filter(a => a.id !== appState.animal.id);
  if (pool.length === 0) {
    showToast("No practice animals are available right now.", "warn");
    return;
  }
  startPractice(pool[Math.floor(Math.random() * pool.length)]);
  showToast("Practice round started. It will not affect your stats.", "info");
}

function hydrate() {
  const a = appState.animal;
  const cls = $("clue-class");
  cls.textContent = a.classPlain;
  cls.className = "text-parchment-900 font-medium";
  guessInput.value = "";
  hideSuggestions();
  renderRound1();

  $("r2-animal-name").textContent = a.name;
  $("r2-thumb").removeAttribute("src");
  resetPopulationInput();
  if (appState.r2Submitted) renderRound2Result();
  else {
    $("round2-input-area").classList.remove("hidden");
    $("round2-result").classList.add("hidden");
    if (appState.r2Estimate) setPopulation(appState.r2Estimate);
  }

  $("r3-animal-name").textContent = a.name;
  const submitted = appState.r3Submitted;
  for (const id of ["map-toolbar", "map-instruction", "round3-submit-area"]) $(id).classList.toggle("hidden", submitted);
  $("round3-result").classList.toggle("hidden", !submitted);
  $("map-legend").classList.toggle("hidden", !submitted);
  if (submitted) fillRound3Result();

  goToStage(appState.stage, false);
}

// ===========================================================================
// Round 1: identify the animal
// ===========================================================================
const guessInput = $("animal-guess-input");
const autoList = $("autocomplete-list");
const photoEl = $("animal-image");
let photoRetry = 0;

photoEl.addEventListener("load", () => {
  photoEl.classList.remove("is-swapping");
  $("image-loading-overlay").classList.add("hidden");
  $("image-error-overlay").classList.add("hidden");
});
photoEl.addEventListener("error", () => {
  $("image-loading-overlay").classList.add("hidden");
  $("image-error-overlay").classList.remove("hidden");
});

function showPhoto(level, bust = false) {
  const plain = photoUrl(appState.animal, level);
  const url = bust ? plain.replace(/(#\d+)?$/, (frag) => `?retry=${++photoRetry}${frag}`) : plain;
  if (photoEl.dataset.shown === url) return;
  photoEl.dataset.shown = url;
  if (photoEl.getAttribute("src")) photoEl.classList.add("is-swapping");
  else $("image-loading-overlay").classList.remove("hidden");
  $("image-error-overlay").classList.add("hidden");
  // Swap after the fade-out so the wider view fades in.
  setTimeout(() => { setPhoto(photoEl, url); }, photoEl.getAttribute("src") ? 180 : 0);
}


// Everything that counts as a real animal for a guess, with its place in the family tree.
const knownAnimals = new Set();
const taxonByKey = new Map();
const localEntries = [];
{
  const seen = new Set();
  const list = (title) => {
    const key = normalizeName(title);
    knownAnimals.add(key);
    if (!seen.has(key)) { seen.add(key); localEntries.push({ title }); }
  };
  for (const a of ALL_SPECIES) {
    list(a.name);
    // Aliases and scientific names are accepted but not listed, so the list gives nothing away.
    for (const n of [a.name, a.scientificName, ...(a.aliases || [])]) {
      knownAnimals.add(normalizeName(n));
      taxonByKey.set(normalizeName(n), a.taxon);
    }
  }
  for (const g of GUESSABLE) {
    list(g.name);
    if (!taxonByKey.has(normalizeName(g.name))) taxonByKey.set(normalizeName(g.name), g.taxon);
  }
  // Group words ("lemur", "whale") are known too; they only place a guess as far as the order.
  for (const a of ALL_SPECIES) for (const n of a.groups || []) {
    const key = normalizeName(n);
    knownAnimals.add(key);
    if (!taxonByKey.has(key)) taxonByKey.set(key, { cls: a.taxon.cls, order: a.taxon.order, family: "", genus: "" });
  }
  localEntries.sort((x, y) => x.title.localeCompare(y.title));
}

function levelOfGuess(guess, animal) {
  if (guess === SKIP_MARKER) return "none";
  return relatedness(taxonByKey.get(normalizeName(guess)), animal.taxon);
}

const LEVEL_TEXT = {
  genus: (t) => `Same genus (${t.genus})`,
  family: (t) => `Same family (${t.family})`,
  order: (t) => `Same order (${t.order})`,
  class: (t) => `Same class only (${t.cls})`,
  none: () => "Different class"
};
const LEVEL_STYLE = {
  genus: "bg-emerald-200 text-emerald-950 border-emerald-400",
  family: "bg-emerald-100 text-emerald-900 border-emerald-300",
  order: "bg-amber-100 text-amber-900 border-amber-300",
  class: "bg-parchment-200 text-parchment-900 border-parchment-300",
  none: "bg-red-50 text-red-900 border-red-200"
};

let suggestions = [];
let highlighted = -1;

function hideSuggestions() {
  suggestions = [];
  highlighted = -1;
  autoList.classList.add("hidden");
  autoList.replaceChildren();
  guessInput.setAttribute("aria-expanded", "false");
  guessInput.removeAttribute("aria-activedescendant");
}

/** Build "Snow <mark>Leo</mark>pard" with DOM nodes, never raw HTML. */
function highlightInto(el, text, query) {
  const idx = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (idx < 0) { el.textContent = text; return; }
  const mark = document.createElement("mark");
  mark.className = "bg-amber-200/80 text-parchment-950 rounded px-0.5";
  mark.textContent = text.slice(idx, idx + query.length);
  el.append(text.slice(0, idx), mark, text.slice(idx + query.length));
}

function renderSuggestions(items, query) {
  suggestions = items;
  highlighted = -1;
  if (items.length === 0) { hideSuggestions(); return; }
  autoList.replaceChildren(...items.map((item, idx) => {
    const li = document.createElement("li");
    li.id = `suggestion-${idx}`;
    li.setAttribute("role", "option");
    li.setAttribute("aria-selected", "false");
    li.dataset.idx = idx;
    li.className = "autocomplete-item px-4 py-2 text-sm text-parchment-900 hover:bg-forest-50 cursor-pointer flex flex-col justify-center";
    const title = document.createElement("div");
    title.className = "font-semibold truncate";
    highlightInto(title, item.title, query);
    li.append(title);
    if (item.subtitle) {
      const sub = document.createElement("div");
      sub.className = "text-xs text-parchment-800 truncate";
      sub.textContent = item.subtitle;
      li.append(sub);
    }
    return li;
  }));
  autoList.classList.remove("hidden");
  guessInput.setAttribute("aria-expanded", "true");
}

function setHighlighted(idx) {
  highlighted = idx;
  autoList.querySelectorAll(".autocomplete-item").forEach((el, i) => {
    el.classList.toggle("bg-forest-100", i === idx);
    el.setAttribute("aria-selected", i === idx ? "true" : "false");
    if (i === idx) el.scrollIntoView({ block: "nearest" });
  });
  if (idx >= 0) guessInput.setAttribute("aria-activedescendant", `suggestion-${idx}`);
}

function chooseSuggestion(idx) {
  const item = suggestions[idx];
  if (!item) return;
  guessInput.value = item.title;
  hideSuggestions();
  guessInput.focus();
}

autoList.addEventListener("click", (e) => {
  const li = e.target.closest("[data-idx]");
  if (li) chooseSuggestion(Number(li.dataset.idx));
});
autoList.addEventListener("mousemove", (e) => {
  const li = e.target.closest("[data-idx]");
  if (li && Number(li.dataset.idx) !== highlighted) setHighlighted(Number(li.dataset.idx));
});

function rankMatch(title, q) {
  const t = title.toLowerCase();
  if (t === q) return 100;
  if (t.startsWith(q)) return 85;
  if (t.split(/[\s-]/).some(word => word.startsWith(q))) return 70;
  if (t.includes(q)) return 55;
  return 0;
}


guessInput.addEventListener("input", () => {
  const q = guessInput.value.trim();
  if (!q) { hideSuggestions(); return; }
  const qLower = q.toLowerCase();
  const matches = localEntries
    .map(item => ({ item, score: rankMatch(item.title, qLower) }))
    .filter(entry => entry.score > 0)
    .sort((x, y) => y.score - x.score || x.item.title.localeCompare(y.item.title))
    .slice(0, 8)
    .map(entry => entry.item);
  renderSuggestions(matches, q);
});

guessInput.addEventListener("keydown", (e) => {
  const open = !autoList.classList.contains("hidden") && suggestions.length > 0;
  if (open && e.key === "ArrowDown") { e.preventDefault(); setHighlighted((highlighted + 1) % suggestions.length); return; }
  if (open && e.key === "ArrowUp") { e.preventDefault(); setHighlighted((highlighted - 1 + suggestions.length) % suggestions.length); return; }
  if (open && e.key === "Escape") { e.preventDefault(); hideSuggestions(); return; }
  if (e.key === "Enter") {
    e.preventDefault();
    if (open && highlighted >= 0) chooseSuggestion(highlighted); else submitAnimalGuess();
  }
});
guessInput.addEventListener("blur", () => setTimeout(() => { if (document.activeElement !== guessInput) hideSuggestions(); }, 150));


const roundOneOver = () => appState.r1Solved || appState.r1Guesses.length >= MAX_GUESSES;
const photoLevel = () => (roundOneOver() ? FULL_PHOTO : Math.min(appState.r1Guesses.length, FULL_PHOTO - 1));

function finishRoundOneIfOver() {
  if (!roundOneOver()) return;
  appState.r1Score = scoreIdentification(appState.r1Guesses.length, appState.r1Solved, appState.r1Levels);
}

function submitAnimalGuess() {
  if (roundOneOver()) return;
  const raw = guessInput.value.trim();
  const a = appState.animal;
  const verdict = judgeGuess(raw, a, appState.r1Guesses, key => knownAnimals.has(key));
  hideSuggestions();

  // These four cost nothing: the attempt is only used by a real, new guess.
  if (verdict === "empty") { showToast("Type an animal name first.", "warn"); guessInput.focus(); return; }
  if (verdict === "unknown") { showToast("Not on the animal list — pick a suggestion as you type. No guess used.", "warn"); guessInput.focus(); return; }
  if (verdict === "repeat") { showToast("You already tried that one. No guess used.", "warn"); guessInput.select(); return; }
  if (verdict === "group") { showToast(`Close — which kind of ${raw.toLowerCase()}? Be more specific. No guess used.`, "info"); guessInput.focus(); return; }

  appState.r1Guesses.push(raw);
  guessInput.value = "";
  if (verdict === "correct") {
    appState.r1Levels.push("exact");
    appState.r1Solved = true;
    showToast(`Spot on! It's the ${a.name}.`, "success");
  } else {
    const level = levelOfGuess(raw, a);
    appState.r1Levels.push(level);
    if (appState.r1Guesses.length >= MAX_GUESSES) showToast(`Out of guesses — it was the ${a.name}.`, "warn");
    else showToast(`Not it. ${LEVEL_TEXT[level](a.taxon)}. The photo zoomed out and a clue is unlocked.`, "info");
  }
  finishRoundOneIfOver();
  renderRound1();
  saveProgress();
}

function skipAnimalGuess() {
  if (roundOneOver()) return;
  appState.r1Guesses.push(SKIP_MARKER);
  appState.r1Levels.push("none");
  if (appState.r1Guesses.length >= MAX_GUESSES) showToast(`Out of attempts — it was the ${appState.animal.name}.`, "warn");
  else showToast("Clue revealed and photo zoomed out. One guess used.", "info");
  finishRoundOneIfOver();
  renderRound1();
  saveProgress();
}

function renderRound1() {
  const a = appState.animal;
  const used = appState.r1Guesses.length;
  const done = roundOneOver();
  const remaining = done ? 0 : MAX_GUESSES - used;

  // The same dots show at the top of the card and beside the guess box, so they stay in view
  // while the phone keyboard is open.
  for (const id of ["attempts-dots", "attempts-dots-input"]) {
    const dots = $(id);
    dots.setAttribute("aria-label", `${remaining} ${remaining === 1 ? "attempt" : "attempts"} left`);
    dots.replaceChildren(...Array.from({ length: MAX_GUESSES }, (_, i) => {
      const dot = document.createElement("span");
      dot.className = `w-3 h-3 rounded-full ${i < remaining ? "bg-forest-700" : "bg-parchment-300"}`;
      return dot;
    }));
  }

  showPhoto(photoLevel());

  const credit = PHOTOS[a.id];
  $("photo-credit").textContent = `Photo: ${credit.artist} · ${credit.license} · cropped`;

  const setClue = (id, text, missesNeeded) => {
    const el = $(id);
    const unlocked = done || used >= missesNeeded;
    el.textContent = unlocked ? text : `Locked (miss ${missesNeeded})`;
    el.className = unlocked ? "text-parchment-900 font-medium" : "text-parchment-800 italic";
  };
  setClue("clue-diet", a.diet, 1);
  setClue("clue-biome", a.biome, 2);
  setClue("clue-size", a.size, 3);
  setClue("clue-last", a.lastClue, 4);

  $("previous-guesses-container").classList.toggle("hidden", used === 0);
  $("previous-guesses-list").replaceChildren(...appState.r1Guesses.map((guess, idx) => {
    const li = document.createElement("li");
    const winning = appState.r1Solved && idx === used - 1;
    const skipped = guess === SKIP_MARKER;
    const level = appState.r1Levels[idx] || "none";
    li.className = "flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs px-2.5 py-1.5 rounded-lg font-medium border " + (
      winning ? "bg-emerald-100 text-emerald-900 border-emerald-300"
      : skipped ? "bg-parchment-100 text-parchment-800 border-parchment-300"
      : LEVEL_STYLE[level]);
    const name = document.createElement("span");
    name.className = "font-bold";
    name.textContent = skipped ? "↷ Clue revealed" : `${winning ? "✓" : "✕"} ${guess}`;
    li.append(name);
    if (!winning && !skipped) {
      const rel = document.createElement("span");
      rel.textContent = LEVEL_TEXT[level](a.taxon);
      li.append(rel);
    }
    return li;
  }));

  $("round1-input-area").classList.toggle("hidden", done);
  const result = $("round1-result");
  result.classList.toggle("hidden", !done);
  if (done) {
    result.className = `rounded-xl p-4 border space-y-3 ${appState.r1Solved ? "border-emerald-300 bg-emerald-50/90" : "border-amber-300 bg-amber-50/90"}`;
    const badge = $("round1-badge");
    badge.textContent = appState.r1Solved ? "Identified" : "Animal revealed";
    badge.className = `inline-block text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-1 ${appState.r1Solved ? "bg-emerald-200 text-emerald-900" : "bg-amber-200 text-amber-900"}`;
    $("round1-title").textContent = a.name;
    $("round1-scientific").textContent = `${a.scientificName} · ${a.classFull}, family ${a.taxon.family}`;
    $("round1-points").textContent = `+${appState.r1Score}`;
    const closest = closestLevel(appState.r1Levels.filter(l => l !== "exact"));
    $("round1-note").textContent = appState.r1Solved
      ? `Solved on guess ${used} of ${MAX_GUESSES}.`
      : closest === "none"
        ? "No guess was in the same class, so there are no points for this round."
        : `Your closest guess was in the ${closest === "class" ? "same class" : "same " + closest}: ${RELATED_POINTS[closest]} points for getting near.`;
  }
}

// ===========================================================================
// Round 2: population estimate
// ===========================================================================
const popInput = $("pop-number-input");
const popSlider = $("pop-log-slider");
const POP_MAX = 1e9;

const roundTwoSig = (n) => {
  if (n < 100) return Math.round(n);
  const mag = Math.pow(10, Math.floor(Math.log10(n)) - 1);
  return Math.round(n / mag) * mag;
};


/** "About 25 thousand": a neutral echo of the number, with no hint about the answer. */
function populationWords(val) {
  if (val >= 1e6) return `About ${+(val / 1e6).toPrecision(2)} million animals`;
  if (val >= 1e3) return `About ${+(val / 1e3).toPrecision(2)} thousand animals`;
  return `About ${val} ${val === 1 ? "animal" : "animals"}`;
}

function resetPopulationInput() {
  appState.r2Estimate = appState.r2Submitted ? appState.r2Estimate : (appState.r2Estimate || null);
  popInput.value = "";
  popSlider.value = "4";
  popSlider.classList.add("is-unset");
  $("btn-submit-pop").disabled = true;
  $("pop-category-hint").textContent = "Drag the slider, tap a preset, or type a number.";
}

function setPopulation(value, source) {
  const num = Math.max(1, Math.min(POP_MAX, Math.round(Number(value)) || 0));
  if (!(Number(value) >= 1)) {
    appState.r2Estimate = null;
    $("btn-submit-pop").disabled = true;
    popSlider.classList.add("is-unset");
    return;
  }
  appState.r2Estimate = num;
  if (source !== "input") popInput.value = num;
  if (source !== "slider") popSlider.value = Math.max(0, Math.min(8, Math.log10(num))).toFixed(2);
  popSlider.classList.remove("is-unset");
  popSlider.setAttribute("aria-valuetext", num.toLocaleString());
  $("btn-submit-pop").disabled = false;
  $("pop-category-hint").textContent = populationWords(num);
}

popSlider.addEventListener("input", () => setPopulation(roundTwoSig(Math.pow(10, parseFloat(popSlider.value))), "slider"));
popInput.addEventListener("input", () => setPopulation(popInput.value, "input"));
popInput.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); submitPopulationGuess(); } });


function submitPopulationGuess() {
  if (appState.r2Submitted) return;
  const guess = appState.r2Estimate;
  if (!(guess >= 1)) { showToast("Set a population estimate first.", "warn"); return; }
  appState.r2Submitted = true;
  const pop = appState.animal.population;
  appState.r2Score = scorePopulation(guess, pop.low, pop.high);
  renderRound2Result();
  saveProgress();
}

function sourceLink(el, source, suffix = "") {
  const link = document.createElement("a");
  link.href = source.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.className = "underline decoration-parchment-300 hover:text-forest-800";
  link.textContent = source.label;
  el.replaceChildren(link, suffix);
}


function renderRound2Result() {
  const a = appState.animal;
  const pop = a.population;
  $("round2-input-area").classList.add("hidden");
  $("round2-result").classList.remove("hidden");
  $("r2-user-val").textContent = Number(appState.r2Estimate).toLocaleString();
  $("r2-actual-val").textContent = pop.display;
  const badge = $("r2-iucn-badge");
  badge.textContent = a.status;
  badge.className = `inline-block mt-1.5 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${a.statusColor}`;
  $("r2-points").textContent = `+${appState.r2Score}`;
  $("r2-accuracy-label").textContent = populationLabel(appState.r2Score);

  const lead = pop.confidence === "rough"
    ? `Nobody has a reliable count of wild ${a.name} numbers. The best available figure is ${pop.display}.`
    : `The wild ${a.name} population is put at ${pop.display} (${pop.basis}, ${pop.year}).`;
  $("r2-pop-context").textContent = `${lead} ${pop.note || ""} It is listed as ${a.status} on the IUCN Red List.`;
  const src = $("r2-pop-source");
  const band = `${pop.low.toLocaleString()} – ${pop.high.toLocaleString()}`;
  sourceLink(src, pop.source, ` · full marks for any guess from ${band}${pop.confidence === "rough" ? " (a wide band, because the true figure is uncertain)" : ""}`);
  src.prepend("Source: ");
}

// ===========================================================================
// Round 3: habitat map
// ===========================================================================
const mapContainer = $("habitat-map-container");
const habitatMap = createHabitatMap({
  container: mapContainer,
  svgEl: $("habitat-svg"),
  announce: (text) => {
    $("map-live").textContent = text;
    const readout = $("map-readout");
    readout.textContent = text;
    readout.classList.toggle("hidden", !text);
  },
  onChange: ({ count }) => {
    $("map-count").textContent = `${count} ${count === 1 ? "cell" : "cells"}`;
    if (!appState.r3Submitted) appState.r3Cells = habitatMap.getCells();
  }
});

function setDrawMode(mode) {
  habitatMap.setMode(mode);
  const active = "px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 bg-forest-800 text-white shadow-sm transition";
  const idle = "px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 bg-white text-parchment-900 border border-parchment-300 hover:bg-parchment-200 transition";
  for (const m of ["paint", "erase", "move"]) {
    const btn = $(`btn-mode-${m}`);
    btn.className = m === mode ? active : idle;
    btn.setAttribute("aria-pressed", m === mode ? "true" : "false");
  }
}

// Keyboard painting: arrows move a cursor cell, Space paints it.
mapContainer.addEventListener("keydown", (e) => {
  if (e.target !== mapContainer || appState.stage !== 3) return;
  if (habitatMap.handleKey(e)) e.preventDefault();
});
mapContainer.addEventListener("blur", () => {
  habitatMap.blurCursor();
  $("map-readout").classList.add("hidden");
});

function submitHabitatGuess() {
  if (appState.r3Submitted) return;
  const painted = habitatMap.getCells();
  if (painted.length === 0) {
    showToast("Paint at least one cell on the map first.", "warn");
    return;
  }
  const target = targetCellsFor(appState.animal);
  const { score, pct } = scoreCells(painted, target, neighbours, cellDistance);
  appState.r3Cells = painted;
  appState.r3Submitted = true;
  appState.r3Score = score;
  appState.r3OverlapPct = pct;

  for (const id of ["map-toolbar", "map-instruction", "round3-submit-area"]) $(id).classList.add("hidden");
  $("round3-result").classList.remove("hidden");
  $("map-legend").classList.remove("hidden");
  fillRound3Result();
  habitatMap.reveal(target);
  saveProgress();
}

function fillRound3Result() {
  const target = new Set(targetCellsFor(appState.animal));
  const hit = appState.r3Cells.filter(id => target.has(id)).length;
  $("r3-points").textContent = `+${appState.r3Score}`;
  $("r3-feedback-text").textContent =
    `You matched ${hit} of the range's ${target.size} ${target.size === 1 ? "cell" : "cells"} and painted ${appState.r3Cells.length}. Native range: ${appState.animal.regionsText}.`;
}

// ===========================================================================
// Navigation, summary, history chart, sharing
// ===========================================================================
let countdownTimer = null;

function goToStage(stage, persist = true) {
  appState.stage = stage;
  for (const n of [1, 2, 3, 4]) {
    $(`stage-${n}`).classList.toggle("hidden", n !== stage);
    const pill = $(`step-${n}-pill`);
    pill.className = "flex items-center gap-1.5 " + (
      n === stage ? "font-bold text-amber-300" : n < stage ? "font-semibold text-emerald-300" : "font-medium text-forest-100/70");
    if (n === stage) pill.setAttribute("aria-current", "step"); else pill.removeAttribute("aria-current");
  }
  clearInterval(countdownTimer);

  if (persist) saveProgress();
  if (stage === 2) setPhoto($("r2-thumb"), photoUrl(appState.animal, FULL_PHOTO));
  if (stage === 3) {
    // Wait a frame so the map container has its real size before drawing.
    requestAnimationFrame(() => {
      habitatMap.init({
        savedCells: appState.r3Cells,
        isLocked: appState.r3Submitted,
        targetCells: targetCellsFor(appState.animal)
      });
      setDrawMode(appState.r3Submitted ? "move" : "paint");
    });
  } else if (stage === 4) {
    renderSummary();
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const BADGE_LABEL = { bronze: "Bronze", silver: "Silver", gold: "Gold" };

function renderSummary() {
  const a = appState.animal;
  const total = appState.r1Score + appState.r2Score + appState.r3Score;
  const n = puzzleNumber(appState.todayKey);

  $("summary-edition-tag").textContent = appState.mode === "daily"
    ? `Daily Field Report${n >= 1 ? ` No. ${n}` : ""} • ${appState.todayKey}`
    : appState.mode === "archive" ? `Archive Field Report No. ${n} • ${appState.todayKey}`
    : appState.mode === "retake" ? "Retake Field Report" : "Practice Field Report";
  $("summary-animal-title").textContent = a.name;
  $("summary-scientific-name").textContent = a.scientificName;
  $("summary-total-score").textContent = total.toLocaleString();
  $("summary-rank-title").textContent = rankFor(total);

  const tries = appState.r1Guesses.length;
  $("sum-r1-detail").textContent = appState.r1Solved
    ? `Solved in ${tries} ${tries === 1 ? "try" : "tries"}`
    : appState.r1Score > 0 ? "Missed, but close on the family tree" : "Missed";
  $("sum-r1-score").textContent = appState.r1Score;
  $("sum-r2-detail").textContent = `Est: ${Number(appState.r2Estimate || 0).toLocaleString()}`;
  $("sum-r2-score").textContent = appState.r2Score;
  $("sum-r3-detail").textContent = `${appState.r3OverlapPct}% match`;
  $("sum-r3-score").textContent = appState.r3Score;

  const img = $("summary-image");
  setPhoto(img, photoUrl(a, FULL_PHOTO));
  img.alt = `${a.name}`;
  const iucn = $("summary-iucn");
  iucn.textContent = a.status;
  iucn.className = `text-xs font-bold uppercase px-2.5 py-0.5 rounded-full ${a.statusColor}`;
  $("summary-pop-badge").textContent = `Wild population: ${a.population.display}`;
  $("summary-fact").textContent = a.fact;
  $("summary-class").textContent = `${a.classFull}, family ${a.taxon.family}`;
  $("summary-regions").textContent = a.regionsText;
  sourceLink($("summary-pop-source"), a.population.source, ` (${a.population.year})`);
  const credit = PHOTOS[a.id];
  sourceLink($("summary-photo-credit"), { url: credit.sourceUrl, label: credit.artist }, ` · ${credit.license} · cropped from the original`);

  const data = loadData();
  const entry = data.zoo[a.id];
  const met = WILDLIFE_DB.filter(s => data.zoo[s.id]).length;
  const need = zooBar(data, a.id, appState.mode).toLocaleString();
  // The badge's own display rule beats the "hidden" class, so set it directly.
  $("summary-badge").style.display = entry ? "" : "none";
  if (entry) {
    const badge = badgeFor(entry.best);
    $("summary-badge").dataset.badge = badge;
    $("summary-zoo-title").textContent = entry.plays <= 1
      ? `${a.name} joined your zoo with a ${BADGE_LABEL[badge].toLowerCase()} badge`
      : `${a.name}: ${BADGE_LABEL[badge].toLowerCase()} badge, best score ${entry.best.toLocaleString()}`;
    $("summary-zoo-sub").textContent = `${met} of ${WILDLIFE_DB.length} animals met. Open your zoo.`;
  } else {
    const earning = appState.mode === "daily" || appState.mode === "retake";
    $("summary-zoo-title").textContent = earning
      ? `${a.name} got away: you scored ${total.toLocaleString()} and it takes ${need} to add it to your zoo`
      : a.practice ? `${a.name} is a practice animal, so it does not join your zoo`
      : `${a.name} is not in your zoo yet. Practice and past dailies do not add animals`;
    const status = retakeStatus(data, dateString(), activeStreak(data, dateString()));
    $("summary-zoo-sub").textContent = status === "ready" ? "You have a retake today. Open your zoo to use it."
      : status === "used" ? "Today's retake is used. You can retake it another day from your zoo."
      : `Reach a ${RETAKE_STREAK}-day streak to retake one missed animal a day.`;
    if (a.practice) $("summary-zoo-sub").textContent = "Practice animals are for warming up. Animals join your zoo from the daily puzzle.";
    if (earning) $("summary-zoo-sub").textContent += ` Its next retake needs ${retakeBar((data.retakes[a.id] || 0) + 1).toLocaleString()}.`;
  }

  const history = dailyHistory(data);
  const streak = activeStreak(data, dateString());
  const averages = dailyAverages(data);
  $("stat-current-streak").textContent = streak;
  $("stat-best-streak").textContent = Math.max(data.bestStreak || 0, streak);
  $("stat-total-played").textContent = history.length;
  $("stat-avg-score").textContent = averages ? averages.total.toLocaleString() : "—";
  for (const key of ["r1", "r2", "r3"]) $(`stat-avg-${key}`).textContent = averages ? averages[key] : "—";
  renderHistoryChart(history);

  const tick = () => {
    const ready = dateString() !== appState.todayKey && appState.mode === "daily";
    $("next-puzzle-countdown").textContent = ready ? "Ready!" : formatCountdown(msUntilNextPuzzle());
    if (ready) $("btn-daily").classList.remove("hidden");
  };
  tick();
  countdownTimer = setInterval(tick, 1000);
}

function renderHistoryChart(history) {
  const container = $("score-history-chart");
  container.replaceChildren();
  const recent = history.slice(-12);
  if (recent.length === 0) {
    const p = document.createElement("p");
    p.className = "text-xs text-parchment-800 italic py-4 text-center";
    p.textContent = "Finish a daily game to start your score history.";
    container.append(p);
    return;
  }

  const margin = { top: 22, right: 16, bottom: 42, left: 42 };
  const width = Math.max(container.clientWidth || 320, recent.length * 50 + margin.left + margin.right);
  const height = 220;
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  const svg = select(container).append("svg")
    .attr("width", width).attr("height", height).attr("class", "mx-auto block")
    .attr("role", "img")
    .attr("aria-label", `Bar chart of your last ${recent.length} daily scores: ${recent.map(r => `${r.date} ${r.total}`).join(", ")}`);
  const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
  const x = scaleBand().domain(recent.map((_, i) => i)).range([0, Math.min(innerW, recent.length * 84)]).padding(0.32);
  const y = scaleLinear().domain([0, MAX_TOTAL]).range([innerH, 0]);

  for (const tick of [0, 500, 1000, 1500, 2000, 2500]) {
    g.append("line").attr("x1", 0).attr("x2", innerW).attr("y1", y(tick)).attr("y2", y(tick))
      .attr("stroke", "#ebe2cf").attr("stroke-dasharray", tick === 0 ? "none" : "3,3");
    g.append("text").attr("x", -8).attr("y", y(tick) + 4).attr("text-anchor", "end")
      .attr("font-size", "12px").attr("fill", "#4a4031").text(tick === 0 ? "0" : tick >= 1000 ? `${tick / 1000}k` : String(tick));
  }

  const colors = { r1: "#275c44", r2: "#f59e0b", r3: "#0284c7" };
  const labels = { r1: "Species", r2: "Census", r3: "Habitat" };
  recent.forEach((item, i) => {
    const bx = x(i), bw = x.bandwidth();
    let top = innerH;
    for (const key of ["r1", "r2", "r3"]) {
      if (!(item[key] > 0)) continue;
      const h = innerH - y(item[key]);
      top -= h;
      g.append("rect").attr("x", bx).attr("y", top).attr("width", bw).attr("height", h).attr("rx", 3)
        .attr("fill", colors[key]).append("title").text(`${item.animalName} (${item.date})\n${labels[key]}: ${item[key]} pts`);
    }
    g.append("text").attr("x", bx + bw / 2).attr("y", y(item.total) - 5).attr("text-anchor", "middle")
      .attr("font-size", "12px").attr("font-weight", "700").attr("fill", "#2c251b").text(item.total);
    const short = item.animalName.length > 8 ? `${item.animalName.slice(0, 7)}…` : item.animalName;
    g.append("text").attr("x", bx + bw / 2).attr("y", innerH + 16).attr("text-anchor", "middle")
      .attr("font-size", "12px").attr("font-weight", "600").attr("fill", "#4a4031").text(short);
    g.append("text").attr("x", bx + bw / 2).attr("y", innerH + 32).attr("text-anchor", "middle")
      .attr("font-size", "12px").attr("fill", "#6b5d48").text(item.date.slice(5));
  });
}


async function shareScorecard() {
  const total = appState.r1Score + appState.r2Score + appState.r3Score;
  const bar = (score, max = 1000) => {
    const filled = Math.round((score / max) * 5);
    return "🟩".repeat(filled) + "⬜".repeat(5 - filled);
  };
  const n = puzzleNumber(appState.todayKey);
  const url = location.origin + location.pathname;
  // The share never names the animal, so it cannot spoil the puzzle.
  const title = appState.mode === "daily" ? `🌿 Animle ${n >= 1 ? `#${n}` : appState.todayKey}`
    : appState.mode === "archive" ? `🌿 Animle #${n} (archive)` : appState.mode === "retake" ? "🌿 Animle retake" : "🌿 Animle practice";
  const guesses = appState.r1Solved ? `${appState.r1Guesses.length}/${MAX_GUESSES}` : `X/${MAX_GUESSES}`;
  const text = [
    title,
    `Score: ${total.toLocaleString()} / ${MAX_TOTAL.toLocaleString()}`,
    `🐾 Species: ${bar(appState.r1Score, ROUND_MAX.r1)} ${appState.r1Score} (${guesses})`,
    `📊 Census:  ${bar(appState.r2Score)} ${appState.r2Score}`,
    `🗺️ Habitat: ${bar(appState.r3Score)} ${appState.r3Score}`,
    url
  ].join("\n");

  const touch = window.matchMedia("(pointer: coarse)").matches;
  if (touch && navigator.share) {
    try { await navigator.share({ text }); return; }
    catch (err) { if (err && err.name === "AbortError") return; }
  }
  await copyText(text, "Result copied. Paste it anywhere to share.");
}

async function copyText(text, okMessage) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(okMessage, "success");
    return true;
  } catch {
    // Last resort for browsers that block the clipboard API.
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.cssText = "position:fixed;opacity:0;";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    showToast(ok ? okMessage : "Could not copy automatically.", ok ? "success" : "warn");
    return ok;
  }
}

// ===========================================================================
// Past dailies
// ===========================================================================
function openArchive() {
  const data = loadData();
  const dailyByDate = new Map(dailyHistory(data).map(item => [item.date, item.total]));
  const days = pastDailies(dateString());
  const list = $("archive-list");
  if (days.length === 0) {
    const li = document.createElement("li");
    li.className = "text-sm text-parchment-800 italic text-center py-6";
    li.textContent = "No past dailies yet. Come back tomorrow and today's puzzle will be here.";
    list.replaceChildren(li);
  } else {
    list.replaceChildren(...days.map(({ date, number }) => {
      const li = document.createElement("li");
      li.className = "flex items-center justify-between gap-3 p-3 rounded-xl bg-white border border-parchment-200";
      const label = document.createElement("div");
      label.className = "min-w-0";
      const title = document.createElement("div");
      title.className = "font-bold text-sm text-parchment-900";
      title.textContent = `No. ${number}`;
      const sub = document.createElement("div");
      sub.className = "text-xs text-parchment-800";
      const onTheDay = dailyByDate.get(date);
      const later = data.archiveResults[date]?.total;
      sub.textContent = prettyDate(date) + (
        onTheDay !== undefined ? ` · played on the day: ${onTheDay.toLocaleString()}`
        : later !== undefined ? ` · best: ${later.toLocaleString()}` : " · not played");
      label.append(title, sub);
      const btn = document.createElement("button");
      btn.dataset.action = "play-archive";
      btn.dataset.date = date;
      btn.className = "shrink-0 px-4 rounded-lg bg-forest-800 hover:bg-forest-700 text-white text-sm font-semibold";
      btn.textContent = onTheDay !== undefined || later !== undefined ? "Replay" : "Play";
      btn.setAttribute("aria-label", `${btn.textContent} daily number ${number}`);
      li.append(label, btn);
      return li;
    }));
  }
  openModal("archive-modal");
}

// ===========================================================================
// The zoo, backup codes and credits
// ===========================================================================
function openZoo() {
  const data = loadData();
  const locked = lockedIds();
  const met = WILDLIFE_DB.filter(a => data.zoo[a.id]);
  $("zoo-count").textContent = `${met.length} of ${WILDLIFE_DB.length} animals met`;
  const today = dateString();
  const streak = activeStreak(data, today);
  const missed = missedAnimals(data);
  const status = retakeStatus(data, today, streak);
  const nextBar = (a) => retakeBar((data.retakes[a.id] || 0) + 1).toLocaleString();
  $("zoo-retake").textContent = (status === "locked"
    ? `Retakes unlock at a ${RETAKE_STREAK}-day streak (yours is ${streak}). Then you can retake one missed animal a day.`
    : status === "used" ? "Today's retake is used. You get another one tomorrow if you keep your streak."
    : missed.size ? "You have a retake today: pick one missed animal below."
    : "You have a retake today, but there are no missed animals to spend it on.")
    + ` A retake needs more than a daily, and each retake of the same animal raises its bar by ${RETAKE_STEP}.`;
  const retakeButton = (a, label) => {
    const btn = document.createElement("button");
    btn.dataset.action = "retake-animal";
    btn.dataset.id = a.id;
    btn.disabled = status !== "ready";
    btn.className = "btn-compact w-full rounded-lg text-xs font-bold border transition " + (status === "ready"
      ? "bg-forest-700 hover:bg-forest-800 text-white border-forest-700"
      : "bg-parchment-200 text-parchment-800 border-parchment-300 cursor-not-allowed");
    btn.textContent = `Retake · needs ${nextBar(a)}`;
    btn.setAttribute("aria-label", `Retake ${label}, needs ${nextBar(a)} points`);
    return btn;
  };
  const zooCard = (a) => {
    const entry = data.zoo[a.id];
    const miss = missed.get(a.id);
    if (!entry && miss) {
      const played = miss.best !== undefined;
      const card = document.createElement("div");
      card.className = "relative flex flex-col rounded-xl bg-parchment-100 border border-parchment-300 overflow-hidden min-h-[9.5rem]";
      const body = document.createElement("div");
      body.className = "p-2 min-w-0 flex flex-col gap-1.5 grow justify-end";
      const name = document.createElement("div");
      name.className = "font-bold text-sm text-parchment-900 truncate";
      const note = document.createElement("div");
      note.className = "text-xs text-parchment-800";
      if (played) {
        const img = document.createElement("img");
        setPhoto(img, photoUrl(a, FULL_PHOTO));
        img.alt = "";
        img.loading = "lazy";
        img.className = "w-full aspect-[4/3] object-cover bg-forest-900 grayscale opacity-60";
        card.append(img);
        name.textContent = a.name;
        note.textContent = `Not earned · best ${miss.best.toLocaleString()}`;
      } else {
        // A daily that was skipped: the animal stays a mystery until it is played.
        const mystery = document.createElement("div");
        mystery.className = "grow flex items-center justify-center font-display text-3xl font-bold text-parchment-300";
        mystery.setAttribute("aria-hidden", "true");
        mystery.textContent = "?";
        card.append(mystery);
        name.textContent = `Daily No. ${miss.number}`;
        note.textContent = "Missed";
      }
      body.append(name, note, retakeButton(a, played ? a.name : `daily number ${miss.number}`));
      card.append(body);
      return card;
    }
    if (!entry) {
      const card = document.createElement("div");
      card.className = "flex flex-col items-center justify-center gap-1 p-3 rounded-xl bg-parchment-100 border border-dashed border-parchment-300 text-center min-h-[9.5rem]";
      card.innerHTML = '<span class="font-display text-3xl font-bold text-parchment-300" aria-hidden="true">?</span><span class="text-xs text-parchment-800">Not met yet</span>';
      return card;
    }
    const playable = !locked.has(a.id);
    const card = document.createElement(playable ? "button" : "div");
    if (playable) {
      card.dataset.action = "practice-animal";
      card.dataset.id = a.id;
      card.setAttribute("aria-label", `${a.name}, ${badgeFor(entry.best)} badge, best score ${entry.best}. Practise on it.`);
    }
    card.className = "relative flex flex-col text-left rounded-xl bg-white border border-parchment-200 overflow-hidden transition " + (playable ? "hover:border-forest-500 hover:shadow" : "");
    const img = document.createElement("img");
    setPhoto(img, photoUrl(a, FULL_PHOTO));
    img.alt = "";
    img.loading = "lazy";
    img.className = "w-full aspect-[4/3] object-cover bg-forest-900";
    const badge = document.createElement("span");
    badge.className = "zoo-badge absolute top-1.5 right-1.5";
    badge.dataset.badge = badgeFor(entry.best);
    badge.title = `${BADGE_LABEL[badgeFor(entry.best)]} badge`;
    const body = document.createElement("div");
    body.className = "p-2 min-w-0";
    const name = document.createElement("div");
    name.className = "font-bold text-sm text-parchment-900 truncate";
    name.textContent = a.name;
    const best = document.createElement("div");
    best.className = "text-xs text-parchment-800";
    best.textContent = `Best ${entry.best.toLocaleString()} · ${entry.plays} ${entry.plays === 1 ? "game" : "games"}`;
    body.append(name, best);
    card.append(img, badge, body);
    return card;
  };
  // One section per region. Within a region, animals you have met come first; the rest stay a mystery.
  $("zoo-grid").replaceChildren(...ZOO_REGIONS.map(region => {
    const here = WILDLIFE_DB.filter(a => a.region === region);
    if (!here.length) return null;
    const metHere = here.filter(a => data.zoo[a.id]);
    const section = document.createElement("section");
    section.setAttribute("aria-label", region);
    const head = document.createElement("div");
    head.className = "flex items-baseline justify-between gap-3 mb-2 pb-1 border-b border-parchment-300";
    const title = document.createElement("h4");
    title.className = "font-display text-base font-bold text-parchment-900";
    title.textContent = region;
    const count = document.createElement("span");
    count.className = "text-xs font-medium " + (metHere.length === here.length ? "text-forest-700" : "text-parchment-800");
    count.textContent = metHere.length === here.length ? `All ${here.length} met` : `${metHere.length} of ${here.length} met`;
    head.append(title, count);
    const grid = document.createElement("div");
    grid.className = "grid grid-cols-2 sm:grid-cols-3 gap-3 auto-rows-max content-start";
    const rest = here.filter(a => !data.zoo[a.id]);
    grid.append(...[...metHere, ...rest.filter(a => missed.has(a.id)), ...rest.filter(a => !missed.has(a.id))].map(zooCard));
    section.append(head, grid);
    return section;
  }).filter(Boolean));
  $("backup-output").classList.add("hidden");
  $("restore-confirm").classList.add("hidden");
  $("restore-input").value = "";
  openModal("zoo-modal");
}

async function copyBackupCode() {
  const code = exportCode(loadData());
  const out = $("backup-output");
  out.value = code;
  out.classList.remove("hidden");
  const ok = await copyText(code, "Backup code copied. Keep it somewhere safe.");
  if (!ok) { out.focus(); out.select(); }
}

// ---------------------------------------------------------------------------
// Leaderboard and sign-in: shown as "coming soon" so players can see where they
// will live. Nothing here talks to a server. The only real numbers shown are the
// player's own, from this device.
// ---------------------------------------------------------------------------
const LB_TEXT = {
  daily: { unit: "points", explain: "Everyone who finishes today's puzzle, ranked by score out of 2,500. Ties go to whoever used fewer guesses in round 1." },
  streak: { unit: "days", explain: "The longest runs of consecutive daily puzzles." },
  zoo: { unit: "animals", explain: "Who has collected the most animals, with gold badges breaking ties." }
};
const lbState = { scope: "everyone", board: "daily" };

function renderLeaderboard() {
  const data = loadData();
  const today = dateString();
  const mine = {
    daily: data.dailyProgress[today]?.stage === 4 ? dailyHistory(data).find(g => g.date === today)?.total ?? null : null,
    streak: activeStreak(data, today),
    zoo: WILDLIFE_DB.filter(a => data.zoo[a.id]).length
  }[lbState.board];
  for (const btn of document.querySelectorAll("[data-action=lb-scope]")) btn.setAttribute("aria-pressed", String(btn.dataset.scope === lbState.scope));
  for (const btn of document.querySelectorAll("[data-action=lb-board]")) btn.setAttribute("aria-pressed", String(btn.dataset.board === lbState.board));
  const { unit, explain } = LB_TEXT[lbState.board];
  $("lb-explain").textContent = (lbState.scope === "friends" ? "Only people you follow. " : "") + explain;
  const line = (rank, name, value, own) => {
    const li = document.createElement("li");
    li.className = "flex items-center gap-3 px-3 py-2 rounded-lg border " + (own ? "bg-forest-50 border-forest-200" : "bg-white border-dashed border-parchment-300");
    const r = document.createElement("span");
    r.className = "w-6 text-center text-xs font-bold text-parchment-800";
    r.textContent = rank;
    const n = document.createElement("span");
    n.className = "grow text-sm " + (own ? "font-bold text-parchment-900" : "text-parchment-800");
    n.textContent = name;
    const v = document.createElement("span");
    v.className = "text-sm font-bold " + (own ? "text-forest-800" : "text-parchment-300");
    v.textContent = value;
    li.append(r, n, v);
    return li;
  };
  // Empty slots, not invented players: the list fills in when leaderboards open.
  $("lb-rows").replaceChildren(
    ...[1, 2, 3].map(rank => line(String(rank), "Open place", "—", false)),
    line("—", "You (this device)", mine === null ? "Finish today's puzzle" : `${mine.toLocaleString()} ${mine === 1 ? unit.replace(/s$/, "") : unit}`, true)
  );
}

function openLeaderboard(el) {
  if (el?.dataset.scope) lbState.scope = el.dataset.scope;
  renderLeaderboard();
  openModal("leaderboard-modal");
}

let pendingRestore = null;
function askRestore() {
  pendingRestore = importCode($("restore-input").value);
  if (!pendingRestore) {
    showToast("That is not a Animle backup code. Check you pasted all of it.", "warn");
    return;
  }
  $("restore-confirm").classList.remove("hidden");
}
function confirmRestore() {
  if (!pendingRestore) return;
  saveData({ ...pendingRestore, seenHowTo: true });
  pendingRestore = null;
  showToast("Progress restored.", "success");
  updateStreakDisplay();
  loadDailyChallenge();
}

function openCredits() {
  const data = loadData();
  const met = WILDLIFE_DB.filter(a => data.zoo[a.id]);
  const list = $("credits-photos");
  if (met.length === 0) {
    const li = document.createElement("li");
    li.className = "italic";
    li.textContent = "Finish a game to see its photo credit here.";
    list.replaceChildren(li);
  } else {
    list.replaceChildren(...met.map(a => {
      const credit = PHOTOS[a.id];
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = credit.sourceUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.className = "underline decoration-parchment-300 hover:text-forest-800";
      link.textContent = `${a.name}: ${credit.artist}`;
      li.append(link, ` · ${credit.license}`);
      return li;
    }));
  }
  openModal("credits-modal");
}

// ===========================================================================
// One click handler for every control (no inline handlers, so a strict CSP works)
// ===========================================================================
const actions = {
  "practice-random": startRandomPractice,
  "practice-animal": (el) => { const a = speciesById(el.dataset.id); if (a && !lockedIds().has(a.id)) startPractice(a); },
  "retake-animal": (el) => startRetake(el.dataset.id),
  "play-archive": (el) => startArchive(el.dataset.date),
  "load-daily": loadDailyChallenge,
  "open-menu": () => openModal("menu-modal"),
  "open-archive": openArchive,
  "open-zoo": openZoo,
  "open-leaderboard": openLeaderboard,
  "open-account": () => openModal("account-modal"),
  "lb-scope": (el) => { lbState.scope = el.dataset.scope; renderLeaderboard(); },
  "lb-board": (el) => { lbState.board = el.dataset.board; renderLeaderboard(); },
  "open-howto": () => openModal("howto-modal"),
  "open-credits": openCredits,
  "open-privacy": () => openModal("privacy-modal"),
  "open-terms": () => openModal("terms-modal"),
  "close-modal": closeModal,
  "backup-copy": copyBackupCode,
  "backup-restore": askRestore,
  "backup-restore-confirm": confirmRestore,
  "backup-restore-cancel": () => { pendingRestore = null; $("restore-confirm").classList.add("hidden"); },
  "retry-photo": () => { photoEl.dataset.shown = ""; photoEl.removeAttribute("src"); showPhoto(photoLevel(), true); },
  "submit-guess": submitAnimalGuess,
  "skip-guess": skipAnimalGuess,
  "go-stage": (el) => goToStage(Number(el.dataset.stage)),
  "pop-preset": (el) => setPopulation(Number(el.dataset.value), "preset"),
  "submit-population": submitPopulationGuess,
  "draw-mode": (el) => setDrawMode(el.dataset.mode),
  "undo-point": () => habitatMap.undo(),
  "clear-drawings": () => habitatMap.clear(),
  "map-zoom": (el) => habitatMap.zoomBy(Number(el.dataset.factor)),
  "map-region": (el) => habitatMap.showRegion(el.dataset.region),
  "submit-habitat": submitHabitatGuess,
  "share": shareScorecard
};

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]");
  if (el && actions[el.dataset.action]) { actions[el.dataset.action](el); return; }
  // Clicking the dimmed backdrop closes a dialog.
  if (openModalEl && e.target === openModalEl) closeModal();
});

// ===========================================================================
// Boot
// ===========================================================================
refreshIcons();
updateStreakDisplay();
loadDailyChallenge();

if (!storageAvailable()) {
  showToast("Your browser is blocking storage, so progress and streaks will not be saved.", "warn");
}
const boot = loadData();
if (!boot.seenHowTo) {
  saveData({ ...boot, seenHowTo: true });
  openModal("howto-modal");
}
