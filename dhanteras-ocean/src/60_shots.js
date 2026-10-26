/* ===== Script: narration and dialogue, verbatim from the story document (storyboard bridging lines marked SB) ===== */
const TXT={
  open:'Little explorers, are you ready for an adventure? Today, we’re travelling to an ocean so enormous that it stretches beyond the farthest star!', /* SB Shot 00 */
  s1:['Little explorers, close your eyes for a moment. Imagine an ocean so enormous that it stretches beyond the farthest star!',
    'Its waves sparkle under the moon. Tiny fish swim through the water. Lotus flowers float like little boats.',
    'But this is no ordinary ocean.',
    'Deep inside it lie wonderful treasures — treasures that no one has ever seen.',
    'Long, long ago, the devas and asuras wished to obtain amrita, the divine nectar associated with immortality.',
    'But there was a problem. The ocean was too vast, and the treasures were hidden too deep.',
    'They needed a plan. They needed a mountain. They needed a giant serpent. And most importantly… they needed helpers!'],
  invite:'Oh! I can see some little explorers joining us. Are your hands ready? We’re going to wake up the ocean!',
  g1cues:['Tiny waves!','Big waves!','Ocean storm!','Ocean asleep!'],
  g1narr:'Tiny waves… big waves… a great big storm… and now… silence!',
  g1trans:'Look! Your waves have awakened the ocean. Something enormous is rising from its depths. It’s Mount Mandara!',
  s2a:'The devas and asuras gathered around Mount Mandara.',
  s2quote:'‘This mountain will be our churning stick!’',s2declared:'they declared.',
  s2b:'But how could they turn a mountain?',
  s2c:'Then mighty Vasuki, the great serpent, came forward. His long body could wrap around the mountain like a living rope.',
  s2d:'The devas and asuras took hold of opposite ends.',
  s2sink:['But wait! The mountain began to sink!','The churning machine was not ready. The mountain needed something strong beneath it.'],
  g2cue:'Can you help us build the strongest churning machine in the whole universe?',
  g2hint:'The mountain needs a strong, steady base beneath the water. Which helper has a broad shell?', /* SB retry hint */
  g2kurma:'Lord Vishnu took the form of a mighty tortoise called Kurma. He supported Mount Mandara, holding it steady beneath the ocean.', /* SB Shot 05 */
  g2trans:['Now the mountain is steady. Vasuki is wrapped around it. The devas and asuras are ready.','Little explorers, hold your imaginary ropes.','The greatest churning the universe has ever seen is about to begin!'],
  s3:['The devas pulled one side. The asuras pulled the other.','Pull! Release! Pull! Release!','Vasuki swayed from side to side. Mount Mandara began to turn. The ocean bubbled, shimmered, and sparkled.',
    'The fish danced between the waves. The lotus flowers bobbed up and down.','And then — pop!','A tiny golden light appeared on the surface.','Then another.','Then another!'],
  s3devas:'‘The treasures are awakening!’',s3cried:'cried the devas.',s3asuras:'‘Keep churning!’',s3called:'called the asuras.',
  s3end:'But the ocean was enormous. It needed all the energy the little explorers could give.',
  g3cue:'Little explorers, hold your imaginary ropes! Can you help the devas and asuras churn the ocean?', /* SB Shot 07 */
  g3cues:['Pull to the left!','Pull to the right!','Churn, churn, churn!','Treasure rising!'],
  g3trans:['Your teamwork has awakened the treasures! But the first thing to rise from the ocean is not gold, not silver, and not jewels.','The next moment will test the courage of everyone gathered there…'],
  s4a:['Suddenly, the ocean grew dark.','A strange, dangerous poison called Halahala began to spread through the water. Its fumes rose into the sky. Everyone stepped back.'],
  s4oh:'‘Oh no!’',s4cried:'cried the devas.',s4what:'‘What will happen to the world?’',
  s4shiva:['The great Lord Shiva came forward.','Seeing the danger, he took the poison and held it in his throat, protecting all creation.','His throat turned blue, and he became known as Neelakantha — the blue-throated one.','The world was safe, but the churning had only just begun.'],
  s4moral:'Little explorers, sometimes protecting others means being brave, caring, and willing to help when things get difficult.',
  g4cue:'Little explorers, let’s help the ocean shine again! Can you send a gentle breeze to move the clouds away?', /* SB Shot 10 */
  g4refrain:'Courage and kindness light the way!',
  g4trans:['Look at the ocean now! The darkness has passed. The waves are sparkling again.','The churning continues, and one by one, the wonderful treasures of the ocean begin to appear.'],
  s5:['First, beautiful treasures appeared from the ocean.','Jewels sparkled like stars.','Wonderful beings emerged, and the devas watched in amazement.',
    'Then Goddess Lakshmi appeared, radiant and beautiful, seated upon a lotus.','She represents prosperity, abundance, and auspiciousness.',
    'The ocean was giving the world many gifts.','But there was still one very special treasure to come.','A treasure more precious than all the gold and jewels.',
    'A gift that could help living beings understand the importance of health and healing.','Who could it be?'],
  g5cue:'Little treasure hunters, the ocean is full of wonderful things! Can you help me find three special treasures hidden in this picture?',
  g5trans:['Just as the children finish finding the treasures, a brilliant golden light begins to shine from the middle of the ocean.','The waves part.','A divine figure slowly rises, carrying something wonderful in his hands…'],
  s6a:['Look, little explorers!','From the shining ocean emerged Lord Dhanvantari, the divine healer. In his hands was a pot containing amrita, the divine nectar associated with immortality.','The devas looked on with wonder.'],
  s6b:['Lord Dhanvantari reminded the world of the precious gift of health and healing.','The ocean had given many treasures, but this arrival carried a lesson for every family: health is a treasure to care for, life is precious, and well-being deserves gratitude.','And that is one of the reasons we remember Lord Dhanvantari on Dhanteras.'],
  fgcue:'Lord Dhanvantari has brought us a very special lesson. Let’s collect three invisible treasures that every child can carry home!',
  fg:{leaf:'Stretch your arms up high and take a gentle breath. Let’s promise to care for our bodies!',heart:'Place your hands over your heart and think of one person you can help.',diya:'Cup your hands as though holding a little lamp. Think of one thing you are thankful for.'},
  close:['And so, little explorers, the story of the cosmic ocean teaches us to cherish the treasures that truly matter.',
    'On Dhanteras, families pray for health, welcome prosperity, worship Lord Dhanvantari, Goddess Lakshmi, and Lord Kubera, and light lamps as a symbol of hope and auspiciousness.',
    'In many Hindu households, a special lamp is also lit in the evening in honour of Yama, associated with protection from untimely death. This tradition is known as Yama Deepam.',
    'People may buy gold, silver, or new utensils as a symbol of good fortune.',
    'But remember, little explorers: a treasure does not have to sparkle to be precious. A healthy body, a caring family, a kind heart, and a light shared with others are treasures too.',
    'This Dhanteras, may your home be filled with health, happiness, kindness, and light!']};
/* added by request: one-line "Previously…" recaps for resumed sessions, and light callbacks to the child's choices */
const RECAP=['','Previously… we opened the storybook and entered the magical ocean.','Previously… the little explorers woke up the ocean, and Mount Mandara rose from the waves.',
  'Previously… Lord Vishnu became Kurma the tortoise and held Mount Mandara steady.','Previously… the devas and asuras churned the ocean, and tiny golden lights appeared.',
  'Previously… Lord Shiva protected the world, and the dark clouds moved away.','Previously… treasures rose from the ocean, and Goddess Lakshmi appeared on her lotus.',
  'Previously… Lord Dhanvantari rose from the ocean with the pot of amrita.'];
const CARD_LABEL={mountain:'Another mountain',serpent:'Another serpent',tortoise:'A giant tortoise'};
const TREASURE_NAME={lotus:'the lotus',jewel:'the jewel',conch:'the conch'};
const CHAPTERS=[{t:'Opening · The Storybook Opens',shot:0},{t:'Scene 1 · A Secret Is Sleeping Beneath the Ocean',shot:1},{t:'Scene 2 · Building the Great Churning Machine',shot:3},
  {t:'Scene 3 · The Ocean Begins to Churn',shot:6},{t:'Scene 4 · The Dark Cloud Over the Ocean',shot:8},{t:'Scene 5 · The Treasures of the Cosmic Ocean',shot:11},
  {t:'Scene 6 · The Arrival of Lord Dhanvantari',shot:13},{t:'Celebration · Lighting the First Lamp',shot:15}];
const SHOT_IDS=['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15'];

const say=(t,o)=>D.say('story',t,o);
function chapter(n){D.chapter=n;if(n>0)Store.set('chapter',n);D.title(CHAPTERS[n].t)}
function inWorld(){if(D.scene!==World)D.setScene(World,'fade',900)}

/* World presets: the state at the start of each chapter, used by resume and "replay this scene" */
function preset(ch){const W=World;W.reset();W.extra=null;W.shivaX=1;W.autoChurn=0;W.lean=0;W.pull=0;W.stormK=0;W.lifeK=1;W.arrows=null;W.waveOut=[];W.beingsK=0;W.g4=null;W.giftPos=null;W.giftScale=null;
  W.bandK=[1,1,1,1];W.mood(['night','hidden','day','churn','dark','treasure','gold','festive'][ch]);
  if(ch>=2){W.mt.vis=1;W.mt.solid=1;W.mt.y=ch===2?o_mh()*.5:0;W.gIn=ch===2?0:1;W.gVis=ch===2?0:1;W.vs.vis=ch===2?0:1;W.vs.wrap=ch===2?0:1}
  if(ch>=3){W.kurma.vis=1;W.lean=1;[...W.devas,...W.asuras].forEach(f=>f.pose('pull',true));W.ripple=.4}
  if(ch===4)W.lights=[.3,.45,.62,.8].map((u,i)=>({u,b:3,t0:-9e9,x:i}));
  if(ch===5){W.lean=0;W.ripple=0}
  if(ch>=6){W.vs.rest=1;W.lean=0;W.ripple=0;[...W.devas,...W.asuras].forEach(f=>{f.pose('fold',true);f.expr='wonder'})}}
function o_mh(){return World.lay().mh}

/* small overlay: petals that drift across the screen (lotus to waves, Lakshmi to the treasure hunt) */
const FX={petals:[],add(x,y,n,spread,col){for(let i=0;i<n;i++){const a=(i/n)*TAU;this.petals.push({x,y,vx:Math.cos(a)*spread*(.6+Math.random()*.6),vy:Math.sin(a)*spread*.25-40,r:Math.random()*TAU,t0:T.now,col:col||(i%2?C.pink:C.coral)})}},
  draw(ctx){this.petals=this.petals.filter(p=>T.now-p.t0<2600);for(const p of this.petals){const k=(T.now-p.t0)/2600,e=ease(k);ctx.save();ctx.globalAlpha*=1-k*k;ctx.translate(p.x+p.vx*e,p.y+p.vy*e+Math.sin(k*6+p.r)*20);ctx.rotate(p.r+k*3);
    const q=sPath([[0,10],[-12,-6],[0,-28],[12,-6]],true);shape(ctx,q,p.col,c=>line(c,[[0,6],[0,-20]],C.cream,2),{lw:1.8});ctx.restore()}}};

/* ---------------- OPENING ---------------- */
async function shot00(){chapter(0);UI.progress('00');const W=World;preset(0);inWorld();W.frameK=0;W.moonK=0;W.starsK=0;W.bandK=[0,0,0,0];W.lifeK=0;W.pan=0;
  W.bud={vis:1,open:0};W.shellK=1;W.extra=openingExtra;
  tw(W,{pan:1},40000,'lin');
  await D.tw(W,{frameK:1},1600,'out');tw(W,{moonK:1},1100);await D.tw(W,{starsK:1},1100);
  for(let i=0;i<4;i++){tw(W.bandK,{[i]:1},900,'out');await D.wait(i===0?120:420)}
  await D.tw(W,{lifeK:1},900);
  /* the start overlay holds here until LET'S BEGIN (which also unlocks audio) */
  await Start.wait();
  UI.cap('story',TXT.open);await say(TXT.open);
  AU.sfx('water');for(let i=1;i<=8;i++){W.bud.open=i/8;AU.sfx('bell',700+i*60);await D.wait(260)}
  /* the opened petals become the first ocean waves */
  const o=W.lay(),b=budPos(o);FX.add(b[0],b[1]-60,14,o.W*.9,C.pink);await D.wait(500);W.bud.vis=0;W.shellK=0;W.extra=null;await D.wait(900)}
function budPos(o){return o.P?[o.W*.16,L.H*.8]:[o.W*.1,L.H*.76]}
function openingExtra(ctx,o){const W=World;if(W.bud.vis>0){const b=budPos(o);drawLotus(ctx,b[0],b[1],o.P?1.5:1.8,W.bud.open,C.pink,C.turmeric)}
  if(W.shellK>0){drawShell(ctx,o.P?o.W*.86:o.W*.91,o.P?L.H*.8:L.H*.78,o.P?1.4:1.7,C.cream,C.coral)}}

/* ---------------- SCENE 1 ---------------- */
async function shot01(){chapter(1);UI.progress('01');const W=World;inWorld();W.mood('hidden',2200);AU.sfx('water');tw(W,{peekK:1},2500);
  await say(TXT.s1.slice(0,3));
  const p=say(TXT.s1[3]);await D.wait(900);W.glint=0;AU.sfx('glow');tw(W,{fishLook:1},800);await D.tw(W,{glint:1},900);W.glint=-1;
  /* a passing wave hides the treasure again */
  tw(W,{amp:1.7},700);await D.tw(W,{peekK:.15},900);tw(W,{amp:1},900);await p;tw(W,{fishLook:0},1200);
  await say(TXT.s1.slice(4));
  W.mood('bright',1800);Music.mood('bright');await say(TXT.invite);Store.push('done','shot01')}

async function shot02(){UI.progress('02');const W=World;let skipAll=false;
  const hit={v:false};W.tapH=()=>{hit.v=true};
  const cues=[{k:'tiny',sub:'Wiggle your fingers',cam:()=>Cam.moving(.02),fx:async()=>{AU.sfx('water');tw(W,{amp:.6,spd:1.8,bob:1.6},700);W.bursts.push({x:L.W*.3,y:W.lay().bands[2],r:70,col:C.cream,t0:T.now})}},
    {k:'big',sub:'Swing your arms from side to side',cam:()=>Cam.moving(.05),fx:async()=>{AU.sfx('water');tw(W,{amp:1.9,spd:1.4,bob:2},900)}},
    {k:'storm',sub:'Clap gently above your head',cam:()=>Cam.raised(),fx:async()=>{AU.sfx('water');AU.sfx('drum',90);tw(W,{amp:2.3,storm:1,stormK:1,spd:1.8},1100)}},
    {k:'asleep',sub:'Freeze!',cam:()=>Cam.still(),fx:async()=>{AU.sfx('soft');tw(W,{amp:.25,spd:.15,bob:.15,storm:0,stormK:0},1600)}}];
  await D.activity({idle:30,start:async()=>{for(let i=0;i<4;i++){if(skipAll)break;const c=cues[i];hit.v=false;
        UI.plaque({icon:g=>drawIcon(g,'wave'),onIcon:()=>{hit.v=true},cue:TXT.g1cues[i],sub:c.sub+' — or tap the glowing wave.',buttons:[{label:'Continue',small:true,on:()=>{skipAll=true;hit.v=true}}],flash:true});
        await say(TXT.g1cues[i],{after:60});
        await D.waitStep(6000,()=>hit.v||c.cam());await c.fx();W.fishLook=0;await D.wait(1300)}},
    assist:()=>{hit.v=true}});
  W.tapH=null;UI.plaque(null);
  if(!skipAll)await say(TXT.g1narr);
  /* success: a golden outline beneath the water, then the wave layers part to reveal Mount Mandara */
  W.mt.vis=1;W.mt.solid=0;W.mt.y=0;AU.sfx('glow');await D.tw(W.mt,{outline:1},1400);AU.sfx('rise');await D.tw(W,{part:1},1600);
  Store.push('done','game1');
  W.mt.solid=1;W.mt.y=o_mh()*1.05;const p=say(TXT.g1trans);tw(W.mt,{y:o_mh()*.5},5000,'out');tw(W.mt,{outline:0},2500);await D.wait(800);tw(W,{part:0,amp:1,spd:1,bob:1},2000);await p}

/* ---------------- SCENE 2 ---------------- */
async function shot03(){chapter(2);UI.progress('03');const W=World;inWorld();if(W.mt.vis<1){preset(2)}W.mt.solid=1;W.mt.vis=1;W.mood('day',2000);Music.mood('night');
  AU.sfx('rise');tw(W.mt,{y:0},3200,'out');await D.wait(1200);W.gVis=1;tw(W,{gIn:1},2600,'out');
  await say(TXT.s2a);
  await D.say('both',[['both',TXT.s2quote],['story',TXT.s2declared]]);
  await say(TXT.s2b);
  W.vs.vis=0;W.vs.wrap=0;const p=say(TXT.s2c);await D.tw(W.vs,{vis:1},800);AU.sfx('water');await D.tw(W.vs,{wrap:1},6500,'io');await p;
  [...W.devas,...W.asuras].forEach(f=>f.pose('reach'));await D.wait(500);
  const q=say(TXT.s2d);await D.wait(900);[...W.devas,...W.asuras].forEach(f=>f.pose('pull'));await q}
async function shot04(){UI.progress('04');const W=World;
  const p=say(TXT.s2sink[0]);await D.wait(500);AU.sfx('descend');[...W.devas,...W.asuras].forEach(f=>{f.expr='concern'});W.lean=-.6;
  tw(W,{ripple:1},800);await D.tw(W.mt,{y:o_mh()*.13},2600,'io');await p;await D.wait(1300);
  await say(TXT.s2sink[1])}
async function shot05(){UI.progress('05');const W=World;let tries=0,first=null,done=false,t0=performance.now();
  const cards=[{key:'mountain',label:CARD_LABEL.mountain,draw:g=>drawMandara(g,150,170,150,140,0)},{key:'serpent',label:CARD_LABEL.serpent,draw:g=>{drawVasukiPart(g,W.resample([[20,150],[80,100],[150,140],[220,90]],6),22);vasukiHead(g,222,88,-.5,.7,0)}},
    {key:'tortoise',label:CARD_LABEL.tortoise,draw:g=>drawKurma(g,170,150,.62,0)}];
  W.vishnu.vis=0;W.vishnu.pose('guide',true);
  await say(TXT.g2cue);
  Cards.show(cards,()=>{},k=>place(k));await D.tw(D,{inset:1},700);tw(W.vishnu,{vis:1},1200);AU.sfx('bells');
  for(const c of cards){if(done||Cards.sel)break;Cards.reading(c.key);await say(c.label,{after:120})}Cards.reading(null);
  /* allow a second tap on the selected card to place it too */
  let resolveDone;const finished=new Promise(r=>resolveDone=r);
  async function place(k){if(done)return;if(!first){first=k;Store.choice('game2First',k)}
    if(k==='tortoise'){done=true;resolveDone();return}
    tries++;Cards.wobble(k);AU.sfx('soft');W.vishnu.pose('explain');await D.say('vishnu',TXT.g2hint).catch(()=>{});W.vishnu.pose('guide');
    /* after two tries the tortoise card pulses and the story helps */
    if(tries>=2&&!done){Cards.pulse('tortoise');await D.wait(2600).catch(()=>{});if(!done){Cards.select('tortoise');await D.wait(700).catch(()=>{});place('tortoise')}}}
  $('tray').onclick=(e=>{const b=e.target.closest('.card');if(b&&b.classList.contains('picked')&&b.dataset.tap==='1')place(b.dataset.k);if(b){document.querySelectorAll('.card').forEach(x=>x.dataset.tap='0');b.dataset.tap='1'}});
  await D.activity({idle:15,start:()=>finished,hint:()=>{Cards.pulse('tortoise')},assist:()=>{Cards.select('tortoise');setTimeout(()=>place('tortoise'),600)},assistAfter:6});
  void t0;
  /* success: the tortoise card travels to the mountain; Vishnu becomes Kurma; the mountain settles onto the shell */
  Store.push('done','game2');Store.choice('supportPlaced',true);Cards.select('tortoise');AU.sfx('chime');
  const o=W.lay();const ins=insetRect();const r=app.getBoundingClientRect();const tx=r.left+(ins.x+o.cx*ins.s)*L.U,ty=r.top+(ins.y+o.rim*ins.s)*L.U;
  await Cards.fly('tortoise',tx,ty);Cards.hide();tw(D,{inset:0},700);
  const p=say(TXT.g2kurma);W.vishnu.pose('bless');await D.wait(600);
  W.burstAt(o.vishnu.x,o.vishnu.y-150*o.vishnu.s,C.turmeric,120);await D.tw(W.vishnu,{vis:0},1200);
  W.kurma.y=o.ks*160;W.kurma.vis=0;AU.sfx('rise');tw(W.kurma,{vis:1},900);await D.tw(W.kurma,{y:0},2200,'out');
  tw(W.mt,{y:0},1800,'out');tw(W,{ripple:0,amp:.8},2000);[...W.devas,...W.asuras].forEach(f=>f.expr='smile');W.lean=0;await p;
  await say(TXT.g2trans);W.amp=1}

/* ---------------- SCENE 3 ---------------- */
async function churnTo(v,ms){const W=World;W.lean=1;W.arrows=v<0?-1:v>0?1:null;AU.sfx('drum',v<0?110:130);await D.tw(W,{pull:v},ms||700,'io')}
async function shot06(){chapter(3);UI.progress('06');const W=World;inWorld();W.mood('churn',1800);Music.mood('night');
  const first=Store.choice('game2First');
  if(first&&first!=='tortoise')await say(`First you tried ${CARD_LABEL[first].toLowerCase()}, and then you found the giant tortoise. Kurma is holding steady, just like you helped.`);
  else await say('Kurma is holding steady, just like you helped.');
  let p=say(TXT.s3[0]);await churnTo(-1,1100);await D.wait(500);await churnTo(1,1300);await p;
  p=say(TXT.s3[1]);for(let i=0;i<2;i++){await churnTo(-1,600);await churnTo(1,600)}await p;
  W.arrows=null;W.autoChurn=1;p=say(TXT.s3[2]);tw(W,{ripple:1,swirlA:.8},1600);await p;
  p=say(TXT.s3[3]);tw(W,{bob:2.2},800);await p;tw(W,{bob:1.2},800);
  await say(TXT.s3[4]);W.addLight(.38);W.burstAt(L.W*.38,W.lay().bands[3],C.turmeric,60);
  await say(TXT.s3[5]);W.addLight(.6);await say(TXT.s3[6]);W.addLight(.78);await say(TXT.s3[7]);
  await D.say('devas',[['devas',TXT.s3devas],['story',TXT.s3cried]]);
  await D.say('asuras',[['asuras',TXT.s3asuras],['story',TXT.s3called]]);
  await say(TXT.s3end)}

async function shot07(){UI.progress('07');const W=World;let skipAll=false;const hit={v:null};
  W.autoChurn=0;tw(W,{pull:0},500);W.lean=1;
  W.tapH=p=>{hit.v={tap:p}};W.dragH=(p,d)=>{if(!d)return;const dx=d.x-d.x0;hit.v={drag:dx,path:d.path}};
  await say(TXT.g3cue);
  const prevKinds=['conch','jewel','lotus'];
  const ok=(i,v)=>{if(!v)return false;if(v.btn||(v.tap&&v.tap.key))return true;const o=W.lay();
    if(i===0)return(v.drag!=null&&v.drag<-40)||(v.tap&&v.tap.x<o.cx);
    if(i===1)return(v.drag!=null&&v.drag>40)||(v.tap&&v.tap.x>=o.cx);
    if(i===2){if(v.path&&v.path.length>8){let a=0;for(let k=1;k<v.path.length;k++){const a0=Math.atan2(v.path[k-1].y-o.mb,v.path[k-1].x-o.cx),a1=Math.atan2(v.path[k].y-o.mb,v.path[k].x-o.cx);let d=a1-a0;if(d>Math.PI)d-=TAU;if(d<-Math.PI)d+=TAU;a+=d}return Math.abs(a)>3.5}return!!v.tap}
    return!!v.tap};
  const cams=[()=>Cam.side()===-1,()=>Cam.side()===1,()=>Cam.moving(.05),()=>Cam.raised()];
  const subs=['Lean gently to the left, or drag Vasuki to the left','Lean gently to the right, or drag Vasuki to the right','Circle your hands, or draw a circle around the mountain','Lift both hands and cheer “Hooray!”'];
  const icons=[g=>{drawIcon(g,'rope');line(g,[[-30,-40],[-50,-40]],C.line,6);line(g,[[-50,-40],[-40,-48]],C.line,6);line(g,[[-50,-40],[-40,-32]],C.line,6)},g=>{drawIcon(g,'rope');line(g,[[30,-40],[50,-40]],C.line,6);line(g,[[50,-40],[40,-48]],C.line,6);line(g,[[50,-40],[40,-32]],C.line,6)},
    g=>{for(let i=0;i<20;i++){const a=i/20*TAU*1.6,r=8+i*2;dot(g,Math.cos(a)*r,Math.sin(a)*r,5,i%2?C.turmeric:C.peacock)}},g=>drawMedal(g,0,0,.6)];
  const btnLabels=['Pull left','Pull right','Churn!','Hooray!'];
  const fx=[async()=>{await churnTo(-1,700);W.waveOut.push({side:-1,t0:T.now})},async()=>{await churnTo(1,700);W.waveOut.push({side:1,t0:T.now})},
    async()=>{W.arrows=null;AU.sfx('water');tw(W,{swirlA:1,ripple:1},400);tw(W.mt,{rot:W.mt.rot+1},1800,'io');W.vsFlow=60;await D.wait(1800);W.vsFlow=0;tw(W,{swirlA:.3},800)},
    null];
  await D.activity({idle:40,start:async()=>{for(let round=0;round<3&&!skipAll;round++){for(let i=0;i<4&&!skipAll;i++){hit.v=null;
        const show=()=>UI.plaque({icon:icons[i],cue:TXT.g3cues[i],sub:subs[i],buttons:[{label:btnLabels[i],main:true,on:()=>{hit.v={btn:1}}},{label:'Continue',small:true,on:()=>{skipAll=true;hit.v={btn:1}}}],flash:true});
        show();await say(TXT.g3cues[i],{after:60});
        let r=await D.waitStep(7000,()=>ok(i,hit.v)||cams[i]());
        if(r==='auto'&&!skipAll){/* gentle repeat: the characters pull again and the cue is spoken once more */
          if(i<2)await churnTo(i===0?-1:1,600);await say(TXT.g3cues[i],{after:60});hit.v=null;await D.waitStep(7000,()=>ok(i,hit.v)||cams[i]())}
        if(i<3)await fx[i]();else{const kind=prevKinds[round];AU.sfx('glow');[...W.devas,...W.asuras].forEach(f=>f.pose('cheer'));const it={u:[.3,.7,.5][round],k:0,kind};W.prev.push(it);await D.tw(it,{k:1},1600,'out');
          [...W.devas,...W.asuras].forEach(f=>f.pose('pull'))}
        await D.wait(250)}}},assist:()=>{hit.v={btn:1}}});
  W.tapH=W.dragH=null;UI.plaque(null);W.arrows=null;Store.push('done','game3');W.autoChurn=1;Music.swell();AU.sfx('celebrate');
  await say(TXT.g3trans)}

/* ---------------- SCENE 4 ---------------- */
async function shot08(){chapter(4);UI.progress('08');const W=World;inWorld();
  W.autoChurn=0;tw(W,{pull:0,swirlA:0,ripple:0},1200);W.arrows=null;Music.mood('dark');Music.set(.25,2);
  let p=say(TXT.s4a[0]);W.mood('dark',3200);tw(W,{lotusOpen:0},2600);await p;
  [...W.devas,...W.asuras].forEach(f=>{f.pose('release');f.expr='concern'});
  p=say(TXT.s4a[1]);W.hala=0;W.halaRise=0;W.halaC=0;tw(W,{hala:1},1500);tw(W,{halaRise:1},4500,'out');tw(W,{fishEdge:1},3000);
  W.prev.forEach(it=>tw(it,{k:0},1500));W.lights.forEach(l=>{l.a=1;tw(l,{a:0},1500)});await D.wait(2200);
  W.lean=0;[...W.devas,...W.asuras].forEach(f=>f.pose('look'));tw(W.vs,{rest:1},1200);tw(W,{gOut:1},1500);await p;W.prev=[];W.lights=[];
  await D.say('devas',[['devas',TXT.s4oh],['story',TXT.s4cried],['devas',TXT.s4what]]);
  /* Lord Shiva enters from the right, calm and composed */
  W.shiva.vis=1;W.shiva.pose('idle',true);W.shiva.expr='calm';W.shivaX=1;await D.tw(W,{shivaX:0},2600,'out')}
async function shot09(){UI.progress('09');const W=World;tw(W,{shivaZoom:1},2200,'io');
  await say(TXT.s4shiva[0]);
  const p=say(TXT.s4shiva[1]);W.shiva.pose('raise');await D.wait(900);await D.tw(W,{halaC:1},3600,'io');W.shiva.expr='closed';await p;
  const q=say(TXT.s4shiva[2]);await D.wait(600);AU.sfx('bell',784);tw(W.shiva,{throat:1},1500);await D.wait(900);await D.tw(W,{hala:0},1400);W.shiva.expr='calm';W.shiva.pose('calm');await q;
  /* turquoise patterns return gradually; three clouds still hang over the water */
  W.mood('hidden',3000);Music.mood('night');Music.set(.4,3);tw(W,{fishEdge:.4},2500);[...W.devas,...W.asuras].forEach(f=>{f.pose('fold');f.expr='calm'});
  await say(TXT.s4shiva[3]);await say(TXT.s4moral)}
async function shot10(){UI.progress('10');const W=World;const o0=W.lay();
  const G={clouds:[0,1,2].map(i=>({i,dx:0,gone:false,k:1})),reveal:[0,0,0]};W.g4=G;W.extra=g4Draw;
  G.clouds.forEach(c=>{c.k=0;tw(c,{k:1},900)});void o0;
  await say(TXT.g4cue);
  let resolveAll;const all=new Promise(r=>resolveAll=r);let busy=false,lastCam=0;
  const send=async(c,dir)=>{if(!c||c.gone||busy)return;busy=true;c.gone=true;AU.sfx('breeze');const o=W.lay();await tw(c,{dx:(dir||1)*o.W*.6,k:0},1600,'io');
    AU.sfx(c.i===2?'chime':'glow');await tw(G.reveal,{[c.i]:1},700,'out');busy=false;if(G.clouds.every(x=>x.gone))resolveAll()};
  const next=()=>G.clouds.find(c=>!c.gone);
  W.tapH=p=>{const c=g4Hit(p);if(c)G.drag={c,x0:p.x,dx0:c.dx}};
  W.moveH=(p)=>{if(G.drag&&!G.drag.c.gone){G.drag.c.dx=G.drag.dx0+(p.x-G.drag.x0)}};
  W.dragH=(p,d)=>{const g=G.drag;G.drag=null;if(!g||g.c.gone)return;const dx=p.x-g.x0;if(Math.abs(dx)>30)send(g.c,Math.sign(dx));else send(g.c,g.c.i===0?-1:1)};
  const camIv=setInterval(()=>{if(Cam.moving(.05)&&performance.now()-lastCam>3000){lastCam=performance.now();const c=next();if(c)send(c,c.i===0?-1:1)}},200);
  UI.plaque({icon:g=>drawIcon(g,'breeze'),cue:'Send a gentle breeze',sub:'Wave your hands, swipe a cloud, or tap SEND A BREEZE.',buttons:[{label:'SEND A BREEZE',main:true,on:()=>{const c=next();if(c)send(c,c.i===0?-1:1)}},{label:'Continue',small:true,on:()=>{G.clouds.forEach(c=>{if(!c.gone){c.gone=true;tw(c,{dx:L.W*.6,k:0},900);tw(G.reveal,{[c.i]:1},700)}});setTimeout(resolveAll,1000)}}]});
  try{await D.activity({idle:15,start:()=>all,hint:()=>{const c=next();if(c){send(c,c.i===0?-1:1)}},assistAfter:15,assist:()=>{const c=next();if(c)send(c,c.i===0?-1:1)}})}finally{clearInterval(camIv);W.tapH=W.moveH=W.dragH=null}
  /* after the third cloud: the lotus reopen and the ocean returns to bright turquoise */
  Store.push('done','game4');W.mood('bright',2000);tw(W,{lotusOpen:1,fishEdge:0},2200);Music.swell();AU.sfx('celebrate');
  tw(W,{refrain:1},700);await D.say('all',TXT.g4refrain);await D.wait(600);tw(W,{refrain:0},700);
  tw(W,{shivaX:1.3},3000,'io');tw(W,{shivaZoom:0},2000);const p=say(TXT.g4trans);await D.wait(1500);[...W.devas,...W.asuras].forEach(f=>f.pose('pull'));W.lean=1;tw(W.vs,{rest:0},1200);tw(W,{gOut:0},1500);W.autoChurn=.6;await p;
  W.shiva.vis=0;G.clouds=[];W.extra=null}
function g4Pos(o,i){const y=o.P?o.hz-120:o.hz-90;return[o.cx+(i-1)*o.mw*(o.P?.62:.78),y+(i===1?-50:0)]}
function g4Hit(p){const W=World,o=W.lay(),G=W.g4;if(!G)return null;for(let i=2;i>=0;i--){const c=G.clouds[i];if(!c||c.gone)continue;const [x,y]=g4Pos(o,i);if(Math.abs(p.x-x-c.dx)<170&&Math.abs(p.y-y)<110)return c}return null}
function g4Draw(ctx,o){const W=World,G=W.g4;if(!G)return;
  for(let i=0;i<3;i++){const k=G.reveal[i];if(k<=0)continue;const [x,y]=g4Pos(o,i);ctx.save();ctx.globalAlpha*=k;
    if(i===0)drawStar(ctx,x,y,2.4,C.turmeric);else if(i===1)drawLotus(ctx,x,y+40,1.1,1);else{const p=sPath(ellPts(x,y,120,60,14),true);shape(ctx,p,C.turq,c=>{drawCloud(c,x-30,y+10,.6,C.cream,C.turq);drawStar(c,x+60,y-14,.6,C.cream)},{lw:2.4})}ctx.restore()}
  const order=[1,0,2];for(const i of order){const c=G.clouds[i];if(!c||c.k<=0)continue;const [x,y]=g4Pos(o,i);ctx.save();ctx.globalAlpha*=c.k;drawDarkCloud(ctx,x+c.dx+Math.sin(T.sec*.7+i)*6,y,o.P?.8:1);ctx.restore()}
  if(W.refrain>0){ctx.save();ctx.globalAlpha*=W.refrain;const w=Math.min(o.W-100,900),h=120,y=L.top()+20;plaque(ctx,o.cx-w/2,y,w,h);const sz=o.P?40:46;const ln=wrapLines(ctx,TXT.g4refrain,w-60,sz);ln.forEach((s,j)=>ctext(ctx,s,o.cx,y+h/2+(j-(ln.length-1)/2)*sz*1.1,sz,C.red));ctx.restore()}}

/* ---------------- SCENE 5 ---------------- */
async function shot11(){chapter(5);UI.progress('11');const W=World;inWorld();W.mood('treasure',2200);Music.mood('bright');W.autoChurn=.5;W.lean=1;
  W.conch={y:1,vis:1};W.jewel={y:1,vis:1};W.medal={y:1,vis:0};
  let p=say(TXT.s5[0]);AU.sfx('rise');await D.tw(W.conch,{y:0},2200,'out');AU.sfx('rise');await D.tw(W.jewel,{y:0},2200,'out');await p;
  p=say(TXT.s5[1]);AU.sfx('glow');const o=W.lay();W.burstAt(o.cx+o.mw*(o.P?.62:.78),o.bands[2]-70,C.emerald,90);await p;
  p=say(TXT.s5[2]);W.medal.vis=1;AU.sfx('rise');tw(W,{beingsK:1},2400);await D.tw(W.medal,{y:0},2400,'out');W.devas.forEach(f=>f.expr='wonder');await p;
  /* the water parts around a large lotus bud; it opens to reveal Goddess Lakshmi */
  W.autoChurn=0;tw(W,{pull:0},800);W.lean=0;tw(W.vs,{rest:1},1400);tw(W.medal,{vis:0},1200);tw(W,{beingsK:0},1500);
  p=say(TXT.s5[3]);W.lbud={vis:1,open:0,y:1};tw(W,{part:.55},1500);AU.sfx('water');await D.tw(W.lbud,{y:0},2000,'out');
  W.lakshmi.vis=0;tw(W.lakshmi,{vis:1},2400);for(let i=1;i<=8;i++){W.lbud.open=i/8;AU.sfx('bell',600+i*70);await D.wait(240)}
  [...W.devas,...W.asuras].forEach(f=>{f.pose('fold');f.expr='wonder'});await p;
  p=say(TXT.s5[4]);W.lakshmi.pose('bless');tw(W,{floral:1},2400);Music.swell();await p;tw(W,{part:0},1500);
  await say(TXT.s5.slice(5));
  /* Lakshmi's lotus petals drift across the screen and become shapes in the treasure hunt */
  FX.add(o.lak.x,o.lak.y-120,16,o.W*.8);await D.wait(1400)}

async function shot12(){UI.progress('12');Hunt.reset();Store.set('treasures',[]);D.setScene(Hunt,'fade',900);UI.stripOn=true;UI.strip();
  const counter=()=>{const n=Hunt.order.length;huntPlaque(`${n} of 3 treasures found`)};
  const huntPlaque=(cue)=>UI.plaque({slots:['lotus','jewel','conch'].map(k=>({k,on:!!Hunt.found[k],label:Hunt.targets[k].label})),cue,
    buttons:[{label:'Need a hint?',on:()=>{Hunt.hint=Hunt.next()}},{label:'Continue',small:true,on:()=>{['lotus','jewel','conch'].forEach(k=>Hunt.find(k))}}]});
  counter();
  let resolve;const all=new Promise(r=>resolve=r);Hunt.onFind=()=>{counter();UI.strip();if(Hunt.order.length===3)resolve()};
  await say(TXT.g5cue);
  await D.activity({idle:15,start:()=>all,hint:()=>{Hunt.hint=Hunt.next()},assistAfter:8,assist:()=>{const k=Hunt.next();if(k)Hunt.find(k)}});
  Store.push('done','game5');AU.sfx('celebrate');await D.wait(1200);UI.plaque(null);
  /* transition narration over the golden light rising in the ocean */
  const W=World;preset(6);W.lakshmi.vis=0;W.lbud.vis=0;W.dhan.vis=0;W.spd=.35;W.amp=.7;D.setScene(W,'fade',1200);D.title(CHAPTERS[5].t);
  await say(TXT.g5trans[0]);AU.sfx('glow');tw(W,{goldC:.6},1800);await say(TXT.g5trans[1]);tw(W,{part:.4},1600);await say(TXT.g5trans[2])}

/* ---------------- SCENE 6 ---------------- */
async function shot13(){chapter(6);UI.progress('13');const W=World;inWorld();if(W.goldC<=0){W.spd=.35;W.amp=.7}W.mood('gold',1600);
  /* golden circle, waves open symmetrically, Dhanvantari rises slowly with the pot */
  AU.sfx('glow');await D.tw(W,{goldC:1},1400);await D.tw(W,{part:1.15},1800);
  AU.sfx('conch');W.dhan.vis=1;W.dhan.pose('hold',true);W.dhan.expr='calm';W.dhanRise=0;const rise=D.tw(W,{dhanRise:1},6500,'io');
  await say(TXT.s6a[0]);await rise;AU.sfx('bells');Music.swell();
  const p=say(TXT.s6a[1]);for(let i=0;i<3;i++){await D.tw(W,{potPulse:1},700);await D.tw(W,{potPulse:0},900)}await p;
  [...W.devas,...W.asuras].forEach(f=>{f.expr='wonder'});AU.sfx('celebrate');await say(TXT.s6a[2]);tw(W,{goldC:.6},1500);
  /* the golden motifs around the pot separate into a leaf, a heart and a diya */
  const o=W.lay(),pot=W.dhan.toWorld(W.potLocal);W.giftPos={leaf:pot.slice(),heart:pot.slice(),diya:pot.slice()};W.giftScale={leaf:.3,heart:.3,diya:.3};W.giftVis=1;AU.sfx('rise');
  await Promise.all(['leaf','heart','diya'].map(k=>D.tw(W.giftPos[k],{0:o.gifts[k][0],1:o.gifts[k][1]},1800,'out')).concat(['leaf','heart','diya'].map(k=>D.tw(W.giftScale,{[k]:1},1800,'out'))));
  W.giftPos=null;W.giftScale=null}
async function shot14(){UI.progress('14');const W=World;W.giftVis=1;UI.stripOn=true;UI.strip();
  await say(TXT.s6b);await say(TXT.fgcue);
  const order=['leaf','heart','diya'],cams={leaf:()=>Cam.raised(),heart:()=>false,diya:()=>false};
  const name={leaf:'Health',heart:'Kindness',diya:'Gratitude'};
  for(const k of order){let filled=false,resolve;const done=new Promise(r=>resolve=r);
    const fill=async()=>{if(filled)return;filled=true;W.giftHL[k]=0;AU.sfx('chime');const o=W.lay();W.burstAt(o.gifts[k][0],o.gifts[k][1],C.turmeric,120);await D.tw(W.gifts,{[k]:1},1200,'out');Store.push('gifts',k);UI.strip();resolve()};
    W.tapH=p=>{const o=W.lay(),g=o.gifts[k];if(Math.hypot(p.x-g[0],p.y-g[1])<Math.max(110,40/L.U))fill()};
    UI.plaque({icon:g=>drawGift(g,k,0,0,.5,1,T.sec,0),cue:name[k],sub:TXT.fg[k],buttons:[{label:'Tap the '+k,main:true,on:fill}],flash:true});
    W.giftHL[k]=1;const camIv=setInterval(()=>{if(cams[k]())fill()},300);
    await say(TXT.fg[k]);
    try{await D.activity({idle:15,start:()=>done,hint:()=>{W.giftHL[k]=1;AU.sfx('glow')},assistAfter:3,assist:fill})}finally{clearInterval(camIv)}
    if(k==='leaf')W.dhan.pose('bless');await D.wait(500)}
  W.tapH=null;UI.plaque(null);Store.push('done','final');
  /* healthComplete, kindnessComplete and gratitudeComplete: the whole ocean becomes festive and bright */
  W.mood('festive',2200);tw(W,{festive:1,goldC:0,part:.4},2200);Music.swell();AU.sfx('celebrate');W.dhan.pose('bless');[...W.devas,...W.asuras].forEach(f=>{f.pose('cheer');f.expr='smile'});await D.wait(3200);
  /* the completed diya expands into the first lamp */
  const o=W.lay();W.giftScale={diya:1};AU.sfx('lamp');await D.tw(W.giftScale,{diya:1.9},1500,'io');await D.wait(300)}

/* ---------------- CELEBRATION ---------------- */
async function shot15(){chapter(7);UI.progress('15');const S=Celebration;S.reset();S.build();D.setScene(S,'fade',1400);UI.strip();
  let autoAt=null;S.onLit=()=>{D.lastInput=performance.now()};
  AU.sfx('water');await D.tw(S,{floorK:1},2200);tw(S,{houseK:1},1400);await D.tw(S,{firstK:1},1200,'back');
  const first=S.lamps[0];await D.wait(500);S.light(first);
  UI.plaque({icon:g=>drawDiya(g,-10,20,.8,{lit:1,t:T.sec,halo:false}),cue:'Light the lamps',sub:'Tap each diya to share the light.',buttons:[{label:'Light them all',small:true,on:()=>{autoAt=0}}]});
  /* the light spreads one lamp at a time: the child may tap, the rest light themselves after about 15 seconds */
  const startT=performance.now();let stopSpread=false;
  (async()=>{try{await D.wait(15000);if(autoAt==null)autoAt=0}catch(e){}})();
  const spread=(async()=>{const tok=D.token;while(!stopSpread&&tok===D.token){const l=S.lamps.find(x=>!x.lit);if(!l)break;if(autoAt!=null||performance.now()-D.lastInput>15000&&performance.now()-startT>15000){S.light(l);await D.wait(700).catch(()=>{});}else await new Promise(r=>setTimeout(r,200))}})();
  tw(S,{tableauK:1},2000);tw(S,{edgeK:1},3000);
  await say(TXT.close.slice(0,5));
  autoAt=0;await spread;stopSpread=true;UI.plaque(null);
  const p=say(TXT.close[5]);await D.wait(1200);AU.sfx('celebrate');Music.swell();await D.tw(S,{blessK:1},1400);await p;
  Store.push('done','celebration');
  /* hold the final frame 5-7 seconds */
  await D.wait(6000);
  if(!(D.qa&&D.qa.noEnd))End.show()}

const SHOTS=[shot00,shot01,shot02,shot03,shot04,shot05,shot06,shot07,shot08,shot09,shot10,shot11,shot12,shot13,shot14,shot15];
