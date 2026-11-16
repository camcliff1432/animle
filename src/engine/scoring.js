// Pure scoring rules for all three rounds. No DOM access, so every rule here is unit-tested.

export const MAX_GUESSES = 5;
const ROUND1_POINTS = [1000, 850, 700, 550, 400];

/**
 * How closely two animals are related, from their taxonomy.
 * Returns "genus" | "family" | "order" | "class" | "none".
 * A blank field (a general name such as "Monkey") never matches at that level.
 */
export function relatedness(a, b) {
  if (!a || !b) return "none";
  const same = (key) => Boolean(a[key]) && a[key] === b[key];
  if (!same("cls")) return "none";
  if (!same("order")) return "class";
  if (!same("family")) return "order";
  if (!same("genus")) return "family";
  return "genus";
}

/** Consolation points when round 1 is not solved, by the closest guess made. */
export const RELATED_POINTS = { genus: 350, family: 250, order: 150, class: 50, none: 0 };
const RELATED_ORDER = ["none", "class", "order", "family", "genus"];

export function closestLevel(levels) {
  return (levels || []).reduce(
    (best, level) => (RELATED_ORDER.indexOf(level) > RELATED_ORDER.indexOf(best) ? level : best), "none");
}

/**
 * Round 1. Solving scores by attempt number (1-based). Not solving still
 * earns something for getting close on the family tree.
 */
export function scoreIdentification(attemptNumber, solved, guessLevels = []) {
  if (solved) return ROUND1_POINTS[attemptNumber - 1] ?? 0;
  return RELATED_POINTS[closestLevel(guessLevels)];
}

/**
 * Round 2. Any guess inside the published range [low, high] scores full marks;
 * outside it the score falls with the order-of-magnitude distance to the range.
 */
export function scorePopulation(guess, low, high = low) {
  if (!(guess >= 1) || !(low >= 1)) return 0;
  const g = Math.log10(guess);
  const logDiff = g < Math.log10(low) ? Math.log10(low) - g : g > Math.log10(high) ? g - Math.log10(high) : 0;
  return Math.max(0, Math.min(1000, Math.round(1000 * Math.exp(-0.95 * logDiff * logDiff))));
}

export function populationLabel(score) {
  if (score >= 1000) return "Inside the published range";
  if (score >= 850) return "Just outside the range";
  if (score >= 600) return "Close magnitude";
  if (score >= 300) return "Same ballpark";
  return "Way off scale";
}

/**
 * Round 3. Both ranges are sets of map cell ids. `neighbours(id)` lists the
 * cells touching a cell. A painted cell right beside the range, or a range
 * cell right beside the painting, counts for half: coastlines and fingertips
 * are never exact.
 */
export function scoreCells(userCells, targetCells, neighbours, distance) {
  const user = new Set(userCells), target = new Set(targetCells);
  if (user.size === 0 || target.size === 0) return { score: 0, pct: 0 };

  const share = (from, onto) => {
    let hit = 0;
    for (const id of from) {
      if (onto.has(id)) hit += 1;
      else if (neighbours(id).some(n => onto.has(n))) hit += 0.5;
    }
    return hit / from.size;
  };
  const precision = share(user, target);   // how much of the painting is on the range
  const recall = share(target, user);      // how much of the range is painted
  const denom = precision + recall - precision * recall;
  const iou = denom > 0 ? (precision * recall) / denom : 0;
  let raw = (iou * 0.55 + precision * recall * 0.45) * 1250;

  // Proximity floor: painting the right part of the world still earns something.
  if (distance) {
    const gap = distance(user, target);
    if (gap < 8) raw = Math.max(raw, (1 - gap / 8) * 350);
  }
  const score = Math.max(0, Math.min(1000, Math.round(raw)));
  return { score, pct: Math.round(score / 10) };
}

export function rankFor(total) {
  if (total >= 2650) return "Master Conservationist";
  if (total >= 2100) return "Senior Wildlife Biologist";
  if (total >= 1500) return "Field Naturalist";
  if (total >= 900) return "Trail Scout";
  return "Junior Field Assistant";
}

/** Zoo badge for a species, from the player's best total on it. */
export function badgeFor(best) {
  if (best >= 2400) return "gold";
  if (best >= 1700) return "silver";
  return "bronze";
}
