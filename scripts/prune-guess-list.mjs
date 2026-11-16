// Removes from the guess list (src/data/taxonomy.js) every name that is now an answer species.
// Answers are added to the guess box from the species data, so listing them twice would
// create duplicates. Run after adding species: node scripts/prune-guess-list.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { ALL_SPECIES as WILDLIFE_DB } from "../src/data/species.js";
import { normalizeName, answerKeys } from "../src/engine/matching.js";

const answers = new Set(WILDLIFE_DB.flatMap(a => [...answerKeys(a)]));
const file = new URL("../src/data/taxonomy.js", import.meta.url);
const text = readFileSync(file, "utf8");
const removed = [];
const out = text.split("\n").map(line => {
  const colon = line.indexOf(":");
  if (colon < 0 || /^\s*(\/\/|@|#|const|function|export|for|if|let|return|\})/.test(line) || line.includes("`")) return line;
  const kept = line.slice(colon + 1).split(",").map(e => e.trim()).filter(entry => {
    const name = entry.split("/")[0];
    if (!answers.has(normalizeName(name))) return true;
    removed.push(name);
    return false;
  });
  return kept.length ? `${line.slice(0, colon)}: ${kept.join(", ")}` : null;
}).filter(line => line !== null);
writeFileSync(file, out.join("\n"));
console.log(removed.length ? `Removed ${removed.length}: ${removed.join(", ")}` : "Nothing to remove.");
