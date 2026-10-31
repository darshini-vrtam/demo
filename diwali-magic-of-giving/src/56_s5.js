/* ================= EP03_SC05_FINALE: HAPPY DIWALI! ================= */
function creamBg(s,a,b){s.paintBg=function(){this.bg.innerHTML='';el('rect',{x:-4,y:-4,width:L.W+8,height:L.Ha+8,fill:Pat.u('flora',a||P.pink,b||P.ivory,1.1)},this.bg)}}
function svgText(parent,txt,size,col){const t=el('text',{'text-anchor':'middle','font-family':'"Baloo 2","Trebuchet MS",sans-serif','font-weight':800,'font-size':size||40,fill:col||K,'letter-spacing':2},parent);t.textContent=txt;return t}
async function shot5_1(){mood('warm');Music.mood('festive');Music.setLevel(.5,2);const s=mkScene('words');creamBg(s);D.setScene(s,1300);const comp=s.comp;const ringL=grp(comp),panL=grp(comp);
  const light=s.light=mkLight(grp(comp));s.fx=fxLayer(s);const C=()=>LP([889,420],[500,720]);
  const W3=[{w:'CARE',f:g=>{const fl=tinyFlower(g,40,P.pink);g._fl=fl}},{w:'SHARE',f:g=>{folk(g,{x:-38,y:52,s:.66,sk:P.ochre,cl:P.pink,cl2:P.turmeric,hair:'plait',skirt:1,la:20,ra:70});folk(g,{x:38,y:52,s:.62,sk:P.ochre,cl:P.teal,cl2:P.ivory,hair:'short',la:70,ra:20});circ(g,0,-10,8,P.turmeric,2.4)}},
    {w:'BE GRATEFUL',f:g=>{const d=diya(g,{col:P.terra});d.lit=1;d.s=1.1;d.y=34;g._d=d}}];
  const pan=W3.map((q,i)=>{const g=grp(panL);el('rect',{x:-130,y:-120,width:260,height:240,rx:22,fill:Pat.u('vine',P.leaf,P.ivory,.5),stroke:K,'stroke-width':5},g);el('rect',{x:-116,y:-106,width:232,height:166,rx:16,fill:P.ivory,stroke:K,'stroke-width':3},g);
    const pic=grp(g,{transform:'translate(0 -24)'});q.f(pic);const tx=svgText(g,q.w,q.w.length>6?32:40);tx.setAttribute('y',98);return{g,pic,k:0,c:0,i}});
  const ring=flowerRing(s,ringL,22,LP(470,330),LP(300,520));
  s.parts.push({update:(dt,t)=>{const c=C();const spots=LP([[c[0],c[1]-300],[c[0]-480,c[1]+130],[c[0]+480,c[1]+130]],[[c[0],c[1]-480],[c[0]-250,c[1]+400],[c[0]+250,c[1]+400]]);
    pan.forEach((p,i)=>{const a=-Math.PI/2+i/3*TAU;const cx=c[0]+Math.cos(a)*LP(380,300),cy=c[1]+Math.sin(a)*LP(250,420);const x=lerp(spots[i][0],cx,p.c),y=lerp(spots[i][1],cy,p.c);
      tf(p.g,x,y,Math.max(.001,p.k)*LP(1,.85)*(1-.25*p.c));op(p.g,p.k>0?1:0);if(p.pic._fl)tf(p.pic._fl,0,0,.4+.6*p.k,t*10);if(p.pic._d)p.pic._d.update(t)});ring.x=c[0];ring.y=c[1];light.update(dt,t)}});
  light.vis=true;light.x=C()[0];light.y=C()[1];
  await sayShot('5.1',{to:1});
  await sayShot('5.1',{from:1,to:2,cues:[['CARE',()=>{D.go(pan[0],{k:1},700,'back');AU.sfx('chime')}],['SHARE',()=>{D.go(pan[1],{k:1},700,'back');AU.sfx('chime')}],['GRATEFUL',()=>{D.go(pan[2],{k:1},700,'back');AU.sfx('chime')}]]});
  pan.forEach(p=>D.go(p,{c:1},1600,'io'));D.go(ring,{k:1},1600);light.sparkle();
  await sayShot('5.1',{from:2});await D.late();await D.wait(600)}
async function shot5_2(){mood('warm');const s=mkScene('prosperity');creamBg(s,P.turmeric,P.ivory);D.setScene(s,1300);const comp=s.comp;const lotL=grp(comp),medL=grp(comp),dL=grp(comp);
  const light=s.light=mkLight(grp(comp));const C=()=>LP([889,470],[500,760]);
  const big=bigLotus(lotL,{r:170});big.openO=0;big.openI=0;
  /* the five motifs around the lotus, each in a Madhubani frame, all the same size: wealth is one part of prosperity, not the whole */
  const five=[g=>blessArt(g,'coins'),g=>blessArt(g,'family'),g=>kindArt(g,'colours'),g=>{[-40,0,40].forEach((x,i)=>{const sp=sprig(g,.7,P.leaf);sp.setAttribute('transform',`translate(${x} 50) scale(.7) rotate(${(i-1)*14})`)});[[-30,-30],[20,-40],[46,-10]].forEach(([x,y],i)=>{const f=tinyFlower(g,12,i%2?P.pink:P.turmeric);tf(f,x,y,1)})},
    g=>{const d=diya(g,{col:P.terra});d.lit=1;d.s=1.1;d.y=36;g._d=d}];
  const meds=five.map((fn,i)=>{const g=grp(medL);circ(g,0,0,92,Pat.u('vine',P.leaf,P.ivory,.5),4);circ(g,0,0,80,P.ivory,4);const cl=clipIn(g,ellD(0,0,76,76));const pic=grp(grp(g,{'clip-path':cl}),{transform:'scale(.78)'});fn(pic);return{g,pic,k:0}});
  /* a quiet callback: the gratitude diyas the child lit in Shot 3.3 glow among the lotus petals */
  const sel=MEM.gratitude;const cds=sel.map((k,i)=>{const d=diya(dL,{col:i%2?P.terra:P.ochre});d.lit=0;return d});
  s.parts.push({update:(dt,t)=>{const c=C();big.x=c[0];big.y=c[1]+LP(120,120);big.s=LP(1.25,1.1);big.update(t);
    meds.forEach((m,i)=>{const a=-Math.PI/2+i/5*TAU;tf(m.g,c[0]+Math.cos(a)*LP(560,330),c[1]+Math.sin(a)*LP(300,520),Math.max(.001,m.k)*LP(1,.9));op(m.g,m.k>0?1:0);if(m.pic._d)m.pic._d.update(t)});
    cds.forEach((d,i)=>{const n=cds.length;const a=-Math.PI/2+(i-(n-1)/2)*.42;d.x=c[0]+Math.cos(a)*LP(200,180);d.y=c[1]+Math.sin(a)*LP(150,150)+LP(30,40);d.s=LP(.5,.45);d.update(t)});light.update(dt,t)}});
  light.vis=true;light.x=C()[0]-LP(400,300);light.y=C()[1]-LP(300,420);
  await D.wait(500);D.go(big,{openO:1},2400,'io');Timers.add(1400,()=>D.go(big,{openI:1},2000,'io'));
  const pop=async()=>{for(const m of meds){D.go(m,{k:1},600,'back');AU.sfx('pop');await D.wait(D.fast?5:500)}for(const d of cds){tw(d,{lit:1},600).catch(()=>{});AU.sfx('bell');await D.wait(D.fast?5:300)}};
  light.travel([C(),[C()[0]+LP(400,300),C()[1]-LP(300,420)]],5000,'io').catch(()=>{});
  await sayShot('5.2',{to:1,cues:[['prosperity',()=>pop().catch(()=>{})]]});await sayShot('5.2',{from:1});await D.late();await D.wait(800)}
async function shot5_3(){mood('warm');const s=homeStage({state:HOME3});const H=s.H,F=s.F,light=s.light;homeLights(H,false);H.diyas.forEach((d,i)=>d.own=i%2?0:1);D.setScene(s,1400);
  for(const k in F)F[k].vis=false;
  const P53={gran:[[640,790,.95],[330,1040,.85]],girl:[[1000,792,.95],[520,1320,.95]],boy:[[1170,782,.95],[700,1310,.95]],little:[[1320,792,.95],[860,1320,.95]],
    mother:[[330,790,.95],[150,1040,.85]],father:[[1460,790,.95],[850,1040,.85]],neighbour:[[700,780,.95],[390,1300,.9]]};
  for(const k in P53){F[k].vis=true;placeP(F[k],P53[k][0],P53[k][1],true)}
  F.girl.hold('diya');F.little.hold('diya');F.girl.set('hold');F.little.set('hold');F.boy.set('reach');F.boy.f=-1;F.neighbour.smile=1;
  const c=s.toHome(0,-480);light.vis=true;light.x=c[0];light.y=c[1];
  const sky=[];for(let i=0;i<14;i++){const g=grp(s.motL);if(i%2)star4(g,0,0,14,P.turmeric);else tinyFlower(g,14,i%4?P.pink:P.ivory);sky.push({g,k:0,i})}
  s.parts.push({update:(dt,t)=>sky.forEach(o=>{const u=(o.i*.618)%1;tf(o.g,LP(240+u*1300,130+u*740),LP(80+((o.i*37)%5)*28,140+((o.i*37)%5)*50),o.k,t*20);op(o.g,o.k>0?1:0)})});
  await D.wait(700);
  const act=(async()=>{/* the children place their diyas along the entrance */for(const k of['girl','little']){F[k].set('place');await D.wait(600);F[k].hold(null);F[k].set('idle')}
    H.diyas.forEach((d,i)=>tw(d,{own:1},600).catch(()=>{}));AU.sfx('tink');
    /* the boy shares sweets with the neighbour, who smiles */F.boy.hold('sweet');F.boy.set('offer');await D.wait(900);F.boy.hold(null);F.neighbour.hold('sweet');F.neighbour.smile=2;
    /* Grandmother blesses the children */F.gran.set('up');F.gran.smile=2;for(const o of sky){tw(o,{k:1},500).catch(()=>{});await D.wait(D.fast?5:120)}})().catch(()=>{});
  s.cam.fx=LP(889,500);s.cam.fy=LP(240,500);
  await sayShot('5.3');await act;D.go(s.cam,{z:1.06},3000,'io');await D.late();await D.wait(1200)}
async function shot5_4(){mood('wonder');Music.mood('festive');const s=homeStage({state:HOME3,tod:'evening'});const H=s.H,F=s.F,light=s.light;homeLights(H,false);D.setScene(s,1600);
  /* the only Night Indigo sky of the episode, with decorative stars and many tiny lights */
  for(const k in F)F[k].vis=false;const P54={gran:[[640,790,.95],[330,1040,.85]],girl:[[1000,792,.95],[520,1320,.95]],boy:[[1170,782,.95],[700,1310,.95]],little:[[1320,792,.95],[860,1320,.95]],mother:[[330,790,.95],[150,1040,.85]],father:[[1460,790,.95],[850,1040,.85]]};
  for(const k in P54){F[k].vis=true;placeP(F[k],P54[k][0],P54[k][1],true);F[k].smile=2}
  const tiny=grp(s.motL);const r=rng(9);const pts_=[];for(let i=0;i<60;i++){const d=circ(tiny,0,0,i%3?3.4:5,i%2?P.turmeric:P.gold,0);pts_.push({d,u:r(),v:r(),ph:r()*TAU})}const tk={k:0};
  const circle=grp(s.motL);const cl=[];for(let i=0;i<16;i++){const g=grp(circle);circ(g,0,0,12,P.gold,2);circ(g,0,0,7,P.turmeric,0);cl.push(g)}const ck={k:0};
  s.parts.push({update:(dt,t)=>{const top=LP(330,560);pts_.forEach(p=>{p.d.setAttribute('cx',f1(LP(200,140)+p.u*LP(1380,720)));p.d.setAttribute('cy',f1(LP(70,140)+p.v*top*.8));p.d.setAttribute('r',f1((2.4+1.4*Math.sin(t*1.2+p.ph)*MV())*tk.k+.01))});
    op(tiny,tk.k>0?1:0);const c=LP([889,150],[500,300]);cl.forEach((g,i)=>{const a=i/16*TAU+t*.1;tf(g,c[0]+Math.cos(a)*LP(150,120)*ck.k,c[1]+Math.sin(a)*LP(60,80)*ck.k,ck.k)});op(circle,ck.k>0?1:0)}});
  const st=s.toHome(0,-180);light.vis=true;light.x=st[0];light.y=st[1];light.glowK=.8;
  await D.wait(600);
  const rise=(async()=>{const c=LP([889,150],[500,300]);D.go(tk,{k:1},3000);await light.travel([[st[0],st[1]-LP(200,250)],[c[0],c[1]+LP(40,40)]],4600,'io');light.sparkle();D.go(ck,{k:1},1800,'out');D.go(light,{glowK:1},1200)})().catch(()=>{});
  const lightUp=(async()=>{for(const d of H.diyas){tw(d,{own:1},500).catch(()=>{});await D.wait(D.fast?5:220)}for(const r_ of H.ring){tw(r_.d,{lit:1},500).catch(()=>{});await D.wait(D.fast?5:180)}})().catch(()=>{});
  await sayShot('5.4');await rise;await lightUp;await D.late();await D.wait(1200)}
async function shot5_5(){mood('warm');Music.swell();const s=mkScene('blessing');
  s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha;el('rect',{x:-4,y:-4,width:W+8,height:H+8,fill:Pat.u('flora',P.turmeric,P.verm,1.2)},this.bg);
    el('rect',{x:W*.12,y:H*.12,width:W*.76,height:H*.76,rx:30,fill:P.ivory,stroke:K,'stroke-width':5},this.bg)};
  D.setScene(s,1400);const comp=s.comp;const frL=grp(comp),famL=grp(comp);const light=s.light=mkLight(grp(comp));
  /* a frame of lotus and diya motifs; the middle stays clear */
  const fr=[];for(let i=0;i<14;i++){const g=grp(frL);if(i%2){const l=lotus(g,{r:30,n:5,open:.9,pad:false});g._l=1}else{const d=diya(g,{col:P.terra});d.lit=1;d.s=.55;g._d=d}fr.push(g)}
  const F=s.F=mkFamily(famL,['mother','gran','girl','boy','little','father']);const P55=[[350,760],[570,770],[790,780],[990,780],[1190,780],[1420,760]],P55p=[[150,1440],[320,1450],[440,1460],[560,1460],[690,1450],[860,1440]];
  Object.keys(F).forEach((k,i)=>{placeP(F[k],[P55[i][0],P55[i][1],.85],[P55p[i][0],P55p[i][1],.56],true);F[k].smile=2});
  const flw=flowerRing(s,frL,24,LP(780,440),LP(330,640));
  s.parts.push({update:(dt,t)=>{const c=LP([889,405],[500,750]),rx=LP(760,430),ry=LP(330,640);fr.forEach((g,i)=>{const a=i/14*TAU;tf(g,c[0]+Math.cos(a)*rx,c[1]+Math.sin(a)*ry,1);g._d&&g._d.update(t)});flw.x=c[0];flw.y=c[1];updFamily(F,dt,t);light.update(dt,t)}});
  light.vis=true;light.x=LP(889,500);light.y=LP(150,320);
  await D.wait(700);for(const k in F){F[k].set(['up','gesture','up'][Object.keys(F).indexOf(k)%3]);await D.wait(D.fast?5:150)}
  await sayShot('5.5',{to:2,cues:[['bless',()=>D.go(flw,{k:1},2000)]]});light.sparkle();
  for(const k in F)F[k].set('idle');await sayShot('5.5',{from:2});await D.late();await D.wait(800)}
async function shot5_6(){mood('warm');const s=mkScene('end');
  s.paintBg=function(){this.bg.innerHTML='';el('rect',{x:-4,y:-4,width:L.W+8,height:L.Ha+8,fill:P.verm},this.bg)};
  D.setScene(s,1400);const comp=s.comp;const dl=[];const cols=LP(12,6),rows=LP(6,10);for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const d=diya(comp,{col:(r+c)%2?P.terra:P.ochre});d.lit=1;d.s=LP(.55,.5);dl.push({d,r,c})}
  const pet=[];for(let i=0;i<10;i++){const g=grp(comp);shp(g,'M0 0Q8 -10 0 -20Q-8 -10 0 0Z',i%2?P.pink:P.turmeric,2);pet.push({g,u:Math.random(),v:Math.random(),sp:.03+Math.random()*.03})}
  s.parts.push({update:(dt,t)=>{const R=L.portrait?REF.p:REF.l;dl.forEach(o=>{o.d.x=(o.c+.5)/cols*R.w;o.d.y=(o.r+.7)/rows*R.h;o.d.update(t)});
    pet.forEach(p=>{p.u=(p.u+dt*p.sp*MV())%1;tf(p.g,p.u*R.w,p.v*R.h+Math.sin(t+p.v*9)*30,1.4,t*40+p.v*300)})}});
  const card=$('endCard'),T_=$('endT');T_.style.opacity='0';card.hidden=false;await D.wait(80);T_.style.opacity='1';
  await D.wait(D.fast?5:1200);await sayShot('5.6');await D.wait(D.fast?5:4500);$('endRow').hidden=false}
