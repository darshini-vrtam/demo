# The Merchant and the Bull — build notes

Single-file interactive story: `index.html` (≈140 KB, no image assets, everything drawn in SVG from code).

## What's in it

| Beat | Title | Interaction |
|---|---|---|
| Intro | Last Time, in the Panchatantra | Narration over the self-turning Panchatantra book |
| 1 | Vishnu Sharma Begins the Tale | **Namaste**: drag/tap the two palms together (camera: two palms close together); prompt about lion sounds |
| 2 | The Merchant Vardhamanaka | **Tap the merchant** for the 4-line secret scroll; **pack the wagon** (drag or tap 5 items) → CLINK! CLACK! |
| 3 | The Two Bulls | Parallax journey; name tags; friend prompt |
| 4 | Sanjivaka Gets Stuck | SPLASH; **pull 4 glowing vines** away (drag past a threshold or tap); "would you stay?" prompt |
| 5 | Left Behind | Mood beat only: wagon leaves, dusk falls, CRACK branch, growl + eyes in the bush |
| 6 | The Big Lie | Servants flee → merchant camp lie → close-up of Sanjivaka's eye opening; prompt |
| 7 | Sanjivaka Recovers | Head lifts, grass and water sparkle |
| Game 1 | Moo Munch | External iframe (see below) → MUNCH, "MOOOO!" beat, sound rings, birds scatter; prompt |
| 8 | Meet Pingalaka | Distant MOO → ears up, eyes wide; prompt |
| Game 2 | Pingalaka Panic Run | External iframe → banyan hiding beat |
| 9 | The Lion Hides | Ministers (bear, deer), "Did you hear that?!", duck; prompt |
| 10 | Karataka and Damanaka | **Find the jackals**: tap the two bushes with peeking eyes |
| 11 | Two Very Different Jackals | Speech bubbles; "which one are you?" prompt |
| 12 | The Monkey Who Pulled the Wedge | Sepia cutaway, CREAK… SNAP!, monkey leaps clear; freeze-frame (non-graphic) |
| 13 | What Have We Discovered? | Split screen; MOO travels across the divider |
| 14 | The Lesson | **Drag the glowing light** to THINK (PANIC / FIND OUT give gentle redirects); FIND OUT lights up on "discover the truth" |
| 15 | To Be Continued… | Jackals diverge, Damanaka smiles, camera push into the dark forest, Sanjivaka's shadow, end card + book-close SFX |

### Foundation
- **Director**: each scene is an async script; every wait is abortable, so **Skip** (→ key) jumps to the next beat cleanly. Tap the caption to skip a single line.
- **Narration**: Web Speech API (prefers an `en-IN` voice), per-character pitch/rate. Muted or unavailable → caption-timed reading pauses.
- **SFX**: all synthesized with Web Audio (moo, splash, crack, growl, creak/snap, chime, book close…). **Mute** (M key) silences both.
- **Arjun asks** prompts: spoken question, 8 s countdown, "I answered! →" button, autoplay continues on its own.
- **Deep links**: `#s7`, `#g1`, `#s12`, etc. start the story at that beat when "Begin" is pressed. "Choose a scene" opens any beat.
- **Input**: pointer (mouse/touch) is the base layer for every interaction; every draggable also works as a **tap** (and Enter/Space via keyboard), so no drag is ever required.

### Camera hand gestures (optional enhancement)
The ✋ button lazy-loads MediaPipe Hand Landmarker from jsDelivr and maps: palm position → cursor, pinch or fist → grab, open hand → release, two palms together → namaste. Any failure (permission denied, no camera, blocked model download) shows a toast and everything keeps working by touch.

**In the published claude.ai artifact the camera is refused by the host frame**, and the MediaPipe WASM and model fetches are also blocked by its CSP, so the enhancement only works when `index.html` is hosted on its own (e.g. next to the games on R2).

## External games — integration contract

- Each game opens as a full-screen `<iframe>` at its beat. The director is awaiting it, so narration, ambience and autoplay are paused.
- `window.addEventListener('message', …)` logs **every** message whose `source` is the game frame to the console (`[game message]`), to `window.__gameMessages`, and to an on-screen log (the "N messages" chip in the game bar). A payload whose text matches `complete|finish|game over|game end|victory|all done|done|ended|won` ends the game automatically. Once the real event shape is known, tighten `COMPLETE_RE`.
- **Fallback, always present**: a "Continue the story →" button appears after **6 s if the frame has sent no message at all**, or after **25 s** regardless. If the frame never fires `load` within 9 s, a note offers "play it in a new tab". There's always an "Open in a new tab ↗" link, and **Skip** also ends the game beat.

### Did the iframes load inside the published artifact?
**Not verified live, and expected to be blocked.** The artifact host's policy doesn't allow embedding other sites in iframes. The r2.dev game pages will almost certainly show a blocked frame there, and the 6 s fallback will surface "Continue the story →" and the new-tab link. I couldn't test against the real links from the build environment either: its network policy refuses `pub-3fdb2af8d94d4fcdb27b52da01c6c7d5.r2.dev` (HTTP 403 at the proxy). So the games' actual `postMessage` shape is still unknown.

**To make the games play inline:** host this `index.html` on the same R2 bucket (or any origin without a restrictive `frame-src`). If it's on the *same origin*, you can also detect completion directly from the frame's DOM/globals, instead of relying on `postMessage`.

## Published
https://claude.ai/artifact/7XWqAj5dd7P4GnyLa5guna (private until shared from its Share menu)

## Tested
Headless Chromium run through all 18 beats, driving every interaction via the tap/keyboard path and every prompt via its button. It completed with **no page errors**, and both game beats fell back to "Continue the story →" as designed (the game host was unreachable). Not tested: real speech voices (headless has none), real camera hand tracking, and the games' own completion events.

## Open items
- The script's title card says `[next story]`. The end card uses the provided subtitle ("A Story of Friendship, Fear & Cleverness") plus "To Be Continued…" until the next story's title is chosen.
- The artifact linked in the request (`ReCBQGZ4EirKSiEmT8XXfs`) is an unrelated third-party page (an Antikythera diving game), not a Merchant and the Bull build. The account's own "Panchatantra — An Interactive Tale" is the photo/video court-and-princes intro. So this story was built as its own artifact, following the described foundation, rather than overwriting either one.
