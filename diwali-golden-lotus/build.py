import glob,os,re,sys
d=os.path.dirname(os.path.abspath(__file__))
head=open(os.path.join(d,'src/head.html')).read()
js='\n'.join(open(f).read() for f in sorted(glob.glob(os.path.join(d,'src/*.js'))))
body='\n<script>\n'+js+'\n</script>\n'
open(os.path.join(d,'diwali-golden-lotus.html'),'w').write(head+body+'</body>\n</html>\n')
# the artifact copy: the host wraps the page in its own document skeleton
art=re.sub(r'<!doctype html>\s*<html[^>]*>\s*<head>\s*<meta charset="utf-8">\s*<meta name="viewport"[^>]*>\s*','',head,flags=re.I)
art=art.replace('</head>\n<body>\n','')
if len(sys.argv)>1:open(sys.argv[1],'w').write(art+body)
print(len(head+body),'bytes')
