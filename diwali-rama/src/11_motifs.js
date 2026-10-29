/* ===== Shared motifs: sky, sun, clouds, water, trees, animals, architecture, light, frames ===== */
function clipIn(parent,d){const id=uid('c');const c=el('clipPath',{id},parent);el('path',{d},c);return`url(#${id})`}
function star4(parent,x,y,r,col){return shp(parent,`M${x} ${y-r}L${x+r*.24} ${y-r*.24}L${x+r} ${y}L${x+r*.24} ${y+r*.24}L${x} ${y+r}L${x-r*.24} ${y+r*.24}L${x-r} ${y}L${x-r*.24} ${y-r*.24}Z`,col,1.6)}
function rays(parent,r0,r1,n,col,w){const g=grp(parent);let d='';for(let i=0;i<n;i++){const a=i/n*TAU;d+=`M${f1(Math.cos(a)*r0)} ${f1(Math.sin(a)*r0)}L${f1(Math.cos(a)*r1)} ${f1(Math.sin(a)*r1)}`}
  ln(g,d,K,(w||5)+4);ln(g,d,col||P.turmeric,w||5);return g}
/* flat light: concentric outlined rings, never a gradient */
function rings(parent,r,o){o=o||{};const g=grp(parent);const n=o.n||3;for(let i=0;i<n;i++){const rr=r*(1-i*(o.step||.22));
    circ(g,0,0,rr,'none',o.w||4,{stroke:i%2?(o.c2||P.ivory):(o.c1||P.turmeric)});if(o.dots){const m=Math.max(8,Math.round(rr*TAU/o.dots));const d=[];
      for(let j=0;j<m;j++){const a=j/m*TAU;d.push(`M${f1(Math.cos(a)*(rr+(o.w||4)*1.8))} ${f1(Math.sin(a)*(rr+(o.w||4)*1.8))}h.1`)}ln(g,d.join(''),i%2?(o.c1||P.turmeric):(o.c2||P.ivory),5)}}
  return g}
/* patterned halo: a band with dots and a petal rim */
function halo(parent,r,o){o=o||{};const g=grp(parent);const bw=o.bw||r*.12;
  shp(g,`${ellD(0,0,r,r)}${ellD(0,0,r-bw,r-bw)}`,o.col||P.turmeric,3.5,{'fill-rule':'evenodd'});
  const n=Math.max(12,Math.round(r*TAU/(bw*1.1)));const d=[],e=[];for(let i=0;i<n;i++){const a=i/n*TAU;d.push(`M${f1(Math.cos(a)*(r-bw/2))} ${f1(Math.sin(a)*(r-bw/2))}h.1`);
    const a2=(i+.5)/n*TAU;e.push(`M${f1(Math.cos(a2)*r)} ${f1(Math.sin(a2)*r)}L${f1(Math.cos(a2)*(r+bw*.55))} ${f1(Math.sin(a2)*(r+bw*.55))}`)}
  ln(g,d.join(''),o.dot||P.verm,bw*.34);ln(g,e.join(''),K,4.5);ln(g,e.join(''),o.col||P.turmeric,2.4);return g}
/* lotus-petal halo: a ring of outlined petals */
function petalRing(parent,r,n,col,col2,len){const g=grp(parent);len=len||r*.32;for(let i=0;i<n;i++){const a=i/n*360;const p=grp(g,{transform:`rotate(${f1(a)}) translate(0 ${f1(-r)})`});
    shp(p,`M0 0C${-len*.4} ${-len*.3} ${-len*.3} ${-len*.8} 0 ${-len}C${len*.3} ${-len*.8} ${len*.4} ${-len*.3} 0 0Z`,i%2?col2:col,2.6);ln(p,`M0 ${-len*.15}V${-len*.75}`,K,1.3)}return g}

/* ---- clouds: flat ivory bodies with curled decorative edges and parallel inner lines ---- */
function spiralD(r,turns){let d='';const n=Math.round(26*turns);for(let i=0;i<=n;i++){const t=i/n;const a=t*turns*TAU-Math.PI/2;const rr=r*(1-t*.9);d+=(i?'L':'M')+f1(Math.cos(a)*rr)+' '+f1(Math.sin(a)*rr)}return d}
const PUFFS=[[-.36,.06,.16],[.4,.07,.14],[-.17,-.06,.21],[.22,-.04,.2],[.03,-.13,.24],[-.08,.1,.17],[.14,.11,.16]];
function cloud(parent,w,col,line){const g=grp(parent);PUFFS.forEach(([x,y,r])=>circ(g,x*w,y*w,r*w+3,K,0));
  PUFFS.forEach(([x,y,r])=>{const p=grp(g,{transform:`translate(${f1(x*w)} ${f1(y*w)})`});circ(p,0,0,r*w,col||P.ivory,3.2);ln(p,spiralD(r*w*.78,2.4),line||P.ocean,Math.max(2.4,w*.011))});return g}

/* ---- skies: every sky is patterned (dots by day, stars at dusk and night) ---- */
const SKY={day:{bg:P.sky,dot:P.ivory,pat:'dots',ps:1.3,cloud:P.ivory,line:P.sky},gold:{bg:P.sky,dot:P.ivory,pat:'fdots',ps:1.2,cloud:P.ivory,line:P.sky},
  forest:{bg:P.sky,dot:P.ivory,pat:'dots',ps:1.3,cloud:P.ivory,line:P.sky},shadow:{bg:P.ocean,dot:P.ivory,pat:'dots',ps:1.3,cloud:P.sky,line:K},
  ocean:{bg:P.sky,dot:P.ivory,pat:'dots',ps:1.4,cloud:P.ivory,line:P.sky},lanka:{bg:P.navy,dot:P.gold,pat:'stars',ps:1,cloud:P.sky,line:K},
  dusk:{bg:P.ocean,dot:P.ivory,pat:'stars',ps:1,cloud:P.sky,line:K},night:{bg:P.navy,dot:P.ivory,pat:'stars',ps:1,cloud:P.sky,line:K},
  warm:{bg:P.sky,dot:P.ivory,pat:'fdots',ps:1.2,cloud:P.ivory,line:P.sky},blue:{bg:P.sky,dot:P.ivory,pat:'dots',ps:1.3,cloud:P.ivory,line:P.sky},
  swirl:{bg:P.sky,dot:P.ivory,pat:'curl',ps:1.1,cloud:P.ivory,line:P.sky},ivory:{bg:P.ivory,dot:P.turmeric,pat:'fdots',ps:1.2,cloud:P.ivory,line:P.sky}};
function sky(parent,W,H,o){o=o||{};const S=SKY[o.kind||'day'];const g=grp(parent);el('rect',{x:-4,y:-4,width:W+8,height:H+8,fill:Pat.u(S.pat,S.dot,S.bg,S.ps)},g);
  const r=rng(o.seed||3),stars=[];const night=/dusk|night|lanka/.test(o.kind||'');for(let i=0;i<(o.stars==null?(night?12:0):o.stars);i++){const x=r()*W,y=r()*H*.8;const s=grp(g);star4(s,0,0,7+r()*6,i%3?P.ivory:P.turmeric);tf(s,x,y,1);stars.push({g:s,x,y,ph:r()*TAU})}
  const clouds=[];(o.clouds||[]).forEach(([u,v,w])=>{const c=cloud(g,w,S.cloud,S.line);clouds.push({g:c,x:u*W,y:v*H,ph:r()*TAU});tf(c,u*W,v*H,1)});
  return{g,stars,clouds,drift:0,update(t){const m=MV();clouds.forEach(c=>tf(c.g,c.x+Math.sin(t*.05+c.ph)*40*m+this.drift,c.y,1));
    stars.forEach(s=>{const k=.75+.25*Math.sin(t*.9+s.ph)*m;tf(s.g,s.x,s.y,k)})}}}
/* the patterned sun with a friendly face: hatched triangular rays, red petals between them, an orange outer band */
function sun(parent,r){const g=grp(parent);const ry=grp(g);const k=r/100;
  shp(ry,`${ellD(0,0,r*1.72,r*1.72)}${ellD(0,0,r*1.52,r*1.52)}`,P.marigold,3.5,{'fill-rule':'evenodd'});dots(ry,ellD(0,0,r*1.62,r*1.62),P.verm,r*.07,r*.16);
  for(let i=0;i<12;i++){const a=i/12*360;const t=grp(ry,{transform:`rotate(${a})`});shp(t,`M${-r*.26} ${-r*.97}L0 ${-r*1.52}L${r*.26} ${-r*.97}Z`,Pat.u('hatch',K,P.ivory,.55),3);
    const p=grp(ry,{transform:`rotate(${a+15})`});shp(p,`M0 ${-r*.98}C${-r*.16} ${-r*1.08} ${-r*.12} ${-r*1.36} 0 ${-r*1.4}C${r*.12} ${-r*1.36} ${r*.16} ${-r*1.08} 0 ${-r*.98}Z`,P.verm,2.6)}
  circ(g,0,0,r,P.turmeric,4.5);dots(g,ellD(0,0,r*.9,r*.9),P.marigold,r*.05,r*.12);
  const f=grp(g,{transform:`scale(${f3(k)})`});
  /* tilak, brows, lids with hatched lashes, eyes */
  shp(f,'M-9 -74L-6 -42Q0 -36 6 -42L9 -74L4 -74L2 -46Q0 -43 -2 -46L-4 -74Z',P.verm,1.6);circ(f,0,-32,6,P.verm,1.6);
  [-1,1].forEach(sx=>{const e=grp(f,{transform:`translate(${sx*38} -6)`});ln(e,'M-28 -24Q0 -40 28 -24',K,3);shp(e,'M-27 -2Q0 -30 27 -2Q0 -16 -27 -2Z',Pat.u('vlines',K,P.gold,.5),2.4);
    shp(e,'M-26 0Q0 -18 26 0Q0 14 -26 0Z',P.ivory,3);circ(e,sx*2,-1,9,K,0);circ(e,sx*2-3,-4,2.6,P.ivory,0)});
  ln(f,'M-3 -14V14Q0 20 7 16',K,3);
  shp(f,'M0 30C-14 23 -34 25 -46 36C-53 43 -48 53 -39 48C-34 40 -22 37 -10 40C-4 40 0 36 0 36C0 36 4 40 10 40C22 37 34 40 39 48C48 53 53 43 46 36C34 25 14 23 0 30Z',K,0);
  shp(f,'M-13 47Q0 40 13 47Q0 58 -13 47Z',P.verm,2);
  return{g,ry,update(t){tf(ry,0,0,1,t*3*MV())}}}

/* ---- water life ---- */
function fish(parent,c1,c2){const g=grp(parent);const tail=grp(g);
  shp(tail,'M-30 0L-48 -14L-44 0L-48 14Z',c2||P.turmeric,2.6);shp(g,'M-32 0C-18 -20 16 -20 30 0C16 20 -18 20 -32 0Z',c1||P.verm,3);
  ln(g,'M-10 -13V13M-2 -15V15',K,1.8);dots(g,'M6 -8L20 -3M6 8L20 3',P.ivory,3,6);circ(g,18,-3,3.4,P.ivory,1.8);circ(g,18.6,-3,1.5,K,0);return{g,tail}}
function turtle(parent){const g=grp(parent);[[-26,-14],[26,-14],[-26,14],[26,14]].forEach(([x,y])=>ell(g,x,y,12,7,P.leaf,2.4));
  ell(g,40,0,12,9,P.leaf,2.6);circ(g,44,-2,2,K,0);ell(g,0,0,34,24,Pat.u('grid',K,P.turmeric,.8),3.4);ell(g,0,0,22,15,'none',2,{stroke:K});return g}
function lotusPad(parent,r){const g=grp(parent);shp(g,`M0 0L${r} ${-r*.08}A${r} ${r*.42} 0 1 1 ${r*.96} ${r*.18}Z`,Pat.u('hatch',K,P.leaf,.8),3.2);return g}
/* lotus: a fan of petals that opens with set(k) (0 bud .. 1 open) */
function lotus(parent,o){o=o||{};const r=o.r||60,N=o.n||7,g=grp(parent);const col=o.col||P.verm,col2=o.col2||P.ivory;
  if(o.pad!==false){shp(g,`M${-r*1.2} ${r*.16}Q0 ${r*.5} ${r*1.2} ${r*.16}Q0 ${-r*.12} ${-r*1.2} ${r*.16}Z`,Pat.u('hatch',K,P.leaf,.8),3.4)}
  const back=grp(g),front=grp(g);const pet=[];const pd=`M0 0C${-r*.36} ${-r*.36} ${-r*.3} ${-r*.86} 0 ${-r}C${r*.3} ${-r*.86} ${r*.36} ${-r*.36} 0 0Z`;
  const order=[];for(let i=0;i<N;i++)order.push(i);order.sort((a,b)=>Math.abs(b-(N-1)/2)-Math.abs(a-(N-1)/2));
  order.forEach(i=>{const pg=grp(Math.abs(i-(N-1)/2)>(N-1)/4?back:front);const odd=Math.abs(i-(N-1)/2)%2>.5;shp(pg,pd,odd?col2:col,3.2);
    ln(pg,`M0 ${-r*.12}V${-r*.8}`,K,1.6);ln(pg,`M${-r*.1} ${-r*.2}Q${-r*.14} ${-r*.5} 0 ${-r*.78}`,odd?col:col2,1.6);pet.push({g:pg,i})});
  const cen=grp(g);circ(cen,0,-r*.22,r*.13,P.turmeric,2.6);for(let i=-2;i<=2;i++)circ(cen,i*r*.07,-r*.38,r*.03,P.turmeric,1.2);
  const Lo={g,pet,cen,open:o.open||0,r,N,set(k){this.open=k;pet.forEach(p=>{const c=p.i-(N-1)/2;const ord=Math.abs(c)/Math.max(1,(N-1)/2);const kk=clamp((k-(1-ord)*.5)/.5,0,1);
      const a=c*(3+19*kk);const s=.78+.22*kk;tf(p.g,0,0,1,a,s,1-(1-kk)*.1*Math.abs(c))});op(cen,clamp(k*2-.6,0,1))}};
  Lo.set(Lo.open);return Lo}
/* ocean: bands of scalloped waves, smaller towards the horizon, each drifting; fish, turtles and lotus ride the bands */
const SEA={day:[[P.ivory,P.ocean],[P.ivory,P.peacock],[P.peacock,P.indigo],[P.ivory,P.ocean],[P.ivory,P.indigo],[P.ivory,P.peacock]],
  night:[[P.ivory,P.indigo],[P.peacock,P.ocean],[P.ivory,P.indigo],[P.peacock,P.indigo],[P.ivory,P.ocean],[P.gold,P.indigo]]};
function ocean(parent,W,y0,y1,o){o=o||{};const g=grp(parent);const pal=SEA[o.mood||'day'];const n=o.n||5;const bands=[];const H=y1-y0;
  for(let i=0;i<n;i++){const t0=Math.pow(i/n,1.35),t1=Math.pow((i+1)/n,1.35);const ya=y0+H*t0,yb=y0+H*t1+2;const s=.45+i*.22*(o.scale||1);const c=pal[i%pal.length];
    const b=grp(g);const pat=el('rect',{x:-120,y:f1(ya),width:W+240,height:f1(yb-ya),fill:Pat.u('wave',c[0],c[1],f3(s))},b);ln(b,`M-4 ${f1(ya)}H${W+4}`,K,2.6);bands.push({b,pat,i,ya,yb,s})}
  const life=[];const r=rng(o.seed||9);const dens=o.life==null?1:o.life;
  for(let i=1;i<n;i++){const bd=bands[i];const cnt=Math.round((W/600)*dens*(i>2?1:.6));for(let j=0;j<cnt;j++){const kind=(i+j)%5===0?'turtle':(i+j)%4===0?'lotus':'fish';const e=grp(g);let tail=null;
      if(kind==='fish'){const f=fish(e,[P.verm,P.turmeric,P.terra,P.marigold][j%4],[P.turmeric,P.verm,P.ivory,P.verm][j%4]);tail=f.tail}else if(kind==='turtle')turtle(e);else{lotusPad(e,26);const lo=lotus(e,{r:24,n:5,open:.9,pad:false})}
      life.push({e,tail,kind,x:r()*W,y:lerp(bd.ya,bd.yb,.5),s:bd.s*.9,dir:j%2?1:-1,sp:12+r()*14,ph:r()*TAU})}}
  return{g,bands,life,W,k:1,update(t){const m=MV();bands.forEach(b=>{const dx=((t*(b.i%2?14:-11)*(1+b.i*.25)*m)%(48*b.s)+48*b.s)%(48*b.s);b.pat.setAttribute('x',f1(-120+dx))});
    life.forEach(l=>{if(l.kind==='lotus'){tf(l.e,l.x+Math.sin(t*.3+l.ph)*10*m,l.y+Math.sin(t*.8+l.ph)*3,l.s);return}
      const x=((l.x+t*l.sp*l.dir*m)%(this.W+200)+(this.W+200))%(this.W+200)-100;tf(l.e,x,l.y+Math.sin(t*1.1+l.ph)*5*m,l.s,0,l.dir);if(l.tail)tf(l.tail,0,0,1,Math.sin(t*5+l.ph)*12*m)})}}}
/* lotus pond: an oval of ripple lines with pads and flowers */
function pond(parent,w,h){const g=grp(parent);ell(g,0,0,w/2,h/2,Pat.u('wave',P.ivory,P.peacock,.4),4);ell(g,0,0,w/2-10,h/2-8,'none',2,{stroke:K});
  const lot=[];[[-.25,0],[.18,-.1],[.3,.15]].forEach(([u,v],i)=>{const e=grp(g,{transform:`translate(${f1(u*w)} ${f1(v*h)})`});lotusPad(e,h*.2);const l=lotus(e,{r:h*.24,n:5,open:.85,pad:false,col:i%2?P.terra:P.verm});lot.push(l)});
  const shim=dots(g,`M${-w*.4} ${h*.18}Q0 ${h*.3} ${w*.4} ${h*.18}`,P.ivory,4,14);return{g,update(t){shim.setAttribute('stroke-dashoffset',f1(-t*8*MV()))}}}

/* ---- flora ---- */
function leafD(len,wid){return`M0 0Q${len*.5} ${-wid} ${len} 0Q${len*.5} ${wid} 0 0Z`}
function leaf(parent,len,wid,col,rot,x,y){const g=grp(parent,{transform:`translate(${f1(x||0)} ${f1(y||0)}) rotate(${f1(rot||0)})`});shp(g,leafD(len,wid),col||P.leaf,2.6);ln(g,`M${len*.1} 0H${len*.85}`,K,1.4);return g}
function flower(parent,r,col,c2){const g=grp(parent);for(let i=0;i<6;i++){const p=grp(g,{transform:`rotate(${i*60})`});shp(p,`M0 0C${-r*.4} ${-r*.4} ${-r*.3} ${-r} 0 ${-r}C${r*.3} ${-r} ${r*.4} ${-r*.4} 0 0Z`,col||P.verm,2.2);ln(p,`M0 ${-r*.2}V${-r*.7}`,K,1.2)}
  circ(g,0,0,r*.3,c2||P.turmeric,2);circ(g,0,0,r*.1,K,0);return g}
function marigold(parent,r,col){const g=grp(parent);const n=12;for(let i=0;i<n;i++){const a=i/n*360;const p=grp(g,{transform:`rotate(${a})`});shp(p,`M0 0Q${r*.3} ${-r*.5} 0 ${-r}Q${-r*.3} ${-r*.5} 0 0Z`,col||P.marigold,1.8)}
  circ(g,0,0,r*.42,P.turmeric,2);circ(g,0,0,r*.16,P.verm,0);return g}
/* a garland of marigolds between two points with a soft sag */
function garland(parent,x0,y0,x1,y1,sag,n){const g=grp(parent);const pts_=[];n=n||Math.max(5,Math.round(Math.hypot(x1-x0,y1-y0)/22));
  ln(g,`M${x0} ${y0}Q${(x0+x1)/2} ${(y0+y1)/2+sag*2} ${x1} ${y1}`,K,3);for(let i=0;i<=n;i++){const t=i/n;const x=lerp(x0,x1,t),y=lerp(y0,y1,t)+sag*4*t*(1-t);const m=grp(g);marigold(m,12,i%3===1?P.verm:P.marigold);tf(m,x,y,1);pts_.push([x,y])}
  return{g,pts:pts_}}
/* patterned tree: striped trunk with dot rows, a crown of overlapping leaf clusters; optional flowers */
function tree(parent,o){o=o||{};const h=o.h||420,cw=o.cw||h*.62,g=grp(parent);const r=rng(o.seed||5);const trunkW=o.tw||h*.09;
  const trunk=grp(g);shp(trunk,`M${-trunkW*.6} 0Q${-trunkW*.5} ${-h*.3} ${-trunkW*.4} ${-h*.62}L${trunkW*.4} ${-h*.62}Q${trunkW*.5} ${-h*.3} ${trunkW*.6} 0Z`,Pat.u('hlines',K,o.bark||P.terra,.9),4);
  ln(trunk,`M0 -10V${-h*.6}`,P.ivory,2.4,{'stroke-dasharray':'.1 10'});
  ln(trunk,`M0 ${-h*.5}Q${-cw*.18} ${-h*.62} ${-cw*.3} ${-h*.7}M0 ${-h*.54}Q${cw*.18} ${-h*.64} ${cw*.3} ${-h*.72}`,K,trunkW*.4+6);ln(trunk,`M0 ${-h*.5}Q${-cw*.18} ${-h*.62} ${-cw*.3} ${-h*.7}M0 ${-h*.54}Q${cw*.18} ${-h*.64} ${cw*.3} ${-h*.72}`,o.bark||P.terra,trunkW*.4);
  const crown=grp(g);const cl=o.leaf||[P.leaf,P.forest];const bl=[];
  const blobs=[[0,-h*.82,cw*.34],[-cw*.28,-h*.72,cw*.26],[cw*.28,-h*.72,cw*.26],[-cw*.16,-h*.95,cw*.24],[cw*.16,-h*.95,cw*.24],[0,-h*.62,cw*.22]];
  blobs.forEach(([x,y,rr],i)=>{const b=grp(crown);circ(b,0,0,rr,Pat.u(i%2?'leafy':'hatch',i%2?cl[0]:K,i%2?cl[1]:cl[0],i%2?1:.9),4);circ(b,0,0,rr*.78,'none',1.8,{stroke:K});tf(b,x,y,1);bl.push({b,x,y,ph:r()*TAU})});
  const fl=[];if(o.flowers){for(let i=0;i<(o.nf||9);i++){const a=r()*TAU,d=r()*.8;const b=blobs[i%blobs.length];const f=grp(crown);flower(f,o.fr||14,o.flowers,P.turmeric);const x=b[0]+Math.cos(a)*b[2]*d,y=b[1]+Math.sin(a)*b[2]*d;tf(f,x,y,1);fl.push({f,x,y})}}
  return{g,crown,bl,fl,h,sway:1,update(t){const m=MV()*this.sway;bl.forEach(b=>tf(b.b,b.x+Math.sin(t*.7+b.ph)*3*m,b.y+Math.cos(t*.6+b.ph)*2*m,1));}}}
/* ashoka tree: tall, drooping leaf fringes and clusters of red-orange flowers */
function ashoka(parent,h){const T_=tree(parent,{h,cw:h*.7,bark:P.maroon,leaf:[P.leaf,P.forest],flowers:P.verm,nf:14,fr:13,seed:11});
  const fr=grp(T_.g);for(let i=-5;i<=5;i++){const x=i*h*.06;const y=-h*.6+Math.abs(i)*6;const L_=grp(fr);for(let j=0;j<4;j++)leaf(L_,30,7,j%2?P.leaf:P.forest,90+i*3,x,y+j*22);}
  return T_}
function bush(parent,w,col,fcol){const g=grp(parent);const r=w/2;[[-r*.5,0,r*.55],[r*.5,0,r*.55],[0,-r*.3,r*.6]].forEach(([x,y,rr],i)=>{circ(g,x,y,rr,Pat.u(i===2?'leafy':'hatch',i===2?P.leaf:K,i===2?P.forest:(col||P.leaf),i===2?1:.9),3.5)});
  if(fcol){[[-r*.4,-r*.2],[r*.3,-r*.5],[r*.6,-r*.05],[-r*.05,-r*.65]].forEach(([x,y])=>{const f=grp(g,{transform:`translate(${f1(x)} ${f1(y)})`});flower(f,r*.16,fcol)})}return g}
/* a fern/grass tuft for foreground framing */
function tuft(parent,h,col){const g=grp(parent);for(let i=-3;i<=3;i++){const a=i*13;const l=grp(g,{transform:`rotate(${a-90})`});shp(l,leafD(h*(1-Math.abs(i)*.08),h*.13),i%2?(col||P.leaf):P.forest,2.4);ln(l,`M4 0H${h*.8}`,K,1.2)}return g}
/* a vine curl used by transitions (floral patterns becoming forest branches) */
function vineStrand(parent,len,col){const g=grp(parent);const d=`M0 0C${len*.2} ${-len*.12} ${len*.3} ${len*.12} ${len*.5} 0S${len*.8} ${-len*.12} ${len} 0`;ln(g,d,K,9);const s=ln(g,d,col||P.leaf,4.5);
  const lv=[];for(let i=1;i<10;i++){const x=len*i/10;const l=leaf(g,26,9,i%2?P.leaf:P.forest,i%2?-50:50,x,Math.sin(i)*4);lv.push(l)}return{g,s,lv,len}}

/* ---- creatures ---- */
function deer(parent){const g=grp(parent);ln(g,'M-6 -54L-14 -78M-14 -70L-24 -76M-14 -64L-4 -72M6 -54L14 -78M14 -70L24 -76M14 -64L4 -72',K,4);
  shp(g,'M-18 -50Q-26 -60 -16 -60Q-6 -60 -10 -50Z',P.terra,2.4);shp(g,'M18 -50Q26 -60 16 -60Q6 -60 10 -50Z',P.terra,2.4);
  shp(g,'M-16 -52Q0 -62 16 -52Q20 -20 6 -6Q0 -2 -6 -6Q-20 -20 -16 -52Z',Pat.u('dots',P.ivory,P.terra,.9),3.4);ell(g,0,-8,8,6,K,0);
  ell(g,-8,-38,4.6,6,P.ivory,2);ell(g,8,-38,4.6,6,P.ivory,2);circ(g,-8,-37,2.2,K,0);circ(g,8,-37,2.2,K,0);return g}
function bird(parent,col){const g=grp(parent);const w=grp(g);shp(g,'M-20 0Q-4 -18 18 -6L26 -8L20 0Q6 12 -20 0Z',col||P.peacock,2.6);shp(g,'M-20 0L-34 -8L-32 6Z',P.turmeric,2.2);circ(g,12,-6,2,K,0);
  shp(w,'M-6 -4Q0 -26 12 -22Q8 -10 -6 -4Z',P.verm,2.2);dots(g,'M-12 2L4 4',P.ivory,2.6,5);return{g,w}}
/* peacock in profile: patterned body, fan tail with eye spots; fan(k) opens the tail */
function peacock(parent,o){o=o||{};const g=grp(parent);const tail=grp(g);const eyes=[];for(let i=0;i<7;i++){const e=grp(tail);ln(e,'M0 0L-70 -30',K,3);const ey=grp(e,{transform:'translate(-74 -32)'});
    ell(ey,0,0,14,10,P.leaf,2.4);ell(ey,-1,0,8,6,P.peacock,2);circ(ey,-2,0,3,P.indigo,0);eyes.push(e)}
  shp(g,'M-26 0Q-30 -26 0 -30Q20 -30 20 -10Q18 4 -26 0Z',Pat.u('scale',K,P.peacock,.7),3.4);
  shp(g,'M10 -24Q8 -48 18 -58Q30 -60 30 -50L38 -48L30 -44Q20 -40 22 -24Z',P.ocean,3.2);circ(g,25,-52,2.4,P.ivory,1.2);
  ln(g,'M22 -60L18 -72M24 -60L26 -72M20 -60L12 -70',K,2);circ(g,18,-73,2.5,P.turmeric,1.2);circ(g,26,-73,2.5,P.turmeric,1.2);circ(g,12,-71,2.5,P.turmeric,1.2);
  ln(g,'M-6 0L-8 16M6 0L6 16',K,3);
  const pk={g,tail,eyes,fanK:o.fan==null?.3:o.fan,set(k){this.fanK=k;eyes.forEach((e,i)=>tf(e,-10,-12,1,(i-3)*(4+16*k)+(1-k)*12))}};pk.set(pk.fanK);return pk}

/* ---- architecture: Ayodhya palace, homes, Lanka towers and gates ---- */
/* a domed chhatri tower; col sets the wall colour */
function tower(parent,w,h,col,dome){const g=grp(parent);shp(g,`M${-w/2} 0V${-h}H${w/2}V0Z`,Pat.u('brick',K,col||P.ivory,.8),4);
  rect(g,-w/2+8,-h+8,w-16,h-16,'none',2);shp(g,`M${-w*.2} 0V${-h*.38}Q0 ${-h*.52} ${w*.2} ${-h*.38}V0Z`,P.indigo,3);
  shp(g,`M${-w/2-8} ${-h}H${w/2+8}V${-h-14}H${-w/2-8}Z`,P.verm,3);dots(g,`M${-w/2-2} ${-h-7}H${w/2+2}`,P.ivory,4,10);
  shp(g,`M${-w*.48} ${-h-14}Q${-w*.5} ${-h-w*.62} 0 ${-h-w*.82}Q${w*.5} ${-h-w*.62} ${w*.48} ${-h-14}Z`,Pat.u('scale',K,dome||P.turmeric,.8),4);
  ln(g,`M0 ${-h-w*.82}V${-h-w*1.02}`,K,3);circ(g,0,-h-w*1.05,5,P.verm,2);return g}
/* a run of crenellated wall with a double border and a lotus-and-peacock frieze */
function palaceWall(parent,w,h,col,band){const g=grp(parent);shp(g,`M0 0V${-h}H${w}V0Z`,Pat.u('brick',K,col||P.ivory,.9),4);
  rect(g,6,-h+6,w-12,h-12,'none',2);shp(g,`M0 ${-h}V${-h-30}H${w}V${-h}Z`,band||P.verm,3.5);ln(g,`M4 ${-h-15}H${w-4}`,P.turmeric,4,{'stroke-dasharray':'.1 12'});
  for(let x=0;x<w-4;x+=36)shp(g,`M${x} ${-h-30}Q${x+18} ${-h-56} ${x+36} ${-h-30}Z`,P.turmeric,3);return g}
/* an arched doorway with toran (leaf hanging) */
function archway(parent,w,h,col,inner){const g=grp(parent);shp(g,`M${-w/2} 0V${-h*.62}Q${-w/2} ${-h} 0 ${-h}Q${w/2} ${-h} ${w/2} ${-h*.62}V0Z`,col||P.verm,4);
  shp(g,`M${-w*.36} 0V${-h*.58}Q${-w*.36} ${-h*.86} 0 ${-h*.86}Q${w*.36} ${-h*.86} ${w*.36} ${-h*.58}V0Z`,inner||P.indigo,3.5);
  dots(g,`M${-w*.43} 0V${-h*.6}Q${-w*.43} ${-h*.93} 0 ${-h*.93}Q${w*.43} ${-h*.93} ${w*.43} ${-h*.6}V0`,P.turmeric,5,12);
  for(let i=-3;i<=3;i++)leaf(g,24,8,i%2?P.leaf:P.forest,90,i*w*.1,-h*.86);return g}
/* the Ayodhya palace: central gateway and towers; o.k colours by mood */
function palace(parent,o){o=o||{};const g=grp(parent);const W_=o.w||900;const col=o.col||P.ivory,dome=o.dome||P.turmeric;
  const wl=palaceWall(g,W_,o.h||220,col,o.band);tf(wl,-W_/2,0,1);
  [-.46,-.28,.28,.46].forEach((u,i)=>{const t=tower(g,i%3?110:90,(o.h||220)+(i%3?140:90),col,dome);tf(t,u*W_,0,1)});
  const c=tower(g,170,(o.h||220)+210,col,dome);const ar=archway(g,190,250,P.verm,P.indigo);
  /* peacock motifs along the parapet */
  const pk=[];[-.38,.38,-.13,.13].forEach((u,i)=>{const p=peacock(g,{fan:.2});tf(p.g,u*W_,-(o.h||220)-34,.62,0,u<0?1:-1);pk.push(p)});
  return{g,pk,arch:ar}}
/* a village/city home: patterned wall, tiled roof, doorway, window niches (slots for diyas) */
const HOUSE_COL=[[P.ivory,P.terra],[P.turmeric,P.verm],[P.ivory,P.peacock],[P.marigold,P.maroon],[P.ivory,P.leaf]];
function house(parent,o){o=o||{};const w=o.w||220,h=o.h||200,g=grp(parent);const c=HOUSE_COL[(o.v||0)%HOUSE_COL.length];
  shp(g,`M${-w/2} 0V${-h}H${w/2}V0Z`,Pat.u(o.v%2?'grid':'dots',c[1],c[0],.9),4);rect(g,-w/2+7,-h+7,w-14,h-14,'none',2);
  shp(g,`M${-w/2-18} ${-h}L0 ${-h-w*.42}L${w/2+18} ${-h}Z`,Pat.u('scale',K,c[1],.8),4);dots(g,`M${-w/2-6} ${-h-4}H${w/2+6}`,P.turmeric,5,12);
  const door=grp(g);shp(door,`M${-w*.16} 0V${-h*.5}Q0 ${-h*.64} ${w*.16} ${-h*.5}V0Z`,P.indigo,3.5);ln(door,`M0 0V${-h*.56}`,K,2);
  const win=[];[-.32,.32].forEach(u=>{const x=u*w;shp(g,`M${x-w*.1} ${-h*.62}V${-h*.8}Q${x} ${-h*.9} ${x+w*.1} ${-h*.8}V${-h*.62}Z`,P.indigo,3);rect(g,x-w*.13,-h*.62,w*.26,8,P.turmeric,2.4);win.push([x,-h*.62])});
  return{g,w,h,win,door:[0,0],roof:[0,-h-w*.42],sill:[[-w*.32,-h*.62],[w*.32,-h*.62]]}}
/* a modest forest dwelling (parnakuti): thatched roof and bamboo walls */
function hut(parent,w){const g=grp(parent);const h=w*.55;shp(g,`M${-w/2} 0V${-h}H${w/2}V0Z`,Pat.u('vlines',K,P.marigold,.9),4);
  shp(g,`M${-w*.12} 0V${-h*.6}H${w*.12}V0Z`,P.forest,3);shp(g,`M${-w*.66} ${-h}Q0 ${-h-w*.7} ${w*.66} ${-h}Z`,Pat.u('hatch',K,P.gold,.9),4);
  dots(g,`M${-w*.5} ${-h-8}Q0 ${-h-w*.48} ${w*.5} ${-h-8}`,P.terra,5,12);return g}
/* Lanka: tall gold towers with red bands */
function lankaSkyline(parent,w,h,o){o=o||{};const g=grp(parent);const r=rng(o.seed||7);const n=o.n||7;
  for(let i=0;i<n;i++){const u=(i+.5)/n;const tw=w/n*.8;const th=h*(.55+.45*Math.sin(u*Math.PI))*(o.flat?.7:1);const t=grp(g,{transform:`translate(${f1(u*w-w/2)} 0)`});
    shp(t,`M${-tw/2} 0V${-th*.7}L${-tw*.32} ${-th*.86}L0 ${-th}L${tw*.32} ${-th*.86}L${tw/2} ${-th*.7}V0Z`,Pat.u(i%2?'chevron':'scale',o.line||P.verm,o.col||P.gold,.8*(o.ps||1)),3.5);
    for(let k=1;k<4;k++)ln(t,`M${-tw/2} ${-th*.18*k}H${tw/2}`,K,2.4);circ(t,0,-th-6,5,P.verm,2)}
  return g}
/* the great gates of Lanka: two patterned doors on hinges inside a towered frame; set(k) opens them */
function lankaGate(parent,w,h){const g=grp(parent);const fr=grp(g);
  const side=(sx)=>{const t=grp(fr,{transform:`translate(${sx*(w/2+70)} 0)`});shp(t,`M-70 0V${-h-60}L0 ${-h-150}L70 ${-h-60}V0Z`,Pat.u('scale',P.verm,P.gold,.9),4.5);
    rect(t,-58,-h-50,116,h+40,'none',2.4);for(let k=1;k<6;k++)dots(t,`M-60 ${-k*h/5.5}H60`,P.maroon,5,12);circ(t,0,-h-150,7,P.verm,2)};side(-1);side(1);
  shp(fr,`M${-w/2-10} ${-h}Q0 ${-h-140} ${w/2+10} ${-h}V${-h-60}Q0 ${-h-200} ${-w/2-10} ${-h-60}Z`,Pat.u('chevron',P.maroon,P.turmeric,.9),4.5);
  const beyond=grp(g);rect(beyond,-w/2,-h,w,h,Pat.u('grid',P.gold,P.maroon,1.2),3);
  /* a narrow view of the courtyard: pillars and a lotus pool */
  for(const x of[-w*.3,-w*.12,w*.12,w*.3]){rect(beyond,x-12,-h*.86,24,h*.86,Pat.u('hlines',K,P.gold,.8),3)}ell(beyond,0,-24,w*.28,18,Pat.u('wave',P.ivory,P.peacock,.4),3);
  const doors=[];for(const sx of[-1,1]){const d=grp(g);const dw=w/2;shp(d,`M0 0V${-h}H${sx*dw}V0Z`,P.maroon,4.5);
    rect(d,sx>0?10:-dw+10,-h+10,dw-20,h-20,Pat.u('flower',P.gold,P.verm,1.1),3);
    for(let k=0;k<3;k++)for(let j=0;j<4;j++)circ(d,sx*(dw*.22+k*dw*.28),-h*(.14+j*.24),7,P.turmeric,2.4);
    circ(d,sx*dw*.9,-h*.5,14,P.gold,3);doors.push({d,sx})}
  return{g,doors,beyond,w,h,open:0,set(k){this.open=k;doors.forEach(o=>{tf(o.d,o.sx*-w/2,0,1,0,1-k*.88,1)});
    }}}
/* a distant golden palace inside a round vignette (Lanka glimpsed from the forest) */
function vignette(parent,r,draw){const g=grp(parent);circ(g,0,0,r+16,Pat.u('petals',P.turmeric,P.verm,.6),4);circ(g,0,0,r,P.maroon,4);
  const pic=grp(g,{'clip-path':clipIn(g,ellD(0,0,r-2,r-2))});draw(pic,r);circ(g,0,0,r,'none',4);circ(g,0,0,r-8,'none',1.8,{stroke:K});return g}

/* ---- story objects ---- */
/* Rama's ring: a gold band with a small floral ornament, drawn three-quarter view */
function ringObj(parent,r){r=r||30;const g=grp(parent);const glow=grp(g);rings(glow,r*2.2,{n:3,step:.24,w:3,c1:P.turmeric,c2:P.ivory});
  ell(g,0,r*.2,r,r*.72,'none',r*.34,{stroke:K});ell(g,0,r*.2,r,r*.72,'none',r*.22,{stroke:P.gold});ell(g,0,r*.2,r,r*.72,'none',2,{stroke:P.turmeric,'stroke-dasharray':'.1 7','stroke-width':3.2,'stroke-linecap':'round'});
  const top=grp(g,{transform:`translate(0 ${f1(-r*.5)})`});for(let i=0;i<6;i++){const p=grp(top,{transform:`rotate(${i*60})`});shp(p,`M0 0C${-r*.16} ${-r*.14} ${-r*.12} ${-r*.36} 0 ${-r*.38}C${r*.12} ${-r*.36} ${r*.16} ${-r*.14} 0 0Z`,P.turmeric,2.2)}
  circ(top,0,0,r*.14,P.verm,2.2);const sp=grp(g);star4(sp,r*.7,-r*.6,r*.3,P.ivory);return{g,glow,sp}}
/* bridge stones: five distinct patterns, each with a clear outer silhouette */
const STONE_KINDS=[{k:'spiral',pat:'spiral',a:P.ink,b:P.terra},{k:'lines',pat:'vlines',a:P.terra,b:P.ivory},{k:'fish',pat:'scale',a:P.ink,b:P.peacock},{k:'leaf',pat:'leafy',a:P.leaf,b:P.gold},{k:'geo',pat:'grid',a:P.verm,b:P.turmeric},{k:'flower',pat:'flower',a:P.verm,b:P.ivory}];
function stoneD(w,h,v){const r=rng(31+v*7);const pts_=[];for(let i=0;i<10;i++){const a=i/10*TAU;const k=.9+r()*.12;pts_.push([Math.cos(a)*w/2*k,Math.sin(a)*h/2*k])}return smooth(pts_,true)}
function stone(parent,v,w,h,label){const S=STONE_KINDS[v%STONE_KINDS.length];const g=grp(parent);const d=stoneD(w,h,v);dbl(g,d,Pat.u(S.pat,S.a,S.b,.9),0,0,.86,5);
  if(S.k==='fish'){const f=fish(g,P.verm,P.turmeric);tf(f.g,0,0,w/160)}if(S.k==='spiral'){ln(g,`M0 0m-4 0a4 4 0 1 1 8 0a10 10 0 1 1 -18 -2a16 16 0 1 1 30 8`,P.ivory,4)}
  if(label)shriRam(g,w);return{g,d,kind:S.k}}
/* श्री राम written on a bridge stone: live Devanagari text with an ivory halo so it reads on any pattern */
function shriRam(g,w){const t=el('text',{x:0,y:f1(w*.09),'text-anchor':'middle','font-family':'"Noto Sans Devanagari","Kohinoor Devanagari","Nirmala UI",Mangal,sans-serif','font-weight':700,'font-size':f1(w*.24),
  fill:P.verm,stroke:P.ivory,'stroke-width':f1(Math.max(2.5,w*.045)),'stroke-linejoin':'round','paint-order':'stroke',lang:'hi'},g);t.textContent='श्री राम';return t}
/* forest clues */
function cluePrints(parent){const g=grp(parent);const steps=[[-70,30,-14],[-30,-4,12],[14,24,-12],[54,-10,10]];
  steps.forEach(([x,y,a],i)=>{const f=grp(g,{transform:`translate(${x} ${y}) rotate(${a+75})`});ell(f,0,0,12,22,P.terra,3);ell(f,0,0,7,14,P.marigold,1.6);for(let k=-1;k<=1;k++)circ(f,k*7,-26,3.6,P.terra,2)});return g}
function clueFlower(parent){const g=grp(parent);ln(g,'M-34 22Q-10 12 8 -2',K,8);ln(g,'M-34 22Q-10 12 8 -2',P.leaf,4);leaf(g,30,10,P.leaf,150,-14,12);
  const f=grp(g,{transform:'translate(16 -8) rotate(-20)'});for(let i=0;i<8;i++){const p=grp(f,{transform:`rotate(${i*45})`});shp(p,'M0 0C-12 -10 -10 -30 0 -32C10 -30 12 -10 0 0Z',i%2?P.marigold:P.verm,2.6);ln(p,'M0 -6V-24',K,1.3);dots(p,'M-4 -12L-3 -22',P.ivory,2.6,5)}
  circ(f,0,0,9,P.turmeric,2.4);circ(f,0,0,3.5,K,0);return g}
/* footprint trail along a path of points (used for the joined route) */
function footTrail(parent,list,n){const g=grp(parent);for(let i=0;i<n;i++){const u=(i+.5)/n;const [x,y]=polyAt(list,u);const [x2,y2]=polyAt(list,Math.min(1,u+.01));const a=Math.atan2(y2-y,x2-x)/DEG+90;
    const f=grp(g,{transform:`translate(${f1(x+(i%2?8:-8))} ${f1(y)}) rotate(${f1(a)})`});ell(f,0,0,7,12,P.terra,2.4);for(let k=-1;k<=1;k++)circ(f,k*4,-15,2.2,P.terra,1.4)}return g}
/* the clay diya: same shape, angle and outline weight in every state.
   o.decor: 0 plain .. 1 fully patterned; set lit (0..1) for the flame, light (0..1) for the outer glow rings */
function diya(parent,o){o=o||{};const g=grp(parent);const glow=grp(g);const gr=rings(glow,62,{n:3,step:.26,w:3.5,c1:P.turmeric,c2:P.marigold});const ry=rays(glow,70,92,12,P.turmeric,3);
  const fl=grp(g);shp(fl,'M0 -64C-15 -44 -14 -30 0 -24C14 -30 15 -44 0 -64Z',P.turmeric,3.2);shp(fl,'M0 -52C-6 -42 -6 -34 0 -31C6 -34 6 -42 0 -52Z',P.marigold,2);
  const wick=ln(g,'M0 -24V-15',K,3.4);
  const bowl='M-44 -16Q-40 12 0 14Q40 12 44 -16Q30 -8 0 -8Q-30 -8 -44 -16Z';shp(g,bowl,o.col||P.terra,3.8);shp(g,'M44 -16Q56 -22 58 -14Q52 -9 42 -11',o.col||P.terra,3.4);
  ell(g,0,-12,40,7,P.maroon,3);
  const dec=grp(g);ln(dec,'M-36 -4Q0 10 36 -4',P.turmeric,3.2);const dd=[];for(let x=-27;x<=27;x+=9)dd.push(`M${x} ${f1(4-Math.abs(x)*.12)}h.1`);ln(dec,dd.join(''),P.ivory,4.2);
  const dec2=grp(g);for(const x of[-22,0,22]){const f=grp(dec2,{transform:`translate(${x} ${f1(6-Math.abs(x)*.1)})`});for(let i=0;i<4;i++)shp(grp(f,{transform:`rotate(${i*90})`}),'M0 0C-2.6 -2 -2 -6 0 -6.4C2 -6 2.6 -2 0 0Z',P.verm,1.2)}
  const Dy={g,fl,glow,gr,ry,dec,dec2,lit:o.lit||0,light:o.light==null?(o.lit||0):o.light,decor:o.decor==null?1:o.decor,x:0,y:0,s:1,ph:Math.random()*TAU,
    update(t){tf(this.g,this.x,this.y,this.s);const k=this.lit;
      if(k>0){const sw=Math.sin(t*TAU/2.6+this.ph)*3*MV();const sc=k*(1+.04*Math.sin(t*5.3+this.ph)*MV());this.fl.setAttribute('transform',`translate(0 -24) scale(${f3(sc)}) rotate(${f1(sw)}) translate(0 24)`);show(this.fl,true)}else show(this.fl,false);
      op(this.glow,this.light);if(this.light>0)tf(this.glow,0,-42,.7+.3*this.light);op(this.dec,clamp(this.decor*2,0,1));op(this.dec2,clamp(this.decor*2-1,0,1))}};return Dy}
/* lotus-shaped base for the shloka diya */
function lotusBase(parent,r){const g=grp(parent);for(let i=0;i<9;i++){const a=-80+i*20;const p=grp(g,{transform:`rotate(${a})`});shp(p,`M0 0C${-r*.22} ${-r*.2} ${-r*.18} ${-r*.6} 0 ${-r*.7}C${r*.18} ${-r*.6} ${r*.22} ${-r*.2} 0 0Z`,i%2?P.ivory:P.verm,3);ln(p,`M0 ${-r*.1}V${-r*.5}`,K,1.4)}
  shp(g,`M${-r*.9} 0Q0 ${r*.34} ${r*.9} 0Q0 ${r*.12} ${-r*.9} 0Z`,Pat.u('hatch',K,P.leaf,.8),3.4);return g}
/* rangoli: a symmetrical dot-and-petal pattern that draws itself in with set(k) */
function rangoli(parent,r,seed,flat){const g=grp(parent,{transform:flat?`scale(1 ${flat})`:null});const rr=rng(seed||1);const cols=[[P.verm,P.turmeric],[P.peacock,P.marigold],[P.leaf,P.verm],[P.maroon,P.turmeric]][(seed||0)%4];
  const parts=[];const n=8;const ring1=grp(g);for(let i=0;i<n;i++){const p=grp(ring1,{transform:`rotate(${i*360/n})`});shp(p,`M0 0C${-r*.22} ${-r*.3} ${-r*.14} ${-r*.8} 0 ${-r*.9}C${r*.14} ${-r*.8} ${r*.22} ${-r*.3} 0 0Z`,i%2?cols[0]:cols[1],2.6)}parts.push(ring1);
  const ring2=grp(g);circ(ring2,0,0,r*.98,'none',3,{stroke:K});dots(ring2,ellD(0,0,r*1.08,r*1.08),cols[0],6,14);parts.push(ring2);
  const c=grp(g);circ(c,0,0,r*.3,P.ivory,2.6);circ(c,0,0,r*.14,cols[0],2);parts.push(c);
  const dd=grp(g);const dl=[];for(let i=0;i<16;i++){const a=i/16*TAU;dl.push(`M${f1(Math.cos(a)*r*1.24)} ${f1(Math.sin(a)*r*1.24)}h.1`)}ln(dd,dl.join(''),P.ivory,7);parts.push(dd);
  const R={g,parts,set(k){parts.forEach((p,i)=>{const kk=clamp(k*parts.length-i,0,1);op(p,kk);tf(p,0,0,.6+.4*kk)})}};R.set(1);return R}
/* Pushpaka Vimana: an ornamented flying pavilion on a lotus-petal hull, carried on curled clouds.
   seats: three seat points (x,y) for the riders' upper bodies */
function vimana(parent,o){o=o||{};const g=grp(parent);const back=grp(g);const riders=grp(g);const front=grp(g);
  /* pavilion behind the riders */
  shp(back,'M-150 -60V-210H150V-60Z',Pat.u('grid',P.verm,P.ivory,1),4);for(const x of[-150,-50,50,150])rect(back,x-10,-214,20,156,Pat.u('hlines',K,P.gold,.7),3);
  shp(back,'M-178 -210Q0 -330 178 -210Z',Pat.u('scale',K,P.turmeric,.9),4.5);dots(back,'M-160 -218Q0 -318 160 -218',P.verm,6,14);ln(back,'M0 -300V-340',K,4);circ(back,0,-344,9,P.verm,3);
  for(const x of[-130,130]){shp(back,`M${x-30} -210Q${x} -270 ${x+30} -210Z`,P.gold,3.5);circ(back,x,-266,6,P.verm,2)}
  /* hull: lotus petals and a peacock prow */
  const hull='M-250 -60Q-240 20 -120 34H120Q240 20 262 -70Q240 -40 200 -60Z';shp(front,hull,Pat.u('petals',P.verm,P.turmeric,.9),5);
  shp(front,'M-252 -60H202Q240 -40 262 -70L268 -54Q240 -24 200 -44H-246Z',P.verm,3.5);dots(front,'M-236 -52H200',P.ivory,5,12);
  const pk=peacock(front,{fan:.5});tf(pk.g,262,-80,1.1,0,1);
  shp(front,'M-250 -60Q-282 -96 -262 -128Q-246 -100 -230 -60Z',P.gold,3.5);
  /* cloud cushion */
  const cl=grp(g);[[-170,52,180],[0,66,240],[170,52,180]].forEach(([x,y,w])=>{const c=cloud(cl,w,P.ivory,P.peacock);tf(c,x,y,1)});g.insertBefore(cl,back);
  return{g,riders,front,back,pk,seats:[[-90,-70],[0,-70],[90,-70]]}}
/* a small flying chariot seen far away (Ravana's departure): dark red and gold, no figures visible */
function farChariot(parent){const g=grp(parent);shp(g,'M-60 0Q-54 18 -20 20H24Q54 18 64 -6Z',Pat.u('petals',P.gold,P.maroon,.6),3.5);shp(g,'M-36 0V-36Q0 -60 36 -36V0Z',P.verm,3);
  const c=cloud(g,90,P.ivory,P.indigo);tf(c,0,24,1);return g}

/* a hanging festival lantern (akash kandil): a patterned diamond body with a lit window and tassels; swing via the group's rotation */
function lantern(parent,col,len){const g=grp(parent);const L_=len||60;ln(g,`M0 ${-L_}V0`,K,2.4);const b=grp(g);
  shp(b,'M0 0L-26 24L-26 52L0 76L26 52L26 24Z',Pat.u('chevron',P.gold,col||P.verm,.6),3.2);shp(b,'M-26 24H26M-26 52H26',null,2.2);
  shp(b,'M0 30L-10 38L0 46L10 38Z',P.turmeric,2);for(const x of[-14,0,14])ln(b,`M${x} 72V96`,x?P.marigold:P.verm,3);circ(b,0,0,4,P.gold,1.6);return{g,b}}

/* ---- interaction markers (separate from the artwork): a golden pulse ring with dots, and the demonstration hand ---- */
function target(parent,r){const g=grp(parent);const a=grp(g);circ(a,0,0,r,'none',8,{stroke:K});circ(a,0,0,r,'none',4,{stroke:P.turmeric});
  const n=Math.max(10,Math.round(r/7)),d=[];for(let i=0;i<n;i++){const t=i/n*TAU;d.push(`M${f1(Math.cos(t)*(r+12))} ${f1(Math.sin(t)*(r+12))}h.1`)}ln(a,d.join(''),P.gold,7);
  return{g,a,on:0,r,x:0,y:0,update(t){op(this.g,this.on);if(this.on>0)tf(this.g,this.x,this.y,1+.06*Math.sin(t*TAU/2.2)*MV());}}}
function handIcon(parent){const g=grp(parent);const h=grp(g);
  shp(h,'M-7 -2Q-7 -9 0 -9Q7 -9 7 -2V26H-7Z',P.ivory,3);shp(h,'M-20 30Q-20 22 -12 22H12Q20 22 20 30V54Q20 66 8 66H-8Q-20 66 -20 54Z',P.ivory,3);
  shp(h,'M-20 32Q-30 34 -26 46L-18 52',P.ivory,3);rect(h,-18,62,36,9,P.verm,2.4);
  return{g,h,on:0,x:0,y:0,press:0,update(){op(this.g,this.on);if(this.on>0)tf(this.g,this.x,this.y,1,-18);tf(this.h,0,this.press*5,1)}}}
/* battle motifs: stylised arrow lines, a soft round shield flash, rising dust curls */
function arrowLine(parent,len,col){const g=grp(parent);ln(g,`M0 0H${len}`,K,7);ln(g,`M0 0H${len}`,col||P.turmeric,3.4);shp(g,`M${len} 0L${len-22} -11L${len-16} 0L${len-22} 11Z`,col||P.turmeric,2.4);
  ln(g,'M0 0L-14 -10M0 0L-14 10M8 0L-6 -10M8 0L-6 10',K,2.6);return g}
/* the fire arrow: an arrow line with flat flame tongues trailing along its shaft */
function fireArrow(parent,len){const g=grp(parent);const fl=grp(g);const tongues=[];
  [[.78,44,P.verm],[.6,40,P.marigold],[.42,34,P.verm],[.26,28,P.marigold],[.12,22,P.turmeric]].forEach(([u,r,c],i)=>{const t=grp(fl,{transform:`translate(${f1(len*u)} 0)`});const b=grp(t);
    shp(b,`M${r*.5} 0C${r*.4} ${-r*1.1} ${-r} ${-r*1.2} ${-r*2.1} ${-r*.35}C${-r*1.3} ${r*.15} ${-r*.5} ${r*.8} ${r*.5} 0Z`,c,3);
    shp(b,`M${r*.2} 0C${r*.1} ${-r*.55} ${-r*.5} ${-r*.65} ${-r*1.1} ${-r*.2}C${-r*.6} ${r*.1} ${-r*.2} ${r*.4} ${r*.2} 0Z`,P.turmeric,1.8);tongues.push(t)});
  arrowLine(g,len,P.turmeric);const tip=grp(g,{transform:`translate(${len-6} 0)`});shp(tip,'M14 0C6 -26 -26 -30 -40 -6C-28 16 2 18 14 0Z',P.verm,3);shp(tip,'M8 0C2 -14 -16 -16 -24 -3C-16 8 0 9 8 0Z',P.turmeric,2);
  return{g,tongues,len}}
function shieldFlash(parent,r){const g=grp(parent);circ(g,0,0,r,Pat.u('flower',P.gold,P.ivory,.9),4);circ(g,0,0,r*.7,'none',3,{stroke:P.verm});rays(g,r*1.1,r*1.4,12,P.turmeric,3);return g}
function dustCurl(parent,w,col){const g=grp(parent);for(let i=0;i<3;i++){ln(g,`M${-w/2+i*w*.3} 0q${w*.12} ${-w*.22} ${w*.22} -2t${w*.12} ${-w*.1}`,K,6);ln(g,`M${-w/2+i*w*.3} 0q${w*.12} ${-w*.22} ${w*.22} -2t${w*.12} ${-w*.1}`,col||P.gold,3)}
  circ(g,-w*.1,-w*.12,w*.08,col||P.gold,2.4);circ(g,w*.2,-w*.2,w*.05,col||P.gold,2);return g}
/* a swirling decorative cloud band (Lanka battle sky) */
function swirl(parent,r,col){const g=grp(parent);ln(g,`M${-r} 0A${r} ${r} 0 1 1 ${r*.4} ${r*.6}A${r*.6} ${r*.6} 0 1 1 ${-r*.2} ${-r*.2}A${r*.3} ${r*.3} 0 1 1 ${r*.1} ${r*.12}`,K,9);
  ln(g,`M${-r} 0A${r} ${r} 0 1 1 ${r*.4} ${r*.6}A${r*.6} ${r*.6} 0 1 1 ${-r*.2} ${-r*.2}A${r*.3} ${r*.3} 0 1 1 ${r*.1} ${r*.12}`,col||P.gold,4.5);return g}

/* ---- frames: lotus, peacock, fish, leaf and floral-medallion borders. Blooms along the border open with bloom(k) ---- */
const FRAMES={lotus:[P.verm,P.turmeric,'petals',.7],peacock:[P.ivory,P.peacock,'wave',.5],fish:[P.ivory,P.ocean,'scale',.7],vine:[P.leaf,P.ivory,'vine',.62],
  gold:[P.verm,P.turmeric,'flower',.7],night:[P.gold,P.indigo,'flower',.7],forest:[P.ivory,P.forest,'leafy',.8],lanka:[P.gold,P.maroon,'chevron',.8]};
function border(parent,W,H,kind){const g=grp(parent);const b=BORDER,f=FRAMES[kind||'lotus'];
  shp(g,`M0 0H${W}V${H}H0Z M${b} ${b}V${H-b}H${W-b}V${b}Z`,Pat.u(f[2],f[0],f[1],f[3]),0,{'fill-rule':'evenodd'});
  rect(g,2,2,W-4,H-4,'none',3);rect(g,b-2,b-2,W-2*b+4,H-2*b+4,'none',3);rect(g,b+3,b+3,W-2*b-6,H-2*b-6,'none',1.4);
  [[0,0],[W-b,0],[W-b,H-b],[0,H-b]].forEach(([x,y])=>{circ(g,x+b/2,y+b/2,b*.62,P.turmeric,2.4);circ(g,x+b/2,y+b/2,b*.3,P.verm,1.6)});
  const blooms=[];const per=Math.max(3,Math.round(W/300));for(let i=0;i<per;i++){for(const y of[b/2,H-b/2]){const x=(i+.5)/per*W;const e=grp(g,{transform:`translate(${f1(x)} ${f1(y)})`});const fl=flower(e,b*.62,i%2?P.verm:P.marigold,P.turmeric);blooms.push(e)}}
  const B={g,blooms,bloom(k){blooms.forEach((e,i)=>{const kk=clamp(k*1.6-i/blooms.length*.6,0,1);op(e,kk);e.firstChild&&tf(e.firstChild,0,0,.3+.7*kk,kk*40)})}};B.bloom(0);return B}
/* medallion: a circular patterned frame with its own clipped picture inside */
function medallion(parent,r,o){o=o||{};const g=grp(parent);const inner=r*.84;
  circ(g,0,0,r,Pat.u('petals',o.ring||P.turmeric,o.ringBg||P.verm,.7),4);circ(g,0,0,inner,o.bg||P.ivory,4);
  const pic=grp(g,{'clip-path':clipIn(g,ellD(0,0,inner-2,inner-2))});const over=grp(g);circ(over,0,0,inner,'none',4);circ(over,0,0,inner-7,'none',1.6,{stroke:K});
  return{g,pic,r,inner,over}}
