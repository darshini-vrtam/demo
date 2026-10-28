/* ================= EPISODE 1: THE GREAT CHURNING AND THE BLUE-THROATED LORD ================= */
const EP1_TITLE=['THE GREAT CHURNING AND THE BLUE-THROATED LORD','The Great Churning and the Blue-Throated Lord'];
/* seven golden lights sleeping beneath the surface (they are the wake-up targets in 1.2) */
function addLights(s){const pos=()=>E1.glim[L.portrait?1:0];const g=grp(s.comp);
  const lights=pos().map((_,i)=>{const lg=grp(g);const glow=grp(lg);rings(glow,46,{n:3,step:.28,w:4,c1:P.turmeric,c2:P.ivory});rays(glow,30,52,12,P.turmeric,3);
    const core=grp(lg);star4(core,0,0,15,P.turmeric);circ(core,0,0,5,P.ivory,2);const t=target(lg,40);return{g:lg,glow,core,t,k:0,on:0,lit:0,ph:i*.9}});
  s.parts.push({update:(dt,t)=>{const p=pos();lights.forEach((l,i)=>{tf(l.g,p[i][0],p[i][1],L.portrait?1.25:1);op(l.g,l.k);
    const breathe=l.lit?1:.85+.12*Math.sin(t*TAU/2.6+l.ph)*MV();tf(l.core,0,0,breathe*(l.lit?1.3:1.1));tf(l.glow,0,0,.55+.45*(l.lit?1:0)+.06*Math.sin(t*1.1+l.ph)*l.lit*MV());op(l.glow,l.lit?1:.6);
    l.t.on=l.on*(l.lit?0:1);l.t.update(t)})}});s.lights=lights;s.lightPos=pos;return lights}
function vishnuMed(s){const vm=figMed(s.medL,'vishnu',118);vm.fade=0;s.parts.push(vm,{update:()=>op(vm.m.g,vm.s>.02?1-vm.fade:0)});s.cast.vishnu=vm.figs[0];D.cast=s.cast;
  const place=()=>{const m=s.C?s.C.A.med:(L.portrait?[190,250]:[210,150]);if(!vm.moved){vm.x=m[0];vm.y=m[1]}};place();const ol=s.onLayout;s.onLayout=()=>{ol&&ol();place()};return vm}

async function shot1_1(){await titleCard(1,EP1_TITLE[0],EP1_TITLE[1]);D.chip('Episode 1 · The Ocean of Secrets');mood('warm');Music.mood('wonder');Music.setLevel(.55,3);
  const s=oceanScene1();Object.assign(s,{glimOn:0,cenShow:0,awake:.25,lotOpen:.55});s.seaK=.25;D.setScene(s,1200);const L_=addLights(s);
  await D.wait(900);
  s.cam.fx=L.portrait?500:889;s.cam.fy=L.portrait?820:520;D.go(s.cam,{z:1.07},70000,'io');AU.sfx('ripple');
  await D.say('Children, imagine an ocean so magical that it holds treasures beyond your wildest dreams!',{cues:[['magical',()=>AU.sfx('sparkle')]]});
  await D.say('This is the Ocean of Milk, known as Kshira Sagara.');
  const appear=i=>{AU.sfx('pop');D.go(L_[i],{k:1},700,'out')};
  await D.say('Hidden beneath its beautiful waves are precious jewels, extraordinary creatures, divine gifts, and something even more special—a nectar called amrit, associated with immortality.',
    {cues:[['precious jewels',()=>{appear(0);appear(1)}],['extraordinary creatures',()=>{appear(2);appear(3)}],['divine gifts',()=>{appear(4);appear(5);appear(6)}],['amrit',()=>AU.sfx('chime')]]});
  const r=()=>E1.med.r[L.portrait?1:0],pos=k=>E1.med[k][L.portrait?1:0];
  const md=figMed(s.medL,'devas',r(),'tired'),mv=figMed(s.medL,'vishnu',r()),ma=figMed(s.medL,'asuras',r());s.parts.push(md,mv,ma);
  s.cast.vishnu=mv.figs[0];D.cast=s.cast;const place=()=>[[md,'d'],[mv,'v'],[ma,'a']].forEach(([m,k])=>{if(!m.moved){const p=pos(k);m.x=p[0];m.y=p[1]}});place();s.onLayout2=place;md.k.dim=.4;
  await D.say('Long ago, the devas had lost their strength and splendour. They approached Lord Vishnu for help.',{cues:[['lost their strength',()=>{AU.sfx('swish');D.go(md,{s:1},900,'back')}]]});
  await D.say('Lord Vishnu revealed a plan.',{cues:[['revealed',()=>{AU.sfx('chime');D.go(mv,{s:1},900,'back');md.figs.forEach(f=>f.set('gaze'));D.go(md.k,{dim:0},1600)}]]});
  await D.say([['vishnu','“The nectar you seek lies hidden in the Ocean of Milk. To find it, we must churn the ocean!”']]);
  md.figs.forEach(f=>f.set('worried'));D.go(mv,{s:0},700);
  await D.say('But the devas could not do it alone. They needed help from their rivals, the asuras.',{cues:[['the asuras',()=>{AU.sfx('swish');D.go(ma,{s:1},900,'back')}]]});
  md.moved=ma.moved=true;
  await D.say('Both sides agreed to work together for a common goal.',{cues:[['agreed',()=>{const a=pos('dc'),b=pos('ac');D.go(md,{x:a[0],y:a[1]},1600);D.go(ma,{x:b[0],y:b[1]},1600);md.figs.concat(ma.figs).forEach(f=>f.set('relieved'))}]]});
  await D.say('Their extraordinary adventure was about to begin!',{cues:[['adventure',()=>md.figs.concat(ma.figs).forEach(f=>f.set('cheer'))]]});
  await D.wait(500);await D.late();D.go(md,{s:0},700);D.go(ma,{s:0},700);await D.wait(700)}

async function shot1_2(){D.chip('Episode 1 · Wake Up the Ocean');let s=D.scene;if(!s||s.id!=='ocean1'){s=oceanScene1();Object.assign(s,{glimOn:0,cenShow:0});D.setScene(s);addLights(s).forEach(l=>l.k=1)}
  const tok=D.token;const lights=s.lights;mood('inviting');
  /* the sleeping ocean: waves frozen, lotuses closed, colours a little muted */
  const veil=el('rect',{x:-10,y:-10,width:5000,height:5000,fill:P.midnight},s.veil);s.veilK={k:0};s.parts.push({update:()=>op(veil,s.veilK.k*.3)});
  D.go(s,{awake:0,lotOpen:0,seaK:0},1800);D.go(s.veilK,{k:1},1800);D.go(s.cam,{z:1},1800);
  await D.say('Ocean Explorers, can you see those tiny lights sleeping beneath the water?',{cues:[['tiny lights',()=>lights.forEach((l,i)=>Timers.add(i*120,()=>D.go(l,{on:1},500)))]]});
  await D.say("Let's wake up the magical ocean!");
  let n=0;const total=lights.length;D.instr('Tap the glowing lights to awaken the ocean!',`0 of ${total} lights`,'tap');Hot.dirty=true;
  const wake=i=>{const l=lights[i];if(!l||l.lit)return;l.lit=1;n++;AU.sfx('chime');const p=s.lightPos()[i];s.fx.ripple(p[0],p[1],L.portrait?220:180,P.turmeric,1400);
    D.go(l,{on:0},400);const k=n/total;D.go(s,{seaK:k,awake:k,lotOpen:k},900);D.go(s.veilK,{k:1-k},900);D.counter(`${n} of ${total} lights`);if(n>=total&&s._t)s._t.finish()};
  const near=p=>{let best=-1,bd=1e9;s.lightPos().forEach((q,i)=>{if(lights[i].lit)return;const d=Math.hypot(p.x-q[0],p.y-q[1]);if(d<bd){bd=d;best=i}});return bd<(L.portrait?100:85)?best:-1};
  s.down=p=>{const i=near(p);if(i>=0)wake(i);else{s.fx.ripple(p.x,p.y,60,P.foam,800);AU.sfx('ripple')}};
  s.hots=()=>lights.map((l,i)=>l.lit?null:{id:'light'+i,label:'Glowing light: tap to awaken it',x:s.lightPos()[i][0],y:s.lightPos()[i][1],r:50,on:()=>wake(i)}).filter(Boolean);
  const first=s.lightPos()[0];s.demo.tap(first[0],first[1],2);
  await D.task({hint:'Tap a glowing light under the waves!',start(t){s._t=t;if(n>=total)t.finish()},
    demo(){const i=lights.findIndex(l=>!l.lit);if(i>=0){const q=s.lightPos()[i];s.demo.tap(q[0],q[1],2)}},
    async assist(t){for(let i=0;i<total;i++){if(!lights[i].lit){wake(i);await D.wait(650)}}t.finish()}});
  s._t=null;s.down=null;s.hots=null;D.clearAct();D.guard(tok);
  /* everything wakes together, with a rising magical sound */
  AU.sfx('swell');AU.sfx('success');D.go(s,{awake:1,seaK:1,lotOpen:1,dance:1},2000);D.go(s.veilK,{k:0},1500);Music.setLevel(.7,2);
  await D.say('Look! The Ocean of Wonders is awake!');
  await D.say('And now, our great adventure can begin.');D.go(s,{dance:.3},1500);await D.late();
  /* the central golden ripple widens and becomes the circular base beneath Mount Mandara */
  const c=L.portrait?[500,930]:[889,566];for(let i=0;i<3;i++)Timers.add(i*260,()=>s.fx.ripple(c[0],c[1],L.portrait?520:760,P.turmeric,1600,.24));await D.wait(1300)}

/* ---- the sinking mountain ---- */
function shakePart(s){const C=s.C;const w=C.mG.parentNode;s.shakeK=0;s.parts.push({update:(dt,t)=>{const k=s.shakeK||0;if(k>0)w.setAttribute('transform',`translate(${f1(Math.sin(t*6.2)*4*k)} ${f1(Math.sin(t*4.1)*1.5*k)})`);else w.removeAttribute('transform')}})}
/* a soft divine light beneath the waves (flat rings, never a flash) */
function underLight(s,col){const g=grp(s.C.fxL);rings(g,120,{n:3,step:.24,w:6,c1:col||P.turmeric,c2:P.ivory,dots:18});rays(g,135,175,20,col||P.turmeric,5);const o={k:0};
  s.parts.push({update:(dt,t)=>{const A=s.C.A;tf(g,A.mx,A.water+LP(80,100),(.5+.5*o.k)*(1+.04*Math.sin(t*1.2)*MV()),0,1,.45);op(g,o.k)}});return o}
async function shot1_3(){D.chip('Episode 1 · The Mountain That Sank');mood('plain');Music.mood('team');
  const s=churnScene({mood:'team'});const C=s.C;Object.assign(C,{sink:2.3,wrap:0,dK:0,aK:0,kurma:0,ledgeK:0,crestK:1});D.setScene(s,1300);shakePart(s);
  C.devas.concat(C.asuras).forEach(f=>f.set('pull'));
  await D.wait(700);
  await D.say('To churn the enormous ocean, the devas and asuras needed a giant churning stick and a mighty rope.',{cues:[['churning stick',()=>{AU.sfx('rumble');D.go(C,{sink:0},3200,'out');D.go(C,{ledgeK:1},1500)}]]});
  await D.say('Mount Mandara would become the churning stick, and Vasuki, the great serpent king, would serve as the rope.',{cues:[['Vasuki',()=>{AU.sfx('swish');D.go(C,{wrap:1},4400,'io')}]]});
  await D.say('The devas held one end of Vasuki, while the asuras held the other.',{cues:[['devas',()=>D.go(C,{dK:1},900)],['asuras',()=>D.go(C,{aK:1},900)]]});
  const pulls=(async()=>{await churnPull(C,-1);await churnPull(C,1);await churnPull(C,-1)})().catch(()=>{});
  await D.say('They began pulling from side to side.');await pulls;
  const rip=()=>{s.fx.ripple(C.A.mx,C.A.water,LP(560,400),P.foam,1900,.22);s.fx.ripple(C.A.mx,C.A.water,LP(380,280),P.turq,1600,.22)};
  await D.say('But suddenly—oh no!',{cues:[['oh no',()=>{AU.sfx('rumble');groupSet(C.devas,'alarmed');groupSet(C.asuras,'alarmed')}]]});
  await D.say('Mount Mandara began sinking into the deep ocean!',{cues:[['sinking',()=>{rip();AU.sfx('ripple');D.go(C,{sink:.45},3600,'io');Timers.add(1600,rip)}]]});
  groupSet(C.devas,'worried');groupSet(C.asuras,'worried');
  await D.say('Their great plan was about to fail.');await D.late()}

/* decision card icons */
function iconLift(g){const m=grp(g);mandara(m);tf(m,0,40,.17);for(const sd of[-1,1]){const h=grp(g,{transform:`translate(${sd*44} 52) scale(${sd} 1)`});shp(h,'M-14 10Q-18 -12 -6 -18L8 -18Q16 -16 14 -8L10 10Z',P.ochre,3);ln(h,'M-8 -18V-26M-2 -18V-28M4 -18V-26',K,3)}
  const ar=grp(g,{transform:'translate(78 -10)'});shp(ar,'M0 -40L22 -14H10V30H-10V-14H-22Z',P.turmeric,3.4)}
function iconVishnu(g){const h=grp(g);rings(h,64,{n:2,step:.2,w:4});const m=medallion(h,52,{bg:P.turq});const v=new Deity('vishnu',m.pic,{pose:'bless'});v.s=.25;v.y=68;v.update(0,0);
  tf(h,0,-12,1);const l=lotus(g,{r:34,n:7,open:.9});tf(l.g,0,64,1);rays(g,40,52,12,P.turmeric,3).setAttribute('transform','translate(0 54) scale(1 .35)')}
async function shot1_4(){D.chip('Episode 1 · Save the Sinking Mountain');let s=D.scene;if(!s||s.id!=='churn'){s=churnScene({mood:'team'});Object.assign(s.C,{sink:.45,crestK:1,kurma:0});D.setScene(s);shakePart(s)}
  const C=s.C;mood('suspense');groupSet(C.devas,'worried');groupSet(C.asuras,'worried');D.go(C,{sink:.75},40000,'lin');
  await D.say('Ocean Explorers, the mountain is sinking!');
  await D.say('How can we help the devas and asuras continue their great churning?');
  const key=await D.choice('kurma',[{key:'A',label:'Pull the mountain higher',icon:iconLift},{key:'B',label:'Call Lord Vishnu for help',icon:iconVishnu}],'Tap a card to help the mountain.');
  mood('plain');
  if(key==='A'){groupSet(C.devas,'pull');groupSet(C.asuras,'pull');
    await D.say('The mountain shakes, but it is still too heavy.',{cues:[['shakes',()=>{AU.sfx('rumble');D.go(s,{shakeK:1},500);D.go(C,{sink:Math.max(0,C.sink-.08)},700,'out');Timers.add(1800,()=>{D.go(C,{sink:C.sink+.18},1800,'io');D.go(s,{shakeK:0},900)})}]]});
    await D.wait(1200);groupSet(C.devas,'worried');groupSet(C.asuras,'worried')}
  else{const ul=underLight(s);s.ul=ul;const vm=vishnuMed(s);s.vm=vm;
    await D.say('A divine light begins to shine beneath the waves.',{cues:[['divine light',()=>{AU.sfx('shell');D.go(ul,{k:1},1600);Timers.add(700,()=>{AU.sfx('chime');D.go(vm,{s:1},900,'back');Timers.add(900,()=>{const m=C.A.med;s.fx.ripple(m[0],m[1],170,P.turmeric,1300)})})}]]});
    groupSet(C.devas,'gaze');groupSet(C.asuras,'gaze');await D.wait(800)}
  await D.late()}

async function shot1_5(){D.chip('Episode 1 · Kurma Supports the Mountain');let s=D.scene;if(!s||s.id!=='churn'){s=churnScene({mood:'team'});Object.assign(s.C,{sink:.8,crestK:1,kurma:0});D.setScene(s);shakePart(s)}
  const C=s.C;mood('plain');Tw.list=Tw.list.filter(t=>!(t.o===C&&'sink' in t.to));
  await D.say('The mountain is too heavy to hold up alone. The devas need divine help!');
  const vm=s.vm||vishnuMed(s);
  let res;await D.say('Just when their plan seemed lost, Lord Vishnu took the form of Kurma, the divine tortoise.',{cues:[['Lord Vishnu',()=>{if(vm.s<.5){AU.sfx('chime');D.go(vm,{s:1},800,'back')}}],['took the form of Kurma',()=>{res=kurmaRescue(s,vm);if(s.ul)D.go(s.ul,{k:0},2400)}]]});await res;
  let lift;await D.say('He dived beneath the waves and supported the enormous mountain on His mighty back.',{cues:[['supported',()=>{lift=kurmaLift(s)}]]});await lift;
  AU.sfx('swell');Music.setLevel(.65,2);groupSet(C.devas,'relieved');groupSet(C.asuras,'relieved');
  await D.say('The mountain became steady once more.');
  groupSet(C.devas,'pull');groupSet(C.asuras,'pull');
  await D.say('Now the great churning could begin!');await D.wait(500);await D.late()}

/* ---- the great churning ---- */
async function shot1_6(){D.chip('Episode 1 · The Great Churning Begins');let s=D.scene;if(!s||s.id!=='churn'){s=churnScene({mood:'team'});D.setScene(s)}
  const C=s.C;mood('energetic');Music.mood('energy');C.ringK=0;D.go(C,{ringK:1},1500);const M=churnMotor(s);vibrate(s);const fishO=dartFish(s);M.base=C.flow;M.rbase=C.rot;
  const hl=halahala(s.top);const ho={y:0,s:0};s.hal=ho;s.parts.push({update:t=>{const A=C.A;hl.x=A.mx;hl.y=lerp(A.water+40,LP(300,560),ho.y);hl.s=ho.s;hl.update(t);op(hl.g,ho.s>.02?1:0)}});
  groupSet(C.devas,'pull');groupSet(C.asuras,'pull');
  await D.say('The devas pulled!',{cues:[['pulled',()=>churnPull(C,-1).catch(()=>{})]]});
  await D.say('The asuras pulled!',{cues:[['pulled',()=>churnPull(C,1).catch(()=>{})]]});
  M.base=C.flow;M.rbase=C.rot;
  await D.say('Round and round went Mount Mandara.',{cues:[['Round',()=>{D.go(M,{speed:1.2},1600);AU.sfx('drum')}]]});
  await D.say('The ocean swirled. The waves grew taller, and bubbles rose to the surface.',{cues:[['swirled',()=>D.go(s,{swell:.4},1200)],['taller',()=>D.go(s,{swell:.85},1400)],
    ['bubbles',()=>{const A=C.A;for(let i=0;i<4;i++)Timers.add(i*320,()=>s.fx.burst(A.mx+(i-1.5)*LP(260,170),A.water+LP(60,90),6,'bubble',1.2));AU.sfx('bubble');D.go(fishO,{k:1},600)}]]});
  await D.say('They pulled harder and kept trying.',{cues:[['harder',()=>{D.go(M,{speed:1.6},900);s.vib=1;D.go(C,{glim:1,energy:1},1500);churnPull(C,-1,1.3).catch(()=>{})}]]});
  await D.say('Then, suddenly, the water began to change.',{cues:[['change',()=>{D.go(M,{speed:.45},1600);s.vib=0;D.go(fishO,{k:0},900);D.go(C,{glim:.3},1500);Music.setLevel(.3,2)}]]});
  await D.say('A strange, dark cloud rose from the ocean.',{cues:[['dark cloud',()=>{AU.sfx('hush');D.go(ho,{y:.8,s:LP(.75,.85)},3600,'io')}]]});
  await D.say('Something was emerging from its depths!');
  await D.say("But it wasn't a treasure.",{cues:[['treasure',()=>{D.go(M,{speed:0},1200);D.go(s,{swell:0},1200)}]]});
  await D.say('It was a terrible poison called Halahala!',{cues:[['Halahala',()=>{D.go(ho,{y:1,s:LP(1.05,1.15)},2000);groupSet(C.devas,'alarmed');groupSet(C.asuras,'alarmed')}]]});
  C.devas.concat(C.asuras).forEach(f=>f.heave=0);await D.wait(600);await D.late()}

/* ---- the poison spreads: restrained colours, low pattern density, patterned violet clouds that keep clear of every face ---- */
function spreadClouds(s,list,parent){const g=grp(parent||s.comp);const cl=list.map(([x,y,w])=>{const c=grp(g);const sh=cloud(c,w,P.mauve);const in_=grp(c);ln(in_,`M${-w*.3} 0Q0 ${w*.08} ${w*.3} 0`,P.violet,4);return{g:c,x,y,k:0}});
  s.parts.push({update:(dt,t)=>cl.forEach((c,i)=>{tf(c.g,c.x+Math.sin(t*.06+i)*24*MV(),c.y,.4+.6*c.k);op(c.g,c.k)})});
  return{list:cl,async grow(ms){for(const c of cl){D.go(c,{k:1},1200,'out');await D.wait((ms||3000)/cl.length)}},fade(ms){cl.forEach(c=>D.go(c,{k:0},ms||3000))}}}
const CLOUDS={L:[[260,110,230],[1520,100,250],[889,50,200],[640,170,170],[1140,170,180],[889,760,260]],P:[[200,180,210],[800,170,220],[500,90,180],[500,1440,280]]};
async function shot1_7(){D.chip('Episode 1 · The Poison Spreads');mood('serious');Music.mood('poison');Music.setLevel(.1,2);
  const s=churnScene({mood:'poison',frame:'violet',stars:4,clouds:[]});const C=s.C;s.seaK=.15;C.ringK=0;D.setScene(s,1500);
  groupSet(C.devas,'alarmed');groupSet(C.asuras,'alarmed');C.sag=.6;C.hold.d=.4;C.hold.a=.4;
  const veil=el('rect',{x:-10,y:-10,width:5000,height:5000,fill:P.violet},s.veil);const vk={k:.24};s.parts.push({update:()=>op(veil,vk.k)});s.vk=vk;
  const cl=spreadClouds(s,L.portrait?CLOUDS.P:CLOUDS.L);s.cl=cl;
  const hl=halahala(s.top);const ho={y:1,s:LP(1.05,1.15)};s.hal=ho;s.parts.push({update:t=>{const A=C.A;hl.x=A.mx;hl.y=lerp(A.water+40,LP(300,560),ho.y);hl.s=ho.s;hl.update(t)}});
  await D.wait(900);
  await D.say('The terrible Halahala poison spread, threatening all creation.',{cues:[['spread',()=>{AU.sfx('hush');D.go(ho,{s:LP(1.3,1.35)},3000);cl.grow(4200).catch(()=>{});D.go(vk,{k:.34},3000)}]]});
  await D.say('The devas were frightened. The asuras stepped back.',{cues:[['frightened',()=>groupSet(C.devas,'worried')],['stepped back',()=>groupSet(C.asuras,'alarmed')]]});
  groupSet(C.devas,'gaze');groupSet(C.asuras,'gaze');
  await D.say('Who could save the universe?');await D.late()}

function iconGroups(g){const sw=grp(g);const h=halahala(sw);h.s=.32;h.update(0);for(const sd of[-1,1]){for(let i=0;i<2;i++){const f=new Fig(sd<0?'deva':'asura',i+(sd<0?0:2),g);f.s=.24;f.x=sd*(64+i*26);f.y=62;f.f=-sd;f.set('amazed');for(let k=0;k<30;k++)f.update(.1,0)}}}
function iconShiva(g){rings(g,58,{n:2,step:.2,w:4});const m=grp(g,{transform:'translate(0 -16)'});shp(m,'M-10 -40A36 36 0 1 0 30 6A27 27 0 1 1 -10 -40Z',P.ivory,3.6);
  const l=lotus(g,{r:34,n:7,open:.9});tf(l.g,0,62,1);rays(g,40,52,12,P.turmeric,3).setAttribute('transform','translate(0 54) scale(1 .35)')}
async function shot1_8(){D.chip('Episode 1 · Who Can Save the Universe?');let s=D.scene;if(!s||!s.hal){await shot1_7();s=D.scene}
  const C=s.C,ho=s.hal;mood('serious');
  await D.say('Ocean Explorers, the whole universe is in danger!');
  await D.say('Who should we turn to for help?');
  const key=await D.choice('shiva',[{key:'A',label:'Ask the devas and asuras to stop the poison',icon:iconGroups},{key:'B',label:'Call Lord Shiva',icon:iconShiva}],'Tap a card to choose who helps.');
  mood('serious');
  if(key==='A'){groupSet(C.devas,'amazed');groupSet(C.asuras,'amazed');
    await D.say('They try, but the dangerous poison continues to spread.',{cues:[['continues',()=>{AU.sfx('hush');D.go(ho,{s:ho.s+.15},2400)}]]});
    groupSet(C.devas,'worried');groupSet(C.asuras,'worried');await D.wait(800)}
  else{/* a soft golden light, and Shiva's silhouette steps into it */const g=grp(s.top);const col=grp(g);rings(col,110,{n:3,step:.22,w:5});rays(col,120,170,22,P.turmeric,4);
    const sil=grp(g);INK.ghost=true;let sh;try{sh=new Deity('shiva',sil,{pose:'shiva'})}finally{INK.ghost=false}const o={k:0,step:0};
    s.parts.push({update:(dt,t)=>{const A=C.A;const x=A.mx-LP(250,250),y=LP(560,930);tf(col,x,y-LP(150,170),.5+.5*o.k);op(col,o.k);sh.x=x;sh.y=y-(1-o.step)*30;sh.s=LP(.62,.62)*(.85+.15*o.step);sh.update(dt,t);op(sil,o.step)}});
    await D.say('A divine light appears, and Lord Shiva arrives.',{cues:[['divine light',()=>{AU.sfx('chime');D.go(o,{k:1},1400)}],['Lord Shiva',()=>{AU.sfx('shell');D.go(o,{step:1},1800,'out')}]]});
    groupSet(C.devas,'gaze');groupSet(C.asuras,'gaze');await D.wait(900)}
  await D.late()}

/* ---- Lord Shiva saves the universe ---- */
async function shot1_9(){D.chip('Episode 1 · Lord Shiva Saves the Universe');mood('serious');const s=shivaScene();s.seaK=.15;s.poisonK=1;D.setScene(s,1400);const sh=s.shiva;sh.throat=0;
  const veil=el('rect',{x:-10,y:-10,width:5000,height:5000,fill:P.violet},s.veil);const vk={k:.3};s.parts.push({update:()=>op(veil,vk.k)});
  const cl=spreadClouds(s,L.portrait?[[200,200,200],[800,190,210],[500,90,170]]:[[300,110,220],[1480,100,240],[889,40,180]],s.comp);cl.list.forEach(c=>c.k=1);
  s.cast.devas.forEach(f=>f.set('worried'));s.cast.asuras.forEach(f=>f.set('alarmed'));if((Store.data.choices||{}).shiva==='B')s.st.step=.6;
  /* the contained poison sits low, beside Lord Shiva, never near a face */
  const hl=halahala(s.top);const ho={u:0,s:LP(.95,.9)};const start=()=>LP([1170,690],[720,1060]);
  s.parts.push({update:t=>{const A=s.A;const th=[A.x,A.y-256*A.s];const p0=start();const u=ho.u;const mid=[p0[0]-LP(40,20),th[1]+LP(150,190)];
    const x=u<.6?lerp(p0[0],mid[0],u/.6):lerp(mid[0],th[0],(u-.6)/.4),y=u<.6?lerp(p0[1],mid[1],u/.6):lerp(mid[1],th[1],(u-.6)/.4);hl.x=x;hl.y=y;hl.s=ho.s;hl.update(t);op(hl.g,ho.s>.03?1:0)}});
  await D.wait(700);
  await D.say('The poison is too dangerous for them to stop alone.');
  await D.say('Then Lord Shiva stepped forward.',{cues:[['stepped',()=>{AU.sfx('chime');D.go(s.st,{step:1},2400,'out')}]]});
  s.cast.devas.forEach(f=>f.set('gaze'));s.cast.asuras.forEach(f=>f.set('gaze'));
  await D.say('He understood that every living being was in danger. With great compassion, Shiva took in the terrible poison and held it in His throat to protect creation.',
    {cues:[['took in',()=>{AU.sfx('hush');D.go(ho,{u:1,s:.12},4200,'io')}]]});
  await D.wait(500);D.go(ho,{s:0},500);
  await D.say('The poison turned His throat blue.',{cues:[['blue',()=>{AU.sfx('shell');D.go(sh,{throat:1},1400,'back')}]]});
  await D.say('From that moment, He became known as Neelkanth, the blue-throated Lord.',{cues:[['Neelkanth',()=>{AU.sfx('chime');D.go(s.st,{halo:1},2000)}]]});
  mood('plain');
  await D.say('The universe was saved!',{cues:[['saved',()=>{cl.fade(3500);D.go(vk,{k:0},4000);D.go(s,{poisonK:0,seaK:.8},5000,'io');Music.mood('wonder');Music.swell()}]]});
  s.cast.devas.forEach(f=>f.set('amazed'));s.cast.asuras.forEach(f=>f.set('amazed'));
  await D.say('The devas and asuras watched in wonder.');
  s.cast.devas.forEach(f=>f.set('namaste'));s.cast.asuras.forEach(f=>f.set('namaste'));
  await D.say('They had begun their adventure searching for treasure, but Lord Shiva showed them something even more precious.');
  /* the moral appears as a large read-along caption */
  await D.chant('True strength is not just about being powerful. It is also about protecting others and putting their well-being first.',{narr:true,who:'Read along',wait:2600});
  AU.sfx('chime');await D.wait(1600);await D.late()}

async function shot1_10(){D.chip('Episode 1 · The Golden Light Beneath');mood('gentle');Music.mood('wonder');
  const s=oceanScene1();Object.assign(s,{glimOn:0,cenShow:0,awake:.5,lotOpen:.8});s.seaK=.5;D.setScene(s,1500);
  const g=grp(s.comp);rings(g,90,{n:3,step:.24,w:6,c1:P.turmeric,c2:P.ivory,dots:16});rays(g,100,140,20,P.turmeric,5);star4(g,0,0,24,P.turmeric);const o={k:0};
  s.parts.push({update:(dt,t)=>{const c=L.portrait?[500,900]:[889,560];tf(g,c[0],c[1],(.3+.9*o.k)*(1+.04*Math.sin(t*1.1)*MV()),0,1,.6);op(g,o.k)}});
  await D.wait(800);
  await D.say('The danger had passed, but the great churning was not finished.');
  await D.say('What other wonders were hidden beneath the ocean?');
  await D.say('Would the devas and asuras find jewels, divine gifts, or the precious nectar they had been seeking?');
  AU.sfx('sparkle');await D.tw(o,{k:1},2200,'out');
  mood('cliff');
  await D.say("Our adventure isn't over, Ocean Explorers. The greatest treasures are still waiting!");await D.late();
  /* fade to golden light, then the Episode 2 title */
  Music.setLevel(.6,2);await irisOut(s,L.portrait?[500,900]:[889,560],P.turmeric)}
