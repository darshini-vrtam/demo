/* ===== Director: plays shots in order, pauses for decisions and activities ===== */
const $=id=>document.getElementById(id);
const ABORT={abort:true};
const D={token:0,speed:1,fast:false,qa:null,cast:{},scene:null,inset:0,black:0,trans:null,q:Promise.resolve(),skipFn:null,act:null,lastInput:0,resumed:false,faceExpr:null,
  guard(tok){if(tok!==this.token)throw ABORT},
  wait(ms){const tok=this.token;return new Promise((res,rej)=>Timers.add(ms,()=>tok===this.token?res():rej(ABORT)))},
  tw(o,p,ms,e){const tok=this.token;return tw(o,p,ms,e).then(()=>this.guard(tok))},
  setScene(s,how,ms){if(how&&how!=='cut'&&this.scene){const snap=document.createElement('canvas');snap.width=cv.width;snap.height=cv.height;snap.getContext('2d').drawImage(cv,0,0);
      this.trans={snap,t0:T.now,ms:ms||(how==='wipe'?1100:800),how}}
    this.scene=s;this.cast=s.cast||{};this.inset=0},
  chip(text){const c=$('chip');c.textContent=text&&L.pw<560?text.split(' · ')[0]:text;c.hidden=!text},
  /* captions: verbatim text, paged by sentence so long lines stay readable */
  chunks(segs,who){const lim=L.portrait?118:128;const out=[];const add=(v,t)=>{const parts=t.match(/[^.!?…]+[.!?…]+['"’”]*\s*|[^.!?…]+$/g)||[t];let cur='';
      for(const p of parts){if((cur+p).length>lim&&cur){out.push({v,t:cur.trim()});cur=''}cur+=p}if(cur.trim())out.push({v,t:cur.trim()})};
    (Array.isArray(segs)?segs:[segs]).forEach(s=>Array.isArray(s)?add(s[0],s[1]):add(who,s));
    /* merge tiny neighbouring chunks spoken by different voices into one caption page */
    const pages=[];out.forEach(c=>{const last=pages[pages.length-1];if(last&&(last.text.length+c.t.length)<lim)last.parts.push(c),last.text+=' '+c.t;else pages.push({parts:[c],text:c.t})});return pages},
  showCap(who,text,sfx){const V=VOICE[who]||VOICE.dadi;$('capWho').querySelector('b').textContent=V.name;$('capWho').querySelector('i').style.background=V.col;
    const t=$('capText');t.textContent=text;t.className=sfx?'sfx':'';$('cap').hidden=false},
  hideCap(){$('cap').hidden=true},
  say(who,segs,o){o=o||{};const tok=this.token;const run=async()=>{this.guard(tok);const pages=this.chunks(segs,who);let skipped=false;
      for(const pg of pages){if(skipped)break;this.showCap(who,pg.text,o.sfx);
        for(const part of pg.parts){if(skipped)break;const a=this.cast[part.v];if(a)a.talking=true;
          const skipP=new Promise(r=>{this.skipFn=()=>{skipped=true;Speech.stop();r()}});
          let p;if(this.fast)p=new Promise(r=>setTimeout(r,25));
          else if(Speech.available()&&!AU.muted)p=Promise.all([Speech.speak(part.v,part.t,o.vol),this.wait(500)]);
          else p=this.wait(Math.max(1500,part.t.length*60));
          Music.duck&&Music.duck(true);await Promise.race([p,skipP]);this.skipFn=null;if(a)a.talking=false;this.guard(tok)}
        if(!this.fast&&!skipped)await this.wait(o.after==null?260:o.after)}
      if(!o.keep)this.hideCap()};
    const p=this.q.then(run,run);this.q=p.catch(()=>{});return p},
  sfxLine(name,text,o){AU.sfx(name);return this.say('sfx',text,Object.assign({sfx:true},o))},
  skip(){if(this.act&&this.act.assist&&!this.skipFn){this.act.assist();this.lastInput=performance.now();return}if(this.skipFn)this.skipFn()},
  /* ---- decisions: two large picture cards, read aloud, never a wrong answer ---- */
  async choice(id,cards){const tok=this.token;const tray=$('tray');tray.innerHTML='';this.hideCap();let picked=null,resolve;const done=new Promise(r=>resolve=r);
    const els=cards.map((c,i)=>{const b=document.createElement('button');b.className='card';b.type='button';b.setAttribute('aria-label',c.label);
      const cnv=document.createElement('canvas');const sp=document.createElement('span');const narrow=L.pw<620;sp.textContent=c.title&&narrow?c.title:c.label;b.append(cnv,sp);tray.append(b);
      b.addEventListener('click',()=>{if(picked)return;picked=c.key;AU.sfx('card');Speech.stop();if(this.skipFn)this.skipFn();els.forEach((e,j)=>e.b.classList.add(j===i?'picked':'dim'));resolve(c.key)});return{b,cnv,c}});
    tray.hidden=false;
    await new Promise(r=>requestAnimationFrame(r));
    els.forEach(({cnv,c})=>{const r=cnv.getBoundingClientRect(),dp=Math.min(2,devicePixelRatio||1);cnv.width=Math.max(10,r.width*dp);cnv.height=Math.max(10,r.height*dp);
      const g=cnv.getContext('2d');const s=cnv.width/400;g.setTransform(s,0,0,s,0,0);paintCardFrame(g,400,250);try{c.draw(g,400,250)}catch(e){}});
    this.trayPx=tray.getBoundingClientRect().height;tw(this,{inset:1},this.fast?10:700);
    if(this.qa&&this.qa.stop==='choice'&&this.qa.at===this.qa.cur){this.qa.paused=true;await new Promise(()=>{})}
    if(this.fast){await this.wait(20);els[this.qa&&this.qa.pick==='B'?1:0].b.click()}
    (async()=>{for(const e of els){if(picked)break;e.b.classList.add('reading');await this.say('dadi',e.c.label,{after:150}).catch(()=>{});e.b.classList.remove('reading')}this.hideCap()})();
    let nag=setInterval(()=>{if(picked){clearInterval(nag);return}els.forEach(e=>{e.b.classList.remove('pulse');void e.b.offsetWidth;e.b.classList.add('pulse')})},16000);
    const key=await done;clearInterval(nag);Store.choice(id,key);await this.wait(this.fast?5:650);this.guard(tok);
    tw(this,{inset:0},this.fast?10:600);tray.hidden=true;tray.innerHTML='';await this.wait(this.fast?5:500);this.guard(tok);return key},
  /* ---- activities: setup, act (with idle hint then auto-assist), outcome ---- */
  async activity(spec){const tok=this.token;this.act=spec;this.lastInput=performance.now();let stage=0,done=false;const p=spec.start().then(()=>{done=true});
    if(this.qa&&this.qa.stop==='act'&&this.qa.at===this.qa.cur){await this.wait(this.qa.wait||40);this.qa.paused=true;await new Promise(()=>{})}
    try{while(!done){await new Promise(r=>setTimeout(r,this.fast?15:250));this.guard(tok);
      if(this.fast){spec.assist&&spec.assist();continue}
      const idle=(performance.now()-this.lastInput)/1000;
      if(stage===0&&idle>15){stage=1;this.lastInput=performance.now();spec.hint&&spec.hint()}
      else if(stage===1&&idle>10){stage=0;this.lastInput=performance.now();spec.assist&&spec.assist()}}
    await p}finally{this.act=null}},
  insetRect(){if(this.inset<=0.001)return{x:0,y:0,s:1};const px=this.trayPx||L.ph*.4;const st=clamp((L.ph-px-26)/L.ph,.34,1);const s=lerp(1,st,this.inset);
    return{x:(L.W-L.W*s)/2,y:lerp(0,12/L.U,this.inset),s}}};
function paintCardFrame(g,w,h){g.fillStyle=C.ivory;g.fillRect(0,0,w,h);g.fillStyle=C.terra;g.fillRect(0,0,w,14);g.fillRect(0,h-14,w,14);
  for(let x=10;x<w;x+=28){dot(g,x,7,4,C.mustard);dot(g,x,h-7,4,C.mustard)}g.fillStyle=ca(C.mustard,.25);g.fillRect(0,h*.72,w,h*.28-14)}

/* ===== Input: tap/drag is the base layer; hand-pinch feeds the same handlers ===== */
const Input={toLogical(cxp,cyp){const r=cv.getBoundingClientRect();const x=(cxp-r.left)/L.U,y=(cyp-r.top)/L.U;const ins=D.insetRect();return{x:(x-ins.x)/ins.s,y:(y-ins.y)/ins.s}},
  down(p){D.lastInput=performance.now();AU.resume();const s=D.scene;if(s&&s.down)s.down(p)},
  move(p){const s=D.scene;this.hover=p;if(s&&s.move)s.move(p)},
  up(p){const s=D.scene;if(s&&s.up)s.up(p)}};
cv.addEventListener('pointerdown',e=>{try{cv.setPointerCapture(e.pointerId)}catch(_){}Input.down(Input.toLogical(e.clientX,e.clientY));e.preventDefault()});
cv.addEventListener('pointermove',e=>{if(e.pointerType==='mouse'||e.buttons||e.pressure>0)Input.move(Input.toLogical(e.clientX,e.clientY))});
cv.addEventListener('pointerup',e=>Input.up(Input.toLogical(e.clientX,e.clientY)));
cv.addEventListener('pointercancel',e=>Input.up(Input.toLogical(e.clientX,e.clientY)));
window.addEventListener('keydown',e=>{const s=D.scene;D.lastInput=performance.now();if(s&&s.key&&s.key(e.key))e.preventDefault()});
const near=(p,x,y,r)=>p&&Math.hypot(p.x-x,p.y-y)<=r;

/* ===== Optional camera magic: hand pinch + face expressions. Never required. ===== */
const Cam={state:'off',video:null,hand:null,pinch:false,face:null,busy:false,
  load(src){return new Promise((res,rej)=>{const s=document.createElement('script');s.src=src;s.crossOrigin='anonymous';s.onload=res;s.onerror=rej;document.head.append(s)})},
  async toggle(){const b=$('bCam');if(this.state==='on'){this.stop();return}if(this.state==='unavailable'||this.busy)return;this.busy=true;
    try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw 0;
      const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:320,height:240},audio:false});
      const v=document.createElement('video');v.muted=true;v.playsInline=true;v.srcObject=stream;await v.play();this.video=v;
      await this.load('https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/hands.js');
      await this.load('https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/face_mesh.js');
      const H=new window.Hands({locateFile:f=>'https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/'+f});H.setOptions({maxNumHands:1,modelComplexity:0,minDetectionConfidence:.6,minTrackingConfidence:.5});
      H.onResults(r=>this.onHands(r));const F=new window.FaceMesh({locateFile:f=>'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/'+f});
      F.setOptions({maxNumFaces:1,refineLandmarks:false,minDetectionConfidence:.6,minTrackingConfidence:.5});F.onResults(r=>this.onFace(r));
      await H.initialize();await F.initialize();this.H=H;this.F=F;this.state='on';b.setAttribute('aria-pressed','true');this.loop()}
    catch(e){this.fail()}finally{this.busy=false}},
  fail(){this.stop();this.state='unavailable';const b=$('bCam');b.setAttribute('aria-pressed','false');b.style.opacity='.45';b.title='Camera is not available here. Tap and drag work as usual.'},
  stop(){try{this.video&&this.video.srcObject&&this.video.srcObject.getTracks().forEach(t=>t.stop())}catch(e){}this.video=null;this.hand=null;this.face=null;D.faceExpr=null;
    if(this.pinch){this.pinch=false}if(this.state==='on')this.state='off';$('bCam').setAttribute('aria-pressed','false')},
  async loop(){let n=0;while(this.state==='on'&&this.video){try{if(n++%2===0)await this.H.send({image:this.video});else await this.F.send({image:this.video})}catch(e){this.fail();return}
    await new Promise(r=>setTimeout(r,40))}},
  onHands(r){const lm=r.multiHandLandmarks&&r.multiHandLandmarks[0];if(!lm){if(this.pinch){this.pinch=false;Input.up(this.hand)}this.hand=null;return}
    const ix=(1-lm[8].x)*L.pw,iy=lm[8].y*L.ph,r0=cv.getBoundingClientRect();const p=Input.toLogical(r0.left+ix,r0.top+iy);this.hand=p;
    const d=Math.hypot(lm[8].x-lm[4].x,lm[8].y-lm[4].y);if(!this.pinch&&d<.055){this.pinch=true;Input.down(p)}else if(this.pinch&&d>.09){this.pinch=false;Input.up(p)}else Input.move(p)},
  onFace(r){const f=r.multiFaceLandmarks&&r.multiFaceLandmarks[0];if(!f){D.faceExpr=null;return}const dd=(a,b)=>Math.hypot(f[a].x-f[b].x,f[a].y-f[b].y);
    const fh=dd(10,152),fw=dd(234,454),mouth=dd(13,14)/fh,smile=dd(61,291)/fw,eL=dd(159,145)/fh,eR=dd(386,374)/fh,brow=(dd(105,159)+dd(334,386))/2/fh;
    let e=null;if(mouth>.11)e='surprised';else if(Math.abs(eL-eR)>.018&&Math.min(eL,eR)<.02)e='silly';else if(smile>.44)e='happy';else if(brow<.055)e='brave';D.faceExpr=e}};
