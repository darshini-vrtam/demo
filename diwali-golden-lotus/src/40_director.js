/* ===== Director: plays shots in order, pauses for every activity, resumes on completion ===== */
const ABORT={abort:true};
const layers={scenes:null};
const D={token:0,speed:1,fast:false,qa:null,scene:null,old:null,q:Promise.resolve(),skipFn:null,curTask:null,lastInput:0,hintTimer:0,cc:true,
  mood:{pitch:1,rate:1,vol:1},actOn:false,
  guard(tok){if(tok!==this.token)throw ABORT},
  wait(ms){const tok=this.token;return new Promise((res,rej)=>Timers.add(ms,()=>tok===this.token?res():rej(ABORT)))},
  tw(o,p,ms,e){const tok=this.token;return tw(o,p,ms,e).then(()=>this.guard(tok))},
  /* fire-and-forget tween that never throws */
  go(o,p,ms,e){tw(o,p,ms,e).catch(()=>{})},
  poke(){this.lastInput=performance.now()},
  /* scenes cross-fade: the new scene sits below, the old one fades out (opacity is used only to cross-fade flat layers) */
  setScene(s,ms){const old=this.scene;this.scene=s;layers.scenes.insertBefore(s.root,layers.scenes.firstChild);s.relayout&&s.relayout();
    if(old){if(this.old&&this.old!==old){this.old.root.remove();this.old.dispose&&this.old.dispose()}this.old=old;const fo={a:1};const r=old.root;
      if(ms===0||this.fast){r.remove();old.dispose&&old.dispose();this.old=null}
      else tw(fo,{a:0},ms||900).then(()=>{r.remove();old.dispose&&old.dispose();if(this.old===old)this.old=null});
      old._fade=fo}Hot.dirty=true;return s},
  setMood(m){this.mood=Object.assign({pitch:1,rate:1,vol:1},m||{})},
  /* captions: verbatim text, paged by sentence so long lines stay readable */
  pages(segs){const lim=L.portrait?110:150;const out=[];const add=(v,t)=>{const parts=t.match(/[^.!?]+[.!?]+['"’”]*\s*|[^.!?]+$/g)||[t];let cur='';
      for(const p of parts){if((cur+p).length>lim&&cur){out.push({v,t:cur.trim()});cur=''}cur+=p}if(cur.trim())out.push({v,t:cur.trim()})};
    (typeof segs==='string'?[['narr',segs]]:segs).forEach(s=>add(s[0],s[1]));
    const pages=[];out.forEach(c=>{const last=pages[pages.length-1];if(last&&(last.text.length+c.t.length)<lim)last.parts.push(c),last.text+=' '+c.t;else pages.push({parts:[c],text:c.t})});return pages},
  showCap(who,text){const V=VOICE[who]||VOICE.narr;$('capWho').querySelector('b').textContent=V.name;$('capWho').querySelector('i').style.background=V.col;
    const ct=$('capText');ct.textContent=text;if(who==='chant')ct.setAttribute('lang','sa');else ct.removeAttribute('lang');$('cap').hidden=false;$('act').hidden=true},
  hideCap(){$('cap').hidden=true;if(this.actOn)$('act').hidden=false},
  /* say: segs is a string (Narrator) or a list of [voice,text]; cues are [substring, fn] fired when that word is reached.
     o.noCap keeps the activity row on screen (used when the Narrator reads an on-screen instruction aloud). */
  say(segs,o){o=o||{};const tok=this.token;const run=async()=>{this.guard(tok);const pages=this.pages(segs);let skipped=false;const cues=(o.cues||[]).map(c=>({s:c[0],fn:c[1],done:false}));
      const fire=(c)=>{if(!c.done){c.done=true;try{c.fn()}catch(e){console.error(e)}}};
      for(const pg of pages){if(skipped)break;
        for(const part of pg.parts){if(skipped)break;const my=cues.filter(c=>!c.done&&part.t.includes(c.s));const idx=my.map(c=>part.t.indexOf(c.s));
          const skipP=new Promise(r=>{this.skipFn=()=>{skipped=true;Speech.stop();r()}});if(!o.noCap)this.showCap(part.v,pg.text);
          if(part.v==='light'&&this.light)this.light.talking=true;
          const V=VOICE[part.v]||VOICE.narr;const est=part.t.length*62/(V.rate*(part.v==='narr'?this.mood.rate:1));const t0=T.now;
          let p;const onWord=ci=>{my.forEach((c,i)=>{if(ci>=idx[i]-1)fire(c)})};
          if(this.fast)p=new Promise(r=>setTimeout(r,20));
          else if(canSpeak(part.v))p=Promise.all([Speech.speak(part.v,part.t,this.mood,onWord),this.wait(500)]);
          else p=this.wait(Math.max(1600,est));
          const ticker=setInterval(()=>{const el=(T.now-t0);my.forEach((c,i)=>{if(el>=est*(idx[i]/part.t.length)*1.08)fire(c)})},60);
          Music.duck(true);try{await Promise.race([p,skipP])}finally{clearInterval(ticker);this.skipFn=null;Music.duck(false);if(this.light)this.light.talking=false}
          my.forEach(fire);this.guard(tok)}
        if(!this.fast&&!skipped)await this.wait(o.after==null?320:o.after)}
      cues.forEach(fire);if(!o.keep&&!o.noCap)this.hideCap()};
    const p=this.q.then(run,run);this.q=p.catch(()=>{});return p},
  skip(){if(this.skipFn){this.skipFn();return}if(this.curTask&&this.curTask.o.assist&&!this.curTask.assisting){this.curTask.assisting=true;this.curTask.o.assist(this.curTask);this.poke()}},
  /* ---- the activity row in the dock: instruction (with an icon), counter, controls ---- */
  instr(ins,cnt,icon){this.actOn=true;const el=$('ins');el.innerHTML='';if(icon)el.insertAdjacentHTML('beforeend',ICON[icon]||'');el.append(document.createTextNode(ins||''));
    el.classList.remove('hint');this.baseIns=el.innerHTML;$('actText').hidden=!ins&&!cnt;$('cnt').textContent=cnt||'';$('cnt').hidden=!cnt;if($('cap').hidden)$('act').hidden=false},
  /* show an on-screen instruction and have the Narrator read it aloud */
  async ask(ins,cnt,icon){this.instr(ins,cnt,icon);await this.say(ins,{noCap:true})},
  counter(t){$('cnt').textContent=t;$('cnt').hidden=!t},
  hint(t,ms){const el=$('ins');el.innerHTML='';el.insertAdjacentHTML('beforeend',ICON.leaf);el.append(document.createTextNode(t));el.classList.add('hint');clearTimeout(this.hintTimer);
    this.hintTimer=setTimeout(()=>{el.innerHTML=this.baseIns||'';el.classList.remove('hint')},ms||6000)},
  controls(list){const box=$('ctrl');box.innerHTML='';const els={};(list||[]).forEach(b=>{const e=document.createElement('button');e.type='button';e.className='big'+(b.cls?' '+b.cls:'');e.id=b.id;
      e.innerHTML=b.html||'';if(!b.html)e.textContent=b.label;if(b.aria)e.setAttribute('aria-label',b.aria);if(b.hidden)e.hidden=true;e.addEventListener('click',()=>{D.poke();AU.resume();b.on&&b.on()});box.append(e);els[b.id]=e});return els},
  clearAct(){this.actOn=false;$('act').hidden=true;$('ctrl').innerHTML='';$('ins').textContent='';$('cnt').textContent='';clearTimeout(this.hintTimer)},
  late(){if(this.qa&&this.qa.stop==='late'&&this.qa.at===this.qa.cur){this.qa.paused=true;return new Promise(()=>{})}return Promise.resolve()},
  /* a task inside an activity: the child acts; after ~15 s idle a hint (and a demonstration), then the story gently assists */
  task(o){const tok=this.token;return new Promise((res,rej)=>{const t={o,done:false,assisting:false,finish:()=>{if(t.done)return;t.done=true;if(this.curTask===t)this.curTask=null;clearInterval(iv);res()}};
    this.curTask=t;this.poke();let stage=0;
    const qaStop=this.qa&&this.qa.stop==='act'&&this.qa.at===this.qa.cur;
    const iv=setInterval(()=>{if(tok!==this.token){clearInterval(iv);if(this.curTask===t)this.curTask=null;rej(ABORT);return}if(t.done)return;
      if(qaStop){this.qa.paused=true;return}
      if(this.fast){if(!t.assisting){t.assisting=true;o.assist&&o.assist(t)}return}
      const idle=(performance.now()-this.lastInput)/1000;
      if(stage===0&&idle>(o.idle||15)){stage=1;this.poke();o.demo&&o.demo();if(o.hint){this.hint(o.hint,8000);this.say(o.hint,{noCap:true}).catch(()=>{})}}
      else if(stage===1&&idle>(o.idle2||9)&&!t.assisting){stage=2;t.assisting=true;o.assist&&o.assist(t)}},this.fast?20:250);
    if(o.start)o.start(t)})}};
const ICON={tap:'<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="7" fill="#F5C400" stroke="#111111" stroke-width="3"/><circle cx="20" cy="20" r="15" fill="none" stroke="#111111" stroke-width="2.6" stroke-dasharray="4 4"/></svg>',
  ear:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M8 20h4M16 12v16M22 6v28M28 12v16M34 18v4" stroke="#111111" stroke-width="3.6" stroke-linecap="round"/></svg>',
  say:'<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="15" cy="17" r="9" fill="#D9964B" stroke="#111111" stroke-width="3"/><path d="M15 26v8M26 12q6 5 0 10M30 8q10 9 0 18" fill="none" stroke="#111111" stroke-width="3" stroke-linecap="round"/></svg>',
  together:'<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="13" cy="15" r="7" fill="#D9964B" stroke="#111111" stroke-width="3"/><circle cx="27" cy="15" r="7" fill="#C25E3A" stroke="#111111" stroke-width="3"/><path d="M4 34q9-12 18 0M18 34q9-12 18 0" fill="none" stroke="#111111" stroke-width="3"/></svg>',
  leaf:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M8 32C8 16 18 8 34 8C34 24 24 32 8 32Z" fill="#3F9B49" stroke="#111111" stroke-width="3"/><path d="M10 30L28 14" stroke="#111111" stroke-width="2"/></svg>',
  lotus:'<svg viewBox="-20 -16 40 30" aria-hidden="true"><path d="M0 10C-6 2 -6 -8 0 -14C6 -8 6 2 0 10Z" fill="#E45C9A" stroke="#111111" stroke-width="2.2"/><path d="M0 10C-10 6 -16 -2 -16 -8C-8 -6 -3 0 0 10ZM0 10C10 6 16 -2 16 -8C8 -6 3 0 0 10Z" fill="#F2755E" stroke="#111111" stroke-width="2.2"/></svg>'};

/* ===== Tap targets: real buttons over the painting for keyboard and screen readers ===== */
const Hot={els:new Map(),list:[],dirty:true,
  sync(){const s=D.scene;this.list=s&&s.hot?s.hot():[];const box=$('hot');const seen=new Set();
    for(const h of this.list){seen.add(h.id);let e=this.els.get(h.id);
      if(!e){e=document.createElement('button');e.type='button';e.className='hs';e.dataset.id=h.id;e.addEventListener('click',()=>{D.poke();AU.resume();const x=this.list.find(z=>z.id===h.id);x&&x.on&&x.on()});box.append(e);this.els.set(h.id,e)}
      e.setAttribute('aria-label',h.label);const [sx,sy]=toStage(h.x,h.y);const k=L.fit.s*L.U;const px=sx*L.U,py=sy*L.U;const w=Math.max(48,(h.r||50)*2*k);
      e.style.transform=`translate(${Math.round(px-w/2)}px,${Math.round(py-w/2)}px)`;e.style.width=w+'px';e.style.height=w+'px'}
    for(const [id,e] of this.els)if(!seen.has(id)){e.remove();this.els.delete(id)}}};

/* ===== Input: tap/drag is the base layer; the optional camera feeds the same handlers ===== */
const Input={down:false,
  toRef(cxp,cyp){const r=svg.getBoundingClientRect();const sx=(cxp-r.left)/L.U,sy=(cyp-r.top)/L.U;const [x,y]=fromStage(sx,sy);return{x,y,sx,sy}},
  ev(kind,p){D.poke();const s=D.scene;if(s&&s[kind])s[kind](p)}};
svg.addEventListener('pointerdown',e=>{AU.resume();try{svg.setPointerCapture(e.pointerId)}catch(_){}Input.down=true;Input.ev('down',Input.toRef(e.clientX,e.clientY));e.preventDefault()});
svg.addEventListener('pointermove',e=>{if(Input.down)Input.ev('move',Input.toRef(e.clientX,e.clientY))});
const pUp=e=>{if(!Input.down)return;Input.down=false;Input.ev('up',Input.toRef(e.clientX,e.clientY))};svg.addEventListener('pointerup',pUp);svg.addEventListener('pointercancel',pUp);
window.addEventListener('keydown',e=>{D.poke()});
/* the script's mood tags set the Narrator's pace, pitch and volume; they are never spoken */
const MOOD={wonder:{rate:.9,pitch:1.02},plain:{},suspense:{rate:.86,pitch:.97,vol:.95},excited:{rate:1,pitch:1.05},reverent:{rate:.84,pitch:.97,vol:.92},
  warm:{rate:.9,pitch:1},gentle:{rate:.88,pitch:1,vol:.95},curious:{rate:.92,pitch:1.04}};
function mood(k){D.moodKey=k;D.setMood(MOOD[k]||{})}
