// ───────────────────────── Memory: shelf lamps + the child's choices (only these are stored) ─────────────────────────
const STORE_KEY = 'panchdeep.v1';
function loadStore() {
  const blank = { choices: {}, shelf: [false, false, false, false, false] };
  try {
    const raw = localStorage.getItem(STORE_KEY); if (!raw) return blank;
    const s = JSON.parse(raw); if (!s || typeof s !== 'object') return blank;
    const shelf = Array.isArray(s.shelf) ? [0, 1, 2, 3, 4].map(i => !!s.shelf[i]) : blank.shelf;
    const choices = {}; if (s.choices && typeof s.choices === 'object') for (const k of ['c1', 'c2', 'c3', 'c4', 'c5']) if (s.choices[k] === 'a' || s.choices[k] === 'b') choices[k] = s.choices[k];
    return { choices, shelf };
  } catch (e) { return blank; }
}
function saveStore() { try { localStorage.setItem(STORE_KEY, JSON.stringify({ choices: G.choices, shelf: G.shelf })); } catch (e) { } }
const STORED = loadStore();
const G = { choices: {}, shelf: STORED.shelf.slice(), resumed: false, replay: STORED.shelf[0], started: false, finished: false, sceneIdx: -1 };
const C = k => G.choices[k] || 'a';

// ───────────────────────── Director ─────────────────────────
const ABORT = { abort: true };
const SEQ = [];       // filled by scenes file
let ACT = null;       // the running activity
function newState(sc) {
  return { sc, t0: CLK.t, ap: {}, shot: sc.firstShot || 'main', cutT: 0, cam: null, camMove: null, mood: { from: MOOD[sc.mood || 'white'], to: MOOD[sc.mood || 'white'], t: -10, dur: 1 }, v: {} };
}
const D = {
  S: null, ab: null,
  get st() { return this.S ? CLK.t - this.S.t0 : 0; },
  cue(name) { const S = this.S; if (S && S.ap[name] === undefined) S.ap[name] = CLK.t - S.t0; },
  uncue(name) { if (this.S) delete this.S.ap[name]; },
  shot(spec) {
    const S = this.S; if (!S) return;
    const o = typeof spec === 'string' ? { name: spec } : spec;
    if (o.name) { S.shot = o.name; this.cue('shot:' + o.name); }
    S.cutT = this.st; S.cam = o.cam || null; S.camMove = null;
    if (o.mood) this.mood(o.mood, o.moodDur ?? 0.01);
    if (o.cue) [].concat(o.cue).forEach(c => this.cue(c));
  },
  mood(key, dur = 1.2) {
    const S = this.S; if (!S) return;
    const cur = moodColor(S), to = MOOD[key] || key;
    S.mood = { from: cur, to, t: this.st, dur };
    music.mood(key === 'courage' || key === 'danger' ? 'night' : 'day');
  },
  camTo(c, dur = 2) { const S = this.S; if (!S) return; S.camMove = { from: Object.assign({}, CAM), to: c, t: this.st, dur }; },
  g(p) { const ab = this.ab; return Promise.race([p, ab.p]); },
  wait(sec) { return this.g(waitClock(sec)); },
  until(fn) { return this.g(new Promise(r => { const chk = () => { if (fn()) r(); else waitClock(0.05).then(chk); }; chk(); })); },
  say(who, text, o) { return this.g(say(who, text, o)); },
  line(id, o) { const L = LINES[id]; if (!L) { console.warn('missing line', id); return Promise.resolve(); } return this.say(L[0], L[1], o); },
  async choose(key, a, b) {
    CH.opts = [a, b]; CH.on = true; CH.t0 = CLK.t; CH.picked = -1; CH.read = -1; CH.hot = -1;
    let done = false;
    const pick = new Promise(r => { CH.res = r; });
    const tok = SP.gen;
    (async () => {
      try {
        await waitClock(0.45); if (done) return;
        CH.read = 0; await say('dadi', a.label); if (done || tok !== SP.gen) return;
        CH.read = -1; await say('dadi', 'or'); if (done || tok !== SP.gen) return;
        CH.read = 1; await say('dadi', b.label); CH.read = -1;
      } catch (e) { }
    })();
    // idle rule: gentle hint, then choose for them so the story never stalls
    (async () => {
      const t0 = CLK.t; let hinted = false;
      while (!done) {
        await waitClock(0.25);
        if (done || !CH.on) return;
        if (!hinted && CLK.t - t0 > 15) { hinted = true; say('dadi', LINES.hintChoose[1]); }
        if (CLK.t - t0 > 30) { CH.res(QA.pick || 0); return; }
      }
    })();
    let i;
    try { i = await this.g(pick); } finally { done = true; CH.on = false; }
    CH.picked = i; CH.pickT = CLK.t; sfx('pop');
    speechReset();
    G.choices[key] = i ? 'b' : 'a'; saveStore();
    await this.wait(0.55); CH.picked = -1;
    return G.choices[key];
  },
  async activity(A) {
    ACT = A; A.last = CLK.t; A.hinted = false; A.nextAssist = 0; A.t0 = CLK.t;
    try { if (A.start) A.start(); await this.until(() => A.done); }
    finally { if (ACT === A) ACT = null; }
  },
  sfx(n, ...a) { sfx(n, ...a); },
};
function moodColor(S) { const m = S.mood; const k = ease(clamp((CLK.t - S.t0 - m.t) / m.dur)); return mixc(m.from, m.to, k); }
// helpers used by scene painters
const st_ = () => D.st;
function ap(key, dur = 1.3, delay = 0) { const S = D.S; if (!S || S.ap[key] === undefined) return 0; return clamp((D.st - S.ap[key] - delay) / dur); }
function since(key) { const S = D.S; if (!S || S.ap[key] === undefined) return -1; return D.st - S.ap[key]; }
const has = key => !!(D.S && D.S.ap[key] !== undefined);

function actTick(dt) {
  const A = ACT; if (!A || A.done) return;
  if (A.update) A.update(dt);
  const idle = CLK.t - A.last;
  if (!A.hinted && idle > 15) { A.hinted = true; if (A.hint) A.hint(); }
  if (A.hinted && idle > 15 + 8 && CLK.t >= A.nextAssist) { A.assisting = true; if (A.assist) A.assist(); A.nextAssist = CLK.t + (A.assistGap || 3.5); }
}
function actTouched() { const A = ACT; if (!A) return; A.last = CLK.t; A.hinted = false; A.assisting = false; A.nextAssist = 0; }

let RUN = null;
async function runScene(i) {
  const sc = SEQ[i]; G.sceneIdx = i;
  const S = newState(sc); D.S = S;
  let rej; const p = new Promise((_, r) => { rej = r; }); p.catch(() => { });
  D.ab = { p, abort: () => rej(ABORT) };
  ACT = null; CH.on = false; CH.picked = -1;
  D.shot(sc.firstShot || 'main');
  if (sc.cam) S.cam = sc.cam;
  try { await sc.run(D, S); if (window.qaShot) await window.qaShot(sc.id + '-end'); }
  catch (e) { if (e !== ABORT) console.error(e); }
  finally { ACT = null; CH.on = false; speechReset(); }
}
async function runFrom(i) {
  const myRun = RUN = {};
  for (; i < SEQ.length; i++) { if (RUN !== myRun) return; await runScene(i); }
  if (RUN === myRun) { G.finished = true; showReplay(); }
}
function skipScene() { if (D.ab) D.ab.abort(); }

// ───────────────────────── Render ─────────────────────────
let lastNow = 0;
function camNow(S) {
  const W = V.W, H = V.H, st = D.st;
  let c = { x: W / 2, y: H / 2, z: 1 };
  if (S.cam) c = typeof S.cam === 'function' ? S.cam() : S.cam;
  if (S.camMove) { const m = S.camMove, k = ease(clamp((st - m.t) / m.dur)), to = typeof m.to === 'function' ? m.to() : m.to; c = { x: lerp(m.from.x, to.x, k), y: lerp(m.from.y, to.y, k), z: lerp(m.from.z, to.z, k) }; if (k >= 1) { S.cam = to; S.camMove = null; } }
  // slow continuous push so no beat is frozen
  if (!REDUCED && !ACT && !S.camMove && !S.sc.noPush) { const e = clamp((st - S.cutT) / 9); c = { x: c.x, y: c.y, z: c.z * (1 + 0.035 * e) }; }
  return clampCam(c);
}
const REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
function render() {
  const g = ctx, S = D.S;
  if (!WALLC.grain) WALLC.grain = makeGrain();
  if (!WALLC.fill) WALLC.fill = makeFiller();
  const wallCol = S ? moodColor(S) : PAL.yellow;
  g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = wallCol; g.fillRect(0, 0, cv.width, cv.height);
  g.setTransform(V.k, 0, 0, V.k, V.ox * V.dpr, V.oy * V.dpr);
  g.lineJoin = 'round'; g.lineCap = 'round';
  if (S) {
    const c = camNow(S); CAM.x = c.x; CAM.y = c.y; CAM.z = c.z;
    g.save(); applyCam(g, CAM);
    if (CAM.z === 1 && CAM.x === V.W / 2 && CAM.y === V.H / 2) { g.save(); g.setTransform(1, 0, 0, 1, Math.round(V.ox * V.dpr), Math.round(V.oy * V.dpr)); g.drawImage(WALLC.fill, 0, 0); g.restore(); }
    else g.drawImage(WALLC.fill, 0, 0, V.W, V.H);
    try { S.sc.draw(g, D.st, S, wallCol); } catch (e) { if (!S.err) { S.err = 1; console.error(e); } }
    if (ACT && ACT.drawWorld) try { ACT.drawWorld(g); } catch (e) { console.error(e); ACT.drawWorld = null; }
    g.restore();
  }
  // plaster & brush grain over everything painted
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.drawImage(WALLC.grain, 0, 0, cv.width, cv.height); g.restore();
  if (S) {
    if (ACT && ACT.drawUI) try { ACT.drawUI(g); } catch (e) { console.error(e); ACT.drawUI = null; }
    drawBorder(g, ease(clamp((D.st - S.cutT) / 0.95)), CLK.t);
    drawBubbles(g);
    drawChoice(g);
  }
  if (CAMIN.hand && CAMIN.hand.seen > CLK.t - 0.4) { const h = CAMIN.hand; g.save(); g.globalAlpha = 0.9; circle(g, h.x, h.y, h.down ? 18 : 26, rgba(PAL.glow, 0.5), PAL.char, 5); dotRing(g, h.x, h.y, 36, 10, 4, [PAL.red, PAL.yellow]); g.restore(); }
}
function frame(now) {
  const dt = clamp((now - (lastNow || now)) / 1000, 0, 0.1) * QA.speed; lastNow = now;
  CLK.t += dt; FRAME++;
  waitTick(); speechTick(); actTick(dt); musicTick();
  render();
  requestAnimationFrame(frame);
}

// ───────────────────────── Input: tap/drag base layer (hand pinch feeds the same path) ─────────────────────────
const PTR = { down: false, x: 0, y: 0, id: null };
function inDown(x, y, id) {
  PTR.down = true; PTR.x = x; PTR.y = y; PTR.id = id;
  if (CH.on) { const i = choiceHit(x, y); if (i >= 0 && CH.res) { CH.res(i); } return; }
  if (ACT && ACT.down) { actTouched(); ACT.down(x, y); }
}
function inMove(x, y, id) {
  PTR.x = x; PTR.y = y;
  if (CH.on) { CH.hot = choiceHit(x, y); return; }
  if (ACT && ACT.move) { if (PTR.down) actTouched(); ACT.move(x, y, PTR.down, id); }
}
function inUp(x, y, id) { PTR.down = false; if (ACT && ACT.up) { actTouched(); ACT.up(x, y); } }
cv.addEventListener('pointerdown', e => { e.preventDefault(); try { cv.setPointerCapture(e.pointerId); } catch (_) { } const [x, y] = toLogical(e.clientX, e.clientY); inDown(x, y, e.pointerId); });
cv.addEventListener('pointermove', e => { const [x, y] = toLogical(e.clientX, e.clientY); inMove(x, y, e.pointerId); });
cv.addEventListener('pointerup', e => { const [x, y] = toLogical(e.clientX, e.clientY); inUp(x, y, e.pointerId); });
cv.addEventListener('pointercancel', e => { const [x, y] = toLogical(e.clientX, e.clientY); inUp(x, y, e.pointerId); });
// device tilt (optional, used by the wind shield)
const TILT = { g: 0, t: -99 };
window.addEventListener('deviceorientation', e => { if (e.gamma == null) return; TILT.g = e.gamma; TILT.t = CLK.t; }, { passive: true });
