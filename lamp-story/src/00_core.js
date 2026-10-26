'use strict';
/* ===== Palette: the only colours used anywhere in the painting ===== */
const C={terra:'#C66A42',verm:'#C83D32',mustard:'#E5B64C',ivory:'#F4E6C8',indigo:'#344D78',leaf:'#658653',brown:'#57372B',charcoal:'#292523',gold:'#FFCB55'};
function ca(hex,a){const n=parseInt(hex.slice(1),16);return `rgba(${n>>16},${(n>>8)&255},${n&255},${a})`}
const TAU=Math.PI*2, clamp=(v,a,b)=>v<a?a:v>b?b:v, lerp=(a,b,t)=>a+(b-a)*t;
function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}

/* ===== Storage: only the shelf lamps and the child's choices ===== */
const Store={k:'panchdeep.event1.v1',data:{choices:{},shelf:[0,0,0,0,0]},
  load(){try{const s=localStorage.getItem(this.k);if(s){const d=JSON.parse(s);if(d&&typeof d==='object'){
    if(d.choices&&typeof d.choices==='object')this.data.choices=d.choices;if(Array.isArray(d.shelf))this.data.shelf=[0,1,2,3,4].map(i=>d.shelf[i]?1:0)}}}catch(e){}},
  save(){try{localStorage.setItem(this.k,JSON.stringify(this.data))}catch(e){}},
  choice(id,v){if(v!==undefined){this.data.choices[id]=v;this.save()}return this.data.choices[id]},
  clearChoices(){this.data.choices={};this.save()},
  light(i){this.data.shelf[i]=1;this.save()}};

/* ===== Rough.js wrappers (cached drawables, low roughness) ===== */
const GEN=rough.generator();
const BASE={roughness:0.7,bowing:0.6,stroke:C.brown,strokeWidth:3,fillStyle:'solid',maxRandomnessOffset:1.4,curveStepCount:8,preserveVertices:true};
const RCS=new WeakMap(), DC=new Map();
function rcOf(ctx){let r=RCS.get(ctx);if(!r){r=rough.canvas(ctx.canvas);RCS.set(ctx,r)}return r}
const R={bypass:false,
  d(ctx,kind,args,o){const key=kind+JSON.stringify(args)+JSON.stringify(o);let d=R.bypass?null:DC.get(key);
    if(!d){const op=Object.assign({},BASE,o);if(op.fill==null)delete op.fill;if(op.sw){op.strokeWidth=op.sw;delete op.sw}
      if(op.fill&&op.stroke==='none')op.strokeWidth=0;
      op.seed=op.seed||(hash(key)%2147483600)+1;d=GEN[kind](...args,op);
      if(!R.bypass){if(DC.size>9000)DC.clear();DC.set(key,d)}}
    rcOf(ctx).draw(d)},
  poly(ctx,pts,fill,o){R.d(ctx,'polygon',[pts],Object.assign({fill},o))},
  rect(ctx,x,y,w,h,fill,o){R.d(ctx,'rectangle',[x,y,w,h],Object.assign({fill},o))},
  ell(ctx,x,y,w,h,fill,o){R.d(ctx,'ellipse',[x,y,w,h],Object.assign({fill},o))},
  circ(ctx,x,y,d,fill,o){R.d(ctx,'circle',[x,y,d],Object.assign({fill},o))},
  path(ctx,p,fill,o){R.d(ctx,'path',[p],Object.assign({fill},o))},
  line(ctx,x1,y1,x2,y2,o){R.d(ctx,'line',[x1,y1,x2,y2],o||{})},
  curve(ctx,pts,o){R.d(ctx,'curve',[pts],o||{})},
  arc(ctx,x,y,w,h,a0,a1,closed,fill,o){R.d(ctx,'arc',[x,y,w,h,a0,a1,closed],Object.assign({fill},o))}};
/* plain canvas helpers for tiny details (faces, dots, flames) */
function dot(ctx,x,y,r,col){ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fillStyle=col;ctx.fill()}
function poly(ctx,pts,col){ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fillStyle=col;ctx.fill()}
function strokeL(ctx,pts,col,w,close){ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));if(close)ctx.closePath();
  ctx.strokeStyle=col;ctx.lineWidth=w;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke()}
function ring(ctx,x,y,r,col,w){ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.strokeStyle=col;ctx.lineWidth=w;ctx.stroke()}
function withT(ctx,x,y,s,f,fn,rot){ctx.save();ctx.translate(x,y);if(rot)ctx.rotate(rot);ctx.scale(s*(f||1),s);fn(ctx);ctx.restore()}

/* ===== Layout: logical units, the short screen side is always 1000 ===== */
const app=document.getElementById('app'),cv=document.getElementById('cv'),cx=cv.getContext('2d');
const L={W:1778,H:1000,U:1,dpr:1,pw:1,ph:1,portrait:false,cs:1,ver:0};
function relayout(){const r=app.getBoundingClientRect();L.pw=Math.max(1,r.width);L.ph=Math.max(1,r.height);
  L.dpr=Math.min(window.devicePixelRatio||1,2);const maxPx=3.4e6;if(L.pw*L.ph*L.dpr*L.dpr>maxPx)L.dpr=Math.sqrt(maxPx/(L.pw*L.ph));
  L.U=Math.min(L.pw,L.ph)/1000;L.W=L.pw/L.U;L.H=L.ph/L.U;L.portrait=L.ph>L.pw*1.02;L.cs=L.portrait?1.28:1;
  cv.width=Math.round(L.pw*L.dpr);cv.height=Math.round(L.ph*L.dpr);L.ver++;Bake.clear()}
/* the caption panel covers the bottom of the screen: keep faces above this line */
L.capTop=()=>L.H-(L.portrait?330:190);

/* ===== Baked layers (static backgrounds painted once per layout) ===== */
const Bake={m:new Map(),clear(){this.m.clear()},
  get(key,w,h,fn,q){const k=key+'@'+L.ver;let c=this.m.get(k);if(c)return c;
    q=q||1;c=document.createElement('canvas');const sc=L.U*L.dpr*q;c.width=Math.max(1,Math.ceil(w*sc));c.height=Math.max(1,Math.ceil(h*sc));
    const g=c.getContext('2d');g.setTransform(sc,0,0,sc,0,0);g.lineCap='round';g.lineJoin='round';R.bypass=true;try{fn(g,w,h)}finally{R.bypass=false}
    c.lw=w;c.lh=h;if(this.m.size>14)this.m.delete(this.m.keys().next().value);this.m.set(k,c);return c},
  draw(ctx,key,x,y,w,h,fn,q){const c=this.get(key,w,h,fn,q);ctx.drawImage(c,x,y,w,h)}};

/* ===== Time, tweens and timers (scaled by D.speed so QA can fast-forward) ===== */
const T={now:0,sec:0};
const Ease={lin:t=>t,io:t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,out:t=>1-Math.pow(1-t,3),in:t=>t*t*t,
  back:t=>{const c1=1.5,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2)},
  antic:t=>t<.25?-Math.sin(t/.25*Math.PI)*.08:Ease.io((t-.25)/.75)};
const Tw={list:[],add(o,props,ms,ease){return new Promise(res=>{const fr={};for(const k in props)fr[k]=o[k];
  const old=this.list.filter(t=>t.o===o&&Object.keys(props).some(k=>k in t.to));old.forEach(t=>t.res());this.list=this.list.filter(t=>!old.includes(t));
  this.list.push({o,fr,to:props,t0:T.now,ms:Math.max(1,ms),e:Ease[ease||'io']||ease,res})})},
  update(){const keep=[];for(const t of this.list){const k=clamp((T.now-t.t0)/t.ms,0,1),e=t.e(k);
    for(const p in t.to)t.o[p]=t.fr[p]+(t.to[p]-t.fr[p])*e;if(k<1)keep.push(t);else t.res()}this.list=keep},
  kill(){this.list.forEach(t=>t.res());this.list=[]}};
const Timers={list:[],add(ms,fn){this.list.push({at:T.now+ms,fn})},update(){const due=this.list.filter(t=>t.at<=T.now);this.list=this.list.filter(t=>t.at>T.now);due.forEach(t=>t.fn())},kill(){this.list=[]}};
function tw(o,props,ms,ease){return Tw.add(o,props,ms,ease)}
