/* ===== Activities show their instruction in a banner at the top, so the bottom of the picture stays free for the tray ===== */
D.instr=function(ins,cnt,icon){this.actOn=true;const b=$('banner'),p=$('bannerText');p.innerHTML='';if(icon)p.insertAdjacentHTML('beforeend',ICON[icon]||'');p.append(document.createTextNode(ins||''));
  b.classList.remove('hint');this.baseIns=p.innerHTML;b.hidden=!ins;$('actText').hidden=true;if($('cap').hidden)$('act').hidden=false};
D.hint=function(t,ms){const b=$('banner'),p=$('bannerText');p.innerHTML='';p.insertAdjacentHTML('beforeend',ICON.leaf);p.append(document.createTextNode(t));b.classList.add('hint');b.hidden=false;clearTimeout(this.hintTimer);
  this.hintTimer=setTimeout(()=>{p.innerHTML=this.baseIns||'';b.classList.remove('hint');if(!this.baseIns)b.hidden=true},ms||6000)};
{const ca=D.clearAct.bind(D);D.clearAct=function(){ca();$('banner').hidden=true;$('bannerText').textContent='';this.baseIns=''}}
ICON.drag='<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M6 30C14 14 24 12 34 8M34 8l-9 1M34 8l-3 9" fill="none" stroke="#111111" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="8" cy="30" r="5" fill="#F5C400" stroke="#111111" stroke-width="2.6"/></svg>';
ICON.play='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5l12 7-12 7z" fill="#111111"/></svg>';
ICON.pause='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="#111111"/></svg>';
ICON.replay='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12a7 7 0 1 0 2.2-5.1M5 4v4h4" fill="none" stroke="#111111" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
ICON.music='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 17V5l10-2v12" fill="none" stroke="#111111" stroke-width="2.4" stroke-linejoin="round"/><circle cx="6.5" cy="17" r="2.6" fill="#111111"/><circle cx="16.5" cy="15" r="2.6" fill="#111111"/></svg>';
