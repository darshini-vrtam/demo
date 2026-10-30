"""Run both episodes headless (fast-forward), log every spoken line, and confirm each narrated line is verbatim in source/narration.md."""
import json,subprocess,sys,os,re
d=os.path.dirname(os.path.abspath(__file__))
js=r'''
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1280,height:720}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file://'+process.argv[2]+'#qa');await pg.waitForFunction(()=>window.__qa);await pg.evaluate(()=>{window.__said=[];window.__qa.go('none','end',{})});
for(let i=0;i<600;i++){await pg.waitForTimeout(200);if(await pg.evaluate(()=>!document.getElementById('end').hidden&&D.scene&&D.scene.id==='2.10'))break}
const r=await pg.evaluate(()=>({noclip:window.__said.filter(p=>!Clips.has(p[0],p[1])).concat(SHLOKA.filter(l=>!Clips.has('shloka',l.dv)).map(l=>['shloka',l.dv])),clips:Clips.ids.size,said:window.__said,scene:D.scene.id,end:document.getElementById('endTitle').textContent,line:document.getElementById('endLine').textContent,deva:[...document.querySelectorAll('#shlokaLines .dv')].map(e=>e.textContent),tr:[...document.querySelectorAll('#shlokaLines .tr')].map(e=>e.textContent)}));
r.errs=errs;console.log(JSON.stringify(r));await b.close()})();'''
open('/tmp/claude-0/run_all.js','w').write(js)
out=subprocess.run(['node','/tmp/claude-0/run_all.js',os.path.join(d,'diwali-rama.html')],capture_output=True,text=True,cwd='/tmp').stdout
r=json.loads(out.strip().splitlines()[-1])
src=open(os.path.join(d,'source/narration.md')).read()
norm=lambda t:re.sub(r'\s+',' ',t.replace('“','').replace('”','')).strip()
S=norm(src)
builder=[];bad=[]
for v,t in r['said']:
  if norm(t) in S: continue
  builder.append((v,t))
print('scene reached:',r['scene'],'| end card:',r['end'],'/',r['line'])
print('page errors:',r['errs'])
print('narration clips:',r['clips'],'| spoken lines without a clip:',len(r['noclip']))
for v,t in r['noclip']: print('  no clip [%s] %s'%(v,t))
print('lines spoken:',len(r['said']),'| not in story doc:',len(builder))
for v,t in builder: print('  [%s] %s'%(v,t))
want=['शुभं करोति कल्याणम्','आरोग्यं धनसम्पदा ।','शत्रुबुद्धिविनाशाय','दीपज्योतिर्नमोऽस्तुते ॥']
print('Devanagari matches supplied text:',r['deva']==want, '| transliteration:',r['tr'])
