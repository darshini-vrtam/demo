/* ===== Character bible: the Devas (profile, Madhubani style; reused from the Dhanteras build with this episode's four garment colours) =====
   Built once per figure as an SVG group; a pose state machine only changes transforms,
   so clothing, crowns, colours and proportions never change between shots. */
const KIN={deva:[{sk:P.ochre,g:P.gold,g2:P.verm,c:P.turmeric},{sk:P.terra,g:P.leaf,g2:P.turmeric,c:P.gold},{sk:P.ochre,g:P.coral,g2:P.gold,c:P.turmeric},{sk:P.terra,g:P.indigo,g2:P.turmeric,c:P.gold}],
  asura:[{sk:P.terra,g:P.verm,g2:P.indigo,z:P.turmeric}]};
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
  nod:{ba:-6,bb:12,fa:8,fb:16,lean:0,tilt:9,mouth:'smile'},
  bow:{ba:22,bb:122,fa:30,fb:116,lean:12,tilt:12,brow:.2,mouth:'smile',eye:'closed'}};
const FACE_DEF={brow:0,mouth:'smile',eye:'open',step:0};
class Fig{constructor(kind,v,parent){this.kind=kind;this.v=v;this.K=KIN[kind][v%KIN[kind].length];this.x=0;this.y=0;this.s=1;this.f=1;this.vis=true;
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

