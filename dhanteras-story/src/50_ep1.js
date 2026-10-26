/* ================= EPISODE 1: THE OCEAN THAT HELD A SECRET ================= */
const E1={fishY:[[380,470,560,650,730],[560,720,880,1040,1200,1340]],
  lot:[[[300,326,.7],[1480,318,.7],[160,748,1.1],[1620,740,1.1]],[[170,520,.75],[830,540,.75],[110,1370,1.05],[890,1376,1.05]]],
  shell:[[1300,700,1.1],[730,1190,1.05]],shell2:[[520,770,.7],[270,1440,.7]],center:[[889,560,95],[500,900,110]],
  glim:[[[260,420],[640,380],[980,452],[1360,410],[1560,520],[420,610],[1150,640]],[[150,600],[420,560],[800,640],[300,820],[700,860],[160,1060],[860,1100]]],
  big:[[889,470],[500,760]],jew:[[[540,520],[1240,540]],[[250,700],[770,980]]],
  med:{d:[[420,330],[290,420]],v:[[1360,310],[710,420]],a:[[1360,330],[710,420]],dc:[[742,330],[364,420]],ac:[[1036,330],[636,420]],r:[150,136]}};
function oceanScene1(){const s=mkScene('ocean1',{frame:'scallop'});
  oceanBg(s,{mood:'wonder',seed:7});const P_=()=>L.portrait?1:0;
  const comp=s.comp;const circL=grp(comp);const circs=[0,1,2,3].map(i=>{const g=grp(circL);rings(g,46,{n:3,step:.3,w:3.4,c1:P.foam,c2:P.turq});return g});
  s.parts.push({update:(dt,t)=>{const pts=L.portrait?[[160,940],[840,780],[300,1250],[700,1430]]:[[180,560],[1600,450],[760,700],[1080,420]];circs.forEach((g,i)=>tf(g,pts[i][0],pts[i][1],(L.portrait?1.2:1)*(.9+.08*Math.sin(t*.7+i)*MV()),0,1,.42))}});
  const glL=grp(comp),jwL=grp(comp),fishL=grp(comp),lotL=grp(comp),shellL=grp(comp),cenL=grp(comp),bubL=grp(comp),medL=grp(comp);
  /* partly concealed jewels: a small band of waves in front of each */
  const jw=[0,1].map(i=>{const g=grp(jwL);const j=jewel(g,i?P.turq:P.verm);tf(j,0,-6,1.1);const c=crest(g,110);tf(c,0,14,1);return g});
  const gl=E1.glim[0].map((_,i)=>{const g=grp(glL);star4(g,0,0,12,i%2?P.turmeric:P.gold);circ(g,0,0,3,P.ivory,0);return{g,k:0}});
  const big=grp(glL);rings(big,46,{n:3,step:.3,w:4});star4(big,0,0,26,P.turmeric);circ(big,0,0,6,P.ivory,2);s.big={k:0};
  const fishes=[];for(let i=0;i<6;i++){const f=fish(fishL,i);fishes.push({...f,u:(i*.37)%1,dir:i%2?-1:1,sp:.018+.008*(i%3),ph:i*1.3,still:0,stir:0})}
  const lots=[0,1,2,3].map(i=>{const l=lotus(lotL,{r:60,n:7,open:0,col:i%2?P.pink:P.coral});return l});
  const sh=shell(shellL,P.ivory);const sh2=shell(shellL,P.coral);const shT=target(shellL,70);
  const cen=lotus(cenL,{r:100,n:9,open:0});const cenT=target(cenL,120);
  const bubbles=[];for(let i=0;i<7;i++){const b=bubble(bubL,6+(i%3)*4);bubbles.push({g:b,u:Math.random(),v:Math.random(),sp:.04+Math.random()*.04})}
  s.fx=fxLayer(s);s.demo=demoHand(s);
  Object.assign(s,{awake:1,lotOpen:1,dance:0,shellOn:0,cenOn:0,cenShow:0,glimOn:0,sweep:{k:0}});
  s.onLayout=function(){const i=P_();s.cam.fx=L.portrait?500:889;s.cam.fy=L.portrait?800:420;
    jw.forEach((g,j)=>tf(g,E1.jew[i][j][0],E1.jew[i][j][1],L.portrait?.9:1));tf(big,E1.big[i][0],E1.big[i][1],1);
    const sp=E1.shell[i];tf(sh,sp[0],sp[1],sp[2]);shT.x=sp[0];shT.y=sp[1]-10;const s2=E1.shell2[i];tf(sh2,s2[0],s2[1],s2[2]);
    const c=E1.center[i];tf(cen.g,c[0],c[1]+c[2]*.3,c[2]/100);cenT.x=c[0];cenT.y=c[1]-c[2]*.2;cenT.g.setAttribute('data-r',c[2]);s.onLayout2&&s.onLayout2()};
  s.tick=function(dt,t){const i=P_(),m=MV(),aw=this.awake;const W=L.portrait?1000:1778;
    gl.forEach((g,j)=>{const p=E1.glim[i][j];const cyc=(t*.5+j*.9)%(gl.length*.9);const k=this.glimOn*(cyc<1.4?Math.sin(cyc/1.4*Math.PI):0);tf(g.g,p[0],p[1],.25+.75*k);op(g.g,k>.02?1:0)});
    op(big,this.big.k>.01?1:0);if(this.big.k>.01)tf(big,E1.big[i][0],E1.big[i][1],.4+.8*this.big.k);
    const fy=E1.fishY[i];fishes.forEach((f,j)=>{const y=fy[j%fy.length];f.u+=dt*f.sp*aw*m*(1+this.dance*.6);const x=-260+((f.u%1+1)%1)*(W+520);const xx=f.dir>0?x:W-x;
      const bob=Math.sin(t*1.6+f.ph)*(4+this.dance*16)*aw+f.stir*Math.sin(t*9)*8;tf(f.g,xx,y+bob,L.portrait?1.35:1.05,(this.dance*12*Math.sin(t*2+f.ph))*aw,f.dir,1);
      f.tail.setAttribute('transform',`rotate(${f1(Math.sin(t*4+f.ph)*10*(aw*.9+.1))} -22 0)`)});
    lots.forEach((l,j)=>{const p=E1.lot[i][j];l.set(this.lotOpen);tf(l.g,p[0],p[1],p[2]*(L.portrait?1.3:.9),Math.sin(t*.8+j)*3*m*aw)});
    shT.on=this.shellOn;shT.update(t);cenT.on=this.cenOn;cenT.update(t);op(cen.g,this.cenShow);cen.set(this.cenOpen||0);
    bubbles.forEach((b,j)=>{b.v-=dt*b.sp*aw*m;if(b.v<0){b.v=1;b.u=Math.random()}const top=L.portrait?470:290,bot=L.portrait?1480:800;tf(b.g,b.u*W,top+b.v*(bot-top),1);op(b.g,aw>.1?1:0)})};
  s.lots=lots;s.fishes=fishes;s.shT=shT;s.cenT=cenT;s.cen=cen;s.gl=gl;s.medL=medL;s.sh=sh;
  s.hots=function(){const h=[];const i=P_();if(this.shellOn>.5){const sp=E1.shell[i];h.push({id:'shell',label:'Glowing shell: tap to call the ocean creatures',x:sp[0],y:sp[1]-10,r:80,on:()=>this.onShell&&this.onShell()})}
    if(this.cenOn>.5){const c=E1.center[i];h.push({id:'lotus',label:'Central lotus: tap to clap',x:c[0],y:c[1]-c[2]*.2,r:c[2]*1.1,on:()=>this.onLotus&&this.onLotus()})}
    if(this.waveOn){h.push({id:'waves',label:'Waves: press to sweep the waves',x:L.portrait?500:889,y:L.portrait?1100:620,r:120,on:()=>this.onSweepKey&&this.onSweepKey()})}return h};
  return s}

/* medallion cameos (builder addition: Scene 1 has no characters) */
function figMed(parent,kind,r,face){const m=medallion(parent,r,{bg:kind==='vishnu'?P.turq:P.indigo});const figs=[];
  if(kind==='vishnu'){const v=new Deity('vishnu',m.pic,{pose:'bless'});v.s=.56*r/150;v.x=0;v.y=150*r/150;figs.push(v)}
  else{for(let i=0;i<3;i++){const f=new Fig(kind==='devas'?'deva':'asura',i+(kind==='devas'?0:1),m.pic);f.s=.56*r/150;f.x=(i-1)*70*r/150+(kind==='devas'?-6:6);f.y=150*r/150+(i===1?8:0);f.f=kind==='devas'?1:-1;f.set(face||'idle');figs.push(f)}}
  const dim=circ(m.pic,0,0,m.inner,P.midnight,0);op(dim,0);
  return{m,figs,dim,x:0,y:0,s:0,k:{dim:0},update(dt,t){tf(m.g,this.x,this.y,this.s);op(m.g,this.s>.02?1:0);figs.forEach(f=>f.update(dt,t));op(dim,this.k.dim)}}}

async function shot1_1(){await titleCard(1,'The Ocean That Held a Secret');D.chip('Episode 1 · The Ocean That Held a Secret');D.setMood({pitch:1,rate:1});Music.mood('wonder');
  const s=oceanScene1();D.setScene(s,1200);s.glimOn=0;s.cenShow=0;await D.wait(900);
  D.go(s.cam,{z:1.04},60000,'io');
  await D.say('Children, imagine that tonight, when the world becomes quiet and the stars begin to twinkle, you discover a secret.');
  await D.say('Far, far away, beyond the mountains, beyond the forests, beyond even the clouds, lies a magnificent ocean.');
  await D.say('But this is no ordinary ocean.');
  await D.say('It is the Ocean of Milk, known as Kshira Sagara — a magical ocean whose depths hold extraordinary treasures.');
  D.go(s,{glimOn:1},1500);AU.sfx('sparkle');
  await D.say('Hidden beneath its beautiful waves are precious jewels, wonderful creatures, divine gifts, and something more precious than anything else.',
    {cues:[['something more precious',()=>{AU.sfx('chime');tw(s.big,{k:1},700,'out').then(()=>tw(s.big,{k:0},900))}]]});
  await D.say('Something the devas and asuras both desperately want.');
  await D.say('It is called amrit, the divine nectar associated with immortality.');await D.late()}

async function shot1_2(){D.chip('Episode 1 · The Heavenly Plan');let s=D.scene;if(!s||s.id!=='ocean1'){s=oceanScene1();D.setScene(s);s.glimOn=1}
  const r=()=>E1.med.r[L.portrait?1:0];const pos=(k)=>E1.med[k][L.portrait?1:0];
  const md=figMed(s.medL,'devas',r(),'tired'),mv=figMed(s.medL,'vishnu',r()),ma=figMed(s.medL,'asuras',r());s.parts.push(md,mv,ma);
  s.cast.vishnu=mv.figs[0];s.cast.devas=md.figs;s.cast.asuras=ma.figs;D.cast=s.cast;
  const place=()=>{[[md,'d'],[mv,'v'],[ma,'a']].forEach(([m,k])=>{if(!m.moved){const p=pos(k);m.x=p[0];m.y=p[1]}})};place();s.onLayout2=place;
  md.k.dim=.35;
  await D.say('Long ago, the devas, who protected the heavenly worlds, had lost their strength and splendour. They needed help to regain their power.',{cues:[['Long ago',()=>{AU.sfx('swish');D.go(md,{s:1},900,'back')}]]});
  await D.say('So, they approached Lord Vishnu.',{cues:[['approached',()=>{AU.sfx('chime');D.go(mv,{s:1},900,'back')}]]});
  await D.say('Lord Vishnu listened to their troubles and revealed a plan.');md.figs.forEach(f=>f.set('gaze'));D.go(md.k,{dim:0},1600);
  await D.say([['vishnu','“The nectar you seek lies hidden within the great Ocean of Milk. To obtain it, the ocean must be churned.”']]);
  await D.say('But there was one enormous problem.');md.figs.forEach(f=>f.set('worried'));
  await D.say('The ocean was too vast for the devas to churn alone.');
  D.go(mv,{s:0},700);
  await D.say('They would need help — even from their rivals, the asuras.',{cues:[['the asuras',()=>{AU.sfx('swish');D.go(ma,{s:1},900,'back')}]]});
  md.moved=ma.moved=true;
  await D.say('And so, the devas and asuras agreed to work together for a common goal.',{cues:[['agreed',()=>{const a=pos('dc'),b=pos('ac');D.go(md,{x:a[0],y:a[1]},1600);D.go(ma,{x:b[0],y:b[1]},1600);md.figs.concat(ma.figs).forEach(f=>f.set('relieved'))}]]});
  await D.say('Together, they would attempt something no one had ever done before.');
  await D.say('They would churn the entire cosmic ocean!',{cues:[['churn',()=>{md.figs.concat(ma.figs).forEach(f=>f.set('cheer'));AU.sfx('ripple');D.go(s,{swell:1},900);Timers.add(1500,()=>D.go(s,{swell:0},1400))}]]});
  await D.wait(600);await D.late();
  D.go(md,{s:0},700);D.go(ma,{s:0},700);await D.wait(800)}

async function shot1_3(){D.chip('Episode 1 · Wake Up the Ocean');let s=D.scene;if(!s||s.id!=='ocean1'){s=oceanScene1();D.setScene(s)}const tok=D.token;
  const i=()=>L.portrait?1:0;
  /* the ocean falls asleep: waves still, fish still, lotuses closed, colours a little muted */
  const veil=el('rect',{x:-10,y:-10,width:4000,height:4000,fill:P.midnight},s.veil);s.veilK={k:0};s.parts.push({update:()=>op(veil,s.veilK.k*.32)});
  D.go(s,{awake:0,lotOpen:0,glimOn:0},2200);D.go(s.veilK,{k:1},2200);s.seaK=1;D.go(s,{seaK:0},2200);
  await D.say('And guess what, children?');
  await D.say('Today, you are not just listening to this story.');
  await D.say('You are our special Ocean Explorers!',{cues:[['Ocean Explorers',()=>{$('badge').hidden=false;Badge.render();AU.sfx('chime')}]]});
  await D.say('But before our adventure can begin, the sleeping ocean needs to wake up.');
  await D.say('Are you ready to help?');
  /* ---- stage 1: waves ---- */
  await D.say('First, let us wake up the waves!');
  await D.say('Move your hands gently from side to side, just like the ocean.');
  {let n=0,dir=0,lastX=null,acc=0;D.instr('Swish your finger across the water, side to side.','0 of 3 sweeps','drag');s.waveOn=true;Hot.dirty=true;
    const bump=()=>{n++;D.counter(`${Math.min(n,3)} of 3 sweeps`);AU.sfx('ripple');D.go(s,{seaK:n/3},900);D.go(s.veilK,{k:1-n/3*.5},900)};
    await D.task({hint:'Swish your finger across the waves!',
      start(t){s.down=p=>{lastX=p.x;s.fx.ripple(p.x,p.y,80,P.foam,900)};
        s.move=p=>{if(lastX==null)return;const dx=p.x-lastX;lastX=p.x;if(Math.sign(dx)!==dir&&Math.abs(dx)>2){if(acc>180){bump();if(n>=3)t.finish()}dir=Math.sign(dx);acc=0}acc+=Math.abs(dx);
          if(Math.random()<.25)s.fx.ripple(p.x,p.y,60,P.foam,800)};
        s.up=()=>{if(acc>180){bump();if(n>=3)t.finish()}lastX=null;acc=0;dir=0};
        s.onSweepKey=()=>{bump();if(n>=3)t.finish()};
        s.camHand=h=>{const x=h.p.x;if(s._hx!=null){const dx=x-s._hx;if(Math.sign(dx)!==dir&&Math.abs(dx)>4){if(acc>200){bump();if(n>=3)t.finish()}dir=Math.sign(dx);acc=0}acc+=Math.abs(dx)}s._hx=x}},
      demo(){const y=L.portrait?1100:620,a=L.portrait?200:500,b=L.portrait?800:1280;s.demo.drag([[a,y],[b,y],[a,y]],1800);
        const f=s.fishes[0];f.sp=.09;Timers.add(2600,()=>{f.sp=.018})},
      async assist(t){while(n<3){bump();await D.wait(700)}t.finish()}});
    s.down=s.move=s.up=s.camHand=null;s.waveOn=false;D.clearAct()}
  await D.say('Wonderful!');
  /* ---- stage 2: creatures ---- */
  await D.say('Now, can you hear the ocean creatures sleeping beneath the water?');
  await D.say('Let us call them with a gentle sound.');
  {let n=0;D.go(s,{shellOn:1},500);Hot.dirty=true;const sp=()=>E1.shell[i()];
    const tapShell=()=>{if(n>=3)return;n++;AU.sfx('bubble');const p=sp();s.fx.burst(p[0],p[1]-40,7,'bubble',1.2);const f=s.fishes[(n-1)%s.fishes.length];f.stir=1;D.go(f,{stir:0},1200);
      s.awake=Math.max(s.awake,n/3*.4);D.counter(`${n} of 3 taps`);if(n>=3&&s._t)s._t.finish()};
    s.down=p=>{const q=sp();if(Math.hypot(p.x-q[0],p.y-q[1]+10)<110)tapShell();else{s.fx.ripple(p.x,p.y,60,P.foam,800);AU.sfx('ripple')}};s.onShell=tapShell;s.camMouth=tapShell;
    await D.chant('Blub, blub, blub!',{narr:true,who:'Say it softly',wait:3000});
    if(n<3){D.instr('Tap the glowing shell three times.',`${n} of 3 taps`,'tap');
      await D.task({hint:'Tap the glowing shell, blub, blub!',start(t){s._t=t;if(n>=3)t.finish()},demo(){const q=sp();s.demo.tap(q[0],q[1]-10,3)},
        async assist(t){while(n<3){tapShell();await D.wait(600)}t.finish()}})}
    s._t=null;s.down=null;s.onShell=null;s.camMouth=null;D.go(s,{shellOn:0},500);D.clearAct()}
  /* ---- stage 3: magic ---- */
  await D.say("And finally, let us awaken the ocean's magic. Clap your hands three times and say:");
  {let n=0;D.go(s,{cenShow:1,cenOn:1},700);Hot.dirty=true;const cp=()=>E1.center[i()];
    const clap=()=>{if(n>=3)return;n++;AU.sfx('drum');const c=cp();s.fx.ripple(c[0],c[1]-c[2]*.2,c[2]*2.2,P.turmeric,1300);s.cenOpen=n/3*.35;D.counter(`${n} of 3 claps`);if(n>=3&&s._t)s._t.finish()};
    s.down=p=>{const c=cp();if(Math.hypot(p.x-c[0],p.y-(c[1]-c[2]*.2))<c[2]*1.3)clap();else s.fx.ripple(p.x,p.y,60,P.foam,800)};s.onLotus=clap;s.camClap=clap;
    await D.chant('Ocean of Wonders, wake up!',{narr:true,who:'Everyone together'});
    if(n<3){D.instr('Tap the lotus three times, like three claps.',`${n} of 3 claps`,'tap');
      await D.task({hint:'Tap the lotus three times!',start(t){s._t=t;if(n>=3)t.finish()},demo(){const c=cp();s.demo.tap(c[0],c[1]-c[2]*.2,3)},
        async assist(t){while(n<3){clap();await D.wait(600)}t.finish()}})}
    s._t=null;s.down=null;s.onLotus=null;s.camClap=null;D.go(s,{cenOn:0},400);D.clearAct()}
  D.guard(tok);
  /* payoff: everything wakes together */
  AU.sfx('success');D.go(s,{awake:1,seaK:1,lotOpen:1,dance:1,glimOn:1,cenOpen:1},2200);D.go(s.veilK,{k:0},2200);Music.setLevel(.7,2);
  await D.say('Look! The waves are moving. The fish are dancing. The lotus flowers are opening.');
  await D.say('The Ocean of Wonders is awake!');Badge.gain(0);
  await D.say('But our great adventure is only beginning.');
  D.go(s,{dance:.3},1500);await D.late();
  /* transition: waves part symmetrically and a golden circle opens at the centre */
  await irisOut(s,L.portrait?[500,800]:[889,420])}

/* golden circular motif that opens from the centre and fills the frame (episode transition) */
async function irisOut(s,c,col){const g=grp(s.top);const h=halo(g,120,{col:col||P.turmeric});rings(g,100,{n:3,step:.25,w:5});const o={k:0};
  s.parts.push({update:()=>{tf(g,c[0],c[1],.05+o.k*9,o.k*40)}});AU.sfx('swish');await D.tw(o,{k:1},1600,'in')}
