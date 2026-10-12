# Navratri Ep. 1: The Rise of Mahishasura (brief)

**Idea:** a pencil page darkens as one asura's pride grows, until the only colour in the piece appears as a single terracotta dot. The dot becomes Durga and sends the first light to the mountains.
**What you can say about it in one sentence:** graphite is his world and terracotta is Shakti; the page is grey and smudged until the devas join, and from then on everything that matters is drawn in terracotta.

## Spec
- 9:16, 1080×1920, 24fps, 120 BPM grid (an 8th = 6 frames). Length set by the voice: about 2:19 with the scratch voice.
- Format: F2 chronology joined by shape morphs (morph chain), 14 morphs, **one hard cut** (the slam on Durga, in the silence after "one enormous radiant light").
- Voice is the clock. Each beat starts about 0.3–0.5s after the previous line ends, and morph centres snap to the 8th grid (`AFTER(id)` in `src/head.html`).
- Bridges around the quick beats 4 and 10 use d 0.4.
- Safe area x 60–940, y 250–1500. Captions at y 1330–1420, English only, at most two lines, one yellow word.

## Look: sketchbook (styles/sketchbook, unchanged)
- Warm dot-grid page, spiral binding, smudges, coffee ring. Everything boils on 2s. Pencil first, then ink, then colour.
- The pencil prop follows the stroke being drawn. It is a **bare cedar pencil** (no yellow paint), and the eraser has **no blue band**, so terracotta stays the only colour.
- Shading by hatching only. Glow is ray lines.
- No doodleHero. The constant the eye holds is the page and the pencil.
- Colour rules:
  - Graphite and ink = Mahishasura's world. `navMess(level)` brings smudges and tangles in from the edges as his pride grows (beats 8–10), then clears.
  - **Terracotta** = Shakti. It first appears as one dot in beat 11, and nowhere before.
  - Yellow = one caption word.
  - Red = once per scene at most: the name underline (beat 2), the BOON stamp (beat 7), the SHAILAPUTRI underline (16).
- Brahma is drawn in ink only.

## Beats (approved story check)
| # | era | page | bridge out | sound act |
|---|---|---|---|---|
| 1 | worlds | three bands, tiny figure on the ridge; "three *worlds*" | figure → Mahishasura | build |
| 2 | power | forest, he strides in, name + red underline; "he wanted *power*" | crown → tree trunk | build |
| 3 | tapasya | seated under the tree, breath ticks, leaves; "a long *tapasya*" | sun disc | build |
| 4 | time | six season boxes; "*years*" | last box fills page (d 0.4) | build |
| 5 | stop | face ECU, eyes shut, push-in, scribbles; "he did not *stop*" | halo → Brahma's halo | build |
| 6 | brahma | Brahma, ink only, rays one by one; "at last, *Brahma*" | raised palm | build |
| 7 | boon | he kneels; card "no man / no deva"; red BOON stamp; "no man or *deva*" | stamp circle → eye | build |
| 8 | pride | crown erased and redrawn bigger; smudges creep in; "now *invincible*" | crown → fortress | build |
| 9 | army | rows of soldiers and banners, pull back (busiest); "an *army*" | fortress gate → heaven's gate | **peak** |
| 10 | retreat | three boxes; the eraser rubs out the palaces; "the devas *retreat*" | arch → ring (d 0.4) | peak |
| 11 | gather | ring of pencil devas; FIRST terracotta dot; "they came *together*" | the dot grows | **silence** |
| 12 | energy | terracotta lines to the centre on the beat; "each gave *light*" | push into the centre | silence |
| 13a | merge | scribbled terracotta circle, brighter, brighter, held silence | **HARD CUT** | silence |
| 13b–14 | durga | Devi Durga on her lion, terracotta rays; nine rings with tally ticks; "Devi *Durga*", "nine nights of *Shakti*" | ring → comet | **gift** (loudest hit on the cut) |
| 15 | light | comet on a dashed graphite trail to the mountains; "toward the *mountains*" | glow → peak | goodbye |
| 16 | who | ink peak, pencil trident silhouette, terracotta glow; "who was *waiting*?" Pull back: the peak is the middle band of the opening page, now with one terracotta peak. Title SHAILAPUTRI, "next: Shailaputri", bell, "DING." | ends | goodbye |

## Sound plan
- Beats 1–8 build: a thin pad, and pencil-scratch noise on 16ths while lines are drawn.
- Beat 9 is the peak (busiest): a low drone and steps on 8ths. It is not the loudest moment.
- Beats 11–13a drop to near silence, with a hard stop before the held silence after "one enormous radiant light".
- The loudest hit lands exactly on the cut to Durga, inside the pause before "And from that light appeared…". Then a warm pad.
- Beat 14 has nine chimes, one per ring, on 8ths from "Nine". Beat 16 has one soft bell on "DING."
- `TIMELINE.acts` roles: build, peak, silence, gift, goodbye.

## Voice
- Script: `voice/script.json` (your attached file). The words are unchanged. The pauses were lengthened as approved: +0.5s on most lines, more where the picture needs it; b13a stays at 2.2s; lead 1.6s; tail 5.5s.
- The scratch voice is espeak at 140 wpm (en-gb), for timing only. Never ship it.
- Real voice: your own recordings, one file per line (no ElevenLabs connector in this session).
- Word times: faster-whisper is installed, but its model download from huggingface.co is blocked by this environment's network policy. Word times are estimated from letter counts until that host is allowed.

## Facts and sources (mythological retelling, Devi Mahatmya tradition)
- The devas are defeated and driven from heaven. The light of Vishnu, Brahma, Shiva, Indra and the other devas unites into the goddess: Devi Mahatmya ch. 2 (Markandeya Purana).
  - https://wikipedia.com/wiki/Devimahatmya
  - https://www.vedadhara.com/the-rage-of-all-the-devas-merged-together-and-became-a-huge-mountain-of-fire
  - https://britannica.com/topic/Durga
- The lion as her mount, given by Himavat: Devi Mahatmya 2.29. https://enjoylearningsanskrit.com/scriptures/durga-saptashati/chapter-2/verse-29
- The tapasya and Brahma's boon are **not** in the Devi Mahatmya itself. They come from the Devi Bhagavata tradition and popular retellings. https://kamakoti.org/kamakoti/details/devibhagvatpurana37.html
- **Where tellings vary:**
  - The boon is told as "no male", "no man or deva", or "only a woman could kill him". This narration uses "no man or deva".
  - Some retellings credit Shiva with the boon; most say Brahma.
  - Navratri's origin is also told through Rama.
  - In the Devi Mahatmya, the light comes from the gods' anger.
- Shailaputri is the first Navadurga, worshipped on day 1, daughter of Himavat. https://en.wikipedia.org/wiki/Shailaputri
- Nothing is added beyond the narration. The deities are drawn simply and respectfully, never comic.
