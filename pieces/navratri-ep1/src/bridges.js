// =====================================================================
//  ERAS, CAMERAS, BRIDGES (owned by the lead; read by kit/morph.js). Scene files register their own
//  CAMS[key], BRIDGE_IN[key], BRIDGE_OUT[key] and BOARD[key]; this file only wires them together.
// =====================================================================
const ERA_BG = ERA_KEYS.map(() => SK.paper);
function pieceCam(era, t) { const f = CAMS[ERA_KEYS[era]]; return f ? f(t) : null; }
const BRIDGE_FALLBACK = () => ({ P: ellipsePts(540, 800, 150, 150, 0, 64), c: SK.graph });
const BRIDGES = MORPH_LIST.map(({ tc, a, b, d }) => ({
  tc, d,
  A: () => (BRIDGE_OUT[ERA_KEYS[a]] || BRIDGE_FALLBACK)(),
  B: () => (BRIDGE_IN[ERA_KEYS[b]] || BRIDGE_FALLBACK)(),
}));
// the storyboard: every beat's key times, in era order
TIMELINE.board = ERA_KEYS.flatMap((k) => BOARD[k] || [{ t: (ERA_T[ERA[k]] + ERA_T[ERA[k] + 1]) / 2, title: SHOT_TITLES[k], sound: '', next: '' }]);
