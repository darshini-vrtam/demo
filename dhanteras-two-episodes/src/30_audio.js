/* ===== Sound: synthesised cues and soft ambient music, all behind one master gain (respects mute) ===== */
const AU={ctx:null,master:null,sfxG:null,muted:false,noiseBuf:null,
  init(){if(this.ctx)return;try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;this.ctx=new AC();
    this.master=this.ctx.createGain();this.master.gain.value=this.muted?0:1;this.master.connect(this.ctx.destination);
    this.sfxG=this.ctx.createGain();this.sfxG.gain.value=.7;this.sfxG.connect(this.master);
    const len=this.ctx.sampleRate*2,b=this.ctx.createBuffer(1,len,this.ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;this.noiseBuf=b;
    Music.init()}catch(e){this.ctx=null}},
  resume(){try{this.ctx&&this.ctx.state==='suspended'&&this.ctx.resume()}catch(e){}},
  setMute(m){this.muted=m;if(this.master)this.master.gain.setTargetAtTime(m?0:1,this.ctx.currentTime,.05)},
  t(){return this.ctx.currentTime},
  osc(type,f,t0,dur,g,dest,f2){const c=this.ctx,o=c.createOscillator(),e=c.createGain();o.type=type;o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+dur);
    e.gain.setValueAtTime(0.0001,t0);e.gain.exponentialRampToValueAtTime(g,t0+Math.min(.04,dur*.2));e.gain.exponentialRampToValueAtTime(0.0001,t0+dur);o.connect(e);e.connect(dest||this.sfxG);o.start(t0);o.stop(t0+dur+.05);return o},
  noise(t0,dur,g,type,f,q,f2){const c=this.ctx,s=c.createBufferSource(),fl=c.createBiquadFilter(),e=c.createGain();s.buffer=this.noiseBuf;s.loop=true;fl.type=type||'bandpass';
    fl.frequency.setValueAtTime(f||1000,t0);if(f2)fl.frequency.exponentialRampToValueAtTime(f2,t0+dur);fl.Q.value=q||1;
    e.gain.setValueAtTime(0.0001,t0);e.gain.exponentialRampToValueAtTime(g,t0+Math.min(.25,dur*.3));e.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
    s.connect(fl);fl.connect(e);e.connect(this.sfxG);s.start(t0);s.stop(t0+dur+.05)},
  /* a voiced tone through a formant filter (cow, elephant) */
  voice(t,seq,type,ff,q,g){const c=this.ctx,o=c.createOscillator(),fl=c.createBiquadFilter(),e=c.createGain();o.type=type;o.frequency.setValueAtTime(seq[0][1],t);
    seq.forEach(([dt,f])=>o.frequency.linearRampToValueAtTime(f,t+dt));fl.type='bandpass';fl.frequency.value=ff;fl.Q.value=q;const end=seq[seq.length-1][0];
    e.gain.setValueAtTime(.0001,t);e.gain.exponentialRampToValueAtTime(g,t+.12);e.gain.setValueAtTime(g,t+end-.25);e.gain.exponentialRampToValueAtTime(.0001,t+end);
    o.connect(fl);fl.connect(e);e.connect(this.sfxG);o.start(t);o.stop(t+end+.05)},
  sfx(name){if(!this.ctx||this.muted)return;const t=this.t();try{switch(name){
    case'ripple':this.noise(t,.9,.22,'bandpass',500,1.4,1400);this.osc('sine',300,t,.5,.06,null,520);break;
    case'bubble':for(let i=0;i<3;i++)this.osc('sine',380+i*140,t+i*.07,.12,.18,null,900+i*200);break;
    case'pop':this.osc('sine',620,t,.09,.22,null,1300);break;
    case'chime':[880,1320,1760,2217].forEach((f,i)=>this.osc('sine',f,t+i*.09,2.4-i*.3,.14-i*.022));break;
    case'success':[523,659,784,1047].forEach((f,i)=>this.osc('triangle',f,t+i*.1,.6,.14));break;
    case'rumble':this.noise(t,1.4,.5,'lowpass',140,.8,70);this.osc('sine',58,t,1.2,.25,null,42);break;
    case'shell':[196,294,392].forEach((f,i)=>this.osc('sine',f,t+i*.05,2.2,.12));this.noise(t,1.2,.08,'bandpass',900,6);break;
    case'creak':{const c=this.ctx,o=c.createOscillator(),fl=c.createBiquadFilter(),e=c.createGain();o.type='sawtooth';o.frequency.setValueAtTime(80,t);
      for(let i=0;i<10;i++)o.frequency.linearRampToValueAtTime(80+Math.sin(i*1.7)*18+i*3,t+i*.09);fl.type='bandpass';fl.frequency.value=700;fl.Q.value=7;
      e.gain.setValueAtTime(.0001,t);e.gain.exponentialRampToValueAtTime(.16,t+.15);e.gain.exponentialRampToValueAtTime(.0001,t+1);o.connect(fl);fl.connect(e);e.connect(this.sfxG);o.start(t);o.stop(t+1.05);break}
    case'drum':this.osc('sine',120,t,.32,.42,null,62);this.noise(t,.08,.12,'lowpass',400,.7);break;
    case'hush':this.noise(t,2.6,.12,'lowpass',380,.6,180);break;
    case'bell':[660,1320,1980].forEach((f,i)=>this.osc('sine',f,t,2.8-i*.6,.16/(i+1)));break;
    case'cow':this.voice(t,[[0,118],[.35,126],[1.0,104],[1.4,96]],'sawtooth',420,4,.24);break;
    case'elephant':this.voice(t,[[0,420],[.2,760],[.55,820],[.9,560]],'sawtooth',1300,5,.14);this.noise(t,.9,.08,'bandpass',1800,3);break;
    case'sparkle':for(let i=0;i<6;i++)this.osc('sine',1175+i*196,t+i*.07,.5,.06);break;
    case'swell':[262,330,392,523].forEach((f,i)=>this.osc('sine',f,t+i*.25,3.2,.08));break;
    case'diya':this.osc('sine',1568,t,.5,.1);this.osc('sine',2093,t+.08,.6,.07);break;
    case'swish':this.noise(t,.6,.2,'bandpass',600,1,2000);break;
    case'tap':this.osc('triangle',660,t,.1,.14);break;
    case'drop':this.osc('sine',880,t,.25,.18,null,660);this.osc('triangle',1320,t+.05,.2,.07);break;
    case'soft':this.osc('sine',520,t,.25,.12,null,440);break}}catch(e){}}};

/* ambient music: a low drone and slow pentatonic plucks; level and filter follow the mood */
const Music={nodes:null,level:.5,next:0,ducked:false,
  init(){const c=AU.ctx;const g=c.createGain();g.gain.value=0;g.connect(AU.master);const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=560;lp.connect(g);
    const dr=[146.83,220].map(f=>{const o=c.createOscillator();o.type='sawtooth';o.frequency.value=f;const og=c.createGain();og.gain.value=.028;o.connect(og);og.connect(lp);o.start();return o});
    const pl=c.createGain();pl.gain.value=1;pl.connect(g);this.nodes={g,lp,pl,dr};this.setLevel(this.level,3)},
  setLevel(v,sec){this.level=v;if(!this.nodes)return;this.nodes.g.gain.setTargetAtTime(v*(this.ducked?.45:.6),AU.t(),(sec||2)/3)},
  duck(on){this.ducked=on;this.setLevel(this.level,.6)},
  swell(){AU.sfx('swell');this.setLevel(1,2);setTimeout(()=>{if(this.level===1)this.setLevel(.55,4)},9000)},
  mood(m){if(!this.nodes)return;this.nodes.lp.frequency.setTargetAtTime(m==='poison'?260:m==='divine'?820:600,AU.t(),1.5)},
  tick(){if(!this.nodes||AU.muted||this.level<.08)return;const c=AU.ctx,t=c.currentTime;if(t<this.next)return;
    const sc=[293.66,329.63,369.99,440,493.88,587.33,659.25];const f=sc[Math.floor(Math.random()*sc.length)]*(Math.random()<.3?.5:1);
    const o=c.createOscillator(),e=c.createGain();o.type='triangle';o.frequency.value=f;e.gain.setValueAtTime(.0001,t);e.gain.exponentialRampToValueAtTime(.045*this.level+.008,t+.02);
    e.gain.exponentialRampToValueAtTime(.0001,t+1.6);o.connect(e);e.connect(this.nodes.pl);o.start(t);o.stop(t+1.7);this.next=t+(this.level>.8?.8:1.7)+Math.random()*1.8}};

/* ===== Speech: the Narrator, Lord Vishnu, the devas and the asuras each get their own voice or pitch ===== */
const VOICE={narr:{name:'Narrator',col:P.turmeric,pitch:.98,rate:.86},vishnu:{name:'Lord Vishnu',col:P.sea,pitch:.62,rate:.78},
  devas:{name:'The devas',col:P.verm,pitch:1.32,rate:.95},asuras:{name:'The asuras',col:P.leaf,pitch:.68,rate:.86},
  both:{name:'Devas and asuras',col:P.violet,pitch:1,rate:.9},shloka:{name:'Narrator',col:P.turmeric,pitch:.96,rate:.7}};
const Speech={ok:false,voices:[],pick:{},
  init(){try{if(!('speechSynthesis' in window)||!window.SpeechSynthesisUtterance)return;this.ok=true;const load=()=>{this.voices=speechSynthesis.getVoices()||[];this.assign()};load();
    speechSynthesis.onvoiceschanged=load}catch(e){this.ok=false}},
  assign(){const en=this.voices.filter(v=>/^en/i.test(v.lang));if(!en.length){this.pick={};this.hindi=this.voices.find(v=>/^hi/i.test(v.lang))||null;this.pick.shloka=this.hindi;return}
    const score=v=>(/en[-_]IN/i.test(v.lang)?4:0)+(/natural|neural|enhanced|premium/i.test(v.name)?2:0)+(/en[-_]GB/i.test(v.lang)?1:0)+(v.localService?.5:0);const by=en.slice().sort((a,b)=>score(b)-score(a));
    const fem=by.filter(v=>/female|woman|veena|heera|neerja|kalpana|samantha|karen|moira|tessa|zira|susan|serena|fiona|aria|jenny|sonia|libby|natasha/i.test(v.name));
    const male=by.filter(v=>/male|man\b|rishi|ravi|prabhat|daniel|david|george|alex|guy|ryan|thomas|fred|mark|james/i.test(v.name)&&!/female/i.test(v.name));
    const n=fem[0]||by[0],m=male[0]||by[0];this.pick={narr:n,vishnu:m,devas:fem[1]||n,asuras:male[1]||m,both:n};
    this.hindi=this.voices.find(v=>/^hi[-_]?IN/i.test(v.lang))||this.voices.find(v=>/^hi/i.test(v.lang))||null;this.pick.shloka=this.hindi},
  available(){return this.ok&&this.voices.length>0},
  /* speaks one part; cues fire on word boundaries when the browser reports them, otherwise on an estimate */
  speak(who,text,mood,onWord){return new Promise(res=>{if(!this.available()||AU.muted){res(false);return}
    let done=false;const fin=()=>{if(!done){done=true;res(true)}};
    try{const u=new SpeechSynthesisUtterance(text.replace(/[“”"*]/g,'').replace(/[‘’]/g,"'").replace(/—/g,', '));const V=VOICE[who]||VOICE.narr;const md=mood||{};
      u.pitch=clamp(V.pitch*(who==='narr'?(md.pitch||1):1),.1,2);u.rate=clamp(V.rate*(who==='narr'?(md.rate||1):1),.5,1.5);u.volume=who==='narr'?(md.vol||1):1;
      const v=this.pick[who];if(v)u.voice=v;u.lang=v?v.lang:(who==='shloka'?'hi-IN':'en-IN');u.onend=fin;u.onerror=fin;if(onWord)u.onboundary=e=>{if(e.name==='word'||e.name==null)onWord(e.charIndex)};
      this.cur=fin;speechSynthesis.speak(u);setTimeout(fin,Math.max(4000,text.length*95/u.rate+3000))}catch(e){fin()}})},
  stop(){try{if(this.ok)speechSynthesis.cancel()}catch(e){}if(this.cur){const f=this.cur;this.cur=null;f()}}};
