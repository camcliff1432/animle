// Validates one species batch file on its own, without loading the rest of the game.
// Run: node scripts/check-batch.mjs src/data/batches/africa.js
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const file = process.argv[2];
if (!file) { console.log("usage: node scripts/check-batch.mjs <batch file>"); process.exit(1); }
const batch = (await import(pathToFileURL(resolve(file)).href)).default;

const REGIONS = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania", "Oceans"];
const CLASSES = ["Mammal", "Bird", "Reptile", "Amphibian", "Fish", "Invertebrate"];
const STATUSES = ["Critically Endangered", "Endangered", "Vulnerable", "Near Threatened", "Least Concern"];
const TEXT = ["id", "name", "wikiTitle", "scientificName", "classPlain", "classFull", "diet", "biome", "status", "regionsText", "fact", "size", "lastClue", "region"];

let problems = 0;
const seen = new Set();
for (const a of batch) {
  const bad = [];
  for (const f of TEXT) if (typeof a[f] !== "string" || !a[f].trim()) bad.push(`missing ${f}`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(a.id || "")) bad.push("id must be lower-case words joined by hyphens");
  if (seen.has(a.id)) bad.push("duplicate id");
  seen.add(a.id);
  if (!CLASSES.includes(a.classPlain)) bad.push(`classPlain must be one of ${CLASSES.join(", ")}`);
  if (!STATUSES.includes(a.status)) bad.push(`status must be one of ${STATUSES.join(", ")}`);
  if (!REGIONS.includes(a.region)) bad.push(`region must be one of ${REGIONS.join(", ")}`);
  if (!Array.isArray(a.aliases) || !Array.isArray(a.groups)) bad.push("aliases and groups must be arrays");
  if (!Array.isArray(a.taxon) || a.taxon.length !== 4 || a.taxon.some(t => !t)) bad.push("taxon must be [class, order, family, genus]");
  else {
    if (!String(a.scientificName).startsWith(a.taxon[3])) bad.push("scientificName must start with the genus in taxon");
    if (!String(a.classFull).startsWith(a.taxon[0])) bad.push("classFull must start with the class in taxon");
  }
  const p = a.population || {};
  if (!(p.value >= 1)) bad.push("population.value");
  if (!(p.low >= 1 && p.low <= p.value && p.high >= p.value)) bad.push("population low <= value <= high");
  if (!p.display) bad.push("population.display");
  if (!(p.year > 1980)) bad.push("population.year must be after 1980");
  if (!p.basis) bad.push("population.basis");
  if (!["counted", "estimated", "rough"].includes(p.confidence)) bad.push("population.confidence");
  if (!p.source || !p.source.label || !/^https:\/\//.test(p.source.url || "")) bad.push("population.source {label, url https}");
  if (!Array.isArray(a.ranges) || a.ranges.length === 0) bad.push("ranges");
  else for (const ring of a.ranges) {
    if (!Array.isArray(ring) || ring.length < 3) { bad.push("a range ring needs 3+ points"); continue; }
    for (const pt of ring) {
      if (!Array.isArray(pt) || pt.length !== 2 || Math.abs(pt[0]) > 90 || Math.abs(pt[1]) > 180) { bad.push(`bad point ${JSON.stringify(pt)} (use [lat, lng])`); break; }
    }
    const lngs = ring.map(pt => pt[1]);
    if (Math.max(...lngs) - Math.min(...lngs) > 300) bad.push("a ring spans more than 300 degrees of longitude; split it at the 180 meridian");
  }
  const clues = [a.diet, a.biome, a.size, a.lastClue].join(" ").toLowerCase();
  const names = [a.name, ...(a.aliases || [])].map(n => String(n).toLowerCase());
  for (const n of names) if (n.length > 3 && clues.includes(n)) bad.push(`a clue contains the name "${n}"`);
  if (bad.length) { problems += bad.length; console.log(`PROBLEM ${a.id || a.name}: ${bad.join("; ")}`); }
  else console.log(`ok      ${a.id}`);
}
console.log(`\n${batch.length} species, ${problems} problems`);
process.exit(problems ? 1 : 0);
