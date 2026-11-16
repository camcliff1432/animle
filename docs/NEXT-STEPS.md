# Animle: what is left before it can be published

Written 15 November 2026 for the person setting up the site. It covers where the project stands, what still has to happen, and who does each part: **you** (things that need a person, an account, money or a judgement call) or **Claude** (things that can be built and tested in this codebase once you have made the decisions it depends on).

## Where it stands

- **The game works end to end.** Three rounds, a daily puzzle, practice, past dailies, a zoo with regions, badges and retakes, stats, sharing, and a backup code. It runs entirely in the browser with no server.
- **130 species.** 24 were written first and checked more closely. 106 were added on 15 November by AI research agents and have **not** been checked by a person.
- **Tests pass.** 590 unit and content tests, and 30 full playthroughs in a real browser at desktop and two phone sizes.
- **Never tested on a real phone.** Touch painting and pinch-zoom on the map have only been tested in an emulated browser.
- **Playable test build:** https://claude.ai/artifact/EvZph8GVufKQjPa2pYXxY2
- **Not in version control.** The folder is a git repository with no commits.

To run it: install Node 20 or newer, then `npm install`, `npm run dev`. `README.md` lists every command.

## The name

The game was called WildGuess until 15 November 2026, when it was renamed Animle because other animal games already use "Wild Guess". The project folder is still called `wildguess`.

A web search found no game called exactly "Animle". Two daily animal games have similar names: Animaldle and Animla. No trademark database has been searched, and no domain has been checked or bought. Do both before launch.

## What has to happen, by area

### 1. Content review (the biggest job)

Open `docs/SPECIES-REVIEW.md`. It lists every animal with its population figure, source link, photo credit and whether its close-up has been chosen.

- **Populations.** 52 of 130 are marked "rough": no published count exists, and for many the range that scores full marks is an AI agent's own order-of-magnitude estimate. Several other figures were taken from search summaries because the source page would not load. Every figure needs a person to open the source and confirm it, or replace it.
- **Known doubtful figures:**
  - Jaguar shows 173,000 from a 2018 study; the IUCN's own figure is about 64,000.
  - Bald eagle's 316,700 covers the lower 48 US states only.
  - European bison's 7,500 includes captive animals.
  - Japanese macaque's 114,000 is from 1989.
  - Numbat's status (Near Threatened) rests on news reports of a 2026 change that was not confirmed on the Red List.
  - Red kangaroo, koala, echidna and kookaburra have widely disagreeing sources.
- **Ranges.** All 130 are hand-drawn shapes. Each was compared with wild sighting records from GBIF, which catches a range that misses real territory but cannot catch one drawn too wide. Ranges that scored low and need a human look: numbat, Atlantic puffin, European bison, beluga, whooping crane, muskox, Przewalski's horse, wild Bactrian camel, Indian peafowl, monarch butterfly. Most of these are explained by reintroduced, feral or mis-located records, but nobody has confirmed that. Proper range data (IUCN or BirdLife shapefiles) needs a licence for commercial use.
- **Photos.** Every photo has a licence that allows commercial use with credit, and credits are shown in the game. Still to do:
  - 106 animals have no chosen close-up, so the first zoomed-in view is simply the centre of the photo. Some will show background, and some will give the animal away.
  - Several photos were taken in zoos (bonobo, mandrill, Nile crocodile, giant anteater, Andean condor, spectacled bear, golden lion tamarin, beluga), and a few more look like it (giant panda, Malayan tapir, Chinese giant salamander). Decide whether that matters.
  - The wild Bactrian camel photo has a car mirror in it and may show a domestic camel. The star-nosed mole and beaver photos are low resolution.
- **Clues and facts.** Written by AI and not fact-checked by a person.
- **Sign-off.** When a species has been checked, record it in `REVIEWED` in `src/data/speciesExtra.js`. Setting `REQUIRE_REVIEW` to `true` then limits dailies to checked species.

### 2. Domain and hosting

- Buy the domain once the trademark search is clear.
- The site is static files. `npm run build` produces `dist/`, which any static host can serve (Cloudflare Pages, Netlify, Vercel, GitHub Pages).
- Set `LAUNCH_DATE` in `src/engine/daily.js` to the real launch day. Puzzle No. 1 is that date.
- The build applies a strict content security policy. If analytics, ads or a backend are added, the policy in `vite.config.js` must list their addresses or the browser will block them.
- The species list must be final before launch: adding or removing a species changes which animal appears on every date.

### 3. Backend

Nothing needs a server today. A server becomes necessary for any of: accounts, leaderboards, donation unlocks, or stopping people reading tomorrow's answer.

- **Why answers need to move.** Every answer and the whole schedule ship to the browser. Anyone can read them. That is fine for a solo game and unacceptable once there is a leaderboard.
- **What the backend has to do:**
  1. serve today's puzzle without the answer (photo, clue slots);
  2. judge guesses and score all three rounds on the server;
  3. store each player's results, streak, zoo, missed list and retakes;
  4. serve leaderboards.
- **A reasonable setup:** a static host for the site, plus a hosted database with built-in sign-in and server functions (Supabase and Firebase are the common choices; Cloudflare Workers with D1 is another). Pick whichever you already know. The game's scoring and schedule code is in `src/engine/` with no interface code in it, so it can run on a server unchanged.
- **Photos give answers away too.** File names are hashed, but the full uncropped photo is downloadable. With a server, serve only the zoom level the player has earned.

### 4. Accounts

- **Sign-in method.** Email magic link or "Sign in with Google/Apple" avoids storing passwords.
- **Moving existing players.** Progress lives in the browser today. On first sign-in the saved data should upload to the account. The backup-code format already holds everything needed.
- **Display names for leaderboards** need a profanity filter and a way to report and remove names.
- **Age.** If children under 13 (US) or under 16 (parts of Europe) can create accounts, extra legal rules apply. The simplest route is to keep the game playable without an account and require an age confirmation to create one.
- **Deleting an account** and exporting one's data must be possible under European and Californian privacy law.

### 5. Leaderboards

- Depend on server-side scoring (area 3) and accounts (area 4).
- Decide what is ranked: daily score, streak, zoo size, or all three. Decide whether there are friends-only boards.
- Rank thresholds and the 1,500-point bar for the zoo were set without real player data and should be re-tuned after the beta.

### 6. Legal

- **Privacy policy and terms.** The dialogs in `index.html` are plain-language drafts by an AI. They describe a game with no accounts, no analytics and no ads. They must be rewritten when any of those arrive, and reviewed by a lawyer or at least checked against a reputable template for your country.
- **Cookie and consent banner.** Not needed today (nothing is tracked). Needed in Europe and the UK as soon as ads or non-essential analytics are added.
- **Photo licences.** Most photos are CC BY or CC BY-SA. Credit is shown beside each photo and in the Credits dialog. CC BY-SA requires that adaptations (the cropped versions) be shared under the same licence; a line in the Credits dialog should say so. Have someone confirm the attribution wording is sufficient for a commercial site.
- **Map data** is Natural Earth, public domain. **Fonts** are open source (SIL OFL). **Sighting data** from GBIF is used only as a build-time check and is not shipped.
- **Trademark** search for the name (see above).
- **Business basics** if there will be ad income or donations: who receives the money, and tax registration.

### 7. Ads

- Needs: the domain live, a privacy policy that covers ads, a consent banner for European visitors, and approval from an ad network (Google AdSense is the usual start; it reviews the site before approving).
- An `ads.txt` file at the site root is required by ad networks.
- Decide placement so ads never sit beside the map or the guess box, where a mis-tap costs a guess.

### 8. Donation unlock

The idea: a player who missed an animal can donate to a conservation charity to add it to their zoo.

- Needs accounts and a server, so a donation can be confirmed before the animal unlocks.
- Simplest version: link to a charity's own donation page and never handle money. The hard part is confirming the donation happened; some charities and donation platforms offer a confirmation callback, most do not.
- If Animle collects the money and passes it on, that brings payment processing, receipts and charity-fundraising rules that vary by country and state.
- If the game becomes a phone app, Apple and Google have specific rules about donations that unlock in-app items.

### 9. Analytics

- A cookieless, privacy-friendly service (Plausible, Fathom, Cloudflare Web Analytics) needs no consent banner in most places.
- Worth tracking: games started and finished, the round where people quit, score distribution per round (to tune the zoo bar and rank thresholds), and streak lengths.

### 10. Testing before launch

- **Real phones.** At least one iPhone and one Android phone: paint the map with a finger, pinch to zoom, rotate the screen, use the keyboard for guesses.
- **Play tests.** Five people who have never seen it, watched without help. Note where they get stuck.
- **Closed beta.** A few dozen players for two weeks to get real scores.
- **Accessibility.** The map works from the keyboard and announces cells to screen readers, but it has not been tried with a real screen reader user.
- **Browsers.** Automated tests run in Chromium only. Check Safari and Firefox by hand.

### 11. Housekeeping

- Make the first git commit and push to a private repository.
- Set up automatic test runs on each push (the two commands are `npm test` and `npm run e2e`).
- Add error reporting so crashes in players' browsers are visible.

## Who does what

### You

In rough order:

1. **Run a trademark search** on "Animle" and check the domain is available.
2. **Buy the domain** and create the hosting account.
3. **Review the species** using `docs/SPECIES-REVIEW.md`, or find someone with wildlife knowledge to do it. Decide what to do with the 52 animals that have no real population count: keep them with a wide band, or drop them from the daily rotation.
4. **Decide on zoo photos** and whether licensed range data is worth paying for.
5. **Test on real phones** and run the five play tests.
6. **Choose the backend service** and create the accounts for it (database, sign-in provider, email sender).
7. **Get the privacy policy and terms reviewed** by someone qualified.
8. **Apply to an ad network** once the site is live, and set up who receives the income.
9. **Choose the conservation charity** for the donation unlock and ask whether they can confirm donations.
10. **Run the closed beta** and collect feedback.
11. **Set the launch date.**

### Claude

Can start now, no decisions needed:

1. Make the first git commit and set up automatic test runs.
2. Choose a close-up for each of the 106 new photos and replace the weak photos listed above.
3. Add the "same licence" line to the Credits dialog.
4. Open each population source and correct the figures where the page can be read, marking the ones that cannot be confirmed.
5. Add cross-browser test runs (Safari and Firefox engines).

Needs a decision from you first:

6. Deploy to the host and set the launch date (needs the hosting account and domain).
7. Build the backend: server-side puzzle and scoring, then accounts, then moving saved progress into accounts, then leaderboards (needs the backend choice and its accounts).
8. Rewrite the privacy policy and terms drafts to match accounts, analytics and ads, for your reviewer to check (needs to know which of those are going in).
9. Add analytics and the consent banner (needs the provider).
10. Add ad slots and `ads.txt` (needs ad network approval).
11. Build the donation unlock (needs the charity and how donations are confirmed).
12. Re-tune the zoo bar, retake bars and rank thresholds (needs beta score data).
13. Apply species corrections from your review.

## What is in this folder

| Path | What it is |
| --- | --- |
| `README.md` | Commands, how the game works, where things live, how to add a species |
| `docs/NEXT-STEPS.md` | This document |
| `docs/SPECIES-REVIEW.md` | Every species with figures, sources and photo credits, for review |
| `src/` | The game. `src/engine/` is scoring, schedule and saved data; `src/data/` is the species |
| `public/p/` | The photos, six views per species, with hashed names |
| `scripts/` | Tools: fetch photos, check ranges, validate species, build |
| `tests/`, `e2e/` | Unit tests and browser playthroughs |
