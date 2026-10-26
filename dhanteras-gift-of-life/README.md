# Dhanteras: The Ocean That Gave Us the Gift of Life

An interactive, narrated, Madhubani-inspired story of Samudra Manthan for children aged 6–10.
Open `dhanteras-gift-of-life.html` in any modern browser. It is one self-contained file: every illustration is drawn
in code as SVG, the music and sound effects are synthesized with Web Audio, and narration uses the
browser's built-in speech voices. No images, accounts, analytics or camera are used.

## Editing

The page is assembled from `src/` by `python3 build.py` (concatenates `src/head.html` and `src/*.js`
in name order into `dhanteras-gift-of-life.html`).

| File | Contents |
|---|---|
| `src/head.html` | Page shell, controls, captions, start and end cards, CSS |
| `src/00_core.js` | Palette, SVG helpers, tweens and timers on one clock, storage |
| `src/10_art.js` | Pattern fills, double-line outlines, lotus, mandala, sun, ocean, fish, Kalash, diya, the five treasure symbols, tap targets |
| `src/20_chars.js` | Character bible: Vishnu, Shiva (Neelkanth), Dhanvantari, Lakshmi, devas, asuras, Kurma, Mount Mandara, Vasuki, Kamadhenu, Airavata, Kalpavriksha, Halahala |
| `src/30_audio.js` | Synthesized tanpura/bells/dholak score, sound effects, speech narrator with a timed-caption fallback |
| `src/40_director.js` | Stage (landscape 1600×900 or recomposed portrait 900×1600), captions, activity rules, HUD, scene runner |
| `src/45_kit.js` | Backdrop, banks, fish school, bubbles, ripples, sparks, name plaques |
| `src/50_scenes_a.js` | Verbatim narration text and scenes 1–3 (`DHANTERAS_SC01`–`SC03`) |
| `src/51_scenes_b.js` | Scenes 4–7 (`DHANTERAS_SC04`–`SC07`) |
| `src/90_main.js` | Frame loop, start/replay/explore buttons, `#qa` test hook |

## How it plays

- Narration autoplays sentence by sentence with the current sentence underlined in the caption.
  It pauses for each activity and resumes on the next line afterwards.
- Six activities: wake the ocean (lotuses), help Kurma (shell), send kindness (heart),
  discover the treasures (any of four), help the divine lotus bloom, fill the treasure pot (any of five),
  and light a diya at the end.
- Every activity glows, shows a hint after about 9 seconds of no input and completes itself after
  about 15 seconds. Tapping somewhere else only makes the target glow brighter; there is no failure state.
- Controls: Mute (narration and sound), Music and effects on/off, Skip (current line, or completes the
  current activity), Next (next scene). Targets are keyboard focusable (Tab, then Enter or Space).
- **Replay Story** starts over with an empty treasure pot. **Explore Again** starts over and keeps the
  treasures already placed in the pot. The chosen treasures and the furthest scene reached are kept in
  `localStorage` when it is available; the story works the same when storage is blocked.
- Below a 0.9 width/height ratio the scenes switch to a portrait composition rather than cropping.

## Testing hook

Add `#qa` to the URL to expose `window.__qa` (`go(sceneIndex, speed)`, `state()`, `hit(targetKey)`, `speed(n)`).
