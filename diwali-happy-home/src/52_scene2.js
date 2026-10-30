/* ================= SCENE 2: LET'S PREPARE FOR LAKSHMI PUJA! ================= */
/* drag-and-place: drag an item to a target, or tap an item then tap a target. Wrong drops glide gently back; nothing is ever marked wrong */
function dragKit(s,items,targets,o){const K_={items,targets,held:null,picked:null,start:null,moved:false,
    ok:(it,tg)=>!tg.done&&(o.accept?o.accept(it,tg):true),
    hitItem(p){let b=null,bd=1e9;for(const it of items){if(it.placed)continue;const d=Math.hypot(p.x-it.x,p.y-it.y);if(d<it.r&&d<bd){bd=d;b=it}}return b},
    hitTarget(p){let b=null,bd=1e9;for(const tg of targets){if(tg.done)continue;const d=tg.hit?tg.hit(p):Math.hypot(p.x-tg.x,p.y-tg.y);if(d<(tg.r||70)&&d<bd){bd=d;b=tg}}return b},
    back(it){AU.sfx('glide');tw(it,{x:it.hx,y:it.hy,lift:0},650,'io').catch(()=>{});o.onMiss&&o.onMiss(it)},
    place(it,tg){it.placed=true;tg.done=true;this.picked=null;it.lift=0;tw(it,{x:tg.x,y:tg.y},o.fast?20:260,'out').then(()=>o.onPlace(it,tg)).catch(()=>{})},
    drop(it,p){const tg=this.hitTarget(p);if(tg&&this.ok(it,tg))this.place(it,tg);else this.back(it)}};
  s.down=p=>{const it=K_.hitItem(p);if(it){K_.held=it;K_.start=p;K_.moved=false;it.ox=it.x-p.x;it.oy=it.y-p.y;it.lift=1;AU.sfx('tap');return}
    if(K_.picked){const tg=K_.hitTarget(p);const it2=K_.picked;if(tg&&K_.ok(it2,tg)){it2.sel=0;K_.place(it2,tg)}else{it2.sel=0;K_.picked=null;K_.back(it2)}return}
    s.fx.burst(p.x,p.y,4,'spark');AU.sfx('sparkle')};
  s.move=p=>{const it=K_.held;if(!it)return;if(Math.hypot(p.x-K_.start.x,p.y-K_.start.y)>14)K_.moved=true;if(K_.moved){it.x=p.x+it.ox;it.y=p.y+it.oy}};
  s.up=p=>{const it=K_.held;if(!it)return;K_.held=null;if(K_.moved){it.sel=0;if(K_.picked===it)K_.picked=null;K_.drop(it,{x:it.x,y:it.y})}
    else{/* a tap picks the item up; the next tap on a place puts it there */if(K_.picked&&K_.picked!==it){K_.picked.sel=0}K_.picked=it;it.sel=1;it.lift=1}};
  /* keyboard and screen readers: real buttons for each item and each open place */
  s.hots=()=>items.filter(it=>!it.placed).map((it,i)=>({id:'it'+it.id,label:o.itemLabel(it),x:it.hx,y:it.hy,r:it.r,on:()=>{if(K_.picked)K_.picked.sel=0;K_.picked=it;it.sel=1}}))
    .concat(targets.filter(tg=>!tg.done&&(!o.active||o.active(tg))).map(tg=>({id:'tg'+tg.id,label:o.targetLabel(tg),x:tg.x,y:tg.y,r:tg.r||60,on:()=>{if(K_.picked){const it=K_.picked;it.sel=0;if(K_.ok(it,tg))K_.place(it,tg);else K_.back(it)}}})));
  /* the Golden Light carries the next item into place (the gentle assist) */
  K_.assistOne=async(light)=>{const it=items.find(x=>!x.placed);if(!it)return false;const tg=targets.find(t=>!t.done&&K_.ok(it,t));if(!tg)return false;
    await light.travel([[it.x,it.y-LP(70,80)]],D.fast?20:700);it.lift=1;await Promise.all([D.tw(it,{x:tg.x,y:tg.y},D.fast?20:1100,'io'),light.travel([[tg.x,tg.y-LP(70,80)]],D.fast?20:1100)]);K_.place(it,tg);await D.wait(D.fast?5:500);return true};
  return K_}
function trayBox(parent,x0,y0,x1,y1){const g=grp(parent);el('rect',{x:x0,y:y0,width:x1-x0,height:y1-y0,rx:26,fill:Pat.u('dots',P.gold,P.ivory,.8),stroke:K,'stroke-width':5},g);
  el('rect',{x:x0+10,y:y0+10,width:x1-x0-20,height:y1-y0-20,rx:18,fill:'none',stroke:P.verm,'stroke-width':3,'stroke-dasharray':'.1 12','stroke-linecap':'round'},g);return g}
/* a draggable item drawn by fn, with a breathing ring when it is picked */
function dragItem(s,parent,id,draw,x,y,r){const g=grp(parent);const ring=target(g,r);const art=grp(g);draw(art);const it={id,g,art,ring,x,y,hx:x,hy:y,r,lift:0,sel:0,placed:false,
  update(t){tf(g,0,0,1);tf(art,this.x,this.y-this.lift*6,1+.08*this.lift);this.ring.x=this.x;this.ring.y=this.y;this.ring.on=this.sel&&!this.placed?1:0;this.ring.update(t)}};s.parts.push(it);return it}
/* the activity tasks bar persists from Shot 2.1 to 2.5 */
const TASKSTATE={flowers:0,diyas:0,rangoli:0};
function addTasks(s){const T=taskIcons(s.iconL);T.show=1;T.col=s.id==='diyas'||s.id==='rangoli';TASKS.forEach(k=>T.set(k,TASKSTATE[k]));s.parts.push({update:(dt,t)=>T.update(t)});s.tasks=T;return T}
function setTask(s,k,st){TASKSTATE[k]=st;s.tasks&&s.tasks.set(k,st);if(st===2)Store.task(k)}
async function shot2_1(){Store.set('scene',2);mood('warm');let s=D.scene;
  if(!s||s.id!=='home'){s=homeStage({state:Object.assign({},START_STATE,{rangoli:{dots:1}})});D.setScene(s,0);rowDiyas(s.H,7)}
  const F=s.F,light=s.light;D.go(s.cam,{z:1},1200,'io');D.go(light,{size:1},800);
  /* the family steps out of the picture to keep it uncluttered */
  placeP(F.mother,[-200,790,.95],[-200,1040,.85]);placeP(F.father,[2000,790,.95],[1200,1040,.85]);placeP(F.girl,[2000,792,.95,0],[1300,1320,.95,0]);placeP(F.boy,[2100,782,.95],[1400,1310,.95]);
  F.gran.vis=false;F.girl.hold(null);F.boy.hold(null);
  s.motL.innerHTML='';const T=taskIcons(s.iconL);s.tasks=T;s.parts.push({update:(dt,t)=>T.update(t)});T.show=1;
  T.list.forEach((q,i)=>{q.g.style.display='none';Timers.add(300+i*400,()=>{q.g.style.display='';AU.sfx('pop')})});
  await D.wait(1600);for(const k of['mother','father','girl','boy'])F[k].vis=false;
  const p0=T.pos(0);light.travel([[p0[0]-LP(110,0),p0[1]+LP(10,120)]],1200).catch(()=>{});setTask(s,'flowers',1);
  await D.ask(INS.prepare,null,'tap');await D.late();await D.wait(400);D.clearAct()}

/* ---- Activity 1A (Shot 2.2): Decorate the Doorway ---- */
HOMEV.door={l:[889,856,1.55],p:[500,1150,1.45]};
async function shot2_2(){mood('excited');const s=homeStage({view:'door',state:Object.assign({},START_STATE,{rangoli:{dots:1}}),noFamily:true});D.setScene(s,1200);rowDiyas(s.H,7);addTasks(s);setTask(s,'flowers',1);
  const tok=D.token;const H=s.H,light=s.light;light.vis=true;const tp=LP([330,470],[150,1180]);light.x=tp[0];light.y=tp[1];
  const box=grp(s.propL);const trayPos=()=>LP([80,560,560,790],[60,1270,940,1470]);
  const slotXY=i=>s.toHome(GSLOT[i][0],GSLOT[i][1]);
  const items=[0,1,2,3,4].map(i=>dragItem(s,s.propL,i,a=>{flowerCluster(a,i).setAttribute('transform',`scale(${LP(1.5,1.7)})`)},0,0,LP(58,70)));
  const lay=()=>{const b=trayPos();box.innerHTML='';const nb=trayBox(box,b[0],b[1],b[2],b[3]);items.forEach((it,i)=>{const hx=lerp(b[0],b[2],(i+.5)/5),hy=(b[1]+b[3])/2;if(!it.placed&&it.hx!==hx){if(it.x===it.hx&&it.y===it.hy){it.x=hx;it.y=hy}it.hx=hx;it.hy=hy}})};
  lay();items.forEach(it=>{it.x=it.hx;it.y=it.hy});s.onLayout=()=>{lay();targets.forEach((t,i)=>{const p=slotXY(i);t.x=p[0];t.y=p[1]})};
  const targets=[0,1,2,3,4].map(i=>{const p=slotXY(i);return{id:i,x:p[0],y:p[1],r:LP(80,90),done:false}});
  /* only the next slot, left to right, is highlighted and accepts a flower */
  const next=()=>targets.findIndex(t=>!t.done);
  const glow=target(s.top,LP(56,60));s.parts.push({update:(dt,t)=>{const n=next();glow.on=n>=0?1:0;if(n>=0){glow.x=targets[n].x;glow.y=targets[n].y}glow.update(t)}});
  let n=0;let res;const done=new Promise(r=>res=r);
  const kit=dragKit(s,items,targets,{accept:(it,tg)=>tg.id===next(),itemLabel:it=>'Flower cluster: pick it up',targetLabel:tg=>'Glowing spot on the doorway: place the flower here',active:tg=>tg.id===next(),
    onPlace:(it,tg)=>{it.g.style.display='none';H.slots[tg.id].k=1;AU.sfx('pat');tw(H.slots[tg.id],{flash:1},200).then(()=>tw(H.slots[tg.id],{flash:0},900)).catch(()=>{});light.sparkle();n++;if(n>=5)res()},
    onMiss:()=>{tw(light,{tilt:16},400).then(()=>tw(light,{tilt:0},700)).catch(()=>{})}});
  await D.ask(INS.flowers,null,'drag');
  const first=items[0],t0=targets[0];s.demo.drag([[first.hx,first.hy],[t0.x,t0.y]],1400).catch(()=>{});
  await D.task({hint:HINT.flowers,start(t){done.then(()=>t.finish())},demo(){const it=items.find(x=>!x.placed),tg=targets[next()];if(it&&tg)s.demo.drag([[it.x,it.y],[tg.x,tg.y]],1400).catch(()=>{})},
    async assist(t){while(await kit.assistOne(light)){}res();t.finish()}});
  await done;D.guard(tok);s.down=s.move=s.up=null;s.hots=null;D.clearAct();AU.sfx('done');light.sparkle();setTask(s,'flowers',2);setTask(s,'diyas',1);await D.wait(1400)}

/* ---- the floor seen from above, for Activities 1B and 1C ---- */
function floorStage(o){const s=mkScene(o.id||'floor');
  s.paintBg=function(){this.bg.innerHTML='';el('rect',{x:-4,y:-4,width:L.W+8,height:L.Ha+8,fill:Pat.u('petals',P.gold,P.terra,1.2)},this.bg);
    const R_=L.portrait?REF.p:REF.l,r=toStage(50,50),q=toStage(R_.w-50,R_.h-50);el('rect',{x:r[0],y:r[1],width:q[0]-r[0],height:q[1]-r[1],rx:20,fill:'none',stroke:P.ivory,'stroke-width':10,'stroke-dasharray':'.1 22','stroke-linecap':'round'},this.bg)};
  const comp=s.comp;const rgL=grp(comp),ringL=grp(comp),trayL=grp(comp),itemL=grp(comp),lightL=grp(comp),iconL=grp(comp);s.iconL=iconL;s.propL=trayL;s.itemL=itemL;
  const R=rangoli2(rgL);s.R=R;R.dots=1;for(const k of RSEC)R.sec[k].k=TASKSTATE.rangoli===2?1:0;
  s.rc=()=>LP(o.rc[0],o.rc[1]);s.rs=()=>LP(o.rs[0],o.rs[1]);
  const light=s.light=mkLight(lightL);s.fx=fxLayer(s);s.demo=demoHand(s);s.ringL=ringL;
  s.tick=(dt,t)=>{const c=s.rc();tf(rgL,c[0],c[1],s.rs());R.update();light.update(dt,t)};return s}
async function shot2_3(){mood('excited');const s=floorStage({id:'diyas',rc:[[889,372],[500,720]],rs:[.82,.94]});D.setScene(s,1200);addTasks(s);setTask(s,'flowers',2);setTask(s,'diyas',1);
  const tok=D.token,light=s.light;light.vis=true;light.x=LP(330,140);light.y=LP(300,420);
  const ringXY=i=>{const c=s.rc(),a=(i/6*360-60)*DEG,rx=LP(330,350),ry=LP(250,330);return[c[0]+Math.cos(a)*rx,c[1]+Math.sin(a)*ry]};
  const placesG=grp(s.ringL);const places=[0,1,2,3,4,5].map(i=>{const g=grp(placesG);const t=target(g,LP(54,62));t.on=1;const d=diya(g,{col:i%2?P.terra:P.ochre});d.s=LP(.75,.85);d.lit=0;op(d.g,0);
    const pl={id:i,g,t,d,done:false,r:LP(80,95),x:0,y:0};s.parts.push({update:(dt,tt)=>{const p=ringXY(i);pl.x=p[0];pl.y=p[1];t.x=p[0];t.y=p[1];t.on=pl.done?0:1;t.update(tt);d.x=p[0];d.y=p[1]+20;d.update(tt)}});return pl});
  const box=grp(s.propL);const trayPos=()=>LP([300,688,1478,800],[50,1250,950,1460]);
  const items=places.map((_,i)=>dragItem(s,s.itemL,i,a=>{const d=diya(a,{col:i%2?P.terra:P.ochre});d.s=LP(.75,.9);d.lit=0;d.y=18;d.update(0)},0,0,LP(56,70)));
  const lay=()=>{const b=trayPos();box.innerHTML='';trayBox(box,b[0],b[1],b[2],b[3]);const cols=L.portrait?3:6;items.forEach((it,i)=>{const c=i%cols,r=Math.floor(i/cols),rows=Math.ceil(6/cols);
    const hx=lerp(b[0],b[2],(c+.5)/cols),hy=lerp(b[1],b[3],(r+.5)/rows);if(!it.placed){if(it.x===it.hx&&it.y===it.hy){it.x=hx;it.y=hy}it.hx=hx;it.hy=hy}})};lay();items.forEach(it=>{it.x=it.hx;it.y=it.hy});s.onLayout=lay;
  let n=0,res;const done=new Promise(r=>res=r);
  const kit=dragKit(s,items,places,{itemLabel:()=>'Unlit diya: pick it up',targetLabel:()=>'Glowing place beside the rangoli: put the diya here',
    onPlace:(it,tg)=>{it.g.style.display='none';op(tg.d.g,1);AU.sfx('tink');(async()=>{await light.travel([[tg.x,tg.y-LP(70,80)]],D.fast?20:500);light.sparkle();tw(tg.d,{lit:1},700,'out').catch(()=>{})})().catch(()=>{});
      n++;TASKRING[tg.id]=1;if(n>=6)Timers.add(900,res)},onMiss:()=>{tw(light,{tilt:16},400).then(()=>tw(light,{tilt:0},700)).catch(()=>{})}});
  await D.ask(INS.diyas,null,'drag');
  s.demo.drag([[items[0].hx,items[0].hy],[places[0].x,places[0].y]],1400).catch(()=>{});
  await D.task({hint:HINT.diyas,start(t){done.then(()=>t.finish())},demo(){const it=items.find(x=>!x.placed),tg=places.find(x=>!x.done);if(it&&tg)s.demo.drag([[it.x,it.y],[tg.x,tg.y]],1400).catch(()=>{})},
    async assist(t){while(await kit.assistOne(light)){}Timers.add(900,res);t.finish()}});
  await done;D.guard(tok);s.down=s.move=s.up=null;s.hots=null;D.clearAct();AU.sfx('done');light.sparkle();setTask(s,'diyas',2);setTask(s,'rangoli',1);await D.wait(1400)}
const TASKRING=[0,0,0,0,0,0];
/* the four rangoli motifs: distinct shape and colour */
function rangoliMotif(parent,k){const g=grp(parent);if(k==='petal')shp(g,'M0 30C-22 8 -18 -20 0 -34C18 -20 22 8 0 30Z',P.coral,3.4);else if(k==='diamond')shp(g,'M0 -30L22 0L0 30L-22 0Z',P.gold,3.4);
  else if(k==='leaf'){shp(g,'M0 30Q-22 0 0 -30Q22 0 0 30Z',P.leaf,3.4);ln(g,'M0 22V-22',K,1.6)}else{circ(g,0,0,26,P.turq,3.4);circ(g,0,0,9,P.ivory,2.4);circ(g,0,0,3.4,P.verm,0)}return g}
const RBAND={petal:[136,212],diamond:[90,140],leaf:[40,92],circle:[0,42]};
async function shot2_4(){mood('excited');const s=floorStage({id:'rangoli',rc:[[889,372],[500,740]],rs:[1.08,1.5]});D.setScene(s,1200);addTasks(s);setTask(s,'flowers',2);setTask(s,'diyas',2);setTask(s,'rangoli',1);
  const tok=D.token,light=s.light,R=s.R;light.vis=true;light.x=LP(330,150);light.y=LP(260,330);
  const loc=p=>{const c=s.rc(),sc=s.rs();return[(p.x-c[0])/sc,(p.y-c[1])/sc]};
  const targets=RSEC.map((k,i)=>({id:i,k,done:false,r:1,hit(p){const[x,y]=loc(p);const d=Math.hypot(x,y);const b=RBAND[k];return d>=b[0]-10&&d<=b[1]+10?.5:1e9},
    get x(){const c=s.rc(),cc=R.centre(k);return c[0]+cc[0]*s.rs()},get y(){const c=s.rc(),cc=R.centre(k);return c[1]+cc[1]*s.rs()}}));
  const anyTarget={hit:p=>{const[x,y]=loc(p);return Math.hypot(x,y)<220?.5:1e9}};
  const box=grp(s.propL);const trayPos=()=>LP([440,690,1338,800],[90,1260,910,1450]);
  const items=RSEC.map((k,i)=>dragItem(s,s.itemL,i,a=>{rangoliMotif(a,k).setAttribute('transform',`scale(${LP(1.5,1.9)})`)},0,0,LP(58,72)));items.forEach((it,i)=>it.k=RSEC[i]);
  const lay=()=>{const b=trayPos();box.innerHTML='';trayBox(box,b[0],b[1],b[2],b[3]);items.forEach((it,i)=>{const hx=lerp(b[0],b[2],(i+.5)/4),hy=(b[1]+b[3])/2;if(!it.placed){if(it.x===it.hx&&it.y===it.hy){it.x=hx;it.y=hy}it.hx=hx;it.hy=hy}})};
  lay();items.forEach(it=>{it.x=it.hx;it.y=it.hy});s.onLayout=lay;
  let n=0,res;const done=new Promise(r=>res=r);
  const kit=dragKit(s,items,targets,{accept:(it,tg)=>it.k===tg.k,itemLabel:it=>'Rangoli colour, '+it.k+' shape: pick it up',targetLabel:tg=>'Empty '+tg.k+' space in the rangoli',
    onPlace:(it,tg)=>{it.g.style.display='none';AU.sfx('fill');tw(R.sec[tg.k],{k:1},900,'out').catch(()=>{});light.sparkle();n++;if(n>=4)Timers.add(1000,res)},
    onMiss:it=>{/* the Light points at the right section */const tg=targets.find(t=>t.k===it.k);light.travel([[tg.x+LP(90,80),tg.y-LP(60,70)]],700).catch(()=>{});tw(light,{tilt:-18},400).then(()=>tw(light,{tilt:0},900)).catch(()=>{})}});
  /* a drop anywhere on the rangoli counts as a try on the section under it */
  await D.ask(INS.rangoli,null,'drag');
  s.demo.drag([[items[0].hx,items[0].hy],[targets[0].x,targets[0].y]],1400).catch(()=>{});
  await D.task({hint:HINT.rangoli,start(t){done.then(()=>t.finish())},demo(){const it=items.find(x=>!x.placed);if(it){const tg=targets.find(q=>q.k===it.k);s.demo.drag([[it.x,it.y],[tg.x,tg.y]],1400).catch(()=>{})}},
    async assist(t){while(await kit.assistOne(light)){}Timers.add(1000,res);t.finish()}});
  await done;D.guard(tok);s.down=s.move=s.up=null;s.hots=null;D.clearAct();AU.sfx('done');light.sparkle();setTask(s,'rangoli',2);
  /* the camera pulls back to reveal the whole home */
  await D.wait(1300)}
const DONE_STATE={garland:[1,1,1,1,1],rangoli:{dots:1,petal:1,diamond:1,leaf:1,circle:1},ring:[1,1,1,1,1,1],lit:0,puja:0};
async function shot2_5(){mood('excited');const st=JSON.parse(JSON.stringify(DONE_STATE));st.ring=TASKRING.map(v=>v||1);
  const s=homeStage({state:st});D.setScene(s,1200);rowDiyas(s.H,7);const F=s.F,H=s.H,light=s.light;addTasks(s);TASKS.forEach(k=>setTask(s,k,2));
  for(const k in F)F[k].vis=false;H.diyas.forEach(d=>d.own=0);
  const c=s.toHome(0,-200);light.vis=true;light.x=c[0];light.y=LP(620,1000);
  await D.wait(700);
  /* the entrance and puja diyas light one after another; the placed diyas brighten */
  for(let i=0;i<H.diyas.length;i++){const d=H.diyas[i];tw(d,{own:1},500,'out').catch(()=>{});AU.sfx('tink');await D.wait(D.fast?5:220)}
  D.go(H,{puja:1},1);tw(H,{pujaLit:1},800).catch(()=>{});H.ring.forEach(r=>{tw(r.d,{s:.7},400).then(()=>tw(r.d,{s:.62},600)).catch(()=>{})});Music.swell();
  light.travel([[c[0],c[1]-LP(280,250)]],1800,'out').catch(()=>{});D.go(light,{glowK:1},1400);
  /* the family returns and smiles at the decorations */
  for(const k in F){F[k].vis=true;F[k].smile=2}
  placeP(F.mother,[-150,790,.95],[-150,1040,.85],true);placeP(F.father,[1950,790,.95],[1150,1040,.85],true);placeP(F.girl,[-250,800,.95,0],[-200,1310,.95,0],true);placeP(F.boy,[2050,780,.95],[1250,1310,.95],true);placeP(F.gran,[1110,572,.6],[740,671,.6],true);
  placeP(F.mother,[330,790,.95],[150,1040,.85]);placeP(F.father,[1460,790,.95],[850,1040,.85]);placeP(F.girl,[560,800,.95,0],[380,1310,.95,0]);placeP(F.boy,[1230,780,.95],[640,1310,.95]);
  D.go(H,{sparkle:1},900);
  await D.wait(1600);
  await sayShot('2.5');await D.late();await D.wait(800)}
async function shot2_6(){mood('warm');const s=homeStage({view:'puja',state:DONE_STATE});s.H.lit=1;s.H.pujaLit=1;D.setScene(s,1300);rowDiyas(s.H,7);const F=s.F,H=s.H,light=s.light;
  placeP(F.gran,[640,800,.92],[300,1330,.75],true);placeP(F.girl,[1150,805,.9,0],[640,1340,.7,0],true);placeP(F.boy,[1330,805,.9],[840,1340,.7],true);
  F.mother.vis=false;F.father.vis=false;F.girl.tiltH=-8;F.boy.tiltH=-10;
  const fr=s.toHome(321,-230);light.vis=true;light.x=fr[0]+LP(220,180);light.y=fr[1]-LP(200,220);
  await D.wait(900);
  await sayShot('2.6',{cues:[['ready',()=>F.gran.set('gestureL')],['diyas',()=>D.go(H.frame,{mk:1},1400)],['lesson',()=>{F.gran.set('gesture')}]],gap:1600,
    pendingCue:{}});
  const drift=light.travel([[fr[0]-LP(80,60),fr[1]-LP(210,230)],[fr[0]+LP(60,40),fr[1]-LP(220,240)]],3000).catch(()=>{});
  await drift;await D.late();
  /* Grandmother turns to the children and beckons them closer */
  F.gran.tiltH=8;F.gran.set('gesture');await D.wait(1200)}
