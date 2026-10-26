/* ================= EPISODE 1: THE HORSE THAT SPOKE ================= */
function paintEntrance(g,w,h,A){const gy=A.gy,P=A.pal;paintSky(g,0,0,w,gy+4,'morning');
  paintHills(g,0,gy-h*.2,w,h*.2,[C.leaf,ca(C.leaf,.7),C.terra],5);
  [[.05,0],[.13,1],[.9,0],[.97,1]].forEach(([u,k])=>motifTree(g,w*u,gy+6,L.portrait?1.2:1.05,k));
  paintGround(g,0,gy,w,h-gy,false);
  R.poly(g,[[P.door.x-10,gy],[P.door.x+P.door.w+10,gy],[P.door.x+P.door.w+90,h],[P.door.x-90,h]],ca(C.ivory,.7),{sw:2});
  paintPalace(g,P);
  [[P.door.x-P.door.w*.7,gy+30],[P.door.x+P.door.w*1.7,gy+30],[P.x+P.w*.06,gy+40]].forEach(([x,y])=>withT(g,x,y,1.1,1,c=>drawBasket(c,3,0)));
  const r=rng(21);for(let i=0;i<26;i++)motifMarigold(g,r()*w,gy+20+r()*(h-gy-40),5+r()*4)}
function entranceScene(){return mk({id:'entrance',drift:0,ripple:0,P:petals(24,3),
  layout(){const W=L.W,H=L.H,P=L.portrait,Ww=W*1.14,gy=H*(P?.66:.78);const pw=P?W*.86:Math.min(W*.58,H*1.25),ph=P?pw*.62:H*.42;
    const pal=palaceGeo(Ww/2-pw/2,gy-ph,pw,ph);const cy=P?H*.8:gy+42;
    return{Ww,gy,pal,c0:{x:-140,y:cy,s:L.cs},c1:{x:Ww-W+W*(P?.24:.12),y:cy,s:L.cs}}},
  draw(ctx){const A=this.anch(),W=L.W,H=L.H;ctx.save();ctx.translate(-this.drift*(A.Ww-W),0);
    Bake.draw(ctx,'entr',0,0,A.Ww,H,(g,w,h)=>paintEntrance(g,w,h,A));
    drawHorsePanel(ctx,A.pal.horsePanel,T.sec,this.ripple);this.drawActors(ctx);ctx.restore();
    drawPetals(ctx,this.P,0,0,W,H);drawBorder(ctx,false)}})}

/* ---------- palace hallway with the mural ---------- */
function hallGeo(){const W=L.W,H=L.H,P=L.portrait;const m=P?{x:W*.09,y:H*.1,w:W*.82,h:H*.3}:{x:W*.36,y:H*.09,w:W*.54,h:H*.45};
  const hs=Math.min(m.h*.0026,m.w/(4*195));const slot=u=>({x:m.x+m.w*u,y:m.y+m.h*.86,s:hs});
  const fy=H*(P?.78:.85);return{m,hs,slots:[slot(.13),slot(.37),slot(.62),slot(.87)],fy,
    c:{x:P?W*.27:W*.19,y:fy,s:L.cs},cIn:{x:-120,y:fy,s:L.cs},land:{x:P?W*.72:W*.45,y:fy,s:L.cs*.95,f:-1},
    flower:{x:P?W*.6:W*.62,y:fy-6,s:L.cs*.95,f:-1},old:{x:P?W*.38:W*.36,y:fy,s:L.cs*.95,f:-1},cOld:{x:P?W*.17:W*.16,y:fy,s:L.cs}}}
function paintHall(g,W,H,A){paintInteriorWall(g,0,0,W,H,{});const m=A.m;
  const ps=L.portrait?[[W*.02,W*.07]]:[[W*.04,W*.05],[W*.29,W*.035]];ps.forEach(([x,w])=>paintPillar(g,x,H*.06,w,A.fy-H*.06,false));
  if(!L.portrait)paintPillar(g,W*.93,H*.06,W*.04,A.fy-H*.06,false);
  paintMuralPanel(g,m,[]);const sl=A.slots;
  motifHorse(g,sl[0].x,sl[0].y,A.hs*1.25,ca(C.ivory,.75),ca(C.indigo,.6),1);for(let i=0;i<5;i++)strokeL(g,[[sl[0].x-60+i*25,m.y+m.h*.3+i*12],[sl[0].x-45+i*25,m.y+m.h*.36+i*12]],ca(C.brown,.4),2);
  motifHorse(g,sl[1].x,sl[1].y,A.hs*1.25,C.ivory,C.verm,1);motifHorse(g,sl[3].x,sl[3].y,A.hs*1.25,C.mustard,C.indigo,-1);
  motifSun(g,m.x+m.w*.5,m.y+m.h*.2,m.h*.06,C.mustard);
  [A.flower,{x:L.portrait?W*.9:W*.84,y:A.fy+40},{x:L.portrait?W*.1:W*.08,y:A.fy+50}].forEach(f=>{motifFlower(g,f.x,f.y+12,34,C.mustard,C.verm)})}
function hallScene(){const s=mk({id:'hall',ghost:0,ring:0,flash:0,layout(){return hallGeo()},
  draw(ctx){const A=this.anch(),W=L.W,H=L.H;ctx.save();camT(ctx,this.cam);
    Bake.draw(ctx,'hall',0,0,W,H,(g,w,h)=>paintHall(g,w,h,A),1.4);
    if(this.ghost>0)drawBijliGhost(ctx,A.slots[2].x,A.slots[2].y,A.hs,this.ghost);
    this.drawActors(ctx);
    const b=this.cast.bijli;if(this.ring>0&&b){for(let k=0;k<3;k++){const rr=40+(this.ring+k*.25)%1*140;ring(ctx,b.x,b.y-80*b.s,rr,ca(C.ivory,(1-((this.ring+k*.25)%1))*.8),5)}}
    ctx.restore();drawBorder(ctx,false)}});
  return s}
function hallSetup(out){const s=hallScene();const c=s.add('chiku',new Actor('chiku',0,0,1,1,'carry'),'c');c.extra.basket=true;
  const b=s.add('bijli',new Actor('bijli',0,0,1,-1,'idle'),out?'land':null);if(!out){put(b,s.anch().slots[2]);b.f=-1;b.mark=null;b.free=true}else s.ghost=1;b.z=out?0:-1;return s}

/* ---------- 1.1 ---------- */
async function shot1_1(){await titleCard(1,'The Horse That Spoke',false);D.chip('Episode 1 · The Horse That Spoke');Music.mood('day');
  const s=entranceScene();D.setScene(s,'wipe');const c=s.add('chiku',new Actor('chiku',0,0,1,1,'walk'),'c0');c.extra.basket=true;
  D.tw(s,{drift:1},62000,'io').catch(()=>{});
  await D.say('dadi','Hello, little storyteller! Before we begin, imagine something for a moment.');
  await D.say('dadi','Have you ever seen a picture on a wall and wished it could come alive? Perhaps a bird could fly out of a painting, or a horse could jump off the page and run across your room.');
  await D.say('dadi','Well, in the city of Kanakpur, something just like that happened.');
  const w=walk(s,c,'c1',15000,{end:'carry'}).catch(()=>{});
  await D.say('dadi','On the morning of Dhanteras, an eleven-year-old girl named Chiku was carrying a basket of clay lamps to the royal palace. Her father made lamps for a living, and Chiku loved helping him. She knew how to fill a lamp with oil, place its wick, and protect its little flame from the wind.');
  await w;c.set('carry');
  const rp=D.tw(s,{ripple:1},1200).then(()=>D.wait(1600)).then(()=>D.tw(s,{ripple:0},1400)).catch(()=>{});AU.sfx('shimmer');
  await D.say('dadi','But that morning, as she passed the palace hallway, she heard a tiny sound.');await rp}

/* ---------- 1.2 ---------- */
async function shot1_2(){const s=hallSetup(false);D.setScene(s,'wipe');const c=s.cast.chiku,b=s.cast.bijli,A=s.anch();at(s,c,'cIn');
  s.cam.fx=A.slots[2].x;s.cam.fy=A.slots[2].y-90;
  await walk(s,c,'c',2600,{end:'carry'});c.f=1;
  D.tw(s.cam,{z:1.3},7000).catch(()=>{});
  const ears=async()=>{for(let i=0;i<2;i++){b.set('idle',{earL:-.6,earR:-.45});await D.wait(160);b.set('idle',{earL:.1,earR:.1});await D.wait(160)}b.set('idle')};
  ears().catch(()=>{});await D.sfxLine('psst','Psst! Pssst!');await D.wait(400);
  c.set('carry',{lookX:-.3,brow:'up',mouth:'o'});b.set('idle',{lookX:1,lookY:.6});
  await D.say('chiku',"Who's there?");await D.wait(400);
  const look=(async()=>{await D.wait(300);c.set('carry',{lookX:-1,lookY:0,brow:'n',mouth:'flat'});await D.wait(1300);c.set('carry',{lookX:1,mouth:'flat'});await D.wait(1300);c.set('carry',{lookX:0,brow:'worry',mouth:'worry'})})().catch(()=>{});
  const tail=(async()=>{await D.wait(1800);for(let i=0;i<3;i++){b.set('idle',{lookX:1,lookY:.6,tail:-.5});await D.wait(200);b.set('idle',{lookX:1,lookY:.6,tail:.35});await D.wait(200)}b.set('idle',{lookX:1,lookY:.6,tail:0})})().catch(()=>{});
  await D.say('dadi','Chiku looked left. She looked right. Nobody was there. Then she heard it again.');await look;await tail;await D.wait(400);
  AU.sfx('psst');b.set('idle',{head:.3,lookX:1,lookY:1});await D.say('bijli','Pssst! Look up!',{sfx:true,vol:.6});
  await D.wait(450);c.set('lookup',{lookX:.6});await D.wait(900)}

/* ---------- 1.3 ---------- */
async function shot1_3(){if(ensure('hall',()=>hallSetup(false))){const s=D.scene;s.cast.chiku.set('lookup',{lookX:.6})}
  const s=D.scene,c=s.cast.chiku,b=s.cast.bijli,A=s.anch();c.extra.basket=true;
  D.tw(s.cam,{z:1},2600).catch(()=>{});
  await D.say('dadi','She looked at the wall. Among the painted horses, one little horse had turned its head towards her.');
  b.set('idle',{head:.1,lookX:1,lookY:.6});
  const ew=(async()=>{for(let i=0;i<3;i++){b.set('idle',{earL:-.6,earR:.3});await D.wait(170);b.set('idle',{earL:.3,earR:-.6});await D.wait(170)}b.set('idle')})().catch(()=>{});
  await D.say('dadi','Its painted ears wiggled.');await ew;
  const tf=(async()=>{for(let i=0;i<3;i++){b.tp.tail=-.6;await D.wait(180);b.tp.tail=.4;await D.wait(180)}b.tp.tail=0})().catch(()=>{});
  await D.say('dadi','Its tail flicked.');await tf;
  const reveal=(async()=>{const st=A.slots[2],land=A.land;
    /* anticipation, then the front legs cross the painted frame */
    await D.tw(b,{sy:.9,sx:1.06},260);b.set('point',{legF:-.7,mouth:'big'});await D.tw(b,{sy:1,sx:1,x:st.x-30*st.s,y:A.m.y+A.m.h+18},700,'io');
    /* the body follows with a small hop */
    AU.sfx('hop');b.z=1;const h0={k:0};const x0=b.x,y0=b.y,s0=b.s;
    const step=()=>{const k=h0.k;b.x=lerp(x0,land.x,k);b.y=lerp(y0,land.y,k)-Math.sin(k*Math.PI)*140;b.s=lerp(s0,land.s,k)};
    const iv=setInterval(step,16);await D.tw(h0,{k:1},900,'io');clearInterval(iv);step();b.mark='land';b.free=false;b.set('idle',{legF:0});
    /* land with a playful squash, ghost stays on the wall */
    AU.sfx('land');s.ghost=0;D.tw(s,{ghost:1},800).catch(()=>{});b.sx=1.2;b.sy=.76;D.tw(s,{ring:1},1100,'lin').then(()=>s.ring=0).catch(()=>{});await D.tw(b,{sx:1,sy:1},500,'back')})();
  await D.say('dadi','Then, with a tiny hop, it stepped right out of the painting!');await reveal;
  /* Chiku reacts only after he lands: a lamp tilts in her basket */
  await D.wait(250);c.set('surprise');c.extra.basket=true;D.tw(c.extra,{basketTilt:.35},250).then(()=>D.tw(c.extra,{basketTilt:0},500,'back')).catch(()=>{});
  b.set('smile');await D.say('bijli','Finally! Someone who can hear me!');
  await D.say('chiku','AH! A horse! From the wall!');
  b.set('lean');c.set('carry',{brow:'up',mouth:'o'});
  await D.say('bijli','A painted horse, thank you very much. My name is Bijli. And if you stop shouting for just one moment, I have something very important to tell you.');
  b.set('tilt');c.set('carry',{brow:'n',mouth:'soft'});await D.wait(900)}

/* ---------- 1.4 Decision 1 ---------- */
function cardChar(g,kind,x,y,s,f,pose,extra){const a=new Actor(kind,x,y,s,f,pose);if(extra)Object.assign(a.extra,extra);a.p=Object.assign({},a.tp);a.blink=false;a.draw(g)}
async function shot1_4(){ensure('hall',()=>hallSetup(true));const s=D.scene,c=s.cast.chiku,b=s.cast.bijli;c.extra.basket=true;
  await D.say('dadi','Now, imagine that you are Chiku. A horse has just stepped out of a painting and says it has an important secret.');
  await D.say('dadi','What would you do?');
  const k=await D.choice('e1d1',[
    {key:'A',label:'Ask Bijli what happened.',draw(g){cardChar(g,'chiku',130,232,.68,1,'listen',{});cardChar(g,'bijli',280,228,.62,-1,'lean');sparkle(g,205,70,14,C.mustard);sparkle(g,225,95,8,C.verm)}},
    {key:'B',label:'Check whether anyone else can see Bijli.',draw(g){paintPillar(g,30,30,34,200,false);paintPillar(g,346,30,34,200,false);cardChar(g,'chiku',170,232,.68,-1,'idle',{});
      const a=new Actor('chiku',170,232,.68,-1,'idle');a.set('idle',{lookX:1,brow:'up'});a.p=Object.assign({},a.tp);a.draw(g);cardChar(g,'bijli',300,228,.5,-1,'impatient');strokeL(g,[[98,120],[70,112]],C.brown,3);strokeL(g,[[98,140],[66,142]],C.brown,3)}}]);
  if(k==='A'){c.set('listen');c.extra.basket=true;
    const lead=(async()=>{await D.wait(2600);b.set('smile');await D.tw(b.p,{head:.25},250);await D.tw(b.p,{head:-.05},250);b.tp.head=0;await walk(s,b,'old',2200);b.f=-1;b.set('point');await walk(s,c,'cOld',1600,{end:'listen'})})().catch(()=>{});
    await D.say('dadi',['Chiku took a deep breath. ',['chiku',"'All right, Bijli. I'm listening. Tell me what you know.'"],' Bijli nodded and led her towards the oldest painting in the hallway.']);await lead}
  else{const look=(async()=>{c.f=-1;c.set('carry',{lookX:1,brow:'n',mouth:'flat'});await D.wait(1600);
      at(s,b,'flower');b.set('impatient');c.f=1;c.set('carry',{lookX:.4,brow:'up',mouth:'o'});
      for(let i=0;i<4;i++){b.tp.tail=-.6;await D.wait(200);b.tp.tail=.4;await D.wait(200)}b.tp.tail=0})().catch(()=>{});
    await D.say('dadi','Chiku looked around to make sure nobody was about to walk into the hallway. When she turned back, Bijli was standing on a painted flower, looking impatient.');await look;
    await D.say('dadi',[['bijli',"'Are you finished checking? Good! Now listen.'"]]);c.set('listen')}}

/* ---------- 1.5 Help Bijli Remember ---------- */
const SYMS=['cradle','stars','moons','serpent','door'];
function starPts(r,ri){const p=[];for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?ri:r;p.push([Math.cos(a)*rr,Math.sin(a)*rr])}return p}
function drawSymbol(ctx,k,x,y,sz,f){const s=sz/100,hi=f>.01;withT(ctx,x,y,s,1,c=>{const o={sw:2.8};
  if(f>0){c.save();c.globalAlpha*=clamp(f,0,1);dot(c,0,0,64,ca(C.gold,.22));ring(c,0,0,60,C.gold,7);ring(c,0,0,68,C.verm,3);for(let i=0;i<8;i++){const a=i/8*TAU+T.sec*.4;sparkle(c,Math.cos(a)*78,Math.sin(a)*78,7,C.gold)}c.restore()}
  if(k==='cradle'){strokeL(c,[[-40,-46],[40,-46]],C.brown,5);strokeL(c,[[-30,-46],[-34,-6]],hi?C.verm:C.ivory,3);strokeL(c,[[30,-46],[34,-6]],hi?C.verm:C.ivory,3);
    R.path(c,'M-46 -8 Q 0 42 46 -8 Z',hi?C.gold:C.ivory,o);for(let i=0;i<5;i++)dot(c,-26+i*13,4,3,hi?C.verm:C.terra);R.circ(c,14,-12,18,hi?C.verm:C.mustard,o)}
  else if(k==='stars'){[[-28,-18,22],[22,-28,17],[10,22,20]].forEach(([sx,sy,r])=>{c.save();c.translate(sx,sy);R.poly(c,starPts(r,r*.45),hi?C.gold:C.ivory,o);c.restore()})}
  else if(k==='moons'){for(let i=0;i<4;i++){c.save();c.translate(-39+i*26,0);R.path(c,'M0 -16 A 16 16 0 1 0 0 16 A 11 16 0 1 1 0 -16 Z',hi?C.gold:C.ivory,{sw:2.4});c.restore()}}
  else if(k==='serpent'){const pts=[];for(let i=0;i<=8;i++)pts.push([-44+i*10,Math.sin(i*.95)*16]);pts.forEach((p,i)=>R.circ(c,p[0],p[1],18-i*.6,hi?C.leaf:C.leaf,{sw:2.2}));
    pts.forEach((p,i)=>i%2&&dot(c,p[0],p[1],3,hi?C.gold:C.ivory));R.ell(c,44,-6,26,20,C.leaf,{sw:2.4});dot(c,48,-9,2.6,C.charcoal);strokeL(c,[[56,-4],[64,-2],[68,-6]],C.verm,2.4)}
  else if(k==='door'){R.poly(c,archPts(-34,-50,68,98),hi?C.gold:C.mustard,o);R.poly(c,archPts(-24,-40,48,88),C.indigo,o);strokeL(c,[[0,-34],[0,48]],C.brown,2.4);dot(c,-6,10,3,C.gold);dot(c,6,10,3,C.gold)}})}
function muralGeo(){const W=L.W,H=L.H,P=L.portrait,b=borderSize();const top=Math.max(b+12,(P?66:8)/L.U+b*.3);const strip={x:b+16,y:top,w:W-2*b-32,h:P?150:120};
  const reg={x:b+30,y:strip.y+strip.h+40,w:W-2*b-60,h:(H-b-30)-(strip.y+strip.h+40)};
  const U=P?[[.24,.06],[.78,.24],[.36,.44],[.74,.6],[.52,.82]]:[[.2,.16],[.8,.08],[.46,.52],[.68,.9],[.92,.56]];
  const sz=P?150:128;const sy=y=>reg.y+sz*.6+y*(reg.h-sz*1.6);
  const pos=U.map(([u,v])=>({x:reg.x+sz*.6+u*(reg.w-sz*1.2),y:sy(v)}));
  const slots=SYMS.map((k,i)=>({x:strip.x+strip.w*(.5+(i-2)*(P?.18:.12)),y:strip.y+strip.h/2}));
  return{strip,reg,pos,sz,slots,bij:{x:b+(P?120:130),y:H-b-(P?60:40),s:L.cs*.8,f:1}}}
function paintDenseMural(g,W,H,A){g.fillStyle=C.terra;g.fillRect(0,0,W,H);const r=rng(77);const step=L.portrait?96:86;
  for(let y=A.reg.y-40;y<H;y+=step*2){zigzag(g,0,y+step*.95,W,12,ca(C.mustard,.5),Math.round(W/22));dotRow(g,0,y+step*.95+20,W,18,3,ca(C.ivory,.6))}
  for(let y=A.reg.y-20;y<H-20;y+=step)for(let x=20;x<W-20;x+=step){const jx=x+(r()-.5)*40+((y/step)%2)*step*.5,jy=y+(r()-.5)*30;
    if(A.pos.some(p=>Math.hypot(p.x-jx,p.y-jy)<A.sz*.85))continue;if(jx<A.bij.x+150&&jy>A.bij.y-220)continue;
    const k=Math.floor(r()*9),cols=[C.ivory,C.mustard,C.indigo,C.leaf,C.charcoal],col=cols[Math.floor(r()*cols.length)],mk2=col===C.ivory?C.indigo:C.ivory;
    if(k===0)motifHorse(g,jx,jy+44,.72,col,mk2,r()<.5?1:-1);else if(k===1)motifElephant(g,jx,jy+42,.6,col,mk2,r()<.5?1:-1);
    else if(k===2)motifBird(g,jx,jy+20,1.2,col,r()<.5?1:-1);else if(k===3)motifTree(g,jx,jy+46,.5,r()<.5?1:0);
    else if(k===4)motifFlower(g,jx,jy,24,col===C.charcoal?C.ivory:col,C.verm);else if(k===5)motifPerson(g,jx,jy+40,.9,col===C.charcoal?C.indigo:col,C.ivory);
    else if(k===6){ring(g,jx,jy,26,C.ivory,3);ring(g,jx,jy,16,C.mustard,3);dot(g,jx,jy,6,C.indigo)}else if(k===7)motifSun(g,jx,jy,17,C.mustard);
    else{for(let i=0;i<9;i++)dot(g,jx+(i%3-1)*14,jy+(Math.floor(i/3)-1)*14,3.4,C.ivory)}}
  g.fillStyle=C.ivory;R.rect(g,A.strip.x,A.strip.y,A.strip.w,A.strip.h,C.ivory,{sw:3});zigzag(g,A.strip.x+6,A.strip.y+A.strip.h-16,A.strip.w-12,12,C.terra,Math.round(A.strip.w/26));
  A.slots.forEach(sl=>{g.setLineDash([6,6]);ring(g,sl.x,sl.y-6,A.strip.h*.33,C.brown,2.4);g.setLineDash([])})}
function muralScene(){const s=mk({id:'mural',syms:null,ripples:[],layout(){return muralGeo()},
  draw(ctx){const A=this.anch(),W=L.W,H=L.H;if(!this.syms)this.syms=SYMS.map((k,i)=>({k,i,found:false,f:0,fly:0,pulse:0}));
    Bake.draw(ctx,'mural',0,0,W,H,(g,w,h)=>paintDenseMural(g,w,h,A));
    for(const sy of this.syms){const p=A.pos[sy.i],sl=A.slots[sy.i];const x=lerp(p.x,sl.x,sy.fly),y=lerp(p.y,sl.y-6,sy.fly),sz=lerp(A.sz,A.strip.h*.6,sy.fly);
      if(sy.pulse>0){ring(ctx,p.x,p.y,A.sz*(.55+.08*Math.sin(T.sec*4)),ca(C.gold,.6*sy.pulse),4)}
      drawSymbol(ctx,sy.k,x,y,sz,sy.fly>.95?0:sy.f)}
    this.ripples=this.ripples.filter(r=>T.sec-r.t<.7);for(const r of this.ripples){const k=(T.sec-r.t)/.7;ring(ctx,r.x,r.y,20+k*40,ca(C.ivory,1-k),3)}
    this.drawActors(ctx);drawBorder(ctx,false)},
  down(p){const A=this.anch();if(!this.syms||this.busy)return;const hit=this.syms.find(sy=>!sy.found&&near(p,A.pos[sy.i].x,A.pos[sy.i].y,A.sz*.62));
    if(hit)this.find(hit);else{this.ripples.push({x:p.x,y:p.y,t:T.sec});AU.sfx('tap')}}});
  return s}
async function shot1_5(){const s=muralScene();const prevB=Store.choice('e1d1');D.setScene(s,'wipe',1300);
  const b=s.add('bijli',new Actor('bijli',0,0,1,1,prevB==='B'?'impatient':'smile'),'bij');s.anch();
  if(prevB==='B'){b.y-=40;D.tw(b,{y:s.A.bij.y},500,'back').then(()=>AU.sfx('land')).catch(()=>{})}
  await D.say('dadi','Bijli had been painted on the palace wall many years ago. He remembered an important prophecy, but the pictures around him had become mixed up.');
  b.set('worry');await D.say('dadi','Can you help him find the five pictures he needs?');b.set('idle');
  let found=0,resolve;const done=new Promise(r=>resolve=r);
  s.find=async(sy)=>{sy.found=true;s.busy=true;D.lastInput=performance.now();s.syms.forEach(o=>o.pulse=0);AU.sfx('find');b.set('smile');
    try{await D.tw(sy,{f:1},500,'out');await D.wait(700);await D.tw(sy,{fly:1},700,'io');AU.sfx('drop');
      b.y-=0;await D.tw(b,{sy:.85},120);await D.tw(b,{sy:1.05,y:b.y-30},180,'out');await D.tw(b,{y:s.A.bij.y,sy:1},220,'in')}catch(e){}
    b.set('idle');s.busy=false;found++;if(found===5)resolve()};
  const next=()=>s.syms.find(o=>!o.found);
  await D.activity({start:()=>done,
    hint(){const n=next();if(!n)return;n.pulse=1;b.set('point',{lookX:1});D.say('dadi','Look closely. Bijli is pointing at one of the pictures.').catch(()=>{})},
    assist(){const n=next();if(n&&!s.busy)s.find(n)}});
  b.set('smile');await D.wait(500)}

/* ---------- 1.6 / 1.7 prophecy room ---------- */
function archSky(g,w,mood){g.save();g.beginPath();archPts(w.x,w.y,w.w,w.h).forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.clip();paintSky(g,w.x,w.y,w.w,w.h,mood);g.restore();R.poly(g,archPts(w.x,w.y,w.w,w.h),null,{sw:3})}
function prophGeo(){const W=L.W,H=L.H,P=L.portrait,b=borderSize();const band={x:b+30,y:Math.max(b+30,(P?70:0)/L.U),w:W-2*b-60,h:P?220:190};
  const n=5,sp=P?(band.w-60)/5:Math.min(220,(band.w-80)/5);const sym=SYMS.map((k,i)=>({x:W/2+(i-2)*sp,y:band.y+band.h/2}));const fy=H*(P?.8:.85);
  return{band,sym,sz:P?118:130,fy,win:P?{x:W*.08,y:H*.3,w:W*.26,h:H*.2}:{x:W*.07,y:H*.36,w:W*.14,h:H*.32},
    c:{x:P?W*.36:W*.36,y:fy,s:L.cs,f:1},b:{x:P?W*.68:W*.56,y:fy,s:L.cs*.95,f:-1},exit:{x:W+200,y:fy,s:L.cs},bexit:{x:W+340,y:fy,s:L.cs*.95}}}
function paintProph(g,W,H,A,mood){paintInteriorWall(g,0,0,W,H,{});const w=A.win;archSky(g,w,mood);
  R.poly(g,archPts(w.x-14,w.y-14,w.w+28,w.h+28),null,{sw:3,stroke:C.mustard});
  g.fillStyle=C.mustard;R.rect(g,w.x-14,w.y+w.h,w.w+28,16,C.mustard,{sw:2.4});
  if(mood==='morning')motifTree(g,w.x+w.w*.3,w.y+w.h,.5,0);
  R.rect(g,A.band.x,A.band.y,A.band.w,A.band.h,C.ivory,{sw:3});zigzag(g,A.band.x+8,A.band.y+A.band.h-18,A.band.w-16,12,C.terra,Math.round(A.band.w/26));
  if(!L.portrait){paintPillar(g,W*.9,H*.36,W*.035,A.fy-H*.36,false)}}
function prophScene(){const s=mk({id:'proph',lit:[0,0,0,0,0],focus:0,line:0,dusk:0,layout(){return prophGeo()},
  draw(ctx){const A=this.anch(),W=L.W,H=L.H;Bake.draw(ctx,'prophM',0,0,W,H,(g,w,h)=>paintProph(g,w,h,A,'morning'));
    if(this.dusk>0){ctx.save();ctx.globalAlpha=this.dusk;Bake.draw(ctx,'prophA',0,0,W,H,(g,w,h)=>paintProph(g,w,h,A,'afternoon'));ctx.restore();
      ctx.fillStyle=ca(C.terra,.14*this.dusk);ctx.fillRect(0,0,W,H)}
    if(this.line>0){const pts=A.sym.map(p=>[p.x,p.y+A.sz*.52]);const tot=pts.length-1,k=this.line*tot;ctx.save();
      const seg=[];for(let i=0;i<=tot;i++){if(i<=k)seg.push(pts[i]);else{const f=k-(i-1);if(f>0)seg.push([lerp(pts[i-1][0],pts[i][0],f),lerp(pts[i-1][1],pts[i][1],f)]);break}}
      const wav=[];for(let i=0;i<seg.length-1;i++){for(let j=0;j<10;j++){const t=j/10;wav.push([lerp(seg[i][0],seg[i+1][0],t),lerp(seg[i][1],seg[i+1][1],t)+Math.sin(t*TAU)*8])}}if(seg.length)wav.push(seg[seg.length-1]);
      strokeL(ctx,wav,C.verm,6);ctx.restore()}
    A.sym.forEach((p,i)=>{const isDoor=i===4,z=1+(isDoor?this.focus*.3:0);if(isDoor&&this.focus>0)glow(ctx,p.x,p.y,A.sz*.9,this.focus,T.sec);drawSymbol(ctx,SYMS[i],p.x,p.y,A.sz*.8*z,this.lit[i])});
    this.drawActors(ctx);drawBorder(ctx,false)}});return s}
function prophSetup(){const s=prophScene();const c=s.add('chiku',new Actor('chiku',0,0,1,1,'listen'),'c');c.extra.basket=true;s.add('bijli',new Actor('bijli',0,0,1,-1,'idle'),'b');return s}
async function shot1_6(){const s=prophSetup();D.setScene(s,'wipe');const c=s.cast.chiku,b=s.cast.bijli;c.set('lookup',{lookX:0});
  const lines=['The cradle reminds Bijli of the day Prince Anand was born.','The stars remind him of the astrologer who came to the palace.','The four moons remind him that several nights have passed.','The serpent reminds him of a mysterious visitor.','And the closed door reminds him of the night that visitor will arrive.'];
  for(let i=0;i<5;i++){AU.sfx('find');D.tw(s.lit,{[i]:1},600).catch(()=>{});if(i===4)D.tw(s,{focus:1},1200).catch(()=>{});b.set(i===3?'worry':'tilt');await D.say('dadi',lines[i])}
  c.set('listen');b.set('determined');D.tw(s,{line:1},9000,'lin').catch(()=>{});
  await D.say('bijli',"Now I remember! When Prince Anand was born, an astrologer warned the palace of a strange event. On the fourth night after the prince's wedding, a messenger of Yama, Lord of Endings, would come for him.");
  c.set('surprise');D.tw(s,{dusk:1},3500).catch(()=>{});Music.mood('night');
  await D.say('chiku','The wedding was three nights ago! That means the visitor is coming tonight!');c.set('worry');b.set('worry');await D.wait(500)}
async function shot1_7(){ensure('proph',()=>{const s=prophSetup();s.lit=[1,1,1,1,1];s.focus=1;s.line=1;s.dusk=1;return s});const s=D.scene,c=s.cast.chiku,b=s.cast.bijli;
  await D.say('dadi','If you were Chiku, would you keep this a secret, or tell someone who could help?');
  const k=await D.choice('e1d2',[
    {key:'A',label:'Tell Princess Kesar immediately.',draw(g){R.poly(g,archPts(300,40,80,170),C.indigo,{sw:2.4});cardChar(g,'kesar',345,222,.52,-1,'listen');cardChar(g,'chiku',150,232,.66,1,'walk');for(let i=0;i<3;i++)strokeL(g,[[60-i*6,120+i*24],[100-i*6,120+i*24]],C.brown,3)}},
    {key:'B',label:'Ask Bijli for advice first.',draw(g){cardChar(g,'chiku',140,232,.66,1,'think');cardChar(g,'bijli',285,226,.62,-1,'lean');dot(g,214,74,6,C.mustard);dot(g,228,58,4,C.mustard)}}]);
  if(k==='A'){c.set('determined');const run=(async()=>{await D.wait(600);walk(s,b,'bexit',2200).catch(()=>{});await walk(s,c,'exit',1800)})().catch(()=>{});
    await D.say('dadi','Chiku runs to the princess and tells her what Bijli remembers.');await run}
  else{b.set('point',{lookX:1});b.f=1;c.set('listen');await D.say('dadi','Bijli explains that Princess Kesar is the person who needs to know, and Chiku takes him to her.');
    c.set('nod');await D.wait(500);c.set('idle');await D.wait(300);c.set('nod');await D.wait(400);const w=walk(s,c,'exit',2600).catch(()=>{});await walk(s,b,'bexit',2600).catch(()=>{});await w}}

/* ---------- 1.8 Kesar's chamber ---------- */
function chamberGeo(){const W=L.W,H=L.H,P=L.portrait;const fy=H*(P?.8:.86);
  return{fy,k:{x:P?W*.68:W*.6,y:fy,s:L.cs*1.02,f:-1},c:{x:P?W*.37:W*.38,y:fy,s:L.cs,f:1},b:{x:P?W*.17:W*.24,y:fy-(P?150:36),s:L.cs*(P?.85:.9),f:1},
    cIn:{x:-150,y:fy,s:L.cs},bIn:{x:-320,y:fy-(P?150:36),s:L.cs*(P?.85:.9)},
    table:P?{x:W*.7,y:fy-150,w:W*.26,h:40}:{x:W*.7,y:fy-140,w:W*.2,h:40},niches:[.2,.5,.8].map(u=>({x:W*u,y:H*(P?.24:.3)}))}}
function paintChamber(g,W,H,A){g.fillStyle=C.terra;g.fillRect(0,0,W,H);R.rect(g,0,H*.06,W,H*.1,C.ivory,{sw:2.6});for(let i=0;i<Math.round(W/150);i++)motifElephant(g,W*(i+.5)/Math.round(W/150),H*.155,.45,C.terra,C.indigo,i%2?1:-1);
  A.niches.forEach(n=>{const w=L.portrait?150:120,h=w*1.3;R.poly(g,archPts(n.x-w/2-12,n.y-h/2-12,w+24,h+24),C.mustard,{sw:2.6});R.poly(g,archPts(n.x-w/2,n.y-h/2,w,h),C.indigo,{sw:2.6});withT(g,n.x,n.y+h/2-12,1,1,c=>drawDiya(c,0,0,.9,{lit:0}))});
  for(const sd of[0,1]){const x=sd?W-W*.09:0;R.rect(g,x,0,W*.09,A.fy,C.mustard,{sw:2.6});for(let i=0;i<4;i++)strokeL(g,[[x+W*.09*(i+.5)/4,0],[x+W*.09*(i+.5)/4,A.fy]],C.verm,4)}
  g.fillStyle=C.indigo;g.fillRect(0,A.fy-30,W,H);R.rect(g,W*.1,A.fy-6,W*.8,H-A.fy-30,C.verm,{sw:3});zigzag(g,W*.1+6,A.fy+2,W*.8-12,16,C.mustard,Math.round(W/36));diamonds(g,W*.16,A.fy+40,W*.68,30,C.mustard,12);
  const t=A.table;R.rect(g,t.x-t.w/2,t.y,t.w,t.h,C.mustard,{sw:3});R.rect(g,t.x-t.w/2+14,t.y+t.h,18,A.fy-t.y-t.h+10,C.brown,{sw:2.4});R.rect(g,t.x+t.w/2-32,t.y+t.h,18,A.fy-t.y-t.h+10,C.brown,{sw:2.4});dotRow(g,t.x-t.w/2+12,t.y+t.h/2,t.w-24,16,3,C.verm)}
function chamberScene(){const s=mk({id:'chamber',warm:0,lampL:lamp(0,0,1),lampOn:true,layout(){return chamberGeo()},
  draw(ctx){const A=this.anch(),W=L.W,H=L.H;Bake.draw(ctx,'chamber',0,0,W,H,(g,w,h)=>paintChamber(g,w,h,A));
    if(this.lampOn){this.lampL.x=A.table.x;this.lampL.y=A.table.y-2;this.lampL.s=L.cs*.95;drawLamp(ctx,this.lampL)}
    this.drawActors(ctx);const c=this.cast.chiku;if(this.warm>0&&c){const[hx,hy]=c.head();ctx.save();ctx.globalAlpha=this.warm*.8;dot(ctx,hx,hy,70*c.s,ca(C.gold,.16));dot(ctx,hx,hy,52*c.s,ca(C.gold,.14));ctx.restore()}
    drawBorder(ctx,false)}});return s}
async function shot1_8(){const s=chamberScene();D.setScene(s,'wipe');const k=s.add('kesar',new Actor('kesar',0,0,1,-1,'listen'),'k');
  const c=s.add('chiku',new Actor('chiku',0,0,1,1,'walk'),'cIn');const b=s.add('bijli',new Actor('bijli',0,0,1,1,'idle'),'bIn');c.extra.basket=true;b.z=-1;
  const prev=Store.choice('e1d2');
  const enter=Promise.all([walk(s,c,'c',prev==='A'?1300:2300,{end:prev==='A'?'worry':'listen'}),walk(s,b,'b',prev==='A'?1700:2300)]).catch(()=>{});
  await D.say('dadi',prev==='A'?'The door opened. Chiku rushed in, still out of breath.':'The door opened. Chiku and Bijli walked in together.');await enter;
  k.set('listen');c.set(prev==='A'?'worry':'listen');await D.wait(600);
  /* Kesar picks up a lamp and examines its wick */
  k.set('think');await D.wait(700);s.lampOn=false;const L1=s.lampL;L1.lit=0;k.extra.hold=cc=>drawDiya(cc,66,-186,.85,{lit:L1.lit,t:T.sec,glow:L1.lit>0,seed:2});k.set('hold');
  await D.say('kesar','So the visitor will come tonight. We cannot stop the sun from setting, and we cannot tell the night not to arrive. But perhaps we can decide what this night will be like.');
  c.set('worry');await D.say('chiku','What can a lamp do against a messenger of Yama?');
  k.set('hold',{lookX:-.3,lookY:0,mouth:'smile'});const lightIt=(async()=>{await D.wait(900);await lightLamp(L1,900);D.tw(s,{warm:1},1400).catch(()=>{});c.set('smile');Music.swell()})().catch(()=>{});
  await D.say('kesar','A lamp can give light. A lamp can welcome a guest. And a lamp can remind us not to give up when something frightens us.');await lightIt;
  c.set('determined');b.set('smile');
  await D.say('dadi','Kesar had an idea. The palace would be filled with lamps. There would be no dark doorway, no lonely corner, and no frightened person left to face the night alone.');
  await D.say('dadi','But first, they had to find enough lamps that were ready to burn.')}

/* ---------- 1.9 Prepare the Lamps ---------- */
function tableGeo(){const W=L.W,H=L.H,P=L.portrait,b=borderSize();const ty=P?H*.36:H*.42;
  const lampS=P?1.25:1.05;const homes=[];const n=9;
  if(P){for(let i=0;i<n;i++)homes.push({x:W*(.2+(i%3)*.3),y:ty+150+Math.floor(i/3)*150})}else{for(let i=0;i<n;i++)homes.push({x:W*(.14+i*.09),y:ty+92})}
  const trayY=P?H*.66:H*.645,tw2=P?W*.42:W*.34,th=P?200:150;
  return{ty,lampS,homes,ready:{x:P?W*.27:W*.3,y:trayY,w:tw2,h:th},repair:{x:P?W*.73:W*.7,y:trayY,w:tw2,h:th},
    c:{x:P?W*.24:W*.18,y:ty+(P?40:30),s:L.cs*.95,f:1},k:{x:P?W*.76:W*.84,y:ty+(P?40:30),s:L.cs,f:-1},
    oil:P?{x:W*.5,y:ty+55}:{x:W*.5,y:H*.645+20},row:i=>({x:W/2+(i-4)*(P?98:Math.min(150,W*.085)),y:P?ty+300:ty+92})}}
function paintTable(g,W,H,A){paintInteriorWall(g,0,0,W,A.ty+30,{});for(let i=0;i<3;i++)motifFlower(g,W*(.3+i*.2),A.ty*.42,30,C.terra,C.mustard)}
function paintTableTop(g,W,H,A){R.rect(g,-10,A.ty,W+20,H-A.ty+10,C.mustard,{sw:3.4});R.rect(g,-10,A.ty,W+20,30,C.terra,{sw:3});zigzag(g,0,A.ty+6,W,18,C.mustard,Math.round(W/30));
  for(const tr of[A.ready,A.repair]){const ok=tr===A.ready;R.rect(g,tr.x-tr.w/2,tr.y-tr.h/2,tr.w,tr.h,ok?C.leaf:C.indigo,{sw:3.2});R.rect(g,tr.x-tr.w/2+10,tr.y-tr.h/2+10,tr.w-20,tr.h-20,C.ivory,{sw:2.4});
    dotRow(g,tr.x-tr.w/2+20,tr.y+tr.h/2-20,tr.w-40,18,3,ok?C.leaf:C.indigo);
    const fs=L.portrait?34:30;g.save();g.font=`700 ${fs}px "Baloo 2", sans-serif`;const lw=g.measureText(ok?'Ready to Shine':'Needs Repair').width;g.restore();
    const ix=tr.x-(lw+90)/2+20,iy=tr.y+tr.h/2+44;R.rect(g,ix-34,iy-34,lw+120,68,C.ivory,{sw:2.4});
    if(ok){drawFlame(g,ix,iy+18,1,0,0,0);for(let i=0;i<8;i++){const a=i/8*TAU;strokeL(g,[[ix+Math.cos(a)*24,iy+Math.sin(a)*24-6],[ix+Math.cos(a)*34,iy+Math.sin(a)*34-6]],C.gold,4)}}
    else{R.path(g,`M${ix} ${iy-22} C ${ix+14} ${iy-2} ${ix+14} ${iy+14} ${ix} ${iy+14} C ${ix-14} ${iy+14} ${ix-14} ${iy-2} ${ix} ${iy-22} Z`,C.mustard,{sw:2.4});
      ring(g,ix+34,iy+8,7,C.brown,3);ring(g,ix+34,iy-10,7,C.brown,3);strokeL(g,[[ix+38,iy+4],[ix+58,iy-14]],C.brown,3);strokeL(g,[[ix+38,iy-6],[ix+58,iy+12]],C.brown,3)}
    text(g,ok?'Ready to Shine':'Needs Repair',ix+(ok?40:72)+lw/2,iy,fs,C.brown,{})}
  withT(g,A.oil.x,A.oil.y,1,1,c=>{R.ell(c,0,0,90,40,C.brown,{sw:2.4});R.path(c,'M-40 0 C -46 -60 46 -60 40 0 Z',C.mustard,{sw:3});R.rect(c,-14,-74,28,20,C.mustard,{sw:2.4});dotRow(c,-26,-24,52,13,3,C.verm)});
  withT(g,A.oil.x+(L.portrait?120:0),A.oil.y+(L.portrait?0:-80),1,1,c=>{for(let i=0;i<6;i++)strokeL(c,[[-20+i*7,0],[-14+i*7,-50]],C.ivory,4);R.rect(c,-24,-30,44,10,C.verm,{sw:2})})}
function tableScene(){const s=mk({id:'table',lamps:[],drag:null,layout(){return tableGeo()},
  draw(ctx){const A=this.anch(),W=L.W,H=L.H;Bake.draw(ctx,'tblW',0,0,W,H,(g,w,h)=>paintTable(g,w,h,A));
    this.drawActors(ctx);Bake.draw(ctx,'tblT',0,0,W,H,(g,w,h)=>paintTableTop(g,w,h,A));
    if(this.pour>0){const p=this.pour;const lx=this.pourAt.x,ly=this.pourAt.y;withT(ctx,lx-50,ly-110,1,1,c=>{c.rotate(.6*p);R.path(c,'M-24 0 C -28 -36 28 -36 24 0 Z',C.mustard,{sw:2.4})},0);for(let i=0;i<3;i++)dot(ctx,lx-20,ly-80+((T.sec*200+i*30)%60),5,C.mustard)}
    if(this.snip>0){const lx=this.snipAt.x,ly=this.snipAt.y;const o=Math.abs(Math.sin(T.sec*12))*.4;withT(ctx,lx+36,ly-40,1,1,c=>{ring(c,-14,10,7,C.brown,3);ring(c,-14,-10,7,C.brown,3);c.rotate(o);strokeL(c,[[-8,8],[16,-10]],C.charcoal,3.4);c.rotate(-2*o);strokeL(c,[[-8,-8],[16,10]],C.charcoal,3.4)})}
    const order=this.lamps.slice().sort((a,b)=>(a===this.drag)-(b===this.drag));for(const l of order){drawLamp(ctx,l);
      if(l===this.drag||l.inspect>0){const k=l===this.drag?1:l.inspect,x=l.x,y=l.y-110*l.s/1.05;ctx.save();ctx.globalAlpha=k;R.rect(ctx,x-74,y-34,148,62,C.ivory,{sw:2.6});
        R.path(ctx,`M${x-38} ${y-22} C ${x-26} ${y-4} ${x-26} ${y+10} ${x-38} ${y+10} C ${x-50} ${y+10} ${x-50} ${y-4} ${x-38} ${y-22} Z`,l.oil?C.mustard:C.ivory,{sw:2.4});
        if(l.wick===2)strokeL(ctx,[[x+34,y+14],[x+34,y-20]],C.brown,6);else{strokeL(ctx,[[x+34,y+14],[x+26,y-18]],C.brown,4);strokeL(ctx,[[x+34,y+14],[x+44,y-18]],C.brown,4);strokeL(ctx,[[x+34,y+14],[x+35,y-22]],C.brown,4)}
        const okO=l.oil,okW=l.wick===2;dot(ctx,x-14,y+18,7,okO?C.leaf:C.verm);dot(ctx,x+56,y+18,7,okW?C.leaf:C.verm);ctx.restore()}}
    drawBorder(ctx,false)},
  pick(p){return this.lamps.slice().reverse().find(l=>!l.done&&!l.busy&&near(p,l.x,l.y-14,62*l.s))},
  down(p){if(this.lock)return;const l=this.pick(p);if(l){this.drag=l;l.ox=l.x-p.x;l.oy=l.y-p.y;l.s=this.A.lampS*1.2;AU.sfx('tap')}},
  move(p){const l=this.drag;if(l){l.x=p.x+l.ox;l.y=p.y+l.oy}},
  up(p){const l=this.drag;if(!l)return;this.drag=null;l.s=this.A.lampS;const A=this.anch();const inT=t=>Math.abs(l.x-t.x)<t.w/2+30&&Math.abs(l.y-t.y)<t.h/2+40;
    if(inT(A.ready))this.drop(l,'ready');else if(inT(A.repair))this.drop(l,'repair');else D.tw(l,{x:l.hx,y:l.hy},400).catch(()=>{})}});return s}
async function shot1_9(){const s=tableScene();D.setScene(s,'wipe');const A=s.anch();const c=s.add('chiku',new Actor('chiku',0,0,1,1,'idle'),'c');const k=s.add('kesar',new Actor('kesar',0,0,1,-1,'smile'),'k');
  const kinds=['ok','noOil','ok','wick','ok','ok','noOil','ok','wick'];s.lamps=kinds.map((kd,i)=>{const h=A.homes[i];return lamp(h.x,h.y,A.lampS,{hx:h.x,hy:h.y,oil:kd!=='noOil',wick:kd==='wick'?1:2,kind:kd,inspect:0})});
  await D.say('dadi','Pick up each lamp. Check whether it has oil. Check whether the wick is ready. Then choose a tray.');
  let readyN=0,said={noOil:false,wick:false,ready:false},resolve;const done=new Promise(r=>resolve=r);
  const slot=i=>({x:A.ready.x-A.ready.w/2+A.ready.w*(.1+(i%5)*.2)+(i>=5?A.ready.w*.1:0),y:A.ready.y+(i<5?-14:40)*(L.portrait?1.3:1)});
  const toReady=async l=>{const sp=slot(readyN++);l.done=true;await D.tw(l,{x:sp.x,y:sp.y,s:A.lampS*.62},500).catch(()=>{});AU.sfx('place');await lightLamp(l,500).catch(()=>{});if(readyN===9)resolve()};
  const repair=async l=>{l.busy=true;s.lock=true;try{await D.tw(l,{x:A.repair.x,y:A.repair.y+10,s:A.lampS},450);AU.sfx('tap');
    if(!l.oil){c.set('reach');if(!said.noOil){said.noOil=true;await D.say('chiku',"This lamp has a wick, but no oil. Let's fill it.")}
      s.pourAt={x:l.x,y:l.y};await D.tw(s,{pour:1},400);await D.wait(900);l.oil=true;AU.sfx('drop');await D.tw(s,{pour:0},300)}
    if(l.wick!==2){k.set('explain');if(!said.wick){said.wick=true;await D.say('kesar','And this one has plenty of oil, but its wick needs trimming. A little care can make it ready.')}
      s.snipAt={x:l.x,y:l.y};s.snip=1;await D.wait(900);s.snip=0;l.wick=2;AU.sfx('tap')}
    c.set('smile');k.set('smile')}catch(e){}s.lock=false;l.busy=false;await toReady(l)};
  s.drop=async(l,tray)=>{D.lastInput=performance.now();const ok=l.oil&&l.wick===2;
    if(tray==='ready'&&ok){c.set('smile');await toReady(l)}
    else if(tray==='ready'&&!ok){l.inspect=1;D.tw(l,{inspect:0},2500).catch(()=>{});c.set('think');await repair(l)}
    else if(tray==='repair'&&!ok){await repair(l)}
    else{l.busy=true;await D.tw(l,{x:A.repair.x,y:A.repair.y},300).catch(()=>{});if(!said.ready){said.ready=true;c.set('smile');await D.say('dadi','That lamp was ready to shine.').catch(()=>{})}l.busy=false;await toReady(l)}};
  const nextL=()=>s.lamps.find(l=>!l.done&&!l.busy);
  await D.activity({start:()=>done,hint(){const l=nextL();if(!l)return;l.inspect=1;D.tw(l,{inspect:0},4000).catch(()=>{});c.set('reach');D.say('dadi','Pick up a lamp. Look at its oil and its wick.').catch(()=>{})},
    assist(){const l=nextL();if(!l||s.lock||s.drag)return;s.drop(l,l.oil&&l.wick===2?'ready':'repair')}});
  await D.wait(600);s.lamps.forEach((l,i)=>{const r=A.row(i);D.tw(l,{x:r.x,y:r.y,s:A.lampS*.85},900).catch(()=>{})});await D.wait(1100);AU.sfx('chime');
  c.set('think');await D.say('chiku','Nine lamps. Is that enough?');k.set('explain');await D.say('kesar',"It's a beginning. And a beginning is something we can build upon.");k.set('smile');c.set('smile');await D.wait(500)}

/* ---------- 1.10 corridor at sunset (cliffhanger) ---------- */
function corrGeo(){const W=L.W,H=L.H,P=L.portrait;const fy=H*(P?.74:.84);const door=P?{x:W*.56,y:fy-H*.3,w:W*.34,h:H*.3}:{x:W*.72,y:fy-H*.56,w:W*.18,h:H*.56};
  const lamps=[];for(let i=0;i<9;i++){const t=i/8;lamps.push({x:lerp(P?W*.1:W*.1,door.x-(P?30:40),t),y:fy+(P?30:22)})}
  return{fy,door,win:P?{x:W*.1,y:H*.12,w:W*.36,h:H*.24}:{x:W*.08,y:H*.16,w:W*.18,h:H*.42},lamps,c:{x:P?W*.3:W*.36,y:P?H*.86:fy+6,s:L.cs,f:-1},b:{x:P?W*.56:W*.5,y:P?H*.86:fy+6,s:L.cs*.95,f:-1}}}
function paintCorr(g,W,H,A,mood){g.fillStyle=C.terra;g.fillRect(0,0,W,H);const w=A.win;archSky(g,w,mood);R.poly(g,archPts(w.x-14,w.y-14,w.w+28,w.h+28),null,{sw:3});
  for(let i=1;i<4;i++)strokeL(g,[[w.x+w.w*i/4,w.y+w.w*.25],[w.x+w.w*i/4,w.y+w.h]],C.brown,4);
  const n=L.portrait?2:3;for(let i=0;i<n;i++){const x=(L.portrait?W*.55:W*.32)+i*(L.portrait?W*.2:W*.13);R.poly(g,archPts(x,H*.18,W*.08,A.fy-H*.18),ca(C.verm,.6),{sw:2.6})}
  R.rect(g,0,H*.06,W,H*.05,C.mustard,{sw:2.4});zigzag(g,0,H*.065,W,H*.035,C.verm,Math.round(W/30));
  g.fillStyle=C.brown;g.fillRect(0,A.fy,W,H-A.fy);R.rect(g,0,A.fy,W,20,C.mustard,{sw:2.4});diamonds(g,0,A.fy+40,W,30,ca(C.mustard,.7),Math.round(W/60));
  paintDoorFrame(g,A.door);paintDoorLeaves(g,A.door,false)}
function corrScene(){const s=mk({id:'corr',deep:0,breeze:0,shadow:0,lamps:null,layout(){return corrGeo()},
  draw(ctx){const A=this.anch(),W=L.W,H=L.H;if(!this.lamps)this.lamps=A.lamps.map(p=>lamp(p.x,p.y,L.cs*.8,{lit:1}));this.lamps.forEach((l,i)=>{l.x=A.lamps[i].x;l.y=A.lamps[i].y});
    Bake.draw(ctx,'corrS',0,0,W,H,(g,w,h)=>paintCorr(g,w,h,A,'sunset'));if(this.deep>0){ctx.save();ctx.globalAlpha=this.deep;Bake.draw(ctx,'corrD',0,0,W,H,(g,w,h)=>paintCorr(g,w,h,A,'dusk'));ctx.restore()}
    ctx.fillStyle=ca(C.verm,.1+.12*this.deep);ctx.fillRect(0,0,W,H);
    if(this.shadow>0){const d=A.door,len=this.shadow*W*.45;ctx.save();const y0=A.fy+4;poly(ctx,[[d.x+d.w*.25,y0],[d.x+d.w*.75,y0],[d.x+d.w*.5-len,y0+70],[d.x+d.w*.2-len*1.05,y0+56]],ca(C.indigo,.92));
      for(let i=0;i<6;i++)dot(ctx,d.x+d.w*.45-len*i/6,y0+18,3,ca(C.charcoal,.6));ctx.restore()}
    windLines(ctx,0,H*.25,W,H*.5,1,this.breeze,T.sec,6);
    this.lamps.forEach(l=>drawLamp(ctx,l));this.drawActors(ctx);drawBorder(ctx,false)}});return s}
async function shot1_10(){const s=corrScene();D.setScene(s,'wipe');const c=s.add('chiku',new Actor('chiku',0,0,1,-1,'idle'),'c');const b=s.add('bijli',new Actor('bijli',0,0,1,-1,'idle'),'b');
  c.set('idle',{lookX:-.3});Music.mood('night');await D.wait(1200);
  await D.tw(s,{deep:1},3200);
  AU.sfx('wind',{dur:3,pan:-.6});D.tw(s,{breeze:1},800).then(()=>D.wait(2200)).then(()=>D.tw(s,{breeze:0},1000)).catch(()=>{});await D.wait(1300);
  const L3=s.lamps[3],L6=s.lamps[6];for(const l of[L3,L6]){D.tw(l,{lean:.8,lit:.55},400).then(()=>D.tw(l,{lean:-.3,lit:.8},300)).then(()=>D.tw(l,{lean:0,lit:1},500)).catch(()=>{});await D.wait(900)}
  b.set('worry');b.f=1;b.tp.head=-.05;await D.wait(600);
  await D.say('bijli','Chiku… the sun is setting.',{vol:.7});
  c.f=1;c.set('idle',{lookX:1,brow:'worry',mouth:'flat'});await D.wait(700);
  await D.say('dadi','Nine little flames glowed in the palace. But the prophecy had not changed. Somewhere beyond the doorway, the night was approaching.');
  await D.say('dadi','And Chiku was about to discover that a little light becomes much stronger when everyone helps protect it.');
  c.set('worry',{lookX:1});await D.tw(s,{shadow:1},3200,'io');await D.wait(2400)}
