#!/usr/bin/env python3
"""Build the-merchant-and-the-bull.html from the v6 story + the new character library.

Everything except the people and animals comes from v6 (scenes, interactions, games, narration,
parallax, scenery). The character section is replaced by chars.js, the CSS gait loops are replaced
by a speed-driven walking rig, and a few scene lines are adapted to the new figures.

Run: python3 build_v7.py
"""
import pathlib, re, sys

root = pathlib.Path(__file__).parent
src = (root / 'v6-source.html').read_text(encoding='utf-8')
chars = (root / 'chars.js').read_text(encoding='utf-8')


def sub1(text, old, new, label):
    n = text.count(old)
    if n != 1:
        sys.exit(f'{label}: expected 1 match, found {n}')
    return text.replace(old, new)


# 1. strip the old publish skeleton (the artifact host adds its own)
src = src[src.index('<body>') + len('<body>'):]
src = src.replace('</body></html>', '').strip() + '\n'

# 2. CSS: drop the looping gait rules (the rig drives these now), soften shakes, smooth gestures
DROP = ('.legA,.legB{', '.moving .legA', '.moving .legB', '.shin{', '.bullc{', '.moving .bullc', '.cart{',
        '.moving .cart', '.wheel{', '.moving .wheel', '.hop{', '.footL,.footR{', '.walking .footL', '.walking .footR',
        '.char.walking', '.walking .pose.armL', '.walking .pose.armR', '.walking.running', '.char.walking.running')
lines = src.split('\n')
src = '\n'.join(l for l in lines if not l.startswith(DROP))
src = sub1(src, '.pose.armR{animation:gestR 2.6s ease-in-out infinite}', '.pose.armR{animation:gestR 1.6s ease-in-out infinite alternate}', 'gestR rule')
src = sub1(src, '.pose.armL{animation:gestL 3.1s ease-in-out infinite}', '.pose.armL{animation:gestL 1.9s ease-in-out infinite alternate}', 'gestL rule')
src = re.sub(r'@keyframes gestR\{[^\n]*\}\}', '@keyframes gestR{from{transform:rotate(-6deg)}to{transform:rotate(-38deg)}}', src)
src = re.sub(r'@keyframes gestL\{[^\n]*\}\}', '@keyframes gestL{from{transform:rotate(3deg)}to{transform:rotate(16deg)}}', src)
src = re.sub(r'@keyframes screenshake\{[^\n]*\}\}', '@keyframes screenshake{0%,100%{transform:translate(0,0)}25%{transform:translate(-4px,2px)}50%{transform:translate(4px,-2px)}75%{transform:translate(-3px,-1px)}}', src)
src = re.sub(r'@keyframes treeshake\{[^\n]*\}\}', '@keyframes treeshake{0%,100%{transform:rotate(-1.6deg)}50%{transform:rotate(1.6deg)}}', src)
src = src.replace('.shake-tree{animation:treeshake .16s linear 9 !important}', '.shake-tree{animation:treeshake .32s ease-in-out 4 !important}')

CSS = r"""
/* ─── storybook characters: pivots, moods, smooth idle motion ─── */
.pv{transform-box:view-box;transform-origin:0 0}
.hidle{animation:headidle 5.2s ease-in-out infinite}
.tl{transform-box:view-box;transform-origin:0 0;animation:tlswish 3.4s ease-in-out infinite alternate}
.paw{animation:pawlift 5.5s ease-in-out infinite}
.paw.still{animation:none;transform:none}
.mSad,.mO,.mFlat,.mWorry,.bW,.bSt{display:none}
.m-sad .mS,.m-o .mS,.m-flat .mS,.m-worry .mS,.lm-scared .mS,.lm-worried .mS{display:none}
.m-sad .mSad,.m-o .mO,.m-flat .mFlat,.m-worry .mWorry,.lm-scared .mO,.lm-worried .mWorry{display:inline}
.b-worry .bN,.b-stern .bN,.lm-scared .bN,.lm-worried .bN{display:none}
.b-worry .bW,.b-stern .bSt,.lm-scared .bW,.lm-worried .bW{display:inline}
.talking .mS,.talking .mO,.talking .mSad,.talking .mFlat,.talking .mWorry{transform-box:fill-box;transform-origin:50% 0;animation:talk2 .24s ease-in-out infinite alternate}
.wide .eye{transform:scale(1.3)}
.armS{transform:rotate(-50deg)}
.worry .armS{transform:rotate(-140deg)}
.char.sage .pose.armR{animation:none !important}
.char.sage.pray .pose.armR{transform:none}
.char.sage.pray .pose.armL{transform:rotate(-70deg)}
.crown{transform-box:fill-box;transform-origin:50% 100%}
@keyframes headidle{0%,100%{transform:rotate(-1.2deg)}50%{transform:rotate(1.4deg)}}
@keyframes tlswish{from{transform:rotate(-5deg)}to{transform:rotate(7deg)}}
@keyframes pawlift{0%,100%{transform:rotate(0)}40%,70%{transform:rotate(-24deg)}}
@keyframes talk2{from{transform:scaleY(.5)}to{transform:scaleY(1.08)}}
@media (prefers-reduced-motion:reduce){.hidle,.tl,.paw{animation:none !important}}
"""
style_end = src.index('</style>\n\n<div id="app">')
src = src[:style_end] + CSS + src[style_end:]

# 3. replace the character section
a = src.index('/* ══════════ Characters ══════════ */')
b = src.index('/* ══════════ Props ══════════ */')
src = src[:a] + chars.replace('const RIGS = new Set();', 'var RIGS = new Set();') + '\n' + src[b:]

# 4. shading keeps rounded same-colour strokes in step with the gradient fill
src = sub1(src,
    "    if (f && HEX.test(f)) { const L = lum(f); if (L > .05 && L < .96) el.setAttribute('fill', unified ? unifiedGrad(f, el, root, bb, cache) : gradFor(f)); }",
    "    if (f && HEX.test(f)) { const L = lum(f); if (L > .05 && L < .96) { const nf = unified ? unifiedGrad(f, el, root, bb, cache) : gradFor(f); el.setAttribute('fill', nf); if (st === f) el.setAttribute('stroke', nf); } }",
    'shade fill')

# 5. drive the walking rigs from the parallax frame loop
src = sub1(src, "const PLX = { list: [], cx: 0, cy: 0, tx: 0, ty: 0, t0: performance.now() };",
           "const PLX = { list: [], cx: 0, cy: 0, tx: 0, ty: 0, t0: performance.now(), last: performance.now() };", 'PLX')
src = sub1(src, "  for (const w of PLX.list) w.setAttribute('transform', `translate(${(-PLX.cx * w._m * K).toFixed(2)} ${(-PLX.cy * w._m * K * .45).toFixed(2)})`);\n  requestAnimationFrame(plxLoop);",
           "  for (const w of PLX.list) w.setAttribute('transform', `translate(${(-PLX.cx * w._m * K).toFixed(2)} ${(-PLX.cy * w._m * K * .45).toFixed(2)})`);\n  const dt = Math.min(.05, (now - PLX.last) / 1000); PLX.last = now;\n  if (RIGS) stepRigs(dt);\n  requestAnimationFrame(plxLoop);", 'plx loop')
src = sub1(src, "function newStage(bg) {\n  PLX.list = [];", "function newStage(bg) {\n  PLX.list = []; if (RIGS) RIGS.clear();", 'newStage')

# 6. wagon wheels turn with the wagon's real speed
src = sub1(src, "  wo.append(wh); g.append(wo);\n  g.parts = p; return g;",
           "  wo.append(wh); g.append(wo);\n  regRig(g, g, { stride: 9999, nominal: 100, wheelR: 66, swing: 0, bob: 0 });\n  g.parts = p; return g;", 'wagon')

# 7. reins run from the seated merchant's hand to the bull's muzzle
src = sub1(src, "const hx = 122 + 50 * .74, hy = -178 - 30 * .74, to = p.sanjivaka ? { x: 474, y: -128 } : { x: 522, y: -150 };",
           "const hx = 122 + 80 * .74, hy = -178 - 28 * .74, to = p.sanjivaka ? { x: 500, y: -150 } : { x: 548, y: -164 };", 'reins')

# 8. the injured bull lies down properly instead of sinking behind a mound
src = sub1(src, "  const b = actor(bull(SANJ), x, y + 68 * s, s, { r: -3 }); b.parts.head.classList.add('droop'); r.append(b);",
           "  const b = actor(bull({ ...SANJ, lying: true }), x, y + 4 * s, s, { r: -2 }); b.parts.head.classList.add('droop'); r.append(b);", 'lyingBull')

# 9. the shadow in the last scene is a true silhouette
src = sub1(src, "actor(bull({ body: '#0C0A14', shade: '#0C0A14', horn: '#0C0A14', tip: '#0C0A14', jhool: false }), 1420, 690, .55, { op: 0 })",
           "actor(bull({ silhouette: true, body: '#0C0A14' }), 1420, 690, .55, { op: 0 })", 'shadow bull')

# 10. the injured bull's leg sinks into the mud instead of the whole figure dropping out of the rig
src = sub1(src, "  tween(sj, { y: 56, r: -7 }, 500, ease.out); sj.parts.head.classList.add('droop');",
           "  tween(sj, { y: 30, r: -5 }, 700, ease.io); sj.parts.head.classList.add('droop');", 'mud sink')
src = sub1(src, "  tween(sj, { y: 40, r: -4 }, 800);", "  tween(sj, { y: 18, r: -3 }, 900, ease.io);", 'mud rise')

out = root / 'the-merchant-and-the-bull.html'
out.write_text(src, encoding='utf-8')
print(f'{out.name}: {len(src.encode()) / 1024:.0f} KB')
