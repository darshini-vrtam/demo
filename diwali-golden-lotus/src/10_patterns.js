/* ===== Pattern library: reusable <pattern> fills, created on demand and shared by every scene ===== */
const PATS={
  /* the episode frame: alternating flower, leaf, dot and diamond on cream */
  frame:(a,b)=>({w:96,h:24,m:`<rect width="96" height="24" fill="${b}"/><path d="M4 12L12 4L20 12L12 20Z" fill="${a}" stroke="#111111" stroke-width="1.6"/><circle cx="12" cy="12" r="2" fill="#F5C400"/>
    <circle cx="32" cy="12" r="3.4" fill="#111111"/><path d="M44 16Q52 2 64 8Q56 20 44 16Z" fill="#3F9B49" stroke="#111111" stroke-width="1.5"/><path d="M46 15L60 9" stroke="#111111" stroke-width="1"/>
    <g transform="translate(80 12)"><path d="M0 0Q3 -4 0 -9Q-3 -4 0 0ZM0 0Q4 -2 8 -3Q5 2 0 0ZM0 0Q5 3 5 7Q1 6 0 0ZM0 0Q-1 6 -5 7Q-5 3 0 0ZM0 0Q-5 2 -8 -3Q-4 -2 0 0Z" fill="#F5C400" stroke="#111111" stroke-width="1.2"/><circle r="2" fill="${a}"/></g>`}),
  /* a soft floral field for the cream scenes: small open flowers with dots, kept sparse and low-contrast */
  flora:(a,b)=>({w:120,h:104,m:`<rect width="120" height="104" fill="${b}"/><g transform="translate(30 28)" fill="none" stroke="${a}" stroke-width="2"><path d="M0 -10Q5 -5 0 0Q-5 -5 0 -10ZM10 0Q5 5 0 0Q5 -5 10 0ZM0 10Q-5 5 0 0Q5 5 0 10ZM-10 0Q-5 -5 0 0Q-5 5 -10 0Z"/></g>
    <g transform="translate(90 80)" fill="none" stroke="${a}" stroke-width="2"><path d="M0 -10Q5 -5 0 0Q-5 -5 0 -10ZM10 0Q5 5 0 0Q5 -5 10 0ZM0 10Q-5 5 0 0Q5 5 0 10ZM-10 0Q-5 -5 0 0Q-5 5 -10 0Z"/></g>
    <circle cx="90" cy="24" r="2.4" fill="${a}"/><circle cx="30" cy="80" r="2.4" fill="${a}"/><path d="M58 52q6 -8 12 0" fill="none" stroke="${a}" stroke-width="2"/>`}),
  /* scalloped waves, two offset rows of arches with inner curls */
  wave:(a,b)=>({w:48,h:40,m:`<rect width="48" height="40" fill="${b}"/>
    <path d="M0 18A12 12 0 0 1 24 18A12 12 0 0 1 48 18M-12 38A12 12 0 0 1 12 38A12 12 0 0 1 36 38A12 12 0 0 1 60 38" fill="none" stroke="${a}" stroke-width="3"/>
    <path d="M6 18A6 6 0 0 1 18 18M30 18A6 6 0 0 1 42 18M-6 38A6 6 0 0 1 6 38M18 38A6 6 0 0 1 30 38M42 38A6 6 0 0 1 54 38" fill="none" stroke="${a}" stroke-width="1.6"/>
    <circle cx="12" cy="17" r="1.6" fill="${a}"/><circle cx="36" cy="17" r="1.6" fill="${a}"/><circle cx="24" cy="37" r="1.6" fill="${a}"/><circle cx="0" cy="37" r="1.6" fill="${a}"/><circle cx="48" cy="37" r="1.6" fill="${a}"/>`}),
  fish:(a,b)=>({w:24,h:24,m:`<rect width="24" height="24" fill="${b}"/><path d="M0 0A12 12 0 0 0 24 0M-12 12A12 12 0 0 0 12 12M12 12A12 12 0 0 0 36 12M0 24A12 12 0 0 0 24 24" fill="none" stroke="${a}" stroke-width="2.2"/>`}),
  hatch:(a,b)=>({w:9,h:9,rot:45,m:`<rect width="9" height="9" fill="${b}"/><path d="M0 0V9" stroke="${a}" stroke-width="2.2"/>`}),
  vlines:(a,b)=>({w:12,h:12,m:`<rect width="12" height="12" fill="${b}"/><path d="M6 0V12" stroke="${a}" stroke-width="3"/>`}),
  xhatch:(a,b)=>({w:12,h:12,rot:45,m:`<rect width="12" height="12" fill="${b}"/><path d="M0 6H12M6 0V12" stroke="${a}" stroke-width="1.8"/>`}),
  dots:(a,b)=>({w:16,h:16,m:`<rect width="16" height="16" fill="${b}"/><circle cx="4" cy="4" r="2.2" fill="${a}"/><circle cx="12" cy="12" r="2.2" fill="${a}"/>`}),
  petals:(a,b)=>({w:28,h:24,m:`<rect width="28" height="24" fill="${b}"/><path d="M14 22C4 14 7 4 14 2C21 4 24 14 14 22Z" fill="${a}" stroke="#111111" stroke-width="1.6"/><path d="M14 18V7" stroke="#111111" stroke-width="1.2"/><circle cx="0" cy="20" r="2" fill="#111111"/><circle cx="28" cy="20" r="2" fill="#111111"/>`}),
  rock:(a,b)=>({w:40,h:26,m:`<rect width="40" height="26" fill="${b}"/><path d="M0 13L20 0L40 13L20 26Z" fill="${a}" stroke="#111111" stroke-width="2.2"/><path d="M12 13L20 8L28 13L20 18Z" fill="none" stroke="#111111" stroke-width="1.3"/><circle cx="20" cy="13" r="1.8" fill="#111111"/>`}),
  vine:(a,b)=>({w:64,h:32,m:`<rect width="64" height="32" fill="${b}"/><path d="M0 16C16 4 16 4 32 16S48 28 64 16" fill="none" stroke="${a}" stroke-width="2.6"/>
    <path d="M16 9C10 2 18 -2 22 4C24 8 20 10 16 9Z" fill="${a}" stroke="#111111" stroke-width="1.4"/><path d="M48 23C54 30 46 34 42 28C40 24 44 22 48 23Z" fill="${a}" stroke="#111111" stroke-width="1.4"/>`}),
  rings:(a,b)=>({w:36,h:36,m:`<rect width="36" height="36" fill="${b}"/><circle cx="18" cy="18" r="13" fill="none" stroke="${a}" stroke-width="2"/><circle cx="18" cy="18" r="7" fill="none" stroke="${a}" stroke-width="2"/><circle cx="18" cy="18" r="2.4" fill="${a}"/>`}),
  stripes:(a,b)=>({w:30,h:30,m:`<rect width="30" height="30" fill="${b}"/><path d="M4 0C12 8 2 14 10 22C13 25 9 28 11 30M20 0C26 6 18 12 25 19C28 22 25 26 27 30" fill="none" stroke="${a}" stroke-width="3.6" stroke-linecap="round"/>`}),
  chevron:(a,b)=>({w:24,h:12,m:`<rect width="24" height="12" fill="${b}"/><path d="M0 10L6 3L12 10L18 3L24 10" fill="none" stroke="${a}" stroke-width="2.4"/>`}),
  stars:(a,b)=>({w:90,h:70,m:`<rect width="90" height="70" fill="${b}"/><circle cx="12" cy="14" r="1.8" fill="${a}"/><circle cx="58" cy="8" r="1.4" fill="${a}"/><circle cx="74" cy="44" r="1.8" fill="${a}"/><circle cx="30" cy="52" r="1.3" fill="${a}"/><path d="M44 30h8M48 26v8" stroke="${a}" stroke-width="1.6"/>`}),
  grid:(a,b)=>({w:20,h:20,m:`<rect width="20" height="20" fill="${b}"/><path d="M10 2L18 10L10 18L2 10Z" fill="none" stroke="${a}" stroke-width="1.8"/><circle cx="10" cy="10" r="2" fill="${a}"/>`})};
const Pat={defs:null,m:new Map(),
  init(){this.defs=el('defs',null,svg)},
  /* returns a url() for pattern name in colours a (line) and b (ground), at scale s */
  u(name,a,b,s){s=s||1;b=b||'none';const id=`p-${name}-${a.slice(1)}-${b.replace('#','')}-${String(s).replace('.','_')}`;
    if(!this.m.has(id)){const d=PATS[name](a,b);const p=el('pattern',{id,patternUnits:'userSpaceOnUse',width:d.w*s,height:d.h*s,
        patternTransform:d.rot?`rotate(${d.rot})`:null},this.defs);const g=grp(p,{transform:s!==1?`scale(${s})`:null});g.innerHTML=d.m;this.m.set(id,1)}
    return`url(#${id})`},
  clip(d,id){id=id||uid('c');const c=el('clipPath',{id},this.defs);el('path',{d},c);return id}};
