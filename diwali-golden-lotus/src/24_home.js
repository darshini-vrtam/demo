/* ===== The Diwali home (reusable; Episode 2 builds it with the same function) =====
   A welcoming traditional home, not a palace: decorated doorway open to a warm interior, marigold garlands,
   a symmetrical rangoli, clay diyas along the threshold (unlit unless o.lit), flower pots, scattered petals, stylised trees.
   Local origin: centre of the threshold on the ground line; the house spans x -470..470 and rises to y -590.
   Parameters: o.lit (0..1 diya flames), o.doorOpen (0 closed .. 1 open), o.rangoli (0 muted .. 1 vivid). No people. */
function homeTree(parent,flip){const g=grp(parent);const trunk=grp(g);
  shp(trunk,'M-20 0C-14 -60 -18 -140 -10 -210L10 -210C18 -140 14 -60 20 0Z',Pat.u('xhatch',K,P.terra,.8),4);
  ln(trunk,'M-6 -150Q-40 -180 -62 -214M6 -132Q40 -160 66 -196',K,9);ln(trunk,'M-6 -150Q-40 -180 -62 -214M6 -132Q40 -160 66 -196',P.terra,5);
  const can=grp(g);[[-70,-236,62],[64,-222,60],[0,-286,72],[-30,-196,44],[34,-180,42]].forEach(([x,y,R],i)=>{circ(can,x,y,R,Pat.u('vine',P.turq,P.leaf,.5),4);
    for(let k=0;k<6;k++){const a=k/6*360+i*17;leaf(can,R*.5,R*.16,k%2?P.leaf:P.turq,a,x,y)}});
  [[-84,-250],[40,-300],[76,-210],[-20,-270],[10,-200]].forEach(([x,y],i)=>{const m=marigold(can,9,i%2?P.coral:P.gold);tf(m,x,y,1)});
  if(flip)g.setAttribute('transform','scale(-1 1)');return{g,can}}
function rangoli(parent,vivid){const g=grp(parent);const C=vivid?[P.verm,P.turmeric,P.pink,P.turq,P.leaf,P.coral,P.ivory,P.indigo]:[P.ochre,P.ivory,P.ochre,P.ivory,P.gold,P.ivory,P.ivory,P.ochre];
  circ(g,0,0,250,C[7],4);circ(g,0,0,232,'none',3,{stroke:C[6],'stroke-dasharray':'.1 14','stroke-width':8,'stroke-linecap':'round'});
  const ring=(n,R,len,wid,ca,cb)=>{for(let i=0;i<n;i++){const a=i/n*360;const p=grp(g,{transform:`rotate(${f1(a)}) translate(0 ${-R})`});shp(p,`M0 ${len/2}C${-wid} ${len*.2} ${-wid} ${-len*.3} 0 ${-len/2}C${wid} ${-len*.3} ${wid} ${len*.2} 0 ${len/2}Z`,i%2?cb:ca,3);ln(p,`M0 ${len*.3}V${-len*.3}`,K,1.4)}};
  ring(16,186,64,22,C[0],C[1]);circ(g,0,0,150,C[3],3.4);ring(12,122,52,18,C[2],C[5]);circ(g,0,0,90,C[1],3.4);ring(8,62,40,16,C[0],C[4]);
  circ(g,0,0,28,C[6],3);circ(g,0,0,12,C[0],2.4);
  const d=[];for(let i=0;i<24;i++){const a=i/24*TAU;d.push(`M${f1(Math.cos(a)*218)} ${f1(Math.sin(a)*218)}h.1`)}ln(g,d.join(''),C[4],9);return g}
function diwaliHome(parent,o){o=o||{};const g=grp(parent);const H={g,lit:o.lit||0,doorOpen:o.doorOpen==null?1:o.doorOpen,rangoli:o.rangoli==null?.4:o.rangoli,glowK:0};
  const back=grp(g),house=grp(g),front=grp(g);
  /* plinth and steps */
  shp(house,'M-480 0H480V-34H-480Z',Pat.u('grid',P.gold,P.terra,.9),4);shp(house,'M-150 0H150V-34H-150Z',P.ivory,3.4);ln(house,'M-140 -17H140',P.verm,3,{'stroke-dasharray':'.1 10'});
  /* walls with a painted frieze and a diamond dado */
  shp(house,'M-450 -34V-410H450V-34Z',P.ivory,4.6);
  shp(house,'M-450 -110V-34H450V-110Z',Pat.u('grid',P.verm,P.ivory,1),3.4);
  shp(house,'M-450 -410V-372H450V-410Z',Pat.u('petals',P.gold,P.verm,.7),3.4);
  shp(house,'M-450 -130H450V-118H-450Z',P.gold,2.6);
  /* painted fish and flower medallions on the wall (Madhubani-style wall art) */
  for(const sd of[-1,1]){const m=grp(house,{transform:`translate(${sd*395} -250)`});circ(m,0,0,34,P.turmeric,3);tinyFlower(m,26,P.pink);
    const f=grp(house,{transform:`translate(${sd*395} -170) scale(${.55*sd} .55)`});fish(f,sd>0?0:3)}
  /* windows with lattice and warm light inside */
  H.win=[];for(const sd of[-1,1]){const w=grp(house,{transform:`translate(${sd*272} -250)`});
    shp(w,'M-74 -84H74V84H-74Z',P.gold,4);shp(w,'M-58 -68H58V68H-58Z',Pat.u('xhatch',K,P.turmeric,1),3.4);ln(w,'M0 -68V68M-58 0H58',K,5);
    shp(w,'M-86 84H86V100H-86Z',P.terra,3);shp(w,'M-84 -84Q0 -128 84 -84Z',P.verm,3.4);ln(w,'M-60 -92Q0 -116 60 -92',P.turmeric,3,{'stroke-dasharray':'.1 9'});
    for(let i=-2;i<=2;i++){const m=marigold(w,9,i%2?P.gold:P.turmeric);tf(m,i*30,104+Math.abs(i)*-2,1)}H.win.push(w)}
  /* roof: sloping tiles with a mustard ridge and a small finial */
  shp(house,'M-520 -404L-392 -560H392L520 -404Z',Pat.u('fish',P.gold,P.verm,1.1),4.6);
  shp(house,'M-528 -414L-520 -398H520L528 -414Z',P.gold,3.4);shp(house,'M-400 -570H400V-552H-400Z',P.gold,3.4);
  ln(house,'M-504 -406H504',K,2.2,{'stroke-dasharray':'.1 16'});
  const fin=grp(house,{transform:'translate(0 -570)'});shp(fin,'M-22 0Q-26 -26 0 -34Q26 -26 22 0Z',P.turmeric,3);shp(fin,'M-6 -34L0 -58L6 -34Z',P.verm,2.4);
  /* doorway: an arched, decorated frame; the doors swing inward to show the warm interior */
  const doorW=124,doorTop=-322;const opening=`M${-doorW} -34V${doorTop+70}Q${-doorW} ${doorTop} 0 ${doorTop-18}Q${doorW} ${doorTop} ${doorW} ${doorTop+70}V-34Z`;
  shp(house,`M${-doorW-46} -34V${doorTop+64}Q${-doorW-46} ${doorTop-52} 0 ${doorTop-74}Q${doorW+46} ${doorTop-52} ${doorW+46} ${doorTop+64}V-34Z`,Pat.u('petals',P.verm,P.gold,.7),4.6);
  ln(house,`M${-doorW-24} -34V${doorTop+66}Q${-doorW-24} ${doorTop-26} 0 ${doorTop-46}Q${doorW+24} ${doorTop-26} ${doorW+24} ${doorTop+66}V-34`,P.ivory,4,{'stroke-dasharray':'.1 11'});
  const inner=grp(house);shp(inner,opening,P.turmeric,4.4);const ic=clipIn(inner,opening);const inPic=grp(inner,{'clip-path':ic});
  el('rect',{x:-doorW,y:doorTop-30,width:doorW*2,height:400,fill:Pat.u('rings',P.gold,P.turmeric,1.1)},inPic);
  /* inside: a warm back wall, a floor line and a small lamp niche */
  shp(inPic,`M${-doorW} -120H${doorW}V-30H${-doorW}Z`,Pat.u('dots',P.gold,P.ochre,.8),3);
  shp(inPic,'M-30 -210Q-30 -254 0 -262Q30 -254 30 -210Z',P.gold,3);tinyFlower(inPic,14,P.verm).setAttribute('transform','translate(0 -228)');
  H.inside=grp(inPic,{transform:'translate(0 -180)'});const ins=H.inside;rings(ins,70,{n:3,step:.24,w:4,c1:P.ivory,c2:P.verm});const insF=tinyFlower(ins,40,P.ivory);
  /* door panels: full width when closed, narrow slivers when open */
  H.doors=[-1,1].map(sd=>{const d=grp(house);return d});
  const drawDoors=()=>{const k=H.doorOpen;H.doors.forEach((d,i)=>{const sd=i?1:-1;d.innerHTML='';const wOpen=26,w=lerp(doorW,wOpen,k);const x0=sd*doorW,x1=sd*(doorW-w);
    const top0=doorTop+70,skew=k*24;const pth=`M${f1(x0)} -34V${f1(top0)}L${f1(x1)} ${f1(top0+skew)}V${f1(-34-skew*.4)}Z`;shp(d,pth,Pat.u('vlines',P.ochre,P.terra,.8),3.6);
    for(let j=0;j<4;j++){const y=lerp(top0+20,-60,j/3);circ(d,(x0+x1)/2,y+skew*.5,4,P.turmeric,1.6)}});H._door=k};drawDoors();
  /* toran: marigold strands and mango leaves across the top of the doorway; they sway gently */
  const tor=grp(house);const strand=`M${-doorW-56} ${doorTop+20}Q0 ${doorTop+80} ${doorW+56} ${doorTop+20}`;ln(tor,strand,K,7);ln(tor,strand,P.leaf,3.4);
  H.hang=[];for(let i=0;i<9;i++){const u=i/8;const x=lerp(-doorW-56,doorW+56,u),y=doorTop+20+Math.sin(u*Math.PI)*30;const hg=grp(tor);hg._x=x;hg._y=y;
    if(i%2){leaf(hg,34,10,P.leaf,90,0,0)}else{for(let j=0;j<3;j++){const m=marigold(hg,9,j%2?P.gold:P.turmeric);tf(m,0,8+j*16,1)}}H.hang.push(hg)}
  /* side garlands drooping along the door frame */
  for(const sd of[-1,1]){const gs=grp(house);for(let j=0;j<8;j++){const m=marigold(gs,10,j%2?P.gold:P.turmeric);tf(m,sd*(doorW+46),doorTop+80+j*28,1)}H.hang.push(gs);gs._x=0;gs._y=0;gs._side=1}
  /* flower pots at each side of the door, and the diyas along the threshold */
  for(const sd of[-1,1]){const pg=grp(front,{transform:`translate(${sd*210} 0)`});shp(pg,'M-34 -64H34L26 0H-26Z',Pat.u('vlines',P.ochre,P.terra,.7),3.6);ell(pg,0,-64,36,8,P.ochre,3);
    [-1,0,1].forEach(i=>leaf(pg,46,12,P.leaf,-90+i*38,i*8,-68));[[-18,-104],[16,-112],[0,-128],[-30,-84],[30,-88]].forEach(([x,y],j)=>{const m=marigold(pg,12,j%2?P.gold:P.coral);tf(m,x,y,1)})}
  H.diyas=[];for(let i=0;i<7;i++){const d=diya(front,{col:i%2?P.terra:P.ochre});d.x=(i-3)*62;d.y=16+Math.abs(i-3)*2;d.s=.62;H.diyas.push(d)}
  /* the rangoli in front of the door: a muted and a vivid copy cross-fade as its colours brighten */
  const rg=grp(front,{transform:'translate(0 120) scale(1 .36)'});H.rMute=rangoli(rg,false);H.rViv=rangoli(rg,true);
  /* scattered petals on the ground */
  const pet=grp(front);const r=rng(7);for(let i=0;i<26;i++){const x=(r()-.5)*900,y=40+r()*190;if(Math.abs(x)<260&&y<210&&y>40)continue;const p=grp(pet,{transform:`translate(${f1(x)} ${f1(y)}) rotate(${f1(r()*360)})`});
    shp(p,'M0 0Q6 -8 0 -16Q-6 -8 0 0Z',[P.gold,P.coral,P.pink,P.turmeric][i%4],1.8)}
  H.door={x:0,y:-180,top:doorTop,w:doorW};
  H.update=function(t){const m=MV();this.hang.forEach((h,i)=>{if(h._side)h.setAttribute('transform',`rotate(${f1(Math.sin(t*.9+i)*.6*m)} 0 ${doorTop})`);else h.setAttribute('transform',`translate(${f1(h._x)} ${f1(h._y)}) rotate(${f1(Math.sin(t*1.1+i*.8)*7*m)})`)});
    op(this.rViv,this.rangoli);if(this._door!==this.doorOpen)drawDoors();this.diyas.forEach(d=>{d.lit=this.lit;d.update(t)});
    op(this.inside,this.glowK);if(this.glowK>0)tf(this.inside,0,-180,.6+.4*this.glowK,t*10*m)};
  return H}
