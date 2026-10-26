/* ===== Stage: one SVG, recomposed (not cropped) for phone portrait ===== */
const Stage={svg:null,world:null,P:false,W:1600,H:900,
  init(){this.svg=$('stage');Pat.defs=el('defs',{},this.svg);this.world=grp(this.svg);this.measure()},
  measure(){const r=$('app').getBoundingClientRect();const P=r.width>0&&r.width/r.height<.9;const changed=P!==this.P;this.P=P;this.W=P?900:1600;this.H=P?1600:900;
    this.svg.setAttribute('viewBox',`0 0 ${this.W} ${this.H}`);return changed}};

/* ===== Captions: verbatim narration, read one sentence at a time ===== */
const Cap={skipLine:false,
  split(t){return t.match(/[^.!?]+[.!?]+["'”’]*\s*|[^.!?]+$/g)||[t]},
  show(parts,cur,cue){const p=$('capText');p.textContent='';parts.forEach((s,i)=>{const sp=document.createElement('span');sp.textContent=s;if(i===cur)sp.className='cur';else if(i<cur)sp.className='spent';p.appendChild(sp)});
    $('cap').classList.toggle('cue',!!cue);$('cap').hidden=false},
  hide(){$('cap').hidden=true},
  async say(text,tok){const parts=this.split(text);this.skipLine=false;
    for(let i=0;i<parts.length;i++){if(tok!==Dir.tok)return;this.show(parts,i);await Narr.speak(parts[i].trim());if(this.skipLine||tok!==Dir.tok)break}
    if(tok===Dir.tok)this.show(parts,parts.length)}};

/* ===== Activities: prompt, glowing targets, gentle hint at 9 s, automatic help at 15 s, never a failure ===== */
const Act={cur:null,nudgeAt:-1e9,
  run(spec,tok){return new Promise(res=>{this.cur={spec,tok,res,hits:new Set(),busy:{},t0:Clock.now,last:Clock.now,hinted:false,closing:false};
      $('instrText').textContent=spec.prompt;$('instrHint').hidden=true;$('bGo').hidden=true;const I=$('instr');I.hidden=false;I.classList.remove('pop');void I.offsetWidth;I.classList.add('pop');
      Cap.hide();AU.sfx('pop');Narr.speak(spec.prompt)})},
  active(key){const c=this.cur;if(!c||c.tok!==Dir.tok||c.closing)return false;if(!c.spec.keys.includes(key))return false;
    return c.spec.multi?!c.busy[key]:!c.hits.size},
  tick(){const c=this.cur;if(!c)return;if(c.tok!==Dir.tok){this.cur=null;return}if(c.closing)return;const idle=Clock.now-c.last;
    if(!c.hits.size){if(idle>9000&&!c.hinted){c.hinted=true;const h=$('instrHint');h.textContent=c.spec.hint||'Tap the glowing circle!';h.hidden=false;this.nudgeAt=Clock.now}
      if(idle>15000)this.hit(c.spec.autoKey||c.spec.keys[0],true)}
    else if(c.spec.multi&&!Object.values(c.busy).some(Boolean)&&idle>(c.spec.after||6000))this.finish()},
  async hit(key,auto){const c=this.cur;if(!c||!this.active(key))return;if(Narr.skipFn&&!auto)Narr.stop();
    c.hits.add(key);c.busy[key]=true;c.last=Clock.now;$('instrHint').hidden=true;
    if(c.spec.multi){$('bGo').hidden=false;$('bGo').textContent=c.spec.goLabel||'Continue'}
    try{await c.spec.onHit(key,!!auto)}catch(e){console.error(e)}
    if(this.cur!==c)return;c.busy[key]=false;c.last=Clock.now;
    if(!c.spec.multi)this.finish();else if(c.spec.max&&c.hits.size>=c.spec.max){c.spec.after=Math.min(c.spec.after||6000,1800)}},
  nudge(){if(this.cur)this.nudgeAt=Clock.now},
  skip(){const c=this.cur;if(!c)return;if(!c.hits.size)this.hit(c.spec.autoKey||c.spec.keys[0],true);else if(c.spec.multi)this.finish()},
  finish(){const c=this.cur;if(!c||c.closing)return;c.closing=true;$('instr').hidden=true;this.cur=null;c.res([...c.hits])},
  close(){this.cur=null;$('instr').hidden=true}};

/* ===== HUD ===== */
const NAMES=['Ocean of Wonders','The Great Churning','The Poison and the Protector','The Ocean’s Treasures','Lord Dhanvantari','What Is True Wealth?','The Gift of Life'];
const HUD={init(){const ol=$('progDots');NAMES.forEach((n,i)=>{const li=document.createElement('li');li.title=`Scene ${i+1}: ${n}`;
      li.innerHTML='<svg viewBox="-10 -12 20 20" aria-hidden="true"><path class="p" d="M0 6C-5 2-5-5 0-10C5-5 5 2 0 6Z"/><path class="p" d="M0 6C-7 5-9-1-9-4C-4-4-2-1 0 6Z"/><path class="p" d="M0 6C7 5 9-1 9-4C4-4 2-1 0 6Z"/></svg>';ol.appendChild(li)})},
  set(i){[...$('progDots').children].forEach((li,j)=>li.className=j<i?'done':j===i?'now':'');$('progName').textContent=`${i+1}. ${NAMES[i]}`;$('prog').setAttribute('aria-label',`Scene ${i+1} of 7: ${NAMES[i]}`)}};

/* ===== Director: runs one scene script at a time; a new token cancels everything from the old one ===== */
const Dir={tok:0,i:-1,sc:null,S:null,R:null,speed:1,started:false,
  base(){return{cz:1,cx:Stage.W/2,cy:Stage.H/2}},
  build(){const w=Stage.world;while(w.firstChild)w.removeChild(w.firstChild);[...Pat.defs.querySelectorAll('clipPath')].forEach(c=>c.remove());
    const cam=grp(w);const R=this.sc.build(cam,this.S,Stage.P,Stage.W,Stage.H)||{};R.cam=cam;R.hits=R.hits||{};border(w,Stage.W,Stage.H);this.R=R;this.apply(0)},
  preview(i){this.i=i;this.sc=SCENES[i];this.S=Object.assign(this.base(),this.sc.state());this.build();HUD.set(i)},
  relayout(){if(Stage.measure()&&this.sc){const cx=this.S.cx/(Stage.P?1600:900)*Stage.W,cy=this.S.cy/(Stage.P?900:1600)*Stage.H;
      this.S.cx=this.S.cz===1?Stage.W/2:cx;this.S.cy=this.S.cz===1?Stage.H/2:cy;this.build()}},
  veil(on){$('veil').classList.toggle('on',on);return new Promise(r=>setTimeout(r,on&&!RM&&this.speed<2?460:30))},
  async go(i){const tok=++this.tok;Tw.clear();Timers.clear();Narr.stop();Act.close();Cap.hide();$('endBar').hidden=true;
    if(i>=SCENES.length)return;if(this.started&&this.sc)await this.veil(true);if(tok!==this.tok)return;
    this.i=i;this.sc=SCENES[i];this.S=Object.assign(this.base(),this.sc.state());this.build();HUD.set(i);AU.setMood(this.sc.mood);if(i>0&&i<6)Store.reach(i);
    this.started=true;await this.veil(false);if(tok!==this.tok)return;
    try{await this.sc.run(this.ctx(tok),this.S);if(tok!==this.tok)return;if(i<SCENES.length-1)this.go(i+1);else this.finish()}
    catch(e){console.error(e);if(tok===this.tok){if(i<SCENES.length-1)this.go(i+1);else this.finish()}}},
  finish(){Cap.hide();$('endBar').hidden=false;$('bSkip').hidden=true;$('bNext').hidden=true;Store.reach(0);setTimeout(()=>$('bReplay').focus({preventScroll:true}),50)},
  ctx(tok){const live=()=>tok===this.tok,never=()=>new Promise(()=>{}),S=()=>this.S;
    return{live,
      say:t=>live()?Cap.say(t,tok).then(()=>live()?new Promise(r=>Timers.add(380,r)):never()):never(),
      wait:ms=>live()?new Promise(r=>Timers.add(ms,()=>live()&&r())):never(),
      tw:(props,ms,e)=>live()?Tw.to(S(),props,RM?Math.min(ms,500):ms,e).then(()=>live()?undefined:never()):never(),
      act:spec=>live()?Act.run(spec,tok):never(),
      sfx:n=>{if(live())AU.sfx(n)},
      R:()=>this.R}},
  /* per-frame: camera, scene drawing, glowing tap targets */
  apply(dt){const S=this.S,R=this.R;if(!R)return;const W=Stage.W,H=Stage.H;
    R.cam.setAttribute('transform',`translate(${f1(W/2)} ${f1(H/2)}) scale(${f1(S.cz*1000)/1000}) translate(${f1(-S.cx)} ${f1(-S.cy)})`);
    this.sc.update(R,S,Clock.now,dt);
    const strong=Clock.now-Act.nudgeAt<1600;
    for(const k in R.hits){const h=R.hits[k];const on=Act.active(k);
      if(!on){op(h.halo,0);continue}const pul=.5+.5*Math.sin(Clock.now*.005);
      op(h.halo,strong?.95:.45+.4*pul);tf(h.halo,h.cx,h.cy,(strong?1.08:1)+.05*pul,Clock.now*.02)}}};

/* ===== Input: delegated taps and keys on [data-hit] targets ===== */
function hitFrom(e){const t=e.target.closest&&e.target.closest('[data-hit]');return t?t.getAttribute('data-hit'):null}
function bindInput(){const st=$('stage');
  st.addEventListener('pointerdown',e=>{AU.resume();const k=hitFrom(e);if(k&&Act.active(k)){e.preventDefault();Act.hit(k)}else if(Act.cur)Act.nudge()});
  st.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const k=hitFrom(e);if(k){e.preventDefault();if(Act.active(k))Act.hit(k);else Act.nudge()}});
  $('bGo').addEventListener('click',()=>Act.finish());
  $('bSkip').addEventListener('click',()=>{if(Act.cur)Act.skip();else{Cap.skipLine=true;Narr.stop()}});
  $('bNext').addEventListener('click',()=>{if(!Dir.started)return;if(Dir.i<SCENES.length-1)Dir.go(Dir.i+1);else{Dir.tok++;Tw.finishAll();Narr.stop();Act.close();Dir.finish()}});
  $('bMute').addEventListener('click',()=>{const m=!AU.muted;AU.setMute(m);if(m&&Narr.ok)try{speechSynthesis.cancel()}catch(e){}
    $('bMute').setAttribute('aria-pressed',String(m));$('bMute').setAttribute('aria-label',m?'Turn sound on':'Mute sound');$('mWave').style.display=m?'none':'';$('mX').style.display=m?'':'none'});
  $('bMusic').addEventListener('click',()=>{const on=!AU.musicOn;AU.setMusic(on);$('bMusic').setAttribute('aria-pressed',String(on));$('bMusic').setAttribute('aria-label',on?'Music and sound effects on':'Music and sound effects off')});}
