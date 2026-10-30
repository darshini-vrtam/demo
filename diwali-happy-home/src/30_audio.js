/* ===== Sound: synthesised cues, ocean ambience and soft ambient music behind one master gain (respects mute). No audio files. ===== */
const AU={ctx:null,master:null,vol:.55,sfxG:null,muted:false,noiseBuf:null,
  init(){if(this.ctx)return;try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;this.ctx=new AC();
    this.master=this.ctx.createGain();this.master.gain.value=this.muted?0:this.vol;this.master.connect(this.ctx.destination);
    this.sfxG=this.ctx.createGain();this.sfxG.gain.value=.7;this.sfxG.connect(this.master);
    const len=this.ctx.sampleRate*2,b=this.ctx.createBuffer(1,len,this.ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;this.noiseBuf=b;
    Music.init()}catch(e){this.ctx=null}},
  resume(){try{this.ctx&&this.ctx.state==='suspended'&&this.ctx.resume()}catch(e){}},
  setMute(m){this.muted=m;if(this.master)this.master.gain.setTargetAtTime(m?0:this.vol,this.ctx.currentTime,.05)},
  t(){return this.ctx.currentTime},
  osc(type,f,t0,dur,g,dest,f2){const c=this.ctx,o=c.createOscillator(),e=c.createGain();o.type=type;o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+dur);
    e.gain.setValueAtTime(0.0001,t0);e.gain.exponentialRampToValueAtTime(g,t0+Math.min(.04,dur*.2));e.gain.exponentialRampToValueAtTime(0.0001,t0+dur);o.connect(e);e.connect(dest||this.sfxG);o.start(t0);o.stop(t0+dur+.05);return o},
  noise(t0,dur,g,type,f,q,f2){const c=this.ctx,s=c.createBufferSource(),fl=c.createBiquadFilter(),e=c.createGain();s.buffer=this.noiseBuf;s.loop=true;fl.type=type||'bandpass';
    fl.frequency.setValueAtTime(f||1000,t0);if(f2)fl.frequency.exponentialRampToValueAtTime(f2,t0+dur);fl.Q.value=q||1;
    e.gain.setValueAtTime(0.0001,t0);e.gain.exponentialRampToValueAtTime(g,t0+Math.min(.25,dur*.3));e.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
    s.connect(fl);fl.connect(e);e.connect(this.sfxG);s.start(t0);s.stop(t0+dur+.05)},
  sfx(name){if(!this.ctx||this.muted)return;const t=this.t();try{switch(name){
    case'ripple':this.noise(t,.9,.16,'bandpass',500,1.4,1400);this.osc('sine',300,t,.5,.05,null,520);break;
    case'pop':this.osc('sine',620,t,.09,.2,null,1300);break;
    case'chime':[880,1320,1760,2217].forEach((f,i)=>this.osc('sine',f,t+i*.09,2.4-i*.3,.12-i*.02));break;
    case'soft':[784,1175].forEach((f,i)=>this.osc('sine',f,t+i*.08,1.4,.08));break;/* blessing card selected */
    case'found':[659,988,1319].forEach((f,i)=>this.osc('triangle',f,t+i*.1,.9,.1));break;/* treasure discovered */
    case'success':[523,659,784,1047].forEach((f,i)=>this.osc('triangle',f,t+i*.12,.8,.12));break;
    case'bell':[660,1320,1980].forEach((f,i)=>this.osc('sine',f,t,2.8-i*.6,.14/(i+1)));break;
    case'sparkle':for(let i=0;i<6;i++)this.osc('sine',1175+i*196,t+i*.07,.5,.05);break;
    case'rise':[196,247,294,392,494,587].forEach((f,i)=>this.osc('sine',f,t+i*.32,2.6,.06));this.noise(t,2.4,.05,'bandpass',600,2,2400);break;/* gentle rising cue as the lotus opens */
    case'petal':[1047,1319,1568].forEach((f,i)=>this.osc('sine',f,t+i*.12,1.6,.07));break;/* soft chimes per petal row */
    case'swell':[262,330,392,523].forEach((f,i)=>this.osc('sine',f,t+i*.25,3.2,.07));break;
    case'wave':this.osc('sine',220,t,1.2,.04);this.osc('sine',330,t+.05,1.1,.025);break;/* gentle sound-wave tone with each chant phrase */
    case'tick':this.osc('sine',988,t,.6,.07);this.osc('sine',1480,t+.06,.7,.04);break;/* fallback chime per phrase */
    case'tap':this.osc('triangle',660,t,.1,.1);break;
    case'drum':this.osc('sine',120,t,.32,.36,null,62);this.noise(t,.08,.1,'lowpass',400,.7);break;
    case'creak':{const c=this.ctx,o=c.createOscillator(),fl=c.createBiquadFilter(),e=c.createGain();o.type='sawtooth';o.frequency.setValueAtTime(80,t);
      for(let i=0;i<10;i++)o.frequency.linearRampToValueAtTime(80+Math.sin(i*1.7)*18+i*3,t+i*.09);fl.type='bandpass';fl.frequency.value=700;fl.Q.value=7;
      e.gain.setValueAtTime(.0001,t);e.gain.exponentialRampToValueAtTime(.12,t+.15);e.gain.exponentialRampToValueAtTime(.0001,t+1);o.connect(fl);fl.connect(e);e.connect(this.sfxG);o.start(t);o.stop(t+1.05);break}}}catch(e){}}};

/* ambient music: a low tanpura-like drone, slow pentatonic plucks and a soft ocean wash; level and colour follow the mood */
const Music={nodes:null,level:.5,next:0,ducked:false,moodName:'evening',off:false,
  MOODS:{ocean:{lp:620,pl:1.8,sea:.5,scale:[293.66,329.63,369.99,440,493.88,587.33]},mystery:{lp:380,pl:2.8,sea:.4,scale:[293.66,349.23,392,440,523.25]},
    warm:{lp:1100,pl:.75,sea:.25,scale:[293.66,369.99,440,493.88,587.33,739.99,880]},cream:{lp:900,pl:1.5,sea:0,scale:[293.66,329.63,369.99,440,493.88,587.33,659.25]},
    prayer:{lp:520,pl:4,sea:0,scale:[293.66,440,587.33]},evening:{lp:760,pl:1.6,sea:0,scale:[261.63,293.66,329.63,392,440,523.25]},home:{lp:950,pl:1.1,sea:0,scale:[293.66,329.63,369.99,440,493.88,587.33,659.25]}},
  init(){const c=AU.ctx;const g=c.createGain();g.gain.value=0;g.connect(AU.master);const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=600;lp.connect(g);
    const dr=[146.83,220,293.66].map((f,i)=>{const o=c.createOscillator();o.type=i===2?'triangle':'sawtooth';o.frequency.value=f;o.detune.value=(i-1)*4;const og=c.createGain();og.gain.value=i===2?.012:.022;o.connect(og);og.connect(lp);o.start();return o});
    const pl=c.createGain();pl.gain.value=1;pl.connect(g);
    /* ocean wash: looping noise through a lowpass whose gain breathes slowly */
    const s=c.createBufferSource();s.buffer=AU.noiseBuf;s.loop=true;const sf=c.createBiquadFilter();sf.type='lowpass';sf.frequency.value=420;const sg=c.createGain();sg.gain.value=0;
    const lfo=c.createOscillator();lfo.frequency.value=.09;const lg=c.createGain();lg.gain.value=.02;lfo.connect(lg);lg.connect(sg.gain);lfo.start();
    s.connect(sf);sf.connect(sg);sg.connect(AU.master);s.start();this.nodes={g,lp,pl,dr,sg};this.mood(this.moodName);this.setLevel(this.level,3)},
  setLevel(v,sec){this.level=v;if(!this.nodes)return;this.nodes.g.gain.setTargetAtTime(this.off?0:v*(this.ducked?.28:.6),AU.t(),(sec||2)/3)},
  toggle(){this.off=!this.off;this.setLevel(this.level,.3);this.duck(this.ducked);return this.off},
  duck(on){this.ducked=on;this.setLevel(this.level,.5);if(this.nodes){const M=this.MOODS[this.moodName]||{};this.nodes.sg.gain.setTargetAtTime(this.off?0:(M.sea||0)*.05*(on?.45:1),AU.t(),.3)}},
  swell(){AU.sfx('swell');this.setLevel(1,2);setTimeout(()=>{if(this.level===1)this.setLevel(.55,4)},9000)},
  mood(m){this.moodName=m;if(!this.nodes)return;const M=this.MOODS[m]||this.MOODS.ocean;this.nodes.lp.frequency.setTargetAtTime(M.lp,AU.t(),1.5);this.nodes.sg.gain.setTargetAtTime((M.sea||0)*.05,AU.t(),1.5)},
  tick(){if(!this.nodes||AU.muted||this.off||this.level<.06)return;const c=AU.ctx,t=c.currentTime;if(t<this.next)return;const M=this.MOODS[this.moodName]||this.MOODS.ocean;
    const sc=M.scale;const f=sc[Math.floor(Math.random()*sc.length)]*(Math.random()<.3?.5:1);
    const o=c.createOscillator(),e=c.createGain();o.type='triangle';o.frequency.value=f;e.gain.setValueAtTime(.0001,t);e.gain.exponentialRampToValueAtTime((.04*this.level+.006)*(this.ducked?.4:1),t+.02);
    e.gain.exponentialRampToValueAtTime(.0001,t+1.8);o.connect(e);e.connect(this.nodes.pl);o.start(t);o.stop(t+1.9);this.next=t+M.pl*(this.level>.8?.6:1)+Math.random()*1.6}};

/* ===== Speech: the Narrator, the Golden Light (same family of voice, much higher and softer) and the shloka chant (Hindi voice when available) ===== */
const VOICE={narr:{name:'Narrator',col:P.turmeric,pitch:1,rate:.9},gran:{name:'Grandmother',col:P.dred,pitch:.78,rate:.8},light:{name:'The Golden Light',col:P.gold,pitch:1.8,rate:.96,vol:.85},
  chant:{name:'Shloka',col:P.verm,pitch:.92,rate:.55}};
const Speech={ok:false,voices:[],pick:{},hindi:null,
  init(){try{if(!('speechSynthesis' in window)||!window.SpeechSynthesisUtterance)return;this.ok=true;const load=()=>{this.voices=speechSynthesis.getVoices()||[];this.assign()};load();
    speechSynthesis.onvoiceschanged=load}catch(e){this.ok=false}},
  assign(){const en=this.voices.filter(v=>/^en/i.test(v.lang));
    this.hindi=this.voices.find(v=>/^hi[-_]?IN/i.test(v.lang))||this.voices.find(v=>/^hi/i.test(v.lang))||null;
    if(!en.length){this.pick={chant:this.hindi};return}
    const score=v=>(/en[-_]IN/i.test(v.lang)?4:0)+(/natural|neural|enhanced|premium/i.test(v.name)?2:0)+(/en[-_]GB/i.test(v.lang)?1:0)+(v.localService?.5:0);const by=en.slice().sort((a,b)=>score(b)-score(a));
    const fem=by.filter(v=>/female|woman|veena|heera|neerja|kalpana|samantha|karen|moira|tessa|zira|susan|serena|fiona|aria|jenny|sonia|libby|natasha/i.test(v.name));
    const n=by[0];const lt=fem.find(v=>v!==n)||fem[0]||n;this.pick={narr:n,light:lt,gran:fem.find(v=>v!==n&&v!==lt)||fem[0]||n,chant:this.hindi}},
  available(){return this.ok&&this.voices.length>0},
  hasChant(){return this.available()&&!!this.hindi},
  /* speaks one part; word cues fire on boundaries when the browser reports them, otherwise on an estimate */
  speak(who,text,mood,onWord,o_rate){return new Promise(res=>{if(!this.available()||AU.muted||(who==='chant'&&!this.hindi)){res(false);return}
    let done=false;const fin=()=>{if(!done){done=true;res(true)}};
    try{const u=new SpeechSynthesisUtterance(who==='chant'?text:text.replace(/[“”"*]/g,'').replace(/[‘’]/g,"'").replace(/—/g,', '));const V=VOICE[who]||VOICE.narr;const md=mood||{};
      u.pitch=clamp(V.pitch*(who==='narr'?(md.pitch||1):1),.1,2);u.rate=clamp(V.rate*(who==='narr'?(md.rate||1):1),.5,1.5);u.volume=V.vol||(who==='narr'?(md.vol||1):1);if(o_rate)u.rate=o_rate;
      const v=this.pick[who];if(v)u.voice=v;u.lang=v?v.lang:(who==='chant'?'hi-IN':'en-IN');u.onend=fin;u.onerror=fin;if(onWord)u.onboundary=e=>{if(e.name==='word'||e.name==null)onWord(e.charIndex)};
      this.cur=fin;speechSynthesis.speak(u);setTimeout(fin,Math.max(4000,text.length*(who==='chant'?220:95)/u.rate+3000))}catch(e){fin()}})},
  stop(){try{if(this.ok)speechSynthesis.cancel()}catch(e){}if(this.cur){const f=this.cur;this.cur=null;f()}}};
function canSpeak(v){return !AU.muted&&(v==='chant'?Speech.hasChant():Speech.available())}
