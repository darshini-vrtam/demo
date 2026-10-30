/* ================= SCENE 4: OUR SECOND SHLOKA ================= */
async function shot4_1(){Store.set('scene',4);mood('reverent');Music.mood('prayer');Music.setLevel(.35,2);
  const s=homeStage({view:'puja',state:DONE_STATE,tod:'evening'});s.H.lit=1;s.H.pujaLit=1;D.setScene(s,1400);rowDiyas(s.H,7);const F=s.F,H=s.H,light=s.light;
  placeP(F.gran,[640,808,.92],[330,1345,.74],true);placeP(F.girl,[430,815,.9],[140,1360,.64],true);placeP(F.boy,[1340,815,.9],[860,1360,.64],true);F.mother.vis=false;F.father.vis=false;
  /* offerings in the foreground: flowers, a lit diya and a small plate of sweets */
  const fg=grp(s.propL);const fd=diya(fg,{col:P.terra});fd.lit=1;const sw=grp(fg);sweetsPlate(sw);const fl=grp(fg);[[-24,0],[0,-14],[24,0]].forEach(([x,y],i)=>{const m=marigold(fl,16,i%2?P.coral:P.gold);tf(m,x,y,1)});
  s.parts.push({update:(dt,t)=>{const a=LP([[1040,770],[1180,778],[760,786]],[[600,1420],[760,1430],[430,1440]]);fd.x=a[0][0];fd.y=a[0][1];fd.s=LP(.7,.6);fd.update(t);tf(sw,a[1][0],a[1][1],LP(.9,.7));tf(fl,a[2][0],a[2][1],LP(1,.8))}});
  const fr=s.toHome(321,-230);light.vis=true;light.x=fr[0]+LP(230,190);light.y=fr[1]-LP(190,230);
  await D.wait(800);for(const k of['gran','girl','boy'])F[k].set('namaste');light.set('still');D.go(H.frame,{mk:1},2000);
  await sayShot('4.1');await D.late();
  s.cam.fx=fr[0];s.cam.fy=fr[1];D.go(s.cam,{z:1.07},1600,'io');await D.wait(1300)}
/* ---- the shloka screen: Lakshmi's illustration and the cream shloka panel ---- */
const SKL={l:{panel:[900,112,1720,772],lak:[450,700,1.02],lotus:[450,734,1.32],light:[800,170],diya:[1325,790],lane:1},
  p:{panel:[40,520,960,1480],med:[500,290],medR:190,light:[860,470],diya:[140,470]}};
function shlokaStage(){const s=mkScene('shloka');
  s.paintBg=function(){this.bg.innerHTML='';el('rect',{x:-4,y:-4,width:L.W+8,height:L.Ha+8,fill:Pat.u('petals',P.indigo,P.midnight,1.3)},this.bg);
    const n=Math.max(3,Math.round(L.Ha/260));for(let i=0;i<n;i++){const y=(i+.5)/n*L.Ha;for(const x of[BORDER+44,L.W-BORDER-44]){const l=lotus(this.bg,{r:30,n:5,open:.85,pad:false});tf(l.g,x,y+20,1)}}};
  const A=()=>L.portrait?SKL.p:SKL.l;s.A=A;const comp=s.comp;const lakL=grp(comp),medL=grp(comp),lightL=grp(comp),topL=grp(comp);s.topL=topL;
  const lot=bigLotus(lakL,{r:170});lot.openO=1;lot.openI=1;const lak=new Lakshmi(lakL);lakL.appendChild(lot.front);
  const med=medallion(medL,100,{bg:P.indigo});const mlak=new Lakshmi(med.pic);mlak.s=.34;mlak.y=96;
  const dy=diya(comp,{col:P.terra});dy.lit=1;s.light=mkLight(lightL);s.fx=fxLayer(s);s.lotK=0;
  s.onLayout=function(){const a=A(),pn=a.panel;const [x0,y0]=toStage(pn[0],pn[1]),[x1,y1]=toStage(pn[2],pn[3]);const e=$('shloka');const px=v=>Math.round(v*L.U)+'px';
    e.style.left=px(x0);e.style.top=px(y0);e.style.width=px(x1-x0);e.style.height=px(y1-y0);const w=(x1-x0)*L.U,h=(y1-y0)*L.U;
    const deva=clamp(Math.min(w/(L.portrait?20:19),h/(L.portrait?13:11.5)),14,40);e.style.setProperty('--deva',f1(deva)+'px');e.style.setProperty('--rom',f1(clamp(deva*.6,12,22))+'px')};
  s.tick=(dt,t)=>{const a=A();if(!L.portrait){show(lakL,true);show(medL,false);lot.x=a.lotus[0];lot.y=a.lotus[1];lot.s=a.lotus[2];lot.update(t);lak.x=a.lak[0];lak.y=a.lak[1];lak.s=a.lak[2];lak.update(dt,t)}
    else{show(lakL,false);show(medL,true);tf(med.g,a.med[0],a.med[1],a.medR/100);mlak.update(dt,t)}dy.x=a.diya[0];dy.y=a.diya[1];dy.s=LP(.62,.55);dy.update(t);s.light.update(dt,t)};
  return s}
const SK2={lines:()=>[$('ln1'),$('ln2')],ph:()=>[...document.querySelectorAll('#skLines .ph')],
  reset(){$('shloka').hidden=true;this.clear();['ln1','ln2','translit','meaning'].forEach(id=>$(id).classList.add('fade0'));$('skBadge').hidden=true;$('skIcons').hidden=true},
  clear(){this.ph().forEach(p=>p.classList.remove('on'));this.lines().forEach(l=>l.classList.remove('cur'))},
  hl(i){this.ph().forEach((p,j)=>p.classList.toggle('on',i===j||i==='both'));this.lines().forEach((l,j)=>l.classList.toggle('cur',i===j))},
  showAll(){['ln1','ln2','translit','meaning'].forEach(id=>$(id).classList.remove('fade0'));$('shloka').hidden=false}};
/* the chant player: one utterance per line, with Pause, Play and Replay. Without a Hindi voice, a timed highlight and a soft chime */
const Chant={paused:false,restart:false,waitRes:null,
  pause(){this.paused=true;Speech.stop()},play(){this.paused=false;if(this.waitRes){const r=this.waitRes;this.waitRes=null;r()}},replay(){this.restart=true;this.paused=false;Speech.stop();if(this.waitRes){const r=this.waitRes;this.waitRes=null;r()}},
  async line(i,rate){const tok=D.token;SK2.hl(i);AU.sfx('wave');Music.duck(true);try{if(D.fast)await D.wait(20);else if(canSpeak('chant'))await Promise.all([Speech.speak('chant',SHLOKA[i],null,null,rate),D.wait(800)]);else{AU.sfx('tick');await D.wait(3400)}}finally{Music.duck(false)}D.guard(tok)},
  /* play lines in order, honouring Pause and Replay */
  async run(list,rate,onLine){this.restart=false;this.paused=false;let i=0;while(i<list.length){if(this.paused){await new Promise(r=>this.waitRes=r);continue}
      onLine&&onLine(list[i]);await this.line(list[i],rate);if(this.restart){this.restart=false;i=0;continue}if(this.paused)continue;i++;await D.wait(D.fast?5:600)}}};
function chantControls(extra){const b=D.controls([{id:'bPause',cls:'alt',html:ICON.pause+'Pause',on:()=>{if(Chant.paused){Chant.play();b.bPause.innerHTML=ICON.pause+'Pause'}else{Chant.pause();b.bPause.innerHTML=ICON.play+'Play'}}},
  {id:'bReplay',cls:'alt',html:ICON.replay+'Replay',on:()=>{Chant.replay();b.bPause.innerHTML=ICON.pause+'Pause'}}].concat(extra||[]));return b}
async function shot4_2(){mood('reverent');const s=shlokaStage();D.setScene(s,1400);const light=s.light;const a=s.A();light.vis=true;light.x=a.light[0];light.y=a.light[1];light.set('still');
  SK2.reset();const pnl=$('shloka');pnl.classList.add('drawing');pnl.hidden=false;s.onLayout();$('skBadge').hidden=canSpeak('chant');
  await D.wait(400);void pnl.offsetWidth;pnl.classList.remove('drawing');await D.wait(D.fast?5:1400);
  $('ln1').classList.remove('fade0');$('ln2').classList.remove('fade0');
  /* the verse once, at learning pace, with Pause and Replay */
  chantControls();await Chant.run([0,1],.55);SK2.clear();D.clearAct();
  $('translit').classList.remove('fade0');await D.wait(D.fast?5:1600);$('meaning').classList.remove('fade0');await D.wait(D.fast?5:800);
  await sayShot('4.2meaning');
  await sayShot('4.2vocab');await D.late();
  light.set('float');await light.travel([[a.light[0]+LP(-40,-200),a.light[1]+LP(40,60)]],1200)}
/* ---- the three divine symbols ---- */
function symbolArt(parent,k){const g=grp(parent);
  if(k==='shankha'){shp(g,'M-56 30C-70 -10 -40 -64 10 -66C56 -66 76 -24 60 8C48 32 20 46 -8 48C-30 50 -48 44 -56 30Z',P.foam,4.4);
    ln(g,'M-40 20C-46 -14 -20 -46 14 -44C40 -42 48 -16 36 2C24 18 0 20 -8 6C-16 -8 -2 -22 12 -16',K,3);
    shp(g,'M-56 30L-82 52L-60 54L-44 40Z',P.foam,3.6);ln(g,'M40 -40L52 -50M50 -24L66 -28M50 -4L66 2',P.coral,3);const d=[];for(let i=0;i<6;i++)d.push(`M${-30+i*12} ${36-i*2}h.1`);ln(g,d.join(''),P.sea,5)}
  else if(k==='chakra'){const rot=grp(g);circ(rot,0,0,66,P.turmeric,4.4);circ(rot,0,0,52,'none',3,{stroke:P.verm});const sp=[];for(let i=0;i<12;i++){const a=i/12*TAU;sp.push(`M${f1(Math.cos(a)*14)} ${f1(Math.sin(a)*14)}L${f1(Math.cos(a)*50)} ${f1(Math.sin(a)*50)}`)}
    ln(rot,sp.join(''),K,4);for(let i=0;i<16;i++){const a=i/16*TAU;const p=grp(rot,{transform:`rotate(${f1(a/DEG)}) translate(0 -66)`});shp(p,'M0 -12L7 0L0 4L-7 0Z',P.verm,2)}circ(rot,0,0,16,P.verm,3.4);circ(rot,0,0,6,P.turmeric,2);g._rot=rot}
  else{const m=grp(g);shp(m,'M-8 70L-6 -8H6L8 70Z',Pat.u('chevron',P.verm,P.gold,.5),3.4);circ(m,0,74,9,P.turmeric,3);shp(m,'M-12 -6H12V6H-12Z',P.verm,3);
    circ(m,0,-40,40,P.gold,4.4);circ(m,0,-40,40,'none',0);ln(m,'M-34 -54Q0 -44 34 -54M-38 -36Q0 -26 38 -36M-30 -18Q0 -10 30 -18',P.turmeric,4);circ(m,0,-84,8,P.turmeric,3);g._lift=m}
  return g}
const SYM=[{k:'shankha',label:'Conch — Shankha'},{k:'chakra',label:'Discus — Chakra'},{k:'gada',label:'Mace — Gada'}];
function symIconSvg(k){const sv=document.createElementNS(NS,'svg');sv.setAttribute('viewBox','-90 -90 180 180');sv.setAttribute('aria-hidden','true');circ(sv,0,0,86,P.ivory,4);const g=symbolArt(sv,k);g.setAttribute('transform','scale(.85)');return sv.outerHTML}
async function shot4_3(){mood('gentle');const s=mkScene('symbols');D.setScene(s,1300);$('shloka').hidden=true;
  s.paintBg=function(){this.bg.innerHTML='';el('rect',{x:-4,y:-4,width:L.W+8,height:L.Ha+8,fill:Pat.u('flora',P.gold,P.ivory,1)},this.bg);
    const m=toStage(40,40),R=L.portrait?REF.p:REF.l,q=toStage(R.w-40,R.h-40);el('rect',{x:m[0],y:m[1],width:q[0]-m[0],height:q[1]-m[1],rx:24,fill:'none',stroke:P.verm,'stroke-width':8,'stroke-dasharray':'.1 18','stroke-linecap':'round'},this.bg);
    for(const [x,y] of[[m[0],m[1]],[q[0],m[1]],[m[0],q[1]],[q[0],q[1]]]){const f=tinyFlower(this.bg,22,P.pink);tf(f,x,y,1)}};s.relayout();
  const tok=D.token;const comp=s.comp;const lakL=grp(comp),cardL=grp(comp),lightL=grp(comp);
  const lot=bigLotus(lakL,{r:170});lot.openO=1;lot.openI=1;const lak=new Lakshmi(lakL);lakL.appendChild(lot.front);
  const light=mkLight(lightL);s.fx=fxLayer(s);s.demo=demoHand(s);
  const CP=()=>LP({lak:[230,690,.5],c:[[720,470],[1090,470],[1460,470]],w:320,h:420,horiz:0},{lak:[170,330,.3],c:[[590,560],[590,900],[590,1240]],w:640,h:300,horiz:1});
  const cards=SYM.map((sy,i)=>{const g=grp(cardL);const ring=target(g,Math.max(CP().w,CP().h)*.58);const bd=grp(g);const art=grp(g);symbolArt(art,sy.k);const lbl=grp(g);const tx=el('text',{'text-anchor':'middle','font-family':'"Baloo 2","Trebuchet MS",sans-serif','font-weight':800,'font-size':34,fill:K},lbl);tx.textContent=sy.label;
    const mark=confirmFlowerG(g);return{i,k:sy.k,g,ring,bd,art,lbl,tx,mark,open:0,seen:false,big:0,spin:0,lift:0,done:0,x:0,y:0}});
  function confirmFlowerG(p){const g=grp(p);circ(g,0,0,22,P.leaf,3);tinyFlower(g,16,P.ivory);return g}
  s.parts.push({update:(dt,t)=>{const c=CP();tf(lakL,0,0,1);lot.x=c.lak[0];lot.y=c.lak[1]+34*c.lak[2]*1.3;lot.s=c.lak[2]*1.3;lot.update(t);lak.x=c.lak[0];lak.y=c.lak[1];lak.s=c.lak[2];lak.update(dt,t);
    cards.forEach((cd,i)=>{const p=c.c[i];cd.x=p[0];cd.y=p[1];const w=c.w,h=c.h;tf(cd.g,p[0],p[1],1+.06*cd.big+(cd.seen?0:.025*Math.sin(t*TAU/2.2)*MV()));cd.bd.innerHTML='';
      el('rect',{x:-w/2,y:-h/2,width:w,height:h,rx:22,fill:P.ivory,stroke:K,'stroke-width':5},cd.bd);el('rect',{x:-w/2+10,y:-h/2+10,width:w-20,height:h-20,rx:16,fill:'none',stroke:cd.open?P.turmeric:P.gold,'stroke-width':cd.open?8:3,'stroke-dasharray':cd.open?'.1 14':'none','stroke-linecap':'round'},cd.bd);
      const ax=c.horiz?-w*.28:0,ay=c.horiz?0:-h*.12;tf(cd.art,ax,ay-cd.lift*14,c.horiz?1.2:1.45);if(cd.art.firstChild._rot)cd.art.firstChild._rot.setAttribute('transform',`rotate(${f1(cd.spin*360)})`);
      tf(cd.lbl,c.horiz?w*.18:0,c.horiz?12:h*.36,c.horiz?.95:.85);op(cd.lbl,cd.open);tf(cd.mark,w/2-18,-h/2+18,1);op(cd.mark,cd.done);
      cd.ring.on=0;cd.ring.update(t)});light.update(dt,t)}});
  light.vis=true;const c0=CP().c[0];light.x=c0[0]-LP(200,330);light.y=c0[1]-LP(190,0);
  let n=0,res;const done=new Promise(r=>res=r);
  const open=async cd=>{AU.sfx('card');D.go(cd,{big:1,open:1},400,'out');light.travel([[cd.x-LP(CP().w/2+10,CP().w/2+10),cd.y-LP(CP().h/2,0)]],600).catch(()=>{});light.sparkle();
    if(cd.k==='chakra'){cd.spin=0;D.go(cd,{spin:1},1600,'io')}if(cd.k==='gada'){(async()=>{await D.tw(cd,{lift:1},500,'out');await D.tw(cd,{lift:0},700)})().catch(()=>{})}
    if(!cd.seen){cd.seen=true;n++}D.say(SYM[cd.i].label,{noCap:true}).catch(()=>{});await D.wait(D.fast?5:900);D.go(cd,{big:0},500);if(n>=3&&s._t)Timers.add(1600,()=>s._t&&s._t.finish())};
  const hit=p=>cards.find(cd=>{const c=CP();return Math.abs(p.x-cd.x)<c.w/2&&Math.abs(p.y-cd.y)<c.h/2});
  s.down=p=>{const cd=hit(p);if(cd)open(cd).catch(()=>{});else{s.fx.burst(p.x,p.y,4,'spark');AU.sfx('sparkle')}};
  s.hots=()=>cards.map(cd=>({id:'sym'+cd.i,label:'Symbol card: tap to hear its name'+(cd.seen?'. '+SYM[cd.i].label:''),x:cd.x,y:cd.y,r:Math.min(CP().w,CP().h)/2,on:()=>open(cd).catch(()=>{})}));
  await D.ask(INS.symbols,null,'tap');
  await D.task({hint:HINT.symbols,start(t){s._t=t;if(n>=3)t.finish()},demo(){const cd=cards.find(c=>!c.seen);if(cd)s.demo.tap(cd.x,cd.y,2).catch(()=>{})},
    async assist(t){for(const cd of cards){if(!cd.seen){await open(cd);await D.wait(D.fast?5:1600)}}t.finish()}});
  s._t=null;s.down=null;s.hots=null;D.guard(tok);D.clearAct();AU.sfx('done');cards.forEach(cd=>D.go(cd,{done:1},500,'back'));Store.task('symbols');await D.wait(1600);
  /* the three cards shrink into small icons */
  cards.forEach(cd=>D.go(cd,{big:-8},900,'in'));await D.wait(900)}
async function shot4_4(){mood('gentle');const s=shlokaStage();D.setScene(s,1300);const tok=D.token,light=s.light;const a=s.A();light.vis=true;light.x=a.light[0];light.y=a.light[1];
  SK2.reset();SK2.showAll();s.onLayout();const ic=$('skIcons');ic.innerHTML=SYM.map(sy=>symIconSvg(sy.k)).join('');ic.hidden=false;$('skBadge').hidden=canSpeak('chant');
  await sayShot('4.4');
  D.instr(INS.learn,null,'ear');await D.say(INS.learn,{noCap:true});
  /* a small copy of the Light glides in a lane beneath the line being chanted (never over the letters) */
  const lane=document.createElementNS(NS,'svg');lane.setAttribute('viewBox','0 0 1000 110');lane.setAttribute('aria-hidden','true');lane.style.cssText='display:block;width:100%;height:clamp(28px,4vh,44px)';
  const ll=goldenLight(lane,{variant:'flame',glow:.4});ll.x=60;ll.y=55;ll.size=.42/goldenLightSize();s.parts.push({update:(dt,t)=>ll.update(dt,t)});
  const glide=async li=>{const host=$('ln'+(li+1));host.after(lane);ll.x=60;ll.vis=true;tw(ll,{x:940},D.fast?20:5200,'lin').catch(()=>{})};
  const musicBtn={id:'bMusic',cls:'alt',html:ICON.music,aria:'Music on or off',on:()=>{const off=Music.toggle();const e=$('bMusic');e.setAttribute('aria-pressed',String(off));e.classList.toggle('on',off)}};
  let cont=null;
  /* a repeat step: the line stays highlighted, the sound-wave shows, Replay plays it again, Continue appears after about 6 seconds */
  const repeatStep=async(li,ins)=>{D.instr(ins,null,'say');await D.say(ins,{noCap:true});SK2.hl(li);lane.remove();light.set('still');D.go(light,{tilt:12},600);
    let res;const p=new Promise(r=>res=r);const b=D.controls([{id:'bRep',cls:'alt',html:ICON.replay+'Replay',on:async()=>{if(D.skipFn)return;await Chant.line(li,.55).catch(()=>{});SK2.hl(li)}},
      {id:'bNext',cls:'lotusbtn',html:ICON.lotus+'Continue',hidden:true,on:()=>res()},musicBtn]);
    await D.wait(D.fast?20:6000);D.guard(tok);b.bNext.hidden=false;
    await D.task({idle:15,idle2:5,hint:HINT.shloka,start(t){p.then(()=>t.finish())},assist(t){t.finish()}});
    D.guard(tok);D.go(light,{tilt:0},500);light.set('float');light.sparkle();D.controls([musicBtn])};
  const hear=async li=>{D.controls([{id:'bPause',cls:'alt',html:ICON.pause+'Pause',on:()=>{const e=$('bPause');if(Chant.paused){Chant.play();e.innerHTML=ICON.pause+'Pause'}else{Chant.pause();e.innerHTML=ICON.play+'Play'}}},
    {id:'bReplay',cls:'alt',html:ICON.replay+'Replay',on:()=>Chant.replay()},musicBtn]);await Chant.run([li],.55,()=>glide(li));};
  /* Step 1 and 2: the first line */
  await hear(0);await repeatStep(0,INS.repeat);
  /* Step 3 and 4: the second line */
  D.instr(INS.learn,null,'ear');await hear(1);await repeatStep(1,INS.try);
  /* Step 5: the whole shloka at the child-friendly pace, then the illustration again; it can be replayed */
  D.instr(INS.learn,null,'together');lane.remove();chantControls([musicBtn]);await Chant.run([0,1],.7);SK2.clear();
  const lt=lotus(s.topL,{r:40,n:7,open:.95});const lp=LP([1660,110],[900,560]);tf(lt.g,lp[0],lp[1],1);light.sparkle();AU.sfx('done');
  let res;const p=new Promise(r=>res=r);
  D.controls([{id:'bAll',cls:'alt',html:ICON.replay+'Replay',on:async()=>{if(D.skipFn)return;await Chant.run([0,1],.7).catch(()=>{});SK2.clear()}},{id:'bNext',cls:'lotusbtn',html:ICON.lotus+'Continue',on:()=>res()},musicBtn]);
  await D.task({idle:15,idle2:5,hint:HINT.shloka,start(t){p.then(()=>t.finish())},assist(t){t.finish()}});
  D.guard(tok);Store.task('shloka');D.clearAct();if(Music.off)Music.toggle();await D.late()}
async function shot4_5(){mood('warm');$('shloka').hidden=true;const s=homeStage({view:'puja',state:DONE_STATE,tod:'evening'});s.H.lit=1;s.H.pujaLit=1;D.setScene(s,1500);rowDiyas(s.H,7);const F=s.F,light=s.light;
  placeP(F.gran,[640,808,.92],[330,1345,.74],true);placeP(F.girl,[430,815,.9],[140,1360,.64],true);placeP(F.boy,[1220,815,.9],[700,1360,.64],true);F.mother.vis=false;F.father.vis=false;
  for(const k of['gran','girl','boy'])F[k].set('namaste');
  const plate=grp(s.propL);sweetsPlate(plate);const pp=()=>LP([1550,752],[860,1440]);const fd=diya(s.propL,{col:P.terra});fd.lit=1;
  s.parts.push({update:(dt,t)=>{const p=pp();tf(plate,p[0],p[1],LP(1.1,.85));fd.x=p[0]-LP(170,120);fd.y=p[1]+10;fd.s=LP(.62,.5);fd.update(t)}});
  const fr=s.toHome(321,-230);light.vis=true;light.x=fr[0]+LP(230,190);light.y=fr[1]-LP(190,230);
  await D.wait(900);
  const go=()=>{const p=pp();D.go(light,{look:1},700);light.travel([[p[0]-LP(120,80),p[1]-LP(260,240)]],3600,'io').catch(()=>{});s.cam.fx=p[0];s.cam.fy=p[1]-LP(100,120);D.go(s.cam,{z:1.07},3600,'io')};
  await sayShot('4.5',{cues:[['What could it be',go]]});await D.wait(1800);await D.late()}
async function shot4_6(){mood('curious');const s=mkScene('sweets');
  /* the home as a simplified, low-pattern flat background (no blur) */
  s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha;el('rect',{x:-4,y:-4,width:W+8,height:H+8,fill:P.ivory},this.bg);const c=toStage(LP(889,500),LP(560,700));
    shp(this.bg,`M${f1(c[0]-LP(260,200))} ${f1(H)}V${f1(c[1]-LP(120,120))}Q${f1(c[0]-LP(260,200))} ${f1(c[1]-LP(380,360))} ${f1(c[0])} ${f1(c[1]-LP(420,400))}Q${f1(c[0]+LP(260,200))} ${f1(c[1]-LP(380,360))} ${f1(c[0]+LP(260,200))} ${f1(c[1]-LP(120,120))}V${f1(H)}Z`,P.gold,4);
    const fy=toStage(0,LP(560,1050))[1];shp(this.bg,`M-4 ${f1(fy)}H${W+4}V${H+4}H-4Z`,P.terra,4)};
  D.setScene(s,1500);const comp=s.comp;const backL=grp(comp),plateL=grp(comp),lightL=grp(comp);
  const dy=diya(backL,{col:P.terra});dy.lit=1;const pl=grp(plateL);sweetsPlate(pl);const fl=tinyFlower(plateL,30,P.pink);const light=mkLight(lightL);light.size=1.3;s.fx=fxLayer(s);
  s.parts.push({update:(dt,t)=>{const p=LP([889,640],[500,1180]);dy.x=LP(1320,780);dy.y=LP(470,900);dy.s=LP(1,.9)*(1+.04*Math.sin(t*TAU/1.6)*MV());dy.update(t);tf(pl,p[0],p[1],LP(3,2.6));tf(fl,p[0]-LP(300,250),p[1]+LP(20,80),1);light.update(dt,t)}});
  light.vis=true;light.x=LP(200,120);light.y=LP(150,300);
  await D.wait(D.fast?5:1500);
  /* the diya flickers, then the Light moves toward the sweets, pauses above them and leans in curiously */
  const p=LP([889,640],[500,1180]);await light.travel([[LP(560,300),LP(260,560)],[p[0],p[1]-LP(250,300)]],3600,'io');
  await D.wait(600);D.go(light,{tilt:22},900,'out');await D.wait(900);light.sparkle();s.fx.burst(p[0],p[1]-60,6,'spark');
  await D.wait(D.fast?5:4000);await D.late();
  Store.finish();D.setScene(restStage(),1600);await D.wait(D.fast?5:1400);$('rest').hidden=false}
function restStage(){const s=mkScene('rest');s.paintBg=function(){this.bg.innerHTML='';el('rect',{x:-4,y:-4,width:L.W+8,height:L.Ha+8,fill:Pat.u('stars',P.turmeric,P.midnight,1.2)},this.bg)};
  const g=grp(s.comp);const pl=grp(g);sweetsPlate(pl);const light=mkLight(s.comp);
  s.tick=(dt,t)=>{const c=L.portrait?[500,1250]:[889,700];tf(pl,c[0],c[1],1.3);light.x=c[0]+LP(150,140);light.y=c[1]-LP(110,120);light.update(dt,t)};return s}
