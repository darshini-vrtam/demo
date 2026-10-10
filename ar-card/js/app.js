import * as THREE from "../vendor/three/three.module.min.js";
import { MindARThree } from "../vendor/mind-ar/mindar-image-three.prod.js";
// MindAR's tracking controller (same chunk MindARThree uses; no extra download).
import { C as Controller } from "../vendor/mind-ar/controller-mGt1s8dJ.js";
import config from "./config.js";

// ---------------------------------------------------------------------------
// DOM
// ---------------------------------------------------------------------------
const $ = (id) => document.getElementById(id);
const ui = {
  container: $("ar-container"),
  start: $("btn-start"),
  loadingText: $("loading-text"),
  loadingHint: $("loading-hint"),
  statusText: $("status-text"),
  tapPlay: $("btn-tap-play"),
  replay: $("btn-replay"),
  replayLabel: $("btn-replay-label"),
  scanAnother: $("btn-scan-another"),
  msgIcon: $("msg-icon"),
  msgTitle: $("msg-title"),
  msgBody: $("msg-body"),
  msgSteps: $("msg-steps"),
  retry: $("btn-retry"),
};

// UI state shown by CSS via body[data-state]:
// welcome | loading | searching | playing | lost | ended | error
function setState(state, statusText) {
  document.body.dataset.state = state;
  if (statusText) ui.statusText.textContent = statusText;
}

const STATUS = {
  searching: "Move your camera slowly over the card.",
  found: "Card found",
  buffering: "Loading the story…",
  lost: "Card lost — point back at the card.",
  ended: "That's the story. Play it again?",
  blocked: "Tap to play the story.",
};

// ---------------------------------------------------------------------------
// Overlay video (a hidden <video> used as a WebGL texture)
// ---------------------------------------------------------------------------
const video = document.createElement("video");
video.muted = true;
video.defaultMuted = true;
video.playsInline = true;
video.loop = !!config.video.loop;
video.preload = "auto";
video.crossOrigin = "anonymous";
video.setAttribute("muted", "");
video.setAttribute("playsinline", "");
video.setAttribute("webkit-playsinline", "");
// Kept in the DOM (but invisible) — some iOS versions won't decode detached videos.
Object.assign(video.style, { position: "absolute", width: "1px", height: "1px", opacity: "0", pointerEvents: "none", left: "0", top: "0" });
document.body.appendChild(video);
// Start fetching the video right away (iOS waits for the tap; others buffer now).
video.src = pickVideoSource();

// MindAR swallows camera errors, so remember the last one to tell
// "permission denied" apart from "no camera" — without opening the camera twice.
let lastCameraError = null;
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  const gum = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
  navigator.mediaDevices.getUserMedia = (constraints) =>
    gum(constraints).catch((err) => { lastCameraError = err; throw err; });
}

// ---------------------------------------------------------------------------
// Experience state
// ---------------------------------------------------------------------------
let mindar = null;
let overlay = null; // { root, mesh, material }
let tracked = false; // MindAR currently sees the card
let shown = false; // overlay currently visible (tracked, or within the grace period)
let lostTimer = null;
let playback = "idle"; // idle | playing | paused | ended | blocked | error
let fade = 0; // 0..1 overlay reveal
let starting = false;

// ---------------------------------------------------------------------------
// Start-up
// ---------------------------------------------------------------------------
ui.start.addEventListener("click", start);
// A tap that landed before this module finished loading (see index.html).
if (window.__arStartQueued) queueMicrotask(start);
ui.retry.addEventListener("click", () => retryAction());
ui.replay.addEventListener("click", replay);
ui.tapPlay.addEventListener("click", () => playVideo(true));
ui.scanAnother.addEventListener("click", () => {
  // Single-card build: reset so the next detection starts the story fresh.
  hideOverlay(true);
  video.pause();
  video.currentTime = 0;
  playback = "idle";
  updateControls();
  setState("searching", STATUS.searching);
});

let retryAction = start;

// ---------------------------------------------------------------------------
// Warm-up: while the welcome screen is showing, download the target and build
// the tracker's GPU shaders (the slowest part of starting AR, ~2 s on phones).
// Compiled shaders are cached by the GPU backend, so the real start skips it.
// ---------------------------------------------------------------------------
let targetPromise = null;
function loadTarget() {
  // Fetch the image target ourselves so a missing/broken file is a clear error
  // (MindAR would otherwise hang silently). Reuses the <link rel=preload>.
  if (!targetPromise) {
    targetPromise = fetch(config.target.src).then((res) => {
      if (!res.ok) throw new Error(`Target file ${config.target.src} returned ${res.status}`);
      return res.arrayBuffer();
    });
    targetPromise.catch(() => { targetPromise = null; }); // allow a retry
  }
  return targetPromise;
}

let warmPromise = null;
function warmUp() {
  if (!warmPromise) {
    warmPromise = loadTarget().then((buffer) => {
      if (mindar || unsupportedReason()) return;
      const c = new Controller({ inputWidth: 640, inputHeight: 480, maxTrack: 1 });
      try {
        c.addImageTargetsFromBuffer(buffer.slice(0));
        const canvas = document.createElement("canvas");
        canvas.width = 640;
        canvas.height = 480;
        c.dummyRun(canvas);
      } finally {
        c.dispose();
        c.worker && c.worker.terminate();
      }
    }).catch((err) => console.warn("Warm-up skipped:", err));
  }
  return warmPromise;
}

if (config.tracking.prewarm !== false) {
  const schedule = () => setTimeout(() => (window.requestIdleCallback || setTimeout)(() => warmUp(), { timeout: 1500 }), 300);
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
}

function pickVideoSource() {
  const sources = config.video.sources || [{ src: config.video.src }];
  const playable = sources.find((s) => !s.type || video.canPlayType(s.type) !== "");
  return (playable || sources[0]).src;
}

function unsupportedReason() {
  if (!window.isSecureContext) return "insecure";
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return "nocamera-api";
  try {
    const c = document.createElement("canvas");
    if (!(c.getContext("webgl2") || c.getContext("webgl"))) return "nowebgl";
  } catch {
    return "nowebgl";
  }
  return null;
}

async function start() {
  if (starting) return;
  starting = true;

  const reason = unsupportedReason();
  if (reason) {
    starting = false;
    return showUnsupported(reason);
  }

  // Prime the overlay video inside the user gesture so iOS lets us start it
  // later from the tracking callback.
  if (!video.src) video.src = pickVideoSource();
  const prime = video.play();
  if (prime) prime.then(() => {
    if (playback === "idle") { video.pause(); video.currentTime = 0; }
  }).catch(() => {});

  setState("loading");
  ui.loadingText.textContent = "Starting camera…";
  ui.loadingHint.hidden = false;
  lastCameraError = null;

  try {
    const buffer = await loadTarget();
    if (warmPromise) await warmPromise; // a warm-up in flight finishes first (shares its work)
    const targetUrl = URL.createObjectURL(new Blob([buffer]));
    await withTimeout(startMindAR(targetUrl), config.tracking.startTimeoutMs, "Starting AR took too long.");
    starting = false;
    setState("searching", STATUS.searching);
  } catch (err) {
    console.error(err);
    starting = false;
    teardown();
    if (lastCameraError) return showCameraError(lastCameraError);
    showError({
      title: "Couldn't start the AR experience",
      body: err && err.message ? err.message : "The camera or tracking engine failed to start.",
      action: "Try again",
      onAction: start,
    });
  }
}

async function startMindAR(targetUrl) {
  teardown();
  const t = config.tracking;
  mindar = new MindARThree({
    container: ui.container,
    imageTargetSrc: targetUrl,
    maxTrack: 1,
    uiLoading: "no",
    uiScanning: "no",
    uiError: "no",
    filterMinCF: t.filterMinCF,
    filterBeta: t.filterBeta,
    warmupTolerance: t.warmupTolerance,
    missTolerance: t.missTolerance,
  });

  const { renderer, scene, camera } = mindar;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  if ("outputColorSpace" in renderer) renderer.outputColorSpace = THREE.SRGBColorSpace;

  const anchor = mindar.addAnchor(config.target.index);
  anchor.onTargetFound = onTargetFound;
  anchor.onTargetLost = onTargetLost;
  anchor.onTargetUpdate = () => {
    // Copy the live pose onto our own root, so that during the grace period
    // after a loss the overlay can stay frozen at its last known pose.
    if (anchor.visible && overlay) {
      overlay.root.matrix.copy(anchor.group.matrix);
      overlay.root.matrixWorldNeedsUpdate = true;
    }
  };

  const shownCamera = () => {
    ui.loadingHint.hidden = true;
    ui.loadingText.textContent = "Preparing tracking…";
  };
  const camTimer = setInterval(() => { if (mindar && mindar.video && mindar.video.videoWidth) { shownCamera(); clearInterval(camTimer); } }, 100);
  try {
    await mindar.start();
  } catch (err) {
    // MindAR rejects without a reason when the camera can't be opened.
    throw err instanceof Error ? err : new Error("The camera could not be opened by the tracking engine.");
  } finally {
    clearInterval(camTimer);
  }

  // Card proportions come from the compiled target itself.
  const [w, h] = mindar.controller.markerDimensions[config.target.index];
  overlay = buildOverlay(h / w);
  scene.add(overlay.root);

  let last = performance.now();
  renderer.setAnimationLoop((now) => {
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    tick(dt);
    renderer.render(scene, camera);
  });
}

function teardown() {
  if (!mindar) return;
  try { mindar.renderer.setAnimationLoop(null); } catch {}
  try { mindar.stop(); } catch {}
  try { mindar.renderer.dispose(); } catch {}
  ui.container.replaceChildren();
  mindar = null;
  overlay = null;
  tracked = shown = false;
  clearTimeout(lostTimer);
}

function withTimeout(promise, ms, message) {
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(message)), ms); }),
  ]).finally(() => clearTimeout(timer));
}

// ---------------------------------------------------------------------------
// Overlay geometry: a video-textured plane sitting on the card
// ---------------------------------------------------------------------------
function buildOverlay(cardAspect) {
  const v = config.video;
  // MindAR anchor space: the card is 1 unit wide, centred on the origin.
  const boxW = v.width;
  const boxH = v.height * cardAspect;

  const texture = new THREE.VideoTexture(video);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  const alphaMap = roundedRectTexture(boxW, boxH, v.cornerRadius);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    alphaMap,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    toneMapped: false,
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  mesh.position.set(v.offsetX, v.offsetY, v.offsetZ);
  mesh.visible = false;

  const root = new THREE.Group();
  root.matrixAutoUpdate = false;
  root.add(mesh);

  const fit = () => {
    const va = video.videoWidth && video.videoHeight ? video.videoWidth / video.videoHeight : boxW / boxH;
    const ba = boxW / boxH;
    texture.repeat.set(1, 1);
    texture.offset.set(0, 0);
    if (v.fit === "contain") {
      // Shrink the plane to the video's aspect inside the box.
      if (va > ba) mesh.userData.size = [boxW, boxW / va];
      else mesh.userData.size = [boxH * va, boxH];
    } else {
      // Fill the box and crop the video's overflow, keeping its aspect.
      mesh.userData.size = [boxW, boxH];
      if (va > ba) { texture.repeat.x = ba / va; texture.offset.x = (1 - texture.repeat.x) / 2; }
      else { texture.repeat.y = va / ba; texture.offset.y = (1 - texture.repeat.y) / 2; }
    }
    mesh.userData.size && mesh.scale.set(mesh.userData.size[0], mesh.userData.size[1], 1);
  };
  fit();
  video.addEventListener("loadedmetadata", fit);

  return { root, mesh, material, fit };
}

// Rounded-rectangle alpha mask with a hair of edge feathering.
function roundedRectTexture(w, h, radius) {
  const W = 512;
  const H = Math.max(2, Math.round((W * h) / w));
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);
  const r = Math.min((radius / w) * W, H / 2);
  const inset = 1.5;
  ctx.fillStyle = "#fff";
  ctx.filter = "blur(1px)";
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(inset, inset, W - inset * 2, H - inset * 2, r);
  else ctx.rect(inset, inset, W - inset * 2, H - inset * 2);
  ctx.fill();
  const tex = new THREE.CanvasTexture(canvas);
  tex.generateMipmaps = false;
  tex.minFilter = THREE.LinearFilter;
  return tex;
}

// Per-frame reveal animation: fade + a slight rise off the card.
function tick(dt) {
  if (!overlay) return;
  const ready = video.readyState >= 2; // have a frame to show
  const target = shown && ready ? 1 : 0;
  const speed = target ? 3.2 : 6;
  fade += Math.sign(target - fade) * Math.min(Math.abs(target - fade), dt * speed);
  const e = 1 - Math.pow(1 - fade, 3);
  overlay.material.opacity = e;
  overlay.mesh.visible = fade > 0.001;
  const s = 0.94 + 0.06 * e;
  const [sw, sh] = overlay.mesh.userData.size || [1, 1];
  overlay.mesh.scale.set(sw * s, sh * s, 1);
  overlay.mesh.position.z = config.video.offsetZ + 0.03 * (1 - e);
}

// ---------------------------------------------------------------------------
// Tracking events
// ---------------------------------------------------------------------------
function onTargetFound() {
  tracked = true;
  clearTimeout(lostTimer);
  lostTimer = null;
  if (!shown) shown = true;

  if (playback === "ended") {
    setState("ended", STATUS.ended);
  } else if (playback === "error") {
    showVideoError();
  } else {
    playVideo(false);
  }
  updateControls();
}

function onTargetLost() {
  tracked = false;
  clearTimeout(lostTimer);
  // Grace period: keep the overlay frozen at its last pose for a moment.
  lostTimer = setTimeout(() => {
    lostTimer = null;
    if (tracked) return;
    hideOverlay(false);
  }, config.tracking.lostGraceMs);
}

function hideOverlay(immediate) {
  shown = false;
  if (immediate) fade = 0;
  if (playback === "playing") {
    video.pause();
    playback = "paused";
  }
  if (document.body.dataset.state !== "error") {
    setState(playback === "idle" ? "searching" : "lost", playback === "idle" ? STATUS.searching : STATUS.lost);
  }
  updateControls();
}

// ---------------------------------------------------------------------------
// Playback
// ---------------------------------------------------------------------------
function playVideo(fromGesture) {
  if (!tracked && !fromGesture) return;
  if (playback === "idle" && video.currentTime > 0) video.currentTime = 0; // first reveal starts at the top
  const p = video.play();
  playback = "playing";
  setState("playing", video.readyState >= 3 ? STATUS.found : STATUS.buffering);
  updateControls();
  if (p && p.catch) {
    p.catch((err) => {
      if (err && err.name === "NotAllowedError") {
        // Autoplay blocked (e.g. Low Power Mode on iOS): ask for a tap.
        playback = "blocked";
        setState("playing", STATUS.blocked);
      } else if (err && err.name !== "AbortError") {
        onVideoError();
      }
      updateControls();
    });
  }
}

function replay() {
  video.currentTime = 0;
  playVideo(true);
}

video.addEventListener("playing", () => {
  if (playback === "playing" && shown) setState("playing", STATUS.found);
});
video.addEventListener("waiting", () => {
  if (playback === "playing" && shown) setState("playing", STATUS.buffering);
});
video.addEventListener("ended", () => {
  // The last decoded frame stays on the texture, so the card keeps its final image.
  playback = "ended";
  if (shown) setState("ended", STATUS.ended);
  updateControls();
});
video.addEventListener("error", onVideoError);

function onVideoError() {
  if (!video.error && playback !== "playing") return;
  console.warn("Video error", video.error);
  playback = "error";
  updateControls();
  // Before the card has been seen, keep scanning; report it once the card is found.
  if (shown) showVideoError();
}

function showVideoError() {
  showError({
    title: "The video couldn't load",
    body: "Check your connection, then try again. The camera stays on.",
    action: "Retry video",
    onAction: () => {
      video.src = pickVideoSource();
      video.load();
      playback = "idle";
      setState(tracked ? "playing" : "searching", tracked ? STATUS.buffering : STATUS.searching);
      if (tracked) playVideo(true);
    },
  });
}

function updateControls() {
  const inAR = !!mindar;
  ui.tapPlay.hidden = !(inAR && playback === "blocked" && shown);
  const showReplay = inAR && shown && (playback === "ended" || playback === "playing");
  ui.replay.hidden = !showReplay;
  ui.replayLabel.textContent = playback === "ended" ? "Play Again" : "Replay";
  ui.scanAnother.hidden = !(config.ui.showScanAnother && inAR && playback === "ended");
}

// ---------------------------------------------------------------------------
// Error / unsupported screens
// ---------------------------------------------------------------------------
const ua = navigator.userAgent;
const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isAndroid = /Android/.test(ua);
const isInApp = /FBAN|FBAV|Instagram|Line\/|LinkedInApp|Snapchat|TikTok|; wv\)/.test(ua);

function showError({ title, body, steps, action, onAction, icon = "!" }) {
  ui.msgIcon.textContent = icon;
  ui.msgTitle.textContent = title;
  ui.msgBody.textContent = body;
  ui.msgSteps.replaceChildren(...(steps || []).map((s) => Object.assign(document.createElement("li"), { textContent: s })));
  ui.msgSteps.hidden = !steps || !steps.length;
  ui.retry.textContent = action || "Try again";
  ui.retry.hidden = !onAction;
  retryAction = onAction || (() => {});
  setState("error");
}

function showCameraError(err) {
  const name = err && err.name;
  console.warn("Camera error", err);
  if (name === "NotAllowedError" || name === "SecurityError" || name === "PermissionDeniedError") {
    const steps = isIOS
      ? ["Tap “aA” in the Safari address bar.", "Choose Website Settings → Camera → Allow.", "Come back and tap Try again."]
      : isAndroid
        ? ["Tap the lock icon next to the address.", "Open Permissions → Camera → Allow.", "Come back and tap Try again."]
        : ["Click the camera icon in the address bar.", "Allow camera access for this site.", "Then try again."];
    return showError({
      icon: "◎",
      title: "Camera access is off",
      body: "The experience needs your camera to find the card. Nothing is recorded or uploaded.",
      steps,
      action: "Try again",
      onAction: start,
    });
  }
  if (name === "NotFoundError" || name === "OverconstrainedError" || name === "DevicesNotFoundError") {
    return showError({
      title: "No camera found",
      body: "This device doesn't seem to have a camera we can use. Open this page on a phone to scan the card.",
      action: "Try again",
      onAction: start,
    });
  }
  if (name === "NotReadableError" || name === "TrackStartError" || name === "AbortError") {
    return showError({
      title: "Camera is busy",
      body: "Another app may be using the camera. Close it, then try again.",
      action: "Try again",
      onAction: start,
    });
  }
  showError({ title: "Couldn't start the camera", body: (err && err.message) || "Unknown camera error.", action: "Try again", onAction: start });
}

function showUnsupported(reason) {
  const browser = isIOS ? "Safari" : isAndroid ? "Chrome" : "Chrome or Safari";
  const bodies = {
    insecure: "Camera access only works on a secure (https://) page. Open the secure link to continue.",
    "nocamera-api": isInApp
      ? `This in-app browser can't use the camera. Open the link in ${browser} instead (⋯ menu → Open in browser).`
      : `This browser can't use the camera. Please open the link in ${browser}.`,
    nowebgl: `This browser can't show 3D graphics (WebGL). Please open the link in an up-to-date ${browser}.`,
  };
  showError({
    title: "This browser isn't supported",
    body: bodies[reason],
    action: reason === "insecure" ? "Open secure link" : "Try again",
    onAction: reason === "insecure"
      ? () => { location.href = location.href.replace(/^http:/, "https:"); }
      : start,
  });
}

// Pause work when the tab is hidden; resume when back.
document.addEventListener("visibilitychange", () => {
  if (document.hidden && playback === "playing") {
    video.pause();
    playback = "paused";
  } else if (!document.hidden && tracked && playback === "paused") {
    playVideo(false);
  }
});

// Debug hooks for automated tests (tools/test-tracking.mjs).
window.__arcard = {
  get state() { return document.body.dataset.state; },
  get playback() { return playback; },
  get tracked() { return tracked; },
  get videoTime() { return video.currentTime; },
};
