# Build notes: Dhanteras, The Ocean That Gave Us the Gift of Life

`dhanteras-ocean.html` is the single self-contained page. It is built from `src/` by `python3 build.py`. Pass an output path as the argument to also write the skeleton-free version used for the claude.ai artifact. The verbatim script lives in `source/story.md`.

The reference build `The_Ocean_of_Wonders.html` was the model for the page's chrome and its accessibility patterns:
- the bottom dock that holds captions, instructions and controls, so text never covers the painting;
- invisible keyboard buttons laid over the tap targets;
- the card tray that shrinks the painting above it;
- profile-faced devas and asuras;
- the camera that hides itself when it can't run.

The illustration was rebuilt as SVG with a shared `<pattern>` library, as the brief asked.

The separate Madhubani visual-description document was not supplied. The scenes follow the brief's art direction, character bible and per-shot staging.

## Shots and activities implemented (19 shots, 7 activities)

| Episode | Shots | Activity |
|---|---|---|
| 1 The Ocean That Held a Secret | 1.1 establishing ocean, 1.2 medallion cameos, 1.3 | **Wake Up the Ocean**: sweep the waves (3 sweeps), tap the glowing shell 3 times with the "Blub, blub, blub!" card, tap the central lotus 3 times with the chant card. All layers then wake together. Petal 1. |
| 2 The Mountain, the Serpent, and the Great Plan | 2.1, 2.2, 2.3, 2.4 | **Help Kurma Hold the Mountain**: a rewind swirl, then drag the handle down (it sinks by itself at the narrator's pace if the child doesn't drag), drag the two shell halves together, then drag the handle up and hold for about 2 s. Petal 2. |
| 3 Let the Great Churning Begin! | 3.1, 3.2 | **The Churning Challenge**: pull ×3 on alternating sides, churn ×3 (tap the mountain or draw a circle around it), then repeat. The 12-petal progress motif fills, then the "Ocean, reveal your magic!" chant. Petal 3. |
| 4 The Terrible Poison | 4.1, 4.2, 4.3 | **A Little Pause**: press and hold the heart-lotus (the ring grows while held and pauses on release), tap three silhouettes to send light, then three wish lamps, each with a CHILDREN chant card (tap the lamp, or it lights after about 4 s). Violet layers cross-fade to blue and gold. Petal 4. |
| 5 The Ocean Reveals Its Treasures | 5.1, 5.2 | **Reveal the Hidden Treasures**: drag a flower to Kamadhenu (she nods, low cow tone), swoosh upward from Airavata's trunk (petal spray), drag the seed up so Kalpavriksha grows, then tap or pull apart the petals over Lakshmi. Petal 5. |
| 6 The Divine Arrival of Lord Dhanvantari | 6.1, 6.2 | **Help the Divine Light Appear**: scrub the lotus centre (warmth meter), drag two light orbs to the lotus, then the chant twice. The lotus unfolds petal by petal and Lord Dhanvantari rises with the Amrit Kalash. Petal 6. |
| 7 What Is True Wealth? | 7.1, 7.2 | **Fill the Treasure Pot**: the only choice moment. Multi-select with at least one pick and no maximum. Each pick flies a token into the pot and it glows brighter. The lotus "I'm ready" button appears after the first pick. Petal 7. |
| Closing | C.1 | Seven recap medallions light in order, diyas light on the "Remember…" and "May…" lines, symbols light on the blessings, the badge blooms, and the end card offers "Play again". |

Every activity follows the same order: set-up narration, the child acts while characters react, then an outcome and the story continues. Each step has an idle rule: after about 15 s a hint line (with the demonstration hand), and about 10 s later the story assists. The Skip button also assists during an activity. Every target has a keyboard-reachable button.

**Choice callback.** The Episode 7 picks are saved to localStorage as `choices`, or `["all (auto)"]` if the pot filled itself. The callback is wired only in C.1: during the four "May…" blessings the chosen symbols glow brighter and sparkle, and the others light normally.

**Persistence.** localStorage holds only `ep` (the episode reached), `petals` (7 flags), `choices` and `done`, and every read and write is wrapped in try/catch. "Continue: Episode N" resumes at the start of the last episode reached. With storage blocked, the story still plays.

## Camera, hand and face tracking

- The camera is opt-in through the camera button and never needed to progress.
- Libraries are loaded on demand as scripts from `cdn.jsdelivr.net`, pinned to `@mediapipe/hands@0.4.1675469240` and `@mediapipe/face_mesh@0.4.1633559619` (the same pins used in the earlier builds).
- **On the claude.ai artifact host, the camera is refused**: there is no camera capability for this account, and the CSP blocks the libraries' runtime model and wasm fetches. Any failure hides the camera button silently and tap/drag continues. Tap/drag fallback is what runs there.
- I could not test the tracking itself in this container: there is no camera, and jsdelivr is unreachable from it.
- When it does run, hand and face input map onto the same handlers as touch:
  - A pinch acts as a finger.
  - The hand's sideways sweep drives the waves in 1.3.
  - Two hands coming together count as a clap (1.3) or close the shell (2.4).
  - Hand height lowers and raises the mountain, and the lift needs an open hand.
  - A circular motion churns.
  - A raised arm swooshes the trunk, and hand height grows the tree.
  - Two open hands part Lakshmi's petals.
  - Rubbing palms adds warmth.
  - An opening mouth releases bubbles (1.3) and sparkles the lotus during the 6.2 chant.

## Speech

- Narration uses the browser's `speechSynthesis`. The Narrator prefers an en-IN, then a natural or neural, female voice. Lord Vishnu is low and slow, the devas brighter and higher, the asuras lower and steady, and the devas and asuras together use a middle voice. Dialogue inside quotation marks is spoken in the character's voice and the attribution tag in the Narrator's.
- The Narrator's mood changes by episode: a touch faster and brighter in Ep3, softer, lower and quieter in Ep4, slower building in Ep6.
- Cues such as glimmers, the mountain steps and symbol glows fire on the browser's word-boundary events where available, and otherwise on a timing estimate.
- **If no voice is available or the sound is muted,** captions still advance on a reading-time estimate of about 62 ms per character, so the story never stalls. Headless test browsers had no voices, which exercised this fallback. I didn't hear a real voice in this session.

## Added lines (not in the story document)

**Idle hints (Narrator, 8 words or fewer):**
- 1.3: "Swish your finger across the waves!", "Tap the glowing shell, blub, blub!", "Tap the lotus three times!"
- 2.4: "Slide the mountain gently down.", "Push the two shell pieces together.", "Slide the mountain up, then hold!"
- 3.2: "Tap the rope on each side!", "Tap the mountain to turn it!"
- 4.3: "Press and hold the glowing lotus.", "Tap each friend to send light."
- 5.2: "Drag a flower to Kamadhenu.", "Swoosh up from the trunk!", "Drag the seed up to grow!", "Tap the lotus petals to open."
- 6.2: "Rub the glowing centre back and forth.", "Bring the little lights to the lotus."
- 7.2: "Tap any treasure for your pot."

**"Previously…" lines (only on resume, or before Episode 1 on a replay):**
- Ep1 (replay): "Previously, we sailed the Ocean of Wonders together. Let us sail again!"
- Ep2: "Previously, we woke the sleeping Ocean of Wonders."
- Ep3: "Previously, Kurma held the mighty mountain steady."
- Ep4: "Previously, we pulled and churned the great ocean."
- Ep5: "Previously, Lord Shiva protected all of creation."
- Ep6: "Previously, the ocean revealed its wonderful treasures."
- Ep7: "Previously, Lord Dhanvantari rose with the pot of amrit."
- Closing: "Previously, we filled our magical treasure pot."

**Spoken title cards:** "Episode N. ‹story-doc title›" and "A Little Light for Dhanteras".

**UI labels:**
- start card text and "Begin the adventure" / "Continue: Episode N";
- the dock instructions (one per activity step, for example "Drag the two shell pieces together.");
- counters ("1 of 3 sweeps");
- chant-card headers ("Say it softly", "Everyone together", "Children");
- the "I'm ready" button and "Play again";
- accessible button labels.

## Simplified or adjusted

- **Two-armed Dhanvantari.** He is drawn two-armed, holding the kalash at chest level. Skin tones as proposed: Dhanvantari and Lakshmi ochre, Shiva ivory, Vishnu sea-blue.
- **Halahala** is a contained, rounded swirl. It rises at the centre in 4.1 and, in 4.2, starts low beside Shiva and enters his throat from below, never crossing a face.
- **Picture cards.** In 7.2 the Narrator reads each card's label in sentence case ("Good health. Taking care of our bodies and minds."). The card shows the uppercase label as in the document.
- **The "Blub, blub, blub!" line** gets a read-along card, so the child can say it while tapping the shell.
- **Heavy-object icons.** The three folk icons in 2.1 (chest, stool, clay toys) stay up through "Perhaps a big box, a table, or a pile of toys?" and fade after it, not straight after the 2-second pause, so the line still has something on screen.
- **Asuras and the rope.** In 6.1 the asuras face their rope end at first and turn to the centre on "Everyone turned towards the glowing ocean".
- **The sunken mountain** is hidden behind a waterline foam crest. Kurma is drawn visible in the water, Madhubani cutaway style.
- **Dashes in speech.** The em-dash is read as a pause in speech only; captions keep the verbatim text.
- **Ambient music** is a soft synthesised drone with pentatonic plucks. It drops to near silence for Halahala and swells at the end of Ep4, at Dhanvantari's reveal and in the Closing.

## Script inconsistencies and how each is handled

1. **Ep6 narrates Dhanvantari as already emerged,** while the activity treats the lotus as closed. 6.1 shows only a pale golden outline and a glint where the kalash will be. The full reveal waits for "And there He is!" after the second chant.
2. **The "beautiful meanings…" line appears twice in Ep6, worded differently each time** ("…we can carry into Dhanteras, a festival…" and "…we can carry with us into Dhanteras."). Both are kept verbatim.
3. **Ep5 narrates the horse and jewels, but the activity and the recap omit them,** and the narrated order differs from the activity order. The horse and jewels open by themselves during the narration. Kamadhenu, Airavata, Kalpavriksha and Lakshmi rise as peeking golden outlines behind half-closed lotus doors and open in the activity, in the activity's order.
4. **Ep2 narrates the sinking and the rescue, then the activity replays them as if happening now.** A soft wave swirl rewinds the scene before the activity starts.
5. **Ep1 mentions Vishnu, the devas and the asuras, but Scene 1 has no characters.** They appear as circular medallion cameos over the ocean. Vishnu's medallion later dissolves into Kurma's shell (2.3) on "He took the form of Kurma".
6. **The visual description's Scene 7 title differs.** The story's "What Is True Wealth?" is used.
7. **The Ep7 "magical treasure pot" is drawn as the Amrit Kalash,** with tiny carved lotus flowers around it.
8. **Smaller point.** The Closing's "Remember…" diya cues include the line "…remember the great Ocean of Milk", which uses a lowercase "remember" inside a longer sentence. That line lights the first of the four diyas.

## QA performed

- A fast run through all 19 shots, then screenshots of a late frame of every shot at 1280×720 and at 390×844. A second pass paused at the start of every activity step.
- Fixes made after review:
  - The serpent's head was clipped by the frame.
  - The gallery medallion was clipped at the top.
  - The closing medallions overlapped the symbols in portrait.
  - The ocean band overflowed when the end card shrank the painting.
  - Several elements were too small: the pause scene, Dhanvantari, and the portrait fish and lotuses.
  - The portrait picture cards were too tall.
- Live pointer tests (real mouse drags and clicks, normal speed) on 1.3 (sweeps, shell, lotus), 2.4 (lower, join the shells, lift and hold) and 7.2 (two cards, then "I'm ready"). The stored choices were `["health","wisdom"]`.
- Resume test: "Continue: Episode 3" plays the "Previously…" line and keeps 2 badge petals. Blocked localStorage plays without errors.
- Not tested: a real camera, real voices, and the claude.ai host's CSP behaviour for the camera libraries.
