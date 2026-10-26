/* ================= EPISODE 5: THE OCEAN REVEALS ITS TREASURES ================= */
/* a lotus-shaped window: pointed top, rounded base, petal doors that part to reveal what is inside */
function panelD(w,h){return`M0 ${-h/2}C${w*.2} ${-h*.36} ${w/2} ${-h*.24} ${w/2} ${h*.1}C${w/2} ${h*.36} ${w*.3} ${h/2} 0 ${h/2}C${-w*.3} ${h/2} ${-w/2} ${h*.36} ${-w/2} ${h*.1}C${-w/2} ${-h*.24} ${-w*.2} ${-h*.36} 0 ${-h/2}Z`}
function lotusPanel(parent,o){const w=o.w||290,h=o.h||300;const g=grp(parent);const d=panelD(w,h);
  shp(g,d,o.bg||P.indigo,0);const cl=clipIn(g,d);const inner=grp(g,{'clip-path':cl});
  el('rect',{x:-w,y:-h,width:w*2,height:h*2,fill:Pat.u('stars',P.turmeric,o.bg||P.indigo,.8)},inner);
  const wave=grp(inner);shp(wave,`M${-w} ${h*.32}Q${-w*.75} ${h*.22} ${-w/2} ${h*.32}T0 ${h*.32}T${w/2} ${h*.32}T${w} ${h*.32}V${h}H${-w}Z`,Pat.u('wave',P.foam,P.turq,.6),3);
  const ghost=grp(inner),full=grp(inner);const doors=grp(inner);
  const door=sd=>{const dg=grp(doors);const dd=sd<0?`M0 ${-h/2}C${-w*.2} ${-h*.36} ${-w/2} ${-h*.24} ${-w/2} ${h*.1}C${-w/2} ${h*.36} ${-w*.3} ${h/2} 0 ${h/2}Z`:`M0 ${-h/2}C${w*.2} ${-h*.36} ${w/2} ${-h*.24} ${w/2} ${h*.1}C${w/2} ${h*.36} ${w*.3} ${h/2} 0 ${h/2}Z`;
    shp(dg,dd,Pat.u('petals',P.pink,P.coral,.9),3.4);ln(dg,sd<0?`M-4 ${-h*.44}C${-w*.2} ${-h*.2} ${-w*.26} ${h*.2} -4 ${h*.46}`:`M4 ${-h*.44}C${w*.2} ${-h*.2} ${w*.26} ${h*.2} 4 ${h*.46}`,P.ivory,3.4);return dg};
  const dl=door(-1),dr=door(1);
  shp(g,d,'none',14,{stroke:K});shp(g,d,'none',9,{stroke:P.gold});ln(g,d,P.turmeric,4,{'stroke-dasharray':'.1 13'});
  const tip=grp(g,{transform:`translate(0 ${-h/2-6})`});shp(tip,'M0 -22C-8 -14 -8 -4 0 0C8 -4 8 -14 0 -22Z',P.turmeric,2.6);
  const T_={g,ghost,full,inner,w,h,open:0,reveal:0,x:0,y:0,s:1,rise:0,update(){tf(this.g,this.x,this.y+(1-this.rise)*60,this.s*(.7+.3*this.rise));op(this.g,clamp(this.rise*1.4,0,1));
    const k=this.open;tf(dl,-k*w*.62,0,1,0,1-.25*k,1);tf(dr,k*w*.62,0,1,0,1-.25*k,1);op(this.ghost,1-this.reveal);op(this.full,this.reveal)}};return T_}
/* each treasure is drawn twice: as a pale golden outline (peeking) and in full colour */
function treasurePanel(parent,key,o){const p=lotusPanel(parent,o);let objF,objG;const mk=(par,ghost)=>{INK.ghost=ghost;let r;try{
    if(key==='cow'){r=kamadhenu(par);tf(r.g,-6,o.h*.24,1.05)}else if(key==='horse'){r=horse(par);tf(r.g,-8,o.h*.28,1.05)}
    else if(key==='elephant'){r=airavata(par);tf(r.g,-14,o.h*.3,.95)}else if(key==='jewels'){r=jewels(par);tf(r.g,0,o.h*.22,1.3)}
    else if(key==='tree'){r=kalpavriksha(par);tf(r.g,0,o.h*.42,1.05)}else if(key==='lakshmi'){const lt=lotus(par,{r:70,n:9,open:1});tf(lt.g,0,o.h*.4,1);r=new Deity('lakshmi',par,{pose:'lotus'});r.x=0;r.y=o.h*.38;r.s=.54;r.update(0,0)}
    }finally{INK.ghost=false}return r};
  objG=mk(p.ghost,true);objF=mk(p.full,false);p.obj=objF;p.objG=objG;p.key=key;
  const up=p.update.bind(p);p.update=(dt,t)=>{up();if(objF&&objF.update)objF.update(dt||0,t||0);if(objG&&objG.update&&key!=='lakshmi')objG.update(dt||0,t||0)};return p}

/* a small churning picture inside a round medallion: the mountain keeps turning gently */
function miniChurn(parent){const m=medallion(parent,110,{bg:P.sea});const g=grp(m.pic);
  shp(g,'M-120 30Q-100 22 -80 30T-40 30T0 30T40 30T80 30T120 30V120H-120Z',Pat.u('wave',P.foam,P.indigo,.5),3);
  const sc=grp(g,{transform:'scale(.24)'});const kg=grp(sc);const k=kurma(kg);tf(kg,0,233,1);const b=grp(sc);const mg=grp(sc);const M=mandara(mg);tf(mg,0,125,1);const f=grp(sc),h=grp(sc);const V=vasuki(b,f,h);op(h,0);
  const list=[];for(let i=0;i<=90;i++){const u=i/90,v=lerp(.15,.62,u),th=-Math.PI/2+u*2.5*TAU;const R=MANDARA.hw(v)+18;list.push([R*Math.sin(th),125-v*MANDARA.H+Math.cos(th)*16,Math.cos(th)])}
  return{g:m.g,x:0,y:0,s:1,rot:0,update(dt,t){tf(this.g,this.x,this.y,this.s);op(this.g,this.s>.02?1:0);this.rot+=(dt||0)*24;M.rot=this.rot;M.update();k.update(t||0);V.flow=this.rot*2;V.draw(list,{})}}}

const GAL={keys:['cow','horse','elephant','jewels','tree','lakshmi'],
  bg:{cow:P.sea,horse:P.indigo,elephant:P.turq,jewels:P.indigo,tree:P.ivory,lakshmi:P.indigo},
  L:{pos:[[250,292],[590,292],[1188,292],[1528,292],[520,622],[1258,622]],w:290,h:310,med:[889,150],lotus:[889,660],dev:[[70,790],[150,790],[230,790]],as:[[1548,790],[1628,790],[1708,790]],fs:.44},
  P:{pos:[[262,370],[738,370],[262,730],[738,730],[262,1090],[738,1090]],w:330,h:330,med:[500,120],lotus:[500,1340],dev:[[70,1490],[150,1490],[230,1490]],as:[[770,1490],[850,1490],[930,1490]],fs:.4}};
function galleryScene(){const s=mkScene('gallery',{frame:'gold'});oceanBg(s,{mood:'wonder',seed:41,horizon:()=>LP(150,230),clouds:[[.08,.4,LP(160,120)],[.93,.35,LP(170,120)]]});
  const comp=s.comp;const medL=grp(comp);const panL=grp(comp);const lotL=grp(comp);const figL=grp(comp);
  const mc=miniChurn(medL);s.parts.push(mc);s.mc=mc;
  s.panels={};GAL.keys.forEach(k=>{const p=treasurePanel(panL,k,{w:290,h:310,bg:GAL.bg[k]});s.panels[k]=p;s.parts.push(p)});
  const cen=lotus(lotL,{r:100,n:9,open:0});const cg=grp(lotL);rings(cg,140,{n:3,step:.2,w:5});lotL.insertBefore(cg,lotL.firstChild);s.cen=cen;s.cenG=cg;
  const devas=[0,1,2].map(i=>new Fig('deva',i,figL)),asuras=[0,1,2].map(i=>new Fig('asura',i+2,figL));s.cast.devas=devas;s.cast.asuras=asuras;
  s.st={glow:0,lot:1};
  s.onLayout=function(){const A=L.portrait?GAL.P:GAL.L;s.A=A;mc.x=A.med[0];mc.y=A.med[1];mc.s=L.portrait?.9:.92;
    GAL.keys.forEach((k,i)=>{const p=s.panels[k];p.x=A.pos[i][0];p.y=A.pos[i][1];p.s=A.w/290});
    devas.forEach((f,i)=>{f.x=A.dev[i][0];f.y=A.dev[i][1];f.s=A.fs;f.f=1});asuras.forEach((f,i)=>{f.x=A.as[i][0];f.y=A.as[i][1];f.s=A.fs;f.f=-1})};
  s.tick=function(dt,t){const A=s.A;tf(cen.g,A.lotus[0],A.lotus[1],(L.portrait?1.3:1.4)*s.st.lot);tf(cg,A.lotus[0],A.lotus[1]-30,.6+.4*s.st.glow+.03*Math.sin(t*1.2)*s.st.glow);op(cg,s.st.glow);
    devas.concat(asuras).forEach(f=>f.update(dt,t))};
  s.fx=fxLayer(s);s.demo=demoHand(s);return s}

async function shot5_1(){await titleCard(5,'The Ocean Reveals Its Treasures');D.chip('Episode 5 · The Gallery of Wonders');Music.mood('wonder');D.setMood({});
  const s=churnScene({mood:'wonder',frame:'gold'});const C=s.C;C.ringK=1;D.setScene(s,1200);churnMotor(s);groupSet(C.devas,'idle');groupSet(C.asuras,'idle');C.hold.d=0;C.hold.a=0;C.sag=1;
  await D.wait(600);
  await D.say('The devas and asuras returned to their places.',{cues:[['returned',()=>{groupSet(C.devas,'pull');groupSet(C.asuras,'pull')}]]});
  await D.say('They held Vasuki once more.',{cues:[['held',()=>{D.go(C.hold,{d:1,a:1},900);D.go(C,{sag:0},900)}]]});
  const M=s.motor;M.base=C.flow;M.rbase=C.rot;
  await D.say('Mount Mandara turned.',{cues:[['turned',()=>D.go(M,{speed:.7},1000)]]});
  await D.say('The ocean swirled.',{cues:[['swirled',()=>D.go(s,{swell:.4},1000)]]});
  /* the churning shrinks into a small round medallion as the treasure gallery fills the frame */
  const g=galleryScene();GAL.keys.forEach(k=>{g.panels[k].rise=0});
  const sh={k:1};s.parts.push({update:()=>{const A=C.A;const tgt=(L.portrait?GAL.P:GAL.L).med;const [mx,my]=toStage(A.mx,A.my-200);const [tx,ty]=toStage(tgt[0],tgt[1]);
    const k=sh.k;s.camG.setAttribute('transform',`translate(${f1(lerp(tx,mx,k))} ${f1(lerp(ty,my,k))}) scale(${f3(lerp(.16,1,k))}) translate(${f1(-mx)} ${f1(-my)})`)}});
  const fade=D.say('And slowly, one extraordinary wonder after another began to appear.',{cues:[['slowly',()=>{D.go(sh,{k:0},1600,'io');Timers.add(700,()=>D.setScene(g,1100))}]]});
  await fade;
  const P_=g.panels;const rise=k=>{AU.sfx('sparkle');D.go(P_[k],{rise:1},1100,'back')};const peek=k=>{rise(k);Timers.add(700,()=>D.go(P_[k],{open:.42},1200))};
  const full=k=>{rise(k);Timers.add(700,()=>{D.go(P_[k],{open:1},1300);D.go(P_[k],{reveal:1},1300);AU.sfx('chime')})};
  await D.say('First came Kamadhenu, the divine wish-fulfilling cow, associated with abundance and generosity.',{cues:[['Kamadhenu',()=>peek('cow')]]});
  await D.say('Then came a magnificent celestial horse, shining with extraordinary beauty.',{cues:[['celestial horse',()=>full('horse')]]});
  await D.say('Next, a majestic white elephant named Airavata emerged from the ocean.',{cues:[['white elephant',()=>peek('elephant')]]});
  await D.say('Its magnificent form gleamed against the waves.');
  await D.say('Precious jewels glimmered in the sunlight.',{cues:[['jewels',()=>full('jewels')]]});
  await D.say('A divine tree, known as Kalpavriksha, appeared, its branches filled with heavenly blossoms.',{cues:[['Kalpavriksha',()=>peek('tree')]]});
  await D.say("And then, amid the ocean's shining waves, Goddess Lakshmi appeared in divine splendour.",{cues:[['Goddess Lakshmi',()=>peek('lakshmi')]]});
  await D.say('Her presence brought thoughts of prosperity, fortune, and abundance.');
  await D.say('The devas watched in amazement.',{cues:[['devas',()=>g.cast.devas.forEach(f=>f.set('amazed'))]]});
  await D.say('The asuras looked upon the extraordinary treasures.',{cues:[['asuras',()=>g.cast.asuras.forEach(f=>f.set('amazed'))]]});
  await D.say('The ocean was full of wonders!');
  await D.say('One beautiful gift after another had emerged from its depths.');
  await D.say('But the great churning was not yet finished.');
  await D.say('There was still one very special gift waiting to appear.',{cues:[['special gift',()=>D.go(g.st,{glow:.5},1500)]]});
  await D.say("A gift that would remind the world why health is one of life's greatest treasures.");await D.late()}

async function shot5_2(){D.chip('Episode 5 · Reveal the Hidden Treasures');let s=D.scene;if(!s||s.id!=='gallery'){s=galleryScene();D.setScene(s);GAL.keys.forEach(k=>{const p=s.panels[k];p.rise=1;if(k==='horse'||k==='jewels'){p.open=1;p.reveal=1}else p.open=.42})}
  const tok=D.token;const Pn=s.panels;const A=()=>s.A;const pos=k=>A().pos[GAL.keys.indexOf(k)];const sc=()=>A().w/290;
  const tg=target(s.top,LP(170,190));s.parts.push({update:t=>tg.update(t)});const focus=k=>{const p=pos(k);tg.x=p[0];tg.y=p[1];D.go(tg,{on:1},500)};
  const reveal=async k=>{AU.sfx('chime');D.go(Pn[k],{open:1},1100);await D.tw(Pn[k],{reveal:1},1100);D.go(tg,{on:0},400)};
  await D.say('Ocean Explorers, look carefully!');
  await D.say('The ocean has hidden some of its wonderful treasures behind magical lotus flowers.');
  await D.say('Can you help us reveal them?');
  /* ---- Kamadhenu: offer a flower ---- */
  await D.say('First, let us welcome Kamadhenu!');focus('cow');
  {const fl=grp(s.top);marigold(fl,26,P.turmeric);const tray=grp(s.top);shp(tray,'M-50 0Q0 26 50 0Z',P.terra,3.4);s.top.insertBefore(tray,fl);
    const fo={x:0,y:0,home:true};const home=()=>{const p=pos('cow');return LP([p[0]+40,p[1]+215],[500,p[1]+10])};
    s.parts.push({update:t=>{const h=home();if(fo.home){fo.x=h[0];fo.y=h[1]-14}tf(fl,fo.x,fo.y,1.2,t*10);tf(tray,h[0],h[1],1);op(fl,fo.gone?0:1);op(tray,fo.gone?0:1)}});
    const fT=target(s.top,46);s.parts.push({update:t=>{fT.x=fo.x;fT.y=fo.y;fT.on=fo.gone?0:1;fT.update(t)}});
    let done=false;const give=async()=>{if(done)return;done=true;fo.home=false;const p=pos('cow');await D.tw(fo,{x:p[0]+30*sc(),y:p[1]},600,'out');fo.gone=true;s.fx.burst(p[0],p[1],6,'petal',TAU);
      await reveal('cow');AU.sfx('cow');Pn.cow.obj.nod=0;await D.tw(Pn.cow.obj,{nod:1},450);await D.tw(Pn.cow.obj,{nod:0},500);s._t&&s._t.finish()};
    let drag=false;s.down=p=>{if(Math.hypot(p.x-fo.x,p.y-fo.y)<80){drag=true;fo.home=false}};s.move=p=>{if(drag){fo.x=p.x;fo.y=p.y;const c=pos('cow');if(Math.hypot(p.x-c[0],p.y-c[1])<120*sc())give()}};
    s.up=()=>{if(drag&&!done){const c=pos('cow');if(Math.hypot(fo.x-c[0],fo.y-c[1])<220*sc())give();else fo.home=true}drag=false};
    s.hots=()=>done?[]:[{id:'flower',label:'Flower: press to offer it to Kamadhenu',x:fo.x,y:fo.y,r:60,on:give}];Hot.dirty=true;
    D.instr('Drag the flower to Kamadhenu.','','drag');
    await D.say('Make a gentle cow sound and pretend to offer her a flower.');
    await D.task({hint:'Drag a flower to Kamadhenu.',start(t){s._t=t;if(done)t.finish()},demo(){const c=pos('cow');s.demo.drag([[fo.x,fo.y],[c[0],c[1]]],1300)},async assist(t){await give();t.finish()}});
    s._t=null;s.down=s.move=s.up=null;s.hots=null;D.clearAct();fl.remove();tray.remove()}
  await D.say('Wonderful!');
  /* ---- Airavata: a swoosh up from the trunk ---- */
  await D.say('Now, let us welcome Airavata!');focus('elephant');
  {let done=false,y0=null;const base=()=>{const p=pos('elephant');return[p[0]+90*sc(),p[1]+95*sc()]};const tT=target(s.top,40);const st={on:1};
    s.parts.push({update:t=>{const b=base();tT.x=b[0];tT.y=b[1];tT.on=st.on;tT.update(t)}});
    const swoosh=async()=>{if(done)return;done=true;st.on=0;await reveal('elephant');AU.sfx('elephant');await D.tw(Pn.elephant.obj,{curl:1},900,'out');const b=base();s.fx.burst(b[0]+30,b[1]-150*sc(),9,'petal',2);await D.wait(700);s._t&&s._t.finish()};
    s.down=p=>{const b=base();if(Math.hypot(p.x-b[0],p.y-b[1])<120)y0=p.y};s.move=p=>{if(y0!=null&&y0-p.y>70)swoosh()};s.up=()=>{if(y0!=null&&!done)swoosh();y0=null};
    s.camHand=h=>{if(h.p.y<LP(300,500)&&h.open)swoosh()};
    s.hots=()=>done?[]:[{id:'trunk',label:'Airavata’s trunk: press to raise it',x:base()[0],y:base()[1],r:60,on:swoosh}];Hot.dirty=true;
    D.instr('Swoosh upward from the elephant’s trunk.','','up');
    await D.say("Raise one arm and move it like an elephant's trunk.");
    await D.task({hint:'Swoosh up from the trunk!',start(t){s._t=t;if(done)t.finish()},demo(){const b=base();s.demo.drag([b,[b[0]+40,b[1]-150]],1100)},async assist(t){await swoosh();t.finish()}});
    s._t=null;s.down=s.move=s.up=s.camHand=null;s.hots=null;D.clearAct()}
  await D.say('Splendid!');
  /* ---- Kalpavriksha: drag the seed up and the tree grows ---- */
  await D.say('Next, let us help Kalpavriksha grow!');focus('tree');Pn.tree.obj.grow=0;
  {let done=false,drag=null;await reveal('tree');Pn.tree.obj.grow=.04;
    const seedP=()=>{const p=pos('tree');return[p[0],p[1]+120*sc()-Pn.tree.obj.grow*220*sc()]};const sd=grp(s.top);shp(sd,'M0 -16C-12 -8 -12 8 0 14C12 8 12 -8 0 -16Z',P.ochre,3);ln(sd,'M0 -10V8',K,1.6);
    const sT=target(s.top,44);s.parts.push({update:t=>{const q=seedP();tf(sd,q[0],q[1],1.2);op(sd,done?0:1);sT.x=q[0];sT.y=q[1];sT.on=done?0:1;sT.update(t)}});
    const grow=v=>{const g=clamp(v,0,1);if(g>Pn.tree.obj.grow){Pn.tree.obj.grow=g;if(Math.random()<.2)AU.sfx('sparkle')}if(g>=.98&&!done){done=true;AU.sfx('success');const p=pos('tree');s.fx.burst(p[0],p[1]-100*sc(),9,'spark',TAU);Timers.add(900,()=>s._t&&s._t.finish())}};
    s.down=p=>{const q=seedP();if(Math.hypot(p.x-q[0],p.y-q[1])<110)drag={y0:p.y,g0:Pn.tree.obj.grow}};s.move=p=>{if(drag)grow(drag.g0+(drag.y0-p.y)/(240*sc()))};
    s.up=()=>{if(drag&&!done&&Pn.tree.obj.grow>.15)D.tw(Pn.tree.obj,{grow:1},900).then(()=>grow(1)).catch(()=>{});drag=null};
    s.camHand=h=>{const p=pos('tree');grow((p[1]+150*sc()-h.p.y)/(360*sc()))};
    s.hots=()=>done?[]:[{id:'seed',label:'Seed: press to help the tree grow',x:seedP()[0],y:seedP()[1],r:60,on:()=>grow(Pn.tree.obj.grow+.34)}];Hot.dirty=true;
    D.instr('Drag the seed upward to grow the tree.','','up');
    const sp=D.say('Stretch your arms upwards like a tiny seed growing into a mighty tree.').then(()=>D.say('Higher and higher!'));
    await D.task({hint:'Drag the seed up to grow!',start(t){s._t=t;if(done)t.finish()},demo(){const q=seedP();s.demo.drag([q,[q[0],q[1]-200]],1300)},async assist(t){await D.tw(Pn.tree.obj,{grow:1},1500);grow(1);await D.wait(900);t.finish()}});
    await sp;s._t=null;s.down=s.move=s.up=s.camHand=null;s.hots=null;D.clearAct();sd.remove()}
  /* ---- Lakshmi: part the lotus petals ---- */
  await D.say('And finally, let us welcome Goddess Lakshmi.');focus('lakshmi');
  {let done=false,x0=null;const open=async()=>{if(done)return;done=true;await reveal('lakshmi');AU.sfx('swell');const p=pos('lakshmi');s.fx.burst(p[0],p[1],10,'petal',TAU);s._t&&s._t.finish()};
    s.down=p=>{const c=pos('lakshmi');if(Math.hypot(p.x-c[0],p.y-c[1])<170*sc())x0=p.x};s.move=p=>{if(x0!=null){const k=clamp(.42+Math.abs(p.x-x0)/(150*sc())*.58,.42,1);Pn.lakshmi.open=k;if(k>.85)open()}};
    s.up=()=>{if(x0!=null&&!done)open();x0=null};s.camHand=h=>{if(Cam.hands.length===2&&Cam.hands.every(x=>x.open))open()};
    s.hots=()=>done?[]:[{id:'lakshmi',label:'Lotus petals: press to open them',x:pos('lakshmi')[0],y:pos('lakshmi')[1],r:120,on:open}];Hot.dirty=true;
    D.instr('Tap the lotus, or pull its petals apart.','','join');
    await D.say('Bring your hands together and gently open them into the shape of a lotus flower.');
    await D.task({hint:'Tap the lotus petals to open.',start(t){s._t=t;if(done)t.finish()},demo(){const c=pos('lakshmi');s.demo.tap(c[0],c[1],2)},async assist(t){await open();t.finish()}});
    s._t=null;s.down=s.move=s.up=s.camHand=null;s.hots=null;D.clearAct()}
  D.guard(tok);Badge.gain(4);
  s.cast.devas.forEach(f=>f.set('relieved'));s.cast.asuras.forEach(f=>f.set('relieved'));
  await D.say('Look at all the treasures you have helped reveal!');
  await D.say('The divine cow, the celestial elephant, the wish-fulfilling tree, and Goddess Lakshmi.');
  await D.say('The ocean has shared so many wonders.');
  await D.say('But something is still missing.');
  await D.say('The waves are glowing brighter.',{cues:[['glowing',()=>D.go(s.st,{glow:.8},1500)]]});
  await D.say('A golden light is appearing at the centre of the ocean.',{cues:[['golden light',()=>{D.go(s.st,{glow:1},1500);AU.sfx('chime')}]]});
  await D.say('One final lotus remains closed.');
  s.cast.devas.forEach(f=>f.set('gaze'));s.cast.asuras.forEach(f=>f.set('gaze'));
  await D.say('Who could be coming?');
  await D.say('Let us watch carefully.');await D.late();
  /* transition: the treasure windows slide to the edges and close, the central lotus glows */
  GAL.keys.forEach((k,i)=>{const p=Pn[k];const sd=pos(k)[0]<(L.portrait?500:889)?-1:1;D.go(p,{open:0},900);Timers.add(500,()=>D.go(p,{x:p.x+sd*LP(700,600)},1200,'in'))});
  D.go(s.mc,{s:0},1200);AU.sfx('swish');await D.tw(s.st,{lot:1.25},1800,'io')}
