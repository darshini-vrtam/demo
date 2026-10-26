import glob,os
d=os.path.dirname(os.path.abspath(__file__))
head=open(os.path.join(d,'src/head.html')).read()
js='\n'.join(open(f).read() for f in sorted(glob.glob(os.path.join(d,'src/*.js'))))
out=head+'\n<script>\n'+js+'\n</script>\n'
open(os.path.join(d,'dhanteras-ocean.html'),'w').write(out)
print(len(out))
