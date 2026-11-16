// Lists which species a second person has signed off, and what to check for the rest.
// Record a sign-off in src/data/speciesExtra.js:  REVIEWED = { "okapi": { by: "Sam", date: "2026-11-20" } }
// Run: npm run review
import { REVIEWED, REQUIRE_REVIEW } from "../src/data/speciesExtra.js";
import { ALL_SPECIES } from "../src/data/species.js";

const ids = ALL_SPECIES.map(a => a.id);
const done = ids.filter(id => REVIEWED[id]);
console.log(`${done.length} of ${ids.length} species reviewed. Scheduling ${REQUIRE_REVIEW ? "uses reviewed species only" : "still uses every species (REQUIRE_REVIEW is false)"}.\n`);
for (const id of ids) {
  const r = REVIEWED[id];
  console.log(`${r ? "[x]" : "[ ]"} ${id}${r ? `  (${r.by}, ${r.date})` : ""}`);
}
console.log(`
For each species, the reviewer checks:
  1. Photo: it is the right animal, the close-up is fair, and the credit is correct (npm run sheets).
  2. Clues: diet, biome, size and last clue are true and none of them names the animal.
  3. Population: the figure, year and range match the linked source.
  4. Range: the map cells match a trusted range map (npm run check-ranges flags gaps).
  5. Guessing: its common names and likely misspellings are accepted.`);
