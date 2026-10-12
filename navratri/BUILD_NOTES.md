# Navratri — The Nine Powers of Shakti · Episodes 1–2

`index.html` is the whole app: one self-contained file with markup, styles, drawing helpers, the story director, narration, both mini-games and the camera enhancement. The only external script is the pinned Rough.js UMD build (`roughjs@4.6.6`) from jsDelivr. Patrick Hand and Kalam come from Google Fonts and fall back to `cursive, sans-serif`. There are no image assets: every scene, character, panel and effect is drawn procedurally.

## Architecture (for adding Episodes 3–11)

- **`TEXT.epN`** holds the narration, word for word, as an array of segments.
- **`EPISODES.epN.scenes[]`**: each scene is data with these fields:
  - `id`, `alt` (accessibility label)
  - `build(g)`: draws once with `R.*` and `CAST.*`
  - `script`: `[lineIndex, cue]` pairs, plus `'GAME'` at the mandatory interaction point
  - `game`: interaction type
  - optional `enter` / `exit`
- **`compile()`** throws if any narration line is missing, duplicated or out of order.
- **Director (`D`)** states: `SCENE_ENTER → NARRATING → INTERACTION_READY → INTERACTION_ACTIVE → INTERACTION_COMPLETE → … → TRANSITIONING → EPISODE_COMPLETE`. Skip only works in `NARRATING`.
- **Drawing layer (`R`)**: `R.rect/ellipse/circle/poly/path/arc/curve/line/lines` take palette tokens, stroke width, fill style, roughness and a deterministic seed (scene id + shape index). Each scene is generated once, cached as a template, and cloned when it plays. Animation only changes transforms and opacity on pivoted groups.
- **Adding an episode**: add `TEXT.ep3`, add `EPISODES.ep3` with scenes and scripts, and add a function in `Games` if it has a new activity.

## Test report

All tests ran in headless Chromium 141 through Playwright, against the real Rough.js 4.6.6 bundle from the npm package. This container's network policy blocks jsDelivr, so the test harness served the identical file at the pinned URL. Most runs used `?fast=8`, a test-only flag that shortens narration timing. The mini-games always run in real time.

1. **Rough.js vs. fallback.** Rough.js loaded and rendered every scene. With the script blocked, the plain-SVG fallback (`body.norough`) rendered both episodes, and Game 1 was played to completion in that mode.
2. **Narration controls.** Tested with timed captions:
   - Replay restarts the current line without adding a duplicate.
   - Skip and the `S` key each advance exactly one line.
   - Mute toggles by button and by the `M` key.
   - Mashing skip stops at Game 1 (0–26 heard, in order).
   - Skip is refused during both games.
   - Audible speech could not be verified: headless Chromium has no voices (`getVoices()` returned 0). The engine detected this, showed the "Tap to play narration" control, and kept the story going on timed captions.
3. **Mini-games with mouse and touch.**
   - Game 1 was completed by mouse drag (1280×720) and by touch drag (844×390 landscape phone, CDP touch events). A deliberate miss returns the light to its start.
   - Game 2 was completed with mouse-held pads, touch-held pads and arrow keys, about 15 s each.
   - With no input for about 8 s, Game 2 makes no progress.
   - After a deliberate mistake (marker pinned out of the zone, warning shown), steering back finishes the game without a restart.
4. **Pause and resume.** Episode 1 pauses after line 26 ("The different lights came together…"). Durga's opacity is 0 until the game succeeds, and the story resumes at "Brighter…". Episode 2 pauses after "But Shailaputri did not move." and resumes at "The mountains stood behind her." Each complete run heard 41/41 and 31/31 lines, each once and in order.
5. **Layout and reduced motion.**
   - Landscape phone (844×390, touch) was played through both episodes.
   - With `prefers-reduced-motion: reduce` emulated, the sketch-in animation is off and the scene appears complete.
   - Not tested on a physical phone.
6. **Performance simplifications.**
   - Paired details (eyes, ears, brows, earrings) are merged into single shapes.
   - The six devas use a "lite" build, and the gods' rays are one path.
   - Shapes per scene: 50–199. The exception is the Episode 1 gather scene at 348, which holds six devas, Durga, the lion and the game layer.
   - A frame-time monitor switches to low-performance mode (fewer particles, no boiling lines or grain) when frames average more than 42 ms.
   - No slowdown was observed in testing.
7. **Camera.**
   - The camera is optional and only asked for after the player turns it on.
   - It is a motion-wave "lean" input for Game 2 only. It is not hand-pinch tracking, which would need a computer-vision library, and the brief rules those out.
   - On denial the player sees "Camera isn't available — no problem! Touch, mouse and keys work everywhere." The button is disabled, the denial is remembered, and the camera is never requested again (1 request across 2 clicks). The story starts normally.
   - A granted camera was not tested: the headless browser has no camera.
