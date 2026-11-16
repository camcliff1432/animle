// Guess normalisation and judging for round 1. Pure functions, unit-tested.

export function normalizeName(str) {
  return (str || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/^the\s+/, "")
    .replace(/[^a-z0-9]/g, "");
}

/** Every normalised string that counts as the right answer for a species. */
export function answerKeys(animal) {
  const names = [
    animal.name,
    animal.scientificName,
    (animal.wikiTitle || "").replace(/_/g, " ").replace(/\s*\(.*\)$/, ""),
    ...(animal.aliases || [])
  ];
  return new Set(names.map(normalizeName).filter(Boolean));
}

/**
 * Judge one guess.
 *  - "empty"     nothing typed
 *  - "unknown"   not a recognised animal (typo or non-animal): costs nothing
 *  - "repeat"    already guessed: costs nothing
 *  - "group"     right family, too vague ("pangolin"): costs nothing, ask for more
 *  - "correct" / "wrong"  a real guess that uses an attempt
 */
export function judgeGuess(raw, animal, previousGuesses, isKnownAnimal) {
  const key = normalizeName(raw);
  if (!key) return "empty";
  if (answerKeys(animal).has(key)) return "correct";
  if ((animal.groups || []).map(normalizeName).includes(key)) return "group";
  if ((previousGuesses || []).some(g => normalizeName(g) === key)) return "repeat";
  if (!isKnownAnimal(key)) return "unknown";
  return "wrong";
}

export function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, ch => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]
  ));
}
