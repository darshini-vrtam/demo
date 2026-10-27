# Dhanteras: The Ocean of Treasures (Book 2)

An interactive, narrated, Madhubani-inspired telling of Samudra Manthan, Lord Shiva and Lord Dhanvantari for children aged 6–12.
Open `dhanteras-ocean-of-treasures.html` in any modern browser. It is one self-contained file:

- Every illustration is drawn in code on a plain canvas, using flat palette colours, double outlines and pattern fills. It uses no image files and no Rough.js.
- Every word on screen is HTML text over the art: narration, buttons, counters, subtitles and progress.
- Music and sound effects are synthesised with Web Audio.
- Narration uses the browser's built-in speech voices. If no voice is available, timed subtitles carry the story.

## Editing

`python3 build.py` assembles the page from `src/`. It concatenates `src/head.html` and `src/*.js` in name order.

| File | Contents |
|---|---|
| `src/head.html` | Page shell, header with the 10-diya progress, controls, narration/activity panel, start and chapter cards, extended-prayer dialog, CSS with light/dark UI tokens |
| `src/00_core.js` | The 21 palette tokens, storage (choices and reflections only), layout (design box 1600×900 landscape, 900×1150 portrait, full-bleed backgrounds), sprite cache, tweens and timers |
| `src/10_paint.js` | Paths, the double-outline helper, pattern fills, and the motifs: lotus, fish, stars, clouds, rings, rays, mandala, flame, diya (PROP-02), amrita vessel (PROP-01), ocean rows (ENV-01), sky (ENV-02), peacock, toran, garland, rangoli. Also the small icons and the Madhubani border frame |
| `src/20_figures.js` | Character bible. One parameterised figure is used for Vishnu, Shiva, Parvati, Lakshmi, Dhanvantari, three devas, three asuras and the family. It also holds Shesha, Kurma, Mount Mandara (ENV-03), Vasuki (ENV-04), Airavata, Uchchaihshravas, Kalpavriksha and the lotus treasure frame (ENV-06) |
| `src/30_audio.js` | Ambience, sound cues, ambient music, the narrator (en-IN voice preferred, with a pronunciation map) and the swappable Sanskrit audio source (`MANTRA_AUDIO_SRC`) |
| `src/40_director.js` | Screen runner, verbatim narration with sentence highlighting, the activity contract (idle hint, then auto-assist), Next gating, chapter cards, and the UI layer |
| `src/45_input.js` | Canvas hotspots, tap, drag and swipe, and the optional camera hand-pinch (MediaPipe tasks-vision, loaded only after the camera is granted) |
| `src/50_scenes_a.js` | Verbatim text, takeaway lines, mantra text, chapters, the shared churning composition, and Screens 1–5 |
| `src/51_scenes_b.js` | Screens 6–10, the Dhanteras home (ENV-07), matching, choices, reflections and the prayer |
| `src/90_main.js` | Frame loop, controls, boot and the `#qa` test hook |

## How it plays

Three chapters span ten screens:
- **The Great Plan:** Screens 1–3.
- **The Blue-Throated Protector:** Screens 4–5.
- **The Treasures:** Screens 6–10.

A title card opens the story and each chapter opens with a short card.

- **Autoplay.** Narration plays sentence by sentence, with the current sentence underlined. The director pauses for every activity and resumes when it is done. Each screen ends with its takeaway line, marked "Remember" in the narration panel, then plays its transition into the next screen.
- **Activities.** No activity has a failure state. A wrong pull side or a wrong habit match gets a gentle spoken and written prompt, and nothing already done is lost. After about 15 seconds of no input, the target pulses and a spoken hint plays. About 8 seconds later, the story completes one step for the child, so it never stalls.
- **Next button.** On Screens 1–7 it unlocks when the activity is complete. On Screen 8 it unlocks once a treasure is chosen (the reflection is optional). On Screen 9 it unlocks once the child has listened or skipped, and on Screen 10 once they submit or skip.
- **Controls.** Pause/play narration, replay this screen, repeat the instructions, subtitles on/off, mute, skip, and Hand mode. Previous and Next are in the panel. Everything works with the keyboard (Tab, then Enter or Space). Every hotspot on the painting also has a labelled button in the panel.
- **Storage.** The Screen 8 treasure choice and the reflections are saved in `localStorage` when it is available. Typed text, recordings and drawings never leave the device. Recordings and drawings are kept in memory only.
- **Callbacks.** On Screen 10, the motif that matches the Screen 8 choice appears first and carries an extra glow. The reflection prompt starts with "You chose …".
- **Previously.** Returning to a chapter that was already played in this session adds a short "Previously…" line.
- **Portrait.** Below a 1.2 width/height ratio the scenes switch to a portrait composition, with the narration panel below the art.

## Testing hook

Add `#qa` to the URL to expose `window.__qa`:
- `go(screenIndex, 'end' | 'act' | 'run')`: fast-forwards to the screen's late frame, holds at its activity, or plays it at speed.
- `paused()`
- `info()`: reports the voice, the Hindi voice and the camera status.

## Build notes

### Implemented

All ten screens are built, and all eight activities, the four-way treasure choice, both reflections and the prayer screen are in.

The Screen 8 choice is recalled on Screen 10 in two ways: the motif that matches the choice appears first with an extra glow, and the reflection prompt says "You chose …".

### Camera and hand tracking

Hand mode is opt-in. It requests the camera first, then imports `@mediapipe/tasks-vision@0.10.14` from jsDelivr. The hand model comes from `storage.googleapis.com`, which is not on the artifact host's script allowlist. Where that load, the camera, or the permission fails, the button switches itself off, shows a one-line note, and tapping and dragging carry on unchanged.

Pinch-to-tap and pinch-and-drag work on the canvas. Pinch also works on any panel button, and a habit card can be pinch-dragged onto a symbol.

### Speech

- **Narrator.** It prefers an `en-IN` voice, then `en-GB` or any English voice. With no voice, or when muted, timed subtitles carry the narration.
- **Display versus speech.** Displayed text is verbatim. Speech goes through a separate pronunciation map.
- **Sanskrit.** If `MANTRA_AUDIO_SRC` (in `src/30_audio.js`) points to a reviewed recording, that recording plays. Otherwise a `hi-IN` voice is used as a placeholder and labelled as one. Without a Hindi voice, the pronunciation cues step through as a silent read-along.

### Dictation and recording

"Speak" offers a local recording through MediaRecorder, kept in memory only so the child can play it back.

Dictation was left out on purpose. Browser speech recognition usually sends audio to a server, which the brief rules out. In testing, simply calling the on-device check (`SpeechRecognition.available`) crashed the page in Chromium.

### Cut or simplified

- Poses are a fixed set per character, and animation comes from whole-figure motion and state swaps rather than jointed limbs.
- Treasure reveals and the Lakshmi tableau use cross-fades and rises rather than a camera move.
- The "Previously…" line only fires for chapters already played in the same session. Saving story progress would mean storing more than the brief allows in `localStorage`.

### Script decisions and inconsistencies

1. The storyboard mentions Shiva's blue throat in "Screens 5 and 9-related imagery", but Shiva does not appear on Screen 9. It is drawn only on Screen 5.
2. The brief counts screens "of 8", but there are 10 in total. The eight story screens keep "Screen N of 8", Screens 9 and 10 are labelled "Closing · Prayer" and "Closing · Ending", and the diya progress shows all 10.
3. The story document labels two Screen 6 windows "Lotus" and "Celestial horse". The storyboard's "Lakshmi" and "Uchchaihshravas" are used.
4. The story document shows the Screen 1 devas as exhausted, while the storyboard has them approaching with folded hands. The storyboard staging is used; worry still shows in their faces and lifts to hope.
5. The Screen 7 Leaf and Food bowl habits overlap in meaning. Hints tell them apart (Leaf points to nature, Food bowl to meals), and correct pairs lock in.
6. The mantra and the dhyāna śloka both carry textual variation and need review by a qualified Sanskrit reviewer.
7. Visible text uses typographic apostrophes, as the brief asks, so "Vishnu's" is shown as "Vishnu’s". The words are otherwise verbatim.

### Drafted for review

These were not in the brief and need sign-off:
- The four short responses to the Screen 8 choice.
- The chapter subtitles and the two "Previously…" lines.
- The hint lines.
- The proposed sound cues.
