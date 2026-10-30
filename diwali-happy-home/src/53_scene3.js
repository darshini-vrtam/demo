/* ================= SCENE 3: THE THREE LITTLE SECRETS ================= */
/* a cream wall with small floral motifs and a patterned floor, for the two vignettes */
function wallStage(id){const s=mkScene(id);s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha;const fy=toStage(0,LP(640,1180))[1];
    el('rect',{x:-4,y:-4,width:W+8,height:fy+8,fill:Pat.u('flora',P.gold,P.ivory,1)},this.bg);shp(this.bg,`M-4 ${f1(fy-30)}H${W+4}V${f1(fy)}H-4Z`,Pat.u('grid',P.verm,P.ivory,.9),3);
    shp(this.bg,`M-4 ${f1(fy)}H${W+4}V${H+4}H-4Z`,Pat.u('petals',P.gold,P.terra,1),4)};
  const comp=s.comp;s.backL=grp(comp);const famL=grp(comp);s.motL=grp(comp);const lightL=grp(comp);s.F=mkFamily(famL,['gran','girl','boy']);s.light=mkLight(lightL);s.light.vis=false;s.fx=fxLayer(s);
  s.tick=(dt,t)=>{updFamily(s.F,dt,t);s.light.update(dt,t)};return s}
/* a small flower basket the girl carries */
function basket(parent){const g=grp(parent);shp(g,'M-34 0H34L26 34H-26Z',Pat.u('xhatch',K,P.ochre,.6),3.4);ln(g,'M-30 0Q0 -44 30 0',K,4);[[-16,-6],[0,-10],[16,-6]].forEach(([x,y],i)=>{const m=marigold(g,10,i%2?P.gold:P.turmeric);tf(m,x,y,1)});return g}
async function shot3_1(){Store.set('scene',3);mood('gentle');Music.mood('cream');Music.setLevel(.4,2);
  const s=homeStage({view:'puja',state:DONE_STATE});s.H.lit=1;s.H.pujaLit=1;D.setScene(s,1300);rowDiyas(s.H,7);const F=s.F,light=s.light;
  /* a patterned floor mat in front of the puja area, with a small flower basket */
  const mat=grp(s.matL);const mp=()=>LP([889,770],[500,1360]);
  const matG=grp(mat);ell(matG,0,0,360,70,Pat.u('grid',P.verm,P.gold,1),4);ell(matG,0,0,330,58,'none',3,{stroke:P.ivory,'stroke-dasharray':'.1 12','stroke-width':6,'stroke-linecap':'round'});
  const bk=basket(mat);s.parts.push({update:()=>{const p=mp();tf(matG,p[0],p[1],LP(1,.8));tf(bk,p[0]+LP(330,300),p[1]+LP(-10,40),LP(1.2,1))}});
  F.mother.vis=false;F.father.vis=false;
  placeP(F.gran,[889,770,1,1],[500,1360,.85,1],true);placeP(F.girl,[640,782,.95,1],[230,1380,.85,1],true);placeP(F.boy,[1140,782,.95,1],[770,1380,.85,1],true);
  F.gran.set('idle');F.girl.set('hold');F.boy.set('hold');
  light.vis=true;light.x=LP(1190,780);light.y=LP(330,700);light.tilt=0;
  await D.wait(900);D.go(light,{tilt:14},900);
  await sayShot('3.1',{cues:[['truly beautiful',()=>{F.gran.brow=1;Timers.add(2600,()=>F.gran.brow=0)}],['shake',()=>{F.girl.shake=1;F.boy.shake=1;Timers.add(1400,()=>{F.girl.shake=0;F.boy.shake=0})}]]});
  await D.late();D.go(light,{tilt:0},600);
  /* Grandmother raises three fingers */
  F.gran.set('three');await D.wait(1400)}
async function shot3_2(){mood('warm');const s=wallStage('care');D.setScene(s,1200);const F=s.F;
  /* the vignette on the left, inside a simple floral border; Grandmother on the right */
  const vg=grp(s.backL);const vb=()=>LP([70,70,1100,700],[50,90,950,920]);
  s.parts.push({update:()=>{const b=vb();vg.innerHTML='';el('rect',{x:b[0],y:b[1],width:b[2]-b[0],height:b[3]-b[1],rx:30,fill:Pat.u('vine',P.leaf,P.ivory,.7),stroke:K,'stroke-width':5},vg);
    el('rect',{x:b[0]+26,y:b[1]+26,width:b[2]-b[0]-52,height:b[3]-b[1]-52,rx:20,fill:P.ivory,stroke:K,'stroke-width':4},vg);
    shp(vg,`M${b[0]+26} ${b[3]-140}H${b[2]-26}V${b[3]-26}H${b[0]+26}Z`,Pat.u('petals',P.gold,P.terra,.9),3)}});
  placeP(F.gran,[1400,800,1.15],[500,1460,.9],true);F.gran.set('gestureL');
  placeP(F.girl,[400,620,1.3],[300,830,1.25],true);placeP(F.boy,[760,620,1.3],[680,830,1.25],true);F.girl.set('basket');F.boy.set('idle');
  const bk=grp(s.motL);basket(bk);const bkp=()=>{const h=F.girl.world(0,-150);return h};
  const fl=[0,1,2,3].map(i=>{const g=grp(s.motL);marigold(g,14,i%2?P.gold:P.turmeric);return{g,x:0,y:0,k:0,i}});
  s.parts.push({update:()=>{const p=bkp();tf(bk,p[0],p[1],LP(1.3,1.25));fl.forEach(f=>{const sx=p[0]+(f.i-1.5)*20,sy=p[1]-10,ex=lerp(F.girl.x,F.boy.x,.25+f.i*.17),ey=F.girl.y+20;
    tf(f.g,lerp(sx,ex,f.k),lerp(sy,ey,f.k)-Math.sin(f.k*Math.PI)*-30,1.3,f.k*200);op(f.g,f.k>0.02&&f.k<1.99?1:0)})}});
  const heart=motifPart(s,s.motL,'heart',0,0,LP(1.3,1.2));const bowl=motifPart(s,s.motL,'bowl',0,0,LP(1.3,1.2));
  s.parts.push({update:()=>{heart.x=bowl.x=(F.girl.x+F.boy.x)/2;heart.y=bowl.y=F.girl.y-LP(330,420)}});
  await D.wait(900);
  /* a few flowers fall from the basket, the boy kneels to help, the girl smiles, a heart appears */
  const act=(async()=>{for(const f of fl){tw(f,{k:1},700,'in').catch(()=>{});await D.wait(160)}AU.sfx('pat');F.girl.smile=1;await D.wait(800);
    F.boy.seat=1;F.boy.lean=8;F.boy.set('reach');await D.wait(900);for(const f of fl){tw(f,{k:0},600,'io').catch(()=>{});await D.wait(200)}
    F.boy.seat=0;F.boy.lean=0;F.boy.set('idle');F.girl.smile=2;F.boy.smile=2;await D.wait(400);AU.sfx('chime');D.go(heart,{s:1},800,'back')})().catch(()=>{});
  await sayShot('3.2',{cues:[['care',()=>{}]]});
  await act;await D.late();
  /* the heart becomes a small bowl of sweets */
  D.go(heart,{s:0},600);await D.wait(300);D.go(bowl,{s:1},700,'out');await D.wait(900)}
async function shot3_3(){mood('warm');const s=wallStage('sharing');D.setScene(s,1200);const F=s.F;
  placeP(F.gran,[1400,800,1.15],[820,1460,.82],true);F.gran.set('idle');F.gran.smile=2;
  placeP(F.girl,[560,700,1.25,1],[270,1080,1.15,1],true);placeP(F.boy,[920,700,1.25,1],[620,1080,1.15,1],true);F.girl.set('hold');F.boy.set('hold');
  const pl=grp(s.motL);sweetsPlate(pl);s.parts.push({update:()=>tf(pl,(F.girl.x+F.boy.x)/2,F.girl.y+LP(20,30),LP(1.1,1.2))});
  const flower=motifPart(s,s.motL,'flower',LP(740,445),LP(250,600),LP(1.3,1.2));const sun=motifPart(s,s.motL,'sun',flower.x,flower.y,LP(1.2,1.1));
  await D.wait(800);
  /* the boy offers a sweet, the girl accepts happily, both smile */
  const act=(async()=>{F.boy.hold('sweet');F.boy.set('offer');F.boy.f=-1;await D.wait(1400);F.girl.set('offer');await D.wait(700);F.boy.hold(null);F.girl.hold('sweet');F.girl.set('hold');F.boy.set('hold');F.boy.f=1;
    F.girl.smile=2;F.boy.smile=2;F.girl.tiltH=6;F.boy.tiltH=-6;AU.sfx('chime');D.go(flower,{s:1},800,'back')})().catch(()=>{});
  await sayShot('3.3');await act;await D.late();
  /* the flower motif becomes a small golden sun */
  D.go(flower,{s:0},600);await D.wait(300);D.go(sun,{s:1},700,'out');await D.wait(900)}
async function shot3_4(){mood('gentle');const s=homeStage({view:'puja',state:DONE_STATE});s.H.lit=1;s.H.pujaLit=1;D.setScene(s,1300);rowDiyas(s.H,7);const F=s.F,light=s.light;
  placeP(F.mother,[260,820,.95],[110,1350,.72],true);placeP(F.gran,[560,808,.92],[290,1345,.72],true);placeP(F.girl,[1120,812,.9],[640,1360,.62],true);placeP(F.boy,[1290,812,.9],[790,1360,.62],true);placeP(F.father,[1560,820,.98],[930,1350,.74],true);
  for(const k in F)F[k].set('idle');
  const fr=s.toHome(321,-230);light.vis=true;light.x=fr[0]+LP(250,190);light.y=fr[1]-LP(60,220);light.glowK=.6;
  const sun=motifPart(s,s.motL,'sun',LP(889,500),LP(140,520),LP(1.1,1));
  const ringF=[];for(let i=0;i<10;i++){const g=grp(s.motL);tinyFlower(g,14,i%2?P.turmeric:P.pink);ringF.push({g,i,k:0})}
  s.parts.push({update:(dt,t)=>ringF.forEach(o=>{const u=o.i/9;tf(o.g,LP(lerp(220,1600,u),lerp(80,940,u)),LP(560,1110)+Math.sin(u*Math.PI*2+t)*16,o.k);op(o.g,o.k>0?1:0)})});
  await D.wait(800);
  const act=(async()=>{F.girl.set('namaste');F.boy.set('namaste');await D.wait(600);F.gran.nod=1;Timers.add(700,()=>F.gran.nod=0);D.go(light,{glowK:1},1200);light.pulse();
    for(const o of ringF){tw(o,{k:1},500,'out').catch(()=>{});await D.wait(120)}D.go(sun,{s:1},900,'back')})().catch(()=>{});
  await sayShot('3.4');await act;await D.late();await D.wait(800)}
async function shot3_5(){mood('warm');const s=homeStage({state:DONE_STATE});s.H.lit=1;s.H.pujaLit=1;D.setScene(s,1300);rowDiyas(s.H,7);const F=s.F,light=s.light;
  placeP(F.mother,[420,790,.95],[150,1040,.85],true);placeP(F.father,[1360,790,.95],[850,1040,.85],true);placeP(F.gran,[620,800,.95],[300,1290,.85],true);placeP(F.girl,[1060,800,.95],[560,1320,.95],true);placeP(F.boy,[1200,790,.95],[720,1310,.95],true);
  for(const k in F){F[k].set('idle');F[k].smile=1}F.gran.tiltH=6;
  const c=LP([889,560],[500,1000]);light.vis=true;light.x=c[0]+LP(-260,-200);light.y=LP(250,560);
  /* heart, flower and sun in a balanced triangle round the family */
  const tri=LP([[889,170],[330,470],[1450,470]],[[500,470],[150,780],[850,780]]);const mk=['heart','flower','sun'].map((k,i)=>motifPart(s,s.motL,k,tri[i][0],tri[i][1],LP(1,1)));
  await D.wait(700);
  const act=(async()=>{for(const m of mk){AU.sfx('chime');D.go(m,{s:1},800,'back');await D.wait(900)}F.girl.smile=2;F.boy.smile=2;F.girl.tiltH=8;F.boy.tiltH=-8;await D.wait(700);F.gran.set('gesture')})().catch(()=>{});
  await sayShot('3.5',{to:3});await act;
  light.sparkle();await sayShot('3.5',{from:3,to:4});
  /* the Light moves toward the devotional space and the motifs settle into a border */
  const pc=s.toHome(540,-300);light.travel([[pc[0],pc[1]]],2200).catch(()=>{});
  const corners=LP([[150,110],[1628,110],[889,760]],[[130,250],[870,250],[500,1450]]);mk.forEach((m,i)=>D.go(m,{x:corners[i][0],y:corners[i][1],sc:.55},1800,'io'));
  await sayShot('3.5',{from:4});await D.late();
  for(const k of['gran','girl','boy','mother','father']){const p=F[k];placeP(p,[p.x+LP(140,60),p.y,p.s],[p.x+60,p.y,p.s])}await D.wait(1300)}
