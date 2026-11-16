// Serves dist-artifact/ and checks the stacked-photo mode in a real browser.
// Run after `npm run build:artifact`: node scripts/check-artifact.mjs
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { chromium } from "playwright";

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json" };
const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  try {
    const body = await readFile(join("dist-artifact", path === "/" ? "index.html" : path));
    res.writeHead(200, { "Content-Type": TYPES[extname(path)] || "text/html" });
    res.end(path === "/" ? "<!doctype html><meta charset=utf-8><body>" + body : body);
  } catch { res.writeHead(404); res.end(); }
}).listen(4199);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1100, height: 900 } });
const errors = [];
page.on("pageerror", e => errors.push(String(e)));
page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
await page.goto("http://localhost:4199/");
await page.keyboard.press("Escape");
const img = page.locator("#animal-image");
await img.evaluate(el => el.complete || new Promise(r => el.addEventListener("load", r)));
const read = () => img.evaluate(el => ({ pos: getComputedStyle(el).objectPosition, w: el.naturalWidth, h: el.naturalHeight, box: [el.clientWidth, el.clientHeight] }));
const first = await read();
await page.locator("button[data-action=skip-guess]").click();
await page.waitForTimeout(700);
const second = await read();
await page.screenshot({ path: ".cache/artifact-check.png" });
console.log(JSON.stringify({ first, second, errors }));
await browser.close();
server.close();
const ok = first.h === first.w * 0.75 * 6 && first.pos !== second.pos && errors.length === 0;
console.log(ok ? "artifact photos ok" : "PROBLEM");
process.exit(ok ? 0 : 1);
