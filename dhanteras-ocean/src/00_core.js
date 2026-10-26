'use strict';
/* ===== Palette: the only colours the painting uses ===== */
const C={line:'#3B1F14',cream:'#FBF1D9',white:'#FFFFFF',indigo:'#2A2E78',deep:'#14206B',peacock:'#0B6E8A',turq:'#2BB5B0',pink:'#E86FA0',
  turmeric:'#F2B71F',gold:'#D9A21B',ochre:'#C98A2B',saffron:'#F28A1E',diya:'#F5821F',verm:'#D6341F',red:'#B3122D',coral:'#F26B5B',
  leaf:'#3E8E41',emerald:'#1F9D6B',charcoal:'#3A3A44',violet:'#6B4FA0'};
function ca(hex,a){const n=parseInt(hex.slice(1),16);return `rgba(${n>>16},${(n>>8)&255},${n&255},${a})`}
function mixHex(a,b,t){if(t<=0)return a;if(t>=1)return b;const x=parseInt(a.slice(1),16),y=parseInt(b.slice(1),16);
  const r=Math.round((x>>16)+((y>>16)-(x>>16))*t),g=Math.round(((x>>8)&255)+(((y>>8)&255)-((x>>8)&255))*t),bl=Math.round((x&255)+((y&255)-(x&255))*t);
  return '#'+((1<<24)|(r<<16)|(g<<8)|bl).toString(16).slice(1)}
const TAU=Math.PI*2,clamp=(v,a,b)=>v<a?a:v>b?b:v,lerp=(a,b,t)=>a+(b-a)*t,ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const $=id=>document.getElementById(id);

/* ===== Storage: current scene, finished activities, treasures, choices. Never required. ===== */
const Store={k:'dhanteras2026.ocean.v1',data:null,
  fresh(){return{chapter:0,done:[],treasures:[],gifts:[],choices:{}}},
  load(){this.data=this.fresh();try{const s=localStorage.getItem(this.k);if(s){const d=JSON.parse(s);if(d&&typeof d==='object'){
    if(Number.isInteger(d.chapter)&&d.chapter>=0&&d.chapter<8)this.data.chapter=d.chapter;
    ['done','treasures','gifts'].forEach(k=>{if(Array.isArray(d[k]))this.data[k]=d[k].filter(v=>typeof v==='string').slice(0,12)});
    if(d.choices&&typeof d.choices==='object')this.data.choices=d.choices}}}catch(e){}},
  save(){try{localStorage.setItem(this.k,JSON.stringify(this.data))}catch(e){}},
  set(k,v){this.data[k]=v;this.save()},
  push(k,v){if(!this.data[k].includes(v)){this.data[k].push(v);this.save()}},
  choice(k,v){if(v!==undefined){this.data.choices[k]=v;this.save()}return this.data.choices[k]},
  reset(){this.data=this.fresh();this.save()}};

/* ===== Layout: the short screen side is always 1080 logical units ===== */
const app=$('app'),cv=$('cv'),cx=cv.getContext('2d');
const L={W:1920,H:1080,U:1,dpr:1,pw:1,ph:1,portrait:false,ver:0};
function relayout(){const r=app.getBoundingClientRect();L.pw=Math.max(1,r.width);L.ph=Math.max(1,r.height);
  L.dpr=Math.min(window.devicePixelRatio||1,2);const maxPx=3.6e6;if(L.pw*L.ph*L.dpr*L.dpr>maxPx)L.dpr=Math.sqrt(maxPx/(L.pw*L.ph));
  L.U=Math.min(L.pw,L.ph)/1080;L.W=L.pw/L.U;L.H=L.ph/L.U;L.portrait=L.H>L.W*1.05;
  cv.width=Math.round(L.pw*L.dpr);cv.height=Math.round(L.ph*L.dpr);L.ver++;Spr.clear();if(window.UI)UI.relayout()}
/* safe story band: top 12% for the title, bottom for subtitles and prompts */
L.top=()=>L.H*.12;
L.bot=()=>{const capEl=$('cap'),pl=$('plaque');let px=L.ph*.15;try{
  const r=app.getBoundingClientRect();[capEl,pl].forEach(el=>{if(el&&!el.hidden){const b=el.getBoundingClientRect();if(b.height>0)px=Math.max(px,r.bottom-b.top+8)}})}catch(e){}
  return L.H-px/L.U};

/* ===== Sprite cache: static painted parts rendered once per layout ===== */
const Spr={m:new Map(),clear(){this.m.clear()},
  get(key,w,h,fn){const k=key+'@'+L.ver;let c=this.m.get(k);if(c){this.m.delete(k);this.m.set(k,c);return c}
    const sc=L.U*L.dpr;c=document.createElement('canvas');c.width=Math.max(1,Math.ceil(w*sc));c.height=Math.max(1,Math.ceil(h*sc));
    const g=c.getContext('2d');g.setTransform(sc,0,0,sc,0,0);g.lineCap='round';g.lineJoin='round';fn(g,w,h);
    if(this.m.size>160)this.m.delete(this.m.keys().next().value);this.m.set(k,c);return c},
  /* draw sprite whose local origin (ox,oy) lands at x,y; s scales */
  draw(ctx,key,x,y,w,h,ox,oy,fn,s){s=s||1;const c=this.get(key,w,h,fn);ctx.drawImage(c,x-ox*s,y-oy*s,w*s,h*s)}};

/* ===== Time, tweens, timers ===== */
const T={now:0,sec:0};
const Ease={lin:t=>t,io:ease,out:t=>1-Math.pow(1-t,3),in:t=>t*t*t,back:t=>{const c1=1.4,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2)}};
const Tw={list:[],add(o,props,ms,e){return new Promise(res=>{const fr={};for(const k in props)fr[k]=o[k];
  const old=this.list.filter(t=>t.o===o&&Object.keys(props).some(k=>k in t.to));old.forEach(t=>t.res());this.list=this.list.filter(t=>!old.includes(t));
  this.list.push({o,fr,to:props,t0:T.now,ms:Math.max(1,ms),e:Ease[e||'io']||e,res})})},
  update(){const keep=[];for(const t of this.list){const k=clamp((T.now-t.t0)/t.ms,0,1),v=t.e(k);
    for(const p in t.to)t.o[p]=t.fr[p]+(t.to[p]-t.fr[p])*v;if(k<1)keep.push(t);else t.res()}this.list=keep},
  kill(){this.list.forEach(t=>t.res());this.list=[]}};
const Timers={list:[],add(ms,fn){this.list.push({at:T.now+ms,fn})},update(){const due=this.list.filter(t=>t.at<=T.now);this.list=this.list.filter(t=>t.at>T.now);due.forEach(t=>t.fn())},kill(){this.list=[]}};
function tw(o,props,ms,e){return Tw.add(o,props,ms,e)}
const reduceMotion=(()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}})();
