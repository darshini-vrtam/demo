/* ================= EPISODE 7: WHAT IS TRUE WEALTH? ================= */
const HOME={L:{man:[889,410],mr:1,ped:[889,600],kal:[889,452],ks:1.55,dh:[300,716],ds:.74,
    diya:[[140,770],[560,760],[1218,760],[1440,770],[1680,770],[700,792],[1078,792],[420,792]],ves:[1570,714],gold:[[700,660],[1078,660]],herb:[[620,720],[1158,720]],
    sym:[[560,262],[700,150],[889,104],[1078,150],[1218,262]],sr:58,floor:600,
    med:[[110,620],[110,400],[110,180],[470,100],[1308,100],[1668,180],[1668,400]],mr2:66},
  P:{man:[500,700],mr:1.18,ped:[500,930],kal:[500,770],ks:1.75,dh:[160,1260],ds:.72,
    diya:[[90,1440],[330,1440],[670,1440],[910,1440],[500,1460],[260,1330],[740,1330],[860,1210]],ves:[850,1250],gold:[[340,990],[660,990]],herb:[[270,1060],[730,1060]],
    sym:[[230,600],[330,420],[500,360],[670,420],[770,600]],sr:56,floor:1010,
    med:[[80,860],[80,640],[200,150],[500,130],[800,150],[920,640],[920,860]],mr2:66}};
function homeScene(o){o=o||{};const s=mkScene(o.id||'home',{frame:'gold'});
  s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha;const fy=toStage(0,(L.portrait?HOME.P:HOME.L).floor)[1];
    el('rect',{x:-4,y:-4,width:W+8,height:H+8,fill:Pat.u('stars',P.turmeric,P.indigo,1.2)},this.bg);
    if(o.sea){this.sea=ocean(this.bg,W,fy-LP(120,150),fy+20,{mood:'divine',n:2,scale:.8})}
    shp(this.bg,`M-4 ${fy}H${W+4}V${H+4}H-4Z`,Pat.u('petals',P.turmeric,P.terra,1),4);ln(this.bg,`M-4 ${fy+14}H${W+4}`,P.ivory,4,{'stroke-dasharray':'.1 14'});
    /* a toran of marigolds and mango leaves across the top */
    const tor=grp(this.bg);const n=Math.max(6,Math.round(W/170));let d='';for(let i=0;i<n;i++){const x0=BORDER+i*(W-2*BORDER)/n,x1=x0+(W-2*BORDER)/n;d+=`M${f1(x0)} ${BORDER+6}Q${f1((x0+x1)/2)} ${BORDER+60} ${f1(x1)} ${BORDER+6}`}
    ln(tor,d,K,7);ln(tor,d,P.leaf,3.4);for(let i=0;i<n;i++){const x0=BORDER+i*(W-2*BORDER)/n,x1=x0+(W-2*BORDER)/n;for(let j=1;j<5;j++){const u=j/5;const x=lerp(x0,x1,u),y=BORDER+6+Math.sin(u*Math.PI)*27;const m=marigold(tor,10,j%2?P.turmeric:P.ochre);tf(m,x,y,1)}
      leaf(tor,26,9,P.leaf,90,x0,BORDER+8)}};
  s.parts.push({update:(dt,t)=>{s.sea&&(s.sea.k=.6,s.sea.update(t,dt))}});
  const comp=s.comp;const manG=grp(comp),pedG=grp(comp),kalG=grp(comp),dhG=grp(comp),propL=grp(comp),symL=grp(comp),medL=grp(comp),fxL=grp(comp);
  const man=grp(manG);halo(man,250,{col:P.turmeric});rings(man,220,{n:3,step:.14,w:5,c1:P.gold,c2:P.ivory,dots:18});circ(man,0,0,150,P.indigo,4);
  circ(man,0,0,150,'none',3,{stroke:P.turmeric,'stroke-dasharray':'.1 12','stroke-width':7,'stroke-linecap':'round'});const rayG=grp(man);rays(rayG,262,330,32,P.turmeric,6);
  const ped=grp(pedG);shp(ped,'M-170 30H170L150 80H-150Z',Pat.u('petals',P.turmeric,P.verm,.8),4);const pl=lotus(ped,{r:120,n:9,open:1,col:P.pink,col2:P.ivory});tf(pl.g,0,24,1);
  const kal=kalash(kalG,{lotus:true});
  const dh=new Deity('dhanv',dhG,{pose:'open'});const dAura=grp(dhG);dhG.insertBefore(dAura,dhG.firstChild);rings(dAura,150,{n:3,step:.16,w:4,c1:P.turmeric,c2:P.ivory});
  const diyas=[];for(let i=0;i<8;i++)diyas.push(diya(propL,{col:i%2?P.terra:P.ochre}));
  const ves=grp(propL);shp(ves,'M-30 -40Q-56 -20 -46 10Q-36 36 0 38Q36 36 46 10Q56 -20 30 -40Z',Pat.u('vlines',P.ochre,P.terra,.7),4);shp(ves,'M-16 -40L-20 -58H20L16 -40Z',P.terra,3);ell(ves,0,-58,24,6,P.ochre,3);
  [-1,0,1].forEach(i=>leaf(ves,40,11,P.leaf,-90+i*35,i*6,-62));
  const golds=[0,1].map(()=>{const g=grp(propL);[[-20,6],[18,6],[0,-14],[-34,-8],[34,-8]].forEach(([x,y],j)=>{const m=marigold(g,16,j%2?P.ochre:P.turmeric);tf(m,x,y,1)});return g});
  const herbs=[0,1].map(i=>{const g=grp(propL);sprig(g,.75);return g});
  const syms=SYMS.map(sy=>{const g=grp(symL);const halo_=grp(g);rings(halo_,80,{n:2,step:.2,w:4});circ(g,0,0,58,P.ivory,4);circ(g,0,0,50,'none',2.4,{stroke:P.gold,'stroke-dasharray':'.1 9','stroke-width':5,'stroke-linecap':'round'});
    const ic=grp(g);symbol(ic,sy.key);ic.setAttribute('transform','scale(.62)');return{g,halo:halo_,k:0,glow:0,key:sy.key}});
  Object.assign(s,{kal,dh,diyas,syms,man,rayG,medL,fxL,st:{rays:o.rays||0,dh:1}});s.cast.dhanv=dh;
  s.onLayout=function(){s.A=L.portrait?HOME.P:HOME.L};
  s.tick=function(dt,t){const A=s.A,m=MV();tf(man,A.man[0],A.man[1],A.mr,t*1.5*m);op(rayG,s.st.rays);
    tf(ped,A.ped[0],A.ped[1],L.portrait?1.15:1);kal.x=A.kal[0];kal.y=A.kal[1];kal.s=A.ks;kal.update(t);
    dh.x=A.dh[0];dh.y=A.dh[1];dh.s=A.ds;dh.update(dt,t);tf(dAura,0,-300,1,0);op(dhG,s.st.dh);
    diyas.forEach((d,i)=>{d.x=A.diya[i][0];d.y=A.diya[i][1];d.s=L.portrait?1.05:.95;op(d.g,i<(s.nDiya||5)?1:0);d.update(t)});
    tf(ves,A.ves[0],A.ves[1],L.portrait?1.05:1);golds.forEach((g,i)=>tf(g,A.gold[i][0],A.gold[i][1],L.portrait?1.1:1));herbs.forEach((g,i)=>tf(g,A.herb[i][0],A.herb[i][1],1,i?14:-14,i?-1:1,1));
    syms.forEach((sy,i)=>{const p=A.sym[i];tf(sy.g,p[0],p[1],A.sr/58*(1+.12*sy.k));op(sy.halo,clamp(sy.k+sy.glow,0,1));if(sy.k+sy.glow>0)tf(sy.halo,0,0,.9+.25*sy.glow+.04*Math.sin(t*1.3+i)*m,t*8*m)})};
  s.fx=fxLayer(s);s.demo=demoHand(s);return s}
async function glowOnce(sy){AU.sfx('sparkle');await D.tw(sy,{k:1},600,'out');await D.tw(sy,{k:0},900)}

async function shot7_1(){await titleCard(7,'What Is True Wealth?');D.chip('Episode 7 · The Magical Treasure Pot');Music.mood('divine');D.setMood({});
  const s=homeScene();D.setScene(s,1300);const sy=s.syms;
  await D.wait(700);
  await D.say('Children, before we say goodbye to the Ocean of Wonders, let us imagine something.');
  await D.say('Suppose Lord Dhanvantari has offered you a magical treasure pot.',{cues:[['treasure pot',()=>{D.go(s.kal,{glow:.5},1200);AU.sfx('chime')}]]});
  await D.say('It is beautiful and golden, with tiny lotus flowers carved all around it.');
  await D.say('But this is no ordinary pot.');
  await D.say('You can fill it with the things you believe make life truly precious.');
  await D.say('What would you place inside?');
  await D.say('Would you choose good health, so you can run, play, learn, and grow?',{cues:[['good health',()=>glowOnce(sy[0]).catch(()=>{})]]});
  await D.say('Would you choose love and family, so you always have people to care for and share your happiness with?',{cues:[['love and family',()=>glowOnce(sy[1]).catch(()=>{})]]});
  await D.say('Would you choose kindness, so you can help someone who needs you?',{cues:[['kindness',()=>glowOnce(sy[2]).catch(()=>{})]]});
  await D.say('Would you choose wisdom, so you can learn to make thoughtful choices?',{cues:[['wisdom',()=>glowOnce(sy[3]).catch(()=>{})]]});
  await D.say('Or would you choose gold and jewels, beautiful treasures that can bring comfort and joy?',{cues:[['gold and jewels',()=>glowOnce(sy[4]).catch(()=>{})]]});
  await D.say('There is room in your magical pot for many wonderful things.');
  await D.say('Let us discover what matters most to you.');await D.late()}

/* ---- 7.2 Fill the Treasure Pot: the story's only choice, multi-select, no wrong answer ---- */
function cardSvg(key){const s=document.createElementNS(NS,'svg');s.setAttribute('viewBox','-100 -72 200 144');s.setAttribute('aria-hidden','true');
  el('rect',{x:-100,y:-72,width:200,height:144,fill:Pat.u('dots',P.turmeric,P.ivory,.8)},s);circ(s,0,0,62,P.ivory,3.4);const g=grp(s);symbol(g,key);g.setAttribute('transform','scale(.7)');return s}
async function shot7_2(){D.chip('Episode 7 · Fill the Treasure Pot');let s=D.scene;if(!s||s.id!=='home'){s=homeScene();D.setScene(s)}const tok=D.token;
  await D.say('Look at the treasures before you, little Ocean Explorers.');
  const picks=[];let resolve;const done=new Promise(r=>resolve=r);let auto=false;
  const tray=$('tray');tray.innerHTML='';const btns=SYMS.map((sy,i)=>{const b=document.createElement('button');b.type='button';b.className='card';b.dataset.key=sy.key;b.setAttribute('aria-pressed','false');
    b.setAttribute('aria-label',`${sy.label}: ${sy.desc}`);b.append(cardSvg(sy.key));const t=document.createElement('b');t.textContent=sy.label;const d=document.createElement('small');d.textContent=sy.desc;b.append(t,d);
    b.addEventListener('click',()=>{D.poke();AU.resume();choose(i)});tray.append(b);return b});
  tray.hidden=false;await new Promise(r=>requestAnimationFrame(r));D.trayPx=tray.getBoundingClientRect().height;D.go(D,{inset:1},D.fast?10:700);
  const onR=()=>{D.trayPx=tray.hidden?0:tray.getBoundingClientRect().height};window.addEventListener('resize',onR);
  let els=null;
  /* each choice flies a glowing token into the pot, which glows a little brighter */
  const fly=async i=>{const b=btns[i];const r=b.getBoundingClientRect();const p=Input.toRef(r.left+r.width/2,r.top+r.height*.3);const g=grp(s.top);orb(g);const sg=grp(g);symbol(sg,SYMS[i].key);sg.setAttribute('transform','scale(.3)');
    const o={x:p.x,y:p.y,k:0};const A=s.A;s.parts.push({update:()=>{tf(g,lerp(o.x,A.kal[0],o.k),lerp(o.y,A.kal[1]-80*A.ks,o.k)-Math.sin(o.k*Math.PI)*120,1.2-.6*o.k);op(g,o.k<1?1:0)}});
    AU.sfx('drop');await D.tw(o,{k:1},900,'io');g.remove();AU.sfx('chime');s.fx.burst(A.kal[0],A.kal[1]-80*A.ks,7,'spark',TAU);D.go(s.kal,{glow:Math.min(1.6,.5+picks.length*.22)},700)};
  const choose=i=>{const k=SYMS[i].key;if(picks.includes(k))return;picks.push(k);btns[i].setAttribute('aria-pressed','true');fly(i).catch(()=>{});s.syms[i].glow=.6;
    D.counter(`${picks.length} chosen`);if(!els){els=D.controls([{id:'ready',html:'<span class="lotusbtn"><svg viewBox="-30 -26 60 30" aria-hidden="true"><path d="M0 0C-10 -8 -8 -20 0 -24C8 -20 10 -8 0 0ZM0 0C-16 -2 -26 -10 -26 -16C-14 -14 -6 -8 0 0ZM0 0C16 -2 26 -10 26 -16C14 -14 6 -8 0 0Z" fill="#E45C9A" stroke="#111111" stroke-width="2.4"/></svg>I’m ready</span>',aria:'I am ready',on:()=>resolve()}])}};
  D.instr('Tap the treasures you would place in your pot.','','tap');
  /* the Narrator reads every card in the script's words */
  const reading=(async()=>{await D.say('Choose the things you would place inside your magical pot.');
    for(let i=0;i<SYMS.length;i++){btns[i].classList.add('reading');await D.say(`${SYMS[i].label[0]+SYMS[i].label.slice(1).toLowerCase()}. ${SYMS[i].desc}`).catch(()=>{});btns[i].classList.remove('reading')}})().catch(()=>{});
  await reading;D.guard(tok);
  await D.task({hint:'Tap any treasure for your pot.',start(t){done.then(()=>t.finish())},
    demo(){const b=btns.find(x=>x.getAttribute('aria-pressed')==='false')||btns[0];b.classList.remove('pulse');void b.offsetWidth;b.classList.add('pulse')},
    async assist(t){if(!picks.length){auto=true;for(let i=0;i<SYMS.length;i++){choose(i);await D.wait(700)}}resolve();t.finish()}});
  D.guard(tok);window.removeEventListener('resize',onR);
  Store.set('choices',auto?['all (auto)']:picks.slice());D.clearAct();
  D.go(D,{inset:0},D.fast?10:600);await D.wait(D.fast?10:620);tray.hidden=true;tray.innerHTML='';Badge.gain(6);
  /* the chosen symbols glow while the Narrator speaks */
  const chosen=auto?SYMS.map(x=>x.key):picks;s.syms.forEach(sy=>{D.go(sy,{glow:chosen.includes(sy.key)?1:0},800)});
  await D.say('Look at the treasures you have chosen!');
  await D.say('Every one of these can have a place in a meaningful life.');
  await D.say('Gold and jewels can be beautiful.');
  await D.say('Prosperity can help us care for ourselves and others.');
  await D.say('But we must also remember to protect our health, share our love, act with kindness, and keep learning.');
  await D.say('The greatest treasure is not always the one that shines the brightest.');
  await D.say('Sometimes, it is the one that helps us live well and care for the people around us.');await D.late();
  s.syms.forEach(sy=>D.go(sy,{glow:0},900))}

/* ================= CLOSING: A LITTLE LIGHT FOR DHANTERAS ================= */
/* miniature versions of the story's own drawings, one per recap line */
function miniPic(parent,k){const g=grp(parent);
  if(k===0){shp(g,'M-80 6Q-60 -6 -40 6T0 6T40 6T80 6V80H-80Z',Pat.u('wave',P.foam,P.indigo,.45),3);const l=lotus(g,{r:30,n:7,open:.9});tf(l.g,0,8,1);star4(g,-30,-30,8,P.turmeric);star4(g,30,-36,6,P.ivory)}
  else if(k===1){shp(g,'M-80 -10Q-60 -22 -40 -10T0 -10T40 -10T80 -10V80H-80Z',Pat.u('wave',P.foam,P.turq,.45),3);const f=fish(g,0);tf(f.g,-12,16,.5,-12);const f2=fish(g,2);tf(f2.g,26,-30,.38,10,-1,1)}
  else if(k===2){const kg=grp(g);kurma(kg);tf(kg,0,42,.2);const mg=grp(g);mandara(mg);tf(mg,0,20,.15);shp(g,'M-80 34Q-60 26 -40 34T0 34T40 34T80 34V80H-80Z',Pat.u('wave',P.foam,P.indigo,.4),2)}
  else if(k===3){const sc=grp(g,{transform:'scale(.17)'});const mg=grp(sc);mandara(mg);tf(mg,0,240,1);const b=grp(sc),f=grp(sc),h=grp(sc);const V=vasuki(b,f,h);sc.insertBefore(b,mg);op(h,0);
    const list=[];for(let i=0;i<=90;i++){const u=i/90,v=lerp(.12,.66,u),th=-Math.PI/2+u*2.5*TAU;const R=MANDARA.hw(v)+18;list.push([R*Math.sin(th),240-v*MANDARA.H+Math.cos(th)*16,Math.cos(th)])}V.draw(list,{})}
  else if(k===4){const d=new Deity('shiva',g,{pose:'shiva'});d.throat=1;d.x=0;d.y=150;d.s=.38;d.update(0,0)}
  else if(k===5){const a=airavata(g);tf(a.g,-6,40,.42);a.update(0)}
  else{const d=new Deity('dhanv',g,{pose:'kalash'});d.x=0;d.y=150;d.s=.38;d.update(0,0);const kk=kalash(g);const hl=d.handW(-1),hr=d.handW(1);kk.x=(hl[0]+hr[0])/2;kk.y=(hl[1]+hr[1])/2-8;kk.s=.19;kk.update(0)}
  return g}
async function shotC_1(){await titleCard(8,'A Little Light for Dhanteras');D.chip('Closing · A Little Light for Dhanteras');Music.mood('divine');D.setMood({rate:.94});
  const s=homeScene({id:'closing',sea:true,rays:1});s.nDiya=8;D.setScene(s,1300);const tok=D.token;
  /* the ring of seven medallions around the border */
  const meds=[0,1,2,3,4,5,6].map(i=>{const m=medallion(s.medL,66,{bg:i===4?P.violet:P.indigo});miniPic(m.pic,i);const dim=circ(m.pic,0,0,m.inner,P.midnight,0);return{m,dim,lit:0}});
  s.parts.push({update:t=>{const A=s.A;meds.forEach((o,i)=>{const p=A.med[i];tf(o.m.g,p[0],p[1],A.mr2/66*(1+.1*Math.sin(o.lit*Math.PI)));op(o.dim,.55*(1-o.lit))})}});
  /* the child may light diyas and sparkle flowers and leaves at any time */
  const lightDiya=i=>{const d=s.diyas[i];if(d.lit<.5){AU.sfx('diya');D.go(d,{lit:1},700,'out')}else{AU.sfx('sparkle');s.fx.burst(d.x,d.y-60,6,'spark',TAU)}};
  const next=()=>s.diyas.findIndex(d=>d.lit<.5);const cueDiya=()=>{const i=next();if(i>=0)lightDiya(i)};
  s.down=p=>{D.poke();const A=s.A;const i=A.diya.findIndex(q=>Math.hypot(p.x-q[0],p.y-(q[1]-30))<70);if(i>=0){lightDiya(i);return}
    if(A.gold.concat(A.herb).some(q=>Math.hypot(p.x-q[0],p.y-q[1])<80)||Math.hypot(p.x-A.ves[0],p.y-A.ves[1])<70){AU.sfx('sparkle');s.fx.burst(p.x,p.y,7,Math.random()<.5?'petal':'spark',TAU)}};
  s.hots=()=>s.A?s.diyas.map((d,i)=>({id:'diya'+i,label:d.lit>.5?'Glowing diya: tap to sparkle':'Diya: tap to light it',x:s.A.diya[i][0],y:s.A.diya[i][1]-30,r:56,on:()=>lightDiya(i)})):[];Hot.dirty=true;
  const lightMed=i=>{AU.sfx('chime');D.go(meds[i],{lit:1},900,'out')};
  await D.wait(700);
  await D.say('And now, dear Ocean Explorers, our great adventure has come to an end.');
  const recap=['Today, we travelled to the magnificent Ocean of Milk.','We helped awaken its waves.','We helped Kurma support the mighty mountain.','We pulled the great serpent rope and churned the ocean together.',
    'We witnessed Lord Shiva protect the universe from the terrible poison.','We discovered the extraordinary treasures hidden beneath the waves.','And finally, we welcomed Lord Dhanvantari, the divine physician, carrying the precious pot of amrit.'];
  for(let i=0;i<7;i++){lightMed(i);await D.say(recap[i])}
  await D.say('But the most important thing we discovered was not simply a treasure hidden beneath the ocean.');
  await D.say('It was a lesson we can carry in our hearts.');
  await D.say('True prosperity is not only about what we own.');
  await D.say('It is also about how we live, how we care for ourselves, and how we treat others.');
  await D.say('So, this Dhanteras, when you see a little diya glowing in your home, remember the great Ocean of Milk.',{cues:[['remember',cueDiya]]});
  await D.say('Remember the devas and asuras who worked together.',{cues:[['Remember',cueDiya]]});
  await D.say('Remember Lord Shiva, who protected creation.',{cues:[['Remember',cueDiya]]});
  await D.say('And remember Lord Dhanvantari, who appeared carrying the precious pot of amrit.',{cues:[['remember',cueDiya]]});
  /* blessings: the remaining diyas and the five symbols light; the child's chosen symbols glow brighter (the only callback) */
  Music.swell();const ch=Store.data.choices||[];const all=ch.includes('all (auto)');const isPick=k=>all||ch.includes(k);
  const sym=keys=>keys.forEach(k=>{const sy=s.syms.find(x=>x.key===k);D.go(sy,{k:isPick(k)?.25:0,glow:isPick(k)?1:.45},900);if(isPick(k))s.fx.burst(s.A.sym[SYMS.findIndex(x=>x.key===k)][0],s.A.sym[SYMS.findIndex(x=>x.key===k)][1],8,'spark',TAU);AU.sfx('chime')});
  await D.say('May your homes be filled with light.',{cues:[['May',()=>{cueDiya();sym(['gold'])}]]});
  await D.say('May your families be blessed with health and happiness.',{cues:[['May',()=>{cueDiya();sym(['health','family'])}]]});
  await D.say('May your hearts be filled with kindness.',{cues:[['May',()=>{cueDiya();sym(['kind'])}]]});
  await D.say("And may you always remember that one of life's greatest treasures is the gift of being able to care for one another.",{cues:[['may',()=>{cueDiya();sym(['wisdom'])}]]});
  s.diyas.forEach((d,i)=>{if(d.lit<.5)Timers.add(i*120,()=>lightDiya(i))});
  D.guard(tok);
  await D.say('Happy Dhanteras, little Ocean Explorers!',{cues:[['Happy',()=>{Badge.bloom();AU.sfx('success');D.go(s.kal,{glow:1.6},1200)}]]});
  Store.set('done',true);Store.set('ep',1);
  /* end card: the painting moves up so the kalash and Lord Dhanvantari stay uncovered */
  const end=$('end');end.hidden=false;await new Promise(r=>requestAnimationFrame(r));const pr=end.querySelector('.panel').getBoundingClientRect();D.trayPx=pr.height+18;D.go(D,{inset:1},900);
  D.chip('');await D.late();await new Promise(()=>{})}
