// Makes review sheets of the species photos, for choosing focus points and checking crops.
// Run: node scripts/contact-sheet.mjs [level]   (level 5 = full photo, 0 = first close-up)
// Output: .cache/sheet-<level>-<n>.jpg, twelve photos per sheet, with a grid of tenths.
import { readFile, mkdir } from "node:fs/promises";
import sharp from "sharp";

const level = Number(process.argv[2] ?? 5);
const photos = JSON.parse(await readFile("src/data/photos.json", "utf8"));
const ids = Object.keys(photos);
const W = 480, H = 360, COLS = 4, ROWS = 3;
await mkdir(".cache", { recursive: true });

for (let sheet = 0; sheet * COLS * ROWS < ids.length; sheet++) {
  const batch = ids.slice(sheet * COLS * ROWS, (sheet + 1) * COLS * ROWS);
  const composites = [];
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W * COLS}" height="${H * ROWS}">`;
  for (const [i, id] of batch.entries()) {
    const x = (i % COLS) * W, y = Math.floor(i / COLS) * H;
    const input = await sharp(`public/p/${photos[id].files[level]}.webp`).resize(W, H).toBuffer();
    composites.push({ input, left: x, top: y });
    for (let t = 1; t < 10; t++) {
      const major = t === 5 ? 0.9 : 0.35;
      svg += `<line x1="${x + W * t / 10}" y1="${y}" x2="${x + W * t / 10}" y2="${y + H}" stroke="yellow" stroke-opacity="${major}" stroke-width="1"/>`;
      svg += `<line x1="${x}" y1="${y + H * t / 10}" x2="${x + W}" y2="${y + H * t / 10}" stroke="yellow" stroke-opacity="${major}" stroke-width="1"/>`;
    }
    svg += `<rect x="${x}" y="${y}" width="${W}" height="${H}" fill="none" stroke="white" stroke-width="3"/>`;
    svg += `<rect x="${x + 4}" y="${y + 4}" width="${id.length * 9 + 12}" height="22" fill="black"/><text x="${x + 10}" y="${y + 20}" font-family="monospace" font-size="15" fill="white">${id}</text>`;
  }
  svg += "</svg>";
  await sharp({ create: { width: W * COLS, height: H * ROWS, channels: 3, background: "#222" } })
    .composite([...composites, { input: Buffer.from(svg), left: 0, top: 0 }])
    .jpeg({ quality: 80 }).toFile(`.cache/sheet-${level}-${sheet}.jpg`);
  console.log(`.cache/sheet-${level}-${sheet}.jpg`);
}
