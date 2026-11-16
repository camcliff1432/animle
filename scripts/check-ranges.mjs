// Cross-checks each hand-drawn range against wild sighting records from GBIF.
// It reports how many sightings fall on (or right beside) the range cells, and
// lists the map cells with many sightings that the range misses.
// A check, not a source: GBIF includes zoo escapes, vagrants and misidentifications.
// Run: node scripts/check-ranges.mjs [species-id]
//  or: node scripts/check-ranges.mjs --batch src/data/batches/africa.js [species-id]
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { cells, cellAtLatLng, cellsForPolygons, neighbours } from "../src/engine/grid.js";

const UA = "wildlife-game-build/0.3 (range check script)";
const args = process.argv.slice(2);
const batchAt = args.indexOf("--batch");
const batchFile = batchAt >= 0 ? args.splice(batchAt, 2)[1] : null;
const only = args[0];
// A batch file is checked on its own, so a half-written batch elsewhere cannot break the run.
const WILDLIFE_DB = batchFile
  ? (await import(pathToFileURL(resolve(batchFile)).href)).default
  : (await import("../src/data/species.js")).WILDLIFE_DB;
const getJson = async (url) => {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
};

for (const a of WILDLIFE_DB) {
  if (only && a.id !== only) continue;
  try {
    const match = await getJson(`https://api.gbif.org/v1/species/match?name=${encodeURIComponent(a.scientificName)}`);
    const key = match.acceptedUsageKey || match.usageKey;
    const points = [];
    for (let offset = 0; offset < 900; offset += 300) {
      const page = await getJson(`https://api.gbif.org/v1/occurrence/search?taxonKey=${key}&hasCoordinate=true&hasGeospatialIssue=false` +
        `&basisOfRecord=HUMAN_OBSERVATION&basisOfRecord=MACHINE_OBSERVATION&occurrenceStatus=PRESENT&limit=300&offset=${offset}`);
      for (const r of page.results) {
        if (r.establishmentMeans && /managed|introduced/i.test(r.establishmentMeans)) continue;
        points.push([r.decimalLatitude, r.decimalLongitude]);
      }
      if (page.endOfRecords) break;
    }
    const range = new Set(cellsForPolygons(a.ranges));
    const near = new Set(range);
    for (const id of range) for (const n of neighbours(id)) near.add(n);
    const outside = new Map();
    let on = 0;
    for (const [lat, lng] of points) {
      const id = cellAtLatLng(lat, lng);
      if (near.has(id)) on++;
      else if (id >= 0) outside.set(id, (outside.get(id) || 0) + 1);
    }
    const share = points.length ? Math.round((100 * on) / points.length) : 0;
    const misses = [...outside].filter(([, n]) => n >= Math.max(3, points.length * 0.02)).sort((x, y) => y[1] - x[1]).slice(0, 6)
      .map(([id, n]) => `${cells[id].lat.toFixed(0)},${cells[id].lng.toFixed(0)} x${n}`);
    console.log(`${share >= 80 ? "ok  " : "LOOK"} ${a.id.padEnd(24)} ${String(points.length).padStart(4)} sightings, ${String(share).padStart(3)}% on range (${range.size} cells)` +
      (misses.length ? ` | busy cells outside: ${misses.join("; ")}` : ""));
  } catch (err) {
    console.log(`FAIL ${a.id}: ${err.message}`);
  }
}
