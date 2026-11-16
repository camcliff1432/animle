// Merges reviewed close-up choices from .cache/focus/*.json into scripts/photo-focus.json.
// Each entry: { focus: [x, y], frame?: [x, y], file?: "File:Commons name.jpg", note? }.
// A "file" replaces the photo, so its cached original is removed and it is downloaded again
// by the next `npm run photos <ids>`. Prints the ids that changed.
import { readFileSync, writeFileSync, readdirSync, rmSync, existsSync } from "node:fs";

const target = "scripts/photo-focus.json";
const focus = JSON.parse(readFileSync(target, "utf8"));
const changed = [];
const ok = (p) => Array.isArray(p) && p.length === 2 && p.every(v => typeof v === "number" && v >= 0 && v <= 1);
for (const name of existsSync(".cache/focus") ? readdirSync(".cache/focus").filter(f => f.endsWith(".json")) : []) {
  for (const [id, entry] of Object.entries(JSON.parse(readFileSync(`.cache/focus/${name}`, "utf8")))) {
    if (!ok(entry.focus) || (entry.frame && !ok(entry.frame))) { console.log(`SKIPPED ${id} in ${name}: bad numbers`); continue; }
    const next = { focus: entry.focus };
    const frame = entry.frame || focus[id]?.frame;
    if (frame && !(frame[0] === 0.5 && frame[1] === 0.5)) next.frame = frame;
    const file = entry.file || focus[id]?.file;
    if (file) next.file = file;
    if (JSON.stringify(next) === JSON.stringify(focus[id])) continue;
    if (entry.file && entry.file !== focus[id]?.file) rmSync(`.cache/photos/${id}.img`, { force: true });
    focus[id] = next;
    changed.push(id);
  }
}
writeFileSync(target, JSON.stringify(focus, null, 1));
console.log(changed.join(" "));
