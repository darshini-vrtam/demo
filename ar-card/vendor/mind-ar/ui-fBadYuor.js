const h=(e,t)=>{const i=2*Math.PI*t*e;return i/(i+1)},c=(e,t,i)=>e*t+(1-e)*i;class v{constructor({minCutOff:t,beta:i}){this.minCutOff=t,this.beta=i,this.dCutOff=.001,this.xPrev=null,this.dxPrev=null,this.tPrev=null,this.initialized=!1}reset(){this.initialized=!1}filter(t,i){if(!this.initialized)return this.initialized=!0,this.xPrev=i,this.dxPrev=i.map(()=>0),this.tPrev=t,i;const{xPrev:a,tPrev:s,dxPrev:p}=this,o=t-s,m=h(o,this.dCutOff),l=[],r=[],d=[];for(let n=0;n<i.length;n++){l[n]=(i[n]-a[n])/o,r[n]=c(m,l[n],p[n]);const g=this.minCutOff+this.beta*Math.abs(r[n]),u=h(o,g);d[n]=c(u,i[n],a[n])}return this.xPrev=d,this.dxPrev=r,this.tPrev=t,d}}const x=`<div class="mindar-ui-overlay mindar-ui-loading">
  <div class="loader"/>
</div>
`,b=`<div class="mindar-ui-overlay mindar-ui-compatibility">
  <div class="content">
    <h1>Failed to launch :(</h1>
    <p>
      Looks like your device/browser is not compatible.
    </p>

    <br/>
    <br/>
    <p>
      Please try the following recommended browsers:
    </p>
    <p>
      For Android device - Chrome
    </p>
    <p>
      For iOS device - Safari
    </p>
  </div>
</div>
`,y=`<div class="mindar-ui-overlay mindar-ui-scanning">
  <div class="scanning">
    <div class="inner">
      <div class="scanline"/>
    </div>
  </div>
</div>
`,f=".mindar-ui-overlay{display:flex;align-items:center;justify-content:center;position:absolute;left:0;right:0;top:0;bottom:0;background:transparent;z-index:2}.mindar-ui-overlay.hidden{display:none}.mindar-ui-loading .loader{border:16px solid #222;border-top:16px solid white;opacity:.8;border-radius:50%;width:120px;height:120px;animation:spin 2s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.mindar-ui-compatibility .content{background:black;color:#fff;opacity:.8;text-align:center;margin:20px;padding:20px;min-height:50vh}@media (min-aspect-ratio: 1/1){.mindar-ui-scanning .scanning{width:50vh;height:50vh}}@media (max-aspect-ratio: 1/1){.mindar-ui-scanning .scanning{width:80vw;height:80vw}}.mindar-ui-scanning .scanning .inner{position:relative;width:100%;height:100%;opacity:.8;background:linear-gradient(to right,white 10px,transparent 10px) 0 0,linear-gradient(to right,white 10px,transparent 10px) 0 100%,linear-gradient(to left,white 10px,transparent 10px) 100% 0,linear-gradient(to left,white 10px,transparent 10px) 100% 100%,linear-gradient(to bottom,white 10px,transparent 10px) 0 0,linear-gradient(to bottom,white 10px,transparent 10px) 100% 0,linear-gradient(to top,white 10px,transparent 10px) 0 100%,linear-gradient(to top,white 10px,transparent 10px) 100% 100%;background-repeat:no-repeat;background-size:40px 40px}.mindar-ui-scanning .scanning .inner .scanline{position:absolute;width:100%;height:10px;background:white;animation:move 2s linear infinite}@keyframes move{0%,to{top:0%}50%{top:calc(100% - 10px)}}";class M{constructor({uiLoading:t,uiScanning:i,uiError:a}){const s=document.createElement("style");s.innerText=f,document.head.appendChild(s),t==="yes"?this.loadingModal=this._loadHTML(x):t!=="no"&&(this.loadingModal=document.querySelector(t)),a==="yes"?this.compatibilityModal=this._loadHTML(b):a!=="no"&&(this.compatibilityModal=document.querySelector(a)),i==="yes"?this.scanningMask=this._loadHTML(y):i!=="no"&&(this.scanningMask=document.querySelector(i)),this.hideLoading(),this.hideCompatibility(),this.hideScanning()}showLoading(){this.loadingModal&&this.loadingModal.classList.remove("hidden")}hideLoading(){this.loadingModal&&this.loadingModal.classList.add("hidden")}showCompatibility(){this.compatibilityModal&&this.compatibilityModal.classList.remove("hidden")}hideCompatibility(){this.compatibilityModal&&this.compatibilityModal.classList.add("hidden")}showScanning(){this.scanningMask&&this.scanningMask.classList.remove("hidden")}hideScanning(){this.scanningMask&&this.scanningMask.classList.add("hidden")}_loadHTML(t){const i=document.createElement("template");i.innerHTML=t.trim();const a=i.content.firstChild;return document.getElementsByTagName("body")[0].appendChild(a),a}}export{v as O,M as U};
