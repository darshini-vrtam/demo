/* ================= EPISODE 6: THE DIVINE ARRIVAL OF LORD DHANVANTARI ================= */
const DIV={L:{lot:[889,668],lr:1.3,dh:[889,604],ds:1.15,aura:[889,288],ar:1,dev:[[70,784],[160,784],[250,784]],as:[[1528,784],[1618,784],[1708,784]],fs:.5,
    flank:[[560,730],[1218,730]],orb:[[440,740],[1338,740]],fish:[[300,520],[1480,520]],star:[[560,250],[1218,250],[700,120],[1078,120]]},
  P:{lot:[500,1190],lr:1.3,dh:[500,1120],ds:1.25,aura:[500,772],ar:1.1,dev:[[60,1486],[140,1486],[220,1486]],as:[[780,1486],[860,1486],[940,1486]],fs:.42,
    flank:[[170,1290],[830,1290]],orb:[[150,1360],[850,1360]],fish:[[180,980],[820,980]],star:[[160,560],[840,560],[300,450],[700,450]]}};
function divineScene(){const s=mkScene('divine',{frame:'gold'});oceanBg(s,{mood:'divine',seed:51,clouds:[[.12,.35,LP(170,130)],[.9,.3,LP(180,130)]]});
  const comp=s.comp;const ripL=grp(comp),auraL=grp(comp),flankL=grp(comp),herbL=grp(comp),lotL=grp(comp),figL=grp(comp),fxL=grp(comp);
  /* golden rings spreading across the water */
  const rip=[0,1,2,3].map(i=>{const g=grp(ripL);el('ellipse',{rx:300,ry:60,fill:'none',stroke:K,'stroke-width':8},g);el('ellipse',{rx:300,ry:60,fill:'none',stroke:i%2?P.turmeric:P.ivory,'stroke-width':4,'stroke-dasharray':i%2?'30 12':'.1 14','stroke-linecap':'round'},g);return g});
  /* aura: concentric folk-art circles and patterned rays */
  const aura=grp(auraL);rays(aura,200,250,28,P.turmeric,6);halo(aura,190,{col:P.turmeric});rings(aura,165,{n:3,step:.18,w:5,c1:P.gold,c2:P.ivory,dots:16});circ(aura,0,0,104,P.turmeric,4);circ(aura,0,0,90,'none',3,{stroke:P.verm,'stroke-dasharray':'.1 10','stroke-width':6,'stroke-linecap':'round'});
  const flank=[0,1].map(i=>lotus(flankL,{r:62,n:7,open:.9,col:i?P.pink:P.coral}));
  const fishes=[0,1].map(i=>fish(fxL,i));const stars=[0,1,2,3].map(i=>{const g=grp(fxL);star4(g,0,0,12,i%2?P.ivory:P.turmeric);return g});
  /* the large lotus; Lord Dhanvantari stands inside it, between its back and front petals */
  const lot=lotus(lotL,{r:150,n:11,open:0});const inside=grp(lot.g);lot.g.insertBefore(inside,lot.g.children[2]);
  const clipR=el('rect',{x:-600,y:-1200,width:1200,height:1160},el('clipPath',{id:uid('dc')},lotL));inside.setAttribute('clip-path',`url(#${clipR.parentNode.id})`);
  const dWrap=grp(inside);const ghostG=grp(dWrap),fullG=grp(dWrap);
  INK.ghost=true;let ghost;try{ghost=new Deity('dhanv',ghostG,{pose:'kalash'})}finally{INK.ghost=false}
  const dh=new Deity('dhanv',fullG,{pose:'kalash'});const kal=kalash(fullG);const glint=grp(dWrap);star4(glint,0,0,16,P.turmeric);circ(glint,0,0,4,P.ivory,0);
  const meter=grp(lotL);circ(meter,0,0,118,'none',16,{stroke:K});const arc=el('circle',{cx:0,cy:0,r:118,fill:'none',stroke:P.turmeric,'stroke-width':10,'stroke-dasharray':'0 999',transform:'rotate(-90)'},meter);
  const cT=target(lotL,90);
  const devas=[0,1,2].map(i=>new Fig('deva',i,figL)),asuras=[0,1,2].map(i=>new Fig('asura',i,figL));s.cast.devas=devas;s.cast.asuras=asuras;s.cast.dhanv=dh;
  /* medicinal herbs, leaves and petals drifting slowly around the lotus during the health lesson */
  const herbs=[];for(let i=0;i<8;i++){const g=grp(herbL);if(i%3===0)sprig(g,.6);else if(i%3===1)leaf(g,40,12,P.leaf,-30);else{shp(g,'M0 0Q9 -12 0 -24Q-9 -12 0 0Z',i%2?P.pink:P.ivory,2.4)}herbs.push({g,a:i/8*TAU,r:.8+(i%3)*.12})}
  Object.assign(s,{lot,ghost,dh,kal,glint,arc,meter,cT,aura,herbs,st:{rise:0,ghost:0,glint:0,aura:0,rip:0,herb:0,warm:0,meter:0,turn:0,lit:0}});
  s.onLayout=function(){s.A=L.portrait?DIV.P:DIV.L;const A=s.A;devas.forEach((f,i)=>{f.x=A.dev[i][0];f.y=A.dev[i][1];f.s=A.fs;f.f=1});asuras.forEach((f,i)=>{f.x=A.as[i][0];f.y=A.as[i][1];f.s=A.fs;f.f=-1})};
  s.tick=function(dt,t){const A=s.A,st=s.st,m=MV();
    rip.forEach((g,i)=>{const k=((t*.12+i/4)%1);tf(g,A.lot[0],A.lot[1]+10,(.4+k*1.9)*st.rip);op(g,st.rip*(1-k))});
    tf(aura,A.aura[0],A.aura[1],A.ar*(.3+.7*st.aura),t*2*m);op(aura,st.aura);
    flank.forEach((l,i)=>tf(l.g,A.flank[i][0],A.flank[i][1],1,Math.sin(t*.7+i)*3*m));
    fishes.forEach((f,i)=>{const sd=i?-1:1;tf(f.g,A.fish[i][0]+Math.sin(t*.4+i)*40*m,A.fish[i][1]+Math.sin(t*1.3+i)*8,.8,0,sd,1);f.tail.setAttribute('transform',`rotate(${f1(Math.sin(t*4+i)*10)} -22 0)`)});
    stars.forEach((g,i)=>tf(g,A.star[i][0],A.star[i][1],.6+.4*Math.abs(Math.sin(t*.6+i*1.3))*m));
    tf(lot.g,A.lot[0],A.lot[1],A.lr*(L.portrait?1:.86));lot.set(s.lotOpen||0,true);
    const ls=A.lr*(L.portrait?1:.86);const lx=0,ly=0;/* Lord Dhanvantari in lotus coordinates */
    const dy=-30-(1-st.rise)*260;dh.x=0;dh.y=dy;dh.s=A.ds/ls;ghost.x=0;ghost.y=-30-(1-Math.max(st.ghost>0?.85:0,st.rise))*260+(st.ghost>0?0:0);ghost.s=A.ds/ls;
    dh.update(dt,t);ghost.update(dt,t);op(fullG,st.rise>0?1:0);op(ghostG,st.ghost*(1-st.rise));
    const hl=dh.handW(-1),hr=dh.handW(1);kal.x=(hl[0]+hr[0])/2;kal.y=(hl[1]+hr[1])/2-22*dh.s;kal.s=.5*dh.s;kal.glow=st.rise;kal.update(t);
    const gl=ghost.handW(-1),gr=ghost.handW(1);tf(glint,(gl[0]+gr[0])/2,(gl[1]+gr[1])/2-30*ghost.s,(.5+.5*Math.abs(Math.sin(t*.7)))*st.glint/ls);
    const lc=lotC(s);tf(meter,lc[0],lc[1],1);cT.x=lc[0];cT.y=lc[1];op(meter,st.meter);this.arc.setAttribute('stroke-dasharray',`${f1(st.warm*741)} 999`);cT.update(t);
    herbs.forEach((h,i)=>{h.a+=dt*.12*m;const R=LP(330,300)*h.r;tf(h.g,A.lot[0]+Math.cos(h.a)*R*1.25,A.lot[1]-150+Math.sin(h.a)*R*.55,1,Math.sin(t*.5+i)*20);op(h.g,st.herb)});
    devas.concat(asuras).forEach(f=>f.update(dt,t))};
  s.fx=fxLayer(s);s.demo=demoHand(s);return s}
/* the centre of the lotus in composition units */
function lotC(s){const A=s.A;const k=A.lr*(L.portrait?1:.86);return[A.lot[0],A.lot[1]-70*k]}

async function shot6_1(){await titleCard(6,'The Divine Arrival of Lord Dhanvantari');D.chip('Episode 6 · The Golden Light');Music.mood('divine');D.setMood({rate:.95});
  const s=divineScene();const st=s.st;D.setScene(s,1300);s.cast.devas.forEach(f=>f.set('pull'));s.cast.asuras.forEach(f=>{f.set('pull');f.f=1});s.seaK=1;
  await D.wait(700);
  await D.say('The ocean grew still.',{cues:[['still',()=>D.go(s,{seaK:.2},2400)]]});
  await D.say('The waves shimmered.',{cues:[['shimmered',()=>{D.go(st,{rip:.5},2000);AU.sfx('sparkle')}]]});
  await D.say('A beautiful golden light spread across the water.',{cues:[['golden light',()=>D.go(st,{rip:1},2400)]]});
  await D.say('The devas stopped pulling.',{cues:[['stopped',()=>s.cast.devas.forEach(f=>f.set('idle'))]]});
  await D.say('The asuras stopped watching the rope.',{cues:[['stopped',()=>s.cast.asuras.forEach(f=>f.set('idle'))]]});
  await D.say('Everyone turned towards the glowing ocean.',{cues:[['turned',()=>{s.cast.asuras.forEach((f,i)=>Timers.add(i*150,()=>{f.f=-1}));s.cast.devas.concat(s.cast.asuras).forEach(f=>f.set('gaze'))}]]});
  D.setMood({rate:.9});
  await D.say('And then...',{after:900});
  await D.say('From the depths of the Ocean of Milk emerged a radiant divine being.',{cues:[['emerged',()=>{AU.sfx('chime');D.go(st,{ghost:.75,aura:.35},2600)}]]});
  await D.say('His face was calm.');
  await D.say('His presence was gentle.');
  await D.say('His form shone with divine splendour.',{cues:[['shone',()=>D.go(st,{aura:.5},1800)]]});
  await D.say('He carried a beautiful pot that gleamed like gold.',{cues:[['pot',()=>{D.go(st,{glint:1},1200);AU.sfx('sparkle')}]]});
  await D.say('It was Lord Dhanvantari, revered in Hindu tradition as the divine physician and associated with the knowledge of Ayurveda and healing.');
  await D.say('In His hands was the precious pot of amrit.');
  await D.say('The devas gazed at Him in wonder.',{cues:[['devas',()=>s.cast.devas.forEach(f=>f.set('amazed'))]]});
  await D.say('The asuras stared at the shining pot.',{cues:[['asuras',()=>s.cast.asuras.forEach(f=>f.set('amazed'))]]});
  await D.say('After all their effort, the nectar they had sought had finally appeared.');
  D.setMood({});s.cast.devas.concat(s.cast.asuras).forEach(f=>f.set('namaste'));
  await D.say('But this moment held a lesson even more precious than the glittering pot.');
  await D.say("Lord Dhanvantari's appearance reminds us of the value of health, healing, and caring for life.",{cues:[['health',()=>D.go(st,{herb:1},2400)]]});
  await D.say('For what good are beautiful treasures if we cannot enjoy the world around us?');
  await D.say('What good is wealth if we forget to care for ourselves and those we love?');
  await D.say('Gold and jewels may bring comfort and joy.');
  await D.say('But our health helps us learn, play, explore, laugh, and share precious moments with the people around us.');
  await D.say('Health is a treasure worth protecting.');
  await D.say('And caring for life is one of the most meaningful ways to use the gifts we have been given.');
  await D.say('This is one of the beautiful meanings we can carry into Dhanteras, a festival traditionally associated with Lord Dhanvantari and the celebration of health and prosperity.');
  D.go(st,{herb:0},2000);await D.late()}

async function shot6_2(){D.chip('Episode 6 · Help the Divine Light Appear');let s=D.scene;if(!s||s.id!=='divine'){s=divineScene();D.setScene(s);Object.assign(s.st,{rip:1,ghost:.75,aura:.5,glint:1});s.cast.devas.concat(s.cast.asuras).forEach(f=>f.set('namaste'))}
  const st=s.st,tok=D.token;
  await D.say('Ocean Explorers, the final lotus is still closed.');
  await D.say('Lord Dhanvantari is waiting to appear in all His divine splendour.');
  await D.say('Let us help the light awaken!');
  /* ---- part 1: warmth ---- */
  {let last=null,dir=0;D.go(st,{meter:1},600);s.cT.on=1;D.instr('Rub the glowing centre back and forth.','','rub');
    const add=v=>{st.warm=clamp(st.warm+v,0,1);if(Math.random()<.08)AU.sfx('tap')};
    s.down=p=>{last=p};s.move=p=>{if(!last)return;const c=lotC(s);if(Math.hypot(p.x-c[0],p.y-c[1])<260){const dx=p.x-last.x;add(Math.abs(dx)/1600+(Math.sign(dx)!==dir&&Math.abs(dx)>3?.02:0));if(Math.abs(dx)>3)dir=Math.sign(dx)}last=p};s.up=()=>{last=null};
    s.hots=()=>[{id:'warm',label:'Lotus centre: press to warm it',x:lotC(s)[0],y:lotC(s)[1],r:110,on:()=>add(.2)}];Hot.dirty=true;
    const camIv=setInterval(()=>{if(Cam.rub>.3)add(.02)},120);
    const sp=D.say('First, rub your palms together gently to create a little warmth.');
    await D.task({hint:'Rub the glowing centre back and forth.',start(t){const iv=setInterval(()=>{if(st.warm>=1){clearInterval(iv);t.finish()}},120)},
      demo(){const c=lotC(s);s.demo.drag([[c[0]-90,c[1]],[c[0]+90,c[1]],[c[0]-90,c[1]],[c[0]+90,c[1]]],1600)},async assist(t){await D.tw(st,{warm:1},1500);t.finish()}});
    clearInterval(camIv);await sp;AU.sfx('chime');s.cT.on=0;s.down=s.move=s.up=null;s.hots=null;D.clearAct()}
  /* ---- part 2: share your little light ---- */
  await D.say('Now, slowly open your hands.');
  {const orbs=[0,1].map(i=>{const g=grp(s.top);orb(g);return{g,x:0,y:0,home:true,done:false}});let n=0;
    s.parts.push({update:t=>{const A=s.A;orbs.forEach((o,i)=>{if(o.home){o.x=A.orb[i][0];o.y=A.orb[i][1]}tf(o.g,o.x,o.y,(L.portrait?1.25:1.1)*(1+.06*Math.sin(t*2+i)*MV()));op(o.g,o.done?0:1)})}});
    const oT=orbs.map(()=>target(s.top,50));s.parts.push({update:t=>oT.forEach((x,i)=>{x.x=orbs[i].x;x.y=orbs[i].y;x.on=orbs[i].done?0:1;x.update(t)})});
    const merge=async i=>{const o=orbs[i];if(o.done)return;o.done=true;o.home=false;const c=lotC(s);await D.tw(o,{x:c[0],y:c[1]},700,'io');s.fx.burst(c[0],c[1],8,'spark',TAU);AU.sfx('bell');n++;D.counter(`${n} of 2 lights`);
      D.go(st,{aura:.5+n*.15},900);if(n>=2&&s._t)s._t.finish()};
    let drag=null;s.down=p=>{orbs.forEach((o,i)=>{if(!o.done&&Math.hypot(p.x-o.x,p.y-o.y)<90){drag=i;o.home=false}})};
    s.move=p=>{if(drag==null)return;const o=orbs[drag];o.x=p.x;o.y=p.y;const c=lotC(s);if(Math.hypot(p.x-c[0],p.y-c[1])<140){const i=drag;drag=null;merge(i)}};
    s.up=()=>{if(drag!=null){const o=orbs[drag];const c=lotC(s);if(Math.hypot(o.x-c[0],o.y-c[1])<LP(520,620))merge(drag);else o.home=true}drag=null};
    s.camHand=h=>{if(h.open&&Cam.hands.length===2)orbs.forEach((o,i)=>merge(i))};
    s.hots=()=>orbs.map((o,i)=>o.done?null:{id:'orb'+i,label:'Little light: press to share it with the lotus',x:o.x,y:o.y,r:60,on:()=>merge(i)}).filter(Boolean);Hot.dirty=true;
    D.instr('Bring the two little lights to the lotus.','0 of 2 lights','drag');
    await D.say('Stretch them towards the centre of the ocean, as if you are sharing your own little light.');
    await D.task({hint:'Bring the little lights to the lotus.',start(t){s._t=t;if(n>=2)t.finish()},demo(){const o=orbs.find(x=>!x.done)||orbs[0];const c=lotC(s);s.demo.drag([[o.x,o.y],c],1300)},
      async assist(t){for(let i=0;i<2;i++)await merge(i);t.finish()}});
    s._t=null;s.down=s.move=s.up=s.camHand=null;s.hots=null;D.clearAct();D.go(st,{meter:0},800)}
  /* ---- part 3: the call ---- */
  await D.say('Are you ready?');
  await D.say('Let us call out together:');
  {const tapL=()=>{const c=lotC(s);s.fx.burst(c[0],c[1],6,'spark',TAU);s.fx.ripple(c[0],c[1],200,P.turmeric,1100);AU.sfx('sparkle');D.go(st,{lit:Math.min(1,st.lit+.25)},500)};
    s.down=p=>{const c=lotC(s);if(Math.hypot(p.x-c[0],p.y-c[1])<220)tapL()};s.camMouth=tapL;s.hots=()=>[{id:'call',label:'Lotus: tap as we call',x:lotC(s)[0],y:lotC(s)[1],r:110,on:tapL}];Hot.dirty=true;s.cT.on=1;
    await D.chant('Lord Dhanvantari, bring the light of health!',{narr:true,who:'Everyone together'});
    D.go(s,{lotOpen:.12},800);D.go(st,{aura:.85},800);
    await D.say('Once more, with joy!');
    await D.chant('Lord Dhanvantari, bring the light of health!',{narr:true,who:'Everyone together'});
    s.cT.on=0;s.down=s.camMouth=null;s.hots=null}
  D.guard(tok);
  /* ---- the reveal ---- */
  await D.say('Look!');
  await D.say('The lotus is opening.',{cues:[['opening',()=>{AU.sfx('chime');D.go(s,{lotOpen:1},3600,'io')}]]});
  await D.say('The golden light is growing brighter.',{cues:[['brighter',()=>{D.go(st,{aura:1},2000);Music.swell()}]]});
  await D.say('The ocean is glowing with beautiful patterns of gold, white, and blue.',{cues:[['glowing',()=>{D.go(st,{rip:1.3},2000);D.go(s,{seaK:.6},2000)}]]});
  await D.say('And there He is!',{cues:[['there',()=>{AU.sfx('swell');D.go(st,{rise:1,glint:0},2600,'out')}]]});await D.wait(1600);
  s.cast.devas.concat(s.cast.asuras).forEach(f=>f.set('gaze'));
  await D.say('Lord Dhanvantari has appeared, holding the precious pot of amrit.');Badge.gain(5);
  await D.say('Well done, Ocean Explorers!');
  await D.say('You helped our story reach its most wonderful moment.');
  await D.say('The Ocean of Wonders has given us a precious lesson.');
  await D.say('Wealth is wonderful.');
  await D.say('Beautiful things bring joy.');
  await D.say('But health, kindness, and the ability to care for one another are treasures we should never take for granted.');
  await D.say('And that, dear Ocean Explorers, is one of the beautiful meanings we can carry with us into Dhanteras.');await D.late();
  /* transition: the golden halo expands into a patterned circular border */
  const g=grp(s.top);halo(g,200,{col:P.turmeric});const o={k:0};const c=s.A.aura;s.parts.push({update:()=>tf(g,c[0],c[1],1+o.k*6)});AU.sfx('swish');await D.tw(o,{k:1},1600,'in')}
