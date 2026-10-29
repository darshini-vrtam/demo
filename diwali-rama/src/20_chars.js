/* ===== Character bible =====
   Every figure is built once as an SVG group. A pose state machine changes transforms only,
   so clothing, hairstyle, jewellery and skin tone never change between scenes. */
/* skin and fur tones (the only colours outside the palette tokens) */
const SKIN={rama:'#4A9AA6',sita:'#D9996A',lak:'#C98A5E',han:'#C9732F',ravana:'#9A6A55'};
const FUR=['#9C6B3E','#B98A52','#7E5B3A','#C99A62','#A8743F','#8E6440'];
const PSKIN=['#8D5A3B','#A86B45','#C98A5E','#D9A274','#7A4A2E','#B57A50'];
const CAST={
  rama:{name:'Rama',skin:SKIN.rama,garment:'dhoti',g1:P.turmeric,g2:P.verm,sash:P.verm,sashDot:P.turmeric,hair:'knot',band:P.gold,tilak:true,jewel:2,quiver:true},
  sita:{name:'Sita',skin:SKIN.sita,garment:'sari',g1:P.verm,g2:P.gold,blouse:P.leaf,pallu:P.verm,hair:'braid',band:P.gold,bindi:true,jewel:1},
  lak:{name:'Lakshmana',skin:SKIN.lak,garment:'dhoti',g1:P.leaf,g2:P.marigold,sash:P.marigold,sashDot:P.verm,hair:'knot',band:P.leaf,tilak:true,jewel:1,quiver:true,scale:.96},
  hanuman:{name:'Hanuman',skin:SKIN.han,face:'monkey',garment:'dhoti',g1:P.verm,g2:P.turmeric,sash:P.turmeric,sashDot:P.verm,hair:'monkey',crown:true,jewel:2,tail:true}};
function vanaraCfg(v){const g=[[P.leaf,P.turmeric],[P.peacock,P.ivory],[P.marigold,P.verm],[P.terra,P.ivory],[P.indigo,P.turmeric],[P.forest,P.marigold]][v%6];
  return{name:'Vanara',skin:FUR[v%FUR.length],face:'monkey',garment:'wrap',g1:g[0],g2:g[1],hair:'monkey',jewel:0,beads:true,tail:true,scale:.84}}
/* the people of Ayodhya: one function, many varied people */
function personCfg(seed,o){o=o||{};const r=rng(seed*977+13);const pick=a=>a[Math.floor(r()*a.length)];const child=o.child!=null?o.child:r()<.35;const fem=o.fem!=null?o.fem:r()<.5;
  const cloth=[[P.verm,P.turmeric],[P.peacock,P.marigold],[P.leaf,P.ivory],[P.marigold,P.maroon],[P.indigo,P.gold],[P.terra,P.ivory],[P.maroon,P.turmeric],[P.turmeric,P.verm]];
  const c=pick(cloth),c2=pick(cloth);const elder=!child&&r()<.25;
  return{name:'Person',skin:pick(PSKIN),garment:fem?(child?'skirt':'sari'):(child?'kurta':pick(['dhoti','kurta','kurta'])),g1:c[0],g2:c[1],blouse:c2[0],pallu:c2[0],top:c2[0],sash:c2[0],sashDot:c2[1],
    hair:fem?(child?pick(['braid','bun','short2']):pick(['bun','braid'])):pick(['short','short','turban']),hairCol:elder?P.ivory:K,turban:pick([P.verm,P.turmeric,P.peacock,P.marigold]),
    band:pick([P.gold,P.verm,P.leaf]),bindi:fem&&!child,jewel:fem?1:0,shawl:elder&&!fem,scale:child?.64:(.86+r()*.1),head:child?1.22:1,beard:elder&&!fem&&r()<.6}}

/* poses: arms (ba,bb back; fa,fb front) and legs (bt,bs back; ft,fs front) in degrees from straight down, + towards the facing side.
   lean tilts the body at the hip; tilt nods the head; seated swaps the legs for a seated drape. */
const POSE={
  idle:{ba:-6,bb:10,fa:6,fb:14},
  walk:{ba:-6,bb:10,fa:6,fb:14,walk:1},
  march:{ba:-6,bb:10,fa:6,fb:14,walk:1,lean:3},
  lookdown:{ba:-4,bb:12,fa:10,fb:20,lean:6,tilt:22,eye:'down',mouth:'soft'},
  concerned:{ba:-4,bb:12,fa:24,fb:70,tilt:8,eye:'open',mouth:'worry',brow:'sad'},
  determined:{ba:-4,bb:10,fa:10,fb:22,lean:-3,tilt:-3,mouth:'flat',brow:'firm'},
  bowRaised:{ba:72,bb:84,fa:90,fb:0,ft:16,fs:-4,bt:-12,lean:-2,mouth:'flat',brow:'firm',bowHand:'f'},
  stepToward:{ba:-14,bb:20,fa:44,fb:24,ft:22,fs:-10,bt:-10,lean:4,mouth:'smile',eye:'open'},
  bless:{ba:-6,bb:12,fa:62,fb:82,mouth:'smile',eye:'happy'},
  namaste:{ba:24,bb:118,fa:32,fb:112,tilt:-2,mouth:'smile'},
  pointAhead:{ba:-6,bb:12,fa:92,fb:-4,lean:3,ft:8,mouth:'smile',eye:'open'},
  gestureClue:{ba:-6,bb:12,fa:54,fb:26,lean:8,tilt:12,ft:12,mouth:'smile',eye:'open'},
  smile:{ba:-6,bb:10,fa:8,fb:16,mouth:'big',eye:'happy'},
  afraid:{ba:34,bb:104,fa:44,fb:112,lean:-6,tilt:-4,eye:'wide',mouth:'worry',brow:'sad',shiver:1},
  /* Sita */
  seated:{seated:1,ba:28,bb:46,fa:40,fb:50,mouth:'soft'},
  seatedSad:{seated:1,ba:28,bb:46,fa:40,fb:52,tilt:14,eye:'down',mouth:'worry',brow:'sad'},
  seatedHope:{seated:1,ba:28,bb:46,fa:52,fb:76,tilt:-6,eye:'wide',mouth:'o',brow:'up'},
  receiveRing:{seated:1,ba:28,bb:46,fa:66,fb:14,tilt:4,eye:'wide',mouth:'smile',brow:'up'},
  seatedPoint:{seated:1,ba:28,bb:46,fa:92,fb:-4,mouth:'smile',eye:'open'},
  seatedJoy:{seated:1,ba:28,bb:46,fa:50,fb:80,tilt:-4,eye:'happy',mouth:'big'},
  /* Hanuman pose sheet */
  standRing:{ba:-6,bb:12,fa:52,fb:48,mouth:'smile',eye:'open'},
  prepLeap:{ba:-46,bb:14,fa:-34,fb:16,ft:62,fs:-104,bt:44,bs:-96,lean:20,tilt:-8,eye:'open',mouth:'smile'},
  leap:{ba:96,bb:0,fa:108,fb:0,ft:44,fs:-44,bt:-52,bs:-30,lean:38,tilt:-26,eye:'open',mouth:'big',air:1},
  land:{ba:-34,bb:18,fa:46,fb:14,ft:38,fs:-62,bt:12,bs:-54,lean:8,mouth:'smile'},
  bowResp:{ba:24,bb:118,fa:34,fb:108,lean:22,tilt:16,eye:'happy',mouth:'smile'},
  kneelPresent:{ba:18,bb:40,fa:76,fb:8,ft:86,fs:-86,bt:-12,bs:-80,lean:6,tilt:8,mouth:'smile',eye:'open'},
  speakGently:{ba:-6,bb:12,fa:40,fb:50,tilt:6,mouth:'smile'},
  rejoice:{ba:-128,bb:24,fa:120,fb:-22,lean:-3,tilt:-8,mouth:'big',eye:'happy'},
  /* vanaras */
  carryStone:{ba:56,bb:72,fa:62,fb:70,lean:4,mouth:'smile'},
  carryBranch:{ba:56,bb:72,fa:62,fb:70,lean:4,mouth:'smile'},
  wait:{ba:12,bb:30,fa:14,fb:34,mouth:'smile'},
  /* people of Ayodhya */
  sweep:{ba:20,bb:30,fa:40,fb:10,lean:22,tilt:8,ft:10,osc:['fa',12,1.6]},
  garlands:{ba:46,bb:60,fa:52,fb:58,tilt:4,mouth:'smile'},
  rangoli:{ba:20,bb:20,fa:40,fb:10,ft:96,fs:-150,bt:70,bs:-140,lean:30,tilt:14,osc:['fb',14,1.4],mouth:'smile'},
  sweets:{ba:30,bb:50,fa:70,fb:30,mouth:'smile',eye:'happy'},
  placeDiya:{ba:20,bb:20,fa:44,fb:14,ft:84,fs:-130,bt:56,bs:-118,lean:26,tilt:10,mouth:'smile'},
  wave:{ba:-6,bb:12,fa:114,fb:38,mouth:'big',eye:'happy',osc:['fb',18,2.4]},
  petals:{ba:30,bb:50,fa:106,fb:24,mouth:'big',eye:'happy',osc:['fa',10,1.8]},
  helpAnother:{ba:40,bb:30,fa:76,fb:16,lean:8,mouth:'smile'},
  share:{ba:-6,bb:12,fa:74,fb:20,mouth:'smile',eye:'happy'},
  comfort:{ba:-6,bb:12,fa:94,fb:-8,tilt:8,mouth:'soft',eye:'open'},
  waterPlant:{ba:20,bb:30,fa:62,fb:44,lean:10,tilt:10,ft:14,mouth:'smile'},
  sad:{ba:30,bb:90,fa:34,fb:96,tilt:16,eye:'down',mouth:'worry',brow:'sad'},
  light:{ba:20,bb:60,fa:58,fb:28,lean:8,tilt:8,mouth:'smile'}};
const NUM=['ba','bb','fa','fb','bt','bs','ft','fs','lean','tilt','seated','air'];
const ZERO={ba:0,bb:0,fa:0,fb:0,bt:-4,bs:0,ft:6,fs:0,lean:0,tilt:0,seated:0,air:0};
const TH=62,SH=60,UA=48,FA=44;
class Fig{constructor(cfg,parent,o){o=o||{};this.Q=cfg;this.x=0;this.y=0;this.s=(cfg.scale||1)*(o.s||1);this.f=1;this.vis=true;this.state='idle';
    this.cur=Object.assign({},ZERO,POSE.idle);this.face={eye:'open',mouth:'smile',brow:''};this.walking=0;this.wph=0;this.ph=Math.random()*TAU;this.blinkAt=2+Math.random()*4;
    this.talking=false;this.oscP=null;this.props={f:null,b:null};this.lift=0;this.nodK=0;this.flipK=1;this.build(parent)}
  build(parent){const Q=this.Q,sk=Q.skin,M=Q.face==='monkey';const g=this.g=grp(parent);const body=this.body=grp(g);
    const legW=M?13:12;
    const leg=(isFront)=>{const th=grp(body);limb(th,`M0 0V${TH}`,sk,legW);const sh=grp(th);limb(sh,`M0 0V${SH}`,sk,legW*.9);const ft=grp(sh,{transform:`translate(0 ${SH})`});const foot=grp(ft);ell(foot,8,0,14,6.5,sk,3);
      if(Q.garment==='dhoti'||Q.garment==='kurta'){shp(th,`M-14 -10L16 -10L${isFront?19:17} ${TH+4}L-13 ${TH+4}Z`,Pat.u('vlines',Q.g2,Q.g1,.8),3.6);rect(th,-14,TH-6,33,10,Q.g2,2.6)}
      else if(Q.garment==='wrap'){shp(th,`M-14 -10L16 -10L18 ${TH*.55}L-13 ${TH*.55}Z`,Pat.u('zig',Q.g2,Q.g1,.8),3.4)}
      return{th,sh,ft,foot}};
    const arm=()=>{const up=grp(body);limb(up,`M0 0V${UA}`,sk,M?13:12);const fo=grp(up,{transform:`translate(0 ${UA})`});limb(fo,'M0 0V'+FA,sk,M?12:11);
      if(Q.jewel)ln(up,'M-7 16H7',P.gold,4);if(Q.jewel>1||Q.garment==='sari')ln(fo,`M-6 ${FA-8}H6`,P.gold,3.6);if(Q.beads)dots(fo,`M-6 ${FA-8}H6`,P.ivory,4,6);
      const hand=grp(fo,{transform:`translate(0 ${FA})`});const hk=grp(hand);circ(hk,0,4,7.5,sk,3);const prop=grp(hand);return{up,fo,hand,prop}};
    /* back of the body first: tail, back arm, back leg, pallu and quiver */
    if(Q.tail){this.tail=grp(body);this.tailIn=limb(this.tail,'',sk,10);this.tailOut=this.tail.firstChild;this.tailDots=dots(this.tail,'',K,3.2,10)}
    if(Q.hair==='braid'){this.braid=grp(body)}
    this.bArm=arm();this.bArm.up.setAttribute('transform','translate(-2 -90)');
    if(Q.quiver){const qv=grp(body,{transform:'translate(-18 -96) rotate(-18)'});rect(qv,-9,0,18,64,Pat.u('hlines',K,P.terra,.7),3);for(let i=-1;i<=1;i++){ln(qv,`M${i*5} 0V-16`,K,2.4);shp(qv,`M${i*5} -16l-4 -9l4 3l4 -3z`,P.ivory,1.6)}}
    this.bLeg=leg(false);
    /* seated drape (Sita in the grove): legs folded beneath the sari */
    this.seat=grp(body);shp(this.seat,'M-30 -4Q-40 30 -26 44H74Q86 40 78 22Q60 6 30 6Q8 -2 -30 -4Z',Pat.u('flower',Q.g2||P.gold,Q.g1,.9),4.2);
    shp(this.seat,'M-26 44H74Q84 40 80 30H-34Q-34 40 -26 44Z',Q.g2||P.gold,3);dots(this.seat,'M-26 37H76',P.ivory,4,10);ell(this.seat,84,40,10,5,sk,2.6);show(this.seat,false);
    /* torso */
    const tor=this.torso=grp(body);const tw=M?1.12:1;
    dbl(tor,`M${-21*tw} 0L${-25*tw} -86Q2 -102 ${27*tw} -86L${22*tw} 0Z`,sk,0,-46,.86,4.2);
    if(M){shp(tor,'M-6 -78Q18 -82 20 -40Q14 -16 -4 -14Q-14 -40 -6 -78Z',P.ivory,0,{opacity:.55})}
    if(Q.garment==='sari'||Q.garment==='skirt'){shp(tor,`M-25 -86Q2 -102 27 -86L25 -54Q2 -48 -24 -56Z`,Q.blouse||P.leaf,3.6);dots(tor,'M-22 -58Q2 -52 24 -57',P.gold,3.6,9)}
    if(Q.garment==='kurta'){shp(tor,`M-25 -86Q2 -102 27 -86L30 0L${-24} 0Z`,Pat.u('dots',Q.g2,Q.top||Q.g1,.8),3.8);ln(tor,'M10 -90V-40',K,2);dots(tor,'M14 -84V-48',P.gold,3.6,10)}
    if(Q.sash&&(Q.garment==='dhoti')){shp(tor,'M-25 -86L-12 -94L26 -6L12 -2Z',Pat.u('dots',Q.sashDot||P.ivory,Q.sash,.7),3);}
    if(Q.garment==='wrap'){shp(tor,'M-24 -14H24V4H-24Z',Q.g2,3)}
    if(Q.shawl){shp(tor,'M-27 -88Q2 -104 29 -88L26 -50Q0 -40 -26 -52Z',Pat.u('hlines',Q.g2,Q.top||P.ivory,.7),3.4)}
    if(Q.quiver)ln(tor,'M-22 -84L22 -20',K,3.4);
    /* waist band */
    if(Q.garment==='dhoti'){shp(tor,'M-22 -10H23V4H-22Z',Q.g2,3);dots(tor,'M-18 -3H20',P.ivory,3.6,8)}
    this.fLeg=leg(true);
    /* garments over the legs */
    const over=this.over=grp(body);
    if(Q.garment==='dhoti'){shp(over,'M2 -2L16 -2L20 70Q11 78 2 70Z',Pat.u('vlines',Q.g2,Q.g1,.8),3.4);rect(over,1,62,19,8,Q.g2,2.4)}
    if(Q.garment==='kurta'){shp(over,'M-25 -10L30 -10L34 58L-26 58Z',Pat.u('dots',Q.g2,Q.top||Q.g1,.8),3.8);rect(over,-26,48,60,10,Q.g2,2.4)}
    if(Q.garment==='sari'||Q.garment==='skirt'){const hem=Q.garment==='sari'?118:104;this.skirt=grp(over);
      shp(this.skirt,`M-24 -8L26 -8L42 ${hem}L-36 ${hem}Z`,Pat.u('flower',Q.g2,Q.g1,.85),4.2);shp(this.skirt,`M-36 ${hem-16}L41 ${hem-16}L42 ${hem}L-36 ${hem}Z`,Q.g2,3);
      dots(this.skirt,`M-32 ${hem-8}H38`,Q.g1===P.verm?P.maroon:P.ivory,4,9);ln(this.skirt,`M14 0L22 ${hem-16}M20 0L30 ${hem-16}`,K,2);
      if(Q.garment==='sari'){shp(tor,'M18 -10L30 -2L-8 -96L-26 -86Z',Pat.u('petals',Q.g2,Q.pallu||Q.g1,.6),3.6)}}
    /* neck, necklace */
    limb(body,'M3 -94L5 -110',sk,15);
    if(Q.jewel||Q.beads){ln(body,'M-10 -98Q4 -78 20 -96',K,7);ln(body,'M-10 -98Q4 -78 20 -96',Q.beads?P.ivory:P.gold,4);if(Q.jewel>1){circ(body,5,-84,5,P.verm,2);ln(body,'M-14 -96Q4 -66 24 -92',P.gold,3)}}
    /* head */
    const head=this.head=grp(body);this.headIn=grp(head,{transform:Q.head&&Q.head!==1?`scale(${Q.head})`:null});const H_=this.headIn;const hc=Q.hairCol||K;
    if(Q.hair==='braid'){/* the braid hangs from the back of the head down the back */const b=grp(H_);for(let i=0;i<7;i++){ell(b,-30+Math.sin(i*.6)*2,-14+i*15,7,9,hc,2,{stroke:P.ink})}circ(b,-29,92,5,Q.band||P.gold,2);this.braidG=b}
    if(Q.hair==='bun')circ(H_,-30,-28,13,hc,2);
    if(Q.hair==='knot'){circ(H_,-14,-64,14,hc,2.4);ln(H_,'M-26 -60Q-14 -54 -2 -62',Q.band||P.gold,5);circ(H_,-14,-76,4.5,P.verm,2)}
    if(Q.face==='monkey'){shp(H_,smooth([[-26,-46],[-2,-60],[22,-54],[30,-38],[30,-24],[42,-12],[40,0],[30,10],[10,12],[-12,6],[-28,-12]],true),sk,4.2);
      ell(H_,30,-4,15,12,P.ivory,3);circ(H_,40,-12,3,K,0);ell(H_,-8,-22,9,11,sk,3);ell(H_,-8,-22,4.5,6,P.ivory,1.6);ln(H_,'M8 -48Q20 -52 30 -40',K,3)}
    else{shp(H_,smooth([[-26,-48],[0,-59],[22,-51],[29,-37],[30,-26],[40,-13],[31,-9],[33,-2],[28,8],[12,13],[-10,8],[-27,-12]],true),sk,4.2);
      const hs=Q.hair==='short2'?[[-30,-14],[-29,-46],[-4,-62],[20,-55],[16,-47],[2,-43],[-6,-30],[-14,-2],[-26,10]]:[[-30,-14],[-29,-46],[-4,-62],[20,-55],[16,-47],[2,-43],[-6,-30],[-9,-10],[-22,4]];
      if(Q.hair!=='turban')shp(H_,smooth(hs,true),hc,0);
      ell(H_,-5,-24,6,8.5,sk,2.4);if(Q.jewel||Q.garment==='sari')circ(H_,-5,-11,4.4,P.gold,1.8);
      if(Q.beard){shp(H_,'M-8 4Q10 26 32 6Q24 18 6 18Q-6 16 -8 4Z',hc,2)}}
    if(Q.hair==='turban'){shp(H_,'M-30 -30Q-34 -64 -2 -68Q26 -66 26 -46Q8 -40 -12 -38Q-24 -34 -30 -30Z',Pat.u('hlines',K,Q.turban,.7),3.6);circ(H_,20,-52,4,P.gold,1.8)}
    if(Q.crown){const cr=grp(H_);shp(cr,'M-22 -50L24 -52L20 -70L8 -76L0 -96L-8 -76L-20 -70Z',Pat.u('petals',P.verm,P.gold,.5),3.6);shp(cr,'M-24 -58H26V-48H-24Z',P.verm,2.6);dots(cr,'M-20 -53H22',P.ivory,3.4,8);circ(cr,0,-98,4,P.turmeric,2)}
    if(Q.tilak)ln(H_,'M26 -50V-43',P.verm,3.2);if(Q.bindi)circ(H_,25,-46,2.6,P.verm,0);
    /* eye, brow, mouth */
    const eye=this.eye=grp(H_);this.eyeOpen=grp(eye);shp(this.eyeOpen,'M3 -29Q17 -44 31 -29Q17 -18 3 -29Z',P.ivory,3);ln(this.eyeOpen,'M3 -29L-4 -25',K,3);
    this.pupil=grp(this.eyeOpen);circ(this.pupil,18,-30,5,K,0);circ(this.pupil,16.6,-32,1.5,P.ivory,0);
    this.lidHalf=shp(this.eyeOpen,'M2 -29Q17 -45 32 -29Q17 -31 2 -29Z',sk,3);show(this.lidHalf,false);
    this.eyeShut=ln(eye,'M3 -28Q17 -21 31 -28',K,3.8);show(this.eyeShut,false);this.eyeHappy=grp(eye);ln(this.eyeHappy,'M3 -26Q17 -40 31 -26',K,4);ln(this.eyeHappy,'M3 -26L-4 -23',K,3);show(this.eyeHappy,false);
    this.brow=ln(H_,'M3 -43Q17 -51 31 -43',K,3.4);
    this.tear=grp(H_);shp(this.tear,'M12 -19C8 -12 8 -8 12 -7C16 -8 16 -12 12 -19Z',P.sky,1.8);circ(this.tear,10.8,-10,1.1,P.ivory,0);show(this.tear,false);
    const mo=this.mouthG=grp(H_);const mx=Q.face==='monkey'?4:0;this.mouths={smile:ln(mo,`M${23+mx} -4Q${29+mx} 3 ${35+mx} -2`,K,2.6),soft:ln(mo,`M${24+mx} -2Q${29+mx} 1 ${34+mx} -1`,K,2.4),o:circ(mo,31+mx,-1,3.6,K,0),
      worry:ln(mo,`M${24+mx} 1Q${29+mx} -4 ${34+mx} 1`,K,2.6),flat:ln(mo,`M${24+mx} -1H${34+mx}`,K,2.6),big:shp(mo,`M${22+mx} -5Q${29+mx} 8 ${36+mx} -3Z`,P.verm,2.2)};
    this.talkM=ell(mo,30+mx,-1,4,2.6,K,0);show(this.talkM,false);
    /* front arm last so it reads in front of the body */
    this.fArm=arm();this.fArm.up.setAttribute('transform','translate(6 -88)');
    this.applyFace();this.update(0,0)}
  /* hold a prop in the front ('f') or back ('b') hand */
  hold(which,kind,o){const a=which==='b'?this.bArm:this.fArm;a.prop.innerHTML='';this.props[which]=kind;if(!kind)return null;return drawProp(a.prop,kind,o||{},this)}
  set(state,ms){const p=POSE[state]||POSE.idle;this.state=state;const tgt={};for(const k of NUM)tgt[k]=p[k]!=null?p[k]:ZERO[k];
    this.walking=p.walk?1:0;this.oscP=p.osc||null;this.shiver=p.shiver?1:0;this.face={eye:p.eye||'open',mouth:p.mouth||'smile',brow:p.brow||''};this.applyFace();
    if(p.bowHand&&this.props.b==='bow'){this.hold('b',null);this.hold('f','bow')}
    if(ms===0){Object.assign(this.cur,tgt);return Promise.resolve()}return tw(this.cur,tgt,ms||600)}
  /* a single gentle nod */
  nod(){const o=this;tw(o,{nodK:1},380).then(()=>tw(o,{nodK:0},480))}
  /* turn to face the other way, with a small squash so it reads as a turn */
  turn(f,ms){if(this.f===f)return Promise.resolve();const self=this;ms=ms||420;
    return tw(self,{flipK:.15},ms/2).then(()=>{self.f=f;return tw(self,{flipK:1},ms/2)})}
  applyFace(){const F=this.face;show(this.eyeOpen,F.eye==='open'||F.eye==='wide'||F.eye==='down');show(this.eyeHappy,F.eye==='happy');show(this.eyeShut,false);show(this.lidHalf,F.eye==='down');
    tf(this.pupil,F.eye==='down'?2:0,F.eye==='down'?4:0,1);this.eyeOpen.setAttribute('transform',F.eye==='wide'?'translate(17 -29) scale(1.12) translate(-17 29)':'');
    const bt=F.brow==='sad'?'rotate(-12 17 -46) translate(0 -2)':F.brow==='up'?'translate(0 -4)':F.brow==='firm'?'rotate(8 17 -46) translate(0 2)':'';this.brow.setAttribute('transform',bt);
    show(this.tear,F.brow==='sad');for(const k in this.mouths)show(this.mouths[k],k===F.mouth)}
  hand(which){const a=which==='b'?this.bArm:this.fArm;const c=this.cur;const lean=c.lean||0;const sh=which==='b'?[-2,-90]:[6,-88];
    const A=(which==='b'?c.ba:c.fa)*DEG,B=A+(which==='b'?c.bb:c.fb)*DEG;let x=sh[0]+Math.sin(A)*UA+Math.sin(B)*(FA+4),y=sh[1]+Math.cos(A)*UA+Math.cos(B)*(FA+4);
    const L_=lean*DEG;/* lean rotates clockwise for +lean */
    const rx=x*Math.cos(L_)-y*Math.sin(L_),ry=x*Math.sin(L_)+y*Math.cos(L_);
    return[this.x+this.f*this.s*rx,this.y+this.s*(ry+this.hipY)]}
  headPos(){const L_=(this.cur.lean||0)*DEG;const x=5,y=-140;return[this.x+this.f*this.s*(x*Math.cos(L_)-y*Math.sin(L_)),this.y+this.s*(x*Math.sin(L_)+y*Math.cos(L_)+this.hipY)]}
  update(dt,t){if(!this.vis){show(this.g,false);return}show(this.g,true);const c=this.cur;const m=MV();
    let ba=c.ba,bb=c.bb,fa=c.fa,fb=c.fb,bt=c.bt,bs=c.bs,ft=c.ft,fs=c.fs;
    if(this.walking){this.wph+=dt*5.2*(D.speed>4?1:1);const w=Math.sin(this.wph);ft=c.ft+24*w;bt=c.bt-24*w;fs=c.fs-(w<0?-w*30:0);bs=c.bs-(w>0?w*30:0);fa=c.fa-16*w;ba=c.ba+16*w}
    if(this.oscP){const [k,amp,per]=this.oscP;const v=Math.sin(t*TAU/per+this.ph)*amp*m;if(k==='fa')fa+=v;else if(k==='fb')fb+=v;else if(k==='ba')ba+=v}
    const seat=c.seated>.5;
    /* hips: the lower foot always rests on the ground */
    const ext=(a,b)=>TH*Math.cos(a*DEG)+SH*Math.cos((a+b)*DEG);const hip=seat?46:Math.max(ext(ft,fs),ext(bt,bs))+6;
    const bob=this.walking?Math.abs(Math.sin(this.wph))*-3:0;this.hipY=-hip+bob-(c.air||0)*40-this.lift;
    const br=1+.012*Math.sin(t*1.6+this.ph)*m;
    tf(this.g,this.x,this.y,this.s,0,this.f*Math.max(.15,this.flipK),1);
    const sv=this.shiver?Math.sin(t*46)*1.8*(RM?.3:1):0;this.body.setAttribute('transform',`translate(${f1(sv)} ${f1(this.hipY)}) rotate(${f1((c.lean||0)+sv*.4)})`);
    this.torso.setAttribute('transform',`scale(1 ${f3(br)})`);
    const setLeg=(L_,a,b)=>{L_.th.setAttribute('transform',`translate(${L_===this.fLeg?6:-4} -4) rotate(${f1(-a)})`);L_.sh.setAttribute('transform',`translate(0 ${TH}) rotate(${f1(-b)})`);L_.foot.setAttribute('transform',`rotate(${f1(a+b-(c.lean||0))})`)};
    show(this.fLeg.th,!seat);show(this.bLeg.th,!seat);show(this.seat,seat);if(this.over)show(this.over,!seat||!this.skirt);if(this.skirt)show(this.skirt,!seat);
    if(!seat){setLeg(this.fLeg,ft,fs);setLeg(this.bLeg,bt,bs)}
    this.bArm.up.setAttribute('transform',`translate(-2 -90) rotate(${f1(-ba)})`);this.bArm.fo.setAttribute('transform',`translate(0 ${UA}) rotate(${f1(-bb)})`);this.bArm.hand.setAttribute('transform',`translate(0 ${FA}) rotate(${f1(ba+bb-(c.lean||0))})`);
    this.fArm.up.setAttribute('transform',`translate(6 -88) rotate(${f1(-fa)})`);this.fArm.fo.setAttribute('transform',`translate(0 ${UA}) rotate(${f1(-fb)})`);this.fArm.hand.setAttribute('transform',`translate(0 ${FA}) rotate(${f1(fa+fb-(c.lean||0))})`);
    this.head.setAttribute('transform',`translate(4 -110) rotate(${f1((c.tilt||0)+this.nodK*14+(this.talking?Math.sin(t*7)*1.2:0))})`);
    if(this.braidG)tf(this.braidG,0,0,1,-(c.tilt||0)*.8-(c.lean||0)*.5);
    if(this.tail){const sw=Math.sin(t*1.4+this.ph)*14*m;const d=`M-18 -6C-56 ${f1(4+sw*.3)} ${f1(-86+sw*.4)} -46 ${f1(-74+sw)} -104C${f1(-66+sw)} -132 ${f1(-38+sw)} -138 ${f1(-36+sw*.9)} -118`;
      this.tail.childNodes.forEach(n=>n.setAttribute('d',d))}
    /* blink */
    if(t>this.blinkAt&&(this.face.eye==='open'||this.face.eye==='wide')){show(this.eyeOpen,false);show(this.eyeShut,true);if(t>this.blinkAt+.13){this.blinkAt=t+2.5+Math.random()*4;this.applyFace()}}
    if(this.talking){const o=Math.sin(t*14)>0;show(this.talkM,o);for(const k in this.mouths)show(this.mouths[k],!o&&k===this.face.mouth)}else if(this.talkM.style.display!=='none'){show(this.talkM,false);this.applyFace()}}}

/* props carried in a hand; drawn upright in hand space */
function drawProp(g,kind,o,fig){switch(kind){
  case'bow':{const b=grp(g);ln(b,'M0 -88Q34 0 0 88',K,10);ln(b,'M0 -88Q34 0 0 88',P.gold,5);ln(b,'M0 -88V88',K,1.6);rect(b,-4,-10,10,20,P.verm,2);circ(b,0,-88,4,P.verm,1.6);circ(b,0,88,4,P.verm,1.6);return b}
  case'ring':{const r=ringObj(g,o.r||13);tf(r.g,6,-(o.r||13)*1.1-4,1);return r}
  case'stone':{const s=stone(g,o.v||0,o.w||76,o.h||54);tf(s.g,18,-12,1);return s}
  case'branch':{const b=grp(g,{transform:'rotate(-40)'});ln(b,'M0 30V-90',K,9);ln(b,'M0 30V-90',P.terra,4.5);for(let i=0;i<6;i++)leaf(b,30,9,i%2?P.leaf:P.forest,i%2?-130:-50,0,-30-i*12);return b}
  case'broom':{const b=grp(g,{transform:'rotate(-24)'});ln(b,'M0 -20V90',K,7);ln(b,'M0 -20V90',P.gold,3.4);shp(b,'M-4 84L-18 124H18L4 84Z',Pat.u('vlines',K,P.marigold,.6),2.6);return b}
  case'garland':{const b=grp(g);ln(b,'M0 0Q30 70 64 6',K,3);for(let i=0;i<=6;i++){const u=i/6;const x=64*u,y=4*70*u*(1-u)*.9;const m=grp(b,{transform:`translate(${f1(x)} ${f1(y)})`});marigold(m,9,i%2?P.verm:P.marigold)}return b}
  case'plate':{const b=grp(g);ell(b,18,-6,30,9,P.gold,3);for(let i=0;i<5;i++)circ(b,4+i*7,-14-(i%2)*6,6,P.turmeric,2);return b}
  case'diya':{const d=diya(g,{lit:o.lit||0});d.x=10;d.y=-8;d.s=.4;d.update(0);fig&&(fig._diya=d);return d}
  case'pot':{const b=grp(g,{transform:'rotate(-30)'});shp(b,'M-14 -10Q-20 10 0 14Q20 10 14 -10Q8 -16 0 -16Q-8 -16 -14 -10Z',P.gold,3);shp(b,'M10 -8L30 -14L30 -10L12 -2Z',P.gold,2.4);dots(b,'M32 -10L40 -4L46 6',P.peacock,4,8);return b}
  case'books':{const b=grp(g);[[P.verm,0],[P.peacock,-9],[P.leaf,-18]].forEach(([c,y])=>rect(b,-6,y-8,44,9,c,2.4));return b}
  case'basket':{const b=grp(g);shp(b,'M-18 -6H24L18 14H-12Z',Pat.u('hatch',K,P.gold,.6),3);for(let i=0;i<4;i++){const f=grp(b,{transform:`translate(${-10+i*10} -10)`});flower(f,6,i%2?P.verm:P.marigold)}return b}
  case'toy':{const b=grp(g);shp(b,'M0 -20H34V0H0Z',Pat.u('dots',P.turmeric,P.verm,.6),2.6);circ(b,6,4,5,P.gold,2);circ(b,28,4,5,P.gold,2);shp(b,'M34 -16L44 -26L46 -12Z',P.verm,2);return b}
  case'sweet':{const b=grp(g);circ(b,12,-8,9,P.turmeric,2.4);dots(b,'M6 -10L18 -6',P.marigold,3,5);return b}
  case'petal':{const b=grp(g);for(let i=0;i<3;i++){shp(b,`M${i*9} -6Q${i*9+5} -14 ${i*9} -20Q${i*9-5} -14 ${i*9} -6Z`,i%2?P.verm:P.marigold,1.6)}return b}}return null}
/* a small plant in a pot (watered by a child in the kindness vignettes) */
function plant(parent,k){const g=grp(parent);shp(g,'M-18 0L-14 -24H14L18 0Z',P.terra,3);rect(g,-20,-30,40,8,P.maroon,2.4);const st=grp(g);ln(st,'M0 -30V-62',K,6);ln(st,'M0 -30V-62',P.leaf,3);
  leaf(st,24,9,P.leaf,-150,0,-44);leaf(st,24,9,P.forest,-30,0,-52);const f=grp(st,{transform:'translate(0 -66)'});flower(f,9,P.verm);return{g,st,f}}

/* ===== Ravana: front-facing, crowned, with ten heads arranged symmetrically as one figure (a main head and a halo of nine) =====
   Proud, never frightening: big round eyes, raised brows, a curled moustache, a small proud smile. */
const RPOSE={stand:{la:16,lb:20,ra:16,rb:20,w:0,aura:.6,droop:0},proud:{la:30,lb:110,ra:30,rb:110,w:0,aura:.7,droop:0},
  raise:{la:100,lb:10,ra:100,rb:10,w:1,aura:1,droop:0},lower:{la:26,lb:6,ra:26,rb:6,w:1,aura:.4,droop:.3},defeated:{la:10,lb:4,ra:10,rb:4,w:0,aura:0,droop:1}};
class Ravana{constructor(parent){this.x=0;this.y=0;this.s=1;this.gone=0;this.vis=true;this.talking=false;this.cur=Object.assign({},RPOSE.stand);this.ph=0;this.build(parent)}
  face(g,r,main){const sk=SKIN.ravana;ell(g,0,0,r*.86,r,sk,main?4.2:3.2);
    ell(g,-r*.36,-r*.1,r*.22,r*.15,P.ivory,2.2);ell(g,r*.36,-r*.1,r*.22,r*.15,P.ivory,2.2);const pu=grp(g);circ(pu,-r*.36,-r*.1,r*.09,K,0);circ(pu,r*.36,-r*.1,r*.09,K,0);
    const br=grp(g);ln(br,`M${-r*.6} ${-r*.36}Q${-r*.36} ${-r*.56} ${-r*.12} ${-r*.4}M${r*.12} ${-r*.4}Q${r*.36} ${-r*.56} ${r*.6} ${-r*.36}`,K,main?3.6:2.6);
    ln(g,`M0 ${-r*.05}L${-r*.07} ${r*.24}H${r*.07}`,K,2);
    const mu=grp(g);ln(mu,`M0 ${r*.38}Q${-r*.3} ${r*.28} ${-r*.5} ${r*.42}Q${-r*.62} ${r*.5} ${-r*.56} ${r*.28}M0 ${r*.38}Q${r*.3} ${r*.28} ${r*.5} ${r*.42}Q${r*.62} ${r*.5} ${r*.56} ${r*.28}`,K,main?4:3);
    const brA=grp(g);ln(brA,`M${-r*.66} ${-r*.52}L${-r*.1} ${-r*.3}M${r*.1} ${-r*.3}L${r*.66} ${-r*.52}`,K,main?4.6:3.2);show(brA,false);
    const moA=ln(g,`M${-r*.18} ${r*.66}Q0 ${r*.54} ${r*.18} ${r*.66}`,K,2.4);show(moA,false);
    const mo=ln(g,`M${-r*.16} ${r*.6}Q0 ${r*.68} ${r*.16} ${r*.6}`,K,2.2);ln(g,`M0 ${-r*.62}V${-r*.42}`,P.verm,main?3.4:2.4);
    circ(g,-r*.88,r*.24,r*.12,P.gold,1.8);circ(g,r*.88,r*.24,r*.12,P.gold,1.8);return{pu,br,mo,brA,moA}}
  crownD(r,h){return`M${-r*.8} ${-r*.66}L${-r*.86} ${-r*.66-h*.5}L${-r*.44} ${-r*.66-h*.3}L${-r*.2} ${-r*.66-h*.8}L0 ${-r*.66-h}L${r*.2} ${-r*.66-h*.8}L${r*.44} ${-r*.66-h*.3}L${r*.86} ${-r*.66-h*.5}L${r*.8} ${-r*.66}Z`}
  build(parent){const g=this.g=grp(parent);const sk=SKIN.ravana;const aura=this.aura=grp(g);
    for(let i=0;i<3;i++)circ(aura,0,-300,170+i*34,'none',4,{stroke:i%2?P.indigo:P.verm,'stroke-dasharray':i%2?'.1 14':'26 12','stroke-width':i%2?7:4,'stroke-linecap':'round'});
    /* the halo of nine heads behind the main head */
    const hl=this.halo=grp(g,{transform:'translate(0 -318)'});const R=124,r=19;
    const Ro=R+r+10,Ri=R-r-10;shp(hl,`M${-Ro} 34A${Ro} ${Ro} 0 0 1 ${Ro} 34L${Ri} 34A${Ri} ${Ri} 0 0 0 ${-Ri} 34Z`,Pat.u('chevron',P.maroon,P.gold,.8),3.6);
    this.heads=[];for(let i=0;i<9;i++){const a=(-166+i*(152/8))*DEG;const hx=Math.cos(a)*R,hy=Math.sin(a)*R;const h=grp(hl,{transform:`translate(${f1(hx)} ${f1(hy)})`});
      shp(h,this.crownD(r,16),Pat.u('petals',P.verm,P.gold,.35),2.4);const F=this.face(h,r,false);this.heads.push({h,F,hx,hy,i})}
    /* legs and dhoti */
    limb(g,'M-20 -128L-34 -6',sk,16);limb(g,'M20 -128L34 -6',sk,16);ell(g,-40,-4,18,8,sk,3);ell(g,40,-4,18,8,sk,3);
    shp(g,'M-50 -160H50L66 -40Q0 -26 -66 -40Z',Pat.u('flower',P.gold,P.maroon,1),4.5);shp(g,'M-66 -40Q0 -26 66 -40L64 -54Q0 -40 -64 -54Z',P.gold,3);dots(g,'M-60 -45Q0 -32 60 -45',P.verm,4,10);
    shp(g,'M-10 -160H10L16 -60Q0 -50 -16 -60Z',Pat.u('vlines',P.verm,P.gold,.7),3);
    /* torso: indigo jacket with gold ornaments, a belt */
    dbl(g,'M-48 -160L-58 -262Q0 -282 58 -262L48 -160Z',P.indigo,0,-210,.88,4.5);shp(g,'M-48 -262Q0 -280 48 -262L44 -236Q0 -222 -44 -236Z',P.gold,3.4);
    for(let i=0;i<5;i++)circ(g,-36+i*18,-200,6,P.gold,2.2);ln(g,'M-40 -184Q0 -168 40 -184',P.gold,5);rect(g,-52,-176,104,18,P.verm,3);dots(g,'M-46 -167H46',P.gold,4,10);
    limb(g,'M0 -270V-290',sk,24);ln(g,'M-26 -268Q0 -236 26 -268',K,8);ln(g,'M-26 -268Q0 -236 26 -268',P.gold,5);circ(g,0,-250,7,P.verm,2.4);
    /* arms with bow (his right, screen left) and shield (screen right) */
    const arm=(sx)=>{const up=grp(g,{transform:`translate(${sx*54} -258)`});limb(up,'M0 0V60',sk,16);ln(up,'M-9 20H9',P.gold,5);const fo=grp(up,{transform:'translate(0 60)'});limb(fo,'M0 0V56',sk,15);ln(fo,'M-8 46H8',P.gold,4);
      const hand=grp(fo,{transform:'translate(0 58)'});circ(hand,0,0,10,sk,3);const w=grp(hand);return{up,fo,hand,w,sx}};
    this.L=arm(-1);this.Rt=arm(1);
    const bw=this.L.w;ln(bw,'M0 -96Q-40 0 0 96',K,11);ln(bw,'M0 -96Q-40 0 0 96',P.gold,5.5);ln(bw,'M0 -96V96',K,1.6);
    const sh=this.Rt.w;circ(sh,0,0,44,Pat.u('flower',P.gold,P.verm,.9),4.5);circ(sh,0,0,30,'none',3,{stroke:P.gold});circ(sh,0,0,10,P.gold,3);
    /* main head and tall crown */
    const mh=this.mh=grp(g,{transform:'translate(0 -318)'});shp(mh,this.crownD(36,52),Pat.u('petals',P.verm,P.gold,.5),4);shp(mh,`M${-31} -26H31V-16H-31Z`,P.verm,2.6);circ(mh,0,-36*.66-52,6,P.turmeric,2.4);
    this.mainF=this.face(mh,36,true);this.set('stand',0)}
  set(st,ms){const p=RPOSE[st]||RPOSE.stand;this.state=st;const tgt=Object.assign({},p);if(ms===0){Object.assign(this.cur,tgt);return Promise.resolve()}return tw(this.cur,tgt,ms||900)}
  update(dt,t){show(this.g,this.vis);if(!this.vis)return;const c=this.cur;const m=MV();const gn=this.gone;tf(this.g,this.x,this.y+gn*30*this.s,this.s*(1-gn*.12),-gn*8);this.g.style.opacity=gn>0?String(f3(1-gn)):'';
    const arm=(A,la,lb)=>{A.up.setAttribute('transform',`translate(${A.sx*54} -258) rotate(${f1(-A.sx*la)})`);A.fo.setAttribute('transform',`translate(0 60) rotate(${f1(-A.sx*lb)})`);A.hand.setAttribute('transform',`translate(0 58) rotate(${f1(A.sx*(la+lb))})`);op(A.w,clamp(c.w*1.4,0,1))};
    arm(this.L,c.la,c.lb);arm(this.Rt,c.ra,c.rb);
    op(this.aura,c.aura);tf(this.aura,0,0,1,t*4*m*c.aura);
    const dr=c.droop;const all=[this.mainF].concat(this.heads.map(h=>h.F));all.forEach(F=>{const an=!!this.angry&&dr<.5;show(F.br,!an);show(F.brA,an);show(F.mo,!an);show(F.moA,an);tf(F.pu,0,dr*3,1);F.br.setAttribute('transform',`translate(0 ${f1(dr*2)})`)});
    this.heads.forEach(h=>{tf(h.h,h.hx,h.hy+dr*6,1,(h.hx/124)*dr*-8+Math.sin(t*.8+h.i)*1*m)});tf(this.mh,0,-318+dr*8,1,0)}}
