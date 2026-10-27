/* ===== Input: tap/drag on the painting is the base layer; every hotspot also has an HTML button in the panel ===== */
const Input={down:null,
  start(x,y){const S=D.scene;D.poke();if(!S||!S.hit)return;const h=S.hit(x,y);if(!h){if(S.miss)S.miss(x,y);return}this.down={h,x0:x,y0:y,moved:false};if(h.dragStart)h.dragStart(x,y)},
  move(x,y){const S=D.scene;if(!this.down){cv.classList.toggle('hot',!!(S&&S.hit&&S.hit(x,y)));return}const d=this.down;if(Math.hypot(x-d.x0,y-d.y0)>14)d.moved=true;if(d.h.dragMove)d.h.dragMove(x-d.x0,y-d.y0,x,y)},
  end(x,y){const d=this.down;this.down=null;if(!d)return;D.poke();if(d.moved&&d.h.dragEnd){if(d.h.dragEnd(x-d.x0,y-d.y0)!==false)return}if(d.h.tap)d.h.tap()}};
cv.addEventListener('pointerdown',e=>{if(e.button>0)return;try{cv.setPointerCapture(e.pointerId)}catch(_){}const p=toDesign(e.clientX,e.clientY);Input.start(p.x,p.y)});
cv.addEventListener('pointermove',e=>{const p=toDesign(e.clientX,e.clientY);Input.move(p.x,p.y)});
cv.addEventListener('pointerup',e=>{const p=toDesign(e.clientX,e.clientY);Input.end(p.x,p.y)});
cv.addEventListener('pointercancel',()=>{Input.down=null});
const inCirc=(x,y,cx_,cy_,r)=>Math.hypot(x-cx_,y-cy_)<=r;
const inRect=(x,y,a,b,w,h)=>x>=a&&x<=a+w&&y>=b&&y<=b+h;

/* ===== Optional camera hand-pinch. Loaded only after the child turns Hand mode on and the camera is granted.
   If anything fails (no camera, permission denied, library or model blocked) it quietly switches off; tap/drag keep working. ===== */
const TASKS_VISION='https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14';
const HAND_MODEL='https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';
const Cam={on:false,stream:null,lm:null,raf:0,pinch:false,mode:null,target:null,lastVT:-1,status:'off',
  async toggle(){if(this.on){this.stop();return}this.on=true;$('bCam').setAttribute('aria-pressed','true');
    try{this.stream=await navigator.mediaDevices.getUserMedia({video:{width:640,height:480,facingMode:'user'},audio:false});
      const v=$('camVid');v.srcObject=this.stream;await v.play();$('camBox').hidden=false;this.status='camera';
      if(!this.lm){const vision=await import(TASKS_VISION+'/vision_bundle.mjs');const fs=await vision.FilesetResolver.forVisionTasks(TASKS_VISION+'/wasm');
        this.lm=await vision.HandLandmarker.createFromOptions(fs,{baseOptions:{modelAssetPath:HAND_MODEL,delegate:'GPU'},runningMode:'VIDEO',numHands:1})}
      if(!this.on)return;this.status='tracking';$('cursor').hidden=false;UI.toast('Hand mode on: pinch your finger and thumb to tap, pinch and move to drag.');this.loop()}
    catch(e){this.status='fallback: '+(e&&e.name||'error');this.stop(true)}},
  stop(failed){this.on=false;cancelAnimationFrame(this.raf);try{this.stream&&this.stream.getTracks().forEach(t=>t.stop())}catch(e){}this.stream=null;$('camBox').hidden=true;$('cursor').hidden=true;
    $('bCam').setAttribute('aria-pressed','false');if(this.pinch)this.release(0,0);if(failed)UI.toast('Hand mode is not available here. Tapping works just the same.')},
  loop(){if(!this.on)return;this.raf=requestAnimationFrame(()=>this.loop());const v=$('camVid');if(!this.lm||v.readyState<2||v.currentTime===this.lastVT)return;this.lastVT=v.currentTime;
    let r;try{r=this.lm.detectForVideo(v,performance.now())}catch(e){return}const h=r&&r.landmarks&&r.landmarks[0];const cur=$('cursor');if(!h){cur.style.opacity=.3;return}cur.style.opacity=1;
    const a=$('app').getBoundingClientRect(),st=stage.getBoundingClientRect();const tip=h[8],th=h[4],wr=h[0],mid=h[9];
    const x=(1-(tip.x+th.x)/2)*a.width,y=((tip.y+th.y)/2)*a.height;cur.style.left=(x-(st.left-a.left))+'px';cur.style.top=(y-(st.top-a.top))+'px';
    const span=Math.hypot(wr.x-mid.x,wr.y-mid.y)||.1,d=Math.hypot(tip.x-th.x,tip.y-th.y)/span;
    const cxp=a.left+x,cyp=a.top+y;if(!this.pinch&&d<.32){this.pinch=true;cur.classList.add('pinch');this.press(cxp,cyp)}else if(this.pinch&&d>.45){this.pinch=false;cur.classList.remove('pinch');this.release(cxp,cyp)}
    else if(this.pinch&&this.mode==='canvas'){const p=toDesign(cxp,cyp);Input.move(p.x,p.y)}},
  press(x,y){const el=document.elementFromPoint(x,y);D.poke();if(el===cv){this.mode='canvas';const p=toDesign(x,y);Input.start(p.x,p.y);return}
    const t=el&&el.closest('button,.card,.slot,summary');this.mode=t?'html':null;this.target=t;if(t&&t.classList.contains('card'))t.click()},
  release(x,y){if(this.mode==='canvas'){const p=toDesign(x,y);Input.end(p.x,p.y)}else if(this.mode==='html'&&this.target){const el=document.elementFromPoint(x,y);const t=el&&el.closest('button,.card,.slot,summary');
      if(this.target.classList.contains('card')){if(t&&t.classList.contains('slot'))t.click()}else if(t===this.target)t.click()}this.mode=null;this.target=null}};
