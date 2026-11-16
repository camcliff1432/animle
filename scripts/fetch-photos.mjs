// Downloads each species' lead photo from Wikimedia Commons, checks its licence,
// and writes pre-cropped zoom levels with neutral file names to public/p/.
// Run: npm run photos
import { createHash } from "node:crypto";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import sharp from "sharp";

const UA = "wildlife-game-build/0.2 (photo fetch script)";
// Every species in the game, as [id, Wikipedia article title]. Pass ids on the command line to fetch only those.
const { WILDLIFE_DB } = await import("../src/data/species.js");
const wanted = process.argv.slice(2);
const SPECIES = WILDLIFE_DB.filter(a => !wanted.length || wanted.includes(a.id)).map(a => [a.id, a.wikiTitle]);
// Zoom factors: one per guess in round 1 (five), then the full photo.
const LEVELS = [3, 2.2, 1.6, 1.25, 1.06, 1];
// focus: where the close-up centres, as [x, y] fractions of the 4:3 frame. Chosen by eye per photo so the
// first view shows a telling detail (fur, scales, an eye) without giving the whole animal away.
const FOCUS = JSON.parse(await readFile(new URL("./photo-focus.json", import.meta.url), "utf8"));
// Use a specific Commons file when the article's lead image is too small or unsuitable.
const OVERRIDES = {
  "kakapo": "File:Kakapo Sirocco 1.jpg",
  // The article leads with a size diagram, not a photo.
  "vaquita": "File:Vaquita6 Olson NOAA.jpg",
  // These articles lead with a GFDL-only photo, which the game cannot use.
  "monarch-butterfly": "File:Monarch butterfly male (52341).jpg",
  "red-kangaroo": "File:Red Kangaroos at Sturt National Park NSW.jpg",
  "short-beaked-echidna": "File:Short-beaked echidna (Tachyglossus aculeatus) Freycinet.jpg",
  "superb-lyrebird": "File:Superb Lyrebird (Menura novaehollandiae) (30571971863).jpg",
  // These articles lead with a range map and a painting.
  "olm": "File:P anguinus1.jpg",
  "sugar-glider": "File:Petaurus breviceps (sugar glider).jpg"
};
const ALLOWED = /^(cc0|public domain|pd\b|cc by( |-)\d|cc by-sa( |-)\d)/i;

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const get = async (url, tries = 5) => {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.ok) return res;
    if (res.status !== 429 && res.status < 500) throw new Error(`${res.status} ${url}`);
    await sleep((Number(res.headers.get("retry-after")) || 5 * (i + 1)) * 1000);
  }
  throw new Error(`gave up: ${url}`);
};
const api = async (base, params) =>
  (await get(`${base}?${new URLSearchParams({ format: "json", origin: "*", ...params })}`)).json();
const strip = (html) => (html || "").replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/\(Original text[\s\S]*$/, "").replace(/\s+/g, " ").trim();
const nameFor = (id, level) => createHash("sha1").update(`wg:${id}:${level}`).digest("hex").slice(0, 12);

await mkdir("public/p", { recursive: true });
await mkdir(".cache/photos", { recursive: true });

// 1. One request for every lead image name.
// The APIs take at most 50 titles per request.
const chunks = (list, n = 40) => Array.from({ length: Math.ceil(list.length / n) }, (_, i) => list.slice(i * n, i * n + n));
const rename = new Map();
const pageByTitle = new Map();
for (const group of chunks(SPECIES.map(s => s[1].replace(/_/g, " ")))) {
  const wp = (await api("https://en.wikipedia.org/w/api.php", {
    action: "query", titles: group.join("|"), redirects: "1", prop: "pageimages", piprop: "name", pilimit: "50"
  })).query;
  for (const n of [...(wp.normalized || []), ...(wp.redirects || [])]) rename.set(n.from, n.to);
  for (const p of Object.values(wp.pages)) pageByTitle.set(p.title, p);
}
const resolve = (t) => { let x = t.replace(/_/g, " "); for (let i = 0; i < 4 && rename.has(x); i++) x = rename.get(x); return x; };

// 2. One request for every file's licence data.
const idOf = new Map(SPECIES.map(([id, t]) => [t, id]));
const fileOf = (title) => {
  // A "file" in photo-focus.json (a photo chosen during review) wins over the list above.
  const chosen = FOCUS[idOf.get(title)]?.file || OVERRIDES[idOf.get(title)];
  if (chosen) return chosen;
  const page = pageByTitle.get(resolve(title));
  return page && page.pageimage ? `File:${page.pageimage}`.replace(/_/g, " ") : null;
};
const cmRename = new Map();
const infoByFile = new Map();
for (const group of chunks(SPECIES.map(s => fileOf(s[1])).filter(Boolean))) {
  const cm = (await api("https://commons.wikimedia.org/w/api.php", {
    action: "query", titles: group.join("|"), prop: "imageinfo", iiprop: "url|extmetadata", iiurlwidth: "1600"
  })).query;
  for (const n of cm.normalized || []) cmRename.set(n.from, n.to);
  for (const p of Object.values(cm.pages)) infoByFile.set(p.title, p.imageinfo?.[0]);
}

// 3. Download and crop, slowly.
const out = existsSync("src/data/photos.json") ? JSON.parse(await readFile("src/data/photos.json", "utf8")) : {};
for (const [id, title] of SPECIES) {
  try {
    const f = fileOf(title);
    if (!f) throw new Error("the article has no lead image; add a Commons file to OVERRIDES");
    const info = infoByFile.get(cmRename.get(f) || f);
    const meta = info.extmetadata || {};
    const license = strip(meta.LicenseShortName?.value);
    const record = {
      artist: strip(meta.Artist?.value) || "Unknown author",
      license,
      licenseUrl: meta.LicenseUrl?.value || "",
      sourceUrl: info.descriptionurl,
      allowed: ALLOWED.test(license),
      files: []
    };
    // Originals are cached, so changing a focus point does not download anything again.
    const cached = `.cache/photos/${id}.img`;
    let buf;
    if (existsSync(cached)) buf = await readFile(cached);
    else {
      buf = Buffer.from(await (await get(info.thumburl || info.url)).arrayBuffer());
      await writeFile(cached, buf);
      await sleep(1500);
    }
    const { width, height } = await sharp(buf).rotate().metadata();
    // 4:3 "cover" frame centred on the image, as the game displays it.
    let fw = width, fh = Math.round(width * 3 / 4);
    if (fh > height) { fh = height; fw = Math.round(height * 4 / 3); }
    for (const z of LEVELS) {
      const cw = Math.round(fw / z), ch = Math.round(fh / z);
      const [fx, fy] = FOCUS[id]?.focus || [0.5, 0.5];
      // "frame" slides the 4:3 window over a tall or wide original (0 = top/left, 1 = bottom/right).
      const [ax, ay] = FOCUS[id]?.frame || [0.5, 0.5];
      const frameLeft = (width - fw) * ax, frameTop = (height - fh) * ay;
      const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
      const left = Math.round(clamp(frameLeft + fx * fw - cw / 2, frameLeft, frameLeft + fw - cw));
      const top = Math.round(clamp(frameTop + fy * fh - ch / 2, frameTop, frameTop + fh - ch));
      const name = nameFor(id, z);
      await sharp(buf).rotate().extract({ left, top, width: cw, height: ch })
        .resize(960, 720, { fit: "cover" }).webp({ quality: 76 }).toFile(`public/p/${name}.webp`);
      record.files.push(name);
    }
    out[id] = record;
    console.log(`${record.allowed ? "ok " : "!! "} ${id} | ${license} | ${record.artist.slice(0, 50)} | ${width}x${height}`);
  } catch (err) {
    console.log(`FAIL ${id}: ${err.message}`);
  }
}
await writeFile("src/data/photos.json", JSON.stringify(out, null, 2));
