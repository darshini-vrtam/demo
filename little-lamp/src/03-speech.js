// ───────────────────────── Clock & QA hooks ─────────────────────────
const QA = Object.assign({ speed: 1, silent: false, shot: null, start: null }, window.__QA || {});
const CLK = { t: 0 };   // story clock in seconds (scaled by QA.speed for automated checks)

// ───────────────────────── Voices: one narrator, a distinct pitch/voice per character ─────────────────────────
const VOICE = { has: 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window, list: [], map: {}, fails: 0, starts: 0, boundaries: 0, info: 'not checked' };
const CHAR = {
  dadi: { pitch: 0.95, rate: 0.9, want: 'f' },
  chiku: { pitch: 1.55, rate: 1.04, want: 'f' },
  bijli: { pitch: 1.3, rate: 1.1, want: 'm2' },
  kesar: { pitch: 1.12, rate: 0.95, want: 'f2' },
  yama: { pitch: 0.55, rate: 0.82, want: 'm' },
  merchant: { pitch: 0.78, rate: 1.0, want: 'm2' },
};
const FEM = /female|woman|heera|veena|lekha|raveena|neerja|kalpana|swara|aditi|priya|samantha|karen|moira|tessa|fiona|victoria|zira|susan|serena|kate|libby|sonia|google uk english female|google us english/i;
const MAL = /male|man\b|rishi|ravi|prabhat|hemant|madhur|daniel|alex|fred|oliver|george|david|mark|james|thomas|arthur|google uk english male|aaron|guy/i;
function pickVoices() {
  if (!VOICE.has) { VOICE.info = 'speechSynthesis not available'; return; }
  const all = speechSynthesis.getVoices() || [];
  const en = all.filter(v => /^en([-_]|$)/i.test(v.lang));
  VOICE.list = en.length ? en : all;
  if (!VOICE.list.length) { VOICE.info = 'no voices reported'; return; }
  const score = v => (/en[-_]IN/i.test(v.lang) ? 4 : /en[-_]GB/i.test(v.lang) ? 2 : 1) + (v.localService ? 1 : 0);
  const sorted = VOICE.list.slice().sort((a, b) => score(b) - score(a));
  const fem = sorted.filter(v => FEM.test(v.name) && !/\bmale\b/i.test(v.name.replace(/female/i, '')));
  const mal = sorted.filter(v => MAL.test(v.name) && !/female/i.test(v.name));
  const any = sorted;
  const f1 = fem[0] || any[0], f2 = fem.find(v => v !== f1) || f1;
  const m1 = mal[0] || any.find(v => v !== f1) || any[0], m2 = mal.find(v => v !== m1) || any.find(v => v !== f1 && v !== m1) || m1;
  const W = { f: f1, f2, m: m1, m2 };
  for (const k in CHAR) VOICE.map[k] = W[CHAR[k].want] || any[0];
  VOICE.info = `${VOICE.list.length} voices; narrator: ${VOICE.map.dadi && VOICE.map.dadi.name}`;
}
if (VOICE.has) { pickVoices(); try { speechSynthesis.addEventListener('voiceschanged', pickVoices); } catch (e) { speechSynthesis.onvoiceschanged = pickVoices; } }
const canTTS = () => VOICE.has && VOICE.list.length > 0 && !AU.muted && !QA.silent && QA.speed === 1 && VOICE.fails < 3;

// ───────────────────────── Word timing ─────────────────────────
function syllables(w) {
  const s = w.toLowerCase().replace(/[^a-z]/g, ''); if (!s) return 1;
  if (s.length <= 3) return 1;
  let n = (s.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '').match(/[aeiouy]{1,2}/g) || []).length;
  return Math.max(1, n);
}
function estimate(words, rate) {
  const out = []; let t = 0;
  const syl = 0.235 / rate;
  for (const w of words) {
    out.push(t);
    t += syllables(w) * syl + 0.05;
    if (/[.!?…]["'’”]?$/.test(w)) t += 0.42; else if (/[,;:—–]["'’”]?$/.test(w)) t += 0.22;
  }
  return { at: out, end: t + 0.1 };
}
function parseCues(raw) {
  const toks = raw.trim().split(/\s+/), words = [], cues = {};
  toks.forEach(tk => { const m = tk.match(/^((?:\{[\w:-]+\})+)(.*)$/); if (m) { (cues[words.length] = cues[words.length] || []).push(...m[1].slice(1, -1).split('}{')); words.push(m[2]); } else words.push(tk); });
  return { words, cues };
}

// ───────────────────────── Bubble text layout (Baloo 2, ~62px, 760px max, two lines) ─────────────────────────
const MC = document.createElement('canvas').getContext('2d');
const BFS = () => V.p ? 60 : 62;
const BMAXW = () => V.p ? Math.min(930, V.W - 150) : 760;
function wrapWords(words, fs, maxW) {
  MC.font = `700 ${fs}px ${FONT}`;
  const sp = MC.measureText(' ').width, lines = [[]]; let w = 0;
  words.forEach((wd, i) => {
    const ww = MC.measureText(wd).width;
    if (lines[lines.length - 1].length && w + sp + ww > maxW) { lines.push([]); w = 0; }
    const L = lines[lines.length - 1]; L.push({ i, x: L.length ? w + sp : 0, w: ww }); w = (L.length > 1 ? w + sp : 0) + ww;
  });
  return lines.map(L => ({ items: L, w: L.length ? L[L.length - 1].x + L[L.length - 1].w : 0 }));
}
function chunkText(raw) { // split so every bubble fits in two lines
  const fs = BFS(), maxW = BMAXW() - 70;
  const fits = s => wrapWords(parseCues(s).words, fs, maxW).length <= 2;
  if (fits(raw)) return [raw];
  const sentences = raw.match(/[^.!?…]+[.!?…]+["'’”]?|\S[^.!?…]*$/g) || [raw];
  const out = []; let cur = '';
  const push = s => { if (!s.trim()) return; if (fits(s)) { out.push(s.trim()); return; }
    const parts = s.split(/(?<=[,;:—])\s+/); let c = '';
    for (const p of parts) { const tryS = c ? c + ' ' + p : p; if (fits(tryS)) c = tryS; else { if (c) out.push(c); if (fits(p)) c = p; else { // greedy words
      let w2 = ''; for (const wd of p.split(/\s+/)) { const t2 = w2 ? w2 + ' ' + wd : wd; if (fits(t2)) w2 = t2; else { out.push(w2); w2 = wd; } } c = w2; } } }
    if (c) out.push(c); };
  for (const s of sentences) { const tryS = cur ? cur + ' ' + s.trim() : s.trim(); if (fits(tryS)) cur = tryS; else { if (cur) out.push(cur); cur = ''; if (fits(s.trim())) cur = s.trim(); else push(s); } }
  if (cur) out.push(cur);
  return out;
}
const BUBS = [];
function makeBubble(who, words, think) {
  const fs = BFS(), lines = wrapWords(words, fs, BMAXW() - 70);
  const bw = Math.max(...lines.map(l => l.w)) + 70, bh = lines.length * fs * 1.08 + 46;
  return { who, words, lines, fs, bw, bh, think, showAt: CLK.t, hideAt: Infinity, idx: -1, wordT: 0 };
}

// ───────────────────────── The speaking engine ─────────────────────────
const SP = { cur: null, chain: Promise.resolve(), gen: 0, lastText: '', pending: 0 };
const srEl = document.getElementById('sr');
function speechStop() {
  if (VOICE.has) try { speechSynthesis.cancel(); } catch (e) { }
  const s = SP.cur; if (s) { s.tts = false; s.cancelled = true; s.gotB = false; }
}
function cueFire(name) { if (name.startsWith('sfx:')) { sfx(name.slice(4)); return; } if (typeof D !== 'undefined' && D.S) D.cue(name); }
function speakChunk(who, raw, o, gen) {
  return new Promise(async res => {
    if (gen !== SP.gen) return res();
    const { words, cues } = parseCues(raw);
    const visible = who !== 'dadi' && !o.noBubble;
    let bub = null;
    if (visible) { bub = makeBubble(who, words, o.think); BUBS.push(bub); }
    if (o.shot && typeof D !== 'undefined' && D.S) D.shot(o.shot);
    await waitClock(o.shot ? 0.22 : visible ? 0.15 : 0.04);
    if (gen !== SP.gen) { if (bub) bub.hideAt = CLK.t; return res(); }
    const C = CHAR[who] || CHAR.dadi, est = estimate(words, C.rate);
    const plain = words.join(' '), starts = []; { let p = 0; words.forEach(w => { starts.push(p); p += w.length + 1; }); }
    const s = { who, words, cues, est, start: CLK.t, idx: -1, bIdx: -1, ended: false, gotB: false, bub, tts: false, res, gen, starts, wordT: CLK.t };
    SP.cur = s; SP.lastText = plain;
    try { srEl.textContent = (who === 'dadi' ? '' : NAMES[who] + ': ') + plain; } catch (e) { }
    if (canTTS()) {
      try {
        const u = new SpeechSynthesisUtterance(plain);
        const v = VOICE.map[who]; if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-IN';
        u.pitch = C.pitch; u.rate = C.rate; u.volume = 1;
        u.onstart = () => { if (s.cancelled) return; s.started = true; s.start = CLK.t; VOICE.starts++; VOICE.fails = 0; };
        u.onboundary = e => { if (s.cancelled || (e.name && e.name !== 'word')) return; let k = 0; while (k + 1 < starts.length && starts[k + 1] <= e.charIndex) k++; s.bIdx = Math.max(s.bIdx, k); s.gotB = true; VOICE.boundaries++; };
        u.onend = () => { if (!s.cancelled) s.ended = true; };
        u.onerror = () => { if (!s.cancelled) { s.tts = false; VOICE.fails++; } };
        if (speechSynthesis.speaking || speechSynthesis.pending) speechSynthesis.cancel();
        speechSynthesis.speak(u); s.tts = true; s.u = u;
        if (speechSynthesis.paused) speechSynthesis.resume();
      } catch (e) { s.tts = false; }
    }
  });
}
function speechTick() {
  const s = SP.cur; if (!s) return;
  const el = CLK.t - s.start, n = s.words.length;
  if (s.tts && !s.started && el > 3.5) { s.tts = false; s.cancelled = true; VOICE.fails++; try { speechSynthesis.cancel(); } catch (e) { } s.start = CLK.t; }
  let idx;
  if (s.ended) idx = n - 1;
  else if (s.gotB) idx = s.bIdx;
  else { idx = -1; for (let i = 0; i < n; i++) if (el >= s.est.at[i]) idx = i; if (s.tts && !s.started) idx = -1; }
  if (idx > s.idx) {
    for (let i = s.idx + 1; i <= idx; i++) (s.cues[i] || []).forEach(cueFire);
    s.idx = idx; s.wordT = CLK.t; if (s.bub) { s.bub.idx = idx; s.bub.wordT = CLK.t; }
  }
  const done = s.tts ? (s.ended || el > s.est.end * 1.9 + 3) : el >= s.est.end;
  if (done) {
    for (let i = s.idx + 1; i < n; i++) (s.cues[i] || []).forEach(cueFire);
    if (s.bub) { s.bub.idx = n - 1; s.bub.hideAt = CLK.t + 0.75; }
    SP.cur = null; s.res();
  }
}
// Mouth openness from the speech activity
function talk(who) {
  const s = SP.cur; if (!s || s.who !== who || s.idx < 0) return 0;
  const since = CLK.t - s.wordT;
  return clamp(0.25 + 0.75 * Math.abs(Math.sin((CLK.t - s.start) * 13)) * (since < 0.5 ? 1 : 0.4));
}
const speaking = who => !!(SP.cur && SP.cur.who === who);
// Public: queue a line (auto-split into bubble-sized chunks)
function say(who, text, o = {}) {
  const chunks = who === 'dadi' ? (text.length > 190 ? text.match(/[^.!?…]+[.!?…]+["'’”]?|\S[^.!?…]*$/g) : [text]) : chunkText(text);
  const gen = SP.gen;
  SP.pending = (SP.pending || 0) + 1;
  const p = SP.chain.then(async () => { for (let i = 0; i < chunks.length; i++) await speakChunk(who, chunks[i], i === 0 ? o : Object.assign({}, o, { shot: null }), gen); });
  SP.chain = p.catch(() => { });
  p.finally(() => { SP.pending--; }).catch(() => { });
  return p;
}
const speechBusy = () => !!SP.cur || SP.pending > 0;
function speechReset() { SP.gen++; speechStop(); if (SP.cur) { const s = SP.cur; SP.cur = null; s.res(); } BUBS.length = 0; SP.chain = Promise.resolve(); SP.pending = 0; }

// Clock waits (resolved by the frame loop)
const WAITS = [];
function waitClock(sec) { return new Promise(r => WAITS.push({ at: CLK.t + sec, r })); }
function waitTick() { for (let i = WAITS.length - 1; i >= 0; i--) if (CLK.t >= WAITS[i].at) { const w = WAITS[i]; WAITS.splice(i, 1); w.r(); } }
const NAMES = { dadi: 'Diya-Dadi', chiku: 'Chiku', bijli: 'Bijli', kesar: 'Princess Kesar', yama: 'Yama', merchant: 'The merchant' };
