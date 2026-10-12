# LOG: navratri-ep1

## Run 1
- **Requirements:** Node 22, Playwright 1.56 + Chromium, ffmpeg 6.1 were already present. Installed faster-whisper 1.2.1 and espeak.
  - faster-whisper can't fetch its model: huggingface.co gets a 403 from the environment's egress policy, so word times are estimated.
- **Fonts:** the container had no hand fonts, so lettering rendered as a serif (caught in the first look frames). Installed `fonts-comic-neue` and `fonts-dkg-handwriting`, and mapped generic `cursive` to Comic Neue in `~/.config/fontconfig`. Proposed rule: check `fc-match cursive` before the look check on Linux.
- **Scratch voice:** espeak's default 175 wpm ran too fast for a storyteller. Ran it through a wrapper at 140 wpm (en-gb). Total 2:06 at your original pauses, 2:19 after lengthening them (approved).
- **Story check:** approved as shown, including the pull-back ending into the three-worlds page.
- **Look check v1:** found and fixed:
  - serif lettering
  - the beat-1 fortress intruding into the humans band
  - Durga's arms as single sticks with knob hands (now tapered two-line limbs, paper-filled, with bangles)
  - Brahma's side faces unreadable (now profiles)
- **Colour:** the kit's pencil prop is yellow and pink, and its eraser has a blue band. Replaced them with `navPencil` (bare cedar) and `navEraser` (no blue) in `src/common.js`, so terracotta stays the only colour.

## Run 1, character redo (your feedback: the figures looked crude and comical)
- Build stopped. All characters now live in `src/figures.js`:
  - `mahishasura(pose)`, `mahishaHead`, `brahma`, `durga`, `lion`, `durgaOnLion`, `deva(kind)`
  - built on Catmull-Rom spline contours, tapered `limb()`s, `hand()` with a thumb and four fingers, `face()` and `profileFace()`, a tiered `crown()`, `longHair()`, fold hatching
- `piece.json` "scenes" must list it before the beat files (to do when the beats are redrawn).
- Character sheets: a separate piece, `pieces/navratri-ep1/sheets/`, built from the same `figures.js`.
- Compared with `tools/compare.mjs --crop` against `references/navratri-look/` (local, gitignored). Outputs are in `review/compare/`.
- Self-review rounds before showing you:
  - crown first a helmet dome, then too large; now 0.78 head wide
  - hair strips, now a wavy mass
  - arms drawn over the deltoids; arms hidden under the dhoti
  - Brahma's lap detached and an arm crossing his chest
  - the lion's head too small (scaled 1.35×)
  - the jaw too boxy

## Run 1: animation, export and review (scratch voice)
- **Storyboard:** approved, all 18 panels.
- **Scenes:** four parallel agents, one file each:
  - g1: beats 1–4
  - g2: beats 5–8
  - g3: beats 9–12
  - g4: beats 13–16
- **Shared fixes after the agents' reports:**
  - The boon era holds into its pause so the BOON stamp lands after the line and is seen.
  - The nine rings are re-centred inside the safe area (x 172–938), clear of the lion's eye.
  - The season boxes sit inside the safe area.
  - Smoother push-ins into beats 2 and 3.
  - The close-up's shoulder fill follows the draw-on.
  - A larger palm bridge.
  - My inline comment once swallowed half the ERA_T list; I caught it on the next build. Rule: no `//` comments inside multi-value lines.
- **Review round 1:** story arc 2/5 (the gift tied the peak; goodbye didn't decay), a 3.3 s still opening, and the "asuras" label under the phone UI in the pull-back.
  - Fixed: peak quieter, gift louder, goodbye decays, the pencil enters at 0.6 s, the labels wait for the pull-back.
- **Review round 2:** arc 5/5, but the loudest window moved to the gift pad (98.5 s). Fixed by trimming the pad (0.03 → 0.021).
- **Review round 3 (final, renders/final.mp4, 3,337 frames, 2:19):**
  - cut on the 8th grid (+0.0 f): PASS
  - 14 morphs centred on the 8th grid: PASS
  - story arc 5/5: PASS
  - text: 0 cut off or overlapping, 0 under the phone UI: PASS
  - dead beats: 0 stretches over 3 s: PASS
  - loudest 100 ms: 94.8 s (−9.4 dBFS), on the cut, in the payoff act
  - silence before it: 1.7 s at ≤ −40 dBFS
  - loudness: −14.6 LUFS, true peak −1.5 dBFS
  - narration density FAIL, on one line: "He did not stop." at 3.73 words/s. This is espeak's speed; the script asks for this line slow, so the real take will fix it.

### Per-shot PASS table (contact sheets review/shotNN-sheet.jpg, review/phone.jpg)
| # | shot | result | note |
|---|---|---|---|
| 1 | three worlds | PASS | pencil enters at 0.6 s; bands, labels on their words; push to the figure |
| 2 | he enters | PASS | strides 4 steps; name with the red underline |
| 3 | tapasya | PASS | leaves fall from the canopy; breath ticks |
| 4 | time | PASS | six boxes on their words; tally |
| 5 | he did not stop | PASS | scribbles close into the halo |
| 6 | Brahma | PASS | ink only; rays one by one |
| 7 | the boon | PASS | card on "no man / no deva"; BOON stamp seen before the bridge |
| 8 | pride | PASS | crown rubbed out and redrawn; smudges rise |
| 9 | the army | PASS | busiest frame; he marches up the lane |
| 10 | retreat | PASS (weakest) | the thin boxes and small figures read as a diagram at phone size; boxes 2–3 sit empty a few seconds |
| 11 | gather | PASS | first terracotta dot on "together" |
| 12 | energies | PASS | lines on a 3/16 grid (7 beats don't fit in 3.75 s) |
| 13a | merge + silence | PASS | first ~1 s shows stray single rays before the rings fill |
| 13b/14 | Durga | PASS | the cut lands on a finished frame; blinks, tail, rings, tally |
| 15 | first light | PASS | comet on the trail to the peak |
| 16 | who / title | PASS | peak close-up, pull-back to the changed opening page, SHAILAPUTRI, DING. |

- **Weakest shot: 10 (retreat).** To fix: one box at a time, full-width, with figures about 2× larger, instead of three thin boxes.
- **Not verified:**
  - I can't listen to the score; only its measurements.
  - The voice is espeak and word times are estimates (huggingface.co blocked), so cue timing will move with the real takes.
