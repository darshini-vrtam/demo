# Rama's Journey from Darkness to Light: build notes

`diwali-rama.html` holds both episodes (all 18 scenes) in one self-contained file of about 245 KB. Every illustration is drawn in JavaScript as SVG with custom pattern fills. The file loads no external images and no recorded audio.

- **Build:** `python3 build.py` concatenates `src/` into `diwali-rama.html`. `python3 build.py out.html` also writes the hosted variant, without the doctype or head skeleton.
- **Script check:** `python3 check_script.py` plays both episodes headless, logs every spoken line, confirms each one appears verbatim in `source/narration.md`, and checks the Devanagari against the supplied shloka.
- **QA hook:** open the file with `#qa`. `__qa.go('2.5','act'|'late'|'end',{from:true})` jumps straight to a point in any scene. Press **T** for the timing overlay.

## Scenes and activities implemented

| Ep | Scene | Notes |
|---|---|---|
| 1 | Title card | Typeset over the opening picture. Shown, not spoken. |
| 1 | 1.1 Golden City of Ayodhya | The sun rises and the camera glides from the homes to Rama, Sita and Lakshmana. Peacocks flutter, the pond shimmers, petals drift, townspeople watch. Rama turns to the road. The transition is vines growing across the frame. |
| 1 | 1.2 A New Life in the Forest | Three keyframes: the peaceful forest, the departure (Ravana stands respectfully without weapons, then a distant chariot flies to Lanka), and Rama's discovery under more indigo. Patterned wipes link them. |
| 1 | 1.3 Follow the Forest Clues | Flower, footprints and a path between two trees, accepted in any order. Golden pulses take turns over the clues, and each find leaves a dotted trail. A tap on the tangled side or an empty spot gets a gentle line from Lakshmana plus a hint pulse. The footprints and path then join into one glowing route. |
| 1 | 1.4 A Brave Friend Appears | Hanuman leaps in through spiralling leaves, then the greeting, the leap across the ocean, and the Ashoka grove. He kneels and presents the ring, Sita's face moves from sad to hopeful, and a lotus blooms. The ring's circle then opens into an ocean motif. |
| 1 | 1.5 Help Hanuman Deliver the Ring | A left-to-right route of eight stepping points, with a golden highlight travelling along it. The child drags Hanuman or taps the next step. If the child strays, Hanuman hops back onto the path with a gentle line. |
| 1 | 1.6 The Ocean Challenge | Wide patterned ocean with Lanka on the horizon. Hanuman returns and gestures, Rama nods, the vanaras carry stones and branches, and dotted lines reach across the water. |
| 1 | 1.7 Build the Bridge to Lanka | Six slots. The child drags a stone into a gap, or taps a stone and then a gap. Stones settle with a bounce and get linking lines, a mis-drop floats back with a friendly line, and the vanaras celebrate at the end. |
| 1 | 1.8 The Journey to Lanka | The army marches across the bridge, the gates open slowly, and the scene holds. End card: "Continue the adventure in Episode 2." It flows on after 14 s, or straight away from the button. |
| 2 | Recap and title card | The gates of Lanka open, framed by gate-pattern transitions. |
| 2 | 2.1 The Battle for Hope | Symbolic combat: stylised arrows, soft slow shield flashes, swirls and dust. The final arrow reaches Ravana's defensive ring, his weapons lower, his heads bow and his energy fades. The reds soften to gold. |
| 2 | 2.2 Sita and Rama Reunite | They recognise each other and step together. Lakshmana smiles, Hanuman bows, flowers bloom along the border, petals drift, and a vignette of Ayodhya appears. |
| 2 | 2.3 The Journey Home | The Pushpaka Vimana carries the three over flat scrolling bands of hills, forest, fields, river and villages. The fields turn gold and Ayodhya grows on the horizon. |
| 2 | 2.4 Ayodhya Gets Ready | Sweeping, rangoli, garlands, sweets and unlit diyas being placed, while the sky shifts from afternoon to twilight. |
| 2 | 2.5 Light Up Ayodhya | Seven diyas (twelve originally; five rooftop and window lamps were removed in revision 10): four on the street, two on doorsteps and one at the palace entrance. None starts lit. Each tap lights a flame and reveals a patch of gold pattern that spreads to neighbouring lamps. A tap elsewhere makes the nearest diya pulse. The palace diya opens last and warms the whole city. |
| 2 | 2.6 Rama Returns to Ayodhya | The gates open and the three enter. Families wave and scatter petals, rangoli covers the ground, foreground diyas glow, and a gold halo expands at the peak. |
| 2 | 2.7 What Does a Diya Teach Us? | One diya on indigo. Four vignettes appear on their narration words (comforting, helping, sharing, caring for a plant), join into one circle, then contract. |
| 2 | 2.8 The Sacred Shloka | Each line is revealed and recited with its transliteration beneath, followed by a 3.4 s repeat pause. Then the meaning, the closing narration, and a second recitation with motion stilled. Music is near-silent throughout. |
| 2 | 2.9 Make Your Diya of Kindness | Four equal medallions. The child picks one (its own sound and caption, golden highlight), then decorates the diya by tapping or dragging flower, leaf, dot and geometric motifs. The flame lights and the chosen deed appears as typeset text beside the lamp. |
| 2 | 2.10 Carry the Light Within You | Night city with roughly 150 lamps, the four heroes, families sharing and helping, and the child's diya with golden links to the city. The camera pulls back, a floral circular frame forms, and the scene holds. End card: "DIWALI STORIES OF INDIA / The light lives on in you." |

**Choice callback:** the deed picked in 2.9 is saved to `localStorage` (`diwali.rama.v1`, wrapped in try/catch) and shown as a small medallion icon beside the child's diya in 2.10. It is stored only when the child taps. If the idle auto-assist picks a deed, nothing is stored and the callback icon is skipped.

**Idle rule:** every activity gives a spoken hint plus a demonstration hand after about 15 s without input, then auto-assists after about 10 s more. The story never stalls.

## Camera and tracking

- The optional camera uses MediaPipe Hands and Face Mesh from jsDelivr, pinned to exact versions. Pinch acts as a tap or drag, an open hand steers Hanuman in 1.5, and a smile in 2.6 makes Rama and Sita smile back.
- Under the claude.ai artifact host, camera access is not one of this account's runtime capabilities, so `getUserMedia` is refused. The camera button then hides itself silently and tap/drag is the input. In headless testing the camera was also unavailable, so the camera path is untested. Only the fallback was exercised, with real mouse clicks and drags in 1.3, 1.5, 1.7, 2.5 and 2.9.
- In the standalone file opened directly in a browser, the camera path will work if the browser grants permission.

## Speech
- **Recorded narration (preferred).** All 96 spoken lines come from ElevenLabs: voice "Krishna - Energetic and Expressive" (`m5qndnI7u4OAdXhH0Mr5`), model Eleven v3, one take per line. Each prompt is the verbatim line with one leading v3 mood tag (for example `[warm]`, `[tense]`, `[joyful]`, `[slow, reverent]` for the shloka). The tag sets delivery and is not spoken. The shloka clips speak the Devanagari exactly as typeset.
- Clips live in `audio/<id>.mp3`. The id is the FNV-1a hash of `voice|text` in base 36 (`Clips.id`), so any edit to a line's wording orphans its clip and that line falls back to the browser voice. `build.py` embeds the list of ids present as `CLIP_IDS`.
- Playback order for each line: the clip, then the Web Speech API voice, then timed captions. Clips play at rate 1.0. Captions page at a fixed 150 characters in every orientation, so each part matches its clip.
- `check_script.py` now also reports any spoken line without a clip (currently 0 of 86 lines, plus the 4 shloka lines).
- Recorded narration totals about 7.8 minutes.
- **Fallback.** The Narrator gets the best English voice available, preferring en-IN. Rama, Sita, Lakshmana, Hanuman and Ravana each get their own pitch and rate. The shloka uses a Hindi voice for the Devanagari if the device has one, otherwise a transliteration. With no voices, or with sound muted, captions advance on a reading-time estimate.
- **Hosting.** The page fetches `audio/*.mp3` relative to itself. Opened as a lone file without the `audio/` folder, it falls back to browser speech. The published artifact is sent with every clip in its `files` map.


## Music and sound effects
- All recorded in ElevenLabs: 36 files in `sfx/`, loudness-normalised to −16 LUFS (narration measures about −17.5). Music and effects play at **40%** (`AU.vol` in `src/30_audio.js`). Narration clips play at full volume, outside that gain.
- **Music beds** (Eleven Music v2.5, 60 s instrumental, faded for looping): `bg_ayodhya` (bansuri, tanpura, santoor), `bg_tender` (sitar, santoor), `bg_tense` (low drone, soft tabla heartbeat), `bg_adventure` (bansuri, dholak), `bg_battle` (dhol, pakhawaj, brass), `bg_festive` (shehnai, dhol, bells), `bg_divine` (tanpura, harmonium, temple bells).
- Each story mood picks a bed (`BED_BY_MOOD`). Shots 2.5 and 2.7 use `bg_divine`, 2.6 and 2.10 use `bg_festive` (`BED_BY_SHOT`), and the battle switches to `bg_battle`. Beds crossfade over about 3 s. They hold a steady 40% under narration and drop to a quarter of that for the shloka.
- **Ambience** (Sound Effects v2, 20 s seamless loops) at half the music level: `amb_forest`, `amb_ocean`, `amb_city`, `amb_night`, chosen by the scene's `Amb.set()`.
- **Effects:** one recorded file per `AU.sfx()` cue (bow, sword clash, fire burst, diya flame, temple bell, gates creaking, crowd cheer, falling flowers, monkey chatter, stone set into the bridge, chimes, taps and pops). New cues added in this pass: `gate` (1.8 gates open), `fire` (2.1 fire arrow and the burning), `flowers` (2.6 welcome) and `monkey` (1.6 the vanaras' plan).
- `build.py` embeds the file list as `SND_IDS`. A headless run confirmed all 36 files decode and that every cue used in the run played from its recorded file.
- **Hosting:** publish `sfx/*.mp3` alongside `audio/*.mp3`.

## Devanagari

- The shloka is real DOM text in Noto Sans Devanagari from Google Fonts, with a fallback stack of Kohinoor Devanagari, Nirmala UI, Mangal and Devanagari Sangam MN. It is never drawn as shapes.
- The 700 weight loaded in testing, and `document.fonts.check` passed.
- `check_script.py` confirms the rendered lines match the supplied text character for character. The transliteration lines were also proofread.

## Script verification

All 90 narrated lines spoken in a full run match the story document verbatim (`check_script.py`).

These short lines were added by the builder and are not narration. Please review them:

- **Lakshmana's gentle redirects in 1.3:** "That side is all tangled up. Let's look for another clue!" and "Look closely, a clue is waiting nearby. Let's try again!"
- **Hanuman when the child strays in 1.5:** "Oops! Let me hop back onto the golden path. This way!"
- **Bridge mis-drop in 1.7:** "Almost! Try one of the empty spaces in the bridge."
- **Idle hints:** one per activity, spoken by a character or the Narrator.
- **Activity instructions** in the top band, and the **deed captions** in 2.9 (the deed names reuse the narration's own words).
- **"Previously…" line:** spoken before Episode 2 only on resume or replay.

## Cut, simplified or assumed

- **Prompt Bible:** it arrived after the build started. The brief's art direction already matched it, and the scenes follow it.
- **Rama's skin tone:** #4A9AA6, as proposed in the brief. Please review it.
- **Other skin and fur tones**, the only colours outside the palette tokens:
  - Sita #D9996A
  - Lakshmana #C98A5E
  - Hanuman #C9732F
  - Ravana #9A6A55
  - Six vanara fur tones and six townspeople skin tones
- **Ravana's ten heads** are a main crowned head plus a symmetrical halo of nine smaller heads. He has two arms, holding a bow and a round shield, to keep him readable and gentle.
- **Hanuman** does not ride the Vimana in 2.3, following the narration and the bible.
- **Music and effects** are recorded ElevenLabs audio in `sfx/` (see Music and sound effects). The older synthesised drone, plucks, noise beds and cues stay in the code as the fallback for any file that is missing or still loading.
- **Townspeople** are generated from one seeded function, so faces, hair, clothes and ages vary. The same seeds give the same people on each run.
- **Rough runtime:** Episode 1 is about 8.5 to 9 minutes (about 4 minutes of narration, 3 activities, animation holds). Episode 2 is about 11 to 12 minutes, including the two recitations and their pauses. Both are estimates from the narration length; they were not timed with real voices.

## Script inconsistencies noticed

1. Scene 1.4's narration already has Hanuman giving the ring, then 1.5 asks the child to deliver it. Both narrations are kept verbatim, and 1.5 is staged as reliving the moment.
2. Episode 1's activity times add up to 3:15, while its summary says 2:30.
3. The Vimana and Hanuman's presence on the journey home are not in the narration.
4. The story document contains reference-art captions ("Exotic India Art"). They are not story content and are ignored, and all designs are original.
5. No stone count or diya count is given. The build assumes 6 stones and 12 diyas.
6. The Prompt Bible leaves Rama's skin tone open.

## Late-frame review

The late frame of every scene was reviewed in landscape (1280×720) and portrait (390×844), along with each activity's opening frame and Ravana's raised-weapons pose. Fixes made:

- Garlands moved from the sky to the rooftops.
- The ring enlarged.
- The deer moved out from behind the characters in 1.3.
- Children in the medallions and the Vimana riders enlarged.
- Clouds removed from the dark diya scenes.
- The deed caption moved off the medallions in portrait.
- Characters enlarged in the portrait battle and reunion.
- The closing diya enlarged.

## Revision 2 (review feedback)

- **1.1 Ayodhya:** the sky is now sky blue and the courtyard ground is earth brown. Two colours were added to the palette for this: `sky` #7EC4E6 and `brown` #7A4A2A.
- **1.2 forest:** the grey diagonal shadow lines are removed. The darker mood now comes from the passing indigo cloud and the sky colour only.
- **1.2 chariot view:** Lanka is drawn much larger, with a gold wall and taller towers. The sky has a new curl-pattern texture, and the chariot is larger.
- **1.7 bridge and 1.8 march:** every bridge stone (fixed, movable and placed) carries **श्री राम**. It is live Devanagari text in Noto Sans Devanagari with an ivory halo, not drawn shapes. This is a deliberate exception to the "no lettering in the art" rule, made on request.
- **2.1 battle:**
  - Ravana is larger: 1.15× instead of 0.92×, and 0.8× instead of 0.62× in the departure scene.
  - Rama's final arrow is a **fire arrow**: flat flame tongues along the shaft and a flaming tip. It strikes Ravana with a burst of flat flame shapes, he lowers his weapons, then sinks back and fades into settling golden dust as "The battle was over" is spoken.
  - There is no blood, and no injury is shown.
- **2.3 Pushpaka Vimana:** the sky is now blue. Lakshmana stays seated throughout, using a new seated pointing pose.
- **2.4 Ayodhya Gets Ready:** the garland stringer and the boy standing on the central road are removed. The garlands still appear across the doorways during that line.

## Revision 3 (review feedback)

- **Removed scenes:**
  - Activity 1.3 (Follow the Forest Clues) is removed, along with its two narration lines.
  - Activity 1.5 (Help Hanuman Deliver the Ring) is removed, along with its two narration lines.
  - The Ashoka grove now opens straight onto the ocean through the ring's circle.
  - Episode 1 now has one activity: the bridge.
  - The full run speaks 86 lines, all verbatim.
- **Hanuman's flight to Lanka:** he stays fully inside the frame. He leaves the meeting scene within the picture, and his arc over the ocean is lower so his whole figure stays on screen in landscape and portrait.
- **Skies:**
  - Daytime skies are light blue (`sky` #7EC4E6).
  - Evening skies are dark blue (`ocean` #17407A). This includes the discovery keyframe in 1.2, the sunset in 2.4 and the dusk in 2.5.
  - Night and Lanka skies are deep blue (new `navy` #13285E). This includes the dark backgrounds of 2.7 and 2.8.
  - The 2.9 kindness activity keeps its warm ivory background, because it isn't a sky.
- **Clouds:** redrawn as overlapping round puffs, each with a spiral inside. By day they are white with light-blue spirals; at night they are light blue with dark spirals.
- **Sun:** redrawn with a friendly face:
  - a red tilak and dot on the forehead
  - hatched lids over large eyes
  - a curled moustache and red lips
  - hatched triangular rays with red petals between them, inside an orange dotted band
- **Closing scene 2.10:** uses the same background as scene 1.1 (palace, garlanded homes, lotus pond, brown courtyard and the road), at night with little lamps along the rooftops, the palace and the road. Rama, Sita and Lakshmana walk in from the left, and Sita turns to face the others when they stop.

## Revision 4

- **End cards:** both episode end cards ("Continue the adventure in Episode 2." and "DIWALI STORIES OF INDIA") now sit in the centre of the picture. A light ivory veil fades in over the artwork behind them so the card stands out. The mute, skip, captions and camera buttons stay above the veil.

## Revision 5

- **1.2 departure:** Ravana is larger: 1.2× in landscape, up from 0.8×, and 1.1× in portrait.
- **1.4 flight to Lanka:** Lanka is about twice the size, with taller towers and a gold wall standing on the horizon behind them.
- **2.4 Ayodhya Gets Ready:**
  - The orange road through the middle of the street is removed. The road still appears in 2.5 and 2.6.
  - The palace is larger: 0.8× in landscape, up from 0.6×, and 0.7× in portrait.

## Revision 6

- **2.5 Light Up Ayodhya:**
  - The orange road is removed.
  - The palace is larger and matches 2.4 (0.8× landscape, 0.7× portrait). The last diya moves to the larger palace entrance.
  - The gold light patterns and glow rings around each diya are removed. A tap now lights only the flame.
  - When all twelve are lit, the windows and the palace doorway still turn warm gold.

## Revision 7

- **2.6 Rama Returns to Ayodhya:**
  - Rebuilt on the same Ayodhya background as scene 1.1, at night: the garlanded homes, lotus pond, brown courtyard and the road at the right.
  - The palace is larger (0.8× landscape, 0.7× portrait).
  - The orange central road, the central rangoli, the gold halo and rays, and the glow rings around the diyas are removed. Foreground diyas show only their flames.
  - The palace gates still swing open, and Rama, Sita and Lakshmana still walk out from them.

## Revision 8

- **2.4 and 2.5:** the palace now stands on the ground line instead of floating above it. The palace-entrance diya in 2.5 moves down with it.
- **2.6 Rama Returns to Ayodhya:**
  - Rama, Sita and Lakshmana walk in from the right along the road and stop facing the welcoming crowd. They no longer emerge from the palace gate, so the gate doors are removed.
  - Hanuman now stands on the left and greets them.

## Revision 9

- **1.8 Journey to Lanka:**
  - Rama no longer raises his bow to aim. He stays determined, bow at his side.
  - The gates of Lanka now open by themselves as the army comes near.
- **1.4 Ashoka grove:** after "Sita felt hope", Hanuman hands the ring over. It moves into Sita's hand with a sparkle, and Hanuman folds his hands.
- **Expressions:**
  - Any sad face (the "sad" eyebrow) now shows a small light-blue tear under the eye. This covers Sita in the grove and when she is afraid, Rama and Lakshmana when concerned, and the sad friend in the kindness pictures.
  - Ravana shows an angry face, with brows slanting down to the nose and a frown, when he comes for Sita and during the battle. It softens once he is defeated.
- **1.2 departure:** as Ravana approaches, Sita draws back afraid, with wide eyes, hands to her chest, a tear and a small tremble. The tremble is reduced when reduced motion is on.

## Revision 10

- **End cards:** the veil behind them is now a dark indigo (72%) instead of light ivory.
- **2.1 battle:**
  - Rama and Lakshmana both draw their bows and shoot arrows at Ravana, and Ravana shoots arrows back from his bow.
  - Each arrow flies from the shooter's hand in an arc and is stopped by a soft shield flash in front of its target. There is a twang as it is loosed and a shimmer when it is blocked.
  - After the fire arrow strikes, flat flame tongues rise over Ravana and he burns away into golden embers. No injury is shown.
- **2.5 Light Up Ayodhya:** the five rooftop and window diyas are removed. Seven diyas remain, and the palace-entrance diya is still the last to light. The counter adapts to the number of diyas.
- **2.7 What Does a Diya Teach Us?:** the oval ring joining the four pictures is removed.
- **2.9 Diya of Kindness:** the "My kind deed" text card beside the diya is removed. The chosen picture keeps its golden highlight, the choice is still saved, and it still appears beside the child's diya in 2.10.

## Revision 11

- **2.1 battle:** each archer now visibly draws the bow before every shot. The string pulls back with an arrow nocked, then releases as the arrow flies.
  - Rama and Lakshmana draw the string to the cheek with the back hand.
  - Ravana takes a new shooting pose: his right hand crosses his chest to draw, and his shield is set aside while he shoots. His arrows alternate between Rama and Lakshmana.
- **2.6 homecoming:** flowers (red and ivory blossoms and marigolds) now drift down from the sky, along with the petals.
- **2.10 closing:**
  - A rangoli lies on the ground in front of the palace door, with a marigold toran over the door and flowers on either side.
  - Six patterned lanterns hang and sway gently from the palace and the rooftops; four in portrait.
  - The four heroes stand apart so the doorway and rangoli stay visible.

## Revision 12
- Narration recorded with ElevenLabs (Krishna, Eleven v3) for every line, including the shloka in Devanagari. It plays in place of the browser voice (see Speech).

## Revision 13
- Recorded background music, ambience and sound effects from ElevenLabs. Music and effects play at 40% (see Music and sound effects).
