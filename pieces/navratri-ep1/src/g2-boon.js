// =====================================================================
//  GROUP 2 — beats 5–8: he did not stop, Brahma appears, the boon, pride. Eras: stop, brahma, boon, pride.
//  Brahma is ink only (no colour). Red marker: the BOON stamp (beat 7) is the scene's one red.
// =====================================================================
const G2 = { halo: [540, 652, 172], palm: [757, 760], bx: 540, by: 1290, H: 150 };

// ---- group helpers
// run fn rotated by ang about the pivot (px, py)
function g2Rot(px, py, ang, fn) { ctx.save(); ctx.translate(px, py); ctx.rotate(ang); ctx.translate(-px, -py); fn(); ctx.restore(); }
// run fn scaled by k about (px, py), shifted by dy
function g2Scale(px, py, k, dy, fn) { ctx.save(); ctx.translate(px, py + dy); ctx.scale(k, k); ctx.translate(-px, -py); fn(); ctx.restore(); }
// a slow breath on 2s (TT steps), -1..1
const g2Breath = (rate = 2.2, ph = 0) => Math.sin(TT * rate + ph);
// put the pencil on a point in the current (world) transform
const g2Pen = (x, y) => { PEN = toScreen(x, y); };
// a small graphite leaf, tumbling as it drifts
function g2Leaf(x, y, s, ang, key) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  const P = [[-22, 0], [-10, -9], [8, -9], [22, 0], [8, 9], [-10, 9], [-22, 0]];
  gfill(P, NV.paper, { off: [0, 0], key: key + 'f' });
  gpencil(P, { key, w: 2.4, a: 0.85, amp: 0.8, step: 6 }); gpencil([[-26, 2], [18, 0]], { key: key + 'v', w: 1.8, a: 0.7, amp: 0.5, passes: 1 });
  ctx.restore();
}
// a twinkling margin star: written on once, then its points boil a little
function g2Star(x, y, r, t, key) { if (TT < t) return; doodleStar(x, y, r * (1 + 0.12 * (B % 2)), key, { part: ev(t, 0.4), a: 0.6 }); }

// a raised open palm (fingers up), centred near (x, y), local scale k
function palmPts(x, y, k = 1) {
  const P = [[x - 26 * k, y + 50 * k], [x - 30 * k, y], [x - 30 * k, y - 34 * k], [x - 20 * k, y - 36 * k], [x - 18 * k, y - 8 * k], [x - 14 * k, y - 50 * k], [x - 4 * k, y - 52 * k], [x - 2 * k, y - 10 * k],
    [x + 2 * k, y - 56 * k], [x + 12 * k, y - 56 * k], [x + 13 * k, y - 10 * k], [x + 18 * k, y - 48 * k], [x + 28 * k, y - 46 * k], [x + 27 * k, y - 4 * k], [x + 44 * k, y - 22 * k], [x + 50 * k, y - 14 * k], [x + 28 * k, y + 22 * k], [x + 22 * k, y + 50 * k]];
  return P;
}

// ---- era: he did not stop (beat 5). The face close-up, eyes shut; the camera pushes in; pencil scribbles creep in
//      from the edges and close into one pencil ring round his head (the bridge into Brahma's halo).
const G2F = { x: 540, y: 640, h: 350, ring: [540, 600, 360] };
SCENES.stop = function () {
  const cu = CUES, t0 = ERA_T[ERA.stop], t1 = ERA_T[ERA.brahma], { x, y, h } = G2F; PEN = null;
  sketchPage({ grid: 'dots' });
  // background life: two margin stars blink on, boiling
  g2Star(110, 330, 16, t0 + 1.4, 'st5a'); g2Star(965, 1250, 13, t0 + 2.0, 'st5b');
  // the season box he opened out of: inked from frame 0, drawn back off as his face is pencilled in
  const off = ev(t0 + 0.5, 0.8);
  if (off < 1) gline(sketchBox(150, 320, 780, 900, 30), { w: 4, key: 'box5', part: 1 - off, second: true });
  // the face, breathing slowly (eyes shut, unmoving: the tapasya goes on)
  const br = g2Breath(2.0);
  g2Scale(x, y + 3.4 * h, 1 + 0.004 * br, -3 * br, () => mahishaHead(x, y, h, { eyes: 'closed', u: ev(t0 + 0.05, 1.3), key: 'mh5' }));
  // effort: three graphite strain ticks at the temple on "stop", and a bead of sweat
  const sk = ev(cu.stop - 0.1, 0.3);
  if (sk > 0) for (let i = 0; i < 3; i++) { const a = -0.55 + i * 0.32, r0 = 0.62 * h; gpencil([[x + 0.05 * h + Math.cos(a) * r0, y - 0.15 * h + Math.sin(a) * r0], [x + 0.05 * h + Math.cos(a) * (r0 + 46), y - 0.15 * h + Math.sin(a) * (r0 + 46)]], { key: 'tk5' + i, part: stag(sk, i, 3, 0.5), w: 3, a: 0.85, passes: 1 }); }
  sweat(x - 0.32 * h, y - 0.22 * h, ev(cu.stop + 0.1, 1.0), 'sw5');
  // the scribbles: graphite tangles creep in from the page edges toward the ring, more of them as "stop" lands
  const [rx, ry, rr] = G2F.ring, g = EZ.io(seg(TT, t0 + 0.3, t1 - 0.5));
  for (let i = 0; i < 14; i++) {
    const ti = t0 + 0.35 + i * 0.16; if (TT < ti) continue;
    const a = i / 14 * TAU + 0.4 + 0.35 * g, r = lerp(620, rr + 40, g) + 26 * ((i * 7) % 3);
    graphiteScribble(rx + Math.cos(a) * r, ry + Math.sin(a) * r * 0.98, 92, 72, 'st' + i, { a: 0.7, part: ev(ti, 0.35) });
  }
  // the halo: the scribbles close into one pencil ring, the pencil running round it
  const RP = loopPts(rx, ry, rr, rr, 0.06), ru = ev(t1 - 1.1, 0.55);
  if (ru > 0) { gpencil(RP, { key: 'ring5', part: ru, w: 3.4, a: 0.95 }); if (ru < 1) g2Pen(...writeEnd(RP, ru)); }
  penDraw(0.9);
  cap(['he did not stop'], [0, 'stop'], cu.stop - 0.5, cu.stop + 0.1);
};
// a slow push in on his face all through the beat, ending where the whole ring fits the frame
CAMS.stop = (t) => camMix(CAM0, camOf({ z: 1.25, p: [540, 620], to: [540, 580] }), EZ.io(seg(t, ERA_T[ERA.stop] + 0.3, ERA_T[ERA.brahma] - 0.6)));
BRIDGE_IN.stop = () => ({ P: sketchBox(150, 320, 780, 900, 30, 0), c: NV.graph });
BRIDGE_OUT.stop = () => ({ P: ellipsePts(G2F.ring[0], G2F.ring[1], G2F.ring[2], G2F.ring[2], 0, 64), c: NV.graph });
BOARD.stop = [{ t: CUES.stop + 0.3, title: 'extreme close-up: he did not stop; scribbles gather', sound: 'pad thins; scratch on 16ths', next: 'the scribble halo becomes Brahma\'s halo' }];

// ---- era: Brahma appears (beat 6). Ink only; the rays are written on one at a time from "Brahma".
SCENES.brahma = function () {
  const cu = CUES, t0 = ERA_T[ERA.brahma]; PEN = null;
  sketchPage({ grid: 'dots' });
  const [hx, hy, hr] = G2.halo;
  // background life: two small graphite birds cross the top margin; stars blink
  for (let i = 0; i < 2; i++) { const bx = 90 + (TT - t0) * 55 + i * 70, by = 330 + i * 34 + 6 * ((B + i) % 2); if (bx < 460) doodleBird(bx, by, 0.75 - i * 0.15, ((B + i) % 3) / 2, 'bb6' + i); }
  g2Star(905, 1180, 14, t0 + 1.2, 'st6a');
  // the pencil halo it opened out of, there from the first frame; Brahma's own inked halo lands on it
  gpencil(loopPts(hx, hy, hr, hr, 0.05), { key: 'bh6', w: 3, a: 0.75 });
  brahma(G2.bx, G2.by, G2.H, { u: ev(t0 + 0.1, 2.6), key: 'br6' });
  // the rays, one at a time from "Brahma", then turning very slowly
  const ru = ev(cu.brahma - 0.2, 20 * E16), rot = -Math.PI / 2 + 0.035 * Math.max(0, TT - cu.brahma);
  rayRing(hx, hy, hr + 28, hr + 110, 20, ru, { key: 'bray', w: 3.6, rot });
  if (ru > 0 && ru < 1) { const i = Math.min(19, Math.floor(ru / 0.75 * 20)), k = stag(ru, i, 20, 0.25), a = rot + i / 20 * TAU, r = hr + 28 + 82 * k; g2Pen(hx + Math.cos(a) * r, hy + Math.sin(a) * r); }
  // his raised blessing palm answers "appeared": a small ring of graphite rays (it carries the bridge)
  rayRing(G2.palm[0], G2.palm[1] - 10, 70, 112, 10, ev(cu.appeared, 0.8), { key: 'pr6', w: 2.6, col: NV.graph });
  if (TT > cu.appeared + 0.6) for (let i = 0; i < 3; i++) sparkle(130 + i * 410, 420 + (i % 2) * 560, 26, ((TT - cu.appeared) * 0.8 + i * 0.37) % 1, 'bsp' + i);
  penDraw(0.9);
  cap(['at last, Brahma'], [0, 'Brahma'], cu.brahma - 0.4, cu.brahma + 0.15);
};
BRIDGE_IN.brahma = () => ({ P: ellipsePts(G2.halo[0], G2.halo[1], G2.halo[2], G2.halo[2], 0, 64), c: NV.graph });
BRIDGE_OUT.brahma = () => ({ P: palmPts(G2.palm[0], G2.palm[1], 1.6), c: NV.graph });
// a slow lean in on him while he is drawn, then the push to his raised palm
CAMS.brahma = (t) => {
  const e = VL('b06_brahma').t1, lean = camMix(CAM0, camOf({ z: 1.07, p: [540, 820], to: [540, 820] }), EZ.io(seg(t, ERA_T[ERA.brahma] + 0.6, e - 0.6)));
  return camMix(lean, camOf({ z: 2.0, p: G2.palm, to: [580, 800] }), EZ.io(seg(t, e - 0.6, ERA_T[ERA.boon] - 0.6)));
};
BOARD.brahma = [{ t: VL('b06_brahma').t1 - 0.4, title: 'Brahma appears, ink only; rays written on', sound: 'pad thickens; a soft chime per ray group', next: 'his raised palm' }];

// ---- era: the boon (beat 7). Brahma's raised palm in ink, Mahishasura kneeling; a card "no man / no deva"; the red BOON stamp.
const G2B = { palm: [835, 560], stamp: [770, 1060, 104], card: [700, 860], kneel: [300, 1290, 104] };
// the stamp lands on "defeat": CUES.stamp (after the line) falls inside the closing bridge window, where it can't be seen
const g2StampT = () => CUES.stamp;   // in the pause after the line (the head holds the boon era open for it)
function roundStamp(x, y, r, u, key) {   // a round red rubber stamp, worn; pops in on its beat (the scene's one red)
  if (u <= 0) return;
  const k = u < 1 ? EZ.back(u) : 1;
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.16); ctx.scale(k, k);
  gline(loopPts(0, 0, r, r, 0.04), { w: 9, col: NV.red, key: key + 'o', second: false });
  gline(loopPts(0, 0, r * 0.82, r * 0.82, 0.04), { w: 3, col: NV.red, key: key + 'i', second: false });
  handLetter('BOON', 0, r * 0.22, r * 0.62, { face: 'marker', col: NV.red, key: key + 't', jit: 0.5 });
  ctx.fillStyle = NV.paper; const S = RNG('rstk', key); for (let i = 0; i < 180; i++) { ctx.globalAlpha = 0.5; const a = S.r(0, TAU), rr = S.f() * r; ctx.fillRect(Math.cos(a) * rr, Math.sin(a) * rr, 2 + S.f() * 3, 2 + S.f() * 3); }
  ctx.restore();
}
SCENES.boon = function () {
  const cu = CUES, t0 = ERA_T[ERA.boon]; PEN = null;
  const asked = VW('b07a_ask', 'asked'), impossible = VW('b07a_ask', 'impossible');
  sketchPage({ grid: 'dots' });
  // background life: a leaf drifts down the left margin while he asks; margin stars blink
  if (TT > asked && TT < cu.granted + 1.5) { const lt = TT - asked; g2Leaf(120 + 34 * Math.sin(lt * 1.3), 300 + lt * 62, 1, 0.6 * Math.sin(lt * 1.7), 'lf7'); }
  g2Star(150, 1180, 14, t0 + 2.2, 'st7a'); g2Star(560, 330, 12, impossible, 'st7b');
  // Brahma's raised palm from the top right, in ink, with ray lines; it lifts a little on "granted"
  FIG.mode = 'ink';
  const gk = ev(cu.granted, 0.5), lift = Math.sin(Math.PI * gk) * (gk < 1 ? 1 : 0);
  g2Scale(G2B.palm[0], G2B.palm[1] + 70, 1 + 0.05 * lift, -10 * lift, () => {
    const fore = limb([[1120, 760], [1000, 700], [G2B.palm[0] + 6, G2B.palm[1] + 70]], [[0, 52], [0.6, 40], [1, 30]]);
    drawLimb(fore, 1, 'bfore', { hatch: true });
    bandOn(fore, 0.85, 1, 'bbang', { w: 0.05 }); bandOn(fore, 0.92, 1, 'bbang2', { w: 0.04 });
    hand(G2B.palm[0] + 6, G2B.palm[1] + 70, -Math.PI / 2 - 0.08, 220, 'open', -1, 'bpalm', 1);
  });
  // the rays turn slowly; a second, longer ring of graphite rays is written on at "impossible" and reaches out on "granted"
  const rot = -Math.PI / 2 + 0.03 * (TT - t0), [px, py] = [G2B.palm[0], G2B.palm[1] - 30];
  rayRing(px, py, 170, 230, 16, ev(t0 + 0.2, 1.2), { key: 'pray', w: 3, rot });
  rayRing(px, py, 205, 280 + 40 * ev(cu.granted, 0.4), 16, ev(impossible, 1.2), { key: 'pray2', w: 2.4, col: NV.graph, rot: rot + Math.PI / 16 });
  // Mahishasura kneels, facing the palm; he bows a little on "asked", lifts his head on "granted", bows again at the stamp
  const [kx, ky, kH] = G2B.kneel;
  const bow = 0.05 * EZ.io(seg(TT, asked + 0.1, asked + 0.6)) - 0.035 * EZ.io(seg(TT, cu.granted, cu.granted + 0.5)) + 0.04 * EZ.io(seg(TT, g2StampT(), g2StampT() + 0.25));
  g2Rot(kx - 0.36 * kH, ky - 0.3 * kH, bow, () => mahishasura(kx, ky, kH, { pose: 'kneel', u: ev(t0 + 0.15, 1.8), key: 'mh7' }));
  // the card: pencilled then inked on "boon", taped down, written on as the voice says each word
  const [cx, cy] = G2B.card, cu0 = ev(cu.boonAsk, 1.0);
  if (cu0 > 0) {
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-0.05);
    if (cu0 > 0.5) gfill(sketchBox(-170, -120, 340, 240, 10, 0), SK.sheet, { off: [6, 6], key: 'card7f' });
    dr(sketchBox(-170, -120, 340, 240, 10), cu0, 'card7', { w: 3.6 });
    const tp = cu.boonAsk + 1.15; if (TT >= tp) { const s = 1 + 0.18 * (1 - ev(tp, 0.17)); ctx.save(); ctx.scale(s, s); tapeStrip(0, -122 / s, 120, 0.04, 'card7t', 34); ctx.restore(); }
    for (const [str, yy, t, k] of [['no man', -20, cu.man - 0.15, 'nm7'], ['no deva', 70, cu.deva - 0.15, 'nd7']]) {
      const rv = ev(t, 0.5); if (rv <= 0) continue;
      handLetter(str, -130, yy, 64, { align: 'left', reveal: rv, key: k });
      if (rv < 1) g2Pen(-130 + letterW(str, 64, 'hand') * rv, yy - 6);
    }
    ctx.restore();
  }
  // the stamp: the scene's one red, a pop and a settle; a graphite smudge where it pressed
  if (TT >= g2StampT()) smudge(G2B.stamp[0] + 8, G2B.stamp[1] + 10, 120, 110, 0.10 * ev(g2StampT(), 0.2), 0);
  roundStamp(G2B.stamp[0], G2B.stamp[1], G2B.stamp[2], ev(g2StampT(), 0.25), 'boon7');
  penDraw(0.9);
  cap(['no man or deva'], [0, 'deva'], cu.man - 0.5, cu.deva + 0.1);
};
// lean in on him and the card while he asks; back out to the palm on "granted"; then push to where the stamp lands
CAMS.boon = (t) => {
  const cu = CUES, asked = VW('b07a_ask', 'wanted');
  let c = camMix(CAM0, camOf({ z: 1.15, p: [560, 950], to: [560, 950] }), EZ.io(seg(t, asked, asked + 2.4)));
  c = camMix(c, CAM0, EZ.io(seg(t, cu.granted - 0.5, cu.granted + 0.3)));
  return camMix(c, camOf({ z: 1.4, p: G2B.stamp.slice(0, 2), to: [600, 900] }), EZ.io(seg(t, g2StampT() + 0.15, ERA_T[ERA.pride] - 0.6)));
};
BRIDGE_IN.boon = () => ({ P: palmPts(G2B.palm[0], G2B.palm[1], 2.2), c: NV.graph });
BRIDGE_OUT.boon = () => ({ P: ellipsePts(G2B.stamp[0], G2B.stamp[1], G2B.stamp[2], G2B.stamp[2], 0, 64), c: NV.red });
BOARD.boon = [{ t: g2StampT() + 0.3, title: 'the boon: he kneels; "no man / no deva"; the red BOON stamp', sound: 'a stamp thud on the beat', next: 'the stamp circle becomes his eye' }];

// ---- era: pride (beat 8). His face, eyes open, a sure smile; the small crown is rubbed out and drawn back bigger;
//      graphite smudges creep in from the edges as his pride grows.
const G2P = { x: 540, y: 660, h: 340 };
SCENES.pride = function () {
  const cu = CUES, t0 = ERA_T[ERA.pride], t1 = ERA_T[ERA.army], { x, y, h } = G2P; PEN = null;
  const thought = VW('b08_pride', 'thought');
  sketchPage({ grid: 'dots' });
  navMess(0.65 * EZ.io(seg(TT, cu.invincible + 0.2, t1 - 0.4)), 'messA');
  // his eyes: a sideways look while he thinks, back to the front, a blink after "thought" and on "grew"
  const look = lerp(lerp(0.4, -0.4, EZ.io(seg(TT, thought, thought + 0.3))), 0, EZ.io(seg(TT, cu.invincible - 0.3, cu.invincible)));
  const blink = (TT >= thought + 0.5 && TT < thought + 0.62) || (TT >= cu.grew && TT < cu.grew + 0.12);
  // the chin lifts on "invincible"; a slow breath
  const lift = EZ.io(seg(TT, cu.invincible, cu.invincible + 0.6)), br = g2Breath(1.9);
  g2Scale(x, y + 3.4 * h, 1 + 0.025 * lift + 0.004 * br, -12 * lift - 3 * br, () => {
    mahishaHead(x, y, h, { eyes: blink ? 'closed' : 'open', smile: ev(t0 + 0.4, 1.0) * (0.7 + 0.3 * lift), look, noCrown: true, u: 1, key: 'mh8' });
    // the crown: the small one is rubbed out from left to right, crumbs fly, then the big one is drawn in (pencil, then ink)
    const te = cu.invincible - 0.1, er = ev(te, 0.9), small = [x, y - 0.4 * h, 0.92 * h, 0.66 * h], bigK = 1.45;
    if (er < 1) {
      const ex = small[0] - small[2] * 0.6 + er * small[2] * 1.2;
      ctx.save(); if (er > 0) { ctx.beginPath(); ctx.rect(ex, small[1] - small[3] * 1.4, W, small[3] * 1.8); ctx.clip(); }
      crown(small[0], small[1], small[2], small[3], 'cr8s', { u: 1 }); ctx.restore();
      if (er > 0) { navEraser(ex, small[1] - small[3] * 0.4 + 18 * Math.sin(B * 2.2), -0.3, 1.1); crumbs(ex - 40, small[1] + 30, 8, 'cr8c' + (B % 3)); }
    }
    // the crumbs left behind settle on his hair
    if (TT > te + 0.9) crumbs(x - 0.1 * h, y - 0.42 * h, 6, 'cr8d', 260);
    crown(x, y - 0.4 * h, 0.92 * h * bigK, 0.66 * h * bigK, 'cr8b', { u: ev(te + 1.0, 1.1) });
  });
  penDraw(0.9);
  cap(['now invincible'], [0, 'invincible'], cu.invincible - 0.5, cu.invincible + 0.2);
};
// open on his eye (the stamp's circle), pull back; at the end settle down to frame the big crown for the fortress
CAMS.pride = (t) => {
  const c = camMix(camOf({ z: 3.4, p: [G2P.x - 0.22 * 0.8 * G2P.h, G2P.y - 0.06 * G2P.h], to: [540, 760] }), CAM0, EZ.io(seg(t, ERA_T[ERA.pride] + 0.05, ERA_T[ERA.pride] + 1.0)));
  return camMix(c, camOf({ z: 1.04, p: [540, 600], to: [540, 720] }), EZ.io(seg(t, CUES.grew - 0.6, ERA_T[ERA.army] - 0.6)));
};
BRIDGE_IN.pride = () => ({ P: ellipsePts(G2P.x - 0.22 * 0.8 * G2P.h, G2P.y - 0.06 * G2P.h, 34, 16, 0, 64), c: NV.ink });
BRIDGE_OUT.pride = () => ({ P: crownPts(G2P.x, G2P.y - 0.4 * G2P.h - 12, 0.92 * G2P.h * 1.45, 0.66 * G2P.h * 1.45), c: NV.graph });
BOARD.pride = [{ t: CUES.grew + 0.4, title: 'pride: the crown erased and redrawn bigger; smudges creep in', sound: 'pad thickens, scratch on 16ths', next: 'the crown becomes the fortress' }];
