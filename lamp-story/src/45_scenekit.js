/* ===== Scene kit: layout anchors, marks, camera, text, shared props ===== */
function mk(o){const s=Object.assign({cast:{},actors:[],_v:-1,A:null,cam:{z:1,fx:0,fy:0,x:0,y:0},fx:[]},o);
  s.anch=function(){if(this._v!==L.ver){this._v=L.ver;this.A=this.layout?this.layout():{};for(const a of this.actors)if(a.mark&&this.A[a.mark]&&!a.free)put(a,this.A[a.mark])}return this.A};
  s.add=function(name,a,mark){a.mark=mark;this.actors.push(a);this.cast[name]=a;this.anch();if(mark&&this.A[mark])put(a,this.A[mark]);return a};
  s.drawActors=function(ctx,filter){const list=this.actors.filter(a=>a.vis&&(!filter||filter(a))).sort((a,b)=>(a.z||0)-(b.z||0)||a.y-b.y);for(const a of list)a.draw(ctx)};
  return s}
function put(a,m){a.x=m.x;a.y=m.y;if(m.s)a.s=m.s;if(m.f)a.f=m.f}
function at(s,a,mark){a.mark=mark;a.free=false;put(a,s.anch()[mark])}
async function walk(s,a,mark,ms,o){o=o||{};const m=s.anch()[mark];a.mark=mark;a.free=false;if(Math.abs(m.x-a.x)>2)a.f=m.x>a.x?1:-1;a.walking=true;
  const pz=a.pose;if(a.kind!=='bijli'&&!o.keepPose)a.set('walk');AU.sfx('step');
  try{await D.tw(a,{x:m.x,y:m.y,s:m.s||a.s},ms||1500,'lin')}finally{a.walking=false}if(m.f)a.f=m.f;if(!o.keepPose&&a.kind!=='bijli')a.set(o.end||pz==='walk'?'idle':pz)}
function camT(ctx,c){ctx.translate(c.fx,c.fy);ctx.scale(c.z,c.z);ctx.translate(-c.fx+c.x,-c.fy+c.y)}
function camInv(p,c){return{x:(p.x-c.fx)/c.z+c.fx-c.x,y:(p.y-c.fy)/c.z+c.fy-c.y}}
function text(ctx,str,x,y,size,col,o){o=o||{};ctx.save();ctx.font=`${o.weight||700} ${size}px ${o.display?'"Yatra One", Georgia, serif':'"Baloo 2", "Trebuchet MS", sans-serif'}`;
  ctx.textAlign=o.align||'center';ctx.textBaseline=o.base||'middle';if(o.outline){ctx.lineWidth=o.outline;ctx.strokeStyle=o.ocol||C.brown;ctx.lineJoin='round';ctx.strokeText(str,x,y)}ctx.fillStyle=col;ctx.fillText(str,x,y);ctx.restore()}
function wrapText(ctx,str,maxW,size,display){ctx.save();ctx.font=`700 ${size}px ${display?'"Yatra One", Georgia, serif':'"Baloo 2", sans-serif'}`;const words=str.split(' '),lines=[];let cur='';
  for(const w of words){const t=cur?cur+' '+w:w;if(ctx.measureText(t).width>maxW&&cur){lines.push(cur);cur=w}else cur=t}if(cur)lines.push(cur);ctx.restore();return lines}
/* falling marigold petals */
function petals(n,seed){const r=rng(seed||9);return Array.from({length:n},()=>({u:r(),v:r(),sp:.03+r()*.04,ph:r()*TAU,r:5+r()*6,c:r()<.5?C.mustard:C.terra}))}
function drawPetals(ctx,P,x,y,w,h){for(const p of P){const v=(p.v+T.sec*p.sp)%1,px=x+((p.u+Math.sin(T.sec*.8+p.ph)*.02)%1)*w,py=y+v*h;
  ctx.save();ctx.translate(px,py);ctx.rotate(T.sec*1.3+p.ph);ctx.beginPath();ctx.ellipse(0,0,p.r,p.r*.55,0,0,TAU);ctx.fillStyle=p.c;ctx.fill();ctx.lineWidth=1.4;ctx.strokeStyle=C.brown;ctx.stroke();ctx.restore()}}
/* patterned curved wind lines */
function windLines(ctx,x,y,w,h,dir,k,t,seed){if(k<=0)return;const r=rng(seed||4);ctx.save();ctx.globalAlpha*=clamp(k,0,1);
  for(let i=0;i<9;i++){const yy=y+r()*h,len=w*(.12+r()*.12),ph=r(),sp=.25+r()*.2;const u=((t*sp+ph)%1.3)-.15;const x0=dir>0?x+u*w:x+w-u*w;
    const pts=[];for(let j=0;j<=10;j++){const tt=j/10;pts.push([x0+dir*tt*len,yy+Math.sin(tt*Math.PI*1.6+t*3+i)*12])}
    strokeL(ctx,pts,C.ivory,4);const e=pts[10];ctx.beginPath();ctx.arc(e[0],e[1]-8,8,Math.PI*.5,Math.PI*2.1,dir<0);ctx.strokeStyle=C.ivory;ctx.lineWidth=3.4;ctx.stroke();
    for(let j=2;j<9;j+=3)dot(ctx,pts[j][0],pts[j][1]+8,2.4,C.gold)}ctx.restore()}
/* stylised swirl that signals where the wind will come from */
function swirl(ctx,x,y,r,t,a){ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y);ctx.rotate(t*2.2);ctx.beginPath();for(let i=0;i<=60;i++){const tt=i/60,ang=tt*TAU*2.2,rr=r*tt;i?ctx.lineTo(Math.cos(ang)*rr,Math.sin(ang)*rr):ctx.moveTo(0,0)}
  ctx.strokeStyle=C.ivory;ctx.lineWidth=6;ctx.lineCap='round';ctx.stroke();ctx.strokeStyle=C.indigo;ctx.lineWidth=2;ctx.stroke();for(let i=0;i<6;i++){const an=i/6*TAU;dot(ctx,Math.cos(an)*r*1.15,Math.sin(an)*r*1.15,4,C.gold)}ctx.restore()}
/* warm flat glow around a point */
function glow(ctx,x,y,r,k,t){if(k<=0)return;ctx.save();ctx.globalAlpha*=clamp(k,0,1);dot(ctx,x,y,r,ca(C.gold,.14));dot(ctx,x,y,r*.66,ca(C.gold,.16));dot(ctx,x,y,r*.36,ca(C.gold,.2));
  for(let i=0;i<16;i++){const an=i/16*TAU+(t||0)*.05;strokeL(ctx,[[x+Math.cos(an)*r*.8,y+Math.sin(an)*r*.8],[x+Math.cos(an)*r*1.08,y+Math.sin(an)*r*1.08]],ca(C.gold,.6),4)}ctx.restore()}
/* a lamp model that can be lit, flicker, lean and go out */
function lamp(x,y,s,o){return Object.assign({x,y,s,lit:0,lean:0,seed:Math.random()*9,oil:true,wick:2,glow:true,hl:false,hx:x,hy:y},o)}
function drawLamp(ctx,l,extra){drawDiya(ctx,l.x,l.y,l.s,Object.assign({lit:l.lit,lean:l.lean,t:T.sec,seed:l.seed,oil:l.oil,wick:l.wick,glow:l.glow,hl:l.hl,rot:l.rot},extra))}
async function lightLamp(l,ms){AU.sfx('relight');l.lit=0;await D.tw(l,{lit:1.15},(ms||500)*.6,'out');await D.tw(l,{lit:1},(ms||500)*.4)}
/* screen-space anchors for the title card */
function titleScene(n,title,night){return mk({id:'title'+n,draw(ctx){const W=L.W,H=L.H;
  Bake.draw(ctx,'title'+n,0,0,W,H,(g)=>{g.fillStyle=night?C.indigo:C.ivory;g.fillRect(0,0,W,H);const r=rng(n*7);
    for(let i=0;i<26;i++){const x=r()*W,y=r()*H;if(Math.abs(x-W/2)<W*.36&&Math.abs(y-H/2)<H*.3)continue;const k=i%4;
      if(k===0)motifHorse(g,x,y,.7,night?C.mustard:C.terra,C.indigo,r()<.5?1:-1);else if(k===1)motifElephant(g,x,y,.55,night?C.ivory:C.indigo,C.mustard,1);else if(k===2)motifFlower(g,x,y,26,night?C.gold:C.verm);else motifMarigold(g,x,y,18)}
    const pw=Math.min(W*.8,1300),ph=Math.min(H*.5,560);R.rect(g,W/2-pw/2-18,H/2-ph/2-18,pw+36,ph+36,C.mustard,{sw:3});R.rect(g,W/2-pw/2,H/2-ph/2,pw,ph,night?C.charcoal:C.terra,{sw:3.4});
    zigzag(g,W/2-pw/2+10,H/2-ph/2+12,pw-20,22,C.mustard,Math.round(pw/34));zigzag(g,W/2-pw/2+10,H/2+ph/2-34,pw-20,22,C.mustard,Math.round(pw/34));paintBorder(g,W,H,night)});
  const pw=Math.min(W*.8,1300),ph=Math.min(H*.5,560);text(ctx,'Episode '+n,W/2,H/2-ph*.24,Math.min(64,pw*.06),C.gold,{display:false,weight:700});
  const size=Math.min(96,pw*.085);const lines=wrapText(ctx,title,pw*.86,size,true);lines.forEach((ln,i)=>text(ctx,ln,W/2,H/2+(i-(lines.length-1)/2)*size*1.15+ph*.06,size,C.ivory,{display:true,outline:6}));
  drawDiya(ctx,W/2,H/2+ph*.42,1.1,{lit:1,glow:true,t:T.sec})}})}
async function titleCard(n,title,night){D.chip('');Music.mood(night?'night':'day');D.setScene(titleScene(n,title,night),'fade',900);await D.wait(900);
  await D.say('dadi',`Episode ${n}. ${title}`);await D.wait(500)}
function ensure(id,make){if(!D.scene||D.scene.id!==id){D.setScene(make(),'fade');return true}return false}
