/* ================= EPISODE 2: THE TREASURES OF THE OCEAN AND LORD DHANVANTARI ================= */
const EP2_TITLE=['THE TREASURES OF THE OCEAN AND LORD DHANVANTARI','The Treasures of the Ocean and Lord Dhanvantari'];
/* callback lines (builder additions), played after "Welcome back" from the stored decisions; auto-picked choices are skipped */
const CALLBACK={kurma:{A:'You tried to lift the mountain first!',B:'You called Lord Vishnu right away!'},shiva:{A:'You asked the devas and asuras first!',B:'You called Lord Shiva right away!'}};
/* a soft golden ring around a treasure window (never a flash) */
function goldRing(s,p,r){s.fx.ripple(p[0],p[1],r||200,P.turmeric,1600);Timers.add(260,()=>s.fx.ripple(p[0],p[1],(r||200)*.7,P.ivory,1400))}

/* the four treasures arrive as medallions across the top while the churning carries on below; the mountain never moves */
const TREAS=[['cow','Kamadhenu — generosity.'],['elephant','Airavata — a magnificent divine elephant.'],['tree','Kalpavriksha — abundance.'],['lakshmi','Goddess Lakshmi — prosperity.']];
const TROW={L:{pos:[[230,215],[560,200],[1218,200],[1548,215]],r:92,horse:[330,452],hs:.56,jew:[1452,440],js:.85},
  P:{pos:[[125,230],[375,215],[625,215],[875,230]],r:100,horse:[150,770],hs:.5,jew:[850,760],js:.75}};
function treasureMed(parent,key,label){const g=grp(parent);const ring=grp(g);rings(ring,130,{n:2,step:.18,w:5,dots:16});rays(ring,140,175,20,P.turmeric,4);
  const m=medallion(g,110,{bg:key==='tree'?P.ivory:key==='elephant'?P.turq:key==='cow'?P.sea:P.indigo});const pic=m.pic;
  shp(pic,'M-120 58Q-100 50 -80 58T-40 58T0 58T40 58T80 58T120 58V140H-120Z',Pat.u('wave',P.foam,P.turq,.5),3);
  if(key==='cow'){const c=kamadhenu(pic);tf(c.g,-6,70,.78)}else if(key==='elephant'){const e=airavata(pic);tf(e.g,-12,72,.7);e.update(0)}
  else if(key==='tree'){const t=kalpavriksha(pic);tf(t.g,0,96,.62);t.update(0)}
  else{const lt=lotus(pic,{r:44,n:9,open:1});tf(lt.g,0,92,1);const d=new Deity('lakshmi',pic,{pose:'lotus'});d.x=0;d.y=90;d.s=.4;d.update(0,0)}
  /* the script's discovery label, on a ribbon across the medallion's lower rim */
  const parts=label.replace(/\.$/,'').split(' — ');const lb=grp(g);let sub=[parts[1]||''];
  if(sub[0].length>16){const ws=sub[0].split(' ');let best=1,bd=1e9;for(let i=1;i<ws.length;i++){const d=Math.abs(ws.slice(0,i).join(' ').length-ws.slice(i).join(' ').length);if(d<bd){bd=d;best=i}}sub=[ws.slice(0,best).join(' '),ws.slice(best).join(' ')]}
  const w=Math.max(170,Math.max(parts[0].length*12,...sub.map(x=>x.length*10.5))+34);const h=64+(sub.length-1)*20;
  shp(lb,`M${-w/2} 78H${w/2}L${w/2+14} ${78+h/2}L${w/2} ${78+h}H${-w/2}L${-w/2-14} ${78+h/2}Z`,P.ivory,3.4);
  const T=(t,y,fs,wt)=>{el('text',{x:0,y,'text-anchor':'middle','font-family':'"Baloo 2","Trebuchet MS",sans-serif','font-weight':wt,'font-size':fs,fill:K},lb).textContent=t};
  T(parts[0],106,21,800);sub.forEach((x,i)=>{if(x)T(x,131+i*20,17,600)});
  return{g,ring,k:0,glow:0}}
async function shot2_1(){await titleCard(2,EP2_TITLE[0],EP2_TITLE[1]);D.chip('Episode 2 · The Ocean Reveals Its Treasures');mood('welcome');Music.mood('wonder');Music.setLevel(.55,2);
  const s=churnScene({mood:'wonder',frame:'gold'});const C=s.C;C.ringK=1;D.setScene(s,1300);const M=churnMotor(s);groupSet(C.devas,'idle');groupSet(C.asuras,'idle');C.hold.d=0;C.hold.a=0;C.sag=1;
  const row=grp(s.top);const meds=TREAS.map(([k,l])=>treasureMed(row,k,l));s.tmeds=meds;
  s.parts.push({update:(dt,t)=>{const A=L.portrait?TROW.P:TROW.L;meds.forEach((m,i)=>{const p=A.pos[i];tf(m.g,p[0],p[1]+(1-m.k)*40,A.r/110*(.3+.7*m.k));op(m.g,m.k);op(m.ring,m.glow);
      if(m.glow>0)tf(m.ring,0,0,1+.04*Math.sin(t*1.2+i)*MV(),t*6*MV())});}});
  const pos=i=>(L.portrait?TROW.P:TROW.L).pos[i];
  const show=i=>{const m=meds[i];AU.sfx('sparkle');D.go(m,{k:1},1100,'back');Timers.add(500,()=>{goldRing(s,pos(i),L.portrait?160:150);AU.sfx('chime')})};
  await D.wait(700);
  await D.say('Welcome back, Ocean Explorers!');
  const ch=Store.data.choices||{};for(const k of['kurma','shiva']){const v=ch[k];if(v==='A'||v==='B')await D.say(CALLBACK[k][v])}
  await D.say('The devas and asuras began churning the Ocean of Milk once again.',{cues:[['churning',()=>{groupSet(C.devas,'pull');groupSet(C.asuras,'pull');D.go(C.hold,{d:1,a:1},900);D.go(C,{sag:0},900);M.base=C.flow;M.rbase=C.rot;D.go(M,{speed:.7},1400)}]]});
  await D.say('One by one, wonderful treasures emerged!',{cues:[['wonderful',()=>D.go(C,{glim:.8,energy:1},1400)]]});
  await D.say('First came Kamadhenu, the divine cow associated with abundance and generosity.',{cues:[['Kamadhenu',()=>show(0)]]});
  await D.say('Then appeared a magnificent celestial horse, followed by Airavata, the majestic white elephant.',{cues:[['Airavata',()=>show(1)]]});
  await D.say('The divine wish-fulfilling tree, Kalpavriksha, rose from the ocean, and precious jewels sparkled in the light.',{cues:[['Kalpavriksha',()=>show(2)]]});
  await D.say('Finally, Goddess Lakshmi appeared on a lotus, bringing the promise of prosperity and abundance.',{cues:[['Goddess Lakshmi',()=>show(3)]]});
  groupSet(C.devas,'amazed');groupSet(C.asuras,'amazed');D.go(M,{speed:.35},1500);
  await D.say('The ocean was full of wonders!');
  await D.say("But the churning wasn't finished. One special gift was still waiting—a gift that would remind everyone that health is one of life's greatest treasures.");
  await D.late()}

/* ---- 2.2 the treasures glow gold together (no interaction) ---- */
async function shot2_2(){D.chip('Episode 2 · So Many Wonderful Gifts');let s=D.scene;if(!s||!s.tmeds){await shot2_1();s=D.scene}
  const C=s.C;mood('inviting');s.tmeds.forEach((m,i)=>Timers.add(i*250,()=>{D.go(m,{glow:1},900);AU.sfx('chime')}));D.go(C,{glim:1},1200);
  groupSet(C.devas,'relieved');groupSet(C.asuras,'relieved');AU.sfx('swell');await D.wait(1200);
  await D.say('So many wonderful gifts! But one final treasure is still waiting to appear.');
  groupSet(C.devas,'gaze');groupSet(C.asuras,'gaze');D.go(s.motor,{speed:0},1600);D.go(s,{seaK:.3},1600);await D.wait(900);await D.late()}

/* ---- 2.3 The divine arrival of Lord Dhanvantari ---- */
async function shot2_3(){D.chip('Episode 2 · The Divine Arrival of Lord Dhanvantari');mood('building');Music.mood('divine');
  const s=divineScene();const st=s.st;st.up=0;D.setScene(s,1300);s.cast.devas.concat(s.cast.asuras).forEach(f=>f.set('gaze'));s.seaK=1;
  await D.wait(800);
  await D.say('The ocean grew still.',{cues:[['still',()=>D.go(s,{seaK:.2},2400)]]});
  await D.say('The waves shimmered. A beautiful golden light spread across the water.',{cues:[['shimmered',()=>{D.go(st,{rip:.5},2000);AU.sfx('sparkle')}],['golden light',()=>{D.go(st,{rip:1,aura:.3},2400);AU.sfx('bell')}]]});
  await D.say('And then…',{after:900});
  await D.say('From the depths of the Ocean of Milk emerged a radiant divine being.',{cues:[['From the depths',()=>{AU.sfx('chime');st.rise=1;D.go(st,{up:1},4600,'out');D.go(s,{lotOpen:1},3600,'io');s.fx.ripple(s.A.lot[0],s.A.lot[1]+60,LP(420,360),P.foam,2200,.25)}],['emerged',()=>{AU.sfx('swell');D.go(st,{aura:.8},3200,'out')}]]});
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
    el('rect',{x:-4,y:-4,width:W+8,height:H+8,fill:Pat.u('stars',P.ivory,P.midnight,1.1)},this.bg);
    this.sea=ocean(this.bg,W,wy,H,{mood:'wonder',n:3,scale:.75});};
  s.parts.push({update:(dt,t)=>{s.sea&&(s.sea.k=.35,s.sea.update(t,dt))}});
  const comp=s.comp;const decoL=grp(comp);const manG=grp(comp),ripG=grp(comp),dG=grp(comp),ledL=grp(comp),kidL=grp(comp),lightL=grp(comp);
  const deco=diwaliOutdoors(decoL);s.parts.push(deco);
  const man=grp(manG);halo(man,250,{col:P.turmeric});rings(man,220,{n:3,step:.13,w:5,c1:P.gold,c2:P.turq,dots:18});circ(man,0,0,160,P.ivory,4);rays(man,264,320,32,P.coral,5);
  const pl=lotus(dG,{r:120,n:9,open:1});const dh=new Deity('dhanv',dG,{pose:'kalash'});const kal=kalash(dG);
  const rip=[0,1,2].map(i=>{const g=grp(ripG);circ(g,0,0,200,'none',5,{stroke:P.turmeric,'stroke-dasharray':'.1 14','stroke-width':8,'stroke-linecap':'round'});return g});
  const kids=['girl','boy','girl2','boy2','girl3'].map(k=>new Person(k,kidL,{pose:'idle'}));
  const spread=[0,1,2].map(i=>{const g=grp(lightL);el('ellipse',{rx:200,ry:40,fill:'none',stroke:K,'stroke-width':9},g);el('ellipse',{rx:200,ry:40,fill:'none',stroke:i%2?P.ivory:P.turmeric,'stroke-width':5,'stroke-dasharray':'.1 14','stroke-linecap':'round'},g);return g});
  Object.assign(s,{dh,kal,kids,st:{glow:0,rip:0,spread:0,bow:0}});
  s.onLayout=function(){s.A=L.portrait?SHL.P:SHL.L;const A=s.A,n=L.portrait?3:5;deco.layout(A);ledL.innerHTML='';ledge(ledL,A.kids[0][0]-70,A.kids[n-1][0]+70,A.kids[0][1]-4,L.portrait?44:40);s.placePanel&&s.placePanel()};
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
    if(voice)Clips.note('shloka',text);
    if(voice&&!AU.muted&&!D.fast&&(Clips.has('shloka',text)||Speech.hindi)){let starts=[],c=0;words.forEach(w=>{starts.push(c);c+=w.length+1});let got=false;const t0=T.now,est=text.length*110;
      const iv=setInterval(()=>{if(got)return;const k=(T.now-t0)/est;let i=0;while(i<starts.length-1&&starts[i+1]<=k*text.length)i++;hl(i)},90);
      await speakAny('shloka',text,{},ci=>{got=true;let i=0;while(i<starts.length-1&&starts[i+1]<=ci)i++;hl(i)});clearInterval(iv)}
    else{for(let i=0;i<words.length;i++){hl(i);await D.wait(per)}}
    hl(-1);await D.wait(D.fast?5:600)}}
/* a Diwali evening outdoors: rooftops with lit windows, strings of lights, hanging lanterns and a parapet of diyas */
function lantern(parent,col){const g=grp(parent);const sw=grp(g);ln(sw,'M0 -200V-60',K,3);
  shp(sw,'M0 -64L-34 -20L-24 30L0 50L24 30L34 -20Z',Pat.u('petals',P.turmeric,col,.55),3.6);shp(sw,'M-34 -20H34L24 30H-24Z','none',2.4);
  shp(sw,'M-12 -70H12V-60H-12Z',P.gold,2.4);rays(sw,0,0,1,P.turmeric,1).remove();
  for(const x of[-14,0,14])ln(sw,`M${x} 50V${78+Math.abs(x)*-.6}`,col,4);circ(sw,0,6,9,P.turmeric,2.4);return{g,sw}}
function diwaliOutdoors(parent){const g=grp(parent);const roofs=grp(g),strings=grp(g),lantL=grp(g),wall=grp(g);const lan=[P.verm,P.pink,P.leaf,P.indigo,P.verm].map(c=>lantern(lantL,c));
  const diyas=[];for(let i=0;i<9;i++)diyas.push(diya(wall,{lit:1,col:i%2?P.terra:P.ochre}));
  const D_={g,lan,diyas,A:null,layout(A){this.A=A;const P_=L.portrait;roofs.innerHTML='';strings.innerHTML='';
      const wy=A.water,x1=P_?1000:1000;
      /* rooftops and little houses along the far bank, each window lit */
      const hs=P_?[[30,150],[170,120],[300,170],[450,130],[600,160],[760,120],[890,150]]:[[30,150],[190,120],[330,170],[490,130],[650,160],[810,140]];
      hs.forEach(([x,h],i)=>{const w=P_?120:150,top=wy-40-h;shp(roofs,`M${x} ${wy-40}V${top}L${x+w/2} ${top-60}L${x+w} ${top}V${wy-40}Z`,i%2?P.indigo:P.violet==null?P.indigo:P.sea,3.4);
        shp(roofs,`M${x-8} ${top+4}L${x+w/2} ${top-64}L${x+w+8} ${top+4}Z`,P.terra,3.2);for(let k=0;k<2;k++)shp(roofs,`M${x+20+k*(w-60)} ${top+30}h22v30h-22Z`,P.turmeric,2.4);
        const tor=marigold(roofs,8,P.turmeric);tf(tor,x+w/2,top+12,1)});
      /* the parapet with a row of lit diyas */
      shp(roofs,`M0 ${wy-44}H${x1}V${wy+2}H0Z`,Pat.u('vlines',P.ochre,P.terra,.8),3.4);ln(roofs,`M0 ${wy-36}H${x1}`,P.turmeric,4,{'stroke-dasharray':'.1 12'});
      /* two strings of lights swagging across the top */
      const sw=(y0,sag,n,cols)=>{const d=`M0 ${y0}Q${x1/4} ${y0+sag} ${x1/2} ${y0}T${x1} ${y0}`;ln(strings,d,K,2.6);
        for(let i=1;i<n;i++){const u=i/n;const half=u<.5?u*2:(u-.5)*2;const y=y0+sag*2*half*(1-half)*(u<.5?1:-1)*-1*-1;const yy=y0+Math.sin(half*Math.PI)*sag*.5*(u<.5?1:-1);
          const b=grp(strings);circ(b,0,0,7,cols[i%cols.length],2.4);ln(b,'M-8 0H-12M8 0H12M0 9V13',cols[i%cols.length],2.4);tf(b,u*x1,y0+(u<.5?1:-1)*Math.sin(half*Math.PI)*sag*.5,1)}};
      sw(P_?40:30,P_?80:60,16,[P.turmeric,P.verm,P.pink,P.foam]);sw(P_?120:96,P_?70:50,18,[P.foam,P.turmeric,P.turq]);
      const lx=P_?[110,300,500,700,890]:[90,300,510,720,930];lan.forEach((l,i)=>{l.x=lx[i];l.y=(P_?250:190)+(i%2)*(P_?50:36)});
      diyas.forEach((d,i)=>{d.x=40+i*(x1-80)/8;d.y=wy-48;d.s=P_?.55:.5})},
    update(dt,t){const m=MV();lan.forEach((l,i)=>{tf(l.g,l.x,l.y,L.portrait?.95:.8);l.sw.setAttribute('transform',`rotate(${f1(Math.sin(t*.8+i)*4*m)} 0 -200)`)});diyas.forEach(d=>d.update(t))}};
  return D_}
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
  await recite(spans,lineWords,false);D.clearAct();Music.setLevel(.3,2);D.guard(tok);
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
async function shot2_5(){D.chip('Episode 2 · What Is True Wealth?');mood('friendly');Music.mood('wonder');Music.setLevel(.45,2);
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
/* the closing: a Diwali house seen from its courtyard, with lanterns, string lights, a rangoli and diyas; the family faces front */
const FAM={L:{sky:280,eave:285,wall:[380,1398],floor:625,door:[889,625],ds:.66,win:[[560,350],[1218,350]],lan:[450,700,1078,1328],lanY:290,
    rang:[889,712],rs:1,fam:[['grandma',150,792,'diya'],['woman',285,792,'namaste'],['man',1490,792,'diya'],['girl',1615,792,'namaste'],['boy',1712,792,'namaste']],fs:.86,
    diya:[[470,612],[640,612],[1138,612],[1308,612],[700,735],[800,775],[978,775],[1078,735]],med:[[330,205],[600,140],[889,118],[1178,140],[1448,205]],mr:62},
  P:{sky:330,eave:335,wall:[90,910],floor:1045,door:[500,1045],ds:.72,win:[[220,470],[780,470]],lan:[110,300,700,890],lanY:340,
    rang:[500,1170],rs:.9,fam:[['grandma',100,1480,'diya'],['woman',255,1480,'namaste'],['boy',500,1488,'namaste'],['man',745,1480,'diya'],['girl',900,1480,'namaste']],fs:.8,
    diya:[[170,1032],[330,1032],[670,1032],[830,1032],[330,1190],[420,1240],[580,1240],[670,1190]],med:[[110,250],[300,170],[500,150],[700,170],[890,250]],mr:64}};
function homeLight(){const s=mkScene('family',{frame:'gold'});
  s.paintBg=function(){this.bg.innerHTML='';el('rect',{x:-4,y:-4,width:L.W+8,height:L.Ha+8,fill:Pat.u('stars',P.ivory,P.midnight,1.2)},this.bg);
    const fy=toStage(0,(L.portrait?FAM.P:FAM.L).floor)[1];shp(this.bg,`M-4 ${fy}H${L.W+4}V${L.Ha+4}H-4Z`,Pat.u('grid',P.turmeric,P.terra,1.1),4)};
  const comp=s.comp;const yardL=grp(comp),houseL=grp(comp),lightL=grp(comp),lanL=grp(comp),rangL=grp(comp),diyL=grp(comp),famL=grp(comp),medL=grp(comp);
  const lans=[P.verm,P.pink,P.leaf,P.turmeric].map(c=>lantern(lanL,c));
  const rang=grp(rangL);circ(rang,0,0,128,P.ivory,4);for(let i=0;i<12;i++){const p=grp(rang,{transform:`rotate(${i*30})`});shp(p,'M0 -20C-14 -50 -10 -90 0 -112C10 -90 14 -50 0 -20Z',i%2?P.pink:P.turmeric,3)}
  for(let i=0;i<12;i++){const p=grp(rang,{transform:`rotate(${i*30+15})`});shp(p,'M0 -40C-8 -60 -6 -78 0 -88C6 -78 8 -60 0 -40Z',i%2?P.verm:P.leaf,2.4)}
  circ(rang,0,0,46,P.verm,3);circ(rang,0,0,30,P.leaf,3);circ(rang,0,0,12,P.turmeric,2.4);for(let i=0;i<24;i++){const a=i/24*TAU;circ(rang,Math.cos(a)*136,Math.sin(a)*136,6,i%2?P.verm:P.turmeric,1.6)}
  const fam=[];const diyas=[];for(let i=0;i<8;i++)diyas.push(diya(diyL,{col:i%2?P.terra:P.ochre}));
  const meds=[3,2,4,5,6].map((k,i)=>{const m=medallion(medL,62,{bg:i===2?P.violet:P.indigo});miniPic(m.pic,k);const dim=circ(m.pic,0,0,m.inner,P.midnight,0);return{m,dim,lit:0}});
  Object.assign(s,{fam,diyas,meds,st:{}});
  s.onLayout=function(){const A=s.A=L.portrait?FAM.P:FAM.L;yardL.innerHTML='';houseL.innerHTML='';lightL.innerHTML='';const [x0,x1]=A.wall;
    /* a low courtyard wall with diyas on top, either side of the house */
    shp(yardL,`M24 ${A.floor-95}H${x0}V${A.floor}H24Z M${x1} ${A.floor-95}H${(L.portrait?1000:1778)-24}V${A.floor}H${x1}Z`,Pat.u('chevron',P.verm,P.ivory,1),3.4);
    ln(yardL,`M24 ${A.floor-95}H${x0}M${x1} ${A.floor-95}H${(L.portrait?1000:1778)-24}`,K,4);
    for(const x of(L.portrait?[50]:[70,190,310]).concat(L.portrait?[950]:[1460,1580,1700])){const d=diya(yardL,{lit:1});d.x=x;d.y=A.floor-96;d.s=.45;d.update(0)}
    /* the house: patterned wall, tiled eave, a gable, lit windows and the doorway with toran */
    shp(houseL,`M${x0} ${A.floor}V${A.eave}H${x1}V${A.floor}Z`,Pat.u('rock',P.ochre,P.terra,.8),4.4);
    shp(houseL,`M${x0-40} ${A.eave+10}L${(x0+x1)/2} ${A.eave-(L.portrait?90:75)}L${x1+40} ${A.eave+10}L${x1+40} ${A.eave+34}H${x0-40}Z`,Pat.u('fish',K,P.verm,.8),4);
    A.win.forEach(([x,y])=>{shp(houseL,`M${x-60} ${y+80}V${y}Q${x} ${y-50} ${x+60} ${y}V${y+80}Z`,P.turmeric,4);ln(houseL,`M${x} ${y-36}V${y+80}M${x-60} ${y+30}H${x+60}`,K,4);
      shp(houseL,`M${x-74} ${y+80}H${x+74}V${y+96}H${x-74}Z`,P.verm,3);for(const sd of[-1,1]){const m=marigold(houseL,10,P.turmeric);tf(m,x+sd*48,y+90,1)}});
    const door=grp(houseL);{const w=360,h=520;shp(door,`M${-w/2-40} 0V${-h+120}Q0 ${-h-80} ${w/2+40} ${-h+120}V0Z`,Pat.u('petals',P.verm,P.turmeric,.8),5);
      shp(door,`M${-w/2} 0V${-h+140}Q0 ${-h-30} ${w/2} ${-h+140}V0Z`,P.indigo,4);shp(door,`M${-w/2+24} 0V${-h+160}Q0 ${-h+10} ${w/2-24} ${-h+160}V0Z`,Pat.u('vlines',P.ochre,P.terra,.9),3);
      let d='';const n=7;for(let i=0;i<n;i++){const a=-w/2-40+i*(w+80)/n,b=a+(w+80)/n;d+=`M${f1(a)} ${-h+110}Q${f1((a+b)/2)} ${-h+170} ${f1(b)} ${-h+110}`}ln(door,d,K,7);ln(door,d,P.leaf,3.4);
      for(let i=0;i<n;i++){const a=-w/2-40+i*(w+80)/n,b=a+(w+80)/n;for(let j=1;j<4;j++){const u=j/4;const m=marigold(door,10,j%2?P.turmeric:P.ochre);tf(m,lerp(a,b,u),-h+110+Math.sin(u*Math.PI)*30,1)}leaf(door,28,9,P.leaf,90,a,-h+112)}}
    tf(door,A.door[0],A.door[1],A.ds);
    shp(houseL,`M${x0-20} ${A.floor-14}H${x1+20}V${A.floor+8}H${x0-20}Z`,P.verm,3.4);ln(houseL,`M${x0-10} ${A.floor-3}H${x1+10}`,P.turmeric,4,{'stroke-dasharray':'.1 12'});
    /* strings of lights along the eave */
    const sw=(a,b,y,sag,n,cols)=>{const d=`M${a} ${y}Q${(a+b)/2} ${y+sag*2} ${b} ${y}`;ln(lightL,d,K,2.6);for(let i=1;i<n;i++){const u=i/n;const x=lerp(a,b,u),yy=y+sag*2*2*u*(1-u);const g=grp(lightL);circ(g,0,0,7,cols[i%cols.length],2.2);tf(g,x,yy+4,1)}};
    sw(x0-30,(x0+x1)/2,A.eave+36,L.portrait?40:34,12,[P.turmeric,P.verm,P.foam,P.pink]);sw((x0+x1)/2,x1+30,A.eave+36,L.portrait?40:34,12,[P.foam,P.turmeric,P.turq,P.verm]);
    lans.forEach((l,i)=>{l.x=A.lan[i];l.y=A.eave+(L.portrait?175:165)+(i%2)*26});
    /* the family, front facing: some with palms joined, some holding a diya */
    famL.innerHTML='';fam.length=0;A.fam.forEach(([k,x,y,pose])=>{const f=new FrontPerson(k,famL,{pose,lit:0});f.x=x;f.y=y;f.s=A.fs*PEOPLE[k].h;fam.push(f)})};
  s.tick=function(dt,t){const A=s.A,m=MV();lans.forEach((l,i)=>{tf(l.g,l.x,l.y,L.portrait?.75:.7);l.sw.setAttribute('transform',`rotate(${f1(Math.sin(t*.8+i)*4*m)} 0 -200)`)});
    tf(rang,A.rang[0],A.rang[1],A.rs,0,1,.42);fam.forEach(f=>{if(s.famLit)f.d.lit=Math.max(f.d.lit,s.famLit);f.update(dt,t)});
    diyas.forEach((d,i)=>{d.x=A.diya[i][0];d.y=A.diya[i][1];d.s=L.portrait?.85:.8;d.update(t)});
    meds.forEach((o,i)=>{const p=A.med[i];tf(o.m.g,p[0],p[1],A.mr/62*(1+.1*Math.sin(o.lit*Math.PI)));op(o.dim,.55*(1-o.lit))})};
  s.fx=fxLayer(s);s.demo=demoHand(s);return s}
/* the final card: one diya against deep blue, golden lotus petals drifting, the chosen treasures glowing softly in the border ring */
function finalDiya(){const s=mkScene('finale',{frame:'gold'});
  s.paintBg=function(){this.bg.innerHTML='';el('rect',{x:-4,y:-4,width:L.W+8,height:L.Ha+8,fill:Pat.u('stars',P.ivory,P.midnight,1.2)},this.bg)};
  const comp=s.comp;const ringL=grp(comp),petL=grp(comp),dG=grp(comp),titleL=grp(comp);
  const glowR=grp(dG);rays(glowR,150,205,24,P.turmeric,5);const d=diya(dG,{lit:0});s.d=d;op(d.glow,0);d.glow.style.visibility='hidden';
  const ch=(Store.data.choices||{}).treasures||[];const all=ch.includes('all (auto)');const keys=all?SYMS.map(x=>x.key):SYMS.map(x=>x.key).filter(k=>ch.includes(k));
  const ring=keys.map(k=>{const g=grp(ringL);const h=grp(g);rings(h,74,{n:2,step:.2,w:4});circ(g,0,0,54,P.ivory,4);const ic=grp(g);symbol(ic,k);ic.setAttribute('transform','scale(.56)');return{g,h,k}});
  const pet=[];for(let i=0;i<14;i++){const g=grp(petL);shp(g,'M0 0C-10 -10 -8 -24 0 -30C8 -24 10 -10 0 0Z',i%3?P.turmeric:P.gold,2.4);pet.push({g,u:Math.random(),v:Math.random(),sp:.02+Math.random()*.02,ph:Math.random()*TAU})}
  const tl=grp(titleL);s.title=tl;const lines=()=>L.portrait?['DHANTERAS —','A CELEBRATION OF HEALTH,','LIGHT AND PROSPERITY']:['DHANTERAS — A CELEBRATION OF','HEALTH, LIGHT AND PROSPERITY'];
  const drawTitle=()=>{tl.innerHTML='';const ls=lines();const fs=L.portrait?58:56;ls.forEach((t,i)=>{const a={x:0,y:i*fs*1.2,'text-anchor':'middle','font-family':'"Yatra One",Georgia,serif','font-size':fs};
      el('text',Object.assign({fill:'none',stroke:K,'stroke-width':9,'stroke-linejoin':'round'},a),tl).textContent=t;el('text',Object.assign({fill:P.turmeric},a),tl).textContent=t})};
  Object.assign(s,{st:{title:0,ring:0,glow:0}});
  s.onLayout=function(){drawTitle()};
  s.tick=function(dt,t){const P_=L.portrait,m=MV();const c=P_?[500,880]:[889,560];d.x=c[0];d.y=c[1];d.s=P_?3:2.6;d.update(t);tf(glowR,c[0],c[1]-60*d.s,(.5+.5*s.st.glow)*(1+.03*Math.sin(t*1.1)*m));op(glowR,s.st.glow);
    ring.forEach((o,i)=>{const n=ring.length;let x,y;if(P_){const a=Math.PI+(i+.5)/Math.max(n,1)*Math.PI;x=c[0]+Math.cos(a)*400;y=c[1]-40+Math.sin(a)*420}else{const sd=i%2?1:-1,row=Math.floor(i/2);const rows=Math.ceil(n/2);x=c[0]+sd*(560+row%2*60);y=c[1]-60+(row-(rows-1)/2)*170}
      tf(o.g,x,y,P_?1.05:1);op(o.g,s.st.ring);tf(o.h,0,0,.9+.08*Math.sin(t*1.2+i)*m)});
    const W=P_?1000:1778,H=P_?1500:810;pet.forEach(p=>{p.v+=dt*p.sp*m;const y=-40+((p.v%1))*(H+80);const x=p.u*W+Math.sin(t*.5+p.ph)*40*m;tf(p.g,x,y,1.2,Math.sin(t*.6+p.ph)*40)});
    tf(tl,c[0],P_?150:95,L.portrait?1:.9);op(tl,s.st.title)};
  return s}
async function shot2_6(){D.chip('Episode 2 · A Little Light for Dhanteras');mood('heartfelt');Music.mood('festive');Music.setLevel(.5,2);
  const s=homeLight();D.setScene(s,1400);const tok=D.token;
  const lightDiya=(i,quiet)=>{const d=s.diyas[i];if(d.lit<.5){if(!quiet)AU.sfx('diya');D.go(d,{lit:1},700,'out')}else{AU.sfx('sparkle');s.fx.burst(d.x,d.y-60,6,'spark',TAU)}};
  s.down=p=>{const A=s.A;const i=A.diya.findIndex(q=>Math.hypot(p.x-q[0],p.y-(q[1]-30))<70);if(i>=0)lightDiya(i)};
  s.hots=()=>s.A?s.diyas.map((d,i)=>({id:'diya'+i,label:d.lit>.5?'Glowing diya: tap to sparkle':'Diya: tap to light it',x:s.A.diya[i][0],y:s.A.diya[i][1]-30,r:56,on:()=>lightDiya(i)})):[];Hot.dirty=true;
  /* the family lights diyas together */
  const famLight=async()=>{for(let i=0;i<4;i++){if(s.diyas[i].lit<.5)lightDiya(i,i%2);await D.wait(1600)}s.famLit=0;D.go(s,{famLit:1},900)};famLight().catch(()=>{});
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
  /* "Play again" sits in the bottom panel, so the diya stays uncovered */
  D.instr('','');D.controls([{id:'again',label:'Play again',on:()=>begin(1)}]);
  D.chip('');await D.late();await new Promise(()=>{})}
