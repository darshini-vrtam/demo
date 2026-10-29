'use strict';
/* ===== Palette tokens: the only colours used in the illustration (skin and fur tones live in the character bible) ===== */
const P={ink:'#2A1608',verm:'#D9381E',turmeric:'#F2B01E',marigold:'#F4A21D',gold:'#E0A526',leaf:'#4C9A3A',forest:'#1F5E3B',peacock:'#0E7C8C',
  ocean:'#17407A',indigo:'#2B2A6B',terra:'#C4623A',maroon:'#6E1A22',ivory:'#F7EBD0',
  /* added on request: a sky blue and an earth brown */sky:'#7EC4E6',brown:'#7A4A2A',navy:'#13285E'};
const K=P.ink;
const TAU=Math.PI*2,DEG=Math.PI/180,clamp=(v,a,b)=>v<a?a:v>b?b:v,lerp=(a,b,t)=>a+(b-a)*t,sm=t=>t*t*(3-2*t);
function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const $=id=>document.getElementById(id);
let RM=false;try{const mq=matchMedia('(prefers-reduced-motion: reduce)');RM=mq.matches;mq.addEventListener&&mq.addEventListener('change',e=>{RM=e.matches})}catch(e){}
/* ambient motion multiplier: calmer when the child prefers reduced motion */
const MV=()=>RM?.25:1;
const f1=v=>Math.round(v*10)/10,f3=v=>Math.round(v*1000)/1000;

/* ===== Storage: episode progress and the child's kindness deed only ===== */
const DEEDS=['help','share','comfort','nature'];
const Store={k:'diwali.rama.v1',data:{ep:1,deed:null,done:false},
  load(){try{const s=localStorage.getItem(this.k);if(!s)return;const d=JSON.parse(s);if(!d||typeof d!=='object')return;
    if(Number.isInteger(d.ep))this.data.ep=clamp(d.ep,1,2);if(d.done===true)this.data.done=true;if(DEEDS.includes(d.deed))this.data.deed=d.deed}catch(e){}},
  save(){try{localStorage.setItem(this.k,JSON.stringify(this.data))}catch(e){}},
  set(k,v){this.data[k]=v;this.save()}};

/* ===== SVG helpers ===== */
const NS='http://www.w3.org/2000/svg';
const svg=$('stage');
function el(tag,a,parent){const e=document.createElementNS(NS,tag);if(a)for(const k in a){const v=a[k];if(v!=null&&v!==false)e.setAttribute(k,v)}if(parent)parent.appendChild(e);return e}
function grp(parent,a){return el('g',a,parent)}
/* a filled shape with a bold ink outline; fill may be a colour or a pattern url */
function shp(parent,d,fill,sw,a){a=Object.assign({d},a||{});a.fill=fill||'none';if(sw!==0){a.stroke=a.stroke||K;a['stroke-width']=sw==null?4:sw;a['stroke-linejoin']='round';a['stroke-linecap']='round'}return el('path',a,parent)}
function circ(parent,x,y,r,fill,sw,a){a=Object.assign({cx:f1(x),cy:f1(y),r:f1(Math.max(.1,r))},a||{});a.fill=fill||'none';if(sw!==0){a.stroke=a.stroke||K;a['stroke-width']=sw==null?3:sw}return el('circle',a,parent)}
function ell(parent,x,y,rx,ry,fill,sw,a){a=Object.assign({cx:f1(x),cy:f1(y),rx:f1(rx),ry:f1(ry)},a||{});a.fill=fill||'none';if(sw!==0){a.stroke=a.stroke||K;a['stroke-width']=sw==null?3:sw}return el('ellipse',a,parent)}
function rect(parent,x,y,w,h,fill,sw,a){a=Object.assign({x:f1(x),y:f1(y),width:f1(w),height:f1(h)},a||{});a.fill=fill||'none';if(sw!==0){a.stroke=a.stroke||K;a['stroke-width']=sw==null?3:sw;a['stroke-linejoin']='round'}return el('rect',a,parent)}
/* an unfilled stroke */
function ln(parent,d,col,w,a){a=Object.assign({d,fill:'none',stroke:col,'stroke-width':w,'stroke-linecap':'round','stroke-linejoin':'round'},a||{});return el('path',a,parent)}
/* a row of dots along a path (the dotted fill of Madhubani borders) */
function dots(parent,d,col,w,gap){return ln(parent,d,col,w,{'stroke-dasharray':`.1 ${gap||w*2.2}`})}
/* thick limb: ink under, colour on top */
function limb(parent,d,col,w,a){ln(parent,d,K,w+7,a);return ln(parent,d,col,w,a)}
/* double-line contour: thick outer ink, thin inner ink line just inside */
function dbl(parent,d,fill,cx,cy,k,sw){const s=shp(parent,d,fill,sw==null?5:sw);ln(parent,d,K,1.8,{transform:`translate(${cx} ${cy}) scale(${k||.9}) translate(${-cx} ${-cy})`,opacity:.95});return s}
function pts(a,close){return a.map((p,i)=>(i?'L':'M')+f1(p[0])+' '+f1(p[1])).join('')+(close===false?'':'Z')}
/* smooth closed or open path through points (Catmull-Rom to cubic) */
function smooth(a,close){const n=a.length;if(n<2)return'';let d='M'+f1(a[0][0])+' '+f1(a[0][1]);const g=i=>close?a[(i+n)%n]:a[clamp(i,0,n-1)];
  const m=close?n:n-1;for(let i=0;i<m;i++){const p0=g(i-1),p1=g(i),p2=g(i+1),p3=g(i+2);
    d+=`C${f1(p1[0]+(p2[0]-p0[0])/6)} ${f1(p1[1]+(p2[1]-p0[1])/6)} ${f1(p2[0]-(p3[0]-p1[0])/6)} ${f1(p2[1]-(p3[1]-p1[1])/6)} ${f1(p2[0])} ${f1(p2[1])}`}return d+(close?'Z':'')}
function ellD(x,y,rx,ry){return`M${f1(x-rx)} ${f1(y)}A${f1(rx)} ${f1(ry)} 0 1 0 ${f1(x+rx)} ${f1(y)}A${f1(rx)} ${f1(ry)} 0 1 0 ${f1(x-rx)} ${f1(y)}Z`}
/* set a transform: translate, rotate (degrees), scale (sx may flip) */
function tf(e,x,y,s,r,sx,sy){if(!e)return;let t=`translate(${f1(x)} ${f1(y)})`;if(r)t+=` rotate(${f1(r)})`;s=s==null?1:s;const a=s*(sx==null?1:sx),b=s*(sy==null?1:sy);if(a!==1||b!==1)t+=` scale(${f3(a)} ${f3(b)})`;
  if(e._tf!==t){e._tf=t;e.setAttribute('transform',t)}}
function op(e,v){if(!e)return;v=f3(clamp(v,0,1));if(e._op!==v){e._op=v;e.setAttribute('opacity',v);e.style.display=v<=0.001?'none':''}}
function show(e,on){if(e)e.style.display=on?'':'none'}
let UID=0;const uid=p=>(p||'u')+(++UID);
/* sample a path given as a list of points: position at fraction u of its length */
function polyAt(list,u){let tot=0;const seg=[];for(let i=1;i<list.length;i++){const l=Math.hypot(list[i][0]-list[i-1][0],list[i][1]-list[i-1][1]);seg.push(l);tot+=l}
  let d=clamp(u,0,1)*tot;for(let i=0;i<seg.length;i++){if(d<=seg[i]||i===seg.length-1){const k=seg[i]?clamp(d/seg[i],0,1):0;return[lerp(list[i][0],list[i+1][0],k),lerp(list[i][1],list[i+1][1],k)]}d-=seg[i]}return list[0]}

/* ===== Layout: logical units, the short screen side is 1000. The dock below holds narration and controls. ===== */
const app=$('app');
const BORDER=24;
const L={W:1778,H:1000,U:1,pw:1,ph:1,portrait:false,dock:190,dockPx:100,Ha:810,ver:0};
const REF={l:{w:1778,h:810},p:{w:1000,h:1500}};
function relayout(){const r=app.getBoundingClientRect();L.pw=Math.max(1,r.width);L.ph=Math.max(1,r.height);
  L.U=Math.min(L.pw,L.ph)/1000;L.W=L.pw/L.U;L.H=L.ph/L.U;L.portrait=L.ph>L.pw*1.02;
  L.dockPx=Math.round(clamp(L.ph*(L.portrait?.22:.19),96,L.ph*.4));L.dock=L.dockPx/L.U;L.Ha=L.H-L.dock;
  $('dock').style.height=L.dockPx+'px';app.style.setProperty('--dk',L.dockPx+'px');app.style.setProperty('--bd',Math.round(BORDER*L.U)+'px');
  svg.setAttribute('viewBox',`0 0 ${f1(L.W)} ${f1(L.H)}`);L.ver++;if(layers.clip){layers.clip.setAttribute('width',f1(L.W));layers.clip.setAttribute('height',f1(L.Ha))}
  /* the reference composition fits inside the painted area above the dock */
  const R=L.portrait?REF.p:REF.l;const top=L.portrait?70:0;const s=Math.min(L.W/R.w,(L.Ha-top)/R.h);
  L.fit={s,x:(L.W-R.w*s)/2,y:top+(L.Ha-top-R.h*s)/2,w:R.w,h:R.h};
  if(D.scene&&D.scene.relayout)D.scene.relayout();if(D.old&&D.old.relayout)D.old.relayout();Hot.dirty=true;Overlay.place()}
/* map a point in the reference composition to stage units, and back */
function toStage(x,y){const f=L.fit;return[f.x+x*f.s,f.y+y*f.s]}
function fromStage(x,y){const f=L.fit;return[(x-f.x)/f.s,(y-f.y)/f.s]}
/* page-pixel rectangle of a reference-space box (for DOM overlays such as the shloka and the deed caption) */
function refRectPx(x,y,w,h){const [a,b]=toStage(x,y);const k=L.fit.s*L.U;return{left:a*L.U,top:b*L.U,width:w*k,height:h*k}}

/* ===== Time, tweens and timers (scaled by D.speed so QA can fast-forward) ===== */
const T={now:0,sec:0};
const Ease={lin:t=>t,io:t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,out:t=>1-Math.pow(1-t,3),in:t=>t*t*t,
  back:t=>{const c1=1.4,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2)},
  antic:t=>t<.22?-Math.sin(t/.22*Math.PI)*.06:Ease.io((t-.22)/.78)};
const Tw={list:[],add(o,props,ms,ease){return new Promise(res=>{const fr={};for(const k in props){const v=o[k];fr[k]=typeof v==='number'&&isFinite(v)?v:props[k]}
  const old=this.list.filter(t=>t.o===o&&Object.keys(props).some(k=>k in t.to));old.forEach(t=>{for(const k in props)delete t.to[k];if(!Object.keys(t.to).length)t.res()});
  this.list=this.list.filter(t=>Object.keys(t.to).length);this.list.push({o,fr,to:props,t0:T.now,ms:Math.max(1,ms),e:Ease[ease||'io']||ease,res})})},
  update(){const keep=[];for(const t of this.list){const k=clamp((T.now-t.t0)/t.ms,0,1),e=t.e(k);
    for(const p in t.to)t.o[p]=t.fr[p]+(t.to[p]-t.fr[p])*e;if(k<1)keep.push(t);else t.res()}this.list=keep},
  kill(){this.list.forEach(t=>t.res());this.list=[]}};
const Timers={list:[],add(ms,fn){this.list.push({at:T.now+ms,fn})},update(){const due=this.list.filter(t=>t.at<=T.now);this.list=this.list.filter(t=>t.at>T.now);due.forEach(t=>t.fn())},kill(){this.list=[]}};
function tw(o,props,ms,ease){return Tw.add(o,props,RM&&ms>300&&ease!=='lin'?Math.max(300,ms*.6):ms,ease)}
