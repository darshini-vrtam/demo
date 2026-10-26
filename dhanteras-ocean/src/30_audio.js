/* ===== Sound: everything synthesised with Web Audio, behind one master gain that mute silences ===== */
const AU={ctx:null,master:null,sfxG:null,muted:false,noiseBuf:null,
  init(){if(this.ctx)return;try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;this.ctx=new AC();
    this.master=this.ctx.createGain();this.master.gain.value=this.muted?0:1;this.master.connect(this.ctx.destination);
    this.sfxG=this.ctx.createGain();this.sfxG.gain.value=.6;this.sfxG.connect(this.master);
    const len=this.ctx.sampleRate*2,b=this.ctx.createBuffer(1,len,this.ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;this.noiseBuf=b;Music.init()}catch(e){this.ctx=null}},
  resume(){try{this.ctx&&this.ctx.state==='suspended'&&this.ctx.resume()}catch(e){}},
  setMute(m){this.muted=m;if(this.master)this.master.gain.setTargetAtTime(m?0:1,this.ctx.currentTime,.05)},
  t(){return this.ctx.currentTime},
  osc(type,f,t0,dur,g,f2,dest){const c=this.ctx,o=c.createOscillator(),e=c.createGain();o.type=type;o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+dur);
    e.gain.setValueAtTime(.0001,t0);e.gain.exponentialRampToValueAtTime(g,t0+Math.min(.04,dur*.2));e.gain.exponentialRampToValueAtTime(.0001,t0+dur);o.connect(e);e.connect(dest||this.sfxG);o.start(t0);o.stop(t0+dur+.05);return o},
  noise(t0,dur,g,type,f,q,f2){const c=this.ctx,s=c.createBufferSource(),fl=c.createBiquadFilter(),e=c.createGain();s.buffer=this.noiseBuf;s.loop=true;fl.type=type||'bandpass';
    fl.frequency.setValueAtTime(f||1000,t0);if(f2)fl.frequency.exponentialRampToValueAtTime(f2,t0+dur);fl.Q.value=q||1;e.gain.setValueAtTime(.0001,t0);e.gain.exponentialRampToValueAtTime(g,t0+Math.min(.3,dur*.3));
    e.gain.exponentialRampToValueAtTime(.0001,t0+dur);s.connect(fl);fl.connect(e);e.connect(this.sfxG);s.start(t0);s.stop(t0+dur+.05)},
  bell(f,t0,g,dur){this.osc('sine',f,t0,dur||1.8,g||.12);this.osc('sine',f*2.76,t0,(dur||1.8)*.5,(g||.12)*.3)},
  sfx(name,arg){if(!this.ctx||this.muted)return;const t=this.t();try{switch(name){
    case'water':this.noise(t,2.4,.18,'lowpass',500,.7,900);this.noise(t+.6,2,.1,'bandpass',1200,.8,600);break;
    case'bell':this.bell(arg||1046,t,.12);break;
    case'bells':[1046,1318,1568,2093].forEach((f,i)=>this.bell(f,t+i*.22,.09,2.2));break;
    case'descend':[587,523,440,349].forEach((f,i)=>this.osc('triangle',f,t+i*.32,.6,.12));break;
    case'drum':this.osc('sine',arg||110,t,.32,.42,48);this.noise(t,.08,.12,'lowpass',400,.7);break;
    case'glow':this.bell(1568,t,.08,1.2);break;
    case'chime':[784,988,1175,1568].forEach((f,i)=>this.bell(f,t+i*.08,.09,1.4));break;
    case'celebrate':[523,659,784,1046,1318].forEach((f,i)=>this.bell(f,t+i*.1,.08,1.6));break;
    case'conch':{const c=this.ctx,o=c.createOscillator(),o2=c.createOscillator(),fl=c.createBiquadFilter(),e=c.createGain();o.type='sawtooth';o2.type='triangle';o.frequency.setValueAtTime(196,t);o2.frequency.setValueAtTime(392,t);
      o.frequency.linearRampToValueAtTime(220,t+.5);o.frequency.linearRampToValueAtTime(218,t+2.2);fl.type='lowpass';fl.frequency.setValueAtTime(500,t);fl.frequency.linearRampToValueAtTime(1300,t+.8);fl.frequency.linearRampToValueAtTime(700,t+2.4);
      e.gain.setValueAtTime(.0001,t);e.gain.exponentialRampToValueAtTime(.12,t+.5);e.gain.setValueAtTime(.12,t+1.8);e.gain.exponentialRampToValueAtTime(.0001,t+2.6);o.connect(fl);o2.connect(fl);fl.connect(e);e.connect(this.sfxG);
      o.start(t);o2.start(t);o.stop(t+2.7);o2.stop(t+2.7);break}
    case'tap':this.osc('triangle',660,t,.12,.14);break;
    case'soft':this.osc('sine',392,t,.35,.1,330);break;
    case'pop':this.osc('sine',520,t,.18,.16,980);this.bell(1760,t+.08,.05,.8);break;
    case'rise':this.osc('sine',300,t,1.2,.08,620);this.noise(t,1.2,.06,'bandpass',800,1.2,1800);break;
    case'breeze':this.noise(t,1.8,.2,'bandpass',500,.8,1400);this.noise(t+.3,1.4,.1,'bandpass',1200,1.4,600);break;
    case'lamp':this.noise(t,.35,.12,'bandpass',600,1.2,2200);this.bell(1318,t+.2,.07,1.2);break}}catch(e){}}};

/* soft ambient music: a low drone and sparse pentatonic notes; swells at moments of relief */
const Music={nodes:null,level:.4,next:0,scale:[293.66,329.63,369.99,440,493.88,587.33],
  init(){const c=AU.ctx;const g=c.createGain();g.gain.value=0;g.connect(AU.master);const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=600;lp.connect(g);
    [146.83,220,293.66].forEach((f,i)=>{const o=c.createOscillator();o.type=i===2?'sine':'triangle';o.frequency.value=f;const og=c.createGain();og.gain.value=i===2?.012:.035;o.connect(og);og.connect(lp)
      ;const lfo=c.createOscillator(),lg=c.createGain();lfo.frequency.value=.07+i*.03;lg.gain.value=.012;lfo.connect(lg);lg.connect(og.gain);lfo.start();o.start()});
    const pl=c.createGain();pl.gain.value=1;pl.connect(g);this.nodes={g,lp,pl};this.set(.4,3)},
  set(v,sec){this.level=v;if(this.nodes)this.nodes.g.gain.setTargetAtTime(v*.55,AU.t(),(sec||2)/3)},
  swell(){this.set(1,1.5);clearTimeout(this.sw);this.sw=setTimeout(()=>this.set(.45,4),8000)},
  mood(m){if(!this.nodes)return;const map={night:[293.66,329.63,369.99,440,493.88,587.33],dark:[220,246.94,261.63,329.63,349.23],bright:[392,440,493.88,587.33,659.25,783.99]};
    this.scale=map[m]||map.night;this.nodes.lp.frequency.setTargetAtTime(m==='dark'?360:m==='bright'?900:600,AU.t(),1.5)},
  tick(){if(!this.nodes||AU.muted||this.level<.05)return;const c=AU.ctx,t=c.currentTime;if(t<this.next)return;
    const f=this.scale[Math.floor(Math.random()*this.scale.length)]*(Math.random()<.3?.5:1);const o=c.createOscillator(),e=c.createGain();o.type='triangle';o.frequency.value=f;
    e.gain.setValueAtTime(.0001,t);e.gain.exponentialRampToValueAtTime(.04*this.level+.008,t+.03);e.gain.exponentialRampToValueAtTime(.0001,t+1.8);o.connect(e);e.connect(this.nodes.pl);o.start(t);o.stop(t+1.9);
    this.next=t+(this.level>.8?.55:1.5)+Math.random()*1.6}};

/* ===== Speech: Storyteller, Devas, Asuras (and the few other speakers) each get their own voice or pitch ===== */
const VOICE={story:{name:'Storyteller',col:C.saffron,pitch:1.02,rate:.9},devas:{name:'Devas',col:C.leaf,pitch:1.35,rate:1},asuras:{name:'Asuras',col:C.verm,pitch:.62,rate:.92},
  both:{name:'Devas & Asuras',col:C.violet,pitch:.95,rate:.95},vishnu:{name:'Lord Vishnu',col:C.peacock,pitch:.8,rate:.86},all:{name:'Everyone',col:C.gold,pitch:1.1,rate:.9}};
const Speech={ok:false,voices:[],pick:{},cur:null,
  init(){try{if(!('speechSynthesis' in window)||!window.SpeechSynthesisUtterance)return;this.ok=true;const load=()=>{try{this.voices=speechSynthesis.getVoices()||[]}catch(e){this.voices=[]}this.assign()};load();
    if(speechSynthesis.addEventListener)speechSynthesis.addEventListener('voiceschanged',load);else speechSynthesis.onvoiceschanged=load}catch(e){this.ok=false}},
  assign(){const en=this.voices.filter(v=>/^en/i.test(v.lang));if(!en.length){this.pick={};return}
    const score=v=>(/en[-_]IN/i.test(v.lang)?4:0)+(/en[-_]GB/i.test(v.lang)?1:0)+(v.localService?1:0);const by=en.slice().sort((a,b)=>score(b)-score(a));
    const fem=by.filter(v=>/female|woman|veena|heera|neerja|kalpana|samantha|karen|moira|tessa|zira|susan|serena|fiona|aria|jenny|sonia|libby|google uk english female/i.test(v.name));
    const male=by.filter(v=>/male|man\b|rishi|ravi|prabhat|daniel|david|george|alex|guy|ryan|thomas|fred|mark|james|google uk english male/i.test(v.name)&&!/female/i.test(v.name));
    const f0=fem[0]||by[0],f1=fem[1]||by[1]||f0,m0=male[0]||by[by.length>2?2:0]||f0,m1=male[1]||m0;
    this.pick={story:f0,devas:f1,asuras:m0,both:m1,vishnu:m0,all:f0}},
  available(){return this.ok&&this.voices.length>0},
  speak(who,text){return new Promise(res=>{if(!this.available()||AU.muted){res(false);return}let done=false;const fin=()=>{if(!done){done=true;clearTimeout(to);res(true)}};let to;
    try{const V=VOICE[who]||VOICE.story;const u=new SpeechSynthesisUtterance(text.replace(/[‘’]/g,"'").replace(/[“”]/g,''));u.pitch=V.pitch;u.rate=V.rate;
      const v=this.pick[who];if(v)u.voice=v;u.lang=v?v.lang:'en-IN';u.onend=fin;u.onerror=fin;this.cur=fin;speechSynthesis.speak(u);to=setTimeout(fin,Math.max(4000,text.length*95/V.rate+3000))}catch(e){fin()}})},
  stop(){try{if(this.ok)speechSynthesis.cancel()}catch(e){}if(this.cur){const f=this.cur;this.cur=null;f()}}};
