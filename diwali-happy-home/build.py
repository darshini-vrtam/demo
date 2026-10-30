import glob,os,re,sys
d=os.path.dirname(os.path.abspath(__file__))
# Episode 1 modules reused as they are: patterns, motifs, Lakshmi, the Golden Light, the Diwali home, the lotus, the director, the scene kit, input and camera
EP1=os.path.join(d,'..','diwali-golden-lotus','src')
SHARED=['10_patterns.js','11_motifs.js','22_lakshmi.js','23_light.js','24_home.js','26_lotus.js','40_director.js','45_kit.js','46_fx.js']
files={os.path.basename(f):f for f in [os.path.join(EP1,n) for n in SHARED]}
for f in glob.glob(os.path.join(d,'src/*.js')):files[os.path.basename(f)]=f
head=open(os.path.join(d,'src/head.html')).read()
js='\n'.join(open(files[k]).read() for k in sorted(files))
body='\n<script>\n'+js+'\n</script>\n'
open(os.path.join(d,'diwali-happy-home.html'),'w').write(head+body+'</body>\n</html>\n')
art=re.sub(r'<!doctype html>\s*<html[^>]*>\s*<head>\s*<meta charset="utf-8">\s*<meta name="viewport"[^>]*>\s*','',head,flags=re.I).replace('</head>\n<body>\n','')
if len(sys.argv)>1:open(sys.argv[1],'w').write(art+body)
print(len(head+body),'bytes',sorted(files))
