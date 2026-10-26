// ───────────────────────── Boot ─────────────────────────
const startEl = document.getElementById('start'), hud = document.getElementById('hud');
const PREVIEW = { sc: SEQ[0] };
function showStartButtons() {
  startEl.innerHTML = '';
  const add = (label, cls, fn) => { const b = document.createElement('button'); b.className = 'big' + (cls ? ' ' + cls : ''); b.textContent = label; b.addEventListener('click', fn); startEl.appendChild(b); return b; };
  const prev = STORED.choices, done = STORED.shelf[0];
  add(done ? 'Play the story again' : 'Begin the story', '', () => begin(0, false));
  const ep3 = SEQ.findIndex(s => s.id === 't3'), ep2 = SEQ.findIndex(s => s.id === 't2');
  if (!done && prev.c4 && ep3 > 0) add('Continue: Episode 3', 'alt', () => begin(ep3, true));
  else if (!done && prev.c3 && ep2 > 0) add('Continue: Episode 2', 'alt', () => begin(ep2, true));
}
function showReplay() {
  startEl.hidden = false; startEl.innerHTML = '';
  const b = document.createElement('button'); b.className = 'big'; b.textContent = 'Play again'; b.addEventListener('click', () => { G.replay = true; begin(0, false); }); startEl.appendChild(b);
}
function begin(idx, resume) {
  audioInit(); if (VOICE.has && !VOICE.list.length) pickVoices();
  try { if (VOICE.has) { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); } } catch (e) { }
  try { if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') DeviceOrientationEvent.requestPermission().catch(() => { }); } catch (e) { }
  G.resumed = !!resume; G.started = true; G.finished = false;
  if (resume) G.choices = Object.assign({}, STORED.choices);
  else { G.choices = {}; saveStore(); }
  startEl.hidden = true; hud.hidden = false;
  runFrom(idx);
}
// controls
const bMute = document.getElementById('bMute');
function syncMute() { bMute.setAttribute('aria-pressed', AU.muted ? 'true' : 'false'); bMute.setAttribute('aria-label', AU.muted ? 'Turn sound on' : 'Mute sound'); document.getElementById('mWave').style.display = AU.muted ? 'none' : ''; document.getElementById('mX').style.display = AU.muted ? '' : 'none'; }
bMute.addEventListener('click', () => { setMuted(!AU.muted); syncMute(); });
document.getElementById('bSkip').addEventListener('click', () => skipScene());
document.getElementById('bCam').addEventListener('click', () => { if (CAMIN.status === 'on') camStop(); else camStart(); });
window.addEventListener('keydown', e => {
  if (e.key === 'm' || e.key === 'M') { setMuted(!AU.muted); syncMute(); }
  else if (e.key === 'ArrowRight' && G.started) skipScene();
  else if ((e.key === '1' || e.key === '2') && CH.on && CH.res) CH.res(+e.key - 1);
});
window.addEventListener('resize', () => { resize(); S2L = null; });
resize();
// start screen: the title card paints itself behind the Begin button
D.S = newState(SEQ[0]); D.shot('card'); D.cue('card');
showStartButtons();
const startFont = () => { requestAnimationFrame(frame); };
if (document.fonts && document.fonts.load) Promise.race([document.fonts.load(`800 62px "Baloo 2"`), new Promise(r => setTimeout(r, 1500))]).then(startFont, startFont); else startFont();
// deep link / automated check entry: #s5 starts at scene 5
(() => {
  const want = QA.start || (location.hash.match(/^#(s\d+|t\d|end)$/) || [])[1];
  if (!want) return;
  const i = SEQ.findIndex(s => s.id === want); if (i < 0) return;
  if (QA.start) { if (QA.choices) G.choices = Object.assign({}, QA.choices); begin(i, !!QA.choices); }
  else { startEl.querySelector('button').textContent = 'Begin here'; startEl.querySelector('button').onclick = null; startEl.querySelector('button').addEventListener('click', () => begin(i, false), { once: true }); }
})();
window.__dbg = () => ({ scene: SEQ[G.sceneIdx] && SEQ[G.sceneIdx].id, shot: D.S && D.S.shot, st: D.st, voice: VOICE.info, starts: VOICE.starts, boundaries: VOICE.boundaries, fails: VOICE.fails, cam: CAMIN.status, camWhy: CAMIN.why, choices: G.choices });
