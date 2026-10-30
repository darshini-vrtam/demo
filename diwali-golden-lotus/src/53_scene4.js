/* ================= SCENE 4: OUR FIRST SHLOKA ================= */
const PRAYER={l:{panel:[86,104,990,742],lotus:[1392,712,.95],lak:[1392,683,.78],light:[540,58],beside:[1094,300],diya:[1094,742],celebrate:[1094,470],exit:[1900,300],
    edge:{y:772,x0:110,x1:1668}},
  p:{panel:[40,420,960,1440],med:[500,262,1.0],medR:140,light:[820,250],beside:[830,300],diya:[160,330],celebrate:[830,300],exit:[1150,200],edge:{y:1478,x0:70,x1:930}}};
const PHRASES=['या देवी सर्वभूतेषु','लक्ष्मीरूपेण संस्थिता ।','नमस्तस्यै नमस्तस्यै','नमस्तस्यै नमो नमः ॥'];
function prayerStage(){const s=mkScene('prayer');
  s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha;el('rect',{x:-4,y:-4,width:W+8,height:H+8,fill:Pat.u('petals',P.indigo,P.midnight,1.3)},this.bg);
    /* symmetrical lotus motifs along both sides */
    const n=Math.max(3,Math.round(H/260));for(let i=0;i<n;i++){const y=(i+.5)/n*H;for(const x of[BORDER+44,W-BORDER-44]){const l=lotus(this.bg,{r:34,n:5,open:.85,pad:false});tf(l.g,x,y+24,1)}}};
  const A=()=>L.portrait?PRAYER.p:PRAYER.l;s.A=A;
  const comp=s.comp;const lakL=grp(comp),medL=grp(comp),propL=grp(comp),edgeL=grp(comp),lightL=grp(comp);
  const blot=bigLotus(lakL,{r:170});blot.openO=1;blot.openI=1;const lak=new Lakshmi(lakL);lakL.appendChild(blot.front);
  const med=medallion(medL,100,{bg:P.indigo});const mlak=new Lakshmi(med.pic);mlak.s=.34;mlak.y=96;
  const dy=diya(propL,{col:P.terra});dy.lit=0;
  /* 4.3: decorative flowers and small unlit diyas along the lower edge */
  const edge=[];for(let i=0;i<9;i++){const g=grp(edgeL);if(i%2){const d=diya(g,{col:i%4===1?P.ochre:P.terra});d.lit=0;d.s=.75;edge.push({g,d})}else{const m=marigold(g,22,i%4?P.gold:P.coral);edge.push({g})}}
  s.st={edge:0};
  const light=goldenLight(lightL,{glow:.65});s.light=light;D.light=light;
  s.fx=fxLayer(s);
  s.onLayout=function(){const a=A(),pn=a.panel;const [x0,y0]=toStage(pn[0],pn[1]),[x1,y1]=toStage(pn[2],pn[3]);const el_=$('shloka');
    const px=v=>Math.round(v*L.U)+'px';el_.style.left=px(x0);el_.style.top=px(y0);el_.style.width=px(x1-x0);el_.style.height=px(y1-y0);
    const w=(x1-x0)*L.U,h=(y1-y0)*L.U;const deva=clamp(Math.min(w/(L.portrait?13:21),h/(L.portrait?17:8.6)),14,46);el_.style.setProperty('--deva',f1(deva)+'px');el_.style.setProperty('--rom',f1(clamp(deva*(L.portrait?.62:.56),11,24))+'px')};
  s.tick=function(dt,t){const a=A();const m=MV();
    if(!L.portrait){show(lakL,true);show(medL,false);blot.x=a.lotus[0];blot.y=a.lotus[1];blot.s=a.lotus[2];blot.update(t);lak.x=a.lak[0];lak.y=a.lak[1];lak.s=a.lak[2];lak.update(dt,t)}
    else{show(lakL,false);show(medL,true);tf(med.g,a.med[0],a.med[1],a.medR/100);mlak.update(dt,t)}
    dy.x=a.diya[0];dy.y=a.diya[1];dy.s=LP(.9,.8);dy.update(t);
    op(edgeL,s.st.edge);if(s.st.edge>0)edge.forEach((e,i)=>{const u=i/(edge.length-1);const x=lerp(a.edge.x0,a.edge.x1,u);tf(e.g,x,a.edge.y+(1-s.st.edge)*60,1);e.d&&e.d.update(t)});
    light.update(dt,t)};
  return s}
const SK={ph:()=>[...document.querySelectorAll('#skLines .ph')],lines:()=>[$('ln1'),$('ln2')],
  reset(){$('shloka').hidden=true;this.clear();['ln1','ln2','translit','meaning'].forEach(id=>$(id).classList.add('fade0'));$('skBadge').hidden=true},
  clear(){this.ph().forEach(p=>p.classList.remove('on'));this.lines().forEach(l=>l.classList.remove('cur'))},
  hl(i){this.ph().forEach((p,j)=>p.classList.toggle('on',Array.isArray(i)?i.includes(j):j===i));const li=Array.isArray(i)?Math.floor(i[0]/2):Math.floor(i/2);this.lines().forEach((l,j)=>l.classList.toggle('cur',i!=null&&i>=0&&j===li))}};
/* chant one phrase: Hindi speech when available, otherwise a timed highlight with a soft chime */
async function chantPhrase(i,o){o=o||{};const tok=D.token;SK.hl(o.line?[i&~1,(i&~1)+1]:i);AU.sfx('wave');Music.duck(true);
  let skipped=false;const skipP=new Promise(r=>{D.skipFn=()=>{skipped=true;Speech.stop();r()}});
  try{if(D.fast)await D.wait(20);else if(canSpeak('chant'))await Promise.race([Promise.all([Speech.speak('chant',PHRASES[i]),D.wait(700)]),skipP]);else{AU.sfx('tick');await Promise.race([D.wait(2300),skipP])}}
  finally{D.skipFn=null;Music.duck(false)}D.guard(tok);return skipped}
async function chantLine(li){for(const i of[li*2,li*2+1]){await chantPhrase(i,{line:false});await D.wait(D.fast?5:350)}}
async function shot4_1(){Store.set('scene',4);mood('reverent');Music.mood('prayer');Music.setLevel(.4,2);const s=prayerStage();D.setScene(s,1500);const light=s.light;const a=s.A();
  light.x=a.light[0];light.y=a.light[1]-200;light.vis=true;
  SK.reset();const pnl=$('shloka');pnl.classList.add('drawing');pnl.hidden=false;s.onLayout();
  await D.wait(600);D.go(light,{y:a.light[1]},1400,'out');
  await D.say('Listen carefully, children!',{cues:[['Listen',()=>{void pnl.offsetWidth;pnl.classList.remove('drawing')}]]});
  await D.say('Our first shloka praises the Divine Goddess who is present in all beings in the form of Lakshmi.',{cues:[['shloka',()=>$('ln1').classList.remove('fade0')],['Divine',()=>$('ln2').classList.remove('fade0')],
    ['present',()=>$('translit').classList.remove('fade0')]]});
  ['ln1','ln2','translit'].forEach(id=>$(id).classList.remove('fade0'));pnl.classList.remove('drawing');
  const b=s.A().beside;await light.travel([[lerp(light.x,b[0],.5),lerp(light.y,b[1],.3)],b],1800);await D.late()}
async function shot4_2(){mood('reverent');let s=D.scene;if(!s||s.id!=='prayer'){s=prayerStage();D.setScene(s,0);const b=s.A().beside;s.light.x=b[0];s.light.y=b[1];s.light.vis=true;
    SK.reset();$('shloka').hidden=false;['ln1','ln2','translit'].forEach(id=>$(id).classList.remove('fade0'));s.onLayout()}
  const light=s.light;
  await D.wait(500);$('meaning').classList.remove('fade0');light.pulse();await D.wait(900);
  await D.say('“We bow to the Divine Goddess who is present in all beings in the form of Lakshmi.”',{cues:[['bow',()=>light.pulse()]]});
  await D.say('Her blessings remind us to be kind, grateful and generous.');
  await D.say('Now, let\'s learn it one line at a time!');await D.late()}
/* ---- INT-04 Listen and Repeat: three linear stages, no microphone, no wrong answer ---- */
async function act4(){mood('gentle');let s=D.scene;if(!s||s.id!=='prayer'){s=prayerStage();D.setScene(s,0);const b=s.A().beside;s.light.x=b[0];s.light.y=b[1];s.light.vis=true;
    SK.reset();$('shloka').hidden=false;['ln1','ln2','translit','meaning'].forEach(id=>$(id).classList.remove('fade0'));s.onLayout()}
  const tok=D.token;const light=s.light;$('skBadge').hidden=canSpeak('chant');
  /* Stage 1: Listen */
  light.set('still');
  await D.ask('Listen carefully to the shloka.',null,'ear');
  for(let i=0;i<4;i++){await chantPhrase(i);await D.wait(D.fast?5:600)}
  SK.clear();await D.wait(700);
  /* Stage 2: Repeat, one line at a time, with a pause for the child to say it */
  light.set('float');let cur=0,again=false,stageDone=false;
  const els=D.controls([{id:'bAgain2',cls:'alt',label:'Listen Again',on:()=>{again=true;if(pauseSkip)pauseSkip()}},{id:'bNext',cls:'lotusbtn',html:ICON.lotus+'Continue',hidden:true,on:()=>{if(stageDone&&contRes)contRes()}}]);
  let pauseSkip=null;let contRes=null;
  await D.ask('Your turn! Repeat after me.',null,'say');
  const turn=async li=>{for(;;){again=false;SK.hl([li*2,li*2+1]);await chantLine(li);SK.hl([li*2,li*2+1]);
      /* the child's turn: a quiet pause while the line stays highlighted */
      await Promise.race([D.wait(D.fast?20:6000),new Promise(r=>pauseSkip=r)]);pauseSkip=null;D.guard(tok);light.pulse();if(!again)break}};
  for(cur=0;cur<2;cur++)await turn(cur);
  SK.clear();stageDone=true;AU.sfx('success');const fl=confirmFlower(s.top);const b=s.A().beside;tf(fl,b[0],b[1]-LP(110,90),1.6);
  els.bNext.hidden=false;
  /* Listen Again replays the last line at any time before Continue */
  els.bAgain2.onclick=null;const again2=async()=>{if(D.skipFn)return;await chantLine(1).catch(()=>{});SK.clear()};els.bAgain2.addEventListener('click',()=>again2());
  await D.task({idle:15,idle2:6,hint:'Press Continue when you\'re ready!',start(t){contRes=()=>t.finish()},assist(t){t.finish()}});
  D.guard(tok);fl.remove();D.clearAct();
  /* Stage 3: Chant Together, phrase by phrase */
  light.set('still');
  await D.ask('Let\'s chant together!',null,'together');
  for(let i=0;i<4;i++){await chantPhrase(i);await D.wait(D.fast?5:900)}
  SK.clear();D.clearAct();light.set('float');Music.swell();await D.late()}
async function shot4_3(){mood('warm');Music.mood('warm');let s=D.scene;if(!s||s.id!=='prayer'){s=prayerStage();D.setScene(s,0);const b=s.A().beside;s.light.x=b[0];s.light.y=b[1];s.light.vis=true;
    SK.reset();$('shloka').hidden=false;['ln1','ln2','translit','meaning'].forEach(id=>$(id).classList.remove('fade0'));s.onLayout()}
  const light=s.light;const c=s.A().celebrate;light.glowK=.75;
  light.travel([c],1200).catch(()=>{});D.go(s.st,{edge:1},1600,'out');
  await D.say('Beautifully done, children!',{cues:[['Beautifully',()=>{light.spin();D.go(light,{bloomK:.7},2000,'out')}]]});
  await D.say('You have learned a shloka in praise of Goddess Lakshmi!');
  D.go(light,{bloomK:.32},1800,'io');
  await D.say([['narr','And remember, the golden light\'s little message:'],['light','“Where there is kindness, goodness grows. Where there is gratitude, happiness glows!”']],{cues:[['gratitude',()=>light.pulse()]]});
  await D.late();
  /* it turns toward the right side, ready to travel to the next setting */
  D.go(light,{look:1,bloomK:0},900);await D.wait(900);const e=s.A().exit;$('shloka').hidden=true;await light.travel([[lerp(light.x,e[0],.5),light.y-LP(80,120)],e],1900,'in')}
