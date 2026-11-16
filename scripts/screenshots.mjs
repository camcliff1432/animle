// Plays through a game and saves screenshots of each screen for a visual check.
// Run `npm run build && npm run preview` first, then: node scripts/screenshots.mjs
// Output: .cache/shots/<size>-<screen>.png
import { chromium, devices } from "playwright";
import { mkdir } from "node:fs/promises";
import { WILDLIFE_DB } from "../src/data/species.js";
import { dateString, scheduledId } from "../src/engine/daily.js";
import { SCHEDULE } from "../src/data/schedule.js";

const URL = process.env.WG_URL || "http://localhost:4183/";
const animal = WILDLIFE_DB.find(a => a.id === scheduledId(dateString(), SCHEDULE));
await mkdir(".cache/shots", { recursive: true });
const browser = await chromium.launch();

for (const [size, options] of [["phone", { ...devices["Pixel 7"], deviceScaleFactor: 1 }], ["desktop", { viewport: { width: 1280, height: 900 } }]]) {
  const page = await (await browser.newContext(options)).newPage();
  const shot = (name, full = false) => page.screenshot({ path: `.cache/shots/${size}-${name}.png`, fullPage: full });
  const guess = async (text) => {
    await page.locator("#animal-guess-input").fill(text);
    await page.locator("#animal-guess-input").press("Escape");
    await page.getByRole("button", { name: "Submit Guess" }).click();
  };
  await page.goto(URL);
  await shot("0-howto");
  await page.keyboard.press("Escape");
  await shot("1-round1-start", true);
  for (const wrong of ["Giraffe", "Bald Eagle", "Tiger"]) await guess(wrong);
  await page.waitForTimeout(3600);
  await shot("1-round1-guesses", true);
  await guess(animal.name);
  await page.waitForTimeout(3600);
  await shot("1-round1-solved", true);
  await page.getByRole("button", { name: "Next: Estimate Population" }).click();
  await page.getByRole("button", { name: "~1,000", exact: true }).click();
  await shot("2-round2", true);
  await page.getByRole("button", { name: "Lock In Population Estimate" }).click();
  await shot("2-round2-result", true);
  await page.getByRole("button", { name: "Next: Map Native Habitat Range" }).click();
  await page.waitForTimeout(600);
  await shot("3-map-world", true);
  await page.getByRole("button", { name: "Asia", exact: true }).click();
  await page.waitForTimeout(700);
  const box = await page.locator("#habitat-map-container").boundingBox();
  await page.mouse.move(box.x + box.width * 0.35, box.y + box.height * 0.45);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.55, box.y + box.height * 0.5, { steps: 10 });
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.62, { steps: 10 });
  await page.mouse.up();
  await shot("3-map-painted", true);
  await page.getByRole("button", { name: "Submit Range" }).click();
  await page.waitForTimeout(1200);
  await shot("3-map-result", true);
  await page.getByRole("button", { name: "View Final Field Report" }).click();
  await page.waitForTimeout(500);
  await shot("4-summary", true);
  await page.getByRole("button", { name: "Open my zoo" }).click();
  await shot("5-zoo");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Open the menu" }).click();
  await shot("6-menu");
  await page.getByRole("dialog", { name: "Menu" }).getByRole("button", { name: /Past dailies/ }).click();
  await shot("7-archive");
  await page.context().close();
}
await browser.close();
console.log("saved to .cache/shots/");
