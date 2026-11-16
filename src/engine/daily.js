// Dates, the daily schedule and streaks. Pure functions, unit-tested.
// A "date string" is always the player's local calendar date as YYYY-MM-DD.

/** Puzzle #1 is this date. Set it to the real launch day before going live. */
export const LAUNCH_DATE = "2026-11-16";

/** Animals due as a daily within this many days stay hidden from practice and the archive. */
export const UPCOMING_LOCK_DAYS = 10;

const pad = (n) => String(n).padStart(2, "0");

export function dateString(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Whole days since 1970 for a calendar date. Uses UTC maths, so clock changes cannot skew it. */
export function dayNumber(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
}

export function dateFromDayNumber(n) {
  const d = new Date(n * 86400000);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

export const previousDate = (dateStr) => dateFromDayNumber(dayNumber(dateStr) - 1);

export function puzzleNumber(dateStr, launch = LAUNCH_DATE) {
  return dayNumber(dateStr) - dayNumber(launch) + 1;
}

/**
 * The species id for a date. The schedule is a fixed list of ids (src/data/schedule.js), one per day
 * from launch day, so adding or editing species never changes which animal a date shows.
 * Dates past the end of the list start it again from the top.
 */
export function scheduledId(dateStr, schedule, launch = LAUNCH_DATE) {
  const i = dayNumber(dateStr) - dayNumber(launch);
  const n = schedule.length;
  return schedule[((i % n) + n) % n];
}

/** Ids of the species scheduled for the next `days` days after dateStr. */
export function upcomingIds(dateStr, schedule, days = UPCOMING_LOCK_DAYS, launch = LAUNCH_DATE) {
  const out = new Set();
  for (let i = 1; i <= days; i++) out.add(scheduledId(dateFromDayNumber(dayNumber(dateStr) + i), schedule, launch));
  return out;
}

/** The streak as it stands today: it survives until a whole day is missed. */
export function activeStreak(data, today) {
  if (!data.lastCompletedDate || !data.streak) return 0;
  if (data.lastCompletedDate === today || data.lastCompletedDate === previousDate(today)) return data.streak;
  return 0;
}

/** Returns the streak fields after completing the daily for `today`. Safe to call twice. */
export function completeDaily(data, today) {
  if (data.lastCompletedDate === today) return data;
  const streak = data.lastCompletedDate === previousDate(today) ? (data.streak || 0) + 1 : 1;
  return { ...data, streak, bestStreak: Math.max(data.bestStreak || 0, streak), lastCompletedDate: today };
}

/** Milliseconds until the player's next local midnight. */
export function msUntilNextPuzzle(now = new Date()) {
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return next.getTime() - now.getTime();
}

export function formatCountdown(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return `${pad(Math.floor(total / 3600))}:${pad(Math.floor((total % 3600) / 60))}:${pad(total % 60)}`;
}

/** Past dailies, newest first: [{ date, number }] from yesterday back to launch day. */
export function pastDailies(today, launch = LAUNCH_DATE) {
  const out = [];
  for (let day = dayNumber(today) - 1; day >= dayNumber(launch); day--) {
    const date = dateFromDayNumber(day);
    out.push({ date, number: puzzleNumber(date, launch) });
  }
  return out;
}
