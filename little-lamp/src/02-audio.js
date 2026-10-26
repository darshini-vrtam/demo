// ───────────────────────── Audio: every sound synthesized, all routed through one mute ─────────────────────────
const AU = { ac: null, master: null, sfx: null, mus: null, muted: false, musLevel: 0.16, swellUntil: 0, duckUntil: 0, nextNote: 0, step: 0, drone: [], mood: 'day' };
function audioInit() {
  if (AU.ac) { if (AU.ac.state === 'suspended') AU.ac.resume().catch(() => { }); return; }
  const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
  try {
    const ac = AU.ac = new AC();
    const comp = ac.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 4; comp.connect(ac.destination);
    AU.master = ac.createGain(); AU.master.gain.value = AU.muted ? 0 : 0.9; AU.master.connect(comp);
    AU.sfx = ac.createGain(); AU.sfx.gain.value = 0.8; AU.sfx.connect(AU.master);
    AU.mus = ac.createGain(); AU.mus.gain.value = 0; AU.mus.connect(AU.master);
    // tanpura-like drone: Sa and Pa with slow beating, low-passed
    const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 700; lp.connect(AU.mus);
    [[146.83, 0.05], [146.83 * 1.004, 0.04], [220, 0.035], [73.42, 0.05]].forEach(([f, v]) => {
      const o = ac.createOscillator(), gn = ac.createGain(); o.type = 'sawtooth'; o.frequency.value = f; gn.gain.value = v;
      const l = ac.createOscillator(), lg = ac.createGain(); l.frequency.value = 0.07 + Math.random() * 0.08; lg.gain.value = v * 0.6; l.connect(lg); lg.connect(gn.gain); l.start();
      o.connect(gn); gn.connect(lp); o.start(); AU.drone.push(o);
    });
    AU.nextNote = ac.currentTime + 0.5;
    AU.mus.gain.setTargetAtTime(AU.musLevel, ac.currentTime, 2);
  } catch (e) { AU.ac = null; }
}
function setMuted(m) {
  AU.muted = m;
  if (AU.ac && AU.master) AU.master.gain.setTargetAtTime(m ? 0 : 0.9, AU.ac.currentTime, 0.05);
  if (m) speechStop();
}
function noiseBuf(sec) {
  const ac = AU.ac, b = ac.createBuffer(1, Math.ceil(ac.sampleRate * sec), ac.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; return b;
}
function env(gn, t, a, peak, dcy, sus = 0) { gn.gain.setValueAtTime(0.0001, t); gn.gain.exponentialRampToValueAtTime(peak, t + a); gn.gain.exponentialRampToValueAtTime(Math.max(0.0001, sus), t + a + dcy); }
function nz(t, dur, type, f, q, peak, a = 0.01, dest) {
  const ac = AU.ac, s = ac.createBufferSource(); s.buffer = noiseBuf(dur + 0.1);
  const fl = ac.createBiquadFilter(); fl.type = type; fl.frequency.value = f; fl.Q.value = q;
  const gn = ac.createGain(); env(gn, t, a, peak, dur); s.connect(fl); fl.connect(gn); gn.connect(dest || AU.sfx); s.start(t); s.stop(t + dur + 0.1);
  return { fl, gn };
}
function tone(t, f, dur, type = 'sine', peak = 0.2, a = 0.005, dest, f2) {
  const ac = AU.ac, o = ac.createOscillator(), gn = ac.createGain(); o.type = type; o.frequency.setValueAtTime(f, t);
  if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
  env(gn, t, a, peak, dur); o.connect(gn); gn.connect(dest || AU.sfx); o.start(t); o.stop(t + dur + 0.05); return o;
}
const SFX = {
  psst(t) { nz(t, 0.09, 'highpass', 5200, 0.7, 0.35, 0.005); nz(t + 0.12, 0.32, 'bandpass', 6200, 2.2, 0.5, 0.02); nz(t + 0.47, 0.05, 'highpass', 3000, 1, 0.3, 0.003); },
  hop(t) { tone(t, 180, 0.12, 'sine', 0.5, 0.002, null, 80); nz(t, 0.05, 'bandpass', 1500, 3, 0.25, 0.002); tone(t + 0.16, 900, 0.06, 'triangle', 0.18); tone(t + 0.26, 760, 0.06, 'triangle', 0.15); tone(t + 0.42, 160, 0.12, 'sine', 0.4, 0.002, null, 70); },
  place(t) { tone(t, 620, 0.18, 'triangle', 0.25); tone(t, 1240, 0.08, 'sine', 0.08); nz(t, 0.04, 'bandpass', 2400, 4, 0.18, 0.002); },
  relight(t) { nz(t, 0.14, 'highpass', 2600, 0.8, 0.35, 0.003); nz(t + 0.06, 0.5, 'lowpass', 900, 0.8, 0.22, 0.08); [880, 1320, 1760].forEach((f, i) => tone(t + 0.18 + i * 0.07, f, 0.7, 'sine', 0.09)); },
  wind(t, dur = 2.2, peak = 0.35) {
    const { fl } = nz(t, dur, 'bandpass', 420, 1.6, peak, dur * 0.35);
    fl.frequency.setValueAtTime(300, t); fl.frequency.linearRampToValueAtTime(950, t + dur * 0.45); fl.frequency.linearRampToValueAtTime(380, t + dur);
  },
  creak(t) {
    const ac = AU.ac, o = ac.createOscillator(), fl = ac.createBiquadFilter(), gn = ac.createGain();
    o.type = 'sawtooth'; fl.type = 'bandpass'; fl.Q.value = 9; fl.frequency.value = 900;
    o.frequency.setValueAtTime(58, t); for (let i = 1; i < 18; i++) o.frequency.linearRampToValueAtTime(52 + Math.random() * 30 + i * 2, t + i * 0.12);
    env(gn, t, 0.15, 0.28, 2.2); o.connect(fl); fl.connect(gn); gn.connect(AU.sfx); o.start(t); o.stop(t + 2.5);
  },
  rooster(t) {
    const ac = AU.ac; const seg = [[520, 700, 0.18], [700, 640, 0.14], [640, 900, 0.22], [900, 520, 0.55]];
    let tt = t;
    seg.forEach(([a, b, d]) => {
      const o = ac.createOscillator(), fl = ac.createBiquadFilter(), gn = ac.createGain(); o.type = 'sawtooth';
      o.frequency.setValueAtTime(a, tt); o.frequency.exponentialRampToValueAtTime(b, tt + d);
      fl.type = 'bandpass'; fl.frequency.value = 1500; fl.Q.value = 2.5; env(gn, tt, 0.02, 0.22, d);
      o.connect(fl); fl.connect(gn); gn.connect(AU.sfx); o.start(tt); o.stop(tt + d + 0.1); tt += d + 0.03;
    });
  },
  chime(t) { [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => { tone(t + i * 0.11, f, 2.4, 'sine', 0.12); tone(t + i * 0.11, f * 2.76, 0.8, 'sine', 0.025); }); },
  found(t) { [659.25, 987.77].forEach((f, i) => tone(t + i * 0.09, f, 0.8, 'sine', 0.12)); },
  pop(t) { tone(t, 420, 0.1, 'sine', 0.2, 0.003, null, 900); },
  tap(t) { tone(t, 300, 0.07, 'triangle', 0.15, 0.002, null, 200); },
  whoosh(t) { const { fl } = nz(t, 0.5, 'bandpass', 600, 1.2, 0.2, 0.15); fl.frequency.linearRampToValueAtTime(2400, t + 0.5); },
  pour(t) { for (let i = 0; i < 6; i++) tone(t + i * 0.06, 900 + Math.random() * 500, 0.08, 'sine', 0.07, 0.002, null, 500); },
  sparkle(t) { [1568, 2093, 2637].forEach((f, i) => tone(t + i * 0.06, f, 0.4, 'sine', 0.06)); },
  out(t) { nz(t, 0.35, 'lowpass', 500, 0.7, 0.18, 0.01); },
  giggle(t) { for (let i = 0; i < 4; i++) tone(t + i * 0.1, 700 - i * 40, 0.08, 'triangle', 0.08, 0.004, null, 540 - i * 40); },
};
function sfx(name, ...a) { if (!AU.ac || AU.muted || QA.silent) return; try { SFX[name](AU.ac.currentTime + 0.01, ...a); } catch (e) { } }
// Ambient music: soft pentatonic plucks over the drone; swells at relief moments, goes silent at midnight.
const SCALE = { day: [293.66, 329.63, 369.99, 440, 493.88, 587.33, 659.25], night: [146.83, 164.81, 185, 220, 246.94, 293.66, 329.63] };
function musicTick() {
  const ac = AU.ac; if (!ac || AU.muted) return;
  const now = ac.currentTime, rt = performance.now() / 1000;
  const duck = rt < AU.duckUntil, swell = rt < AU.swellUntil;
  const target = duck ? 0.0001 : swell ? 0.36 : AU.musLevel;
  AU.mus.gain.setTargetAtTime(target, now, duck ? 0.4 : 1.2);
  while (AU.nextNote < now + 0.3) {
    const t = AU.nextNote, sc = SCALE[AU.mood] || SCALE.day, st = AU.step++;
    const pattern = [0, 2, 4, 2, 5, 4, 2, 1, 0, 3, 4, 6, 4, 3, 2, 1];
    if (!duck && (st % 2 === 0 || swell)) {
      const f = sc[pattern[st % 16] % sc.length] * (swell && st % 4 === 0 ? 2 : 1);
      const o = ac.createOscillator(), gn = ac.createGain(), fl = ac.createBiquadFilter(); o.type = 'triangle'; o.frequency.value = f;
      fl.type = 'lowpass'; fl.frequency.value = 1800; env(gn, t, 0.006, swell ? 0.11 : 0.07, 1.4);
      o.connect(fl); fl.connect(gn); gn.connect(AU.mus); o.start(t); o.stop(t + 1.6);
    }
    AU.nextNote += swell ? 0.32 : 0.48;
  }
}
const music = {
  swell(sec = 7) { AU.swellUntil = performance.now() / 1000 + sec; },
  silence(sec) { AU.duckUntil = performance.now() / 1000 + sec; },
  mood(m) { AU.mood = m; },
};
