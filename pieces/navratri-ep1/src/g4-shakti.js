// =====================================================================
//  GROUP 4 — beats 13–16: the lights merge (silence), THE ONE HARD CUT to Devi Durga on her lion (loudest hit),
//  nine rings, the first light to the mountains, the cliffhanger and the title. Eras: merge, durga, light, who.
//  Terracotta is Shakti: the goddess, her rays, the comet. Red marker: the SHAILAPUTRI underline only.
// =====================================================================
const G4 = { centre: [570, 770], ringR: 440, x: 600, y: 1290, H: 126 };

// ---- era: Durga (the cut lands on a finished frame), then nine rings, one per beat, with tally ticks
SCENES.durga = function () {
  const cu = CUES; PEN = null;
  sketchPage({ grid: 'dots' });
  const [ox, oy] = G4.centre;
  // terracotta rays all round, boiling (glow is lines); a halo ring behind her head
  rayRing(ox, oy, 430, 488, 40, 1, { col: NV.terra, w: 4, key: 'dray', boil: 0.07 });
  const fx = G4.x + 0.15 * G4.H + 0.06 * G4.H, fy = G4.y - 6.8 * G4.H;
  rayRing(fx, fy, 128, 178, 20, 1, { col: NV.terra, w: 3.2, key: 'dhr', rot: -Math.PI / 2 + 0.15 });
  dr(loopPts(fx, fy, 118, 118, 0.06), 1, 'dhalo', { w: 4, col: NV.terraD });
  durgaOnLion(G4.x, G4.y, G4.H, { key: 'dl13' });
  // the nine rings: drawn on the circle around her, one per beat, with a tally in the margin
  cu.rings.forEach((t, i) => {
    const k = ev(t, 0.3); if (k <= 0) return;
    const a = -Math.PI / 2 - Math.PI * 0.8 + i * (Math.PI * 1.6 / 8), x = ox + Math.cos(a) * G4.ringR * 1.04, y = oy + Math.sin(a) * G4.ringR * 1.04;
    gfill(loopPts(x, y, 30, 30, 0), NV.terra, { a: 0.25 * k, off: [3, 3], key: 'rgf' + i });
    gline(loopPts(x, y, 30, 30, 0.08), { w: 4.4, col: NV.terra, key: 'rg' + i, part: k });
    rayRing(x, y, 38, 52, 8, ev(t + 0.2, 0.3), { col: NV.terra, w: 2.4, key: 'rgr' + i });
    // tally: four strokes and a cross-stroke, then four more
    const g = Math.floor(i / 5), j = i % 5, tx = 836 + g * 96 + j * 16;
    if (j < 4) gline([[tx, 1262], [tx + 4, 1300]], { w: 4, key: 'tal' + i, part: ev(t, 0.15), second: false });
    else gline([[tx - 70, 1294], [tx - 4, 1266]], { w: 4, key: 'tal' + i, part: ev(t, 0.15), second: false });
  });
  // after "Durga": her name lettered once, small, under the lion (ink)
  if (TT < cu.rings[0] - 0.5) cap(['Devi Durga'], [0, 'Durga'], cu.durga - 0.2, cu.durga + 0.25);
  else cap(['nine nights', 'of Shakti'], [1, 'Shakti'], cu.nine - 0.2, cu.shakti + 0.1);
};
CAMS.durga = (t) => {
  const cu = CUES;
  const pin = push(t, CUT, cu.goddess - 0.3, { z: 1.0, p: [540, 800], to: [540, 800] });
  const lean = EZ.io(seg(t, cu.lion, cu.face + 0.5)) * (1 - EZ.io(seg(t, cu.battle - 0.6, cu.nine - 0.1)));
  const c = camMix(CAM0, camOf({ z: 1.25, p: [560, 760], to: [540, 820] }), lean);
  void pin; return c;
};
BOARD.durga = [
  { t: CUT + 0.25, title: 'THE CUT: Devi Durga on her lion, terracotta rays', sound: 'LOUDEST hit in the pause, then a warm pad', next: 'nine rings, one per beat' },
  { t: CUES.rings[8] + 0.6, title: 'nine rings around her, tally ticks', sound: 'nine chimes, one per ring', next: 'one ring becomes a comet' },
];

// ---- eras still to draw (storyboard stage)
SCENES.merge = function () { sketchPage({ grid: 'dots' }); cap(['brighter'], [0, 'brighter'], ERA_T[ERA.merge] + 0.3); };
SCENES.light = function () { sketchPage({ grid: 'dots' }); cap(['toward the mountains'], [0, 'mountains'], ERA_T[ERA.light] + 0.3); };
SCENES.who = function () { sketchPage({ grid: 'dots' }); cap(['who was waiting?'], [0, 'waiting'], ERA_T[ERA.who] + 0.3); };
