/* ================= EP03_SC01_HOME: THE LITTLE GOLDEN LIGHT'S SURPRISE ================= */
/* the finished Diwali home from Episode 2: garlands, completed rangoli, diyas round the rangoli */
const HOME3={garland:[1,1,1,1,1],rangoli:{dots:1,petal:1,diamond:1,leaf:1,circle:1},ring:[1,1,1,1,1,1],lit:0,puja:1};
HOMEV.door={l:[889,856,1.55],p:[500,1150,1.45]};
function homeLights(H,on){H.diyas.forEach(d=>d.own=on?1:0);H.ring.forEach(r=>r.d.lit=on?1:0)}
/* two folk peacocks on the ground at either side of the house */
function addPeacocks(s){const pk=[peacock(s.propL),peacock(s.propL)];s.parts.push({update:(dt,t)=>{const a=s.view==='wide'?LP([[250,708,1],[1528,708,-1]],[[200,690,.8],[800,690,-.8]]):null;
  pk.forEach((p,i)=>{if(!a){show(p,false);return}show(p,true);p.setAttribute('transform',`translate(${a[i][0]} ${a[i][1]+Math.sin(t*.8+i)*2*MV()}) scale(${a[i][2]} ${Math.abs(a[i][2])})`)})}})}
/* the title scene behind the title card: lotus and diya motifs framing the middle, the Light floating in */
function titleStage(){const s=mkScene('title');s.paintBg=function(){this.bg.innerHTML='';el('rect',{x:-4,y:-4,width:L.W+8,height:L.Ha+8,fill:Pat.u('flora',P.turmeric,P.verm,1.2)},this.bg)};
  const g=grp(s.comp);const items=[];for(let i=0;i<10;i++){const it=grp(g);if(i%2){lotus(it,{r:40,n:7,open:.9})}else{const d=diya(it,{col:P.terra});d.lit=1;d.s=.7;it._d=d}items.push(it)}
  const light=s.light=mkLight(s.comp);light.vis=true;light.x=LP(-100,-100);light.y=LP(300,500);
  s.tick=(dt,t)=>{const c=LP([889,400],[500,700]),rx=LP(700,420),ry=LP(320,560);items.forEach((it,i)=>{const a=i/10*TAU;tf(it,c[0]+Math.cos(a)*rx,c[1]+Math.sin(a)*ry,1);it._d&&it._d.update(t)});light.update(dt,t)};
  Timers.add(400,()=>light.travel([LP([300,160],[200,240])],2600).catch(()=>{}));return s}
async function shot1_1(){mood('warm');Music.mood('home');Music.setLevel(.45,3);
  const s=homeStage({state:HOME3});const H=s.H,light=s.light;homeLights(H,false);for(const k in s.F)s.F[k].vis=false;addPeacocks(s);D.setScene(s,1200);
  light.x=LP(-120,-90);light.y=LP(330,560);light.vis=true;
  await D.wait(700);
  const fly=light.travel(LP([[380,300],[640,360],[760,380]],[[200,480],[330,560],[380,600]]),4000,'io').catch(()=>{});
  /* the diyas light one after another */
  const lightUp=(async()=>{await D.wait(D.fast?5:900);for(let i=0;i<H.diyas.length;i++){tw(H.diyas[i],{own:1},500,'out').catch(()=>{});AU.sfx('tink');await D.wait(D.fast?5:260)}
    for(const r of H.ring){tw(r.d,{lit:1},500).catch(()=>{});await D.wait(D.fast?5:200)}})().catch(()=>{});
  await sayShot('1.1');await fly;await lightUp;await D.late();
  /* the camera moves slowly toward the doorway and on through the entrance */
  const d=s.toHome(0,-180);s.cam.fx=d[0];s.cam.fy=d[1];D.go(light,{x:d[0],y:d[1]},2200,'io');await D.tw(s.cam,{z:1.08},2600,'io')}
const SEAT12={father:[[230,790,.85,1],[130,1150,.7,1]],mother:[[400,790,.85,1],[300,1150,.7,1]],little:[[590,800,.9,1],[180,1420,.85,1]],
  girl:[[1190,800,.9,1],[420,1420,.85,1]],boy:[[1370,800,.9,1],[640,1420,.85,1]],gran:[[1560,792,.88,1],[860,1180,.8,1]]};
async function shot1_2(){mood('warm');Music.mood('warm');const s=pujaStage();D.setScene(s,1400);seat(s.F,SEAT12);const F=s.F,light=s.light;const a=s.A();
  light.vis=true;light.x=a.light[0];light.y=a.light[1];
  await D.wait(800);
  const act=(async()=>{F.gran.hold('flowers');F.gran.set('offer');await D.wait(1600);
    const fl=motifPart(s,s.motL,'flower',F.gran.x-LP(60,40),F.gran.y-LP(200,160),.5);D.go(fl,{s:1},300);await D.tw(fl,{x:a.altar[0]+LP(120,90),y:a.altar[1]-LP(20,10)},1600,'io');F.gran.hold(null);F.gran.set('idle');
    for(const k of['girl','boy','little','mother','father']){F[k].set('namaste');await D.wait(D.fast?5:200)}light.pulse()})().catch(()=>{});
  await sayShot('1.2');await act;await D.wait(800);light.pulse();await D.late()}
async function shot1_3(){mood('excited');const s=mkScene('sweets');
  s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha,fy=toStage(0,LP(520,900))[1];el('rect',{x:-4,y:-4,width:W+8,height:fy+8,fill:Pat.u('flora',P.turmeric,P.turq,1.1)},this.bg);
    shp(this.bg,`M-4 ${f1(fy)}H${W+4}V${H+4}H-4Z`,Pat.u('petals',P.turmeric,P.terra,1),4)};
  D.setScene(s,1200);const comp=s.comp;const famL=grp(comp),plL=grp(comp),handL=grp(comp),lightL=grp(comp);
  const F=s.F=mkFamily(famL,['girl']);const c1=F.girl;c1.vis=false;placeP(c1,[1270,900,1.6],[700,1460,1.5],true);
  const pl=grp(plL);sweetsPlate(pl);const sw=grp(handL);circ(sw,0,0,12,P.turmeric,2.6);circ(sw,-3,-3,3.4,P.ivory,0);
  const arm=grp(handL);const ink=el('path',{fill:'none',stroke:K,'stroke-width':26,'stroke-linecap':'round'},arm);const skn=el('path',{fill:'none',stroke:P.ochre,'stroke-width':18,'stroke-linecap':'round'},arm);
  const hand=circ(arm,0,0,15,P.ochre,3);const hk={k:0,carry:0};
  const light=s.light=mkLight(lightL);s.fx=fxLayer(s);light.vis=true;light.x=LP(560,260);light.y=LP(380,700);
  s.cam.fx=LP(889,500);s.cam.fy=LP(560,1000);s.cam.z=1.08;
  s.tick=(dt,t)=>{const p=LP([889,560],[500,960]);tf(pl,p[0],p[1],LP(2.6,2.2));const sx=p[0]+LP(30,26),sy=p[1]-LP(36,30);const W=LP(1900,1150);
    const hx=lerp(W,sx,hk.k),hy=lerp(sy-80,sy,hk.k);ink.setAttribute('d',`M${W+100} ${f1(hy+120)}L${f1(hx)} ${f1(hy)}`);skn.setAttribute('d',`M${W+100} ${f1(hy+120)}L${f1(hx)} ${f1(hy)}`);hand.setAttribute('cx',f1(hx));hand.setAttribute('cy',f1(hy));
    tf(sw,hk.carry?hx:sx,hk.carry?hy-10:sy,LP(2,1.7));updFamily(F,dt,t);light.update(dt,t)};
  await D.wait(700);
  /* the Light turns toward the sweets, its eyes widen, a sparkle above its head */
  D.go(light,{look:1,tilt:10},800);await D.wait(600);light.pulse();s.fx.burst(light.x,light.y-LP(110,90),4,'spark',1);AU.sfx('sparkle');
  await sayShot('1.3',{to:2});
  /* a child's hand reaches in from the right and picks up a sweet; the child appears, excited, and turns to the family */
  await D.tw(hk,{k:1},1200,'io');hk.carry=1;AU.sfx('pop');await D.tw(hk,{k:0},1000,'io');
  D.go(s.cam,{z:1},1600,'io');c1.vis=true;c1.smile=2;c1.hold('sweet');c1.set('up');await D.wait(900);c1.f=-1;c1.tiltH=-8;c1.set('offer');
  await sayShot('1.3',{from:2});await D.late();await D.wait(500)}
async function shot1_4(){mood('warm');const s=homeStage({view:'puja',state:HOME3});homeLights(s.H,true);s.H.pujaLit=1;D.setScene(s,1300);const F=s.F,light=s.light;
  for(const k in F)F[k].vis=false;
  const P14={gran:[[700,808,.92],[300,1345,.74]],girl:[[1000,812,.92],[520,1360,.7]],boy:[[1220,812,.92],[690,1360,.7]],little:[[1420,816,.92],[860,1366,.7]],neighbour:[[271,770,1.0],[150,1320,.78]]};
  for(const k in P14){F[k].vis=true;placeP(F[k],P14[k][0],P14[k][1],true)}
  F.girl.smile=2;F.gran.tiltH=8;F.gran.smile=1;F.neighbour.smile=1;F.boy.set('hold');
  const plate=grp(s.propL);sweetsPlate(plate);s.parts.push({update:()=>{const T=F.boy.armR.T||[0,0];const w=F.boy.world(lerp(F.boy.armL.T?F.boy.armL.T[0]:0,T[0],.5),T[1]-6);tf(plate,w[0],w[1],LP(.55,.42))}});
  const fr=s.toHome(321,-230);light.vis=true;light.x=fr[0]+LP(260,200);light.y=fr[1]-LP(120,220);light.glowK=.5;
  const sp=sparkleRing(s,s.motL,12);s.parts.push({update:()=>{sp.x=LP(1050,500);sp.y=LP(560,1150);sp.r=LP(520,380)}});
  await D.wait(700);
  await sayShot('1.4',{to:2,cues:[['smiles',()=>{F.gran.smile=2;F.gran.nod=1;Timers.add(700,()=>F.gran.nod=0)}],['wonderful idea',()=>F.gran.set('gestureL')]]});
  await sayShot('1.4',{from:2,to:3,cues:[['sparkles',()=>{D.go(light,{glowK:1},1200);light.sparkle();D.go(sp,{k:1},900)}]]});
  /* the sweets plate starts toward the neighbour at the open doorway */
  placeP(F.boy,[560,812,.92],[380,1360,.7]);
  await sayShot('1.4',{from:3});await D.late();
  /* the sparkles gather into three decorative panels */
  D.go(sp,{r:LP(140,120)},900,'in');await D.wait(900)}
