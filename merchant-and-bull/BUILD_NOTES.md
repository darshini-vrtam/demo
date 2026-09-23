# The Merchant and the Bull — build notes

There are two single-file editions:

| File | Source | Art |
|---|---|---|
| **`index.html`** (≈170 KB) | `rough.src.html` | **Hand-drawn with Rough.js.** Everything is code-drawn SVG, re-inked by Rough.js. No image assets. |
| `painted.html` (≈770 KB) | `painted.src.html` + `assets/` | The earlier painted-art pass: reference illustrations inlined as base64 WebP |

**Edit the `*.src.html` files, not the built pages.** Run `python3 build.py` to rebuild both. It inlines `vendor/rough.js` (Rough.js 4.6.6, MIT, see `vendor/rough.LICENSE`) into `index.html`, and the WebP art into `painted.html`. Rough.js is inlined rather than loaded from a CDN, so the page has no script dependency that can fail at runtime.

Both editions share the same director, narration, input layer and game contract. They differ only in the art layer.

## What's in it

| Beat | Title | Interaction |
|---|---|---|
| Intro | Last Time, in the Panchatantra | Narration over the self-turning Panchatantra book |
| 1 | Vishnu Sharma Begins the Tale | **Namaste**: drag the two palms together, or tap each one (camera: two palms close together). Lion/jackal thought bubble; "what sound does a lion make?" prompt |
| 2 | The Merchant Vardhamanaka | **Tap the merchant** to open the 4-line secret scroll. **Pack the wagon**: drag the 5 goods in, or tap them (camera: pinch-drag) → CLINK! CLACK! |
| 3 | The Two Bulls | Parallax journey, name tags, "friend who helps" prompt |
| 4 | Sanjivaka Gets Stuck | SPLASH. **Grab and pull 4 glowing vines** away: drag past a threshold, or tap (camera: fist + pull). "Would you stay?" prompt |
| 5 | Left Behind | Mood beat only: the wagon leaves, dusk falls, a branch CRACKs, a growl comes with eyes in the bush, the servants shiver |
| 6 | The Big Lie | Servants flee → merchant camp: "The bull died, sir…" → close-up of Sanjivaka's eye opening. "What should they have said?" prompt |
| 7 | Sanjivaka Recovers | Eyes open, head lifts, grass and water sparkle, "Let's help him get strong again!" |
| Game 1 | Moo Munch | External iframe (see below) → MUNCH, "MOOOOO!" beat, sound rings, birds scatter, animals startle. "What made that sound?" prompt |
| 8 | Meet Pingalaka | Proud lion → distant MOO → ears up, eyes wide, "O Man! What kind of monster…?" "Loud noise that scared you?" prompt |
| Game 2 | Pingalaka Panic Run | External iframe → "Everyone stay quiet!" → "…hid beneath a banyan tree" |
| 9 | The Lion Hides | Ministers (bear, deer), "Did you hear that?!", MOO, duck. "What do you do when scared?" prompt |
| 10 | Karataka and Damanaka | **Find the jackals**: tap the two bushes with peeking eyes (wrong bushes wiggle) |
| 11 | Two Very Different Jackals | Speech bubbles for both, "which one are you more like?" prompt |
| 12 | The Monkey Who Pulled the Wedge | Framed sepia cutaway: workers leave, the monkey pulls the wedge, CREAK… SNAP!, he leaps clear, freeze-frame. Non-graphic, per the script |
| 13 | What Have We Discovered? | Split screen: Sanjivaka grazing strong, Pingalaka hiding. MOO travels across the torn-paper divider |
| 14 | The Lesson | **Drag the glowing light** to THINK, or tap THINK. PANIC and FIND OUT give gentle spoken redirects; FIND OUT lights up on "discover the truth" |
| 15 | To Be Continued… | Jackals diverge, Karataka's warning, MOO, Damanaka's eyes widen and he smiles. "What happens next?" prompt, then the camera pushes into the dark forest onto Sanjivaka's shadow → end card ("A Story of Friendship, Fear & Cleverness · To Be Continued…") + book-close SFX |

### Foundation
- **Director**: each scene is an async script, and every wait is abortable. **Skip** (→ key) jumps cleanly to the next beat, and tapping the caption skips a single line.
- **Narration**: Web Speech API, preferring an `en-IN` voice, with per-character pitch and rate. When muted or unavailable, the captions are timed as reading pauses.
- **SFX**: all synthesized with Web Audio (moo, splash, crack, growl, creak/snap, chime, book close…). **Mute** (M key) silences both narration and SFX.
- **Arjun asks** prompts: a spoken question, an 8 s countdown and an "I answered! →" button. Autoplay continues on its own.
- **Deep links**: `#s7`, `#g1`, `#s12` and so on start at that beat when "Begin" is pressed. "Choose a scene" opens any beat.
- **Input**: pointer (mouse/touch) is the base layer for every interaction. Every draggable also works as a **tap**, and with Enter/Space from the keyboard, so no drag is ever required.

### Hand-drawn art layer (Rough.js)
Shapes are still built as plain SVG, the same way as before. Then `RK` (in `rough.src.html`) re-inks them:
- **Inked, filled shapes** keep their flat palette colour as an underlay. Rough.js draws a sketchy double outline plus a crayon hachure in a darker tint of that colour. These go in a `pointer-events:none` sibling right after the shape, so hit-testing, z-order and every parent animation (sway, bob, walk cycles, head poses) keep working.
- **Open strokes** (limbs, horns, branches, vines, wheel spokes) get their geometry swapped for a single wobbly Rough.js line.
- **Foliage** (tree canopies, bushes) gets hatch-only texture.
- **Seeds come from the geometry.** An ink stroke and the colour stroke on top of it wobble identically, and nothing "boils" between frames.
- **Left smooth on purpose:** skies and gradients, anything with a glow filter (magic light, fireflies, the THINK orb glow), class-animated details (eyelids, rings, sparkles), text, and shapes that are tweened directly.
- A `MutationObserver` on the scene inks shapes as scenes add them (bubbles, vines, jackals appearing…). Stroke widths and hatch density are corrected for each shape's on-screen scale.
- If `rough.js` somehow fails to load, the page logs a warning and shows the smooth art. Nothing else changes.

### Camera hand gestures (optional enhancement)
The ✋ button lazy-loads MediaPipe Hand Landmarker from jsDelivr and maps:
- palm position → cursor
- pinch or fist → grab
- open hand → release
- two palms together → namaste

Any failure (permission denied, no camera, blocked model download) shows a toast, and everything keeps working by touch.

**In the published claude.ai artifact the camera is refused by the host frame**, and the MediaPipe WASM and model fetches are also blocked by its CSP. The enhancement only works when `index.html` is hosted on its own (for example next to the games on R2).

## External games — integration contract

- Each game opens as a full-screen `<iframe>` at its beat. The director is awaiting it, so narration, ambience and autoplay are paused.
- `window.addEventListener('message', …)` logs **every** message whose `source` is the game frame. Each one goes to the console (`[game message]`), to `window.__gameMessages`, and to an on-screen log (the "N messages" chip in the game bar).
- A payload whose text matches `complete|finish|game over|game end|victory|all done|done|ended|won` ends the game automatically. Once the real event shape is known, tighten `COMPLETE_RE`.
- **Manual fallback, always present:** a "Continue the story →" button appears after **6 s if the frame has sent no message at all**, or after **25 s** regardless. If the frame never fires `load` within 9 s, a note offers "play it in a new tab". There's always an "Open in a new tab ↗" link, and **Skip** also ends the game beat.
- After Game 1: MUNCH → "MOOOOOOOOOOOOO!" beat → "What do you think made that big sound?" After Game 2: "…the mighty lion king ran deep into the forest and hid beneath a banyan tree."

### Did the iframes load inside the published artifact?
**Not verified, and expected to be blocked. Don't rely on inline play in the artifact.**
- The artifact host's content security policy doesn't allow embedding other sites in iframes. Inside the published artifact the r2.dev game pages will very likely show a blocked frame. The 6 s fallback then surfaces "Continue the story →" and the new-tab link, so the story still completes.
- I couldn't test the real links from the build environment: its network policy refuses `pub-3fdb2af8d94d4fcdb27b52da01c6c7d5.r2.dev` at the proxy. So neither game's real `postMessage` shape is known yet.
- **To check:** open the published artifact, start at `#g1`, and see whether the game renders. Then press "N messages" to see what the game posted.
- **To make the games play inline:** host `index.html` on the same R2 bucket, or on any origin without a restrictive `frame-src`. On the *same origin* you can also detect completion from the frame's DOM/globals instead of relying on `postMessage`.

## Tested (Rough.js edition)
- **Headless Chromium, every beat screenshotted**, to check the Rough.js inking (100–180 inked overlays per scene) and look for page errors.
- **A full autoplay run from Intro to the end card:** muted, with every interaction done by **real mouse drags** (namaste palms, packing goods, pulling vines, the THINK orb) and **mouse taps** (merchant, jackal bushes), every prompt answered with its button, and both games ended with "Continue the story →". No page errors.
- **Not tested:** real speech voices (headless has none), real camera hand tracking, the games themselves (their host is unreachable from here), and the page inside the claude.ai artifact frame.

## Open items
- The script's title card says `[next story]`. The end card uses the provided subtitle plus "To Be Continued…" until the next story's title is chosen.
- The artifact linked in the request (`ReCBQGZ4EirKSiEmT8XXfs`) is an unrelated third-party page (an Antikythera diving game), not a Merchant and the Bull build. So this edition is published as its own artifact.

---

## Painted edition (`painted.html`) — notes from the earlier pass

#### Assets in use (all from the provided references, re-encoded to WebP)
| File | Source | Size | Used for |
|---|---|---|---|
| `throne.webp` | King + sons, throne room | 1800², 180 KB | Intro |
| `banyan-sage.webp` | Vishnu Sharma + princes under the banyan | 1920×1080, 145 KB | Intro, Scene 1, Scene 12 opening |
| `forest.webp` | Bull / jackals / cart / lion establishing art | 2000×1116, 113 KB | Title, Scenes 3–11, 13, 15, game outros (via camera crops) |
| `*-soft.webp` | Pre-blurred 640px versions of the three | 3–7 KB each | Letterbox backdrop, bokeh backgrounds (Scenes 2, 6, 14, game cards) |
| `merchant.webp` | Merchant cutout (alpha-cropped) | 343×462, 21 KB | Scene 2 |
| `arjun.webp` | Arjun cutout (alpha-cropped) | 280×324, 17 KB | Narrator figure beside his captions + "Arjun asks" card |

#### How it's layered
- **Backgrounds** sit in an SVG camera group. `painted()` frames a point of the image at a zoom, `drift()` is the slow Ken Burns move, and `cam()` makes a deliberate camera move that cancels the drift. The camera never shows past the painting's edge. On wider or taller screens a blurred copy fills the letterbox.
- **Cutouts** are `<image>` layers with a soft ground shadow and a gentle idle bob/sway. There's **no blink swap**, because no eyes-closed frames exist.
- **Interaction layer**: the namaste palms, vines, "peeking eyes" rings and the THINK orb are drawn as glowing light, echoing the glowing story-animals in the banyan painting, so they read as magic rather than clashing with the art.
- All mechanics are unchanged: director, narration, mute/skip, tap/drag plus the optional camera, and the game contract.

#### Scene coverage
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

#### Blocked: the 9 assets to generate
**None were generated.** This session has no image-generation tool. The environment does hold AWS and GCP credentials, but I didn't use them to call a paid image model on your account without your say-so. No placeholder art stands in for these assets silently; the scenes they affect are marked ⚠️ above.

To add them: drop each finished file into `assets/`, add an entry to `ART` in `painted.src.html`, swap the crop or `cutout()` into the scene, then run `python3 build.py`. Suggested placements:
- #1 Nandaka → Scenes 2–3
- #2 / #3 Pingalaka → Scenes 8–9, 13
- #4 / #5 jackals → Scenes 10–11, 15
- #6 monkey, #9 wedge site → Scene 12 cutaway
- #7 mud pit → Scene 4
- #8 banyan hideout → Game 2 outro, Scene 9

Other art the script calls for that isn't in your list: **the servants** (Scenes 5–6), **Pingalaka's ministers** (Scene 9), **a worried/sad merchant** (Scenes 4, 6), **a Mahilaropya wagon-yard background plus cart and goods** (Scene 2), and **the log-site workers** (Scene 12).

