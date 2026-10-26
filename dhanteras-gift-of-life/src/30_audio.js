/* ===== Sound: a soft synthesized tanpura-and-bells score plus small effects, all under the narrator ===== */
const AU={ctx:null,master:null,music:null,fx:null,muted:false,musicOn:true,mood:'ocean',nextPluck:0,nextBeat:0,beat:0,nextBell:0,
  init(){if(this.ctx)return;try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;this.ctx=new C();
      this.master=this.ctx.createGain();this.master.gain.value=this.muted?0:.9;this.master.connect(this.ctx.destination);
      this.music=this.ctx.createGain();this.music.gain.value=.16;this.music.connect(this.master);
      this.fx=this.ctx.createGain();this.fx.gain.value=.3;this.fx.connect(this.master);
      const len=this.ctx.sampleRate*1.5;this.noise=this.ctx.createBuffer(1,len,this.ctx.sampleRate);const d=this.noise.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1}catch(e){this.ctx=null}},
  resume(){if(this.ctx&&this.ctx.state==='suspended')this.ctx.resume().catch(()=>{})},
  setMute(m){this.muted=m;if(this.master)this.master.gain.setTargetAtTime(m?0:.9,this.ctx.currentTime,.05)},
  setMusic(on){this.musicOn=on;if(this.music){this.music.gain.setTargetAtTime(on?.16:0,this.ctx.currentTime,.1);this.fx.gain.setTargetAtTime(on?.3:0,this.ctx.currentTime,.1)}},
  duck(on){if(this.music&&this.musicOn)this.music.gain.setTargetAtTime(on?.09:.16,this.ctx.currentTime,.3)},
  setMood(m){this.mood=m},
  tone(f,t,dur,type,gain,dest,att){const c=this.ctx,o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.value=f;
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(gain,t+(att||.01));g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(dest||this.music);o.start(t);o.stop(t+dur+.05);return o},
  pluck(f,t,gain){const c=this.ctx,o=c.createOscillator(),lp=c.createBiquadFilter(),g=c.createGain();o.type='sawtooth';o.frequency.value=f;lp.type='lowpass';
    lp.frequency.setValueAtTime(f*7,t);lp.frequency.exponentialRampToValueAtTime(f*1.6,t+1.6);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(gain,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+2.6);
    o.connect(lp);lp.connect(g);g.connect(this.music);o.start(t);o.stop(t+2.7)},
  noiseHit(t,dur,f,q,gain,dest,type){const c=this.ctx,s=c.createBufferSource(),bp=c.createBiquadFilter(),g=c.createGain();s.buffer=this.noise;bp.type=type||'bandpass';bp.frequency.value=f;bp.Q.value=q||1;
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(gain,t+dur*.3);g.gain.exponentialRampToValueAtTime(.0001,t+dur);s.connect(bp);bp.connect(g);g.connect(dest||this.fx);s.start(t);s.stop(t+dur+.05)},
  bell(f,t,gain,dest){[1,2.76,5.4].forEach((m,i)=>this.tone(f*m,t,1.8/(i+1),'sine',gain/(i*1.6+1),dest||this.music))},
  drum(t,hi,gain){const c=this.ctx,o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.setValueAtTime(hi?220:110,t);o.frequency.exponentialRampToValueAtTime(hi?160:58,t+.18);
    g.gain.setValueAtTime(gain,t);g.gain.exponentialRampToValueAtTime(.0001,t+.3);o.connect(g);g.connect(this.music);o.start(t);o.stop(t+.35);if(hi)this.noiseHit(t,.08,2400,2,gain*.25,this.music)},
  /* scheduled each frame: tanpura drone pattern, a dholak pulse while churning, bells for wonder */
  tick(){if(!this.ctx||this.ctx.state!=='running')return;const t=this.ctx.currentTime,m=this.mood;const SA=146.83,PA=SA*1.5;
    const tempo={ocean:1.25,churn:.9,poison:1.6,treasure:1.15,divine:1.4,reflect:1.35,festive:1}[m]||1.3;
    if(this.nextPluck<t-1)this.nextPluck=t+.05;
    while(this.nextPluck<t+.2){const seq=m==='poison'?[SA*.75,SA,SA,SA/2]:[PA/2,SA,SA,SA/2];const f=seq[this.beat%4];this.pluck(f,this.nextPluck,m==='poison'?.05:.07);this.beat++;this.nextPluck+=tempo}
    if(m==='churn'||m==='festive'){if(this.nextBeat<t-1)this.nextBeat=t+.05;const bt=m==='churn'?.42:.36;
      while(this.nextBeat<t+.2){const k=Math.round(this.nextBeat/bt)%4;this.drum(this.nextBeat,k%2===1,k===0?.32:.18);this.nextBeat+=bt}}
    if(m==='treasure'||m==='divine'||m==='festive'||m==='reflect'||m==='ocean'){if(this.nextBell<t-2)this.nextBell=t+1;
      while(this.nextBell<t+.2){const sc=[1,9/8,5/4,3/2,5/3,2];const f=SA*2*sc[(Math.random()*sc.length)|0];this.bell(f,this.nextBell,m==='ocean'?.025:.04);this.nextBell+=m==='ocean'?3.6:(m==='festive'?1.1:2.2)}}},
  sfx(name){if(!this.ctx||this.ctx.state!=='running')return;const t=this.ctx.currentTime;try{switch(name){
    case'wave':this.noiseHit(t,1.8,500,.7,.35,this.fx,'lowpass');break;
    case'bubble':for(let i=0;i<4;i++){const o=this.tone(320+Math.random()*300,t+i*.09,.14,'sine',.12,this.fx);o.frequency.exponentialRampToValueAtTime(900,t+i*.09+.12)}break;
    case'rumble':{const o=this.tone(46,t,2.2,'sawtooth',.22,this.fx,.3);this.noiseHit(t,2,120,.8,.4,this.fx,'lowpass');break}
    case'poison':[0,1].forEach(i=>this.tone(98+i*3.7,t,2.6,'triangle',.12,this.fx,.6));break;
    case'chime':this.bell(880,t,.16,this.fx);this.bell(1320,t+.12,.1,this.fx);break;
    case'pop':this.bell(660,t,.14,this.fx);break;
    case'accent':[293.7,370,440,587.3].forEach((f,i)=>this.tone(f,t+i*.06,3,'triangle',.07,this.fx,.4));this.bell(1174,t+.3,.12,this.fx);break;
    case'diya':this.bell(1046,t,.14,this.fx);this.tone(523,t,1.2,'sine',.08,this.fx);break;
    case'kind':[523,659,784].forEach((f,i)=>this.bell(f,t+i*.12,.1,this.fx));break;
  }}catch(e){}}};

/* ===== Narrator: browser speech synthesis, sentence by sentence; timed captions when speech is off or unavailable ===== */
const Narr={ok:'speechSynthesis' in window,voice:null,rate:.9,skipFn:null,fails:0,seq:0,
  init(){if(!this.ok)return;const pick=()=>{const vs=speechSynthesis.getVoices().filter(v=>/^en/i.test(v.lang));if(!vs.length)return;
      const pref=[/en-IN/i,/Google UK English Female/i,/(Veena|Heera|Neerja|Isha)/i,/(Samantha|Serena|Kate|Martha|Moira|Tessa|Karen)/i,/Female/i,/en-GB/i,/Google US English/i];
      for(const r of pref){const v=vs.find(v=>r.test(v.name)||r.test(v.lang));if(v){this.voice=v;return}}this.voice=vs[0]};
    pick();try{speechSynthesis.addEventListener('voiceschanged',pick)}catch(e){}},
  est(text){const w=text.trim().split(/\s+/).length;return 450+w*330/this.rate},
  stop(){if(this.ok)try{speechSynthesis.cancel()}catch(e){}if(this.skipFn){const f=this.skipFn;this.skipFn=null;f()}},
  /* resolves when the sentence has been read (or skipped); never waits forever. If the voice ends far too early
     (no voices installed, muted mid-sentence, a blocked engine) the caption still stays up for its reading time. */
  speak(text){return new Promise(res=>{let done=false,tm=null;const t0=Clock.now,seq=++this.seq;
      const fin=()=>{if(done)return;done=true;this.skipFn=null;Timers.cancel(tm);AU.duck(false);res()};
      const early=benign=>{if(done)return;const left=est-(Clock.now-t0);if(!benign&&seq===this.seq&&!AU.muted&&left>est*.7&&++this.fails>=2)this.ok=false;if(left<=300){fin();return}Timers.cancel(tm);tm=Timers.add(left,fin)};
      this.skipFn=()=>{if(this.ok)try{speechSynthesis.cancel()}catch(e){}fin()};
      const useVoice=this.ok&&!AU.muted&&Dir.speed<1.5;const est=this.est(text);
      tm=Timers.add(useVoice?est*2.2+2500:est,fin);
      if(!useVoice)return;
      try{const u=new SpeechSynthesisUtterance(text);if(this.voice)u.voice=this.voice;u.lang=this.voice?this.voice.lang:'en-IN';u.rate=this.rate;u.pitch=1.06;u.volume=1;
        u.onend=()=>{if(Clock.now-t0<est*.3)early();else{this.fails=0;fin()}};u.onerror=e=>early(!!(e&&/interrupt|cancel/.test(e.error||'')));AU.duck(true);speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){early()}})}};
