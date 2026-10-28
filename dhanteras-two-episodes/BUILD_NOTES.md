# Build notes: Dhanteras, The Ocean That Gave Us the Gift of Life (two episodes)

`dhanteras-two-episodes.html` is the single self-contained page, built from `src/` by `python3 build.py`. Pass an output path as the argument to also write the skeleton-free version used for the claude.ai artifact.

Sources, converted from the attached `.docx` files, live in `source/`:
- `story-production-script.md` (from `Story.docx`) is the verbatim narration source. I checked it line by line against `Only_narration.docx`, and every narration line matches word for word.
- `visual-storyboard.md` (from `Dhanteras_Revised_Visual_Storyboard.docx`) was used for staging.

The drawing engine (SVG pattern library, ocean, Mandara, Kurma, Vasuki, devas and asuras, deities, kalash, treasures) is reused from the earlier `dhanteras-story/` build. Every shot, the decision cards, the shloka screen, the children, the family home and the final diya are new.

## Shots implemented (16) and activities

| Shot | Contents |
|---|---|
| Title | First title card: DHANTERAS: THE OCEAN THAT GAVE US THE GIFT OF LIFE and "Begin the adventure", which unlocks audio. Then the Episode 1 card. |
| 1.1 The Ocean of Secrets | Still ocean under a star-filled sky with a slow 7% push-in. The seven lights appear on "precious jewels", "extraordinary creatures" and "divine gifts". Medallion cameos: the tired devas, Vishnu (his line in his voice), the asuras, then the devas' and asuras' medallions slide together. |
| 1.2 Wake Up the Ocean | **Activity.** Seven glowing lights. The verbatim instruction comes with a finger demonstration. Each tap gives a golden ripple and a chime, and the waves, lotuses and colour wake gradually. Off-target taps make a harmless ripple. Idle: hint, then the remaining lights wake one by one. A rising sound plays when all seven are awake. |
| 1.3 The Mountain That Sank | Mandara rises out of the water, Vasuki wraps it in one continuous spiral, the groups take their ends and pull, then the mountain sinks slowly with calm water rings. |
| 1.4 Save the Sinking Mountain | **Decision**, read aloud. The two cards float over the painting, which dims to 30% while they show (no separate card band). **A:** the mountain trembles, lifts a hair, then sinks further. **B:** a soft golden light under the water and Vishnu's medallion shines once. |
| 1.5 Kurma Supports the Mountain | Both branches converge. Vishnu's medallion dissolves into Kurma's blue-and-gold shell motif on "took the form of Kurma". Kurma rises beneath, lifts the mountain and it steadies, with a deep reassuring note. |
| 1.6 The Great Churning Begins | Alternating pulls, rotation speeding up on "Round and round", bubbles and golden currents. The border patterns vibrate instead of camera shake. The contained violet cluster rises on "A strange, dark cloud rose from the ocean." |
| 1.7 The Poison Spreads | Cross-fades to the restrained palette with lower pattern density. Patterned violet clouds spread across the sky and the water below the mountain, clear of every face. |
| 1.8 Who Can Save the Universe? | **Decision.** **A:** both groups reach towards the cluster, which keeps swirling inside its boundary and grows a little. **B:** a soft golden light and Shiva's golden-outline silhouette steps into it. |
| 1.9 Lord Shiva Saves the Universe | The cluster contracts and enters Shiva's throat from below. The throat turns blue with a ring motif, then the protective halo appears. The clouds fade and the ocean cross-fades back to blue and gold, with a music swell. "True strength…" appears as a large read-along card. |
| 1.10 The Golden Light Beneath | A golden light grows beneath calm water, then a golden iris leads to the Episode 2 title card. |
| 2.1 The Ocean Reveals Its Treasures | Callback lines (below), then the churning resumes in place; the mountain never moves. Kamadhenu, Airavata, Kalpavriksha and Lakshmi appear one by one as medallions across the top, each with a soft golden ring and its script label ("Kamadhenu — generosity." and so on) on a ribbon. The narrated celestial horse and jewels rise from the water at the sides. |
| 2.2 So Many Wonderful Gifts | No interaction (removed after review). The four treasure medallions glow gold together and the churning slows, then "So many wonderful gifts! But one final treasure is still waiting to appear." The script line "Ocean Explorers, tap the glowing lotus flowers…" is not spoken, since there is nothing to tap. |
| 2.3 The Divine Arrival of Lord Dhanvantari | In order: the ocean stills, golden rings spread, the central lotus glows and opens petal by petal, and Dhanvantari rises at the exact centre holding the Amrit Kalash at chest level. Devas and asuras watch from the edges, and herbs drift during the health lines. |
| 2.4 The Dhanvantari Shloka | Dhanvantari on the right in a mandala, five children in namaste on a terrace in the foreground, and the shloka in a live-text Devanagari panel (Noto Serif Devanagari) on the quiet left-middle. A joined-hands "Namaste" button starts it (or after about 5 s, or palms together on camera). Pass 1: the Narrator recites line by line with a word highlight. Pass 2: soft music, the highlight replays for about 10 s with the Narrator silent. Then the "Simple meaning for children" label and text, read aloud, then the closing lines while golden light spreads from the pot across the water. |
| 2.5 What Is True Wealth? | **Activity.** The golden treasure pot (the kalash with tiny carved lotuses) at the centre, five treasures floating around it with labels. Each icon glows once as its name is spoken. The labels are read aloud. Drag (or tap) any treasures into the pot: each glows as it enters and the pot brightens. The lotus "I'm ready" button appears after the first. |
| 2.6 A Little Light for Dhanteras | A traditional home: patterned doorway with marigold garlands and mango leaves, a small prayer space, a rangoli, and an original five-person family (grandmother, two adults, two children) lighting diyas together. Five miniature medallions along the border glow as the recap names the churning, Kurma, Shiva, the treasures and Dhanvantari. The child may tap diyas at any time. The scene then simplifies to one diya on deep blue with golden lotus petals drifting, the child's chosen treasure icons glowing softly around it, the verbatim on-screen title, and a "Play again" end card that leaves the diya uncovered. |

Every decision and activity pauses the story and resumes on completion. After about 15 s idle the Narrator gives a hint (with a finger demonstration), and about 10 s later the story assists. For decisions, the assist picks B and stores `"B (auto)"`. The Skip button also assists. Every target has a keyboard-reachable button.

## Choices stored and callbacks wired

localStorage key `dhanteras.twoep.v1` holds `ep`, `done` and `choices` (`kurma`, `shiva`, `treasures`), every access wrapped in try/catch. With storage blocked or empty, the story still plays from the start.

- **Shot 2.1:** after "Welcome back, Ocean Explorers!" the Kurma line and then the Shiva line play for an `A` or `B` choice. **Auto-picked choices (`"B (auto)"`) are skipped**, since the child didn't make them. A missing choice is skipped too.
- **Shot 2.6:** the final diya's ring shows the child's chosen treasure icons, glowing softly (all five for `"all (auto)"`). This is the only visual callback.

## Camera and hand tracking

- Opt-in through the camera button. `@mediapipe/hands@0.4.1675469240` and `@mediapipe/face_mesh@0.4.1633559619` load as scripts from `cdn.jsdelivr.net`.
- A pinch acts as a finger (lights, lotuses, cards, dragging treasures), and palms together start the namaste. Face tracking is never needed.
- **Under the claude.ai artifact host the camera is refused**: this account has no camera capability for artifacts, and the CSP blocks the library's runtime model fetches. The button hides itself silently and tap/drag runs everything. **The tap/drag fallback is what runs on the host.**
- I couldn't test tracking here: the container has no camera and cannot reach jsdelivr.

## Speech

- The Narrator prefers an en-IN, then a natural or neural, female voice. Lord Vishnu uses a lower, slower male voice where available, or the same voice pitch-shifted.
- The script's mood tags set the Narrator's rate, pitch and volume, and are never spoken.
- **Shloka:** if a hi-IN voice exists, Pass 1 is spoken in it with word highlighting. If not, the highlight runs on a timer in silence, and the Sanskrit is never read by an English voice. The meaning is read in the Narrator's English voice.
- **Without any voice, or when muted,** captions advance on a reading-time estimate, so the story never stalls.
- The headless test browsers had **no voices at all, including no hi-IN voice**, so the fallback paths are what I exercised. I didn't hear a real voice.

## Added lines (not in the script)

**Idle hints (Narrator, 8 words or fewer):**
- 1.2 "Tap a glowing light under the waves!"
- 1.4 "Tap a card to help the mountain."
- 1.8 "Tap a card to choose who helps."
- 2.5 "Drag a treasure into the pot!"

**Callback lines (Shot 2.1):** "You tried to lift the mountain first!" / "You called Lord Vishnu right away!" / "You asked the devas and asuras first!" / "You called Lord Shiva right away!"

**"Previously…" lines (resume or replay only):** Ep1 (replay) "Previously, we sailed the Ocean of Wonders together." / Ep2 (resume) "Previously, Lord Shiva saved the universe from Halahala."

**Spoken title cards:** "Episode 1. The Great Churning and the Blue-Throated Lord", "Episode 2. The Treasures of the Ocean and Lord Dhanvantari". The card itself shows the script's capitals.

**UI labels:**
- dock instructions: "Tap the glowing lotus flowers.", "Join your hands to begin.", "Recite along with the glowing words.", "Drag your treasures into the pot, or tap them.";
- counters ("3 of 7 lights", "2 of 4 treasures", "2 chosen");
- "Choice A" / "Choice B" on the cards;
- chant-card header "Read along";
- buttons "Namaste", "I'm ready", "Play again", "Begin the adventure", "Continue: Episode 2";
- the start-card line "The Narrator tells the story aloud…";
- the chip labels (shot names);
- accessible button labels.

**Verbatim:** the instruction "Tap the glowing lights to awaken the ocean!", the choice labels and branch captions, the discovery labels (shown on the treasure medallions), the five treasure labels, "Dhanvantari Shloka", "Simple meaning for children" and the final title are all verbatim from the script.

## Character revisions (after review)

- **Asuras** redrawn after the supplied reference: terracotta skin, a vermilion spiked crown with a gold crescent plume behind it, zigzag-patterned skirts (vermilion, indigo or coral) with a gold hem, a coloured sash (indigo, turquoise or vermilion), hair curled at the nape and a small curled moustache. No horns or fangs; the crescent is a crown plume.
- **Eyes**: the profile eye is larger, with a bigger pupil and highlight, and the happy-eye arc and its outer flick are now drawn in black on every figure (a variable clash had left the happy eye invisible on cheering devas and asuras). The deities' front-facing eyes are larger with a highlight, so they read at medallion size.

## Cut or simplified

- **Shot 2.2's lotus-tapping activity was removed after review**, along with its instruction line. The treasures appear as top medallions instead of lotus windows, and the 2.6 recap medallions were moved clear of the frame, the episode label and the buttons.

- **Vishnu** is two-armed (conch and discus). The storyboard asks for four arms with mace and lotus; the medallion only shows a bust.
- **Dhanvantari** is two-armed holding the kalash, as the brief proposed. Please confirm.
- **Skin tones** follow the brief's proposed tones (Dhanvantari ochre-gold, Shiva ivory-ash), not the storyboard's blue complexions for both.
- **Lakshmi** stands on her lotus (brief), rather than sitting (storyboard).
- **Shiva:** Parvati and the Ganga stream are omitted.
- **Kalpavriksha** has no fruit or birds.
- **The shloka screen** has no separate replay button; the second pass is the recite-along. No transliteration is shown, as none was supplied.
- **Divine light:** the storyboard's blue-white light for Kurma and Shiva's arrival is drawn as gold-and-ivory rings, per the brief's light rules.
- **Treasure symbols** use the brief's proposed designs (leaf sprig, three linked lotuses, hand offering a flower, palm-leaf scroll, coins and jewel), not the storyboard's alternatives (open book, joined hands).
- **The lotus badge** from the previous build is dropped; this brief doesn't call for it.
- **Removed web-page headlines:** the stray web-page headlines and domains in `Story.docx` are never shown or used. They remain only in the archived `source/` conversion.

## Script inconsistencies and how each is handled

1. **Stray web-page headlines and domains** are pasted before scenes and choices. They're ignored.
2. **Ep2 narrates the horse and jewels, but the lotus activity omits them.** The horse and jewels reveal passively in full colour in 2.1. The four lotus discoveries happen in 2.2.
3. **Ep1 mentions Vishnu, devas and asuras, but the opening scene has no characters.** They appear as medallion cameos.
4. **The timing table lists True Wealth and Closing at 1:30 each, but the scene targets say 1:15 and 1:00.** The dev overlay uses 1:15 for 2.5. 2.6 is given 1:45, as it absorbs the closing transitions so Episode 2 totals 7:30.
5. **"Ocean of Secrets", "Ocean of Milk" and "Ocean of Wonders"** all name the ocean. Each is kept verbatim.
6. **The shloka has no stated speaker.** The Narrator recites, then the child recites along.
7. **The "magical treasure pot"** is drawn as the Amrit Kalash with carved lotuses.
8. **New:** the brief names `Dhanteras_Revised_Visual_Storyboard.docx` as the narration source, but that file contains **no narration**; it says the narration is in the production script. `Story.docx` was used as the verbatim source, cross-checked against `Only_narration.docx`.
9. **New:** the storyboard (blue Dhanvantari and Shiva, four-armed Vishnu, seated Lakshmi, Parvati and Ganga) conflicts with the brief's character bible. The brief wins on look, as the brief instructs.
10. **New:** the script says "brief golden flash" for the treasure reveals. Drawn as a soft golden ring, per the no-flash rule.

## Timing (dev overlay: press T)

The overlay lists every shot's target against its real elapsed time, plus episode totals.

One full run at real speed with no input, in a headless browser. **Caveat:** it had no speech voices, so captions advanced on the reading-time fallback (about 62 ms per character), not real narration. Every activity also waited out its idle hint and auto-assist (about 25 s each), so the activity rows show the slow case. Treat this as a first calibration, then re-time with real voices.

```
SHOT  TARGET  ACTUAL  DIFF
1.1     1:10    1:08  -0:02  Ocean of Secrets (with title)
1.2     0:40    0:45  +0:05  Wake Up the Ocean
1.3     0:35    0:33  -0:02  Mountain That Sank
1.4     0:40    0:40  +0:00  Save the Sinking Mountain
1.5     0:45    0:25  -0:20  Kurma Supports
1.6     1:15    0:30  -0:45  Great Churning
1.7     0:30    0:14  -0:16  Poison Spreads
1.8     0:40    0:39  -0:01  Who Can Save?
1.9     0:50    1:04  +0:14  Shiva Saves
1.10    0:25    0:30  +0:05  Golden Light Beneath
2.1     1:00    1:00  -0:00  Treasures (with title)
2.2     0:30    0:50  +0:20  Discover the Treasures
2.3     1:30    1:27  -0:03  Dhanvantari Arrives
2.4     1:30    1:36  +0:06  Shloka
2.5     1:15    1:35  +0:20  True Wealth
2.6     1:45    1:23  -0:22   A Little Light

Ep1 6:29 of 7:30 (titles and transitions included in shot rows)
Ep2 7:51 of 7:30
```

What the numbers suggest:
- Episode 1 runs short (6:29). 1.6, the churning, is 45 s under its 1:15 target, because its narration is short. If real voices don't close the gap, the churning loop is the place to add a few seconds of pure animation between lines.
- Episode 2 runs long (7:51). 2.2 and 2.5 include the full ~25 s idle wait, so a child who taps along brings them close to target.

## QA performed

- Fast runs through all 16 shots on both decision branches (A/A and B (auto)/B (auto)), with no errors.
- Late-frame screenshots of every shot at 1280×720 and at 390×844, plus a pass that paused at every decision and activity.
- Fixes made after review:
  - the 2.2 gold glow crossed Lakshmi's face, so it moved behind the windows;
  - the shloka panel collided with the top buttons and clipped its meaning text in portrait;
  - the final title overlapped the treasure ring in landscape;
  - the sleeping lights were too faint;
  - the children were standing on water.
- Live pointer tests at normal speed:
  - tapping all seven lights;
  - choosing decision card A (the shake caption followed, stored `kurma: "A"`);
  - opening the four lotuses in a shuffled order;
  - dragging two treasures into the pot and pressing "I'm ready" (stored `["health","wisdom"]`);
  - the Namaste button starting the shloka with the word highlight running;
  - resume to Episode 2 (the "Previously…" line, then the Kurma A callback, with the auto Shiva choice skipped);
  - the T overlay.
- Not tested: a real camera, real voices (including hi-IN) and the host's CSP behaviour for the camera library. The Sanskrit should still get the qualified review the storyboard asks for before release.
