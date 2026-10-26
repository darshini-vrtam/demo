'use strict';
/* ===== Palette: the only hues in the painting (mixes below are a colour layered at partial opacity over another) ===== */
const PAL={indigo:'#24345C',ocean:'#367F9C',turq:'#64B9B0',ivory:'#FFF1D0',gold:'#D9A441',verm:'#C74735',terra:'#B96845',leaf:'#568653',pink:'#E889A3',ink:'#252020'};
function mix(a,b,t){const A=parseInt(a.slice(1),16),B=parseInt(b.slice(1),16);
  const r=Math.round((A>>16)+((B>>16)-(A>>16))*t),g=Math.round(((A>>8)&255)+(((B>>8)&255)-((A>>8)&255))*t),bl=Math.round((A&255)+((B&255)-(A&255))*t);
  return '#'+((1<<24)|(r<<16)|(g<<8)|bl).toString(16).slice(1)}
const SK={light:mix(PAL.ivory,PAL.terra,.4),warm:mix(PAL.ivory,PAL.terra,.62),deva:mix(PAL.ivory,PAL.gold,.45),asura:PAL.terra,
  vishnu:mix(PAL.ocean,PAL.indigo,.2),neel:mix(PAL.ocean,PAL.turq,.35)};
const TINT={milk:mix(PAL.ivory,PAL.turq,.22),milk2:mix(PAL.ivory,PAL.turq,.4),deep:mix(PAL.turq,PAL.ocean,.5),
  violet:mix(PAL.indigo,PAL.pink,.42),plum:mix(PAL.indigo,PAL.pink,.25),lilac:mix(PAL.indigo,PAL.pink,.62),
  sky:mix(PAL.ivory,PAL.gold,.12),paleGold:mix(PAL.ivory,PAL.gold,.45),blush:mix(PAL.ivory,PAL.pink,.35),shell:mix(PAL.leaf,PAL.turq,.25)};
const TAU=Math.PI*2,clamp=(v,a,b)=>v<a?a:v>b?b:v,lerp=(a,b,t)=>a+(b-a)*t,ss=t=>{t=clamp(t,0,1);return t*t*(3-2*t)};
const Ease={lin:t=>t,io:t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,out:t=>1-Math.pow(1-t,3),in:t=>t*t*t,back:t=>{const c=1.6;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2)}};
function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const RM=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
const $=id=>document.getElementById(id);

/* ===== SVG builder ===== */
const NS='http://www.w3.org/2000/svg';
function el(tag,attrs,parent){const e=document.createElementNS(NS,tag);if(attrs)for(const k in attrs){const v=attrs[k];if(v!=null&&v!==false)e.setAttribute(k,v)}if(parent)parent.appendChild(e);return e}
function grp(parent,attrs){return el('g',attrs,parent)}
const f1=n=>Math.round(n*10)/10;
function tf(e,x,y,s,r,sx){/* translate, uniform scale, rotate (deg), optional x-flip */
  let t=`translate(${f1(x)} ${f1(y)})`;if(r)t+=` rotate(${f1(r)})`;if(s!=null&&s!==1)t+=` scale(${f1(s*(sx||1)*1000)/1000} ${Math.round(s*1000)/1000})`;else if(sx&&sx!==1)t+=` scale(${sx} 1)`;
  if(e._t!==t){e.setAttribute('transform',t);e._t=t}}
function setA(e,k,v){if(!e)return;const key='_'+k;if(e[key]!==v){e.setAttribute(k,v);e[key]=v}}
function op(e,v){setA(e,'opacity',f1(clamp(v,0,1)*100)/100)}

/* Catmull-Rom through points -> smooth cubic path (hand-drawn shapes are authored as point lists) */
function cr(pts,closed,k){k=k==null?1:k;const n=pts.length;if(n<2)return'';const P=i=>closed?pts[(i+n)%n]:pts[clamp(i,0,n-1)];
  let d=`M${f1(pts[0][0])} ${f1(pts[0][1])}`;const last=closed?n:n-1;
  for(let i=0;i<last;i++){const p0=P(i-1),p1=P(i),p2=P(i+1),p3=P(i+2);
    d+=`C${f1(p1[0]+(p2[0]-p0[0])/6*k)} ${f1(p1[1]+(p2[1]-p0[1])/6*k)} ${f1(p2[0]-(p3[0]-p1[0])/6*k)} ${f1(p2[1]-(p3[1]-p1[1])/6*k)} ${f1(p2[0])} ${f1(p2[1])}`}
  return closed?d+'Z':d}
/* slightly irregular ellipse, for hand-drawn rounds */
function blob(cx,cy,rx,ry,seed,j,n){n=n||12;j=j==null?.04:j;const r=rng(seed||7);const pts=[];
  for(let i=0;i<n;i++){const a=i/n*TAU,w=1+(r()-.5)*2*j;pts.push([cx+Math.cos(a)*rx*w,cy+Math.sin(a)*ry*w])}return cr(pts,true)}
function mirror(pts){/* right-half outline from the top axis point to the bottom axis point -> full symmetric outline */
  return pts.concat(pts.slice(1,-1).reverse().map(p=>[-p[0],p[1]]))}

/* ===== Clock, tweens and timers (all driven by one rAF clock so Skip and scene changes can cancel cleanly) ===== */
const Clock={now:0,last:0};
const Tw={list:[],
  to(obj,props,ms,ease){ease=ease||Ease.io;const from={};for(const k in props)from[k]=obj[k];
    return new Promise(res=>{if(!ms||ms<=0){Object.assign(obj,props);res();return}this.list.push({obj,props,from,t0:Clock.now,ms,ease,res})})},
  update(){const keep=[];for(const t of this.list){const k=clamp((Clock.now-t.t0)/t.ms,0,1),e=t.ease(k);
      for(const p in t.props)t.obj[p]=t.from[p]+(t.props[p]-t.from[p])*e;if(k>=1)t.res();else keep.push(t)}this.list=keep},
  finishAll(){for(const t of this.list){Object.assign(t.obj,t.props);t.res()}this.list=[]},
  clear(){this.list=[]}};
const Timers={list:[],add(ms,fn){const t={at:Clock.now+ms,fn};this.list.push(t);return t},cancel(t){this.list=this.list.filter(x=>x!==t)},
  update(){if(!this.list.length)return;const due=this.list.filter(t=>t.at<=Clock.now);if(!due.length)return;this.list=this.list.filter(t=>t.at>Clock.now);due.forEach(t=>t.fn())},
  clear(){this.list=[]}};

/* ===== Storage: only the child's chosen treasures and the furthest scene reached ===== */
const Store={k:"dhanteras.giftoflife.v1",data:{treasures:[],reached:0},
  load(){try{const s=localStorage.getItem(this.k);if(s){const d=JSON.parse(s);if(d&&typeof d==='object'){
      if(Array.isArray(d.treasures))this.data.treasures=d.treasures.filter(x=>typeof x==='string').slice(0,5);
      if(Number.isInteger(d.reached))this.data.reached=clamp(d.reached,0,6)}}}catch(e){}},
  save(){try{localStorage.setItem(this.k,JSON.stringify(this.data))}catch(e){}},
  setTreasures(a){this.data.treasures=a.slice();this.save()},
  reach(i){this.data.reached=i;this.save()}};
