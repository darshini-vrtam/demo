// ---------------------------------------------------------------------------
// AR card configuration — the only file you normally need to edit when you
// swap the card artwork or the video. See README.md → "Replacing the assets".
// ---------------------------------------------------------------------------
export default {
  target: {
    // Compiled MindAR image target (build it with `npm run compile-target`).
    src: "assets/card-target.mind",
    // Index of the image inside the .mind file (0 when it holds one image).
    index: 0,
  },

  video: {
    // First source the browser can play wins. H.264 MP4 (yuv420p, +faststart)
    // plays on iOS Safari and Android Chrome; the WebM is a fallback for browsers
    // without H.264 (some Linux/Chromium builds). Delete it if you don't need it.
    sources: [
      { src: "assets/card-video.mp4", type: 'video/mp4; codecs="avc1.640028"' },
      { src: "assets/card-video.webm", type: 'video/webm; codecs="vp9"' },
    ],
    // How the video fills the overlay box:
    //   "cover"   – fill the whole box, cropping the video if aspect ratios differ
    //   "contain" – show the whole video, letterboxed inside the box
    fit: "cover",
    // Overlay box size as a fraction of the card's width / height (1 = full card).
    width: 1,
    height: 1,
    // Offset from the card's centre, in card widths (+x right, +y up).
    offsetX: 0,
    offsetY: 0,
    // Small lift off the card surface so the overlay never z-fights the print.
    offsetZ: 0.002,
    // Rounded overlay corners, as a fraction of the card width (0 = square).
    cornerRadius: 0.025,
    // Play once, then hold the final frame (false) or loop forever (true).
    loop: false,
  },

  tracking: {
    // One-Euro smoothing filter (MindAR defaults). Jittery overlay → lower
    // filterMinCF (e.g. 0.0001). Laggy overlay → raise filterBeta (e.g. 10000).
    filterMinCF: 0.001,
    filterBeta: 1000,
    // Frames the card must be seen before it counts as found / missed before lost.
    warmupTolerance: 5,
    missTolerance: 5,
    // Extra time (ms) the overlay stays frozen in place after tracking is lost,
    // so a momentary miss doesn't make it flicker.
    lostGraceMs: 600,
    // Build the tracker's GPU shaders while the welcome screen shows, so
    // tapping Start is ~2 s faster. Set false to skip.
    prewarm: true,
    // Give up starting AR after this long (ms) and show an error.
    startTimeoutMs: 30000,
  },

  ui: {
    // Set true once the experience supports several cards.
    showScanAnother: false,
  },
};
