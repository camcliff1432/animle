import { describe, it, expect } from "vitest";
import {
  dateString, dayNumber, dateFromDayNumber, previousDate, puzzleNumber, scheduledId, upcomingIds,
  activeStreak, completeDaily, msUntilNextPuzzle, formatCountdown, LAUNCH_DATE
} from "../src/engine/daily.js";
import { SCHEDULE, SCHEDULE_START } from "../src/data/schedule.js";
import { ALL_SPECIES, WILDLIFE_DB } from "../src/data/species.js";
import {
  migrate, emptyData, dailyHistory, SCHEMA_VERSION, addToZoo, exportCode, importCode, dailyAverages,
  recordZooResult, retakeStatus, ZOO_MIN_SCORE, RETAKE_STREAK, RETAKE_STEP, RETAKE_MAX_SCORE, retakeBar, zooBar, beginRetake
} from "../src/engine/storage.js";
import { pastDailies } from "../src/engine/daily.js";

describe("dates", () => {
  it("formats a local date", () => {
    expect(dateString(new Date(2026, 0, 5, 23, 59))).toBe("2026-01-05");
  });
  it("round-trips day numbers, including across month, year and leap day", () => {
    for (const d of ["2026-11-14", "2026-12-31", "2027-01-01", "2028-02-29", "2028-03-01"]) {
      expect(dateFromDayNumber(dayNumber(d))).toBe(d);
    }
    expect(previousDate("2027-01-01")).toBe("2026-12-31");
    expect(previousDate("2028-03-01")).toBe("2028-02-29");
  });
  it("steps one day at a time across clock changes", () => {
    // US and EU clock-change dates in 2027.
    expect(dayNumber("2027-03-15") - dayNumber("2027-03-14")).toBe(1);
    expect(dayNumber("2027-03-29") - dayNumber("2027-03-28")).toBe(1);
    expect(dayNumber("2027-11-08") - dayNumber("2027-11-07")).toBe(1);
  });
  it("numbers puzzles from launch day", () => {
    expect(puzzleNumber(LAUNCH_DATE)).toBe(1);
    expect(puzzleNumber("2026-11-20", "2026-11-14")).toBe(7);
  });
});

describe("daily schedule", () => {
  const list = ["a", "b", "c", "d"];
  it("reads the animal for a date straight from the fixed list", () => {
    expect(scheduledId("2026-11-16", list, "2026-11-16")).toBe("a");
    expect(scheduledId("2026-11-18", list, "2026-11-16")).toBe("c");
  });
  it("starts the list again when it runs out, and copes with dates before launch", () => {
    expect(scheduledId("2026-11-20", list, "2026-11-16")).toBe("a");
    expect(scheduledId("2026-11-15", list, "2026-11-16")).toBe("d");
  });
  it("lists the species due in the coming days", () => {
    expect([...upcomingIds("2026-11-16", list, 2, "2026-11-16")]).toEqual(["b", "c"]);
  });
  it("does not move when species are added to the end of the list", () => {
    const longer = [...list, "e", "f"];
    for (const date of ["2026-11-16", "2026-11-17", "2026-11-18", "2026-11-19"]) {
      expect(scheduledId(date, longer, "2026-11-16")).toBe(scheduledId(date, list, "2026-11-16"));
    }
  });
});

describe("the published schedule", () => {
  const ids = new Set(ALL_SPECIES.map(a => a.id));
  it("starts on launch day and names only real species", () => {
    expect(SCHEDULE_START).toBe(LAUNCH_DATE);
    for (const id of SCHEDULE) expect(ids.has(id), id).toBe(true);
  });
  it("never shows the same animal twice within two weeks", () => {
    for (let i = 0; i < SCHEDULE.length; i++) {
      for (let gap = 1; gap <= 14; gap++) {
        expect(SCHEDULE[i] === SCHEDULE[(i + gap) % SCHEDULE.length] ? `${SCHEDULE[i]} on days ${i + 1} and ${i + 1 + gap}` : "").toBe("");
      }
    }
  });
  it("gives every species a day", () => {
    const scheduled = new Set(SCHEDULE);
    for (const a of WILDLIFE_DB) expect(scheduled.has(a.id), a.id).toBe(true);
  });
  it("keeps the days already played exactly as they were published", () => {
    // Add each day's animal here once it has gone live. This test is what stops a later
    // rebuild of the schedule from changing history.
    const PUBLISHED = ["secretarybird"];
    expect(SCHEDULE.slice(0, PUBLISHED.length)).toEqual(PUBLISHED);
  });
});

describe("streaks", () => {
  const base = { streak: 0, bestStreak: 0, lastCompletedDate: null };
  it("starts at one and grows on consecutive days", () => {
    let d = completeDaily(base, "2026-11-14");
    expect(d.streak).toBe(1);
    d = completeDaily(d, "2026-11-15");
    d = completeDaily(d, "2026-11-16");
    expect(d.streak).toBe(3);
    expect(d.bestStreak).toBe(3);
  });
  it("does not double count the same day", () => {
    const d = completeDaily(completeDaily(base, "2026-11-14"), "2026-11-14");
    expect(d.streak).toBe(1);
  });
  it("resets after a missed day but keeps the best", () => {
    let d = completeDaily(completeDaily(base, "2026-11-14"), "2026-11-15");
    d = completeDaily(d, "2026-11-18");
    expect(d.streak).toBe(1);
    expect(d.bestStreak).toBe(2);
  });
  it("continues across a month end and a year end", () => {
    let d = completeDaily(base, "2026-12-31");
    d = completeDaily(d, "2027-01-01");
    expect(d.streak).toBe(2);
  });
  it("shows the streak as alive today and tomorrow, then gone", () => {
    const d = completeDaily(base, "2026-11-14");
    expect(activeStreak(d, "2026-11-14")).toBe(1);
    expect(activeStreak(d, "2026-11-15")).toBe(1);
    expect(activeStreak(d, "2026-11-16")).toBe(0);
  });
});

describe("countdown", () => {
  it("counts to local midnight", () => {
    expect(msUntilNextPuzzle(new Date(2026, 10, 14, 23, 0, 0))).toBe(3600000);
    expect(formatCountdown(3661000)).toBe("01:01:01");
    expect(formatCountdown(-5)).toBe("00:00:00");
  });
});

describe("saved data", () => {
  it("starts empty for missing or corrupt data", () => {
    expect(migrate(null)).toEqual(emptyData());
    expect(migrate("garbage")).toEqual(emptyData());
  });
  it("keeps streaks and history from the first version of the game", () => {
    const v1 = {
      streak: 4, bestStreak: 9, lastCompletedDate: "2026-11-13",
      dailyProgress: { "2026-11-13": { animalId: "okapi", stage: 4 } },
      scoreHistory: [
        { id: "daily-2026-11-13", date: "2026-11-13", mode: "daily", animalName: "Okapi", r1: 1000, r2: 500, r3: 300, total: 1800 },
        { id: "practice-1731500000000", date: "2026-11-13", animalName: "Fossa", r1: 0, r2: 100, r3: 100, total: 200 }
      ]
    };
    const data = migrate(v1);
    expect(data.schemaVersion).toBe(SCHEMA_VERSION);
    expect(data.streak).toBe(4);
    expect(data.bestStreak).toBe(9);
    expect(data.dailyProgress["2026-11-13"].animalId).toBe("okapi");
    expect(data.scoreHistory[1].mode).toBe("practice");
  });
  it("keeps practice games out of the stats", () => {
    const data = migrate({ scoreHistory: [
      { id: "daily-2026-11-13", mode: "daily", total: 1800 },
      { id: "practice-1", mode: "practice", total: 200 }
    ] });
    expect(dailyHistory(data)).toHaveLength(1);
    expect(dailyHistory(data)[0].total).toBe(1800);
  });
});

describe("past dailies", () => {
  it("lists every day from yesterday back to launch, newest first", () => {
    const list = pastDailies("2026-11-17", "2026-11-14");
    expect(list).toEqual([
      { date: "2026-11-16", number: 3 }, { date: "2026-11-15", number: 2 }, { date: "2026-11-14", number: 1 }
    ]);
    expect(pastDailies("2026-11-14", "2026-11-14")).toEqual([]);
    expect(pastDailies("2026-11-01", "2026-11-14")).toEqual([]);
  });
});

describe("earning animals and retakes", () => {
  const day = "2026-11-20";

  it("adds an animal only when a daily or a retake reaches the bar", () => {
    let data = recordZooResult(emptyData(), "okapi", ZOO_MIN_SCORE - 1, day, "daily");
    expect(data.zoo.okapi).toBeUndefined();
    expect(data.missed.okapi).toEqual({ best: ZOO_MIN_SCORE - 1, plays: 1, last: day });

    data = recordZooResult(data, "okapi", 2900, day, "practice");
    data = recordZooResult(data, "okapi", 2900, day, "archive");
    expect(data.zoo.okapi).toBeUndefined();
    expect(data.missed.okapi.best).toBe(2900);

    // First retake: the bar is 250 higher than a daily's.
    data = beginRetake(data, "okapi", day);
    expect(zooBar(data, "okapi", "retake")).toBe(ZOO_MIN_SCORE + RETAKE_STEP);
    data = recordZooResult(data, "okapi", ZOO_MIN_SCORE + RETAKE_STEP - 1, day, "retake");
    expect(data.zoo.okapi).toBeUndefined();
    // Second retake: 250 higher again, and reaching it adds the animal.
    data = beginRetake(data, "okapi", "2026-11-21");
    expect(data.retake).toEqual({ date: "2026-11-21", animalId: "okapi" });
    expect(zooBar(data, "okapi", "retake")).toBe(ZOO_MIN_SCORE + 2 * RETAKE_STEP);
    expect(zooBar(data, "okapi", "daily")).toBe(ZOO_MIN_SCORE);
    expect(zooBar(data, "kakapo", "retake")).toBe(ZOO_MIN_SCORE + RETAKE_STEP); // counted per animal
    data = recordZooResult(data, "okapi", ZOO_MIN_SCORE + 2 * RETAKE_STEP, day, "retake");
    expect(data.zoo.okapi).toEqual({ best: ZOO_MIN_SCORE + 2 * RETAKE_STEP, plays: 1, first: day });
    expect(data.missed.okapi).toBeUndefined();
    expect(retakeBar(1)).toBe(1750);
    expect(retakeBar(50)).toBe(RETAKE_MAX_SCORE);

    expect(recordZooResult(emptyData(), "kakapo", ZOO_MIN_SCORE, day, "daily").zoo.kakapo.best).toBe(ZOO_MIN_SCORE);
  });

  it("lets any game raise the badge of an animal already in the zoo", () => {
    let data = recordZooResult(emptyData(), "okapi", 1600, day, "daily");
    data = recordZooResult(data, "okapi", 2500, day, "practice");
    data = recordZooResult(data, "okapi", 300, day, "archive");
    expect(data.zoo.okapi).toEqual({ best: 2500, plays: 3, first: day });
    expect(data.missed.okapi).toBeUndefined();
  });

  it("offers one retake a day from the streak threshold", () => {
    const data = emptyData();
    expect(retakeStatus(data, day, RETAKE_STREAK - 1)).toBe("locked");
    expect(retakeStatus(data, day, RETAKE_STREAK)).toBe("ready");
    expect(retakeStatus({ ...data, retake: { date: day, animalId: "okapi" } }, day, 9)).toBe("used");
    expect(retakeStatus({ ...data, retake: { date: "2026-11-19", animalId: "okapi" } }, day, 9)).toBe("ready");
  });

  it("keeps the missed list and the retake day through a migration", () => {
    const saved = { ...emptyData(), missed: { okapi: { best: 900, plays: 1, last: day } }, retake: { date: day, animalId: "okapi" } };
    const back = migrate(JSON.parse(JSON.stringify(saved)));
    expect(back.missed).toEqual(saved.missed);
    expect(back.retake).toEqual(saved.retake);
    expect(migrate({ streak: 2 }).missed).toEqual({});
  });
});

describe("the zoo", () => {
  it("keeps the best score, the first date and a play count", () => {
    let zoo = addToZoo({}, "okapi", 1500, "2026-11-14");
    zoo = addToZoo(zoo, "okapi", 1200, "2026-11-20");
    zoo = addToZoo(zoo, "okapi", 2100, "2026-11-21");
    expect(zoo.okapi).toEqual({ best: 2100, plays: 3, first: "2026-11-14" });
  });

  it("is rebuilt from old saved games that had no zoo", () => {
    const data = migrate({ scoreHistory: [
      { id: "daily-2026-11-14", date: "2026-11-14", animalName: "Kākāpō", total: 1800 },
      { id: "practice-1", date: "2026-11-14", animalName: "Red Panda", total: 900 },
      { id: "practice-2", date: "2026-11-15", animalId: "red-panda", animalName: "Red Panda", total: 2500 }
    ] });
    expect(data.zoo.kakapo.best).toBe(1800);
    expect(data.zoo["red-panda"]).toEqual({ best: 2500, plays: 2, first: "2026-11-14" });
  });
});

describe("backup codes", () => {
  const saved = {
    ...emptyData(), streak: 4, bestStreak: 9, lastCompletedDate: "2026-11-15",
    scoreHistory: [{ id: "daily-2026-11-15", date: "2026-11-15", mode: "daily", animalId: "okapi", animalName: "Okapi", r1: 850, r2: 1000, r3: 640, total: 2490 }],
    zoo: { okapi: { best: 2490, plays: 1, first: "2026-11-15" } },
    dailyProgress: { "2026-11-15": { stage: 4, animalId: "okapi" }, "2026-11-16": { stage: 2, animalId: "fossa" } }
  };

  it("round-trips streaks, history and the zoo, including accented names", () => {
    const withAccent = { ...saved, scoreHistory: [...saved.scoreHistory, { id: "practice-1", mode: "practice", animalName: "Kākāpō", total: 100 }] };
    const back = importCode(exportCode(withAccent));
    expect(back.streak).toBe(4);
    expect(back.bestStreak).toBe(9);
    expect(back.zoo).toEqual(saved.zoo);
    expect(back.scoreHistory[1].animalName).toBe("Kākāpō");
  });

  it("leaves a game in progress behind", () => {
    const back = importCode(exportCode(saved));
    expect(Object.keys(back.dailyProgress)).toEqual(["2026-11-15"]);
  });

  it("rejects anything that is not a backup code", () => {
    for (const junk of ["", "hello", "AN1.not-base64!!", "WG3.not-base64!!", "AN1." + btoa("[1,2]"), null]) expect(importCode(junk)).toBeNull();
    // New codes carry the new name; codes from before the rename still restore.
    const code = exportCode(emptyData());
    expect(code.startsWith("AN1.")).toBe(true);
    expect(importCode("WG3." + code.slice(4))).toEqual(importCode(code));
  });
});

describe("per-round averages", () => {
  it("averages daily games only", () => {
    const data = { ...emptyData(), scoreHistory: [
      { mode: "daily", r1: 1000, r2: 500, r3: 300, total: 1800 },
      { mode: "daily", r1: 400, r2: 900, r3: 500, total: 1800 },
      { mode: "practice", r1: 0, r2: 0, r3: 0, total: 0 },
      { mode: "archive", r1: 0, r2: 0, r3: 0, total: 0 }
    ] };
    expect(dailyAverages(data)).toEqual({ total: 1800, r1: 700, r2: 700, r3: 400, games: 2 });
    expect(dailyAverages(emptyData())).toBeNull();
  });
});
