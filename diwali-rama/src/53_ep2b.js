/* ===== EPISODE 2, scenes 2.6 to 2.10 ===== */

/* small diya flames for the city's countless lamps (flat drops with an ink outline) */
function tinyLamps(g,list,k){const out=grp(g);let d='',b='';list.forEach(([x,y])=>{d+=`M${f1(x)} ${f1(y-16*k)}C${f1(x-5*k)} ${f1(y-9*k)} ${f1(x-5*k)} ${f1(y-4*k)} ${f1(x)} ${f1(y-2*k)}C${f1(x+5*k)} ${f1(y-4*k)} ${f1(x+5*k)} ${f1(y-9*k)} ${f1(x)} ${f1(y-16*k)}Z`;
    b+=`M${f1(x-9*k)} ${f1(y-2*k)}Q${f1(x)} ${f1(y+6*k)} ${f1(x+9*k)} ${f1(y-2*k)}Z`});shp(out,b,P.terra,2);const fl=shp(out,d,P.turmeric,2);return{g:out,fl}}
function lampRow(x0,y0,x1,y1,n){const a=[];for(let i=0;i<n;i++){const u=n>1?i/(n-1):0;a.push([lerp(x0,x1,u),lerp(y0,y1,u)])}return a}

/* ---------- Scene 2.6: Rama Returns to Ayodhya ---------- */
function scReturn(){const s=mkScene('2.6',{frame:'gold'});artPart(s);const back=grp(s.comp),mid=grp(s.comp),fore=grp(s.comp);
  /* the same Ayodhya as scene 1.1, at night, with a larger palace */
  skyBg(s,{kind:'night',horizon:[470,760],ground:['flower',P.gold,P.brown,.9],stars:14,clouds:[[.14,.22,250],[.84,.18,300]]});
  const rama=cast(s,'rama',CAST.rama,mid),sita=cast(s,'sita',CAST.sita,mid),lak=cast(s,'lak',CAST.lak,mid),han=cast(s,'hanuman',CAST.hanuman,mid);
  const folk=[];for(let i=0;i<8;i++)folk.push(cast(s,'folk',personCfg(300+i,{child:i%3===1}),mid));folk.forEach(f=>mid.insertBefore(f.g,mid.firstChild));
  s.pos=()=>LP({palace:[889,530,.8],sita:[780,740,1,1],rama:[930,742,1,1],lak:[1080,746,.96,-1],han:[1290,748,.95,-1],start:[[862,548],[889,548],[916,548]],
      folk:[[150,640,.7,1],[260,652,.58,1],[370,640,.7,1],[490,652,.58,1],[1420,652,.58,-1],[1530,640,.7,-1],[1640,652,.58,-1],[1740,640,.7,-1]],fd:[[200,772],[600,776],[1350,774],[1600,770]]},
    {palace:[500,770,.7],sita:[330,1170,1,1],rama:[500,1172,1,1],lak:[660,1176,.96,-1],han:[850,1180,.92,-1],start:[[475,790],[500,790],[525,790]],
      folk:[[70,1320,.68,1],[190,1335,.56,1],[300,1320,.68,1],[140,990,.5,1],[260,1000,.45,1],[600,990,.5,-1],[740,1000,.45,-1],[860,990,.5,-1]],fd:[[160,1462],[560,1466]]});
  onOrient(s,[back,fore],P_=>{const p=s.pos();const A=ayodhyaArt(s,back,fore,{dome:P.gold,palace:p.palace});const pc=A.pc;
    /* little lamps along the rooftops, windows and palace */
    const L_=[];A.hs.forEach(({x,y,k})=>{L_.push(...lampRow(x-100*k,y-190*k-4,x+100*k,y-190*k-4,6));L_.push(...lampRow(x-90*k,y+6,x+90*k,y+6,5))});
    L_.push(...lampRow(pc[0]-480*pc[2],pc[1]-250*pc[2],pc[0]+480*pc[2],pc[1]-250*pc[2],14));s.lamps=tinyLamps(back,L_,LP(1.2,1.2));
    /* the palace gates, which swing open */
    const ag=grp(back,{transform:`translate(${pc[0]} ${pc[1]}) scale(${pc[2]})`});s.doors=[-1,1].map(sx=>{const d=grp(ag);shp(d,`M0 0V-200H${sx*68}V0Z`,Pat.u('flower',P.gold,P.maroon,.8),3.5);return{d,sx}});
    /* lit diyas in the foreground: flames only */
    s.fd=p.fd.map(([x,y])=>{const d=keepArt(s,diya(fore,{lit:1,light:0,decor:1}));d.x=x;d.y=y;d.s=LP(.6,.55);return d});
    folk.forEach((f,i)=>put(f,p.folk[i]));put(han,p.han);if(!s.entered){[sita,rama,lak].forEach((f,i)=>{f.x=p.start[i][0];f.y=p.start[i][1];f.s=.45})}else{put(sita,p.sita);put(rama,p.rama);put(lak,p.lak)}});
  s.petals=drift(s,22,LP([0,0,1778,700],[0,0,1000,1300]));
  s.doorK=0;s.tick=(dt,t)=>{(s.doors||[]).forEach(o=>tf(o.d,0,0,1,0,1-s.doorK*.92,1));(s.pk||[]).forEach((pk,i)=>pk.set(.3+.35*(.5+.5*Math.sin(t*1.3+i*1.7))*MV()));
    if(s.lamps)op(s.lamps.fl,.85+.15*Math.sin(t*3.1));
    if(Cam.smile&&s.entered&&!s.smiled){s.smiled=true;rama.set('smile',500);sita.set('smile',500);Timers.add(4000,()=>s.smiled=false)}};
  s.camMouth=()=>{};return s}
async function shot2_6(){mood('welcome');Amb.set('city');Music.mood('light');const s=D.setScene(scReturn(),900);const {rama,sita,lak,hanuman:han}=s.cast;const folk=[].concat(s.cast.folk);
  folk.forEach(f=>f.set('wait',0));han.set('namaste',0);const p=s.pos();await hold(600);
  /* the palace gates open and the three enter the glowing city */
  AU.sfx('bell');await D.tw(s,{doorK:1},2200,'io');
  await say("At last, Rama, Sita and Lakshmana returned to Ayodhya.",[["returned",()=>{s.entered=true;[[sita,p.sita],[rama,p.rama],[lak,p.lak]].forEach(([f,q])=>{f.f=1;f.set('walk',200);
      tw(f,{x:q[0],y:q[1],s:q[2]*(f.Q.scale||1)},4200,'io').then(()=>f.set('idle',500))})}]]);
  await hold(2600);lak.turn(-1);Music.swell();
  await say("The people welcomed them with joy. The streets shone with rows of little lamps, and the air was filled with celebration.",[["welcomed",()=>{folk.forEach((f,i)=>{f.set(i%2?'petals':'wave',500);if(i%2===0)return;f.hold('b','basket')});AU.sfx('celebrate')}],
    ["celebration",()=>{rama.set('bless',700);sita.set('smile',700);lak.set('smile',700);han.set('rejoice',600);AU.sfx('celebrate')}]]);
  await hold(800);
  /* stillness for the homecoming */
  await say("The lamps were more than decorations. They showed the people’s happiness, hope and love.",[["happiness",()=>{folk.forEach(f=>f.set('smile',700));rama.set('smile',800)}]]);
  await say("This joyful homecoming is one of the stories remembered during Diwali, the festival of lights.",[["festival of lights",()=>{D.go(s,{haloK:1},3000,'out');s.bloom(1);AU.sfx('bloom')}]]);
  await say("Even a small flame can brighten a dark place. And even a small act of kindness can brighten someone’s day.",[["small act",()=>{folk[0].set('helpAnother',600);folk[1].set('smile',600)}]]);
  await hold(1600);await D.late();
  /* one foreground diya becomes the focus and the city recedes */
  const d=s.fd[1];await D.tw(s.cam,{z:3.2,fx:d.x,fy:d.y-30},2200,'io')}

/* ---------- the four kindness pictures (used in 2.7 and 2.9); children vary in appearance ---------- */
const KIND={help:{label:'Help someone',say:'Helping someone carry a heavy load.',snd:'chime'},share:{label:'Share with a friend',say:'Sharing with a friend.',snd:'pop'},
  comfort:{label:'Comfort someone who feels sad',say:'Comforting a friend who feels sad.',snd:'bell'},nature:{label:'Care for nature',say:'Caring for nature.',snd:'bloom'}};
function kindPic(g,key,seed){const kids=(a,b)=>[new Fig(personCfg(a,{child:true}),g),b!=null?new Fig(personCfg(b,{child:true}),g):null];let A,B;
  if(key==='help'){[A,B]=kids(seed,seed+1);A.hold('f','books');A.set('carryStone',0);B.hold('f','books');B.set('helpAnother',0);A.x=-34;B.x=40;A.f=1;B.f=-1}
  else if(key==='share'){[A,B]=kids(seed+2,seed+3);A.hold('f','plate');A.set('share',0);B.hold('f','sweet');B.set('share',0);A.x=-40;B.x=40;A.f=1;B.f=-1}
  else if(key==='comfort'){[A,B]=kids(seed+4,seed+5);A.set('comfort',0);B.set('sad',0);A.x=-38;B.x=30;A.f=1;B.f=-1}
  else{[A]=kids(seed+6);A.hold('f','pot');A.set('waterPlant',0);A.x=-30;A.f=1;const pl=plant(g);tf(pl.g,66,0,1.5)}
  [A,B].forEach(f=>{if(!f)return;f.s=.8*f.s;f.x*=1.25;f.y=52;f.update(0,0)});return{A,B}}
function kindMedal(parent,key,r,seed){const m=medallion(parent,r,{ring:P.turmeric,ringBg:P.verm,bg:P.ivory});rect(m.pic,-r,-r,r*2,r*2,Pat.u('dots',P.gold,P.ivory,.8),0);
  const pic=grp(m.pic,{transform:`translate(0 ${r*.38}) scale(${f3(r/120)})`});ell(pic,0,52,90,10,P.leaf,2);kindPic(pic,key,seed);return m}

/* ---------- Scene 2.7: What Does a Diya Teach Us? ---------- */
const KIND_ORDER=['comfort','help','share','nature'];
function scTeach(){const s=mkScene('2.7',{frame:'night'});artPart(s);const back=grp(s.comp),ringG=grp(s.comp),medG=grp(s.comp),cen=grp(s.comp);
  skyBg(s,{kind:'night',horizon:[2000,3000],stars:14,clouds:[]});
  const S={ray:0,ring:0,shown:[0,0,0,0]};s.S=S;
  s.pos=()=>LP({c:[889,430],ds:1.7,med:[[480,210],[1298,210],[480,620],[1298,620]],mr:132,ell:[409,205]},{c:[500,760],ds:1.6,med:[[230,330],[770,330],[230,1190],[770,1190]],mr:140,ell:[270,430]});
  onOrient(s,[back,ringG,medG,cen],P_=>{const p=s.pos();S.rays=grp(back,{transform:`translate(${p.c[0]} ${p.c[1]-60})`});rays(S.rays,90,LP(300,280),24,P.turmeric,4);petalRing(S.rays,LP(170,160),20,P.gold,P.marigold,40);
    rings(S.rays,LP(240,230),{n:2,step:.15,w:4,c1:P.gold,c2:P.turmeric,dots:20});
    /* the four vignettes, revealed one by one, then joined into one decorative circle */
    S.ringE=grp(ringG);const e=`M${p.c[0]-p.ell[0]} ${p.c[1]}A${p.ell[0]} ${p.ell[1]} 0 1 1 ${p.c[0]+p.ell[0]} ${p.c[1]}A${p.ell[0]} ${p.ell[1]} 0 1 1 ${p.c[0]-p.ell[0]} ${p.c[1]}`;
    ln(S.ringE,e,K,16);const rl=ln(S.ringE,e,P.gold,10);dots(S.ringE,e,P.verm,6,22);
    S.meds=p.med.map(([x,y],i)=>{const g=grp(medG,{transform:`translate(${x} ${y})`});kindMedal(g,KIND_ORDER[i],p.mr,400+i*11);return g});
    S.d=keepArt(s,diya(cen,{lit:1,light:.6,decor:1}));S.d.x=p.c[0];S.d.y=p.c[1]+40;S.d.s=p.ds});
  s.tick=(dt,t)=>{if(!S.rays)return;const p=s.pos();tf(S.rays,p.c[0],p.c[1]-50,.2+.8*S.ray,t*3*MV());op(S.rays,S.ray);op(S.ringE,S.ring);
    S.meds.forEach((g,i)=>{const k=S.shown[i];op(g,k);tf(g,lerp(p.c[0],p.med[i][0],k),lerp(p.c[1],p.med[i][1],k),.3+.7*k)})};
  return s}
async function shot2_7(){mood('gentle');Amb.set('night');Music.mood('light');const s=D.setScene(scTeach(),1100);const S=s.S;
  await hold(800);
  await say("Have you ever looked closely at a diya?");
  await say("Its flame is small, yet it shines through the darkness.",[["shines",()=>D.go(S,{ray:1},2600,'out')]]);
  const show=i=>{D.go(S.shown,{[i]:1},1200,'back');AU.sfx('chime')};
  await say("The diya reminds us to bring light into the world through our actions: by speaking kindly, helping someone who needs us, being brave when something is difficult, and sharing what we have.",
    [["speaking kindly",()=>show(0)],["helping someone",()=>show(1)],["sharing",()=>show(2)]]);
  await say("We may not be able to light every lamp in the world, but we can each bring a little light to someone.",[["every lamp",()=>show(3)],["a little light",()=>{D.go(S,{ring:1},1800);AU.sfx('bloom')}]]);
  await hold(1800);await D.late();
  /* the circle contracts towards the diya */
  await D.tw(S.shown,{0:0,1:0,2:0,3:0},1400,'io');await D.tw(S,{ring:0,ray:.4},600)}

/* ---------- Scene 2.8: The Sacred Shloka of the Diya ---------- */
const SHLOKA=[{dv:'शुभं करोति कल्याणम्',tr:'Śubhaṃ karoti kalyāṇam',say:'Shubham karoti kalyaanam'},
  {dv:'आरोग्यं धनसम्पदा ।',tr:'Ārogyaṃ dhana-sampadā',say:'Aarogyam dhana sampadaa'},
  {dv:'शत्रुबुद्धिविनाशाय',tr:'Śatru-buddhi-vināśāya',say:'Shatru buddhi vinaashaaya'},
  {dv:'दीपज्योतिर्नमोऽस्तुते ॥',tr:"Dīpa-jyotir namo'stu te",say:'Deepa jyotir namostu te'}];
const MEANING='“May the light bring goodness and well-being, health and prosperity. May harmful thoughts be overcome. I offer my respect to the sacred light of the lamp.”';
function scShloka(){const s=mkScene('2.8',{frame:'night'});artPart(s);const back=grp(s.comp),cen=grp(s.comp);
  skyBg(s,{kind:'night',horizon:[2000,3000],stars:10,clouds:[]});const S={calm:0,open:0,h:0};s.S=S;
  s.pos=()=>LP({c:[1330,560],ds:1.9,panel:[60,40,900,730]},{c:[500,1250],ds:1.5,panel:[30,20,940,950]});
  onOrient(s,[back,cen],P_=>{const p=s.pos();/* a symmetrical halo of golden lines, dots and lotus petals */S.halo=grp(back,{transform:`translate(${p.c[0]} ${p.c[1]-110})`});
    rings(S.halo,LP(250,220),{n:3,step:.14,w:4,c1:P.gold,c2:P.turmeric,dots:18});S.pr=petalRing(S.halo,LP(150,130),16,P.verm,P.ivory,44);rays(S.halo,LP(70,60),LP(140,120),16,P.gold,3);
    const lb=grp(cen,{transform:`translate(${p.c[0]} ${p.c[1]+30})`});S.base=lotusBase(lb,LP(150,130));
    S.d=keepArt(s,diya(cen,{lit:1,light:.5,decor:1}));S.d.x=p.c[0];S.d.y=p.c[1]+10;S.d.s=p.ds});
  s.tick=(dt,t)=>{if(!S.halo)return;const p=s.pos();const m=MV()*(1-S.calm);tf(S.halo,p.c[0],p.c[1]-110,.9+.1*S.open+.02*Math.sin(t*.5)*m,t*2*m);tf(S.pr,0,0,.9+.1*Math.sin(t*.4)*m)};
  return s}
/* typeset the shloka in the DOM panel: Devanagari line, then its transliteration underneath */
function shlokaPanel(s){const box=$('shlokaLines');box.innerHTML='';const els=SHLOKA.map(l=>{const d=document.createElement('div');d.className='sl wait';
    const a=document.createElement('p');a.className='dv';a.lang='sa';a.textContent=l.dv;const b=document.createElement('p');b.className='tr';b.lang='sa-Latn';b.textContent=l.tr;d.append(a,b);box.append(d);return d});
  $('meaningText').textContent=MEANING;$('meaning').hidden=true;$('shloka').hidden=false;
  Overlay.add($('shloka'),()=>{const q=s.pos().panel;return refRectPx(q[0],q[1],q[2],q[3])});return els}
/* one recited line: the Narrator in a Hindi or Indian-English voice if available; a pause follows for the child to repeat */
async function recite(i,els,pause){els.forEach((e,j)=>e.classList.toggle('on',j===i));els[i].classList.remove('wait');const tok=D.token;
  const hi=Speech.hindi;const text=hi?SHLOKA[i].dv:SHLOKA[i].say;let skipped=false;const skipP=new Promise(r=>{D.skipFn=()=>{skipped=true;Speech.stop();r()}});
  try{if(!D.fast){const p=canSpeak()?speakAny('shloka',text,null):D.wait(2600);await Promise.race([p,skipP]);D.guard(tok);if(!skipped)await Promise.race([D.wait(pause),skipP])}}finally{D.skipFn=null}D.guard(tok)}
async function shot2_8(){mood('respectful');const s=D.setScene(scShloka(),1200);const S=s.S;Music.hush(true);
  await hold(1200);
  await say("Many families say a beautiful shloka when they light a lamp. It reminds us of the goodness and well-being that light represents.");
  await say("Let’s listen to the words.");await hold(600);
  const els=shlokaPanel(s);await hold(900);
  for(let i=0;i<4;i++)await recite(i,els,3400);
  els.forEach(e=>e.classList.remove('on'));$('meaning').hidden=false;await hold(600);
  await say(MEANING);await hold(800);
  await say("The shloka teaches us to welcome goodness and well-being into our lives.");
  await say("As you see a diya glowing, remember: let your thoughts be kind, let your actions help others, and let your courage shine when someone needs you.");
  await say("Now, shall we say the shloka together once more?");
  /* the second recitation: minimal motion, no transitions */
  S.calm=1;$('meaning').hidden=true;await hold(800);for(let i=0;i<4;i++)await recite(i,els,3800);els.forEach(e=>e.classList.remove('on'));
  await hold(1600);await D.late();
  $('shloka').hidden=true;Overlay.clear();Music.hush(false);S.calm=0;
  /* the halo expands into the outline of a plain clay diya */
  await D.tw(s.cam,{z:2.6,fx:s.pos().c[0],fy:s.pos().c[1]-110},1600,'io')}

/* ---------- Activity 2.9: Make Your Diya of Kindness ---------- */
const MOTIFS=['flower','leaf','dots','geo'];
function motif(g,k,r){if(k==='flower')flower(g,r,P.verm,P.turmeric);else if(k==='leaf'){const l=grp(g);shp(l,leafD(r*2.2,r*.8),P.leaf,2.4);tf(l,-r*1.1,0,1)}
  else if(k==='dots'){[[0,0],[r*.8,0],[-r*.8,0],[0,r*.8],[0,-r*.8]].forEach(([x,y])=>circ(g,x,y,r*.3,P.ivory,1.6))}else{shp(g,`M0 ${-r}L${r} 0L0 ${r}L${-r} 0Z`,P.turmeric,2.4);circ(g,0,0,r*.3,P.verm,1.4)}return g}
function scKind(){const s=mkScene('2.9',{frame:'lotus'});artPart(s);const back=grp(s.comp),medG=grp(s.comp),cen=grp(s.comp),chipG=grp(s.comp),fx=grp(s.comp);
  skyBg(s,{kind:'ivory',horizon:[2000,3000],clouds:[]});
  const K_={choice:null,auto:false,stage:'choose',placed:[],sel:'flower',active:false,show:[0,0,0,0]};s.K=K_;
  const SLOTS=[[-32,1],[-20,4],[-8,5],[4,5],[16,4],[28,1],[-14,-3],[10,-3]];
  s.pos=()=>LP({c:[889,500],ds:2.7,med:[[350,250],[1428,250],[350,610],[1428,610]],mr:132,chips:[[700,740],[826,740],[952,740],[1078,740]],cr:50,deed:[1050,320,290,120]},
    {c:[500,800],ds:2.5,med:[[240,320],[760,320],[240,1260],[760,1260]],mr:140,chips:[[260,1040],[420,1040],[580,1040],[740,1040]],cr:56,deed:[270,900,460,104]});
  onOrient(s,[back,medG,cen,chipG,fx],P_=>{const p=s.pos();/* small leaves, flowers, dots and shapes around the lamp */
    const dec=grp(back,{transform:`translate(${p.c[0]} ${p.c[1]-80})`});for(let i=0;i<16;i++){const a=i/16*TAU;const g=grp(dec,{transform:`translate(${f1(Math.cos(a)*LP(330,300))} ${f1(Math.sin(a)*LP(250,300))})`});motif(g,MOTIFS[i%4],LP(14,14))}
    K_.meds=p.med.map(([x,y],i)=>{const g=grp(medG,{transform:`translate(${x} ${y})`});const hl=grp(g);halo(hl,p.mr+18,{bw:16,col:P.gold});op(hl,0);kindMedal(g,DEEDS[i],p.mr,500+i*13);return{g,hl,x,y}});
    K_.d=keepArt(s,diya(cen,{lit:0,light:0,decor:0}));K_.d.x=p.c[0];K_.d.y=p.c[1];K_.d.s=p.ds;
    K_.motifG=grp(cen);K_.placed.forEach((m,i)=>s.drawMotif(i,m,true));
    K_.chips=p.chips.map(([x,y],i)=>{const g=grp(chipG,{transform:`translate(${x} ${y})`});circ(g,0,0,p.cr,P.ivory,4);circ(g,0,0,p.cr-7,'none',1.6);motif(g,MOTIFS[i],p.cr*.46);const ring=circ(g,0,0,p.cr+8,'none',6,{stroke:P.turmeric});return{g,ring,x,y,k:MOTIFS[i]}});
    K_.tg=target(fx,p.mr+26)});
  s.drawMotif=(i,k,instant)=>{const sl=SLOTS[i];const g=grp(K_.motifG);const p=s.pos();const x=p.c[0]+sl[0]*p.ds,y=p.c[1]+sl[1]*p.ds;motif(g,k,5.4*p.ds);
    const o={k:instant?1:0};const iv=setInterval(()=>tf(g,x,y,o.k),16);tw(o,{k:1},instant?1:420,'back').then(()=>{clearInterval(iv);tf(g,x,y,1)})};
  s.F=fxLayer(s);s.hand=demoHand(s);
  s.tick=(dt,t)=>{if(!K_.meds)return;K_.meds.forEach((m,i)=>{const k=K_.show[i];const ch=K_.choice===DEEDS[i];op(m.g,k*(K_.choice&&!ch?.45:1));tf(m.g,m.x,m.y,(.4+.6*k)*(ch?1.06:1));op(m.hl,ch?1:0)});
    const st=K_.stage==='decorate';K_.chips.forEach(c=>{op(c.g,st?1:0);op(c.ring,K_.sel===c.k?1:0)});
    if(K_.tg){if(K_.active&&K_.stage==='choose'){const i=Math.floor(t/1.5)%4;K_.tg.x=K_.meds[i].x;K_.tg.y=K_.meds[i].y;K_.tg.on=lerp(K_.tg.on,.7,.1)}else K_.tg.on=lerp(K_.tg.on,0,.2);K_.tg.update(t)}};
  s.choose=(key,auto)=>{if(K_.choice||!K_.active)return;K_.choice=key;K_.auto=!!auto;AU.sfx(KIND[key].snd);if(!auto){Store.set('deed',key)}
    const m=K_.meds[DEEDS.indexOf(key)];s.F.burst(m.x,m.y-40,8,'spark',3);D.instr(KIND[key].say,'','');K_.choiceDone&&K_.choiceDone()};
  s.addMotif=(k,auto)=>{if(K_.stage!=='decorate'||K_.placed.length>=SLOTS.length)return;K_.placed.push(k||K_.sel);s.drawMotif(K_.placed.length-1,k||K_.sel,false);AU.sfx('tap');
    K_.d.decor=K_.placed.length/SLOTS.length*.5;D.counter(`${K_.placed.length} of ${SLOTS.length} patterns`);if(K_.placed.length>=3&&!K_.btn)s.showDone();if(K_.placed.length>=SLOTS.length)K_.decoDone&&K_.decoDone()};
  s.showDone=()=>{K_.btn=D.controls([{id:'bLight',label:'Light my diya',on:()=>K_.decoDone&&K_.decoDone()}])};
  const near=(pt,x,y,r)=>Math.hypot(pt.x-x,pt.y-y)<r;
  s.down=pt=>{if(!K_.active)return;const p=s.pos();if(K_.stage==='choose'){const m=K_.meds.find(m=>near(pt,m.x,m.y,p.mr*1.05));if(m)s.choose(DEEDS[K_.meds.indexOf(m)],false);return}
    const c=K_.chips.find(c=>near(pt,c.x,c.y,p.cr*1.2));if(c){K_.sel=c.k;K_.dragChip=c.k;K_.d0=[pt.x,pt.y];K_.moved=false;return}
    if(near(pt,p.c[0],p.c[1],55*p.ds))s.addMotif(K_.sel)};
  s.move=pt=>{if(K_.dragChip&&Math.hypot(pt.x-K_.d0[0],pt.y-K_.d0[1])>14)K_.moved=true};
  s.up=pt=>{const p=s.pos();if(!K_.dragChip)return;const k=K_.dragChip;K_.dragChip=null;if(!K_.moved||near(pt,p.c[0],p.c[1],70*p.ds))s.addMotif(k)};
  s.hots=()=>{if(!K_.active)return[];const p=s.pos();if(K_.stage==='choose')return K_.meds.map((m,i)=>({id:'m'+i,x:m.x,y:m.y,r:p.mr,label:KIND[DEEDS[i]].label,on:()=>s.choose(DEEDS[i],false)}));
    return K_.chips.map(c=>({id:'c'+c.k,x:c.x,y:c.y,r:p.cr,label:'Add a '+(c.k==='geo'?'geometric':c.k)+' pattern',on:()=>{K_.sel=c.k;s.addMotif(c.k)}}))};
  return s}
async function shot2_9(){mood('inviting');Amb.set('none');Music.mood('day');const s=D.setScene(scKind(),1100);const K_=s.K;
  await hold(600);
  await say("Now it’s your turn to spread a little light!");
  const show=i=>{D.go(K_.show,{[i]:1},900,'back');AU.sfx('pop')};
  await say("Choose one kind thing you can do. Will you help someone, share with a friend, comfort someone who feels sad, or care for nature?",
    [["Choose",()=>{}],["help someone",()=>show(0)],["share",()=>show(1)],["comfort",()=>show(2)],["care for nature",()=>show(3)]]);
  [0,1,2,3].forEach(i=>K_.show[i]=1);
  D.instr('Tap one kind thing you can do','','tap');K_.active=true;Hot.dirty=true;
  await D.task({hint:"Tap the picture of the kind thing you would like to do.",start(t){K_.choiceDone=()=>t.finish()},
    demo(){const m=K_.meds[0];s.hand.tap(m.x,m.y,2)},assist(t){s.choose(DEEDS[Math.floor(Math.random()*4)],true);t.finish()}});
  await hold(1600);
  /* decorate the diya: tap or drag patterns onto it */
  K_.stage='decorate';Hot.dirty=true;D.instr('Decorate your diya: tap a pattern, or drag it onto the lamp','0 of 8 patterns','tap');
  await D.task({hint:"Tap a flower, a leaf, dots or a shape to add it to your diya.",start(t){K_.decoDone=()=>t.finish()},
    demo(){const c=K_.chips[0];s.hand.drag([[c.x,c.y],[s.pos().c[0],s.pos().c[1]]],1200)},
    assist(t){const step=()=>{if(t.done)return;if(K_.placed.length>=8){t.finish();return}s.addMotif(MOTIFS[K_.placed.length%4],true);Timers.add(700,step)};step()}});
  K_.active=false;K_.stage='done';D.clearAct();Hot.dirty=true;
  /* plain clay becomes a folk-art lamp; the flame lights; the chosen deed appears beside it */
  await D.tw(K_.d,{decor:1},900);AU.sfx('diya');D.go(K_.d,{lit:1,light:1},900,'back');s.F.burst(s.pos().c[0],s.pos().c[1]-120,8,'spark',2.6);
  $('deedText').textContent=KIND[K_.choice||'help'].label;$('deed').hidden=false;Overlay.add($('deed'),()=>{const q=s.pos().deed;return refRectPx(q[0],q[1],q[2],q[3])});
  s.bloom(1);Music.swell();await hold(1400);
  await say("Your diya is beautiful! And your kind action can make it even brighter. Remember, the light we share through kindness can last long after a lamp goes out.");
  await hold(1600);await D.late();$('deed').hidden=true;Overlay.clear();
  /* the finished flame becomes one of many lamps across Ayodhya */
  await D.tw(s.cam,{z:3,fx:s.pos().c[0],fy:s.pos().c[1]-80},1600,'io')}

/* ---------- Scene 2.10: Carry the Light Within You (closing) ---------- */
function scClose(){const s=mkScene('2.10',{frame:'night'});artPart(s);const back=grp(s.comp),mid=grp(s.comp),fore=grp(s.comp),ring=grp(s.comp);
  skyBg(s,{kind:'night',horizon:[470,760],ground:['flower',P.gold,P.brown,.9],stars:18,clouds:[[.14,.22,250],[.84,.18,300]]});
  const lak=cast(s,'lak',CAST.lak,mid),rama=cast(s,'rama',CAST.rama,mid),sita=cast(s,'sita',CAST.sita,mid),han=cast(s,'hanuman',CAST.hanuman,mid);
  const folk=[personCfg(601,{child:true}),personCfg(602,{child:false,fem:true}),personCfg(603,{child:true}),personCfg(604,{child:false}),personCfg(605,{child:true,fem:true}),personCfg(606,{child:false,fem:true})].map(c=>cast(s,'folk',c,mid));
  folk.forEach(f=>mid.insertBefore(f.g,mid.firstChild));
  s.pos=()=>LP({lak:[640,730,.92,1],rama:[790,730,.95,1],sita:[960,730,.95,-1],han:[1110,734,.92,-1],folk:[[200,630,.6,1],[300,634,.6,-1],[430,630,.6,1],[1300,630,.6,1],[1420,634,.6,-1],[1560,630,.6,-1]],
      fd:[1240,772,1.6],icon:[1400,730,58],medal:[889,170,180],ell:[889,420,900,440]},
    {lak:[240,1170,.9,1],rama:[410,1170,.92,1],sita:[590,1170,.92,-1],han:[760,1174,.9,-1],folk:[[100,990,.5,1],[200,994,.5,-1],[310,990,.5,1],[690,990,.5,1],[800,994,.5,-1],[900,990,.5,-1]],
      fd:[500,1400,1.25],icon:[330,1390,50],medal:[500,330,210],ell:[500,760,540,780]});
  onOrient(s,[back,fore,ring],P_=>{const p=s.pos();/* a large symmetrical floral motif in the sky */const md=grp(back,{transform:`translate(${p.medal[0]} ${p.medal[1]})`});const r=p.medal[2];
    petalRing(md,r*.95,24,P.gold,P.turmeric,r*.3);halo(md,r*.7,{bw:r*.12,col:P.gold});const rg=rangoli(md,r*.42,2);s.md=md;
    const A=ayodhyaArt(s,back,fore,{dome:P.gold});const pc=A.pc;const C={hs:A.hs};/* little lamps along rooftops, windows, the palace and the road */
    const L_=[];A.hs.forEach(({x,y,k})=>{L_.push(...lampRow(x-104*k,y-190*k-4,x+104*k,y-190*k-4,8));L_.push(...lampRow(x-100*k,y+6,x+100*k,y+6,7));L_.push(...lampRow(x-130*k,y-190*k-50*k,x,y-190*k-92*k,4),...lampRow(x,y-190*k-92*k,x+130*k,y-190*k-50*k,4))});
    L_.push(...lampRow(pc[0]-500*pc[2],pc[1]-252*pc[2],pc[0]+500*pc[2],pc[1]-252*pc[2],20),...lampRow(pc[0]-500*pc[2],pc[1]+4,pc[0]+500*pc[2],pc[1]+4,16));
    for(let i=0;i<12;i++){const q=polyAt(A.road,i/11);L_.push([q[0],q[1]-LP(42,46)],[q[0],q[1]+LP(42,46)])}
    L_.push(...lampRow(LP(40,40),LP(476,766),LP(1740,960),LP(476,766),LP(30,18)));
    s.lampsA=tinyLamps(back,L_.filter((_,i)=>i%2===0),1.1);s.lampsB=tinyLamps(back,L_.filter((_,i)=>i%2===1),1.1);
    const ag=grp(back,{transform:`translate(${pc[0]} ${pc[1]}) scale(${pc[2]})`});shp(ag,'M-68 0V-124Q-68 -215 0 -215Q68 -215 68 -124V0Z',P.turmeric,4);
    /* the child's own diya, its flame connected by golden dotted lines to the city's lamps */
    s.links=grp(fore);[[pc[0],pc[1]-250*pc[2]],[C.hs[0].x,C.hs[0].y-190*C.hs[0].k],[C.hs[C.hs.length-1].x,C.hs[C.hs.length-1].y-190*C.hs[C.hs.length-1].k]].forEach(([x,y])=>{
      const d=`M${p.fd[0]} ${p.fd[1]-90*p.fd[2]}Q${(p.fd[0]+x)/2} ${Math.min(y,p.fd[1])-120} ${x} ${y}`;ln(s.links,d,K,7,{'stroke-dasharray':'.1 16'});ln(s.links,d,P.turmeric,4,{'stroke-dasharray':'.1 16'})});op(s.links,s.linkK||0);
    s.fd=keepArt(s,diya(fore,{lit:1,light:1,decor:1}));s.fd.x=p.fd[0];s.fd.y=p.fd[1];s.fd.s=p.fd[2];
    /* the visual callback: the chosen deed's small icon beside the child's diya */
    s.icon=null;const deed=Store.data.deed;if(DEEDS.includes(deed)){const g=grp(fore,{transform:`translate(${p.icon[0]} ${p.icon[1]})`});kindMedal(g,deed,p.icon[2],700);s.icon=g;op(g,s.iconK||0)}
    /* floral motifs form a circular frame */
    const e=p.ell;s.frameRing=shp(ring,`M-400 -400H2400V2000H-400Z${ellD(e[0],e[1],e[2],e[3])}`,Pat.u('flower',P.gold,P.indigo,1.2),0,{'fill-rule':'evenodd'});
    s.frameLine=grp(ring);ln(s.frameLine,ellD(e[0],e[1],e[2],e[3]),K,12);ln(s.frameLine,ellD(e[0],e[1],e[2],e[3]),P.gold,6);petalRing(grp(s.frameLine,{transform:`translate(${e[0]} ${e[1]}) scale(${f3(e[2]/e[3])} 1)`}),e[3],48,P.verm,P.marigold,26);
    put(lak,p.lak);put(rama,p.rama);put(sita,p.sita);put(han,p.han);folk.forEach((f,i)=>put(f,p.folk[i]))});
  s.ringK=0;s.tick=(dt,t)=>{const m=MV();if(s.lampsA){op(s.lampsA.fl,.75+.25*Math.sin(t*2.7));op(s.lampsB.fl,.75+.25*Math.sin(t*2.3+1.5))}if(s.md)tf(s.md,s.pos().medal[0],s.pos().medal[1],1,t*2*m*(1-(s.still||0)));
    if(s.links)op(s.links,s.linkK||0);if(s.icon)op(s.icon,s.iconK||0);const k=s.ringK||0;if(s.frameRing){op(s.frameRing,k);op(s.frameLine,k);const e=s.pos().ell;const z=1+(1-k)*.5;
      s.frameRing.setAttribute('transform',`translate(${e[0]} ${e[1]}) scale(${f3(z)}) translate(${-e[0]} ${-e[1]})`);s.frameLine.setAttribute('transform',`translate(${e[0]} ${e[1]}) scale(${f3(z)}) translate(${-e[0]} ${-e[1]})`)}};
  rama.set('idle',0);sita.set('smile',0);lak.set('smile',0);han.set('namaste',0);
  folk[0].hold('f','diya',{lit:1});folk[0].set('light',0);folk[1].hold('f','plate');folk[1].set('share',0);folk[2].hold('f','sweet');folk[2].set('share',0);
  folk[3].hold('f','garland');folk[3].set('garlands',0);folk[4].set('sad',0);folk[5].set('comfort',0);return s}
async function shot2_10(){mood('heartfelt');Amb.set('night');Music.mood('light');const s=D.setScene(scClose(),1200);const {rama,sita,lak,hanuman:han}=s.cast;const folk=[].concat(s.cast.folk);
  /* Rama, Sita and Lakshmana walk into the scene from the left; Sita turns to face the others when they stop */
  const p=s.pos();const trio=[[sita,p.sita],[rama,p.rama],[lak,p.lak]];trio.forEach(([f,q])=>{f.x=q[0]-LP(1050,800);f.f=1});
  trio.forEach(([f,q],i)=>Timers.add(i*500,()=>{f.set('walk',200);tw(f,{x:q[0]},LP(7200,6200),'lin').then(()=>{f.set(f===rama?'idle':'smile',400);if(f===sita)sita.turn(-1)})}));
  /* the camera pulls back to reveal the whole city */
  s.cam.z=1.45;s.cam.fx=LP(889,500);s.cam.fy=LP(560,1000);D.go(s.cam,{z:1,fy:LP(405,750)},16000,'io');
  await hold(800);
  await say("And so, the city of Ayodhya shone with the light of countless diyas.");
  await say("The story of Rama’s journey reminds us that courage can help us through difficult times, friendship makes us stronger, and hope can guide us forward.",
    [["courage",()=>{rama.nod();rama.set('determined',600)}],["friendship",()=>{han.set('rejoice',600);lak.set('smile',600)}],["hope",()=>{sita.set('smile',600);rama.set('smile',600);han.set('namaste',700);folk[4].set('smile',700)}]]);
  await say("Every Diwali, families celebrate with lamps, prayers, sweets and time together. The glowing diya reminds us of the light we can bring into our homes and into the lives of others.",
    [["lamps",()=>folk[0].set('placeDiya',700)],["sweets",()=>{folk[1].set('sweets',600);folk[2].set('smile',600)}],["glowing diya",()=>D.go(s,{linkK:1},2400)]]);
  await say("So this Diwali, when you see a little lamp shining, remember your own little light.",[["your own little light",()=>{D.go(s,{iconK:1},1400);AU.sfx('chime')}]]);
  await say("Be brave. Be kind. Help others. And whenever you can, make someone’s world a little brighter.",[["Be brave",()=>rama.set('bless',700)],["Help others",()=>folk[3].set('helpAnother',700)],["brighter",()=>D.go(s,{ringK:1},3200,'io')]]);
  Music.swell();
  await say("Happy Diwali! May your home be filled with joy, your heart with kindness, and your life with light.",[["Happy Diwali",()=>{AU.sfx('celebrate');[rama,sita,lak,han].forEach(f=>f.set('namaste',700))}]]);
  /* end on a still composition with the foreground diya glowing steadily */
  s.still=1;await hold(2600);await D.late();await endCard(2)}
