# Bring Your Card to Life — WebAR image-tracking card

A mobile web page that recognises a printed card through the phone camera and plays a video **anchored to the card**, in the card's perspective. It uses real natural-feature image tracking ([MindAR](https://github.com/hiukim/mind-ar-js) 1.2.5 + [three.js](https://threejs.org) r160). It does not track QR codes or markers, and it does not just place a video in the middle of the screen. There's nothing to install and no account. It's a static site you can host anywhere over HTTPS.

```
QR code ──► https://your-site/ar-card/ ──► Start AR ──► camera ──► card recognised ──► video plays on the card
```

## Folder layout

| Path | What it is |
|---|---|
| `index.html` | The page: welcome, loading, AR HUD and error screens |
| `css/style.css` | All styling (mobile-first, dark) |
| `js/config.js` | **Asset paths and tuning.** Edit this when swapping assets |
| `js/app.js` | Camera, tracking, video texture, playback and UI state machine |
| `assets/card-target.jpg` | The card image used to build the tracking target (1000 px wide) |
| `assets/card-target.mind` | **Compiled tracking target** loaded at runtime |
| `assets/card-video.mp4` | Overlay video: H.264, 1280×720, faststart, no audio (~0.6 MB) |
| `assets/card-video.webm` | VP9 fallback for browsers without H.264 (~0.3 MB) |
| `assets/source/` | Originals: `card-print.png` (full-res card art to print), the webp you supplied, and the original 1080p video |
| `vendor/` | MindAR + three.js, served locally (no CDN dependency) |
| `tools/compile-target.html` | In-browser target compiler (also driven headlessly) |
| `tools/compile-target.mjs` | `npm run compile-target`: headless target build |
| `tools/make-qr.mjs` | `npm run qr -- <url>`: printable QR code (PNG + SVG) |
| `tools/test-tracking.mjs` | `npm run test:ar`: end-to-end test with a synthetic camera |

## Run locally

```bash
cd ar-card
npm install                 # only needed for the tools (compile / QR / tests)
npm run serve               # http://localhost:8080
```

`localhost` counts as a secure context, so the camera works on a desktop webcam. To test on a phone you need HTTPS. Either deploy (below) or tunnel your local server, e.g. `npx localtunnel --port 8080` or `cloudflared tunnel --url http://localhost:8080`, then open the https URL on the phone.

## Replacing the assets

The interface never needs to change. Only the files in `assets/` and, if paths change, `js/config.js`.

### New card image

1. Export the card artwork as JPG/PNG, about **1000 px on the long side**, and save it as `assets/card-target.jpg`. Use the same artwork that gets printed.
2. Rebuild the target:
   ```bash
   npm run compile-target                      # assets/card-target.jpg -> assets/card-target.mind
   # or: node tools/compile-target.mjs path/to/image.jpg assets/card-target.mind
   ```
   No Node? Open `tools/compile-target.html` in a browser (via the local server), pick the image and save the downloaded `card-target.mind` into `assets/`. MindAR's [online compiler](https://hiukim.github.io/mind-ar-js-doc/tools/compile) produces the same file.
3. The overlay's proportions are read from the compiled target automatically.

The compile step prints feature counts. Good targets have plenty of detail and contrast, are not symmetric, and avoid large flat areas. The current card gives 45 tracking points and about 270 matching features per scale, which is fine. Very dark, blurry or repetitive art tracks poorly. A matte print avoids glare.

### New video

```bash
ffmpeg -i new.mp4 -an -vf scale=1280:-2 -c:v libx264 -profile:v high -level 4.0 \
  -pix_fmt yuv420p -crf 22 -maxrate 3M -bufsize 6M -movflags +faststart assets/card-video.mp4
# optional fallback
ffmpeg -i new.mp4 -an -vf scale=1280:-2 -c:v libvpx-vp9 -b:v 0 -crf 34 assets/card-video.webm
```

Keep the video muted (no audio track needed): browsers only autoplay muted inline video. If the video's aspect ratio differs from the card's, set `video.fit` in `js/config.js`:
- `"cover"`: fills the card and crops the overflow. Never stretched.
- `"contain"`: shows the whole video, letterboxed.

### Tuning (`js/config.js`)

| Setting | Effect |
|---|---|
| `video.width / height` | Overlay box as a fraction of the card (1 = full card) |
| `video.offsetX / offsetY / offsetZ` | Shift the overlay, in card widths |
| `video.cornerRadius` | Rounded corners matching a rounded card |
| `video.loop` | Loop instead of holding the final frame |
| `tracking.filterMinCF / filterBeta` | Smoothing: jittery → lower `filterMinCF`; laggy → raise `filterBeta` |
| `tracking.warmupTolerance / missTolerance` | Frames needed to confirm found / lost |
| `tracking.lostGraceMs` | How long the overlay stays frozen after tracking drops (anti-flicker) |
| `ui.showScanAnother` | Show "Scan Another Card" after the video ends |

## How it behaves

- **Start AR** asks for the rear camera (inside the tap, as iOS requires). A denied permission, a missing camera, a busy camera, a non-HTTPS page, an in-app browser without camera access and missing WebGL each get their own screen with fix-it steps and a retry button.
- **Searching:** a scan frame and "Move your camera slowly over the card."
- **Found:** the video fades in on a plane that follows the card's position, rotation, scale and perspective, and plays automatically (muted, `playsinline` + `webkit-playsinline`). If autoplay is still blocked (e.g. iOS Low Power Mode), a **Tap to play** button appears.
- **Lost:** after the grace period the overlay hides, playback pauses and the status reads "Card lost — point back at the card." When the card is found again, playback resumes where it stopped.
- **Ended:** the final frame stays on the card and **Play Again** appears. No reload needed.
- **Errors:** a failed target or video load shows a clear message with **Try again** / **Retry video**.

## Loading speed

What's done to keep start-up short:
- **Tracker warm-up:** while the welcome screen is showing, the page downloads the target and builds the tracker's GPU shaders (the slowest step). Tapping Start then only opens the camera. In testing, tap → scanning went from about 2.9 s to 0.9 s. Turn it off with `tracking.prewarm: false`.
- **One camera open:** the camera is opened once, not twice.
- **Parallel downloads:** `modulepreload` fetches every script at once, and the target file is preloaded.
- **Minified libraries:** about 0.75 MB gzipped in total, including the target file.
- **Early video buffering:** the video starts buffering on page load (iOS waits for the tap).
- **Early taps:** a tap before the scripts arrive shows "Loading…" and starts automatically.

If you replace the card, a smaller target image (e.g. 800 px wide) makes `card-target.mind` smaller, at some cost to detection from far away.

## Deploying over HTTPS

Upload the whole `ar-card/` folder to any static host. All the hosts below serve HTTPS by default:

- **Netlify:** drag the `ar-card` folder onto <https://app.netlify.com/drop>, or `npx netlify-cli deploy --dir=ar-card --prod`.
- **Vercel:** `npx vercel ar-card --prod`.
- **Cloudflare Pages:** `npx wrangler pages deploy ar-card`.
- **GitHub Pages:** push the repo, then Settings → Pages → deploy from branch. The page lives at `https://<user>.github.io/<repo>/ar-card/`.

Notes:
- Serve `.mind` as `application/octet-stream` (the default almost everywhere) and allow byte-range requests for the MP4. All the hosts above do.
- If you move the video to a different domain/CDN, that host must send `Access-Control-Allow-Origin` (WebGL video textures need CORS).
- Optional caching: `vendor/` and `assets/` can be cached for a long time. Rename the files when you change them.

## QR code

```bash
npm run qr -- https://your-site.example/ar-card/        # writes qr-code.png + qr-code.svg
```

Use the SVG for print. Print it at least **2 × 2 cm** with a white border. The QR uses error-correction level Q so it survives handling. Scan it with the phone's normal camera app to test before printing a batch. Any QR generator works too, as long as it encodes the exact https URL.

## Testing

```bash
npm run test:ar
```

This renders two synthetic "phone camera" clips and feeds them to headless Chromium as a fake webcam, then runs the real site:
1. **Decoy clip** (an unrelated busy picture): it must never be detected.
2. **Card clip** (the card in perspective, drifting and rotating, then removed, then back): it must be detected, play the video, report the loss, be re-detected, and reach the end with Play Again.

Screenshots and state timelines go to `test-output/`. Use `VIEWPORT=800x600` to see the whole card on screen. Before printing, also test on a real iPhone (Safari) and Android phone (Chrome) with a printed card. Lighting, glare and print quality affect tracking in ways a synthetic test can't cover.

## Known limitations

- **Video length:** the supplied video is **6.0 s**, not 10 s. The site plays whatever length the file has; just replace the file.
- **Symmetric artwork:** the card art is nearly left/right symmetric, so a *mirrored* print of it can also be recognised. Unrelated images are not.
- **Glare and low light** are the main causes of lost tracking on glossy cards. A matte finish helps.
- **Performance:** tracking runs on the GPU via TensorFlow.js. Phones from roughly 2018 onward run it smoothly; very old devices may track slowly.
- **In-app browsers** (Instagram, Facebook, some QR-scanner apps) often block the camera. The page detects this and asks the user to open the link in Safari or Chrome.
- Vendored modules use relative imports (no import map), so the page loads on older Safari too. Camera access needs Safari on iOS 11+, or iOS 14.3+ for Chrome/Firefox on iPhone.
- `vendor/` holds minified copies of MindAR 1.2.5 (minified with esbuild) and three.js r160 (`three.module.min.js`). The only other change is that bare `three` imports are rewritten to relative paths. Re-apply both if you upgrade them.
