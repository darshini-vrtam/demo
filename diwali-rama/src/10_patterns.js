/* ===== Pattern library: reusable <pattern> fills in palette colours, created on demand and shared by every scene ===== */
const I='#2A1608';
const PATS={
  /* scalloped waves: two offset rows of arches with inner curls and dots */
  wave:(a,b)=>({w:48,h:40,m:`<rect width="48" height="40" fill="${b}"/>
    <path d="M0 18A12 12 0 0 1 24 18A12 12 0 0 1 48 18M-12 38A12 12 0 0 1 12 38A12 12 0 0 1 36 38A12 12 0 0 1 60 38" fill="none" stroke="${a}" stroke-width="3"/>
    <path d="M6 18A6 6 0 0 1 18 18M30 18A6 6 0 0 1 42 18M-6 38A6 6 0 0 1 6 38M18 38A6 6 0 0 1 30 38M42 38A6 6 0 0 1 54 38" fill="none" stroke="${a}" stroke-width="1.6"/>
    <circle cx="12" cy="17" r="1.6" fill="${a}"/><circle cx="36" cy="17" r="1.6" fill="${a}"/><circle cx="24" cy="37" r="1.6" fill="${a}"/><circle cx="0" cy="37" r="1.6" fill="${a}"/><circle cx="48" cy="37" r="1.6" fill="${a}"/>`}),
  scale:(a,b)=>({w:24,h:24,m:`<rect width="24" height="24" fill="${b}"/><path d="M0 0A12 12 0 0 0 24 0M-12 12A12 12 0 0 0 12 12M12 12A12 12 0 0 0 36 12M0 24A12 12 0 0 0 24 24" fill="none" stroke="${a}" stroke-width="2.2"/>`}),
  hatch:(a,b)=>({w:9,h:9,rot:45,m:`<rect width="9" height="9" fill="${b}"/><path d="M0 0V9" stroke="${a}" stroke-width="2.2"/>`}),
  hatch2:(a,b)=>({w:9,h:9,rot:-45,m:`<rect width="9" height="9" fill="${b}"/><path d="M0 0V9" stroke="${a}" stroke-width="2.2"/>`}),
  vlines:(a,b)=>({w:12,h:12,m:`<rect width="12" height="12" fill="${b}"/><path d="M6 0V12" stroke="${a}" stroke-width="3"/>`}),
  hlines:(a,b)=>({w:12,h:10,m:`<rect width="12" height="10" fill="${b}"/><path d="M0 5H12" stroke="${a}" stroke-width="2.4"/>`}),
  xhatch:(a,b)=>({w:12,h:12,rot:45,m:`<rect width="12" height="12" fill="${b}"/><path d="M0 6H12M6 0V12" stroke="${a}" stroke-width="1.8"/>`}),
  dots:(a,b)=>({w:16,h:16,m:`<rect width="16" height="16" fill="${b}"/><circle cx="4" cy="4" r="2.2" fill="${a}"/><circle cx="12" cy="12" r="2.2" fill="${a}"/>`}),
  fdots:(a,b)=>({w:22,h:22,m:`<rect width="22" height="22" fill="${b}"/><circle cx="11" cy="11" r="2.6" fill="${a}"/><circle cx="11" cy="4" r="1.4" fill="${a}"/><circle cx="11" cy="18" r="1.4" fill="${a}"/><circle cx="4" cy="11" r="1.4" fill="${a}"/><circle cx="18" cy="11" r="1.4" fill="${a}"/>`}),
  petals:(a,b)=>({w:28,h:24,m:`<rect width="28" height="24" fill="${b}"/><path d="M14 22C4 14 7 4 14 2C21 4 24 14 14 22Z" fill="${a}" stroke="${I}" stroke-width="1.6"/><path d="M14 18V7" stroke="${I}" stroke-width="1.2"/><circle cx="0" cy="20" r="2" fill="${I}"/><circle cx="28" cy="20" r="2" fill="${I}"/>`}),
  flower:(a,b)=>({w:34,h:34,m:`<rect width="34" height="34" fill="${b}"/><g transform="translate(17 17)" fill="${a}" stroke="${I}" stroke-width="1.4"><path d="M0 0C-4 -5 -3 -11 0 -12C3 -11 4 -5 0 0Z"/><path d="M0 0C5 -4 11 -3 12 0C11 3 5 4 0 0Z"/><path d="M0 0C4 5 3 11 0 12C-3 11 -4 5 0 0Z"/><path d="M0 0C-5 4 -11 3 -12 0C-11 -3 -5 -4 0 0Z"/></g><circle cx="17" cy="17" r="2.6" fill="${I}"/><circle cx="0" cy="0" r="1.6" fill="${a}"/><circle cx="34" cy="0" r="1.6" fill="${a}"/><circle cx="0" cy="34" r="1.6" fill="${a}"/><circle cx="34" cy="34" r="1.6" fill="${a}"/>`}),
  vine:(a,b)=>({w:64,h:32,m:`<rect width="64" height="32" fill="${b}"/><path d="M0 16C16 4 16 4 32 16S48 28 64 16" fill="none" stroke="${a}" stroke-width="2.6"/>
    <path d="M16 9C10 2 18 -2 22 4C24 8 20 10 16 9Z" fill="${a}" stroke="${I}" stroke-width="1.4"/><path d="M48 23C54 30 46 34 42 28C40 24 44 22 48 23Z" fill="${a}" stroke="${I}" stroke-width="1.4"/>`}),
  rings:(a,b)=>({w:36,h:36,m:`<rect width="36" height="36" fill="${b}"/><circle cx="18" cy="18" r="13" fill="none" stroke="${a}" stroke-width="2"/><circle cx="18" cy="18" r="7" fill="none" stroke="${a}" stroke-width="2"/><circle cx="18" cy="18" r="2.4" fill="${a}"/>`}),
  chevron:(a,b)=>({w:24,h:12,m:`<rect width="24" height="12" fill="${b}"/><path d="M0 10L6 3L12 10L18 3L24 10" fill="none" stroke="${a}" stroke-width="2.4"/>`}),
  stars:(a,b)=>({w:90,h:70,m:`<rect width="90" height="70" fill="${b}"/><circle cx="12" cy="14" r="1.8" fill="${a}"/><circle cx="58" cy="8" r="1.4" fill="${a}"/><circle cx="74" cy="44" r="1.8" fill="${a}"/><circle cx="30" cy="52" r="1.3" fill="${a}"/><path d="M44 30h8M48 26v8" stroke="${a}" stroke-width="1.6"/>`}),
  grid:(a,b)=>({w:20,h:20,m:`<rect width="20" height="20" fill="${b}"/><path d="M10 2L18 10L10 18L2 10Z" fill="none" stroke="${a}" stroke-width="1.8"/><circle cx="10" cy="10" r="2" fill="${a}"/>`}),
  brick:(a,b)=>({w:40,h:20,m:`<rect width="40" height="20" fill="${b}"/><path d="M0 0H40M0 10H40M10 0V10M30 10V20" stroke="${a}" stroke-width="1.8"/><circle cx="20" cy="5" r="1.4" fill="${a}"/><circle cx="0" cy="15" r="1.4" fill="${a}"/><circle cx="40" cy="15" r="1.4" fill="${a}"/>`}),
  leafy:(a,b)=>({w:30,h:26,m:`<rect width="30" height="26" fill="${b}"/><path d="M4 22Q4 8 15 3Q16 16 4 22Z" fill="${a}" stroke="${I}" stroke-width="1.3"/><path d="M19 24Q26 14 30 13Q28 22 19 24Z" fill="${a}" stroke="${I}" stroke-width="1.3"/><path d="M5 21L14 6" stroke="${I}" stroke-width="1"/>`}),
  spiral:(a,b)=>({w:30,h:30,m:`<rect width="30" height="30" fill="${b}"/><path d="M15 15m-2 0a2 2 0 1 1 4 0a5 5 0 1 1 -9 -1a8 8 0 1 1 15 4" fill="none" stroke="${a}" stroke-width="2"/>`}),
  zig:(a,b)=>({w:20,h:16,m:`<rect width="20" height="16" fill="${b}"/><path d="M0 4L5 12L10 4L15 12L20 4" fill="none" stroke="${a}" stroke-width="2.2"/>`})};
const Pat={defs:null,m:new Map(),
  init(){this.defs=el('defs',null,svg)},
  /* returns a url() for pattern name in colours a (line) and b (ground), at scale s */
  u(name,a,b,s){s=s||1;b=b||'none';const id=`p-${name}-${a.slice(1)}-${b.replace('#','')}-${String(s).replace('.','_')}`;
    if(!this.m.has(id)){const d=PATS[name](a,b);const p=el('pattern',{id,patternUnits:'userSpaceOnUse',width:d.w*s,height:d.h*s,
        patternTransform:d.rot?`rotate(${d.rot})`:null},this.defs);const g=grp(p,{transform:s!==1?`scale(${s})`:null});g.innerHTML=d.m;this.m.set(id,1)}
    return`url(#${id})`}};
