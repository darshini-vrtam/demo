/* ===== Director: plays shots in order, pauses for every activity, resumes on completion ===== */
const ABORT={abort:true};
const layers={scenes:null,fx:null};
const D={token:0,speed:1,fast:false,qa:null,scene:null,old:null,inset:0,trayPx:0,q:Promise.resolve(),skipFn:null,curTask:null,lastInput:0,hintTimer:0,cc:true,
  mood:{pitch:1,rate:1,vol:1},cast:{},resumed:false,replay:false,actOn:false,
  guard(tok){if(tok!==this.token)throw ABORT},
  wait(ms){const tok=this.token;return new Promise((res,rej)=>Timers.add(ms,()=>tok===this.token?res():rej(ABORT)))},
  tw(o,p,ms,e){const tok=this.token;return tw(o,p,ms,e).then(()=>this.guard(tok))},
  /* fire-and-forget tween that never throws */
  go(o,p,ms,e){tw(o,p,ms,e).catch(()=>{})},
  poke(){this.lastInput=performance.now()},
  /* scenes cross-fade: the new scene sits below, the old one fades out (opacity is used only to cross-fade flat layers) */
  setScene(s,ms){const old=this.scene;this.scene=s;layers.scenes.insertBefore(s.root,layers.scenes.firstChild);s.relayout&&s.relayout();this.cast=s.cast||{};
    if(old){if(this.old&&this.old!==old){this.old.root.remove();this.old.dispose&&this.old.dispose()}this.old=old;const fo={a:1};const r=old.root;
      if(ms===0||this.fast){r.remove();old.dispose&&old.dispose();this.old=null}
      else tw(fo,{a:0},ms||900).then(()=>{r.remove();old.dispose&&old.dispose();if(this.old===old)this.old=null});
      old._fade=fo}Hot.dirty=true;return s},
  chip(text){const c=$('chip');c.textContent=text||'';c.hidden=!text},
  setMood(m){this.mood=Object.assign({pitch:1,rate:1,vol:1},m||{})},
  /* captions: verbatim text, paged by sentence so long lines stay readable */
  pages(segs){const lim=L.portrait?118:150;const out=[];const add=(v,t)=>{const parts=t.match(/[^.!?]+[.!?]+['"’”]*\s*|[^.!?]+$/g)||[t];let cur='';
      for(const p of parts){if((cur+p).length>lim&&cur){out.push({v,t:cur.trim()});cur=''}cur+=p}if(cur.trim())out.push({v,t:cur.trim()})};
    (typeof segs==='string'?[['narr',segs]]:segs).forEach(s=>add(s[0],s[1]));
    const pages=[];out.forEach(c=>{const last=pages[pages.length-1];if(last&&(last.text.length+c.t.length)<lim)last.parts.push(c),last.text+=' '+c.t;else pages.push({parts:[c],text:c.t})});return pages},
  showCap(who,text){const V=VOICE[who]||VOICE.narr;$('capWho').querySelector('b').textContent=V.name;$('capWho').querySelector('i').style.background=V.col;
    $('capText').textContent=text;$('cap').hidden=false;$('act').hidden=true},

  hideCap(){$('cap').hidden=true;if(this.actOn&&($('ctrl').childElementCount||$('actNote').textContent))$('act').hidden=false},
  talk(who,on){const c=this.cast[who];if(!c)return;(Array.isArray(c)?c:[c]).forEach(a=>{if(a)a.talking=on})},
  /* say: segs is a string (Narrator) or a list of [voice,text]; cues are [substring, fn] fired when that word is reached */
  say(segs,o){o=o||{};const tok=this.token;const run=async()=>{this.guard(tok);const pages=this.pages(segs);let skipped=false;const cues=(o.cues||[]).map(c=>({s:c[0],fn:c[1],done:false}));
      const fire=(c)=>{if(!c.done){c.done=true;try{c.fn()}catch(e){console.error(e)}}};
      for(const pg of pages){if(skipped)break;this.showCap(pg.parts[0].v,pg.text);
        for(const part of pg.parts){if(skipped)break;const my=cues.filter(c=>!c.done&&part.t.includes(c.s));const idx=my.map(c=>part.t.indexOf(c.s));
          const skipP=new Promise(r=>{this.skipFn=()=>{skipped=true;Speech.stop();r()}});this.talk(part.v,true);this.showCap(part.v,pg.text);if(window.__said)window.__said.push([part.v,part.t]);
          const est=part.t.length*62/((VOICE[part.v]||VOICE.narr).rate*(part.v==='narr'?this.mood.rate:1));const t0=T.now;
          let p;const onWord=ci=>{my.forEach((c,i)=>{if(ci>=idx[i]-1)fire(c)})};
          if(this.fast)p=new Promise(r=>setTimeout(r,20));
          else if(canSpeak(part.v,part.t))p=Promise.all([speakAny(part.v,part.t,this.mood,onWord),this.wait(500)]);
          else p=this.wait(Math.max(1600,est));
          const ticker=setInterval(()=>{const el=(T.now-t0);my.forEach((c,i)=>{if(el>=est*(idx[i]/part.t.length)*1.08)fire(c)})},60);
          Music.duck(true);try{await Promise.race([p,skipP])}finally{clearInterval(ticker);this.skipFn=null;Music.duck(false);this.talk(part.v,false)}
          my.forEach(fire);this.guard(tok)}
        if(!this.fast&&!skipped)await this.wait(o.after==null?320:o.after)}
      cues.forEach(fire);if(!o.keep)this.hideCap()};
    const p=this.q.then(run,run);this.q=p.catch(()=>{});return p},
  skip(){if(this.skipFn){this.skipFn();return}if(this.curTask&&this.curTask.o.assist&&!this.curTask.assisting){this.curTask.assisting=true;this.curTask.o.assist(this.curTask);this.poke()}},
  /* ---- the activity row in the dock: instruction (with an icon), counter, controls ---- */
  instr(ins,cnt,icon){this.actOn=true;const el=$('ins');el.innerHTML='';if(icon)el.insertAdjacentHTML('beforeend',ICON[icon]||'');el.append(document.createTextNode(ins||''));
    el.classList.remove('hint');this.baseIns=el.innerHTML;$('cnt').textContent=cnt||'';$('cnt').hidden=!cnt;$('top').hidden=!ins&&!cnt},
  counter(t){$('cnt').textContent=t;$('cnt').hidden=!t},
  hint(t,ms){const el=$('ins');el.innerHTML='';el.insertAdjacentHTML('beforeend',ICON.leaf);el.append(document.createTextNode(t));el.classList.add('hint');$('top').hidden=false;clearTimeout(this.hintTimer);
    this.hintTimer=setTimeout(()=>{el.innerHTML=this.baseIns||'';el.classList.remove('hint')},ms||6000)},
  controls(list,note){const box=$('ctrl');box.innerHTML='';$('actNote').textContent=note||'';$('actNote').hidden=!note;const els={};(list||[]).forEach(b=>{const e=document.createElement('button');e.type='button';e.className='big'+(b.cls?' '+b.cls:'');e.id=b.id;
      e.innerHTML=b.html||'';if(!b.html)e.textContent=b.label;if(b.aria)e.setAttribute('aria-label',b.aria);if(b.disabled)e.disabled=true;e.addEventListener('click',()=>{D.poke();AU.resume();b.on&&b.on()});box.append(e);els[b.id]=e});
    if($('cap').hidden)$('act').hidden=!(list&&list.length)&&!note;return els},
  clearAct(){this.actOn=false;$('act').hidden=true;$('top').hidden=true;$('ctrl').innerHTML='';$('actNote').textContent='';$('ins').textContent='';$('cnt').textContent='';clearTimeout(this.hintTimer)},
  late(){if(this.qa&&this.qa.stop==='late'&&this.qa.at===this.qa.cur){this.qa.paused=true;return new Promise(()=>{})}if(this.qa&&this.qa.stop==='all')return this.qaHold('late');return Promise.resolve()},
  qaHold(tag){this.qa.paused=tag+':'+this.qa.cur;return new Promise(r=>{this.qa.resume=()=>{this.qa.paused=false;r()}})},
  /* a task inside an activity: the child acts; after ~15 s idle a hint (and a demonstration), then the story gently assists */
  task(o){const tok=this.token;return new Promise((res,rej)=>{const t={o,done:false,assisting:false,finish:()=>{if(t.done)return;t.done=true;if(this.curTask===t)this.curTask=null;clearInterval(iv);res()}};
    this.curTask=t;this.poke();let stage=0;
    const qaStop=this.qa&&this.qa.stop==='act'&&this.qa.at===this.qa.cur&&!this.qa.paused;let qaHeld=!(this.qa&&this.qa.stop==='all'&&this.qa.acts);
    const iv=setInterval(()=>{if(tok!==this.token){clearInterval(iv);if(this.curTask===t)this.curTask=null;rej(ABORT);return}if(t.done)return;
      if(qaStop){if(!this.qa.paused){this.qa.paused=true}return}
      if(!qaHeld){qaHeld=true;t.assisting=true;this.qaHold('act').then(()=>{t.assisting=false});return}if(t.assisting&&this.qa&&this.qa.paused)return;
      if(this.fast){if(!t.assisting){t.assisting=true;o.assist&&o.assist(t)}return}
      const idle=(performance.now()-this.lastInput)/1000;
      if(stage===0&&idle>15){stage=1;this.poke();o.demo&&o.demo();if(o.hint){this.hint(o.hint,8000);this.say(o.hintWho?[[o.hintWho,o.hint]]:o.hint).catch(()=>{})}}
      else if(stage===1&&idle>10&&!t.assisting){stage=2;t.assisting=true;o.assist&&o.assist(t)}},this.fast?20:250);
    if(o.start)o.start(t)})},
  /* when picture cards are showing, the painting shrinks into the space above them */
  insetRect(){if(this.inset<=0.001)return{x:0,y:0,s:1};const avail=(L.ph-L.dockPx-this.trayPx-6)/L.U;const st=clamp(avail/L.Ha,.3,1);const s=lerp(1,st,this.inset);
    return{x:(L.W-L.W*s)/2,y:0,s}}};
/* DOM overlays laid over the painting (shloka panel, deed caption) follow the reference layout */
const Overlay={list:[],add(el,fn){this.list.push({el,fn});this.place()},clear(){this.list.forEach(o=>o.el.hidden=true);this.list=[]},
  place(){this.list.forEach(o=>{const r=o.fn();if(!r)return;Object.assign(o.el.style,{left:Math.round(r.left)+'px',top:Math.round(r.top)+'px',width:Math.round(r.width)+'px',height:r.height?Math.round(r.height)+'px':''})})}};
const ICON={drag:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M6 20h28M6 20l6-6M6 20l6 6M34 20l-6-6M34 20l-6 6" fill="none" stroke="#2A1608" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  tap:'<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="7" fill="#F2B01E" stroke="#2A1608" stroke-width="3"/><circle cx="20" cy="20" r="15" fill="none" stroke="#2A1608" stroke-width="2.6" stroke-dasharray="4 4"/></svg>',
  up:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 34V6M20 6l-8 8M20 6l8 8" fill="none" stroke="#2A1608" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  down:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 6v28M20 34l-8-8M20 34l8-8" fill="none" stroke="#2A1608" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  join:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M4 20h10M14 20l-5-5M14 20l-5 5M36 20H26M26 20l5-5M26 20l5 5" fill="none" stroke="#2A1608" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  hold:'<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="12" fill="#D9381E" stroke="#2A1608" stroke-width="3"/><path d="M20 12v8l5 4" fill="none" stroke="#2A1608" stroke-width="3" stroke-linecap="round"/></svg>',
  rub:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M6 24c4-8 8 8 12 0s8 8 12 0s4-4 4-4" fill="none" stroke="#2A1608" stroke-width="3.4" stroke-linecap="round"/></svg>',
  circle:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M30 12A12 12 0 1 0 32 24" fill="none" stroke="#2A1608" stroke-width="3.4" stroke-linecap="round"/><path d="M32 24l-1-8M32 24l-7-3" fill="none" stroke="#2A1608" stroke-width="3.4" stroke-linecap="round"/></svg>',
  leaf:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M8 32C8 16 18 8 34 8C34 24 24 32 8 32Z" fill="#4C9A3A" stroke="#2A1608" stroke-width="3"/><path d="M10 30L28 14" stroke="#2A1608" stroke-width="2"/></svg>'};

/* ===== Tap targets: real buttons over the painting for keyboard and screen readers ===== */
const Hot={els:new Map(),list:[],dirty:true,
  sync(){const s=D.scene;this.list=s&&s.hot?s.hot():[];const box=$('hot');const seen=new Set();const ins=D.insetRect();
    for(const h of this.list){seen.add(h.id);let e=this.els.get(h.id);
      if(!e){e=document.createElement('button');e.type='button';e.className='hs';e.dataset.id=h.id;e.addEventListener('click',()=>{D.poke();AU.resume();const x=this.list.find(z=>z.id===h.id);x&&x.on&&x.on()});box.append(e);this.els.set(h.id,e)}
      e.setAttribute('aria-label',h.label);const [sx,sy]=toStage(h.x,h.y);const k=L.fit.s*ins.s*L.U;const px=(sx*ins.s+ins.x)*L.U,py=(sy*ins.s+ins.y)*L.U;const w=Math.max(48,(h.r||50)*2*k);
      e.style.transform=`translate(${Math.round(px-w/2)}px,${Math.round(py-w/2)}px)`;e.style.width=w+'px';e.style.height=w+'px'}
    for(const [id,e] of this.els)if(!seen.has(id)){e.remove();this.els.delete(id)}}};

/* ===== Input: tap/drag is the base layer; the optional camera feeds the same handlers ===== */
const Input={down:false,
  toRef(cxp,cyp){const r=svg.getBoundingClientRect();const ins=D.insetRect();const sx=((cxp-r.left)/L.U-ins.x)/ins.s,sy=((cyp-r.top)/L.U-ins.y)/ins.s;const [x,y]=fromStage(sx,sy);return{x,y,sx,sy}},
  ev(kind,p){D.poke();const s=D.scene;if(s&&s[kind])s[kind](p)}};
svg.addEventListener('pointerdown',e=>{AU.resume();try{svg.setPointerCapture(e.pointerId)}catch(_){}Input.down=true;Input.ev('down',Input.toRef(e.clientX,e.clientY));e.preventDefault()});
svg.addEventListener('pointermove',e=>{if(Input.down)Input.ev('move',Input.toRef(e.clientX,e.clientY))});
const pUp=e=>{if(!Input.down)return;Input.down=false;Input.ev('up',Input.toRef(e.clientX,e.clientY))};svg.addEventListener('pointerup',pUp);svg.addEventListener('pointercancel',pUp);
window.addEventListener('keydown',e=>{if(e.target&&e.target.closest&&e.target.closest('button'))return;const s=D.scene;D.poke();if(s&&s.key&&s.key(e.key))e.preventDefault()});

/* ===== Dev timing overlay (press T): each shot's elapsed time against its production target ===== */
const Timing={rows:{},cur:null,on:false,
  start(id){const r=this.rows[id]={id,t0:performance.now(),t1:null};this.cur=r},
  end(id){const r=this.rows[id];if(r)r.t1=performance.now()},
  fmt(s){s=Math.round(s);return`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`},
  render(){if(!this.on)return;let out='SHOT  TARGET  ACTUAL  DIFF\n';const ep={1:[0,0],2:[0,0]};
    for(const [id,name,tg] of TARGETS){const r=this.rows[id];const act=r?((r.t1||performance.now())-r.t0)/1000:null;const e=id[0]==='2'?2:1;ep[e][0]+=tg;if(act!=null)ep[e][1]+=act;
      out+=`${id.padEnd(5)} ${this.fmt(tg).padStart(6)}  ${act==null?'   -  ':this.fmt(act).padStart(6)}  ${act==null?'':(act-tg>=0?'+':'-')+this.fmt(Math.abs(act-tg))}${r&&!r.t1?'  ◀':''}  ${name}\n`}
    out+=`\nEp1 ${this.fmt(ep[1][1])} of ${this.fmt(ep[1][0])} (titles and transitions included in shot rows)\nEp2 ${this.fmt(ep[2][1])} of ${this.fmt(ep[2][0])}\nTimes are real seconds; QA fast-forward distorts them.`;$('dev').textContent=out}};
window.addEventListener('keydown',e=>{if((e.key==='t'||e.key==='T')&&!(e.target&&/INPUT|TEXTAREA/.test(e.target.tagName))){Timing.on=!Timing.on;$('dev').hidden=!Timing.on;Timing.render()}});
setInterval(()=>Timing.render(),500);
