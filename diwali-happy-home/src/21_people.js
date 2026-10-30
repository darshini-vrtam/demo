/* ===== Character bible: the family (front view, Madhubani style) =====
   One parameterised figure, built once per person. Poses only move the arms (solved from a hand target),
   the head (nod, shake, tilt), the brows and the mouth, so faces, clothes, colours, hair and jewellery never change. */
const FAMILY={
  gran:{name:'Grandmother',sk:P.brown,hair:P.grey,style:'bun',cloth:'sari',c1:P.dred,c2:P.gold,bindi:1,ear:1,bangle:1,h:1,head:1,age:1},
  mother:{name:'Mother',sk:P.ochre,hair:K,style:'bun',cloth:'sari',c1:P.leaf,c2:P.gold,bindi:1,ear:1,bangle:1,h:1,head:1},
  father:{name:'Father',sk:P.terra,hair:K,style:'short',cloth:'kurta',c1:P.indigo,c2:P.ivory,mous:1,h:1.06,head:1},
  girl:{name:'Girl',sk:P.ochre,hair:K,style:'braids',cloth:'lehenga',c1:P.magenta,c2:P.turmeric,h:.7,head:1.18},
  boy:{name:'Boy',sk:P.terra,hair:K,style:'short',cloth:'kurta',c1:P.teal,c2:P.ivory,h:.68,head:1.18}};
/* hand targets relative to the shoulder (x outward from the body, y down); 'joined' puts both hands together at the chest */
const HPOSE={idle:{l:[10,92],r:[10,92]},namaste:{joined:1},gesture:{l:[10,92],r:[78,8]},gestureL:{l:[78,8],r:[10,92]},
  point:{l:[10,92],r:[86,-30]},three:{l:[10,92],r:[34,-78],hand:'three'},hold:{l:[-10,58],r:[-10,58]},
  offer:{l:[10,92],r:[60,36]},reach:{l:[10,92],r:[70,60]},up:{l:[10,92],r:[40,-70]},place:{l:[10,92],r:[52,-62]},
  basket:{l:[-6,70],r:[-6,70]}};
class Person{constructor(kind,parent){this.kind=kind;this.D=FAMILY[kind];this.x=0;this.y=0;this.s=1;this.f=1;this.vis=true;this.seat=0;this.lean=0;
    this.pose='idle';this.cur={lx:10,ly:92,rx:10,ry:92,j:0};this.tgt=Object.assign({},this.cur);this.hand='palm';
    this.brow=0;this.smile=1;this.nod=0;this.shake=0;this.tiltH=0;this.ph=Math.random()*TAU;this.blinkAt=2+Math.random()*3;this.walk=0;this.build(parent)}
  build(parent){const Q=this.D,sk=Q.sk;const g=this.g=grp(parent);const body=this.body=grp(g);
    /* lower body: standing or seated cross-legged, swapped by the seat state */
    const stand=this.standG=grp(body),sit=this.sitG=grp(body);
    if(Q.cloth==='sari'){shp(stand,'M-40 -150L40 -150L58 -6Q0 4 -58 -6Z',Pat.u('vlines',Q.c2,Q.c1,.8),4.2);shp(stand,'M-56 -24L56 -24L58 -6Q0 4 -58 -6Z',Q.c2,3);
      ell(stand,-20,0,14,6,sk,2.6);ell(stand,20,0,14,6,sk,2.6)}
    else if(Q.cloth==='lehenga'){shp(stand,'M-34 -150L34 -150L64 -14Q0 0 -64 -14Z',Pat.u('petals',Q.c2,Q.c1,.6),4.2);shp(stand,'M-62 -30L62 -30L64 -14Q0 0 -64 -14Z',Q.c2,3);
      ell(stand,-18,0,13,6,sk,2.6);ell(stand,18,0,13,6,sk,2.6)}
    else{limb(stand,'M-16 -150L-18 -6',Q.c2,24);limb(stand,'M16 -150L18 -6',Q.c2,24);ell(stand,-22,0,15,6,sk,2.6);ell(stand,22,0,15,6,sk,2.6)}
    const lapFill=Q.cloth==='kurta'?Q.c2:Pat.u(Q.cloth==='sari'?'vlines':'petals',Q.c2,Q.c1,.7);
    shp(sit,'M-36 -40C-80 -40 -96 -20 -92 -6Q-88 4 -60 4H60Q88 4 92 -6C96 -20 80 -40 36 -40Z',lapFill,4.2);
    if(Q.cloth!=='kurta')shp(sit,'M-90 -10Q-88 4 -60 4H60Q88 4 90 -10Q70 -4 0 -4Q-70 -4 -90 -10Z',Q.c2,2.6);
    ell(sit,-30,-14,15,7,sk,2.4);ell(sit,32,-10,15,7,sk,2.4);
    const up=this.upG=grp(body);
    /* the back hair falls behind the shoulders */
    if(Q.style==='braids'){limb(up,'M-26 -290Q-36 -230 -30 -190',K,9);limb(up,'M26 -290Q36 -230 30 -190',K,9);circ(up,-30,-186,6,Q.c2,2);circ(up,30,-186,6,Q.c2,2)}
    /* torso and garment top */
    if(Q.cloth==='kurta'){shp(up,'M-40 -252Q0 -262 40 -252L48 -96L-48 -96Z',Pat.u('vlines',Q.cloth==='kurta'&&Q.c1===P.teal?P.turq:P.sea,Q.c1,.7),4.4);
      ln(up,'M0 -250V-180',P.turmeric,3.4);ln(up,'M-46 -110H46',P.turmeric,3.4,{'stroke-dasharray':'.1 9'});[-226,-208,-190].forEach(y=>circ(up,0,y,2.6,P.turmeric,1))}
    else if(Q.cloth==='sari'){shp(up,'M-38 -252Q0 -262 38 -252L36 -150L-36 -150Z',sk,4.4);shp(up,'M-38 -250Q0 -258 38 -250L36 -214Q0 -206 -36 -214Z',Q.c1,3);
      shp(up,'M10 -258L40 -252L-30 -146L-46 -156Z',Pat.u('vlines',Q.c2,Q.c1,.6),3.6);ln(up,'M14 -256L-40 -150',Q.c2,4.4)}
    else{shp(up,'M-34 -252Q0 -260 34 -252L32 -150L-32 -150Z',Q.c1,4.4);ln(up,'M-30 -232H30M-30 -160H30',Q.c2,4);ln(up,'M-30 -196H30',Q.c2,2.4,{'stroke-dasharray':'.1 8'});
      shp(up,'M-30 -252L30 -252L28 -236Q0 -230 -28 -236Z',Q.c2,2)}
    limb(up,'M0 -252V-268',sk,16);
    if(Q.age||Q.cloth==='sari'){ln(up,'M-16 -250Q0 -236 16 -250',K,5);ln(up,'M-16 -250Q0 -236 16 -250',P.turmeric,2.6)}
    /* arms: shoulder, solved elbow, hand; joined hands drawn as one shape for namaste */
    const arm=(sd)=>{const a=grp(up);const ink=el('path',{fill:'none',stroke:K,'stroke-width':20,'stroke-linecap':'round','stroke-linejoin':'round'},a);
      const sl=el('path',{fill:'none',stroke:Q.cloth==='kurta'?Q.c1:(Q.cloth==='sari'?sk:Q.c1),'stroke-width':13,'stroke-linecap':'round','stroke-linejoin':'round'},a);
      const skn=el('path',{fill:'none',stroke:sk,'stroke-width':12,'stroke-linecap':'round'},a);
      const hand=grp(a);const palm=circ(hand,0,0,9,sk,2.6);const three=grp(hand);shp(three,'M-9 6L-9 -6L-6 -26L-2 -26L0 -8L3 -28L7 -28L8 -8L11 -24L14 -23L11 4Z',sk,2.4);show(three,false);
      if(Q.bangle){circ(hand,0,0,0,'none',0)}const bang=ln(a,'',P.gold,4.4);return{a,ink,sl,skn,hand,palm,three,bang,sd}};
    this.armL=arm(-1);this.armR=arm(1);
    this.joined=grp(up);shp(this.joined,'M-10 -176Q-12 -206 0 -222Q12 -206 10 -176Z',sk,2.8);ln(this.joined,'M0 -218V-178',K,1.6);show(this.joined,false);
    /* head: hair, face, features */
    const hd=this.head=grp(up);const hy=-298;
    if(Q.style==='bun')circ(hd,0,hy-34,14,Q.hair,3);
    shp(hd,`M-30 ${hy+4}Q-34 ${hy-38} 0 ${hy-40}Q34 ${hy-38} 30 ${hy+4}Z`,Q.hair,3);
    ell(hd,0,hy+4,26,31,sk,4);
    ell(hd,-27,hy+4,5,8,sk,2.4);ell(hd,27,hy+4,5,8,sk,2.4);
    if(Q.ear){circ(hd,-28,hy+15,3.6,P.turmeric,1.4);circ(hd,28,hy+15,3.6,P.turmeric,1.4)}
    if(Q.style==='short')shp(hd,`M-27 ${hy-6}Q-26 ${hy-36} 0 ${hy-37}Q26 ${hy-36} 27 ${hy-6}Q16 ${hy-22} 0 ${hy-22}Q-16 ${hy-22} -27 ${hy-6}Z`,Q.hair,0);
    else shp(hd,`M-27 ${hy}Q-28 ${hy-36} 0 ${hy-37}Q28 ${hy-36} 27 ${hy}Q22 ${hy-20} 0 ${hy-24}Q-22 ${hy-20} -27 ${hy}Z`,Q.hair,0);
    if(Q.age)ln(hd,`M-20 ${hy-24}Q0 ${hy-30} 20 ${hy-24}`,P.ivory,1.6);
    const eyes=this.eyes=grp(hd);for(const sd of[-1,1]){const x=sd*10;shp(eyes,`M${x-7} ${hy}Q${x} ${hy-7} ${x+7} ${hy}Q${x} ${hy+5} ${x-7} ${hy}Z`,P.ivory,2.2);circ(eyes,x,hy,2.8,K,0)}
    this.shut=ln(hd,`M3 ${hy+1}Q10 ${hy+4} 17 ${hy+1}M-17 ${hy+1}Q-10 ${hy+4} -3 ${hy+1}`,K,2.4);show(this.shut,false);
    this.brows=ln(hd,`M-17 ${hy-10}Q-10 ${hy-14} -4 ${hy-10}M4 ${hy-10}Q10 ${hy-14} 17 ${hy-10}`,K,2.4);
    ln(hd,`M0 ${hy+2}Q-3 ${hy+12} 2 ${hy+13}`,K,1.8);
    if(Q.mous)ln(hd,`M-9 ${hy+17}Q0 ${hy+13} 9 ${hy+17}`,K,3.6);
    if(Q.age)ln(hd,`M-20 ${hy+10}Q-17 ${hy+14} -15 ${hy+12}M20 ${hy+10}Q17 ${hy+14} 15 ${hy+12}`,K,1.2);
    this.mouth={smile:ln(hd,`M-7 ${hy+20}Q0 ${hy+26} 7 ${hy+20}`,K,2.4),big:shp(hd,`M-8 ${hy+19}Q0 ${hy+30} 8 ${hy+19}Z`,P.verm,2)};
    if(Q.bindi)circ(hd,0,hy-14,2.6,P.verm,0);
    this.hy=hy;this.props=grp(up)}
  set(p){if(!HPOSE[p])return;this.pose=p;const q=HPOSE[p];if(q.joined){Object.assign(this.tgt,{j:1})}else{Object.assign(this.tgt,{j:0,lx:q.l[0],ly:q.l[1],rx:q.r[0],ry:q.r[1]})}this.hand=q.hand||'palm'}
  /* hold a small prop in the right hand (flowers, diya, garland, sweet) */
  hold(kind){this.props.innerHTML='';this.prop=null;if(!kind)return;const g=grp(this.props);
    if(kind==='flowers'){[[-8,-4],[8,-6],[0,-16]].forEach(([x,y],i)=>{const m=marigold(g,9,i%2?P.gold:P.turmeric);tf(m,x,y,1)})}
    else if(kind==='garland'){ln(g,'M-40 0Q0 30 40 0',P.leaf,4);for(let i=0;i<7;i++){const u=i/6;const m=marigold(g,7,i%2?P.gold:P.turmeric);tf(m,lerp(-40,40,u),Math.sin(u*Math.PI)*15,1)}}
    else if(kind==='diya'){const d=diya(g,{col:P.terra});d.s=.36;d.lit=0;d.update(0)}
    else if(kind==='sweet'){circ(g,0,-4,9,P.turmeric,2.4);circ(g,0,-4,3,P.gold,0)}
    else if(kind==='petal'){shp(g,'M0 0Q6 -8 0 -16Q-6 -8 0 0Z',P.pink,1.8)}
    else if(kind==='powder'){ell(g,0,0,14,6,P.ochre,2.2);ell(g,0,-3,10,4,P.pink,1.4)}
    this.prop=g}
  handPos(sd){const c=this.cur;const S=[sd*36,-244];if(c.j>.5)return[0,-200];return[S[0]+sd*(sd<0?c.lx:c.rx),S[1]+(sd<0?c.ly:c.ry)]}
  world(lx,ly){const k=this.s,y0=this.seat?110:0;return[this.x+lx*k*this.f,this.y+(ly+y0)*k]}
  update(dt,t){const k=1-Math.exp(-dt*6);for(const p in this.tgt)this.cur[p]+=(this.tgt[p]-this.cur[p])*k;const c=this.cur,m=MV(),Q=this.D;
    const hs=Q.head||1;tf(this.g,this.x,this.y,this.s*Q.h,0,this.f,1);
    const bob=Math.sin(t*1.6+this.ph)*1.2*m+(this.walk?Math.abs(Math.sin(t*6))*-5:0);
    tf(this.body,0,bob,1,this.lean);show(this.standG,!this.seat);show(this.sitG,!!this.seat);tf(this.upG,0,this.seat?110:0,1);
    const U=52,F=50;
    for(const A of[this.armL,this.armR]){const sd=A.sd;const S=[sd*36,-244];let T;
      if(c.j>.02){const free=[S[0]+sd*(sd<0?c.lx:c.rx),S[1]+(sd<0?c.ly:c.ry)];T=[lerp(free[0],sd*8,c.j),lerp(free[1],-196,c.j)]}else T=[S[0]+sd*(sd<0?c.lx:c.rx),S[1]+(sd<0?c.ly:c.ry)];
      let dx=T[0]-S[0],dy=T[1]-S[1];let d=Math.hypot(dx,dy);const mx=U+F-2;if(d>mx){dx*=mx/d;dy*=mx/d;d=mx;T=[S[0]+dx,S[1]+dy]}d=Math.max(d,10);
      const base=Math.atan2(dy,dx),off=Math.acos(clamp((U*U+d*d-F*F)/(2*U*d),-1,1));const ang=base+sd*off*(dy<0?-1:1)*-1;const E=[S[0]+Math.cos(ang)*U,S[1]+Math.sin(ang)*U];
      const dd=`M${f1(S[0])} ${f1(S[1])}L${f1(E[0])} ${f1(E[1])}L${f1(T[0])} ${f1(T[1])}`;A.ink.setAttribute('d',dd);A.sl.setAttribute('d',`M${f1(S[0])} ${f1(S[1])}L${f1(lerp(S[0],E[0],.7))} ${f1(lerp(S[1],E[1],.7))}`);
      A.skn.setAttribute('d',`M${f1(lerp(S[0],E[0],.7))} ${f1(lerp(S[1],E[1],.7))}L${f1(E[0])} ${f1(E[1])}L${f1(T[0])} ${f1(T[1])}`);
      const bx=lerp(E[0],T[0],.78),by=lerp(E[1],T[1],.78);A.bang.setAttribute('d',Q.bangle?`M${f1(bx-6)} ${f1(by)}h12`:'');
      tf(A.hand,T[0],T[1],1);const three=sd>0&&this.hand==='three';show(A.three,three);show(A.palm,!three);op(A.a,c.j>.9?(sd<0?1:1):1);A.T=T}
    show(this.joined,c.j>.85);if(c.j>.85){show(this.armL.hand,false);show(this.armR.hand,false)}else{show(this.armL.hand,true);show(this.armR.hand,true)}
    if(this.prop){const T=this.armR.T;tf(this.prop,T[0],T[1]-8,1)}
    const hy=this.hy;const rot=this.tiltH+this.shake*Math.sin(t*9)*8;
    this.head.setAttribute('transform',`translate(0 ${f1(this.nod*4)}) rotate(${f1(rot)} 0 ${hy+30}) translate(0 ${hy}) scale(${hs}) translate(0 ${-hy})`);
    this.brows.setAttribute('transform',`translate(0 ${f1(-this.brow*4)})`);
    if(t>this.blinkAt){this.blinkAt=t+3+Math.random()*4;this.blinkEnd=t+.13}const bl=this.blinkEnd&&t<this.blinkEnd&&MV()>.5;const shut=bl||this.closed;show(this.eyes,!shut);show(this.shut,!!shut);
    show(this.mouth.smile,this.smile<1.5);show(this.mouth.big,this.smile>=1.5);show(this.g,this.vis)}}
