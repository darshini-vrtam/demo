/* ══════════ Onboarding · camera window · hand & face tracking · music ══════════
   The camera is optional. When the child allows it, a small mirrored window sits at the bottom of the
   screen (drag it anywhere). Hand tracking drives the namaste, packing and vine activities; face tracking
   (mouth open) drives Moo Munch. Without a camera everything works with tap and drag. */
const KID = { name: '' };
try { KID.name = localStorage.getItem('mb-kid-name') || ''; } catch (e) { }
const kidName = () => KID.name || 'little friend';

const MP = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14';
const HAND_MODEL = 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';
const FACE_MODEL = 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';

const Cam = {
  stream: null, on: false, allowed: false,
  async start() {
    if (this.on) return true;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error('camera API unavailable');
    this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }, audio: false });
    const v = $('#camv'); v.srcObject = this.stream; await v.play();
    this.on = true; this.allowed = true; $('#camwin').hidden = false;
    Vision.load().catch(() => { });
    return true;
  },
  stop() {
    Hands.stop(); Face.stop();
    if (this.stream) this.stream.getTracks().forEach(t => t.stop());
    this.stream = null; this.on = false; this.allowed = false;
    $('#camwin').hidden = true; camTip(null);
  }
};
// the camera window can be dragged anywhere on screen
(() => {
  const w = $('#camwin'); let drag = null;
  w.addEventListener('pointerdown', e => {
    if (e.target.closest('button')) return;
    const b = w.getBoundingClientRect(); drag = { dx: e.clientX - b.left, dy: e.clientY - b.top };
    try { w.setPointerCapture(e.pointerId); } catch (_) { } w.classList.add('drag');
  });
  w.addEventListener('pointermove', e => {
    if (!drag) return;
    const x = Math.max(4, Math.min(innerWidth - w.offsetWidth - 4, e.clientX - drag.dx)), y = Math.max(4, Math.min(innerHeight - w.offsetHeight - 4, e.clientY - drag.dy));
    w.style.left = x + 'px'; w.style.top = y + 'px'; w.style.right = 'auto'; w.style.bottom = 'auto';
  });
  const end = () => { drag = null; w.classList.remove('drag'); };
  w.addEventListener('pointerup', end); w.addEventListener('pointercancel', end);
  $('#camx').addEventListener('click', () => { Cam.stop(); toast('Camera off. Tap and drag work just as well!'); });
})();

const Vision = {
  p: null, failed: false,
  load() {
    return this.p || (this.p = (async () => {
      const v = await import(MP + '/vision_bundle.mjs');
      const files = await v.FilesetResolver.forVisionTasks(MP + '/wasm');
      return { v, files };
    })().catch(e => { this.p = null; this.failed = true; throw e; }));
  }
};

// Hand tracking: the hand's centre steers a cursor, pinch or fist grabs, two palms together = namaste.
const Hands = {
  on: false, busy: false, lm: null, raf: 0, down: false, sx: 0, sy: 0, lastT: -1, nam: false,
  async start() {
    if (this.on) return true;
    if (this.busy) return false;
    this.busy = true; $('#bhands').classList.add('busy');
    try {
      await Cam.start();
      if (!this.lm) {
        const { v, files } = await Vision.load();
        this.lm = await v.HandLandmarker.createFromOptions(files, { baseOptions: { modelAssetPath: HAND_MODEL, delegate: 'GPU' }, runningMode: 'VIDEO', numHands: 2 });
      }
      this.on = true; $('#bhands').setAttribute('aria-pressed', 'true'); $('#camwin').classList.add('live');
      this.loop(); return true;
    } catch (e) { console.warn('[hands] unavailable:', e); return false; }
    finally { this.busy = false; $('#bhands').classList.remove('busy'); }
  },
  stop() {
    cancelAnimationFrame(this.raf); this.on = false;
    $('#handcur').hidden = true; $('#bhands').setAttribute('aria-pressed', 'false'); $('#camwin').classList.remove('live');
    if (this.down) { this.down = false; Input.emit('up', this.sx, this.sy, 'hand'); }
  },
  async toggle() {
    if (this.on || Cam.on) { Cam.stop(); toast('Camera off. Tap and drag work just as well!'); return; }
    const ok = await this.start();
    if (ok) toast('Camera on! Point with your hand. Pinch or make a fist to grab, open your hand to let go. Palms together = namaste.');
    else { Cam.allowed = Cam.on; toast("The hand camera isn't available here. Tapping and dragging work everywhere."); }
  },
  loop() {
    if (!this.on) return;
    const v = $('#camv');
    if (v.readyState >= 2 && v.currentTime !== this.lastT) {
      this.lastT = v.currentTime;
      try { const r = this.lm.detectForVideo(v, performance.now()); this.process(r.landmarks || []); } catch (e) { }
    }
    this.raf = requestAnimationFrame(() => this.loop());
  },
  process(hands) {
    const cur = $('#handcur');
    if (!hands.length) { if (this.down) { this.down = false; Input.emit('up', this.sx, this.sy, 'hand'); } cur.hidden = true; return; }
    const d = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
    const h = hands[0], palm = d(h[0], h[9]) || .1;
    // map the middle 80% of the camera frame to the whole screen so small movements reach the edges
    const tx = Math.max(0, Math.min(1, ((1 - h[9].x) - .1) / .8)) * innerWidth, ty = Math.max(0, Math.min(1, (h[9].y - .1) / .8)) * innerHeight;
    this.sx += (tx - this.sx) * .45; this.sy += (ty - this.sy) * .45;
    cur.hidden = false; cur.style.left = this.sx + 'px'; cur.style.top = this.sy + 'px';
    const pinch = d(h[4], h[8]) < palm * .38;
    const tips = [8, 12, 16, 20].reduce((s, i) => s + d(h[i], h[0]), 0) / 4;
    const fist = tips < palm * 1.15;
    const grab = pinch || fist;
    cur.classList.toggle('grab', grab);
    Input.emit('move', this.sx, this.sy, 'hand');
    if (grab !== this.down) { this.down = grab; Input.emit(grab ? 'down' : 'up', this.sx, this.sy, 'hand'); }
    if (hands.length >= 2) {
      const h2 = hands[1], gap = d(h[9], h2[9]) / palm;
      Input.emit('hands2', gap, 0, 'hand');
      const close = gap < 1.2 && !fist;
      if (close && !this.nam) { this.nam = true; Input.emit('namaste', this.sx, this.sy, 'hand'); } else if (!close) this.nam = false;
    }
  }
};

// Face tracking for Moo Munch: Face.open is the jawOpen blendshape (0 = closed, 1 = wide open).
const Face = {
  on: false, busy: false, lm: null, raf: 0, lastT: -1, open: 0, brow: 0, browBase: null, raise: 0,
  async start() {
    if (this.on) return true;
    if (this.busy) return false;
    this.busy = true;
    try {
      await Cam.start();
      if (!this.lm) {
        const { v, files } = await Vision.load();
        this.lm = await v.FaceLandmarker.createFromOptions(files, { baseOptions: { modelAssetPath: FACE_MODEL, delegate: 'GPU' }, runningMode: 'VIDEO', numFaces: 1, outputFaceBlendshapes: true });
      }
      this.on = true; $('#camwin').classList.add('live'); this.loop(); return true;
    } catch (e) { console.warn('[face] unavailable:', e); return false; }
    finally { this.busy = false; }
  },
  stop() { cancelAnimationFrame(this.raf); this.on = false; this.open = 0; this.raise = 0; this.browBase = null; $('#camwin').classList.remove('live'); },
  loop() {
    if (!this.on) return;
    const v = $('#camv');
    if (v.readyState >= 2 && v.currentTime !== this.lastT) {
      this.lastT = v.currentTime;
      try {
        const r = this.lm.detectForVideo(v, performance.now());
        const cats = r.faceBlendshapes && r.faceBlendshapes[0] ? r.faceBlendshapes[0].categories : [];
        const j = cats.find(c => c.categoryName === 'jawOpen');
        this.open = j ? j.score : 0;
        const sc = n => { const c = cats.find(c => c.categoryName === n); return c ? c.score : 0; };
        const b = Math.max(sc('browInnerUp'), (sc('browOuterUpLeft') + sc('browOuterUpRight')) / 2);
        this.brow = b;
        if (this.browBase == null) this.browBase = b; else if (b < this.browBase + .12) this.browBase += (b - this.browBase) * .03;
        this.raise = Math.max(0, b - this.browBase);
      } catch (e) { }
    }
    this.raf = requestAnimationFrame(() => this.loop());
  }
};

// Instructions shown above the camera window while an activity is running.
const CAMTIP = {
  namaste: { icon: '🙏', text: 'Show both hands to the camera, then press your palms together.', say: 'Show both your hands to the camera, then press your palms together, and say namaste!' },
  grab: { icon: '✋', text: 'Point with one hand. Pinch or make a fist to grab, open your hand to let go.', say: 'Show one hand to the camera. Pinch your fingers to grab, and open your hand to let go!' },
  face: { icon: '😮', text: 'Look at the camera and open your mouth wide to munch!', say: 'Look at the camera, and open your mouth wide to help Sanjivaka munch!' },
  brow: { icon: '🤨', text: 'Look at the camera and raise your eyebrows high to jump!', say: 'Look at the camera, and raise your eyebrows up high to make Pingalaka jump!' },
  point: { icon: '👆', text: 'Move your hand to point. Pinch your fingers together to tap!', say: 'Use your hand! Point at it, then pinch your fingers together to tap.' }
};
const FACE_TIPS = new Set(['face', 'brow']);
function camTip(k) {
  const el = $('#camtip');
  if (!k || !Cam.allowed || !CAMTIP[k]) { el.hidden = true; return; }
  el.innerHTML = ''; const i = document.createElement('b'); i.textContent = CAMTIP[k].icon; const t = document.createElement('span'); t.textContent = CAMTIP[k].text;
  el.append(i, t); el.hidden = false;
}
function tipFor(hint) { return /namaste/i.test(hint) ? 'namaste' : /\bmouth\b/i.test(hint) ? 'face' : /eyebrow/i.test(hint) ? 'brow' : /\b(pinch|grab|drag|pull)\b/i.test(hint) ? 'grab' : 'point'; }

/* ══════════ Music: tanpura drone, bansuri melody, soft tabla — one mood per scene ══════════ */
const SA = 261.63;
const RAGA = {
  bright: [0, 2, 4, 7, 9, 12, 14, 16], // Bhupali-like pentatonic
  royal: [0, 2, 4, 5, 7, 9, 11, 12, 14], // Bilawal
  calm: [0, 2, 5, 7, 9, 12, 14], // Durga
  sad: [0, 1, 3, 5, 7, 8, 10, 12], // Bhairavi
  tense: [0, 1, 4, 6, 7, 8, 11, 12], // Marwa-ish
  sneaky: [0, 3, 5, 6, 7, 10, 12] // minor blues colour
};
const MOODS = {
  town: { raga: 'bright', beat: .3, vol: .5, tabla: 'D-NaD-Na-', mel: .7, inst: 'flute' },
  court: { raga: 'royal', beat: .42, vol: .48, tabla: 'D---N-D-', mel: .65, inst: 'shehnai' },
  play: { raga: 'bright', beat: .26, vol: .48, tabla: 'D-N-DDN-', mel: .65, inst: 'flute', oct: 1 },
  calm: { raga: 'calm', beat: .56, vol: .42, tabla: null, mel: .45, inst: 'flute', bells: true },
  travel: { raga: 'bright', beat: .34, vol: .46, tabla: 'D-N-D-NN', mel: .55, inst: 'flute' },
  sad: { raga: 'sad', beat: .7, vol: .38, tabla: null, mel: .45, inst: 'flute', low: 1 },
  tense: { raga: 'tense', beat: .5, vol: .4, tabla: 'D-------', mel: .3, inst: 'shehnai', low: 1 },
  sneaky: { raga: 'sneaky', beat: .3, vol: .4, tabla: 'D--N--N-', mel: .5, inst: 'pluck' },
  happy: { raga: 'royal', beat: .3, vol: .48, tabla: 'D-NaD-Na', mel: .7, inst: 'flute', bells: true },
  game: { raga: 'bright', beat: .24, vol: .45, tabla: 'DNDNDDN-', mel: .75, inst: 'pluck', oct: 1 },
  night: { raga: 'calm', beat: .75, vol: .34, tabla: null, mel: .35, inst: 'flute', low: 1, bells: true }
};
const MUSIC = { intro: 'town', i2: 'court', i3: 'play', s1: 'calm', s2: 'town', s3: 'travel', s4: 'tense', s5: 'sad', s6: 'sad', s7: 'happy', g1: 'game', s8: 'tense', g2: 'game', s9: 'tense', s10: 'sneaky', s11: 'sneaky', s12: 'play', s13: 'calm', s14: 'calm', s15: 'night', outro: 'calm' };
const Music = {
  bus: null, mood: null, timer: 0, step: 0, note: 4, talking: 0, duckT: 0, ducked: false,
  init() {
    if (this.bus || !Sound.ctx) return;
    this.bus = Sound.ctx.createGain(); this.bus.gain.value = .0001;
    const lp = Sound.ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 5200;
    this.bus.connect(lp); lp.connect(Sound.master);
  },
  level() { const M = MOODS[this.mood]; return M ? M.vol * (this.ducked ? .38 : 1) : .0001; },
  set(mood) {
    this.init(); if (!this.bus) return;
    if (mood === this.mood) return;
    this.mood = mood || null; clearInterval(this.timer); this.timer = 0;
    this.bus.gain.setTargetAtTime(this.level(), Sound.ctx.currentTime, mood ? .9 : .3);
    if (!mood) return;
    const M = MOODS[mood]; this.step = 0; this.note = 4;
    this.timer = setInterval(() => this.tick(M), M.beat * 1000);
  },
  // the music dips under every spoken line and comes back up between them
  talk(d) {
    this.talking = Math.max(0, this.talking + d); clearTimeout(this.duckT);
    const want = this.talking > 0;
    const apply = () => { if (this.ducked === want) return; this.ducked = want; if (this.bus && this.mood) this.bus.gain.setTargetAtTime(this.level(), Sound.ctx.currentTime, .25); };
    if (want) apply(); else this.duckT = setTimeout(apply, 700);
  },
  tone(o) { // like tone(), but into the music bus
    const c = Sound.ctx; if (!c || !this.bus) return;
    const t = c.currentTime + (o.delay || 0), osc = c.createOscillator(), g = c.createGain(), a = o.a ?? .02, dur = o.dur ?? .4;
    osc.type = o.type || 'sine'; osc.frequency.setValueAtTime(o.f, t);
    env(g, t, a, dur, o.vol ?? .1);
    if (o.vib) { const l = c.createOscillator(), lg = c.createGain(); l.frequency.value = o.vibRate || 5; lg.gain.value = o.vib; l.connect(lg); lg.connect(osc.frequency); l.start(t); l.stop(t + a + dur + .05); }
    if (o.lp) { const fl = c.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = o.lp; osc.connect(fl); fl.connect(g); } else osc.connect(g);
    g.connect(this.bus); osc.start(t); osc.stop(t + a + dur + .05);
  },
  hit(f, f2, dur, vol, bp) {
    const c = Sound.ctx; if (!c || !this.bus) return;
    const t = c.currentTime, o = c.createOscillator(), g = c.createGain();
    o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f2, t + dur); env(g, t, .004, dur, vol); o.connect(g); g.connect(this.bus); o.start(t); o.stop(t + dur + .05);
    if (bp && Sound.buf) { const s = c.createBufferSource(), fl = c.createBiquadFilter(), g2 = c.createGain(); s.buffer = Sound.buf; fl.type = 'bandpass'; fl.frequency.value = bp; fl.Q.value = 3; env(g2, t, .002, .06, vol * .6); s.connect(fl); fl.connect(g2); g2.connect(this.bus); s.start(t, Math.random()); s.stop(t + .1); }
  },
  tick(M) {
    if (!Sound.ctx || muted || document.hidden) { this.step++; return; }
    const s = this.step++, sc = RAGA[M.raga], base = SA * (M.low ? .5 : 1) * (M.oct ? 1.5 : 1), b = M.beat;
    const hz = semi => base * Math.pow(2, semi / 12);
    // tanpura: Pa, Sa, Sa, low Sa across each bar
    if (s % 8 === 0) [7 - 12, 0, 0, -12].forEach((n, i) => this.tone({ type: 'triangle', f: hz(n) * (i === 2 ? 1.003 : 1), dur: b * 7, vol: .05, a: .03, delay: i * b * 1.8, lp: 1400 }));
    // tabla
    if (M.tabla) {
      const ch = M.tabla[s % M.tabla.length];
      if (ch === 'D') this.hit(150, 62, .28, .2, 900);
      else if (ch === 'N') this.hit(720, 680, .12, .07, 2600);
      else if (ch === 'a') this.hit(980, 960, .08, .05, 3400);
    }
    // melody: a gentle random walk on the raga, resting at phrase ends
    if (s % 8 !== 7 && Math.random() < M.mel) {
      const step = [-2, -1, -1, 1, 1, 2, 0][Math.floor(Math.random() * 7)];
      this.note = Math.max(0, Math.min(sc.length - 1, this.note + step));
      if (s % 16 === 0) this.note = Math.random() < .5 ? 0 : 4 % sc.length;
      const f = hz(sc[this.note] + 12), len = b * (Math.random() < .3 ? 2 : 1.1);
      if (M.inst === 'flute') this.tone({ type: 'sine', f, dur: len, vol: .07, a: .07, vib: 4, vibRate: 5.2 });
      else if (M.inst === 'shehnai') { this.tone({ type: 'sawtooth', f, dur: len, vol: .035, a: .06, vib: 5, vibRate: 6, lp: 1700 }); this.tone({ type: 'sine', f, dur: len, vol: .04, a: .05 }); }
      else this.tone({ type: 'triangle', f, dur: b * .7, vol: .08, a: .005, lp: 2400 });
    }
    if (M.bells && s % 16 === 12) this.tone({ f: hz(sc[sc.length - 1] + 24), dur: 1.6, vol: .025, a: .005 });
  }
};

/* ══════════ More sound effects and living backgrounds ══════════ */
Object.assign(SFX, {
  fanfare() { [[0, 0], [4, .14], [7, .28], [12, .42]].forEach(([n, d]) => { tone({ type: 'sawtooth', f: 392 * Math.pow(2, n / 12), dur: .32, vol: .07, delay: d, lp: 2200, vib: 3, vibRate: 6 }); }); tone({ type: 'sawtooth', f: 784, dur: .9, vol: .07, delay: .56, lp: 2200, vib: 5, vibRate: 6 }); },
  bell() { [1, 2.76, 5.4].forEach((k, i) => tone({ f: 523 * k, dur: 2.2 / (i + 1), vol: .06 / (i + 1), a: .003 })); },
  snore() { noise({ dur: .9, vol: .22, type: 'lowpass', f: 420, a: .35 }); tone({ type: 'sawtooth', f: 70, f2: 62, dur: .8, vol: .05, a: .3, lp: 300 }); noise({ dur: .7, vol: .08, type: 'bandpass', f: 1800, q: 2, a: .3, delay: 1.1 }); },
  yawn() { tone({ type: 'sawtooth', f: 330, f2: 180, dur: 1.2, vol: .08, a: .2, lp: 900, vib: 6, vibRate: 4 }); noise({ dur: 1, vol: .06, type: 'bandpass', f: 900, q: 1, a: .3 }); },
  wheee() { tone({ type: 'triangle', f: 500, f2: 1100, dur: .6, vol: .08, a: .05, vib: 10, vibRate: 7 }); },
  water() { for (let i = 0; i < 3; i++) tone({ f: 900 + Math.random() * 900, f2: 1400 + Math.random() * 900, dur: .05, vol: .03, delay: i * .09 + Math.random() * .05 }); },
  market() { for (let i = 0; i < 4; i++) noise({ dur: .18 + Math.random() * .2, vol: .05, type: 'bandpass', f: 500 + Math.random() * 900, q: 4, delay: i * .22 + Math.random() * .1 }); },
  hoof() { [0, .18, .5, .68].forEach(d => noise({ dur: .05, vol: .18, type: 'bandpass', f: 600, q: 3, delay: d })); },
  gulp() { tone({ f: 320, f2: 140, dur: .16, vol: .2 }); }
});
// little ambient sounds on top of v6's day / night / glow beds
let lifeT = null;
function bgLife(kind) {
  clearInterval(lifeT); lifeT = null; if (!kind) return;
  const fn = { market: () => { if (Math.random() < .55) SFX.market(); if (Math.random() < .12) SFX.hoof(); }, court: () => { if (Math.random() < .25) SFX.bell(); }, garden: () => { if (Math.random() < .6) SFX.water(); if (Math.random() < .2) SFX.chirp(); } }[kind];
  if (fn) lifeT = setInterval(fn, 1500);
}

/* ══════════ Moo Munch, played with the face (or a tap) ══════════ */
const FOOD = {
  grass: () => mk(`<path d="M-30,10 C-34,-30 -28,-60 -20,-80 M-16,10 C-18,-30 -10,-64 -2,-90 M0,10 C2,-30 6,-60 16,-84 M14,10 C18,-24 26,-50 34,-70" stroke="#4FA83A" stroke-width="12" stroke-linecap="round" fill="none"/><path d="M-24,0 L24,0" stroke="#C99A44" stroke-width="12" stroke-linecap="round"/>`),
  mango: () => mk(`<path d="M0,-58 C34,-60 46,-20 30,8 C14,30 -26,30 -34,4 C-42,-24 -26,-56 0,-58Z" fill="#F6B42A"/><path d="M-10,-50 C-22,-40 -26,-22 -22,-8" stroke="#FFE69A" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M4,-58 C12,-74 30,-76 36,-70 C28,-60 14,-58 4,-58Z" fill="#3E9A3E"/>`),
  banana: () => mk(`<path d="M-40,-30 C-30,10 20,20 44,-10 C36,-2 2,4 -24,-34Z" fill="#F7D33A"/><path d="M-42,-34 L-46,-42" stroke="#7A5A2A" stroke-width="7" stroke-linecap="round"/><path d="M-30,-26 C-16,0 12,6 34,-6" stroke="#E8B820" stroke-width="4" fill="none" stroke-linecap="round"/>`),
  cane: () => mk(`<path d="M-8,20 L-8,-90" stroke="#8E5BA6" stroke-width="18" stroke-linecap="round"/>${[-60, -26, 8].map(y => `<path d="M-18,${y} L2,${y}" stroke="#6A3E7E" stroke-width="4" stroke-linecap="round"/>`).join('')}<path d="M-8,-86 C10,-110 30,-114 40,-108 C26,-100 10,-94 -6,-84Z" fill="#4FA83A"/>`),
  melon: () => mk(`<path d="M-44,-10 A44,44 0 0,0 44,-10Z" fill="#3E9A3E"/><path d="M-38,-10 A38,38 0 0,0 38,-10Z" fill="#F2F0D0"/><path d="M-32,-10 A32,32 0 0,0 32,-10Z" fill="#F0506A"/>${[-16, 0, 16].map(x => `<ellipse cx="${x}" cy="4" rx="3" ry="5" fill="#2A1A10"/>`).join('')}`)
};
async function mooMunch() {
  const r = await cut('#CDE6B0');
  sky(r, [[0, '#9ED8F2'], [.6, '#E8F4D8'], [1, '#CFE6A8']]);
  sun(r, 1320, 150, 60);
  hill(r, 560, '#A8D27A', { amp: 30, period: 900 });
  [[120, 600, .7], [360, 610, .55], [1180, 600, .6], [1480, 610, .75]].forEach(([x, y, s]) => r.append(tree(x, y, s, { leaf: '#5FAE4A', hi: '#8ED062' })));
  hill(r, 680, '#8CC25A', { amp: 10, period: 1300 });
  tufts(r, 50, -100, 1700, 690, 900, '#5EA23E', 611);
  const sj = actor(bull({ ...SANJ, jhool: '#2E7DD8' }), 560, 800, 1.2); sj.inner.classList.add('breathe'); r.append(sj);
  const butterflies = [bird(260, 300, .8), bird(1400, 260, .7)]; butterflies.forEach(b => r.append(pwrap(b, 1.2)));
  // the munch spot sits just in front of Sanjivaka's muzzle
  await reveal(); ambience('day');
  const hb = sj.parts.head.getBoundingClientRect(), m = toWorld(hb.right, hb.top + hb.height * .72);
  const spot = { x: m.x + 70, y: m.y };
  const hud = $('#munchhud'); hud.hidden = false;
  const N = 8; let n = 0;
  const upd = () => { hud.textContent = `🌿 ${n} / ${N}`; }; upd();
  cleanups.push(() => { hud.hidden = true; });
  await say('arjun', "Let's help Sanjivaka eat lots of yummy food so he grows big and strong!");
  const kinds = ['grass', 'mango', 'banana', 'cane', 'melon', 'grass', 'mango', 'cane'];
  let item = null;
  const serve = () => {
    item = place(G({}), spot.x + 160, spot.y - 40, .1); const pop = G({}); pop.append(FOOD[kinds[n % kinds.length]]()); item.append(pop); shade(pop, true); r.append(item);
    tween(item, { x: spot.x, y: spot.y, s: 1 }, 420, ease.back); SFX.pop();
  };
  serve();
  try {
    await interaction(Cam.allowed ? 'Open your mouth wide to munch! (Or tap the screen.)' : 'Tap the screen (or press Space) to help Sanjivaka munch!',
      Cam.allowed ? null : 'Tap the screen to help Sanjivaka munch!', ctx => {
        let busy = false, wasOpen = false, lastPrompt = performance.now();
        const munch = () => {
          if (busy || ctx.fin || !item) return; busy = true; lastPrompt = performance.now();
          const it = item; item = null;
          sj.parts.head.classList.add('eat'); setMood(sj.inner, 'o');
          tween(it, { x: spot.x - 60, y: spot.y + 10, s: .1 }, 320, ease.in).then(() => it.remove());
          SFX.munch(); later(() => SFX.gulp(), 380);
          boom(r, ['MUNCH!', 'CRUNCH!', 'YUM!', 'NOM!'][n % 4], spot.x + 40, spot.y - 150, { size: 54 });
          n++; upd();
          tween(sj, { s: 1.2 + n * .02 }, 400, ease.out);
          later(() => {
            sj.parts.head.classList.remove('eat'); setMood(sj.inner, 'smile');
            if (n >= N) { ctx.done(); return; }
            serve(); busy = false;
          }, 760);
        };
        ctx.on((t, x) => { if (t === 'down' || t === 'namaste') munch(); });
        const key = e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); munch(); } };
        document.addEventListener('keydown', key);
        const poll = setInterval(() => {
          if (ctx.fin) return;
          const o = Face.open; $('#camwin').style.setProperty('--mouth', o.toFixed(2));
          if (o > .45 && !wasOpen) { wasOpen = true; munch(); } else if (o < .22) wasOpen = false;
          if (performance.now() - lastPrompt > 9000) { lastPrompt = performance.now(); speakOne(Cam.allowed && Face.on ? 'Open your mouth wide, like a big hungry bull!' : 'Tap to munch!', 'arjun'); }
        }, 60);
        const stop = () => { clearInterval(poll); document.removeEventListener('keydown', key); };
        cleanups.push(stop);
        const d0 = ctx.done; ctx.done = v => { stop(); d0(v); };
      });
  } finally { hud.hidden = true; }
  SFX.chime(); sparkles(r, sj._t.x + 120, 560, 16, 160); SFX.moo(1.1, 1);
  boom(r, 'SO STRONG!', 800, 300, { size: 80 });
  await say('arjun', `Wow${KID.name ? ', ' + KID.name : ''}! Eight big munches! Sanjivaka is full, happy and super strong!`);
}

/* ══════════ Onboarding: Arjun waves hello in the jungle → name → let's begin (camera optional) ══════════ */
let onbArjun = null;
function onboardBackdrop() {
  const r = newStage('#BFE0A8');
  sky(r, [[0, '#9ED8F2'], [.55, '#DCF0C8'], [1, '#BFE0A0']]);
  sun(r, 1380, 140, 60);
  jungleFar(r);
  [[-20, 660, 1], [260, 640, .7], [1120, 640, .7], [1400, 650, .9], [1640, 670, 1.1]].forEach(([x, y, s]) => r.append(tree(x, y, s, { leaf: '#5FAE4A', hi: '#8ED062' })));
  hill(r, 720, '#8CC25A', { amp: 10, period: 1300 });
  tufts(r, 70, -100, 1700, 730, 900, '#5EA23E', 911);
  [[80, 900, 1.5], [760, 930, 1.2], [1540, 910, 1.5]].forEach(([x, y, s]) => r.append(bush(x, y, s, '#4F8F3A', '#74B050')));
  const portrait = innerWidth < innerHeight;
  onbArjun = actor(person(ARJUN), portrait ? 800 : 400, portrait ? 640 : 860, portrait ? 1.15 : 1.75); r.append(onbArjun);
  onbArjun.inner.classList.add('wave');
  jungleNear(r, { ground: false });
  r.append(S('rect', { x: -2000, y: -2000, width: 5600, height: 5000, fill: '#FFF6DC', opacity: .06, 'pointer-events': 'none' }));
  $('#fade').classList.remove('on'); faded = false;
}
// Arjun's mouth moves while he speaks on the welcome screen
function onbSay(t) {
  stopSpeech();
  const f = onbArjun && onbArjun.querySelector('.face'); if (f) f.classList.add('talking');
  return speakOne(t, 'arjun').then(() => { if (f) f.classList.remove('talking'); });
}
(() => {
  const step = k => { ['onb1', 'onb2'].forEach(id => { $('#' + id).hidden = id !== k; }); const f = $('#' + k).querySelector('input,button'); if (f) setTimeout(() => f.focus({ preventScroll: true }), 60); };
  const greet = 'Hello, my little friend! May I know your name?';
  let greeted = false;
  const wake = () => { if (greeted) return; greeted = true; unlockAudio(); onbSay(greet); };
  $('#title').addEventListener('pointerdown', wake, { capture: true });
  $('#title').addEventListener('keydown', wake, { capture: true });
  if (KID.name) $('#kidname').value = KID.name;
  // the spoken name types itself into the box, letter by letter
  let typeT = 0;
  const typeInto = text => {
    clearInterval(typeT); const inp = $('#kidname'); inp.value = ''; let i = 0; inp.classList.add('typing');
    typeT = setInterval(() => { inp.value = text.slice(0, ++i); if (i >= text.length) { clearInterval(typeT); inp.classList.remove('typing'); } }, 110);
  };
  const clean = t => t.replace(/^(hello|hi|namaste)[,!.\s]*/i, '').replace(/^(my name is|my name's|i am|i'm|it's|it is|this is|call me|mera naam)\s+/i, '').replace(/\s+(hai|hoon|here)$/i, '').replace(/[^\p{L}\s'-]/gu, '').trim().split(/\s+/).slice(0, 2).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const mic = $('#bmic');
  if (!SR) { mic.hidden = true; $('#micnote').textContent = 'Type your name in the box.'; }
  else mic.addEventListener('click', () => {
    let rec; try { rec = new SR(); } catch (e) { mic.hidden = true; return; }
    rec.lang = 'en-IN'; rec.interimResults = false; rec.maxAlternatives = 1;
    stopSpeech(); mic.classList.add('busy'); $('#micnote').textContent = 'I’m listening… say your name!';
    rec.onresult = e => {
      const t = clean(e.results[0][0].transcript || '');
      if (t) { typeInto(t); $('#micnote').textContent = 'Is that right? Tap Next!'; onbSay(`${t}! What a lovely name. Is that right?`); }
      else $('#micnote').textContent = "I didn't catch that. Try again, or type it!";
    };
    rec.onerror = e => { $('#micnote').textContent = e.error === 'not-allowed' ? 'The microphone is off here, so please type your name.' : "I didn't catch that. Try again, or type it!"; };
    rec.onend = () => mic.classList.remove('busy');
    try { rec.start(); } catch (e) { mic.classList.remove('busy'); }
  });
  $('#nameform').addEventListener('submit', e => {
    e.preventDefault(); unlockAudio(); greeted = true; clearInterval(typeT);
    const v = $('#kidname').value.replace(/[^\p{L}\s'-]/gu, '').replace(/\s+/g, ' ').trim().slice(0, 24);
    KID.name = v; try { localStorage.setItem('mb-kid-name', v); } catch (_) { }
    $('#hiname').textContent = v ? `Lovely to meet you, ${v}!` : 'Lovely to meet you!';
    step('onb2');
    onbSay(`${v ? `Lovely to meet you, ${v}!` : 'Lovely to meet you!'} Let's begin with today's story. Would you like to play with your hands and face too? Then tap, turn on camera. Or just tap Begin Story!`);
  });
  const camDone = (msg, say) => { $('#camcard').classList.add('done'); $('#camres').textContent = msg; onbSay(say); $('#begin').classList.add('glow'); };
  $('#camyes').addEventListener('click', async () => {
    unlockAudio(); $('#camyes').disabled = $('#camno').disabled = true;
    try {
      await Cam.start();
      camDone('Camera is on! You can drag your little window anywhere.', "Yay, I can see you! You can move your little window anywhere. Now tap Begin Story!");
    } catch (err) {
      console.warn('[camera] not available:', err); Cam.allowed = false;
      camDone("No camera this time, and that's okay! You can tap and drag instead.", "That's okay! You can tap and drag instead. Tap Begin Story when you're ready!");
    }
  });
  $('#camno').addEventListener('click', () => { unlockAudio(); Cam.allowed = false; $('#camyes').disabled = $('#camno').disabled = true; camDone("No problem! You can tap and drag instead.", "That's okay! You can tap and drag instead. Tap Begin Story when you're ready!"); });
})();
