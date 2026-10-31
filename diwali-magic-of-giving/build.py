import glob,os,re,sys
d=os.path.dirname(os.path.abspath(__file__))
# Episode 1 and 2 modules reused as they are (patterns, motifs, Lakshmi, the Golden Light, the home, the family, the director, input and camera)
E1=os.path.join(d,'..','diwali-golden-lotus','src');E2=os.path.join(d,'..','diwali-happy-home','src')
SHARED=[(E1,n) for n in ['10_patterns.js','11_motifs.js','22_lakshmi.js','23_light.js','24_home.js','25_blessings.js','26_lotus.js','40_director.js','45_kit.js','46_fx.js']]+\
       [(E2,n) for n in ['21_people.js','24b_home2.js','41_banner.js','50_stage.js']]
files={n:os.path.join(p,n) for p,n in SHARED}
for f in glob.glob(os.path.join(d,'src/*.js')):files[os.path.basename(f)]=f
js='\n'.join(open(files[k]).read() for k in sorted(files))
# this episode's palette has nine tokens: every colour written into the shared drawing code maps onto them
MAP={'#121649':'#1B2A5C','#23297A':'#1FA7A8','#2C7CC4':'#1FA7A8','#17B2AE':'#1FA7A8','#0F8F94':'#1FA7A8','#FFF4D9':'#FFF3D6','#FFFFFF':'#FFF3D6',
  '#F2755E':'#F28A1E','#E45C9A':'#E8579A','#C2297D':'#E8579A','#E03C1F':'#B3202A','#A81E1E':'#B3202A','#C25E3A':'#B3202A','#E3A700':'#F28A1E',
  '#F5C400':'#F4B400','#3F9B49':'#3F9A47','#D9964B':'#F28A1E','#A8643A':'#F28A1E','#B9B2A8':'#FFF3D6','#111111':'#1B1411'}
for a,b in MAP.items():js=re.sub(re.escape(a),b,js,flags=re.I)
head=open(os.path.join(d,'src/head.html')).read()
body='\n<script>\n'+js+'\n</script>\n'
open(os.path.join(d,'diwali-magic-of-giving.html'),'w').write(head+body+'</body>\n</html>\n')
art=re.sub(r'<!doctype html>\s*<html[^>]*>\s*<head>\s*<meta charset="utf-8">\s*<meta name="viewport"[^>]*>\s*','',head,flags=re.I).replace('</head>\n<body>\n','')
if len(sys.argv)>1:open(sys.argv[1],'w').write(art+body)
print(len(head+body),'bytes')
