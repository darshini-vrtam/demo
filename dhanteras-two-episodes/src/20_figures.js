/* ===== Character bible: devas and asuras (profile, Madhubani style) =====
   Built once per figure as an SVG group; a pose state machine only changes transforms,
   so clothing, crowns, colours and proportions never change between shots. */
const KIN={deva:[{sk:P.ochre,g:P.verm,g2:P.turmeric,c:P.gold},{sk:P.coral,g:P.pink,g2:P.gold,c:P.turmeric},{sk:P.terra,g:P.gold,g2:P.verm,c:P.turmeric},
    {sk:P.ochre,g:P.pink,g2:P.turmeric,c:P.gold},{sk:P.coral,g:P.verm,g2:P.gold,c:P.turmeric}],
  asura:[{sk:P.terra,g:P.verm,g2:P.indigo,z:P.turmeric},{sk:P.terra,g:P.indigo,g2:P.turmeric,z:P.turmeric},{sk:P.terra,g:P.coral,g2:P.turq,z:P.terra},
    {sk:P.terra,g:P.verm,g2:P.turq,z:P.turmeric},{sk:P.terra,g:P.indigo,g2:P.verm,z:P.turmeric}]};
/* poses: back arm (ba,bb) and front arm (fa,fb), degrees from straight down, + towards the facing side */
const POSE={idle:{ba:-6,bb:12,fa:8,fb:16,lean:0,tilt:0},
  pull:{ba:64,bb:16,fa:74,fb:8,lean:10,tilt:-3},
  worried:{ba:22,bb:118,fa:30,fb:116,lean:2,tilt:4,brow:1,mouth:'worry'},
  alarmed:{ba:30,bb:108,fa:40,fb:100,lean:7,tilt:-4,brow:1,mouth:'o',eye:'wide',step:-10},
  amazed:{ba:-44,bb:-18,fa:108,fb:-10,lean:-2,tilt:-6,brow:1,mouth:'o',eye:'wide'},
  cheer:{ba:-128,bb:-18,fa:124,fb:26,lean:-3,tilt:-8,brow:.6,mouth:'big',eye:'happy'},
  relieved:{ba:-10,bb:20,fa:24,fb:60,lean:-2,tilt:-3,brow:.3,mouth:'big',eye:'happy'},
  namaste:{ba:22,bb:122,fa:30,fb:116,lean:0,tilt:-4,brow:.2,mouth:'smile'},
  gaze:{ba:22,bb:122,fa:30,fb:116,lean:-3,tilt:-10,brow:.5,mouth:'smile',eye:'wide'},
  tired:{ba:-2,bb:8,fa:4,fb:10,lean:-4,tilt:8,brow:-.4,mouth:'flat',eye:'half'},
  nod:{ba:-6,bb:12,fa:8,fb:16,lean:0,tilt:9,mouth:'smile'}};
const FACE_DEF={brow:0,mouth:'smile',eye:'open',step:0};
class Fig{constructor(kind,v,parent){this.kind=kind;this.v=v;this.K=KIN[kind][v%5];this.x=0;this.y=0;this.s=1;this.f=1;this.vis=true;
    this.cur=Object.assign({},POSE.idle,{step:0});this.tgt=Object.assign({},this.cur);this.face=Object.assign({},FACE_DEF);this.state='idle';
    this.heave=0;this.ph=Math.random()*TAU;this.blinkAt=2+Math.random()*4;this.talking=false;this.build(parent)}
  build(parent){const Q=this.K,A=this.kind==='asura',sk=Q.sk,w=A?16:13;const g=this.g=grp(parent);const body=this.body=grp(g);
    const arm=(sx,sy)=>{const up=grp(body);const fo=grp(up);limb(up,`M0 0V46`,sk,w);ln(up,`M${-w/2-1} 15H${w/2+1}`,P.turmeric,4);
      limb(fo,`M0 0V42`,sk,w*.92);ln(fo,`M${-w/2} 34H${w/2}`,P.turmeric,3.6);circ(fo,0,46,w*.62,sk,3);return{up,fo,sx,sy}};
    this.bArm=arm(4,-210);
    /* legs, feet */
    limb(body,'M-10 -32L-12 -8',sk,13);limb(body,'M12 -32L14 -8',sk,13);ell(body,-4,-5,15,7,sk,3);ell(body,22,-5,15,7,sk,3);
    /* lower garment with hem band */
    const sx=A?1.08:1;if(A){shp(body,'M-32 -152L34 -152L40 -20L-36 -20Z',Pat.u('chevron',Q.z,Q.g,1.15),4.4);shp(body,'M-37 -34L40 -34L40 -20L-36 -20Z',P.turmeric,3);ln(body,'M-32 -27H36',K,2.6,{'stroke-dasharray':'.1 8'})}
    else{const skirt=`M${-30*sx} -152L${32*sx} -152L${44*sx} -30L${-40*sx} -30Z`;shp(body,skirt,Pat.u('vlines',Q.g2,Q.g,.9),4.4);
    shp(body,`M${-42*sx} -48L${44*sx} -48L${45*sx} -30L${-41*sx} -30Z`,Q.g2,3);ln(body,`M${-36*sx} -39H${40*sx}`,P.ivory,3.6,{'stroke-dasharray':'.1 9'})}
    /* torso, sash, waist band, necklace */
    const tw=A?1.24:1;const torso=`M${-26*tw} -150L${-31*tw} -214Q2 ${-230-(A?6:0)} ${31*tw} -214L${26*tw} -150Z`;dbl(body,torso,sk,0,-182,.86,4.4);
    shp(body,`M${-31*tw} -214L${-18*tw} -222L${28*tw} -152L${14*tw} -150Z`,Q.g2,3);ln(body,`M${-24*tw} -212L${21*tw} -154`,P.ivory,3.4,{'stroke-dasharray':'.1 10'});
    shp(body,`M${-27*tw} -164H${28*tw}V-150H${-27*tw}Z`,A?Q.g2:Q.g,3);ln(body,`M${-22*tw} -157H${24*tw}`,P.ivory,3.4,{'stroke-dasharray':'.1 8'});
    limb(body,'M3 -214L5 -236',sk,17);ln(body,'M-12 -222Q4 -200 20 -222',K,7);ln(body,'M-12 -222Q4 -200 20 -222',P.turmeric,4);if(!A)circ(body,4,-206,4.5,P.verm,2);
    /* head: hair bun, face, hair, ear, eye, brows, mouth, crown */
    const head=this.head=grp(body);const hy=-262;
    if(!A)circ(head,-28,hy+4,13,K,0);else{ln(head,'M-24 -236Q-34 -224 -24 -218Q-16 -216 -18 -224',K,6)}
    const face=smooth([[-26,-284],[0,-295],[22,-287],[29,-273],[30,-262],[40,-249],[31,-245],[33,-238],[28,-228],[12,-223],[-10,-228],[-27,-248]],true);
    shp(head,face,sk,4.2);
    shp(head,smooth([[-30,-250],[-29,-282],[-4,-298],[20,-291],[16,-283],[2,-279],[-6,-266],[-9,-246],[-22,-232]],true),K,0);
    ell(head,-5,hy+2,6,8.5,sk,2.4);circ(head,-5,hy+15,4.4,P.turmeric,1.8);
    if(A){shp(head,'M38 -246Q30 -240 22 -245Q16 -249 19 -254Q24 -246 30 -248Q34 -250 38 -246Z',K,1.6);ln(head,'M24 -238Q30 -236 34 -239',P.verm,3)}
    const eye=this.eye=grp(head);this.eyeOpen=grp(eye);shp(this.eyeOpen,'M3 -265Q17 -280 31 -265Q17 -254 3 -265Z',P.ivory,3);ln(this.eyeOpen,'M3 -265L-4 -261',K,3);
    this.pupil=circ(this.eyeOpen,18,-266,5,K,0);circ(this.eyeOpen,16.6,-268,1.5,P.foam,0);
    this.lid=shp(this.eyeOpen,'M2 -265Q17 -281 32 -265Q17 -271 2 -265Z',sk,3);show(this.lid,false);
    this.eyeShut=ln(eye,'M3 -264Q17 -257 31 -264',K,3.8);show(this.eyeShut,false);this.eyeHappy=grp(eye);ln(this.eyeHappy,'M3 -262Q17 -276 31 -262',K,4);ln(this.eyeHappy,'M3 -262L-4 -259',K,3);show(this.eyeHappy,false);
    this.brows=ln(head,'M3 -279Q17 -287 31 -279',K,3.4);
    const mo=this.mouthG=grp(head);this.mouths={smile:ln(mo,'M23 -240Q29 -233 35 -238',K,2.6),o:circ(mo,31,-237,3.6,K,0),worry:ln(mo,'M24 -235Q29 -240 34 -235',K,2.6),
      flat:ln(mo,'M24 -237H34',K,2.6),big:shp(mo,'M22 -241Q29 -229 36 -239Z',P.verm,2.2)};this.talkM=ell(mo,30,-237,4,2.4,K,0);show(this.talkM,false);
    if(!A){circ(head,24,-281,2.6,P.verm,0)}
    const cr=grp(head);
    if(!A){shp(cr,'M-22 -284L30 -284L24 -300L14 -308L6 -344L-2 -308L-12 -300Z',Pat.u('petals',P.turmeric,Q.c,.55),4);
      shp(cr,'M-27 -294H33V-282H-27Z',P.verm,3);ln(cr,'M-22 -288H30',P.ivory,3.4,{'stroke-dasharray':'.1 8'});circ(cr,6,-347,4.5,P.turmeric,2.4)}
    else{/* a gold crescent plume rising behind a vermilion spiked crown */shp(cr,'M-22 -300C-46 -306 -52 -334 -38 -356C-36 -334 -24 -320 -6 -314Z',P.turmeric,3.6);
      shp(cr,'M-26 -286L34 -286L36 -302L28 -320L19 -303L10 -324L1 -303L-8 -322L-16 -303L-27 -302Z',P.verm,4);
      shp(cr,'M-28 -296H37V-283H-28Z',P.turmeric,3);ln(cr,'M-23 -289.5H33',K,3.4,{'stroke-dasharray':'.1 8'});}
    this.fArm=arm(12,-208)}
  set(state){if(!POSE[state])return;this.state=state;const p=POSE[state];Object.assign(this.tgt,{ba:p.ba,bb:p.bb,fa:p.fa,fb:p.fb,lean:p.lean,tilt:p.tilt,step:p.step||0});
    this.face={brow:p.brow||0,mouth:p.mouth||'smile',eye:p.eye||'open'};this.applyFace()}
  applyFace(){const f=this.face;for(const k in this.mouths)show(this.mouths[k],k===f.mouth&&!this.talking);show(this.talkM,this.talking);
    this.brows.setAttribute('transform',`translate(0 ${f1(-f.brow*6)})`)}
  /* world position of a local point (same transform chain as the drawing) */
  local(lx,ly){const r=-this.cur.lean*DEG,c=Math.cos(r),s=Math.sin(r);const x=lx+this.cur.step,y=ly;return[this.x+(x*c-y*s)*this.s*this.f,this.y+(x*s+y*c)*this.s]}
  hand(which){const A=which==='b'?this.bArm:this.fArm;const a=(which==='b'?this.cur.ba:this.cur.fa)*DEG,b=(which==='b'?this.cur.bb:this.cur.fb)*DEG;
    return this.local(A.sx+Math.sin(a)*46+Math.sin(a+b)*46,A.sy+Math.cos(a)*46+Math.cos(a+b)*46)}
  update(dt,t){const k=1-Math.exp(-dt*7);for(const p in this.tgt)this.cur[p]+=(this.tgt[p]-this.cur[p])*k;const c=this.cur;
    let lean=c.lean,fa=c.fa,ba=c.ba;if(this.heave>0){const h=Math.sin(t*2.2+this.ph*.3)*this.heave;lean+=h*5;fa+=h*8;ba+=h*8}
    const br=Math.sin(t*1.7+this.ph)*1.2*MV();
    if(t>this.blinkAt){this.blinkAt=t+3.5+Math.random()*4;this.blinkEnd=t+.13}const blink=this.blinkEnd&&t<this.blinkEnd&&MV()>.5;
    const e=this.face.eye;show(this.eyeOpen,!blink&&e!=='closed'&&e!=='happy');show(this.eyeShut,blink||e==='closed');show(this.eyeHappy,!blink&&e==='happy');show(this.lid,e==='half');
    const ew=e==='wide'?'translate(17 -265) scale(1.15) translate(-17 265)':'';if(this.eye._ew!==ew){this.eye._ew=ew;ew?this.eye.setAttribute('transform',ew):this.eye.removeAttribute('transform')}
    if(this.talking){const m=.35+.65*Math.abs(Math.sin(t*7.5+this.ph));this.talkM.setAttribute('transform',`translate(30 -237) scale(1 ${f3(m)}) translate(-30 237)`)}
    if(this._tk!==this.talking){this._tk=this.talking;this.applyFace()}
    tf(this.g,this.x,this.y,this.s,0,this.f,1);tf(this.body,c.step,br,1,-lean);
    tf(this.head,0,0,1,c.tilt);this.head.setAttribute('transform',`rotate(${f1(c.tilt)} 4 -236)`);
    tf(this.bArm.up,this.bArm.sx,this.bArm.sy,1,-ba);tf(this.bArm.fo,0,46,1,-c.bb);tf(this.fArm.up,this.fArm.sx,this.fArm.sy,1,-fa);tf(this.fArm.fo,0,46,1,-c.fb);
    show(this.g,this.vis)}}
/* a fist drawn again above the rope so the hands read as gripping it */
function gripLayer(parent){const g=grp(parent);const pool=[];return{g,draw(list){let i=0;for(const [x,y,s,sk] of list){let e=pool[i];if(!e){e=grp(g);ell(e,0,0,10.5,9.5,P.ochre,3);ln(e,'M-9 -4V5',P.turmeric,3.4);e._c=e.firstChild;pool.push(e)}
    if(e._sk!==sk){e._sk=sk;e._c.setAttribute('fill',sk)}tf(e,x,y,s);show(e,true);i++}for(;i<pool.length;i++)show(pool[i],false)}}}

/* ===== Deities: front view, serene. Vishnu, Shiva, Lakshmi, Dhanvantari ===== */
const DEITY={vishnu:{sk:P.sea,g:P.turmeric,g2:P.gold,border:P.verm,crown:'kirita'},
  shiva:{sk:P.ivory,g:Pat.u?null:null,g2:P.ochre,border:P.terra,crown:'jata'},
  lakshmi:{sk:P.ochre,g:P.verm,g2:P.gold,border:P.gold,crown:'fan'},
  dhanv:{sk:P.ochre,g:P.turmeric,g2:P.gold,border:P.verm,crown:'tall'}};
const DPOSE={rest:{la:-12,lb:14,ra:12,rb:-14},bless:{la:-38,lb:-142,ra:38,rb:142},
  shiva:{la:-34,lb:34,ra:38,rb:142},kalash:{la:-40,lb:102,ra:40,rb:-102},lotus:{la:-25,lb:-140,ra:25,rb:140},
  open:{la:-58,lb:-30,ra:58,rb:30}};
function frontFace(parent,o){const g=grp(parent);const sk=o.sk;
  const face=smooth([[0,-344],[24,-338],[36,-318],[35,-294],[24,-270],[0,-260],[-24,-270],[-35,-294],[-36,-318],[-24,-338]],true);
  if(o.hairBack)shp(g,o.hairBack,K,0);
  ell(g,-37,-302,6,10,sk,2.6);ell(g,37,-302,6,10,sk,2.6);
  dbl(g,face,sk,0,-302,.88,4.4);
  if(o.hairFront)shp(g,o.hairFront,K,0);
  const eyes=grp(g);const half=o.eyes==='half';
  for(const sd of[-1,1]){const x=sd*16;shp(eyes,`M${x-13} -306Q${x} ${half?-313:-319} ${x+13} -306Q${x} -297 ${x-13} -306Z`,P.ivory,3);
    circ(eyes,x+sd*.5,-306.5,half?3.8:5,K,0);if(!half)circ(eyes,x+sd*.5-1.4,-308.4,1.4,P.foam,0);if(half)ln(eyes,`M${x-13} -306Q${x} -313 ${x+13} -306`,K,3.6);ln(eyes,`M${x+sd*13} -306L${x+sd*20} -310`,K,3)}
  ln(g,'M-30 -320Q-16 -329 -3 -319M3 -319Q16 -329 30 -320',K,3.4);ln(g,'M-1 -314Q-6 -296 -1 -289Q2 -287 5 -290',K,2.4);
  ln(g,'M-9 -278Q0 -271 9 -278',K,2.6);shp(g,'M-6 -277Q0 -273 6 -277Q0 -275 -6 -277Z',P.verm,1.4);
  if(o.tilak==='u'){ln(g,'M-5 -336V-322Q0 -317 5 -322V-336',P.ivory,3);ln(g,'M0 -334V-320',P.verm,2.4)}
  else if(o.tilak==='tri'){ln(g,'M-14 -334H14M-15 -329H15M-14 -324H14',P.ivory,2.4);ln(g,'M0 -333V-325',P.verm,2.6)}
  else if(o.tilak==='dot')circ(g,0,-324,3.4,P.verm,0);
  const mouthTalk=ell(g,0,-277,4.6,2.4,K,0);show(mouthTalk,false);
  return{g,mouthTalk}}
class Deity{constructor(kind,parent,o){o=o||{};this.kind=kind;this.D=DEITY[kind];this.x=0;this.y=0;this.s=1;this.vis=true;this.talking=false;
    this.pose=o.pose||'rest';this.cur=Object.assign({},DPOSE[this.pose]);this.tgt=Object.assign({},this.cur);this.ph=Math.random()*TAU;this.throat=0;this.build(parent,o)}
  build(parent,o){const D=this.D,sk=D.sk,kind=this.kind;const g=this.g=grp(parent);const body=this.body=grp(g);
    const garment=kind==='shiva'?Pat.u('stripes',K,P.turmeric,.9):Pat.u(kind==='lakshmi'?'petals':'vlines',D.g2,D.g,kind==='lakshmi'?.7:.9);
    /* hair falling behind the shoulders */
    if(kind==='lakshmi')shp(body,'M-40 -320Q-58 -250 -44 -180L44 -180Q58 -250 40 -320Z',K,0);
    else if(kind!=='shiva')shp(body,'M-38 -318Q-50 -280 -46 -238L46 -238Q50 -280 38 -318Z',K,0);
    else shp(body,'M-36 -316Q-56 -282 -50 -236L-36 -240Q-40 -276 -30 -300ZM36 -316Q56 -282 50 -236L36 -240Q40 -276 30 -300Z',K,0);
    const arm=(sx,sy,side)=>{const up=grp(body);const fo=grp(up);limb(up,'M0 0V52',sk,19);ln(up,'M-11 16H11',P.turmeric,5);circ(up,0,16,3,P.verm,0);
      limb(fo,'M0 0V46',sk,17);ln(fo,'M-10 34H10M-10 40H10',P.turmeric,3.4);const hand=grp(fo);return{up,fo,hand,sx,sy,side}};
    this.lArm=arm(-42,-244,-1);this.rArm=arm(42,-244,1);
    /* feet and lower garment */
    ell(body,-18,-6,16,8,sk,3);ell(body,18,-6,16,8,sk,3);
    const skirt=kind==='lakshmi'?'M-40 -178L40 -178L62 -10Q0 0 -62 -10Z':'M-38 -176L38 -176L54 -18Q0 -8 -54 -18Z';
    dbl(body,skirt,garment,0,-96,.9,4.6);
    shp(body,kind==='lakshmi'?'M-60 -32L60 -32L62 -10Q0 0 -62 -10Z':'M-52 -40L52 -40L54 -18Q0 -8 -54 -18Z',D.border,3);
    ln(body,kind==='lakshmi'?'M-54 -20Q0 -12 54 -20':'M-46 -28Q0 -20 46 -28',P.turmeric,4,{'stroke-dasharray':'.1 9'});
    if(kind!=='lakshmi'){shp(body,'M-12 -176L12 -176L16 -30L-16 -30Z',D.border,3);ln(body,'M0 -170V-36',P.turmeric,3.4,{'stroke-dasharray':'.1 9'})}
    /* torso */
    const torso='M-44 -246Q0 -262 44 -246L36 -178L-36 -178Z';dbl(body,torso,sk,0,-212,.86,4.6);
    shp(body,'M-38 -190H38V-174H-38Z',D.border,3);ln(body,'M-32 -182H32',P.turmeric,3.6,{'stroke-dasharray':'.1 9'});
    if(kind==='lakshmi'){shp(body,'M-44 -246L-24 -252L40 -176L18 -176Z',Pat.u('petals',P.gold,P.verm,.6),3);ln(body,'M-24 -252L40 -176',P.gold,4)}
    if(kind==='vishnu'||kind==='dhanv')ln(body,'M-24 -250Q-6 -214 28 -180',P.ivory,2.4);
    limb(body,'M0 -246V-266',sk,22);
    if(kind==='shiva'){this.throatG=grp(body);circ(this.throatG,0,-256,10,P.sea,2.4);circ(this.throatG,0,-256,6,'none',1.6,{stroke:P.foam});circ(this.throatG,0,-256,2.2,P.foam,0);
      const beads=[];for(let i=0;i<=10;i++){const a=(200+i*14)*DEG;beads.push([Math.cos(a)*30,-252-Math.sin(a)*-26])}beads.forEach(([x,y])=>circ(body,x,y,4,P.terra,1.6));circ(body,0,-224,6,P.terra,2)}
    else{ln(body,'M-30 -246Q0 -214 30 -246',K,8);ln(body,'M-30 -246Q0 -214 30 -246',P.turmeric,4.6);ln(body,'M-26 -244Q0 -224 26 -244',P.ivory,3.4,{'stroke-dasharray':'.1 7'});
      circ(body,0,-229,6,P.verm,2.4);ln(body,'M-36 -246Q0 -196 36 -246',K,6);ln(body,'M-36 -246Q0 -196 36 -246',P.gold,3)}
    if(kind==='vishnu'){ln(body,'M-40 -244Q-30 -150 0 -140Q30 -150 40 -244',K,9);ln(body,'M-40 -244Q-30 -150 0 -140Q30 -150 40 -244',P.leaf,5.5);
      for(let i=0;i<7;i++){const t=i/6;const x=lerp(-34,34,t),y=-244+Math.sin(t*Math.PI)*98;circ(body,x,y,4.4,i%2?P.verm:P.turmeric,1.6)}}
    /* head and crown */
    const head=this.head=grp(body);const ff=frontFace(head,{sk,eyes:kind==='shiva'?'half':'open',tilak:kind==='shiva'?'tri':kind==='lakshmi'?'dot':'u'});this.mouthTalk=ff.mouthTalk;
    for(const sd of[-1,1]){circ(head,sd*38,-288,7,P.turmeric,2.6);circ(head,sd*38,-288,2.6,P.verm,0)}
    const cr=grp(head);
    if(D.crown==='kirita'||D.crown==='tall'){const tall=D.crown==='tall';
      shp(cr,`M-30 -340L-26 ${tall?-392:-400}Q0 ${tall?-420:-430} 26 ${tall?-392:-400}L30 -340Z`,Pat.u('petals',tall?P.verm:P.turmeric,tall?P.turmeric:P.gold,.6),4.2);
      shp(cr,'M-36 -350H36V-334H-36Z',tall?P.gold:P.verm,3.2);ln(cr,'M-30 -342H30',P.ivory,3.6,{'stroke-dasharray':'.1 8'});
      shp(cr,`M-30 ${tall?-392:-400}H30V${tall?-380:-388}H-30Z`,tall?P.gold:P.verm,2.6);
      if(tall){const lt=lotus(cr,{r:22,n:5,open:.8,pad:false,col:P.pink,col2:P.ivory});tf(lt.g,0,-414,1)}else{shp(cr,'M-8 -428L0 -446L8 -428Z',P.turmeric,2.6);circ(cr,0,-418,5,P.verm,2)}
      circ(cr,0,-366,7,P.verm,2.4);circ(cr,-18,-364,4,P.leaf,1.6);circ(cr,18,-364,4,P.leaf,1.6)}
    else if(D.crown==='fan'){shp(cr,'M-34 -336L-40 -372L-22 -362L-14 -388L0 -370L14 -388L22 -362L40 -372L34 -336Z',P.turmeric,3.6);shp(cr,'M-36 -346H36V-332H-36Z',P.gold,3);
      [-22,0,22].forEach(x=>circ(cr,x,-358,4.2,P.verm,1.6));ln(cr,'M-30 -339H30',P.ivory,3.2,{'stroke-dasharray':'.1 7'})}
    else if(D.crown==='jata'){shp(cr,'M-24 -334Q-34 -372 -16 -396Q0 -410 16 -396Q34 -372 24 -334Z',K,0);
      ln(cr,'M-18 -344Q-24 -370 -10 -390M-6 -342Q-10 -372 2 -398M8 -342Q14 -372 12 -396M18 -346Q26 -366 16 -390',P.indigo,2.6);
      ln(cr,'M-26 -340Q0 -350 26 -340',P.ivory,3.4,{'stroke-dasharray':'.1 7'});
      shp(cr,'M14 -392A20 20 0 1 0 30 -360A15 15 0 1 1 14 -392Z',P.ivory,3);ln(cr,'M0 -336V-326',P.verm,3)}
    /* hand attributes */
    const H=(a,kind2)=>{const h=a.hand;if(kind2==='palm'){shp(h,'M-10 42Q-12 58 -6 64H6Q12 58 10 42Z',sk,3);ln(h,'M-4 52V62M0 51V63M4 52V62',K,1.2)}else circ(h,0,48,11,sk,3)};
    if(kind==='vishnu'){H(this.lArm,'fist');H(this.rArm,'fist');const ch=grp(this.lArm.hand);circ(ch,0,72,18,P.turmeric,3);circ(ch,0,72,7,P.verm,2);ln(ch,'M0 56V88M-16 72H16M-11 61L11 83M11 61L-11 83',K,1.8);
      const co=grp(this.rArm.hand);shp(co,'M-12 60Q-16 80 0 88Q16 80 12 60Q0 54 -12 60Z',P.ivory,3);ln(co,'M-6 64Q4 70 -2 78Q8 80 6 70',P.sea,2)}
    else if(kind==='shiva'){H(this.lArm,'fist');H(this.rArm,'palm');const tr=grp(this.lArm.hand);ln(tr,'M0 -180V120',K,8);ln(tr,'M0 -180V120',P.gold,4);
      shp(tr,'M-20 -200Q-20 -176 0 -172Q20 -176 20 -200L14 -200Q14 -184 4 -182V-214L0 -222L-4 -214V-182Q-14 -184 -14 -200Z',P.ivory,2.6);this.trishul=tr}
    else if(kind==='lakshmi'){H(this.lArm,'fist');H(this.rArm,'fist');for(const a of[this.lArm,this.rArm]){const lt=lotus(a.hand,{r:24,n:5,open:.85,pad:false});tf(lt.g,0,40,1,180);a.lotus=lt}}
    else{H(this.lArm,'fist');H(this.rArm,'fist')}}
  set(pose){if(DPOSE[pose]){this.pose=pose;Object.assign(this.tgt,DPOSE[pose])}}
  update(dt,t){const k=1-Math.exp(-dt*6);for(const p in this.tgt)this.cur[p]+=(this.tgt[p]-this.cur[p])*k;const c=this.cur;
    tf(this.g,this.x,this.y,this.s);tf(this.body,0,Math.sin(t*1.3+this.ph)*1.4*MV(),1);
    tf(this.lArm.up,this.lArm.sx,this.lArm.sy,1,-c.la);tf(this.lArm.fo,0,52,1,-c.lb);tf(this.rArm.up,this.rArm.sx,this.rArm.sy,1,-c.ra);tf(this.rArm.fo,0,52,1,-c.rb);
    if(this.trishul)this.trishul.setAttribute('transform',`rotate(${f1(c.la+c.lb)} 0 48)`);
    if(this.lArm.lotus){tf(this.lArm.lotus.g,0,40,1,180+0);this.lArm.lotus.g.setAttribute('transform',`rotate(${f1(c.la+c.lb+180)} 0 48) translate(0 26) rotate(180)`);
      this.rArm.lotus.g.setAttribute('transform',`rotate(${f1(c.ra+c.rb+180)} 0 48) translate(0 26) rotate(180)`)}
    if(this.throatG)tf(this.throatG,0,-256*(1-this.throat),this.throat);
    show(this.mouthTalk,this.talking);if(this.talking){const m=.35+.65*Math.abs(Math.sin(t*7+this.ph));this.mouthTalk.setAttribute('transform',`translate(0 -277) scale(1 ${f3(m)}) translate(0 277)`)}
    show(this.g,this.vis)}
  /* world position of the hands (used to hold the kalash or lotuses) */
  handW(side){const A=side<0?this.lArm:this.rArm;const a=(side<0?this.cur.la:this.cur.ra)*DEG,b=(side<0?this.cur.lb:this.cur.rb)*DEG;
    return[this.x+(A.sx+Math.sin(a)*52+Math.sin(a+b)*48)*this.s,this.y+(A.sy+Math.cos(a)*52+Math.cos(a+b)*48)*this.s]}}
