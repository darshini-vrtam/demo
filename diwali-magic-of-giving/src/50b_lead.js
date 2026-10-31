/* ===== Overrides that must come after the shared modules load ===== */
function mkFamily(parent,order){const F={};(order||['gran','mother','father','boy','girl','little','neighbour']).forEach(k=>{const p=new Person(k,parent);p.tg=null;F[k]=p});return F}
/* Goddess Lakshmi is a still devotional illustration: no movement, only a warm glow (layered flat yellow and orange rings) */
Lakshmi.prototype.update=function(dt,t){tf(this.g,this.x,this.y,this.s);tf(this.body,0,0,1);this.head.setAttribute('transform','translate(0 0)');op(this.haloAll,this.haloK);
  if(this.haloK>0){tf(this.halo.outer,0,0,1);tf(this.big,0,-160,1+this.expand)}show(this.g,this.vis)};
