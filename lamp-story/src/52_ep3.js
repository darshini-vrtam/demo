/* ================= EPISODE 3: THE NIGHT OF STORIES ================= */
function doorSetup3(){const s=doorScene();s.open=1;s.still=1;const A=s.anch();
  s.add('chiku',new Actor('chiku',0,0,1,1,'worry'),'c');s.add('kesar',new Actor('kesar',0,0,1,-1,'idle'),'k');s.add('bijli',new Actor('bijli',0,0,1,1,'worry'),'b');
  const y=s.add('yama',new Actor('yama',0,0,1,1,'stand'),'y');y.f=1;return s}
/* ---------- 3.1 a guest nobody expected ---------- */
async function shot3_1(){D.black=1;await titleCard(3,'The Night of Stories',true);D.chip('Episode 3 · The Night of Stories');await previously(3);Music.mood('night');Music.setLevel(.35,2);
  const s=doorSetup3();const A=s.anch(),c=s.cast.chiku,k=s.cast.kesar,b=s.cast.bijli,y=s.cast.yama;
  s.cam.fx=L.W/2;s.cam.fy=A.y.y;s.cam.z=1.75;s.cam.y=0;D.setScene(s,'fade',900);AU.sfx('creak');
  await D.wait(1400);await D.tw(s.cam,{y:L.portrait?330:300},3600,'io');await D.wait(700);
  await D.tw(s.cam,{z:1,y:0},2200,'io');y.set('speak');
  await D.say('yama','I am Yama, Lord of Endings. I have come for Prince Anand.');y.set('stand');
  c.set('worry',{lookX:.6});b.set('worry',{lookX:1});await D.say('dadi','Chiku is frightened, but Kesar remembers her plan.');
  k.set('welcome',{lookX:-.5});await D.say('kesar','You have travelled a long way. Please sit, honoured guest. Would you like to hear a story while you rest?');
  y.set('listen');y.tp.surp=1;y.tp.tilt=.12;await D.wait(500);await D.say('yama','A story?');
  k.set('explain',{lookX:-.5});await D.say('kesar','Every guest deserves a welcome.');y.set('stand');y.tp.surp=0;y.tp.soft=.45;y.tp.tilt=.06;k.set('smile');c.set('idle',{lookX:.5});await D.wait(900)}
/* ---------- 3.2 the rug and the choice of story ---------- */
function rugGeo(){const W=L.W,H=L.H,P=L.portrait;const fy=H*(P?.74:.86);
  return P?{fy,rug:{x:W*.06,y:fy-260,w:W*.88,h:360},y:{x:W*.5,y:fy-150,s:L.cs*.95,f:-1},c:{x:W*.24,y:fy+30,s:L.cs*.95,f:1},k:{x:W*.77,y:fy+30,s:L.cs*.95,f:-1},b:{x:W*.2,y:fy-170,s:L.cs*.8,f:1}}
    :{fy,rug:{x:W*.12,y:fy-120,w:W*.76,h:180},y:{x:W*.56,y:fy-10,s:L.cs,f:-1},c:{x:W*.33,y:fy+20,s:L.cs,f:1},k:{x:W*.79,y:fy+20,s:L.cs,f:-1},b:{x:W*.17,y:fy,s:L.cs*.85,f:1}}}
function paintRugRoom(g,W,H,A){g.fillStyle=C.indigo;g.fillRect(0,0,W,H);R.rect(g,0,H*.05,W,A.fy-H*.05,ca(C.terra,.85),{sw:3});
  const n=L.portrait?3:5;for(let i=0;i<n;i++){const x=W*(i+.5)/n,w=L.portrait?150:120,h=w*1.3,y=H*(L.portrait?.2:.24);R.poly(g,archPts(x-w/2-12,y-12,w+24,h+24),C.mustard,{sw:2.6});R.poly(g,archPts(x-w/2,y,w,h),C.indigo,{sw:2.6});withT(g,x,y+h-14,1,1,c=>drawDiya(c,0,0,.9,{lit:1,glow:true}))}
  g.fillStyle=C.brown;g.fillRect(0,A.fy-40,W,H);const r=A.rug;R.rect(g,r.x,r.y,r.w,r.h,C.verm,{sw:3});R.rect(g,r.x+16,r.y+16,r.w-32,r.h-32,C.mustard,{sw:2.4});R.rect(g,r.x+30,r.y+30,r.w-60,r.h-60,C.verm,{sw:2.4});
  diamonds(g,r.x+40,r.y+r.h/2-20,r.w-80,40,C.ivory,Math.round(r.w/60));for(let x=r.x+10;x<r.x+r.w;x+=22){strokeL(g,[[x,r.y+r.h],[x,r.y+r.h+16]],C.mustard,3);strokeL(g,[[x,r.y],[x,r.y-14]],C.mustard,3)}}
function rugScene(){const s=mk({id:'rug',layout(){return rugGeo()},draw(ctx){const A=this.anch(),W=L.W,H=L.H;Bake.draw(ctx,'rug',0,0,W,H,(g,w,h)=>paintRugRoom(g,w,h,A));this.drawActors(ctx);drawBorder(ctx,true)}});return s}
function rugSetup(){const s=rugScene();const y=s.add('yama',new Actor('yama',0,0,1,-1,'listen'),'y');y.extra.seated=true;y.extra.staff=false;y.p.soft=y.tp.soft=.45;
  const c=s.add('chiku',new Actor('chiku',0,0,1,1,'idle'),'c');c.extra.seated=true;const k=s.add('kesar',new Actor('kesar',0,0,1,-1,'smile'),'k');k.extra.seated=true;s.add('bijli',new Actor('bijli',0,0,1,1,'idle'),'b');return s}
function cardMonkey(g){g.fillStyle=ca(C.leaf,.5);g.fillRect(0,14,400,222);motifTree(g,60,236,.8,1);motifTree(g,350,236,.7,0);drawMonkey(g,200,236,.62,'silly',1.2,1,c=>drawDiya(c,30,-190,.8,{lit:1,glow:true}))}
function cardStar(g){g.fillStyle=C.indigo;g.fillRect(0,14,400,222);for(let i=0;i<30;i++)dot(g,(i*67)%400,20+(i*41)%180,2.2,C.gold);drawTara(g,200,220,.5,'happy',.5,1);paintHills(g,0,200,400,36,[ca(C.indigo,.7),C.leaf],2)}
async function shot3_2(){const s=rugSetup();D.setScene(s,'wipe');const c=s.cast.chiku,y=s.cast.yama;
  await D.say('dadi','Now you are the storyteller. If you wanted someone to stay and listen, what kind of story would you tell?');
  const k=await D.choice('e3d1',[{key:'A',title:'A funny monkey story',label:'A funny story about a monkey who mistakes a lamp for a fruit.',draw:cardMonkey},{key:'B',title:'A magical star story',label:'A magical story about a tiny star searching for a home.',draw:cardStar}]);
  c.set('smile');y.tp.soft=.5;await D.wait(400);return k}
/* ---------- 3.3 tell the tale ---------- */
const TALES={A:{name:'Bholu',open:'Once, in a green forest, there lived a little monkey named Bholu, who loved fruit more than anything.',
    beats:["One evening, Bholu saw something round and golden glowing in the village. 'What is that?' he gasped.","'A mango! A shining mango!' He grabbed it and took a big bite. But it was a clay lamp!",
      "A little girl laughed kindly. 'Lamps are for light, not for lunch,' she said, and gave him a real mango.","Then the wind blew, and the lamp shivered. Bholu cupped his paws around it until the flame stood tall.",
      "From then on, Bholu guarded the lamps every Dhanteras, and ate only mangoes. Well, mostly."]},
  B:{name:'Tara',open:'High above the world lived Tara, a tiny star who had never found a place to belong.',
    beats:["One night, Tara saw a hundred little lights twinkling below. 'Stars on the ground?' she whispered.","She zoomed down so fast that she landed, plop, in a pot of water, and fizzled.",
      "A small clay lamp called out, 'Come and rest by my flame.'","Together they glowed so brightly that a lost family found their way home.","And Tara decided her home was wherever someone needed light."]}};
const SUGGEST=['surprised','silly','happy','brave','happy'];
function paintTale(g,W,H,kind){const b=borderSize();if(kind==='A'){g.fillStyle=C.mustard;g.fillRect(0,0,W,H);for(let i=0;i<8;i++)wavyBand(g,0,H*(.1+i*.11),W,H,i%2?ca(C.leaf,.35):ca(C.terra,.25),10,i+2);
    const r=rng(8);for(let i=0;i<16;i++){const x=r()*W,y=H*(.35+r()*.4);motifTree(g,x,y,.7+r()*.6,r()<.5?1:0)}g.fillStyle=C.leaf;g.fillRect(0,H*.78,W,H*.22);zigzag(g,0,H*.78,W,20,C.terra,Math.round(W/30))}
  else{paintSky(g,0,0,W,H,'night');const r=rng(4);for(let i=0;i<12;i++){const x=r()*W,y=r()*H*.6;ring(g,x,y,10+r()*16,ca(C.ivory,.5),2);sparkle(g,x,y,8,C.gold)}g.fillStyle=ca(C.indigo,1);paintHills(g,0,H*.62,W,H*.2,[ca(C.leaf,.8),C.indigo],3);g.fillStyle=C.indigo;g.fillRect(0,H*.8,W,H*.2)}
  const f=b+12;R.rect(g,f,f,W-2*f,H-2*f,null,{sw:14,stroke:C.mustard});R.rect(g,f-8,f-8,W-2*f+16,H-2*f+16,null,{sw:3,stroke:C.brown});paintBorder(g,W,H,kind==='B')}
function taleScene(kind){const s=mk({id:'tale',beat:0,expr:'calm',ek:1,intro:0,party:0,layout(){const W=L.W,H=L.H,P=L.portrait;return{hero:{x:W*(P?.5:.42),y:H*(P?.66:.8),s:P?1.5:1.3}}},
  draw(ctx){const A=this.anch(),W=L.W,H=L.H,t=T.sec,h=A.hero,bt=this.beat;ctx.save();if(this.intro<1){const k=Ease.out(this.intro),sc=lerp(.3,1,k);ctx.translate(W/2,H/2);ctx.scale(sc,sc);ctx.translate(-W/2,-H/2);ctx.globalAlpha=lerp(.2,1,k)}
    Bake.draw(ctx,'tale'+kind,0,0,W,H,(g,w,hh)=>paintTale(g,w,hh,kind));
    const ex=this.expr,k=this.ek;const P=L.portrait;
    if(kind==='A'){
      if(bt===1){drawDiya(ctx,W*(P?.78:.8),H*(P?.42:.5),1.4,{lit:1,glow:true,t})}
      if(bt===3){drawFolk(ctx,W*(P?.8:.72),h.y,1.1,{child:true,top:C.verm,hair:'bun',arm:1,f:-1,hold:c=>{R.ell(c,-62,-160,34,26,C.mustard,{sw:2.4});poly(c,[[-62,-174],[-50,-186],[-56,-170]],C.leaf)}})}
      if(bt===4){windLines(ctx,0,H*.3,W*.5,H*.3,1,1,t,3);drawDiya(ctx,h.x+90*h.s,h.y-10,1.5,{lit:1,glow:true,t,lean:Math.sin(t*3)*.2})}
      if(bt===5){for(let i=0;i<5;i++)drawDiya(ctx,W*(.62+i*.07)-(P?W*.3:0),h.y+(P?120:0),1,{lit:1,glow:true,t,seed:i})}
      drawMonkey(ctx,h.x,h.y,h.s*.9,ex,t,k,bt===2?c=>{c.save();c.translate(36,-178);drawDiya(c,0,0,.9,{lit:.6,t});c.restore()}:bt===5?c=>{R.ell(c,48,-90,40,30,C.mustard,{sw:2.4})}:null)}
    else{
      if(bt===1){for(let i=0;i<24;i++){const x=W*(.1+(i%12)*.075),y=H*(.72+Math.floor(i/12)*.06);dot(ctx,x,y,6,C.gold);dot(ctx,x,y,14,ca(C.gold,.2))}}
      if(bt===2){withT(ctx,W*(P?.72:.7),H*.8,1.3,1,c=>{R.path(c,'M-80 0 C -100 -80 -60 -130 0 -130 C 60 -130 100 -80 80 0 Z',C.terra,{sw:3});R.ell(c,0,-124,120,22,C.indigo,{sw:2.4});for(let i=0;i<5;i++)dot(c,-40+i*20,-150-Math.abs(Math.sin(t*4+i))*20,5,C.ivory)})}
      if(bt>=3){const lx=W*(P?.74:.66),ly=h.y-(P?40:0);drawDiya(ctx,lx,ly,1.8,{lit:1,glow:true,t});dot(ctx,lx-18,ly-6,4,C.charcoal);dot(ctx,lx+2,ly-6,4,C.charcoal)}
      if(bt===4){for(let i=0;i<3;i++)drawFolk(ctx,W*(P?.2+i*.14:.12+i*.08),H*.86,P?.9:.75,{child:i===2,top:[C.mustard,C.leaf,C.verm][i],hair:i===0?'turban':null})}
      if(bt===5){withT(ctx,W*(P?.74:.66),h.y+20,1.2,1,c=>{R.rect(c,-120,-220,240,220,C.ivory,{sw:3});R.poly(c,[[-140,-220],[0,-310],[140,-220]],C.verm,{sw:3});R.rect(c,-50,-170,100,90,C.gold,{sw:2.4})})}
      drawTara(ctx,h.x,h.y-(bt===2?-40:0),h.s*(bt===2?.6:.85),ex,t,k)}
    if(this.party>0){for(let i=0;i<24;i++){const a=i/24*TAU+t*.6,r=200+Math.sin(t*2+i)*40;const x=h.x+Math.cos(a)*r*1.3,y=h.y-200+Math.sin(a)*r*.8;ctx.globalAlpha=this.party;i%2?sparkle(ctx,x,y,12,C.gold):motifMarigold(ctx,x,y,9);ctx.globalAlpha=1}}
    ctx.restore()}});return s}
function faceIcon(g,w,ex){g.fillStyle=C.ivory;g.fillRect(0,0,w,w);const e=EXPR[ex];g.save();g.translate(w/2,w/2+8);const s=w/150;g.scale(s,s);
  R.circ(g,0,0,110,C.terra,{sw:3});drawFace(g,{ex:22,ey:-6,ew:26,eh:22,sh:5,lookX:0,lookY:0,brow:e.brow,mouth:e.mouth,eyes:e.eyes,my:22,mw:28,pupil:.42,cheek:ex==='happy'});g.restore()}
async function pickFace(sug){const tray=$('faces');tray.innerHTML='';const tok=D.token;let resolve;const done=new Promise(r=>resolve=r);let picked=false;
  const names={surprised:'Surprised',silly:'Silly',happy:'Happy',brave:'Brave'};const els={};
  Object.keys(names).forEach(ex=>{const b=document.createElement('button');b.className='face';b.type='button';b.setAttribute('aria-label',names[ex]);const cn=document.createElement('canvas');const sp=document.createElement('span');sp.textContent=names[ex];b.append(cn,sp);tray.append(b);els[ex]=b;
    b.addEventListener('click',()=>{if(picked)return;picked=true;AU.sfx('card');b.classList.add('on');resolve(ex)})});
  tray.hidden=false;await new Promise(r=>requestAnimationFrame(r));Object.values(els).forEach((b,i)=>{const cn=b.querySelector('canvas');const r=cn.getBoundingClientRect(),dp=Math.min(2,devicePixelRatio||1);cn.width=r.width*dp;cn.height=r.height*dp;const g=cn.getContext('2d');g.scale(cn.width/150,cn.width/150);faceIcon(g,150,Object.keys(names)[i])});
  D.trayPx=tray.getBoundingClientRect().height;tw(D,{inset:1},D.fast?10:500);D.lastInput=performance.now();
  let held=null,heldT=0;const iv=setInterval(()=>{if(picked)return;const fe=D.faceExpr;Object.entries(els).forEach(([k,b])=>b.classList.toggle('on',k===fe));
    if(fe&&fe===held){if(performance.now()-heldT>1200)els[fe].click()}else{held=fe;heldT=performance.now()}},120);
  const spec={start:()=>done,hint(){els[sug].classList.add('on');D.say('dadi','Choose a face for this moment.').catch(()=>{})},assist(){els[sug].click()}};
  try{await D.activity(spec)}finally{clearInterval(iv)}const ex=await done;await D.wait(D.fast?5:350);D.guard(tok);tray.hidden=true;tw(D,{inset:0},D.fast?10:450);return ex}
async function shot3_3(kind){kind=kind||Store.choice('e3d1')||'A';const tale=TALES[kind];const s=taleScene(kind);D.setScene(s,'fade',700);await D.tw(s,{intro:1},1000,'out');
  await D.say('chiku',tale.open);let first=true;
  for(let i=0;i<5;i++){s.beat=i+1;s.expr='calm';if(i>0){D.setScene(s,'wipe',800);await D.wait(600)}
    await D.say('chiku',tale.beats[i]);if(first){first=false;await D.say('dadi','How does '+tale.name+' feel? Tap a face, or make one.')}
    const ex=await pickFace(SUGGEST[i]);s.expr=ex;s.ek=0;AU.sfx(ex==='surprised'?'hop':ex==='silly'?'oops':ex==='brave'?'land':'find');await D.tw(s,{ek:1},900);await D.wait(900)}
  s.expr='happy';Music.swell();AU.sfx('chime');await D.tw(s,{party:1},800);await D.wait(2200)}
/* ---------- 3.4 Yama wants another story ---------- */
function yamaCloseGeo(){const W=L.W,H=L.H,P=L.portrait;return{y:{x:W*(P?.6:.6),y:H*(P?.98:1.16),s:P?2.4:1.75,f:-1},c:{x:W*(P?.2:.16),y:H*(P?.96:1.08),s:P?1.7:1.4,f:1},frame:P?{x:W*.08,y:H*.08,w:W*.4,h:W*.32}:{x:W*.08,y:H*.08,w:W*.26,h:H*.32}}}
function yamaCloseScene(kind){const s=mk({id:'yclose',layout(){return yamaCloseGeo()},draw(ctx){const A=this.anch(),W=L.W,H=L.H;
  Bake.draw(ctx,'ycl'+kind,0,0,W,H,(g,w,h)=>{g.fillStyle=C.indigo;g.fillRect(0,0,w,h);R.rect(g,0,h*.04,w,h*.96,ca(C.terra,.8),{sw:3});for(let i=0;i<Math.round(w/120);i++)motifFlower(g,w*(i+.5)/Math.round(w/120),h*.12+((i%2)*30),20,C.mustard,C.verm);
    const f=A.frame;R.rect(g,f.x-14,f.y-14,f.w+28,f.h+28,C.mustard,{sw:3});g.save();g.beginPath();g.rect(f.x,f.y,f.w,f.h);g.clip();g.translate(f.x,f.y);g.scale(f.w/400,f.h/250);(kind==='A'?cardMonkey:cardStar)(g);g.restore();R.rect(g,f.x,f.y,f.w,f.h,null,{sw:3})});
  this.drawActors(ctx);drawBorder(ctx,true)}});return s}
async function shot3_4(){const kind=Store.choice('e3d1')||'A';const s=yamaCloseScene(kind);D.setScene(s,'wipe');const y=s.add('yama',new Actor('yama',0,0,1,-1,'stand'),'y');y.extra.staff=false;y.p.soft=y.tp.soft=.3;
  const c=s.add('chiku',new Actor('chiku',0,0,1,1,'smile'),'c');
  await D.say('dadi','Yama listens. His stern expression softens.');await D.tw(y.tp,{drop:9,soft:1},4000,'io');y.set('relax');y.tp.soft=1;y.tp.drop=9;
  await D.wait(600);y.talking=false;await D.say('yama','Another story, little one.');
  c.set('smile',{lookX:1});await D.say('chiku','We have many more. But will you stay until we finish?');
  await D.say('yama','A good story deserves to be heard.');y.tp.soft=1;await D.wait(700)}
/* ---------- 3.5 the last lamp ---------- */
function lastGeo(){const W=L.W,H=L.H,P=L.portrait;const ls=P?1.7:1.5;const lp={x:W/2,y:H*(P?.6:.66)};const cs=P?2.3:2;
  return{lp,ls,ped:{x:lp.x,y:lp.y+10*ls},c:{x:lp.x-70*cs,y:lp.y-8*ls+167*cs,s:cs,f:1},b:{x:W*(P?.86:.87),y:H*(P?.84:.9),s:P?1.5:1.3,f:-1},
    niche:P?{x:W*.18,y:H*.3}:{x:W*.15,y:H*.36},win:P?{x:W*.62,y:H*.12,w:W*.3,h:H*.16}:{x:W*.68,y:H*.08,w:W*.2,h:H*.3}}}
function paintLast(g,W,H,A,mood){g.fillStyle=C.indigo;g.fillRect(0,0,W,H);const r=rng(13);for(let i=0;i<40;i++)dot(g,r()*W,r()*H,2.4,ca(C.ivory,.25));
  const w=A.win;archSky(g,w,mood);R.poly(g,archPts(w.x-12,w.y-12,w.w+24,w.h+24),null,{sw:3,stroke:C.mustard});
  const n=A.niche,nw=L.portrait?200:180,nh=nw*1.25;R.poly(g,archPts(n.x-nw/2-14,n.y-nh/2-14,nw+28,nh+28),C.mustard,{sw:3});R.poly(g,archPts(n.x-nw/2,n.y-nh/2,nw,nh),C.charcoal,{sw:3});dotRow(g,n.x-nw/2+10,n.y+nh/2-8,nw-20,16,3,C.gold)}
function lastScene(){const s=mk({id:'last',L1:null,cup:0,prog:0,dawn:0,layout(){return lastGeo()},
  draw(ctx){const A=this.anch(),W=L.W,H=L.H;if(!this.L1)this.L1=lamp(A.lp.x,A.lp.y,A.ls,{lit:1});const l=this.L1;if(!this.moved){l.x=A.lp.x;l.y=A.lp.y}l.s=A.ls;
    Bake.draw(ctx,'lastN',0,0,W,H,(g,w,h)=>paintLast(g,w,h,A,'night'));if(this.dawn>0){ctx.globalAlpha=this.dawn;Bake.draw(ctx,'lastP',0,0,W,H,(g,w,h)=>paintLast(g,w,h,A,'predawn'));ctx.globalAlpha=1}
    this.drawActors(ctx);
    withT(ctx,A.ped.x,A.ped.y,A.ls,1,c=>{R.rect(c,-60,0,120,200,C.brown,{sw:3});R.rect(c,-70,0,140,18,C.mustard,{sw:2.4});diamonds(c,-50,40,100,30,C.mustard,3)});
    if(this.prog>0){ctx.beginPath();ctx.arc(l.x+6*l.s,l.y-30*l.s,92*l.s/1.5,-Math.PI/2,-Math.PI/2+TAU*this.prog);ctx.strokeStyle=C.gold;ctx.lineWidth=10;ctx.lineCap='round';ctx.stroke()}
    drawLamp(ctx,l);
    if(this.cup>0){ctx.save();ctx.globalAlpha=this.cup;for(const sd of[-1,1]){withT(ctx,l.x+sd*44*l.s+6*l.s,l.y-22*l.s,l.s,sd,c=>{R.path(c,'M0 20 C 18 6 22 -30 6 -46 C -4 -40 -8 -10 -10 18 Z',C.terra,{sw:2.6})})}ctx.restore()}
    if(this.hintR>0)ring(ctx,l.x,l.y-30*l.s,110+8*Math.sin(T.sec*5),ca(C.gold,.7*this.hintR),4);
    drawBorder(ctx,true)}});return s}
async function shot3_5(){const s=lastScene();D.setScene(s,'wipe');const c=s.add('chiku',new Actor('chiku',0,0,1,1,'worry'),'c');const b=s.add('bijli',new Actor('bijli',0,0,1,-1,'worry'),'b');
  const A=s.anch();s.L1=lamp(A.lp.x,A.lp.y,A.ls,{lit:1});const l=s.L1;let wind=true;
  const iv=setInterval(()=>{if(!wind||l.out)return;if(s.safe){l.lean*=.8;l.lit=lerp(l.lit,1,.2)}else{l.lean=.55+Math.sin(T.sec*3)*.35;l.lit=.72+Math.sin(T.sec*17)*.1}},40);
  try{AU.sfx('wind',{dur:3,pan:.5});c.set('worry',{lookX:.3,lookY:.6});
    await D.say('chiku','The lamp! If it goes out, the doorway will become dark!');
    await D.say('dadi','All through the night, Chiku had been helping Kesar keep the lamps bright. Now only one flame remained to be protected.');
    await D.say('dadi','Imagine that you are Chiku. The wind is growing stronger, and the lamp is trembling. What will you do?');
    const k=await D.choice('e3d2',[{key:'A',label:'Cup your hands around the lamp.',draw(g){g.fillStyle=C.indigo;g.fillRect(0,14,400,222);drawDiya(g,200,170,1.6,{lit:1,glow:true});for(const sd of[-1,1])withT(g,200+sd*72+10,138,1.6,sd,c=>R.path(c,'M0 20 C 18 6 22 -30 6 -46 C -4 -40 -8 -10 -10 18 Z',C.terra,{sw:2.6}))}},
      {key:'B',label:'Move the lamp to a sheltered place.',draw(g){g.fillStyle=C.indigo;g.fillRect(0,14,400,222);R.poly(g,archPts(220,50,130,160),C.charcoal,{sw:3});drawDiya(g,285,200,1.1,{lit:1,glow:true});strokeL(g,[[90,180],[190,170]],C.gold,5);poly(g,[[190,160],[214,170],[190,182]],C.gold)}}]);
    let exposure=0,last=performance.now(),resolve;const done=new Promise(r=>resolve=r);
    const relight=async()=>{if(l.relighting)return;l.relighting=true;await D.wait(900);c.set('protect');await lightLamp(l,800);l.out=false;l.relighting=false;exposure=0;c.set('worry',{lookX:.3,lookY:.6})};
    const tick=setInterval(()=>{const now=performance.now(),dt=(now-last)/1000*D.speed;last=now;if(l.out)return;
      if(s.safe){if(k==='A')s.prog=Math.min(1,s.prog+dt/4);else s.prog=Math.min(1,s.prog+dt/3);exposure=0;if(s.prog>=1)resolve()}
      else{exposure+=dt;if(exposure>8){l.out=true;AU.sfx('oops');tw(l,{lit:0},500);relight()}}},50);
    if(k==='A'){s.down=p=>{if(near(p,l.x,l.y-30*l.s,260)){s.safe=true;c.set('protect');tw(s,{cup:1},250);D.lastInput=performance.now()}};
      s.up=()=>{if(s.safe&&s.prog<1){s.safe=false;tw(s,{cup:0},250);c.set('worry',{lookX:.3,lookY:.6})}};
      await D.activity({start:()=>done,hint(){s.hintR=1;D.say('dadi','Press and hold the lamp to cup your hands around it.').catch(()=>{})},assist(){s.safe=true;s.hintR=0;c.set('protect');tw(s,{cup:1},250)}})}
    else{const N=A.niche;s.down=p=>{if(!s.safe&&near(p,l.x,l.y-20*l.s,140)){s.drag=true;s.moved=true;c.set('reach',{lookX:-.5});D.lastInput=performance.now()}};
      s.move=p=>{if(s.drag){l.x=p.x;l.y=p.y+20}};
      s.up=()=>{if(!s.drag)return;s.drag=false;if(Math.hypot(l.x-N.x,l.y-N.y-60)<170){tw(l,{x:N.x,y:N.y+(L.portrait?110:100)},300);s.safe=true;AU.sfx('place');c.set('smile',{lookX:-.6})}else{tw(l,{x:A.lp.x,y:A.lp.y},400).then(()=>s.moved=false);c.set('worry')}};
      await D.activity({start:()=>done,hint(){s.hintR=1;D.say('dadi','Drag the lamp into the sheltered corner.').catch(()=>{})},assist(){if(s.safe)return;s.moved=true;s.hintR=0;tw(l,{x:N.x,y:N.y+(L.portrait?110:100)},900).then(()=>{s.safe=true;AU.sfx('place')})}})}
    clearInterval(tick);s.down=s.move=s.up=null;s.hintR=0;wind=false;
    await D.tw(l,{lean:0,lit:1},600);c.set('smile');b.set('smile');Music.swell();
    await D.tw(s,{prog:0},300);
    const dawn=D.tw(s,{dawn:1},5000).catch(()=>{});await D.say('dadi','Chiku protected the flame. The lamp flickered, wavered, and then steadied. Outside, the sky began to change colour.');await dawn}
  finally{clearInterval(iv)}}
/* ---------- 3.6 morning arrives ---------- */
async function shot3_6(){const s=doorSetup3();s.sky=['night','predawn'];s.skyK=0;const A=s.anch(),c=s.cast.chiku,k=s.cast.kesar,b=s.cast.bijli,y=s.cast.yama;
  y.extra.seated=true;y.extra.staff=false;y.p.soft=y.tp.soft=1;y.p.drop=y.tp.drop=8;y.set('relax');y.tp.soft=1;c.set('smile');b.set('smile');k.set('smile');D.setScene(s,'fade',1000);
  await D.tw(s,{skyK:1},3500);s.sky=['predawn','sunrise'];s.skyK=0;D.tw(s,{birds:1},3000).catch(()=>{});AU.sfx('rooster');await D.tw(s,{skyK:1},3500);Music.swell();await D.tw(s,{rays:1},1600);
  await D.say('dadi','A rooster crows. The first golden rays of sunrise reach the palace.');
  y.extra.seated=false;y.sy=.85;await D.tw(y,{sy:1},600,'back');y.extra.staff=true;y.set('speak');y.tp.soft=1;y.tp.drop=6;
  await D.say('dadi','Yama rises.');
  await D.say('yama','I came to end a night. Instead, I found a home filled with light and stories. You welcomed me when you could have met me only with fear.');
  y.set('bow');y.tp.soft=1;await D.wait(1600);
  y.set('speak');y.tp.soft=1;await D.say('yama','Let a lamp be lit for me at the doorway each year.');
  k.set('welcome');await D.say('kesar','You will be welcomed with light.');y.set('relax');y.tp.soft=1;Music.swell();await D.wait(3200)}
/* ---------- 3.7 the first lamp of Panch Deep ---------- */
function shelfGeo(){const W=L.W,H=L.H,P=L.portrait;const sy=H*(P?.42:.5);const sp=P?(W*.84)/5:Math.min(W*.15,260);
  return{sy,slots:[0,1,2,3,4].map(i=>({x:W/2+(i-2)*sp,y:sy})),nw:sp*.72,fy:H*(P?.86:.98),
    c:{x:W*(P?.22:.24),y:H*(P?.86:.98),s:L.cs*(P?.95:.9),f:1},b:{x:W*(P?.46:.4),y:H*(P?.86:.98),s:L.cs*.85,f:-1},d:{x:W*(P?.78:.76),y:H*(P?.86:.98),s:L.cs*(P?.95:.9),f:-1}}}
function paintShelf(g,W,H,A){g.fillStyle=C.terra;g.fillRect(0,0,W,H);const r=rng(55);
  for(let y=60;y<H;y+=120)for(let x=60;x<W;x+=150){const k=(Math.floor(x/150)+Math.floor(y/120))%4;const jx=x+(r()-.5)*20,jy=y+(r()-.5)*20;
    if(Math.abs(jy-A.sy)<A.nw*1.2)continue;if(k===0)motifHorse(g,jx,jy+30,.5,ca(C.ivory,.8),C.indigo,1);else if(k===1)motifFlower(g,jx,jy,18,ca(C.mustard,.9),C.verm);else if(k===2)motifElephant(g,jx,jy+30,.42,ca(C.indigo,.8),C.mustard,-1);else motifMarigold(g,jx,jy,12)}
  R.rect(g,0,A.sy+A.nw*.42,W,40,C.brown,{sw:3});zigzag(g,0,A.sy+A.nw*.42+6,W,22,C.mustard,Math.round(W/30));
  A.slots.forEach(p=>{const w=A.nw,h=w*1.2;R.poly(g,archPts(p.x-w/2-12,p.y-h*.62-12,w+24,h+24),C.mustard,{sw:3});R.poly(g,archPts(p.x-w/2,p.y-h*.62,w,h),C.indigo,{sw:3})})}
function shelfScene(){const s=mk({id:'shelf',lit:[0,0,0,0,0],trace:0,layout(){return shelfGeo()},draw(ctx){const A=this.anch(),W=L.W,H=L.H;Bake.draw(ctx,'shelf',0,0,W,H,(g,w,h)=>paintShelf(g,w,h,A));
  A.slots.forEach((p,i)=>{const ls=A.nw/120,ly=p.y+A.nw*.42;const lit=this.lit[i];if(i===0&&this.trace>0){ctx.beginPath();ctx.ellipse(p.x+4*ls,ly-8*ls,52*ls,30*ls,0,-Math.PI/2,-Math.PI/2+TAU*this.trace);ctx.strokeStyle=C.gold;ctx.lineWidth=7;ctx.lineCap='round';ctx.stroke()}
    drawDiya(ctx,p.x,ly-4,ls,{lit,glow:lit>0,t:T.sec,seed:i})});
  this.drawActors(ctx);drawBorder(ctx,false)}});return s}
function recapLine(){const ch=Store.data.choices;const parts=[];
  if(ch.e1d1)parts.push(ch.e1d1==='A'?'you listened to Bijli':'you checked the hallway carefully');
  if(ch.e2d1)parts.push(ch.e2d1==='A'?'you asked the market for help':"you asked the children's courtyard for help");
  if(ch.e3d1)parts.push(ch.e3d1==='A'?'you told the tale of the monkey and the lamp':'you told the tale of the tiny star');
  if(ch.e3d2)parts.push(ch.e3d2==='A'?'you cupped your hands around the last flame':'you carried the last flame to a sheltered corner');
  if(!parts.length)return null;const last=parts.pop();return'Tonight, little storyteller, '+(parts.length?parts.join(', ')+', and '+last:last)+'.'}
async function shot3_7(){const s=shelfScene();s.lit=Store.data.shelf.map((v,i)=>i===0?0:v);D.setScene(s,'wipe',1200);D.chip('Panch Deep · Your lamp shelf');
  const c=s.add('chiku',new Actor('chiku',0,0,1,1,'smile'),'c'),b=s.add('bijli',new Actor('bijli',0,0,1,-1,'smile'),'b'),d=s.add('dadi',new Actor('dadi',0,0,1,-1,'idle'),'d');[c,b,d].forEach(a=>a.alpha=0);
  await Promise.all([c,b,d].map(a=>D.tw(a,{alpha:1},800)));c.set('smile');d.set('wave');await D.wait(900);d.set('idle');
  const rc=recapLine();if(rc)await D.say('dadi',rc);
  await D.say('dadi','And that, little storyteller, is one traditional explanation associated with Yamadeepdan on Dhanteras. Chiku and Bijli\'s adventure is our own imagined journey, inspired by that folk tradition.');
  await D.say('dadi','Remember: you cannot always decide what arrives at your door. But you can decide how you meet it—with fear, with kindness, or with courage.');
  await Promise.all([c,b,d].map(a=>D.tw(a,{alpha:0},900)));
  await D.wait(400);const fl={k:0};AU.sfx('relight');await D.tw(s.lit,{0:1},1300,'out');AU.sfx('chime');Music.swell();await D.tw(s,{trace:1},1600,'io');Store.light(0);
  await D.wait(1200);$('end').hidden=false;D.chip('')}
