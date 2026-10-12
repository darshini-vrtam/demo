// =====================================================================
//  GROUP 3 — beats 9–12: the army (PEAK, busiest frame), the devas retreat, the devas gather (FIRST terracotta
//  dot), divine energies. Eras: army, retreat, gather, energy.
// =====================================================================
const G3 = { gate: [540, 600], centre: [540, 820] };

// a tiny inked soldier: head, body, legs that step on 8ths, a spear or a banner
function soldier(x, y, s, key, ph, kind = 0) {
  const st = ph % 2 ? 1 : -1;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = NV.ink; ctx.beginPath(); ctx.arc(0, -64, 8, 0, TAU); ctx.fill();
  gline([[-4, -76], [0, -88], [4, -76]], { w: 2.4, key: key + 'h', amp: 0.4, second: false, step: 5 });   // helmet spike
  gline([[0, -56], [0, -24]], { w: 3.4, key: key + 'b', amp: 0.5, second: false, step: 6 });
  gline([[0, -24], [-8 * st, 0]], { w: 3, key: key + 'l1', amp: 0.4, second: false, step: 6 });
  gline([[0, -24], [8 * st, 0]], { w: 3, key: key + 'l2', amp: 0.4, second: false, step: 6 });
  gline([[0, -48], [12, -36]], { w: 2.6, key: key + 'a', amp: 0.4, second: false, step: 6 });
  if (kind === 1) { gline([[12, -30], [12, -120]], { w: 2.2, key: key + 'pole', amp: 0.5, second: false, step: 8 }); gline([[12, -120], [44, -110 + 4 * Math.sin(B * 1.3 + x)], [12, -98]], { w: 2.2, key: key + 'fl', amp: 0.5, second: false, step: 6 }); gfill([[12, -120], [44, -110 + 4 * Math.sin(B * 1.3 + x)], [12, -98]], NV.graph, { a: 0.55, off: [0, 0], key: key + 'flf' }); }
  else gline([[12, -20], [12, -104]], { w: 2, key: key + 'sp', amp: 0.4, second: false, step: 8 });
  ctx.restore();
}
// ---- era: the army (busiest frame; the camera pulls back to show it all)
SCENES.army = function () {
  const cu = CUES, t0 = ERA_T[ERA.army]; PEN = null;
  sketchPage({ grid: 'dots' });
  navMess(0.75, 'messA');
  // the fortress behind, already there (it is what the crown became)
  const F = fortress(540, 640, 1.05, 1, 'fortB');
  // smoke from the towers in graphite
  for (let i = 0; i < 3; i++) { const x = 300 + i * 240, sm = []; for (let k = 0; k <= 9; k++) sm.push([x + Math.sin(k * 0.8 - TT * 3 + i) * 14 + k * 4, 300 - k * 14]); gpencil(sm, { key: 'asmk' + i, w: 2.4, a: 0.55 }); }
  // the rows: each row marches in on an 8th, stepping on 8ths; banners every few soldiers
  const rows = 7, beat8 = Math.floor((TT - t0) / E8);
  for (let r = 0; r < rows; r++) {
    const y = 760 + r * 82, sc = 0.62 + r * 0.09, n = 9 + Math.round(r * 0.6), tr = t0 + 0.15 + r * E8;
    if (TT < tr) continue;
    const slide = (1 - EZ.o3(ev(tr, 0.4))) * (r % 2 ? 120 : -120);
    for (let i = 0; i < n; i++) {
      const x = 90 + (i + 0.5 * (r % 2)) * (900 / (n - 0.5)) + slide;
      if (r >= 4 && Math.abs(x - 540) < 170) continue;   // a lane for him
      soldier(x, y, sc, 'sd' + r + '_' + i, beat8 + i + r, (i + r) % 4 === 1 ? 1 : 0);
    }
  }
  // Mahishasura at the front, striding, crown big now
  mahisha(540, 1210, 0.62, { pose: 'stride', step: (beat8 % 2 ? 0.7 : 1), crown: 1.5, key: 'mhA', smile: 1 });
  // dust ticks on the ground line, on 8ths
  for (let i = 0; i < 6; i++) gpencil([[140 + i * 160, 1290], [160 + i * 160 + 10 * ((B + i) % 2), 1282]], { key: 'dust' + i, w: 2.4, a: 0.6 });
  penDraw(0.9);
  cap(['an army'], [0, 'army'], cu.army - 0.2, cu.army + 0.3);
};
CAMS.army = (t) => {
  const t0 = ERA_T[ERA.army], cu = CUES;
  const u = EZ.io(seg(t, t0 + 0.2, cu.attacking + 0.4));            // pull back from him to the whole army
  const close = camOf({ z: 1.7, p: [540, 900], to: [540, 820] });
  const end = ERA_T[ERA.retreat], g = EZ.io(seg(t, end - 0.9, end - 0.3));   // then lean in on the gate (the bridge)
  const pulled = camMix(close, CAM0, u);
  return camMix(pulled, camOf({ z: 1.8, p: [540, 600], to: [540, 760] }), g);
};
BRIDGE_IN.army = () => ({ P: crownPts(540, 640, 735, 400), c: NV.graph });   // the crown's five points = the fortress's towers
BRIDGE_OUT.army = () => ({ P: [[540 - 48, 640], ...arcPts(540, 640 - 74, 48, Math.PI, TAU, 12), [540 + 48, 640]], c: NV.ink });
BOARD.army = [{ t: CUES.attacking + 0.6, title: 'the army; the camera pulls back (busiest frame)', sound: 'PEAK: low drone, steps on 8ths', next: 'fortress gate becomes heaven\'s gate' }];

// ---- eras still to draw (storyboard stage)
SCENES.retreat = function () { sketchPage({ grid: 'dots' }); navMess(0.9, 'messA'); cap(['the devas retreat'], [0, 'retreat'], ERA_T[ERA.retreat] + 0.3); };
SCENES.gather = function () { sketchPage({ grid: 'dots' }); cap(['they came together'], [0, 'together'], ERA_T[ERA.gather] + 0.3); };
SCENES.energy = function () { sketchPage({ grid: 'dots' }); cap(['each gave light'], [0, 'light'], ERA_T[ERA.energy] + 0.3); };
