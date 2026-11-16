// Writes src/data/schedule.js: the fixed list of which animal appears on which day.
//
// Days that have already been published are never touched. The script keeps every entry before
// a cut-off date and rebuilds the list from that date on, using the species that exist now, so new
// animals join the rotation and nothing in the past moves.
//
//   node scripts/build-schedule.mjs                    rebuild from 11 days ahead (the days the game already hides)
//   node scripts/build-schedule.mjs --from 2027-01-01  rebuild from a later date
//   node scripts/build-schedule.mjs --from 2026-11-16 --first secretarybird --force   first build / before launch only
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { WILDLIFE_DB } from "../src/data/species.js";
import { LAUNCH_DATE, UPCOMING_LOCK_DAYS, dayNumber, dateFromDayNumber, dateString } from "../src/engine/daily.js";

const arg = (name) => { const i = process.argv.indexOf(name); return i >= 0 ? process.argv[i + 1] : null; };
const force = process.argv.includes("--force");
const FILE = "src/data/schedule.js";
const GAP = 30;        // an animal never returns within this many days
const CYCLES = 2;      // how many full passes through the species to schedule ahead

const existing = existsSync(FILE) ? JSON.parse(readFileSync(FILE, "utf8").match(/export const SCHEDULE = (\[[\s\S]*?\]);/)[1]) : [];
const today = dateString();
const earliest = dateFromDayNumber(dayNumber(today) + UPCOMING_LOCK_DAYS + 1);
const from = arg("--from") || (existing.length ? earliest : LAUNCH_DATE);
if (from < earliest && !force) {
  console.log(`Refusing to rebuild from ${from}: days up to ${dateFromDayNumber(dayNumber(earliest) - 1)} are published or already hidden from practice. Use a later --from date.`);
  process.exit(1);
}
const keep = Math.max(0, dayNumber(from) - dayNumber(LAUNCH_DATE));
if (keep > existing.length) {
  console.log(`The existing schedule ends before ${from}. Use --from ${dateFromDayNumber(dayNumber(LAUNCH_DATE) + existing.length)} or earlier.`);
  process.exit(1);
}
const kept = existing.slice(0, keep);

// A small seeded random number generator, so the same command always gives the same list.
let seed = dayNumber(from) * 2654435761 >>> 0;
const random = () => {
  seed = (seed + 0x6D2B79F5) >>> 0;
  let t = seed;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const shuffle = (list) => {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  return out;
};

const ids = WILDLIFE_DB.map(a => a.id);
const gap = Math.min(GAP, Math.floor(ids.length / 3));
const list = [...kept];
const first = arg("--first");
if (first) {
  if (!ids.includes(first)) { console.log(`Unknown species: ${first}`); process.exit(1); }
  list.push(first);
}
for (let cycle = 0; cycle < CYCLES; cycle++) {
  // Animals that have never had a day go first, so additions show up soon.
  const seen = new Set(list);
  let bag = [...shuffle(ids.filter(id => !seen.has(id))), ...shuffle(ids.filter(id => seen.has(id)))];
  if (cycle === 0 && first) bag = bag.filter(id => id !== first);
  // The list starts again from the top when it runs out. In the last pass, the animals that open
  // the list go first, so none of them is also near the end.
  if (cycle === CYCLES - 1) {
    const opening = new Set((list.length ? list : bag).slice(0, gap));
    bag = [...bag.filter(id => opening.has(id)), ...bag.filter(id => !opening.has(id))];
  }
  while (bag.length) {
    const recent = new Set(list.slice(-gap));
    const pick = bag.findIndex(id => !recent.has(id));
    list.push(bag.splice(pick >= 0 ? pick : 0, 1)[0]);
  }
}

const lines = [];
for (let i = 0; i < list.length; i += 6) lines.push("  " + list.slice(i, i + 6).map(id => JSON.stringify(id)).join(", "));
writeFileSync(FILE, `// Which animal appears on which day. Entry 1 is ${LAUNCH_DATE}; one entry per day after that.
// Written by scripts/build-schedule.mjs. Never edit or reorder days that have already been played:
// run \`npm run schedule\` instead, which only rebuilds days that are still in the future.
export const SCHEDULE_START = ${JSON.stringify(LAUNCH_DATE)};
export const SCHEDULE = [
${lines.join(",\n")}
];
`);
const end = dateFromDayNumber(dayNumber(LAUNCH_DATE) + list.length - 1);
console.log(`${FILE}: ${list.length} days, ${LAUNCH_DATE} to ${end}. Kept ${kept.length} existing days; rebuilt from ${from}. After ${end} the list repeats from the top, so run this again before then.`);
