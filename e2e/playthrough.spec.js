import { test, expect } from "@playwright/test";
import { WILDLIFE_DB } from "../src/data/species.js";
import { dateString, scheduledId, previousDate, LAUNCH_DATE } from "../src/engine/daily.js";
import { SCHEDULE } from "../src/data/schedule.js";
import { relatedness } from "../src/engine/scoring.js";
import { GUESSABLE } from "../src/data/taxonomy.js";

const animalOn = (date) => WILDLIFE_DB.find(a => a.id === scheduledId(date, SCHEDULE));
const todaysAnimal = () => animalOn(dateString());
// A real animal that is never the answer, used as a deliberate wrong guess.
const WRONG = "Giraffe";
const wrongLevel = (animal) => relatedness(GUESSABLE.find(g => g.name === WRONG).taxon, animal.taxon);

async function noSidewaysScroll(page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow, "page should not scroll sideways").toBeLessThanOrEqual(0);
}

async function guess(page, text) {
  const input = page.locator("#animal-guess-input");
  await input.fill(text);
  await input.press("Escape"); // close the suggestion list, which sits over the button
  await page.getByRole("button", { name: "Submit Guess" }).click();
}

/** Paint a short stroke across the middle of the map. */
async function paintStroke(page) {
  const map = page.locator("#habitat-map-container");
  await map.scrollIntoViewIfNeeded();
  const box = await map.boundingBox();
  const y = box.y + box.height * 0.5;
  await page.mouse.move(box.x + box.width * 0.45, y);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.52, y, { steps: 6 });
  await page.mouse.move(box.x + box.width * 0.6, y + 6, { steps: 6 });
  await page.mouse.up();
}

const openMenuItem = async (page, name) => {
  await page.getByRole("button", { name: "Open the menu" }).click();
  await page.getByRole("dialog", { name: "Menu" }).getByRole("button", { name }).click();
};

test("a full daily game, then practice, keeps stats and progress straight", async ({ page }) => {
  const errors = [];
  page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
  page.on("pageerror", (err) => errors.push(String(err)));

  const animal = todaysAnimal();
  await page.goto("/");

  // First visit explains the game; Escape closes it.
  const howTo = page.getByRole("dialog", { name: "How to play" });
  await expect(howTo).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(howTo).toBeHidden();
  await noSidewaysScroll(page);

  // ---- Round 1 ----
  const attempts = page.locator("#attempts-dots");
  await expect(attempts).toHaveAttribute("aria-label", "5 attempts left");
  await expect(page.locator("#animal-image")).toHaveJSProperty("complete", true);
  expect(await page.locator("#animal-image").getAttribute("src")).not.toContain(animal.id);

  // Nonsense, an empty box and a repeat cost nothing.
  await guess(page, "qwertyzx");
  await expect(attempts).toHaveAttribute("aria-label", "5 attempts left");
  await guess(page, "");
  await expect(attempts).toHaveAttribute("aria-label", "5 attempts left");

  // A real wrong guess costs one attempt, unlocks the diet clue and says how close it was.
  await expect(page.locator("#clue-diet")).toContainText("Locked");
  await guess(page, WRONG);
  await expect(attempts).toHaveAttribute("aria-label", "4 attempts left");
  await expect(page.locator("#clue-diet")).toHaveText(animal.diet);
  await expect(page.locator("#clue-size")).toContainText("Locked");
  const expected = { genus: "Same genus", family: "Same family", order: "Same order", class: "Same class only", none: "Different class" }[wrongLevel(animal)];
  await expect(page.locator("#previous-guesses-list")).toContainText(expected);
  await guess(page, WRONG);
  await expect(attempts).toHaveAttribute("aria-label", "4 attempts left");

  // The suggestion list works from the keyboard.
  const input = page.locator("#animal-guess-input");
  await input.fill(animal.name.slice(0, 4));
  await expect(page.getByRole("listbox")).toBeVisible();
  await input.fill(animal.name);
  await input.press("Enter");
  await expect(page.locator("#round1-title")).toHaveText(animal.name);
  await expect(page.locator("#round1-points")).toHaveText("+850");
  await noSidewaysScroll(page);
  await page.getByRole("button", { name: "Next: Estimate Population" }).click();

  // ---- Round 2 ----
  const lockIn = page.getByRole("button", { name: "Lock In Population Estimate" });
  await expect(page.locator("#pop-number-input")).toHaveValue("");
  await expect(lockIn).toBeDisabled();
  await page.getByRole("button", { name: "~1,000", exact: true }).click();
  await expect(page.locator("#pop-number-input")).toHaveValue("1000");
  await expect(page.locator("#pop-category-hint")).toHaveText("About 1 thousand animals");
  await expect(lockIn).toBeEnabled();
  // Lock in the published figure, so the game clears the bar for the zoo.
  await page.locator("#pop-number-input").fill(String(animal.population.value));
  await lockIn.click();
  await expect(page.locator("#r2-actual-val")).toHaveText(animal.population.display);
  await expect(page.locator("#r2-pop-source a")).toHaveAttribute("href", animal.population.source.url);
  await noSidewaysScroll(page);
  await page.getByRole("button", { name: "Next: Map Native Habitat Range" }).click();

  // ---- Round 3 ----
  const submitRange = page.getByRole("button", { name: "Submit Range" });
  await expect(page.locator("#habitat-svg #cell-mesh")).toBeAttached();
  await submitRange.click();
  await expect(page.locator("#round3-result")).toBeHidden(); // nothing painted yet
  await paintStroke(page);
  await expect(page.locator("#map-count")).not.toHaveText("0 cells");
  // Undo removes the stroke; painting again brings cells back.
  await page.getByRole("button", { name: "Undo" }).click();
  await expect(page.locator("#map-count")).toHaveText("0 cells");
  await paintStroke(page);
  await page.getByRole("button", { name: "Africa" }).click();
  await noSidewaysScroll(page);
  await submitRange.click();
  await expect(page.locator("#round3-result")).toBeVisible();
  await expect(page.locator("#r3-points")).toHaveText(/^\+\d+$/);
  await page.getByRole("button", { name: "View Final Field Report" }).click();

  // ---- Summary ----
  await expect(page.locator("#summary-animal-title")).toHaveText(animal.name);
  await expect(page.locator("#next-puzzle-countdown")).toHaveText(/^\d\d:\d\d:\d\d$/);
  await expect(page.locator("#streak-count")).toHaveText("1");
  await expect(page.locator("#stat-total-played")).toHaveText("1");
  await expect(page.locator("#stat-avg-r1")).toHaveText("850");
  await expect(page.locator("#summary-zoo-title")).toContainText("joined your zoo");
  await expect(page.locator("#zoo-pill-count")).toHaveText("1");
  const dailyAverage = await page.locator("#stat-avg-score").textContent();
  await noSidewaysScroll(page);

  // Reloading returns to the finished report, without the tutorial.
  await page.reload();
  await expect(page.locator("#summary-animal-title")).toHaveText(animal.name);
  await expect(howTo).toBeHidden();

  // ---- Zoo: the animal is there, and can be practised ----
  await page.getByRole("button", { name: "Open my zoo" }).click();
  const zoo = page.getByRole("dialog", { name: "My zoo" });
  await expect(zoo).toBeVisible();
  await expect(zoo.locator("#zoo-count")).toHaveText(`1 of ${WILDLIFE_DB.length} animals met`);
  await expect(zoo.getByText("Not met yet").first()).toBeVisible();
  await expect(zoo.getByText(animal.name, { exact: true })).toBeVisible();
  // It sits in its own region's section, and that section's count shows it.
  const home = zoo.getByRole("region", { name: animal.region, exact: true });
  await expect(home.getByText(animal.name, { exact: true })).toBeVisible();
  await expect(home.getByText(/^(1 of \d+ met|All 1 met)$/)).toBeVisible();
  await noSidewaysScroll(page);
  await page.keyboard.press("Escape");

  // ---- Practice ----
  await openMenuItem(page, /Practice/);
  await expect(page.locator("#mode-badge")).toHaveText("Practice");
  const skip = page.locator("button[data-action=skip-guess]");
  for (let i = 0; i < 5; i++) await skip.click();
  await expect(page.locator("#round1-points")).toHaveText("+0");
  await page.getByRole("button", { name: "Next: Estimate Population" }).click();
  await page.getByRole("button", { name: "~100", exact: true }).click();
  await lockIn.click();
  await page.getByRole("button", { name: "Next: Map Native Habitat Range" }).click();
  await expect(page.locator("#habitat-svg #cell-mesh")).toBeAttached();
  await paintStroke(page);
  await submitRange.click();
  await page.getByRole("button", { name: "View Final Field Report" }).click();

  // Practice leaves the daily stats untouched and never adds an animal to the zoo.
  await expect(page.locator("#summary-edition-tag")).toHaveText("Practice Field Report");
  await expect(page.locator("#stat-total-played")).toHaveText("1");
  await expect(page.locator("#stat-avg-score")).toHaveText(dailyAverage);
  await expect(page.locator("#summary-zoo-title")).toContainText("Practice and past dailies do not add animals");
  await expect(page.locator("#zoo-pill-count")).toHaveText("1");

  // Back to the daily: still finished, same animal.
  await page.getByRole("button", { name: "Back to today's daily" }).click();
  await expect(page.locator("#summary-animal-title")).toHaveText(animal.name);

  expect(errors, "no console errors or CSP violations").toEqual([]);
});

test("a game in progress resumes mid-round after a reload", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Escape");
  await guess(page, WRONG);
  await expect(page.locator("#attempts-dots")).toHaveAttribute("aria-label", "4 attempts left");
  await page.reload();
  await expect(page.locator("#attempts-dots")).toHaveAttribute("aria-label", "4 attempts left");
  await expect(page.locator("#previous-guesses-list")).toContainText(WRONG);
});

test("missing the animal still earns points for a close relative", async ({ page }) => {
  const animal = todaysAnimal();
  const levels = { genus: 4, family: 3, order: 2, class: 1, none: 0 };
  // The five closest wrong guesses on the list.
  const closest = GUESSABLE
    .map(g => ({ name: g.name, level: relatedness(g.taxon, animal.taxon) }))
    .filter(g => !animal.groups.some(group => group.toLowerCase() === g.name.toLowerCase()))
    .sort((a, b) => levels[b.level] - levels[a.level])
    .slice(0, 5);
  const points = { genus: 350, family: 250, order: 150, class: 50, none: 0 }[closest[0].level];

  await page.goto("/");
  await page.keyboard.press("Escape");
  for (const g of closest) await guess(page, g.name);
  await expect(page.locator("#round1-badge")).toHaveText("Animal revealed");
  await expect(page.locator("#round1-points")).toHaveText(`+${points}`);
  await expect(page.locator("#round1-note")).toContainText(points > 0 ? `${points} points for getting near` : "no points");
});

/** Play rounds 2 and 3 with the published population and a short stroke, through to the report. */
async function finishFromRound2(page, population) {
  await page.getByRole("button", { name: "Next: Estimate Population" }).click();
  await page.locator("#pop-number-input").fill(String(population));
  await page.getByRole("button", { name: "Lock In Population Estimate" }).click();
  await page.getByRole("button", { name: "Next: Map Native Habitat Range" }).click();
  await expect(page.locator("#habitat-svg #cell-mesh")).toBeAttached();
  await paintStroke(page);
  await page.getByRole("button", { name: "Submit Range" }).click();
  await page.getByRole("button", { name: "View Final Field Report" }).click();
}

test("a low-scoring daily does not earn the animal, and retakes stay locked below the streak", async ({ page }) => {
  const animal = todaysAnimal();
  await page.goto("/");
  await page.keyboard.press("Escape");
  const skip = page.locator("button[data-action=skip-guess]");
  for (let i = 0; i < 5; i++) await skip.click();
  // A population a thousand times out scores nothing, so the total cannot reach the bar.
  await finishFromRound2(page, animal.population.value > 100000 ? 10 : 1000000000);

  await expect(page.locator("#summary-zoo-title")).toContainText(`${animal.name} got away`);
  await expect(page.locator("#summary-zoo-sub")).toContainText("Reach a 3-day streak");
  await expect(page.locator("#summary-badge")).toBeHidden(); // no badge for an animal that got away
  await expect(page.locator("#zoo-pill-count")).toHaveText("0");
  await expect(page.locator("#streak-count")).toHaveText("1"); // the streak still counts

  await page.getByRole("button", { name: "Open my zoo" }).click();
  const zoo = page.getByRole("dialog", { name: "My zoo" });
  await expect(zoo.locator("#zoo-retake")).toContainText("Retakes unlock at a 3-day streak (yours is 1)");
  const home = zoo.getByRole("region", { name: animal.region, exact: true });
  await expect(home.getByText(/^Not earned · best [\d,]+$/)).toBeVisible();
  await expect(home.getByRole("button", { name: `Retake ${animal.name}` })).toBeDisabled();
  await noSidewaysScroll(page);
});

test("from a 3-day streak, one missed animal a day can be retaken and earned", async ({ page }) => {
  const today = dateString();
  const yesterday = previousDate(today);
  const [first, second] = WILDLIFE_DB.filter(a => a.id !== todaysAnimal().id);
  const saved = {
    schemaVersion: 4, streak: 3, bestStreak: 3, lastCompletedDate: yesterday, seenHowTo: true,
    dailyProgress: {}, archiveResults: {}, scoreHistory: [], zoo: {}, retake: null,
    missed: { [first.id]: { best: 600, plays: 1, last: yesterday }, [second.id]: { best: 900, plays: 2, last: yesterday } }
  };
  await page.addInitScript((data) => {
    if (!localStorage.getItem("animle_state")) localStorage.setItem("animle_state", JSON.stringify(data));
  }, saved);

  await page.goto("/");
  await page.getByRole("button", { name: "Open my zoo" }).click();
  const zoo = page.getByRole("dialog", { name: "My zoo" });
  await expect(zoo.locator("#zoo-retake")).toContainText("You have a retake today");
  await zoo.getByRole("button", { name: `Retake ${first.name}` }).click();
  await expect(page.locator("#mode-badge")).toHaveText("Retake");
  await expect(page.locator("#header-date-label")).toContainText("1,750 points"); // a first retake needs 250 more than a daily

  await guess(page, first.name);
  await expect(page.locator("#round1-points")).toHaveText("+1000");
  await finishFromRound2(page, first.population.value);
  await expect(page.locator("#summary-edition-tag")).toHaveText("Retake Field Report");
  await expect(page.locator("#summary-zoo-title")).toContainText(`${first.name} joined your zoo`);
  await expect(page.locator("#zoo-pill-count")).toHaveText("1");
  await expect(page.locator("#stat-total-played")).toHaveText("0"); // a retake is not a daily

  // The other missed animal has to wait: today's retake is spent, even after a reload.
  await page.reload();
  await page.getByRole("button", { name: "Open my zoo" }).click();
  await expect(zoo.locator("#zoo-retake")).toContainText("Today's retake is used");
  await expect(zoo.getByRole("button", { name: `Retake ${second.name}, needs 1,750 points` })).toBeDisabled();
  await expect(zoo.getByText(first.name, { exact: true })).toBeVisible();
});

test("the map can be painted from the keyboard", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Escape");
  await guess(page, todaysAnimal().name);
  await page.getByRole("button", { name: "Next: Estimate Population" }).click();
  await page.getByRole("button", { name: "~1,000", exact: true }).click();
  await page.getByRole("button", { name: "Lock In Population Estimate" }).click();
  await page.getByRole("button", { name: "Next: Map Native Habitat Range" }).click();
  await expect(page.locator("#habitat-svg #cell-mesh")).toBeAttached();

  const map = page.locator("#habitat-map-container");
  await map.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#map-live")).toHaveText(/\d+°[NS] \d+°[EW], not painted$/);
  await page.keyboard.press("Space");
  await expect(page.locator("#map-live")).toHaveText(/, painted$/);
  await expect(page.locator("#map-count")).toHaveText("1 cell");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.locator("#map-count")).toHaveText("2 cells");
  await page.keyboard.press("Space");
  await expect(page.locator("#map-count")).toHaveText("1 cell");
  await page.getByRole("button", { name: "Submit Range" }).click();
  await expect(page.locator("#round3-result")).toBeVisible();
});

test("a past daily can be played from the archive without touching the streak", async ({ page }) => {
  const yesterday = previousDate(dateString());
  test.skip(yesterday < LAUNCH_DATE, "no past dailies exist on launch day");
  const animal = animalOn(yesterday);

  await page.goto("/");
  await page.keyboard.press("Escape");
  await openMenuItem(page, /Past dailies/);
  const archive = page.getByRole("dialog", { name: "Past dailies" });
  await expect(archive.getByText("not played").first()).toBeVisible();
  await archive.getByRole("button", { name: /^Play daily number/ }).first().click();
  await expect(page.locator("#mode-badge")).toHaveText("Archive");

  await guess(page, animal.name);
  await expect(page.locator("#round1-points")).toHaveText("+1000");
  await page.getByRole("button", { name: "Next: Estimate Population" }).click();
  await page.locator("#pop-number-input").fill(String(animal.population.value));
  await page.getByRole("button", { name: "Lock In Population Estimate" }).click();
  await expect(page.locator("#r2-points")).toHaveText("+1000");
  await page.getByRole("button", { name: "Next: Map Native Habitat Range" }).click();
  await expect(page.locator("#habitat-svg #cell-mesh")).toBeAttached();
  await paintStroke(page);
  await page.getByRole("button", { name: "Submit Range" }).click();
  await page.getByRole("button", { name: "View Final Field Report" }).click();

  await expect(page.locator("#summary-edition-tag")).toContainText("Archive Field Report");
  await expect(page.locator("#streak-count")).toHaveText("0");
  await expect(page.locator("#stat-total-played")).toHaveText("0");
  await openMenuItem(page, /Past dailies/);
  await expect(archive.getByText(/best: [\d,]+/).first()).toBeVisible();
});

test("restoring a backup code replaces progress only after confirming", async ({ page }) => {
  const saved = {
    schemaVersion: 3, streak: 6, bestStreak: 6, lastCompletedDate: previousDate(dateString()),
    dailyProgress: {}, archiveResults: {}, seenHowTo: true,
    scoreHistory: [{ id: "practice-1", date: "2026-11-14", mode: "practice", animalId: "okapi", animalName: "Okapi", r1: 850, r2: 1000, r3: 640, total: 2490 }],
    zoo: { okapi: { best: 2490, plays: 1, first: "2026-11-14" } }
  };
  // A code made before the game was renamed, which must still restore.
  const code = "WG3." + Buffer.from(JSON.stringify(saved), "utf8").toString("base64");

  await page.goto("/");
  await page.keyboard.press("Escape");
  await expect(page.locator("#streak-count")).toHaveText("0");
  await page.getByRole("button", { name: "Open my zoo" }).click();
  const zoo = page.getByRole("dialog", { name: "My zoo" });

  await zoo.locator("#restore-input").fill("not a code");
  await zoo.getByRole("button", { name: "Restore", exact: true }).click();
  await expect(zoo.locator("#restore-confirm")).toBeHidden();

  await zoo.locator("#restore-input").fill(code);
  await zoo.getByRole("button", { name: "Restore", exact: true }).click();
  await expect(zoo.locator("#restore-confirm")).toBeVisible();
  await expect(page.locator("#streak-count")).toHaveText("0"); // nothing changes until confirmed
  await zoo.getByRole("button", { name: "Replace my progress" }).click();
  await expect(page.locator("#streak-count")).toHaveText("6");
  await expect(page.locator("#zoo-pill-count")).toHaveText("1");
});

test("credits, privacy and terms open from the footer", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Escape");
  for (const [button, title] of [["Credits", "Credits and licences"], ["Privacy", "Privacy"], ["Terms", "Terms of use"]]) {
    await page.getByRole("button", { name: button, exact: true }).click();
    await expect(page.getByRole("dialog", { name: title })).toBeVisible();
    await noSidewaysScroll(page);
    await page.keyboard.press("Escape");
  }
});

test("the game still works when the browser blocks storage", async ({ page }) => {
  await page.addInitScript(() => {
    const blocked = () => { throw new DOMException("blocked", "SecurityError"); };
    Storage.prototype.setItem = blocked;
    Storage.prototype.getItem = blocked;
  });
  await page.goto("/");
  await expect(page.getByText("progress and streaks will not be saved")).toBeVisible();
  await page.keyboard.press("Escape");
  await guess(page, WRONG);
  await expect(page.locator("#attempts-dots")).toHaveAttribute("aria-label", "4 attempts left");
});

test("the leaderboard, friends and sign-in screens are marked as coming soon", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Escape");

  await openMenuItem(page, /Leaderboard/);
  const board = page.getByRole("dialog", { name: "Leaderboard" });
  await expect(board.getByText("Coming soon")).toBeVisible();
  await expect(board.getByText("You (this device)")).toBeVisible();
  await expect(board.getByText("Finish today's puzzle")).toBeVisible();
  // The tabs switch what would be ranked, and show the player's own number.
  await board.getByRole("button", { name: "Streaks" }).click();
  await expect(board.getByText("0 days")).toBeVisible();
  await board.getByRole("button", { name: "Zoos" }).click();
  await expect(board.getByText("0 animals")).toBeVisible();
  await board.getByRole("button", { name: "Friends" }).click();
  await expect(board.locator("#lb-explain")).toContainText("Only people you follow");
  await noSidewaysScroll(page);
  await page.keyboard.press("Escape");

  await openMenuItem(page, /Friends/);
  await expect(board.getByRole("button", { name: "Friends" })).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Escape");

  await openMenuItem(page, /Sign in/);
  const account = page.getByRole("dialog", { name: "Sign in" });
  await expect(account.getByText("Coming soon")).toBeVisible();
  await noSidewaysScroll(page);
  await account.getByRole("button", { name: "Get a backup code" }).click();
  await expect(page.getByRole("dialog", { name: "My zoo" })).toBeVisible();
});
