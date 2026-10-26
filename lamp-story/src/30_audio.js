/* ===== Sound: synthesised SFX + soft ambient music, all behind one master gain ===== */
const AU={ctx:null,master:null,music:null,sfxG:null,muted:false,noiseBuf:null,
  init(){if(this.ctx)return;try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;this.ctx=new AC();
    this.master=this.ctx.createGain();this.master.gain.value=this.muted?0:1;this.master.connect(this.ctx.destination);
    this.sfxG=this.ctx.createGain();this.sfxG.gain.value=.7;this.sfxG.connect(this.master);
    const len=this.ctx.sampleRate*2,b=this.ctx.createBuffer(1,len,this.ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;this.noiseBuf=b;
    Music.init()}catch(e){this.ctx=null}},
  resume(){try{this.ctx&&this.ctx.state==='suspended'&&this.ctx.resume()}catch(e){}},
  setMute(m){this.muted=m;if(this.master)this.master.gain.setTargetAtTime(m?0:1,this.ctx.currentTime,.05)},
  t(){return this.ctx.currentTime},
  osc(type,f,t0,dur,g,dest,f2){const c=this.ctx,o=c.createOscillator(),e=c.createGain();o.type=type;o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+dur);
    e.gain.setValueAtTime(0.0001,t0);e.gain.exponentialRampToValueAtTime(g,t0+Math.min(.03,dur*.2));e.gain.exponentialRampToValueAtTime(0.0001,t0+dur);o.connect(e);e.connect(dest||this.sfxG);o.start(t0);o.stop(t0+dur+.05);return o},
  noise(t0,dur,g,type,f,q,dest,f2,pan){const c=this.ctx,s=c.createBufferSource(),fl=c.createBiquadFilter(),e=c.createGain();s.buffer=this.noiseBuf;s.loop=true;fl.type=type||'bandpass';
    fl.frequency.setValueAtTime(f||1000,t0);if(f2)fl.frequency.exponentialRampToValueAtTime(f2,t0+dur);fl.Q.value=q||1;
    e.gain.setValueAtTime(0.0001,t0);e.gain.exponentialRampToValueAtTime(g,t0+Math.min(.25,dur*.3));e.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
    s.connect(fl);fl.connect(e);let out=e;if(pan!=null&&c.createStereoPanner){const p=c.createStereoPanner();p.pan.value=pan;e.connect(p);out=p}out.connect(dest||this.sfxG);s.start(t0);s.stop(t0+dur+.05)},
  sfx(name,arg){if(!this.ctx||this.muted)return;const t=this.t();try{switch(name){
    case'psst':this.noise(t,.18,.5,'highpass',3500,.7);this.noise(t+.32,.42,.55,'highpass',3200,.7);break;
    case'whisper':this.noise(t,.5,.35,'bandpass',2600,1.2);break;
    case'hop':this.osc('sine',320,t,.2,.35,null,760);break;
    case'land':this.osc('sine',170,t,.22,.5,null,60);this.noise(t,.12,.3,'lowpass',500,.7);break;
    case'place':this.osc('triangle',540,t,.16,.35);this.noise(t,.05,.25,'bandpass',1400,2);break;
    case'relight':this.noise(t,.45,.3,'bandpass',500,1.2,null,2400);[1318,1760].forEach((f,i)=>this.osc('sine',f,t+.25+i*.08,.8,.12));break;
    case'wind':{const d=arg&&arg.dur||2.4,pan=arg&&arg.pan||0;this.noise(t,d,.32,'bandpass',420,.8,null,900,pan);this.noise(t+.3,d*.8,.18,'bandpass',900,1.5,null,500,pan);break}
    case'creak':{const c=this.ctx,o=c.createOscillator(),fl=c.createBiquadFilter(),e=c.createGain();o.type='sawtooth';o.frequency.setValueAtTime(70,t);
      for(let i=0;i<14;i++)o.frequency.linearRampToValueAtTime(70+Math.sin(i*1.7)*22+i*3,t+i*.12);fl.type='bandpass';fl.frequency.value=800;fl.Q.value=7;
      e.gain.setValueAtTime(.0001,t);e.gain.exponentialRampToValueAtTime(.35,t+.2);e.gain.exponentialRampToValueAtTime(.0001,t+1.8);o.connect(fl);fl.connect(e);e.connect(this.sfxG);o.start(t);o.stop(t+1.9);break}
    case'rooster':{const c=this.ctx,o=c.createOscillator(),fl=c.createBiquadFilter(),e=c.createGain();o.type='sawtooth';const seq=[[0,560],[.12,820],[.3,760],[.42,980],[.9,900],[1.3,620]];
      seq.forEach(([dt,f])=>o.frequency.linearRampToValueAtTime(f,t+dt));fl.type='bandpass';fl.frequency.value=1300;fl.Q.value=2.5;
      e.gain.setValueAtTime(.0001,t);[[.03,.3],[.12,.12],[.16,.32],[.4,.3],[.44,.14],[.5,.34],[1.2,.28],[1.45,.0001]].forEach(([dt,g])=>e.gain.exponentialRampToValueAtTime(g,t+dt));
      o.connect(fl);fl.connect(e);e.connect(this.sfxG);o.start(t);o.stop(t+1.5);break}
    case'chime':[880,1320,1760,2217].forEach((f,i)=>this.osc('sine',f,t+i*.09,2.6-i*.3,.16-i*.025));break;
    case'find':[587,740,880].forEach((f,i)=>this.osc('triangle',f,t+i*.08,.35,.2));break;
    case'card':this.noise(t,.3,.2,'bandpass',1800,1.5,null,700);break;
    case'tap':this.osc('triangle',660,t,.1,.18);break;
    case'drop':this.osc('sine',880,t,.25,.2,null,660);this.osc('triangle',1320,t+.05,.2,.08);break;
    case'coin':[1568,2093].forEach((f,i)=>this.osc('square',f,t+i*.06,.12,.05));break;
    case'swish':this.noise(t,.6,.25,'bandpass',600,1,null,2000);break;
    case'oops':this.osc('sine',520,t,.25,.18,null,380);break;
    case'shimmer':for(let i=0;i<5;i++)this.osc('sine',1174+i*196,t+i*.07,.6,.06);break;
    case'step':this.osc('sine',120,t,.08,.15,null,80);break}}catch(e){}}};

const Music={on:false,level:.5,nodes:null,next:0,
  init(){const c=AU.ctx;const g=c.createGain();g.gain.value=0;g.connect(AU.master);const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=520;lp.connect(g);
    const dr=[146.83,220].map(f=>{const o=c.createOscillator();o.type='sawtooth';o.frequency.value=f;const og=c.createGain();og.gain.value=.03;o.connect(og);og.connect(lp);o.start();return o});
    const pl=c.createGain();pl.gain.value=1;pl.connect(g);this.nodes={g,lp,pl,dr};this.on=true;this.setLevel(.5,3)},
  setLevel(v,sec){this.level=v;if(!this.nodes)return;this.nodes.g.gain.setTargetAtTime(v*.6,AU.t(),(sec||2)/3)},
  swell(){this.setLevel(1,2);setTimeout(()=>this.level===1&&this.setLevel(.55,4),9000)},
  silence(){this.setLevel(0,1.2)},
  mood(m){if(!this.nodes)return;this.nodes.lp.frequency.setTargetAtTime(m==='night'?380:620,AU.t(),1.5)},
  tick(){if(!this.nodes||AU.muted||this.level<.05)return;const c=AU.ctx,t=c.currentTime;if(t<this.next)return;
    const sc=[293.66,329.63,369.99,440,493.88,587.33,659.25];const f=sc[Math.floor(Math.random()*sc.length)]*(Math.random()<.3?.5:1);
    const o=c.createOscillator(),e=c.createGain();o.type='triangle';o.frequency.value=f;e.gain.setValueAtTime(.0001,t);e.gain.exponentialRampToValueAtTime(.05*this.level+.01,t+.02);
    e.gain.exponentialRampToValueAtTime(.0001,t+1.6);o.connect(e);e.connect(this.nodes.pl);o.start(t);o.stop(t+1.7);
    this.next=t+(this.level>.8?.7:1.6)+Math.random()*1.8}};

/* ===== Speech: one voice per character, by voice choice and pitch/rate ===== */
const VOICE={dadi:{name:'Diya-Dadi',col:C.mustard,pitch:.95,rate:.9},chiku:{name:'Chiku',col:C.terra,pitch:1.45,rate:1.04},bijli:{name:'Bijli',col:C.indigo,pitch:1.85,rate:1.12},
  kesar:{name:'Princess Kesar',col:C.verm,pitch:1.12,rate:.93},yama:{name:'Yama',col:C.charcoal,pitch:.55,rate:.82},merchant:{name:'Merchant',col:C.leaf,pitch:.78,rate:1},
  sfx:{name:'Sound',col:C.gold,pitch:1,rate:1}};
const Speech={ok:false,voices:[],pick:{},init(){try{if(!('speechSynthesis' in window)||!window.SpeechSynthesisUtterance)return;this.ok=true;const load=()=>{this.voices=speechSynthesis.getVoices()||[];this.assign()};load();
    speechSynthesis.onvoiceschanged=load}catch(e){this.ok=false}},
  assign(){const en=this.voices.filter(v=>/^en/i.test(v.lang));if(!en.length){this.pick={};return}
    const score=v=>(/en[-_]IN/i.test(v.lang)?4:0)+(/en[-_]GB/i.test(v.lang)?1:0)+(v.localService?1:0);const by=en.slice().sort((a,b)=>score(b)-score(a));
    const fem=by.filter(v=>/female|woman|veena|heera|neerja|kalpana|samantha|karen|moira|tessa|zira|susan|serena|fiona|aria|jenny|sonia|libby/i.test(v.name));
    const male=by.filter(v=>/male|man\b|rishi|ravi|prabhat|daniel|david|george|alex|guy|ryan|thomas|fred|mark|james/i.test(v.name)&&!/female/i.test(v.name));
    const f0=fem[0]||by[0],f1=fem[1]||f0,m0=male[0]||by[0];this.pick={dadi:f0,chiku:f1,bijli:f1,kesar:f0,yama:m0,merchant:male[1]||m0,sfx:f1}},
  available(){return this.ok&&this.voices.length>0},
  speak(who,text,vol){return new Promise(res=>{if(!this.available()||AU.muted){res(false);return}
    let done=false;const fin=()=>{if(!done){done=true;res(true)}};
    try{const u=new SpeechSynthesisUtterance(text.replace(/[‘’']/g,"'"));const V=VOICE[who]||VOICE.dadi;u.pitch=V.pitch;u.rate=V.rate;u.volume=vol==null?1:vol;
      const v=this.pick[who];if(v)u.voice=v;u.lang=v?v.lang:'en-IN';u.onend=fin;u.onerror=fin;this.cur=fin;speechSynthesis.speak(u);
      setTimeout(fin,Math.max(4000,text.length*95/V.rate+2500))}catch(e){fin()}})},
  stop(){try{if(this.ok)speechSynthesis.cancel()}catch(e){}if(this.cur){const f=this.cur;this.cur=null;f()}}};
