import glob,os,re,sys
d=os.path.dirname(os.path.abspath(__file__))
head=open(os.path.join(d,'src/head.html')).read()
js='\n'.join(open(f).read() for f in sorted(glob.glob(os.path.join(d,'src/*.js'))))
body='\n<script>\n'+js+'\n</script>\n'
open(os.path.join(d,'diwali-rama.html'),'w').write(head+body+'</body>\n</html>\n')
print(len(head+body),'bytes')
# hosted variant: the host supplies the doctype/html/head/body skeleton
if len(sys.argv)>1:
  art=re.sub(r'<!doctype html>\s*<html[^>]*>\s*<head>\s*<meta charset="utf-8">\s*<meta name="viewport"[^>]*>\s*','',head,flags=re.I).replace('</head>\n<body>\n','')
  open(sys.argv[1],'w').write(art+body)
