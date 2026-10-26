/* ===== Character bible: one parameterised figure builder, masters defined once ===== */
/* Local units: feet at y=0, head centre at y=-272, standing height about 300 (+ crown). Seated figures shift down by 100. */
const SH={L:[-44,-226],R:[44,-226]},A1=54,A2=50;
function ik(S,T,bend){let dx=T[0]-S[0],dy=T[1]-S[1],d=Math.hypot(dx,dy)||1;const mx=A1+A2-.5;if(d>mx){dx*=mx/d;dy*=mx/d;d=mx}
  const base=Math.atan2(dy,dx),ca_=clamp((A1*A1+d*d-A2*A2)/(2*A1*d),-1,1),al=Math.acos(ca_);const e=[S[0]+Math.cos(base+bend*al)*A1,S[1]+Math.sin(base+bend*al)*A1];return{e,h:[S[0]+dx,S[1]+dy]}}

/* ---- static body (sprite): lower garment, torso, ornaments, head shape, crown/hair ---- */
function bodyArt(g,sp){const sk=sp.skin;const broad=sp.build==='broad'?1.12:sp.build==='portly'?1.25:1;
  if(sp.seated){const lap=sPath([[-92,-104],[-60,-150],[0,-158],[60,-150],[92,-104],[60,-96],[0,-100],[-60,-96]],true);
    shape(g,lap,sp.dhoti,c=>{(sp.dhotiPat||Pat.dots)(c,{x:-95,y:-160,w:190,h:66});Pat.tri(c,{x:-95,y:-112,w:190,h:12},14,sp.border||C.gold)},{lw:2.4});
    [[-50,-104],[50,-104]].forEach(([x,y])=>shape(g,ellPath(x,y,16,8),sk,null,{line:'single',lw:2}))}
  else{[[-20,-6],[20,-6]].forEach(([x,y])=>shape(g,ellPath(x,y,15,8),sk,c=>dot(c,x,y-4,2.5,C.verm),{line:'single',lw:2}));
    const dh=sPath(wob([[-36*broad,-152],[-44*broad,-90],[-54*broad,-16],[0,-12],[54*broad,-16],[44*broad,-90],[36*broad,-152]],1,hash(sp.id+'d')),true);
    shape(g,dh,sp.dhoti,c=>{(sp.dhotiPat||Pat.dots)(c,{x:-60,y:-156,w:120,h:146});c.fillStyle=sp.border||C.gold;c.fillRect(-8,-150,16,138);Pat.dots(c,{x:-8,y:-150,w:16,h:138},10,2,C.cream);
      Pat.tri(c,{x:-60,y:-30,w:120,h:14},14,sp.border||C.gold)},{lw:2.4})}
  /* torso */
  const w=broad;const tor=sPath(wob([[-46*w,-230],[-40*w,-196],[-32*w,-150],[32*w,-150],[40*w,-196],[46*w,-230],[0,-236]],.8,hash(sp.id+'t')),true);
  if(sp.build==='portly'){const belly=ellPath(0,-176,44,34);shape(g,belly,sk,null,{line:'none'})}
  shape(g,tor,sp.top||sk,sp.top?c=>Pat.dots(c,{x:-50,y:-236,w:100,h:90},12,2,sp.topAcc||C.gold):null,{lw:2.4});
  if(sp.build==='portly')dbl(g,ellPath(0,-170,42,30),2);
  /* scarf across the chest */
  if(sp.scarf){const sc=polyPath([[-44*w,-228],[-30*w,-232],[34*w,-162],[22*w,-152]]);shape(g,sc,sp.scarf,c=>Pat.stripes(c,{x:-50,y:-236,w:100,h:90},9,3,C.cream),{lw:2})}
  /* waist sash */
  const sash=polyPath([[-36*w,-160],[36*w,-160],[38*w,-146],[-38*w,-146]]);shape(g,sash,sp.sash||C.verm,c=>Pat.dots(c,{x:-40,y:-162,w:80,h:18},10,2,C.turmeric),{lw:2});
  /* neck and head */
  shape(g,polyPath([[-10,-252],[10,-252],[11,-228],[-11,-228]]),sk,null,{line:'single',lw:2});
  if(sp.crown==='jata'){const hair=sPath([[-30,-290],[-36,-240],[-40,-200],[-24,-206],[-26,-250]],true);shape(g,hair,C.charcoal,c=>Pat.stripes(c,{x:-42,y:-292,w:20,h:92},7,2,C.ochre,true),{lw:2});
    const hair2=sPath([[30,-290],[36,-240],[40,-200],[24,-206],[26,-250]],true);shape(g,hair2,C.charcoal,c=>Pat.stripes(c,{x:22,y:-292,w:20,h:92},7,2,C.ochre,true),{lw:2})}
  if(sp.crown==='asura'){const mane=sPath(ellPts(sp.profile?-6:0,-276,40,38,14),true);shape(g,mane,C.charcoal,c=>Pat.scallops(c,{x:-50,y:-320,w:96,h:84},14,C.violet,2.4),{lw:2})}
  const head=sp.profile?sPath([[-24,-290],[-6,-302],[14,-298],[22,-284],[23,-276],[31,-268],[23,-264],[25,-256],[19,-250],[8,-243],[-10,-245],[-24,-260]],true):sPath(wob(ellPts(0,-272,25,29,16),.6,hash(sp.id+'h')),true);
  shape(g,head,sk,null,{lw:2.2});
  /* ears and earrings */
  const ex=sp.profile?-12:26;[sp.profile?[ex]:[-ex,ex]].flat().forEach(x=>{shape(g,ellPath(x,-270,5,8),sk,null,{line:'single',lw:1.8});shape(g,ellPath(x,-252,6,6),C.gold,null,{line:'single',lw:1.6})});
  /* necklace */
  for(let k=0;k<2;k++){g.beginPath();g.arc(0,-238,18+k*9,.15*Math.PI,.85*Math.PI);g.strokeStyle=sp.neck||C.gold;g.lineWidth=5;g.stroke();g.strokeStyle=C.line;g.lineWidth=1.4;g.stroke()}
  for(let i=0;i<7;i++){const a=(.18+i*.106)*Math.PI;dot(g,Math.cos(a)*27,-238+Math.sin(a)*27,3,sp.crown==='jata'?C.ochre:C.verm)}
  if(sp.crown==='jata'){for(let i=0;i<9;i++){const a=(.12+i*.095)*Math.PI;dot(g,Math.cos(a)*40,-236+Math.sin(a)*40,4.4,C.ochre);ring(g,Math.cos(a)*40,-236+Math.sin(a)*40,4.4,C.line,1.4)}}
  /* armlets painted on the shoulders */
  crownArt(g,sp)}
function crownArt(g,sp){const cr=sp.crown;
  if(cr==='mukut'||cr==='lakshmi'){const tall=cr==='mukut'?72:54;const p=polyPath([[-26,-292],[-30,-300],[-22,-300-tall*.6],[-12,-300-tall*.8],[0,-300-tall],[12,-300-tall*.8],[22,-300-tall*.6],[30,-300],[26,-292]]);
    shape(g,p,C.gold,c=>{Pat.tri(c,{x:-30,y:-312,w:60,h:12},10,C.verm);Pat.dots(c,{x:-30,y:-300-tall,w:60,h:tall-10},9,2.2,C.turmeric)},{lw:2.2});dot(g,0,-306-tall*.4,6,sp.gem||C.emerald);ring(g,0,-306-tall*.4,6,C.line,1.6);
    if(cr==='lakshmi'){const hair=sPath([[-27,-288],[-32,-250],[-26,-226],[-20,-250]],true);shape(g,hair,C.charcoal,null,{lw:1.8});const h2=sPath([[27,-288],[32,-250],[26,-226],[20,-250]],true);shape(g,h2,C.charcoal,null,{lw:1.8})}}
  else if(cr==='deva'){const p=polyPath([[-24,-292],[-26,-318],[-14,-308],[0,-330],[14,-308],[26,-318],[24,-292]]);shape(g,p,C.gold,c=>Pat.dots(c,{x:-26,y:-330,w:52,h:40},8,2,C.verm),{lw:2});
    if(sp.profile){const hair=sPath([[-24,-290],[-34,-266],[-30,-240],[-20,-250],[-22,-276]],true);shape(g,hair,C.charcoal,null,{lw:1.8})}}
  else if(cr==='jata'){const bun=sPath([[-22,-292],[-26,-318],[-14,-342],[0,-350],[14,-342],[26,-318],[22,-292]],true);shape(g,bun,C.charcoal,c=>{Pat.zig(c,{x:-28,y:-352,w:56,h:62},10,C.ochre,2,12)},{lw:2});
    const moon=new Path2D();moon.arc(-22,-330,15,Math.PI*.6,Math.PI*1.9);moon.arc(-16,-334,11,Math.PI*1.9,Math.PI*.6,true);moon.closePath();shape(g,moon,C.white,null,{lw:1.6});
    dot(g,0,-296,5,C.verm)}
  else if(cr==='asura'){const band=polyPath([[-34,-296],[34,-296],[32,-284],[-32,-284]]);shape(g,band,C.verm,c=>Pat.dots(c,{x:-34,y:-298,w:68,h:16},9,2.4,C.turmeric),{lw:1.8});
    [[-24,-300],[0,-306],[24,-300]].forEach(([x,y])=>{shape(g,ellPath(x,y,6,6),C.gold,null,{line:'single',lw:1.6})})}
  else if(cr==='kubera'){const p=polyPath([[-26,-292],[-28,-326],[0,-344],[28,-326],[26,-292]]);shape(g,p,C.gold,c=>Pat.scallops(c,{x:-30,y:-346,w:60,h:56},10,C.verm,2),{lw:2})}}

/* ---- live face: eyes blink, brows and mouth carry the expression ---- */
function faceArt(ctx,sp,st){const ex=st.expr||'calm',bl=st.blink>.5,talk=st.talking&&Math.sin(T.sec*14)>0;const look=st.look||0;
  const eye=(x,y,w,h,prof)=>{if(bl||ex==='closed'){ctx.beginPath();ctx.moveTo(x-w,y);ctx.quadraticCurveTo(x,y+h*.9,x+w,y);ctx.strokeStyle=C.line;ctx.lineWidth=2.6;ctx.stroke();return}
    const p=new Path2D();p.moveTo(x-w,y);p.quadraticCurveTo(x,y-h*1.6,x+w+(prof?4:0),y);p.quadraticCurveTo(x,y+h*1.3,x-w,y);ctx.fillStyle=C.white;ctx.fill(p);sgl(ctx,p,2.2);
    const pr=ex==='wonder'?4.4:3.6;dot(ctx,x+(prof?w*.35:0)+look*3,y,pr,C.line);dot(ctx,x+(prof?w*.35:0)+look*3+1,y-1.4,1.1,C.white);
    ctx.beginPath();ctx.moveTo(x+w,y-1);ctx.lineTo(x+w+6,y-3);ctx.strokeStyle=C.line;ctx.lineWidth=2;ctx.stroke()};
  const brow=(x,y,w,tilt)=>{ctx.beginPath();ctx.moveTo(x-w,y+tilt);ctx.quadraticCurveTo(x,y-6,x+w,y-tilt);ctx.strokeStyle=C.line;ctx.lineWidth=2.6;ctx.stroke()};
  const bt=ex==='concern'?4:ex==='determined'?-3:0;
  if(sp.profile){eye(9,-277,9,5,true);brow(9,-288,10,ex==='concern'?-3:ex==='determined'?3:0);
    line(ctx,[[14,-285],[22,-276]],C.line,2);
    if(talk||ex==='wonder'){dot(ctx,20,-256,3.6,C.red);ring(ctx,20,-256,3.6,C.line,1.4)}else{ctx.beginPath();if(ex==='smile'||ex==='calm')ctx.arc(17,-259,5,.1*Math.PI,.7*Math.PI);else{ctx.moveTo(14,-256);ctx.lineTo(22,-256)}ctx.strokeStyle=C.red;ctx.lineWidth=3;ctx.stroke()}
    if(sp.crown==='asura'){ctx.beginPath();ctx.moveTo(12,-262);ctx.quadraticCurveTo(20,-266,28,-258);ctx.strokeStyle=C.charcoal;ctx.lineWidth=3.4;ctx.stroke()}
    dot(ctx,-2,-262,4,ca(C.coral,.7));return}
  eye(-11,-276,10,5);eye(11,-276,10,5);brow(-11,-287,11,-bt);brow(11,-287,11,bt);
  line(ctx,[[0,-280],[-2,-264],[3,-262]],C.line,2);
  if(sp.tilak!==false){if(sp.crown==='jata'){line(ctx,[[-9,-292],[9,-292]],C.cream,2);line(ctx,[[-9,-295],[9,-295]],C.line,1)}else dot(ctx,0,-293,3.4,C.verm)}
  if(talk||ex==='wonder'){shape(ctx,ellPath(0,-253,5,ex==='wonder'?5:4),C.red,null,{line:'single',lw:1.6})}
  else{const p=new Path2D();if(ex==='concern'){p.moveTo(-6,-252);p.quadraticCurveTo(0,-256,6,-252)}else if(ex==='determined'){p.moveTo(-7,-254);p.lineTo(7,-254)}else{p.moveTo(-8,-256);p.quadraticCurveTo(0,-248,8,-256)}sgl(ctx,p,3,C.red)}
  dot(ctx,-17,-262,4,ca(C.coral,.6));dot(ctx,17,-262,4,ca(C.coral,.6))}

/* ---- arms: thick brown stroke with a skin core reads as a clean double outline ---- */
function armArt(ctx,sp,S,h,bend,hand,item){const r=ik(S,h,bend);ctx.beginPath();ctx.moveTo(S[0],S[1]);ctx.lineTo(r.e[0],r.e[1]);ctx.lineTo(r.h[0],r.h[1]);
  ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle=C.line;ctx.lineWidth=21;ctx.stroke();ctx.strokeStyle=sp.skin;ctx.lineWidth=14;ctx.stroke();
  const band=(a,b,t,col)=>{const x=lerp(a[0],b[0],t),y=lerp(a[1],b[1],t),ang=Math.atan2(b[1]-a[1],b[0]-a[0])+Math.PI/2;line(ctx,[[x+Math.cos(ang)*8,y+Math.sin(ang)*8],[x-Math.cos(ang)*8,y-Math.sin(ang)*8]],col,4)};
  band(S,r.e,.45,sp.crown==='jata'?C.ochre:C.gold);band(r.e,r.h,.78,C.gold);band(r.e,r.h,.66,sp.crown==='asura'?C.verm:C.red);
  const hx=r.h[0],hy=r.h[1];
  if(hand==='open'){const ang=Math.atan2(r.h[1]-r.e[1],r.h[0]-r.e[0]);ctx.save();ctx.translate(hx,hy);ctx.rotate(ang-Math.PI/2);const p=sPath([[-8,-4],[-10,10],[-6,20],[0,22],[6,20],[10,10],[8,-4]],true);shape(ctx,p,sp.skin,c=>dot(c,0,8,3,C.verm),{line:'single',lw:2});
    for(let i=-1;i<=1;i++)line(ctx,[[i*4,12],[i*4,19]],C.line,1.2);ctx.restore()}
  else{shape(ctx,ellPath(hx,hy,9,9),sp.skin,null,{line:'single',lw:2})}
  if(item)PROPS[item]&&PROPS[item](ctx,hx,hy);return r.h}
const PROPS={
  conch(ctx,x,y){ctx.save();ctx.translate(x,y-14);ctx.rotate(-.5);drawConch(ctx,0,0,.42);ctx.restore()},
  discus(ctx,x,y){ctx.save();ctx.translate(x,y-26);ctx.rotate(T.sec*.6);const p=sPath(ellPts(0,0,22,22,12),true);shape(ctx,p,C.turmeric,c=>{for(let i=0;i<8;i++){const a=i/8*TAU;line(c,[[0,0],[Math.cos(a)*22,Math.sin(a)*22]],C.verm,2.2)}},{lw:1.8});dot(ctx,0,0,6,C.verm);ctx.restore()},
  lotusSmall(ctx,x,y){drawLotus(ctx,x,y-6,.36,1)},
  trident(ctx,x,y){const t=new Path2D();t.moveTo(x,y+70);t.lineTo(x,y-120);sgl(ctx,t,8,C.line);sgl(ctx,t,4,C.ochre);
    const h=new Path2D();h.moveTo(x-18,y-150);h.quadraticCurveTo(x-18,y-118,x,y-118);h.quadraticCurveTo(x+18,y-118,x+18,y-150);h.moveTo(x,y-118);h.lineTo(x,y-160);sgl(ctx,h,6,C.line);sgl(ctx,h,2.6,C.cream);
    shape(ctx,ellPath(x,y-104,8,6),C.verm,null,{line:'single',lw:1.4})},
  pouch(ctx,x,y){const p=sPath([[-16,-6],[-20,14],[0,24],[20,14],[16,-6],[8,-14],[-8,-14]],true);ctx.save();ctx.translate(x+4,y+8);shape(ctx,p,C.emerald,c=>Pat.dots(c,{x:-20,y:-14,w:40,h:38},8,2.4,C.turmeric),{lw:1.8});ctx.restore()}};

/* ---- the figure: state machine with named poses; hands ease toward pose targets ---- */
class Fig{constructor(sp,o){this.sp=sp;Object.assign(this,{x:0,y:0,s:1,f:1,lean:0,vis:1,expr:'calm',look:0,blink:0,nb:2+Math.random()*3,talking:false,state:'idle',bob:0,ph:Math.random()*9},o||{});
    this.hands=(sp.poses[sp.start||'idle']).map(a=>a.h.slice());this.pose(sp.start||'idle',true)}
  pose(name,snap){const p=this.sp.poses[name];if(!p)return;this.state=name;this.tgt=p;if(snap)this.hands=p.map(a=>a.h.slice());if(p.expr)this.expr=p.expr}
  update(dt){const k=1-Math.exp(-dt*6);this.tgt.forEach((a,i)=>{this.hands[i][0]+=(a.h[0]-this.hands[i][0])*k;this.hands[i][1]+=(a.h[1]-this.hands[i][1])*k});
    this.nb-=dt;if(this.nb<0){this.blink=1;if(this.nb<-.14){this.blink=0;this.nb=2.5+Math.random()*3.5}}}
  /* world position of a local point (for ropes, pots and props) */
  toWorld(p){const sy=this.sp.seated?100:0;const x=p[0]*this.f,y=p[1]+sy;const c=Math.cos(this.lean*this.f),s=Math.sin(this.lean*this.f);return[this.x+(x*c-y*s)*this.s,this.y+this.bobY()+(x*s+y*c)*this.s]}
  bobY(){return this.bob?Math.sin(T.sec*1.4+this.ph)*this.bob:0}
  hand(i){return this.toWorld(this.hands[i])}
  draw(ctx){if(this.vis<=0)return;const sp=this.sp;ctx.save();ctx.globalAlpha*=clamp(this.vis,0,1);ctx.translate(this.x,this.y+this.bobY());ctx.rotate(this.lean*this.f);ctx.scale(this.s*this.f,this.s);
    if(sp.seated)ctx.translate(0,100);
    if(sp.halo)halo(ctx,0,-284,sp.haloR||74,sp.halo,T.sec);
    const arms=sp.arms;arms.forEach((a,i)=>{if(a.back)armArt(ctx,sp,a.s,this.hands[i],a.bend,this.tgt[i].hand||a.hand,this.tgt[i].item!==undefined?this.tgt[i].item:a.item)});
    sprite(ctx,'body'+sp.id,0,0,1,{w:240,h:440,ox:120,oy:380},g=>bodyArt(g,sp));
    if(sp.throat!=null&&this.throat>0){ctx.save();ctx.globalAlpha*=clamp(this.throat,0,1);const b=polyPath([[-14,-249],[14,-249],[15,-230],[-15,-230]]);shape(ctx,b,C.peacock,c=>{c.fillStyle=C.turq;c.fillRect(-15,-244,30,8);Pat.dots(c,{x:-15,y:-250,w:30,h:20},7,1.8,C.cream)},{lw:1.6});ctx.restore()}
    faceArt(ctx,sp,this);
    if(this.under)this.under(ctx,this);
    arms.forEach((a,i)=>{if(!a.back)armArt(ctx,sp,a.s,this.hands[i],a.bend,this.tgt[i].hand||a.hand,this.tgt[i].item!==undefined?this.tgt[i].item:a.item)});
    if(this.over)this.over(ctx,this);
    ctx.restore()}}
const P=(x,y,o)=>Object.assign({h:[x,y]},o||{});

/* CHAR_VISHNU_MASTER: upright, symmetrical, four arms, blue skin, yellow pitambara */
const SP_VISHNU={id:'vishnu',skin:C.peacock,dhoti:C.turmeric,dhotiPat:(c,b)=>Pat.stripes(c,b,14,4,C.saffron,true),border:C.verm,scarf:C.verm,sash:C.red,crown:'mukut',gem:C.emerald,
  halo:[C.cream,C.turmeric,C.verm],haloR:80,
  arms:[{s:[-40,-222],bend:1,back:true,hand:'fist',item:'conch'},{s:[40,-222],bend:-1,back:true,hand:'fist',item:'discus'},{s:SH.L,bend:-1,hand:'fist',item:'lotusSmall'},{s:SH.R,bend:1,hand:'open'}],
  poses:{guide:[P(-96,-296),P(96,-296),P(-58,-170),P(66,-214,{hand:'open'})],
    explain:[P(-96,-296),P(96,-296),P(-58,-170),P(86,-196,{hand:'open'})],
    bless:[P(-96,-300),P(96,-300),P(-40,-176),P(52,-238,{hand:'open'})]},start:'guide'};
/* CHAR_SHIVA_MASTER: serene, matted hair, crescent moon, rudraksha, trident as a secondary prop */
const SP_SHIVA={id:'shiva',skin:C.cream,dhoti:C.ochre,dhotiPat:(c,b)=>Pat.zig(c,b,14,C.charcoal,2.4,16),border:C.leaf,top:null,scarf:C.leaf,sash:C.charcoal,crown:'jata',neck:C.ochre,
  halo:[C.indigo,C.violet,C.cream],haloR:76,throat:true,
  arms:[{s:SH.L,bend:-1,hand:'fist',item:'trident'},{s:SH.R,bend:1,hand:'open'}],
  poses:{idle:[P(-64,-150),P(60,-176,{hand:'open'})],raise:[P(-64,-150),P(70,-300,{hand:'open'})],calm:[P(-64,-150),P(46,-226,{hand:'open'})]},start:'idle'};
/* CHAR_LAKSHMI_MASTER: seated, open palms, red and pink garments */
const SP_LAKSHMI={id:'lakshmi',seated:true,skin:C.turmeric,dhoti:C.red,dhotiPat:(c,b)=>Pat.scallops(c,b,14,C.pink,2.4),border:C.gold,top:C.pink,topAcc:C.gold,scarf:C.red,sash:C.gold,crown:'lakshmi',gem:C.red,
  halo:[C.pink,C.turmeric,C.cream],haloR:80,
  arms:[{s:SH.L,bend:-1,hand:'open'},{s:SH.R,bend:1,hand:'open'}],
  poses:{idle:[P(-70,-186,{hand:'open'}),P(70,-186,{hand:'open'})],bless:[P(-64,-232,{hand:'open'}),P(64,-232,{hand:'open'})]},start:'idle'};
/* CHAR_DHANVANTARI_MASTER: two arms (one design, kept everywhere), yellow garments, turquoise-blue scheme, the amrita pot */
const SP_DHAN={id:'dhan',skin:C.turq,dhoti:C.turmeric,dhotiPat:(c,b)=>Pat.dots(c,b,12,2.6,C.saffron),border:C.red,scarf:C.red,sash:C.peacock,crown:'mukut',gem:C.red,
  halo:[C.turmeric,C.gold,C.red],haloR:84,
  arms:[{s:SH.L,bend:-1,hand:'fist'},{s:SH.R,bend:1,hand:'fist'}],
  poses:{hold:[P(-40,-178),P(40,-178)],bless:[P(-40,-178),P(70,-262,{hand:'open'})]},start:'hold'};
/* Kubera: optional small devotional figure, final celebration only */
const SP_KUBERA={id:'kubera',seated:true,build:'portly',skin:C.gold,dhoti:C.emerald,dhotiPat:(c,b)=>Pat.chevron(c,b,14,C.turmeric,2),border:C.turmeric,crown:'kubera',sash:C.verm,
  halo:[C.emerald,C.turmeric,C.cream],haloR:70,
  arms:[{s:SH.L,bend:-1,hand:'fist',item:'pouch'},{s:SH.R,bend:1,hand:'open'}],poses:{idle:[P(-56,-170),P(58,-210,{hand:'open'})]},start:'idle'};

/* GROUP_DEVAS and GROUP_ASURAS: profile faces looking toward the mountain; same pulling poses */
const GROUP_POSES={stand:[P(30,-160),P(46,-166)],reach:[P(72,-196),P(84,-188)],pull:[P(62,-176),P(76,-170)],release:[P(80,-186),P(94,-180)],
  look:[P(28,-158),P(56,-200,{hand:'open'})],cheer:[P(-34,-322,{hand:'open'}),P(86,-298,{hand:'open'})],fold:[P(14,-210,{hand:'open'}),P(24,-214,{hand:'open'})]};
function groupSpec(id,o){return Object.assign({id,profile:true,arms:[{s:[-36,-224],bend:1,back:true,hand:'fist'},{s:[40,-224],bend:1,hand:'fist'}],poses:GROUP_POSES,start:'stand'},o)}
const SP_DEVAS=[groupSpec('deva1',{skin:C.turmeric,dhoti:C.leaf,dhotiPat:(c,b)=>Pat.dots(c,b,11,2.4,C.turmeric),border:C.pink,scarf:C.pink,sash:C.verm,crown:'deva'}),
  groupSpec('deva2',{skin:C.gold,dhoti:C.pink,dhotiPat:(c,b)=>Pat.stripes(c,b,12,3,C.verm,true),border:C.leaf,scarf:C.leaf,sash:C.turmeric,crown:'deva'}),
  groupSpec('deva3',{skin:C.turmeric,dhoti:C.emerald,dhotiPat:(c,b)=>Pat.scallops(c,b,14,C.turmeric,2.2),border:C.saffron,scarf:C.saffron,sash:C.pink,crown:'deva'})];
const SP_ASURAS=[groupSpec('asura1',{build:'broad',skin:C.coral,dhoti:C.charcoal,dhotiPat:(c,b)=>Pat.stripes(c,b,12,4,C.verm,true),border:C.turmeric,scarf:C.turmeric,sash:C.verm,crown:'asura',top:C.violet,topAcc:C.turmeric}),
  groupSpec('asura2',{build:'broad',skin:C.ochre,dhoti:C.violet,dhotiPat:(c,b)=>Pat.zig(c,b,14,C.turmeric,2.4,14),border:C.coral,scarf:C.coral,sash:C.charcoal,crown:'asura'}),
  groupSpec('asura3',{build:'broad',skin:C.coral,dhoti:C.indigo,dhotiPat:(c,b)=>Pat.chevron(c,b,14,C.coral,2.4),border:C.verm,scarf:C.verm,sash:C.turmeric,crown:'asura',top:C.charcoal,topAcc:C.coral})];

/* ===== PROP_AMRITA_POT: golden vessel, decorative bands, a clearly visible opening ===== */
function potArt(g){const body=sPath([[-30,-26],[-46,-4],[-44,22],[-24,40],[24,40],[44,22],[46,-4],[30,-26]],true);
  shape(g,body,C.gold,c=>{Pat.tri(c,{x:-48,y:-10,w:96,h:12},12,C.red);c.fillStyle=C.turmeric;c.fillRect(-48,4,96,10);Pat.dots(c,{x:-48,y:4,w:96,h:10},9,2,C.red);
    Pat.scallops(c,{x:-48,y:20,w:96,h:22},12,C.red,2.2)},{lw:2.4});
  const neck=polyPath([[-22,-42],[22,-42],[30,-26],[-30,-26]]);shape(g,neck,C.gold,c=>Pat.stripes(c,{x:-30,y:-42,w:60,h:16},6,2,C.saffron,true),{lw:2});
  const rim=ellPath(0,-44,30,9);shape(g,rim,C.turmeric,null,{lw:2.2});shape(g,ellPath(0,-44,20,5),C.deep,c=>{dot(c,-6,-45,2,C.turmeric);dot(c,6,-44,2,C.turmeric);dot(c,0,-43,2,C.white)},{line:'single',lw:1.6})}
function drawPot(ctx,x,y,s,pulse,t){if(pulse>0){ctx.save();ctx.globalAlpha*=pulse;halo(ctx,x,y,70*s,[C.turmeric,C.gold,C.white],t||0);ctx.restore()}
  sprite(ctx,'pot',x,y,s,{w:110,h:110,ox:55,oy:58},potArt);
  if(pulse>0){ctx.save();ctx.globalAlpha*=pulse*.9;ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=C.white;ctx.fillRect(-46,4,92,10);Pat.dots(ctx,{x:-46,y:4,w:92,h:10},9,2.4,C.turmeric);ctx.restore()}}

/* ===== CHAR_KURMA_MASTER: broad green-and-gold patterned shell, four flippers, gentle face ===== */
function kurmaShell(g){const sh=new Path2D();sh.moveTo(-160,0);sh.bezierCurveTo(-150,-118,150,-118,160,0);sh.closePath();
  shape(g,sh,C.leaf,c=>{for(let r=0;r<4;r++){const y=-92+r*24,n=4+r*2;for(let i=0;i<n;i++){const x=-((n-1)*34)/2+i*34;const hx=polyPath([[x-15,y],[x-8,y-11],[x+8,y-11],[x+15,y],[x+8,y+11],[x-8,y+11]]);c.fillStyle=(i+r)%2?C.emerald:C.gold;c.fill(hx);sgl(c,hx,1.8);dot(c,x,y,3,C.turmeric)}}},{lw:2.6});
  const rim=new Path2D();rim.moveTo(-170,0);rim.lineTo(170,0);rim.lineTo(160,16);rim.lineTo(-160,16);rim.closePath();shape(g,rim,C.gold,c=>Pat.tri(c,{x:-170,y:2,w:340,h:12},14,C.leaf),{lw:2.2})}
function drawKurma(ctx,x,y,s,t,o){o=o||{};ctx.save();ctx.translate(x,y);ctx.scale(s,s);const pad=reduceMotion?0:Math.sin(t*1.6)*.12;
  const flip=(fx,fy,a,back)=>{ctx.save();ctx.translate(fx,fy);ctx.rotate(a);const p=sPath([[0,-8],[46,-4],[70,14],[40,18],[0,12]],true);shape(ctx,p,back?C.emerald:C.leaf,c=>Pat.dots(c,{x:0,y:-10,w:72,h:30},10,2,C.turmeric),{lw:2});ctx.restore()};
  flip(-120,8,Math.PI+.35+pad,true);flip(120,8,-.35-pad,true);
  if(!o.front){const head=sPath([[-150,-18],[-180,-36],[-202,-22],[-202,-2],[-180,10],[-150,10]],true);shape(ctx,head,C.leaf,c=>Pat.dots(c,{x:-204,y:-38,w:56,h:50},10,2,C.turmeric),{lw:2.2});
    if(o.blink>.5){ctx.beginPath();ctx.moveTo(-190,-20);ctx.quadraticCurveTo(-184,-14,-178,-20);ctx.strokeStyle=C.line;ctx.lineWidth=2.6;ctx.stroke()}
    else{shape(ctx,ellPath(-184,-20,8,7),C.white,null,{line:'single',lw:2});dot(ctx,-186,-20,3.6,C.line)}
    ctx.beginPath();ctx.arc(-194,-6,7,.1*Math.PI,.7*Math.PI);ctx.strokeStyle=C.red;ctx.lineWidth=2.8;ctx.stroke()}
  sprite(ctx,'kurma',0,0,1,{w:360,h:150,ox:180,oy:122},kurmaShell);
  /* portrait: Kurma looks out at the viewer from beneath the front of his shell */
  if(o.front){const hd=sPath(ellPts(0,30,34,28,14),true);shape(ctx,hd,C.leaf,c=>Pat.dots(c,{x:-36,y:2,w:72,h:58},10,2,C.turmeric),{lw:2.2});
    [-13,13].forEach(x=>{if(o.blink>.5){ctx.beginPath();ctx.moveTo(x-6,24);ctx.quadraticCurveTo(x,30,x+6,24);ctx.strokeStyle=C.line;ctx.lineWidth=2.6;ctx.stroke()}else{shape(ctx,ellPath(x,24,7,7),C.white,null,{line:'single',lw:2});dot(ctx,x,25,3.4,C.line)}});
    ctx.beginPath();ctx.arc(0,36,9,.15*Math.PI,.85*Math.PI);ctx.strokeStyle=C.red;ctx.lineWidth=2.8;ctx.stroke()}
  flip(-110,14,Math.PI-.3-pad);flip(110,14,.3+pad);ctx.restore()}

/* ===== PROP_MANDARA: tall, symmetrical, banded patterns; rot shifts the bands so it turns ===== */
const MANDARA_PTS=[[-.5,0],[-.47,-.12],[-.42,-.28],[-.36,-.44],[-.3,-.6],[-.22,-.76],[-.14,-.9],[-.06,-.98],[0,-1],[.06,-.98],[.14,-.9],[.22,-.76],[.3,-.6],[.36,-.44],[.42,-.28],[.47,-.12],[.5,0]];
function mandaraPath(x,y,w,h){return sPath(wob(MANDARA_PTS.map(p=>[x+p[0]*w,y+p[1]*h]),1.4,31),true)}
function drawMandara(ctx,x,y,w,h,rot,o){o=o||{};const p=mandaraPath(x,y,w,h);
  if(o.outline){ctx.save();ctx.globalAlpha*=o.outline;ctx.setLineDash([18,12]);ctx.lineDashOffset=-T.sec*20;sgl(ctx,p,7,C.turmeric);ctx.setLineDash([]);ctx.restore();if(!o.solid)return}
  ctx.fillStyle=C.ochre;ctx.fill(p);ctx.save();ctx.clip(p);const ph=((rot||0)%1+1)%1;
  const bands=[[.86,1.02,'trees'],[.7,.86,'scal'],[.56,.7,'trees'],[.44,.56,'dots'],[.3,.44,'trees'],[.18,.3,'zig'],[0,.18,'trees']];
  for(const [a,b,kind] of bands){const y0=y-h*b,y1=y-h*a,bh=y1-y0;const per=kind==='trees'?54:36;const off=-ph*per*2;
    if(kind==='trees'){ctx.fillStyle=C.turmeric;ctx.fillRect(x-w,y0,w*2,bh);for(let xx=x-w+off;xx<x+w+per;xx+=per){const t=polyPath([[xx,y1-4],[xx+per*.5,y0+4],[xx+per,y1-4]]);ctx.fillStyle=(Math.round((xx-off)/per)%2)?C.leaf:C.emerald;ctx.fill(t);sgl(ctx,t,1.8);
      line(ctx,[[xx+per*.5,y0+12],[xx+per*.5,y1-6]],C.cream,1.6);for(let k=.35;k<.9;k+=.22)line(ctx,[[xx+per*.5,y0+bh*k],[xx+per*(.5-k*.3),y0+bh*k+8]],C.cream,1.4)}}
    else if(kind==='scal'){ctx.fillStyle=C.ochre;ctx.fillRect(x-w,y0,w*2,bh);Pat.scallops(ctx,{x:x-w+off,y:y0+8,w:w*2+per,h:bh},per*.5,C.cream,2.2)}
    else if(kind==='dots'){ctx.fillStyle=C.saffron;ctx.fillRect(x-w,y0,w*2,bh);Pat.dots(ctx,{x:x-w+off,y:y0,w:w*2+per,h:bh},per*.4,3,C.cream)}
    else{ctx.fillStyle=C.ochre;ctx.fillRect(x-w,y0,w*2,bh);Pat.zig(ctx,{x:x-w+off,y:y0+4,w:w*2+per,h:bh},per*.5,C.verm,3,bh*.45)}
    line(ctx,[[x-w,y0],[x+w,y0]],C.line,2.4)}
  ctx.restore();dbl(ctx,p,3)}

/* ===== CHAR_VASUKI_MASTER: segmented serpent along a spine; friendly face, no fangs ===== */
function drawVasukiPart(ctx,pts,wd,o){if(pts.length<2)return;o=o||{};const path=new Path2D();pts.forEach((p,i)=>i?path.lineTo(p[0],p[1]):path.moveTo(p[0],p[1]));
  ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle=C.line;ctx.lineWidth=wd+8;ctx.stroke(path);ctx.strokeStyle=C.turmeric;ctx.lineWidth=wd;ctx.stroke(path);
  /* scale bands every few units: red band then black diamond, measured along the full spine so they travel with the body */
  let acc=o.d0||0;for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],seg=Math.hypot(b[0]-a[0],b[1]-a[1]);if(seg<.01)continue;const nx=-(b[1]-a[1])/seg,ny=(b[0]-a[0])/seg;
    let d=Math.ceil(acc/16)*16-acc;while(d<seg){const k=(acc+d)/16;const x=a[0]+(b[0]-a[0])*d/seg,y=a[1]+(b[1]-a[1])*d/seg;
      if(Math.round(k)%3===0){line(ctx,[[x+nx*wd*.5,y+ny*wd*.5],[x-nx*wd*.5,y-ny*wd*.5]],C.red,7)}
      else if(Math.round(k)%3===1){const dx=(b[0]-a[0])/seg,dy=(b[1]-a[1])/seg;const q=polyPath([[x+dx*6,y+dy*6],[x+nx*wd*.26,y+ny*wd*.26],[x-dx*6,y-dy*6],[x-nx*wd*.26,y-ny*wd*.26]]);ctx.fillStyle=C.charcoal;ctx.fill(q)}
      d+=16}acc+=seg}
  return acc}
function vasukiHead(ctx,x,y,ang,s,blink){ctx.save();ctx.translate(x,y);ctx.rotate(ang);ctx.scale(s,s);
  const hood=sPath([[-6,-30],[22,-34],[44,-22],[56,0],[44,22],[22,34],[-6,30],[-14,0]],true);shape(ctx,hood,C.red,c=>{Pat.dots(c,{x:-16,y:-36,w:74,h:72},11,2.6,C.turmeric);ring(c,18,0,14,C.turmeric,4)},{lw:2.4});
  const hd=sPath([[20,-16],[52,-18],[74,-8],[80,4],[70,14],[50,16],[24,14]],true);shape(ctx,hd,C.turmeric,c=>{Pat.dots(c,{x:20,y:-20,w:62,h:36},9,2,C.red)},{lw:2.2});
  if(blink>.5){ctx.beginPath();ctx.moveTo(50,-8);ctx.quadraticCurveTo(57,-3,64,-8);ctx.strokeStyle=C.line;ctx.lineWidth=2.6;ctx.stroke()}
  else{shape(ctx,ellPath(57,-6,8,6),C.white,null,{line:'single',lw:2});dot(ctx,59,-6,3.4,C.line)}
  ctx.beginPath();ctx.arc(66,6,8,.05*Math.PI,.55*Math.PI);ctx.strokeStyle=C.verm;ctx.lineWidth=2.8;ctx.stroke();
  shape(ctx,ellPath(30,-24,6,6),C.emerald,null,{line:'single',lw:1.6});ctx.restore()}
function vasukiTail(ctx,pts){if(pts.length<2)return;for(let i=1;i<pts.length;i++){const w=4+i/(pts.length-1)*24;line(ctx,[pts[i-1],pts[i]],C.line,w+8)}
  for(let i=1;i<pts.length;i++){const w=4+i/(pts.length-1)*24;line(ctx,[pts[i-1],pts[i]],i%3===0?C.red:C.turmeric,w)}}

/* ===== Halahala (FX_HALAHALA): layered abstract indigo-violet cloud puffs with spiral lines, never a creature ===== */
function halaArt(g,seed){const r=rng(seed);const puffs=[];for(let i=0;i<9;i++)puffs.push([(r()-.5)*220,(r()-.5)*90,40+r()*40]);
  [[C.indigo,1.12],[C.violet,1],[C.charcoal,.7]].forEach(([col,k],li)=>{puffs.forEach(([x,y,rr],i)=>{if(li===2&&i%2)return;const p=ellPath(x,y-li*6,rr*k,rr*k*.8);g.fillStyle=col;g.fill(p);g.strokeStyle=C.line;g.lineWidth=2;g.stroke(p)})});
  puffs.forEach(([x,y,rr],i)=>{const sp=[];for(let j=0;j<=26;j++){const a=j/26*TAU*1.5,q=rr*.5*j/26;sp.push([x+Math.cos(a)*q,y+Math.sin(a)*q])}line(g,sp,i%2?C.violet:C.cream,2.2);
    for(let k=0;k<6;k++){const a=k/6*TAU;dot(g,x+Math.cos(a)*rr*.75,y+Math.sin(a)*rr*.6,2.2,C.violet)}})}
function drawHala(ctx,x,y,s,seed,rot){ctx.save();ctx.translate(x,y);ctx.rotate(rot||0);sprite(ctx,'hala'+seed,0,0,s,{w:420,h:260,ox:210,oy:130},g=>halaArt(g,seed));ctx.restore()}
/* dark patterned cloud for Game 4 (softer: violet with cream curls) */
function darkCloudArt(g){const p=new Path2D();p.moveTo(-150,40);p.arc(-100,10,52,Math.PI*.85,Math.PI*1.7);p.arc(-20,-14,66,Math.PI*1.1,Math.PI*1.9);p.arc(78,4,58,Math.PI*1.25,Math.PI*2.05);p.lineTo(150,40);p.closePath();
  shape(g,p,C.violet,c=>{Pat.scallops(c,{x:-160,y:-80,w:320,h:130},26,C.indigo,3);for(const [x,y,r] of [[-96,12,22],[-20,-8,28],[78,10,22]]){const sp=[];for(let i=0;i<=28;i++){const a=i/28*TAU*1.5;sp.push([x+Math.cos(a)*r*i/28,y+Math.sin(a)*r*i/28])}line(c,sp,C.cream,3)}
    line(c,[[-146,36],[146,36]],C.charcoal,6)},{lw:3})}
function drawDarkCloud(ctx,x,y,s){sprite(ctx,'dcloud',x,y,s,{w:340,h:180,ox:170,oy:110},darkCloudArt)}
