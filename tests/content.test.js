// Content validation: fails the test run if any species is incomplete or inconsistent.
import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { WILDLIFE_DB, ZOO_REGIONS } from "../src/data/species.js";
import { GUESSABLE } from "../src/data/taxonomy.js";
import { normalizeName, answerKeys } from "../src/engine/matching.js";

const photos = JSON.parse(readFileSync("src/data/photos.json", "utf8"));
const ALLOWED_LICENCE = /^(cc0|public domain|cc by( |-)\d|cc by-sa( |-)\d)/i;

describe("species content", () => {
  it("has unique ids", () => {
    expect(new Set(WILDLIFE_DB.map(a => a.id)).size).toBe(WILDLIFE_DB.length);
  });

  for (const a of WILDLIFE_DB) {
    describe(a.id, () => {
      it("has every text field", () => {
        for (const field of ["name", "scientificName", "classPlain", "classFull", "diet", "biome", "status", "statusColor", "regionsText", "fact", "size", "lastClue"]) {
          expect(a[field], field).toBeTruthy();
        }
        expect(["Mammal", "Bird", "Reptile", "Amphibian", "Fish", "Invertebrate"]).toContain(a.classPlain);
        expect(ZOO_REGIONS, "zoo region").toContain(a.region);
      });

      it("has a sourced population", () => {
        const p = a.population;
        expect(p.value).toBeGreaterThanOrEqual(1);
        expect(p.display).toBeTruthy();
        expect(p.year).toBeGreaterThan(1980);
        expect(["counted", "estimated", "rough"]).toContain(p.confidence);
        expect(p.source.label).toBeTruthy();
        expect(p.source.url).toMatch(/^https:\/\//);
        // The headline figure sits inside the range that scores full marks.
        expect(p.low).toBeGreaterThanOrEqual(1);
        expect(p.low).toBeLessThanOrEqual(p.value);
        expect(p.high).toBeGreaterThanOrEqual(p.value);
      });

      it("has valid range shapes", () => {
        expect(a.ranges.length).toBeGreaterThan(0);
        for (const ring of a.ranges) {
          expect(ring.length).toBeGreaterThanOrEqual(3);
          for (const [lat, lng] of ring) {
            expect(Math.abs(lat)).toBeLessThanOrEqual(90);
            expect(Math.abs(lng)).toBeLessThanOrEqual(180);
          }
        }
      });

      it("has a properly licensed photo at every zoom level", () => {
        const photo = photos[a.id];
        expect(photo, "photo record").toBeTruthy();
        expect(photo.license).toMatch(ALLOWED_LICENCE);
        expect(photo.artist).toBeTruthy();
        expect(photo.sourceUrl).toMatch(/^https:\/\/commons\.wikimedia\.org\//);
        expect(photo.files).toHaveLength(6);
        for (const file of photo.files) {
          expect(existsSync(`public/p/${file}.webp`), file).toBe(true);
          // File names must not give the answer away.
          expect(file).toMatch(/^[0-9a-f]{12}$/);
        }
      });
    });
  }

  it("has no answer that also counts as another species' answer", () => {
    const owner = new Map();
    for (const a of WILDLIFE_DB) {
      for (const key of answerKeys(a)) {
        expect(owner.has(key) ? `${key}: ${owner.get(key)} and ${a.id}` : "").toBe("");
        owner.set(key, a.id);
      }
    }
  });

  it("places every species in the family tree", () => {
    for (const a of WILDLIFE_DB) {
      for (const level of ["cls", "order", "family", "genus"]) expect(a.taxon[level], a.id + " " + level).toBeTruthy();
      expect(a.scientificName.startsWith(a.taxon.genus), a.id + " genus matches its scientific name").toBe(true);
      expect(a.classFull.startsWith(a.taxon.cls), a.id + " class").toBe(true);
    }
  });

  it("does not name the animal in its own clues", () => {
    for (const a of WILDLIFE_DB) {
      const clues = [a.diet, a.biome, a.size, a.lastClue].join(" ").toLowerCase();
      expect(clues.includes(a.name.toLowerCase()), a.id).toBe(false);
    }
  });

  it("has a clean guess list: no duplicates, no answers, every entry classified", () => {
    const keys = GUESSABLE.map(g => normalizeName(g.name));
    expect(GUESSABLE.length).toBeGreaterThan(600);
    expect(new Set(keys).size).toBe(keys.length);
    const answers = new Set(WILDLIFE_DB.flatMap(a => [...answerKeys(a)]));
    for (const g of GUESSABLE) {
      expect(answers.has(normalizeName(g.name)), g.name + " is also an answer").toBe(false);
      expect(g.taxon.cls, g.name).toBeTruthy();
      expect(g.name).toMatch(/^[A-ZÀ-ſ]/);
    }
  });

  it("gives most species a close relative to guess", () => {
    // A wrong guess can be any other animal the game knows: the guess list or another answer species.
    const others = (a) => [...GUESSABLE.map(g => g.taxon), ...WILDLIFE_DB.filter(b => b.id !== a.id).map(b => b.taxon)];
    const share = (level) => WILDLIFE_DB.filter(a => others(a).some(t => t[level] && t[level] === a.taxon[level])).length / WILDLIFE_DB.length;
    expect(share("family")).toBeGreaterThanOrEqual(0.7);
    // A few animals are the only living member of their order (aardvark, tuatara, hoatzin).
    expect(share("order")).toBeGreaterThanOrEqual(0.9);
    for (const a of WILDLIFE_DB) expect(others(a).some(t => t.cls === a.taxon.cls), a.id).toBe(true);
  });
});
