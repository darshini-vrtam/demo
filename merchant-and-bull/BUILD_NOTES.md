# The Merchant and the Bull — build notes

Single-file interactive story: `index.html` (≈770 KB). Painted art is inlined as base64 WebP data URIs, because published artifacts can't load remote images.

**Edit `story.src.html`, not `index.html`.** Art lives in `assets/` and is referenced as `__ART:file.webp__`. Run `python3 build.py` to regenerate `index.html`.

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

## Painted art pass

### Assets in use (all from the provided references, re-encoded to WebP)
| File | Source | Size | Used for |
|---|---|---|---|
| `throne.webp` | King + sons, throne room | 1800², 180 KB | Intro |
| `banyan-sage.webp` | Vishnu Sharma + princes under the banyan | 1920×1080, 145 KB | Intro, Scene 1, Scene 12 opening |
| `forest.webp` | Bull / jackals / cart / lion establishing art | 2000×1116, 113 KB | Title, Scenes 3–11, 13, 15, game outros (via camera crops) |
| `*-soft.webp` | Pre-blurred 640px versions of the three | 3–7 KB each | Letterbox backdrop, bokeh backgrounds (Scenes 2, 6, 14, game cards) |
| `merchant.webp` | Merchant cutout (alpha-cropped) | 343×462, 21 KB | Scene 2 |
| `arjun.webp` | Arjun cutout (alpha-cropped) | 280×324, 17 KB | Narrator figure beside his captions + "Arjun asks" card |

### How it's layered
- **Backgrounds** sit in an SVG camera group. `painted()` frames a point of the image at a zoom, `drift()` is the slow Ken Burns move, and `cam()` makes a deliberate camera move that cancels the drift. The camera never shows past the painting's edge. On wider or taller screens a blurred copy fills the letterbox.
- **Cutouts** are `<image>` layers with a soft ground shadow and a gentle idle bob/sway. There's **no blink swap**, because no eyes-closed frames exist.
- **Interaction layer**: the namaste palms, vines, "peeking eyes" rings and the THINK orb are drawn as glowing light, echoing the glowing story-animals in the banyan painting, so they read as magic rather than clashing with the art.
- All mechanics are unchanged: director, narration, mute/skip, tap/drag plus the optional camera, and the game contract.

### Scene coverage
| Beat | Art status |
|---|---|
| Intro | ✅ Full: throne room ↔ banyan cross-cuts, gold पञ्चतन्त्र title |
| 1 | ✅ Full: banyan painting; camera spotlights the glowing lion, then the fox, as Vishnu Sharma names them |
| 2 | ⚠️ Partial: painted merchant ✅. No Mahilaropya / wagon-yard background (defocused forest bokeh stands in). **Wagon and the five goods are still code-drawn props** (softened), because no art for them exists or was requested |
| 3 | ✅ Covered by a crop of the establishing art (cart on the forest road). Only one bull reads clearly; **Nandaka (#1)** is needed to show both pulling |
| 4 | ✅ Covered by a crop of Sanjivaka lying in the mud (dedicated **mud-pit background #7** still missing). The merchant isn't shown, because the only merchant art is a big grin and doesn't fit "worried" |
| 5 | ⚠️ Partial: cart leaving + Sanjivaka ✅; **servants have no art** (not in the generation list) |
| 6 | ⚠️ Partial: fleeing servants and the sad merchant aren't shown (warm bokeh + "The bull died, sir…" bubble). The eyes-open close-up works on the painting ✅ |
| 7 | ✅ Full |
| Game 1 outro | ✅ Full (MUNCH, MOOO rings, camera punch, birds scatter) |
| 8 | ⚠️ Partial: **proud Pingalaka (#2)** is missing, so the lion is only revealed after the MOO, using the startled lion in the establishing art |
| Game 2 outro | ⚠️ Partial: he hides behind a forest tree, not a banyan (**#8** missing) |
| 9 | ⚠️ Partial: **ministers** (no art, not in the list) and the **banyan (#8)** missing |
| 10 | ✅ Full: the jackals in the establishing art, found by tapping glowing eye-pairs that open a spotlight on each (red scarf = Damanaka, green = Karataka, matching your spec) |
| 11 | ✅ Covered: camera cuts between the two jackals with speech bubbles. Their painted expressions are fixed, so Damanaka's "mischievous grin" isn't shown (**#5**) |
| 12 | ⚠️ Opening ✅ (banyan). **The wedge cutaway is still the code-drawn sepia sequence**: the monkey (#6) and log site (#9) are blocked |
| 13 | ✅ Full: split screen of the two paintings. Sanjivaka is resting rather than grazing |
| 14 | ✅ Activity over the soft banyan painting (PANIC / THINK / FIND OUT stay as icon graphics) |
| 15 | ⚠️ Partial: jackal camera beats, glowing path, push onto Sanjivaka in shadow ✅. Damanaka can't visibly walk off or smile without separate cutouts (**#4, #5**) |

### Blocked: the 9 assets to generate
**None were generated.** This session has no image-generation tool. The environment does hold AWS and GCP credentials, but I didn't use them to call a paid image model on your account without your say-so. No placeholder art stands in for these assets silently; the scenes they affect are marked ⚠️ above.

To add them: drop each finished file into `assets/`, add an entry to `ART` in `story.src.html`, swap the crop or `cutout()` into the scene, then run `python3 build.py`. Suggested placements:
- #1 Nandaka → Scenes 2–3
- #2 / #3 Pingalaka → Scenes 8–9, 13
- #4 / #5 jackals → Scenes 10–11, 15
- #6 monkey, #9 wedge site → Scene 12 cutaway
- #7 mud pit → Scene 4
- #8 banyan hideout → Game 2 outro, Scene 9

Other art the script calls for that isn't in your list: **the servants** (Scenes 5–6), **Pingalaka's ministers** (Scene 9), **a worried/sad merchant** (Scenes 4, 6), **a Mahilaropya wagon-yard background plus cart and goods** (Scene 2), and **the log-site workers** (Scene 12).

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
Headless Chromium run (after the art pass) through all 18 beats, driving every interaction via the tap/keyboard path and every prompt via its button. It completed with **no page errors**, and both game beats fell back to "Continue the story →" as designed (the game host was unreachable). Not tested: real speech voices (headless has none), real camera hand tracking, and the games' own completion events.

## Open items
- The script's title card says `[next story]`. The end card uses the provided subtitle ("A Story of Friendship, Fear & Cleverness") plus "To Be Continued…" until the next story's title is chosen.
- The artifact linked in the request (`ReCBQGZ4EirKSiEmT8XXfs`) is an unrelated third-party page (an Antikythera diving game), not a Merchant and the Bull build. The account's own "Panchatantra — An Interactive Tale" is the photo/video court-and-princes intro. So this story was built as its own artifact, following the described foundation, rather than overwriting either one.

## Hand-drawn edition (`hand-drawn.html`)

A restyle of the code-drawn build (commit `dc5f777`) as a neat child's crayon and coloured-pencil drawing. **The story, interactions, narration (voice lines, cast pitch/rate) and SFX are unchanged**: only the look changes.

- **Crayon wax** (`#grain`, multiply blend): colouring strokes all laid the same way, as a child colours in, with soft pressure blotches.
- **Paper tooth** (`#tooth`, screen blend): small flecks of white paper that the wax skipped over.
- **Scribble shading**: a zig-zag crayon scribble under the hill ridges and on the shadow side of foliage.
- **Crayon sky**: a few long, loose strokes across every sky.
- **Hand-cut UI**: irregular corner radii on the caption, cards, pills and buttons; Kalam hand-lettering for the body text, with Yatra One kept for display.
- **No line wobble**: nothing distorts or animates the linework. All textures are static, painted once by script as seamless tiles.

Regenerate it with `git show dc5f777:merchant-and-bull/index.html > v1.html && python3 restyle_handdrawn.py v1.html hand-drawn.html`.
