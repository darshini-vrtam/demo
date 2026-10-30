import glob,os,re,sys,json
d=os.path.dirname(os.path.abspath(__file__))
head=open(os.path.join(d,'src/head.html')).read()
ids=sorted(os.path.basename(f)[:-4] for f in glob.glob(os.path.join(d,'audio/*.mp3')))
snd=sorted(os.path.basename(f)[:-4] for f in glob.glob(os.path.join(d,'sfx/*.mp3')))
js='const CLIP_IDS='+json.dumps(ids)+';\nconst SND_IDS='+json.dumps(snd)+';\n'+'\n'.join(open(f).read() for f in sorted(glob.glob(os.path.join(d,'src/*.js'))))
body='\n<script>\n'+js+'\n</script>\n'
open(os.path.join(d,'diwali-rama.html'),'w').write(head+body+'</body>\n</html>\n')
print(len(head+body),'bytes,',len(ids),'clips,',len(snd),'sounds')
# hosted variant: the host supplies the doctype/html/head/body skeleton
if len(sys.argv)>1:
  art=re.sub(r'<!doctype html>\s*<html[^>]*>\s*<head>\s*<meta charset="utf-8">\s*<meta name="viewport"[^>]*>\s*','',head,flags=re.I).replace('</head>\n<body>\n','')
  open(sys.argv[1],'w').write(art+body)
