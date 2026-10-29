/* ===== Scene helpers shared by both episodes ===== */
/* static art that is redrawn when the orientation changes; its animated pieces live in s.art */
function artPart(s){s.art=[];part(s,{update:(dt,t)=>{for(const a of s.art)a.update&&a.update(t,dt)}});return s.art}
function keepArt(s,o){s.art.push(o);return o}
/* layout guard: build(portrait) runs only when the orientation changes */
function onOrient(s,layers,build){s.layout=function(){if(this.orient===L.portrait)return;this.orient=L.portrait;layers.forEach(g=>g.innerHTML='');this.art.length=0;build(L.portrait);Hot.dirty=true}}
/* a patterned sky over the whole stage, a ground band from the horizon down, optional sun and second sky for slow colour changes */
function skyBg(s,o){s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha;const hy=toStage(0,typeof o.horizon==='function'?o.horizon():LP(o.horizon[0],o.horizon[1]))[1];
    const sc=(o.clouds||[[.18,.2,240],[.72,.16,300],[.5,.36,170]]).map(c=>[c[0],c[1]*hy/H*1.6,c[2]]);
    this.sky=sky(this.bg,W,hy+4,{kind:o.kind,clouds:sc,seed:o.seed,stars:o.stars});this.sky2=null;
    if(o.kind2){const g2=grp(this.bg);this.sky2=sky(g2,W,hy+4,{kind:o.kind2,clouds:sc,seed:o.seed,stars:o.stars2});this.sky2.wrap=g2;op(g2,this.skyMix||0)}
    if(o.sun){const sp=toStage(...LP(o.sun[0],o.sun[1]));this.sunG=grp(this.bg);this.sun=sun(this.sunG,o.sunR?o.sunR*L.fit.s:110*L.fit.s);this.sunAt=sp;tf(this.sunG,sp[0],sp[1]+(this.sunRise||0)*L.fit.s,1)}
    if(o.ground){const g=grp(this.bg);rect(g,-4,hy,W+8,H-hy+4,Pat.u(o.ground[0],o.ground[1],o.ground[2],(o.ground[3]||1)*L.fit.s*1.2),0);ln(g,`M-4 ${f1(hy)}H${W+4}`,K,3);dots(g,`M-4 ${f1(hy+9)}H${W+4}`,o.ground[1],5,16)}
    if(o.sea){this.sea=ocean(this.bg,W,hy,H,{mood:o.sea,n:o.seaN||5,scale:L.fit.s*1.1,life:o.life})}
    if(o.after)o.after.call(this,W,H,hy)};
  part(s,{update:(dt,t)=>{s.sky&&s.sky.update(t);s.sky2&&(op(s.sky2.wrap,s.skyMix||0),s.sky2.update(t));s.sun&&(s.sun.update(t),tf(s.sunG,s.sunAt[0],s.sunAt[1]+(s.sunRise||0)*L.fit.s,1));s.sea&&s.sea.update(t)}})}
/* narration shortcuts */
const say=(segs,cues,o)=>D.say(segs,Object.assign({cues:cues||[]},o||{}));
const hold=ms=>D.wait(D.fast?5:ms);
/* place a figure at a layout point */
function put(f,p,face){if(!f||!p)return f;f.x=p[0];f.y=p[1];if(p[2]!=null)f.s=p[2]*(f.Q&&f.Q.scale||1);if(face!=null)f.f=face;else if(p[3]!=null)f.f=p[3];return f}
/* tween a figure along to a point, walking */
async function walkTo(f,x,y,ms,st){f.set(st||'walk',200);await D.tw(f,{x,y:y==null?f.y:y},ms,'lin');f.set('idle',400)}
function goWalk(f,x,y,ms,st){f.set(st||'walk',200);tw(f,{x,y:y==null?f.y:y},ms,'lin').then(()=>f.set('idle',400))}
/* a hop along an arc (Hanuman's short leaps, landing gently) */
async function hopTo(f,x,y,ms,h){const x0=f.x,y0=f.y;const o={k:0};f.set('prepLeap',160);await D.wait(150);f.set('leap',160);AU.sfx('hop');
  const iv=setInterval(()=>{const k=o.k;f.x=lerp(x0,x,k);f.y=lerp(y0,y,k)-Math.sin(k*Math.PI)*(h||60)},16);
  try{await D.tw(o,{k:1},ms||520,'io')}finally{clearInterval(iv)}f.x=x;f.y=y;f.set('land',140);await D.wait(160);f.set('standRing',260)}
/* shared foreground: flowering bushes and tufts that frame a scene */
function frameFlora(g,pts){pts.forEach(([x,y,w,c],i)=>{const b=grp(g,{transform:`translate(${x} ${y})`});if(i%3===2)tuft(b,w*.7,P.leaf);else bush(b,w,P.leaf,c||(i%2?P.verm:P.marigold))})}
/* patterned courtyard / earth floor band in reference units */
function floor(g,x,y,w,h,pat){rect(g,x,y,w,h,pat,4);rect(g,x+8,y+8,w-16,h-16,'none',1.6)}
/* a winding path from a list of points: earth band with a dotted centre line */
function pathBand(g,list,w,col,dot){const d=smooth(list,false);ln(g,d,K,w+8);ln(g,d,col||P.marigold,w);ln(g,d,P.terra,w*.5,{opacity:1,'stroke-dasharray':'2 14'});dots(g,d,dot||P.ivory,5,18);return d}
