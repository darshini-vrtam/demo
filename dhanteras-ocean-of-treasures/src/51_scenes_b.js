/* ===== SCREEN 6 · The Churning Continues ===== */
const TREASURES=[{k:'lakshmi',name:'Lakshmi',theme:'Prosperity and well-being',fx:'Lotus petals open and a golden halo appears.'},
  {k:'airavata',name:'Airavata',theme:'Strength and majesty',fx:'The celestial elephant emerges through patterned foam.'},
  {k:'horse',name:'Uchchaihshravas',theme:'Energy and splendour',fx:'The radiant white horse rises with lines of movement.'},
  {k:'tree',name:'Kalpavriksha',theme:'Nature and abundance',fx:'Flowers and fruits appear on the branches.'}];
const S6={label:'Screen 6 of 8',title:'The Churning Continues',border:[C.coral,C.gold],
  alt:'The churning continues on a bright ocean. Four lotus-shaped windows float in front: Goddess Lakshmi on a pink lotus, the white elephant Airavata, the white horse Uchchaihshravas and the wishing tree Kalpavriksha.',
  enter(){this.st={rot:1.4,phase:0,pL:0,pR:0,open:[0,0,0,0],done:[false,false,false,false],tab:0,lot:0,rise:0,glow:0,armed:false,wonder:false}},
  geo(){return L.portrait?{cx:450,baseY:300,S:.45,spr:.62,sea:250,win:[[245,560,150],[665,575,118],[245,885,118],[665,885,118]]}
    :{cx:800,baseY:440,S:.6,spr:1,sea:360,win:[[280,712,150],[640,730,112],[960,730,112],[1290,730,112]]}},
  windowArt(g,k,x,y,r,p,t){const T_=TREASURES[k].k;g.save();g.beginPath();g.ellipse(x,y,r-3,r-3,0,0,TAU);g.clip();g.fillStyle=k===0?C.cream:C.turq;g.fillRect(x-r,y-r,r*2,r*2);
    rays(g,x,y,r*.2,r*1.1,18,k===0?C.gold:C.pale,t*.05,.6*p);
    if(T_==='lakshmi'){lotus(g,x,y+r*.72,r*.62,{col:C.pink,col2:C.coral,open:.3+.7*p});if(p>.2){g.globalAlpha=clamp((p-.2)/.4,0,1);halo(g,x,y+r*.6-170*r/195,40*r/150,t);person(g,'lakshmi','seated','serene',x,y+r*.6,r/195);g.globalAlpha=1}}
    else if(T_==='airavata'){airavata(g,x-r*.12,y+r*.62+(1-p)*r*.9,r/210)}
    else if(T_==='horse'){celestialHorse(g,x-r*.08,y+r*.6+(1-p)*r*.9,r/200,t)}
    else kalpavriksha(g,x,y+r*.82,r/240,p,t);
    if(T_==='airavata'||T_==='horse'||T_==='lakshmi'){sea(g,y+r*.62,y+r,{cols:[C.teal,C.turq],t,row:22,len:40,spd:10,dots:false})}
    const c=1-Ease.io(clamp(p*1.4,0,1));if(c>0){[-1,1].forEach(s=>{g.save();g.translate(s*r*1.1*(1-c),0);g.beginPath();g.rect(s<0?x-r:x,y-r,r,r*2);g.clip();g.fillStyle=C.teal;g.fillRect(x-r,y-r,r*2,r*2);Pat.waves(g,bb(x-r,y-r,r*2,r*2),C.pale,24,2);Pat.dots(g,bb(x-r,y-r,r*2,r*2),C.turq,18,2);g.restore()})}
    g.restore();ring(g,x,y,r,C.ink,3)},
  drawMain(g,t){const st=this.st,o=this.geo();skyField(g,C.deep,{seed:61,density:7500,maxY:o.sea});(L.portrait?[[150,90,.55],[740,100,.5]]:[[200,100,.8],[1420,110,.8]]).forEach(([x,y,s])=>cloud(g,x,y,s,C.cream,C.ink));
    sea(g,o.sea,L.B.y+L.B.h,{cols:[C.turq,C.coral,C.gold,C.turq],t,row:46,len:96,line:C.pale});
    churnScene(g,st,{cx:o.cx,baseY:o.baseY,S:o.S,spr:o.spr,t,water:[C.turq,C.gold],devPose:st.wonder?'wonder':'pull',asuPose:st.wonder?'wonder':'pull',devMood:st.wonder?'wonder':'happy',asuMood:st.wonder?'wonder':'happy'});
    o.win.forEach(([x,y,r],k)=>{lotusFrame(g,x,y,r,{n:k===0?22:18,c1:C.gold,c2:k===0?C.pink:C.coral});this.windowArt(g,k,x,y,r,st.open[k],t);
      if(st.done[k])tick(g,x+r*.74,y+r*.74,r*.16);else if(st.armed)hotIcon(g,x,y-r-14,14,t+k,'shell')})},
  drawTableau(g,t){const st=this.st,P=L.portrait,cx=P?450:800,seaY=P?600:520;skyField(g,C.deep,{seed:62,density:7500,maxY:seaY});
    sea(g,seaY,L.B.y+L.B.h,{cols:[C.turq,C.gold,C.coral],t,row:46,len:96});
    const ly=P?960:830,lr=P?210:240;mandala(g,cx,ly-lr*1.1,lr*1.2*st.lot,{p:st.lot,cols:[C.gold,C.pink,C.cream,C.coral],rot:t*.04});rays(g,cx,ly-lr*1.1,lr*1.15,lr*1.55*Math.max(.8,st.lot),28,C.gold,t*.03,st.lot*.8);
    const gy=P?720:600,gs=P?.42:.6;island(g,L.B.x-20,cx-(P?220:420),gy,60);island(g,cx+(P?220:420),L.B.x+L.B.w+20,gy,60);
    (P?[[60,'deva0'],[150,'deva1']]:[[150,'deva0'],[260,'deva1'],[370,'deva2']]).forEach(([x,k])=>person(g,k,'wonder','wonder',x,gy+6,gs));
    (P?[[750,'asura1'],[840,'asura0']]:[[1230,'asura2'],[1340,'asura1'],[1450,'asura0']]).forEach(([x,k])=>person(g,k,'wonder','wonder',x,gy+6,gs,true));
    /* the vast lotus opens first; Lakshmi rises out of its centre and sits on it */
    lotus(g,cx,ly,lr,{col:C.pink,col2:C.coral,open:.2+.8*st.lot});
    const s=P?1:1.15,lyF=ly-lr*.2+(1-st.rise)*lr*1.2;g.save();g.beginPath();g.rect(L.B.x,L.B.y,L.B.w,ly-lr*.12-L.B.y);g.clip();if(st.rise>.4){g.globalAlpha=clamp((st.rise-.4)/.4,0,1);halo(g,cx,lyF-172*s,60*s,t);g.globalAlpha=1}person(g,'lakshmi','seated','serene',cx,lyF,s);g.restore();
    if(st.glow>0){rings(g,cx,ly-20,60*st.glow,5,30,C.gold,5,st.glow)}},
  draw(g,t){const st=this.st;if(st.tab<1)this.drawMain(g,t);if(st.tab>0){g.globalAlpha=st.tab;this.drawTableau(g,t);g.globalAlpha=1}},
  hit(x,y){const st=this.st;if(!st.armed||st.tab>0)return null;const o=this.geo();for(let k=0;k<4;k++){const[wx,wy,r]=o.win[k];if(inCirc(x,y,wx,wy,r+10))return{tap:()=>this.reveal(k)}}return null},
  reveal(k){const st=this.st,T_=TREASURES[k];AU.sfx('sparkle');tw(st.open,{[k]:1},D.fast?2:1400,'out');
    const box=$('tbox');if(box){box.innerHTML='';const b=document.createElement('b');b.textContent=T_.name+': '+T_.theme;const p=document.createElement('span');p.textContent=T_.fx;
      const n=document.createElement('p');n.className='panelNote';n.textContent='The treasures and their order vary across traditional accounts; these are illustrative examples.';box.append(b,p,n);box.hidden=false}
    if(!st.done[k]){st.done[k]=true;const btn=$('tre'+k);if(btn){UI.markDone(btn,T_.name+', discovered');btn.querySelector('small').textContent=T_.theme}const n=st.done.filter(Boolean).length;$('tcount').textContent=n+' of 4 discoveries completed.';
      if(n===4)Timers.add(D.fast?2:1800,()=>D.complete())}},
  async run(){const st=this.st;Music.mood('bright');AU.amb(.025);await D.wait(400);await D.say(TXT.s6[0]);await D.say(TXT.s6[1]);st.armed=true;
    await D.activity({head:'Discover the ocean’s gifts',prompt:'Tap each patterned wave to discover what the ocean has revealed.',hint:'Tap one of the round lotus windows to open it.',wide:true,
      build:el=>{const c=document.createElement('p');c.id='tcount';c.className='panelNote';c.setAttribute('role','status');c.textContent='0 of 4 discoveries completed.';el.append(c);
        TREASURES.forEach((T_,k)=>{const b=UI.btn(T_.name,{sub:'Tap to reveal',icon:['lotus','elephant','horse','tree'][k],on:()=>this.reveal(k)});b.id='tre'+k;el.append(b)});
        const box=document.createElement('div');box.id='tbox';box.className='reveal';box.hidden=true;el.append(box)},
      assist:()=>{const k=st.done.indexOf(false);if(k>=0)this.reveal(k)}});
    st.wonder=true;await D.wait(600);AU.sfx('glowbell');Music.swell();await D.tw(st,{tab:1},1400,'io');D.tw(st,{lot:1},2200,'out').catch(()=>{});await D.tw(st,{rise:1},2600,'out');
    await D.remember(REM[5]);await D.beforeOutro();UI.remember(null);await D.tw(st,{glow:1},1600,'io')}};

/* ===== SCREEN 7 · Lord Dhanvantari Appears ===== */
const HABITS=[{k:'leaf',name:'Leaf',habit:'Eat nourishing foods and care for nature',hint:'The leaf grows in nature. Which habit talks about nature?'},
  {k:'pot',name:'Water pot',habit:'Drink water regularly',hint:'A water pot holds something our bodies need many times a day.'},
  {k:'bowl',name:'Food bowl',habit:'Choose balanced, nourishing meals',hint:'A bowl holds a meal. Which habit is about meals?'},
  {k:'hands',name:'Joined hands',habit:'Show care, kindness and ask for help when needed',hint:'Joined hands show people caring for each other.'}];
function healthMedal(g,x,y,r,k,locked,t){if(locked)rings(g,x,y,r*1.12,3,r*.16,C.gold,3,.9);shape(g,rrect(x-r,y-r,r*2,r*2,r*.3),locked?C.gold:C.cream,gg=>Pat.dots(gg,bb(x-r,y-r,r*2,r*2),locked?C.saffron:C.agold,r*.22,r*.03),{lw:2.4});
  shape(g,ell(x,y,r*.78),C.pale,null,{lw:1.6,line:'single'});g.save();g.translate(x,y);drawIcon(g,k,r/72);g.restore();
  if(locked){const lx=x+r*.78,ly=y-r*.78;shape(g,rrect(lx-r*.2,ly-r*.08,r*.4,r*.32,r*.06),C.dgold,null,{lw:1.4});g.strokeStyle=C.ink;g.lineWidth=r*.07;g.beginPath();g.arc(lx,ly-r*.08,r*.12,Math.PI,0);g.stroke()}}
const S7={label:'Screen 7 of 8',title:'Lord Dhanvantari Appears',border:[C.gold,C.coral],
  alt:'A column of golden-white light rises from a calm turquoise ocean. Lord Dhanvantari stands on a lotus, holding the golden vessel of amrita. Four small framed symbols surround him: a leaf, a water pot, a food bowl and joined hands.',
  enter(){this.st={col:0,lot:0,rise:0,glow:0,lock:[false,false,false,false],armed:false,diya:0}},
  geo(){return L.portrait?{cx:450,sea:770,fy:820,fs:1.05,med:[[120,200],[780,200],[120,440],[780,440]],mr:58,dev:[[60,890],[140,890]],asu:[[760,890],[840,890]],gs:.36}
    :{cx:800,sea:560,fy:612,fs:1.25,med:[[360,200],[1240,200],[360,430],[1240,430]],mr:66,dev:[[90,640],[195,640]],asu:[[1405,640],[1510,640]],gs:.52}},
  draw(g,t){const st=this.st,o=this.geo(),B=L.B;skyField(g,C.teal,{seed:71,density:8000,star:C.gold,dot:C.cream,maxY:o.sea});
    const cw=(L.portrait?180:240)*st.col;if(cw>1){shape(g,rrect(o.cx-cw/2,B.y-20,cw,o.sea-B.y+40,cw*.5),C.cream,gg=>{for(let k=-3;k<=3;k++){gg.fillStyle=k%2?C.gold:C.pale;gg.fillRect(o.cx+k*cw/7-cw/14,B.y,cw/7,o.sea-B.y+40)}Pat.flowers(gg,bb(o.cx-cw/2,B.y,cw,o.sea-B.y),C.saffron,40,C.verm)},{lw:2.4,gap:C.gold})}
    sea(g,o.sea,B.y+B.h,{cols:[C.turq,C.teal],t,row:46,len:100,spd:4});for(let k=0;k<5;k++){const r=(120+k*90)*(.6+.4*st.col);ring(g,o.cx,o.fy+10,r,k%2?C.gold:C.pale,2.6,r*.16)}
    o.med.forEach(([x,y],k)=>healthMedal(g,x,y,o.mr,HABITS[k].k,st.lock[k],t));
    const isl=(a,b)=>island(g,a,b,o.dev[0][1]-4,70);isl(B.x-20,o.dev[1][0]+60);isl(o.asu[0][0]-60,B.x+B.w+20);
    const fx=o.cx,fy=o.fy+(1-st.rise)*360;const vy=fy+(-112-62*.72)*o.fs;
    const lit=st.glow;[...o.dev,...o.asu].forEach(([x,y],i)=>{const hy=y-262*o.gs;if(lit>0){g.save();g.globalAlpha=lit*.8;g.setLineDash([4,14]);g.strokeStyle=C.gold;g.lineWidth=4;g.beginPath();g.moveTo(fx,vy);g.lineTo(x,hy);g.stroke();g.restore();rings(g,x,hy,34*o.gs/.52,2,10,C.gold,3,lit)}});
    o.dev.forEach(([x,y],k)=>person(g,'deva'+k,lit>0?'wonder':'fold','wonder',x,y,o.gs));o.asu.forEach(([x,y],k)=>person(g,'asura'+k,lit>0?'wonder':'fold','wonder',x,y,o.gs,true));
    g.save();g.beginPath();g.rect(B.x-10,B.y-10,B.w+20,o.fy+14-B.y);g.clip();if(st.rise>.3){g.globalAlpha=clamp((st.rise-.3)/.5,0,1);halo(g,fx,fy-262*o.fs,62*o.fs,t);g.globalAlpha=1}
    person(g,'dhanv','stand','serene',fx,fy,o.fs);g.restore();
    lotus(g,o.cx,o.fy+18,(L.portrait?110:130)*Math.max(.2,st.lot),{col:C.pink,col2:C.coral,open:st.lot});
    if(st.glow>0){const k=st.glow;rings(g,fx,vy,50*o.fs,4,14*o.fs,C.gold,3,k*.8);for(let j=0;j<8;j++){const a=j*TAU/8+t*.3,r=(70+((t*20+j*13)%40))*o.fs;flowerTop(g,fx+Math.cos(a)*r,vy+Math.sin(a)*r*.8,5*o.fs,C.gold,C.cream,6)}}
    if(st.diya>0){g.globalAlpha=st.diya;diya(g,fx-30,vy+30,3*st.diya,t,true,.8);g.globalAlpha=1}},
  hit(){return null},
  sel:null,slots:[null,null,null,null],
  build(el){this.sel=null;this.slots=[null,null,null,null];const st=this.st;
    const grid=document.createElement('div');grid.className='match';HABITS.forEach((h,k)=>{const s=document.createElement('button');s.type='button';s.className='slot';s.id='slot'+k;s.append(iconCanvas(h.k,40));
      const tx=document.createElement('span');tx.className='st';tx.innerHTML='<b></b><br><span></span>';tx.querySelector('b').textContent=h.name;tx.querySelector('span').textContent='Choose a match';s.append(tx);
      s.setAttribute('aria-label',h.name+': choose a match');s.addEventListener('click',()=>{D.poke();this.slotTap(k)});grid.append(s)});
    /* cards: tap to pick up then tap a symbol, or drag a card onto a symbol */
    const cards=document.createElement('div');cards.className='cards';[2,0,3,1].forEach(k=>{const c=document.createElement('button');c.type='button';c.className='card';c.dataset.k=k;c.textContent=HABITS[k].habit;
      c.addEventListener('click',()=>{D.poke();this.cardTap(k)});c.addEventListener('pointerdown',()=>{this.dragK=k});cards.append(c)});
    if(!this.dropHooked){this.dropHooked=true;window.addEventListener('pointerup',e=>{const k=this.dragK;this.dragK=null;if(k==null||D.scene!==this)return;const el2=document.elementFromPoint(e.clientX,e.clientY);const s=el2&&el2.closest('.slot');
      if(s&&!s.disabled){D.poke();this.place(+s.id.slice(4),k)}})}
    const chk=UI.btn('Check my matches',{main:true,on:()=>this.check()});void st;cards.append(chk);el.append(grid,cards)},
  cardTap(k){if(this.slots.includes(k)&&this.st.lock[this.slots.indexOf(k)])return;const pending=document.querySelector('.slot.sel');if(pending){this.place(+pending.id.slice(4),k);return}
    this.sel=this.sel===k?null:k;this.paint();AU.sfx('tap')},
  slotTap(k){if(this.st.lock[k])return;if(this.sel!=null){this.place(k,this.sel);return}document.querySelectorAll('.slot').forEach(s=>s.classList.toggle('sel',s.id==='slot'+k&&!s.classList.contains('sel')));AU.sfx('tap')},
  place(slot,card){if(this.st.lock[slot])return;const prev=this.slots.indexOf(card);if(prev>=0)this.slots[prev]=null;this.slots[slot]=card;this.sel=null;document.querySelectorAll('.slot').forEach(s=>s.classList.remove('sel'));AU.sfx('tap');this.paint()},
  paint(){HABITS.forEach((h,k)=>{const s=$('slot'+k);if(!s)return;const c=this.slots[k];const txt=c==null?'Choose a match':HABITS[c].habit;s.querySelector('.st span').textContent=txt;s.classList.toggle('ok',this.st.lock[k]);
      s.setAttribute('aria-label',h.name+': '+(this.st.lock[k]?'locked, ':'')+txt);if(this.st.lock[k])s.disabled=true});
    document.querySelectorAll('.card').forEach(c=>{const k=+c.dataset.k;c.classList.toggle('sel',this.sel===k);c.classList.toggle('used',this.slots.includes(k));c.setAttribute('aria-pressed',String(this.sel===k))})},
  check(){const st=this.st;let wrong=-1,empty=0;this.slots.forEach((c,k)=>{if(st.lock[k])return;if(c==null){empty++;return}if(c===k){st.lock[k]=true}else{if(wrong<0)wrong=k;this.slots[k]=null}});
    this.paint();const n=st.lock.filter(Boolean).length;
    if(n===4){AU.sfx('lock');UI.status('All four treasures of good health are matched!');D.complete();return}
    if(wrong>=0){AU.sfx('soft');const msg='Nearly! Try that one again. '+HABITS[wrong].hint;UI.status(msg,true);if(!AU.muted&&Speech.available())Speech.speak(msg)}
    else if(empty){AU.sfx('lock');UI.status(n+' locked in. Choose a match for every symbol, then check again.',true)}},
  assist(){const st=this.st;const k=st.lock.indexOf(false);if(k<0)return;const prev=this.slots.indexOf(k);if(prev>=0&&prev!==k)this.slots[prev]=null;this.slots[k]=k;st.lock[k]=true;AU.sfx('lock');this.paint();
    UI.status('Here is one: '+HABITS[k].name+' matches “'+HABITS[k].habit+'”.');if(st.lock.every(Boolean))D.complete()},
  async run(){const st=this.st;Music.mood('bright');AU.amb(.02);await D.wait(300);D.tw(st,{col:1},1800,'out').catch(()=>{});D.tw(st,{lot:1},1600,'out').catch(()=>{});await D.wait(700);
    AU.sfx('glowbell');Music.swell();D.tw(st,{rise:1},3000,'out').catch(()=>{});await D.say(TXT.s7[0]);D.tw(st,{glow:1},1400,'io').catch(()=>{});await D.say(TXT.s7[1]);
    await D.activity({head:'Match the treasures of good health',prompt:'Choose the habit that best matches each symbol.',hint:'Tap a habit card, then tap the symbol it belongs to. Then press Check my matches.',wide:true,idle:18,
      build:el=>this.build(el),assist:()=>this.assist()});
    await D.wait(900);await D.remember(REM[6]);await D.beforeOutro();UI.remember(null);await D.tw(st,{diya:1},1600,'io')}};

/* ===== The Dhanteras home (ENV-07): same family and decorations in Screens 8 and 10 ===== */
const CHOICES=[{k:'health',name:'Health',sub:'Caring for our body and mind.',resp:'A lovely choice. Every diya in the home glows a little brighter, like a healthy body and a calm mind.'},
  {k:'friendship',name:'Friendship',sub:'Sharing, listening and helping.',resp:'What a warm choice. Two friends wave from the doorway, ready to share, listen and help.'},
  {k:'knowledge',name:'Knowledge',sub:'Learning, asking and exploring.',resp:'A wise choice. An open book appears beside the prayer space, ready for learning and exploring.'},
  {k:'kindness',name:'Kindness',sub:'Caring for others and living things.',resp:'A kind choice. A little plant at the entrance gets a drink of water from small, caring hands.'}];
function homeGeo(){return L.portrait?{floor:860,door:[370,530,240],alt:[40,240,600],frame:[70,360,140,180],gran:[300,995,.74],mom:[690,995,.74],boy:[410,1005,.48],girl:[560,1005,.45],plant:[620,1012,.5],book:[150,575,.4],
    rang:[450,1060,110],diyas:[[60,880],[160,880],[740,880],[840,880],[300,1085],[600,1085]],uten:[820,1065],ds:.8}
  :{floor:740,door:[690,910,180],alt:[110,420,560],frame:[180,300,170,220],gran:[540,848,.95],mom:[1190,848,.95],boy:[640,852,.62],girl:[970,852,.58],plant:[1050,860,.62],book:[300,535,.5],
    rang:[800,815,150],diyas:[[150,770],[250,770],[1300,770],[1400,770],[600,830],[1000,830]],uten:[1430,835],ds:.9}}
function drawHome(g,t,st,o){o=o||{};const h=homeGeo(),B=L.B,P=L.portrait;
  g.fillStyle=C.cream;g.fillRect(B.x-5,B.y-5,B.w+10,B.h+10);Pat.dots(g,bb(B.x,B.y,B.w,h.floor-B.y),C.agold,30,1.6);
  const[dx0,dx1,dtop]=h.door,dmid=(dx0+dx1)/2;
  [[B.x+30,dx0-60],[dx1+60,B.x+B.w-30]].forEach(([a,b],i)=>{if(b-a<120)return;const y0=P?150:130,y1=h.floor-90;shape(g,rrect(a,y0,b-a,y1-y0,14),C.saffron,gg=>{Pat.diamonds(gg,bb(a,y0,b-a,y1-y0),C.gold,34,true);Pat.dots(gg,bb(a,y0,b-a,y1-y0),C.verm,17,1.6)},{lw:2.2});
    /* peacocks only on the right wall: the left wall carries the prayer space */
    const pcx=(a+b)/2,py=y0+(y1-y0)*.42;if(i===1){peacock(g,pcx-46,py,P?.7:.95,1);peacock(g,pcx+46,py,P?.7:.95,-1);flowerTop(g,pcx,py+70*(P?.7:1),16,C.pink,C.gold,8)}});
  g.fillStyle=C.verm;g.fillRect(B.x-5,h.floor-26,B.w+10,26);Pat.tri(g,bb(B.x-5,h.floor-26,B.w+10,12),C.gold,16,true);
  shape(g,pl([[B.x-10,h.floor],[B.x+B.w+10,h.floor],[B.x+B.w+10,B.y+B.h+10],[B.x-10,B.y+B.h+10]],true),C.agold,gg=>{Pat.diamonds(gg,bb(B.x,h.floor,B.w,400),C.dgold,40,false);Pat.dots(gg,bb(B.x,h.floor,B.w,400),C.cream,20,1.6)},{lw:2.2});
  /* doorway opening to the evening sky */
  const arch=new Path2D();arch.moveTo(dx0,h.floor);arch.lineTo(dx0,dtop+70);arch.quadraticCurveTo(dx0,dtop,dmid,dtop-30);arch.quadraticCurveTo(dx1,dtop,dx1,dtop+70);arch.lineTo(dx1,h.floor);arch.closePath();
  g.strokeStyle=C.ink;g.lineWidth=46;g.stroke(arch);g.strokeStyle=C.verm;g.lineWidth=40;g.stroke(arch);g.save();g.setLineDash([2,16]);g.strokeStyle=C.gold;g.lineWidth=8;g.stroke(arch);g.restore();
  shape(g,arch,C.indigo,gg=>{Pat.dots(gg,bb(dx0,dtop-30,dx1-dx0,h.floor-dtop+30),C.cream,26,1.6);star(gg,dmid-30,dtop+60,9,C.gold,4);star(gg,dmid+40,dtop+120,7,C.gold,4);
    const m=new Path2D();m.arc(dmid+30,dtop+40,16,0,TAU);gg.fillStyle=C.pale;gg.fill(m)},{lw:2.2});
  if(!o.end){toran(g,dx0-30,dx1+30,dtop-38,1);garland(g,B.x,P?118:96,dx0-20,dtop-30,60,1);garland(g,dx1+20,dtop-30,B.x+B.w,P?118:96,60,1)}
  /* prayer space with the small framed Dhanvantari panel */
  const[a0,a1,ay]=h.alt,[fx,fy,fw,fh]=h.frame;shape(g,rrect(fx,fy,fw,fh,8),C.gold,gg=>Pat.dots(gg,bb(fx,fy,fw,fh),C.verm,9,1.6),{lw:2.4});shape(g,rrect(fx+12,fy+12,fw-24,fh-24,6),C.cream,null,{lw:1.6,line:'single'});
  g.save();g.beginPath();g.rect(fx+12,fy+12,fw-24,fh-24);g.clip();const ps=(fh-30)/420;halo(g,fx+fw/2,fy+fh-14-262*ps,40*ps,t);person(g,'dhanv','stand','serene',fx+fw/2,fy+fh-14,ps);g.restore();
  shape(g,rrect(a0,ay,a1-a0,26,6),C.rust,gg=>Pat.tri(gg,bb(a0,ay,a1-a0,10),C.gold,12,true),{lw:2});shape(g,pl([[a0+20,ay+26],[a0+34,ay+26],[a0+34,h.floor],[a0+20,h.floor]],true),C.rust,null,{lw:1.6});shape(g,pl([[a1-34,ay+26],[a1-20,ay+26],[a1-20,h.floor],[a1-34,h.floor]],true),C.rust,null,{lw:1.6});
  [[a0+40,ay-8],[a1-40,ay-8]].forEach(([x,y])=>flowerTop(g,x,y,12,C.saffron,C.verm,8));diya(g,(a0+a1)/2,ay,P?.6:.8,t,true,.5+(st.bright||0)*.5);
  if(st.book>0){g.save();g.translate(h.book[0],h.book[1]);drawIcon(g,'book',h.book[2]*Ease.back(st.book));g.restore()}
  const lp=1+(st.bright||0)*.8;h.diyas.forEach(([x,y],i)=>{if(st.light>0){const r=60+st.light*220;g.globalAlpha=.6*(1-st.light*.7);ring(g,x+20*h.ds,y-30*h.ds,r,C.gold,4);g.globalAlpha=1}diya(g,x,y,h.ds,t+i,true,.6*lp)});
  if(!o.noRangoli)rangoli(g,h.rang[0],h.rang[1],h.rang[2],.36,1);
  const[ux,uy]=h.uten,us=P?.7:1;shape(g,ell(ux,uy,56*us,13*us),C.agold,gg=>Pat.dots(gg,bb(ux-56*us,uy-13*us,112*us,26*us),C.dgold,9,1.4),{lw:2});[[-26,-12,C.gold],[0,-20,C.verm],[24,-12,C.leaf],[-8,-8,C.saffron]].forEach(([a,b,c])=>shape(g,ell(ux+a*us,uy+b*us,13*us),c,null,{lw:1.4,line:'single'}));
  shape(g,sp([[ux-100*us,uy],[ux-112*us,uy-30*us],[ux-96*us,uy-58*us],[ux-70*us,uy-58*us],[ux-54*us,uy-30*us],[ux-66*us,uy]],true),C.agold,gg=>Pat.hlines(gg,bb(ux-115*us,uy-60*us,64*us,60*us),C.dgold,8,1.4),{lw:2});
  const[px,py,pls]=h.plant;g.save();g.translate(px,py-40*pls);g.scale(1+(st.plantGrow||0)*.25,1+(st.plantGrow||0)*.25);drawIcon(g,'plant',pls*1.2);g.restore();
  const fam=o.fam||{};const gp=fam.gran||h.gran,mp=fam.mom||h.mom,bp=fam.boy||h.boy,gl=fam.girl||h.girl;
  person(g,'gran','flower','happy',gp[0],gp[1],gp[2]);person(g,'mom','lamp','happy',mp[0],mp[1],mp[2]);
  person(g,'boy',st.wave?'wave':'garland','happy',bp[0],bp[1],bp[2]);person(g,'girl',st.wave?'wave':st.water?'water':'hold','happy',gl[0],gl[1],gl[2],st.water&&!P?false:false);
  if(st.wave){[bp,gl].forEach(([x,y,s])=>{for(let k=0;k<2;k++){g.strokeStyle=C.dgold;g.lineWidth=3;g.beginPath();g.arc(x-72*s,y-302*s,18*s+k*10*s,Math.PI*1.1,Math.PI*1.6);g.stroke()}})}
  if(st.water){const[x,y,s]=gl;for(let k=0;k<5;k++){const ph=((t*1.6+k/5)%1);dot(g,x+(90+ph*40)*s,y-(160-ph*120)*s,4*s+1,C.turq)}}}
/* ===== SCREEN 8 · Why We Celebrate Dhanteras ===== */
const S8={label:'Screen 8 of 8',title:'Why We Celebrate Dhanteras',border:[C.saffron,C.verm],
  alt:'A festive home decorated for Dhanteras with marigold garlands, mango leaves, a rangoli and rows of diyas. A grandmother places flowers near a small prayer space with a framed picture of Lord Dhanvantari, a mother arranges lamps, and two children decorate the doorway.',
  enter(){this.st={bright:0,book:0,wave:false,water:false,plantGrow:0,light:0}},
  draw(g,t){drawHome(g,t,this.st)},
  hit(){return null},
  choose(i,b){const st=this.st,c=CHOICES[i];if(st.chosen!=null&&st.chosen===i)return;const first=st.chosen==null;st.chosen=i;Store.set('treasure',c.k);
    document.querySelectorAll('#act .choice').forEach(x=>{x.setAttribute('aria-pressed',String(x===b));x.classList.toggle('done',x===b)});AU.sfx('sparkle');
    st.wave=false;st.water=false;tw(st,{bright:0,book:0,plantGrow:0},D.fast?2:200);
    if(c.k==='health')tw(st,{bright:1},D.fast?2:1400,'out');else if(c.k==='friendship')st.wave=true;else if(c.k==='knowledge')tw(st,{book:1},D.fast?2:1000,'out');else{st.water=true;tw(st,{plantGrow:1},D.fast?2:3000,'out')}
    UI.status(c.resp);if(!AU.muted&&Speech.available()&&!D.fast){Speech.stop();Speech.speak(c.resp)}
    if(first)Timers.add(D.fast?2:2400,()=>D.complete())},
  async reflection(){const tok=D.token;return new Promise(res=>{const el=$('act');const wrap=document.createElement('div');wrap.className='reveal';wrap.style.width='100%';
    wrap.innerHTML='<b>What is one thing you can do to care for your health or help someone else?</b><span class="panelNote">You can write, speak, or pick a picture. This is optional, and your answer stays on this device.</span>';
    const ta=document.createElement('textarea');ta.setAttribute('aria-label','Write your answer');ta.maxLength=300;ta.placeholder='I can…';const prev=Store.data.reflect8;if(prev&&prev.text)ta.value=prev.text;
    const save=(pic)=>{const cur=Store.data.reflect8||{text:'',pic:''};Store.set('reflect8',{text:ta.value.slice(0,300),pic:pic!=null?pic:cur.pic})};ta.addEventListener('input',()=>{D.poke();save()});
    const pics=document.createElement('div');pics.className='row';
    [['help','Helping a friend'],['water','Drinking water'],['read','Reading with family'],['plant','Caring for a plant']].forEach(([k,lab])=>{const b=UI.btn(lab,{sm:true,icon:k,pressed:prev&&prev.pic===k,on:()=>{pics.querySelectorAll('.ab').forEach(x=>{x.setAttribute('aria-pressed',String(x===b));x.classList.toggle('done',x===b)});save(k);AU.sfx('tap')}});pics.append(b)});
    /* the way on is always the first thing in reach; the answer options follow */
    const go=UI.btn('Continue to the closing screens',{main:true,on:()=>fin()});el.append(go);
    ta.style.minHeight='44px';wrap.append(ta);Voice.attach(wrap,ta,save);wrap.append(pics);el.append(wrap);
    let done=false;const fin=()=>{if(done)return;done=true;Voice.stop();res()};D.lastInput=performance.now();
    const iv=setInterval(()=>{if(tok!==D.token||done){clearInterval(iv);if(!done){done=true;Voice.stop()}return}if(D.fast||performance.now()-D.lastInput>60000){clearInterval(iv);fin()}},400)})},
  async run(){const st=this.st;Music.mood('bright');AU.amb(.012);await D.wait(400);AU.sfx('crackle');await D.say(TXT.s8[0]);await D.say(TXT.s8[1]);
    await D.activity({head:'Choose your treasure of life',prompt:'What is one treasure you want to care for in your life?',hint:'Choose any one card. Every choice is a good one.',wide:true,
      build:el=>{const n=document.createElement('p');n.className='panelNote';n.textContent='All four are equally good choices. There is no wrong answer.';el.append(n);
        CHOICES.forEach((c,i)=>{const b=UI.btn(c.name,{sub:c.sub,icon:c.k,pressed:false,on:b2=>this.choose(i,b2)});b.classList.add('choice');el.append(b)})},
      assist:()=>{if(st.chosen==null){const b=document.querySelectorAll('#act .choice')[0];this.choose(0,b)}}});
    await D.wait(1500);UI.act({head:'Choose your treasure of life',prompt:'',wide:true});const c=CHOICES[st.chosen];UI.status('You chose '+c.name+'.');await this.reflection();D.guard(D.token);
    await D.remember(REM[7]);await D.beforeOutro();UI.remember(null);await D.tw(st,{light:1},1800,'io')}};

/* ===== Speaking an answer: a local recording, kept in memory only and never uploaded ===== */
const Voice={rec:null,chunks:[],stream:null,
  attach(wrap,ta,save){const row=document.createElement('div');row.className='row';
    if(navigator.mediaDevices&&window.MediaRecorder){const b=UI.btn('Record a spoken answer',{sm:true,icon:'friends',on:()=>this.toggleRec(b,row)});row.append(b)}
    /* No dictation: browser speech recognition usually sends audio to a server, and probing the on-device variant crashed the renderer in testing. */
    wrap.append(row)},
  async toggleRec(b,row){if(this.rec&&this.rec.state==='recording'){this.rec.stop();return}
    try{this.stream=await navigator.mediaDevices.getUserMedia({audio:true});this.chunks=[];this.rec=new MediaRecorder(this.stream);this.rec.ondataavailable=e=>this.chunks.push(e.data);
      this.rec.onstop=()=>{try{this.stream.getTracks().forEach(t=>t.stop())}catch(e){}const url=URL.createObjectURL(new Blob(this.chunks));let a=row.querySelector('audio');if(!a){a=document.createElement('audio');a.controls=true;a.style.maxWidth='100%';row.append(a)}a.src=url;b.querySelector('span').firstChild.textContent='Record again'};
      this.rec.start();b.querySelector('span').firstChild.textContent='Stop recording';setTimeout(()=>{if(this.rec&&this.rec.state==='recording')this.rec.stop()},20000)}
    catch(e){b.disabled=true;b.querySelector('span').firstChild.textContent='Recording is not available'}},
  stop(){try{if(this.rec&&this.rec.state==='recording')this.rec.stop()}catch(e){}}};

/* ===== SCREEN 9 · A Prayer for Health and Well-being ===== */
const S9={label:'Closing · Prayer',title:'A Prayer for Health and Well-being',border:[C.agold,C.coral],
  alt:'Lord Dhanvantari stands serenely holding the golden vessel of amrita, framed by a large floral mandala. A brass diya glows in the lower-left corner.',
  enter(){this.st={halo:0,heard:false}},
  geo(){return L.portrait?{dx:450,dy:1030,ds:1.12,mx:450,my:640,mr:330,lx:120,ly:1070,ls:1.6}:{dx:1170,dy:836,ds:1.3,mx:1170,my:460,mr:360,lx:230,ly:800,ls:1.8}},
  draw(g,t){const o=this.geo();skyField(g,C.cream,{seed:91,density:7000,dot:C.agold,star:C.gold});
    mandala(g,o.mx,o.my,o.mr,{cols:[C.agold,C.coral,C.turq,C.gold],rot:t*.02});halo(g,o.dx,o.dy-262*o.ds,64*o.ds,t);person(g,'dhanv','stand','serene',o.dx,o.dy,o.ds);
    lotus(g,o.dx,o.dy+20,L.portrait?90:110,{col:C.pink,col2:C.coral});diya(g,o.lx,o.ly,o.ls,t,true,.8)},
  hit(){return null},
  build(){const d=document.createElement('div');d.id='prayer';
    d.innerHTML='<h2 lang="sa"></h2><p class="dev" lang="sa"></p><p class="lbl">Transliteration (IAST)</p><p class="iast" lang="sa-Latn"></p><div class="pbtns" style="display:flex;flex-wrap:wrap;gap:6px"></div>'+
      '<div class="mean" hidden><p class="lbl">Child-friendly meaning</p><p class="meaning"></p></div><p class="aud note" role="status"></p>'+
      '<details><summary>Pronunciation guide</summary><ul class="cues"></ul><p class="note">Simplified cues for children, not a substitute for Sanskrit phonetic instruction.</p></details>'+
      '<p class="note">This commonly recited prayer is a mantra, not a metrical śloka. Source: Sanskrit Documents, “Dhanvantari Mantra”, which notes that other recensions are in circulation. The text and its recording must be checked by a qualified Sanskrit reviewer before publication. Listening silently is perfectly fine.</p>';
    d.querySelector('h2').textContent=MANTRA.head;d.querySelector('.dev').textContent=MANTRA.dev;d.querySelector('.iast').textContent=MANTRA.iast;d.querySelector('.meaning').textContent=MANTRA.meaning;
    const cues=d.querySelector('.cues');MANTRA.cues.forEach(c=>{const li=document.createElement('li');li.textContent=c;cues.append(li)});
    const row=d.querySelector('.pbtns');const play=async()=>{this.st.heard=true;D.poke();const det=d.querySelector('details');Music.set(.1,1);const kind=await Mantra.play(i=>{if(i===0)det.open=true;cues.querySelectorAll('li').forEach((li,j)=>li.classList.toggle('on',j===i))});Music.set(.4,3);
      d.querySelector('.aud').textContent=kind==='recording'?'Played the reviewed recording.':kind==='placeholder-voice'?'Played with a placeholder device voice. Replace it with a reviewed recording before publication.':kind==='read-along'?'This device has no Sanskrit voice, so the pronunciation guide was stepped through as a silent read-along.':'';D.complete()};
    row.append(UI.btn('Listen to the mantra',{main:true,on:play}),UI.btn('Understand the meaning',{on:b=>{d.querySelector('.mean').hidden=false;UI.markDone(b);D.poke();this.st.heard=true;D.complete()}}),UI.btn('Listen again',{on:play}),
      UI.btn('Copy Sanskrit mantra',{on:b=>this.copy(b)}),UI.btn('Extended prayer (older readers)',{on:()=>{$('older').hidden=false;$('bOlderClose').focus()}}));return d},
  copy(b){const done=()=>{UI.markDone(b);UI.toast('Sanskrit mantra copied.')};try{navigator.clipboard.writeText(MANTRA.dev).then(done,()=>this.copyOld(done))}catch(e){this.copyOld(done)}},
  copyOld(done){const t=document.createElement('textarea');t.value=MANTRA.dev;document.body.append(t);t.select();try{document.execCommand('copy');done()}catch(e){}t.remove()},
  async run(){Music.mood('calm');AU.amb(.012);await D.wait(400);
    await D.activity({head:'A prayer for health and well-being',prompt:'You can listen to the mantra, read its meaning, or simply sit quietly. Listening silently is perfectly fine.',hint:'Press Listen to the mantra, or Next when you are ready.',idle:25,assistAfter:20,
      build:el=>{const p=this.build();if(L.portrait)el.append(p);else $('ovl').append(p);const cont=UI.btn('Continue',{on:()=>D.complete()});el.append(cont)},assist:()=>D.complete()});
    Mantra.stop();await D.wait(600);await D.beforeOutro()}};

/* ===== SCREEN 10 · The Greatest Treasures ===== */
const MOTIFS=['health','friendship','knowledge','kindness'];
const S10={label:'Closing · Ending',title:'The Greatest Treasures',border:[C.saffron,C.gold],final:true,
  alt:'A glowing brass diya sits at the centre of a circular floral mandala, surrounded by a leaf, two friends, an open book and joined hands. The family celebrates around it in their decorated home.',
  enter(){this.st={b:0,complete:0}},
  geo(){return L.portrait?{cx:450,cy:520,mr:200,mot:[[280,380],[620,380],[280,670],[620,670]],ds:2,ks:.5,ky:690,fam:{gran:[150,1040,.62],mom:[290,1040,.62],boy:[620,1050,.42],girl:[760,1050,.4]}}
    :{cx:800,cy:440,mr:220,mot:[[580,300],[1020,300],[580,590],[1020,590]],ds:2.2,ks:.55,ky:650,fam:{gran:[300,850,.9],mom:[470,850,.9],boy:[1130,856,.6],girl:[1290,856,.56]}}},
  draw(g,t){const st=this.st,o=this.geo(),b=st.b,B=L.B;const chosen=Store.data.treasure;
    const vessel=()=>{g.fillStyle=C.cream;g.fillRect(B.x-5,B.y-5,B.w+10,B.h+10);rays(g,o.cx,o.cy+40,120,Math.max(B.w,B.h),32,C.gold,t*.02,.6);rings(g,o.cx,o.cy,150,4,40,C.agold,3,.7);kalasha(g,o.cx,o.cy+150,2.6,t,1)};
    const zoom=b<3?1.18:lerp(1.18,1,Ease.io(clamp(b-3,0,1)));
    const home=()=>{g.save();g.translate(o.cx,o.cy);g.scale(zoom,zoom);g.translate(-o.cx,-o.cy);g.__zoom=zoom;drawHome(g,t,{bright:.6+st.complete*.6,light:0},{end:true,noRangoli:false,fam:o.fam});
      const p3=clamp(b-2,0,1),p4=clamp(b-3,0,1);
      if(p3>0){shape(g,ell(o.cx,o.cy,o.mr*1.12),C.cream,null,{lw:2.4});mandala(g,o.cx,o.cy,o.mr*(.55+.45*p4),{p:Math.max(.25,p4),cols:[C.saffron,C.gold,C.verm,C.leaf],rot:t*.03})}
      MOTIFS.forEach((m,i)=>{const order=chosen?(m===chosen?0:1+MOTIFS.filter(x=>x!==chosen).indexOf(m)):i;const k=clamp(p3*4-order,0,1);if(k<=0)return;const[mx,my]=o.mot[i];
        const x=lerp(mx,o.cx+(mx-o.cx)*.62,p4),y=lerp(my,o.cy+(my-o.cy)*.62,p4);if(p4>0){g.strokeStyle=C.gold;g.lineWidth=5;g.setLineDash([2,12]);g.beginPath();g.moveTo(x,y);g.lineTo(o.cx,o.cy);g.stroke();g.setLineDash([])}
        if(m===chosen)rings(g,x,y,62,3,12,C.gold,4,.9);shape(g,ell(x,y,52*Ease.back(k)),C.pale,null,{lw:2.2});g.save();g.translate(x,y);drawIcon(g,m,.5*Ease.back(k));g.restore()});
      if(p3>0){kalasha(g,o.cx,o.ky,o.ks,t,.4);diya(g,o.cx-22*o.ds,o.cy+20*o.ds,o.ds,t,true,.7+st.complete*.5);if(st.complete>0)rings(g,o.cx,o.cy-14*o.ds,90,5,40,C.gold,4,st.complete*.8)}
      g.__zoom=1;g.restore()};
    if(b<1){vessel();return}
    if(b<2){vessel();const k=Ease.io(b-1),R=Math.hypot(B.w,B.h)*.75*k;g.save();g.beginPath();g.arc(o.cx,o.cy,Math.max(1,R),0,TAU);g.clip();home();g.restore();
      for(let j=0;j<3;j++)ring(g,o.cx,o.cy,R+j*12,j===1?C.saffron:C.gold,j===1?8:4);return}
    home()},
  hit(){return null},
  reflect(){const tok=D.token;return new Promise(res=>{const el=$('act');el.innerHTML='';const ch=Store.data.treasure,c=CHOICES.find(x=>x.k===ch);
    const wrap=document.createElement('div');wrap.className='reveal';wrap.style.width='100%';const p=document.createElement('b');p.textContent=(c?'You chose '+c.name+'. ':'')+'This Dhanteras, I will share my blessings by…';wrap.append(p);
    const ta=document.createElement('textarea');ta.maxLength=300;ta.setAttribute('aria-label','Complete the sentence: This Dhanteras, I will share my blessings by');ta.placeholder='…helping at home, sharing my snacks, calling my grandparents…';
    const prev=Store.data.reflect10;if(prev&&prev.text)ta.value=prev.text;let pic=prev?prev.pic:'';const save=()=>Store.set('reflect10',{text:ta.value.slice(0,300),pic});ta.addEventListener('input',()=>{D.poke();save()});
    const mk=(t)=>{const h=document.createElement('p');h.className='lbl';h.style.cssText='margin:.5em 0 .2em;font-weight:800';h.textContent=t;return h};
    wrap.append(mk('Write'),ta,mk('Speak'));Voice.attach(wrap,ta,save);wrap.append(mk('Draw or select'));
    const pics=document.createElement('div');pics.className='row';[['help','Helping someone'],['share','Sharing with others'],['plant','Caring for nature'],['heart','Being kind']].forEach(([k,lab])=>{
      const b=UI.btn(lab,{sm:true,icon:k,pressed:pic===k,on:()=>{pic=k;pics.querySelectorAll('.ab').forEach(x=>{x.setAttribute('aria-pressed',String(x===b));x.classList.toggle('done',x===b)});save();AU.sfx('tap')}});pics.append(b)});
    const pad=document.createElement('canvas');pad.className='pad';pad.width=280;pad.height=140;pad.setAttribute('aria-label','Drawing pad: draw an act of kindness or care');const pg=pad.getContext('2d');pg.lineCap='round';pg.lineWidth=5;pg.strokeStyle=C.verm;let drawing=false;
    const pos=e=>{const r=pad.getBoundingClientRect();return[(e.clientX-r.left)*pad.width/r.width,(e.clientY-r.top)*pad.height/r.height]};
    pad.addEventListener('pointerdown',e=>{drawing=true;D.poke();try{pad.setPointerCapture(e.pointerId)}catch(_){}const[x,y]=pos(e);pg.beginPath();pg.moveTo(x,y)});pad.addEventListener('pointermove',e=>{if(!drawing)return;const[x,y]=pos(e);pg.lineTo(x,y);pg.stroke();D.poke()});
    pad.addEventListener('pointerup',()=>drawing=false);wrap.append(pics,pad);
    const row=document.createElement('div');row.className='row';row.style.marginTop='0';row.append(UI.btn('Submit my reflection',{main:true,on:()=>fin()}),UI.btn('Skip',{on:()=>fin()}));el.append(row,wrap);
    let done=false;const fin=()=>{if(done)return;done=true;Voice.stop();res()};D.lastInput=performance.now();
    const iv=setInterval(()=>{if(tok!==D.token||done){clearInterval(iv);return}if(D.fast||performance.now()-D.lastInput>90000){clearInterval(iv);fin()}},400)})},
  async run(){const st=this.st;Music.mood('bright');Music.swell();AU.amb(.012);await D.wait(300);await D.tw(st,{b:1},1600,'io');await D.wait(700);AU.sfx('chime');await D.tw(st,{b:2},1800,'io');AU.sfx('crackle');
    await D.tw(st,{b:3},2600,'io');AU.sfx('sparkle');D.tw(st,{b:4},2000,'io').catch(()=>{});
    const t=document.createElement('div');t.id='endTitle';t.innerHTML='<small>Book 2 · Dhanteras</small>The Ocean of Treasures';$('ovl').append(t);
    await D.say(TXT.end);
    await D.activity({head:'Final reflection',prompt:'This Dhanteras, I will share my blessings by…',hint:'Press Complete my reflection, or Skip.',idle:30,assistAfter:30,wide:true,
      build:el=>{el.append(UI.btn('Complete my reflection',{main:true,on:async()=>{await this.reflect();D.complete()}}),UI.btn('Skip',{on:()=>D.complete()}))},assist:()=>D.complete()});
    AU.sfx('glowbell');Music.swell();D.tw(st,{complete:1},1500,'io').catch(()=>{});
    UI.act({head:'The greatest treasures',prompt:'',wide:true});const msg=document.createElement('p');msg.className='reveal';msg.textContent='The greatest treasures are not only those we discover, but also those we protect, nurture and share.';
    $('act').append(msg,UI.btn('Replay the story',{main:true,icon:'lamp',on:()=>{D.done.fill(false);D.go(0)}}));D.done[9]=true;UI.progress();UI.nav()}};

const SCREENS=[S1,S2,S3,S4,S5,S6,S7,S8,S9,S10];
