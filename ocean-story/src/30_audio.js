/* ===== Sound: synthesised SFX + gentle instrumental music behind one master gain ===== */
const AU={ctx:null,master:null,sfxG:null,muted:false,noiseBuf:null,
  init(){if(this.ctx)return;try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;this.ctx=new AC();
    this.master=this.ctx.createGain();this.master.gain.value=this.muted?0:1;this.master.connect(this.ctx.destination);
    this.sfxG=this.ctx.createGain();this.sfxG.gain.value=.7;this.sfxG.connect(this.master);
    const len=this.ctx.sampleRate*2,b=this.ctx.createBuffer(1,len,this.ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;this.noiseBuf=b;
    Music.init()}catch(e){this.ctx=null}},
  resume(){try{this.ctx&&this.ctx.state==='suspended'&&this.ctx.resume()}catch(e){}},
  setMute(m){this.muted=m;if(this.master)this.master.gain.setTargetAtTime(m?0:1,this.ctx.currentTime,.05)},
  osc(type,f,t0,dur,g,f2){const c=this.ctx,o=c.createOscillator(),e=c.createGain();o.type=type;o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+dur);
    e.gain.setValueAtTime(0.0001,t0);e.gain.exponentialRampToValueAtTime(g,t0+Math.min(.02,dur*.2));e.gain.exponentialRampToValueAtTime(0.0001,t0+dur);o.connect(e);e.connect(this.sfxG);o.start(t0);o.stop(t0+dur+.05)},
  noise(t0,dur,g,type,f,q,f2){const c=this.ctx,s=c.createBufferSource(),fl=c.createBiquadFilter(),e=c.createGain();s.buffer=this.noiseBuf;s.loop=true;fl.type=type||'bandpass';
    fl.frequency.setValueAtTime(f||1000,t0);if(f2)fl.frequency.exponentialRampToValueAtTime(f2,t0+dur);fl.Q.value=q||1;
    e.gain.setValueAtTime(0.0001,t0);e.gain.exponentialRampToValueAtTime(g,t0+Math.min(.25,dur*.35));e.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
    s.connect(fl);fl.connect(e);e.connect(this.sfxG);s.start(t0);s.stop(t0+dur+.05)},
  sfx(name){if(!this.ctx||this.muted)return;const t=this.ctx.currentTime;try{switch(name){
    case'sparkle':[1568,1976,2349,2637].forEach((f,i)=>this.osc('sine',f,t+i*.06,.5,.07));break;
    case'swish':this.noise(t,.9,.28,'bandpass',380,.9,1400);this.noise(t+.25,.8,.14,'bandpass',1200,1.2,500);break;
    case'chime':[880,1318.5,1760].forEach((f,i)=>this.osc('sine',f,t+i*.1,2.2-i*.4,.12-i*.025));break;
    case'bell':[[587.33,3.6,.16],[1174.7,2.6,.07],[1623,1.8,.04],[2349,1.2,.025]].forEach(([f,d,g])=>this.osc('sine',f,t,d,g));break;
    case'tap':this.osc('triangle',660,t,.1,.14);break;
    case'soft':this.osc('sine',523.25,t,.35,.1,440);break}}catch(e){}}};

/* tanpura-like drone on Sa and Pa with slow plucks from a pentatonic scale */
const Music={nodes:null,level:.5,next:0,
  init(){const c=AU.ctx;const g=c.createGain();g.gain.value=0;g.connect(AU.master);const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=480;lp.connect(g);
    [146.83,220,293.66].forEach((f,i)=>{const o=c.createOscillator();o.type='sawtooth';o.frequency.value=f*(1+(i-1)*.0015);const og=c.createGain();og.gain.value=i===2?.012:.026;o.connect(og);og.connect(lp);o.start()});
    const pl=c.createGain();pl.gain.value=1;pl.connect(g);this.nodes={g,lp,pl};this.setLevel(.5,3)},
  setLevel(v,sec){this.level=v;if(!this.nodes)return;this.nodes.g.gain.setTargetAtTime(v*.55,AU.ctx.currentTime,(sec||2)/3)},
  duck(on){if(this.level>0.05)this.setLevel(on?.35:.5,.8)},
  resolve(){if(!this.nodes)return;const c=AU.ctx,t=c.currentTime;[293.66,369.99,440,587.33].forEach((f,i)=>{const o=c.createOscillator(),e=c.createGain();o.type='triangle';o.frequency.value=f;
      e.gain.setValueAtTime(.0001,t+i*.35);e.gain.exponentialRampToValueAtTime(.06,t+i*.35+.03);e.gain.exponentialRampToValueAtTime(.0001,t+i*.35+2.6);o.connect(e);e.connect(this.nodes.pl);o.start(t+i*.35);o.stop(t+i*.35+2.7)});
    this.next=t+5;setTimeout(()=>AU.sfx('bell'),1500);setTimeout(()=>this.setLevel(.22,4),2500)},
  tick(){if(!this.nodes||AU.muted||this.level<.05)return;const c=AU.ctx,t=c.currentTime;if(t<this.next)return;
    const sc=[293.66,329.63,369.99,440,493.88,587.33,659.25];const f=sc[Math.floor(Math.random()*sc.length)]*(Math.random()<.3?.5:1);
    const o=c.createOscillator(),e=c.createGain();o.type='triangle';o.frequency.value=f;e.gain.setValueAtTime(.0001,t);e.gain.exponentialRampToValueAtTime(.04*this.level+.008,t+.02);
    e.gain.exponentialRampToValueAtTime(.0001,t+1.8);o.connect(e);e.connect(this.nodes.pl);o.start(t);o.stop(t+1.9);this.next=t+1.8+Math.random()*2.2}};

/* ===== Narrator: one warm, unhurried storyteller. The group call "Are you ready?" uses a brighter, raised pitch. ===== */
const VOICE={nar:{pitch:.95,rate:.86},call:{pitch:1.45,rate:.98}};
const Speech={ok:false,voices:[],voice:null,
  init(){try{if(!('speechSynthesis' in window)||!window.SpeechSynthesisUtterance)return;this.ok=true;const load=()=>{this.voices=speechSynthesis.getVoices()||[];this.pick()};load();
    speechSynthesis.onvoiceschanged=load}catch(e){this.ok=false}},
  pick(){const en=this.voices.filter(v=>/^en/i.test(v.lang));if(!en.length){this.voice=null;return}
    const warm=/female|veena|heera|neerja|kalpana|samantha|karen|moira|tessa|serena|fiona|libby|sonia|aria|jenny|natasha/i;
    const score=v=>(/en[-_]IN/i.test(v.lang)?4:0)+(warm.test(v.name)?2:0)+(/natural|neural|enhanced|premium/i.test(v.name)?2:0)+(/en[-_]GB/i.test(v.lang)?1:0)+(v.localService?.5:0);
    this.voice=en.slice().sort((a,b)=>score(b)-score(a))[0]},
  available(){return this.ok&&this.voices.length>0},
  speak(kind,text){return new Promise(res=>{if(!this.available()||AU.muted){res(false);return}
    let done=false;const fin=()=>{if(!done){done=true;res(true)}};
    try{const u=new SpeechSynthesisUtterance(text.replace(/[“”"]/g,'').replace(/[‘’]/g,"'"));const V=VOICE[kind]||VOICE.nar;u.pitch=V.pitch;u.rate=V.rate;
      if(this.voice){u.voice=this.voice;u.lang=this.voice.lang}else u.lang='en-IN';u.onend=fin;u.onerror=fin;this.cur=fin;speechSynthesis.speak(u);
      setTimeout(fin,Math.max(4000,text.length*95/V.rate+3000))}catch(e){fin()}})},
  stop(){try{if(this.ok)speechSynthesis.cancel()}catch(e){}if(this.cur){const f=this.cur;this.cur=null;f()}}};
