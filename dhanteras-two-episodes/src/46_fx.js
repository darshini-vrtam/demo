/* ===== Small effects in the top layer: ripples, bubble bursts, petal sprays, sparkles, a demonstration hand ===== */
function fxLayer(s){const g=grp(s.top);const list=[];const F={g,list,
  ripple(x,y,r,col,ms,flat){const e=circ(g,x,y,10,'none',6,{stroke:col||P.ivory,transform:flat?`translate(${f1(x)} ${f1(y)}) scale(1 ${flat}) translate(${f1(-x)} ${f1(-y)})`:null});const o={k:0};list.push({e,o,kind:'ripple',x,y,r:r||120});tw(o,{k:1},ms||1300,'out').then(()=>{e.remove();list.splice(list.findIndex(l=>l.e===e),1)})},
  burst(x,y,n,kind,spread){for(let i=0;i<(n||6);i++){const a=-Math.PI/2+(Math.random()-.5)*(spread||1.6);const d=60+Math.random()*90;const e=grp(g);
      if(kind==='petal'){shp(e,'M0 0Q6 -8 0 -16Q-6 -8 0 0Z',i%2?P.pink:P.turmeric,2)}else if(kind==='spark'){star4(e,0,0,9,i%2?P.turmeric:P.ivory)}else{bubble(e,6+Math.random()*7)}
      const o={k:0};list.push({e,o,kind:'b',x,y,dx:Math.cos(a)*d,dy:Math.sin(a)*d,rot:Math.random()*360});tw(o,{k:1},900+Math.random()*500,'out').then(()=>{e.remove();list.splice(list.findIndex(l=>l.e===e),1)})}},
  update(){for(const l of list){const k=l.o.k;if(l.kind==='ripple'){l.e.setAttribute('r',f1(10+l.r*k));l.e.setAttribute('stroke-width',f1(7*(1-k)+1));op(l.e,1-k*k)}
    else{tf(l.e,l.x+l.dx*k,l.y+l.dy*k-(l.e.firstChild&&l.e.firstChild.tagName==='circle'?40*k:0),1-.3*k,l.rot*k);op(l.e,1-k*k)}}}};s.parts.push(F);return F}
/* the demonstration hand shows the gesture (taps, drags) */
function demoHand(s){const h=handIcon(s.top);s.parts.push({update:()=>h.update()});const D_={h,busy:false,
  async tap(x,y,n){if(this.busy)return;this.busy=true;try{h.x=x+40;h.y=y+40;h.on=0;await D.tw(h,{on:1},300);for(let i=0;i<(n||2);i++){await D.tw(h,{x,y,press:1},350);await D.tw(h,{press:0},250)}await D.tw(h,{on:0},300)}catch(e){}finally{this.busy=false}},
  async drag(path,ms,rep){if(this.busy)return;this.busy=true;try{h.x=path[0][0];h.y=path[0][1];await D.tw(h,{on:1},300);for(let r=0;r<(rep||1);r++)for(let i=1;i<path.length;i++){h.press=1;await D.tw(h,{x:path[i][0],y:path[i][1]},(ms||900)/(path.length-1),'io')}
    h.press=0;await D.tw(h,{on:0},300)}catch(e){}finally{this.busy=false}}};return D_}

/* ===== Optional camera magic: hands (and, where useful, the face). Never required; any failure falls back silently ===== */
const Cam={state:'off',video:null,busy:false,hands:[],pinch:false,clap:0,mouth:0,smile:0,rub:0,lastTwo:1,
  load(src){return new Promise((res,rej)=>{const s=document.createElement('script');s.src=src;s.crossOrigin='anonymous';s.onload=res;s.onerror=rej;document.head.append(s)})},
  async toggle(){if(this.state==='on'){this.stop();return}if(this.busy||this.state==='unavailable')return;this.busy=true;
    try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw 0;
      const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:320,height:240},audio:false});
      const v=document.createElement('video');v.muted=true;v.playsInline=true;v.srcObject=stream;await v.play();this.video=v;
      const hb='https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/';await this.load(hb+'hands.js');
      const H=new window.Hands({locateFile:f=>hb+f});H.setOptions({maxNumHands:2,modelComplexity:0,minDetectionConfidence:.6,minTrackingConfidence:.5});H.onResults(r=>this.onHands(r));await H.initialize();this.H=H;
      try{const fb='https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/';await this.load(fb+'face_mesh.js');const F=new window.FaceMesh({locateFile:f=>fb+f});
        F.setOptions({maxNumFaces:1,refineLandmarks:false,minDetectionConfidence:.6,minTrackingConfidence:.5});F.onResults(r=>this.onFace(r));await F.initialize();this.F=F}catch(e){this.F=null}
      this.state='on';$('bCam').setAttribute('aria-pressed','true');this.loop()}
    catch(e){this.fail()}finally{this.busy=false}},
  fail(){this.stop();this.state='unavailable';$('bCam').hidden=true},
  stop(){try{this.video&&this.video.srcObject&&this.video.srcObject.getTracks().forEach(t=>t.stop())}catch(e){}this.video=null;this.hands=[];this.release();if(this.state==='on')this.state='off';$('bCam').setAttribute('aria-pressed','false')},
  async loop(){let n=0;while(this.state==='on'&&this.video){try{if(this.F&&n++%3===2)await this.F.send({image:this.video});else await this.H.send({image:this.video})}catch(e){this.fail();return}await new Promise(r=>setTimeout(r,40))}},
  onHands(r){const lms=r.multiHandLandmarks||[];const r0=svg.getBoundingClientRect();
    this.hands=lms.map(lm=>{const p=Input.toRef(r0.left+(1-lm[9].x)*r0.width,r0.top+lm[9].y*r0.height);const tip=Input.toRef(r0.left+(1-lm[8].x)*r0.width,r0.top+lm[8].y*r0.height);
      const spread=Math.hypot(lm[8].x-lm[20].x,lm[8].y-lm[20].y);return{p,tip,pinchD:Math.hypot(lm[8].x-lm[4].x,lm[8].y-lm[4].y),open:spread>.16,raw:lm}});
    const h=this.hands[0];
    if(this.hands.length===2){const d=Math.hypot(this.hands[0].raw[9].x-this.hands[1].raw[9].x,this.hands[0].raw[9].y-this.hands[1].raw[9].y);
      if(this.lastTwo>.22&&d<.1){this.clap++;D.poke();const s=D.scene;s&&s.camClap&&s.camClap()}
      if(d<.14){const mid=(this.hands[0].raw[9].y+this.hands[1].raw[9].y)/2;this.rubAcc=(this.rubAcc||0)*.9+Math.abs(mid-(this.lastMid||mid))*40;this.lastMid=mid;this.rub=this.rubAcc}else this.rub*=.9;this.lastTwo=d}
    else this.lastTwo=1;
    if(!h){this.release();return}
    const s=D.scene;if(s&&s.camHand){s.camHand(h,this.hands);D.poke()}
    /* a pinch works like a finger on the screen, so every drag and tap also works with the camera */
    if(!this.pinch&&h.pinchD<.05){this.pinch=true;Input.ev('down',h.tip)}else if(this.pinch&&h.pinchD>.09)this.release();else if(this.pinch)Input.ev('move',h.tip)},
  release(){if(this.pinch){this.pinch=false;const h=this.hands[0];Input.ev('up',h?h.tip:{x:-999,y:-999})}},
  onFace(r){const f=r.multiFaceLandmarks&&r.multiFaceLandmarks[0];if(!f){this.mouth=0;this.smile=0;return}const dd=(a,b)=>Math.hypot(f[a].x-f[b].x,f[a].y-f[b].y);
    const fh=dd(10,152),fw=dd(234,454);const m=dd(13,14)/fh,sm=dd(61,291)/fw;const was=this.mouth;this.mouth=m>.09?1:0;this.smile=sm>.44?1:0;
    if(this.mouth&&!was){D.poke();const s=D.scene;s&&s.camMouth&&s.camMouth()}}};
