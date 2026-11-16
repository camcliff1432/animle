// Builds a copy of the game shaped for publishing as a Claude artifact:
// a page fragment (no <html>/<head>/<body>) plus its files, in dist-artifact/.
// Run: npm run build:artifact
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, readdirSync, rmSync, mkdirSync } from "node:fs";
import sharp from "sharp";

execSync("npx vite build --outDir dist-artifact --emptyOutDir", {
  stdio: "inherit",
  env: { ...process.env, WG_ARTIFACT: "1", VITE_WG_SPRITES: "1" }
});

const html = readFileSync("dist-artifact/index.html", "utf8");
const css = html.match(/<link rel="stylesheet"[^>]*href="([^"]+)"/)[1];
const js = html.match(/<script type="module"[^>]*src="([^"]+)"/)[1];
const bodyClass = html.match(/<body class="([^"]*)"/)[1];
const body = html.slice(html.indexOf(">", html.indexOf("<body")) + 1, html.lastIndexOf("</body>"))
  .replace(/<script type="module"[^>]*><\/script>/, "");

writeFileSync("dist-artifact/index.html", [
  "<title>Animle</title>",
  `<link rel="stylesheet" href="${css}" />`,
  `<div class="${bodyClass}">`,
  body.trim(),
  "</div>",
  `<script type="module" src="${js}"></script>`,
  ""
].join("\n"));

// The artifact host supplies its own icon and has no use for these.
for (const extra of ["manifest.webmanifest", "og-image.png", "favicon.svg", "icons"]) {
  rmSync(`dist-artifact/${extra}`, { recursive: true, force: true });
}

// An artifact can hold about 500 files, so each species' six views become one stacked image.
const photos = JSON.parse(readFileSync("src/data/photos.json", "utf8"));
rmSync("dist-artifact/p", { recursive: true, force: true });
mkdirSync("dist-artifact/p");
for (const record of Object.values(photos)) {
  const frames = await Promise.all(record.files.map(f => sharp(`public/p/${f}.webp`).resize(800, 600).toBuffer()));
  await sharp({ create: { width: 800, height: 600 * frames.length, channels: 3, background: "#000" } })
    .composite(frames.map((input, i) => ({ input, left: 0, top: 600 * i })))
    .webp({ quality: 72 }).toFile(`dist-artifact/p/${record.files[0]}.webp`);
}

const files = [
  ...readdirSync("dist-artifact/assets").map(f => `assets/${f}`),
  ...readdirSync("dist-artifact/p").map(f => `p/${f}`)
];
writeFileSync("dist-artifact/files.json", JSON.stringify(files.map(path => ({ path }))));
console.log(`artifact build ready: index.html + ${files.length} files`);
