# The Magic of Giving — build notes

Diwali Stories of India, Episode 3 (the final episode), ages 6 to 10. One self-contained HTML file (`diwali-magic-of-giving.html`), built with
`python3 build.py`. The build reuses the Episode 1 and 2 drawing modules as they are (Lakshmi, the Golden Light, the Diwali home and its
puja cutaway, the family, the lotus, patterns, director, input and camera) from `../diwali-golden-lotus/src` and `../diwali-happy-home/src`,
so the family, house, puja area and Light match the earlier episodes. Everything is drawn in code; all sound is Web Audio or speech synthesis.

## The story document was not attached
Almost every line is quoted in the brief and is used verbatim (`src/05_script.js`). Three passages are given only by their first and last words;
they are marked `PENDING`, skipped (not improvised), and the staging still plays:
- Shot 1.2: the lines after "The family has decorated the house, prepared the puja space and learned a beautiful shloka to Goddess Lakshmi.", ending "...a diya is lit."
- Shot 1.3: the lines between "The little golden light glows beside the puja space." and "Let's share these with our neighbours!"
- Shot 3.4: the lines after "Look at all those beautiful lights!", ending "...happiness spreads even further!"
Paste the exact wording into `SCRIPT` and rebuild. In 3.2, "Grandmother smiles" is staging only (her line is spoken); if the story doc narrates it, add it.

## What was built
The title card ("THE MAGIC OF GIVING", "EPISODE 3 - FINAL DIWALI ADVENTURE", "Begin the story") over a title scene where the Light floats in, framed
by lotus and diya motifs, then all 22 shots in five scenes:

| Scene | Shots |
|---|---|
| EP03_SC01_HOME | 1.1 the home, the Light floats in, diyas light one by one, the camera moves to the doorway; 1.2 Lakshmi Puja in the puja room (temple arch round the framed Lakshmi, altar with kalash and thali, main diya, family seated below); 1.3 the sweets, a child's hand takes one, Child 1 turns to the family; 1.4 Grandmother nods, the neighbour waits at the open doorway, the sweet plate heads there, sparkles gather |
| EP03_SC02_KINDNESS | 2.1 three panels with Light icons, the instruction; 2.2 Sharing Colours, 2.3 Helping at Home, 2.4 Saying Thank You (full-screen situations with a progress strip at the top); 2.5 the three actions join into a lotus |
| EP03_SC03_GRATITUDE | 3.1 the family in a semicircle with a border of diyas; 3.2 the three children's close-ups with pictures in floral frames, then Grandmother; 3.3 My Gratitude Diya; 3.4 the circle of diyas grows into a lotus mandala |
| EP03_SC04_MANTRA | 4.1 hands joined, the camera moves slowly to the diya; 4.2 the mantra screen, then a quiet pause for the children (Continue, or it moves on after about 10 s); 4.3 Health, Happiness, Peace and Prosperity appear round Lakshmi |
| EP03_SC05_FINALE | 5.1 CARE, SHARE, BE GRATEFUL; 5.2 the lotus of prosperity (coins are one of five equal motifs); 5.3 diyas placed at the entrance, sweets for the neighbour, Grandmother's blessing; 5.4 the Night Indigo sky (the only use of that colour), the Light joins a circle of lights; 5.5 the family celebrates inside a lotus and diya frame; 5.6 शुभ दीपावली! end card, held, then "Play again" |

### Decisions (Scene 2)
Each shows the situation at the top (read aloud) and two large picture cards (read aloud) in a band below the characters' faces.
- Card B (the kind action) plays the storyboard's happy outcome and feedback line.
- Card A has no penalty: card A dims, the Golden Light gently points (at the empty bowls, at Grandmother and the flowers, at the child), the drafted line plays, and card B pulses. The story continues once B is chosen.
- After about 15 s idle the same gentle line plays, then B is chosen automatically. All three converge on the same outcome.
- Stored: `{colours, help, thanks}` each as `{first: "A"|"B", final: "B", auto}`.

### Gratitude diyas (Shot 3.3)
Four unlit diyas (FAMILY, FRIENDS, HEALTH, LEARNING), each with a picture. Tapping lights a diya with a floral ring and a bell; tapping again does nothing more
(there is no unlit-again state, and nothing is ever marked wrong). The "Done" button appears after one choice. Idle: the Light hovers by FAMILY and a demonstration
hand taps; then the Light lights FAMILY itself and the story continues. The selected diyas then move into a circle.

### Callbacks (visual only, narration unchanged)
- Shot 3.4: only the selected diyas glow in the circle.
- Shot 5.2: the selected diyas glow among the lotus petals.
- Storage: localStorage key `diwali.magicOfGiving.ep3.choices` holds only `{kind, gratitude}`; also in memory (`MEM`). Storage is wrapped in try/catch.

## Design continuity and palette
The nine tokens are the only colours: Golden Yellow #F4B400, Deep Red #B3202A, Turquoise #1FA7A8, Leaf Green #3F9A47, Orange #F28A1E, Pink #E8579A,
Outline Black #1B1411, Paper Cream #FFF3D6, Night Indigo #1B2A5C (5.4's sky only). The build maps every colour in the shared drawing code onto them, so:
- skin tones are Orange for everyone (the palette has no other skin colour);
- Grandmother keeps her red sari, Mother her green sari, Child 1 (the girl) her pink outfit, Child 2 (the boy) his turquoise kurta;
- Father's Episode 2 indigo kurta is not available, so he wears golden yellow;
- Child 3 is new (the brief needs three children; Episodes 1 and 2 had two): a younger girl in a deep red and yellow lehenga with a top-knot;
- the Neighbour is new: a woman in a turquoise sari;
- the Golden Light is Episode 2's diya-flame design.
Goddess Lakshmi is Episode 1 and 2's design, shown as the framed devotional image under a temple arch. She never moves (her Episode 1 sway and halo
rotation are turned off); only a warm glow of flat layered rings breathes behind her. She is never tappable and nothing covers her.

## Camera, face tracking
Optional camera with MediaPipe Hands (pinch = tap, so pinch-to-light works in 3.3 and pinch presses the choice cards). Inside the claude.ai frame the camera is
refused and model files are blocked by the content-security policy, so the button hides and tap is used. Face tracking was not added: no step in this episode
needs it.

## Voices
Narrator (best English voice, slower in the finale), Grandmother (pitch 0.76, slow), Child 1/2/3 (pitch 1.45 / 1.3 / 1.62), the Golden Light (pitch 1.8, soft).
The mantra and "शुभ दीपावली!" use a Hindi (hi-IN) voice when there is one; otherwise those lines are captions with a timed pause, and the mantra screen shows a
"Listen along" badge. The narrator's transliteration line still plays. The test browser had no voices, so captions advanced on timers. Browser Hindi voices read
the mantra as Hindi (the nasal "ं" and conjuncts may be simplified); a recorded chant would be more accurate. A drone mood ("tanpura") plays under the mantra.

## Added lines and labels
- Storyboard feedback lines (spoken after the kind action): "Wonderful! Sharing makes the celebration more joyful!", "Lovely! Helping someone is a beautiful way to show care!", "Wonderful! A simple thank you can make someone's day special!"
- Drafted gentle-retry lines (please review): "Look at those empty bowls. What could we do?", "Grandmother looks like she could use a hand!", "Someone just gave you a gift. What can we say?" (also used as the idle hint)
- UI labels: "Begin the story", "Done", "Continue", "Play again", "Listen along", the card labels, the panel words and the diya labels from the brief.

## Simplified
- 1.1's journey "through the entrance" is a slow push toward the doorway and a cross-fade into the puja room.
- 2.5's three illustrations are small Madhubani medallions; 3.4's view from above shows the family standing round the circle.
- The gratitude diyas stay lit once chosen.

## Script inconsistencies
1. Four "glowing" diyas (story doc) vs unlit ones the child lights (storyboard): the storyboard is followed.
2. "But can you help the children discover more ways to spread happiness?" is spoken once, at the end of 1.4.
3. Three side-by-side panels vs one situation at a time: a progress strip plus full-screen situations.
4. "Let's share these with our neighbours!" is given to Child 1.
5. The number of children: a third child is added (see above).
6. The feedback and retry lines are storyboard or drafted additions.
7. (New) The story document was missing; three passages are pending (see above).

## Published
https://claude.ai/artifact/Y67kcj9fuineFNH9qE2z2z (Episode 2 links here from its end screen)
