# The Secret of a Happy Home — build notes

Episode 2 of the Diwali story series (ages 6 to 14), following Episode 1, "The Mystery of the Golden Lotus". A single self-contained
HTML file (`diwali-happy-home.html`) built with `python3 build.py`. The build takes Episode 1's modules as they are from
`../diwali-golden-lotus/src` (patterns, motifs, Lakshmi, the Golden Light, the Diwali home, the lotus, the director, scene kit, input and
camera) and adds this episode's files from `src/`. Everything is drawn in code as SVG; all sound is Web Audio or speech synthesis.

## Important: the story document was not attached
The brief's "attached story document" and "attached visual storyboard" were not supplied. Every line the brief quotes word for word is in
`src/05_script.js`. Every line the brief names only by its first and last words is marked `PENDING` there and is **skipped, not improvised**,
so the episode currently plays with gaps in the narration (the staging still plays: actions tied to missing lines run on a timer).
Pending lines (open the page with `#qa` and call `__qa.pending()` after a run to list the ones reached):
- Shot 1.1: the rest of the welcome, ending "...in our last adventure."
- Shot 1.2: everything after "Today is Diwali!", ending "...getting the puja space ready."
- Shot 1.3: the lines between "The little golden light floats around the room." and the question, its attribution, and any lines before "What do you think, children?"
- Shot 2.6: the lines after "The home is ready, the rangoli is complete and the diyas are glowing.", ending "...one more important lesson to share!"
- Shot 3.1: the attribution before Grandmother's question
- Shot 3.2: Grandmother's lines between "Grandmother says:" and "When we care for others, we spread happiness."
- Shots 3.3 and 3.4: any narration before each secret
- Shot 3.5: the lines around "These are wonderful blessings!", ending "...time for a prayer."
- Shot 4.1: the attributions and lines around Grandmother's verse introduction
- Shot 4.5: the lines between "Wonderful, children!" and "What could it be?"
To finish, paste each exact line into `SCRIPT` in `src/05_script.js` (voice `narr`, `gran` or `light`) and rebuild.

## What was built
All 20 shots and all activity beats, in order, after a title card ("Begin the story" unlocks audio):

| ID | Shot | Notes |
|---|---|---|
| 1.1 | The Golden Light Returns | the home with a partly made rangoli and three unlit diyas; the girl and boy busy; the Light floats in from the left third to the doorway |
| 1.2 | A Home Full of Activity | girl colours the rangoli, boy passes flowers to Mother, Mother hangs a garland above the entrance, Father lays a row of diyas, Grandmother places a flower on the puja platform (in the cutaway) |
| 1.3 | The Big Question | Light at 9% width, tours the room, stops, tilts, a question mark appears; the question shows in a cream panel; 3-second hold; the question mark becomes three icons that fly to the top |
| 2.1 | Enter the Decoration Activity | family steps out; three task icons appear one by one; first icon pulses; instruction in the top banner and read aloud |
| 2.2 | Activity 1A, Decorate the Doorway | five garland slots on the arch, only the next one glows; drag, or tap a flower then tap the spot; wrong drops glide back and the Light tilts |
| 2.3 | Activity 1B, Place the Diyas | overhead floor; six glowing places round the rangoli accept any diya; the Light sparkles at the wick and the flame lights |
| 2.4 | Activity 1C, Complete the Rangoli | four sections (petal, diamond, leaf, circle) with faint outlines; each motif fills only its own section; a wrong drop glides back while the Light points at the right one |
| 2.5 | The Home Glows | entrance diyas light one after another, puja diyas light, placed diyas brighten, warm swell, family returns smiling, sparkle above the door, all three ticks |
| 2.6 | What Is Lakshmi Puja? | puja view; Grandmother gestures to the offerings; lotus motifs appear round the framed Lakshmi; she then beckons the children |
| 3.1 | Grandmother's Question | seated on a floor mat; brows rise; the children shake their heads; three fingers |
| 3.2 | Secret One: Care | vignette: flowers fall from the girl's basket, the boy kneels to help, a heart appears, then becomes a bowl of sweets |
| 3.3 | Secret Two: Sharing | the boy offers a sweet, the girl accepts, both smile, a flower appears, then becomes a sun |
| 3.4 | Secret Three: Gratitude | children fold their hands, Grandmother nods, the Light glows, flowers ring the family, the sun appears |
| 3.5 | The Real Beauty of a Home | heart, flower and sun in a triangle, then settle toward the border; the Light moves toward the puja area |
| 4.1 | Gathering for Prayer | evening; hands folded; the Light is still; lotus motifs reveal round the frame |
| 4.2 | Introducing the Shloka | Lakshmi left, cream panel right (about 46% wide); verse chanted once at 0.55 with line highlights and Pause/Replay; transliteration, then Meaning (read by the Narrator), then the vocabulary lines |
| 4.3 | Activity 2, Find the Divine Symbols | three cards (column in portrait); label appears and is spoken; the discus turns once, the mace rises; reopen any time; completion flowers |
| 4.4 | Activity 3, Learn the Shloka | the five steps; a small Light glides in a lane under the line being chanted; 6-second pause then Continue; Replay any time; Pause/Play; music-only toggle; lotus on completion |
| 4.5 | The Family Is Ready to Pray | the Light turns to the sweets plate in the lower right and floats toward it; the camera follows |
| 4.6 | The Mystery of the Sweets | no narration; flat low-pattern background; the diya flickers, the Light approaches, leans in, sparkles, holds; then a resting screen with the title and "Play again" |

### Stored state
- localStorage key `diwali.happyHome.ep2.progress`: `{ "scene": 1..4, "done": bool, "tasks": { "flowers", "diyas", "rangoli", "symbols", "shloka": true }, "next": { "episode": 3, "startAt": "sweets-plate" } }`.
  `done` and `next` are written when Shot 4.6 ends, so Episode 3 can start at the sweets plate. "Continue" on the title card resumes at the start of the last scene reached.
- All storage is wrapped in try/catch; the story runs normally without it. Episode 1's blessing choices are not read (no callback is scripted).

### Reusable for Episode 3
- `familyHome(parent, {garland, rangoli, ring, lit, puja})` in `src/24b_home2.js` extends Episode 1's `diwaliHome`; `DONE_STATE` is the finished Diwali home. The doorway, rangoli, wall and puja platform are fixed.
- `Person(kind)` in `src/21_people.js` (gran, mother, father, girl, boy) with poses: idle, namaste, gesture, gestureL, point, three, hold, offer, reach, up, place, basket; seated; nod, shake, brow, smile.
- `goldenLight(parent, {variant})`: `'flame'` here (Episode 2's storyboard), `'flower'` for Episode 1's design. Episode 1 is unchanged.
- `sweetsPlate()`, `lakshmiFrame()`, `rangoli2()`, `symbolArt()`.

## Camera and hand tracking
Same as Episode 1: the camera button loads MediaPipe Hands 0.4.1675469240 from cdn.jsdelivr.net. A pinch acts as a tap; pinch-and-move drags
(it feeds the same down/move/up handlers as touch). In the claude.ai artifact frame the camera is refused and the model files are blocked by the
content-security policy, so the button hides itself and tap/drag is what runs there.

## Voices
- Narrator: the best English voice available. Grandmother: a different English voice where one exists, pitch 0.78 and rate 0.8 (lower and slower). The Golden Light: Episode 1's voice settings (pitch 1.8, softer).
- Shloka: a Hindi (hi-IN) voice, one utterance per line, rate 0.55 for learning and 0.7 for the full chant. Without a Hindi voice (or when muted) each line is a timed highlight with a soft chime and a "Listen along" badge shows on the panel. The test browser had no voices at all, so captions advanced on timers and the badge showed.
- Accuracy: browser Hindi voices read this as modern Hindi. Expect "ऽ" (avagraha) to be ignored, "ङ्ख" and "क्ष्म" conjuncts to be simplified, and final vowels and visarga softened. Good enough to listen along; a recorded chant would be needed for accurate Sanskrit.

## Added lines and labels
Hint lines (Narrator, as listed in the brief): "Drag a flower to the glowing spot!", "Drag a diya next to the rangoli!", "Drag a colour into an empty space!", "Tap a glowing symbol!", "Press Continue when you're ready!".
UI labels: "Begin the story", "Continue", "Play", "Pause", "Replay", "Play again", "Listen along" (no-Hindi-voice badge), the episode title, the symbol labels from the script, and an icon-only music toggle (labelled for screen readers).
The step 2/4 "Listen Again" button is labelled "Replay" to stay within the allowed labels.

## Cut or simplified
- The "patterned reveal" of the home in 1.1 is a short settle of the camera with a cross-fade.
- Shot 2.4's pull-back is a cross-fade to the wide home in 2.5.
- Grandmother's eyebrow raise and the children's head shakes are small; no other facial animation.

## Script inconsistencies and how each was handled
1. "Help the family prepare for Lakshmi Puja!" is an instruction: shown in the top banner and read aloud.
2. "Listen carefully, children!" is spoken once, as the last line of 4.1.
3. Meaning and vocabulary are spoken at the end of 4.2; "Now, let's chant the shloka together!" opens 4.4.
4. The vocabulary names the symbols before Activity 2: kept as reinforcement.
5. Placed diyas light on placement (2.3); entrance and puja diyas light in 2.5.
6. The Golden Light uses the storyboard's flame shape via `variant:'flame'`; Episode 1 keeps the flower orb. Needs your confirmation.
7. Mother and Father have proposed designs (leaf-green sari; deep-indigo kurta).
8. Lakshmi's hands keep Episode 1's lotus buds; the conch, discus and mace appear only on the cards. Needs your confirmation.
9. The Meaning is read by the Narrator.
10. The 4.2 panel is about 46% wide in landscape so all three text blocks stay readable.
11. 4.6 uses a flat low-pattern background, no blur.
12. The diya flicker before the Light moves to the sweets is included.
13. (New) The story document was missing; see the pending lines above.

## Palette
Episode 1's 15 tokens plus warm-brown #A8643A, deep-red #A81E1E, warm-grey #B9B2A8, magenta #C2297D and teal #0F8F94. Opacity only cross-fades flat layers.

## Published
https://claude.ai/artifact/XTe7VZkEdoHtYQakQUCCuv (Episode 1, which links here: https://claude.ai/artifact/8Ypb2Xq8wXemZ2QCMrbTCr)

## QA hook
Open with `#qa`; `__qa.go('2.3','act')` fast-forwards to a point in a shot; `__qa.pending()` lists the script lines still missing.
- The resting screen links to Episode 3 ("Next: Episode 3", a UI label added later): https://claude.ai/artifact/Y67kcj9fuineFNH9qE2z2z
