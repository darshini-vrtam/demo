/* ===== Director: plays screens in order, pauses for every activity, never stalls ===== */
const ABORT={abort:true};
const sleepReal=ms=>new Promise(r=>setTimeout(r,ms));
function splitSentences(t){return(t.match(/[^.!?…]+[.!?…]+[’”'"]*\s*|[^.!?…]+$/g)||[t]).map(s=>s.trim()).filter(Boolean)}
const D={i:0,token:0,fast:false,speed:1,paused:false,done:new Array(10).fill(false),seenCh:new Set(),act:null,skipFn:null,lastInput:performance.now(),
  scene:null,trans:null,qa:null,hintAt:-1e9,
  guard(tok){if(tok!==this.token)throw ABORT},
  wait(ms){const tok=this.token;return new Promise((res,rej)=>Timers.add(this.fast?Math.min(ms,5):ms,()=>tok===this.token?res():rej(ABORT)))},
  tw(o,p,ms,e){const tok=this.token;return tw(o,p,this.fast?4:ms,e).then(()=>this.guard(tok))},
  poke(){this.lastInput=performance.now();AU.resume()},
  async untilPlaying(tok){while(this.paused&&!this.fast){await sleepReal(120);this.guard(tok)}},
  timed(text){const ms=Math.max(1800,text.split(/\s+/).length*390);return new Promise(res=>{const t0=performance.now();const iv=setInterval(()=>{if(this.paused){clearInterval(iv);res('stopped')}else if(performance.now()-t0>=ms){clearInterval(iv);res('end')}},100)})},
  /* narration: verbatim text, spoken sentence by sentence with the current sentence underlined */
  async say(text,o){o=o||{};const tok=this.token;this.guard(tok);const sents=splitSentences(text);UI.cap(sents);let skipped=false;
    for(let i=0;i<sents.length&&!skipped;i++){UI.capHL(i);
      for(;;){await this.untilPlaying(tok);const skipP=new Promise(r=>{this.skipFn=()=>{skipped=true;Speech.stop();r('skip')}});let p;
        if(this.fast)p=sleepReal(6);else if(Speech.available()&&!AU.muted)p=Speech.speak(sents[i]);else p=this.timed(sents[i]);
        await Promise.race([p,skipP]);this.skipFn=null;this.guard(tok);if(this.paused&&!skipped&&!this.fast)continue;break}
      if(!skipped)await this.wait(o.gap==null?260:o.gap)}
    UI.capHL(-1)},
  /* the takeaway line: shown on a small plaque and spoken */
  async remember(text){UI.remember(text);await this.say(text,{gap:600})},
  skip(){if(this.skipFn){this.skipFn();return}if(this.act&&this.act.spec.assist){this.poke();this.act.spec.assist()}},
  /* activity contract: the narrator sets it up, the child acts (characters react), the outcome lands and the story continues */
  async activity(spec){const tok=this.token;this.guard(tok);let resolve;const done=new Promise(r=>resolve=r);let fin=false;
    this.act={spec,complete:()=>{if(fin)return;fin=true;this.done[this.i]=true;UI.nav();UI.progress();resolve()}};
    UI.act(spec);if(spec.build)spec.build($('act'));this.lastInput=performance.now();
    const qaHold=this.qa&&this.qa.at===this.i&&this.qa.stop==='act';if(qaHold){this.fast=false;this.speed=1;this.qa.paused=true}
    if(spec.prompt&&spec.speak!==false&&!this.fast&&!AU.muted&&Speech.available())Speech.speak(spec.prompt);
    let stage=0;
    while(!fin){await sleepReal(this.fast?4:250);this.guard(tok);if(fin)break;
      if(this.fast){if(spec.assist)spec.assist();continue}if(qaHold)continue;
      if(this.paused){this.lastInput=performance.now();continue}
      const idle=(performance.now()-this.lastInput)/1000;
      if(stage===0&&idle>(spec.idle||15)){stage=1;this.lastInput=performance.now();this.hint(spec)}
      else if(stage===1&&idle>(spec.assistAfter||8)){stage=0;this.lastInput=performance.now();if(spec.assist)spec.assist()}}
    await done;this.guard(tok);this.act=null;UI.unpulse()},
  complete(){if(this.act)this.act.complete()},
  hint(spec){this.hintAt=T.now;UI.pulse();if(spec.hint){UI.status(spec.hint,true);if(!AU.muted&&Speech.available()&&!this.skipFn)Speech.speak(spec.hint)}},
  setScene(S,how){if(how!=='cut'&&this.scene&&!this.fast){const snap=document.createElement('canvas');snap.width=cv.width;snap.height=cv.height;try{snap.getContext('2d').drawImage(cv,0,0)}catch(e){}this.trans={snap,t0:T.now,ms:reduceMotion?400:900}}
    this.scene=S;if(S.enter)S.enter();cv.setAttribute('aria-label',S.alt||S.title)},
  /* a late-frame hold point for QA screenshots; in normal play it does nothing */
  async beforeOutro(){if(this.qa&&this.qa.at===this.i&&this.qa.stop==='end'){this.fast=false;this.speed=1;this.qa.paused=true;await new Promise(()=>{})}},
  go(i,o){o=o||{};if(i<0||i>=SCREENS.length)return;this.token++;Tw.kill();Timers.kill();Speech.stop();Mantra.stop();this.act=null;this.skipFn=null;this.paused=false;UI.reset();
    this.run(i,o)},
  async run(i,o){const tok=this.token;this.i=i;const S=SCREENS[i];
    try{const ch=CHAPTERS.find(c=>c.at===i);
      if(ch&&!o.noCard){const replay=this.seenCh.has(ch.id);this.seenCh.add(ch.id);UI.header(S);UI.progress();UI.nav();await UI.card(ch,tok);this.guard(tok);
        this.setScene(S,'fade');if(replay&&ch.prev){await this.wait(500);await this.say(ch.prev)}}
      else{this.setScene(S,o.cut?'cut':'fade');UI.header(S);UI.progress();UI.nav()}
      UI.header(S);UI.progress();UI.nav();
      await S.run(tok);this.guard(tok);this.done[i]=true;UI.progress();UI.nav();
      if(this.qa&&this.qa.at===i){this.fast=false;this.speed=1;this.qa.paused=true;return}
      if(i+1<SCREENS.length&&!S.final)this.go(i+1,{auto:true})}
    catch(e){if(e!==ABORT)console.error(e)}}};

/* ===== UI layer: header, 10-diya progress, captions, activity panel, plaque, cards ===== */
const DIYA_SVG='<svg viewBox="0 0 22 26" aria-hidden="true"><path class="fl" d="M12 2c3 4 4 7 0 11c-4-4-3-7 0-11z" fill="#F28C28" stroke="#1A1020" stroke-width="1.2"/><path class="fl" d="M12 6c1.2 2 1.4 3.6 0 5c-1.4-1.4-1.2-3 0-5z" fill="#E6B422"/><path class="cup" d="M2 15h18c-1 5-4 7-9 7s-8-2-9-7z" fill="#C9A24A" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
const UI={
  init(){const p=$('prog');for(let j=0;j<10;j++){const li=document.createElement('li');li.innerHTML=DIYA_SVG;p.append(li)}this.progress()},
  header(S){$('tScr').textContent='Book 2 · Dhanteras · '+S.label;$('tName').textContent=S.title;document.title=S.title+' · The Ocean of Treasures'},
  progress(){const lis=$('prog').children;let n=0;for(let j=0;j<lis.length;j++){const lit=D.done[j];if(lit)n++;lis[j].className=(lit?'lit ':'')+(j===D.i?'now':'')}
    $('prog').setAttribute('aria-label',`Story progress: screen ${D.i+1} of 10, ${n} completed`)},
  nav(){$('bPrev').disabled=D.i<=0;const can=D.done[D.i]&&D.i<SCREENS.length-1;$('bNext').disabled=!can;$('bNext').setAttribute('aria-label',can?'Next screen':'Next screen (finish the activity first)')},
  cap(sents){const el=$('cap');el.innerHTML='';sents.forEach((s,i)=>{const sp_=document.createElement('span');sp_.textContent=s+(i<sents.length-1?' ':'');el.append(sp_)})},
  capHL(i){const sp_=$('cap').children;for(let j=0;j<sp_.length;j++)sp_[j].classList.toggle('on',j===i)},
  act(spec){$('actHead').textContent=spec.head||'';$('prompt').textContent=spec.prompt||'';$('status').textContent=spec.status||'';$('act').innerHTML='';$('panel').classList.toggle('wide',!!spec.wide)},
  status(t,pulse){const el=$('status');el.textContent=t||'';if(pulse){el.classList.remove('pulse');void el.offsetWidth;el.classList.add('pulse')}},
  pulse(){document.querySelectorAll('#act .ab:not(.done):not([disabled]), #act .slot:not(.ok)').forEach(b=>{b.classList.remove('pulse');void b.offsetWidth;b.classList.add('pulse')});const p=$('prompt');p.classList.remove('pulse');void p.offsetWidth;p.classList.add('pulse')},
  unpulse(){document.querySelectorAll('.pulse').forEach(b=>b.classList.remove('pulse'))},
  /* the takeaway is spoken into the caption; a small "Remember" tag marks it there, so nothing covers the art */
  remember(t){$('remember').hidden=!t},
  reset(){$('cap').innerHTML='';this.act({});this.remember(null);$('ovl').innerHTML='';$('panel').classList.remove('wide');$('card').hidden=true},
  btn(label,o){o=o||{};const b=document.createElement('button');b.type='button';b.className='ab'+(o.main?' main':'')+(o.sm?' sm':'');if(o.icon)b.append(iconCanvas(o.icon,36));
    const s=document.createElement('span');s.textContent=label;if(o.sub){const sm=document.createElement('small');sm.textContent=o.sub;s.append(sm)}b.append(s);
    const tk=document.createElement('span');tk.className='tick';tk.textContent='✓';tk.setAttribute('aria-hidden','true');b.append(tk);
    if(o.aria)b.setAttribute('aria-label',o.aria);if(o.pressed!=null)b.setAttribute('aria-pressed',String(o.pressed));
    b.addEventListener('click',e=>{e.stopPropagation();D.poke();if(o.on)o.on(b)});return b},
  markDone(b,label){b.classList.add('done');if(label)b.setAttribute('aria-label',label)},
  card(ch,tok){return new Promise(res=>{const el=$('card');$('cardKick').textContent=ch.kick;$('cardTitle').textContent=ch.title;$('cardSub').textContent=ch.sub||'';el.hidden=false;
    let done=false;const fin=()=>{if(done)return;done=true;el.hidden=true;el.removeEventListener('click',fin);res()};el.addEventListener('click',fin);
    if(D.fast){setTimeout(fin,5);return}
    if(!AU.muted&&Speech.available())Speech.speak(ch.kick.replace(/·/g,'.')+'. '+ch.title+'.').then(()=>setTimeout(fin,700));else setTimeout(fin,2800);
    setTimeout(fin,9000);const chk=setInterval(()=>{if(tok!==D.token){clearInterval(chk);fin()}if(done)clearInterval(chk)},200)})},
  toast(t,ms){const el=$('toast');el.textContent=t;el.hidden=false;clearTimeout(this._tt);this._tt=setTimeout(()=>el.hidden=true,ms||3200)},
  relayout(){const pr=$('prayer');if(pr){const want=L.portrait?$('act'):$('ovl');if(pr.parentNode!==want)want.prepend(pr)}}};
