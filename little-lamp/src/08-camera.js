// ───────────────────────── Optional camera play: hand pinch + face expressions ─────────────────────────
// Never required. Any failure (no camera, permission refused, library or model blocked) silently leaves tap/drag in charge.
const CAMIN = { status: 'off', hand: null, face: null, video: null, hl: null, fl: null, lastVT: -1, frames: 0, why: '' };
const MP_VER = '0.10.14';
async function camStart() {
  if (CAMIN.status === 'loading' || CAMIN.status === 'on') return;
  CAMIN.status = 'loading'; camButton();
  const fail = why => { CAMIN.status = 'unavailable'; CAMIN.why = why; camButton(); try { CAMIN.video && CAMIN.video.srcObject && CAMIN.video.srcObject.getTracks().forEach(t => t.stop()); } catch (e) { } };
  const timeout = (p, ms, why) => Promise.race([p, new Promise((_, r) => setTimeout(() => r(new Error(why)), ms))]);
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error('no getUserMedia');
    const stream = await timeout(navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 640, height: 480 }, audio: false }), 12000, 'camera timeout');
    const v = CAMIN.video = document.createElement('video'); v.muted = true; v.playsInline = true; v.srcObject = stream; await v.play();
    const base = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MP_VER}`;
    const vision = await timeout(import(`${base}/vision_bundle.mjs`), 15000, 'library timeout');
    const files = await timeout(vision.FilesetResolver.forVisionTasks(`${base}/wasm`), 15000, 'wasm timeout');
    CAMIN.hl = await timeout(vision.HandLandmarker.createFromOptions(files, { baseOptions: { modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task' }, runningMode: 'VIDEO', numHands: 1 }), 20000, 'hand model timeout');
    try { CAMIN.fl = await timeout(vision.FaceLandmarker.createFromOptions(files, { baseOptions: { modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task' }, runningMode: 'VIDEO', numFaces: 1, outputFaceBlendshapes: true }), 20000, 'face model timeout'); } catch (e) { CAMIN.fl = null; }
    CAMIN.status = 'on'; camButton(); camLoop();
  } catch (e) { fail(String(e && e.message || e)); }
}
function camStop() { CAMIN.status = 'off'; try { CAMIN.video.srcObject.getTracks().forEach(t => t.stop()); } catch (e) { } CAMIN.hand = null; CAMIN.face = null; camButton(); }
function camLoop() {
  if (CAMIN.status !== 'on') return;
  const v = CAMIN.video, now = performance.now();
  if (v.readyState >= 2 && v.currentTime !== CAMIN.lastVT) {
    CAMIN.lastVT = v.currentTime; CAMIN.frames++;
    try {
      const r = CAMIN.hl.detectForVideo(v, now);
      const lm = r && r.landmarks && r.landmarks[0];
      if (lm) {
        const ix = lm[8], th = lm[4];
        const nx = clamp((1 - ix.x - 0.15) / 0.7), ny = clamp((ix.y - 0.12) / 0.7);
        const x = nx * V.W, y = ny * V.H, pinchD = Math.hypot(ix.x - th.x, ix.y - th.y);
        const h = CAMIN.hand || (CAMIN.hand = { x, y, down: false, seen: 0 });
        h.x = lerp(h.x, x, 0.5); h.y = lerp(h.y, y, 0.5); h.seen = CLK.t; h.nx = nx;
        inMove(h.x, h.y, 'hand');
        if (!h.down && pinchD < 0.055) { h.down = true; inDown(h.x, h.y, 'hand'); }
        else if (h.down && pinchD > 0.085) { h.down = false; inUp(h.x, h.y, 'hand'); }
      } else if (CAMIN.hand && CAMIN.hand.down && CLK.t - CAMIN.hand.seen > 0.4) { CAMIN.hand.down = false; inUp(CAMIN.hand.x, CAMIN.hand.y, 'hand'); }
      if (CAMIN.fl && CAMIN.frames % 2 === 0) {
        const f = CAMIN.fl.detectForVideo(v, now), bs = f && f.faceBlendshapes && f.faceBlendshapes[0];
        if (bs) {
          const B = {}; bs.categories.forEach(c => B[c.categoryName] = c.score);
          const smile = ((B.mouthSmileLeft || 0) + (B.mouthSmileRight || 0)) / 2, jaw = B.jawOpen || 0, brow = B.browInnerUp || 0, frown = ((B.browDownLeft || 0) + (B.browDownRight || 0)) / 2;
          const kind = jaw > 0.42 ? 'open' : smile > 0.45 ? 'smile' : (frown > 0.35 || (B.mouthPucker || 0) > 0.5) ? 'think' : 'calm';
          const prev = CAMIN.face; CAMIN.face = { kind, since: prev && prev.kind === kind ? prev.since : CLK.t, seen: CLK.t, smile, jaw, brow };
        }
      }
    } catch (e) { }
  }
  requestAnimationFrame(camLoop);
}
const faceKind = () => CAMIN.face && CAMIN.face.seen > CLK.t - 0.6 ? CAMIN.face : null;
function camButton() {
  const b = document.getElementById('bCam'); if (!b) return;
  b.setAttribute('aria-pressed', CAMIN.status === 'on' ? 'true' : 'false');
  b.classList.toggle('off', CAMIN.status !== 'on');
  b.title = CAMIN.status === 'on' ? 'Camera play is on (tap to stop)' : CAMIN.status === 'loading' ? 'Starting camera play…' : 'Camera play (optional)';
}
