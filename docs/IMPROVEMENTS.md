# Improvements to make

A running list collected from play. The Status column says what has been built.

| # | Complaint (in your words) | Improvement | Where | Notes | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | "Remove the bar over the picture because it takes up too much of the picture." | Remove the label that sits on top of the photo | Round 1 | Read as: the zoom label in the photo's top-left corner ("Close-up", "Medium view" and so on). The zoom level would need to be shown somewhere off the photo, or dropped. Interpretation, to confirm. | Done 2026-11-16: label removed from the photo; the photo credit line below it is unchanged. |
| 2 | "Scrolling up and down to see how many lives you have left is annoying." | Show guesses left without scrolling | Round 1 | The "Attempts left" dots are at the top of the card. On a phone the guess box is below the photo and clues, so the dots scroll out of view. They should be visible beside the guess box. | Done 2026-11-16: "Guesses left" dots now sit on the same line as the "Your guess" label; the dots at the top of the card stay too. Mockup: docs/mockup-guesses-left.html. |
| 3 | "Need to hone in on what kinds of hints are useful. General sense of if you've never heard of the animal at all, there's no possible way to get any part of it." | Hints should help someone who has never heard of the animal | Round 1 | Today a player who doesn't know the animal can't make progress: the clues describe it (diet, biome, size, a near-giveaway sentence) but none of them lets you narrow down a list of 750 names, and each wrong guess only says how closely related it was. Needs work on which hints are actually useful. Ideas to test, not decisions: (a) show the continent or region early, since it cuts the list a lot and matches round 3; (b) tell the player whether a wrong guess lives on the same continent; (c) a final guess that offers a short list of choices; (d) clues phrased as things you can reason from (what it eats, how it moves, what it looks like) rather than facts you have to already know; (e) a "type" clue that is more specific than Mammal or Bird. Worth watching real players to see which of these they actually use. | Partly done 2026-11-16: round 1 now worth 500 of 2,500 (was 1,000 of 3,000), with rank, zoo and badge thresholds scaled to match. The hint ideas (a) to (e) are still open. |
| 4 | "Once you select into the text field, then the keyboard pops up and then we can't see the photo anymore and then scrolling makes the keyboard go away and then there's a lot of back and forth with that." | See the photo while typing a guess on a phone | Round 1, phones | Options to try: (a) when the guess box is focused, shrink the photo to a strip pinned above the keyboard; (b) keep the photo pinned at the top of the screen while the guess box scrolls beneath it; (c) offer tappable choices so easy guesses need no keyboard. Needs testing on a real phone; the test browser has no on-screen keyboard. | Open |

## Saved for later

- A bonus for solving round 1 in a single guess ("you knew it instantly"). Parked on purpose: round 1 was just reduced, and this should be designed once real players show how often it happens.

## Scoring change, 2026-11-16

| | Before | Now |
| --- | --- | --- |
| Round 1, solved on guess 1 to 5 | 1000, 850, 700, 550, 400 | 500, 425, 350, 275, 200 |
| Round 1, not solved, closest relative genus / family / order / class | 350 / 250 / 150 / 50 | 175 / 125 / 75 / 25 |
| Rounds 2 and 3 | 1000 each | 1000 each |
| Maximum total | 3,000 | 2,500 |
| Round 1 share of the total | 33% | 20% |
| Ranks (Field Naturalist / Senior / Master) | 1500 / 2100 / 2650 | 1250 / 1750 / 2200 |
| Zoo entry, silver, gold | 1500, 1700, 2400 | 1250, 1400, 2000 |
| First retake bar, cap | 1750, 2500 | 1500, 2100 (still +250 per retake) |

Thresholds were scaled by the same five-sixths so that zoo and rank difficulty stay where they were. Old saved scores keep their old numbers.
