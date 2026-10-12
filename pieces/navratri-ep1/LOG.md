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
