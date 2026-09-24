# The Merchant and the Bull: build notes

A single-file interactive story (`index.html`, about 150 KB), drawn as a pencil-and-crayon sketchbook with Rough.js. It has no image assets; every visual is drawn in code. `index.html` is the source file, and there is no build step.

Published: https://claude.ai/artifact/7XWqAj5dd7P4GnyLa5guna

## What's in it

| Beat | Title | Interaction |
|---|---|---|
| Intro | Last Time, in the Panchatantra | Narration over the self-turning Panchatantra book |
| 1 | Vishnu Sharma Begins the Tale | **Namaste**: drag or tap the two palms together (camera: two palms close); lion/jackal thought bubble; lion-sound prompt |
| 2 | The Merchant Vardhamanaka | **Tap the merchant** for the four-line secret; **pack the wagon** (drag or tap 5 items), then CLINK! CLACK! |
| 3 | The Two Bulls | Parallax journey, name tags, friend prompt |
| 4 | Sanjivaka Gets Stuck | SPLASH; **pull 4 vines** away (drag past a threshold, or tap); "would you stay?" prompt |
| 5 | Left Behind | Mood beat: wagon leaves, dusk, CRACK branch, growl and eyes in the bush |
| 6 | The Big Lie | Servants flee, lie to the merchant, close-up of Sanjivaka's eye opening; prompt |
| 7 | Sanjivaka Recovers | Leads into Game 1 |
| Game 1 | Moo Munch | External iframe, then MUNCH, the "MOOOO!" beat, sound rings, birds scatter; "what made that sound?" prompt |
| 8 | Meet Pingalaka | MOO, ears up, eyes wide; loud-noise prompt |
| Game 2 | Pingalaka Panic Run | External iframe, then "hid beneath a banyan tree" |
| 9 | The Lion Hides | Ministers (bear, deer), "Did you hear that?!"; "when you feel scared" prompt |
| 10 | Karataka and Damanaka | **Find the jackals**: tap the bushes with peeking eyes |
| 11 | Two Very Different Jackals | Speech bubbles; "which one are you?" prompt |
| 12 | The Monkey Who Pulled the Wedge | Sepia pencil-storyboard cutaway on a torn sheet; CREAK, SNAP, the monkey leaps clear; freeze-frame (non-graphic) |
| 13 | What Have We Discovered? | Split screen with a jagged rough divider; the roar travels across as wobbly sound-wave arcs |
| 14 | The Lesson | **Drag the light** to THINK (PANIC and FIND OUT give gentle redirects) |
| 15 | To Be Continued… | Jackals diverge, Damanaka smiles, push into the cross-hatched dark forest, end card, book-closing SFX |

Scenes 1–6 keep the earlier narration, timings and interactions; only the visuals changed.

## Foundation (unchanged)
- **Director**: each scene is an async script. Every wait can be aborted, so **Skip** (→ key) moves cleanly to the next beat. Tap the caption to skip one line. Deep links such as `#s7` and `#g1` start at that beat when "Begin" is pressed.
- **Narration**: Web Speech API (prefers an `en-IN` voice) with per-character pitch and rate. When muted or unavailable, captions pause for reading time instead.
- **SFX**: synthesized with Web Audio. **Mute** (M key) silences narration and SFX.
- **Input**: pointer (mouse or touch) is the base layer. Every draggable also works as a tap and with Enter or Space. Camera hand gestures are an optional extra.

## Sketchbook rendering
- **Rough.js 4.6.6** loads as a pinned UMD script from `https://cdn.jsdelivr.net/npm/roughjs@4.6.6/bundled/rough.js`. It runs in generator mode: `rough.generator()` plus `opsToPath()`. Outlines and fills come out as separate SVG paths inside the existing scene graph.
- **Helper layer**: `R.rect / rrect / ell / circ / poly / path / line / lines / curve / arc / limb / mut` apply the palette and defaults: ink `#3B2A20`, stroke about 2.5, roughness 1.5, bowing 1, hachure gap of 7 or more. Scenes never call Rough directly.
- **Fill styles by purpose**: hachure for skin, fur, foliage and wood; solid for eyes, jewellery and trim (and the white bull, which needs to read against cream paper); cross-hatch for shadows, night and the dark forest; dots for mud, sand and road; zigzag for grass, fire and the shawl. Every outlined hachure fill sits on a pale crayon wash, so characters stay readable over busy backgrounds. Fills are nudged a few pixels off their outlines.
- **Seeds**: each shape's seed is `hash(sceneId) * 1000 + shapeIndex`. Replaying a scene draws the same wobble.
- **Generate once, then cache**: generated nodes are cached by shape, parameters and seed, and replays clone from the cache. Animation only transforms groups (translate, rotate, scale, opacity). Mouths and brows that change shape keep their seed.
- **Characters** are grouped parts with pivots (heads, arms, legs, tails, ears, eyelids), animated with the same CSS classes as before.
- **Sketch-in**: when a scene is revealed, each outline draws itself on (dash offset set from `getTotalLength()`), then the fills and washes fade in. This is skipped under `prefers-reduced-motion`.
- **Boiling lines**: main characters (Sanjivaka, Pingalaka, the jackals, Vishnu Sharma, the merchant, the monkey) carry three pre-generated outline variants, cycled at about 6 fps. The effect is off under reduced motion, and switches itself off if the frame rate stays under 30 fps.
- **Paper**: cream ground, two procedural `feTurbulence` layers (grain and fibres), and a soft vignette. In dark mode the paper dims as if read by lamplight, and it is always painted explicitly.
- **Type**: Patrick Hand (body) and Kalam (display, including the Devanagari पञ्चतन्त्र), with `cursive, sans-serif` fallbacks. Captions, hints, the ask card, buttons, the scene menu, the game frame and toasts are all rough-drawn paper notes.
- **Fallback**: if `window.rough` is missing (CDN blocked or offline), the same helpers draw plain SVG shapes in the same palette. The story plays normally; sketch-in and boiling lines are skipped.

### Shape budget (rough shapes per stage, from the test run)
Most stages come in at 50–150. Scene 5 is the heaviest, at about 180 after trimming (full forest, Nandaka and wagon, merchant, two servants and the lying bull all on stage together). Its far-tree row was cut from 8 to 6, and the wagon leaves unloaded. Scenes that cut to new stages (6, 12, Game 1 and Game 2 outros) count each stage separately. The Intro and Scene 1 totals include book pictures and the thought bubble, which are generated lazily when shown.

## External games: integration contract
- Each game opens as a full-screen `<iframe>` inside a thick sketched frame. The director awaits it, so narration, speech and ambience are paused. The story chip is hidden while the game bar is up.
- `window.addEventListener('message', …)` logs **every** message from the game frame to the console (`console.log('[game message]', …)`), to `window.__gameMessages`, and to an on-screen log (the "N messages" chip). A payload matching `complete|finish|game over|victory|done|ended|won` ends the game. Tighten `COMPLETE_RE` once the real event shape is known.
- **The Continue fallback is always there**: "Continue the story →" appears after 6 s if the frame has sent nothing, and after 25 s regardless. It appears **immediately** if this page's content-security policy refuses to frame the game: a `securitypolicyviolation` listener catches `frame-src` and shows a short note. If the frame never fires `load` within 9 s, a note offers "play it in a new tab". An "Open in a new tab ↗" link is always shown, and **Skip** also ends the game beat.
- Camera permission inside the iframe may be refused; the games are expected to stay playable by touch or mouse.

## Camera hand gestures (optional enhancement)
The ✋ button lazy-loads MediaPipe Hand Landmarker from jsDelivr. It maps palm position to the cursor, a pinch or fist to grab, an open hand to release, and two palms together to namaste. Any failure (permission denied, no camera, blocked model download) shows a toast: "The hand camera isn't available here — tapping and dragging work everywhere." The button returns to off, and every interaction carries on by tap and drag.

## Tested (headless Chromium, local file)
- Full autoplay run through all 18 beats, driving every interaction and prompt through its tap or keyboard path, ending on the end card. **No page errors.**
- Scene 2 packing done with real mouse drags into the wagon (hit areas cover the gaps between hachure lines); the story advanced to Scene 3.
- Fallback run with the Rough.js CDN blocked: plain-SVG rendering, no page errors.
- Both game beats fell back to "Continue the story →" (0 messages), because the game host is blocked from the build environment.
- Headless Chromium ran at about 26 fps (software rendering), so boiling lines switched themselves off during the test, as designed.
- Not tested: real speech voices, real camera tracking, the games' own completion events, and the published page's CSP behaviour (see the report in the session).
