import { describe, it, expect } from "vitest";
import {
  MAX_GUESSES, scoreIdentification, scorePopulation, populationLabel, scoreCells, rankFor,
  relatedness, closestLevel, RELATED_POINTS, badgeFor
} from "../src/engine/scoring.js";
import {
  cells, neighbours, cellAt, cellAtLatLng, cellsForPolygons, cellDistance, step, describePosition, MAP_W, MAP_H
} from "../src/engine/grid.js";
import { speciesById, ALL_SPECIES as WILDLIFE_DB } from "../src/data/species.js";
import { GUESSABLE } from "../src/data/taxonomy.js";

// A guess can be on the guess list or be another answer species.
const taxonOf = (name) => (GUESSABLE.find(g => g.name === name) || WILDLIFE_DB.find(a => a.name === name)).taxon;
const score = (user, target) => scoreCells(user, target, neighbours, cellDistance).score;
const rangeOf = (id) => cellsForPolygons(speciesById(id).ranges);

describe("round 1 scoring", () => {
  it("gives five guesses and pays less for each one used", () => {
    expect(MAX_GUESSES).toBe(5);
    const points = [1, 2, 3, 4, 5].map(n => scoreIdentification(n, true));
    expect(points).toEqual([1000, 850, 700, 550, 400]);
  });

  it("pays for the closest relative when the animal is never named", () => {
    expect(scoreIdentification(5, false, ["none", "class", "family", "order", "none"])).toBe(RELATED_POINTS.family);
    expect(scoreIdentification(5, false, ["genus"])).toBe(350);
    expect(scoreIdentification(5, false, ["none", "none"])).toBe(0);
    expect(scoreIdentification(5, false, [])).toBe(0);
  });

  it("always pays more for solving than for coming close", () => {
    expect(scoreIdentification(5, true)).toBeGreaterThan(RELATED_POINTS.genus);
  });

  it("ranks closeness genus > family > order > class > none", () => {
    expect(closestLevel(["class", "order"])).toBe("order");
    expect(closestLevel(["genus", "family"])).toBe("genus");
    expect(closestLevel([])).toBe("none");
    const p = RELATED_POINTS;
    expect(p.genus > p.family && p.family > p.order && p.order > p.class && p.class > p.none).toBe(true);
  });
});

describe("how closely two animals are related", () => {
  const snowLeopard = speciesById("snow-leopard").taxon;

  it("finds the deepest shared level", () => {
    expect(relatedness(taxonOf("Tiger"), snowLeopard)).toBe("genus");
    expect(relatedness(taxonOf("Cheetah"), snowLeopard)).toBe("family");
    expect(relatedness(taxonOf("Gray Wolf"), snowLeopard)).toBe("order");
    expect(relatedness(taxonOf("Giraffe"), snowLeopard)).toBe("class");
    expect(relatedness(taxonOf("Bald Eagle"), snowLeopard)).toBe("none");
  });

  it("places relatives of other answers correctly", () => {
    expect(relatedness(taxonOf("Giraffe"), speciesById("okapi").taxon)).toBe("family");
    expect(relatedness(taxonOf("Tiger Salamander"), speciesById("axolotl").taxon)).toBe("genus");
    expect(relatedness(taxonOf("Kea"), speciesById("kakapo").taxon)).toBe("family");
    expect(relatedness(taxonOf("Beluga Whale"), speciesById("narwhal").taxon)).toBe("family");
    expect(relatedness(taxonOf("Harbor Porpoise"), speciesById("vaquita").taxon)).toBe("genus");
    expect(relatedness(taxonOf("Nile Monitor"), speciesById("komodo-dragon").taxon)).toBe("genus");
    expect(relatedness(taxonOf("Bald Eagle"), speciesById("secretarybird").taxon)).toBe("order");
  });

  it("never matches on a blank level, so general names stay vague", () => {
    expect(relatedness(taxonOf("Monkey"), speciesById("aye-aye").taxon)).toBe("order");
    expect(relatedness(taxonOf("Shark"), taxonOf("Shark"))).toBe("class");
    expect(relatedness(undefined, snowLeopard)).toBe("none");
  });
});

describe("round 2 scoring", () => {
  it("gives full marks anywhere inside the published range", () => {
    for (const guess of [4000, 5000, 6500]) expect(scorePopulation(guess, 4000, 6500)).toBe(1000);
  });

  it("falls away with distance from the range, equally above and below", () => {
    const low = scorePopulation(400, 4000, 6500), high = scorePopulation(65000, 4000, 6500);
    expect(low).toBe(high);
    expect(low).toBeGreaterThan(300);
    expect(low).toBeLessThan(500);
    expect(scorePopulation(3500, 4000, 6500)).toBeGreaterThan(950);
    expect(scorePopulation(40, 4000, 6500)).toBeLessThan(scorePopulation(400, 4000, 6500));
  });

  it("scores zero for guesses that are not numbers of animals", () => {
    for (const bad of [0, -5, NaN, null, undefined]) expect(scorePopulation(bad, 4000, 6500)).toBe(0);
  });

  it("works for very small and very large populations", () => {
    expect(scorePopulation(10, 6, 13)).toBe(1000);
    expect(scorePopulation(2000000, 1500000, 2900000)).toBe(1000);
    expect(scorePopulation(1, 6, 13)).toBeGreaterThan(500);
  });

  it("gives every species full marks at its own headline figure", () => {
    for (const a of WILDLIFE_DB) {
      const p = a.population;
      expect(scorePopulation(p.value, p.low, p.high), a.id).toBe(1000);
    }
  });

  it("labels the result", () => {
    expect(populationLabel(1000)).toBe("Inside the published range");
    expect(populationLabel(100)).toBe("Way off scale");
  });
});

describe("the map grid", () => {
  it("covers the world with a few thousand cells", () => {
    expect(cells.length).toBeGreaterThan(2000);
    expect(cells.length).toBeLessThan(3500);
    for (const c of cells) {
      expect(c.x).toBeGreaterThanOrEqual(0);
      expect(c.x).toBeLessThanOrEqual(MAP_W);
      expect(c.y).toBeGreaterThanOrEqual(0);
      expect(c.y).toBeLessThanOrEqual(MAP_H);
      expect(Math.abs(c.lat)).toBeLessThanOrEqual(90);
    }
  });

  it("finds the cell under its own centre, and under a place", () => {
    for (const c of cells.filter((_, i) => i % 97 === 0)) expect(cellAt(c.x, c.y)).toBe(c.id);
    const nairobi = cells[cellAtLatLng(-1.3, 36.8)];
    expect(Math.abs(nairobi.lat - -1.3)).toBeLessThan(4);
    expect(Math.abs(nairobi.lng - 36.8)).toBeLessThan(4);
  });

  it("gives interior cells six neighbours, symmetrically", () => {
    const mid = cellAtLatLng(10, 20);
    expect(neighbours(mid)).toHaveLength(6);
    for (const n of neighbours(mid)) expect(neighbours(n)).toContain(mid);
  });

  it("lets the keyboard walk in all four directions and back", () => {
    const start = cellAtLatLng(0, 0);
    expect(step(step(start, "left"), "right")).toBe(start);
    expect(cells[step(start, "up")].lat).toBeGreaterThan(cells[start].lat);
    expect(cells[step(start, "down")].lat).toBeLessThan(cells[start].lat);
    expect(cells[step(start, "right")].lng).toBeGreaterThan(cells[start].lng);
    expect(describePosition(start)).toMatch(/^\d+°[NS] \d+°[EW]$/);
  });

  it("gives every species a range of at least one cell, near where it lives", () => {
    for (const a of WILDLIFE_DB) {
      const range = cellsForPolygons(a.ranges);
      expect(range.length, a.id).toBeGreaterThan(0);
      const [lat, lng] = a.ranges[0][0];
      const near = range.some(id => Math.hypot(cells[id].lat - lat, cells[id].lng - lng) < 12);
      expect(near, a.id).toBe(true);
    }
  });
});

describe("round 3 scoring", () => {
  it("gives a perfect painting a perfect score, for every species", () => {
    for (const a of WILDLIFE_DB) {
      const range = cellsForPolygons(a.ranges);
      expect(score(range, range), a.id).toBe(1000);
    }
  });

  it("scores nothing painted as zero", () => {
    expect(scoreCells([], rangeOf("okapi"), neighbours, cellDistance)).toEqual({ score: 0, pct: 0 });
  });

  it("scores the wrong side of the world as zero", () => {
    const australia = [cellAtLatLng(-25, 135)];
    expect(score(australia, rangeOf("snow-leopard"))).toBe(0);
  });

  it("rewards half a large range, but less than all of it", () => {
    const range = rangeOf("capybara");
    const half = score(range.slice(0, Math.floor(range.length / 2)), range);
    expect(half).toBeGreaterThan(400);
    expect(half).toBeLessThan(900);
  });

  it("punishes painting far too much", () => {
    const range = rangeOf("iberian-lynx");
    let blob = new Set(range);
    for (let ring = 0; ring < 4; ring++) for (const id of [...blob]) for (const n of neighbours(id)) blob.add(n);
    expect(score([...blob], range)).toBeLessThan(450);
  });

  it("is kind to a near miss on a one-cell range", () => {
    const range = rangeOf("vaquita");
    expect(range).toHaveLength(1);
    const nextDoor = neighbours(range[0])[0];
    const near = score([nextDoor], range);
    expect(near).toBeGreaterThan(250);
    expect(near).toBeLessThan(700);
    expect(score([range[0], nextDoor], range)).toBeGreaterThan(near);
  });

  it("gives some credit for the right region even with no overlap", () => {
    const range = rangeOf("tasmanian-devil");
    const twoAway = neighbours(neighbours(range[0])[0]).find(id => id !== range[0] && !neighbours(range[0]).includes(id));
    const result = score([twoAway], range);
    expect(result).toBeGreaterThan(100);
    expect(result).toBeLessThan(400);
  });

  it("never returns a score outside 0 to 1000", () => {
    const range = rangeOf("dugong");
    for (const user of [[0], range.slice(0, 3), cells.map(c => c.id)]) {
      const s = score(user, range);
      expect(s).toBeGreaterThanOrEqual(0);
      expect(s).toBeLessThanOrEqual(1000);
    }
  });
});

describe("ranks and badges", () => {
  it("names a rank for any total", () => {
    expect(rankFor(3000)).toBe("Master Conservationist");
    expect(rankFor(0)).toBe("Junior Field Assistant");
  });

  it("awards zoo badges by best score", () => {
    expect(badgeFor(0)).toBe("bronze");
    expect(badgeFor(1700)).toBe("silver");
    expect(badgeFor(2400)).toBe("gold");
  });
});
