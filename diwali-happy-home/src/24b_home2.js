/* ===== The family home: Episode 1's diwaliHome, extended (reusable for Episode 3) =====
   familyHome(parent,{garland:[5 flags], rangoli:{dots,petal,diamond,leaf,circle}, ring:[6 flags], lit, puja}) adds
   five garland slots on the doorway arch, a rangoli with fillable sections, six diya places around it and a flat
   cutaway of the puja area to the right of the open doorway. The doorway, rangoli, wall and platform never move. */
const GSLOT=[[-170,-206],[-132,-338],[0,-396],[132,-338],[170,-206]];
const RSEC=['petal','diamond','leaf','circle'];
const RCOL={petal:P.coral,diamond:P.gold,leaf:P.leaf,circle:P.turq};
/* positions of the six diya places around the rangoli, in the home's ground plane */
const RING=[-20,20,62,118,160,200].map(a=>[Math.cos(a*DEG)*300,120+Math.sin(a*DEG)*104]);
/* the rangoli seen from above; the home shows the same drawing squashed into perspective */
function rangoli2(parent){const g=grp(parent);const base=grp(g);
  circ(base,0,0,250,P.verm,4);circ(base,0,0,232,P.ivory,3);circ(base,0,0,222,P.indigo,3);
  const dotsW=grp(g);const dd=[];for(let i=0;i<30;i++){const a=i/30*TAU;dd.push(`M${f1(Math.cos(a)*227)} ${f1(Math.sin(a)*227)}h.1`)}ln(dotsW,dd.join(''),P.turmeric,9);
  const sec={};const ghostStroke={fill:'none',stroke:P.ivory,'stroke-width':3,'stroke-dasharray':'7 7'};
  const motif=(k,parent2,fill)=>{const m=grp(parent2);
    if(k==='petal'){for(let i=0;i<12;i++){const p=grp(m,{transform:`rotate(${i*30}) translate(0 -172)`});fill?shp(p,'M0 30C-22 8 -18 -20 0 -34C18 -20 22 8 0 30Z',P.coral,3):el('path',Object.assign({d:'M0 30C-22 8 -18 -20 0 -34C18 -20 22 8 0 30Z'},ghostStroke),p);if(fill)ln(p,'M0 20V-22',K,1.6)}}
    else if(k==='diamond'){for(let i=0;i<8;i++){const p=grp(m,{transform:`rotate(${i*45+22.5}) translate(0 -118)`});fill?shp(p,'M0 -24L18 0L0 24L-18 0Z',P.gold,3):el('path',Object.assign({d:'M0 -24L18 0L0 24L-18 0Z'},ghostStroke),p);if(fill)circ(p,0,0,4,P.verm,0)}}
    else if(k==='leaf'){for(let i=0;i<6;i++){const p=grp(m,{transform:`rotate(${i*60}) translate(0 -66)`});fill?shp(p,'M0 22Q-16 0 0 -22Q16 0 0 22Z',P.leaf,3):el('path',Object.assign({d:'M0 22Q-16 0 0 -22Q16 0 0 22Z'},ghostStroke),p);if(fill)ln(p,'M0 16V-16',K,1.4)}}
    else{fill?circ(m,0,0,34,P.turq,3.4):el('circle',Object.assign({r:34},ghostStroke),m);if(fill){circ(m,0,0,12,P.ivory,2.4);circ(m,0,0,4,P.verm,0)}}
    return m};
  /* the dark ground of the unfinished sections, their faint outlines, then the coloured fills */
  for(const k of RSEC){const s_=grp(g);const ghost=motif(k,s_,false);const full=motif(k,s_,true);sec[k]={g:s_,ghost,full,k:0}}
  const R={g,dotsW,sec,dots:1,
    centre(k){return k==='circle'?[0,0]:k==='leaf'?[0,-66]:k==='diamond'?[0,-118]:[0,-172]},
    update(){op(dotsW,this.dots);for(const k of RSEC){const q=sec[k];op(q.full,q.k);op(q.ghost,1-q.k)}}};
  return R}
/* a marigold cluster for the garland slots */
function flowerCluster(parent,v){const g=grp(parent);const cols=[[P.turmeric,P.gold],[P.gold,P.verm],[P.verm,P.turmeric]][v%3];
  [[-12,4],[12,4],[0,-12]].forEach(([x,y],i)=>{const m=marigold(g,13,cols[i%2]);tf(m,x,y,1)});leaf(g,26,8,P.leaf,120,-6,12);leaf(g,26,8,P.leaf,60,6,12);return g}
/* the framed devotional illustration of Lakshmi (Episode 1's design, unchanged) */
function lakshmiFrame(parent){const g=grp(parent);const motifs=grp(g);
  for(const[x,y,r]of[[-96,40,0],[96,40,0],[-90,-60,0],[90,-60,0],[0,-128,0]]){const l=lotus(motifs,{r:22,n:5,open:.85,pad:false});tf(l.g,x,y,1)}
  el('rect',{x:-74,y:-104,width:148,height:184,rx:8,fill:Pat.u('petals',P.turmeric,P.verm,.55),stroke:K,'stroke-width':4},g);
  el('rect',{x:-60,y:-90,width:120,height:156,fill:P.indigo,stroke:K,'stroke-width':3.4},g);
  const clip=clipIn(g,'M-58 -88H58V64H-58Z');const pic=grp(g,{'clip-path':clip});
  const lot=bigLotus(pic,{r:170});lot.openO=1;lot.openI=1;lot.x=0;lot.y=64;lot.s=.3;const lak=new Lakshmi(pic);lak.x=0;lak.y=54;lak.s=.33;pic.appendChild(lot.front);
  return{g,motifs,lot,lak,mk:0,update(dt,t){lot.update(t);lak.update(dt,t);op(motifs,this.mk);if(this.mk>0)tf(motifs,0,0,.9+.1*this.mk,Math.sin(t*.6)*2*MV())}}}
function sweetsPlate(parent,big){const g=grp(parent);ell(g,0,0,70,22,P.gold,4);ell(g,0,-4,58,16,P.turmeric,3);
  const sw=[[-30,-10,P.turmeric],[0,-14,P.ivory],[30,-10,P.coral],[-15,-24,P.gold],[15,-24,P.pink],[0,-34,P.turmeric]];
  sw.forEach(([x,y,c],i)=>{if(i%3===1){shp(g,`M${x-12} ${y+4}L${x} ${y-10}L${x+12} ${y+4}Z`,c,2.4);ln(g,`M${x-6} ${y}h12`,P.gold,1.6)}else{circ(g,x,y,12,c,2.6);circ(g,x-3,y-3,3,P.ivory,0)}});return g}
function fruitPlate(parent){const g=grp(parent);ell(g,0,0,52,16,P.gold,3.4);circ(g,-18,-14,14,P.verm,2.6);circ(g,10,-16,15,P.turmeric,2.6);circ(g,-2,-30,12,P.leaf,2.6);ln(g,'M10 -31L13 -38',K,2.4);return g}
function familyHome(parent,o){o=o||{};const H=diwaliHome(parent,{lit:o.lit||0,doorOpen:1,rangoli:1});const house=H.win[1].parentNode;const rg=H.rViv.parentNode;
  op(H.rMute,0);op(H.rViv,0);H.rMute.style.display='none';H.rViv.style.display='none';
  /* the rangoli with fillable sections, in perspective */
  H.R=rangoli2(rg);
  /* six diya places round the rangoli */
  const front=rg.parentNode;H.ringG=grp(front);H.ring=RING.map((p,i)=>{const sl=grp(H.ringG);const mark=grp(sl);ell(mark,0,6,34,12,'none',4,{stroke:P.turmeric,'stroke-dasharray':'.1 10','stroke-linecap':'round','stroke-width':7});
    const d=diya(sl,{col:i%2?P.terra:P.ochre});d.s=.62;d.lit=0;tf(sl,p[0],p[1],1);return{g:sl,mark,d,on:0,x:p[0],y:p[1]}});
  /* the cutaway puja area to the right of the doorway */
  show(H.win[1],false);const cut=H.cut=grp(house);
  el('rect',{x:190,y:-404,width:262,height:372,fill:Pat.u('petals',P.verm,P.gold,.6),stroke:K,'stroke-width':4},cut);
  el('rect',{x:204,y:-390,width:234,height:344,fill:Pat.u('flora',P.gold,P.ivory,.6),stroke:K,'stroke-width':3},cut);
  shp(cut,'M204 -80H438V-46H204Z',Pat.u('grid',P.gold,P.terra,.7),3);
  const tor=`M210 -380Q321 -340 432 -380`;ln(cut,tor,K,6);ln(cut,tor,P.leaf,3);for(let i=0;i<7;i++){const u=i/6;const m=marigold(cut,8,i%2?P.gold:P.turmeric);tf(m,lerp(212,430,u),-380+Math.sin(u*Math.PI)*20+8,1)}
  shp(cut,'M214 -130H428V-80H214Z',Pat.u('vlines',P.ochre,P.terra,.7),3.6);ln(cut,'M214 -130H428',K,4);
  H.frame=lakshmiFrame(cut);tf(H.frame.g,321,-230,.88);
  H.pujaDiyas=[[244,-140],[398,-140]].map(([x,y],i)=>{const d=diya(cut,{col:P.terra});d.x=x;d.y=y;d.s=.34;d.lit=0;return d});
  H.offer=grp(cut);const fp=fruitPlate(H.offer);tf(fp,262,-134,.62);const sp=sweetsPlate(H.offer);tf(sp,378,-132,.5);
  const vase=grp(H.offer,{transform:'translate(424 -136) scale(.5)'});shp(vase,'M-16 0Q-24 -24 -10 -34H10Q24 -24 16 0Z',P.turq,3);[[-10,-46],[10,-48],[0,-60]].forEach(([x,y],i)=>{const m=marigold(vase,10,i%2?P.coral:P.gold);tf(m,x,y,1)});
  H.flowerOn=grp(cut,{transform:'translate(224 -134) scale(.6)'});[[-6,0],[8,-4]].forEach(([x,y],i)=>{const m=marigold(H.flowerOn,10,i?P.pink:P.gold);tf(m,x,y,1)});
  /* garland slots on the arch */
  const gs=grp(house);H.slots=GSLOT.map((p,i)=>{const sl=grp(gs,{transform:`translate(${p[0]} ${p[1]})`});const mark=grp(sl);circ(mark,0,0,24,'none',4,{stroke:P.ivory,'stroke-dasharray':'6 6'});
    const fl=flowerCluster(sl,i);const ring=grp(sl);circ(ring,0,0,32,'none',6,{stroke:P.turmeric});circ(ring,0,0,32,'none',2,{stroke:K});return{g:sl,mark,fl,ring,k:0,flash:0,x:p[0],y:p[1]}});
  const strand=el('path',{fill:'none',stroke:P.leaf,'stroke-width':5,'stroke-linecap':'round'},gs);gs.insertBefore(strand,gs.firstChild);
  const sst=el('path',{fill:'none',stroke:K,'stroke-width':9,'stroke-linecap':'round'},gs);gs.insertBefore(sst,gs.firstChild);
  H.sparkleG=grp(house);H.sparkle=0;for(let i=0;i<6;i++){const q=grp(H.sparkleG);star4(q,Math.cos(i/6*TAU)*50,-470+Math.sin(i/6*TAU)*20,10,i%2?P.turmeric:P.ivory)}
  const base=H.update.bind(H);H.pujaLit=0;
  H.set=function(st){if(st.garland)st.garland.forEach((v,i)=>H.slots[i].k=v?1:0);if(st.rangoli)for(const k in st.rangoli){if(k==='dots')H.R.dots=st.rangoli[k];else H.R.sec[k].k=st.rangoli[k]}
    if(st.ring)st.ring.forEach((v,i)=>{H.ring[i].on=v?1:0;H.ring[i].d.lit=v?1:0});if(st.lit!=null)H.lit=st.lit;if(st.puja!=null)H.pujaLit=st.puja};
  H.update=function(t,dt){base(t);H.R.update();
    H.slots.forEach(s=>{op(s.fl,s.k);op(s.mark,1-s.k);op(s.ring,s.flash);if(s.k>0)tf(s.fl,0,0,.5+.5*s.k)});
    const filled=H.slots.filter(s=>s.k>.5);let d='';if(filled.length>1){const pts_=filled.map(s=>[s.x,s.y]);d=smooth(pts_,false)}strand.setAttribute('d',d);sst.setAttribute('d',d);
    H.ring.forEach(r=>{op(r.mark,1-r.on);op(r.d.g,r.on);r.d.update(t)});H.pujaDiyas.forEach(d=>{d.lit=H.pujaLit;d.update(t)});H.frame.update(dt||.016,t);
    op(H.sparkleG,H.sparkle);if(H.sparkle>0)tf(H.sparkleG,0,0,1,0)};
  /* each threshold diya can be lit on its own (Shot 2.5 lights them one after another) */
  H.diyas.forEach(d=>{const u=d.update.bind(d);d.update=function(t){if(this.own!=null)this.lit=this.own;u(t)}});
  H.rangoli=0;H.set(o);return H}
