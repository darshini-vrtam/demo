// ───────────────────────── Shared composition: the tiered wall ─────────────────────────
function LY() {
  const W = V.W, H = V.H, p = V.p;
  return { W, H, p, cx: W / 2, sky: p ? Math.round(H * 0.15) : 232, floor: p ? Math.round(H * 0.74) : 846, rows: p ? [Math.round(H * 0.74) + 250, H - 80] : [H - 64] };
}
// upper register: sun, moon, stars, birds
function skyReg(g, L, t, p, kind = 'day', o = {}) {
  if (p <= 0) return;
  const y = L.sky / 2 + 12;
  if (kind === 'day' || kind === 'sunset' || kind === 'dawn') {
    const sx = L.W * (L.p ? 0.8 : 0.87), sy = y + (kind === 'sunset' ? 34 : kind === 'dawn' ? 20 : 0);
    sun(g, sx, sy, L.p ? 92 : 74, t, partP(p, 0, 3));
    if (kind !== 'dawn') moon(g, L.W * (L.p ? 0.17 : 0.11), y, L.p ? 44 : 38, 0.62, partP(p, 1, 3));
  } else if (kind === 'night') {
    moon(g, L.W * (L.p ? 0.8 : 0.86), y, L.p ? 62 : 54, 1, partP(p, 0, 3), PAL.wall);
  }
  const n = L.p ? 5 : 9, x0 = L.W * (L.p ? 0.3 : 0.21), x1 = L.W * (L.p ? 0.66 : 0.77);
  for (let i = 0; i < n; i++) {
    const x = lerp(x0, x1, i / (n - 1)), pp = partP(p, i, n, 3), yy = y + Math.sin(t * 1.2 + i) * 6;
    if (kind === 'night') star(g, x, yy + (i % 2) * 24 - 12, 18 + (i % 3) * 5, pp, i % 2 ? PAL.yellow : PAL.wall, t * 0.2 + i);
    else if (i % 3 === 1) bird(g, x, yy + 34, 0.5, [PAL.indigo, PAL.red, PAL.green][i % 3], pp, i % 2 === 0);
    else if (i % 3 === 0) star(g, x, yy, 16, pp, PAL.yellow, i);
    else marigold(g, x, yy, 18, pp, i % 2 ? PAL.orange : PAL.yellow);
  }
  regBand(g, 40, L.W - 40, L.sky, p, 1);
}
// a ground-line row of small repeated figures
function figureRow(g, L, t, p, kinds, y, x0 = 70, x1 = L.W - 70, sc = 1) {
  const n = kinds.length, sp = (x1 - x0) / n;
  for (let i = 0; i < n; i++) {
    const k = kinds[i], x = x0 + sp * (i + 0.5), pp = partP(p, i, n, 3), bob = Math.sin(t * 2 + i * 1.7) * 2;
    const [type, col] = k.split(':');
    if (type === 'h') rowHorse(g, x, y + bob * 0.5, 0.27 * sc, col || 'terra', pp, i % 4 === 3);
    else if (type === 'e') elephant(g, x, y, 0.44 * sc, col || 'ochre', pp, i % 4 === 3);
    else if (type === 'p') person(g, x, y + bob * 0.4, 0.6 * sc, col ? PAL[col] : PAL.red, pp, i, false);
    else if (type === 'pl') person(g, x, y + bob * 0.4, 0.6 * sc, col ? PAL[col] : PAL.red, pp, i, true);
    else if (type === 't') tree(g, x, y, 0.38 * sc, pp, i % 3);
    else if (type === 'm') { marigold(g, x - 18 * sc, y - 22 * sc, 18 * sc, pp); marigold(g, x + 18 * sc, y - 22 * sc, 18 * sc, pp, PAL.yellow); marigold(g, x, y - 52 * sc, 18 * sc, pp, PAL.orange); }
    else if (type === 'b') bird(g, x, y - 10, 0.6 * sc, col ? PAL[col] : PAL.indigo, pp, i % 2 === 0);
    else if (type === 'd') diya(g, x - 10, y - 10, 0.55 * sc, t, i, { p: pp, lit: !!col });
  }
  regBand(g, 40, L.W - 40, y + 14, p, 0);
}
function bottomReg(g, L, t, p, kinds, kinds2) {
  figureRow(g, L, t, p, kinds, L.rows[0]);
  if (L.p && L.rows[1]) figureRow(g, L, t, partP(p, 1, 2), kinds2 || kinds.slice().reverse(), L.rows[1]);
}
function floorLine(g, L, p) { regBand(g, 40, L.W - 40, L.floor + 12, p, 2); }
function longShadow(g, x, y, w, len, a, dir = 1) {
  if (a <= 0) return;
  g.save(); g.globalAlpha = a; g.fillStyle = PAL.char;
  g.beginPath(); g.moveTo(x - w / 2, y); g.quadraticCurveTo(x + dir * len * 0.5, y + 8, x + dir * len, y + 22); g.lineTo(x + dir * len, y + 34); g.quadraticCurveTo(x + dir * len * 0.4, y + 26, x + w / 2, y + 2); g.closePath(); g.fill();
  g.restore();
}
// glow wash that brightens the painting as lamps are added
function ambientGlow(g, L, x, y, r, a) {
  if (a <= 0) return;
  g.save(); g.globalCompositeOperation = 'lighter';
  const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, rgba(PAL.glow, 0.32 * a)); gr.addColorStop(1, rgba(PAL.glow, 0));
  g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2); g.restore();
}
// wind: flowing dotted wave and swirl lines
function windLines(g, L, t, strength, dir = 1, y0 = 0, y1 = L.H, n = 7, angle = 0) {
  if (strength <= 0) return;
  g.save(); g.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    const yy = lerp(y0, y1, (i + 0.5) / n), ph = (t * 0.55 * strength + i * 0.37) % 1, cx = dir > 0 ? lerp(-300, L.W + 300, ph) : lerp(L.W + 300, -300, ph);
    const len = 360 + (i % 3) * 120, col = [PAL.wall, PAL.turq, PAL.yellow][i % 3];
    g.globalAlpha = 0.75 * clamp(strength) * Math.sin(ph * Math.PI);
    g.fillStyle = col; g.strokeStyle = col; g.lineWidth = 6;
    for (let k = 0; k < 14; k++) { const x = cx - dir * k * len / 14, y = yy + Math.sin(k * 0.8 + t * 3 + i) * 18 + (x - L.W / 2) * Math.tan(angle); g.beginPath(); g.arc(x, y, 5.5 - k * 0.25, 0, TAU); g.fill(); }
    // curl at the head
    const hx = cx, hy = yy + Math.sin(t * 3 + i) * 18 + (hx - L.W / 2) * Math.tan(angle);
    g.beginPath(); for (let a = 0; a < 5.2; a += 0.25) { const r = 34 - a * 5.6; g.lineTo(hx + dir * Math.cos(a) * r, hy - Math.sin(a) * r); } g.stroke();
  }
  g.restore();
}
function swirl(g, x, y, r, t, a = 1) {
  if (a <= 0) return;
  g.save(); g.globalAlpha = a; g.lineCap = 'round';
  for (let k = 0; k < 3; k++) {
    g.strokeStyle = [PAL.wall, PAL.turq, PAL.yellow][k]; g.lineWidth = 9 - k * 2;
    g.beginPath(); for (let i = 0; i < 40; i++) { const f = i / 40, ang = -t * 4 + f * 9 + k * 2.1, rr = r * (1 - f) * (1 - k * 0.15); g.lineTo(x + Math.cos(ang) * rr, y + Math.sin(ang) * rr); } g.stroke();
  }
  dotRing(g, x, y, r * 1.12, 14, 5, [PAL.wall, PAL.yellow], 1);
  g.restore();
}
const CHOICE_PIC = {}; // picture painters for decision buttons, filled per scene
function actSay(id, maxPending = 1) { if (SP.pending > maxPending) return; const L = LINES[id]; if (L) say(L[0], L[1]); }

// ───────────────────────── Title / episode / end cards ─────────────────────────
function cardScene(id, epNum, epTitle, lines, prevLine, centerKind = 'sun') {
  return {
    id, mood: 'shared', firstShot: 'card', noPush: true,
    async run(D, S) {
      D.cue('card'); music.swell(8);
      if (prevLine && (G.resumed || G.replay)) { await D.wait(1.2); await D.line(prevLine); }
      for (const l of lines) { await D.wait(0.25); await D.line(l); D.cue('l:' + l); }
      await D.wait(1.6);
    },
    draw(g, st, S) {
      const L = LY(), p = ap('card', 3.2), cx = L.cx, cy = L.p ? L.H * 0.34 : 400, R = L.p ? 330 : 228;
      horseRing(g, cx, cy, R, CLK.t, p, centerKind);
      const ty = L.p ? L.H * 0.6 : 770;
      titleText(g, 'Panch Deep · Event 1: Dhanteras', cx, L.p ? L.H * 0.1 : 88, L.p ? 54 : 46, L.W - 200, ap('card', 1.2, 0.4), PAL.red);
      if (L.p) { titleText(g, 'The Little Lamp', cx, ty, 104, L.W - 140, ap('card', 1, 0.9)); titleText(g, 'That Could Not Go Out', cx, ty + 112, 92, L.W - 140, ap('card', 1, 1.1)); }
      else titleText(g, 'The Little Lamp That Could Not Go Out', cx, ty, 84, L.W - 260, ap('card', 1, 0.9));
      if (epNum) titleText(g, `Episode ${epNum}: ${epTitle}`, cx, L.p ? ty + 260 : ty + 94, L.p ? 66 : 56, L.W - 200, ap('card', 1, 1.6), PAL.indigo);
      if (id === 't1' && G.shelf.some(Boolean)) { g.save(); if (L.p) g.translate(cx, L.H - 300); else g.translate(L.W - 300, L.H - 60); g.scale(0.42, 0.42); shelf(g, 0, 0, 1000, CLK.t, G.shelf, ap('card', 2, 0.6)); g.restore(); return; }
      figureRow(g, L, CLK.t, ap('card', 3, 0.6), L.p ? ['h:terra', 'e:indigo', 'h:bijli', 'e:pink', 'h:yellow'] : ['h:terra', 'm', 'e:indigo', 'pl:green', 'h:bijli', 'pl:red', 'e:pink', 'm', 'h:yellow'], L.H - (L.p ? 120 : 70));
    },
  };
}
