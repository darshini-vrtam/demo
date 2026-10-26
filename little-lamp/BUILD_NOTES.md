# The Little Lamp That Could Not Go Out — build notes

Panch Deep, Event 1: Dhanteras. A single-file interactive story (`index.html`, about 240 KB) painted entirely in code on one `<canvas>` as a Pithora wall. It uses no image assets and no Rough.js.

**Edit `src/`, not `index.html`.** Run `python3 build.py`. It concatenates `src/*.js` into `src/page.html` and writes:
- `index.html`: the artifact body.
- `preview.html`: a standalone copy for local testing. It is git-ignored.

Deep links: `#s1` … `#s11`, `#t2`, `#t3` and `#end` put a "Begin here" button on the start screen.

## Script source: read this first

The story document named in the brief was **not attached** to this session, and it could not be found in the connected Google Drive. All dialogue therefore lives in one table, `src/10-lines.js` (`LINES`, 172 lines).

- **21 lines marked `// BRIEF`** are word for word from the production brief. Examples: "Imagine you are Chiku... what would you do?", "Chiku… the sun is setting.", "What grows when you share it?", "I was hoping nobody would notice.", "A good story deserves to be heard.", and the Yamadeepdan folk-tradition disclaimer phrases.
- **Every other line is a draft** written to fit the brief's beats. To use the real script, replace the text in `LINES` and keep the `{cue}` markers:
  - `{name}` before a word makes that figure appear on that word.
  - `{sfx:chime}` plays a sound on that word.

  Scene code refers to lines by id only, so no other file needs to change.

## What's implemented

| Beat | Painting / mood | Interaction |
|---|---|---|
| Title card (Episode 1) | Horse ring around a turning sun (Turmeric) | Begin, or Continue (Episode 2/3) when stored choices show progress |
| 1 A very unusual morning | Palace wall with garlands, mural panels, horse and elephant rows (Wall White) | "Psst!" SFX. Bijli turns his head, wiggles his ears and hops off the wall, drawing himself tail → body → legs → neck and head → eye. **Decision c1**: ask Bijli / check who else can see him |
| 2 Help Bijli Remember | Four-register mural packed with dotted figures | **Find 5**: cradle, stars, four moons, serpent, closed door. Each glows, flies to the strip and gets its narration line. Prophecy storyboard. **Decision c2**: tell Kesar now / ask Bijli first |
| 3 A plan made of light | Kesar's chamber | Kesar's three lamp lines. **Prepare the Lamps**: drag each lamp into "Ready to Shine" or "Needs Repair". 3 of the 9 need oil or a wick. A wrong tray gets Chiku's explanation and a fix, never a penalty. Sunset on Marigold Orange: lamps light and shadows lengthen. Cliffhanger on Pithora Red: a long shadow slides under the door |
| Title card (Episode 2) | Horse ring around a lamp | "Previously…" only on resume or replay |
| 4 A plan bigger than nine lamps | Huge palace vs nine counted lamps (Orange) | **Decision c3**: market (merchant refuses → riddle → donates) / children's courtyard (chipped lamp, wicks, oil, flowers arrive on their words). Both end on Turmeric Yellow with a register of tiny townsfolk carrying lamps |
| 5 Build the Circle of Light | Rangoli ring of 12 spots in 4 sections around the door | Drag lamps to spots, or tap a spot and a lamp hops there. Each finished section fills with dots. The wall turns Turmeric for Kesar's line |
| 6 Protect the Flame | Deep Indigo night with dotted wave and swirl wind | Bijli is pushed back. **Shield**: a swirl shows where the next of 6 gusts comes from; drag (or tilt, or move your hand) to move the clay shield. Unshielded gusts put out 2 lamps; tap to relight. No fail state |
| 7 Someone is at the door | Midnight stillness, silent music beat | Shadow under the door, Chiku's thought bubble. Cliffhanger on Pithora Red: creak, and the door begins to open |
| Title card (Episode 3) | Horse ring around the sun | "Previously…" on resume or replay |
| 8 A guest nobody expected | Yama in the open doorway, haloed and crowned, calm | **Decision c4**: monkey story / star story. A painted story panel shows the chosen tale and its opening lines |
| 9 Tell the Tale | Story panel between Kesar and Yama | 5 moments × 2 face buttons (read aloud). Each pick animates the story character's face and pose. Yama's brows soften across the five. Ends with "A good story deserves to be heard." |
| 10 The last lamp | Close-up lamp, wall moving from indigo toward dawn | **Decision c5**: cup hands (press and hold; gusts test the hands) / shelter (drag slowly into the niche; moving too fast puts the flame out). Chiku calmly relights it. A dotted ring fills as the flame steadies |
| 11 Morning arrives | Turmeric Yellow, big dotted sun, rooster | Yama's speech, bow and request. Kesar's reply. Disclaimer lines. **The Panch Deep shelf**: the first of five niche lamps lights (stored) |
| End card | Horse ring around the sun | "Event 1 of Panch Deep complete." with the shelf |

**Choice callbacks wired**
- c2 → Kesar's first line in Scene 3.
- c1 → Chiku's line in Scene 4.
- c3 → the lamps donated into the Scene 5/6 ring (shiny market lamps or chipped courtyard lamps) and Diya-Dadi's wind line in Scene 6.
- c4 → Yama's callback in Scene 11.
- c5 → Diya-Dadi's callback and Chiku's pose in Scene 11.

Both branches of every decision are fully authored.

**Foundation**
- Autoplay director with abortable waits. Skip (→ key) jumps to the next beat.
- Mute (M key) silences speech, SFX and music.
- Each beat cuts 0.22 s before its first word. The dotted border regrows clockwise on every cut. Close-ups alternate with wide shots under a slow camera push.
- Idle rule for every activity and decision: a hint after 15 s, then auto-assist so the story never stalls.
- Storage holds only `panchdeep.v1 = {choices, shelf}`, wrapped in try/catch. A test with storage access throwing still rendered and played.

## Camera, hand and face tracking under the hosting CSP

The ✋ chip lazy-loads MediaPipe Tasks Vision `0.10.14` from jsDelivr only when tapped:
- Index-finger position becomes the pointer; a pinch is a press. It steers the Scene 6 shield without a press.
- Face blendshapes mirror the child's expression onto the story character in Scene 9. Holding a matching face for about 1 s picks that button.

**Inside the claude.ai artifact this will fall back to tap and drag.** This account has no camera capability, so the host frame refuses the camera. The CSP also blocks MediaPipe's WASM and model fetches, because only scripts may load from the CDN. In this build's headless test, the camera request failed ("Requested device not found"); the chip dimmed and the story carried on. There is no error screen.

Hand and face tracking were not verified end to end anywhere, because the test environment has no camera. They should work when `index.html` is hosted on its own page.

## Speech

- Uses the Web Speech API. It prefers an `en-IN` voice, picks distinct female and male voices where the device has them, and gives each character its own pitch and rate. Yama is low and slow; Chiku is high.
- Word timing comes from `boundary` events when the voice provides them. Otherwise it is estimated from syllable counts and punctuation pauses.
- If no voices exist, the sound is muted, or speech fails to start 3 times, bubbles play on the estimated timing in silence. Diya-Dadi's narration then appears only in a screen-reader live region; there are no captions, per the brief.
- The test container reports no voices, so only the silent path was exercised here. **Real-voice playback, voice choice and boundary sync are untested** and depend on the viewer's device.

## Checks run

- **Full autoplay at 10× speed:** landscape (1280×720, 1440×810) and portrait (390×844, 412×915), covering all A branches and all B branches. No script errors. Screenshots of a late frame of every scene were reviewed and fixed. Fixes included bubble tails covering heads, the merchant's hand over his face, Bijli hidden behind Yama, bubbles over the lamp row, cropped characters in portrait, and a hidden title text.
- **Real pointer input in every activity, with no auto-assist:** all 5 mural targets, all 9 lamps (including a deliberately wrong tray), all 12 ring spots, 6 gusts with relighting, 5 story faces, and both last-lamp modes. Skip works mid-activity and mid-decision. Resume shows "Continue: Episode 2" and plays the "Previously…" line.
- **Performance:** fully drawn shapes are cached as bitmaps. Headless software rendering at 2× DPR measured 31–67 ms per frame (portrait 33 ms, heaviest landscape scene 67 ms). Real GPU-backed browsers should be much faster, but this was not measured on a phone.

## Simplified or changed

- Diya-Dadi is voice only and never appears on screen.
- The Scene 9 face buttons are faces with labels, not scene thumbnails.
- "Deep Indigo" uses the palette's Indigo `#22408f`; no new colour was invented.
- The palace, cradle and other motifs are simplified flat silhouettes.
- Bubbles hold at most two lines, so long lines are split into consecutive bubbles automatically.

## Gaps and choices in the brief

These are places where the brief left a gap and I made the call:
- **Who asks the riddle:** the brief doesn't say who asks "What grows when you share it?". Bijli asks it.
- **Unattributed lines:** "A good story deserves to be heard" is given to Yama. "The palace can be lit when people work together" is narrated by Diya-Dadi.
- **Who the prophecy is about:** the brief never names who the prophecy is about. The draft makes it the young prince, Princess Kesar's husband, who stays off screen, in keeping with the Yamadeepdan tale.
- **Which lamps need repair:** the brief says nine lamps end up ready but not how many start broken. The draft uses 3 of the 9.
