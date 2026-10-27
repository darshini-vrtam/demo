'use strict';
/* ===== Palette tokens: the only colours the artwork uses ===== */
const C={ink:'#1A1020',indigo:'#2B2D6E',deep:'#1B3A6B',turq:'#1FA3A8',teal:'#167C80',sblue:'#3C6FB5',agold:'#C9A24A',gold:'#E6B422',
  cream:'#F6ECD2',pale:'#F7F5EE',saffron:'#F28C28',verm:'#D9381E',coral:'#F26B5B',pink:'#E8789A',leaf:'#3E8E41',plum:'#5B2A5E',
  violet:'#7B4FB0',grey:'#6E6A73',maroon:'#7A2432',rust:'#B5532A',dgold:'#8F6B1E'};
function ca(hex,a){const n=parseInt(hex.slice(1),16);return `rgba(${n>>16},${(n>>8)&255},${n&255},${a})`}
const TAU=Math.PI*2,clamp=(v,a,b)=>v<a?a:v>b?b:v,lerp=(a,b,t)=>a+(b-a)*t;
const Ease={lin:t=>t,io:t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,out:t=>1-Math.pow(1-t,3),in:t=>t*t*t,back:t=>{const c=1.5;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2)}};
function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function rng(seed){let a=seed>>>0;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const $=id=>document.getElementById(id);
const reduceMotion=(()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}})();

/* ===== Storage: only the child's choices and reflections. Never required. ===== */
const Store={k:'festivalBooks.book2.oceanOfTreasures.v1',data:null,
  fresh(){return{treasure:null,reflect8:null,reflect10:null}},
  load(){this.data=this.fresh();try{const s=localStorage.getItem(this.k);if(!s)return;const d=JSON.parse(s);if(!d||typeof d!=='object')return;
    if(['health','friendship','knowledge','kindness'].includes(d.treasure))this.data.treasure=d.treasure;
    ['reflect8','reflect10'].forEach(k=>{const r=d[k];if(r&&typeof r==='object')this.data[k]={text:typeof r.text==='string'?r.text.slice(0,300):'',pic:typeof r.pic==='string'?r.pic.slice(0,24):''}})}catch(e){}},
  save(){try{localStorage.setItem(this.k,JSON.stringify(this.data))}catch(e){}},
  set(k,v){this.data[k]=v;this.save()}};

/* ===== Layout: a fixed design box (landscape 1600x900 or portrait 900x1150) fitted into the stage; backgrounds bleed to the edges ===== */
const stage=$('stage'),cv=$('cv'),cx=cv.getContext('2d');
const L={pw:1,ph:1,dpr:1,portrait:false,DW:1600,DH:900,s:1,ox:0,oy:0,PX:1,ver:0,B:{x:0,y:0,w:1600,h:900}};
function relayout(){const r=stage.getBoundingClientRect();L.pw=Math.max(1,r.width);L.ph=Math.max(1,r.height);
  L.dpr=Math.min(window.devicePixelRatio||1,2);const maxPx=4e6;if(L.pw*L.ph*L.dpr*L.dpr>maxPx)L.dpr=Math.sqrt(maxPx/(L.pw*L.ph));
  /* orientation follows the viewport (same rule as the CSS), never the stage, so panel content can't flip it back and forth */
  try{L.portrait=matchMedia('(max-aspect-ratio: 5/4)').matches}catch(e){L.portrait=innerWidth/innerHeight<1.25}
  if(L.portrait){L.DW=900;L.DH=1150;L.s=Math.min(L.pw/900,L.ph/1060)}else{L.DW=1600;L.DH=900;L.s=Math.min(L.pw/1600,L.ph/810)}
  L.ox=(L.pw-L.DW*L.s)/2;L.oy=(L.ph-L.DH*L.s)/2;L.PX=L.s*L.dpr;
  L.B={x:-L.ox/L.s,y:-L.oy/L.s,w:L.pw/L.s,h:L.ph/L.s};
  cv.width=Math.round(L.pw*L.dpr);cv.height=Math.round(L.ph*L.dpr);L.ver++;Spr.clear();
  if(window.UI&&UI.relayout)UI.relayout()}
function toDesign(clientX,clientY){const r=cv.getBoundingClientRect();return{x:((clientX-r.left)-L.ox)/L.s,y:((clientY-r.top)-L.oy)/L.s}}
function toClient(x,y){const r=stage.getBoundingClientRect();return{x:x*L.s+L.ox,y:y*L.s+L.oy,r}}

/* ===== Sprite cache: heavy patterned figures are painted once per layout and resolution ===== */
const Spr={m:new Map(),clear(){this.m.clear()},
  /* draw a cached sprite whose local origin (ox,oy) lands at (x,y), scaled by sc */
  draw(g,key,x,y,w,h,ox,oy,sc,fn){const res=Math.max(.25,Math.round(L.PX*sc*(g.__zoom||1)*4)/4);const k=key+'@'+res+'#'+L.ver;let c=this.m.get(k);
    if(!c){c=document.createElement('canvas');c.width=Math.max(1,Math.ceil(w*res));c.height=Math.max(1,Math.ceil(h*res));const q=c.getContext('2d');
      q.setTransform(res,0,0,res,ox*res,oy*res);q.lineCap='round';q.lineJoin='round';fn(q);if(this.m.size>220)this.m.delete(this.m.keys().next().value);this.m.set(k,c)}
    g.drawImage(c,x-ox*sc,y-oy*sc,w*sc,h*sc)}};

/* ===== Clock, tweens and timers on one clock (the director can run it fast for QA) ===== */
const T={now:0,sec:0};
const Tw={list:[],add(o,props,ms,e){return new Promise(res=>{const fr={};for(const k in props)fr[k]=o[k];
    this.list=this.list.filter(t=>{if(t.o===o&&Object.keys(props).some(k=>k in t.to)){t.res();return false}return true});
    this.list.push({o,fr,to:props,t0:T.now,ms:Math.max(1,ms),e:Ease[e||'io']||e,res})})},
  update(){const keep=[];for(const t of this.list){const k=clamp((T.now-t.t0)/t.ms,0,1),v=t.e(k);for(const p in t.to)t.o[p]=t.fr[p]+(t.to[p]-t.fr[p])*v;if(k<1)keep.push(t);else t.res()}this.list=keep},
  kill(){this.list.forEach(t=>t.res());this.list=[]}};
function tw(o,props,ms,e){return Tw.add(o,props,ms,e)}
const Timers={list:[],add(ms,fn){this.list.push({at:T.now+ms,fn})},update(){const due=this.list.filter(t=>t.at<=T.now);this.list=this.list.filter(t=>t.at>T.now);due.forEach(t=>t.fn())},kill(){this.list=[]}};
