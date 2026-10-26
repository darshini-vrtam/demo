/* ===== Folk-art pattern fills (shared <pattern> defs, created once and reused) ===== */
const Pat={defs:null,cache:{},n:0,
  get(kind,fg,bg,s,key){s=s||12;key=key||[kind,fg,bg,s].join('|');const c=this.cache[key];if(c)return c.url;
    const id='pt'+(this.n++);const p=el('pattern',{id,patternUnits:'userSpaceOnUse',width:s,height:s},this.defs);
    if(bg)el('rect',{width:s,height:s,fill:bg},p);this.draw(p,kind,fg,s);this.cache[key]={url:`url(#${id})`,el:p};return `url(#${id})`},
  el(key){const c=this.cache[key];return c&&c.el},
  draw(p,k,fg,s){const L=(d,w)=>el('path',{d,fill:'none',stroke:fg,'stroke-width':w||s*.12,'stroke-linecap':'round'},p),F=d=>el('path',{d,fill:fg},p),O=(x,y,r)=>el('circle',{cx:x,cy:y,r,fill:fg},p);
    switch(k){
      case'dots':O(s/2,s/2,s*.16);break;
      case'dots2':O(s/4,s/4,s*.12);O(s*.75,s*.75,s*.12);break;
      case'stripe':L(`M0 ${s}L${s} 0M${-s/2} ${s/2}L${s/2} ${-s/2}M${s/2} ${s*1.5}L${s*1.5} ${s/2}`,s*.16);break;
      case'hstripe':L(`M0 ${s/2}H${s}`,s*.2);break;
      case'vstripe':L(`M${s/2} 0V${s}`,s*.2);break;
      case'hatch':L(`M0 ${s}L${s} 0M0 0L${s} ${s}`,s*.08);break;
      case'scale':L(`M0 ${s}A${s/2} ${s/2} 0 0 1 ${s} ${s}M${-s/2} ${s/2}A${s/2} ${s/2} 0 0 1 ${s/2} ${s/2}M${s/2} ${s/2}A${s/2} ${s/2} 0 0 1 ${s*1.5} ${s/2}`,s*.09);O(s/2,s*.78,s*.07);O(0,s*.28,s*.07);O(s,s*.28,s*.07);break;
      case'chev':L(`M0 ${s*.7}L${s/2} ${s*.3}L${s} ${s*.7}`,s*.13);break;
      case'flower':for(let i=0;i<4;i++){const a=i*TAU/4;O(s/2+Math.cos(a)*s*.17,s/2+Math.sin(a)*s*.17,s*.11)}O(0,0,s*.06);O(s,0,s*.06);O(0,s,s*.06);O(s,s,s*.06);break;
      case'tiger':L(`M${s*.1} 0Q${s*.38} ${s*.45} ${s*.16} ${s}M${s*.62} ${s*.08}Q${s*.86} ${s*.4} ${s*.58} ${s*.72}`,s*.1);break;
      case'tri':F(`M0 ${s}L${s/2} ${s*.2}L${s} ${s}Z`);break;
      case'wave':L(`M0 ${s*.62}Q${s*.25} ${s*.25} ${s*.5} ${s*.62}T${s} ${s*.62}`,s*.09);break;
      case'check':F(`M${s/2} ${s*.18}L${s*.82} ${s/2}L${s/2} ${s*.82}L${s*.18} ${s/2}Z`);break;
      case'leafy':F(`M${s*.2} ${s*.8}Q${s*.2} ${s*.2} ${s*.8} ${s*.2}Q${s*.8} ${s*.8} ${s*.2} ${s*.8}Z`);break;
      case'curl':L(`M${s*.2} ${s*.5}A${s*.22} ${s*.22} 0 1 1 ${s*.5} ${s*.72}A${s*.12} ${s*.12} 0 1 1 ${s*.48} ${s*.48}`,s*.08);O(s*.9,s*.12,s*.05);break;
      case'grain':O(s*.3,s*.3,s*.05);O(s*.75,s*.6,s*.04);O(s*.4,s*.85,s*.035);break;
    }}};

/* Outlined shape: flat fill, optional pattern, bold ink contour with a thin ivory gap that reads as a double line */
function shape(p,d,fill,o){o=o||{};const g=grp(p,o.attrs);const w=o.w==null?5:o.w;
  const base=el('path',{d,fill},g);g.fillEl=base;
  if(o.pat)g.patEl=el('path',{d,fill:o.pat,opacity:o.patOp},g);
  if(w>0){el('path',{d,fill:'none',stroke:PAL.ink,'stroke-width':w,'stroke-linejoin':'round','stroke-linecap':'round'},g);
    if(o.dbl!==false&&w>=3.5)el('path',{d,fill:'none',stroke:o.inner||PAL.ivory,'stroke-width':w*.34,'stroke-linejoin':'round',opacity:.9},g)}
  return g}
function line(p,d,o){o=o||{};return el('path',{d,fill:'none',stroke:o.c||PAL.ink,'stroke-width':o.w||3,'stroke-linecap':'round','stroke-linejoin':'round',opacity:o.op,'stroke-dasharray':o.dash},p)}
function dot(p,x,y,r,fill,o){o=o||{};return el('circle',{cx:f1(x),cy:f1(y),r,fill,stroke:o.stroke,'stroke-width':o.w},p)}
function txt(p,x,y,s,o){o=o||{};const t=el('text',{x,y,'text-anchor':o.anchor||'middle','font-family':o.font||'"Baloo 2","Trebuchet MS",system-ui,sans-serif','font-weight':o.weight||700,'font-size':o.size||28,fill:o.fill||PAL.ink,
  stroke:o.stroke,'stroke-width':o.sw,'paint-order':'stroke','letter-spacing':o.ls},p);t.textContent=s;return t}

/* ===== Petal geometry shared by lotuses, mandalas and frames ===== */
const petalD=(r,w)=>{w=w==null?.42:w;return `M0 0C${f1(r*w)} ${f1(-r*.25)} ${f1(r*w*.75)} ${f1(-r*.8)} 0 ${f1(-r)}C${f1(-r*w*.75)} ${f1(-r*.8)} ${f1(-r*w)} ${f1(-r*.25)} 0 0Z`};
const heartD=(s)=>`M0 ${f1(s*.9)}C${f1(-s*.2)} ${f1(s*.62)} ${f1(-s)} ${f1(s*.2)} ${f1(-s)} ${f1(-s*.25)}C${f1(-s)} ${f1(-s*.75)} ${f1(-s*.35)} ${f1(-s*.95)} 0 ${f1(-s*.45)}C${f1(s*.35)} ${f1(-s*.95)} ${f1(s)} ${f1(-s*.75)} ${f1(s)} ${f1(-s*.25)}C${f1(s)} ${f1(s*.2)} ${f1(s*.2)} ${f1(s*.62)} 0 ${f1(s*.9)}Z`;

/* Lotus: layered petals that open from a closed bud (set(t) 0..1) */
function lotus(p,r,o){o=o||{};const g=grp(p);const c1=o.c1||PAL.pink,c2=o.c2||TINT.blush,vein=o.vein||PAL.verm;
  if(o.pad!==false){shape(g,blob(0,r*.12,r*1.25,r*.28,o.seed||3,.05),PAL.leaf,{w:4,pat:Pat.get('hstripe',mix(PAL.leaf,PAL.ink,.25),null,9)})}
  const layers=o.wide?[{open:[-90,-68,-46,46,68,90],closed:[-12,-7,-3,3,7,12],s:1,c:c1},{open:[-78,-56,56,78],closed:[-6,-2,2,6],s:.82,c:c2},{open:[-66,66],closed:[-2,2],s:.64,c:c1}]
    :[{open:[-78,-42,0,42,78],closed:[-10,-5,0,5,10],s:1,c:c1},{open:[-55,-20,20,55],closed:[-6,-2,2,6],s:.8,c:c2},{open:[-28,0,28],closed:[-3,0,3],s:.6,c:c1}];
  const petals=[];const pod=grp(g);
  layers.forEach((L,li)=>{const lg=grp(g);L.open.forEach((a,i)=>{const pg=grp(lg);const d=petalD(r*L.s);shape(pg,d,L.c,{w:li?3.5:4.5});
      line(pg,`M0 ${-r*L.s*.18}L0 ${-r*L.s*.78}`,{c:vein,w:2});petals.push({g:pg,open:a,closed:L.closed[i],li})})});
  /* seed pod sits in front once open */
  const pg=grp(g);shape(pg,`M${-r*.28} ${-r*.2}Q0 ${-r*.42} ${r*.28} ${-r*.2}L${r*.2} 0Q0 ${r*.08} ${-r*.2} 0Z`,PAL.gold,{w:3});
  [-.12,0,.12].forEach(x=>dot(pg,x*r,-r*.2,r*.035,PAL.ink));
  const L={g,petals,pod:pg,t:-1,set(t){if(Math.abs(t-this.t)<.002)return;this.t=t;
    for(const P of petals){const k=Ease.out(clamp(t*1.5-P.li*.22,0,1));tf(P.g,0,0,lerp(.82,1,k),lerp(P.closed,P.open,k))}
    op(pg,o.noPod?0:clamp(t*2-1,0,1))}};L.set(o.t||0);return L}

/* Mandala: concentric ornamental rings that expand from the centre (set(t) 0..1, spin(a)) */
function mandala(p,r,o){o=o||{};const g=grp(p);const rings=[];const pal=o.pal||[PAL.gold,PAL.verm,PAL.pink,PAL.turq,PAL.ivory];
  const R=(fn)=>{const rg=grp(g);fn(rg);rings.push(rg);return rg};
  R(rg=>{shape(rg,blob(0,0,r,r,11,.0,24),o.bg||TINT.paleGold,{w:4,pat:Pat.get('dots2',mix(PAL.gold,PAL.ivory,.3),null,16)});
    for(let i=0;i<36;i++){const a=i/36*TAU;el('path',{d:`M${f1(Math.cos(a)*r*.86)} ${f1(Math.sin(a)*r*.86)}L${f1(Math.cos(a+.087)*r)} ${f1(Math.sin(a+.087)*r)}L${f1(Math.cos(a-.087)*r)} ${f1(Math.sin(a-.087)*r)}Z`,fill:i%2?pal[1]:pal[0],stroke:PAL.ink,'stroke-width':2},rg)}});
  R(rg=>{for(let i=0;i<16;i++){const pg=grp(rg,{transform:`rotate(${i*22.5}) translate(0 ${-r*.44})`});shape(pg,petalD(r*.4,.38),i%2?pal[2]:pal[0],{w:3});line(pg,`M0 ${-r*.08}L0 ${-r*.3}`,{w:2,c:i%2?PAL.verm:PAL.ivory})}});
  R(rg=>{el('circle',{r:r*.43,fill:'none',stroke:PAL.ink,'stroke-width':3},rg);for(let i=0;i<24;i++){const a=i/24*TAU;dot(rg,Math.cos(a)*r*.395,Math.sin(a)*r*.395,r*.018,PAL.ink)}});
  R(rg=>{for(let i=0;i<8;i++){const pg=grp(rg,{transform:`rotate(${i*45+22.5})`});shape(pg,petalD(r*.36,.5),i%2?pal[3]:pal[1],{w:3})}
    shape(rg,blob(0,0,r*.16,r*.16,5,0,12),PAL.gold,{w:3,pat:Pat.get('dots',PAL.verm,null,8)})});
  const M={g,rings,t:-1,set(t){if(Math.abs(t-this.t)<.002)return;this.t=t;rings.forEach((rg,i)=>{const k=Ease.back(clamp(t*1.6-(rings.length-1-i)*.16,0,1));tf(rg,0,0,Math.max(.001,k),rg._rot||0);op(rg,clamp(k*3,0,1))})},
    spin(a){rings.forEach((rg,i)=>{rg._rot=(i%2?-a:a)*(1+i*.15)});const t=this.t;this.t=-1;this.set(t)}};M.set(o.t==null?1:o.t);return M}

/* Sun with a friendly face and turning rays, as in many folk paintings */
function sun(p,r){const g=grp(p);const rays=grp(g);
  for(let i=0;i<16;i++){const pg=grp(rays,{transform:`rotate(${i*22.5})`});shape(pg,`M${-r*.16} ${-r*.92}L0 ${-r*1.42}L${r*.16} ${-r*.92}Z`,i%2?PAL.verm:PAL.gold,{w:3,dbl:false})}
  shape(g,blob(0,0,r,r,4,.01,16),PAL.gold,{w:4.5,pat:Pat.get('dots',mix(PAL.gold,PAL.verm,.35),null,10)});
  shape(g,blob(0,0,r*.68,r*.68,8,.01,16),mix(PAL.gold,PAL.ivory,.4),{w:3});
  const e=r*.24;[-1,1].forEach(s=>{el('path',{d:`M${s*e-r*.13} ${-r*.08}Q${s*e} ${-r*.2} ${s*e+r*.13} ${-r*.08}Q${s*e} ${-r*.01} ${s*e-r*.13} ${-r*.08}Z`,fill:PAL.ivory,stroke:PAL.ink,'stroke-width':2.4},g);dot(g,s*e,-r*.09,r*.05,PAL.ink)});
  line(g,`M${-r*.2} ${r*.2}Q0 ${r*.36} ${r*.2} ${r*.2}`,{w:3,c:PAL.verm});
  return{g,rays}}

/* Scalloped cloud with dotted fill */
function cloud(p,w,seed){const g=grp(p);const r=rng(seed||1);const n=Math.max(3,Math.round(w/60));let d=`M${-w/2} 0`;
  for(let i=0;i<n;i++){const x0=-w/2+i*w/n,x1=x0+w/n,h=w/n*(.55+r()*.3);d+=`C${f1(x0)} ${f1(-h)} ${f1(x1)} ${f1(-h)} ${f1(x1)} 0`}d+='Z';
  shape(g,d,PAL.ivory,{w:4,pat:Pat.get('dots2',TINT.milk2,null,14)});
  for(let i=0;i<n;i++){const x=-w/2+(i+.5)*w/n;line(g,`M${f1(x-w/n*.22)} -4Q${f1(x)} ${f1(-w/n*.38)} ${f1(x+w/n*.22)} -4`,{w:2.2,c:PAL.ocean})}
  return g}

/* Painted frame: triangle band between two ink rules */
function border(p,W,H,o){o=o||{};const g=grp(p,{'pointer-events':'none'});const b=o.b||18,m=4;
  el('path',{d:`M${m} ${m}H${W-m}V${H-m}H${m}Z M${m+b} ${m+b}V${H-m-b}H${W-m-b}V${m+b}Z`,fill:Pat.get('tri',PAL.verm,PAL.gold,b),'fill-rule':'evenodd'},g);
  el('rect',{x:m,y:m,width:W-2*m,height:H-2*m,fill:'none',stroke:PAL.ink,'stroke-width':5},g);
  el('rect',{x:m+b,y:m+b,width:W-2*m-2*b,height:H-2*m-2*b,fill:'none',stroke:PAL.ink,'stroke-width':3.5},g);
  [[m+b/2,m+b/2],[W-m-b/2,m+b/2],[m+b/2,H-m-b/2],[W-m-b/2,H-m-b/2]].forEach(([x,y])=>{dot(g,x,y,b*.62,PAL.verm,{stroke:PAL.ink,w:3});dot(g,x,y,b*.22,PAL.ivory)});
  return g}

/* ===== Ocean of Milk: rows of scalloped waves with curls, each row sliding on its own ===== */
function waveRowD(x0,x1,y,wl,amp,depth){let d=`M${x0} ${y+depth}V${y}`;for(let x=x0;x<x1;x+=wl)d+=`Q${f1(x+wl/2)} ${f1(y-amp*2)} ${f1(x+wl)} ${y}`;return d+`V${y+depth}Z`}
function curlsD(x0,x1,y,wl,amp){let d='';const r=amp*.42;for(let x=x0;x<x1;x+=wl){const cx=x+wl/2,cy=y-amp*.35;
    d+=`M${f1(cx+r)} ${f1(cy)}A${f1(r)} ${f1(r)} 0 1 1 ${f1(cx-r*.2)} ${f1(cy+r*.95)}A${f1(r*.55)} ${f1(r*.55)} 0 1 1 ${f1(cx+r*.1)} ${f1(cy+r*.1)}`}return d}
function ocean(p,W,H,y0,o){o=o||{};const g=grp(p);const rows=[];const n=o.rows||8;let y=y0;const r=rng(o.seed||5);
  let wsum=0;for(let i=0;i<n;i++)wsum+=lerp(1,1.9,i/(n-1));const unit=(H-y0+30)/wsum;
  const fills=[PAL.ivory,TINT.milk,PAL.ivory,TINT.milk2,PAL.ivory,TINT.milk,PAL.ivory,TINT.milk2];
  for(let i=0;i<n;i++){const wl=o.wl?o.wl:lerp(70,130,i/(n-1)),amp=lerp(9,18,i/(n-1));const rg=grp(g);const x0=-wl*3,x1=W+wl*3;
    const fill=fills[i%fills.length];el('path',{d:waveRowD(x0,x1,y,wl,amp,H-y+80),fill},rg);
    if(i%2===1)el('path',{d:waveRowD(x0,x1,y,wl,amp,H-y+80),fill:Pat.get('dots2',mix(fill,PAL.ocean,.25),null,18),opacity:.8},rg);
    el('path',{d:waveRowD(x0,x1,y,wl,amp,0).replace(/V[\d.]+Z$/,''),fill:'none',stroke:PAL.ink,'stroke-width':4,'stroke-linejoin':'round'},rg);
    el('path',{d:waveRowD(x0,x1,y,wl,amp,0).replace(/V[\d.]+Z$/,''),fill:'none',stroke:i%2?PAL.ocean:PAL.turq,'stroke-width':1.6,transform:'translate(0 5)'},rg);
    el('path',{d:curlsD(x0,x1,y,wl,amp),fill:'none',stroke:i%3===2?PAL.ocean:PAL.turq,'stroke-width':3,'stroke-linecap':'round'},rg);
    rows.push({g:rg,wl,dir:i%2?-1:1,sp:.6+r()*.5,ph:r()*TAU,y});y+=unit*lerp(1,1.9,i/(n-1))}
  const dark=el('rect',{x:-200,y:y0-40,width:W+400,height:H-y0+120,fill:TINT.violet,opacity:0,'pointer-events':'none'},g);
  const gold=el('rect',{x:-200,y:y0-40,width:W+400,height:H-y0+120,fill:Pat.get('dots2',PAL.gold,null,22),opacity:0,'pointer-events':'none'},g);
  const O={g,rows,dark,gold,off:0,
    update(t,dt,speed,bob){this.off+=dt*speed*.045;for(const R of rows){const x=((this.off*R.sp*R.dir*R.wl)%R.wl+R.wl)%R.wl-R.wl;tf(R.g,x,Math.sin(t*.0012*R.sp+R.ph)*(bob==null?3:bob))}}};
  return O}

/* Madhubani fish: almond body with scale fill, forked tail, big eye */
function fish(p,len,c1,c2,seed){const g=grp(p);const L=len,h=len*.3;
  shape(g,`M${-L*.42} 0L${-L*.62} ${-h*.9}Q${-L*.5} 0 ${-L*.62} ${h*.9}Z`,c2,{w:3.5,dbl:false});
  shape(g,`M${L*.5} 0C${L*.3} ${-h*1.25} ${-L*.25} ${-h*1.1} ${-L*.45} 0C${-L*.25} ${h*1.1} ${L*.3} ${h*1.25} ${L*.5} 0Z`,c1,{w:4,pat:Pat.get('scale',PAL.ink,null,Math.max(8,L*.12))});
  shape(g,`M${L*.5} 0C${L*.4} ${-h*.8} ${L*.18} ${-h*.85} ${L*.12} 0C${L*.18} ${h*.85} ${L*.4} ${h*.8} ${L*.5} 0Z`,c2,{w:3,dbl:false});
  shape(g,`M${-L*.05} ${-h*.85}Q${-L*.1} ${-h*1.5} ${-L*.25} ${-h*1.25}Q${-L*.2} ${-h*.9} ${-L*.1} ${-h*.75}Z`,c2,{w:2.6,dbl:false});
  el('ellipse',{cx:L*.32,cy:-h*.12,rx:L*.07,ry:L*.055,fill:PAL.ivory,stroke:PAL.ink,'stroke-width':2.2},g);dot(g,L*.335,-h*.12,L*.035,PAL.ink);
  return g}

/* Bubble: plain outlined circle */
function bubble(p,r){const g=grp(p);el('circle',{r,fill:PAL.ivory,stroke:PAL.ink,'stroke-width':2.4},g);dot(g,-r*.35,-r*.35,r*.2,PAL.turq);return g}

/* Stylised tree for Mount Mandara and the closing border */
function tree(p,s,c){const g=grp(p);shape(g,`M-5 0L-4 ${-s*.5}L4 ${-s*.5}L5 0Z`,PAL.terra,{w:2.5,dbl:false});
  shape(g,blob(0,-s*.75,s*.38,s*.34,s|0,.08,10),c||PAL.leaf,{w:3,pat:Pat.get('leafy',mix(PAL.leaf,PAL.ink,.3),null,10)});return g}

/* Amrit Kalash: golden pot, illuminable dot band, a window for the child's treasure motifs, nectar dome */
function kalash(p,s){const g=grp(p);s=s||1;const K={g,dots:[]};
  const S=v=>f1(v*s);
  shape(g,`M${S(-34)} ${S(56)}L${S(34)} ${S(56)}L${S(42)} ${S(80)}L${S(-42)} ${S(80)}Z`,PAL.gold,{w:4,pat:Pat.get('tri',PAL.verm,null,10)});
  K.body=shape(g,cr([[0,S(-48)],[S(46),S(-38)],[S(66),S(-6)],[S(62),S(30)],[S(36),S(58)],[0,S(64)],[S(-36),S(58)],[S(-62),S(30)],[S(-66),S(-6)],[S(-46),S(-38)]],true),PAL.gold,{w:5,pat:Pat.get('dots2',mix(PAL.gold,PAL.terra,.4),null,14)});
  el('path',{d:`M${S(-63)} ${S(-12)}Q0 ${S(2)} ${S(63)} ${S(-12)}L${S(64)} ${S(2)}Q0 ${S(16)} ${S(-64)} ${S(2)}Z`,fill:PAL.verm,stroke:PAL.ink,'stroke-width':2.6},g);
  for(let i=0;i<9;i++){const x=lerp(-52,52,i/8),y=-5+(1-Math.pow(x/64,2))*7;K.dots.push(el('circle',{cx:S(x),cy:S(y),r:S(3.6),fill:PAL.ivory,stroke:PAL.ink,'stroke-width':1.4},g))}
  K.window=shape(g,blob(0,S(32),S(46),S(24),9,.02,14),mix(PAL.gold,PAL.ivory,.55),{w:3});
  K.motifs=grp(g,{transform:`translate(0 ${S(32)}) scale(${s})`});
  shape(g,`M${S(-24)} ${S(-62)}L${S(24)} ${S(-62)}L${S(20)} ${S(-44)}L${S(-20)} ${S(-44)}Z`,PAL.gold,{w:4,pat:Pat.get('vstripe',PAL.verm,null,7)});
  K.nectar=grp(g);shape(K.nectar,`M${S(-30)} ${S(-66)}Q0 ${S(-104)} ${S(30)} ${S(-66)}Z`,PAL.ivory,{w:3.5,pat:Pat.get('dots',TINT.milk2,null,8)});
  K.sparks=grp(K.nectar);[[-16,-96],[0,-112],[18,-98]].forEach(([x,y],i)=>{const st=grp(K.sparks,{transform:`translate(${S(x)} ${S(y)})`});el('path',{d:`M0 ${S(-8)}L${S(2.5)} ${S(-2.5)}L${S(8)} 0L${S(2.5)} ${S(2.5)}L0 ${S(8)}L${S(-2.5)} ${S(2.5)}L${S(-8)} 0L${S(-2.5)} ${S(-2.5)}Z`,fill:PAL.gold,stroke:PAL.ink,'stroke-width':1.6},st)});
  shape(g,blob(0,S(-64),S(38),S(9),2,.0,12),PAL.gold,{w:4,pat:Pat.get('dots',PAL.verm,null,7)});
  K.light=k=>{K.dots.forEach((d,i)=>{const on=k*K.dots.length>i+.5;setA(d,'fill',on?PAL.verm:PAL.ivory);setA(d,'r',on?S(4.6):S(3.6))})};
  return K}

/* Diya: clay lamp with a flat three-colour flame and a small mandala halo */
function diya(p,s){s=s||1;const g=grp(p,{transform:`scale(${s})`});const D={g};
  D.halo=mandala(g,70,{t:0,pal:[PAL.gold,PAL.verm,PAL.pink,PAL.gold,PAL.ivory],bg:TINT.paleGold});tf(D.halo.g,0,-34,1);
  shape(g,`M-50 -14Q-42 22 0 24Q42 22 50 -14L66 -24Q56 -6 50 -14Q30 -4 0 -4Q-30 -4 -50 -14Z`,PAL.terra,{w:5,pat:Pat.get('tri',PAL.gold,null,12)});
  el('path',{d:'M-46 -12Q0 6 46 -12',fill:'none',stroke:PAL.ink,'stroke-width':3},g);
  line(g,'M54 -18L58 -30',{w:4});
  D.flame=grp(g,{transform:'translate(58 -30)'});
  shape(D.flame,'M0 -62C18 -36 20 -14 0 -6C-20 -14 -18 -36 0 -62Z',PAL.gold,{w:4,dbl:false});
  shape(D.flame,'M0 -42C10 -28 11 -16 0 -11C-11 -16 -10 -28 0 -42Z',PAL.verm,{w:2.5,dbl:false});
  shape(D.flame,'M0 -26C4 -20 4 -15 0 -13C-4 -15 -4 -20 0 -26Z',PAL.ivory,{w:0});
  D.set=(k,t)=>{op(D.flame,k);tf(D.flame,58,-30,lerp(.3,1,Ease.back(k))*(1+Math.sin(t*.008)*.04*k));D.halo.set(k*.95);D.halo.g.setAttribute('opacity',f1(k*.9*100)/100)};
  D.set(0,0);return D}

/* Lotus-shaped tap frame used for the treasure choices */
function lotusFrame(p,r,c){const g=grp(p);for(let i=0;i<12;i++){const pg=grp(g,{transform:`rotate(${i*30})`});shape(pg,petalD(r*1.18,.36),i%2?c:PAL.pink,{w:3})}
  shape(g,blob(0,0,r*.86,r*.86,3,0,20),PAL.ivory,{w:4.5,pat:Pat.get('dots2',TINT.paleGold,null,16)});return g}

/* ===== The five "true wealth" symbols (drawn about 0,0 at roughly 120 units) and their small Kalash motifs ===== */
const SYMBOLS={
  family:{label:'Love & family',draw(p){const g=grp(p);shape(g,heartD(46),PAL.verm,{w:5,pat:Pat.get('dots',mix(PAL.verm,PAL.pink,.5),null,10)});
      [[-16,-6,11,PAL.ivory],[16,-6,11,PAL.ivory],[0,10,8,PAL.gold]].forEach(([x,y,r,c])=>{dot(g,x,y-r,r*.7,c,{stroke:PAL.ink,w:2.5});shape(g,`M${x-r} ${y+r*1.4}Q${x} ${y-r*.2} ${x+r} ${y+r*1.4}Z`,c,{w:2.5,dbl:false})});return g},
    motif(p){const g=grp(p);shape(g,heartD(15),PAL.verm,{w:3,dbl:false});return g}},
  health:{label:'Good health',draw(p){const g=grp(p);line(g,'M0 48Q-4 0 4 -48',{w:6,c:PAL.ink});line(g,'M0 48Q-4 0 4 -48',{w:3,c:PAL.terra});
      [[-1,-30],[1,-18],[-1,-2],[1,12],[-1,26]].forEach(([s,y])=>{const lg=grp(g,{transform:`translate(${s>0?3:-1} ${y}) rotate(${s>0?-28:-152})`});
        shape(lg,'M0 0C10 -10 30 -10 42 0C30 10 10 10 0 0Z',PAL.leaf,{w:3});line(lg,'M2 0H38',{w:1.6,c:PAL.ivory})});
      shape(g,blob(4,-52,9,9,2,0,10),PAL.pink,{w:3});return g},
    motif(p){const g=grp(p);shape(g,'M-14 6C-6 -10 8 -14 16 -12C12 -2 2 10 -14 6Z',PAL.leaf,{w:3,dbl:false});line(g,'M-12 5L12 -10',{w:1.6,c:PAL.ivory});return g}},
  kindness:{label:'Kindness',draw(p){const g=grp(p);
      [-1,1].forEach(s=>shape(g,`M${s*6} 34C${s*30} 34 ${s*50} 18 ${s*54} -2C${s*44} -4 ${s*36} 6 ${s*30} 12C${s*28} 4 ${s*24} -2 ${s*18} 0C${s*12} 8 ${s*8} 22 ${s*6} 34Z`,SK.light,{w:3.5}));
      const fl=grp(g,{transform:'translate(0 -10)'});for(let i=0;i<6;i++)shape(grp(fl,{transform:`rotate(${i*60})`}),petalD(26,.5),i%2?PAL.pink:TINT.blush,{w:3});dot(fl,0,0,7,PAL.gold,{stroke:PAL.ink,w:2.5});
      line(g,'M0 4V30',{w:4,c:PAL.leaf});return g},
    motif(p){const g=grp(p);[-9,9].forEach(x=>{const f=grp(g,{transform:`translate(${x} 0)`});for(let i=0;i<5;i++)el('circle',{cx:f1(Math.cos(i*TAU/5)*5),cy:f1(Math.sin(i*TAU/5)*5),r:4,fill:PAL.pink,stroke:PAL.ink,'stroke-width':1.4},f);dot(f,0,0,2.5,PAL.gold)});line(g,'M-4 0H4',{w:2.4,c:PAL.leaf});return g}},
  wisdom:{label:'Wisdom',draw(p){const g=grp(p);
      [-1,1].forEach(s=>{shape(g,`M0 -26C${s*18} -36 ${s*40} -34 ${s*54} -26L${s*54} 30C${s*40} 22 ${s*18} 22 0 32Z`,PAL.ivory,{w:4});
        for(let i=0;i<4;i++)line(g,`M${s*10} ${-16+i*11}Q${s*28} ${-22+i*11} ${s*46} ${-16+i*11}`,{w:2,c:i===0?PAL.verm:PAL.ocean})});
      shape(g,'M-58 34C-36 26 -14 28 0 38C14 28 36 26 58 34L58 42C36 34 14 36 0 46C-14 36 -36 34 -58 42Z',PAL.verm,{w:3.5});
      shape(g,'M0 -40C8 -50 8 -58 0 -68C-8 -58 -8 -50 0 -40Z',PAL.gold,{w:3,dbl:false});return g},
    motif(p){const g=grp(p);for(let i=0;i<8;i++)el('path',{d:petalD(13,.45),fill:i%2?PAL.turq:PAL.pink,stroke:PAL.ink,'stroke-width':1.4,transform:`rotate(${i*45})`},g);dot(g,0,0,4,PAL.gold,{stroke:PAL.ink,w:1.4});return g}},
  gold:{label:'Gold & jewels',draw(p){const g=grp(p);
      [[-26,28],[0,30],[26,28],[-13,8],[13,8],[0,-12]].forEach(([x,y],i)=>{el('ellipse',{cx:x,cy:y+5,rx:22,ry:9,fill:mix(PAL.gold,PAL.terra,.35),stroke:PAL.ink,'stroke-width':3},g);el('ellipse',{cx:x,cy:y,rx:22,ry:9,fill:PAL.gold,stroke:PAL.ink,'stroke-width':3},g);el('ellipse',{cx:x,cy:y,rx:12,ry:4.5,fill:'none',stroke:PAL.verm,'stroke-width':2},g)});
      shape(g,'M0 -60L16 -44L0 -26L-16 -44Z',PAL.turq,{w:3.5});line(g,'M-16 -44H16M0 -60V-26',{w:1.6,c:PAL.ivory});return g},
    motif(p){const g=grp(p);[[-8,4],[8,4],[0,-8]].forEach(([x,y])=>{el('circle',{cx:x,cy:y,r:7,fill:PAL.gold,stroke:PAL.ink,'stroke-width':1.8},g);el('circle',{cx:x,cy:y,r:3,fill:'none',stroke:PAL.verm,'stroke-width':1.4},g)});return g}}};
const SYMBOL_ORDER=['family','health','kindness','wisdom','gold'];

/* Tap target: a generous invisible hit circle, a focus ring and a turning dashed halo the director pulses */
function hitArea(p,R,key,label,cx,cy,r){const g=grp(p,{'data-hit':key,tabindex:0,role:'button','aria-label':label});
  const halo=grp(g,{transform:`translate(${cx} ${cy})`,opacity:0,'pointer-events':'none'});
  el('circle',{r:r*.92,fill:'none',stroke:PAL.gold,'stroke-width':12,opacity:.55},halo);
  el('circle',{r:r*.92,fill:'none',stroke:PAL.ink,'stroke-width':3,'stroke-dasharray':'14 12'},halo);
  el('circle',{cx,cy,r,fill:'#000','fill-opacity':0},g);el('circle',{cx,cy,r:r*1.02,class:'focusring'},g);
  (R.hits=R.hits||{})[key]={g,halo,cx,cy,r};return g}
