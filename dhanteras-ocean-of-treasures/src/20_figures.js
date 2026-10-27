/* ===== Character bible: one parameterised figure, every design defined once and never varied =====
   Local units: feet at y=0, head centre at (0,-262), standing height about 300 plus crown. Seated figures lift the
   upper body by DY (waist at -60). Sprites are cached per character + pose + mood. */
const DYS=90;
const lowPats={
  dots:c=>(g,b)=>Pat.dots(g,b,c,12,2),flowers:c=>(g,b)=>Pat.flowers(g,b,c,26,C.ink),diamonds:c=>(g,b)=>Pat.diamonds(g,b,c,16,true),
  chevron:c=>(g,b)=>Pat.chevron(g,b,c,16,1.6),scales:c=>(g,b)=>Pat.scales(g,b,c,8,1.3),hatch:c=>(g,b)=>Pat.hatch(g,b,c,9,1.4),
  tiger:()=>(g,b)=>{g.strokeStyle=C.ink;g.lineWidth=3.2;g.beginPath();const r=rng(5);for(let y=b.y;y<b.y+b.h;y+=14)for(let x=b.x+(r()*10);x<b.x+b.w;x+=26){g.moveTo(x,y);g.quadraticCurveTo(x+6,y+5,x+3,y+11)}g.stroke()}};
const SPEC={
  vishnu:{skin:C.sblue,sex:'m',seated:true,low:C.gold,lowPat:lowPats.dots(C.verm),border:C.verm,thread:true,stole:C.verm,hair:'kirita',neck2:true},
  shiva:{skin:C.sblue,sex:'m',seated:true,low:C.saffron,lowPat:lowPats.tiger(),border:C.dgold,hair:'jata',beads:true},
  parvati:{skin:C.agold,sex:'f',seated:true,low:C.verm,lowPat:lowPats.flowers(C.gold),top:C.gold,border:C.gold,hair:'bun',look:-1},
  lakshmi:{skin:C.agold,sex:'f',seated:true,low:C.coral,lowPat:lowPats.diamonds(C.gold),top:C.verm,border:C.gold,hair:'lakshmi',neck2:true},
  dhanv:{skin:C.sblue,sex:'m',low:C.gold,lowPat:lowPats.flowers(C.verm),border:C.verm,thread:true,stole:C.turq,hair:'kirita',neck2:true},
  deva0:{skin:C.agold,sex:'m',low:C.deep,lowPat:lowPats.dots(C.cream),border:C.gold,stole:C.cream,stolePat:lowPats.dots(C.gold),hair:'mukut'},
  deva1:{skin:C.rust,sex:'m',low:C.leaf,lowPat:lowPats.chevron(C.cream),border:C.gold,stole:C.gold,stolePat:lowPats.dots(C.verm),hair:'mukut'},
  deva2:{skin:C.agold,sex:'m',low:C.cream,lowPat:lowPats.diamonds(C.sblue),border:C.gold,stole:C.sblue,stolePat:lowPats.dots(C.cream),hair:'mukut'},
  asura0:{skin:C.rust,sex:'m',low:C.maroon,lowPat:lowPats.diamonds(C.dgold),border:C.dgold,stole:C.dgold,stolePat:lowPats.hatch(C.maroon),hair:'asura',tache:true},
  asura1:{skin:C.agold,sex:'m',low:C.rust,lowPat:lowPats.scales(C.dgold),border:C.leaf,stole:C.leaf,stolePat:lowPats.dots(C.dgold),hair:'asura'},
  asura2:{skin:C.rust,sex:'m',low:C.dgold,lowPat:lowPats.chevron(C.maroon),border:C.maroon,stole:C.maroon,stolePat:lowPats.dots(C.dgold),hair:'asura',tache:true},
  mom:{skin:C.agold,sex:'f',low:C.verm,lowPat:lowPats.flowers(C.gold),top:C.gold,border:C.gold,hair:'fhair'},
  gran:{skin:C.rust,sex:'f',low:C.cream,lowPat:lowPats.dots(C.leaf),top:C.leaf,border:C.leaf,hair:'grey'},
  boy:{skin:C.rust,sex:'k',low:C.saffron,lowPat:lowPats.dots(C.verm),border:C.verm,top:C.saffron,hair:'kidm'},
  girl:{skin:C.agold,sex:'g',low:C.pink,lowPat:lowPats.flowers(C.cream),border:C.verm,top:C.pink,hair:'kidf'}};

/* ---- arms ---- */
function arm(g,S,E,H,skin,o){o=o||{};const p=new Path2D();p.moveTo(S[0],S[1]);p.lineTo(E[0],E[1]);p.lineTo(H[0],H[1]);
  g.strokeStyle=C.ink;g.lineWidth=19;g.stroke(p);g.strokeStyle=skin;g.lineWidth=13;g.stroke(p);
  const band=(A,B,t,len,col)=>{const x=lerp(A[0],B[0],t),y=lerp(A[1],B[1],t),dx=B[0]-A[0],dy=B[1]-A[1],d=Math.hypot(dx,dy)||1,nx=-dy/d*len/2,ny=dx/d*len/2;g.strokeStyle=C.ink;g.lineWidth=5.5;g.beginPath();g.moveTo(x-nx,y-ny);g.lineTo(x+nx,y+ny);g.stroke();g.strokeStyle=col;g.lineWidth=3;g.stroke()};
  band(S,E,.32,15,C.gold);band(E,H,.72,14,C.gold);band(E,H,.82,14,o.bangle||C.verm);
  shape(g,ell(H[0],H[1],9.5,9),skin,null,{lw:1.8,line:'single'});
  if(o.hand==='open'){g.strokeStyle=C.ink;g.lineWidth=1.1;g.beginPath();for(let k=-1;k<=1;k++){g.moveTo(H[0]+k*3.5,H[1]-7);g.lineTo(H[0]+k*3.5,H[1]-1)}g.stroke();dot(g,H[0],H[1]+2,1.6,C.verm)}}
/* held items, drawn at the hand */
function item(g,k,x,y,s){g.save();g.translate(x,y);g.scale(s||1,s||1);switch(k){
  case'conch':{const p=sp([[-6,14],[-16,0],[-12,-16],[0,-26],[12,-18],[16,-2],[8,12]],true);shape(g,p,C.pale,gg=>{gg.strokeStyle=C.ink;gg.lineWidth=1.2;gg.beginPath();for(let k=0;k<24;k++){const t=k/23,a=t*TAU*1.5,r=11*(1-t);k?gg.lineTo(Math.cos(a)*r,-6+Math.sin(a)*r):gg.moveTo(11,-6)}gg.stroke()},{lw:1.6});
    shape(g,pl([[-6,14],[8,12],[2,22]],true),C.coral,null,{lw:1.2,line:'single'});break}
  case'chakra':{g.translate(0,-28);for(let j=0;j<12;j++){const a=j*TAU/12;shape(g,petal(Math.cos(a)*17,Math.sin(a)*17,9,3,a),C.saffron,null,{lw:1,line:'single'})}
    shape(g,ell(0,0,17),C.gold,gg=>{gg.strokeStyle=C.ink;gg.lineWidth=1.4;gg.beginPath();for(let j=0;j<8;j++){const a=j*TAU/8;gg.moveTo(0,0);gg.lineTo(Math.cos(a)*16,Math.sin(a)*16)}gg.stroke()},{lw:1.6});shape(g,ell(0,0,6),C.verm,null,{lw:1.2,line:'single'});break}
  case'gada':shape(g,pl([[-3.5,8],[3.5,8],[3.5,92],[-3.5,92]],true),C.dgold,null,{lw:1.4,line:'single'});shape(g,ell(0,-4,15,17),C.gold,gg=>{Pat.hlines(gg,bb(-16,-22,32,36),C.dgold,7,2);Pat.dots(gg,bb(-16,-22,32,36),C.verm,8,1.4)},{lw:1.8});
    shape(g,ell(0,-24,5),C.gold,null,{lw:1.2,line:'single'});break;
  case'lotus':lotus(g,0,-4,26,{col:C.pink,col2:C.coral});break;
  case'leech':{const p=sp([[-4,6],[-12,-6],[-6,-20],[6,-28],[12,-22],[4,-14],[0,-2],[6,8]],true);shape(g,p,C.teal,gg=>Pat.hlines(gg,bb(-14,-30,28,40),C.cream,5,1),{lw:1.4});break}
  case'flower':flowerTop(g,0,-6,10,C.pink,C.gold,6);break;
  case'diya':diya(g,0,0,.62,0,true,0);break;
  case'bowl':g.translate(0,-2);drawIcon(g,'bowl',.42);break;
  case'pot':g.translate(0,-8);drawIcon(g,'pot',.4);break;
  case'garland':break}
  g.restore()}

/* ---- face: almond eyes, arched brows, nose line; mood changes brows and mouth only ---- */
function face(g,sp_,mood,dy){const hy=-262+dy,look=(sp_.look||0)*2.6;
  const eyes=[-1,1];eyes.forEach(s=>{const ex=s*11,ey=hy-2;const p=new Path2D();p.moveTo(ex-10,ey);p.quadraticCurveTo(ex,ey-7.5,ex+10,ey);p.quadraticCurveTo(ex,ey+5.5,ex-10,ey);p.closePath();
    shape(g,p,C.pale,null,{lw:1.6,line:'single'});dot(g,ex+look,ey-.5,3.4,C.ink);dot(g,ex+look+1,ey-1.5,1,C.pale);
    g.strokeStyle=C.ink;g.lineWidth=1.2;g.beginPath();g.moveTo(ex+s*10,ey);g.lineTo(ex+s*13,ey-2);g.stroke();
    let bi=-11,bo=-10,bc=-15;if(mood==='worried'||mood==='concern'){bi=-15;bo=-9;bc=-14}else if(mood==='curious'){bi=s<0?-14:-11;bo=s<0?-12:-11;bc=s<0?-17:-15}else if(mood==='determined'){bi=-9;bo=-12;bc=-13}else if(mood==='wonder'){bi=-14;bo=-13;bc=-18}else if(mood==='compassion'){bi=-13;bo=-10;bc=-15}
    g.lineWidth=2.2;g.beginPath();g.moveTo(ex-s*9,ey+bi);g.quadraticCurveTo(ex,ey+bc,ex+s*10,ey+bo);g.stroke()});
  g.strokeStyle=C.ink;g.lineWidth=1.6;g.beginPath();g.moveTo(-1,hy-8);g.quadraticCurveTo(2,hy+5,3,hy+9);g.quadraticCurveTo(0,hy+12,-3,hy+10);g.stroke();
  const my=hy+18;g.strokeStyle=C.verm;g.lineWidth=3;g.beginPath();
  if(mood==='wonder'){g.fillStyle=C.verm;g.ellipse(0,my,3.6,4.4,0,0,TAU);g.fill()}
  else if(mood==='worried'||mood==='concern'){g.moveTo(-6,my+1.5);g.quadraticCurveTo(0,my-1.5,6,my+1.5);g.stroke()}
  else if(mood==='curious'||mood==='determined'){g.moveTo(-5,my);g.lineTo(5,my);g.stroke()}
  else{const k=mood==='happy'||mood==='hope'?4.5:3;g.moveTo(-7,my-1);g.quadraticCurveTo(0,my+k,7,my-1);g.stroke()}
  if(sp_.tache){g.strokeStyle=C.ink;g.lineWidth=2.6;g.beginPath();g.moveTo(-1,my-5);g.quadraticCurveTo(-8,my-7,-13,my-2);g.moveTo(1,my-5);g.quadraticCurveTo(8,my-7,13,my-2);g.stroke()}
  if(sp_.hair==='jata'){g.strokeStyle=C.pale;g.lineWidth=2;g.beginPath();for(let k=0;k<3;k++){g.moveTo(-14,hy-22+k*3.5);g.lineTo(14,hy-22+k*3.5)}g.stroke();shape(g,ell(0,hy-19,1.8,4.5),C.verm,null,{lw:.8,line:'single'})}
  else if(sp_.sex==='f'||sp_.sex==='g'||sp_.hair==='kirita'||sp_.hair==='lakshmi')dot(g,0,hy-15,2.6,C.verm);
  else{g.strokeStyle=C.verm;g.lineWidth=2.4;g.beginPath();g.moveTo(0,hy-21);g.lineTo(0,hy-13);g.stroke()}}

/* ---- hair and crowns ---- */
function hairCap(g,hy,col){shape(g,sp([[-25,hy+4],[-27,hy-20],[-15,hy-31],[15,hy-31],[27,hy-20],[25,hy+4],[18,hy-14],[0,hy-20],[-18,hy-14]],true),col||C.ink,gg=>{gg.strokeStyle=C.grey;gg.lineWidth=1;gg.beginPath();for(let k=-3;k<=3;k++){gg.moveTo(k*6,hy-28);gg.quadraticCurveTo(k*8,hy-18,k*9.5,hy-8)}gg.stroke()},{lw:1.4,line:'single'})}
function crown(g,kind,hy,sc){sc=sc||1;g.save();g.translate(0,hy-28);g.scale(sc,sc);
  if(kind==='kirita'){shape(g,pl([[-24,0],[-18,-54],[-8,-74],[0,-84],[8,-74],[18,-54],[24,0]],true),C.gold,gg=>{Pat.tri(gg,bb(-26,-14,52,12),C.verm,8);Pat.diamonds(gg,bb(-26,-56,52,40),C.verm,13,true);Pat.dots(gg,bb(-26,-86,52,30),C.dgold,7,1.4)},{lw:1.8});
    [-1,1].forEach(s=>shape(g,petal(s*22,-6,26,8,-Math.PI/2+s*.9),C.gold,gg=>Pat.dots(gg,bb(-60,-40,120,40),C.verm,6,1.2),{lw:1.4}));
    shape(g,ell(0,-88,6,7),C.verm,null,{lw:1.4,line:'single'});shape(g,rrect(-27,-6,54,10,4),C.gold,gg=>Pat.dots(gg,bb(-27,-6,54,10),C.verm,6,1.6),{lw:1.6})}
  else if(kind==='mukut'){[[0,40,11],[-15,30,9],[15,30,9]].forEach(([x,l,w])=>shape(g,petal(x,-2,l,w,-Math.PI/2+x*.022),C.gold,gg=>Pat.dots(gg,bb(-30,-44,60,44),C.verm,7,1.4),{lw:1.5}));
    shape(g,rrect(-26,-6,52,10,4),C.gold,gg=>Pat.tri(gg,bb(-26,-6,52,10),C.verm,7),{lw:1.6});shape(g,ell(0,-12,4),C.verm,null,{lw:1,line:'single'})}
  else if(kind==='asura'){/* a wrapped turban crown with a jewelled plume: distinct from the devas' three-point crown, never horn-like */
    shape(g,petal(4,-34,40,9,-Math.PI/2+.42),C.saffron,gg=>Pat.hlines(gg,bb(-10,-80,60,50),C.dgold,5,1.2),{lw:1.4});
    shape(g,sp([[-27,0],[-31,-18],[-24,-34],[-8,-40],[10,-40],[25,-34],[31,-18],[27,0]],true),C.dgold,gg=>{gg.strokeStyle=C.maroon;gg.lineWidth=3;gg.beginPath();for(let k=0;k<4;k++){gg.moveTo(-32,-6-k*9);gg.quadraticCurveTo(0,-16-k*9,32,-2-k*9)}gg.stroke();Pat.dots(gg,bb(-32,-42,64,42),C.cream,9,1.3)},{lw:1.7});
    shape(g,rrect(-27,-6,54,10,3),C.maroon,gg=>Pat.dots(gg,bb(-27,-6,54,10),C.gold,6,1.4),{lw:1.6});shape(g,ell(4,-30,6,7),C.maroon,gg=>dot(gg,4,-30,2.4,C.gold),{lw:1.3,line:'single'})}
  g.restore()}
function hairTop(g,sp_,dy){const hy=-262+dy,h=sp_.hair;
  if(h==='kirita'||h==='mukut'||h==='asura'){hairCap(g,hy);crown(g,h,hy)}
  else if(h==='lakshmi'){hairCap(g,hy);crown(g,'kirita',hy+2,.82)}
  else if(h==='jata'){hairCap(g,hy);
    shape(g,sp([[-22,hy-26],[-30,hy-64],[-20,hy-98],[0,hy-110],[20,hy-98],[30,hy-64],[22,hy-26]],true),C.ink,gg=>{gg.strokeStyle=C.grey;gg.lineWidth=1.4;gg.beginPath();for(let k=-3;k<=3;k++){gg.moveTo(k*7,hy-28);for(let j=1;j<=6;j++)gg.lineTo(k*7+(j%2?3:-3),hy-28-j*13)}gg.stroke()},{lw:1.6,line:'single'});
    g.fillStyle=C.rust;g.beginPath();for(let k=-3;k<=3;k++){g.moveTo(k*8+3.5,hy-36);g.arc(k*8,hy-36,3.5,0,TAU)}g.fill();
    const m=new Path2D();m.arc(-22,hy-72,15,Math.PI*.5,Math.PI*1.5);m.arc(-17,hy-72,11,Math.PI*1.5,Math.PI*.5,true);m.closePath();shape(g,m,C.pale,null,{lw:1.4,line:'single'});
    const gp=[[4,hy-106],[14,hy-128],[34,hy-142],[56,hy-140],[70,hy-126]];g.strokeStyle=C.ink;g.lineWidth=11;g.stroke(sp(gp));g.strokeStyle=C.turq;g.lineWidth=7;g.stroke(sp(gp));g.strokeStyle=C.pale;g.lineWidth=2;g.stroke(sp(gp));
    [[74,hy-118],[78,hy-110],[70,hy-112]].forEach(([a,b])=>dot(g,a,b,2.2,C.turq))}
  else if(h==='bun'){hairCap(g,hy);shape(g,ell(0,hy-38,17,13),C.ink,gg=>Pat.dots(gg,bb(-18,-52+hy,36,28),C.cream,7,1.4),{lw:1.4,line:'single'});
    shape(g,rrect(-25,hy-31,50,8,3),C.gold,gg=>Pat.dots(gg,bb(-25,hy-31,50,8),C.verm,6,1.4),{lw:1.3});shape(g,petal(0,hy-29,16,6,-Math.PI/2),C.gold,null,{lw:1.2})}
  else if(h==='fhair'||h==='grey'){const col=h==='grey'?C.grey:C.ink;hairCap(g,hy,col);shape(g,ell(18,hy-28,14,12),col,null,{lw:1.4,line:'single'});g.fillStyle=C.cream;g.beginPath();for(let k=0;k<6;k++){const a=k*TAU/6;g.moveTo(18+Math.cos(a)*15+2,hy-28+Math.sin(a)*13);g.arc(18+Math.cos(a)*15,hy-28+Math.sin(a)*13,2,0,TAU)}g.fill();
    if(h==='fhair'){g.strokeStyle=C.verm;g.lineWidth=2;g.beginPath();g.moveTo(0,hy-30);g.lineTo(0,hy-21);g.stroke()}
    else{g.strokeStyle=C.ink;g.lineWidth=1.6;ring(g,-11,hy-2,10,C.ink,1.6,8);ring(g,11,hy-2,10,C.ink,1.6,8);g.beginPath();g.moveTo(-1,hy-3);g.lineTo(1,hy-3);g.stroke()}}
  else if(h==='kidm'){hairCap(g,hy);shape(g,sp([[-25,hy-12],[-20,hy-30],[0,hy-34],[20,hy-30],[25,hy-12],[10,hy-20],[-6,hy-18]],true),C.ink,null,{lw:1.2,line:'single'})}
  else if(h==='kidf'){hairCap(g,hy);[-1,1].forEach(s=>{shape(g,sp([[s*24,hy-10],[s*34,hy+10],[s*32,hy+36],[s*26,hy+40],[s*26,hy+12]],true),C.ink,gg=>Pat.chevron(gg,bb(-40,hy-10,80,52),C.grey,7,1),{lw:1.2,line:'single'});shape(g,petal(s*30,hy+38,12,5,Math.PI/2+s*.5),C.pink,null,{lw:1,line:'single'})})}}

/* ---- standard poses for devas, asuras and the family (hand targets, item, extra) ---- */
const POSES={
  stand:[{s:[-42,-214],e:[-50,-166],h:[-46,-124]},{s:[42,-214],e:[50,-166],h:[46,-124]}],
  fold:[{s:[-42,-214],e:[-46,-166],h:[-7,-186]},{s:[42,-214],e:[46,-166],h:[7,-186]}],
  pull:[{s:[-42,-214],e:[-8,-176],h:[50,-182]},{s:[42,-214],e:[72,-196],h:[92,-184]}],
  pause:[{s:[-42,-214],e:[-54,-170],h:[-26,-160],hand:'open'},{s:[42,-214],e:[56,-170],h:[30,-160],hand:'open'}],
  loosen:[{s:[-42,-214],e:[-14,-170],h:[40,-150]},{s:[42,-214],e:[62,-172],h:[74,-146]}],
  back:[{s:[-42,-214],e:[-10,-200],h:[46,-236],hand:'open'},{s:[42,-214],e:[70,-206],h:[84,-238],hand:'open'}],
  wonder:[{s:[-42,-214],e:[-74,-246],h:[-70,-292],hand:'open'},{s:[42,-214],e:[74,-246],h:[70,-292],hand:'open'}],
  lamp:[{s:[-42,-214],e:[-44,-168],h:[-12,-156]},{s:[42,-214],e:[50,-168],h:[24,-152],item:'diya'}],
  flower:[{s:[-42,-214],e:[-82,-198],h:[-120,-204],item:'flower'},{s:[42,-214],e:[54,-170],h:[26,-152],item:'bowl'}],
  garland:[{s:[-42,-214],e:[-66,-256],h:[-56,-300]},{s:[42,-214],e:[66,-256],h:[56,-300]}],
  hold:[{s:[-42,-214],e:[-44,-168],h:[-14,-156]},{s:[42,-214],e:[44,-168],h:[14,-156],item:'bowl'}],
  wave:[{s:[-42,-214],e:[-76,-250],h:[-72,-302],hand:'open'},{s:[42,-214],e:[50,-166],h:[46,-124]}],
  water:[{s:[-42,-214],e:[-46,-166],h:[-40,-124]},{s:[42,-214],e:[70,-184],h:[86,-170],item:'pot'}]};
/* divine figures: four arms with fixed attributes (seated poses add DY at draw time) */
const GODARMS={
  vishnu:[{s:[-38,-212],e:[-86,-238],h:[-96,-288],item:'chakra',back:true},{s:[38,-212],e:[86,-238],h:[96,-288],item:'conch',back:true},
    {s:[-44,-212],e:[-76,-172],h:[-108,-182],item:'lotus',hand:'open'},{s:[44,-212],e:[72,-172],h:[96,-158],item:'gada'}],
  shiva:[{s:[-44,-212],e:[-82,-168],h:[-90,-216],hand:'open'},{s:[44,-212],e:[70,-166],h:[84,-128]}],
  parvati:[{s:[-42,-212],e:[-58,-170],h:[-30,-196],hand:'open'},{s:[42,-212],e:[58,-170],h:[44,-146],item:'lotus'}],
  lakshmi:[{s:[-38,-212],e:[-84,-236],h:[-94,-282],item:'lotus',back:true},{s:[38,-212],e:[84,-236],h:[94,-282],item:'lotus',back:true},
    {s:[-44,-212],e:[-74,-172],h:[-72,-212],hand:'open'},{s:[44,-212],e:[70,-170],h:[86,-144],hand:'open'}],
  dhanv:[{s:[-38,-212],e:[-88,-240],h:[-96,-292],item:'chakra',back:true},{s:[38,-212],e:[88,-240],h:[96,-292],item:'conch',back:true},
    {s:[-44,-210],e:[-70,-162],h:[-78,-118],item:'leech'},{s:[44,-210],e:[64,-168],h:[40,-142]}]};

/* ---- the figure ---- */
function drawPerson(g,key,pose,mood){const sp_=SPEC[key],sk=sp_.skin,dy=sp_.seated?DYS:0,fem=sp_.sex==='f'||sp_.sex==='g',kid=sp_.sex==='k'||sp_.sex==='g';
  const arms=(GODARMS[key]||POSES[pose]||POSES.stand).map(a=>({...a,s:[a.s[0],a.s[1]+dy],e:[a.e[0],a.e[1]+dy],h:[a.h[0],a.h[1]+dy]}));
  const hy=-262+dy;
  /* long hair and locks behind the body */
  if(sp_.hair==='jata'){g.strokeStyle=C.ink;g.lineWidth=7;[-1,1].forEach(s=>{for(let k=0;k<3;k++){g.beginPath();g.moveTo(s*(22+k*3),hy-6);g.bezierCurveTo(s*(40+k*6),hy+20,s*(36+k*8),hy+52,s*(54+k*7),hy+78);g.stroke()}})}
  if(sp_.hair==='lakshmi'||sp_.hair==='bun')shape(g,sp([[-26,hy],[-34,hy+50],[-30,hy+86],[30,hy+86],[34,hy+50],[26,hy]],true),C.ink,null,{lw:1.4,line:'single'});
  arms.filter(a=>a.back).forEach(a=>{arm(g,a.s,a.e,a.h,sk,a);if(a.item)item(g,a.item,a.h[0],a.h[1])});
  /* lower body */
  if(sp_.seated){const lap=sp([[-34,-62],[-72,-50],[-106,-18],[-98,4],[-40,8],[0,2],[40,8],[98,4],[106,-18],[72,-50],[34,-62]],true);
    shape(g,lap,sp_.low,gg=>{sp_.lowPat(gg,bb(-110,-66,220,76));Pat.tri(gg,bb(-110,-6,220,12),sp_.border,12)},{lw:2.4});
    [-1,1].forEach(s=>{shape(g,ell(s*36,-30,13,7,s*.35),sk,null,{lw:1.6,line:'single'});dot(g,s*40,-31,2.2,C.verm)})}
  else{[-1,1].forEach(s=>{shape(g,ell(s*18,-6,15,7),sk,null,{lw:1.8,line:'single'});g.fillStyle=C.gold;for(let k=-2;k<=2;k++)dot(g,s*18+k*4,-12,1.6,C.gold)});
    const wb=fem?56:46;const low=sp([[-32,-152],[-38,-100],[-wb,-14],[-22,-10],[0,-14],[22,-10],[wb,-14],[38,-100],[32,-152]],true);
    shape(g,low,sp_.low,gg=>{sp_.lowPat(gg,bb(-60,-156,120,146));if(!fem){gg.fillStyle=sp_.border;gg.fillRect(-7,-150,14,136);Pat.dots(gg,bb(-7,-150,14,136),C.cream,9,1.6)}
      else{gg.strokeStyle=C.ink;gg.lineWidth=1.2;gg.beginPath();for(let k=-2;k<=2;k++){gg.moveTo(k*8,-120);gg.lineTo(k*12,-16)}gg.stroke()}
      gg.fillStyle=sp_.border;gg.fillRect(-60,-30,120,18);Pat.tri(gg,bb(-60,-30,120,8),C.cream,9,true)},{lw:2.4})}
  /* torso and garments */
  const T0=(x,y)=>[x,y+dy];const tor=sp([T0(-44,-222),T0(-48,-200),T0(-38,-172),T0(-32,-150),T0(32,-150),T0(38,-172),T0(48,-200),T0(44,-222),T0(0,-228)],true);
  if(fem){shape(g,tor,sk,gg=>{gg.fillStyle=sp_.top;gg.fillRect(-50,-232+dy,100,(kid?70:46));Pat.dots(gg,bb(-50,-232+dy,100,46),C.cream,9,1.4)},{lw:2.2});
    if(!kid){const pal=sp([T0(-44,-224),T0(-20,-226),T0(40,-166),T0(36,-148),T0(16,-148),T0(-46,-200)],true);shape(g,pal,sp_.low,gg=>{sp_.lowPat(gg,bb(-50,-230+dy,100,84));gg.strokeStyle=sp_.border;gg.lineWidth=6;gg.beginPath();gg.moveTo(-20,-226+dy);gg.lineTo(40,-166+dy);gg.stroke()},{lw:1.8})}}
  else{shape(g,tor,kid?sp_.top:sk,gg=>{if(kid){Pat.dots(gg,bb(-50,-232+dy,100,84),C.verm,10,1.6);gg.fillStyle=C.gold;gg.fillRect(-4,-226+dy,8,30)}
      else{gg.strokeStyle=C.ink;gg.lineWidth=1.3;gg.beginPath();gg.arc(-15,-196+dy,10,.2,Math.PI-.2);gg.moveTo(25,-196+dy);gg.arc(15,-196+dy,10,.2,Math.PI-.2);gg.stroke();dot(gg,0,-160+dy,1.8,C.ink)}},{lw:2.2});
    if(sp_.thread){g.strokeStyle=C.cream;g.lineWidth=2.4;g.beginPath();g.moveTo(-34,-220+dy);g.quadraticCurveTo(-4,-186+dy,30,-152+dy);g.stroke()}
    if(sp_.stole&&!kid){if(sp_.hair==='kirita'){[-1,1].forEach(s=>shape(g,sp([[s*44,-214+dy],[s*62,-196+dy],[s*70,-140+dy],[s*80,-110+dy],[s*58,-128+dy],[s*50,-176+dy]],true),sp_.stole,gg=>Pat.dots(gg,bb(-90,-220+dy,180,120),C.gold,8,1.5),{lw:1.6}))}
      else shape(g,sp([T0(-46,-222),T0(-26,-228),T0(38,-158),T0(30,-146),T0(-50,-200)],true),sp_.stole,gg=>sp_.stolePat(gg,bb(-56,-232+dy,112,92)),{lw:1.8})}
    shape(g,pl([T0(-34,-156),T0(34,-156),T0(34,-148),T0(-34,-148)],true),sp_.border,gg=>Pat.dots(gg,bb(-34,-156+dy,68,8),C.cream,6,1.4),{lw:1.4,line:'single'})}
  /* neck, ornaments, head */
  shape(g,pl([T0(-9,-240),T0(9,-240),T0(9,-218),T0(-9,-218)],true),sk,null,{lw:1.6,line:'single'});
  if(sp_.beads){g.fillStyle=C.rust;g.strokeStyle=C.ink;g.lineWidth=1;for(let r=0;r<2;r++){const R=26+r*12;for(let k=0;k<=12;k++){const a=Math.PI*(.12+k*.76/12);const x=Math.cos(a)*R,y=-224+dy+Math.sin(a)*R*.9;g.beginPath();g.arc(x,y,3.6,0,TAU);g.fill();g.stroke()}}}
  else{g.strokeStyle=C.ink;g.lineWidth=5.5;g.beginPath();g.arc(0,-224+dy,20,.18*Math.PI,.82*Math.PI);g.stroke();g.strokeStyle=C.gold;g.lineWidth=3.2;g.stroke();
    for(let k=0;k<=6;k++){const a=Math.PI*(.2+k*.1);dot(g,Math.cos(a)*20,-224+dy+Math.sin(a)*20+4,2.4,k===3?C.verm:C.gold)}
    if(sp_.neck2){g.strokeStyle=C.ink;g.lineWidth=5;g.beginPath();g.arc(0,-232+dy,40,.25*Math.PI,.75*Math.PI);g.stroke();g.strokeStyle=C.gold;g.lineWidth=3;g.stroke();shape(g,ell(0,-232+dy+40,6,7),C.verm,null,{lw:1.2,line:'single'})}}
  [-1,1].forEach(s=>{shape(g,ell(s*24,hy,5,8),sk,null,{lw:1.4,line:'single'});shape(g,ell(s*25,hy+14,4.5),C.gold,null,{lw:1.2,line:'single'})});
  shape(g,ell(0,hy,24,29),sk,null,{lw:2.2});
  face(g,sp_,mood,dy);hairTop(g,sp_,dy);
  /* Dhanvantari's vessel sits in front of the chest, under the supporting hand */
  if(key==='dhanv')kalasha(g,0,-112,.72,0,0);
  arms.filter(a=>!a.back).forEach(a=>{arm(g,a.s,a.e,a.h,sk,a);if(a.item)item(g,a.item,a.h[0],a.h[1]+(a.item==='gada'?0:0))});
  if(!GODARMS[key]&&pose==='fold'){shape(g,petal(0,-158,42,9,-Math.PI/2),sk,gg=>{gg.strokeStyle=C.ink;gg.lineWidth=1;gg.beginPath();gg.moveTo(0,-162);gg.lineTo(0,-196);gg.stroke()},{lw:1.6,line:'single'})}
  if(pose==='garland')garland(g,-56,-302,56,-302,22,.7)}
/* draw a cached figure: feet (or seat) at (x,y), scale s, flip for mirrored groups */
function person(g,key,pose,mood,x,y,s,flip,rot){mood=mood||'serene';const k=key+'|'+pose+'|'+mood+'|'+(flip?1:0);
  if(rot){g.save();g.translate(x,y);g.rotate(rot);x=0;y=0}
  Spr.draw(g,k,x,y,380,500,190,450,s,q=>{if(flip)q.scale(-1,1);drawPerson(q,key,pose,mood)});
  if(rot)g.restore()}
/* positions of features in world coordinates (for glows and hotspots) */
function headPos(key,x,y,s){const dy=SPEC[key].seated?DYS:0;return[x,y+(-262+dy)*s]}
function throatPos(x,y,s){return[x,y+(-232+DYS)*s]}

/* ===== Shesha (Vishnu's serpent couch) ===== */
function shesha(g,x,y,s){g.save();g.translate(x,y);g.scale(s,s);
  const hoodC=[0,-302];g.strokeStyle=C.ink;g.lineWidth=40;g.beginPath();g.moveTo(70,-60);g.bezierCurveTo(130,-140,100,-250,20,-290);g.stroke();g.strokeStyle=C.teal;g.lineWidth=32;g.stroke();g.strokeStyle=C.cream;g.lineWidth=10;g.stroke();
  [-1.05,-.55,0,.55,1.05].forEach((k,i)=>{const a=-Math.PI/2+k*1.1;const bx=hoodC[0]+Math.cos(a)*30,by=hoodC[1]+Math.sin(a)*30;
    shape(g,petal(bx,by,88,30,a),C.teal,gg=>{Pat.scales(gg,bb(-160,-460,320,260),C.cream,7,1.2)},{lw:2.2});
    const ex=bx+Math.cos(a)*62,ey=by+Math.sin(a)*62;shape(g,ell(ex,ey,13,9,a),C.gold,null,{lw:1.2,line:'single'});
    const nx=-Math.sin(a),ny=Math.cos(a);[-1,1].forEach(q=>{dot(g,ex+Math.cos(a)*14+nx*q*7,ey+Math.sin(a)*14+ny*q*7,2.4,C.ink)});void i});
  [[0,-14,160,36],[0,-52,140,32],[0,-88,118,28]].forEach(([a,b,rx,ry])=>{const p=ell(a,b,rx,ry);shape(g,p,C.teal,gg=>{Pat.scales(gg,bb(-rx,b-ry,rx*2,ry*2),C.pale,8,1.2);gg.strokeStyle=C.cream;gg.lineWidth=9;gg.beginPath();gg.ellipse(a,b+4,rx-6,ry-6,0,.1*Math.PI,.9*Math.PI);gg.stroke();
      Pat.dots(gg,bb(-rx,b+ry-12,rx*2,10),C.gold,10,1.8)},{lw:2.2})});
  g.restore()}
/* ===== Kurma (Vishnu's tortoise form) ===== */
function kurma(g,x,y,s,t){g.save();g.translate(x,y+Math.sin((t||0)*1.4)*3);g.scale(s,s);
  [[-160,22,-.35],[150,24,.35]].forEach(([a,b,r])=>shape(g,ell(a,b,52,18,r),C.leaf,gg=>Pat.dots(gg,bb(a-56,b-20,112,40),C.cream,9,1.6),{lw:2}));
  shape(g,pl([[218,0],[250,14],[214,16]],true),C.leaf,null,{lw:1.6});
  g.strokeStyle=C.ink;g.lineWidth=36;g.beginPath();g.moveTo(-196,0);g.quadraticCurveTo(-232,-6,-246,-24);g.stroke();g.strokeStyle=C.leaf;g.lineWidth=28;g.stroke();
  shape(g,ell(-262,-30,34,25,-.15),C.leaf,gg=>Pat.dots(gg,bb(-300,-60,80,60),C.cream,9,1.6),{lw:2});
  const ep=new Path2D();ep.moveTo(-282,-38);ep.quadraticCurveTo(-274,-46,-266,-38);ep.quadraticCurveTo(-274,-32,-282,-38);shape(g,ep,C.pale,gg=>dot(gg,-275,-38,2.6,C.ink),{lw:1.2,line:'single'});
  g.strokeStyle=C.ink;g.lineWidth=2;g.beginPath();g.moveTo(-292,-20);g.quadraticCurveTo(-284,-14,-276,-18);g.stroke();
  const dome=new Path2D();dome.moveTo(-224,6);dome.ellipse(0,6,224,96,0,Math.PI,TAU);dome.closePath();
  shape(g,dome,C.teal,gg=>{Pat.hex(gg,bb(-226,-96,452,104),C.agold,22,3);Pat.dots(gg,bb(-226,-96,452,104),C.cream,22,2)},{lw:2.6});
  shape(g,sp([[-230,6],[-150,-8],[0,-12],[150,-8],[230,6],[150,20],[0,24],[-150,20]],true),C.agold,gg=>Pat.tri(gg,bb(-232,-12,464,36),C.dgold,14),{lw:2});
  g.restore()}
/* ===== Mount Mandara (ENV-03): same silhouette and bands everywhere; rot turns the motifs round the mountain ===== */
const MANDARA_PTS=[[-150,0],[-130,-120],[-112,-250],[-88,-380],[-54,-470],[0,-520],[54,-470],[88,-380],[112,-250],[130,-120],[150,0]];
function mandaraHW(y){const P=MANDARA_PTS;for(let i=0;i<5;i++){const a=P[i],b=P[i+1];if(y<=a[1]&&y>=b[1]){const k=(y-a[1])/(b[1]-a[1]);return-lerp(a[0],b[0],k)}}return 0}
function mandara(g,x,y,s,rot){g.save();g.translate(x,y);g.scale(s,s);const sil=sp(MANDARA_PTS.concat([[0,6]]),true);
  const bands=[[0,-86,C.leaf,'leaf'],[-86,-172,C.agold,'diamond'],[-172,-258,C.teal,'flower'],[-258,-344,C.gold,'lines'],[-344,-430,C.leaf,'tri'],[-430,-520,C.rust,'dot']];
  g.fillStyle=C.leaf;g.fill(sil);g.save();g.clip(sil);
  bands.forEach(([y0,y1,col,m])=>{g.fillStyle=col;g.fillRect(-160,y1,320,y0-y1);const yc=(y0+y1)/2,R=mandaraHW(yc)*.95,N=14;
    for(let j=0;j<N;j++){const th=j*TAU/N+(rot||0),c=Math.cos(th);if(c<.08)continue;const mx=R*Math.sin(th);g.save();g.translate(mx,yc);g.scale(c,1);
      if(m==='leaf'){shape(g,petal(0,24,46,11,-Math.PI/2),C.agold,null,{lw:1.4,line:'single'})}
      else if(m==='diamond'){shape(g,pl([[0,-28],[13,0],[0,28],[-13,0]],true),C.verm,gg=>dot(gg,0,0,3,C.cream),{lw:1.4,line:'single'})}
      else if(m==='flower')flowerTop(g,0,0,15,C.pink,C.gold,6);
      else if(m==='lines'){g.strokeStyle=C.ink;g.lineWidth=2;g.beginPath();for(let k=-1;k<=1;k++){g.moveTo(k*6,-30);g.lineTo(k*6,30)}g.stroke()}
      else if(m==='tri')shape(g,pl([[-14,26],[0,-26],[14,26]],true),C.cream,null,{lw:1.4,line:'single'});
      else dot(g,0,0,6,C.gold);
      g.restore()}
    g.strokeStyle=C.ink;g.lineWidth=4.4;g.beginPath();g.moveTo(-160,y1);g.lineTo(160,y1);g.stroke();g.strokeStyle=C.cream;g.lineWidth=1.8;g.stroke()});
  g.restore();outline(g,sil,2.8);lotus(g,0,-512,34,{col:C.pink,col2:C.coral});g.restore()}
/* ===== Vasuki (ENV-04): continuous patterned serpent; phase slides the pattern along the body as the rope moves ===== */
function serpentBody(g,path,w,phase){g.save();g.lineCap='round';g.strokeStyle=C.ink;g.lineWidth=w+11;g.stroke(path);g.strokeStyle=C.cream;g.lineWidth=w+5;g.stroke(path);g.strokeStyle=C.ink;g.lineWidth=w+1.5;g.stroke(path);
  g.strokeStyle=C.teal;g.lineWidth=w;g.stroke(path);g.lineCap='butt';g.setLineDash([w*.7,w*1.3]);g.lineDashOffset=-phase;g.strokeStyle=C.verm;g.lineWidth=w;g.stroke(path);
  g.setLineDash([w*.25,w*1.75]);g.lineDashOffset=-phase-w*.85;g.strokeStyle=C.gold;g.stroke(path);g.lineCap='round';g.setLineDash([.1,w*.5]);g.lineDashOffset=-phase;g.strokeStyle=C.cream;g.lineWidth=w*.22;g.stroke(path);g.setLineDash([]);g.restore()}
function serpentHead(g,x,y,ang,s,mood){g.save();g.translate(x,y);g.rotate(ang);g.scale(s,s);
  shape(g,sp([[-10,-18],[22,-40],[58,-36],[72,-12],[72,12],[58,36],[22,40],[-10,18]],true),C.teal,gg=>{Pat.scales(gg,bb(-12,-42,90,84),C.cream,7,1.2)},{lw:2.2});
  [[30,-14],[30,14]].forEach(([a,b])=>shape(g,ell(a,b,9,7),C.gold,gg=>dot(gg,a,b,3,C.ink),{lw:1.2,line:'single'}));
  shape(g,sp([[56,-14],[90,-12],[100,0],[90,12],[56,14]],true),C.teal,null,{lw:2});
  [-1,1].forEach(q=>{const p=new Path2D();p.moveTo(76,q*8-3);p.quadraticCurveTo(82,q*8-8,88,q*8-3);p.quadraticCurveTo(82,q*8+2,76,q*8-3);shape(g,p,C.pale,gg=>dot(gg,83,q*8-3,2,C.ink),{lw:1,line:'single'})});
  g.strokeStyle=C.ink;g.lineWidth=1.6;g.beginPath();g.moveTo(96,-4);g.quadraticCurveTo(100,0,96,4);g.stroke();void mood;g.restore()}
function serpentTail(g,x,y,ang,w){shape(g,petal(x,y,w*2.2,w*.5,ang),C.teal,gg=>{},{lw:1.6})}

/* ===== The treasures ===== */
function airavata(g,x,y,s){g.save();g.translate(x,y);g.scale(s,s);
  [[-70,-62],[-36,-60],[34,-62],[64,-64]].forEach(([a,b],i)=>shape(g,rrect(a-14,b,28,62,8),i%2?C.pale:C.cream,gg=>dot(gg,a,-4,3,C.agold),{lw:1.8}));
  shape(g,sp([[-96,-70],[-86,-136],[-10,-156],[64,-140],[96,-96],[84,-56],[-84,-52]],true),C.pale,gg=>Pat.dots(gg,bb(-100,-160,200,110),C.grey,14,1.3),{lw:2.4});
  shape(g,sp([[-60,-146],[36,-152],[48,-92],[-58,-86]],true),C.verm,gg=>{Pat.flowers(gg,bb(-62,-154,112,70),C.gold,24,C.ink);gg.fillStyle=C.gold;gg.fillRect(-62,-98,112,10);Pat.tri(gg,bb(-62,-90,112,8),C.gold,10,true)},{lw:1.8});
  line(g,[[-94,-100],[-112,-60]],C.ink,4);
  g.strokeStyle=C.ink;g.lineWidth=28;g.beginPath();g.moveTo(130,-110);g.bezierCurveTo(156,-70,150,-30,168,-12);g.stroke();g.strokeStyle=C.pale;g.lineWidth=21;g.stroke();
  g.strokeStyle=C.grey;g.lineWidth=1.4;g.beginPath();for(let k=0;k<6;k++){const yy=-86+k*13;g.moveTo(138+k*3,yy);g.lineTo(156+k*2,yy-3)}g.stroke();
  shape(g,ell(112,-124,50,46),C.pale,gg=>Pat.dots(gg,bb(60,-170,104,92),C.grey,14,1.3),{lw:2.2});
  shape(g,sp([[86,-150],[52,-160],[40,-118],[56,-86],[86,-94]],true),C.pink,gg=>Pat.waves(gg,bb(36,-164,56,82),C.cream,10,1.3),{lw:1.8});
  shape(g,sp([[136,-96],[160,-92],[176,-80],[164,-82],[138,-86]],true),C.cream,null,{lw:1.4});
  const ep=new Path2D();ep.moveTo(116,-130);ep.quadraticCurveTo(126,-138,136,-130);ep.quadraticCurveTo(126,-124,116,-130);shape(g,ep,C.cream,gg=>dot(gg,127,-130,3,C.ink),{lw:1.2,line:'single'});
  shape(g,pl([[96,-166],[124,-176],[146,-150],[120,-150]],true),C.gold,gg=>Pat.dots(gg,bb(94,-178,54,30),C.verm,6,1.4),{lw:1.4});
  g.restore()}
function celestialHorse(g,x,y,s,t){g.save();g.translate(x,y);g.scale(s,s);const tt=t||0;
  g.strokeStyle=C.pale;g.lineWidth=3;for(let k=0;k<3;k++){g.beginPath();g.arc(-120,-90,40+k*16,Math.PI*.6,Math.PI*1.1);g.stroke()}
  for(let k=0;k<5;k++)shape(g,petal(-82,-96,52+k*6,9,Math.PI*.78+k*.1+Math.sin(tt*2+k)*.04),k%2?C.gold:C.saffron,null,{lw:1.4});
  [[-58,-62,-62,0],[-30,-62,-26,0]].forEach(([a,b,c,d])=>{g.strokeStyle=C.ink;g.lineWidth=17;g.beginPath();g.moveTo(a,b);g.lineTo(c,d);g.stroke();g.strokeStyle=C.pale;g.lineWidth=11;g.stroke();shape(g,ell(c,d-2,8,5),C.dgold,null,{lw:1.2,line:'single'})});
  [[40,-74,74,-74,82,-46],[58,-74,94,-88,110,-66]].forEach(([a,b,c,d,e,f])=>{g.strokeStyle=C.ink;g.lineWidth=17;g.beginPath();g.moveTo(a,b);g.lineTo(c,d);g.lineTo(e,f);g.stroke();g.strokeStyle=C.pale;g.lineWidth=11;g.stroke();shape(g,ell(e,f,7,5),C.dgold,null,{lw:1.2,line:'single'})});
  shape(g,sp([[-84,-84],[-64,-126],[20,-128],[72,-110],[80,-72],[40,-58],[-64,-58]],true),C.pale,gg=>Pat.dots(gg,bb(-90,-130,180,76),C.cream,12,1.4),{lw:2.4});
  shape(g,sp([[-40,-128],[30,-130],[34,-96],[-38,-94]],true),C.verm,gg=>{Pat.diamonds(gg,bb(-42,-132,80,40),C.gold,12,true)},{lw:1.6});
  shape(g,sp([[44,-112],[64,-150],[90,-188],[108,-176],[92,-140],[74,-100]],true),C.pale,null,{lw:2.2});
  shape(g,sp([[86,-196],[104,-210],[146,-182],[150,-166],[134,-160],[96,-164]],true),C.pale,null,{lw:2.2});
  shape(g,petal(98,-200,24,7,-Math.PI*.62),C.pale,null,{lw:1.4});
  const ep=new Path2D();ep.moveTo(110,-190);ep.quadraticCurveTo(118,-196,126,-190);ep.quadraticCurveTo(118,-185,110,-190);shape(g,ep,C.cream,gg=>dot(gg,118,-190,2.6,C.ink),{lw:1.1,line:'single'});
  line(g,[[100,-200],[134,-172],[110,-166]],C.gold,2.4);
  for(let k=0;k<6;k++){const tt2=k/5;const bx=lerp(54,92,tt2),by=lerp(-120,-196,tt2);shape(g,petal(bx,by,30,8,Math.PI*1.02-k*.06),k%2?C.gold:C.saffron,null,{lw:1.2})}
  g.restore()}
function kalpavriksha(g,x,y,s,grow,t){g.save();g.translate(x,y);g.scale(s,s);grow=grow==null?1:grow;
  shape(g,pl([[-20,0],[-12,-120],[12,-120],[20,0]],true),C.rust,gg=>Pat.vlines(gg,bb(-22,-124,44,126),C.dgold,7,1.6),{lw:2});
  [[-1,0],[1,0]].forEach(([d])=>{g.strokeStyle=C.ink;g.lineWidth=13;g.beginPath();g.moveTo(0,-100);g.quadraticCurveTo(d*40,-120,d*70,-160);g.stroke();g.strokeStyle=C.rust;g.lineWidth=8;g.stroke()});
  const cl=[[0,-200,92,64],[-72,-170,56,46],[72,-170,56,46],[-40,-236,52,40],[40,-236,52,40]];
  cl.forEach(([a,b,rx,ry])=>shape(g,ell(a,b,rx,ry),C.leaf,gg=>{Pat.petals(gg,bb(a-rx,b-ry,rx*2,ry*2),C.teal,22);Pat.dots(gg,bb(a-rx,b-ry,rx*2,ry*2),C.cream,15,1.4)},{lw:2.2}));
  const spots=[[-60,-176],[-20,-214],[24,-196],[64,-168],[0,-250],[-44,-240],[46,-238],[-84,-150],[86,-150],[10,-160]];const r=rng(11);
  spots.forEach(([a,b],i)=>{const k=clamp(grow*spots.length-i,0,1);if(k<=0)return;if(i%2)flowerTop(g,a,b,9*Ease.back(k),i%4===1?C.pink:C.coral,C.gold,6);else shape(g,ell(a,b,8*Ease.back(k)),C.gold,gg=>dot(gg,a-2,b-2,1.6,C.cream),{lw:1.3,line:'single'});void r});
  if(grow>.6)[[-30,-262,1],[52,-208,-1]].forEach(([a,b,d])=>{g.save();g.translate(a,b+Math.sin((t||0)*2)*1.5);g.scale(d*.7,.7);shape(g,sp([[-16,0],[0,-10],[16,-6],[20,0],[8,8],[-10,6]],true),C.turq,gg=>Pat.scales(gg,bb(-16,-10,36,18),C.deep,4,1),{lw:1.4});shape(g,pl([[20,-3],[28,0],[20,3]],true),C.saffron,null,{lw:1,line:'single'});dot(g,13,-3,1.6,C.ink);g.restore()});
  g.restore()}
/* ENV-06 lotus frame: ring of petals around a round window */
function lotusFrame(g,x,y,r,o){o=o||{};const n=o.n||18;for(let k=0;k<n;k++){const a=k*TAU/n+Math.PI/n;shape(g,petal(x+Math.cos(a)*r*.92,y+Math.sin(a)*r*.92,r*.34,r*.1,a),k%2?(o.c2||C.coral):(o.c1||C.gold),null,{lw:1.5})}
  shape(g,ell(x,y,r),o.bg||C.cream,o.pat||null,{lw:2.6})}
