/* ================= EPISODE 2: THE TREASURES OF THE OCEAN AND LORD DHANVANTARI ================= */
const EP2_TITLE=['THE TREASURES OF THE OCEAN AND LORD DHANVANTARI','The Treasures of the Ocean and Lord Dhanvantari'];
/* callback lines (builder additions), played after "Welcome back" from the stored decisions; auto-picked choices are skipped */
const CALLBACK={kurma:{A:'You tried to lift the mountain first!',B:'You called Lord Vishnu right away!'},shiva:{A:'You asked the devas and asuras first!',B:'You called Lord Shiva right away!'}};
/* a soft golden ring around a treasure window (never a flash) */
function goldRing(s,p,r){s.fx.ripple(p[0],p[1],r||200,P.turmeric,1600);Timers.add(260,()=>s.fx.ripple(p[0],p[1],(r||200)*.7,P.ivory,1400))}

async function shot2_1(){await titleCard(2,EP2_TITLE[0],EP2_TITLE[1]);D.chip('Episode 2 · The Ocean Reveals Its Treasures');mood('welcome');Music.mood('wonder');Music.setLevel(.55,2);
  const s=churnScene({mood:'wonder',frame:'gold'});const C=s.C;C.ringK=1;D.setScene(s,1300);const M=churnMotor(s);groupSet(C.devas,'idle');groupSet(C.asuras,'idle');C.hold.d=0;C.hold.a=0;C.sag=1;
  await D.wait(700);
  await D.say('Welcome back, Ocean Explorers!');
  const ch=Store.data.choices||{};for(const k of['kurma','shiva']){const v=ch[k];if(v==='A'||v==='B')await D.say(CALLBACK[k][v])}
  await D.say('The devas and asuras began churning the Ocean of Milk once again.',{cues:[['churning',()=>{groupSet(C.devas,'pull');groupSet(C.asuras,'pull');D.go(C.hold,{d:1,a:1},900);D.go(C,{sag:0},900);M.base=C.flow;M.rbase=C.rot;D.go(M,{speed:.7},1400)}]]});
  /* the churning shrinks into a small medallion as the treasure windows fill the frame */
  const g=galleryScene();GAL.keys.forEach(k=>{g.panels[k].rise=0});const sh={k:1};
  s.parts.push({update:()=>{const A=C.A;const tgt=(L.portrait?GAL.P:GAL.L).med;const [mx,my]=toStage(A.mx,A.my-200);const [tx,ty]=toStage(tgt[0],tgt[1]);const k=sh.k;
    s.camG.setAttribute('transform',`translate(${f1(lerp(tx,mx,k))} ${f1(lerp(ty,my,k))}) scale(${f3(lerp(.16,1,k))}) translate(${f1(-mx)} ${f1(-my)})`)}});
  await D.say('One by one, wonderful treasures emerged!',{cues:[['One by one',()=>{D.go(sh,{k:0},1600,'io');Timers.add(700,()=>D.setScene(g,1100))}]]});
  const Pn=g.panels;const pos=k=>(L.portrait?GAL.P:GAL.L).pos[GAL.keys.indexOf(k)];
  const rise=k=>{AU.sfx('sparkle');D.go(Pn[k],{rise:1},1100,'back');Timers.add(500,()=>goldRing(g,pos(k),LP(190,210)))};
  const outline=k=>{rise(k);Timers.add(700,()=>D.go(Pn[k],{open:.42},1200))};
  const full=k=>{rise(k);Timers.add(700,()=>{D.go(Pn[k],{open:1},1300);D.go(Pn[k],{reveal:1},1300);AU.sfx('chime')})};
  await D.say('First came Kamadhenu, the divine cow associated with abundance and generosity.',{cues:[['Kamadhenu',()=>outline('cow')]]});
  await D.say('Then appeared a magnificent celestial horse, followed by Airavata, the majestic white elephant.',{cues:[['celestial horse',()=>full('horse')],['Airavata',()=>outline('elephant')]]});
  await D.say('The divine wish-fulfilling tree, Kalpavriksha, rose from the ocean, and precious jewels sparkled in the light.',{cues:[['Kalpavriksha',()=>outline('tree')],['jewels',()=>full('jewels')]]});
  await D.say('Finally, Goddess Lakshmi appeared on a lotus, bringing the promise of prosperity and abundance.',{cues:[['Goddess Lakshmi',()=>outline('lakshmi')]]});
  g.cast.devas.forEach(f=>f.set('amazed'));g.cast.asuras.forEach(f=>f.set('amazed'));
  await D.say('The ocean was full of wonders!');
  await D.say("But the churning wasn't finished. One special gift was still waiting—a gift that would remind everyone that health is one of life's greatest treasures.",{cues:[['special gift',()=>D.go(g.st,{glow:.5},1500)]]});
  await D.late()}

/* ---- 2.2 Discover the treasures: four glowing lotus windows, any order ---- */
const DISCOVER=[['cow','Kamadhenu — generosity.'],['elephant','Airavata — a magnificent divine elephant.'],['tree','Kalpavriksha — abundance.'],['lakshmi','Goddess Lakshmi — prosperity.']];
function labelRibbon(parent,text,w){const g=grp(parent);const tw_=Math.max(140,text.length*12.5);shp(g,`M${-tw_/2} -20H${tw_/2}L${tw_/2+16} 0L${tw_/2} 20H${-tw_/2}L${-tw_/2-16} 0Z`,P.ivory,3.4);
  el('text',{x:0,y:7,'text-anchor':'middle','font-family':'"Baloo 2","Trebuchet MS",sans-serif','font-weight':800,'font-size':21,fill:K},g).textContent=text;return g}
async function shot2_2(){D.chip('Episode 2 · Discover the Treasures');let s=D.scene;if(!s||s.id!=='gallery'){s=galleryScene();D.setScene(s);GAL.keys.forEach(k=>{const p=s.panels[k];p.rise=1;if(k==='horse'||k==='jewels'){p.open=1;p.reveal=1}else p.open=.42})}
  const tok=D.token,Pn=s.panels;mood('inviting');const pos=k=>s.A.pos[GAL.keys.indexOf(k)];const sc=()=>s.A.w/290;
  const items=DISCOVER.map(([k,label])=>{const t=target(s.top,LP(150,160));const rb=labelRibbon(s.top,label.replace('.',''));const o={k,label,done:false,t,rb,rk:0};return o});
  s.parts.push({update:t=>items.forEach(o=>{const p=pos(o.k);o.t.x=p[0];o.t.y=p[1];o.t.on=o.on||0;o.t.update(t);tf(o.rb,p[0],p[1]+s.A.h*sc()*.5+LP(10,8),(L.portrait?.95:.85)*(.6+.4*o.rk));op(o.rb,o.rk)})});
  items.forEach((o,i)=>Timers.add(i*200,()=>D.go(o,{on:1},600)));
  await D.say("Ocean Explorers, tap the glowing lotus flowers to discover the ocean's treasures!");
  let n=0;D.instr('Tap the glowing lotus flowers.','0 of 4 treasures','tap');Hot.dirty=true;
  const open=async o=>{if(o.done)return;o.done=true;n++;D.go(o,{on:0},300);AU.sfx('chime');goldRing(s,pos(o.k),LP(190,210));D.go(Pn[o.k],{open:1},1100);D.go(Pn[o.k],{reveal:1},1100);
    D.counter(`${n} of 4 treasures`);D.go(o,{rk:1},700,'back');await D.say(o.label).catch(()=>{});if(n>=4&&s._t)s._t.finish()};
  s.down=p=>{const o=items.find(o=>!o.done&&Math.hypot(p.x-pos(o.k)[0],p.y-pos(o.k)[1])<170*sc());if(o)open(o);else if(!items.some(o=>Math.hypot(p.x-pos(o.k)[0],p.y-pos(o.k)[1])<170*sc()))s.fx.ripple(p.x,p.y,60,P.foam,700)};
  s.hots=()=>items.filter(o=>!o.done).map(o=>({id:'lotus-'+o.k,label:'Glowing lotus: tap to discover a treasure',x:pos(o.k)[0],y:pos(o.k)[1],r:130,on:()=>open(o)}));
  const first=pos(items[0].k);s.demo.tap(first[0],first[1],2);
  await D.task({hint:'Tap a glowing lotus to open it!',start(t){s._t=t;if(n>=4)t.finish()},demo(){const o=items.find(o=>!o.done);if(o){const p=pos(o.k);s.demo.tap(p[0],p[1],2)}},
    async assist(t){for(const o of items)if(!o.done){await open(o);await D.wait(400)}t.finish()}});
  await D.q;s._t=null;s.down=null;s.hots=null;D.clearAct();D.guard(tok);
  /* after the last discovery the screen glows gold */
  const g=grp(null);s.comp.insertBefore(g,s.comp.firstChild);rays(g,240,420,36,P.turmeric,6);rings(g,220,{n:3,step:.2,w:6,dots:22});const go={k:0};s.parts.push({update:(dt,t)=>{const c=s.A.lotus;tf(g,c[0],c[1]-80,.6+.5*go.k,t*3*MV());op(g,go.k*.85)}});
  AU.sfx('swell');D.go(go,{k:1},1600);D.go(s.st,{glow:1},1600);s.cast.devas.forEach(f=>f.set('relieved'));s.cast.asuras.forEach(f=>f.set('relieved'));
  await D.say('So many wonderful gifts! But one final treasure is still waiting to appear.');await D.late();
  GAL.keys.forEach(k=>{const p=Pn[k];const sd=pos(k)[0]<(L.portrait?500:889)?-1:1;Timers.add(300,()=>D.go(p,{x:p.x+sd*LP(700,600)},1200,'in'))});items.forEach(o=>D.go(o,{rk:0},500));
  D.go(go,{k:0},1200);D.go(s.mc,{s:0},1200);AU.sfx('swish');await D.tw(s.st,{lot:1.25},1800,'io')}

/* ---- 2.3 The divine arrival of Lord Dhanvantari ---- */
async function shot2_3(){D.chip('Episode 2 · The Divine Arrival of Lord Dhanvantari');mood('building');Music.mood('divine');
  const s=divineScene();const st=s.st;D.setScene(s,1300);s.cast.devas.concat(s.cast.asuras).forEach(f=>f.set('gaze'));s.seaK=1;
  await D.wait(800);
  await D.say('The ocean grew still.',{cues:[['still',()=>D.go(s,{seaK:.2},2400)]]});
  await D.say('The waves shimmered. A beautiful golden light spread across the water.',{cues:[['shimmered',()=>{D.go(st,{rip:.5},2000);AU.sfx('sparkle')}],['golden light',()=>{D.go(st,{rip:1,aura:.3},2400);AU.sfx('bell')}]]});
  s.cT.on=1;
  await D.say('And then…',{after:900});s.cT.on=0;
  await D.say('From the depths of the Ocean of Milk emerged a radiant divine being.',{cues:[['From the depths',()=>{AU.sfx('chime');D.go(s,{lotOpen:1},3400,'io')}],['emerged',()=>{AU.sfx('swell');D.go(st,{rise:1,aura:.8},3200,'out')}]]});
  await D.wait(900);
  await D.say('His face was calm. His presence was gentle. In His hands, He carried a beautiful pot that gleamed like gold.',{cues:[['pot',()=>{D.go(st,{aura:1},1200);AU.sfx('sparkle')}]]});
  await D.say('It was Lord Dhanvantari, revered as the divine physician and associated with Ayurveda and healing.');
  await D.say('Within His precious pot was amrit, the divine nectar associated with immortality.');
  await D.say('At last, the nectar they had been searching for had appeared!',{cues:[['At last',()=>Music.swell()]]});
  await D.say('The devas gazed at Him in wonder. The asuras stared at the shining pot.',{cues:[['devas',()=>s.cast.devas.forEach(f=>f.set('amazed'))],['asuras',()=>s.cast.asuras.forEach(f=>f.set('amazed'))]]});
  s.cast.devas.concat(s.cast.asuras).forEach(f=>f.set('namaste'));mood('plain');
  await D.say("But Lord Dhanvantari's arrival reminds us of something more precious than gold.");
  await D.say('Health allows us to play, learn, laugh, explore, and spend happy moments with the people we love.',{cues:[['Health',()=>D.go(st,{herb:1},2400)]]});
  await D.say('Jewels may sparkle, and wealth may bring comfort. But we must also care for our health and look after one another.');
  await D.say('Health is a treasure worth protecting.');
  await D.say('That is one of the beautiful meanings we celebrate during Dhanteras.');D.go(st,{herb:0},2000);await D.late();
  /* the circular rim of the pot expands into the mandala that frames the shloka */
  const g=grp(s.top);halo(g,160,{col:P.turmeric});const o={k:0};s.parts.push({update:()=>tf(g,s.kal.x,s.kal.y-40,.2+o.k*5)});AU.sfx('swish');await D.tw(o,{k:1},1500,'in')}

/* ---- 2.4 Join your hands and recite the Dhanvantari shloka ---- */
const SHLOKA=['ॐ नमो भगवते वासुदेवाय धन्वन्तरये।','अमृतकलश हस्ताय सर्वामय विनाशाय त्रैलोक्यनाथाय श्रीमहाविष्णवे नमः॥'];
const MEANING='We bow to Lord Dhanvantari, the divine healer who holds the pot of amrit. We pray for healing, good health, and freedom from illness for all living beings.';
const SHL={L:{dh:[1340,690],ds:1.12,man:[1340,360],mr:1.25,panel:[70,112,860,470],kids:[[150,800],[290,806],[430,800],[570,806],[710,800]],ks:.62,water:560},
  P:{dh:[640,1400],ds:.98,man:[640,1110],mr:1.05,panel:[40,70,920,740],kids:[[90,1480],[200,1486],[310,1480]],ks:.56,water:900}};
function shlokaScene(){const s=mkScene('shloka',{frame:'gold'});
  s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha;const wy=toStage(0,(L.portrait?SHL.P:SHL.L).water)[1];
    el('rect',{x:-4,y:-4,width:W+8,height:H+8,fill:Pat.u('dots',P.gold,P.ivory,1.3)},this.bg);
    this.sea=ocean(this.bg,W,wy,H,{mood:'wonder',n:3,scale:.75});};
  s.parts.push({update:(dt,t)=>{s.sea&&(s.sea.k=.35,s.sea.update(t,dt))}});
  const comp=s.comp;const manG=grp(comp),ripG=grp(comp),dG=grp(comp),ledL=grp(comp),kidL=grp(comp),lightL=grp(comp);
  const man=grp(manG);halo(man,250,{col:P.turmeric});rings(man,220,{n:3,step:.13,w:5,c1:P.gold,c2:P.turq,dots:18});circ(man,0,0,160,P.ivory,4);rays(man,264,320,32,P.coral,5);
  const pl=lotus(dG,{r:120,n:9,open:1});const dh=new Deity('dhanv',dG,{pose:'kalash'});const kal=kalash(dG);
  const rip=[0,1,2].map(i=>{const g=grp(ripG);circ(g,0,0,200,'none',5,{stroke:P.turmeric,'stroke-dasharray':'.1 14','stroke-width':8,'stroke-linecap':'round'});return g});
  const kids=['girl','boy','girl2','boy2','girl3'].map(k=>new Person(k,kidL,{pose:'idle'}));
  const spread=[0,1,2].map(i=>{const g=grp(lightL);el('ellipse',{rx:200,ry:40,fill:'none',stroke:K,'stroke-width':9},g);el('ellipse',{rx:200,ry:40,fill:'none',stroke:i%2?P.ivory:P.turmeric,'stroke-width':5,'stroke-dasharray':'.1 14','stroke-linecap':'round'},g);return g});
  Object.assign(s,{dh,kal,kids,st:{glow:0,rip:0,spread:0,bow:0}});
  s.onLayout=function(){s.A=L.portrait?SHL.P:SHL.L;const A=s.A,n=L.portrait?3:5;ledL.innerHTML='';ledge(ledL,A.kids[0][0]-70,A.kids[n-1][0]+70,A.kids[0][1]-4,L.portrait?44:40);s.placePanel&&s.placePanel()};
  s.tick=function(dt,t){const A=s.A,st=s.st,m=MV();tf(man,A.man[0],A.man[1],A.mr,t*1.2*m);
    tf(pl.g,A.dh[0],A.dh[1]+30,.9);dh.x=A.dh[0];dh.y=A.dh[1];dh.s=A.ds;dh.update(dt,t);const hl=dh.handW(-1),hr=dh.handW(1);kal.x=(hl[0]+hr[0])/2;kal.y=(hl[1]+hr[1])/2-22*dh.s;kal.s=.5*dh.s;kal.glow=st.glow;kal.update(t);
    rip.forEach((g,i)=>{const k=((t*.18+i/3)%1);tf(g,kal.x,kal.y-30,.3+k*1.6);op(g,st.rip*(1-k))});
    const n=L.portrait?3:5;kids.forEach((p,i)=>{p.g.style.display=i<n?'':'none';if(i<n){p.x=A.kids[i][0];p.y=A.kids[i][1];p.s=A.ks*(1+(i%2)*.05);p.f=1;p.update(dt,t);
      p.head.setAttribute('transform',`translate(4 -232) scale(1.12) rotate(${f1(st.bow*10)}) translate(-4 232)`)}});
    spread.forEach((g,i)=>{const k=clamp(st.spread*1.6-i*.3,0,1);tf(g,kal.x,A.water+LP(60,80)+i*30,.3+k*(3+i)*1.2,0,1,1);op(g,k>0&&k<1?1:k>=1?.0:0)})};
  s.fx=fxLayer(s);s.demo=demoHand(s);return s}
/* the live-text shloka panel sits over the quiet left-middle of the painting */
function placeShloka(s){const el_=$('shloka');const r=s.A.panel;const ins=D.insetRect();const [x0,y0]=toStage(r[0],r[1]),[x1,y1]=toStage(r[0]+r[2],r[1]+r[3]);const k=L.U;
  el_.style.left=Math.round((x0*ins.s+ins.x)*k)+'px';el_.style.top=Math.round((y0*ins.s+ins.y)*k)+'px';el_.style.width=Math.round((x1-x0)*ins.s*k)+'px';el_.style.maxHeight=Math.round((y1-y0)*ins.s*k)+'px'}
async function recite(spans,lineWords,voice){/* highlight word by word; spoken in a Hindi voice when one is available, otherwise on a timer */
  for(let li=0;li<lineWords.length;li++){const words=lineWords[li];const sp=spans[li];const text=words.join(' ');const per=D.fast?5:Math.max(650,text.length*70/words.length);
    const hl=i=>sp.forEach((s,j)=>s.classList.toggle('on',j===i));
    if(voice&&Speech.hindi&&!AU.muted&&!D.fast){let starts=[],c=0;words.forEach(w=>{starts.push(c);c+=w.length+1});let got=false;const t0=T.now,est=text.length*110;
      const iv=setInterval(()=>{if(got)return;const k=(T.now-t0)/est;let i=0;while(i<starts.length-1&&starts[i+1]<=k*text.length)i++;hl(i)},90);
      await Speech.speak('shloka',text,{},ci=>{got=true;let i=0;while(i<starts.length-1&&starts[i+1]<=ci)i++;hl(i)});clearInterval(iv)}
    else{for(let i=0;i<words.length;i++){hl(i);await D.wait(per)}}
    hl(-1);await D.wait(D.fast?5:600)}}
async function shot2_4(){D.chip('Episode 2 · The Dhanvantari Shloka');mood('respectful');Music.mood('divine');Music.setLevel(.25,2);
  const s=shlokaScene();D.setScene(s,1300);const tok=D.token;const st=s.st;s.placePanel=()=>{if(!$('shloka').hidden)placeShloka(s)};
  const tick=setInterval(()=>{if(D.scene!==s){clearInterval(tick);return}s.placePanel()},300);
  await D.wait(800);
  await D.say('Children, Lord Dhanvantari reminds us that health and healing are precious gifts.',{cues:[['health',()=>D.go(st,{glow:.6},1500)]]});
  await D.say('Let us join our hands in namaste, bow our heads gently, and recite His shloka together.');
  /* namaste: tap the joined-hands icon to begin (it also starts by itself after about 5 seconds) */
  {let started=false,go;const p=new Promise(r=>go=r);const start=()=>{if(started)return;started=true;s.kids.forEach((k,i)=>Timers.add(i*150,()=>k.set('namaste')));D.go(st,{bow:1},1200);AU.sfx('bell');go()};
    D.instr('Join your hands to begin.','','hold');
    D.controls([{id:'namaste',html:'<span class="namaste"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 6C16 12 12 22 12 30L18 34H22L28 30C28 22 24 12 20 6Z" fill="#D58A2A" stroke="#111111" stroke-width="2.6"/><path d="M20 8V33" stroke="#111111" stroke-width="2"/></svg>Namaste</span>',aria:'Join hands in namaste to begin',on:start}]);
    s.camClap=start;const tm=setTimeout(start,D.fast?20:5000);await p;clearTimeout(tm);s.camClap=null;D.clearAct();await D.wait(900);D.guard(tok)}
  /* the shloka, live Devanagari text, large and clear */
  const box=$('shloka'),tx=$('shlokaText');tx.innerHTML='';$('meaning').hidden=true;const spans=SHLOKA.map(line=>{const ln_=document.createElement('span');ln_.className='ln';
    const words=line.split(' ');const ws=words.map((w,i)=>{const sp=document.createElement('span');sp.textContent=w;ln_.append(sp);if(i<words.length-1)ln_.append(document.createTextNode(' '));return sp});tx.append(ln_);return ws});
  box.hidden=false;placeShloka(s);D.go(st,{glow:1,rip:1},1500);AU.sfx('bell');
  const lineWords=SHLOKA.map(l=>l.split(' '));
  /* pass 1: the Narrator recites slowly, line by line */
  D.hideCap();await D.wait(D.fast?5:900);await recite(spans,lineWords,true);D.guard(tok);
  /* pass 2: soft music, the highlight replays for the child to recite along (about 10 seconds of narrator silence) */
  Music.setLevel(.55,2);const t0=T.now;D.instr('Recite along with the glowing words.','','hold');
  for(let r=0;r<2&&T.now-t0<10000;r++){await recite(spans,lineWords,false);}D.clearAct();Music.setLevel(.3,2);D.guard(tok);
  /* the simple meaning, read aloud */
  $('meaningText').textContent=MEANING;$('meaning').hidden=false;placeShloka(s);
  await D.say(MEANING);
  await D.say('When we recite this shloka, we offer our respects to Lord Dhanvantari and pray for health, healing, and well-being.');
  await D.say('Just as we care for the people we love, we must also look after our bodies and help others when they need us.');
  await D.say('May everyone be healthy. May everyone be happy. May we always care for one another.');
  /* golden light spreads from the pot of amrit across the ocean */
  AU.sfx('swell');await D.tw(st,{spread:1},3000,'io');await D.late();box.hidden=true;clearInterval(tick);
  const g=grp(s.top);halo(g,140,{col:P.turmeric});const o={k:1};s.parts.push({update:()=>tf(g,s.kal.x,s.kal.y-40,.1+o.k*4)});op(g,1);await D.tw(o,{k:0},1200,'in')}

/* ---- 2.5 What is true wealth? Fill the treasure pot ---- */
const WEALTH={L:{pot:[889,470],ks:1.7,ped:[889,612],man:[889,430],icons:[[470,470],[640,230],[889,120],[1138,230],[1308,470]],ir:66},
  P:{pot:[500,860],ks:1.85,ped:[500,1010],man:[500,820],icons:[[150,700],[260,450],[500,330],[740,450],[850,700]],ir:70}};
const WLABEL={health:'Good health',family:'Love and family',kind:'Kindness',wisdom:'Wisdom',gold:'Gold and jewels'};
function wealthScene(){const s=mkScene('wealth',{frame:'gold'});
  s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha;el('rect',{x:-4,y:-4,width:W+8,height:H+8,fill:Pat.u('stars',P.turmeric,P.indigo,1.3)},this.bg)};
  const comp=s.comp;const manG=grp(comp),pedG=grp(comp),kalG=grp(comp),inL=grp(comp),icL=grp(comp);
  const man=grp(manG);halo(man,230,{col:P.turmeric});rings(man,200,{n:2,step:.15,w:5,c1:P.gold,c2:P.ivory});circ(man,0,0,140,P.indigo,4);
  const ped=grp(pedG);shp(ped,'M-150 30H150L130 76H-130Z',Pat.u('petals',P.turmeric,P.verm,.8),4);const pl=lotus(ped,{r:110,n:9,open:1});tf(pl.g,0,24,1);
  const kal=kalash(kalG,{lotus:true});
  const icons=SYMS.map(sy=>{const g=grp(icL);const hl=grp(g);rings(hl,86,{n:2,step:.2,w:4});circ(g,0,0,64,P.ivory,4);const ic=grp(g);symbol(ic,sy.key);ic.setAttribute('transform','scale(.66)');
    const lb=grp(g);const w=WLABEL[sy.key].length*11+30;shp(lb,`M${-w/2} 72H${w/2}Q${w/2+12} 88 ${w/2} 104H${-w/2}Q${-w/2-12} 88 ${-w/2} 72Z`,P.turmeric,3);
    el('text',{x:0,y:95,'text-anchor':'middle','font-family':'"Baloo 2","Trebuchet MS",sans-serif','font-weight':800,'font-size':20,fill:K},lb).textContent=WLABEL[sy.key];
    return{key:sy.key,g,hl,lb,k:0,glow:0,x:0,y:0,home:true,inPot:false,slot:-1}});
  const inside=[];
  Object.assign(s,{kal,icons,inside,st:{glow:0}});
  s.onLayout=function(){s.A=L.portrait?WEALTH.P:WEALTH.L};
  s.tick=function(dt,t){const A=s.A,m=MV();tf(man,A.man[0],A.man[1],L.portrait?1.25:1.15,t*1.2*m);tf(ped,A.ped[0],A.ped[1],L.portrait?1.15:1);
    kal.x=A.pot[0];kal.y=A.pot[1];kal.s=A.ks;kal.glow=s.st.glow;kal.update(t);
    icons.forEach((o,i)=>{if(o.home&&!o.inPot){o.x=A.icons[i][0];o.y=A.icons[i][1]+Math.sin(t*.9+i)*6*m}
      if(o.inPot){const n=inside.length,j=inside.indexOf(o);const sp=LP(46,50);o.x=A.pot[0]+(j-(n-1)/2)*sp;o.y=A.pot[1]-62*A.ks-28-(j%2)*14}
      tf(o.g,o.x,o.y,(o.inPot?.42:A.ir/64)*(1+.12*o.k));op(o.hl,clamp(o.k+o.glow,0,1));op(o.lb,o.inPot?0:1)})};
  s.fx=fxLayer(s);s.demo=demoHand(s);return s}
async function shot2_5(){D.chip('Episode 2 · What Is True Wealth?');mood('friendly');Music.mood('divine');Music.setLevel(.45,2);
  const s=wealthScene();D.setScene(s,1300);const tok=D.token;const ic=s.icons;
  await D.wait(800);
  await D.say('Children, imagine you have a magical treasure pot.',{cues:[['treasure pot',()=>{D.go(s.st,{glow:.4},1200);AU.sfx('chime')}]]});
  await D.say('What would you fill it with?');
  const once=o=>{AU.sfx('sparkle');D.tw(o,{k:1},500,'out').then(()=>D.tw(o,{k:0},800)).catch(()=>{})};
  await D.say('Good health, love for your family, kindness, wisdom, or gold and jewels?',{cues:[['Good health',()=>once(ic[0])],['love for your family',()=>once(ic[1])],['kindness',()=>once(ic[2])],['wisdom',()=>once(ic[3])],['gold and jewels',()=>once(ic[4])]]});
  await D.say('All these can bring value to our lives. Wealth can bring comfort, but caring for our health, helping others, and sharing love make life truly meaningful.');
  await D.say("Remember, the greatest treasure isn't always the one that shines the brightest. It is also the love, health, and kindness we share.");
  /* the activity: drag (or tap) any treasures into the pot; no wrong answers */
  await D.say('Choose the treasures you would like to place inside your magical pot!');
  const picks=[];let resolve;const done=new Promise(r=>resolve=r);let auto=false,els=null;
  /* flying: interpolate from the drop point to the pot mouth */
  const fly=o=>{const A=s.A;const sx=o.x,sy=o.y;const f={k:0};o.home=false;o.flying=true;const tx=A.pot[0],ty=A.pot[1]-62*A.ks-30;
    const part={update:()=>{if(!o.flying)return;o.x=lerp(sx,tx,f.k);o.y=lerp(sy,ty,f.k)-Math.sin(f.k*Math.PI)*80}};s.parts.push(part);
    AU.sfx('drop');D.tw(f,{k:1},700,'io').then(()=>{o.flying=false;o.inPot=true;s.inside.push(o);picks.push(o.key);o.glow=1;AU.sfx('chime');s.fx.burst(tx,ty,7,'spark',TAU);
      D.go(s.st,{glow:Math.min(1.6,.4+picks.length*.25)},700);D.counter(`${picks.length} chosen`);
      if(!els)els=D.controls([{id:'ready',html:'<span class="lotusbtn"><svg viewBox="-30 -26 60 30" aria-hidden="true"><path d="M0 0C-10 -8 -8 -20 0 -24C8 -20 10 -8 0 0ZM0 0C-16 -2 -26 -10 -26 -16C-14 -14 -6 -8 0 0ZM0 0C16 -2 26 -10 26 -16C14 -14 6 -8 0 0Z" fill="#E45C9A" stroke="#111111" stroke-width="2.4"/></svg>I’m ready</span>',aria:'I am ready',on:()=>resolve()}]);
      Hot.dirty=true}).catch(()=>{})};
  let drag=null;
  s.down=p=>{const o=ic.find(o=>!o.inPot&&!o.flying&&Math.hypot(p.x-o.x,p.y-o.y)<LP(90,95));if(o){drag={o,x0:p.x,y0:p.y,moved:false};o.home=false;o.k=.6}};
  s.move=p=>{if(!drag)return;const o=drag.o;if(Math.hypot(p.x-drag.x0,p.y-drag.y0)>12)drag.moved=true;o.x=p.x;o.y=p.y};
  s.up=p=>{if(!drag)return;const o=drag.o;o.k=0;const A=s.A;const d=Math.hypot(o.x-A.pot[0],o.y-(A.pot[1]-40*A.ks));if(!drag.moved||d<LP(220,240))fly(o);else o.home=true;drag=null};
  s.hots=()=>ic.filter(o=>!o.inPot&&!o.flying).map(o=>({id:'tr-'+o.key,label:WLABEL[o.key]+': place it in the pot',x:o.x,y:o.y,r:70,on:()=>fly(o)}));Hot.dirty=true;
  D.instr('Drag your treasures into the pot, or tap them.','','drag');
  for(const o of ic){o.k=0;await D.say(WLABEL[o.key],{cues:[[WLABEL[o.key],()=>{D.go(o,{k:1},400)}]]});D.go(o,{k:0},500)}
  const first=ic.find(o=>!o.inPot);if(first){const A=s.A;s.demo.drag([[first.x,first.y],[A.pot[0],A.pot[1]-60*A.ks]],1300)}
  await D.task({hint:'Drag a treasure into the pot!',start(t){done.then(()=>t.finish())},demo(){const o=ic.find(o=>!o.inPot);if(o){const A=s.A;s.demo.drag([[o.x,o.y],[A.pot[0],A.pot[1]-60*A.ks]],1300)}},
    async assist(t){if(!picks.length){auto=true;for(const o of ic){if(!o.inPot)fly(o);await D.wait(800)}await D.wait(400)}resolve();t.finish()}});
  D.guard(tok);s.down=s.move=s.up=null;s.hots=null;D.clearAct();
  const c=Store.data.choices||{};c.treasures=auto?['all (auto)']:picks.slice();Store.set('choices',c);
  ic.forEach(o=>{if(!o.inPot)D.go(o,{glow:0},600)});AU.sfx('swell');D.go(s.st,{glow:1.6},1200);
  await D.say('Look at your wonderful treasures!');
  await D.say('Every one of these can have a place in a meaningful life. What matters is how we use our gifts and care for one another.');await D.late();
  /* the pot's gold rim expands into the warm round glow of a diya */
  const g=grp(s.top);halo(g,120,{col:P.turmeric});const o={k:0};s.parts.push({update:()=>tf(g,s.A.pot[0],s.A.pot[1]-60*s.A.ks,.3+o.k*7)});AU.sfx('swish');await D.tw(o,{k:1},1500,'in')}

/* ---- 2.6 A little light for Dhanteras: a traditional home, the family lights diyas together ---- */
const FAM={L:{door:[889,420],dw:360,dh:520,rang:[889,700],fam:[['grandma',300,700,'offer','flower'],['woman',500,706,'light','diya'],['man',1290,706,'hold','diya'],['girl',1460,712,'hold','diya'],['boy',1600,712,'namaste',null]],fs:.86,
    diya:[[620,760],[700,772],[780,780],[998,780],[1078,772],[1158,760],[889,600],[420,768]],shrine:[160,560],med:[[260,130],[575,96],[889,80],[1203,96],[1518,130]],mr:62},
  P:{door:[500,620],dw:360,dh:520,rang:[500,1080],fam:[['grandma',120,1230,'offer','flower'],['woman',290,1236,'light','diya'],['man',700,1236,'hold','diya'],['girl',860,1260,'hold','diya'],['boy',500,1480,'namaste',null]],fs:.74,
    diya:[[300,1400],[380,1420],[620,1420],[700,1400],[500,940],[150,1440],[850,1440],[500,1290]],shrine:[860,960],med:[[110,250],[300,170],[500,150],[700,170],[890,250]],mr:64}};
function homeLight(){const s=mkScene('family',{frame:'gold'});
  s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha;const A=L.portrait?FAM.P:FAM.L;const fy=toStage(0,L.portrait?1180:640)[1];
    el('rect',{x:-4,y:-4,width:W+8,height:fy+4,fill:Pat.u('grid',P.turmeric,P.terra,1.2)},this.bg);ln(this.bg,`M-4 ${fy}H${W+4}`,K,5);
    shp(this.bg,`M-4 ${fy}H${W+4}V${H+4}H-4Z`,Pat.u('petals',P.turmeric,P.ochre,1),0);
    /* ornamental wall borders */
    const b=grp(this.bg);el('rect',{x:-4,y:fy-46,width:W+8,height:30,fill:Pat.u('chevron',P.verm,P.ivory,1)},b);ln(b,`M-4 ${fy-46}H${W+4}M-4 ${fy-16}H${W+4}`,K,3)};
  const comp=s.comp;const doorG=grp(comp),shrG=grp(comp),rangG=grp(comp),famL=grp(comp),diyL=grp(comp),medL=grp(comp);
  /* a patterned doorway with marigold garlands and mango leaves */
  const door=grp(doorG);{const w=360,h=520;shp(door,`M${-w/2-40} 0V${-h+120}Q0 ${-h-80} ${w/2+40} ${-h+120}V0Z`,Pat.u('petals',P.verm,P.turmeric,.8),5);
    shp(door,`M${-w/2} 0V${-h+140}Q0 ${-h-30} ${w/2} ${-h+140}V0Z`,P.indigo,4);shp(door,`M${-w/2+24} 0V${-h+160}Q0 ${-h+10} ${w/2-24} ${-h+160}V0Z`,Pat.u('stars',P.turmeric,P.midnight,.9),3);
    const lamp=diya(door,{lit:1});lamp.x=0;lamp.y=-120;lamp.s=1.3;lamp.update(0);s.doorLamp=lamp;
    let d='';const n=7;for(let i=0;i<n;i++){const x0=-w/2-40+i*(w+80)/n,x1=x0+(w+80)/n;d+=`M${f1(x0)} ${-h+110}Q${f1((x0+x1)/2)} ${-h+170} ${f1(x1)} ${-h+110}`}ln(door,d,K,7);ln(door,d,P.leaf,3.4);
    for(let i=0;i<n;i++){const x0=-w/2-40+i*(w+80)/n,x1=x0+(w+80)/n;for(let j=1;j<4;j++){const u=j/4;const m=marigold(door,10,j%2?P.turmeric:P.ochre);tf(m,lerp(x0,x1,u),-h+110+Math.sin(u*Math.PI)*30,1)}leaf(door,28,9,P.leaf,90,x0,-h+112)}
    for(const sd of[-1,1]){let gd='';for(let k=0;k<9;k++)gd+=`M${sd*(w/2+20)} ${-h+130+k*44}h.1`;ln(door,gd,K,22);ln(door,gd,P.turmeric,16)}}
  /* a small prayer space */
  const shr=grp(shrG);shp(shr,'M-90 60V-80Q0 -150 90 -80V60Z',Pat.u('dots',P.turmeric,P.verm,.8),4);shp(shr,'M-60 60V-60Q0 -110 60 -60V60Z',P.ivory,3);const sk=kalash(shr,{lotus:true});sk.s=.55;sk.y=20;sk.update(0);
  [-40,40].forEach(x=>{const m=marigold(shr,14,P.turmeric);tf(m,x,46,1)});
  /* rangoli in the foreground */
  const rang=grp(rangG);circ(rang,0,0,120,P.ivory,4);for(let i=0;i<12;i++){const p=grp(rang,{transform:`rotate(${i*30})`});shp(p,'M0 -20C-14 -50 -10 -90 0 -110C10 -90 14 -50 0 -20Z',i%2?P.pink:P.turmeric,3)}
  circ(rang,0,0,46,P.verm,3);circ(rang,0,0,30,P.leaf,3);circ(rang,0,0,12,P.turmeric,2.4);for(let i=0;i<24;i++){const a=i/24*TAU;circ(rang,Math.cos(a)*126,Math.sin(a)*126,5,i%2?P.verm:P.leaf,1.6)}
  const fam=(L.portrait?FAM.P:FAM.L).fam.map(([k,x,y,pose,prop])=>new Person(k,famL,{pose,prop,lit:0}));
  const diyas=[];for(let i=0;i<8;i++)diyas.push(diya(diyL,{col:i%2?P.terra:P.ochre}));
  /* miniature medallions of the story's own drawings, along the border */
  const meds=[3,2,4,5,6].map((k,i)=>{const m=medallion(medL,62,{bg:i===2?P.violet:P.indigo});miniPic(m.pic,k);const dim=circ(m.pic,0,0,m.inner,P.midnight,0);return{m,dim,lit:0}});
  Object.assign(s,{fam,diyas,meds,st:{}});
  s.onLayout=function(){s.A=L.portrait?FAM.P:FAM.L;s.A.fam.forEach(([k,x,y],i)=>{fam[i].x=x;fam[i].y=y;fam[i].s=s.A.fs*(PEOPLE[k].h)})};
  s.tick=function(dt,t){const A=s.A;tf(door,A.door[0],A.door[1]+260,L.portrait?1.05:.95);s.doorLamp.update(t);tf(shr,A.shrine[0],A.shrine[1],L.portrait?.9:1);tf(rang,A.rang[0],A.rang[1],(L.portrait?.9:.75),0,1,.42);
    fam.forEach(f=>f.update(dt,t));diyas.forEach((d,i)=>{d.x=A.diya[i][0];d.y=A.diya[i][1];d.s=L.portrait?1.05:1;d.update(t)});
    meds.forEach((o,i)=>{const p=A.med[i];tf(o.m.g,p[0],p[1],A.mr/62*(1+.1*Math.sin(o.lit*Math.PI)));op(o.dim,.55*(1-o.lit))})};
  s.fx=fxLayer(s);s.demo=demoHand(s);return s}
/* the final card: one diya against deep blue, golden lotus petals drifting, the chosen treasures glowing softly in the border ring */
function finalDiya(){const s=mkScene('finale',{frame:'gold'});
  s.paintBg=function(){this.bg.innerHTML='';el('rect',{x:-4,y:-4,width:L.W+8,height:L.Ha+8,fill:Pat.u('stars',P.ivory,P.midnight,1.2)},this.bg)};
  const comp=s.comp;const ringL=grp(comp),petL=grp(comp),dG=grp(comp),titleL=grp(comp);
  const glowR=grp(dG);rings(glowR,170,{n:4,step:.18,w:5,dots:20});rays(glowR,190,250,28,P.turmeric,5);const d=diya(dG,{lit:0});s.d=d;
  const ch=(Store.data.choices||{}).treasures||[];const all=ch.includes('all (auto)');const keys=all?SYMS.map(x=>x.key):SYMS.map(x=>x.key).filter(k=>ch.includes(k));
  const ring=keys.map(k=>{const g=grp(ringL);const h=grp(g);rings(h,74,{n:2,step:.2,w:4});circ(g,0,0,54,P.ivory,4);const ic=grp(g);symbol(ic,k);ic.setAttribute('transform','scale(.56)');return{g,h,k}});
  const pet=[];for(let i=0;i<14;i++){const g=grp(petL);shp(g,'M0 0C-10 -10 -8 -24 0 -30C8 -24 10 -10 0 0Z',i%3?P.turmeric:P.gold,2.4);pet.push({g,u:Math.random(),v:Math.random(),sp:.02+Math.random()*.02,ph:Math.random()*TAU})}
  const tl=grp(titleL);s.title=tl;const lines=()=>L.portrait?['DHANTERAS —','A CELEBRATION OF HEALTH,','LIGHT AND PROSPERITY']:['DHANTERAS — A CELEBRATION OF','HEALTH, LIGHT AND PROSPERITY'];
  const drawTitle=()=>{tl.innerHTML='';const ls=lines();const fs=L.portrait?58:56;ls.forEach((t,i)=>{const a={x:0,y:i*fs*1.2,'text-anchor':'middle','font-family':'"Yatra One",Georgia,serif','font-size':fs};
      el('text',Object.assign({fill:'none',stroke:K,'stroke-width':9,'stroke-linejoin':'round'},a),tl).textContent=t;el('text',Object.assign({fill:P.turmeric},a),tl).textContent=t})};
  Object.assign(s,{st:{title:0,ring:0,glow:0}});
  s.onLayout=function(){drawTitle()};
  s.tick=function(dt,t){const P_=L.portrait,m=MV();const c=P_?[500,860]:[889,500];d.x=c[0];d.y=c[1];d.s=P_?3:2.6;d.update(t);tf(glowR,c[0],c[1]-60*d.s,(.5+.5*s.st.glow)*(1+.03*Math.sin(t*1.1)*m));op(glowR,s.st.glow);
    ring.forEach((o,i)=>{const n=ring.length;let x,y;if(P_){const a=Math.PI+(i+.5)/Math.max(n,1)*Math.PI;x=c[0]+Math.cos(a)*400;y=c[1]-40+Math.sin(a)*420}else{const sd=i%2?1:-1,row=Math.floor(i/2);const rows=Math.ceil(n/2);x=c[0]+sd*(560+row%2*60);y=c[1]-60+(row-(rows-1)/2)*170}
      tf(o.g,x,y,P_?1.05:1);op(o.g,s.st.ring);tf(o.h,0,0,.9+.08*Math.sin(t*1.2+i)*m)});
    const W=P_?1000:1778,H=P_?1500:810;pet.forEach(p=>{p.v+=dt*p.sp*m;const y=-40+((p.v%1))*(H+80);const x=p.u*W+Math.sin(t*.5+p.ph)*40*m;tf(p.g,x,y,1.2,Math.sin(t*.6+p.ph)*40)});
    tf(tl,c[0],P_?150:120,L.portrait?1:.9);op(tl,s.st.title)};
  return s}
async function shot2_6(){D.chip('Episode 2 · A Little Light for Dhanteras');mood('heartfelt');Music.mood('divine');Music.setLevel(.5,2);
  const s=homeLight();D.setScene(s,1400);const tok=D.token;
  const lightDiya=(i,quiet)=>{const d=s.diyas[i];if(d.lit<.5){if(!quiet)AU.sfx('diya');D.go(d,{lit:1},700,'out')}else{AU.sfx('sparkle');s.fx.burst(d.x,d.y-60,6,'spark',TAU)}};
  s.down=p=>{const A=s.A;const i=A.diya.findIndex(q=>Math.hypot(p.x-q[0],p.y-(q[1]-30))<70);if(i>=0)lightDiya(i)};
  s.hots=()=>s.A?s.diyas.map((d,i)=>({id:'diya'+i,label:d.lit>.5?'Glowing diya: tap to sparkle':'Diya: tap to light it',x:s.A.diya[i][0],y:s.A.diya[i][1]-30,r:56,on:()=>lightDiya(i)})):[];Hot.dirty=true;
  /* the family lights diyas together */
  const famLight=async()=>{for(let i=0;i<4;i++){if(s.diyas[i].lit<.5)lightDiya(i,i%2);await D.wait(1600)}s.fam.forEach(f=>{if(f.diya)D.go(f.diya,{lit:1},700)})};famLight().catch(()=>{});
  const med=i=>{AU.sfx('chime');D.go(s.meds[i],{lit:1},900,'out')};
  await D.wait(800);
  await D.say('And so, dear Ocean Explorers, our journey through the Ocean of Milk comes to an end.');
  await D.say('We discovered how the devas and asuras churned the ocean, how Lord Vishnu became Kurma to support the mountain, and how Lord Shiva protected the universe from Halahala poison.',
    {cues:[['churned',()=>med(0)],['Kurma',()=>med(1)],['Lord Shiva',()=>med(2)]]});
  await D.say("We welcomed the ocean's extraordinary treasures and watched Lord Dhanvantari emerge with the precious pot of amrit.",{cues:[['treasures',()=>med(3)],['Dhanvantari',()=>med(4)]]});
  await D.say('And we learned that true prosperity is not only about what we own. It is also about how we care for ourselves and treat others.');
  await D.say("This Dhanteras, when you see a little diya glowing in your home, remember Lord Shiva's compassion and Lord Dhanvantari's gift of healing.",{cues:[['diya',()=>lightDiya(s.diyas.findIndex(d=>d.lit<.5))]]});
  Music.setLevel(.7,2);
  const next=()=>{const i=s.diyas.findIndex(d=>d.lit<.5);if(i>=0)lightDiya(i)};
  await D.say('May your homes be filled with light.',{cues:[['May',next]]});
  await D.say('May your families be blessed with health and happiness.',{cues:[['May',next]]});
  await D.say('May your hearts be filled with kindness.',{cues:[['May',next]]});
  await D.say("And may you always remember that one of life's greatest treasures is caring for one another.",{cues:[['may',()=>s.diyas.forEach((d,i)=>Timers.add(i*120,()=>{if(d.lit<.5)lightDiya(i,true)}))]]});
  D.guard(tok);
  /* the scene simplifies to one diya against deep blue */
  const f=finalDiya();D.setScene(f,1800);s.down=null;await D.wait(1200);AU.sfx('diya');D.go(f.d,{lit:1},1200,'out');D.go(f.st,{glow:1},1800);Music.swell();
  await D.say('Happy Dhanteras, little Ocean Explorers!',{cues:[['Happy',()=>D.go(f.st,{ring:1},1600)]]});
  D.go(f.st,{title:1},1400);await D.wait(1600);
  Store.set('done',true);Store.set('ep',1);
  /* end card: the painting moves up so the diya stays uncovered */
  const end=$('end');end.hidden=false;await new Promise(r=>requestAnimationFrame(r));const pr=end.querySelector('.panel').getBoundingClientRect();D.trayPx=pr.height+18;D.go(D,{inset:1},900);
  D.chip('');await D.late();await new Promise(()=>{})}
