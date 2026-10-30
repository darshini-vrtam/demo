# The Mystery of the Golden Lotus — build notes

Episode 1 of the Diwali story series (ages 6 to 14), following the Dhanteras adventure. A single self-contained HTML file
(`diwali-golden-lotus.html`), built from `src/` with `python3 build.py`. Everything is drawn in code as SVG with shared
`<pattern>` fills; all sound is Web Audio or the browser's speech synthesis. There are no image or audio files.

## What was built

All 14 shots and all 4 activities, in story order, after a title card ("Begin the story" unlocks audio, then autoplay is continuous):

| ID | Shot / activity | Notes |
|---|---|---|
| 1.1 | Returning to the Ocean of Milk | the great churning from the Dhanteras story (ported from its build, per a later request): devas on the left and asuras on the right pull Vasuki round Mount Mandara on Kurma; the churn speeds up on "the great churning continued"; slow push-in. This replaces the brief's faint Mandara/tortoise callback |
| 1.2 | The Treasures Emerge | Kamadhenu, Airavata, Kalpavriksha rise from the waves on their names, each in its own circular backdrop (concentric rings / petal ring / dotted ring) |
| 1.3 | The Golden Mystery | deepest indigo, concentric circles under the rising closed lotus, golden seams pulse between its petals, small golden flowers float over the water, treasures small in the distance |
| INT-01 | Discover the Treasures | any order; golden outline, its own animation, name spoken and shown, floral confirmation; never resets; misses ripple; 15 s hint then auto-discover |
| INT-02 | Reveal the Lotus | the lotus is the only target; outer petals open first, then inner; golden flowers spread over the water; rising cue, chimes, warm music; 15 s hint then it opens itself |
| 2.1 | Goddess Lakshmi Appears | four-armed seated Lakshmi; halo glow; floral ring; two Devas each side bow; the Golden Light floats near the lotus silently |
| 2.2 | What Does Prosperity Mean? | cream field; symbols pop in on the words that name them; the Golden Light traces a loop round each; spins on "happiness" |
| 3.1 | The Golden Light's Invitation | the Light floats down in three moves along a trail of tiny flowers and speaks its message |
| 3.2 + INT-03 | Find the Blessings | six cards (2×3, or 3 rows of 2 in portrait); toggle select; lotus-shaped Continue after one pick; 15 s hint, then the Light picks all six and the story continues; afterwards the Light touches every unpicked card so all six glow |
| 3.3 | A Message of Gratitude | the cards gather into a circle round the Light; Lakshmi in a medallion; the Light unfolds into a floral pattern; camera moves in |
| 4.1 | The Prayer Appears | indigo ground with symmetrical lotus motifs; Lakshmi right (medallion on top in portrait); the cream panel's border draws itself; lines and transliteration appear |
| 4.2 | The Shloka in Devanagari | meaning panel appears last; Narrator reads the meaning, then the two restored lines |
| INT-04 | Listen and Repeat | Stage 1 listen, Stage 2 repeat each line with a 6 s pause, Listen Again, Continue; Stage 3 chant together, phrase by phrase |
| 4.3 | The Golden Light Celebrates | spin, floral pattern, flowers and unlit diyas along the lower edge, then the Light turns right and leaves |
| 5.1 | The Diwali Home | evening sky, trees, home, garlands sway, rangoli brightens, diyas stay unlit; slow push-in |
| 5.2 | The Question Before the Next Adventure | the Light pauses outside, twinkles, goes through the open doorway; a golden floral motif shows inside |
| 5.3 | Episode-End Card | title and "What makes a home truly special?", Light beside a small pink lotus, then a calm resting screen with "Play again" |

### Reusable for Episode 2
- `src/23_light.js` — `goldenLight(parent,o)`: the Golden Light with all five states (`float`, `still`, `travel`, plus `pulse()` and `spin()`), its trail, glow and floral unfold.
- `src/24_home.js` — `diwaliHome(parent,{lit,doorOpen,rangoli})`: the home (doorway, garlands, rangoli, diyas, pots, petals); `homeTree()` for the framing trees. Set `lit:1` to light the diyas.
- `src/22_lakshmi.js` (`Lakshmi`), `src/26_lotus.js` (`bigLotus`), `src/25_blessings.js` (`blessArt`, `BLESS`).

### Activity 3 callback storage
- In memory: `window.EP1_MEMORY.blessings = { selected: [...], auto: bool }`.
- In localStorage, key `diwali.goldenLotus.ep1.blessings`: `{ "episode": 1, "selected": ["family","friends","play","book","food","coins"], "auto": false }`.
  `selected` holds only what the child picked (before the Light touched the others); `auto: true` means the idle assist picked them.
- Progress, key `diwali.goldenLotus.ep1.progress`: `{ "scene": 1..5, "done": bool }`. "Continue" on the title card resumes at the start of the last scene reached.
- All storage is wrapped in try/catch; the story runs normally with storage blocked.

## Camera and hand tracking
The camera button loads MediaPipe Hands 0.4.1675469240 from cdn.jsdelivr.net (script only). In a pinch, the fingertip acts as a tap on the painting
or on any on-screen button. Inside the claude.ai artifact frame the camera is refused without a prompt, and the library's model files are fetched at
runtime, which the content-security policy blocks. Either failure hides the camera button silently and the story stays on tap/drag. Expect tap/drag to
be what runs in the hosted artifact; hand tracking can only work when the HTML file is opened directly in a browser with network access.

## Voices
- Narrator: the best English voice the browser offers (en-IN preferred, then a natural/neural voice, then en-GB).
- Golden Light: a different English voice where one exists (a female voice is preferred), always at pitch 1.8 and a little softer, so it is clearly higher than the Narrator even when only one voice exists.
- Shloka chant: a Hindi (hi-IN) voice at rate 0.55, one utterance per phrase.
- If the browser has no voices at all, captions advance on timed estimates and the story still plays.
- If there is no Hindi voice (or the sound is muted), the chant becomes a timed phrase highlight with a soft chime, and a visible "Listen along" badge appears on the panel.
- Accuracy: browser Hindi voices read Devanagari as modern Hindi, not Sanskrit. Expect a reasonable reading of the words but imperfect Sanskrit features: the inherent vowel and visarga (नमः) are often softened or dropped, and conjuncts such as "र्व" or "क्ष्म" may be simplified. It is fine for listening practice; a recorded chant by a Sanskrit speaker would be needed for accurate pronunciation.

## Added lines (builder additions)
Idle hints, Narrator's voice, 8 words or fewer:
- "Tap a glowing treasure!" (INT-01)
- "Tap the glowing lotus!" (INT-02)
- "Tap the pictures you love!" (INT-03)
- "Press Continue when you're ready!" (INT-04, Stage 2)

UI labels: "Begin the story", "Continue" (title card resume, Activity 3, Activity 4), "Listen Again", "Play again", "Listen along" (no-Hindi-voice badge), the
episode title on the title card and resting screen, the card captions from the storyboard's card list, and the treasure name tags (the treasures' names).
On-screen instructions are the storyboard's, shown in the dock and read aloud by the Narrator.

## Cut or simplified
- The storyboard's Shot 2.1 transition ("halo patterns become motifs around the caption panel") is simplified to the halo rings expanding while the camera moves in, then a cross-fade.
- The treasure name is spoken by the Narrator (no separate optional name audio).
- Hand tracking supports pinch-to-tap only; no face tracking (none needed).

## Script inconsistencies and how they were handled
1. Storyboard Shot 3.2 lists "Would you like to learn a beautiful prayer…" as narration before the blessing activity; the story doc has it only after, whispered by the Light. Spoken once, in Shot 3.3, in the Light's voice. Shot 3.2 has only the on-screen instruction.
2. The storyboard omits "Her blessings remind us to be kind, grateful and generous." and "Now, let's learn it one line at a time!". Both are spoken, in that order, at the end of Shot 4.2.
3. Shot 1.3 shows the treasures small while Interaction 1 needs them large and tappable. INT-01 keeps the closed lotus small at the upper centre and brings the treasures back to their Shot 1.2 left/centre/right order along the lower portion; the full silhouette and backdrop is the tap target.
4. The Golden Light is drawn in Shots 2.1 and 2.2 before Shot 3.1 introduces it. Kept as a silent presence.
5. Interaction 3 says the selected cards gather round the Light, but Shot 3.3 shows all six. The Light touches every unpicked card on "Every one of these can be a blessing.", so all six glow and all six gather.
6. The storyboard's Shot 2.2 symbol order differs from the narration. Symbols appear in narration order; "happiness" has no symbol, and the Light spins instead.
7. It is ambiguous whether the Meaning is read aloud. The Narrator reads it once in Shot 4.2; the shloka itself is first chanted in Activity 4, Stage 1.
8. The story doc has "And now, something magical is happening!" in Scene 2; the storyboard opens Shot 3.1 with it. The storyboard's placement is used.

Also noted: the storyboard's Shot 2.2 describes "gold coins and jewellery" while the Activity 3 card is "gold coins"; the 2.2 symbol shows coins with a necklace, the card shows coins only.

## Palette
Only the 15 brief tokens appear in the illustration (night-indigo #121649, deep-indigo #23297A, ocean-blue #2C7CC4, turquoise #17B2AE, cream #FFF4D9,
foam-white #FFFFFF, coral-pink #F2755E, lotus-pink #E45C9A, vermilion #E03C1F, mustard #E3A700, golden-yellow #F5C400, leaf-green #3F9B49,
ochre #D9964B, terracotta #C25E3A, black #111111). Opacity is used only to cross-fade flat layers. Page chrome has light and dark tokens drawn from the same set.

## Published
https://claude.ai/artifact/8Ypb2Xq8wXemZ2QCMrbTCr

## QA hook
Open with `#qa` and call `__qa.go('2.1','end')` (or `'late'`, `'act'`) in the console to fast-forward to a point in a shot.
