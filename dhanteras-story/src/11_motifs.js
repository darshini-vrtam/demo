/* ===== Shared motifs: ocean, sky, fish, shells, lotus, light, diya, frame, medallion ===== */
function clipIn(parent,d){const id=uid('c');const c=el('clipPath',{id},parent);el('path',{d},c);return`url(#${id})`}

/* ---- sky: stars, patterned clouds, faint golden horizon ---- */
function cloudD(w){const h=w*.34;return`M${-w/2} ${h*.3}C${-w*.52} ${-h*.1} ${-w*.36} ${-h*.3} ${-w*.24} ${-h*.12}C${-w*.2} ${-h*.62} ${w*.12} ${-h*.72} ${w*.14} ${-h*.24}C${w*.26} ${-h*.46} ${w*.5} ${-h*.3} ${w*.44} ${h*.02}C${w*.54} ${h*.1} ${w*.52} ${h*.3} ${w*.42} ${h*.3}Z`}
function cloud(parent,w,col){const g=grp(parent);shp(g,cloudD(w),col||P.ivory,3.5);const h=w*.34;
  for(let k=0;k<3;k++)ln(g,`M${-w*.34} ${h*(.18-k*.18)}Q0 ${h*(.34-k*.18)} ${w*.34} ${h*(.18-k*.18)}`,P.sea,2.2);return g}
function sky(parent,W,H,o){o=o||{};const g=grp(parent);el('rect',{x:-4,y:-4,width:W+8,height:H+8,fill:Pat.u('stars',o.star||P.ivory,o.bg||P.midnight,o.ss||1)},g);
  const r=rng(o.seed||3),stars=[];for(let i=0;i<(o.n||10);i++){const x=r()*W,y=r()*H*.85;const s=grp(g);star4(s,0,0,7+r()*5,i%3?P.ivory:P.turmeric);tf(s,x,y,1);stars.push({g:s,x,y,ph:r()*TAU})}
  const clouds=[];(o.clouds||[]).forEach(([u,v,w])=>{const c=cloud(g,w,o.cloud);clouds.push({g:c,x:u*W,y:v*H,ph:r()*TAU});tf(c,u*W,v*H,1)});
  return{g,stars,clouds,update(t){const m=MV();clouds.forEach(c=>tf(c.g,c.x+Math.sin(t*.05+c.ph)*40*m,c.y,1));
    stars.forEach((s,i)=>{const k=.75+.25*Math.sin(t*.9+s.ph)*m;tf(s.g,s.x,s.y,k)})}}}
function star4(parent,x,y,r,col){return shp(parent,`M${x} ${y-r}L${x+r*.24} ${y-r*.24}L${x+r} ${y}L${x+r*.24} ${y+r*.24}L${x} ${y+r}L${x-r*.24} ${y+r*.24}L${x-r} ${y}L${x-r*.24} ${y-r*.24}Z`,col,1.6)}
function horizonBand(parent,W,y,col){const g=grp(parent);el('rect',{x:-4,y:y-7,width:W+8,height:10,fill:col||P.gold},g);ln(g,`M-4 ${y-7}H${W+4}`,K,2.4);
  const d=[];for(let x=8;x<W;x+=22)d.push(`M${x} ${y-2}h.1`);ln(g,d.join(''),P.turmeric,4.2);return g}

/* ---- ocean: bands of scalloped waves, smaller towards the horizon, each drifting on its own ---- */
const SEA={wonder:[[P.foam,P.indigo],[P.foam,P.sea],[P.turq,P.indigo],[P.foam,P.turq],[P.foam,P.indigo],[P.ivory,P.sea]],
  team:[[P.foam,P.sea],[P.turq,P.indigo],[P.foam,P.turq],[P.ivory,P.indigo],[P.foam,P.sea],[P.turq,P.indigo]],
  energy:[[P.foam,P.turq],[P.turmeric,P.indigo],[P.foam,P.sea],[P.turq,P.indigo],[P.foam,P.turq],[P.ivory,P.indigo]],
  poison:[[P.mauve,P.indigo],[P.foam,P.violet],[P.mauve,P.midnight],[P.ivory,P.violet],[P.mauve,P.indigo]],
  divine:[[P.turmeric,P.indigo],[P.foam,P.turq],[P.gold,P.indigo],[P.foam,P.sea],[P.turmeric,P.indigo],[P.foam,P.turq]],
  sleep:[[P.sea,P.indigo],[P.turq,P.midnight],[P.sea,P.indigo],[P.turq,P.midnight],[P.sea,P.indigo],[P.turq,P.midnight]]};
function ocean(parent,W,y0,y1,o){o=o||{};const g=grp(parent);const pal=SEA[o.mood||'wonder'];const n=o.n||5;const dens=o.dens||1;
  const bands=[];let y=y0;const tot=y1-y0;const ws=[];let sum=0;for(let i=0;i<n;i++){const w=1+i*.45;ws.push(w);sum+=w}
  for(let i=0;i<n;i++){const h=tot*ws[i]/sum;const s=(.78+i*.36)*dens*(o.scale||1);const per=48*s;const top=y,bot=y1+20;
    let d=`M${-per*3} ${bot}L${-per*3} ${top}`;for(let x=-per*3;x<W+per*3;x+=per)d+=`Q${f1(x+per/2)} ${f1(top-per*.36)} ${f1(x+per)} ${f1(top)}`;d+=`L${f1(W+per*3)} ${bot}Z`;
    const bg=grp(g);const c=pal[i%pal.length];shp(bg,d,Pat.u('wave',c[0],c[1],s),3.2);bands.push({g:bg,per,sp:(i%2?-1:1)*(6+i*4),y:top,h});y+=h}
  return{g,bands,k:1,swell:0,ph:0,update(t,dt){const m=MV()*this.k;this.ph+=(dt||.016)*m;bands.forEach((b,i)=>{const ox=((this.ph*b.sp)%b.per+b.per)%b.per;tf(b.g,ox-b.per,Math.sin(t*.5+i)*2.5*m-this.swell*(10+i*4)*(.6+.4*Math.sin(t*1.3+i*.7)),1)})}}}

/* ---- fish, shells, bubbles, glimmers, jewels ---- */
const FISHC=[[P.verm,P.turmeric],[P.turmeric,P.verm],[P.coral,P.ivory],[P.pink,P.turmeric],[P.ochre,P.ivory]];
function fish(parent,v){const c=FISHC[(v||0)%FISHC.length];const g=grp(parent);const tail=grp(g);
  shp(tail,'M-22 0L-48 -18Q-40 0 -48 18Z',c[0],3.2);ln(tail,'M-44 -10L-30 -2M-44 10L-30 2',K,1.6);
  shp(g,'M42 0Q12 -30 -26 0Q12 30 42 0Z',Pat.u('fish',c[1],c[0],.7),3.6);shp(g,'M4 -20Q-4 -36 -16 -28L-8 -16Z',c[0],2.8);
  circ(g,24,-4,8,P.ivory,2.6);circ(g,26,-4,3.8,K,0);ln(g,'M12 -14Q16 -2 12 12',K,2.4);ln(g,'M34 6Q38 9 41 6',K,2);return{g,tail}}
function shell(parent,col){const g=grp(parent);let d='M0 30';for(let i=0;i<=8;i++){const a=Math.PI+i/8*Math.PI,ax=Math.cos(a)*50,ay=Math.sin(a)*46+6;
    if(i===0)d+=`L${f1(ax)} ${f1(ay)}`;else{const pa=Math.PI+(i-.5)/8*Math.PI;d+=`Q${f1(Math.cos(pa)*60)} ${f1(Math.sin(pa)*56+6)} ${f1(ax)} ${f1(ay)}`}}d+='Z';
  shp(g,d,col||P.ivory,3.6);let r='';for(let i=1;i<8;i++){const a=Math.PI+i/8*Math.PI;r+=`M0 30L${f1(Math.cos(a)*54)} ${f1(Math.sin(a)*50+6)}`}ln(g,r,P.sea,2.6);
  for(let i=0;i<8;i++){const a=Math.PI+(i+.5)/8*Math.PI;circ(g,Math.cos(a)*34,Math.sin(a)*30+6,2.6,P.verm,0)}
  shp(g,'M-14 24L14 24L8 38L-8 38Z',P.turmeric,3);return g}
function bubble(parent,r,col){const g=grp(parent);circ(g,0,0,r,col||P.foam,2.2,{'fill-opacity':1});ln(g,`M${-r*.45} ${-r*.1}A${r*.5} ${r*.5} 0 0 1 ${-r*.05} ${-r*.5}`,P.sea,1.6);return g}
function jewel(parent,col){const g=grp(parent);shp(g,'M0 -22L18 -6L0 22L-18 -6Z',col||P.verm,3);ln(g,'M-18 -6H18M0 -22L-7 -6L0 22L7 -6Z',K,1.6);shp(g,'M-24 -6L-18 -6L0 -22L-4 -26Z',P.gold,2.2);return g}

/* a breaking foam crest: used in front of things half-hidden in the water */
function crest(parent,w,col,n){const g=grp(parent);n=n||3;const u=w/n;let d=`M${-w/2} 8`;for(let i=0;i<n;i++){const x=-w/2+i*u;d+=`C${f1(x+u*.1)} ${f1(-u*.55)} ${f1(x+u*.9)} ${f1(-u*.55)} ${f1(x+u)} 8`}d+=`Q0 ${f1(u*.3)} ${-w/2} 8Z`;
  shp(g,d,col||P.foam,3.2);let c='';for(let i=0;i<n;i++){const x=-w/2+i*u+u/2;c+=`M${f1(x-u*.28)} 4Q${f1(x)} ${f1(-u*.42)} ${f1(x+u*.26)} 2Q${f1(x+u*.1)} ${f1(-u*.12)} ${f1(x-u*.02)} 0`}ln(g,c,P.sea,2.4);return g}
/* ---- lotus: a fan of petals that opens with o.open (0 bud .. 1 open) ---- */
function lotus(parent,o){o=o||{};const r=o.r||60,N=o.n||7,g=grp(parent);const col=o.col||P.pink,col2=o.col2||P.ivory;
  if(o.pad!==false){shp(g,`M${-r*1.2} ${r*.16}Q0 ${r*.5} ${r*1.2} ${r*.16}Q0 ${-r*.12} ${-r*1.2} ${r*.16}Z`,Pat.u('hatch',K,P.leaf,.8),3.4)}
  const back=grp(g),front=grp(g);const pet=[];const pd=`M0 0C${-r*.36} ${-r*.36} ${-r*.3} ${-r*.86} 0 ${-r}C${r*.3} ${-r*.86} ${r*.36} ${-r*.36} 0 0Z`;
  const order=[];for(let i=0;i<N;i++)order.push(i);order.sort((a,b)=>Math.abs(b-(N-1)/2)-Math.abs(a-(N-1)/2));
  order.forEach(i=>{const pg=grp(Math.abs(i-(N-1)/2)>(N-1)/4?back:front);const odd=Math.abs(i-(N-1)/2)%2>.5;shp(pg,pd,odd?col2:col,3.2);
    ln(pg,`M0 ${-r*.12}V${-r*.8}`,K,1.6);ln(pg,`M${-r*.1} ${-r*.2}Q${-r*.14} ${-r*.5} 0 ${-r*.78}`,odd?col:col2,1.6);pet.push({g:pg,i})});
  const cen=grp(g);circ(cen,0,-r*.22,r*.13,P.turmeric,2.6);for(let i=-2;i<=2;i++)circ(cen,i*r*.07,-r*.38,r*.03,P.turmeric,1.2);
  const L={g,pet,cen,open:o.open||0,r,N,set(k,stag){this.open=k;pet.forEach(p=>{const c=p.i-(N-1)/2;const ord=Math.abs(c)/Math.max(1,(N-1)/2);const kk=stag?clamp((k-(1-ord)*.6)/.4,0,1):k;const a=c*(4+18*kk);const s=.82+.18*kk;tf(p.g,0,0,1,a,s,1-(1-kk)*.08*Math.abs(c))});op(cen,clamp(k*2-.6,0,1))}};
  L.set(L.open);return L}

/* ---- light: concentric rings, rays, halos (flat folk-art light, never realistic) ---- */
function rings(parent,r,o){o=o||{};const g=grp(parent);const n=o.n||3;for(let i=0;i<n;i++){const rr=r*(1-i*(o.step||.22));
    circ(g,0,0,rr,'none',o.w||4,{stroke:i%2?(o.c2||P.ivory):(o.c1||P.turmeric)});if(o.dots){const m=Math.round(rr*TAU/(o.dots));const d=[];
      for(let j=0;j<m;j++){const a=j/m*TAU;d.push(`M${f1(Math.cos(a)*(rr+(o.w||4)*1.8))} ${f1(Math.sin(a)*(rr+(o.w||4)*1.8))}h.1`)}ln(g,d.join(''),i%2?(o.c1||P.turmeric):(o.c2||P.ivory),5)}}
  return g}
function rays(parent,r0,r1,n,col,w){const g=grp(parent);let d='';for(let i=0;i<n;i++){const a=i/n*TAU;d+=`M${f1(Math.cos(a)*r0)} ${f1(Math.sin(a)*r0)}L${f1(Math.cos(a)*r1)} ${f1(Math.sin(a)*r1)}`}
  ln(g,d,K,(w||5)+4);ln(g,d,col||P.turmeric,w||5);return g}
/* patterned halo: a turmeric band with dots and petal rim */
function halo(parent,r,o){o=o||{};const g=grp(parent);const bw=o.bw||r*.12;
  shp(g,`${ellD(0,0,r,r)}${ellD(0,0,r-bw,r-bw)}`,o.col||P.turmeric,3.5,{'fill-rule':'evenodd'});
  const n=Math.max(12,Math.round(r*TAU/(bw*1.1)));const d=[],e=[];for(let i=0;i<n;i++){const a=i/n*TAU;d.push(`M${f1(Math.cos(a)*(r-bw/2))} ${f1(Math.sin(a)*(r-bw/2))}h.1`);
    const a2=(i+.5)/n*TAU;e.push(`M${f1(Math.cos(a2)*r)} ${f1(Math.sin(a2)*r)}L${f1(Math.cos(a2)*(r+bw*.55))} ${f1(Math.sin(a2)*(r+bw*.55))}`)}
  ln(g,d.join(''),o.dot||P.verm,bw*.34);ln(g,e.join(''),K,4.5);ln(g,e.join(''),o.col||P.turmeric,2.4);return g}

/* ---- the soft breathing ring that marks every interactive object ---- */
function target(parent,r){const g=grp(parent);const a=grp(g);circ(a,0,0,r,'none',8,{stroke:K});circ(a,0,0,r,'none',4,{stroke:P.ivory});
  const n=Math.max(10,Math.round(r/7)),d=[];for(let i=0;i<n;i++){const t=i/n*TAU;d.push(`M${f1(Math.cos(t)*(r+11))} ${f1(Math.sin(t)*(r+11))}h.1`)}ln(a,d.join(''),P.turmeric,7);
  return{g,a,on:0,r,x:0,y:0,update(t){op(this.g,this.on);if(this.on>0)tf(this.g,this.x,this.y,1+.06*Math.sin(t*TAU/2.2)*MV());}}}
/* the demonstration hand: shows the gesture, never relies on text */
function handIcon(parent){const g=grp(parent);const h=grp(g);
  shp(h,'M-7 -2Q-7 -9 0 -9Q7 -9 7 -2V26H-7Z',P.ivory,3);shp(h,'M-20 30Q-20 22 -12 22H12Q20 22 20 30V54Q20 66 8 66H-8Q-20 66 -20 54Z',P.ivory,3);
  shp(h,'M-20 32Q-30 34 -26 46L-18 52',P.ivory,3);el('rect',{x:-18,y:62,width:36,height:9,fill:P.verm,stroke:K,'stroke-width':2.4},h);
  return{g,h,on:0,x:0,y:0,press:0,update(){op(this.g,this.on);if(this.on>0)tf(this.g,this.x,this.y,1,-18);tf(this.h,0,this.press*5,1)}}}

/* ---- diya: flat bowl, turmeric teardrop flame with an ivory inner drop, black outline ---- */
function diya(parent,o){o=o||{};const g=grp(parent);const glow=grp(g);rings(glow,52,{n:3,step:.26,w:3.5,c1:P.turmeric,c2:P.gold});
  const fl=grp(g);shp(fl,'M0 -66C-15 -46 -14 -32 0 -26C14 -32 15 -46 0 -66Z',P.turmeric,3.2);shp(fl,'M0 -54C-6 -44 -6 -36 0 -33C6 -36 6 -44 0 -54Z',P.ivory,2);
  ln(g,'M0 -26V-18',K,3);shp(g,'M-42 -18Q-38 10 0 12Q38 10 42 -18Q30 -10 0 -10Q-30 -10 -42 -18Z',o.col||P.terra,3.6);
  ln(g,'M-34 -8Q0 6 34 -8',P.turmeric,3);const d=[];for(let x=-26;x<=26;x+=9)d.push(`M${x} ${f1(0.5+Math.abs(x)*-.12)}h.1`);ln(g,d.join(''),P.ivory,4);
  shp(g,'M42 -18Q52 -22 54 -16Q50 -12 42 -14',o.col||P.terra,3);
  const D={g,fl,glow,lit:o.lit||0,x:0,y:0,s:1,ph:Math.random()*TAU,update(t){tf(this.g,this.x,this.y,this.s);const k=this.lit;
    tf(this.fl,0,-18,0,0);if(k>0){const sw=Math.sin(t*TAU/2.6+this.ph)*3*MV();this.fl.setAttribute('transform',`translate(0 -18) scale(${f3(k)}) translate(0 18) rotate(${f1(sw)} 0 -26)`)}else this.fl.setAttribute('transform','scale(0)');
    op(this.glow,k);if(k>0)tf(this.glow,0,-40,.8+.2*k)}};return D}

/* ---- frame: a patterned border around the painted area; it never crops figures ---- */
const FRAMES={vine:[P.leaf,P.ivory,'vine',.62],fish:[P.sea,P.ivory,'fish',.7],scallop:[P.sea,P.ivory,'wave',.55],gold:[P.verm,P.turmeric,'petals',.7],violet:[P.mauve,P.ivory,'wave',.55]};
function border(parent,W,H,kind){const g=grp(parent);const b=BORDER,f=FRAMES[kind||'vine'];
  shp(g,`M0 0H${W}V${H}H0Z M${b} ${b}V${H-b}H${W-b}V${b}Z`,Pat.u(f[2],f[0],f[1],f[3]),0,{'fill-rule':'evenodd'});
  el('rect',{x:2,y:2,width:W-4,height:H-4,fill:'none',stroke:K,'stroke-width':3},g);el('rect',{x:b-2,y:b-2,width:W-2*b+4,height:H-2*b+4,fill:'none',stroke:K,'stroke-width':3},g);
  [[0,0],[W-b,0],[W-b,H-b],[0,H-b]].forEach(([x,y])=>{el('rect',{x:x+3,y:y+3,width:b-6,height:b-6,fill:P.turmeric,stroke:K,'stroke-width':2.2},g);circ(g,x+b/2,y+b/2,4.5,P.verm,1.6)});
  return g}

/* ---- medallion: a circular patterned frame with its own clipped picture inside ---- */
function medallion(parent,r,o){o=o||{};const g=grp(parent);const inner=r*.84;
  circ(g,0,0,r,Pat.u('petals',o.ring||P.turmeric,o.ringBg||P.verm,.7),4);circ(g,0,0,inner,o.bg||P.indigo,4);
  const clip=clipIn(g,ellD(0,0,inner-2,inner-2));const pic=grp(g,{'clip-path':clip});const over=grp(g);circ(over,0,0,inner,'none',4);
  return{g,pic,r,inner,over}}

/* ---- botanicals: leaf, herb sprig, marigold ---- */
function leafD(len,wid){return`M0 0Q${len*.5} ${-wid} ${len} 0Q${len*.5} ${wid} 0 0Z`}
function leaf(parent,len,wid,col,rot,x,y){const g=grp(parent,{transform:`translate(${f1(x||0)} ${f1(y||0)}) rotate(${f1(rot||0)})`});shp(g,leafD(len,wid),col||P.leaf,2.6);ln(g,`M${len*.1} 0H${len*.85}`,K,1.4);return g}
function sprig(parent,s,col){const g=grp(parent);ln(g,'M0 0C-4 -30 4 -60 0 -92',K,7);ln(g,'M0 0C-4 -30 4 -60 0 -92',P.leaf,3.5);
  [[-20,-14],[-44,16],[-66,-12],[-86,14]].forEach(([y,a],i)=>leaf(g,30,9,col||P.leaf,-90+a*3.2,0,y));leaf(g,26,8,col||P.leaf,-90,0,-92);if(s)g.setAttribute('transform',`scale(${s})`);return g}
function marigold(parent,r,col){const g=grp(parent);const n=12;for(let i=0;i<n;i++){const a=i/n*360;const p=grp(g,{transform:`rotate(${a})`});shp(p,`M0 0Q${r*.3} ${-r*.5} 0 ${-r}Q${-r*.3} ${-r*.5} 0 0Z`,col||P.turmeric,1.8)}
  circ(g,0,0,r*.42,P.ochre,2);circ(g,0,0,r*.16,P.verm,0);return g}
