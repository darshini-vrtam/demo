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
