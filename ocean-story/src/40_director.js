/* ===== Director: plays shots in order, pauses for every activity, resumes on completion ===== */
const ABORT={abort:true};
const D={token:0,speed:1,fast:false,qa:null,scene:null,inset:0,trayPx:0,trans:null,q:Promise.resolve(),skipFn:null,act:null,lastInput:0,hintTimer:0,
  guard(tok){if(tok!==this.token)throw ABORT},
  wait(ms){const tok=this.token;return new Promise((res,rej)=>Timers.add(ms,()=>tok===this.token?res():rej(ABORT)))},
  tw(o,p,ms,e){const tok=this.token;return tw(o,p,RM&&ms>200&&!(e==='lin')?Math.min(ms,600):ms,e).then(()=>this.guard(tok))},
  setScene(s,how,ms){if(how&&how!=='cut'&&this.scene){const snap=document.createElement('canvas');snap.width=cv.width;snap.height=cv.height;snap.getContext('2d').drawImage(cv,0,0);
      this.trans={snap,t0:T.now,ms:ms||800}}this.scene=s},
  chip(text){const c=$('chip');this.chipText=text;c.textContent=text&&L.pw<640?text.split(' · ')[0]:(text||'');c.hidden=!text},
  /* captions: verbatim text, paged by sentence so long lines stay readable */
  pages(segs){const lim=L.portrait?112:136;const out=[];const add=(v,t)=>{const parts=t.match(/[^.!?]+[.!?]+['"’”]*\s*|[^.!?]+$/g)||[t];let cur='';
      for(const p of parts){if((cur+p).length>lim&&cur){out.push({v,t:cur.trim()});cur=''}cur+=p}if(cur.trim())out.push({v,t:cur.trim()})};
    (Array.isArray(segs)?segs:[['nar',segs]]).forEach(s=>add(s[0],s[1]));
    const pages=[];out.forEach(c=>{const last=pages[pages.length-1];if(last&&(last.text.length+c.t.length)<lim&&last.parts[last.parts.length-1].v!==c.v)last.parts.push(c),last.text+=' '+c.t;else pages.push({parts:[c],text:c.t})});return pages},
  showCap(text){const t=$('capText');t.textContent=text;$('cap').hidden=false},
  hideCap(){$('cap').hidden=true},
  say(segs,o){o=o||{};const tok=this.token;const run=async()=>{this.guard(tok);const pages=this.pages(segs);let skipped=false;
      for(const pg of pages){if(skipped)break;if(!o.silentCap)this.showCap(pg.text);
        for(const part of pg.parts){if(skipped)break;const skipP=new Promise(r=>{this.skipFn=()=>{skipped=true;Speech.stop();r()}});
          let p;if(this.fast)p=new Promise(r=>setTimeout(r,20));
          else if(Speech.available()&&!AU.muted)p=Promise.all([Speech.speak(part.v,part.t),this.wait(500)]);
          else p=this.wait(Math.max(1800,part.t.length*62));
          Music.duck(true);await Promise.race([p,skipP]);this.skipFn=null;Music.duck(false);this.guard(tok)}
        if(!this.fast&&!skipped)await this.wait(o.after==null?380:o.after)}
      if(!o.keep&&!o.silentCap)this.hideCap()};
    const p=this.q.then(run,run);this.q=p.catch(()=>{});return p},
  skip(){if(this.skipFn){this.skipFn();return}if(this.act&&this.act.assist){this.act.assist();this.lastInput=performance.now()}},
  /* ---- the activity row in the dock: instruction, counter, controls ---- */
  instr(ins,cnt){this.hideCap();$('ins').textContent=ins||'';$('ins').classList.remove('hint');this.baseIns=ins||'';$('cnt').textContent=cnt||'';$('cnt').hidden=!cnt;$('act').hidden=false},
  counter(t){$('cnt').textContent=t;$('cnt').hidden=!t},
  hint(t,ms){const el=$('ins');el.textContent=t;el.classList.add('hint');clearTimeout(this.hintTimer);this.hintTimer=setTimeout(()=>{el.textContent=this.baseIns;el.classList.remove('hint')},ms||5000)},
  controls(list){const box=$('ctrl');box.innerHTML='';const els={};(list||[]).forEach(b=>{const e=document.createElement('button');e.type='button';e.className='big'+(b.cls?' '+b.cls:'');e.id=b.id;
      e.textContent=b.label;if(b.aria)e.setAttribute('aria-label',b.aria);if(b.disabled)e.disabled=true;e.addEventListener('click',()=>{D.poke();AU.resume();b.on&&b.on()});box.append(e);els[b.id]=e});return els},
  clearAct(){$('act').hidden=true;$('ctrl').innerHTML='';$('ins').textContent='';$('cnt').textContent='';clearTimeout(this.hintTimer)},
  poke(){this.lastInput=performance.now()},
  /* QA: pause on a late frame of a shot, before its transition */
  late(){if(this.qa&&this.qa.stop==='late'&&this.qa.at===this.qa.cur){this.qa.paused=true;return new Promise(()=>{})}return Promise.resolve()},
  /* ---- activity: the child acts; idle 15 s gives a hint, then the story gently assists ---- */
  async activity(spec){const tok=this.token;this.act=spec;this.poke();let stage=0,done=false;const p=spec.start().then(()=>{done=true});
    if(this.qa&&this.qa.stop==='act'&&this.qa.at===this.qa.cur){await this.wait(this.qa.wait||60);this.qa.paused=true;await new Promise(()=>{})}
    try{while(!done){await new Promise(r=>setTimeout(r,this.fast?20:250));this.guard(tok);
      if(this.fast){spec.assist&&spec.assist();continue}
      const idle=(performance.now()-this.lastInput)/1000;
      if(stage===0&&idle>15){stage=1;this.poke();spec.hint&&spec.hint()}
      else if(stage===1&&idle>10){stage=0;this.poke();spec.assist&&spec.assist()}}
    await p}finally{this.act=null}},
  /* when picture cards are showing, the painting shrinks into the space above them */
  insetRect(){if(this.inset<=0.001)return{x:0,y:0,s:1};const avail=L.ph-L.dockPx-this.trayPx-6;const st=clamp(avail/(L.Ha*L.U),.3,1);const s=lerp(1,st,this.inset);
    return{x:(L.W-L.W*s)/2,y:0,s}}};

/* ===== Picture-card tray (Scene 1.4 question, Scene 1.5 choices) ===== */
function paintCard(cnv,key){const r=cnv.getBoundingClientRect(),dp=Math.min(2,devicePixelRatio||1);cnv.width=Math.max(10,Math.round(r.width*dp));cnv.height=Math.max(10,Math.round(r.height*dp));
  const g=cnv.getContext('2d');const s=cnv.width/240;g.setTransform(s,0,0,s,0,0);g.lineCap='round';g.lineJoin='round';const h=cnv.height/s;
  g.fillStyle=C.cream;g.fillRect(0,0,240,h);g.save();g.beginPath();g.rect(0,0,240,h);g.rect(12,12,216,h-24);g.clip('evenodd');patDots(g,0,6,240,h,12,2.2,C.turmeric);g.restore();
  g.lineWidth=2.4;g.strokeStyle=C.ink;g.strokeRect(12,12,216,h-24);drawSymbol(g,key,120,h/2+4,Math.min(1,(h-40)/190))}
function tray(cards,o){const el=$('tray');el.innerHTML='';el.className='tray n'+cards.length;const btns=cards.map(c=>{const b=document.createElement('button');b.type='button';b.className='card';b.dataset.key=c.key;
    b.setAttribute('aria-pressed','false');const cnv=document.createElement('canvas');const sp=document.createElement('span');sp.textContent=c.label;b.append(cnv,sp);
    b.addEventListener('click',()=>{D.poke();AU.resume();o.on(c.key,b)});el.append(b);return b});
  el.hidden=false;return new Promise(r=>requestAnimationFrame(()=>{btns.forEach((b,i)=>paintCard(b.querySelector('canvas'),cards[i].key));D.trayPx=el.getBoundingClientRect().height;tw(D,{inset:1},D.fast?10:RM?200:650);r(btns)}))}
async function closeTray(){tw(D,{inset:0},D.fast?10:RM?200:550);await D.wait(D.fast?10:560).catch(()=>{});$('tray').hidden=true;$('tray').innerHTML=''}
window.addEventListener('resize',()=>{const el=$('tray');if(!el.hidden){D.trayPx=el.getBoundingClientRect().height;el.querySelectorAll('.card').forEach(b=>paintCard(b.querySelector('canvas'),b.dataset.key))}});

/* ===== Tap targets: real buttons laid over the painting (mouse, touch, keyboard, screen reader) ===== */
const Hot={els:new Map(),list:[],
  toScreen(x,y){const ins=D.insetRect();return[(x*ins.s+ins.x)*L.U,(y*ins.s+ins.y)*L.U,ins.s*L.U]},
  sync(list){this.list=list||[];const box=$('hot');const seen=new Set();
    for(const h of this.list){seen.add(h.id);let e=this.els.get(h.id);
      if(!e){e=document.createElement('button');e.type='button';e.className='hs';e.dataset.id=h.id;e.setAttribute('aria-label',h.label);
        e.addEventListener('click',ev=>{if(e._drag&&e._drag.moved)return;D.poke();AU.resume();const s=this.find(h.id);s&&s.on&&s.on()});
        if(h.drag)this.dragify(e,h.id);box.append(e);this.els.set(h.id,e)}
      e.setAttribute('aria-label',h.label);const [sx,sy,k]=this.toScreen(h.x,h.y);const w=Math.max(64,(h.w||h.r*2)*k),hh=Math.max(64,(h.h||h.r*2)*k);
      e.style.transform=`translate(${Math.round(sx-w/2)}px,${Math.round(sy-hh/2)}px)`;e.style.width=w+'px';e.style.height=hh+'px';e.style.borderRadius=h.w?'24px':'50%'}
    for(const [id,e] of this.els)if(!seen.has(id)){e.remove();this.els.delete(id)}},
  find(id){return this.list.find(h=>h.id===id)},
  focused(){const a=document.activeElement;if(!a||!a.classList||!a.classList.contains('hs')||!a.matches(':focus-visible'))return null;return this.find(a.dataset.id)},
  hit(p){for(const h of this.list){if(h.w){if(Math.abs(p.x-h.x)<h.w/2&&Math.abs(p.y-h.y)<h.h/2)return h}else if(Math.hypot(p.x-h.x,p.y-h.y)<h.r)return h}return null},
  dragify(e,id){e.addEventListener('pointerdown',ev=>{const h=this.find(id);if(!h)return;D.poke();AU.resume();try{e.setPointerCapture(ev.pointerId)}catch(_){}e._drag={x0:ev.clientX,moved:false};ev.preventDefault()});
    e.addEventListener('pointermove',ev=>{if(!e._drag)return;const dx=(ev.clientX-e._drag.x0)/(L.U*D.insetRect().s);if(Math.abs(dx)>8)e._drag.moved=true;const h=this.find(id);h&&h.onDrag&&h.onDrag(dx)});
    const end=()=>{if(!e._drag)return;const h=this.find(id);h&&h.onEnd&&h.onEnd();setTimeout(()=>{e._drag=null},0)};e.addEventListener('pointerup',end);e.addEventListener('pointercancel',end);
    e.addEventListener('keydown',ev=>{const h=this.find(id);if(!h||!h.key)return;if(h.key(ev.key)){ev.preventDefault();D.poke()}})}};
window.addEventListener('keydown',e=>{D.poke();const s=D.scene;if(e.target&&e.target.classList&&e.target.classList.contains('hs')&&e.target.dataset.id==='handle')return;if(s&&s.key&&s.key(e.key))e.preventDefault()});
const Input={toLogical(cxp,cyp){const r=cv.getBoundingClientRect();const x=(cxp-r.left)/L.U,y=(cyp-r.top)/L.U;const ins=D.insetRect();return{x:(x-ins.x)/ins.s,y:(y-ins.y)/ins.s}}};
cv.addEventListener('pointerdown',()=>{D.poke();AU.resume()});

/* ===== Optional camera: a hand pinch feeds the same tap targets. Never required; any failure falls back silently. ===== */
const Cam={state:'off',video:null,hand:null,pinch:false,busy:false,drag:null,
  load(src){return new Promise((res,rej)=>{const s=document.createElement('script');s.src=src;s.crossOrigin='anonymous';s.onload=res;s.onerror=rej;document.head.append(s)})},
  async toggle(){if(this.state==='on'){this.stop();return}if(this.busy)return;this.busy=true;
    try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw 0;
      const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:320,height:240},audio:false});
      const v=document.createElement('video');v.muted=true;v.playsInline=true;v.srcObject=stream;await v.play();this.video=v;
      const base='https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/';await this.load(base+'hands.js');
      const H=new window.Hands({locateFile:f=>base+f});H.setOptions({maxNumHands:1,modelComplexity:0,minDetectionConfidence:.6,minTrackingConfidence:.5});
      H.onResults(r=>this.onHands(r));await H.initialize();this.H=H;this.state='on';$('bCam').setAttribute('aria-pressed','true');this.loop()}
    catch(e){this.fail()}finally{this.busy=false}},
  fail(){this.stop();this.state='unavailable';$('bCam').hidden=true},
  stop(){try{this.video&&this.video.srcObject&&this.video.srcObject.getTracks().forEach(t=>t.stop())}catch(e){}this.video=null;this.hand=null;this.pinch=false;if(this.state==='on')this.state='off';$('bCam').setAttribute('aria-pressed','false')},
  async loop(){while(this.state==='on'&&this.video){try{await this.H.send({image:this.video})}catch(e){this.fail();return}await new Promise(r=>setTimeout(r,45))}},
  onHands(r){const lm=r.multiHandLandmarks&&r.multiHandLandmarks[0];if(!lm){this.release();this.hand=null;return}
    const r0=cv.getBoundingClientRect();const p=Input.toLogical(r0.left+(1-lm[8].x)*L.pw,r0.top+lm[8].y*L.ph);this.hand=p;
    const d=Math.hypot(lm[8].x-lm[4].x,lm[8].y-lm[4].y);
    if(!this.pinch&&d<.055){this.pinch=true;D.poke();const h=Hot.hit(p);if(h&&h.drag)this.drag={h,x0:p.x};else if(h&&h.on)h.on()}
    else if(this.pinch&&d>.09)this.release();else if(this.pinch&&this.drag){this.drag.h.onDrag&&this.drag.h.onDrag(p.x-this.drag.x0)}},
  release(){if(this.pinch&&this.drag){this.drag.h.onEnd&&this.drag.h.onEnd()}this.pinch=false;this.drag=null}};
