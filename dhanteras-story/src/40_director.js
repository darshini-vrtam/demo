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
    $('capText').textContent=text;$('cap').hidden=false;$('act').hidden=true;$('chant').hidden=true},
  hideCap(){$('cap').hidden=true;if(this.actOn)$('act').hidden=false},
  talk(who,on){const c=this.cast[who];if(!c)return;(Array.isArray(c)?c:[c]).forEach(a=>{if(a)a.talking=on})},
  /* say: segs is a string (Narrator) or a list of [voice,text]; cues are [substring, fn] fired when that word is reached */
  say(segs,o){o=o||{};const tok=this.token;const run=async()=>{this.guard(tok);const pages=this.pages(segs);let skipped=false;const cues=(o.cues||[]).map(c=>({s:c[0],fn:c[1],done:false}));
      const fire=(c)=>{if(!c.done){c.done=true;try{c.fn()}catch(e){console.error(e)}}};
      for(const pg of pages){if(skipped)break;this.showCap(pg.parts[0].v,pg.text);
        for(const part of pg.parts){if(skipped)break;const my=cues.filter(c=>!c.done&&part.t.includes(c.s));const idx=my.map(c=>part.t.indexOf(c.s));
          const skipP=new Promise(r=>{this.skipFn=()=>{skipped=true;Speech.stop();r()}});this.talk(part.v,true);this.showCap(part.v,pg.text);
          const est=part.t.length*62/((VOICE[part.v]||VOICE.narr).rate*(part.v==='narr'?this.mood.rate:1));const t0=T.now;
          let p;const onWord=ci=>{my.forEach((c,i)=>{if(ci>=idx[i]-1)fire(c)})};
          if(this.fast)p=new Promise(r=>setTimeout(r,20));
          else if(Speech.available()&&!AU.muted)p=Promise.all([Speech.speak(part.v,part.t,this.mood,onWord),this.wait(500)]);
          else p=this.wait(Math.max(1600,est));
          const ticker=setInterval(()=>{const el=(T.now-t0);my.forEach((c,i)=>{if(el>=est*(idx[i]/part.t.length)*1.08)fire(c)})},60);
          Music.duck(true);try{await Promise.race([p,skipP])}finally{clearInterval(ticker);this.skipFn=null;Music.duck(false);this.talk(part.v,false)}
          my.forEach(fire);this.guard(tok)}
        if(!this.fast&&!skipped)await this.wait(o.after==null?320:o.after)}
      cues.forEach(fire);if(!o.keep)this.hideCap()};
    const p=this.q.then(run,run);this.q=p.catch(()=>{});return p},
  skip(){if(this.skipFn){this.skipFn();return}if(this.chantSkip){this.chantSkip();return}if(this.curTask&&this.curTask.o.assist&&!this.curTask.assisting){this.curTask.assisting=true;this.curTask.o.assist(this.curTask);this.poke()}},
  /* chant card: large read-along words; the Narrator may say it first, then waits for the child; tap continues */
  async chant(text,o){o=o||{};const tok=this.token;await this.q;this.guard(tok);const box=$('chant'),tx=$('chantText');$('chantWho').textContent=o.who||'Say it together';
    tx.innerHTML='';const words=text.split(' ');const spans=words.map(w=>{const s=document.createElement('span');s.textContent=w;tx.append(s,document.createTextNode(' '));return s});
    let starts=[],c=0;words.forEach(w=>{starts.push(c);c+=w.length+1});
    $('cap').hidden=true;$('act').hidden=true;box.hidden=false;const hl=i=>spans.forEach((s,j)=>{s.classList.toggle('on',j===i);s.classList.toggle('done',j<i)});
    let skipped=false;const skipP=new Promise(r=>{this.chantSkip=()=>{skipped=true;Speech.stop();r()}});const tap=()=>{this.poke();this.chantSkip&&this.chantSkip()};
    box.onclick=tap;box.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();tap()}};
    try{if(o.narr&&!this.fast){const est=text.length*62/VOICE.narr.rate;const t0=T.now;let got=false;
        const iv=setInterval(()=>{if(got)return;const k=(T.now-t0)/est;let i=0;while(i<starts.length-1&&starts[i+1]<=k*text.length)i++;hl(i)},80);
        const sp=Speech.available()&&!AU.muted?Speech.speak('narr',text,this.mood,ci=>{got=true;let i=0;while(i<starts.length-1&&starts[i+1]<=ci)i++;hl(i)}):this.wait(Math.max(1800,est));
        this.talk('narr',true);await Promise.race([sp,skipP]);clearInterval(iv);this.guard(tok)}
      /* the child's turn: about 4 seconds, a slow sweep to read along */
      if(!skipped){o.onChild&&o.onChild();const per=this.fast?5:Math.max(380,(o.wait||4000)/words.length);for(let i=0;i<words.length&&!skipped;i++){hl(i);await Promise.race([this.wait(per),skipP])}
        hl(words.length);if(!skipped)await Promise.race([this.wait(this.fast?5:700),skipP])}
    }finally{this.chantSkip=null;box.onclick=null;box.onkeydown=null}
    this.guard(tok);box.hidden=true;if(this.actOn)$('act').hidden=false},
  /* ---- the activity row in the dock: instruction (with an icon), counter, controls ---- */
  instr(ins,cnt,icon){this.actOn=true;const el=$('ins');el.innerHTML='';if(icon)el.insertAdjacentHTML('beforeend',ICON[icon]||'');el.append(document.createTextNode(ins||''));
    el.classList.remove('hint');this.baseIns=el.innerHTML;$('cnt').textContent=cnt||'';$('cnt').hidden=!cnt;if($('cap').hidden&&$('chant').hidden)$('act').hidden=false},
  counter(t){$('cnt').textContent=t;$('cnt').hidden=!t},
  hint(t,ms){const el=$('ins');el.innerHTML='';el.insertAdjacentHTML('beforeend',ICON.leaf);el.append(document.createTextNode(t));el.classList.add('hint');clearTimeout(this.hintTimer);
    this.hintTimer=setTimeout(()=>{el.innerHTML=this.baseIns||'';el.classList.remove('hint')},ms||6000)},
  controls(list){const box=$('ctrl');box.innerHTML='';const els={};(list||[]).forEach(b=>{const e=document.createElement('button');e.type='button';e.className='big'+(b.cls?' '+b.cls:'');e.id=b.id;
      e.innerHTML=b.html||'';if(!b.html)e.textContent=b.label;if(b.aria)e.setAttribute('aria-label',b.aria);if(b.disabled)e.disabled=true;e.addEventListener('click',()=>{D.poke();AU.resume();b.on&&b.on()});box.append(e);els[b.id]=e});return els},
  clearAct(){this.actOn=false;$('act').hidden=true;$('ctrl').innerHTML='';$('ins').textContent='';$('cnt').textContent='';clearTimeout(this.hintTimer)},
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
      if(stage===0&&idle>15){stage=1;this.poke();o.demo&&o.demo();if(o.hint){this.hint(o.hint,8000);this.say(o.hint).catch(()=>{})}}
      else if(stage===1&&idle>10&&!t.assisting){stage=2;t.assisting=true;o.assist&&o.assist(t)}},this.fast?20:250);
    if(o.start)o.start(t)})},
  /* when picture cards are showing, the painting shrinks into the space above them */
  insetRect(){if(this.inset<=0.001)return{x:0,y:0,s:1};const avail=(L.ph-L.dockPx-this.trayPx-6)/L.U;const st=clamp(avail/L.Ha,.3,1);const s=lerp(1,st,this.inset);
    return{x:(L.W-L.W*s)/2,y:0,s}}};
const ICON={drag:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M6 20h28M6 20l6-6M6 20l6 6M34 20l-6-6M34 20l-6 6" fill="none" stroke="#111111" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  tap:'<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="7" fill="#F5B700" stroke="#111111" stroke-width="3"/><circle cx="20" cy="20" r="15" fill="none" stroke="#111111" stroke-width="2.6" stroke-dasharray="4 4"/></svg>',
  up:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 34V6M20 6l-8 8M20 6l8 8" fill="none" stroke="#111111" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  down:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 6v28M20 34l-8-8M20 34l8-8" fill="none" stroke="#111111" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  join:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M4 20h10M14 20l-5-5M14 20l-5 5M36 20H26M26 20l5-5M26 20l5 5" fill="none" stroke="#111111" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  hold:'<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="12" fill="#E45C9A" stroke="#111111" stroke-width="3"/><path d="M20 12v8l5 4" fill="none" stroke="#111111" stroke-width="3" stroke-linecap="round"/></svg>',
  rub:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M6 24c4-8 8 8 12 0s8 8 12 0s4-4 4-4" fill="none" stroke="#111111" stroke-width="3.4" stroke-linecap="round"/></svg>',
  circle:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M30 12A12 12 0 1 0 32 24" fill="none" stroke="#111111" stroke-width="3.4" stroke-linecap="round"/><path d="M32 24l-1-8M32 24l-7-3" fill="none" stroke="#111111" stroke-width="3.4" stroke-linecap="round"/></svg>',
  leaf:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M8 32C8 16 18 8 34 8C34 24 24 32 8 32Z" fill="#3F9B49" stroke="#111111" stroke-width="3"/><path d="M10 30L28 14" stroke="#111111" stroke-width="2"/></svg>'};

/* ===== Ocean Explorer lotus badge: one petal per activity, blooms fully in the closing ===== */
const Badge={petals:[],center:null,bloomK:0,
  build(){const s=$('badge').querySelector('svg');s.innerHTML='';const g=el('g',null,s);this.rings=el('g',null,g);
    for(let i=0;i<3;i++)el('circle',{r:40+i*7,fill:'none',stroke:i%2?P.turmeric:P.gold,'stroke-width':3,'stroke-dasharray':i%2?'.1 7':'',  'stroke-linecap':'round'},this.rings);
    this.petals=[];for(let i=0;i<7;i++){const a=-90+(i-3)*25.7;const pg=el('g',{transform:`rotate(${a+90})`},g);
      const p=el('path',{d:'M0 -6C-11 -16 -10 -34 0 -46C10 -34 11 -16 0 -6Z',fill:P.ivory,stroke:K,'stroke-width':3,'stroke-dasharray':'4 3'},pg);this.petals.push({g:pg,p,a})}
    el('path',{d:'M-30 6Q0 20 30 6Q0 -4 -30 6Z',fill:P.leaf,stroke:K,'stroke-width':3},g);this.center=el('circle',{cy:-4,r:8,fill:P.turmeric,stroke:K,'stroke-width':2.6},g);this.render()},
  render(){const pe=Store.data.petals;this.petals.forEach((p,i)=>{const on=pe[i];p.p.setAttribute('fill',on?(i%2?P.pink:P.turmeric):P.ivory);p.p.setAttribute('stroke-dasharray',on?'':'4 3')});
    op(this.rings,this.bloomK);$('badge').setAttribute('aria-label',`Ocean Explorer lotus badge: ${pe.reduce((a,b)=>a+b,0)} of 7 petals`)},
  gain(i){if(Store.data.petals[i])return;Store.data.petals[i]=1;Store.save();this.render();AU.sfx('chime');const p=this.petals[i];const o={k:0};
    tw(o,{k:1},900,'out').then(()=>p.g.setAttribute('transform',`rotate(${p.a+90})`));const step=()=>{if(o.k<1){p.g.setAttribute('transform',`rotate(${p.a+90}) scale(${f3(1+.35*Math.sin(o.k*Math.PI))})`);requestAnimationFrame(step)}};step()},
  bloom(){Store.data.petals=[1,1,1,1,1,1,1];Store.save();this.render();const o={k:0};tw(o,{k:1},2200,'out');const step=()=>{this.bloomK=o.k;op(this.rings,o.k);
    this.petals.forEach(p=>p.g.setAttribute('transform',`rotate(${f1((p.a+90)*(1+.18*o.k))}) scale(${f3(1+.15*o.k)})`));if(o.k<1)requestAnimationFrame(step)};step()}};

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

/* ===== Title cards: patterned panel; the words are page text, not painted into the picture ===== */
function titleScene(n){const s=mkScene('title');const R=()=>{s.bg.innerHTML='';const W=L.W,H=L.Ha;
    el('rect',{x:0,y:0,width:W,height:H,fill:Pat.u('stars',P.ivory,P.midnight,1)},s.bg);
    const o=ocean(s.bg,W,H*.78,H,{mood:n===4?'poison':n>=6?'divine':'wonder',n:3,scale:.8});s.oc=o;
    const c=grp(s.bg,{transform:`translate(${W/2} ${H*.46})`});const r=Math.min(W*.42,H*.42);circ(c,0,0,r+18,Pat.u('vine',P.leaf,P.ivory,.6),4);circ(c,0,0,r,n===4?P.violet:P.indigo,4);
    circ(c,0,0,r-14,'none',3,{stroke:P.turmeric,'stroke-dasharray':'.1 14','stroke-width':6,'stroke-linecap':'round'});
    for(const sd of[-1,1]){const l=lotus(c,{r:r*.26,n:7,open:.9});tf(l.g,sd*r*.7,r*.62,1)}
    border(s.bg,W,H,n===4?'violet':'vine')};
  s.relayout=R;s.update=(dt,t)=>{s.oc&&s.oc.update(t)};return s}
async function titleCard(n,title,o){o=o||{};D.chip('');D.clearAct();Store.data.ep=Math.max(Store.data.ep||1,n);Store.save();
  if(n>1||D.replay){if(D.resumed&&n===D.resumedAt||D.replay&&n===1){const line=PREV[n];if(line){D.setScene(titleScene(n),900);await D.wait(600);await D.say(line);D.resumed=false;D.replay=false}}}
  if(!D.scene||D.scene.id!=='title')D.setScene(titleScene(n),900);
  $('tEye').textContent=n<=7?`Episode ${n}`:'Closing';$('tTitle').textContent=title;$('tcard').hidden=false;
  await D.wait(700);await D.say(n<=7?`Episode ${n}. ${title}`:`${title}`);await D.wait(500);$('tcard').hidden=true}
/* "Previously..." lines, used only on resume or replay (builder additions) */
const PREV={1:'Previously, we sailed the Ocean of Wonders together. Let us sail again!',2:'Previously, we woke the sleeping Ocean of Wonders.',3:'Previously, Kurma held the mighty mountain steady.',
  4:'Previously, we pulled and churned the great ocean.',5:'Previously, Lord Shiva protected all of creation.',6:'Previously, the ocean revealed its wonderful treasures.',
  7:'Previously, Lord Dhanvantari rose with the pot of amrit.',8:'Previously, we filled our magical treasure pot.'};
