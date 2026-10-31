/* ================= EP03_SC03_GRATITUDE: THE LIGHT OF GRATITUDE ================= */
const GRAT=[{k:'family',label:'FAMILY',art:'family'},{k:'friends',label:'FRIENDS',art:'friends'},{k:'health',label:'HEALTH',art:'play'},{k:'learning',label:'LEARNING',art:'book'}];
/* a row of lit diyas along the bottom of the picture (the decorative foreground border) */
function diyaBorder(s,parent,n){const ds=[];for(let i=0;i<n;i++){const d=diya(parent,{col:i%2?P.terra:P.ochre});d.lit=1;ds.push(d)}
  s.parts.push({update:(dt,t)=>ds.forEach((d,i)=>{const u=(i+.5)/n;d.x=LP(lerp(240,1538,u),lerp(150,850,u));d.y=LP(770,1450);d.s=LP(.55,.45);d.update(t)})});return ds}
async function shot3_1(){mood('gentle');Music.mood('warm');Music.setLevel(.4,2);const s=pujaStage();D.setScene(s,1300);const F=s.F,light=s.light;op(s.mainDiya.g,0);s.mainDiya.update=()=>{};
  seat(F,{gran:[[889,700,.95,1],[500,1180,.85,1]],girl:[[600,712,.9,1],[230,1250,.8,1]],boy:[[1180,712,.9,1],[770,1250,.8,1]],little:[[440,716,.9,1],[180,1040,.75,1]],
    mother:[[1350,700,.85,1],[820,1040,.72,1]],father:[[260,700,.85,1],[110,1150,.7,1]]});
  diyaBorder(s,s.frontL,9);light.vis=true;light.x=LP(1270,780);light.y=LP(470,900);
  await D.wait(800);
  await sayShot('3.1',{cues:[['sits together',()=>{F.girl.tiltH=6;F.boy.tiltH=-6;F.little.tiltH=6}],['asks',()=>{F.gran.tiltH=-6;F.gran.set('gesture')}],
    ['grateful',()=>{Timers.add(600,()=>{F.boy.set('up');F.girl.smile=2})}]]});
  await D.late();await D.wait(600)}
/* a close-up: one person large, with a small symbolic picture in a floral frame beside them */
function closeStage(kind,art,o){o=o||{};const s=mkScene('close_'+kind);
  s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha;el('rect',{x:-4,y:-4,width:W+8,height:H+8,fill:Pat.u('flora',P.pink,P.ivory,1.1)},this.bg);
    shp(this.bg,`M0 0H${W}V${H}H0Z M${W*.05} ${H*.05}V${H*.95}H${W*.95}V${H*.05}Z`,Pat.u('vine',P.leaf,P.ivory,.7),0,{'fill-rule':'evenodd'})};
  const comp=s.comp;const medL=grp(comp),famL=grp(comp),fxL=grp(comp);const F=s.F=mkFamily(famL,[kind]);const p=F[kind];
  placeP(p,[600,880,kind==='gran'?1.5:2.1],[500,1480,kind==='gran'?1.55:2.2],true);p.smile=1;
  const m=grp(medL);const halo_=grp(m);rings(halo_,150,{n:2,step:.12,w:5});blessMedal(m,art,{r:120});const mk={k:0};
  const fl=[];for(let i=0;i<7;i++){const f=tinyFlower(fxL,14,[P.pink,P.turmeric,P.leaf][i%3]);fl.push({f,i})}
  s.parts.push({update:(dt,t)=>{const c=LP([1200,360],[500,420]);tf(m,c[0],c[1],Math.max(.001,mk.k)*LP(1.2,1.1));tf(halo_,0,0,1,t*8);
    fl.forEach(o=>{const k=clamp(mk.k*2-1,0,1)*(o.i<(o.n||7)?1:0);const a=-Math.PI/2+(o.i-3)*.35;const r=LP(170,150)+((t*30+o.i*20)%60);tf(o.f,c[0]+Math.cos(a)*r,c[1]+Math.sin(a)*r,k*(art==='book'?1:.0001));op(o.f,art==='book'&&k>0?1:0)});updFamily(F,dt,t)}});
  s.p=p;s.mk=mk;return s}
async function shot3_2(){mood('warm');
  const seq=[['girl','family','3.2a'],['boy','friends','3.2b'],['little','book','3.2c']];
  for(const [kind,art,id] of seq){const s=closeStage(kind,art);D.setScene(s,900);await D.wait(500);D.go(s.mk,{k:1},800,'back');s.p.smile=2;await sayShot(id);await D.wait(700)}
  const s=closeStage('gran','family');s.mk.k=0;D.setScene(s,900);s.p.smile=2;await D.wait(400);
  /* Grandmother smiles; small flowers bloom round the frame */
  const ring=flowerRing(s,s.comp,14,LP(520,320),LP(250,420));ring.x=LP(889,500);ring.y=LP(400,800);D.go(ring,{k:1},1200);s.p.set('gesture');
  await sayShot('3.2d');await D.late();await D.wait(500)}
/* ---- Activity 1, Shot 3.3: My Gratitude Diya. Tap any diyas you like; none is ever marked wrong ---- */
async function shot3_3(){mood('gentle');const s=mkScene('gratitude');
  s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha,fy=toStage(0,LP(470,780))[1];el('rect',{x:-4,y:-4,width:W+8,height:fy+8,fill:Pat.u('flora',P.turmeric,P.turq,1.1)},this.bg);
    shp(this.bg,`M-4 ${f1(fy)}H${W+4}V${H+4}H-4Z`,Pat.u('petals',P.turmeric,P.terra,1),4)};
  D.setScene(s,1200);const comp=s.comp;const tok=D.token;const light=s.light=mkLight(grp(comp));s.fx=fxLayer(s);s.demo=demoHand(s);
  const POS=()=>LP(GRAT.map((g,i)=>[445+i*296,560]),[[300,820],[700,820],[300,1300],[700,1300]]);
  const D4=GRAT.map((gq,i)=>{const g=grp(comp);const halo_=grp(g);const ring=target(g,LP(120,130));const md=grp(g);blessMedal(md,gq.art,{r:LP(74,70)});
    const dy=diya(g,{col:i%2?P.terra:P.ochre});dy.lit=0;const fr=grp(g);for(let j=0;j<10;j++){const a=j/10*TAU;const f=tinyFlower(fr,13,j%2?P.pink:P.turmeric);tf(f,Math.cos(a)*LP(110,110),Math.sin(a)*LP(60,60)+10,1)}
    const pill=el('rect',{x:-90,y:LP(66,66),width:180,height:46,rx:23,fill:P.ivory,stroke:K,'stroke-width':3},g);const lb=el('text',{'text-anchor':'middle','font-family':'"Baloo 2","Trebuchet MS",sans-serif','font-weight':800,'font-size':38,fill:K,'letter-spacing':2},g);lb.textContent=gq.label;
    return{...gq,i,g,halo:halo_,ring,md,dy,fr,lb,on:false,lit:0,x:0,y:0}});
  s.parts.push({update:(dt,t)=>{const P_=POS();D4.forEach(o=>{if(!o.moved){o.x=P_[o.i][0];o.y=P_[o.i][1]}tf(o.g,o.x,o.y,LP(1,.95));
    tf(o.md,0,-LP(200,190),1);o.dy.y=10;o.dy.s=1.3;o.dy.lit=o.lit;o.dy.update(t);op(o.fr,o.lit);if(o.lit)tf(o.fr,0,0,.9+.1*o.lit,t*6);
    o.lb.setAttribute('x',0);o.lb.setAttribute('y',LP(96,96));o.ring.on=o.on?0:(s.active?1:0);o.ring.x=0;o.ring.y=-20;o.ring.update(t)});light.update(dt,t)}});
  light.vis=true;light.x=LP(889,500);light.y=LP(150,520);
  await sayShot('3.3');
  let res;const doneP=new Promise(r=>res=r);let doneBtn=null;
  const select=o=>{if(o.on){AU.sfx('soft');return}o.on=true;tw(o,{lit:1},700,'out').catch(()=>{});AU.sfx('bell');light.sparkle();if(doneBtn)doneBtn.hidden=false};
  const els=D.controls([{id:'bDone',cls:'lotusbtn',html:ICON.lotus+'Done',hidden:true,on:()=>{if(D4.some(o=>o.on))res()}}]);doneBtn=els.bDone;
  s.active=true;
  s.down=p=>{const o=D4.find(o=>Math.abs(p.x-o.x)<LP(140,170)&&p.y>o.y-LP(280,270)&&p.y<o.y+LP(120,120));if(o)select(o);else{s.fx.burst(p.x,p.y,4,'spark');AU.sfx('sparkle')}};
  s.hots=()=>D4.map(o=>({id:'d'+o.i,label:o.label+' diya'+(o.on?', lit':': tap to light it'),x:o.x,y:o.y-LP(60,60),r:LP(120,130),on:()=>select(o)}));
  await D.ask(INS.diya,null,'tap');
  /* idle: the Light hovers by the diyas; then it lights FAMILY itself and the story goes on */
  await D.task({start(t){doneP.then(()=>t.finish())},demo(){light.travel([[D4[0].x,D4[0].y-LP(320,300)]],900).catch(()=>{});light.pulse();s.demo.tap(D4[0].x,D4[0].y-LP(40,40),2).catch(()=>{})},
    async assist(t){if(!D4.some(o=>o.on)){await light.travel([[D4[0].x,D4[0].y-LP(120,120)]],D.fast?20:900);select(D4[0]);await D.wait(D.fast?5:1500)}res();t.finish()}});
  await doneP;D.guard(tok);s.active=false;s.down=null;s.hots=null;D.clearAct();
  const sel=D4.filter(o=>o.on).map(o=>o.k);MEM.gratitude=sel;Store.gratitude(sel);AU.sfx('done');
  /* the diyas arrange themselves into a circle */
  const c=LP([889,430],[500,800]),R=LP(250,280);D4.forEach((o,i)=>{o.moved=true;const a=-Math.PI/2+i/4*TAU;tw(o,{x:c[0]+Math.cos(a)*R,y:c[1]+Math.sin(a)*R*.85+LP(120,120)},1600,'io').catch(()=>{})});
  light.travel([[c[0],c[1]+LP(60,60)]],1400).catch(()=>{});await D.wait(1800)}
async function shot3_4(){mood('warm');const s=mkScene('circle');
  s.paintBg=function(){this.bg.innerHTML='';el('rect',{x:-4,y:-4,width:L.W+8,height:L.Ha+8,fill:Pat.u('petals',P.turmeric,P.terra,1.2)},this.bg)};
  D.setScene(s,1200);const comp=s.comp;const manL=grp(comp),famL=grp(comp),dL=grp(comp);const light=s.light=mkLight(grp(comp));s.fx=fxLayer(s);
  const c=()=>LP([889,430],[500,780]);const R=()=>LP(230,260);
  /* the mandala: rings, a petal ring and a geometric ring that join the diyas, then grow outward */
  const man=grp(manL);rings(man,300,{n:3,step:.12,w:6,c1:P.turmeric,c2:P.ivory,dots:18});const pr=grp(man);for(let i=0;i<16;i++){const p=grp(pr,{transform:`rotate(${i*22.5}) translate(0 -260)`});shp(p,'M0 30C-22 8 -18 -20 0 -34C18 -20 22 8 0 30Z',i%2?P.pink:P.coral,3)}
  circ(man,0,0,180,Pat.u('grid',P.verm,P.turmeric,.8),4);circ(man,0,0,120,P.ivory,4);const mk={s:1,k:0};
  const F=s.F=mkFamily(famL,['gran','mother','father','girl','boy','little']);const ring=[['gran',-90],['mother',-150],['father',-30],['girl',150],['boy',30],['little',90]];
  const sel=MEM.gratitude.length?MEM.gratitude:['family'];
  const ds=GRAT.map((gq,i)=>{const d=diya(dL,{col:i%2?P.terra:P.ochre});d.lit=sel.includes(gq.k)?1:0;return d});
  s.parts.push({update:(dt,t)=>{const C=c(),r=R();tf(man,C[0],C[1],mk.s*LP(1,1.05),t*4*MV());op(man,clamp(mk.k,0,1));
    ds.forEach((d,i)=>{const a=-Math.PI/2+i/4*TAU;d.x=C[0]+Math.cos(a)*r*mk.s;d.y=C[1]+Math.sin(a)*r*mk.s+20;d.s=LP(1,1)*(1+(d.lit?.06*Math.sin(t*TAU/2.4)*MV():0));d.update(t)});
    ring.forEach(([k,a])=>{const p=F[k];const rr=LP(420,400)*Math.min(mk.s,1.2);p.x=C[0]+Math.cos(a*DEG)*rr*LP(1.6,1);p.y=C[1]+Math.sin(a*DEG)*rr*LP(.9,1.05)+LP(150,170);p.s=LP(.62,.5);p.update(dt,t);op(p.g,clamp(2-mk.s,0,1))});light.update(dt,t)}});
  for(const k in F){F[k].set('namaste');F[k].smile=1}
  light.vis=true;light.x=c()[0];light.y=c()[1]-LP(40,40);
  await D.wait(600);D.go(mk,{k:1},1200);
  await sayShot('3.4',{cues:[['beautiful lights',()=>{AU.sfx('chime');light.pulse()}]]});await D.late();
  /* the circle grows into a lotus mandala; the Light floats toward the puja space */
  D.go(mk,{s:2.2},2400,'io');light.travel([[c()[0],LP(80,160)]],2200).catch(()=>{});await D.wait(2200)}
