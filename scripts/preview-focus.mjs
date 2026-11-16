// Previews a photo's close-ups for a chosen focus point, without touching the game's files.
// Writes .cache/preview/<id>.jpg with three panels: the full 4:3 frame (grid of tenths, red box = first
// close-up), the first close-up (zoom 3) and the second (zoom 2.2).
//
//   node scripts/preview-focus.mjs <id>                      current settings
//   node scripts/preview-focus.mjs <id> 0.4 0.6              focus x y (fractions of the 4:3 frame)
//   node scripts/preview-focus.mjs <id> 0.4 0.6 0.5 0        ... plus frame x y (slides the 4:3 window over the original)
//   node scripts/preview-focus.mjs <id> 0.5 0.5 --file "File:Some photo.jpg"    try another Commons photo
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import sharp from "sharp";

const UA = "wildlife-game-build/0.4 (photo preview script)";
const ALLOWED = /^(cc0|public domain|pd\b|cc by( |-)\d|cc by-sa( |-)\d)/i;
const args = process.argv.slice(2);
const fileAt = args.indexOf("--file");
const file = fileAt >= 0 ? args.splice(fileAt, 2)[1] : null;
const [id, ...nums] = args;
const saved = JSON.parse(await readFile("scripts/photo-focus.json", "utf8"))[id] || {};
const [fx, fy] = nums.length >= 2 ? nums.slice(0, 2).map(Number) : saved.focus || [0.5, 0.5];
const [ax, ay] = nums.length >= 4 ? nums.slice(2, 4).map(Number) : saved.frame || [0.5, 0.5];

await mkdir(".cache/preview", { recursive: true });
let buf;
if (file) {
  const slug = file.replace(/[^a-z0-9]+/gi, "_").slice(0, 80);
  const cached = `.cache/preview/orig-${slug}.img`;
  if (existsSync(cached)) buf = await readFile(cached);
  else {
    const url = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams({
      format: "json", origin: "*", action: "query", titles: file, prop: "imageinfo", iiprop: "url|extmetadata|size", iiurlwidth: "1600"
    });
    const info = Object.values((await (await fetch(url, { headers: { "User-Agent": UA } })).json()).query.pages)[0].imageinfo?.[0];
    if (!info) { console.log(`NOT FOUND on Commons: ${file}`); process.exit(1); }
    const licence = (info.extmetadata?.LicenseShortName?.value || "").replace(/<[^>]*>/g, "");
    console.log(`${file} | licence: ${licence} ${ALLOWED.test(licence) ? "(usable)" : "(NOT USABLE)"} | ${info.width}x${info.height}`);
    buf = Buffer.from(await (await fetch(info.thumburl || info.url, { headers: { "User-Agent": UA } })).arrayBuffer());
    await writeFile(cached, buf);
  }
} else {
  buf = await readFile(`.cache/photos/${id}.img`);
}

const { width, height } = await sharp(buf).rotate().metadata();
let fw = width, fh = Math.round(width * 3 / 4);
if (fh > height) { fh = height; fw = Math.round(height * 4 / 3); }
const frameLeft = Math.round((width - fw) * ax), frameTop = Math.round((height - fh) * ay);
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const crop = (z) => {
  const cw = Math.round(fw / z), ch = Math.round(fh / z);
  return {
    left: Math.round(clamp(frameLeft + fx * fw - cw / 2, frameLeft, frameLeft + fw - cw)),
    top: Math.round(clamp(frameTop + fy * fh - ch / 2, frameTop, frameTop + fh - ch)), width: cw, height: ch
  };
};
const W = 480, H = 360;
const panel = (box) => sharp(buf).rotate().extract(box).resize(W, H, { fit: "cover" }).toBuffer();
const c0 = crop(3);
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W * 3}" height="${H}">`;
for (let t = 1; t < 10; t++) {
  svg += `<line x1="${W * t / 10}" y1="0" x2="${W * t / 10}" y2="${H}" stroke="yellow" stroke-opacity="${t === 5 ? 0.9 : 0.35}"/>`;
  svg += `<line x1="0" y1="${H * t / 10}" x2="${W}" y2="${H * t / 10}" stroke="yellow" stroke-opacity="${t === 5 ? 0.9 : 0.35}"/>`;
}
svg += `<rect x="${(c0.left - frameLeft) / fw * W}" y="${(c0.top - frameTop) / fh * H}" width="${c0.width / fw * W}" height="${c0.height / fh * H}" fill="none" stroke="red" stroke-width="3"/>`;
for (const [i, label] of ["full frame", "1st close-up", "2nd close-up"].entries()) {
  svg += `<rect x="${W * i}" y="0" width="${W}" height="${H}" fill="none" stroke="white" stroke-width="3"/>`;
  svg += `<rect x="${W * i + 4}" y="4" width="${label.length * 9 + 12}" height="22" fill="black"/><text x="${W * i + 10}" y="20" font-family="monospace" font-size="15" fill="white">${label}</text>`;
}
svg += "</svg>";
await sharp({ create: { width: W * 3, height: H, channels: 3, background: "#222" } })
  .composite([
    { input: await panel({ left: frameLeft, top: frameTop, width: fw, height: fh }), left: 0, top: 0 },
    { input: await panel(c0), left: W, top: 0 },
    { input: await panel(crop(2.2)), left: W * 2, top: 0 },
    { input: Buffer.from(svg), left: 0, top: 0 }
  ]).jpeg({ quality: 82 }).toFile(`.cache/preview/${id}.jpg`);
console.log(`.cache/preview/${id}.jpg  focus [${fx}, ${fy}] frame [${ax}, ${ay}]  original ${width}x${height}`);
