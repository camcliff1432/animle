import { describe, it, expect } from "vitest";
import { normalizeName, judgeGuess, escapeHtml } from "../src/engine/matching.js";
import { speciesById, WILDLIFE_DB } from "../src/data/species.js";
import { GUESSABLE } from "../src/data/taxonomy.js";

const known = new Set([
  ...GUESSABLE.map(g => g.name),
  ...WILDLIFE_DB.flatMap(a => [a.name, a.scientificName, ...a.aliases, ...a.groups])
].map(normalizeName));
const isKnown = (key) => known.has(key);
const judge = (raw, id, previous = []) => judgeGuess(raw, speciesById(id), previous, isKnown);

describe("normalising names", () => {
  it("ignores case, accents, spacing, punctuation and a leading 'the'", () => {
    expect(normalizeName("  Kākāpō ")).toBe("kakapo");
    expect(normalizeName("Aye aye")).toBe(normalizeName("Aye-aye"));
    expect(normalizeName("The Snow Leopard")).toBe("snowleopard");
    expect(normalizeName("Pallas's Cat")).toBe("pallasscat");
  });
});

describe("judging a guess", () => {
  it("accepts the common name, scientific name and aliases", () => {
    expect(judge("snow leopard", "snow-leopard")).toBe("correct");
    expect(judge("Panthera uncia", "snow-leopard")).toBe("correct");
    expect(judge("Saiga", "saiga-antelope")).toBe("correct");
    expect(judge("komodo", "komodo-dragon")).toBe("correct");
    expect(judge("Kakapo", "kakapo")).toBe("correct");
    expect(judge("fossa", "fossa")).toBe("correct");
    expect(judge("secretary bird", "secretarybird")).toBe("correct");
    expect(judge("Duck-billed Platypus", "platypus")).toBe("correct");
  });

  it("asks for more detail on a vague group, at no cost", () => {
    expect(judge("Pangolin", "pangolin")).toBe("group");
    expect(judge("lynx", "iberian-lynx")).toBe("group");
    expect(judge("eagle", "harpy-eagle")).toBe("group");
  });

  it("does not charge for empty, unknown or repeated guesses", () => {
    expect(judge("   ", "okapi")).toBe("empty");
    expect(judge("asdfgh", "okapi")).toBe("unknown");
    expect(judge("Toyota Corolla", "okapi")).toBe("unknown");
    expect(judge("Giraffe", "okapi", ["giraffe"])).toBe("repeat");
    expect(judge("GIRAFFE ", "okapi", ["Giraffe"])).toBe("repeat");
  });

  it("counts a real but wrong animal as a wrong guess", () => {
    expect(judge("Giraffe", "okapi")).toBe("wrong");
    expect(judge("Leopard", "snow-leopard")).toBe("wrong");
    // A group word only helps for the species it belongs to.
    expect(judge("lynx", "okapi")).toBe("wrong");
  });

  it("can be solved for every species by its displayed name", () => {
    for (const a of WILDLIFE_DB) expect(judgeGuess(a.name, a, [], isKnown), a.id).toBe("correct");
  });
});

describe("escaping", () => {
  it("neutralises HTML in text", () => {
    expect(escapeHtml(`<img src=x onerror="alert(1)">`)).toBe("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
  });
});
