/* ================= EPISODE 4: THE TERRIBLE POISON ================= */
/* violet clouds for the poison sky (they fade when the danger passes) */
function poisonClouds(s,list){const g=grp(s.comp);const cl=list.map(([x,y,w])=>{const c=cloud(g,w,P.mauve);tf(c,x,y,1);return c});const o={k:1};s.parts.push({update:(dt,t)=>{op(g,o.k);cl.forEach((c,i)=>tf(c,list[i][0]+Math.sin(t*.05+i)*30*MV(),list[i][1],1))}});return o}

async function shot4_1(){await titleCard(4,'The Terrible Poison');D.chip('Episode 4 · Halahala');Music.mood('poison');Music.setLevel(.1,2);D.setMood({pitch:.93,rate:.92,vol:.85});
  const s=churnScene({id:'churn',mood:'poison',frame:'violet',stars:4,clouds:[[.2,.4,LP(220,160)],[.8,.3,LP(240,170)]]});const C=s.C;s.seaK=.15;C.ringK=0;D.setScene(s,1200);
  s.sea&&(s.sea.k=.15);groupSet(C.devas,'pull');groupSet(C.asuras,'pull');
  /* restrained colours: a flat violet veil over the scene, the poison stays above it */
  const veil=el('rect',{x:-10,y:-10,width:5000,height:5000,fill:P.violet},s.veil);const vk={k:.28};s.parts.push({update:()=>op(veil,vk.k)});s.vk=vk;
  const hl=halahala(s.top);const ho={x:0,y:0,s:0};s.parts.push({update:t=>{const A=C.A;hl.x=A.mx;hl.y=lerp(A.water+40,LP(300,560),ho.y);hl.s=ho.s;hl.update(t)}});s.hal=ho;
  await D.wait(600);
  await D.say('As the ocean churned, a terrible poison called Halahala emerged from its depths.',{cues:[['Halahala',()=>{AU.sfx('hush');D.go(ho,{y:1,s:LP(1.05,1.15)},4200,'io')}]]});
  await D.say('It was so powerful that it threatened the whole universe.',{cues:[['powerful',()=>D.go(ho,{s:LP(1.25,1.35)},2400)]]});
  await D.say('The devas were frightened.',{cues:[['frightened',()=>groupSet(C.devas,'worried')]]});
  await D.say('The asuras stepped back.',{cues:[['stepped',()=>groupSet(C.asuras,'alarmed')]]});
  await D.say([['both','“What have we brought into the world?”'],['narr','they cried.']]);
  await D.say('The poison spread, and all creation was in danger.',{cues:[['spread',()=>{D.go(ho,{s:LP(1.4,1.5)},2400);D.go(vk,{k:.38},2400)}]]});
  await D.say('The churning stopped.',{cues:[['stopped',()=>{D.go(C,{sag:1},1600);D.go(C.hold,{d:0,a:0},1600)}]]});
  groupSet(C.devas,'gaze');groupSet(C.asuras,'gaze');
  await D.say('Everyone looked around, hoping someone would know what to do.');await D.late()}

/* ---- Lord Shiva at the centre ---- */
function shivaScene(){const s=mkScene('shiva',{frame:'violet'});
  s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha;const hy=toStage(0,LP(300,520))[1];
    this.sky=sky(this.bg,W,hy,{seed:21,n:5,clouds:[]});horizonBand(this.bg,W,hy,P.gold);
    this.seaP=grp(this.bg);this.seaB=grp(this.bg);this.sea=ocean(this.seaB,W,hy,H,{mood:'wonder',n:5});this.seaV=ocean(this.seaP,W,hy,H,{mood:'poison',n:4,dens:1.35});
    this.seaB.parentNode.insertBefore(this.seaB,this.seaP)};
  s.parts.push({update:(dt,t)=>{s.sky&&s.sky.update(t);if(s.sea){s.sea.k=s.seaK==null?.3:s.seaK;s.sea.update(t,dt);s.seaV.k=s.sea.k;s.seaV.update(t,dt);op(s.seaP,s.poisonK==null?1:s.poisonK)}}});
  const comp=s.comp;const haloG=grp(comp);const pedG=grp(comp);const shG=grp(comp);const grpL=grp(comp);
  const h=halo(haloG,196,{col:P.turmeric});rings(haloG,170,{n:2,step:.18,w:4,c1:P.gold,c2:P.ivory});
  const ped=lotus(pedG,{r:120,n:9,open:1,col:P.mauve,col2:P.ivory});
  const sh=new Deity('shiva',shG,{pose:'shiva'});s.shiva=sh;s.cast.shiva=sh;
  const devas=[0,1,2].map(i=>new Fig('deva',i,grpL)),asuras=[0,1,2].map(i=>new Fig('asura',i+1,grpL));s.cast.devas=devas;s.cast.asuras=asuras;
  s.st={step:0,halo:0};
  s.onLayout=function(){const A=LP({x:889,y:760,s:1.12,dx:[200,320,440],ax:[1338,1458,1578],fy:760,fs:.72},{x:500,y:1200,s:1.3,dx:[90,180,270],ax:[730,820,910],fy:1460,fs:.56});s.A=A;
    devas.forEach((f,i)=>{f.x=A.dx[i];f.y=A.fy;f.s=A.fs;f.f=1});asuras.forEach((f,i)=>{f.x=A.ax[i];f.y=A.fy;f.s=A.fs;f.f=-1})};
  s.tick=function(dt,t){const A=s.A;const k=s.st.step;sh.x=A.x;sh.y=A.y-(1-k)*40;sh.s=A.s*(.86+.14*k);sh.update(dt,t);op(shG,clamp(k*1.5,0,1));
    tf(pedG,A.x,A.y+10,A.s*.95);op(pedG,clamp(k*1.5,0,1));tf(haloG,A.x,A.y-300*A.s,A.s*(.9+.1*s.st.halo));op(haloG,s.st.halo);
    devas.concat(asuras).forEach(f=>f.update(dt,t))};
  return s}
async function shot4_2(){D.chip('Episode 4 · Neelkanth');const s=shivaScene();s.seaK=.15;s.poisonK=1;D.setScene(s,1300);const sh=s.shiva;sh.throat=0;
  const veil=el('rect',{x:-10,y:-10,width:5000,height:5000,fill:P.violet},s.veil);const vk={k:.3};s.parts.push({update:()=>op(veil,vk.k)});
  s.cast.devas.forEach(f=>f.set('worried'));s.cast.asuras.forEach(f=>f.set('alarmed'));
  /* the contained poison sits low, beside Lord Shiva, never near a face */
  const hl=halahala(s.top);const ho={u:0,s:LP(.95,.9)};const start=()=>LP([1170,690],[720,1060]);
  s.parts.push({update:t=>{const A=s.A;const th=[A.x,A.y-256*A.s];const p0=start();const u=ho.u;const mid=[p0[0]-LP(40,20),th[1]+LP(150,190)];
    const x=u<.6?lerp(p0[0],mid[0],u/.6):lerp(mid[0],th[0],(u-.6)/.4),y=u<.6?lerp(p0[1],mid[1],u/.6):lerp(mid[1],th[1],(u-.6)/.4);hl.x=x;hl.y=y;hl.s=ho.s;hl.update(t);op(hl.g,ho.s>.03?1:0)}});
  await D.wait(700);
  await D.say('Then, Lord Shiva stepped forward.',{cues:[['stepped',()=>{AU.sfx('chime');D.go(s.st,{step:1},2400,'out')}]]});
  s.cast.devas.forEach(f=>f.set('gaze'));s.cast.asuras.forEach(f=>f.set('gaze'));
  await D.say('He understood that if nobody acted, countless living beings could suffer.');
  await D.say('With great compassion, Shiva took in the terrible poison to protect creation and held it in His throat.',
    {cues:[['took in',()=>{AU.sfx('hush');D.go(ho,{u:1,s:.12},4200,'io')}]]});
  await D.wait(600);D.go(ho,{s:0},500);
  await D.say('The poison turned His throat blue.',{cues:[['blue',()=>{AU.sfx('shell');D.go(sh,{throat:1},1400,'back')}]]});
  await D.say('From that moment, He became known as Neelkanth, the blue-throated Lord.',{cues:[['Neelkanth',()=>{AU.sfx('chime');D.go(s.st,{halo:1},2000)}]]});
  await D.say('The universe was saved.',{cues:[['saved',()=>{D.go(vk,{k:.12},3000);D.go(s,{seaK:.7},3000);Music.mood('wonder');Music.setLevel(.45,4)}]]});
  s.cast.devas.forEach(f=>f.set('amazed'));s.cast.asuras.forEach(f=>f.set('amazed'));
  await D.say('The devas and asuras watched in wonder.');
  await D.say('They had begun this adventure in search of a treasure for themselves.');
  s.cast.devas.forEach(f=>f.set('namaste'));s.cast.asuras.forEach(f=>f.set('namaste'));
  await D.say('But now, they had witnessed something far greater.');
  await D.say("Lord Shiva had put the welfare of the universe before His own comfort.");
  await D.say('They had learned that true strength was not just about winning or becoming powerful.');
  await D.say('Sometimes, the greatest act of strength is protecting others.');await D.late()}

/* ---- 4.3 A little pause ---- */
function pauseScene(){const s=mkScene('pause',{frame:'violet'});
  s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha;const hy=toStage(0,LP(250,430))[1];
    this.sky=sky(this.bg,W,hy,{seed:31,n:10,clouds:[]});horizonBand(this.bg,W,hy,P.gold);
    this.seaB=grp(this.bg);this.seaP=grp(this.bg);this.sea=ocean(this.seaB,W,hy,H,{mood:'divine',n:5});this.seaV=ocean(this.seaP,W,hy,H,{mood:'poison',n:4,dens:1.35})};
  s.parts.push({update:(dt,t)=>{s.sky&&s.sky.update(t);if(s.sea){s.sea.k=s.seaK==null?.5:s.seaK;s.sea.update(t,dt);s.seaV.k=s.sea.k;s.seaV.update(t,dt);op(s.seaP,s.poisonK==null?1:s.poisonK)}}});
  const comp=s.comp;s.clouds=poisonClouds(s,LP([[300,120,240],[1480,110,260],[889,60,180]],[[250,250,220],[760,200,240]]));
  const hlG=grp(comp);const H_=heartLotus(hlG);const ring=grp(hlG);circ(ring,0,-60,120,'none',10,{stroke:K});circ(ring,0,-60,120,'none',5,{stroke:P.turmeric,'stroke-dasharray':'.1 16','stroke-linecap':'round'});
  const hT=target(hlG,150);hT.y=-50;
  const sil=['family','friends','animals'].map(k=>{const g=grp(comp);silhouette(g,k);return{g,k,on:0,lit:0}});
  const lamps=[0,1,2].map(i=>diya(comp,{lit:0}));const lT=lamps.map(()=>target(comp,70));
  const orbs=grp(comp);const lights=[];
  Object.assign(s,{H_,ring,hT,sil,lamps,lT,breath:0,hlOn:0,lampOn:[0,0,0],lights,orbs});
  s.onLayout=function(){s.A=LP({hl:[889,520],hs:1.55,sil:[[400,230],[889,190],[1378,230]],ss:1.15,lamp:[[600,750],[889,770],[1178,750]],ls:1.35},
    {hl:[500,860],hs:1.75,sil:[[190,330],[500,280],[810,330]],ss:1.1,lamp:[[200,1330],[500,1360],[800,1330]],ls:1.55})};
  s.tick=function(dt,t){const A=s.A;tf(hlG,A.hl[0],A.hl[1],A.hs);tf(ring,0,0,.4+.9*s.breath);op(ring,s.breath>.01?1:0);hT.on=s.hlOn;hT.update(t);
    sil.forEach((o,i)=>{tf(o.g,A.sil[i][0],A.sil[i][1]+40,A.ss*(.6+.4*o.on));op(o.g,o.on)});
    lamps.forEach((l,i)=>{l.x=A.lamp[i][0];l.y=A.lamp[i][1];l.s=A.ls;l.update(t);lT[i].x=l.x;lT[i].y=l.y-30*A.ls;lT[i].on=s.lampOn[i];lT[i].update(t)});
    lights.forEach(l=>{const a=l.from,b=l.to;const k=l.k;tf(l.g,lerp(a[0],b[0],k),lerp(a[1],b[1],k)-Math.sin(k*Math.PI)*90,.5+.3*Math.sin(k*Math.PI));op(l.g,k<1?1:0)})};
  s.fx=fxLayer(s);s.demo=demoHand(s);
  s.hots=function(){const h=[];const A=s.A;if(s.hlOn>.5)h.push({id:'heart',label:'Heart lotus: press and hold to breathe',x:A.hl[0],y:A.hl[1]-50*A.hs,r:120,on:()=>s.onHeart&&s.onHeart()});
    sil.forEach((o,i)=>{if(o.on>.5&&!o.lit)h.push({id:'sil'+i,label:['Family','Friends','Birds and animals'][i]+': tap to send kindness',x:A.sil[i][0],y:A.sil[i][1]-40,r:80,on:()=>s.onSil&&s.onSil(i)})});
    s.lampOn.forEach((on,i)=>{if(on>.5)h.push({id:'lamp'+i,label:'Wish lamp: tap to light',x:A.lamp[i][0],y:A.lamp[i][1]-30,r:70,on:()=>s.onLamp&&s.onLamp(i)})});return h};
  return s}
async function shot4_3(){D.chip('Episode 4 · A Little Pause');const s=pauseScene();s.poisonK=1;s.seaK=.4;D.setScene(s,1200);const tok=D.token;
  const veil=el('rect',{x:-10,y:-10,width:5000,height:5000,fill:P.violet},s.veil);const vk={k:.16};s.parts.push({update:()=>op(veil,vk.k)});
  D.setMood({pitch:.94,rate:.9,vol:.9});
  await D.wait(600);
  await D.say('Children, let us take a little pause.');
  await D.say('Place one hand on your heart.',{cues:[['heart',()=>D.go(s,{hlOn:1},800)]]});
  /* ---- part 1: breathe with the lotus ---- */
  {let holding=false;Hot.dirty=true;D.instr('Press and hold the glowing lotus while we breathe.','','hold');
    const hp=()=>[s.A.hl[0],s.A.hl[1]-50*s.A.hs];s.down=p=>{const c=hp();if(Math.hypot(p.x-c[0],p.y-c[1])<190*s.A.hs/1.15)holding=true};s.up=()=>{holding=false};s.onHeart=()=>{holding=true;setTimeout(()=>holding=false,3200)};
    s.camHand=h=>{holding=h.open};
    const inP=D.say('Take a gentle breath in.');
    await D.task({hint:'Press and hold the glowing lotus.',start(t){const iv=setInterval(()=>{if(holding){s.breath=Math.min(1,s.breath+.04);D.poke()}if(s.breath>=1){clearInterval(iv);t.finish()}},100)},
      demo(){const c=hp();s.demo.tap(c[0],c[1],1)},async assist(t){await D.tw(s,{breath:1},2500);t.finish()}});
    await inP;AU.sfx('chime');
    const outP=D.say('And slowly breathe out.');await D.tw(s,{breath:0},3200,'io');await outP;
    s.down=s.up=s.onHeart=s.camHand=null;D.go(s,{hlOn:0},500);D.clearAct()}
  /* ---- part 2: send a little light of kindness ---- */
  await D.say('Now, imagine sending a little light of kindness to everyone around you.');
  await D.say('To your family.',{cues:[['family',()=>{AU.sfx('pop');D.go(s.sil[0],{on:1},700,'back')}]]});
  await D.say('To your friends.',{cues:[['friends',()=>{AU.sfx('pop');D.go(s.sil[1],{on:1},700,'back')}]]});
  await D.say('To animals, birds, and every living creature.',{cues:[['animals',()=>{AU.sfx('pop');D.go(s.sil[2],{on:1},700,'back')}]]});
  {let n=0;Hot.dirty=true;D.instr('Tap each one to send a little light of kindness.','0 of 3','tap');
    const send=i=>{const o=s.sil[i];if(o.lit)return;o.lit=1;n++;AU.sfx('bell');const g=grp(s.orbs);orb(g);const A=s.A;const l={g,from:[A.hl[0],A.hl[1]-80*A.hs],to:[A.sil[i][0],A.sil[i][1]-40],k:0};s.lights.push(l);
      D.go(l,{k:1},1400,'io');Timers.add(1300,()=>{s.fx.burst(A.sil[i][0],A.sil[i][1]-40,7,'spark',TAU);g.remove()});D.counter(`${n} of 3`);if(n>=3&&s._t)Timers.add(1400,()=>s._t&&s._t.finish())};
    s.down=p=>{const A=s.A;A.sil.forEach((q,i)=>{if(Math.hypot(p.x-q[0],p.y-(q[1]-40))<100)send(i)})};s.onSil=send;
    await D.task({hint:'Tap each friend to send light.',start(t){s._t=t},demo(){const i=s.sil.findIndex(o=>!o.lit);const q=s.A.sil[Math.max(0,i)];s.demo.tap(q[0],q[1]-40,2)},
      async assist(t){for(let i=0;i<3;i++){send(i);await D.wait(500)}await D.wait(1400);t.finish()}});
    s._t=null;s.down=s.onSil=null;D.clearAct()}
  /* ---- part 3: three wishes, three lamps ---- */
  await D.say('Let us make three wishes together.');
  const wishes=['May everyone be safe.','May everyone be healthy.','May everyone be happy.'];
  for(let i=0;i<3;i++){await D.say(wishes[i]);s.lampOn[i]=1;Hot.dirty=true;
    const light=()=>{const l=s.lamps[i];if(l.lit>.5)return;AU.sfx('bell');D.go(l,{lit:1},700,'out');s.lampOn[i]=0;Hot.dirty=true;D.chantSkip&&setTimeout(()=>D.chantSkip&&D.chantSkip(),900)};
    s.down=p=>{const q=s.A.lamp[i];if(Math.hypot(p.x-q[0],p.y-(q[1]-30))<110)light()};s.onLamp=()=>light();
    await D.chant(wishes[i],{who:'Children',wait:4000});light();s.down=s.onLamp=null;await D.wait(500)}
  D.guard(tok);
  /* outcome: the violet layers cross-fade slowly back to the blue-and-gold ocean */
  Music.mood('wonder');Music.swell();
  await D.say('Beautiful!');Badge.gain(3);
  await D.say('The dark clouds began to fade.',{cues:[['fade',()=>{D.go(s.clouds,{k:0},4000);D.go(vk,{k:0},5000)}]]});
  await D.say('The ocean slowly returned to its beautiful shades of blue and gold.',{cues:[['slowly',()=>{D.go(s,{poisonK:0,seaK:1},6000,'io')}]]});
  D.setMood({});
  await D.say("Lord Shiva's compassion had reminded everyone that the welfare of all creation mattered.");
  await D.say('And now, the great churning could continue.');
  await D.say('What would emerge next?');
  await D.say('A jewel?');
  await D.say('A magical animal?');
  await D.say('Or the treasure they had all been waiting for?');await D.late();
  /* transition: the last purple motif shrinks and vanishes, the lotus opens, the first treasure rises */
  const hl=halahala(s.top);const ho={s:.35};const c=s.A.hl;s.parts.push({update:t=>{hl.x=c[0]+LP(320,0);hl.y=c[1]+LP(-60,260);hl.s=ho.s;hl.update(t);op(hl.g,ho.s>.02?1:0)}});
  await D.tw(ho,{s:0},1400,'in');D.go(s.H_.l,{open:1},1000);s.H_.l.set(1);AU.sfx('sparkle');
  const g=grp(s.top);star4(g,0,0,26,P.turmeric);rings(g,40,{n:2,step:.3,w:4});const go={y:0};s.parts.push({update:()=>{tf(g,c[0],c[1]-140-go.y*260,1+go.y*.4)}});await D.tw(go,{y:1},1600,'out')}
