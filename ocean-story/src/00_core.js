'use strict';
/* ===== Palette tokens: the only colours used in the painting ===== */
const C={indigo:'#2B2F77',peacock:'#1C7C8C',turmeric:'#E8A317',verm:'#D6452B',cream:'#F6EBD0',leaf:'#4E8F3A',ink:'#1A1A1A'};
function ca(hex,a){const n=parseInt(hex.slice(1),16);return `rgba(${n>>16},${(n>>8)&255},${n&255},${a})`}
const TAU=Math.PI*2, clamp=(v,a,b)=>v<a?a:v>b?b:v, lerp=(a,b,t)=>a+(b-a)*t;
function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const $=id=>document.getElementById(id);
let RM=false;try{const mq=matchMedia('(prefers-reduced-motion: reduce)');RM=mq.matches;mq.addEventListener&&mq.addEventListener('change',e=>{RM=e.matches})}catch(e){}
/* motion multiplier: 0 when the child prefers reduced motion */
const MV=()=>RM?0:1;

/* ===== Storage: only the child's choices and replay state ===== */
const Store={k:'oceanwonders.ep1.v1',data:{answer:null,picks:[],plays:0},
  load(){try{const s=localStorage.getItem(this.k);if(!s)return;const d=JSON.parse(s);if(!d||typeof d!=='object')return;
    if(typeof d.answer==='string')this.data.answer=d.answer;if(Array.isArray(d.picks))this.data.picks=d.picks.filter(p=>typeof p==='string').slice(0,2);
    if(typeof d.plays==='number')this.data.plays=d.plays}catch(e){}},
  save(){try{localStorage.setItem(this.k,JSON.stringify(this.data))}catch(e){}},
  set(k,v){this.data[k]=v;this.save()}};

/* ===== Layout: logical units, the short screen side is 1000. The bottom dock holds narration and controls. ===== */
const app=$('app'),cv=$('cv'),cx=cv.getContext('2d');
const L={W:1778,H:1000,U:1,dpr:1,pw:1,ph:1,portrait:false,dock:190,dockPx:100,Ha:810,ver:0};
function relayout(){const r=app.getBoundingClientRect();L.pw=Math.max(1,r.width);L.ph=Math.max(1,r.height);
  L.dpr=Math.min(window.devicePixelRatio||1,2);const maxPx=3.6e6;if(L.pw*L.ph*L.dpr*L.dpr>maxPx)L.dpr=Math.sqrt(maxPx/(L.pw*L.ph));
  L.U=Math.min(L.pw,L.ph)/1000;L.W=L.pw/L.U;L.H=L.ph/L.U;L.portrait=L.ph>L.pw*1.02;
  L.dockPx=Math.round(clamp(L.ph*(L.portrait?.26:.19),96,L.ph*.4));L.dock=L.dockPx/L.U;L.Ha=L.H-L.dock;L.hudB=BORDER+70/L.U;
  const dk=$('dock');dk.style.height=L.dockPx+'px';app.style.setProperty('--dk',L.dockPx+'px');app.style.setProperty('--bd',Math.round(BORDER*L.U)+'px');
  cv.width=Math.round(L.pw*L.dpr);cv.height=Math.round(L.ph*L.dpr);L.ver++;Bake.clear()}
const BORDER=30;

/* ===== Baked layers: static paintings drawn once per layout ===== */
const Bake={m:new Map(),clear(){this.m.clear()},
  get(key,w,h,fn){const k=key+'@'+L.ver;let c=this.m.get(k);if(c)return c;
    c=document.createElement('canvas');const sc=L.U*L.dpr;c.width=Math.max(1,Math.ceil(w*sc));c.height=Math.max(1,Math.ceil(h*sc));
    const g=c.getContext('2d');g.setTransform(sc,0,0,sc,0,0);g.lineCap='round';g.lineJoin='round';fn(g,w,h);
    if(this.m.size>24)this.m.delete(this.m.keys().next().value);this.m.set(k,c);return c},
  draw(ctx,key,x,y,w,h,fn){const c=this.get(key,w,h,fn);ctx.drawImage(c,x,y,w,h)}};

/* ===== Time, tweens and timers (scaled by D.speed so QA can fast-forward) ===== */
const T={now:0,sec:0};
const Ease={lin:t=>t,io:t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,out:t=>1-Math.pow(1-t,3),in:t=>t*t*t,
  back:t=>{const c1=1.4,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2)}};
const Tw={list:[],add(o,props,ms,ease){return new Promise(res=>{const fr={};for(const k in props)fr[k]=o[k];
  const old=this.list.filter(t=>t.o===o&&Object.keys(props).some(k=>k in t.to));old.forEach(t=>t.res());this.list=this.list.filter(t=>!old.includes(t));
  this.list.push({o,fr,to:props,t0:T.now,ms:Math.max(1,ms),e:Ease[ease||'io']||ease,res})})},
  update(){const keep=[];for(const t of this.list){const k=clamp((T.now-t.t0)/t.ms,0,1),e=t.e(k);
    for(const p in t.to)t.o[p]=t.fr[p]+(t.to[p]-t.fr[p])*e;if(k<1)keep.push(t);else t.res()}this.list=keep},
  kill(){this.list.forEach(t=>t.res());this.list=[]}};
const Timers={list:[],add(ms,fn){this.list.push({at:T.now+ms,fn})},update(){const due=this.list.filter(t=>t.at<=T.now);this.list=this.list.filter(t=>t.at>T.now);due.forEach(t=>t.fn())},kill(){this.list=[]}};
function tw(o,props,ms,ease){return Tw.add(o,props,ms,ease)}
