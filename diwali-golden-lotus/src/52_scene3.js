/* ================= SCENE 3: WHAT IS PROSPERITY? ================= */
async function shot3_1(){Store.set('scene',3);mood('wonder');Music.mood('warm');
  const s=oceanStage();s.mode='bg3';s.seaMood='divine';Object.assign(s.st,{far:0,tort:0,glow:.4,under:.5,floats:.5,spread:.5,lakK:1,devK:0});
  s.lotus.openO=1;s.lotus.openI=1;s.lotus.glowK=.3;D.setScene(s,1400);const light=s.light,lak=s.lak;
  const top=s.lay().light;light.x=top[0];light.y=top[1];light.vis=true;light.glowK=.55;light.s=.6;
  const fg=LP([889,640],[500,1180]);
  await D.wait(1300);
  await D.say('And now, something magical is happening!',{cues:[['magical',()=>AU.sfx('sparkle')]]});
  /* three gentle movements down from her lotus, along a curved trail of tiny flowers */
  const steps=[[lerp(top[0],fg[0],.2)+LP(110,90),lerp(top[1],fg[1],.33)],[lerp(top[0],fg[0],.55)-LP(120,90),lerp(top[1],fg[1],.66)],fg];
  const desc=(async()=>{D.go(light,{s:1.25},5200,'io');for(const p of steps){await light.travel([p],1500,'io');await D.wait(500)}})().catch(()=>{});
  await D.say('A tiny golden light floats down from Her lotus.');
  await D.say('It twinkles like a little star.',{cues:[['twinkles',()=>light.pulse()]]});
  await desc;
  light.set('still');
  await D.say([['narr','The little light whispers:'],['light','“Where there is kindness, goodness grows. Where there is gratitude, happiness glows!”']],{cues:[['gratitude',()=>light.pulse()]]});
  light.set('float');
  await D.say('The golden light is ready to teach us something special.');
  await D.late();
  /* it moves toward the blessing cards as the ocean gives way to the cream field */
  const tp=LP(CREAM.l.top,CREAM.p.top);light.travel([[lerp(light.x,tp[0],.5),lerp(light.y,tp[1],.5)]],1200).catch(()=>{});D.go(s.st,{lakK:0},1200);await D.wait(1100)}

/* ---- Shot 3.2 and INT-03 Find the Blessings: six picture cards, any number may be chosen, none is wrong ---- */
function cardSvg(key){const sv=document.createElementNS(NS,'svg');sv.setAttribute('viewBox','-100 -65 200 130');sv.setAttribute('aria-hidden','true');
  el('rect',{x:-100,y:-65,width:200,height:130,fill:P.ivory},sv);blessArt(grp(sv),key);return sv}
/* the same card drawn inside the painting (for the gather and the circle) */
function svgCard(parent,key){const g=grp(parent);el('rect',{x:-112,y:-82,width:224,height:164,rx:18,fill:P.ivory,stroke:K,'stroke-width':5},g);
  el('rect',{x:-104,y:-74,width:208,height:148,rx:12,fill:'none',stroke:P.gold,'stroke-width':4,'stroke-dasharray':'.1 12','stroke-linecap':'round'},g);
  const pic=grp(g,{transform:'translate(0 2) scale(.98)'});const c=clipIn(g,'M-98 -64H98V66H-98Z');pic.setAttribute('clip-path',c);blessArt(pic,key);return g}
async function shot3_2(){mood('gentle');Music.mood('cream');Music.setLevel(.45,2);
  const s=creamStage('blessings');D.setScene(s,1300);const light=s.light;const tok=D.token;const tp=s.A().top;light.x=tp[0];light.y=tp[1];light.vis=true;light.glowK=.55;light.s=1;
  const tray=$('tray');tray.innerHTML='';tray.className='tray'+(L.portrait?' p':'');
  const fitTray=()=>{tray.className='tray'+(L.portrait?' p':'');const ly=toStage(0,s.A().top[1]+LP(80,90))[1]*L.U;tray.style.setProperty('--trayTop',Math.max(40,Math.round(ly-L.U*BORDER))+'px');
    const avail=(L.ph-L.dockPx)-ly-30;const rows=L.portrait?3:2;tray.style.setProperty('--cardH',Math.max(50,Math.floor(avail/rows-(L.portrait?74:70)))+'px')};
  fitTray();s.onLayout=fitTray;
  const sel=new Set();let res;const doneP=new Promise(r=>res=r);let cont=null;
  const btns=BLESS.map((b,i)=>{const e=document.createElement('button');e.type='button';e.className='card enter';e.setAttribute('aria-pressed','false');e.setAttribute('aria-label',b.label);
    e.append(cardSvg(b.key));const t=document.createElement('b');t.textContent=b.label;e.append(t);e.insertAdjacentHTML('beforeend',confirmFlowerSvg());
    e.addEventListener('click',()=>{D.poke();AU.resume();toggle(i)});tray.append(e);return e});
  const toggle=(i,force)=>{if(!ready)return;const on=force==null?!sel.has(i):force;if(on)sel.add(i);else sel.delete(i);btns[i].setAttribute('aria-pressed',String(on));if(on){AU.sfx('soft');light.pulse()}else AU.sfx('tap');
    if(sel.size&&cont)cont.btn.hidden=false;if(!sel.size&&cont)cont.btn.hidden=true};
  let ready=false;tray.hidden=false;
  await D.wait(700);
  for(let i=0;i<btns.length;i++){btns[i].classList.remove('enter');AU.sfx('pop');await D.wait(D.fast?5:260)}
  await D.wait(500);btns.forEach(b=>b.classList.add('ready'));ready=true;
  const els=D.controls([{id:'bCont',cls:'lotusbtn',html:ICON.lotus+'Continue',hidden:true,on:()=>finish(false)}]);cont={btn:els.bCont};
  let auto=false;const finish=a=>{if(!sel.size)return;auto=a;res()};
  await D.ask('Tap the things that make life wonderful!',null,'tap');
  /* the light flies to a card (used by the gentle assist) */
  const cardRef=i=>{const r=btns[i].getBoundingClientRect();const p=Input.toRef(r.left+r.width/2,r.top+r.height*.1);return[p.x,p.y]};
  await D.task({hint:'Tap the pictures you love!',start(t){doneP.then(()=>t.finish())},demo(){btns.forEach(b=>{b.classList.remove('pulse');void b.offsetWidth;b.classList.add('pulse')})},
    async assist(t){for(let i=0;i<btns.length;i++){if(!sel.has(i)){await light.travel([cardRef(i)],D.fast?20:700);toggle(i,true);await D.wait(D.fast?5:350)}}await light.travel([s.A().top],700);await D.wait(600);finish(true)}});
  await doneP;D.guard(tok);
  const chosen=[...sel].sort().map(i=>BLESS[i].key);Store.saveBlessings(chosen,auto);
  D.clearAct();btns.forEach(b=>b.disabled=true);
  await D.say('Wonderful choices!',{cues:[['Wonderful',()=>AU.sfx('success')]]});
  /* the Golden Light lightly touches every card the child did not choose, so all six glow */
  const touch=(async()=>{for(let i=0;i<btns.length;i++){if(!sel.has(i)){await light.travel([cardRef(i)],D.fast?20:650);btns[i].setAttribute('aria-pressed','true');AU.sfx('soft');await D.wait(D.fast?5:250)}}
    await light.travel([s.A().top],700)})().catch(()=>{});
  await D.say('Every one of these can be a blessing.');
  await D.say('Prosperity is not just about what we own. It is also about our health, happiness, relationships and the good we bring into the world.');
  await touch;await D.late();
  /* the cards gather around the light: painted copies take each card's place, then the buttons go */
  s.gather=BLESS.map((b,i)=>{const r=btns[i].getBoundingClientRect();const p=Input.toRef(r.left+r.width/2,r.top+r.height/2);const g=svgCard(s.comp,b.key);
    const sc=(r.width/L.U)/L.fit.s/224;const o={g,x:p.x,y:p.y,s:sc,i};tf(g,o.x,o.y,o.s);return o});
  s.parts.push({update:()=>s.gather.forEach(o=>tf(o.g,o.x,o.y,o.s))});tray.hidden=true;tray.innerHTML='';
  const R=s.A().ring;const ang=[180,240,300,0,60,120];D.go(light,{x:R.c[0],y:R.c[1]},1600,'io');
  s.gather.forEach((o,i)=>{const a=ang[i]*DEG;D.go(o,{x:R.c[0]+Math.cos(a)*R.rx,y:R.c[1]+Math.sin(a)*R.ry,s:LP(.82,.78)},1800,'io')});
  await D.wait(1900)}
async function shot3_3(){mood('warm');let s=D.scene;
  if(!s||!s.gather){s=creamStage('blessings');D.setScene(s,0);const R=s.A().ring;const ang=[180,240,300,0,60,120];s.light.x=R.c[0];s.light.y=R.c[1];s.light.vis=true;
    s.gather=BLESS.map((b,i)=>{const a=ang[i]*DEG;const o={g:svgCard(s.comp,b.key),x:R.c[0]+Math.cos(a)*R.rx,y:R.c[1]+Math.sin(a)*R.ry,s:LP(.82,.78),i};return o});s.parts.push({update:()=>s.gather.forEach(o=>tf(o.g,o.x,o.y,o.s))})}
  const light=s.light;const R=s.A().ring;light.glowK=.65;
  D.go(s.st,{medK:1},1400);
  const dance=(async()=>{light.spin();await light.travel([[R.c[0]-LP(60,40),R.c[1]-LP(30,40)],[R.c[0]+LP(60,40),R.c[1]-LP(30,40)],R.c],1800)})().catch(()=>{});
  await D.say('The little golden light dances happily.');
  await dance;light.set('still');
  /* the cards drift gently toward the centre and settle */
  s.gather.forEach(o=>D.go(o,{x:lerp(o.x,R.c[0],.12),y:lerp(o.y,R.c[1],.12)},2600,'io'));
  await D.say([['narr','Then it whispers:'],['light','“Would you like to learn a beautiful prayer to Goddess Lakshmi?”']],{cues:[['beautiful prayer',()=>light.pulse()]]});
  light.set('float');
  await D.say("Let's learn it together!",{cues:[['together',()=>{AU.sfx('chime');D.go(light,{bloomK:.72},2600,'io')}]]});
  await D.late();
  s.cam.fx=R.c[0];s.cam.fy=R.c[1];D.go(s.cam,{z:1.08},1800,'io');await D.wait(1700)}
