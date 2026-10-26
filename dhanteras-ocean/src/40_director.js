/* ===== Director: plays shots in order, pauses for every activity, never stalls ===== */
const ABORT={abort:true};
const D={token:0,speed:1,fast:false,qa:null,scene:null,q:Promise.resolve(),skipFn:null,act:null,lastInput:0,trans:null,chapter:0,shot:'00',
  guard(tok){if(tok!==this.token)throw ABORT},
  wait(ms){const tok=this.token;return new Promise((res,rej)=>Timers.add(this.fast?Math.min(ms,8):ms,()=>tok===this.token?res():rej(ABORT)))},
  tw(o,p,ms,e){const tok=this.token;return tw(o,p,this.fast?5:ms,e).then(()=>this.guard(tok))},
  setScene(s,how,ms){if(how!=='cut'&&this.scene){const snap=document.createElement('canvas');snap.width=cv.width;snap.height=cv.height;snap.getContext('2d').drawImage(cv,0,0);
      this.trans={snap,t0:T.now,ms:this.fast?10:(ms||900),how:how||'fade'}}this.scene=s;if(s.enter)s.enter()},
  title(text){UI.title(text)},
  /* captions: verbatim text paged by sentence; each page is spoken by its own voice */
  pages(segs,who){const lim=L.portrait?130:150;const out=[];const add=(v,t)=>{const parts=t.match(/[^.!?…]+[.!?…]+['"’”]*\s*|[^.!?…]+$/g)||[t];let cur='';
      for(const p of parts){if((cur+p).length>lim&&cur){out.push({v,t:cur.trim()});cur=''}cur+=p}if(cur.trim())out.push({v,t:cur.trim()})};
    (Array.isArray(segs)?segs:[segs]).forEach(s=>Array.isArray(s)?add(s[0],s[1]):add(who,s));
    const pg=[];out.forEach(c=>{const last=pg[pg.length-1];if(last&&(last.text.length+c.t.length)<lim&&!(c.v!==last.parts[0].v&&last.text.length>60))last.parts.push(c),last.text+=' '+c.t;else pg.push({parts:[c],text:c.t})});return pg},
  say(who,segs,o){o=o||{};const tok=this.token;const run=async()=>{this.guard(tok);let skipped=false;
      for(const pg of this.pages(segs,who)){if(skipped)break;UI.cap(pg.parts[0].v,pg.text,pg.parts.map(p=>p.v));
        for(const part of pg.parts){if(skipped)break;const sp=this.speakers(part.v);sp.forEach(a=>a.talking=true);
          const skipP=new Promise(r=>{this.skipFn=()=>{skipped=true;Speech.stop();r()}});let p;
          if(this.fast)p=new Promise(r=>setTimeout(r,15));
          else if(Speech.available()&&!AU.muted)p=Promise.all([Speech.speak(part.v,part.t),this.wait(400)]);
          else p=this.wait(Math.max(1800,part.t.length*62));
          await Promise.race([p,skipP]);this.skipFn=null;sp.forEach(a=>a.talking=false);this.guard(tok)}
        if(!skipped)await this.wait(o.after==null?240:o.after)}
      if(!o.keep)UI.cap(null)};
    const p=this.q.then(run,run);this.q=p.catch(()=>{});return p},
  speakers(v){const W=typeof World!=='undefined'?World:null;if(!W||!W.devas)return[];if(v==='devas')return W.devas;if(v==='asuras')return W.asuras;if(v==='both'||v==='all')return W.devas.concat(W.asuras);if(v==='vishnu')return[W.vishnu];return[]},
  skip(){if(this.skipFn){this.skipFn();return}if(this.act&&this.act.assist){this.act.assist();this.lastInput=performance.now()}},
  /* activity contract: start() sets up and resolves on completion; hint() after idle; assist() moves it forward */
  async activity(spec){const tok=this.token;this.act=spec;this.lastInput=performance.now();let stage=0,done=false;const p=spec.start().then(()=>{done=true});
    if(this.qa&&this.qa.stop==='act'&&this.qa.at===this.qa.cur){await new Promise(r=>setTimeout(r,300));this.fast=false;this.speed=1;this.qa.paused=true;if(this.qa.cap)UI.cap(this.qa.capWho||'story',this.qa.cap);await new Promise(()=>{})}
    try{while(!done){await new Promise(r=>setTimeout(r,this.fast?10:250));this.guard(tok);
      if(this.fast){spec.assist&&spec.assist();continue}
      const idle=(performance.now()-this.lastInput)/1000,hintAt=spec.idle||15;
      if(stage===0&&idle>hintAt){stage=1;this.lastInput=performance.now();spec.hint&&spec.hint()}
      else if(stage===1&&idle>(spec.assistAfter||8)){stage=0;this.lastInput=performance.now();spec.assist&&spec.assist()}}
      await p}finally{this.act=null;UI.plaque(null)}},
  /* step that waits for a tap/gesture or a timeout; returns 'child' or 'auto' */
  waitStep(ms,check){const tok=this.token;return new Promise(res=>{let t0=T.now;const iv=setInterval(()=>{if(tok!==this.token){clearInterval(iv);res('abort');return}
      if(this.fast||check()){clearInterval(iv);res(this.fast?'auto':'child')}else if(T.now-t0>ms){clearInterval(iv);res('auto')}},this.fast?5:60)})}};

/* ===== UI layer (L07): title plaque, progress, captions, instruction plaque, cards, collection strip ===== */
const UI={
  relayout(){},
  title(t){const el=$('title');if(!t){el.hidden=true;return}$('titleText').textContent=t;el.hidden=false},
  progress(shot){const i=SHOT_IDS.indexOf(shot);document.querySelectorAll('#prog i').forEach((e,j)=>{e.className=j<i?'done':j===i?'now':''});$('prog').setAttribute('aria-label',`Shot ${i+1} of ${SHOT_IDS.length}`)},
  cap(who,text,list){const el=$('cap');if(!who){el.hidden=true;return}const names=[...new Set(list||[who])];
    $('capWho').innerHTML='';names.forEach(n=>{const V=VOICE[n]||VOICE.story;const s=document.createElement('span');s.innerHTML='<i></i>';s.querySelector('i').style.background=V.col;s.append(V.name);$('capWho').append(s)});
    $('capText').textContent=text;el.hidden=false},
  /* small instruction plaque above the subtitles: icon, cue, action, buttons */
  plaque(o){const el=$('plaque');if(!o){el.hidden=true;el.innerHTML='';return}el.innerHTML='';
    const row=document.createElement('div');row.className='prow';
    if(o.icon){const c=document.createElement('canvas');c.width=c.height=96;const g=c.getContext('2d');g.scale(96/120,96/120);g.translate(60,60);try{o.icon(g)}catch(e){}
      if(o.onIcon){const b=document.createElement('button');b.type='button';b.className='picon glow';b.setAttribute('aria-label','Tap the glowing wave');b.append(c);b.addEventListener('click',ev=>{ev.stopPropagation();D.lastInput=performance.now();AU.resume();AU.sfx('tap');b.classList.remove('hit');void b.offsetWidth;b.classList.add('hit');o.onIcon()});row.append(b)}
      else{c.className='picon';row.append(c)}}
    if(o.slots){const sl=document.createElement('div');sl.className='slots';o.slots.forEach(t=>{const c=document.createElement('canvas');c.width=c.height=80;c.className=t.on?'on':'';c.title=t.label;c.setAttribute('role','img');c.setAttribute('aria-label',t.label+(t.on?', found':', not found yet'));
      const g=c.getContext('2d');g.scale(80/120,80/120);g.translate(60,60);if(!t.on){g.globalAlpha=.3}try{drawIcon(g,t.k,.8)}catch(e){}if(!t.on){g.globalAlpha=1;g.setLineDash([8,7]);ring(g,0,0,50,C.line,3)}sl.append(c)});row.append(sl)}
    const tx=document.createElement('div');tx.className='ptext';if(o.cue){const b=document.createElement('b');b.textContent=o.cue;tx.append(b)}if(o.sub){const s=document.createElement('span');s.textContent=o.sub;tx.append(s)}row.append(tx);
    const bt=document.createElement('div');bt.className='pbtns';(o.buttons||[]).forEach(b=>{const e=document.createElement('button');e.type='button';e.className='pbtn'+(b.main?' main':'')+(b.small?' small':'');e.textContent=b.label;
      if(b.id)e.id=b.id;e.addEventListener('click',ev=>{ev.stopPropagation();D.lastInput=performance.now();AU.resume();b.on()});bt.append(e)});if(o.buttons&&o.buttons.length)row.append(bt);
    el.append(row);el.hidden=false;if(o.flash){el.classList.remove('flash');void el.offsetWidth;el.classList.add('flash')}},
  strip(){const el=$('strip');const d=Store.data;const items=['lotus','jewel','conch','leaf','heart','diya'];const have=new Set([...d.treasures,...d.gifts]);
    if(!have.size&&!this.stripOn){el.hidden=true;return}el.hidden=false;el.innerHTML='';
    const order=[...d.treasures,...['lotus','jewel','conch'].filter(k=>!d.treasures.includes(k)),'leaf','heart','diya'];
    order.forEach(k=>{const c=document.createElement('canvas');c.width=c.height=64;c.title=k;c.className=have.has(k)?'on':'';const g=c.getContext('2d');g.scale(64/120,64/120);g.translate(60,60);
      try{if(!have.has(k))g.globalAlpha=.35;drawIcon(g,k,.66)}catch(e){}el.append(c)});void items}};
/* small icons for plaques and the strip, drawn in a 120x120 box centred at 0,0 */
function drawIcon(g,k,s){s=s||1;T.sec=T.sec||0;
  if(k==='lotus')drawLotus(g,0,26*s,s*.9,1);else if(k==='jewel')drawJewel(g,0,0,s*.9);else if(k==='conch')drawConch(g,0,0,s*.7);
  else if(k==='leaf'||k==='heart'||k==='diya')drawGift(g,k,0,0,s*.6,1,0,0);
  else if(k==='wave'){g.save();g.scale(s,s);for(let i=0;i<3;i++){const y=-20+i*22;const p=new Path2D();p.moveTo(-50,y);for(let x=-50;x<50;x+=25)p.quadraticCurveTo(x+12.5,y-16,x+25,y);dbl(g,p,2.6,i%2?C.turq:C.cream)}g.restore()}
  else if(k==='rope'){g.save();g.scale(s,s);drawVasukiPart(g,[[-50,10],[-20,-10],[10,10],[44,-6]],18);g.restore()}
  else if(k==='breeze'){g.save();g.scale(s,s);for(let i=0;i<3;i++){const y=-24+i*24;const sp=[[-50,y]];for(let x=-40;x<=30;x+=10)sp.push([x,y+Math.sin(x/12)*6]);line(g,sp,C.line,8);line(g,sp,C.cream,4);g.beginPath();g.arc(36,y-8,9,Math.PI*.5,Math.PI*2.1);g.strokeStyle=C.line;g.lineWidth=4;g.stroke()}g.restore()}
  else if(k==='hint'){g.save();g.scale(s,s);drawStar(g,0,0,1.6,C.turmeric);g.restore()}}

/* ===== Picture choice cards (Game 2): large, equal, read aloud; never a wrong label ===== */
const Cards={els:[],sel:null,
  show(list,onPick,onPlace){const tray=$('tray');tray.innerHTML='';this.sel=null;this.els=list.map(c=>{const b=document.createElement('button');b.type='button';b.className='card';b.setAttribute('aria-label',c.label);b.dataset.k=c.key;
      const cnv=document.createElement('canvas');const sp=document.createElement('span');sp.textContent=c.label;b.append(cnv,sp);tray.append(b);
      b.addEventListener('click',()=>{D.lastInput=performance.now();AU.resume();AU.sfx('tap');this.select(c.key);onPick(c.key)});return{b,cnv,c}});
    const place=document.createElement('button');place.type='button';place.className='pbtn main place';place.id='bPlace';place.textContent='Place the support';place.disabled=true;
    place.addEventListener('click',()=>{D.lastInput=performance.now();if(this.sel)onPlace(this.sel)});tray.append(place);tray.hidden=false;
    requestAnimationFrame(()=>this.paint())},
  paint(){this.els.forEach(({cnv,c})=>{const r=cnv.getBoundingClientRect(),dp=Math.min(2,devicePixelRatio||1);cnv.width=Math.max(10,r.width*dp);cnv.height=Math.max(10,r.height*dp);
    const g=cnv.getContext('2d');const s=cnv.width/300;g.setTransform(s,0,0,s,0,0);g.fillStyle=C.peacock;g.fillRect(0,0,300,200);
    g.save();for(let i=0;i<2;i++){const y=150+i*24;const p=new Path2D();p.moveTo(0,y);for(let x=0;x<300;x+=40)p.quadraticCurveTo(x+20,y-14,x+40,y);p.lineTo(300,200);p.lineTo(0,200);p.closePath();g.fillStyle=i?C.deep:C.turq;g.fill(p);dbl(g,p,2)}g.restore();
    try{c.draw(g)}catch(e){}})},
  select(k){this.sel=k;this.els.forEach(e=>e.b.classList.toggle('picked',e.c.key===k));const p=$('bPlace');if(p)p.disabled=false},
  wobble(k){const e=this.els.find(e=>e.c.key===k);if(!e)return;e.b.classList.remove('wobble','picked');void e.b.offsetWidth;e.b.classList.add('wobble');this.sel=null;const p=$('bPlace');if(p)p.disabled=true},
  pulse(k){const e=this.els.find(e=>e.c.key===k);if(!e)return;e.b.classList.remove('pulse');void e.b.offsetWidth;e.b.classList.add('pulse')},
  reading(k){this.els.forEach(e=>e.b.classList.toggle('reading',e.c.key===k))},
  async fly(k,tx,ty){const e=this.els.find(e=>e.c.key===k);this.els.forEach(o=>{if(o!==e)o.b.classList.add('back')});const p=$('bPlace');if(p)p.style.visibility='hidden';
    if(e){const r=e.b.getBoundingClientRect();e.b.style.transition='transform 1.2s ease, opacity 1.2s ease';e.b.style.transform=`translate(${tx-(r.left+r.width/2)}px,${ty-(r.top+r.height/2)}px) scale(1.12)`;e.b.style.opacity='0'}
    await D.wait(1200)},
  hide(){const tray=$('tray');tray.hidden=true;tray.innerHTML='';this.els=[]}};

/* ===== Input: tap/drag is the base layer; the optional camera only adds to it ===== */
const Input={drag:null,
  toLogical(x,y){const r=cv.getBoundingClientRect();return{x:(x-r.left)/L.U,y:(y-r.top)/L.U}},
  down(p){D.lastInput=performance.now();AU.resume();this.drag={x0:p.x,y0:p.y,x:p.x,y:p.y,path:[p]};const s=D.scene;if(s&&s.down)s.down(p)},
  move(p){if(this.drag){this.drag.x=p.x;this.drag.y=p.y;this.drag.path.push(p);if(this.drag.path.length>120)this.drag.path.shift()}const s=D.scene;if(s&&s.move)s.move(p,this.drag)},
  up(p){const s=D.scene;if(s&&s.up)s.up(p,this.drag);this.drag=null}};
cv.addEventListener('pointerdown',e=>{try{cv.setPointerCapture(e.pointerId)}catch(_){}Input.down(Input.toLogical(e.clientX,e.clientY));e.preventDefault()});
cv.addEventListener('pointermove',e=>{if(e.buttons||e.pointerType==='touch')Input.move(Input.toLogical(e.clientX,e.clientY))});
cv.addEventListener('pointerup',e=>Input.up(Input.toLogical(e.clientX,e.clientY)));
cv.addEventListener('pointercancel',e=>Input.up(Input.toLogical(e.clientX,e.clientY)));
window.addEventListener('keydown',e=>{D.lastInput=performance.now();const s=D.scene;if(e.target&&e.target.tagName==='BUTTON'&&(e.key===' '||e.key==='Enter'))return;
  if(s&&s.key&&s.key(e.key)){e.preventDefault();return}if(e.key==='m'||e.key==='M')$('bMute').click()});
const near=(p,x,y,r)=>p&&Math.hypot(p.x-x,p.y-y)<=r;

/* ===== Optional camera: off by default, asked for only after the "Use camera" toggle.
   Library-free motion sensing (frame differencing on a tiny video frame) feeds the same events as taps. ===== */
const Cam={state:'off',video:null,g:null,prev:null,motion:0,left:0,right:0,top:0,cxm:.5,busy:false,
  async toggle(){const b=$('bCam');if(this.state==='on'){this.stop();return}if(this.busy)return;this.busy=true;
    try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw 0;
      const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:160,height:120},audio:false});
      const v=document.createElement('video');v.muted=true;v.playsInline=true;v.srcObject=stream;await v.play();this.video=v;
      const c=document.createElement('canvas');c.width=64;c.height=48;this.g=c.getContext('2d',{willReadFrequently:true});this.state='on';b.setAttribute('aria-pressed','true');$('camLbl').textContent='Camera on';this.loop()}
    catch(e){this.fail()}finally{this.busy=false}},
  fail(){this.stop();this.state='off';const b=$('bCam');b.setAttribute('aria-pressed','false');b.classList.add('na');$('camLbl').textContent='Use camera';b.title='Camera is not available here. Tapping works for everything.'},
  stop(){try{this.video&&this.video.srcObject&&this.video.srcObject.getTracks().forEach(t=>t.stop())}catch(e){}this.video=null;this.prev=null;this.motion=0;if(this.state==='on')this.state='off';
    $('bCam').setAttribute('aria-pressed','false');$('camLbl').textContent='Use camera'},
  loop(){if(this.state!=='on'||!this.video)return;try{const g=this.g;g.save();g.translate(64,0);g.scale(-1,1);g.drawImage(this.video,0,0,64,48);g.restore();
      const d=g.getImageData(0,0,64,48).data;if(this.prev){let m=0,l=0,r=0,tp=0,sx=0;for(let i=0;i<d.length;i+=4){const df=Math.abs(d[i]-this.prev[i])+Math.abs(d[i+1]-this.prev[i+1]);if(df>60){const px=(i/4)%64,py=Math.floor(i/256);m++;sx+=px;if(px<26)l++;else if(px>38)r++;if(py<16)tp++}}
        const n=64*48;const k=.35;this.motion=lerp(this.motion,m/n,k);this.left=lerp(this.left,l/n,k);this.right=lerp(this.right,r/n,k);this.top=lerp(this.top,tp/n,k);this.cxm=m?sx/m/64:.5}
      this.prev=new Uint8ClampedArray(d)}catch(e){this.fail();return}setTimeout(()=>this.loop(),90)},
  /* simple reads used by activities; false when the camera is off */
  moving(th){return this.state==='on'&&this.motion>(th||.04)},
  still(){return this.state==='on'&&this.motion<.006},
  side(){if(this.state!=='on'||this.motion<.03)return 0;return this.left>this.right*1.6?-1:this.right>this.left*1.6?1:0},
  raised(){return this.state==='on'&&this.top>.03}};
