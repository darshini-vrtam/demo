import{Matrix4 as de,Vector3 as he,Quaternion as It,Scene as Ct,WebGLRenderer as To,sRGBEncoding as vo,PerspectiveCamera as Oo,Group as Dt}from"../three/three.module.min.js";import{o as S,b as w,c as g,d as Q,E as O,A as zt,e as se,m as B,f as U,s as q,g as X,h as oe,t as ye,B as Vt,i as $t,D as Lt,j as _o,L as Ft,r as T,k as ie,S as Pt,M as Rt,T as pe,l as Z,n as Bt,p as jt,q as Y,R as Wt,u as qt,v as Ht,w as fe,x as ee,y as ue,z as Ut,F as ge,G as Ao,H as Eo,I as De,J as ze,K as Ve,N as te,O as $e,P as Le,Q as Fe,U as Gt,V as Kt,W as Jt,X as Qt,Y as Pe,Z as Re,_ as Mo,$ as F,a0 as le,a1 as Be,a2 as je,a3 as Xt,a4 as Zt,a5 as Yt,a6 as ko,a7 as H,a8 as Io,a9 as We,aa as Co,ab as Do,ac as zo,ad as Vo,ae as $o,af as Lo,ag as qe,ah as He,ai as Fo,aj as Po,ak as Ro,al as Bo,am as jo,an as Wo,ao as qo,ap as Ho,aq as ea,ar as ta,as as z,at as aa,au as Uo,av as na,aw as Go,ax as Ko,ay as Jo,az as Qo,aA as ra,aB as Xo,aC as Zo,aD as sa,aE as Yo,aF as oa,aG as ei,aH as ti,aI as ai,aJ as ni,aK as ri,aL as si,aM as oi,aN as ii,aO as pi,aP as be,aQ as ae,aR as Ue,aS as ui,aT as li,aU as ci,aV as mi,aW as di,aX as hi,aY as yi,aZ as fi,a_ as gi,a$ as bi,b0 as Ni,b1 as wi,b2 as xi,b3 as Si,b4 as Ti,b5 as vi,b6 as Oi,b7 as _i,b8 as Ai,b9 as Ei,ba as Mi,bb as ki,bc as Ge,bd as ia,be as Ii,bf as Ci,bg as Di,bh as zi,bi as Vi,bj as $i,bk as Li,bl as Fi,bm as Pi,bn as Ri,bo as Bi,bp as ji,bq as Wi,br as qi,bs as Hi,bt as Ui,bu as Gi,bv as Ki,bw as Ji,bx as Qi,by as Xi,bz as Zi,bA as Yi,bB as ep,bC as tp,bD as ap,bE as np,bF as rp,bG as sp,bH as op,bI as ip,bJ as pp,bK as up,bL as lp,bM as cp,bN as mp,bO as dp,bP as hp,bQ as yp,bR as fp,bS as gp,bT as bp,bU as Np,bV as wp,bW as xp,bX as Sp,bY as Tp,bZ as vp,b_ as Op,b$ as _p,c0 as Ap,c1 as Ep,c2 as Mp,c3 as kp,c4 as Ip,c5 as Ke,c6 as Cp,c7 as Dp,c8 as zp,c9 as Vp,ca as $p,cb as Lp,cc as Fp,cd as Pp,ce as Rp,cf as Bp,cg as jp,ch as Wp,ci as qp,cj as Hp,ck as Up,cl as Gp,cm as Kp,cn as Jp,co as Qp,cp as Xp,cq as Zp,cr as Yp,cs as eu,ct as Je,cu as Qe,cv as tu,cw as au,cx as nu,cy as ru,cz as su,cA as ou,cB as iu,cC as pu,cD as Xe,cE as V,cF as pa,cG as ua,cH as la,cI as ca,cJ as ma,cK as da,cL as ha,cM as ya,cN as fa,cO as ga,cP as ba,cQ as Na,cR as wa,cS as xa,cT as Sa,cU as Ta,cV as va,cW as Oa,cX as _a,cY as Aa,cZ as Ea,c_ as Ma,c$ as ka,d0 as Ia,d1 as Ca,d2 as Da,d3 as za,d4 as Va,d5 as $a,d6 as La,d7 as Fa,d8 as Pa,d9 as Ra,da as Ba,db as ja,dc as Wa,dd as qa,de as Ha,df as Ua,dg as Ga,dh as Ka,di as Ja,dj as Qa,dk as Xa,dl as Za,dm as Ya,dn as en,dp as tn,dq as an,dr as nn,ds as rn,dt as sn,du as Ze,dv as on,dw as pn,dx as un,dy as ln,dz as cn,dA as mn,dB as dn,dC as hn,dD as yn,dE as fn,dF as Ye,dG as gn,dH as bn,dI as Nn,dJ as wn,dK as xn,dL as Sn,dM as Tn,dN as vn,dO as On,dP as _n,dQ as An,dR as En,dS as Mn,dT as kn,dU as In,dV as Cn,dW as Dn,dX as zn,dY as Vn,dZ as $n,d_ as Ln,d$ as Fn,e0 as Pn,e1 as Rn,e2 as Bn,e3 as jn,e4 as Wn,e5 as qn,e6 as Hn,e7 as Un,e8 as Gn,e9 as Kn,ea as Jn,eb as Qn,ec as Xn,ed as Zn,ee as Yn,ef as er,eg as tr,eh as ar,ei as nr,ej as rr,ek as sr,el as or,em as ir,en as pr,eo as ur,ep as lr,eq as cr,er as mr,es as dr,et as hr,eu as yr,ev as fr,ew as gr,ex as br,ey as Nr,ez as wr,eA as xr,eB as Sr,eC as Tr,eD as vr,eE as Or,eF as _r,eG as ne,eH as Ar,eI as Er,eJ as Mr,eK as kr,eL as Ir,eM as et,eN as Ne,eO as Cr,eP as Dr,eQ as zr,eR as Vr,eS as $r,eT as Lr,eU as re,eV as Fr,eW as Pr,eX as Rr,eY as Br,eZ as P,e_ as $,e$ as we,f0 as jr,f1 as tt,f2 as xe,f3 as uu,f4 as Wr,f5 as lu,f6 as qr,f7 as Hr,f8 as cu,f9 as mu,fa as Ur,fb as du,fc as hu,fd as yu,fe as fu,ff as gu,fg as bu,fh as Nu,fi as wu,fj as xu,fk as Su,fl as Tu,fm as vu,fn as Ou,fo as _u,fp as Au,fq as Eu,fr as Mu,fs as ku,ft as Iu,fu as Cu,fv as Du,fw as zu,fx as Vu,fy as $u,fz as Lu,fA as Fu,fB as Pu,fC as Ru,fD as Bu,fE as ju,fF as Wu,fG as qu,fH as Hu,fI as Uu,fJ as Gu,fK as Ku,fL as Ju,fM as Qu,fN as Xu,fO as Zu,fP as Yu,fQ as el,fR as tl,fS as al,fT as nl,fU as rl,fV as sl,fW as ol,fX as il,fY as pl,fZ as ul,f_ as ll,f$ as cl,g0 as ml,g1 as dl,g2 as hl,g3 as yl,g4 as fl,g5 as gl,g6 as bl,g7 as Nl,g8 as wl,g9 as xl,ga as Sl,gb as Tl,gc as vl,gd as Ol,ge as _l,gf as Al,gg as El,gh as Ml,gi as kl,gj as Il,gk as Cl,gl as Dl,gm as zl,gn as Vl,go as $l,gp as Ll,gq as Fl,gr as Pl,gs as Rl,gt as Bl,gu as jl,gv as Wl,gw as ql,gx as Hl,gy as Ul,gz as Gl,gA as Kl,gB as Jl,gC as Ql,gD as Xl,gE as Zl,gF as Yl,gG as ec,gH as tc,gI as ac,gJ as nc,gK as rc,gL as sc,gM as oc,gN as ic,gO as pc,gP as uc,gQ as lc,gR as cc,gS as mc,gT as dc,gU as hc,gV as yc,gW as fc,gX as gc,gY as bc,gZ as Nc,g_ as wc,g$ as xc,h0 as Sc,h1 as Tc,h2 as vc,h3 as Oc,h4 as _c,h5 as Ac,h6 as Ec,h7 as Mc,h8 as kc,h9 as Ic,ha as Cc,hb as Dc,hc as zc,hd as Vc,he as $c,hf as Lc,hg as Fc,hh as Pc,hi as Rc,hj as Bc,hk as jc,hl as Wc,hm as qc,hn as Hc,ho as Uc,hp as Gc,hq as Kc,hr as Jc,hs as Qc,ht as Xc,hu as Zc,hv as Yc,hw as em,hx as tm,hy as am,hz as nm,hA as rm,hB as sm,hC as om,hD as im,hE as pm,hF as um,hG as lm,hH as cm,hI as mm,hJ as dm,hK as hm,hL as ym,hM as fm,hN as gm,hO as bm,hP as Nm,hQ as wm,hR as xm,hS as Sm,hT as Tm,hU as vm,hV as Om,hW as _m,hX as Am,hY as Em,hZ as Mm,h_ as km,h$ as Im,i0 as Cm,i1 as Dm,i2 as zm,i3 as Vm,i4 as $m,i5 as Lm,i6 as Fm,i7 as Pm,i8 as Rm,i9 as Bm,ia as jm,ib as Wm,ic as qm,id as Hm,ie as Um,ig as Gm,ih as Km,ii as Jm,ij as Qm,ik as Xm,il as Zm,im as Ym,io as ed,ip as td,iq as ad,ir as nd,is as rd,it as sd,iu as od,iv as id,iw as pd,ix as ud,iy as ld,iz as cd,iA as md,iB as dd,iC as hd,iD as yd,iE as fd,iF as gd,iG as bd,iH as Nd,iI as wd,iJ as xd,iK as Sd,iL as Td,iM as vd,iN as Od,iO as _d,iP as Ad,iQ as Ed,iR as Md,iS as kd,iT as Id,iU as Cd,iV as Dd,iW as zd,iX as Vd,iY as $d,iZ as Ld,C as Fd}from"./controller-mGt1s8dJ.js";import{CSS3DRenderer as Pd}from"../three/addons/renderers/CSS3DRenderer.js";import{U as Rd}from"./ui-fBadYuor.js";/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Bd(a){w(Array.isArray(a),()=>"The argument passed to tf.addN() must be a list of tensors"),w(a.length>=1,()=>`Must pass at least one tensor to tf.addN(), but got ${a.length}`);const e=a.map((r,s)=>g(r,`tensors${s}`,"addN")),t=e[0];e.forEach(r=>{if(r.dtype!==t.dtype)throw new Error("All tensors passed to tf.addN() must have the same dtype")}),e.forEach(r=>{if(!Q(r.shape,t.shape))throw new Error("All tensors passed to tf.addN() must have the same shape")});const n=e;return O.runKernel(zt,n)}const Gr=S({addN_:Bd});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function jd(a,e,t,n,r,s){const p=g(a,"forgetBias","basicLSTMCell"),i=g(e,"lstmKernel","basicLSTMCell"),u=g(t,"lstmBias","basicLSTMCell"),l=g(n,"data","basicLSTMCell"),c=g(r,"c","basicLSTMCell"),m=g(s,"h","basicLSTMCell"),d=se([l,m],1),h=B(d,i),N=U(h,u),f=N.shape[0],y=N.shape[1]/4,b=[f,y],v=q(N,[0,0],b),_=q(N,[0,y],b),x=q(N,[0,y*2],b),A=q(N,[0,y*3],b),I=U(X(oe(v),ye(_)),X(c,oe(U(p,x)))),C=X(ye(I),oe(A));return[I,C]}const Kr=S({basicLSTMCell_:jd});/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Wd(a,e){const t=g(a,"x","bitwiseAnd"),n=g(e,"y","bitwiseAnd");if(!Q(t.shape,n.shape))throw new Error(`BitwiseAnd: Tensors must have the same shape. x: ${t.shape}, y: ${n.shape}`);if(t.dtype!=="int32"||n.dtype!=="int32")throw new Error(`BitwiseAnd: Only supports 'int32' values in tensor, found type of x: ${t.dtype} and type of y: ${n.dtype}`);const r={a:t,b:n};return O.runKernel(Vt,r)}const Jr=S({bitwiseAnd_:Wd});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function qd(a,e){const t=g(a,"s0","broadcastArgs","int32"),n=g(e,"s1","broadcastArgs","int32");if(t.rank!==1)throw new Error(`broadcastArgs(): first input must be a vector (rank=1). Has rank ${t.rank}`);if(n.rank!==1)throw new Error(`broadcastArgs(): second input must be a vector (rank=1). Has rank ${n.rank}`);const r={s0:t,s1:n};return O.runKernel($t,r)}const Qr=S({broadcastArgs_:qd});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Hd(a){const e={x:g(a,"x","diag")};return O.runKernel(Lt,e)}const Xr=S({diag_:Hd});/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ud(a,e){const t=g(a,"x","ensureShape","string_or_numeric");if(!_o(t.shape,e))throw new Error(`EnsureShape: Shape of tensor ${t.shape} is not compatible with expected shape ${e}`);return a}const Zr=S({ensureShape_:Ud});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Yr(a,e,t){if(t<=0)throw new Error("The number of values should be positive.");const n={start:a,stop:e,num:t};return O.runKernel(Ft,{},n)}/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Se=2147483648;function Gd(a,e,t="left"){const n=g(a,"sortedSequence","searchSorted"),r=g(e,"values","searchSorted"),s=n.shape[n.shape.length-1],p=r.shape[r.shape.length-1],i=T(n,[-1,s]),u=T(r,[-1,p]);if(i.rank<2)throw new Error("Sorted input argument must be at least 2-dimensional");if(i.shape[0]!==u.shape[0])throw new Error("Leading dimension of 'sortedSequence' and 'values' must match.");if(ie(u.shape)>=Se)throw new Error(`values tensor size must less than ${Se}`);if(i.shape[1]>=Se)throw new Error(`trailing dim_size must less than ${Se} for int32 output type, was ${i.shape[1]}`);const l={sortedSequence:i,values:u},c={side:t};return O.runKernel(Pt,l,c)}const Te=S({searchSorted_:Gd});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function es(a,e){return Te(a,e,"left")}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Kd(a,e,t,n,r=!1){const s={x:g(a,"x","maxPoolWithArgmax")},p={filterSize:e,strides:t,pad:n,includeBatchInIndex:r},i=O.runKernel(Rt,s,p);return{result:i[0],indexes:i[1]}}const ts=S({maxPoolWithArgmax_:Kd});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function as(a,e,{indexing:t="xy"}={}){if(t!=="xy"&&t!=="ij")throw new TypeError(`${t} is not a valid third argument to meshgrid`);if(a===void 0)return[];let n=g(a,"x","meshgrid",a instanceof pe?a.dtype:"float32");if(e===void 0)return[n];let r=g(e,"y","meshgrid",e instanceof pe?e.dtype:"float32");const s=ie(n.shape),p=ie(r.shape);return t==="xy"?(n=T(n,[1,-1]),r=T(r,[-1,1]),[B(Z([p,1],n.dtype),n),B(r,Z([1,s],r.dtype))]):(n=T(n,[-1,1]),r=T(r,[1,-1]),[B(n,Z([1,p],n.dtype)),B(Z([s,1],r.dtype),r)])}function Jd(a,e,t,n){const r=g(e,"data","multiRNNCell"),s=Bt(t,"c","multiRNNCell"),p=Bt(n,"h","multiRNNCell");let i=r;const u=[];for(let m=0;m<a.length;m++){const d=a[m](i,s[m],p[m]);u.push(d[0]),u.push(d[1]),i=d[1]}const l=[],c=[];for(let m=0;m<u.length;m+=2)l.push(u[m]),c.push(u[m+1]);return[l,c]}const ns=S({multiRNNCell_:Jd});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Qd(a,e,t,n=!1){const r=g(a,"logits","multinomial"),s=r.size,p=r.rank;if(s<2)throw new Error(`Error in multinomial: you need at least 2 outcomes, but got ${s}.`);if(p>2)throw new Error(`Rank of probabilities must be 1 or 2, but is ${p}`);t=t||Math.random();const i={logits:p===1?T(r,[1,-1]):r},u={numSamples:e,seed:t,normalized:n},l=O.runKernel(jt,i,u);return p===1?T(l,[l.size]):l}const rs=S({multinomial_:Qd});function Xd(a,e){const t=g(a,"v1","outerProduct"),n=g(e,"v2","outerProduct");w(t.rank===1&&n.rank===1,()=>`Error in outerProduct: inputs must be rank 1, but got ranks ${t.rank} and ${n.rank}.`);const r=T(t,[-1,1]),s=T(n,[1,-1]);return B(r,s)}const ss=S({outerProduct_:Xd});function Zd(a,e,t=0){return w(e.length===2,()=>"Invalid number of paddings. Must be length of 2."),Y(a,[e],t)}const os=S({pad1d_:Zd});function Yd(a,e,t=0){return w(e.length===2&&e[0].length===2&&e[1].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),Y(a,e,t)}const is=S({pad2d_:Yd});function eh(a,e,t=0){return w(e.length===3&&e[0].length===2&&e[1].length===2&&e[2].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),Y(a,e,t)}const ps=S({pad3d_:eh});function th(a,e,t=0){return w(e.length===4&&e[0].length===2&&e[1].length===2&&e[2].length===2&&e[3].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),Y(a,e,t)}const us=S({pad4d_:th});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ah(a,e,t,n){const r=a.map((c,m)=>g(c,`tensors${m}`,"raggedGather","int32")),s=g(e,"paramsDenseValues","raggedGather"),p=g(t,"indices","raggedGather","int32"),i={paramsNestedSplits:r,paramsDenseValues:s,indices:p},u={outputRaggedRank:n},l=O.runKernel(Wt,i,u);return{outputNestedSplits:l.slice(0,l.length-1),outputDenseValues:l[l.length-1]}}const ls=S({raggedGather_:ah});/**
 * @license
 * Copyright 2022 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function nh(a,e,t){const n=g(a,"starts","raggedRange"),r=g(e,"limits","raggedRange",n.dtype),s=g(t,"deltas","raggedRange",n.dtype),p={starts:n,limits:r,deltas:s},i=O.runKernel(qt,p);return{rtNestedSplits:i[0],rtDenseValues:i[1]}}const cs=S({raggedRange_:nh});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function rh(a,e,t,n,r){const s=g(a,"shape","raggedTensorToTensor","int32"),p=g(e,"values","raggedTensorToTensor"),i=g(t,"defaultValue","raggedTensorToTensor",p.dtype),u=n.map((m,d)=>g(m,`tensors${d}`,"raggedTensorToTensor","int32")),l={shape:s,values:p,defaultValue:i,rowPartitionTensors:u},c={rowPartitionTypes:r};return O.runKernel(Ht,l,c)}const ms=S({raggedTensorToTensor_:rh});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function sh(a,e,t){fe(a);const n=ie(a);let r=null;if(t==null||t==="float32")r=new Float32Array(n);else if(t==="int32")r=new Int32Array(n);else if(t==="bool")r=new Uint8Array(n);else throw new Error(`Unknown data type ${t}`);for(let s=0;s<n;s++)r[s]=e();return O.makeTensor(r,a,t)}const ds=S({rand_:sh});/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const oh=.001,hs=.1;function ih(a,e,t){return t==null&&(t=at()),nt(a,e,(n,r)=>rt(n,r,t))}function at(){return O.backend.floatPrecision()===32?oh:hs}function nt(a,e,t){let n=!0;if((ee(a)||ee(e))&&(n=!1),ee(a)&&ee(e)&&(n=!0),n){const p=a.constructor.name,i=e.constructor.name;if(p!==i)throw new Error(`Arrays are of different type. Actual: ${p}. Expected: ${i}`)}if(Array.isArray(a)&&Array.isArray(e)){const p=ue(a),i=ue(e);if(!Q(p,i))throw new Error(`Arrays have different shapes. Actual: [${p}]. Expected: [${i}]`)}const r=ee(a)?a:Ut(a),s=ee(e)?e:Ut(e);if(r.length!==s.length)throw new Error(`Arrays have different lengths actual: ${r.length} vs expected: ${s.length}.
Actual:   ${r}.
Expected: ${s}.`);for(let p=0;p<s.length;++p){const i=r[p],u=s[p];if(!t(i,u))throw new Error(`Arrays differ: actual[${p}] = ${i}, expected[${p}] = ${u}.
Actual:   ${r}.
Expected: ${s}.`)}typeof expect<"u"&&expect().nothing()}function ph(a,e){a().then(()=>e.fail(),()=>e()),typeof expect<"u"&&expect().nothing()}function uh(a,e){const t=typeof e=="string"||typeof e=="number"||typeof e=="boolean"?[e]:e;return ge(a)||ge(a[0])||ge(e)||ge(e[0])?nt(a,t,(n,r)=>n==r):nt(a,e,(n,r)=>rt(n,r,0))}function lh(a,e,t){if(t==null&&(t=at()),!rt(a,e,t))throw new Error(`Numbers differ: actual === ${a}, expected === ${e}`);typeof expect<"u"&&expect().nothing()}function rt(a,e,t){return!isFinite(a)&&!isFinite(e)?!0:!(isNaN(a)||isNaN(e)||Math.abs(a-e)>t)}function ch(a,e,t){for(let n=0;n<a.length;n++)if(a[n]<e||a[n]>t)throw new Error(`Value out of range:${a[n]} low: ${e}, high: ${t}`)}function mh(a,e){const t=new Float32Array(a),n=new Float32Array(e);if(t.length!==n.length)throw new Error(`Expected ArrayBuffer to be of length ${n.length}, but it was ${t.length}`);for(let r=0;r<n.length;r++)if(t[r]!==n[r])throw new Error(`Expected ArrayBuffer value at ${r} to be ${n[r]} but got ${t[r]} instead`)}function ys(a){for(let e=0;e<a.length;e++){const t=a[e];Array.isArray(t)?ys(t):a[e]=Ao(t)}return a}function dh(a){const e=document.createElement("video");return"playsInline"in e&&(e.playsInline=!0),e.muted=!0,e.loop=!0,e.style.position="fixed",e.style.left="0px",e.style.top="0px",e.preload="auto",e.appendChild(a),new Promise(t=>{e.addEventListener("loadeddata",n=>t(e)),e.load()})}async function hh(a){await a.play(),"requestVideoFrameCallback"in a&&await new Promise(e=>{a.requestVideoFrameCallback(e)})}const yh=Object.freeze(Object.defineProperty({__proto__:null,TEST_EPSILON_FLOAT16:hs,createVideoElement:dh,encodeStrings:ys,expectArrayBuffersEqual:mh,expectArraysClose:ih,expectArraysEqual:uh,expectNumbersClose:lh,expectPromiseToFail:ph,expectValuesInRange:ch,play:hh,testEpsilon:at},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function fh(a,e,t=1,n="float32",r){if(fe(a),t==null&&(t=1),n==null&&(n="float32"),n!=="float32"&&n!=="int32")throw new Error(`Unsupported data type ${n}`);const s=new Eo(e,t,n,r),p=De(a,n);for(let i=0;i<p.values.length;i++)p.values[i]=s.nextValue();return p.toTensor()}const fs=S({randomGamma_:fh});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function gh(a,e,t){if(e!=null&&e==="bool")throw new Error(`Unsupported data type ${e}`);return ze(a,0,1,e,t)}const gs=S({randomStandardNormal_:gh});/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bh(a,e,t,n){return Ve(a,e,t,"int32",n)}const bs=S({randomUniformInt_:bh});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Nh(a){const e=g(a,"x","reverse");return w(e.rank===1,()=>`Error in reverse1D: x must be rank 1 but got rank ${e.rank}.`),te(e,0)}const Ns=S({reverse1d_:Nh});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function wh(a,e){const t=g(a,"x","reverse");return w(t.rank===2,()=>`Error in reverse2D: x must be rank 2 but got rank ${t.rank}.`),te(t,e)}const ws=S({reverse2d_:wh});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function xh(a,e){const t=g(a,"x","reverse");return w(t.rank===3,()=>`Error in reverse3D: x must be rank 3 but got rank ${t.rank}.`),te(t,e)}const xs=S({reverse3d_:xh});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Sh(a,e){const t=g(a,"x","reverse");return w(t.rank===4,()=>`Error in reverse4D: x must be rank 4 but got rank ${t.rank}.`),te(t,e)}const Ss=S({reverse4d_:Sh});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function Th(a,e){const t=g(a,"x","setdiff1d"),n=g(e,"y","setdiff1d");w(t.dtype===n.dtype,()=>`x and y should have the same dtype, but got x (${t.dtype}) and y (${n.dtype}).`),w(t.rank===1,()=>`x should be 1D tensor, but got x (${t.shape}).`),w(n.rank===1,()=>`y should be 1D tensor, but got y (${n.shape}).`);const r=await t.data(),s=await n.data(),p=new Set(s);let i=0;for(let c=0;c<r.length;c++)p.has(r[c])||i++;const u=new $e([i],t.dtype),l=new $e([i],"int32");for(let c=0,m=0;c<r.length;c++)p.has(r[c])||(u.values[m]=r[c],l.values[m]=c,m++);return[u.toTensor(),l.toTensor()]}const Ts=Th;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function vs(a,e,t){if(Le(a),e!=null&&e.length!==4)throw new Error("tensor4d() requires shape to have four numbers");const n=ue(a,t);if(n.length!==4&&n.length!==1)throw new Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");if(n.length===1&&e==null)throw new Error("tensor4d() requires shape to be provided when `values` are a flat array");return Fe(a,e,n,t)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Os(a,e,t){if(Le(a),e!=null&&e.length!==5)throw new Error("tensor5d() requires shape to have five numbers");const n=ue(a,t);if(n.length!==5&&n.length!==1)throw new Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");if(n.length===1&&e==null)throw new Error("tensor5d() requires shape to be provided when `values` are a flat array");return Fe(a,e,n,t)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _s(a,e,t){if(Le(a),e!=null&&e.length!==6)throw new Error("tensor6d() requires shape to have six numbers");const n=ue(a,t);if(n.length!==6&&n.length!==1)throw new Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(n.length===1&&e==null)throw new Error("tensor6d() requires shape to be provided when `values` are a flat array");return e=e||n,Fe(a,e,n,t)}/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function vh(a,e,t){const n=g(a,"tensor","tensorScatterupdate"),r=g(e,"indices","tensorScatterupdate","int32"),s=g(t,"updates","tensorScatterupdate");if(Gt(s,r,n.shape),n.dtype!==s.dtype)throw new Error(`tensor and updates must have the same dtype, instead they are ${n.dtype} and ${s.dtype}.`);const p={tensor:n,indices:r,updates:s},i={};return O.runKernel(Kt,p,i)}const As=S({tensorScatterUpdate_:vh});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Es(a,e){return Te(a,e,"right")}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function Oh(a){const e=g(a,"condition","whereAsync","bool"),t=await e.data(),n=Jt(e.shape,t);return a!==e&&e.dispose(),n}const st=Oh;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function _h(a,e,t){const n=g(a,"tensor","boolMask"),r=g(e,"mask","boolMask","bool"),s=t!=null?t:0,p=r.rank,i=n.shape;w(p>0,()=>"mask cannot be scalar"),Qt(i.slice(s,s+p),r.shape,"mask's shape must match the first K dimensions of tensor's shape,");let u=1;for(let f=s;f<s+p;f++)u*=i[f];const l=i.slice(0,s).concat([u],i.slice(s+p)),c=T(n,l),m=T(r,[-1]),d=await st(m),h=Pe(d,[1]),N=Re(c,h,s);return a!==n&&n.dispose(),e!==r&&r.dispose(),h.dispose(),c.dispose(),m.dispose(),d.dispose(),N}const Ms=_h;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ah(a,e,t,n,r=!0){const s=g(a,"v","movingAverage"),p=g(e,"x","movingAverage"),i=g(t,"decay","movingAverage");Mo(s,p),w(Q(s.shape,p.shape),()=>"Shape mismatch in v and x");const u=F(1),l=le(u,i);let c=X(le(p,s),l);if(r){w(n!=null,()=>"When using zeroDebias: true, step is required.");const m=g(n,"step","movingAverage");c=Be(c,le(u,je(i,m)))}return U(s,c)}const ks=S({movingAverage_:Ah});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Eh(a,e,t){fe(t);const n=g(a,"indices","scatterND","int32"),r=g(e,"updates","scatterND");Gt(r,n,t);const s={indices:n,updates:r},p={shape:t};return O.runKernel(Xt,s,p)}const Is=S({scatterND_:Eh});function Mh(a,e,t,n){if(a.dtype!=="int32")throw new Error(`tf.sparseToDense() expects the indices to be int32 type, but the dtype was ${a.dtype}.`);if(a.rank>2)throw new Error(`sparseIndices should be a scalar, vector, or matrix, but got shape ${a.shape}.`);const r=a.rank>0?a.shape[0]:1,s=a.rank>1?a.shape[1]:1;if(t.length!==s)throw new Error(`outputShape has incorrect number of elements:, ${t.length}, should be: ${s}.`);const p=e.size;if(!(e.rank===0||e.rank===1&&p===r))throw new Error(`sparseValues has incorrect shape ${e.shape}, should be [] or [${r}]`);if(e.dtype!==n.dtype)throw new Error("sparseValues.dtype must match defaultValues.dtype")}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function kh(a,e,t,n=0){fe(t);const r=g(a,"sparseIndices","sparseToDense","int32"),s=g(e,"sparseValues","sparseToDense","string_or_numeric"),p=g(n,"defaultValue","sparseToDense",s.dtype);Mh(r,s,t,p);const i={sparseIndices:r,sparseValues:s,defaultValue:p},u={outputShape:t};return O.runKernel(Zt,i,u)}const Cs=S({sparseToDense_:kh});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ih(a,e){const t=g(e,"indices","gatherND","int32"),n={params:g(a,"x","gatherND","string_or_numeric"),indices:t};return O.runKernel(Yt,n)}const Ds=S({gatherND_:Ih});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function Ch(a,e,t=1){const n=g(a,"predictions","inTopK"),r=g(e,"targets","inTopK");w(n.rank>1,()=>`inTopK() expects the predictions to be of rank 2 or higher, but got ${n.rank}`),w(n.rank-1===r.rank,()=>`predictions rank should be 1 larger than targets rank, but got predictions rank ${n.rank} and targets rank ${r.rank}`),Qt(n.shape.slice(0,n.shape.length-1),r.shape,"predictions's shape should be align with the targets' shape, except the last dimension.");const s=n.shape[n.shape.length-1];w(t>0&&t<=s,()=>`'k' passed to inTopK() must be > 0 && <= the predictions last dimension (${s}), but got ${t}`);const p=await n.data(),i=await r.data(),[u,l]=[p.length/s,s],c=ko("bool",u);for(let m=0;m<u;m++){const d=m*l,h=p.subarray(d,d+l),N=[];for(let f=0;f<h.length;f++)N.push({value:h[f],index:f});N.sort((f,y)=>y.value-f.value),c[m]=0;for(let f=0;f<t;f++)if(N[f].index===i[m]){c[m]=1;break}}return a!==n&&n.dispose(),e!==r&&r.dispose(),H(c,r.shape,"bool")}const zs=Ch;/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Dh({x:a,filter:e,strides:t,pad:n,dataFormat:r="NHWC",dilations:s=[1,1],dimRoundingMode:p,bias:i,activation:u="linear",preluActivationWeights:l,leakyreluAlpha:c}){if(Io(O.state.gradientDepth,u)===!1){let A=We(a,e,t,n,r,s,p);return i!=null&&(A=U(A,i)),Co(A,u,l,c)}const m=g(a,"x","depthwiseConv2d","float32"),d=g(e,"filter","depthwiseConv2d","float32");let h=m,N=!1;m.rank===3&&(N=!0,h=T(m,[1,m.shape[0],m.shape[1],m.shape[2]])),w(h.rank===4,()=>`Error in fused depthwiseConv2d: input must be rank 4, but got rank ${h.rank}.`),w(d.rank===4,()=>`Error in fused depthwiseConv2d: filter must be rank 4, but got rank ${d.rank}.`),w(h.shape[3]===d.shape[2],()=>`Error in fused depthwiseConv2d: number of input channels (${h.shape[3]}) must match the inChannels dimension in filter ${d.shape[2]}.`),s==null&&(s=[1,1]),w(Do(t,s),()=>`Error in fused depthwiseConv2d: Either strides or dilations must be 1. Got strides ${t} and dilations '${s}'`),zo("fused depthwiseConv2d",n,p);const f=Vo(h.shape,d.shape,t,s,n,p,!0);let y;i!=null&&(y=g(i,"bias","fused conv2d"),[y]=$o(y,m),Lo(f.outShape,y.shape));let b;l!=null&&(b=g(l,"prelu weights","fused depthwiseConv2d"));const v=(A,I)=>{w(Fo(s),()=>`Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '${s}'`);const[C,D,R,xo]=I,Ce=Po(A,R,u),Mt=Ro(D.shape,Ce,C,t,n,s,p),kt=Bo(D,Ce,C.shape,t,n,s,p);if(xo!=null){const So=jo(y,Ce);return[Mt,kt,So]}return[Mt,kt]},_={x:h,filter:d,bias:y,preluActivationWeights:b},x={strides:t,pad:n,dataFormat:r,dilations:s,dimRoundingMode:p,activation:u,leakyreluAlpha:c};return i==null?qe((A,I,C)=>{let D=O.runKernel(He,_,x);return C([I,A,D]),N&&(D=T(D,[D.shape[1],D.shape[2],D.shape[3]])),{value:D,gradFunc:v}})(h,d):qe((A,I,C,D)=>{let R=O.runKernel(He,_,x);return D([I,A,R,C]),N&&(R=T(R,[R.shape[1],R.shape[2],R.shape[3]])),{value:R,gradFunc:v}})(h,d,y)}const zh=S({fusedDepthwiseConv2d_:Dh});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Vs=Object.freeze(Object.defineProperty({__proto__:null,conv2d:Wo,depthwiseConv2d:zh,matMul:qo},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Vh="model",$h=".json",Lh=".weights.bin";function $s(a){return new Promise(e=>setTimeout(e)).then(a)}class K{constructor(e){if(!z().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");e.startsWith(K.URL_SCHEME)&&(e=e.slice(K.URL_SCHEME.length)),(e==null||e.length===0)&&(e=Vh),this.modelJsonFileName=e+$h,this.weightDataFileName=e+Lh}async save(e){if(typeof document>"u")throw new Error("Browser downloads are not supported in this environment since `document` is not present");const t=aa.join(e.weightData),n=window.URL.createObjectURL(new Blob([t],{type:"application/octet-stream"}));if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");{const r=[{paths:["./"+this.weightDataFileName],weights:e.weightSpecs}],s=Uo(e,r),p=window.URL.createObjectURL(new Blob([JSON.stringify(s)],{type:"application/json"})),i=this.modelJsonAnchor==null?document.createElement("a"):this.modelJsonAnchor;if(i.download=this.modelJsonFileName,i.href=p,await $s(()=>i.dispatchEvent(new MouseEvent("click"))),e.weightData!=null){const u=this.weightDataAnchor==null?document.createElement("a"):this.weightDataAnchor;u.download=this.weightDataFileName,u.href=n,await $s(()=>u.dispatchEvent(new MouseEvent("click")))}return{modelArtifactsInfo:na(e)}}}}K.URL_SCHEME="downloads://";class Fh{constructor(e){if(e==null||e.length<1)throw new Error(`When calling browserFiles, at least 1 file is required, but received ${e}`);this.jsonFile=e[0],this.weightsFiles=e.slice(1)}async load(){return new Promise((e,t)=>{const n=new FileReader;n.onload=r=>{const s=JSON.parse(r.target.result),p=s.modelTopology;if(p==null){t(new Error(`modelTopology field is missing from file ${this.jsonFile.name}`));return}if(s.weightsManifest==null){t(new Error(`weightManifest field is missing from file ${this.jsonFile.name}`));return}if(this.weightsFiles.length===0){e({modelTopology:p});return}const i=ea(s,u=>this.loadWeights(u));e(i)},n.onerror=r=>t(`Failed to read model topology and weights manifest JSON from file '${this.jsonFile.name}'. BrowserFiles supports loading Keras-style tf.Model artifacts only.`),n.readAsText(this.jsonFile)})}loadWeights(e){const t=[],n=[];for(const p of e)t.push(...p.weights),n.push(...p.paths);const r=this.checkManifestAndWeightFiles(e),s=n.map(p=>this.loadWeightsFile(p,r[p]));return Promise.all(s).then(p=>[t,p])}loadWeightsFile(e,t){return new Promise((n,r)=>{const s=new FileReader;s.onload=p=>{const i=p.target.result;n(i)},s.onerror=p=>r(`Failed to weights data from file of path '${e}'.`),s.readAsArrayBuffer(t)})}checkManifestAndWeightFiles(e){const t=[],n=this.weightsFiles.map(s=>ta(s.name)),r={};for(const s of e)s.paths.forEach(p=>{const i=ta(p);if(t.indexOf(i)!==-1)throw new Error(`Duplicate file basename found in weights manifest: '${i}'`);if(t.push(i),n.indexOf(i)===-1)throw new Error(`Weight file with basename '${i}' is not provided.`);r[p]=this.weightsFiles[n.indexOf(i)]});if(t.length!==this.weightsFiles.length)throw new Error(`Mismatch in the number of files in weights manifest (${t.length}) and the number of weight files provided (${this.weightsFiles.length}).`);return r}}const Ph=a=>z().getBool("IS_BROWSER")&&!Array.isArray(a)&&a.startsWith(K.URL_SCHEME)?Rh(a.slice(K.URL_SCHEME.length)):null;Ho.registerSaveRouter(Ph);function Rh(a="model"){return new K(a)}function Bh(a){return new Fh(a)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ot{constructor(e){this.modelArtifacts=e}load(){return this.modelArtifacts}}class Ls{constructor(e){this.saveHandler=e}save(e){return this.saveHandler(e)}}class jh{constructor(e){e.load&&(this.load=()=>Promise.resolve(e.load())),e.save&&(this.save=t=>Promise.resolve(e.save(t)))}}function Wh(a,e,t,n){const r=arguments;return new jh(ve(...r))}function ve(a,e,t,n){return arguments.length===1?a.modelTopology!=null||a.weightSpecs!=null?new ot(a):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new ot({modelTopology:a})):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new ot({modelTopology:a,weightSpecs:e,weightData:t,trainingConfig:n}))}function qh(a){return new Ls(a)}function Hh(a){return new Ls(a)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const it=Object.freeze(Object.defineProperty({__proto__:null,CompositeArrayBuffer:aa,browserFiles:Bh,browserHTTPRequest:Go,concatenateArrayBuffers:Ko,copyModel:Jo,decodeWeights:Qo,decodeWeightsStream:ra,encodeWeights:Xo,fromMemory:Wh,fromMemorySync:ve,getLoadHandlers:Zo,getModelArtifactsForJSON:ea,getModelArtifactsForJSONSync:sa,getModelArtifactsInfoForJSON:na,getSaveHandlers:Yo,getWeightSpecs:oa,http:ei,isHTTPScheme:ti,listModels:ai,loadWeights:ni,moveModel:ri,registerLoadRouter:si,registerSaveRouter:oi,removeModel:ii,weightsLoaderFactory:pi,withSaveHandler:qh,withSaveHandlerSync:Hh},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Uh(a,e,t){const n=g(a,"labels","confusionMatrix"),r=g(e,"predictions","confusionMatrix");w(t==null||t>0&&Number.isInteger(t),()=>`If provided, numClasses must be a positive integer, but got ${t}`),w(n.rank===1,()=>`Expected the rank of labels to be 1, but got ${n.rank}`),w(r.rank===1,()=>`Expected the rank of predictions to be 1, but got ${r.rank}`),w(n.shape[0]===r.shape[0],()=>`Mismatch in the number of examples: ${n.shape[0]} vs. ${r.shape[0]}. Labels and predictions should have the same number of elements.`),w(t>0&&Number.isInteger(t),()=>`numClasses is required to be a positive integer, but got ${t}`);const s=be(ae(n,"int32"),t),p=be(ae(r,"int32"),t),i=Ue(s),u=B(i,p);return ae(u,"int32")}const Gh=S({confusionMatrix_:Uh});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Kh=Object.freeze(Object.defineProperty({__proto__:null,confusionMatrix:Gh},Symbol.toStringTag,{value:"Module"}));/** @license See the LICENSE file. */const Fs="4.16.0";/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Jh=Object.freeze(Object.defineProperty({__proto__:null,nonMaxSuppressionV3Impl:ui,nonMaxSuppressionV4Impl:li,nonMaxSuppressionV5Impl:ci,whereImpl:Jt},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */function Qh(a){return new mi(a)}function Xh(a){return new di(a)}function Zh(){return new hi}function Yh(a){return new yi(a)}const ey=Object.freeze(Object.defineProperty({__proto__:null,maxNorm:Qh,minMaxNorm:Yh,nonNeg:Zh,unitNorm:Xh},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */function ty(){return new fi}function ay(){return new gi}function ny(a){return new bi(a)}function ry(a){return new Ni(a)}function sy(a){return new wi(a)}function oy(a){return new xi(a)}function iy(a){return new Si(a)}function py(a){return new Ti(a)}function uy(a){return new vi(a)}function ly(a){return new Oi(a)}function cy(a){return new _i(a)}function my(a){return new Ai(a)}function dy(a){return new Ei(a)}function hy(a){return new Mi(a)}function yy(a){return new ki(a)}const fy=Object.freeze(Object.defineProperty({__proto__:null,constant:ny,glorotNormal:ly,glorotUniform:uy,heNormal:cy,heUniform:my,identity:iy,leCunNormal:dy,leCunUniform:hy,ones:ay,orthogonal:yy,randomNormal:sy,randomUniform:ry,truncatedNormal:oy,varianceScaling:py,zeros:ty},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */function gy(a){return new Ge(a)}function by(a){return new ia(a)}function Ps(a){return Ii(a)}function Ny(a,e){Ci.registerCallbackConstructor(a,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */function wy(a){return new Di(a)}function xy(a){return new zi(a)}function Sy(a){return new Vi(a)}function Ty(a){return new $i(a)}function vy(a){return new Li(a)}function Oy(a){return new Fi(a)}function _y(a){return new Pi(a)}function Ay(a){return new Ri(a)}function Ey(a){return new Bi(a)}function My(a){return new ji(a)}function ky(a){return new Wi(a)}function Iy(a){return new qi(a)}function Cy(a){return new Hi(a)}function Dy(a){return new Ui(a)}function zy(a){return new Gi(a)}function Vy(a){return new Ki(a)}function $y(a){return new Ji(a)}function Ly(a){return new Qi(a)}function Fy(a){return new Xi(a)}function Py(a){return new Zi(a)}function Ry(a){return new Yi(a)}function By(a){return new ep(a)}function jy(a){return new tp(a)}function Wy(a){return new ap(a)}function qy(a){return new np(a)}function Hy(a){return new rp(a)}function Uy(a){return new sp(a)}function Gy(a){return new op(a)}function Ky(a){return new ip(a)}function Jy(a){return new pp(a)}function Qy(a){return new up(a)}function Xy(a){return new lp(a)}function Zy(a){return new cp(a)}function Yy(a){return new mp(a)}function ef(a){return new dp(a)}function pt(a){return new hp(a)}function tf(a){return pt(a)}function af(a){return pt(a)}function ut(a){return new yp(a)}function nf(a){return ut(a)}function rf(a){return ut(a)}function lt(a){return new fp(a)}function sf(a){return lt(a)}function of(a){return lt(a)}function pf(a){return new gp(a)}function uf(a){return new bp(a)}function Rs(a){return new Np(a)}function Bs(a){return new wp(a)}function js(a){return new xp(a)}function Ws(a){return new Sp(a)}function lf(a){return new Tp(a)}function cf(a){return new vp(a)}function mf(a){return new Op(a)}function df(a){return new _p(a)}function hf(a){return new Ap(a)}function yf(a){return new Ep(a)}function ff(a){return new Mp(a)}function gf(a){return new kp(a)}function bf(a){return new Ip(a)}function Nf(a){return new Ke(a)}function wf(a){return new Cp(a)}function xf(a){return new Dp(a)}function Sf(a){return new zp(a)}const Tf=Rs,vf=Bs,Of=js,_f=Ws;function Af(a){return new Vp(a)}function Ef(a){return new $p(a)}function Mf(a){return new Lp(a)}function kf(a){return new Fp(a)}function If(a){return new Pp(a)}function Cf(a){return new Rp(a)}function Df(a){return new Bp(a)}function zf(a){return new jp(a)}function Vf(a){return new Wp(a)}const $f=Object.freeze(Object.defineProperty({__proto__:null,Layer:qp,RNN:Ke,RNNCell:Hp,activation:$y,add:Hy,alphaDropout:Mf,average:Uy,averagePooling1d:pt,averagePooling2d:ut,averagePooling3d:lt,avgPool1d:tf,avgPool2d:nf,avgPool3d:sf,avgPooling1d:af,avgPooling2d:rf,avgPooling3d:of,batchNormalization:Zy,bidirectional:xf,categoryEncoding:zf,centerCrop:Cf,concatenate:Gy,conv1d:Ay,conv2d:Ey,conv2dTranspose:My,conv3d:ky,conv3dTranspose:Iy,convLstm2d:gf,convLstm2dCell:bf,cropping2D:Dy,dense:Ly,depthwiseConv2d:Vy,dot:Xy,dropout:Fy,elu:xy,embedding:qy,flatten:Ry,gaussianDropout:Ef,gaussianNoise:Af,globalAveragePooling1d:pf,globalAveragePooling2d:uf,globalMaxPool1d:Tf,globalMaxPool2d:vf,globalMaxPooling1d:Rs,globalMaxPooling2d:Bs,gru:cf,gruCell:mf,input:Ps,inputLayer:wy,layerNormalization:Yy,leakyReLU:Ty,lstm:df,lstmCell:hf,masking:kf,maxPool1d:Of,maxPool2d:_f,maxPooling1d:js,maxPooling2d:Ws,maxPooling3d:lf,maximum:Ky,minimum:Jy,multiply:Qy,permute:Wy,prelu:vy,randomWidth:Vf,reLU:Sy,repeatVector:By,rescaling:If,reshape:jy,resizing:Df,rnn:Nf,separableConv2d:Cy,simpleRNN:yf,simpleRNNCell:ff,softmax:Oy,spatialDropout1d:Py,stackedRNNCells:wf,thresholdedReLU:_y,timeDistributed:Sf,upSampling2d:zy,zeroPadding2d:ef},Symbol.toStringTag,{value:"Module"}));function Lf(a,e){return Up(a,e)}function Ff(a,e){return Gp(a,e)}function Pf(a,e){return Kp(a,e)}function Rf(a,e){return Jp(a,e)}function Bf(a,e){return Qp(a,e)}function jf(a,e){return Xp(a,e)}function Wf(a,e){return Zp(a,e)}function qf(a,e){return Yp(a,e)}function Hf(a,e){return eu(a,e)}function Uf(a,e){return Je(a,e)}function Gf(a,e){return Je(a,e)}function Kf(a,e){return Je(a,e)}function Jf(a,e){return Qe(a,e)}function Qf(a,e){return Qe(a,e)}function Xf(a,e){return Qe(a,e)}const Zf=Object.freeze(Object.defineProperty({__proto__:null,MAPE:Gf,MSE:Qf,binaryAccuracy:Lf,binaryCrossentropy:Ff,categoricalAccuracy:Rf,categoricalCrossentropy:Bf,cosineProximity:qf,mape:Kf,meanAbsoluteError:Hf,meanAbsolutePercentageError:Uf,meanSquaredError:Jf,mse:Xf,precision:jf,recall:Wf,sparseCategoricalAccuracy:Pf},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */const Yf=Object.freeze(Object.defineProperty({__proto__:null,modelFromJSON:tu},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */function eg(a){return new au(a)}function tg(a){return nu(a)}function ag(a){return ru(a)}const ng=Object.freeze(Object.defineProperty({__proto__:null,l1:tg,l1l2:eg,l2:ag},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */class qs extends su{constructor(){super(...arguments),this.model=null}setModel(e){if(!(e instanceof Ge))throw new Error("model must be a LayersModel, not some other Container");this.model=e}}function Oe(a,e){return a<e}function Hs(a,e){return a>e}class Us extends qs{constructor(e){if(super(),e==null&&(e={}),e.restoreBestWeights)throw new ou("restoreBestWeights = True is not implemented in EarlyStopping yet.");this.monitor=e.monitor||"val_loss",this.minDelta=Math.abs(e.minDelta||0),this.patience=e.patience||0,this.verbose=e.verbose||0,this.mode=e.mode||"auto",this.baseline=e.baseline,["auto","min","max"].indexOf(this.mode)===-1&&(console.warn(`EarlyStopping mode '${this.mode}' is invalid. Falling back to mode 'auto'.`),this.mode="auto"),this.mode==="min"?this.monitorFunc=Oe:this.mode==="max"?this.monitorFunc=Hs:this.monitor.indexOf("acc")!==-1?this.monitorFunc=Hs:this.monitorFunc=Oe,this.monitorFunc===Oe&&(this.minDelta*=-1)}async onTrainBegin(e){this.wait=0,this.stoppedEpoch=0,this.baseline!=null?this.best=this.baseline:this.best=this.monitorFunc===Oe?1/0:-1/0}async onEpochEnd(e,t){await iu(t);const n=this.getMonitorValue(t);n!=null&&(this.monitorFunc(n-this.minDelta,this.best)?(this.best=n,this.wait=0):(this.wait++,this.wait>=this.patience&&(this.stoppedEpoch=e,this.model.stopTraining=!0)))}async onTrainEnd(e){this.stoppedEpoch>0&&this.verbose&&console.log(`Epoch ${this.stoppedEpoch}: early stopping.`)}getMonitorValue(e){e==null&&(e={});const t=e[this.monitor];return t==null&&console.warn(`Metric for EarlyStopping ${this.monitor} is not available. Available metrics are: ${Object.keys(e)}`),t}}function rg(a){return new Us(a)}const sg={earlyStopping:rg};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ct={};function og(a,e){const t={tfOpName:a,category:"custom",inputs:[],attrs:[],customExecutor:e};ct[a]=t}function Gs(a){return ct[a]}function ig(a){delete ct[a]}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function o(a,e,t,n,r){const s=e.inputParams[a];if(s&&s.inputIndexStart!==void 0){const i=s.inputIndexStart,u=s.inputIndexEnd===0?void 0:s.inputIndexEnd===void 0?i+1:s.inputIndexEnd,l=i<0?e.inputNames.length+i:i;if(s.type==="tensor")return E(e.inputNames[l],t,n,r);if(s.type==="tensors"){const d=e.inputs.slice(i,u);return e.inputNames.slice(i,u).filter((h,N)=>{var f;return((f=d[N])===null||f===void 0?void 0:f.op)!=="NoOp"}).map(h=>E(h,t,n,r))}const c=E(e.inputNames[l],t,n,r),m=c.dataSync();return s.type==="number"?m[0]:pu(c.shape,m)}const p=e.attrParams[a];return p&&p.value}function E(a,e,t,n){const[r,s]=k(a,t);if(n!=null){const i=n.getHashTableHandleByName(r);if(i!=null)return i}const p=t.currentContextIds.find(i=>!!e[_e(r,i)]);return p!==void 0?e[_e(r,p)][s]:void 0}function Ks(a,e,t){return e[_e(a,t.currentContextId)]}function j(a,e){const[t,n,r]=k(a,e);return[_e(t,e&&e.currentContextId),n,r]}function _e(a,e){return e?`${a}-${e}`:a}function k(a,e){if(a==="")return["",0,void 0];const t=e!=null&&e.parseNodeNameCache!=null;if(t){const s=e.parseNodeNameCache.get(a);if(s!=null)return s}const n=a.split(":");let r;if(n.length===1)r=[a,0,void 0];else{const s=n[0],p=n.length===3?n[1]:void 0,i=Number(n[n.length-1]);r=[s,i,p]}return t&&e.parseNodeNameCache.set(a,r),r}function Ae(a,e,t){let n=o("pad",a,e,t);if(n==="explicit"){n=o("explicitPaddings",a,e,t);const r=[[0,0],[0,0],[0,0],[0,0]];for(let s=0;s<4;s++)r[s][0]=n[s*2],r[s][1]=n[s*2+1];return r}return n}function W(a){return a.kept?a:Xe(a)}/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const pg=[{tfOpName:"Add",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddV2",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddN",category:"arithmetic",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"BiasAdd",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"Sub",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"RealDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Div",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"DivNoNan",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mul",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Maximum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Minimum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Pow",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SquaredDifference",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorMod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}],ug=Object.freeze(Object.defineProperty({__proto__:null,json:pg},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const lg=[{tfOpName:"Abs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan2",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Ceil",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ClipByValue",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"clipValueMin",type:"number"},{start:2,name:"clipValueMax",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Complex",category:"basic_math",inputs:[{start:0,name:"real",type:"tensor"},{start:1,name:"imag",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ComplexAbs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Elu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Exp",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Floor",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Imag",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Neg",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Real",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Prelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"alpha",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu6",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Selu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sigmoid",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Rsqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Square",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sign",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Round",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Expm1",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log1p",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Reciprocal",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Softplus",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Erf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LeakyRelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"alpha",name:"alpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsNan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsFinite",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsInf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}],cg=Object.freeze(Object.defineProperty({__proto__:null,json:lg},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const mg=[{tfOpName:"EmptyTensorList",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"maxNumElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"LoopCond",category:"control",inputs:[{start:0,name:"pred",type:"tensor"}]},{tfOpName:"Switch",category:"control",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"pred",type:"tensor"}]},{tfOpName:"Merge",category:"control",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"Enter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"frame_name",name:"frameName",type:"string"},{tfName:"is_constant",name:"isConstant",type:"bool"}]},{tfOpName:"Exit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NextIteration",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayV3",category:"control",inputs:[{start:0,name:"size",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"dynamic_size",name:"dynamicSize",type:"bool"},{tfName:"clear_after_read",name:"clearAfterRead",type:"bool"},{tfName:"identical_element_shapes",name:"identicalElementShapes",type:"bool"},{tfName:"tensor_array_name",name:"name",type:"string"}]},{tfOpName:"TensorArrayWriteV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayReadV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayGatherV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"}]},{tfOpName:"TensorArrayScatterV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArrayConcatV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape_except0",name:"elementShapeExcept0",type:"shape",notSupported:!0}]},{tfOpName:"TensorArraySplitV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"tensor",type:"tensor"},{start:2,name:"lengths",type:"number[]"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArraySizeV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}]},{tfOpName:"TensorArrayCloseV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"}]},{tfOpName:"StatelessIf",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"If",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"StatelessWhile",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"While",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"TensorListScatter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListScatterV2",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"},{start:3,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGather",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListSetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListReserve",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListFromTensor",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListStack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"},{tfName:"num_elements",name:"numElements",type:"dtype"}]},{tfOpName:"TensorListSplit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"},{start:2,name:"lengths",type:"number[]"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcat",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcatV2",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPopBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPushBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListLength",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}]},{tfOpName:"TensorListResize",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"size",type:"number"}]}],dg=Object.freeze(Object.defineProperty({__proto__:null,json:mg},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const hg=[{tfOpName:"AvgPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[],notSupported:!0},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPoolWithArgmax",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"include_batch_in_index",name:"includeBatchInIndex",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AvgPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Conv1D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"stride",name:"stride",type:"number"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NWC"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"dilation",name:"dilation",type:"number",defaultValue:1}]},{tfOpName:"Conv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"useCudnnOnGpu",name:"useCudnnOnGpu",type:"bool"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"_FusedConv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"use_cudnn_on_gpu",name:"useCudnnOnGpu",type:"bool",defaultValue:!0},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2}]},{tfOpName:"Conv2DBackpropInput",category:"convolution",inputs:[{start:2,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:0,name:"outputShape",type:"number[]"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]",notSupported:!0}]},{tfOpName:"DepthwiseConv2d",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"DepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"FusedDepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]}]},{tfOpName:"Conv3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"Dilation2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"rates",name:"dilations",type:"number[]"},{tfName:"padding",name:"pad",type:"string"}]}],yg=Object.freeze(Object.defineProperty({__proto__:null,json:hg},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const fg=[{tfOpName:"Fill",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"},{start:1,name:"value",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"LinSpace",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"num",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"OneHot",category:"creation",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"depth",type:"number"},{start:2,name:"onValue",type:"number",defaultValue:1},{start:3,name:"offValue",type:"number",defaultValue:0}],attrs:[{tfName:"axis",name:"axis",type:"number",notSupported:!0},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Ones",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"OnesLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"RandomStandardNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniform",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number",defaultValue:0},{tfName:"maxval",name:"maxval",type:"number",defaultValue:1},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniformInt",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number"},{tfName:"maxval",name:"maxval",type:"number"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Range",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"step",type:"number",defaultValue:0}],attrs:[{tfName:"Tidx",name:"dtype",type:"dtype"}]},{tfOpName:"TruncatedNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"means",name:"mean",type:"number",defaultValue:0},{tfName:"stddev",name:"stdDev",type:"number",defaultValue:1},{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"Zeros",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"ZerosLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Multinomial",category:"creation",inputs:[{start:0,name:"logits",type:"tensor"},{start:1,name:"numSamples",type:"number"}],attrs:[{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number"},{tfName:"T",name:"dtype",type:"dtype"},{tfName:"output_dtype",name:"output_dtype",type:"dtype"}]}],gg=Object.freeze(Object.defineProperty({__proto__:null,json:fg},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const bg=[{tfOpName:"NonMaxSuppressionV2",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV3",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV4",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"T_threshold",name:"threshold",type:"dtype",notSupported:!0},{tfName:"pad_to_max_output_size",name:"padToMaxOutputSize",type:"bool"}]},{tfOpName:"NonMaxSuppressionV5",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"},{start:5,name:"softNmsSigma",type:"number"}]},{tfOpName:"Where",category:"dynamic",inputs:[{start:0,name:"condition",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ListDiff",category:"dynamic",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}],Ng=Object.freeze(Object.defineProperty({__proto__:null,json:bg},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const wg=[{tfOpName:"LowerBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"TopKV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"k",type:"number"}],attrs:[{tfName:"sorted",name:"sorted",type:"bool"}]},{tfOpName:"UpperBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"Unique",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"UniqueV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]}],xg=Object.freeze(Object.defineProperty({__proto__:null,json:wg},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Sg=[{tfOpName:"PlaceholderWithDefault",category:"graph",inputs:[{start:0,name:"default",type:"tensor"}],attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Placeholder",category:"graph",attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Const",category:"graph"},{tfOpName:"Identity",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IdentityN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Snapshot",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Rank",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Size",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Shape",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"ShapeN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Print",category:"graph",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"data",type:"tensors"}],attrs:[{tfName:"message",name:"message",type:"string"},{tfName:"first_n",name:"firstN",type:"number",notSupported:!0},{tfName:"summarize",name:"summarize",type:"number",defaultValue:3}]},{tfOpName:"NoOp",category:"graph",inputs:[]},{tfOpName:"StopGradient",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"FakeQuantWithMinMaxVars",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"min",name:"min",type:"number"},{tfName:"max",name:"max",type:"number"}]}],Tg=Object.freeze(Object.defineProperty({__proto__:null,json:Sg},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const vg=[{tfOpName:"HashTable",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"HashTableV2",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"LookupTableImport",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableImportV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFind",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFindV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableSize",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"LookupTableSizeV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"InitializeTable",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}]},{tfOpName:"InitializeTableV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}]}],Og=Object.freeze(Object.defineProperty({__proto__:null,json:vg},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const _g=[{tfOpName:"ResizeBilinear",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ResizeNearestNeighbor",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"CropAndResize",category:"image",inputs:[{start:0,name:"image",type:"tensor"},{start:1,name:"boxes",type:"tensor"},{start:2,name:"boxInd",type:"tensor"},{start:3,name:"cropSize",type:"number[]"}],attrs:[{tfName:"method",name:"method",type:"string"},{tfName:"extrapolation_value",name:"extrapolationValue",type:"number"}]},{tfOpName:"ImageProjectiveTransformV3",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"transforms",type:"tensor"},{start:2,name:"outputShape",type:"number[]"},{start:3,name:"fillValue",type:"number"}],attrs:[{tfName:"interpolation",name:"interpolation",type:"string"},{tfName:"fill_mode",name:"fillMode",type:"string"}]}],Ag=Object.freeze(Object.defineProperty({__proto__:null,json:_g},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Eg=[{tfOpName:"Equal",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NotEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Greater",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"GreaterEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Less",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LessEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalAnd",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalNot",category:"logical",inputs:[{start:0,name:"a",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalOr",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Select",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SelectV2",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BitwiseAnd",category:"logical",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}]}],Mg=Object.freeze(Object.defineProperty({__proto__:null,json:Eg},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const kg=[{tfOpName:"_FusedMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMulV2",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Transpose",category:"matrices",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"perm",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Einsum",category:"matrices",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"equation",name:"equation",type:"string"},{tfName:"N",name:"n",type:"number",defaultValue:2},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"MatrixBandPart",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"numLower",type:"tensor"},{start:1,name:"numUpper",type:"tensor"}]}],Ig=Object.freeze(Object.defineProperty({__proto__:null,json:kg},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Cg=[{tfOpName:"EuclideanNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool",defaultValue:!1}]},{tfOpName:"FusedBatchNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV2",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV3",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"LRN",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"depth_radius",name:"radius",type:"number",defaultValue:5},{tfName:"bias",name:"bias",type:"number",defaultValue:1},{tfName:"alpha",name:"alpha",type:"number",defaultValue:1},{tfName:"beta",name:"beta",type:"number",defaultValue:.5}]},{tfOpName:"Softmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"LogSoftmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]}],Dg=Object.freeze(Object.defineProperty({__proto__:null,json:Cg},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zg=[{tfOpName:"Bincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}]},{tfOpName:"DenseBincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}],attrs:[{tfName:"binary_output",name:"binaryOutput",type:"bool"}]},{tfOpName:"Max",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Mean",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Min",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Sum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"All",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Any",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"ArgMax",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"ArgMin",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"Prod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cumprod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]},{tfOpName:"Cumsum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]}],Vg=Object.freeze(Object.defineProperty({__proto__:null,json:zg},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const $g=[{tfOpName:"ConcatV2",category:"slice_join",inputs:[{start:0,end:-1,name:"tensors",type:"tensors"},{start:-1,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"Concat",category:"slice_join",inputs:[{start:1,end:0,name:"tensors",type:"tensors"},{start:0,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"GatherV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"axis",type:"number",defaultValue:0}],attrs:[{tfName:"batch_dims",name:"batchDims",type:"number",defaultValue:0}]},{tfOpName:"Gather",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",notSupported:!0}]},{tfOpName:"Reverse",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"dims",type:"bool[]"}]},{tfOpName:"ReverseV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}]},{tfOpName:"Slice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"size",type:"number[]"}]},{tfOpName:"StridedSlice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"end",type:"number[]"},{start:3,name:"strides",type:"number[]"}],attrs:[{tfName:"begin_mask",name:"beginMask",type:"number",defaultValue:0},{tfName:"end_mask",name:"endMask",type:"number",defaultValue:0},{tfName:"new_axis_mask",name:"newAxisMask",type:"number",defaultValue:0},{tfName:"ellipsis_mask",name:"ellipsisMask",type:"number",defaultValue:0},{tfName:"shrink_axis_mask",name:"shrinkAxisMask",type:"number",defaultValue:0}]},{tfOpName:"Pack",category:"slice_join",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0}]},{tfOpName:"Unpack",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0},{tfName:"num",name:"num",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Tile",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"reps",type:"number[]"}]},{tfOpName:"Split",category:"slice_join",inputs:[{start:0,name:"axis",type:"number",defaultValue:0},{start:1,name:"x",type:"tensor"}],attrs:[{tfName:"num_split",name:"numOrSizeSplits",type:"number",defaultValue:1}]},{tfOpName:"SplitV",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"numOrSizeSplits",type:"number[]"},{start:2,name:"axis",type:"number",defaultValue:0}]},{tfOpName:"ScatterNd",category:"slice_join",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"shape",type:"number[]"}]},{tfOpName:"GatherNd",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}]},{tfOpName:"SparseToDense",category:"slice_join",inputs:[{start:0,name:"sparseIndices",type:"tensor"},{start:1,name:"outputShape",type:"number[]"},{start:2,name:"sparseValues",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",defaultValue:!1,notSupported:!0}]},{tfOpName:"TensorScatterUpdate",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"values",type:"tensor"}]}],Lg=Object.freeze(Object.defineProperty({__proto__:null,json:$g},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Fg=[{tfOpName:"SparseFillEmptyRows",category:"sparse",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"denseShape",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}]},{tfOpName:"SparseReshape",category:"sparse",inputs:[{start:0,name:"inputIndices",type:"tensor"},{start:1,name:"inputShape",type:"tensor"},{start:2,name:"newShape",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SparseSegmentMean",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]},{tfOpName:"SparseSegmentSum",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]}],Pg=Object.freeze(Object.defineProperty({__proto__:null,json:Fg},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Rg=[{tfOpName:"FFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"RFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]},{tfOpName:"IRFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]}],Bg=Object.freeze(Object.defineProperty({__proto__:null,json:Rg},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const jg=[{tfOpName:"StaticRegexReplace",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"pattern",name:"pattern",type:"string"},{tfName:"rewrite",name:"rewrite",type:"string"},{tfName:"replace_global",name:"replaceGlobal",type:"bool"}]},{tfOpName:"StringNGrams",category:"string",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"dataSplits",type:"tensor"}],attrs:[{tfName:"separator",name:"separator",type:"string"},{tfName:"ngram_widths",name:"nGramWidths",type:"number[]"},{tfName:"left_pad",name:"leftPad",type:"string"},{tfName:"right_pad",name:"rightPad",type:"string"},{tfName:"pad_width",name:"padWidth",type:"number"},{tfName:"preserve_short_sequences",name:"preserveShortSequences",type:"bool"}],outputs:["ngrams","ngrams_splits"]},{tfOpName:"StringSplit",category:"string",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"delimiter",type:"tensor"}],attrs:[{tfName:"skip_empty",name:"skipEmpty",type:"bool"}],outputs:["indices","values","shape"]},{tfOpName:"StringToHashBucketFast",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"num_buckets",name:"numBuckets",type:"number"}]}],Wg=Object.freeze(Object.defineProperty({__proto__:null,json:jg},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const qg=[{tfOpName:"Cast",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"SrcT",name:"sdtype",type:"dtype",notSupported:!0},{tfName:"DstT",name:"dtype",type:"dtype"}]},{tfOpName:"ExpandDims",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"MirrorPad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"mode",name:"mode",type:"string"}]},{tfOpName:"Pad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"constant_value",name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"PadV2",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"},{start:2,name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"Reshape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"EnsureShape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"Squeeze",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"axis",tfDeprecatedName:"squeeze_dims",name:"axis",type:"number[]"}]},{tfOpName:"SpaceToBatchND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"paddings",type:"number[]"}]},{tfOpName:"BatchToSpaceND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"crops",type:"number[]"}]},{tfOpName:"DepthToSpace",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"block_size",name:"blockSize",type:"number"},{tfName:"data_format",name:"dataFormat",type:"string"}]},{tfOpName:"BroadcastTo",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}],attrs:[]},{tfOpName:"BroadcastArgs",category:"transformation",inputs:[{start:0,name:"s0",type:"tensor"},{start:1,name:"s1",type:"tensor"}],attrs:[]}],Hg=Object.freeze(Object.defineProperty({__proto__:null,json:qg},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Js{static get Instance(){return this._instance||(this._instance=new this)}constructor(){const e=[ug,cg,dg,yg,gg,Ng,xg,Tg,Og,Ag,Mg,Ig,Dg,Vg,Lg,Pg,Bg,Wg,Hg],t=[].concat(...e.map(n=>n.json));this.opMappers=t.reduce((n,r)=>(n[r.tfOpName]=r,n),{})}transformGraph(e,t={}){const n=e.node,r=[],s=[],p=[],i=n.reduce((f,y)=>(f[y.name]=this.mapNode(y),y.op.startsWith("Placeholder")?r.push(f[y.name]):y.op==="Const"?s.push(f[y.name]):(y.input==null||y.input.length===0)&&p.push(f[y.name]),f),{});let u=[];const l=[];let c={},m={};t!=null&&(c=this.mapSignatureEntries(t.inputs),m=this.mapSignatureEntries(t.outputs));const d=Object.keys(i);d.forEach(f=>{const y=i[f];y.inputNames.forEach((b,v)=>{const[_,,x]=j(b),A=i[_];if(A.outputs!=null){const I=A.outputs.indexOf(x);if(I!==-1){const C=`${_}:${I}`;y.inputNames[v]=C}}y.inputs.push(A),A.children.push(y)})}),Object.keys(m).length===0?d.forEach(f=>{const y=i[f];y.children.length===0&&l.push(y)}):Object.keys(m).forEach(f=>{const[y]=j(f),b=i[y];b!=null&&(b.signatureKey=m[f],l.push(b))}),Object.keys(c).length>0?Object.keys(c).forEach(f=>{const[y]=j(f),b=i[y];b&&(b.signatureKey=c[f],u.push(b))}):u=r;let h={};e.library!=null&&e.library.function!=null&&(h=e.library.function.reduce((f,y)=>(f[y.signature.name]=this.mapFunction(y),f),{}));const N={nodes:i,inputs:u,outputs:l,weights:s,placeholders:r,signature:t,functions:h};return p.length>0&&(N.initNodes=p),N}mapSignatureEntries(e){return Object.keys(e||{}).reduce((t,n)=>(t[e[n].name]=n,t),{})}mapNode(e){const t=Gs(e.op)||this.opMappers[e.op]||{};e.attr==null&&(e.attr={});const n={name:e.name,op:e.op,category:t.category,inputNames:(e.input||[]).map(r=>r.startsWith("^")?r.slice(1):r),inputs:[],children:[],inputParams:{},attrParams:{},rawAttrs:e.attr,outputs:t.outputs};return t.inputs!=null&&(n.inputParams=t.inputs.reduce((r,s)=>(r[s.name]={type:s.type,inputIndexStart:s.start,inputIndexEnd:s.end},r),{})),t.attrs!=null&&(n.attrParams=t.attrs.reduce((r,s)=>{const p=s.type;let i;switch(s.type){case"string":i=mt(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=mt(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"string[]":i=wt(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=wt(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"number":i=ht(e.attr,s.tfName,s.defaultValue||0),i===void 0&&s.tfDeprecatedName&&(i=ht(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"number[]":i=Nt(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=Nt(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"bool":i=dt(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=dt(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"bool[]":i=St(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=St(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"shape":i=bt(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=bt(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"shape[]":i=xt(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=xt(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"dtype":i=ft(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=ft(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"dtype[]":i=gt(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=gt(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"func":i=Xs(e.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=Xs(e.attr,s.tfDeprecatedName,s.defaultValue));break;case"tensor":case"tensors":break;default:throw new Error(`Unsupported param type: ${s.type} for op: ${e.op}`)}return r[s.name]={value:i,type:p},r},{})),n}mapFunction(e){const t=e.nodeDef,n=[],r=[];let s={};t!=null&&(s=t.reduce((c,m)=>(c[m.name]=this.mapNode(m),m.op==="Const"&&r.push(c[m.name]),c),{}));const p=[],i=[];e.signature.inputArg.forEach(c=>{const[m]=j(c.name),d={name:m,op:"Placeholder",inputs:[],inputNames:[],category:"graph",inputParams:{},attrParams:{dtype:{value:yt(c.type),type:"dtype"}},children:[]};d.signatureKey=c.name,p.push(d),s[m]=d}),Object.keys(s).forEach(c=>{const m=s[c];m.inputNames.forEach((d,h)=>{const[N,,f]=j(d),y=s[N];if(y.outputs!=null){const b=y.outputs.indexOf(f);if(b!==-1){const v=`${N}:${b}`;m.inputNames[h]=v}}m.inputs.push(y),y.children.push(m)})});const u=e.ret;e.signature.outputArg.forEach(c=>{const[m,d]=j(u[c.name]),h=s[m];h!=null&&(h.defaultOutput=d,i.push(h))});const l=this.mapArgsToSignature(e);return{nodes:s,inputs:p,outputs:i,weights:r,placeholders:n,signature:l}}mapArgsToSignature(e){return{methodName:e.signature.name,inputs:e.signature.inputArg.reduce((t,n)=>(t[n.name]=this.mapArgToTensorInfo(n),t),{}),outputs:e.signature.outputArg.reduce((t,n)=>(t[n.name]=this.mapArgToTensorInfo(n,e.ret),t),{})}}mapArgToTensorInfo(e,t){let n=e.name;return t!=null&&(n=t[n]),{name:n,dtype:e.type}}}function Ug(a){const e=z().global;if(typeof e.atob<"u")return e.atob(a);if(typeof Buffer<"u")return new Buffer(a,"base64").toString();throw new Error("Unable to decode base64 in this environment. Missing built-in atob() or Buffer()")}function Qs(a,e){const t=Array.isArray(a)?String.fromCharCode.apply(null,a):Ug(a);return e?t:t.toLowerCase()}function mt(a,e,t,n=!1){const r=a[e];return r!=null?Qs(r.s,n):t}function dt(a,e,t){const n=a[e];return n?n.b:t}function ht(a,e,t){const n=a[e]||{},r=n.i!=null?n.i:n.f!=null?n.f:t;return typeof r=="number"?r:parseInt(r,10)}function yt(a){switch(typeof a=="string"&&(a=V[a]),a){case V.DT_FLOAT:case V.DT_HALF:return"float32";case V.DT_INT32:case V.DT_INT64:case V.DT_INT8:case V.DT_UINT8:return"int32";case V.DT_BOOL:return"bool";case V.DT_DOUBLE:return"float32";case V.DT_STRING:return"string";case V.DT_COMPLEX64:case V.DT_COMPLEX128:return"complex64";default:return null}}function Xs(a,e,t){const n=a[e];return n&&n.func?n.func.name:t}function ft(a,e,t){const n=a[e];return n&&n.type?yt(n.type):t}function gt(a,e,t){const n=a[e];return n&&n.list&&n.list.type?n.list.type.map(r=>yt(r)):t}function Zs(a){if(!a.unknownRank)return a.dim!=null?a.dim.map(e=>typeof e.size=="number"?e.size:parseInt(e.size,10)):[]}function bt(a,e,t){const n=a[e];return n&&n.shape?Zs(n.shape):t}function Nt(a,e,t){const n=a[e];return n?((n.list.f&&n.list.f.length?n.list.f:n.list.i)||[]).map(r=>typeof r=="number"?r:parseInt(r,10)):t}function wt(a,e,t,n=!1){const r=a[e];return r&&r.list&&r.list.s?r.list.s.map(s=>Qs(s,n)):t}function xt(a,e,t){const n=a[e];return n&&n.list&&n.list.shape?n.list.shape.map(r=>Zs(r)):t}function St(a,e,t){const n=a[e];return n&&n.list&&n.list.b?n.list.b:t}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Gg{constructor(e,t,n){this.node=e,this.tensorMap=t,this.context=n,this.inputs=[],this.attrs={},this.inputs=e.inputNames.map(r=>this.getInput(r)),e.rawAttrs!=null&&(this.attrs=Object.keys(e.rawAttrs).reduce((r,s)=>(r[s]=this.getAttr(s),r),{}))}getInput(e){return E(e,this.tensorMap,this.context)}getAttr(e,t){const n=this.node.rawAttrs[e];if(n.tensor!=null)return E(e,this.tensorMap,this.context);if(n.i!=null||n.f!=null)return ht(this.node.rawAttrs,e,t);if(n.s!=null)return mt(this.node.rawAttrs,e,t);if(n.b!=null)return dt(this.node.rawAttrs,e,t);if(n.shape!=null)return bt(this.node.rawAttrs,e,t);if(n.type!=null)return ft(this.node.rawAttrs,e,t);if(n.list!=null){if(n.list.i!=null||n.list.f!=null)return Nt(this.node.rawAttrs,e,t);if(n.list.s!=null)return wt(this.node.rawAttrs,e,t);if(n.list.shape!=null)return xt(this.node.rawAttrs,e,t);if(n.list.b!=null)return St(this.node.rawAttrs,e,t);if(n.list.type!=null)return gt(this.node.rawAttrs,e,t)}return t}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const M=Object.freeze(Object.defineProperty({__proto__:null,OP_SCOPE_SUFFIX:pa,abs:ua,acos:la,acosh:ca,add:U,addN:Gr,all:ma,any:da,argMax:ha,argMin:ya,asin:fa,asinh:ga,atan:ba,atan2:Na,atanh:wa,avgPool:xa,avgPool3d:Sa,basicLSTMCell:Kr,batchNorm:Ta,batchNorm2d:va,batchNorm3d:Oa,batchNorm4d:_a,batchToSpaceND:Aa,bincount:Ea,bitwiseAnd:Jr,booleanMaskAsync:Ms,broadcastArgs:Qr,broadcastTo:Ma,buffer:De,cast:ae,ceil:ka,clipByValue:Ia,clone:Xe,complex:Ca,concat:se,concat1d:Da,concat2d:za,concat3d:Va,concat4d:$a,conv1d:La,conv2d:Fa,conv2dTranspose:Pa,conv3d:Ra,conv3dTranspose:Ba,cos:ja,cosh:Wa,cosineWindow:qa,cumprod:Ha,cumsum:Ua,denseBincount:Ga,depthToSpace:Ka,depthwiseConv2d:We,diag:Xr,dilation2d:Ja,div:Be,divNoNan:Qa,dot:Xa,dropout:Za,einsum:Ya,elu:en,enclosingPowerOfTwo:tn,ensureShape:Zr,equal:an,erf:nn,euclideanNorm:rn,exp:sn,expandDims:Ze,expm1:on,eye:pn,fft:un,fill:ln,floor:cn,floorDiv:mn,fused:Vs,gather:Re,gatherND:Ds,greater:dn,greaterEqual:hn,ifft:yn,imag:fn,image:Ye,inTopKAsync:zs,irfft:gn,isFinite:bn,isInf:Nn,isNaN:wn,leakyRelu:xn,less:Sn,lessEqual:Tn,linalg:vn,linspace:Yr,localResponseNormalization:On,log:_n,log1p:An,logSigmoid:En,logSoftmax:Mn,logSumExp:kn,logicalAnd:In,logicalNot:Cn,logicalOr:Dn,logicalXor:zn,losses:Vn,lowerBound:es,matMul:B,max:$n,maxPool:Ln,maxPool3d:Fn,maxPoolWithArgmax:ts,maximum:Pn,mean:Rn,meshgrid:as,min:Bn,minimum:jn,mirrorPad:Wn,mod:qn,moments:Hn,movingAverage:ks,mul:X,multiRNNCell:ns,multinomial:rs,neg:Un,norm:Gn,notEqual:Kn,oneHot:be,ones:Z,onesLike:Jn,op:S,outerProduct:ss,pad:Y,pad1d:os,pad2d:is,pad3d:ps,pad4d:us,pool:Qn,pow:je,prelu:Xn,print:Zn,prod:Yn,raggedGather:ls,raggedRange:cs,raggedTensorToTensor:ms,rand:ds,randomGamma:fs,randomNormal:ze,randomStandardNormal:gs,randomUniform:Ve,randomUniformInt:bs,range:er,real:tr,reciprocal:ar,relu:nr,relu6:rr,reshape:T,reverse:te,reverse1d:Ns,reverse2d:ws,reverse3d:xs,reverse4d:Ss,rfft:sr,round:or,rsqrt:ir,scalar:F,scatterND:Is,searchSorted:Te,selu:pr,separableConv2d:ur,setdiff1dAsync:Ts,sigmoid:oe,sign:lr,signal:cr,sin:mr,sinh:dr,slice:q,slice1d:hr,slice2d:yr,slice3d:fr,slice4d:gr,softmax:br,softplus:Nr,spaceToBatchND:wr,sparse:xr,sparseToDense:Cs,spectral:Sr,split:Tr,sqrt:vr,square:Or,squaredDifference:_r,squeeze:Pe,stack:ne,step:Ar,stridedSlice:Er,string:Mr,sub:le,sum:kr,tan:Ir,tanh:ye,tensor:H,tensor1d:et,tensor2d:Ne,tensor3d:Cr,tensor4d:vs,tensor5d:Os,tensor6d:_s,tensorScatterUpdate:As,tile:Dr,topk:zr,transpose:Ue,truncatedNormal:Vr,unique:$r,unsortedSegmentSum:Lr,unstack:re,upperBound:Es,variable:Fr,where:Pr,whereAsync:st,zeros:Rr,zerosLike:Br},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Kg=(a,e,t,n=M)=>{switch(a.op){case"BiasAdd":case"AddV2":case"Add":return[n.add(o("a",a,e,t),o("b",a,e,t))];case"AddN":return[n.addN(o("tensors",a,e,t))];case"FloorMod":case"Mod":return[n.mod(o("a",a,e,t),o("b",a,e,t))];case"Mul":return[n.mul(o("a",a,e,t),o("b",a,e,t))];case"RealDiv":case"Div":return[n.div(o("a",a,e,t),o("b",a,e,t))];case"DivNoNan":return[n.divNoNan(o("a",a,e,t),o("b",a,e,t))];case"FloorDiv":return[n.floorDiv(o("a",a,e,t),o("b",a,e,t))];case"Sub":return[n.sub(o("a",a,e,t),o("b",a,e,t))];case"Minimum":return[n.minimum(o("a",a,e,t),o("b",a,e,t))];case"Maximum":return[n.maximum(o("a",a,e,t),o("b",a,e,t))];case"Pow":return[n.pow(o("a",a,e,t),o("b",a,e,t))];case"SquaredDifference":return[n.squaredDifference(o("a",a,e,t),o("b",a,e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Jg=(a,e,t,n=M)=>{switch(a.op){case"Abs":case"ComplexAbs":return[n.abs(o("x",a,e,t))];case"Acos":return[n.acos(o("x",a,e,t))];case"Acosh":return[n.acosh(o("x",a,e,t))];case"Asin":return[n.asin(o("x",a,e,t))];case"Asinh":return[n.asinh(o("x",a,e,t))];case"Atan":return[n.atan(o("x",a,e,t))];case"Atan2":return[n.atan2(o("x",a,e,t),o("y",a,e,t))];case"Atanh":return[n.atanh(o("x",a,e,t))];case"Ceil":return[n.ceil(o("x",a,e,t))];case"Complex":return[n.complex(o("real",a,e,t),o("imag",a,e,t))];case"Cos":return[n.cos(o("x",a,e,t))];case"Cosh":return[n.cosh(o("x",a,e,t))];case"Elu":return[n.elu(o("x",a,e,t))];case"Erf":return[n.erf(o("x",a,e,t))];case"Exp":return[n.exp(o("x",a,e,t))];case"Expm1":return[n.expm1(o("x",a,e,t))];case"Floor":return[n.floor(o("x",a,e,t))];case"Log":return[n.log(o("x",a,e,t))];case"Log1p":return[n.log1p(o("x",a,e,t))];case"Imag":return[n.imag(o("x",a,e,t))];case"Neg":return[n.neg(o("x",a,e,t))];case"Reciprocal":return[n.reciprocal(o("x",a,e,t))];case"Real":return[n.real(o("x",a,e,t))];case"Relu":return[n.relu(o("x",a,e,t))];case"Round":return[n.round(o("x",a,e,t))];case"Selu":return[n.selu(o("x",a,e,t))];case"Sigmoid":return[n.sigmoid(o("x",a,e,t))];case"Sin":return[n.sin(o("x",a,e,t))];case"Sign":return[n.sign(o("x",a,e,t))];case"Sinh":return[n.sinh(o("x",a,e,t))];case"Softplus":return[n.softplus(o("x",a,e,t))];case"Sqrt":return[n.sqrt(o("x",a,e,t))];case"Square":return[n.square(o("x",a,e,t))];case"Tanh":return[n.tanh(o("x",a,e,t))];case"Tan":return[n.tan(o("x",a,e,t))];case"ClipByValue":return[n.clipByValue(o("x",a,e,t),o("clipValueMin",a,e,t),o("clipValueMax",a,e,t))];case"Relu6":return[n.relu6(o("x",a,e,t))];case"Rsqrt":return[n.rsqrt(E(a.inputNames[0],e,t))];case"LeakyRelu":return[n.leakyRelu(o("x",a,e,t),o("alpha",a,e,t))];case"Prelu":return[n.prelu(o("x",a,e,t),o("alpha",a,e,t))];case"IsNan":return[n.isNaN(E(a.inputNames[0],e,t))];case"IsInf":return[n.isInf(E(a.inputNames[0],e,t))];case"IsFinite":return[n.isFinite(E(a.inputNames[0],e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function L(a,e,t=""){if(!(typeof a=="number"||typeof e=="number")){w(a.length===e.length,()=>t+` Shapes ${a} and ${e} must match`);for(let n=0;n<a.length;n++){const r=a[n],s=e[n];w(r<0||s<0||r===s,()=>t+` Shapes ${a} and ${e} must match`)}}}function Ys(a){return!(typeof a=="number"||a.some(e=>e<0))}function ce(a,e,t){let n=Tt(a,t);const r=!Ys(n);if(r&&e.length===0)throw new Error(`Tried to calculate elements of an empty list with non-fully-defined elementShape: ${n}`);if(r&&e.forEach(s=>{n=Tt(s.shape,n)}),!Ys(n))throw new Error(`Non-fully-defined elementShape: ${n}`);return n}function Tt(a,e){if(typeof a=="number")return e;if(typeof e=="number")return a;if(a.length!==e.length)throw new Error(`Incompatible ranks during merge: ${a} vs. ${e}`);const t=[];for(let n=0;n<a.length;++n){const r=a[n],s=e[n];if(r>=0&&s>=0&&r!==s)throw new Error(`Incompatible shape during merge: ${a} vs. ${e}`);t[n]=r>=0?r:s}return t}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Qg{constructor(e,t,n,r,s,p,i){this.name=e,this.dtype=t,this.maxSize=n,this.elementShape=r,this.identicalElementShapes=s,this.dynamicSize=p,this.clearAfterRead=i,this.tensors=[],this.closed_=!1,this.idTensor=F(0),P(this.idTensor)}get id(){return this.idTensor.id}get closed(){return this.closed_}clearAndClose(e){this.tensors.forEach(t=>{(e==null||!e.has(t.tensor.id))&&t.tensor.dispose()}),this.tensors=[],this.closed_=!0,this.idTensor.dispose()}size(){return this.tensors.length}read(e){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(e<0||e>=this.size())throw new Error(`Tried to read from index ${e}, but array size is: ${this.size()}`);const t=this.tensors[e];if(t.cleared)throw new Error(`TensorArray ${this.name}: Could not read index ${e} twice because it was cleared after a previous read (perhaps try setting clear_after_read = false?).`);return this.clearAfterRead&&(t.cleared=!0),t.read=!0,t.tensor}readMany(e){return e.map(t=>this.read(t))}write(e,t){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(e<0||!this.dynamicSize&&e>=this.maxSize)throw new Error(`Tried to write to index ${e}, but array is not resizeable and size is: ${this.maxSize}`);const n=this.tensors[e]||{};if(t.dtype!==this.dtype)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e},
          because the value dtype is ${t.dtype}, but TensorArray dtype is ${this.dtype}.`);if(this.size()===0&&(this.elementShape==null||this.elementShape.length===0)&&(this.elementShape=t.shape),L(this.elementShape,t.shape,`TensorArray ${this.name}: Could not write to TensorArray index ${e}.`),n.read)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e}, because it has already been read.`);if(n.written)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e}, because it has already been written.`);n.tensor=t,P(t),n.written=!0,this.tensors[e]=n}writeMany(e,t){if(e.length!==t.length)throw new Error(`TensorArray ${this.name}: could not write multiple tensors,because the index size: ${e.length} is not the same as tensors size: ${t.length}.`);e.forEach((n,r)=>this.write(n,t[r]))}gather(e,t){if(t&&t!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but gather requested dtype ${t}`);if(e)e=e.slice(0,this.size());else{e=[];for(let r=0;r<this.size();r++)e.push(r)}if(e.length===0)return H([],[0].concat(this.elementShape));const n=this.readMany(e);return L(this.elementShape,n[0].shape,"TensorArray shape mismatch: "),ne(n,0)}concat(e){if(e&&e!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but concat requested dtype ${e}`);if(this.size()===0)return H([],[0].concat(this.elementShape));const t=[];for(let r=0;r<this.size();r++)t.push(r);const n=this.readMany(t);return L(this.elementShape,n[0].shape,`TensorArray shape mismatch: tensor array shape (${this.elementShape}) vs first tensor shape (${n[0].shape})`),se(n,0)}scatter(e,t){if(t.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${t.dtype}`);if(e.length!==t.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${e.length} vs. ${t.shape[0]}`);const n=Math.max(...e);if(!this.dynamicSize&&n>=this.maxSize)throw new Error(`Max index must be < array size (${n}  vs. ${this.maxSize})`);this.writeMany(e,re(t,0))}split(e,t){if(t.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${t.dtype}`);let n=0;const r=e.map(u=>(n+=u,n));if(n!==t.shape[0])throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${n}, and tensor's shape is: ${t.shape}`);if(!this.dynamicSize&&e.length!==this.maxSize)throw new Error(`TensorArray's size is not equal to the size of lengths (${this.maxSize} vs. ${e.length}), and the TensorArray is not marked as dynamically resizeable`);const s=n===0?0:t.size/n,p=[];$(()=>{t=T(t,[1,n,s]);for(let u=0;u<e.length;++u){const l=[0,u===0?0:r[u-1],0],c=[1,e[u],s];p[u]=T(q(t,l,c),this.elementShape)}return p});const i=[];for(let u=0;u<e.length;u++)i[u]=u;this.writeMany(i,p)}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class J{get id(){return this.idTensor.id}constructor(e,t,n,r=-1){this.tensors=e,this.elementShape=t,this.elementDtype=n,e!=null&&e.forEach(s=>{if(n!==s.dtype)throw new Error(`Invalid data types; op elements ${n}, but list elements ${s.dtype}`);L(t,s.shape,"TensorList shape mismatch: "),P(s)}),this.idTensor=F(0),this.maxNumElements=r,P(this.idTensor)}copy(){return new J([...this.tensors],this.elementShape,this.elementDtype)}clearAndClose(e){this.tensors.forEach(t=>{(e==null||!e.has(t.id))&&t.dispose()}),this.tensors.length=0,this.idTensor.dispose()}size(){return this.tensors.length}stack(e,t,n=-1){if(t!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);if(n!==-1&&this.tensors.length!==n)throw new Error(`Operation expected a list with ${n} elements but got a list with ${this.tensors.length} elements.`);L(e,this.elementShape,"TensorList shape mismatch: ");const r=ce(this.elementShape,this.tensors,e);return $(()=>{const s=this.tensors.map(p=>T(p,r));return ne(s,0)})}popBack(e,t){if(t!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);if(this.size()===0)throw new Error("Trying to pop from an empty list.");const n=ce(this.elementShape,this.tensors,e),r=this.tensors.pop();return r.kept=!1,L(r.shape,e,"TensorList shape mismatch: "),T(r,n)}pushBack(e){if(e.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${e.dtype}, but list elements ${this.elementDtype}`);if(L(e.shape,this.elementShape,"TensorList shape mismatch: "),this.maxNumElements===this.size())throw new Error("Trying to push element into a full list.");P(e),this.tensors.push(e)}resize(e){if(e<0)throw new Error(`TensorListResize expects size to be non-negative. Got: ${e}`);if(this.maxNumElements!==-1&&e>this.maxNumElements)throw new Error(`TensorListResize input size ${e} is greater maxNumElement ${this.maxNumElements}.`);const t=new J([],this.elementShape,this.elementDtype,this.maxNumElements);t.tensors.length=e;for(let n=0;n<Math.min(this.tensors.length,e);++n)t.tensors[n]=this.tensors[n];return t}getItem(e,t,n){if(n!==this.elementDtype)throw new Error(`Invalid data types; op elements ${n}, but list elements ${this.elementDtype}`);if(e<0||e>this.tensors.length)throw new Error(`Trying to access element ${e} in a list with ${this.tensors.length} elements.`);if(this.tensors[e]==null)throw new Error(`element at index ${e} is null.`);L(this.tensors[e].shape,t,"TensorList shape mismatch: ");const r=ce(this.elementShape,this.tensors,t);return T(this.tensors[e],r)}setItem(e,t){if(t.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t.dtype}, but list elements ${this.elementDtype}`);if(e<0||this.maxNumElements!==-1&&e>=this.maxNumElements)throw new Error(`Trying to set element ${e} in a list with max ${this.maxNumElements} elements.`);L(this.elementShape,t.shape,"TensorList shape mismatch: "),P(t),this.tensors[e]!=null&&(this.tensors[e].kept=!1),this.tensors[e]=t}gather(e,t,n){if(t!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);L(this.elementShape,n,"TensorList shape mismatch: "),e=e.slice(0,this.size());const r=ce(this.elementShape,this.tensors,n);return e.length===0?H([],[0].concat(r)):$(()=>{const s=e.map(p=>T(this.tensors[p],r));return ne(s,0)})}concat(e,t){if(e&&e!==this.elementDtype)throw new Error(`TensorList dtype is ${this.elementDtype} but concat requested dtype ${e}`);L(this.elementShape,t,"TensorList shape mismatch: ");const n=ce(this.elementShape,this.tensors,t);return this.size()===0?H([],[0].concat(n)):$(()=>{const r=this.tensors.map(s=>T(s,n));return se(r,0)})}}function Xg(a,e,t){const n=a.dtype;if(a.shape.length<1)throw new Error(`Tensor must be at least a vector, but saw shape: ${a.shape}`);if(a.dtype!==t)throw new Error(`Invalid data types; op elements ${a.dtype}, but list elements ${t}`);const r=a.shape.slice(1);L(r,e,"TensorList shape mismatch: ");const s=re(a);return new J(s,e,n)}function Zg(a,e,t,n){return new J([],a,e,n)}function Yg(a,e,t,n){if(e.length!==a.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${e.length} vs. ${a.shape[0]}`);const r=Math.max(...e);if(n!=null&&n!==-1&&r>=n)throw new Error(`Max index must be < array size (${r}  vs. ${n})`);const s=new J([],t,a.dtype,n),p=re(a,0);return e.forEach((i,u)=>{s.setItem(i,p[u])}),s}function eb(a,e,t){let n=0;const r=e.map(c=>(n+=c,n));if(n!==a.shape[0])throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${n}, and tensor's shape is: ${a.shape}`);const s=a.shape.slice(1),p=Tt(s,t),i=n===0?0:a.size/n,u=$(()=>{const c=[];a=T(a,[1,n,i]);for(let m=0;m<e.length;++m){const d=[0,m===0?0:r[m-1],0],h=[1,e[m],i];c[m]=T(q(a,d,h),p)}return a.dispose(),c}),l=new J([],t,a.dtype,e.length);for(let c=0;c<u.length;c++)l.setItem(c,u[c]);return l}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const tb=async(a,e,t)=>{switch(a.op){case"If":case"StatelessIf":{const n=o("thenBranch",a,e,t),r=o("elseBranch",a,e,t),s=o("cond",a,e,t),p=o("args",a,e,t);return(await s.data())[0]?t.functionMap[n].executeFunctionAsync(p,t.tensorArrayMap,t.tensorListMap):t.functionMap[r].executeFunctionAsync(p,t.tensorArrayMap,t.tensorListMap)}case"While":case"StatelessWhile":{const n=o("body",a,e,t),r=o("cond",a,e,t),s=o("args",a,e,t),p=await t.functionMap[r].executeFunctionAsync(s,t.tensorArrayMap,t.tensorListMap),i=s.map(c=>c.id);let u=await p[0].data();p.forEach(c=>{!c.kept&&i.indexOf(c.id)===-1&&c.dispose()});let l=s;for(;u[0];){const c=l;l=await t.functionMap[n].executeFunctionAsync(l,t.tensorArrayMap,t.tensorListMap);const m=l.map(h=>h.id);c.forEach(h=>{!h.kept&&i.indexOf(h.id)===-1&&m.indexOf(h.id)===-1&&h.dispose()});const d=await t.functionMap[r].executeFunctionAsync(l,t.tensorArrayMap,t.tensorListMap);u=await d[0].data(),d.forEach(h=>{!h.kept&&i.indexOf(h.id)===-1&&m.indexOf(h.id)===-1&&h.dispose()})}return l}case"LoopCond":{const n=o("pred",a,e,t);return[W(n)]}case"Switch":{const n=o("pred",a,e,t);let r=o("data",a,e,t);return r.kept||(r=W(r)),(await n.data())[0]?[void 0,r]:[r,void 0]}case"Merge":{const n=a.inputNames.find(r=>E(r,e,t)!==void 0);if(n){const r=E(n,e,t);return[W(r)]}return}case"Enter":{const n=o("frameName",a,e,t),r=o("tensor",a,e,t);return t.enterFrame(n),[W(r)]}case"Exit":{const n=o("tensor",a,e,t);return t.exitFrame(),[W(n)]}case"NextIteration":{const n=o("tensor",a,e,t);return t.nextIteration(),[W(n)]}case"TensorArrayV3":{const n=o("size",a,e,t),r=o("dtype",a,e,t),s=o("elementShape",a,e,t),p=o("dynamicSize",a,e,t),i=o("clearAfterRead",a,e,t),u=o("identicalElementShapes",a,e,t),l=o("name",a,e,t),c=new Qg(l,r,n,s,u,p,i);return t.addTensorArray(c),[c.idTensor,F(1)]}case"TensorArrayWriteV3":{const n=o("tensorArrayId",a,e,t),r=o("index",a,e,t),s=o("tensor",a,e,t),p=t.getTensorArray(n.id);return p.write(r,s),[p.idTensor]}case"TensorArrayReadV3":{const n=o("tensorArrayId",a,e,t),r=o("index",a,e,t);return[t.getTensorArray(n.id).read(r)]}case"TensorArrayGatherV3":{const n=o("tensorArrayId",a,e,t),r=o("indices",a,e,t),s=o("dtype",a,e,t);return[t.getTensorArray(n.id).gather(r,s)]}case"TensorArrayScatterV3":{const n=o("tensorArrayId",a,e,t),r=o("indices",a,e,t),s=o("tensor",a,e,t),p=t.getTensorArray(n.id);return p.scatter(r,s),[p.idTensor]}case"TensorArrayConcatV3":{const n=o("tensorArrayId",a,e,t),r=t.getTensorArray(n.id),s=o("dtype",a,e,t);return[r.concat(s)]}case"TensorArraySplitV3":{const n=o("tensorArrayId",a,e,t),r=o("tensor",a,e,t),s=o("lengths",a,e,t),p=t.getTensorArray(n.id);return p.split(s,r),[p.idTensor]}case"TensorArraySizeV3":{const n=o("tensorArrayId",a,e,t),r=t.getTensorArray(n.id);return[F(r.size(),"int32")]}case"TensorArrayCloseV3":{const n=o("tensorArrayId",a,e,t),r=t.getTensorArray(n.id);return r.clearAndClose(),[r.idTensor]}case"TensorListSetItem":{const n=o("tensorListId",a,e,t),r=o("index",a,e,t),s=o("tensor",a,e,t),p=t.getTensorList(n.id);return p.setItem(r,s),[p.idTensor]}case"TensorListGetItem":{const n=o("tensorListId",a,e,t),r=o("index",a,e,t),s=o("elementShape",a,e,t),p=o("elementDType",a,e,t);return[t.getTensorList(n.id).getItem(r,s,p)]}case"TensorListScatterV2":case"TensorListScatter":{const n=o("indices",a,e,t),r=o("tensor",a,e,t),s=o("elementShape",a,e,t),p=o("numElements",a,e,t),i=Yg(r,n,s,p);return t.addTensorList(i),[i.idTensor]}case"TensorListReserve":case"EmptyTensorList":{const n=o("elementShape",a,e,t),r=o("elementDType",a,e,t);let s;a.op==="TensorListReserve"?s="numElements":s="maxNumElements";const p=o(s,a,e,t),i=a.op==="TensorListReserve"?-1:p,u=Zg(n,r,p,i);return t.addTensorList(u),[u.idTensor]}case"TensorListGather":{const n=o("tensorListId",a,e,t),r=o("indices",a,e,t),s=o("elementShape",a,e,t),p=o("elementDType",a,e,t);return[t.getTensorList(n.id).gather(r,p,s)]}case"TensorListStack":{const n=o("tensorListId",a,e,t),r=o("elementShape",a,e,t),s=o("elementDType",a,e,t),p=o("numElements",a,e,t);return[t.getTensorList(n.id).stack(r,s,p)]}case"TensorListFromTensor":{const n=o("tensor",a,e,t),r=o("elementShape",a,e,t),s=o("elementDType",a,e,t),p=Xg(n,r,s);return t.addTensorList(p),[p.idTensor]}case"TensorListConcat":case"TensorListConcatV2":{const n=o("tensorListId",a,e,t),r=t.getTensorList(n.id),s=o("dtype",a,e,t),p=o("elementShape",a,e,t);return[r.concat(s,p)]}case"TensorListPushBack":{const n=o("tensorListId",a,e,t),r=o("tensor",a,e,t),s=t.getTensorList(n.id);return s.pushBack(r),[s.idTensor]}case"TensorListPopBack":{const n=o("tensorListId",a,e,t),r=o("elementShape",a,e,t),s=o("elementDType",a,e,t);return[t.getTensorList(n.id).popBack(r,s)]}case"TensorListSplit":{const n=o("tensor",a,e,t),r=o("elementShape",a,e,t),s=o("lengths",a,e,t),p=eb(n,s,r);return t.addTensorList(p),[p.idTensor]}case"TensorListLength":{const n=o("tensorListId",a,e,t),r=t.getTensorList(n.id);return[F(r.size(),"int32")]}case"TensorListResize":{const n=o("tensorListId",a,e,t),r=o("size",a,e,t),s=t.getTensorList(n.id).resize(r);return t.addTensorList(s),[s.idTensor]}default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function eo(a,e,t){const[n,r]=o("fusedOps",a,e,t),s=n==="biasadd",p=!s,i=r==="prelu",u=n==="fusedbatchnorm",l=o("numArgs",a,e,t);if(s){if(i&&l!==2)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!i&&s&&l!==1)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd must have one extra argument: bias.")}if(u)throw new Error("FusedConv2d and DepthwiseConv2d with FusedBatchNorm is not supported");const c=o("strides",a,e,t),m=Ae(a,e,t),d=o("dataFormat",a,e,t).toUpperCase(),h=o("dilations",a,e,t);let[N,f]=o("args",a,e,t);p&&(f=N,N=void 0);const y=o("leakyreluAlpha",a,e,t);return{stride:c,pad:m,dataFormat:d,dilations:h,biasArg:N,preluArg:f,activationFunc:r,leakyreluAlpha:y}}const ab=(a,e,t,n=M)=>{switch(a.op){case"Conv1D":{const r=o("stride",a,e,t),s=o("pad",a,e,t),p=o("dataFormat",a,e,t).toUpperCase(),i=o("dilation",a,e,t);return[n.conv1d(o("x",a,e,t),o("filter",a,e,t),r,s,p,i)]}case"Conv2D":{const r=o("strides",a,e,t),s=Ae(a,e,t),p=o("dataFormat",a,e,t).toUpperCase(),i=o("dilations",a,e,t);return[n.conv2d(o("x",a,e,t),o("filter",a,e,t),[r[1],r[2]],s,p,[i[1],i[2]])]}case"_FusedConv2D":{const{stride:r,pad:s,dataFormat:p,dilations:i,biasArg:u,preluArg:l,activationFunc:c,leakyreluAlpha:m}=eo(a,e,t);return[n.fused.conv2d({x:o("x",a,e,t),filter:o("filter",a,e,t),strides:[r[1],r[2]],pad:s,dataFormat:p,dilations:[i[1],i[2]],bias:u,activation:c,preluActivationWeights:l,leakyreluAlpha:m})]}case"FusedDepthwiseConv2dNative":{const{stride:r,pad:s,dataFormat:p,dilations:i,biasArg:u,preluArg:l,activationFunc:c,leakyreluAlpha:m}=eo(a,e,t);return[n.fused.depthwiseConv2d({x:o("x",a,e,t),filter:o("filter",a,e,t),strides:[r[1],r[2]],pad:s,dataFormat:p,dilations:[i[1],i[2]],bias:u,activation:c,preluActivationWeights:l,leakyreluAlpha:m})]}case"Conv2DBackpropInput":case"Conv2dTranspose":{const r=o("outputShape",a,e,t),s=o("strides",a,e,t),p=Ae(a,e,t);return[n.conv2dTranspose(o("x",a,e,t),o("filter",a,e,t),r,[s[1],s[2]],p)]}case"DepthwiseConv2dNative":case"DepthwiseConv2d":{const r=o("strides",a,e,t),s=Ae(a,e,t),p=o("dilations",a,e,t),i=o("dataFormat",a,e,t).toUpperCase();return[n.depthwiseConv2d(o("input",a,e,t),o("filter",a,e,t),[r[1],r[2]],s,i,[p[1],p[2]])]}case"Conv3D":{const r=o("strides",a,e,t),s=o("pad",a,e,t),p=o("dataFormat",a,e,t).toUpperCase(),i=o("dilations",a,e,t);return[n.conv3d(o("x",a,e,t),o("filter",a,e,t),[r[1],r[2],r[3]],s,p,[i[1],i[2],i[3]])]}case"AvgPool":{const r=o("strides",a,e,t),s=o("pad",a,e,t),p=o("kernelSize",a,e,t);return[n.avgPool(o("x",a,e,t),[p[1],p[2]],[r[1],r[2]],s)]}case"MaxPool":{const r=o("strides",a,e,t),s=o("pad",a,e,t),p=o("kernelSize",a,e,t);return[n.maxPool(o("x",a,e,t),[p[1],p[2]],[r[1],r[2]],s)]}case"MaxPoolWithArgmax":{const r=o("strides",a,e,t),s=o("pad",a,e,t),p=o("kernelSize",a,e,t),i=o("includeBatchInIndex",a,e,t),{result:u,indexes:l}=n.maxPoolWithArgmax(o("x",a,e,t),[p[1],p[2]],[r[1],r[2]],s,i);return[u,l]}case"AvgPool3D":{const r=o("strides",a,e,t),s=o("pad",a,e,t),p=o("kernelSize",a,e,t);return[n.avgPool3d(o("x",a,e,t),[p[1],p[2],p[3]],[r[1],r[2],r[3]],s)]}case"MaxPool3D":{const r=o("strides",a,e,t),s=o("pad",a,e,t),p=o("kernelSize",a,e,t);return[n.maxPool3d(o("x",a,e,t),[p[1],p[2],p[3]],[r[1],r[2],r[3]],s)]}case"Dilation2D":{const r=o("strides",a,e,t),s=o("pad",a,e,t),p=o("dilations",a,e,t),i=r[1],u=r[2],l=p[1],c=p[2];return[n.dilation2d(o("x",a,e,t),o("filter",a,e,t),[i,u],s,[l,c],"NHWC")]}default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const nb=(a,e,t,n=M)=>{switch(a.op){case"Fill":{const r=o("shape",a,e,t),s=o("dtype",a,e,t),p=o("value",a,e,t);return[n.fill(r,p,s)]}case"LinSpace":{const r=o("start",a,e,t),s=o("stop",a,e,t),p=o("num",a,e,t);return[n.linspace(r,s,p)]}case"Multinomial":{const r=o("logits",a,e,t),s=o("numSamples",a,e,t),p=o("seed",a,e,t);return[n.multinomial(r,s,p)]}case"OneHot":{const r=o("indices",a,e,t),s=o("depth",a,e,t),p=o("onValue",a,e,t),i=o("offValue",a,e,t),u=o("dtype",a,e,t);return[n.oneHot(r,s,p,i,u)]}case"Ones":return[n.ones(o("shape",a,e,t),o("dtype",a,e,t))];case"OnesLike":return[n.onesLike(o("x",a,e,t))];case"RandomStandardNormal":return[n.randomStandardNormal(o("shape",a,e,t),o("dtype",a,e,t),o("seed",a,e,t))];case"RandomUniform":return[n.randomUniform(o("shape",a,e,t),o("minval",a,e,t),o("maxval",a,e,t),o("dtype",a,e,t))];case"RandomUniformInt":return[n.randomUniformInt(o("shape",a,e,t),o("minval",a,e,t),o("maxval",a,e,t),o("seed",a,e,t))];case"Range":{const r=o("start",a,e,t),s=o("stop",a,e,t),p=o("step",a,e,t);return[n.range(r,s,p,o("dtype",a,e,t))]}case"TruncatedNormal":{const r=o("shape",a,e,t),s=o("mean",a,e,t),p=o("stdDev",a,e,t),i=o("seed",a,e,t);return[n.truncatedNormal(r,s,p,o("dtype",a,e,t),i)]}case"Zeros":return[n.zeros(o("shape",a,e,t),o("dtype",a,e,t))];case"ZerosLike":return[n.zerosLike(o("x",a,e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function vt(a,e,t){const n=o("boxes",a,e,t),r=o("scores",a,e,t),s=o("maxOutputSize",a,e,t),p=o("iouThreshold",a,e,t),i=o("scoreThreshold",a,e,t),u=o("softNmsSigma",a,e,t);return{boxes:n,scores:r,maxOutputSize:s,iouThreshold:p,scoreThreshold:i,softNmsSigma:u}}const rb=async(a,e,t,n,r=M)=>{switch(a.op){case"NonMaxSuppressionV5":{const{boxes:s,scores:p,maxOutputSize:i,iouThreshold:u,scoreThreshold:l,softNmsSigma:c}=vt(a,e,t),m=await r.image.nonMaxSuppressionWithScoreAsync(s,p,i,u,l,c);return[m.selectedIndices,m.selectedScores]}case"NonMaxSuppressionV4":{const{boxes:s,scores:p,maxOutputSize:i,iouThreshold:u,scoreThreshold:l}=vt(a,e,t),c=o("padToMaxOutputSize",a,e,t),m=await r.image.nonMaxSuppressionPaddedAsync(s,p,i,u,l,c);return[m.selectedIndices,m.validOutputs]}case"NonMaxSuppressionV3":case"NonMaxSuppressionV2":{const{boxes:s,scores:p,maxOutputSize:i,iouThreshold:u,scoreThreshold:l}=vt(a,e,t);return[await r.image.nonMaxSuppressionAsync(s,p,i,u,l)]}case"Where":{const s=r.cast(o("condition",a,e,t),"bool"),p=[await r.whereAsync(s)];return s.dispose(),p}case"ListDiff":return r.setdiff1dAsync(o("x",a,e,t),o("y",a,e,t));default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const sb=(a,e,t,n=M)=>{switch(a.op){case"LowerBound":{const r=o("sortedSequence",a,e,t),s=o("values",a,e,t);return[n.lowerBound(r,s)]}case"TopKV2":{const r=o("x",a,e,t),s=o("k",a,e,t),p=o("sorted",a,e,t),i=n.topk(r,s,p);return[i.values,i.indices]}case"UpperBound":{const r=o("sortedSequence",a,e,t),s=o("values",a,e,t);return[n.upperBound(r,s)]}case"Unique":{const r=o("x",a,e,t),s=n.unique(r);return[s.values,s.indices]}case"UniqueV2":{const r=o("x",a,e,t),s=o("axis",a,e,t),p=n.unique(r,s);return[p.values,p.indices]}default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ob=(a,e,t,n=M)=>{switch(a.op){case"Const":return e[a.name];case"PlaceholderWithDefault":const r=o("default",a,e,t);return[E(a.name,e,t)||r];case"Placeholder":return[E(a.name,e,t)];case"Identity":case"StopGradient":case"FakeQuantWithMinMaxVars":{const c=o("x",a,e,t);return[W(c)]}case"IdentityN":return o("x",a,e,t).map(c=>W(c));case"Snapshot":const s=o("x",a,e,t);return[W(s)];case"Shape":return[n.tensor1d(o("x",a,e,t).shape,"int32")];case"ShapeN":return o("x",a,e,t).map(c=>n.tensor1d(c.shape));case"Size":return[n.scalar(o("x",a,e,t).size,"int32")];case"Rank":return[n.scalar(o("x",a,e,t).rank,"int32")];case"NoOp":return[n.scalar(1)];case"Print":const p=o("x",a,e,t),i=o("data",a,e,t),u=o("message",a,e,t),l=o("summarize",a,e,t);console.warn("The graph has a tf.print() operation,usually used for debugging, which slows down performance."),console.log(u);for(let c=0;c<i.length;c++)console.log(Array.prototype.slice.call(i[c].dataSync()).slice(0,l));return[p];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ib{get id(){return this.handle.id}constructor(e,t){this.keyDType=e,this.valueDType=t,this.handle=F(0),this.tensorMap=new Map,P(this.handle)}clearAndClose(){this.tensorMap.forEach(e=>e.dispose()),this.tensorMap.clear(),this.handle.dispose()}size(){return this.tensorMap.size}tensorSize(){return F(this.size(),"int32")}async import(e,t){this.checkKeyAndValueTensor(e,t);const n=await e.data();return this.tensorMap.forEach(r=>r.dispose()),this.tensorMap.clear(),$(()=>{const r=re(t),s=n.length,p=r.length;w(s===p,()=>`The number of elements doesn't match, keys has ${s} elements, the values has ${p} elements.`);for(let i=0;i<s;i++){const u=n[i],l=r[i];P(l),this.tensorMap.set(u,l)}return this.handle})}async find(e,t){this.checkKeyAndValueTensor(e,t);const n=await e.data();return $(()=>{const r=[];for(let s=0;s<n.length;s++){const p=n[s],i=this.findWithDefault(p,t);r.push(i)}return ne(r)})}findWithDefault(e,t){const n=this.tensorMap.get(e);return n!=null?n:t}checkKeyAndValueTensor(e,t){if(e.dtype!==this.keyDType)throw new Error(`Expect key dtype ${this.keyDType}, but got ${e.dtype}`);if(t.dtype!==this.valueDType)throw new Error(`Expect value dtype ${this.valueDType}, but got ${t.dtype}`)}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const pb=async(a,e,t,n)=>{switch(a.op){case"HashTable":case"HashTableV2":{const r=n.getHashTableHandleByName(a.name);if(r!=null)return[r];{const s=o("keyDType",a,e,t),p=o("valueDType",a,e,t),i=new ib(s,p);return n.addHashTable(a.name,i),[i.handle]}}case"InitializeTable":case"InitializeTableV2":case"LookupTableImport":case"LookupTableImportV2":{const r=o("tableHandle",a,e,t,n),s=o("keys",a,e,t),p=o("values",a,e,t);return[await n.getHashTableById(r.id).import(s,p)]}case"LookupTableFind":case"LookupTableFindV2":{const r=o("tableHandle",a,e,t,n),s=o("keys",a,e,t),p=o("defaultValue",a,e,t);return[await n.getHashTableById(r.id).find(s,p)]}case"LookupTableSize":case"LookupTableSizeV2":{const r=o("tableHandle",a,e,t,n);return[n.getHashTableById(r.id).tensorSize()]}default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ub=(a,e,t,n=M)=>{switch(a.op){case"ResizeBilinear":{const r=o("images",a,e,t),s=o("size",a,e,t),p=o("alignCorners",a,e,t),i=o("halfPixelCenters",a,e,t);return[n.image.resizeBilinear(r,[s[0],s[1]],p,i)]}case"ResizeNearestNeighbor":{const r=o("images",a,e,t),s=o("size",a,e,t),p=o("alignCorners",a,e,t),i=o("halfPixelCenters",a,e,t);return[n.image.resizeNearestNeighbor(r,[s[0],s[1]],p,i)]}case"CropAndResize":{const r=o("image",a,e,t),s=o("boxes",a,e,t),p=o("boxInd",a,e,t),i=o("cropSize",a,e,t),u=o("method",a,e,t),l=o("extrapolationValue",a,e,t);return[n.image.cropAndResize(r,s,p,i,u,l)]}case"ImageProjectiveTransformV3":{const r=o("images",a,e,t),s=o("transforms",a,e,t),p=o("outputShape",a,e,t),i=o("fillValue",a,e,t),u=o("interpolation",a,e,t),l=o("fillMode",a,e,t);return[n.image.transform(r,s,u.toLowerCase(),l.toLowerCase(),i,p)]}default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const lb=(a,e,t,n=M)=>{switch(a.op){case"Equal":return[n.equal(o("a",a,e,t),o("b",a,e,t))];case"NotEqual":return[n.notEqual(o("a",a,e,t),o("b",a,e,t))];case"Greater":return[n.greater(o("a",a,e,t),o("b",a,e,t))];case"GreaterEqual":return[n.greaterEqual(o("a",a,e,t),o("b",a,e,t))];case"Less":return[n.less(o("a",a,e,t),o("b",a,e,t))];case"LessEqual":return[n.lessEqual(o("a",a,e,t),o("b",a,e,t))];case"LogicalAnd":return[n.logicalAnd(o("a",a,e,t),o("b",a,e,t))];case"LogicalNot":return[n.logicalNot(o("a",a,e,t))];case"LogicalOr":return[n.logicalOr(o("a",a,e,t),o("b",a,e,t))];case"Select":case"SelectV2":return[n.where(o("condition",a,e,t),o("a",a,e,t),o("b",a,e,t))];case"BitwiseAnd":return[n.bitwiseAnd(o("a",a,e,t),o("b",a,e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const cb=(a,e,t,n=M)=>{switch(a.op){case"BatchMatMul":case"BatchMatMulV2":case"MatMul":return[n.matMul(o("a",a,e,t),o("b",a,e,t),o("transposeA",a,e,t),o("transposeB",a,e,t))];case"Einsum":return[n.einsum(o("equation",a,e,t),...o("tensors",a,e,t))];case"Transpose":return[n.transpose(o("x",a,e,t),o("perm",a,e,t))];case"_FusedMatMul":const[r,s]=o("fusedOps",a,e,t),p=r==="biasadd",i=s==="prelu",u=o("numArgs",a,e,t),l=o("leakyreluAlpha",a,e,t);if(p){if(i&&u!==2)throw new Error("Fused MatMul with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!i&&u!==1)throw new Error("Fused MatMul with BiasAdd must have one extra argument: bias.")}const[c,m]=o("args",a,e,t);return[n.fused.matMul({a:o("a",a,e,t),b:o("b",a,e,t),transposeA:o("transposeA",a,e,t),transposeB:o("transposeB",a,e,t),bias:c,activation:s,preluActivationWeights:m,leakyreluAlpha:l})];case"MatrixBandPart":return[n.linalg.bandPart(o("a",a,e,t),o("numLower",a,e,t),o("numUpper",a,e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const mb=(a,e,t,n=M)=>{switch(a.op){case"EuclideanNorm":return[n.euclideanNorm(o("x",a,e,t),o("axis",a,e,t),o("keepDims",a,e,t))];case"FusedBatchNorm":case"FusedBatchNormV2":return[n.batchNorm(o("x",a,e,t),o("mean",a,e,t),o("variance",a,e,t),o("offset",a,e,t),o("scale",a,e,t),o("epsilon",a,e,t))];case"FusedBatchNormV3":return[n.batchNorm(o("x",a,e,t),o("mean",a,e,t),o("variance",a,e,t),o("offset",a,e,t),o("scale",a,e,t),o("epsilon",a,e,t))];case"LRN":return[n.localResponseNormalization(o("x",a,e,t),o("radius",a,e,t),o("bias",a,e,t),o("alpha",a,e,t),o("beta",a,e,t))];case"Softmax":return[n.softmax(o("x",a,e,t))];case"LogSoftmax":return[n.logSoftmax(o("x",a,e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const db=(a,e,t,n=M)=>{switch(a.op){case"RaggedGather":{const{outputNestedSplits:r,outputDenseValues:s}=n.raggedGather(o("paramsNestedSplits",a,e,t),o("paramsDenseValues",a,e,t),o("indices",a,e,t),o("outputRaggedRank",a,e,t));return r.concat(s)}case"RaggedRange":{const{rtNestedSplits:r,rtDenseValues:s}=n.raggedRange(o("starts",a,e,t),o("limits",a,e,t),o("splits",a,e,t));return[r,s]}case"RaggedTensorToTensor":return[n.raggedTensorToTensor(o("shape",a,e,t),o("values",a,e,t),o("defaultValue",a,e,t),o("rowPartitionTensors",a,e,t),o("rowPartitionTypes",a,e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const hb=(a,e,t,n=M)=>{switch(a.op){case"Max":{const i=o("axis",a,e,t),u=o("keepDims",a,e,t);return[n.max(o("x",a,e,t),i,u)]}case"Mean":{const i=o("axis",a,e,t),u=o("keepDims",a,e,t);return[n.mean(o("x",a,e,t),i,u)]}case"Min":{const i=o("axis",a,e,t),u=o("keepDims",a,e,t);return[n.min(o("x",a,e,t),i,u)]}case"Sum":{const i=o("axis",a,e,t),u=o("keepDims",a,e,t);return[n.sum(o("x",a,e,t),i,u)]}case"All":{const i=o("axis",a,e,t),u=o("keepDims",a,e,t);return[n.all(o("x",a,e,t),i,u)]}case"Any":{const i=o("axis",a,e,t),u=o("keepDims",a,e,t);return[n.any(o("x",a,e,t),i,u)]}case"ArgMax":{const i=o("axis",a,e,t);return[n.argMax(o("x",a,e,t),i)]}case"ArgMin":{const i=o("axis",a,e,t);return[n.argMin(o("x",a,e,t),i)]}case"Prod":{const i=o("axis",a,e,t),u=o("keepDims",a,e,t);return[n.prod(o("x",a,e,t),i,u)]}case"Cumprod":{const i=o("axis",a,e,t),u=o("exclusive",a,e,t),l=o("reverse",a,e,t);return[n.cumprod(o("x",a,e,t),i,u,l)]}case"Cumsum":{const i=o("axis",a,e,t),u=o("exclusive",a,e,t),l=o("reverse",a,e,t);return[n.cumsum(o("x",a,e,t),i,u,l)]}case"Bincount":const r=o("x",a,e,t),s=o("weights",a,e,t),p=o("size",a,e,t);return[n.bincount(r,s,p)];case"DenseBincount":{const i=o("x",a,e,t),u=o("weights",a,e,t),l=o("size",a,e,t),c=o("binaryOutput",a,e,t);return[n.denseBincount(i,u,l,c)]}default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const yb=(a,e,t,n=M)=>{switch(a.op){case"ConcatV2":case"Concat":{const r=o("n",a,e,t),s=o("axis",a,e,t);let p=o("tensors",a,e,t);return p=p.slice(0,r),[n.concat(p,s)]}case"Gather":{const r=o("x",a,e,t),s=o("indices",a,e,t);return[n.gather(r,n.cast(s,"int32"),0)]}case"GatherV2":{const r=o("axis",a,e,t),s=o("batchDims",a,e,t),p=o("x",a,e,t),i=o("indices",a,e,t);return[n.gather(p,n.cast(i,"int32"),r,s)]}case"Reverse":{const r=o("dims",a,e,t),s=[];for(let i=0;i<r.length;i++)r[i]&&s.push(i);const p=o("x",a,e,t);return[n.reverse(p,s)]}case"ReverseV2":{const r=o("axis",a,e,t),s=o("x",a,e,t);return[n.reverse(s,r)]}case"Slice":{const r=o("begin",a,e,t),s=o("size",a,e,t);return[n.slice(o("x",a,e,t),r,s)]}case"StridedSlice":{const r=o("begin",a,e,t),s=o("end",a,e,t),p=o("strides",a,e,t),i=o("beginMask",a,e,t),u=o("endMask",a,e,t),l=o("ellipsisMask",a,e,t),c=o("newAxisMask",a,e,t),m=o("shrinkAxisMask",a,e,t),d=o("x",a,e,t);return[n.stridedSlice(d,r,s,p,i,u,l,c,m)]}case"Pack":return $(()=>{const r=o("axis",a,e,t),s=o("tensors",a,e,t),p=s[0].shape,i=n.squeeze(s[0]).shape,u=s.map(l=>{const c=Q(l.shape,p);if(!c&&!Q(n.squeeze(l).shape,i))throw new Error("the input tensors shape does not match");return c?l:n.reshape(l,p)});return[n.stack(u,r)]});case"Unpack":{const r=o("axis",a,e,t),s=o("tensor",a,e,t);return n.unstack(s,r)}case"Tile":{const r=o("reps",a,e,t);return[n.tile(o("x",a,e,t),r)]}case"Split":case"SplitV":{const r=o("axis",a,e,t),s=o("numOrSizeSplits",a,e,t),p=o("x",a,e,t);return n.split(p,s,r)}case"ScatterNd":{const r=o("indices",a,e,t),s=o("values",a,e,t),p=o("shape",a,e,t);return[n.scatterND(r,s,p)]}case"GatherNd":{const r=o("x",a,e,t),s=o("indices",a,e,t);return[n.gatherND(r,s)]}case"SparseToDense":{const r=o("sparseIndices",a,e,t),s=o("outputShape",a,e,t),p=o("sparseValues",a,e,t),i=o("defaultValue",a,e,t);return[n.sparseToDense(r,p,s,p.dtype===i.dtype?i:n.cast(i,p.dtype))]}case"TensorScatterUpdate":{const r=o("indices",a,e,t),s=o("values",a,e,t),p=o("tensor",a,e,t);return[n.tensorScatterUpdate(p,r,s)]}default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const fb=(a,e,t,n=M)=>{switch(a.op){case"SparseFillEmptyRows":{const{outputIndices:r,outputValues:s,emptyRowIndicator:p,reverseIndexMap:i}=n.sparse.sparseFillEmptyRows(o("indices",a,e,t),o("values",a,e,t),o("denseShape",a,e,t),o("defaultValue",a,e,t));return[r,s,p,i]}case"SparseReshape":{const{outputIndices:r,outputShape:s}=n.sparse.sparseReshape(o("inputIndices",a,e,t),o("inputShape",a,e,t),o("newShape",a,e,t));return[r,s]}case"SparseSegmentMean":return[n.sparse.sparseSegmentMean(o("data",a,e,t),o("indices",a,e,t),o("segmentIds",a,e,t))];case"SparseSegmentSum":return[n.sparse.sparseSegmentSum(o("data",a,e,t),o("indices",a,e,t),o("segmentIds",a,e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const gb=(a,e,t,n=M)=>{switch(a.op){case"FFT":return[n.fft(o("x",a,e,t))];case"IFFT":return[n.ifft(o("x",a,e,t))];case"RFFT":return[n.rfft(o("x",a,e,t))];case"IRFFT":return[n.irfft(o("x",a,e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const bb=(a,e,t,n=M)=>{switch(a.op){case"StaticRegexReplace":return[n.string.staticRegexReplace(o("input",a,e,t),o("pattern",a,e,t),o("rewrite",a,e,t),o("replaceGlobal",a,e,t))];case"StringNGrams":{const{nGrams:r,nGramsSplits:s}=n.string.stringNGrams(o("data",a,e,t),o("dataSplits",a,e,t),o("separator",a,e,t),o("nGramWidths",a,e,t),o("leftPad",a,e,t),o("rightPad",a,e,t),o("padWidth",a,e,t),o("preserveShortSequences",a,e,t));return[r,s]}case"StringSplit":{const{indices:r,values:s,shape:p}=n.string.stringSplit(o("input",a,e,t),o("delimiter",a,e,t),o("skipEmpty",a,e,t));return[r,s,p]}case"StringToHashBucketFast":return[n.string.stringToHashBucketFast(o("input",a,e,t),o("numBuckets",a,e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Nb=(a,e,t,n=M)=>{switch(a.op){case"Cast":return[n.cast(o("x",a,e,t),o("dtype",a,e,t))];case"ExpandDims":{const r=o("axis",a,e,t);return[n.expandDims(o("x",a,e,t),r)]}case"Squeeze":{const r=o("axis",a,e,t);return[n.squeeze(o("x",a,e,t),r)]}case"Reshape":return[n.reshape(o("x",a,e,t),o("shape",a,e,t))];case"EnsureShape":return[n.ensureShape(o("x",a,e,t),o("shape",a,e,t))];case"MirrorPad":return[n.mirrorPad(o("x",a,e,t),o("padding",a,e,t),o("mode",a,e,t))];case"PadV2":case"Pad":return[n.pad(o("x",a,e,t),o("padding",a,e,t),o("constantValue",a,e,t))];case"SpaceToBatchND":{const r=o("blockShape",a,e,t),s=o("paddings",a,e,t);return[n.spaceToBatchND(o("x",a,e,t),r,s)]}case"BatchToSpaceND":{const r=o("blockShape",a,e,t),s=o("crops",a,e,t);return[n.batchToSpaceND(o("x",a,e,t),r,s)]}case"DepthToSpace":{const r=o("blockSize",a,e,t),s=o("dataFormat",a,e,t).toUpperCase();return[n.depthToSpace(o("x",a,e,t),r,s)]}case"BroadcastTo":return[n.broadcastTo(o("x",a,e,t),o("shape",a,e,t))];case"BroadcastArgs":return[n.broadcastArgs(o("s0",a,e,t),o("s1",a,e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function to(a,e,t,n,r=$){const s=((p,i,u)=>{switch(p.category){case"arithmetic":return r(()=>Kg(p,i,u));case"basic_math":return r(()=>Jg(p,i,u));case"control":return tb(p,i,u);case"convolution":return r(()=>ab(p,i,u));case"creation":return r(()=>nb(p,i,u));case"dynamic":return rb(p,i,u);case"evaluation":return r(()=>sb(p,i,u));case"image":return r(()=>ub(p,i,u));case"graph":return r(()=>ob(p,i,u));case"logical":return r(()=>lb(p,i,u));case"matrices":return r(()=>cb(p,i,u));case"normalization":return r(()=>mb(p,i,u));case"ragged":return r(()=>db(p,i,u));case"reduction":return r(()=>hb(p,i,u));case"slice_join":return r(()=>yb(p,i,u));case"sparse":return r(()=>fb(p,i,u));case"spectral":return r(()=>gb(p,i,u));case"string":return r(()=>bb(p,i,u));case"transformation":return r(()=>Nb(p,i,u));case"hash_table":return pb(p,i,u,n);case"custom":const l=Gs(p.op);if(l&&l.customExecutor)return l.customExecutor(new Gg(p,i,u));throw TypeError(`Custom op ${p.op} is not registered.`);default:throw TypeError(`Unknown op '${p.op}'. File an issue at https://github.com/tensorflow/tfjs/issues so we can add it, or register a custom execution with tf.registerOp()`)}})(a,e,t);return we(s)?s.then(p=>[].concat(p)):[].concat(s)}class ao{constructor(e={},t={},n={},r={},s){this.weightMap=e,this.tensorArrayMap=t,this.tensorListMap=n,this.functionMap=r,this.parseNodeNameCache=s,this.rootContext={id:0,frameName:"",iterationId:0},this.contexts=[this.rootContext],this.lastId=0,this.generateCurrentContextIds()}newFrame(e,t){return{id:e,frameName:t,iterationId:0}}set currentContext(e){this.contexts!==e&&(this.contexts=e,this.generateCurrentContextIds())}get currentContext(){return this.contexts}get currentContextId(){return this._currentContextIds[0]}get currentContextIds(){return this._currentContextIds}generateCurrentContextIds(){const e=[];for(let t=0;t<this.contexts.length-1;t++){const n=this.contexts.slice(0,this.contexts.length-t);e.push(this.contextIdforContexts(n))}e.push(""),this._currentContextIds=e}contextIdforContexts(e){return e?e.map(t=>t.id===0&&t.iterationId===0?"":`${t.frameName}-${t.iterationId}`).join("/"):""}enterFrame(e){this.contexts&&(this.lastId++,this.contexts=this.contexts.slice(),this.contexts.push(this.newFrame(this.lastId,e)),this._currentContextIds.unshift(this.contextIdforContexts(this.contexts)))}exitFrame(){if(this.contexts&&this.contexts.length>1)this.contexts=this.contexts.slice(),this.contexts.splice(-1),this.currentContextIds.shift();else throw new Error("Cannot exit frame, the context is empty")}nextIteration(){if(this.contexts&&this.contexts.length>0){this.contexts=this.contexts.slice(),this.lastId++;const e=Object.assign({},this.contexts[this.contexts.length-1]);e.iterationId+=1,e.id=this.lastId,this.contexts.splice(-1,1,e),this._currentContextIds.splice(0,1,this.contextIdforContexts(this.contexts))}else throw new Error("Cannot increase frame iteration, the context is empty")}getWeight(e){return this.weightMap[e]}addTensorArray(e){this.tensorArrayMap[e.id]=e}getTensorArray(e){return this.tensorArrayMap[e]}addTensorList(e){this.tensorListMap[e.id]=e}getTensorList(e){return this.tensorListMap[e]}dispose(e){for(const t in this.tensorArrayMap)this.tensorArrayMap[t].clearAndClose(e);for(const t in this.tensorListMap)this.tensorListMap[t].clearAndClose(e)}}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function no(a,e,t,n){const r=new Set,s=[];let p=null,i=null;const u=new Set,l=new Set(Object.keys(a).map(d=>k(d)[0]));n=n||[];const c=new Set(n.map(d=>k(d.name)[0])),m=[...e];for(;m.length>0;){const d=m.pop();if((G(d)||Ab(d)||Eb(d))&&p==null&&(p=d,i=p.children.map(h=>h.name).filter(h=>r.has(h))),r.add(d.name),t[d.name]==null&&!l.has(d.name)&&!c.has(d.name)){if(d.inputs.length===0){s.push(d.name);continue}d.inputs.forEach(h=>{u.has(h.name)||(u.add(h.name),m.push(h))})}}return{inputs:a,outputs:e,usedNodes:r,missingInputs:s,dynamicNode:p,syncInputs:i}}function wb(a,e){const{usedNodes:t,inputs:n}=e,r=Object.keys(n).map(y=>k(y)[0]).map(y=>a.nodes[y]),s=a.initNodes||[],p=y=>t.has(typeof y=="string"?y:y.name);function i(y){return[...new Map(y.map(b=>[b.name,b])).values()]}const u=i([...r,...a.weights,...s]).filter(p),l=i([...u,...Object.values(a.nodes)]).filter(p),c=new Map(l.map(y=>[y.name,y])),m={};for(const y of l){m[y.name]=m[y.name]||0;for(const b of y.children)p(b)||(m[b.name]=Number.POSITIVE_INFINITY),m[b.name]=(m[b.name]||0)+1}const d=Object.entries(m).filter(([,y])=>y===0).map(([y])=>y),h=[...d];for(;d.length>0;){const y=d.pop(),b=c.get(y);for(const v of b.children.filter(p))--m[v.name]===0&&(h.push(v.name),d.push(v.name))}const N=h.map(y=>c.get(y)),f=xb(N,u);return Sb(f,u),f}function xb(a,e){const t=new Map(a.map(s=>[s.name,s])),n=e.map(s=>s.name),r=new Set(n);for(;n.length>0;){const s=n.pop(),p=t.get(s);for(const i of p.children)!t.has(i.name)||r.has(i.name)||(r.add(i.name),n.push(i.name))}return a.filter(s=>r.has(s.name))}class Ee extends Error{constructor(e){super(`NodesExecutionOrderError: ${e}`)}}function Sb(a,e){const t=new Map(a.map((i,u)=>[i.name,u])),n=new Set(e.map(i=>i.name)),r=i=>n.has(typeof i=="string"?i:i.name),s=new Set(a.map(i=>i.name)),p=i=>s.has(typeof i=="string"?i:i.name);for(const i of a){for(const u of i.children.filter(p)){if(!t.has(u.name))throw new Ee(`Child ${u.name} of node ${i.name} is unreachable.`);if(t.get(i.name)>t.get(u.name))throw new Ee(`Node ${i.name} is scheduled to run after its child ${u.name}.`)}if(!r(i))for(const u of i.inputs){if(!t.has(u.name))throw new Ee(`Input ${u.name} of node ${i.name} is unreachable.`);if(t.get(u.name)>t.get(i.name))throw new Ee(`Node ${i.name} is scheduled to run before its input ${u.name}.`)}}}function Tb(a){const e=new Map(a.map((i,u)=>[i.name,u])),t=Number.MAX_SAFE_INTEGER,n=a.map((i,u)=>G(i)?t:u),r=i=>{const u=n[e.get(i.name)];return u!=null?u:-1},s=a.map((i,u)=>i.children.map(r).reduce((l,c)=>Math.max(l,c),n[u])),p=new Map;for(let i=0;i<a.length;++i){const u=s[i];if(u===t)continue;const l=a[i],c=a[u];p.has(c.name)||p.set(c.name,[]),p.get(c.name).push(l)}return p}const vb=new Set(["Switch","Merge","Enter","Exit","NextIteration","StatelessIf","StatelessWhile","if","While"]),Ob=new Set(["NonMaxSuppressionV2","NonMaxSuppressionV3","NonMaxSuppressionV5","Where"]),_b=new Set(["HashTable","HashTableV2","LookupTableImport","LookupTableImportV2","LookupTableFind","LookupTableFindV2","LookupTableSize","LookupTableSizeV2"]);function G(a){return vb.has(a.op)}function Ab(a){return Ob.has(a.op)}function Eb(a){return _b.has(a.op)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Ie{get weightIds(){return this.parent?this.parent.weightIds:this._weightIds}get functionExecutorMap(){return this.parent?this.parent.functionExecutorMap:this._functionExecutorMap}get weightMap(){return this.parent?this.parent.weightMap:this._weightMap}set weightMap(e){const t=Object.keys(e).map(n=>e[n].map(r=>r.id));this._weightIds=[].concat(...t),this._weightMap=e}set resourceManager(e){this._resourceManager=e}get inputs(){return this._inputs.map(e=>({name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}))}get outputs(){return this._outputs.map(e=>({name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}))}get inputNodes(){return this._inputs.map(e=>e.signatureKey||e.name)}get outputNodes(){return this._outputs.map(e=>{const t=e.signatureKey||e.name;return e.defaultOutput?`${t}:${e.defaultOutput}`:t})}get functions(){return Object.keys(this._functions).reduce((e,t)=>(e[t]=this._functions[t].signature,e),{})}constructor(e,t){this.graph=e,this.parent=t,this.compiledMap=new Map,this.parseNodeNameCache=new Map,this._weightMap={},this.SEPARATOR=",",this._functions={},this._functionExecutorMap={},this.keepIntermediateTensors=!1,this._outputs=e.outputs,this._inputs=e.inputs,this._initNodes=e.initNodes,this._signature=e.signature,this._functions=e.functions,e.functions!=null&&Object.keys(e.functions).forEach(n=>{this._functionExecutorMap[n]=new Ie(e.functions[n],this)})}getCompilationKey(e,t){const n=e.map(s=>s.name).sort(),r=t.map(s=>s.name).sort();return n.join(this.SEPARATOR)+"--"+r.join(this.SEPARATOR)}compile(e,t){const n=no(e,t,this.weightMap,this._initNodes),{missingInputs:r,dynamicNode:s,syncInputs:p}=n;if(s!=null)throw new Error(`This execution contains the node '${s.name}', which has the dynamic op '${s.op}'. Please use model.executeAsync() instead. Alternatively, to avoid the dynamic ops, specify the inputs [${p}]`);if(r.length>0){const l=t.map(m=>m.name),c=Object.keys(e);throw new Error(`Cannot compute the outputs [${l}] from the provided inputs [${c}]. Missing the following inputs: [${r}]`)}const i=wb(this.graph,n),u=Tb(i);return{orderedNodes:i,nodeLiveUntilMap:u}}cloneAndKeepTensor(e){if(e==null)return null;const t=e.clone();return P(t),t}cloneTensorList(e){return e?e.map(t=>this.cloneAndKeepTensor(t)):null}cloneTensorMap(e){return Object.fromEntries(Object.entries(e).map(([t,n])=>[t,this.cloneTensorList(n)]))}execute(e,t){this.disposeIntermediateTensors(),e=this.mapInputs(e);const n=Object.keys(e).sort();this.checkInputs(e),this.checkInputShapeAndType(e),t=this.mapOutputs(t),this.checkOutputs(t);const r=n.map(d=>this.graph.nodes[k(d)[0]]),s=t.map(d=>k(d)[0]),p=new Set(s);let i=s.map(d=>this.graph.nodes[d]);i.length===0&&(i=this._outputs);const u=this.getCompilationKey(r,i);let l=this.compiledMap.get(u);l==null&&(l=this.compile(e,i),this.compiledMap.set(u,l));try{this.keepIntermediateTensors=z().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(d){this.keepIntermediateTensors=!1,console.warn(d.message)}const c={},m={};return $(()=>{const d=new ao(this.weightMap,c,m,this.functionExecutorMap,this.parseNodeNameCache),h=Object.assign({},this.weightMap);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap)),Object.keys(e).forEach(b=>{const[v,_]=k(b,d),x=[];x[_]=e[b],h[v]=x,this.keepIntermediateTensors&&(this.clonedTensorsMap[v]=this.cloneTensorList(x))});const N=this.getFrozenTensorIds(h),{orderedNodes:f,nodeLiveUntilMap:y}=l;for(const b of f){if(h[b.name])continue;const v=to(b,h,d,this._resourceManager);if(we(v))throw new Error(`The execution of the op '${b.op}' returned a promise. Please use model.executeAsync() instead.`);h[b.name]=v,this.keepIntermediateTensors&&(this.clonedTensorsMap[b.name]=this.cloneTensorList(v)),this.checkTensorForDisposalWithNodeLiveUntilInfo(b,h,d,N,p,y.get(b.name))}return this.parent==null&&d.dispose(N),t.map(b=>E(b,h,d))})}getFrozenTensorIds(e){const t=[].concat.apply([],Object.keys(e).map(n=>e[n]).map(n=>n.map(r=>r.id)));return new Set(t)}checkTensorForDisposal(e,t,n,r,s,p,i){if(!(G(t)||p.has(e))){for(const u of n[e])u!=null&&(i[u.id]=(i[u.id]||0)+t.children.length);for(const u of t.inputs){if(G(u))continue;const l=Ks(u.name,n,r);if(l!=null)for(const c of l){if(!c||c.kept||s.has(c.id))continue;const m=i[c.id];m===1?(c.dispose(),delete i[c.id]):m!=null&&i[c.id]--}}}}checkTensorForDisposalWithNodeLiveUntilInfo(e,t,n,r,s,p){function i(u){return G(u)||s.has(u.name)}if(!(G(e)||p==null))for(const u of p){if(i(u))continue;const l=Ks(u.name,t,n);for(const c of l)!c||c.kept||r.has(c.id)||c.dispose()}}async executeAsync(e,t){return this._executeAsync(e,t)}disposeIntermediateTensors(){this.clonedTensorsMap&&(Object.values(this.clonedTensorsMap).forEach(e=>{for(const t of e)t&&!t.isDisposed&&t.dispose()}),this.clonedTensorsMap=null)}getIntermediateTensors(){return this.clonedTensorsMap}async _executeAsync(e,t,n=!1,r={},s={}){this.disposeIntermediateTensors(),n||(e=this.mapInputs(e),this.checkInputs(e),this.checkInputShapeAndType(e),t=this.mapOutputs(t),this.checkOutputs(t));try{this.keepIntermediateTensors=z().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(d){this.keepIntermediateTensors=!1,console.warn(d.message)}const p=new ao(this.weightMap,r,s,this.functionExecutorMap,this.parseNodeNameCache);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap));const i=await this.executeWithControlFlow(e,p,t,n),u=t.map(d=>E(d,i,p)),l=u.map(d=>d.id),c=Object.keys(e).map(d=>e[d].id),m=new Set([...l,...c,...this.weightIds]);return Object.values(i).forEach(d=>{d.forEach(h=>{h&&!h.isDisposed&&!m.has(h.id)&&h.dispose()})}),this.parent==null&&p.dispose(m),u}async executeFunctionAsync(e,t,n){const r=e.reduce((s,p,i)=>(s[this.inputs[i].name]=p,s),{});return this._executeAsync(r,this.outputNodes,!0,t,n)}async executeWithControlFlow(e,t,n,r){const s=Object.keys(e),p=s.map(x=>this.graph.nodes[k(x)[0]]),i=n.map(x=>k(x)[0]),u=new Set(i);let l=i.map(x=>this.graph.nodes[x]);l.length===0&&(l=this._outputs);const{usedNodes:c,missingInputs:m,dynamicNode:d,syncInputs:h}=no(e,l,this.weightMap,this._initNodes),N=[...p,...this.graph.weights,...this._initNodes||[]].map(x=>({node:x,contexts:t.currentContext})),f=Object.assign({},this.weightMap);Object.keys(e).forEach(x=>{const[A,I]=k(x),C=[];C[I]=e[x],f[A]=C});const y={},b=this.getFrozenTensorIds(f),v={};for(;N.length>0;){const x=this.processStack(p,N,t,f,v,b,u,y,c);await Promise.all(x)}d==null&&!r&&console.warn("This model execution did not contain any nodes with control flow or dynamic output shapes. You can use model.execute() instead.");const _=l.filter(x=>!G(x)&&!E(x.name,f,t)).map(x=>x.name);if(_.length>0){let x="";throw d!=null&&(x=`Alternatively, to avoid the dynamic ops, use model.execute() and specify the inputs [${h}]`),new Error(`Cannot compute the outputs [${_}] from the provided inputs [${s}]. Consider providing the following inputs: [${m}]. ${x}`)}return f}processStack(e,t,n,r,s,p,i,u,l){const c=[];for(;t.length>0;){const m=t.pop();n.currentContext=m.contexts;let d="";if(m.node.op==="Enter"&&o("isConstant",m.node,r,n)&&([d]=j(m.node.name,n)),r[m.node.name]==null){const h=to(m.node,r,n,this._resourceManager);d||([d]=j(m.node.name,n));const N=n.currentContext;we(h)?c.push(h.then(f=>(r[d]=f,this.keepIntermediateTensors&&(this.clonedTensorsMap[d]=this.cloneTensorList(f)),n.currentContext=N,this.checkTensorForDisposal(d,m.node,r,n,p,i,u),this.processChildNodes(m.node,t,n,r,s,l),f))):(r[d]=h,this.keepIntermediateTensors&&(this.clonedTensorsMap[d]=this.cloneTensorList(h)),this.checkTensorForDisposal(d,m.node,r,n,p,i,u),this.processChildNodes(m.node,t,n,r,s,l))}else this.processChildNodes(m.node,t,n,r,s,l)}return c}processChildNodes(e,t,n,r,s,p){e.children.forEach(i=>{const[u]=j(i.name,n);s[u]||!p.has(i.name)||(i.op==="Merge"?i.inputNames.some(l=>!!E(l,r,n))&&(s[u]=!0,t.push({contexts:n.currentContext,node:i})):i.inputNames.every(l=>!!E(l,r,n))&&(s[u]=!0,t.push({contexts:n.currentContext,node:i})))})}dispose(){Object.keys(this.weightMap).forEach(e=>this.weightMap[e].forEach(t=>t.dispose()))}checkInputShapeAndType(e){Object.keys(e).forEach(t=>{const n=e[t],[r]=k(t),s=this.graph.nodes[r];if(s.attrParams.shape&&s.attrParams.shape.value){const p=s.attrParams.shape.value,i=p.length===n.shape.length&&n.shape.every((u,l)=>p[l]===-1||p[l]===u);w(i,()=>`The shape of dict['${s.name}'] provided in model.execute(dict) must be [${p}], but was [${n.shape}]`)}s.attrParams.dtype&&s.attrParams.dtype.value&&w(n.dtype===s.attrParams.dtype.value,()=>`The dtype of dict['${s.name}'] provided in model.execute(dict) must be ${s.attrParams.dtype.value}, but was ${n.dtype}`)})}mapInputs(e){var t,n;const r={};for(const s in e){const p=(n=(t=this._signature)===null||t===void 0?void 0:t.inputs)===null||n===void 0?void 0:n[s];p!=null?r[p.name]=e[s]:r[s]=e[s]}return r}checkInputs(e){const t=Object.keys(e).filter(n=>{const[r]=k(n);return this.graph.nodes[r]==null});if(t.length>0)throw new Error(`The dict provided in model.execute(dict) has keys: [${t}] that are not part of graph`)}mapOutputs(e){return e.map(t=>{var n,r;const s=(r=(n=this._signature)===null||n===void 0?void 0:n.outputs)===null||r===void 0?void 0:r[t];return s!=null?s.name:t},{})}checkOutputs(e){e.forEach(t=>{const[n]=k(t);if(!this.graph.nodes[n])throw new Error(`The output '${t}' is not found in the graph`)})}}class Mb{constructor(e={},t={}){this.hashTableNameToHandle=e,this.hashTableMap=t}addHashTable(e,t){this.hashTableNameToHandle[e]=t.handle,this.hashTableMap[t.id]=t}getHashTableHandleByName(e){return this.hashTableNameToHandle[e]}getHashTableById(e){return this.hashTableMap[e]}dispose(){for(const e in this.hashTableMap)this.hashTableMap[e].clearAndClose(),delete this.hashTableMap[e];for(const e in this.hashTableNameToHandle)this.hashTableNameToHandle[e].dispose(),delete this.hashTableNameToHandle[e]}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const kb="?tfjs-format=file",Ib="model.json";class Ot{get modelVersion(){return this.version}get inputNodes(){return this.executor.inputNodes}get outputNodes(){return this.executor.outputNodes}get inputs(){return this.executor.inputs}get outputs(){return this.executor.outputs}get weights(){return this.executor.weightMap}get metadata(){return this.artifacts.userDefinedMetadata}get modelSignature(){return this.signature}get modelStructuredOutputKeys(){return this.structuredOutputKeys}constructor(e,t={},n=it){this.modelUrl=e,this.loadOptions=t,this.version="n/a",this.io=n,t==null&&(this.loadOptions={}),this.resourceManager=new Mb}findIOHandler(){const e=this.modelUrl;if(e.load!=null)this.handler=e;else if(this.loadOptions.requestInit!=null)this.handler=this.io.browserHTTPRequest(e,this.loadOptions);else{const t=this.io.getLoadHandlers(e,this.loadOptions);if(t.length===0)t.push(this.io.browserHTTPRequest(e,this.loadOptions));else if(t.length>1)throw new Error(`Found more than one (${t.length}) load handlers for URL '${[e]}'`);this.handler=t[0]}}load(){if(this.findIOHandler(),this.handler.load==null)throw new Error("Cannot proceed with model loading because the IOHandler provided does not have the `load` method implemented.");const e=this.handler.load();return we(e)?e.then(t=>t.getWeightStream==null?this.loadSync(t):this.loadStreaming(t)):this.loadSync(e)}loadSync(e){const t=this.io.decodeWeights(e.weightData,e.weightSpecs);return this.loadWithWeightMap(e,t)}async loadStreaming(e){if(e.getWeightStream==null)throw new Error("Model artifacts missing streamWeights function");const t=await ra(e.getWeightStream(),e.weightSpecs);return this.loadWithWeightMap(e,t)}loadWithWeightMap(e,t){this.artifacts=e;const n=this.artifacts.modelTopology;let r=this.artifacts.signature;if(this.artifacts.userDefinedMetadata!=null){const s=this.artifacts.userDefinedMetadata;s.signature!=null&&(r=s.signature),s.structuredOutputKeys!=null&&(this.structuredOutputKeys=s.structuredOutputKeys)}if(this.signature=r,this.version=`${n.versions.producer}.${n.versions.minConsumer}`,this.executor=new Ie(Js.Instance.transformGraph(n,this.signature)),this.executor.weightMap=this.convertTensorMapToTensorsMap(t),this.executor.resourceManager=this.resourceManager,e.modelInitializer!=null&&e.modelInitializer.node!=null){const s=Js.Instance.transformGraph(e.modelInitializer);this.initializer=new Ie(s),this.initializer.weightMap=this.executor.weightMap,this.initializer.resourceManager=this.resourceManager,this.initializerSignature=e.initializerSignature}return!0}async save(e,t){if(typeof e=="string"){const n=this.io.getSaveHandlers(e);if(n.length===0)throw new Error(`Cannot find any save handlers for URL '${e}'`);if(n.length>1)throw new Error(`Found more than one (${n.length}) save handlers for URL '${e}'`);e=n[0]}if(e.save==null)throw new Error("GraphModel.save() cannot proceed because the IOHandler provided does not have the `save` attribute defined.");return e.save(this.artifacts)}addStructuredOutputNames(e){if(this.structuredOutputKeys){const t=e instanceof pe?[e]:e,n={};return t.forEach((r,s)=>n[this.structuredOutputKeys[s]]=r),n}return e}predict(e,t){const n=this.execute(e,this.outputNodes);return this.addStructuredOutputNames(n)}async predictAsync(e,t){const n=await this.executeAsync(e,this.outputNodes);return this.addStructuredOutputNames(n)}normalizeInputs(e){var t;if(!(e instanceof pe)&&!Array.isArray(e)){const s=(t=this.signature)===null||t===void 0?void 0:t.inputs;if(s!=null)for(const p in s){const i=s[p];i.resourceId!=null&&(e[p]=this.resourceIdToCapturedInput[i.resourceId])}return e}e=Array.isArray(e)?e:[e];const n=Object.keys(this.resourceIdToCapturedInput).length;if(e.length+n!==this.inputNodes.length)throw new Error(`Input tensor count mismatch, the graph model has ${this.inputNodes.length-n} non-resource placeholders, while there are ${e.length} input tensors provided.`);let r=0;return this.inputNodes.reduce((s,p)=>{var i,u,l;const c=(l=(u=(i=this.signature)===null||i===void 0?void 0:i.inputs)===null||u===void 0?void 0:u[p])===null||l===void 0?void 0:l.resourceId;return c!=null?s[p]=this.resourceIdToCapturedInput[c]:s[p]=e[r++],s},{})}normalizeOutputs(e){return e=e||this.outputNodes,Array.isArray(e)?e:[e]}executeInitializerGraph(){return this.initializer==null?[]:this.initializerSignature==null?this.initializer.execute({},[]):this.initializer.execute({},Object.keys(this.initializerSignature.outputs))}async executeInitializerGraphAsync(){return this.initializer==null?[]:this.initializerSignature==null?this.initializer.executeAsync({},[]):this.initializer.executeAsync({},Object.keys(this.initializerSignature.outputs))}setResourceIdToCapturedInput(e){if(this.resourceIdToCapturedInput={},this.initializerSignature){const t=this.initializerSignature.outputs,n=Object.keys(t);for(let r=0;r<n.length;r++){const s=n[r],p=t[s];this.resourceIdToCapturedInput[p.resourceId]=e[r]}}}execute(e,t){this.resourceIdToCapturedInput==null&&this.setResourceIdToCapturedInput(this.executeInitializerGraph()),e=this.normalizeInputs(e),t=this.normalizeOutputs(t);const n=this.executor.execute(e,t);return n.length>1?n:n[0]}async executeAsync(e,t){this.resourceIdToCapturedInput==null&&this.setResourceIdToCapturedInput(await this.executeInitializerGraphAsync()),e=this.normalizeInputs(e),t=this.normalizeOutputs(t);const n=await this.executor.executeAsync(e,t);return n.length>1?n:n[0]}getIntermediateTensors(){return this.executor.getIntermediateTensors()}disposeIntermediateTensors(){this.executor.disposeIntermediateTensors()}convertTensorMapToTensorsMap(e){return Object.keys(e).reduce((t,n)=>(t[n]=[e[n]],t),{})}dispose(){this.executor.dispose(),this.initializer&&(this.initializer.dispose(),this.resourceIdToCapturedInput&&jr(this.resourceIdToCapturedInput)),this.resourceManager.dispose()}}async function Cb(a,e={},t=it){if(a==null)throw new Error("modelUrl in loadGraphModel() cannot be null. Please provide a url or an IOHandler that loads the model");e==null&&(e={}),e.fromTFHub&&typeof a=="string"&&(a=zb(a));const n=new Ot(a,e,t);return await n.load(),n}function Db(a){if(a==null)throw new Error("modelUrl in loadGraphModelSync() cannot be null. Please provide model artifacts or an IOHandler that loads the model");let e;if(a instanceof Array){const[n,r]=a;if(!n)throw new Error("modelJSON must be the first element of the array");if(!r||!(r instanceof ArrayBuffer))throw new Error("An ArrayBuffer of weights must be the second element of the array");if(!("modelTopology"in n))throw new Error("Model JSON is missing 'modelTopology'");if(!("weightsManifest"in n))throw new Error("Model JSON is missing 'weightsManifest'");const s=oa(n.weightsManifest),p=sa(n,s,r);e=ve(p)}else if("load"in a)e=a;else if("modelTopology"in a&&"weightSpecs"in a&&"weightData"in a)e=ve(a);else throw new Error("Unknown model format");const t=new Ot(e);return t.load(),t}function zb(a){return a.endsWith("/")||(a=a+"/"),`${a}${Ib}${kb}`}/** @license See the LICENSE file. */const ro="4.16.0";/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class so extends tt{constructor(e){super(),this.input=e}async iterator(){return(await this.input.iterator()).decodeUTF8().split(`
`).map(e=>(e.endsWith("\r")&&(e=e.slice(0,-1)),e))}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */const Me='"',me=Symbol("out"),oo=Symbol("field"),ke=Symbol("quote"),_t=Symbol("quoteafterquote"),io=Symbol("quoteinquote");class po extends tt{async columnNames(){return this.columnNamesValidated||await this.setColumnNames(),this.configuredColumnsOnly?Object.keys(this.columnConfigs):this.fullColumnNames}async setColumnNames(){const e=await this.maybeReadHeaderLine();if(!this.fullColumnNames&&!e)throw new Error("Column names must be provided if there is no header line.");this.fullColumnNames&&e&&w(e.length===this.fullColumnNames.length,()=>"The length of provided columnNames ("+this.fullColumnNames.length.toString()+") does not match the length of the header line read from file ("+e.length.toString()+")."),this.fullColumnNames||(this.fullColumnNames=e);const t=this.fullColumnNames.reduce((r,s)=>(r[s]=r[s]+1||1,r),{}),n=Object.keys(t).filter(r=>t[r]>1);if(w(n.length===0,()=>"Duplicate column names found: "+n.toString()),this.columnConfigs){for(const r of Object.keys(this.columnConfigs))if(this.fullColumnNames.indexOf(r)===-1)throw new Error('The key "'+r+'" provided in columnConfigs does not match any of the column names ('+this.fullColumnNames.toString()+").")}this.columnNamesValidated=!0}async maybeReadHeaderLine(){if(this.hasHeader){const e=await(await this.base.iterator()).next();if(e.done)throw new Error("No data was found for CSV parsing.");const t=e.value;return this.parseRow(t,!1)}else return null}constructor(e,t){super(),this.input=e,this.hasHeader=!0,this.fullColumnNames=null,this.columnNamesValidated=!1,this.columnConfigs=null,this.configuredColumnsOnly=!1,this.delimiter=",",this.delimWhitespace=!1,this.base=new so(e),t||(t={}),this.hasHeader=t.hasHeader!==!1,this.fullColumnNames=t.columnNames,this.columnConfigs=t.columnConfigs,this.configuredColumnsOnly=t.configuredColumnsOnly,t.delimWhitespace?(w(t.delimiter==null,()=>"Delimiter should not be provided when delimWhitespace is true."),this.delimWhitespace=!0,this.delimiter=" "):this.delimiter=t.delimiter?t.delimiter:","}async iterator(){this.columnNamesValidated||await this.setColumnNames();let e=await this.base.iterator();return this.hasHeader&&(e=e.skip(1)),e.map(t=>this.makeDataElement(t))}makeDataElement(e){const t=this.parseRow(e),n={},r={};for(let s=0;s<this.fullColumnNames.length;s++){const p=this.fullColumnNames[s],i=this.columnConfigs?this.columnConfigs[p]:null;if(!(this.configuredColumnsOnly&&!i)){const u=t[s];let l=null;if(u==="")if(i&&i.default!==void 0)l=i.default;else{if(i&&(i.required||i.isLabel))throw new Error(`Required column ${p} is empty in this line: ${e}`);l=void 0}else{const c=Number(u);if(isNaN(c))i&&i.dtype==="bool"?l=this.getBoolean(u):l=u;else if(!i||!i.dtype)l=c;else switch(i.dtype){case"float32":l=c;break;case"int32":l=Math.floor(c);break;case"bool":l=this.getBoolean(u);break;default:l=c}}i&&i.isLabel?r[p]=l:n[p]=l}}return Object.keys(r).length===0?n:{xs:n,ys:r}}getBoolean(e){return e==="1"||e.toLowerCase()==="true"?1:0}parseRow(e,t=!0){const n=[];let r=0;const s=e.length;let p=me;for(let i=0;i<s;i++)switch(p){case me:switch(e.charAt(i)){case Me:r=i+1,p=ke;break;case this.delimiter:if(r=i+1,this.delimiter===" "&&this.delimWhitespace)break;n.push(""),p=me;break;default:p=oo,r=i;break}break;case oo:switch(e.charAt(i)){case this.delimiter:n.push(e.substring(r,i)),p=me,r=i+1;break}break;case ke:switch(e.charAt(i)){case Me:p=_t;break}break;case _t:switch(e.charAt(i)){case this.delimiter:n.push(e.substring(r,i-1)),p=me,r=i+1;break;case Me:p=ke;break;default:p=io;break}break;case io:switch(e.charAt(i)){case Me:p=ke;break}break}if(p===_t?n.push(e.substring(r,s-1)):n.push(e.substring(r)),t&&n.length!==this.fullColumnNames.length)throw new Error(`Invalid row in csv file. Should have ${this.fullColumnNames.length} elements in a row, but got ${n}`);return n}}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class At extends xe{constructor(e){super(),this.microphoneConfig=e,this.isClosed=!1,this.fftSize=e.fftSize||1024;const t=Math.log2(this.fftSize);if(this.fftSize<0||t<4||t>14||!Number.isInteger(t))throw new Error(`Invalid fftSize: it must be a power of 2 between 2 to 4 and 2 to 14, but got ${this.fftSize}`);if(this.numFrames=e.numFramesPerSpectrogram||43,this.sampleRateHz=e.sampleRateHz,this.columnTruncateLength=e.columnTruncateLength||this.fftSize,this.audioTrackConstraints=e.audioTrackConstraints,this.smoothingTimeConstant=e.smoothingTimeConstant||0,this.includeSpectrogram=e.includeSpectrogram!==!1,this.includeWaveform=e.includeWaveform===!0,!this.includeSpectrogram&&!this.includeWaveform)throw new Error("Both includeSpectrogram and includeWaveform are false. At least one type of data should be returned.")}summary(){return"microphone"}static async create(e={}){if(!z().get("IS_BROWSER"))throw new Error("microphone API is only supported in browser environment.");const t=new At(e);return await t.start(),t}async start(){try{this.stream=await navigator.mediaDevices.getUserMedia({audio:this.audioTrackConstraints==null?!0:this.audioTrackConstraints,video:!1})}catch(n){throw new Error(`Error thrown while initializing video stream: ${n.message}`)}if(!this.stream)throw new Error("Could not obtain audio from microphone.");const e=window.AudioContext||window.webkitAudioContext;if(this.audioContext=new e,!this.sampleRateHz)this.sampleRateHz=this.audioContext.sampleRate;else if(this.audioContext.sampleRate!==this.sampleRateHz)throw new Error(`Mismatch in sampling rate: Expected: ${this.sampleRateHz}; Actual: ${this.audioContext.sampleRate}`);const t=this.audioContext.createMediaStreamSource(this.stream);this.analyser=this.audioContext.createAnalyser(),this.analyser.fftSize=this.fftSize*2,this.analyser.smoothingTimeConstant=this.smoothingTimeConstant,t.connect(this.analyser),this.freqData=new Float32Array(this.fftSize),this.timeData=new Float32Array(this.fftSize)}async next(){if(this.isClosed)return{value:null,done:!0};let e,t;const n=await this.getAudioData();if(this.includeSpectrogram){const r=this.flattenQueue(n.freqDataQueue);e=this.getTensorFromAudioDataArray(r,[this.numFrames,this.columnTruncateLength,1])}if(this.includeWaveform){const r=this.flattenQueue(n.timeDataQueue);t=this.getTensorFromAudioDataArray(r,[this.numFrames*this.fftSize,1])}return{value:{spectrogram:e,waveform:t},done:!1}}async capture(){return(await this.next()).value}async getAudioData(){const e=[],t=[];let n=0;return new Promise(r=>{const s=setInterval(()=>{this.includeSpectrogram&&(this.analyser.getFloatFrequencyData(this.freqData),this.freqData[0]===-1/0&&r({freqDataQueue:e,timeDataQueue:t}),e.push(this.freqData.slice(0,this.columnTruncateLength))),this.includeWaveform&&(this.analyser.getFloatTimeDomainData(this.timeData),t.push(this.timeData.slice())),++n===this.numFrames&&(clearInterval(s),r({freqDataQueue:e,timeDataQueue:t}))},this.fftSize/this.sampleRateHz*1e3)})}stop(){this.isClosed||(this.isClosed=!0,this.analyser.disconnect(),this.audioContext.close(),this.stream!=null&&this.stream.getTracks().length>0&&this.stream.getTracks()[0].stop())}toArray(){throw new Error("Can not convert infinite audio stream to array.")}getSampleRate(){return this.sampleRateHz}flattenQueue(e){const t=e[0].length,n=new Float32Array(e.length*t);return e.forEach((r,s)=>n.set(r,s*t)),n}getTensorFromAudioDataArray(e,t){const n=new Float32Array(ie(t));return n.set(e,n.length-e.length),H(n,t)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class Et extends xe{constructor(e,t){if(super(),this.webcamVideoElement=e,this.webcamConfig=t,this.isClosed=!0,this.resize=!1,this.needToResize())if(this.resize=!0,this.cropSize=[this.webcamConfig.resizeHeight,this.webcamConfig.resizeWidth],this.cropBoxInd=et([0],"int32"),this.webcamConfig.centerCrop){const n=this.webcamConfig.resizeWidth*1/this.webcamVideoElement.width,r=this.webcamConfig.resizeHeight*1/this.webcamVideoElement.height,s=(1-n)/2,p=(1-r)/2,i=s+n,u=r+p;this.cropBox=Ne([p,s,u,i],[1,4])}else this.cropBox=Ne([0,0,1,1],[1,4])}summary(){return"webcam"}static async create(e,t={}){if(!z().get("IS_BROWSER"))throw new Error("tf.data.webcam is only supported in browser environment.");if(!e){if(e=document.createElement("video"),!t.resizeWidth||!t.resizeHeight)throw new Error("Please provide webcam video element, or resizeWidth and resizeHeight to create a hidden video element.");e.width=t.resizeWidth,e.height=t.resizeHeight}const n=new Et(e,t);return await n.start(),n}async start(){this.webcamConfig.facingMode&&w(this.webcamConfig.facingMode==="user"||this.webcamConfig.facingMode==="environment",()=>`Invalid webcam facing mode: ${this.webcamConfig.facingMode}. Please provide 'user' or 'environment'`);try{this.stream=await navigator.mediaDevices.getUserMedia({video:{deviceId:this.webcamConfig.deviceId,facingMode:this.webcamConfig.facingMode?this.webcamConfig.facingMode:"user",width:this.webcamVideoElement.width,height:this.webcamVideoElement.height}})}catch(e){throw e.message=`Error thrown while initializing video stream: ${e.message}`,e}if(!this.stream)throw new Error("Could not obtain video from webcam.");try{this.webcamVideoElement.srcObject=this.stream}catch(e){console.log(e),this.webcamVideoElement.src=window.URL.createObjectURL(this.stream)}return this.webcamVideoElement.play(),this.isClosed=!1,new Promise(e=>{this.webcamVideoElement.onloadedmetadata=()=>{e()}})}async next(){if(this.isClosed)return{value:null,done:!0};let e;try{e=uu(this.webcamVideoElement)}catch(t){throw new Error(`Error thrown converting video to pixels: ${JSON.stringify(t)}`)}if(this.resize)try{return{value:this.cropAndResizeFrame(e),done:!1}}catch(t){throw new Error(`Error thrown cropping the video: ${t.message}`)}finally{e.dispose()}else return{value:e,done:!1}}needToResize(){return!!(this.webcamConfig.resizeWidth&&this.webcamConfig.resizeHeight&&(this.webcamVideoElement.width!==this.webcamConfig.resizeWidth||this.webcamVideoElement.height!==this.webcamConfig.resizeHeight))}cropAndResizeFrame(e){return $(()=>{const t=Ze(ae(e,"float32"),0);let n;n=Ye.cropAndResize(t,this.cropBox,this.cropBoxInd,this.cropSize,"bilinear");const r=n.shape;return T(n,r.slice(1))})}async capture(){return(await this.next()).value}stop(){this.stream.getTracks().forEach(e=>e.stop());try{this.webcamVideoElement.srcObject=null}catch(e){console.log(e),this.webcamVideoElement.src=null}this.isClosed=!0}toArray(){throw new Error("Can not convert infinite video stream to array.")}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class uo{}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class lo extends xe{split(e){return new Vb(this,e)}}class Vb extends lo{constructor(e,t){super(),this.upstream=e,this.impl=new $b(e,t)}summary(){return this.impl.summary()}async next(){return this.impl.next()}}class $b extends Wr{constructor(e,t){super(),this.upstream=e,this.separator=t,this.carryover=""}summary(){return`${this.upstream.summary()} -> Split('${this.separator}')`}async pump(){const e=await this.upstream.next();if(e.done)return this.carryover===""?!1:(this.outputQueue.push(this.carryover),this.carryover="",!0);const t=e.value.split(this.separator);t[0]=this.carryover+t[0];for(const n of t.slice(0,-1))this.outputQueue.push(n);return this.carryover=t[t.length-1],!0}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class Lb extends xe{decodeUTF8(){return new Fb(this)}}class Fb extends lo{constructor(e){super(),this.upstream=e,this.impl=new Pb(e)}summary(){return this.impl.summary()}async next(){return this.impl.next()}}class Pb extends Wr{constructor(e){if(super(),this.upstream=e,z().get("IS_BROWSER"))this.decoder=new TextDecoder("utf-8");else{const{StringDecoder:t}=require("string_decoder");this.decoder=new t("utf8")}}summary(){return`${this.upstream.summary()} -> Utf8`}async pump(){const e=await this.upstream.next();let t;if(e.done)return!1;t=e.value;let n;return z().get("IS_BROWSER")?n=this.decoder.decode(t,{stream:!0}):n=this.decoder.write(Buffer.from(t.buffer)),this.outputQueue.push(n),!0}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class co extends Lb{constructor(e,t={}){super(),this.file=e,this.options=t,w(e instanceof Uint8Array||(z().get("IS_BROWSER")?e instanceof File||e instanceof Blob:!1),()=>"FileChunkIterator only supports File, Blob and Uint8Array right now."),this.offset=t.offset||0,this.chunkSize=t.chunkSize||1024*1024}summary(){return`FileChunks ${this.file}`}async next(){return this.offset>=(this.file instanceof Uint8Array?this.file.byteLength:this.file.size)?{value:null,done:!0}:{value:await new Promise((e,t)=>{const n=this.offset+this.chunkSize;if(this.file instanceof Uint8Array)e(new Uint8Array(this.file.slice(this.offset,n)));else{const r=new FileReader;r.onload=p=>{let i=r.result;if(i instanceof ArrayBuffer&&(i=new Uint8Array(i)),!(i instanceof Uint8Array))return t(new TypeError("FileReader returned unknown type."));e(i)},r.onabort=p=>t(new Error("Aborted")),r.onerror=p=>t(new Error(p.type));const s=this.file.slice(this.offset,n);r.readAsArrayBuffer(s)}this.offset=n}),done:!1}}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */async function Rb(a,e={},t){let n,r;typeof a=="string"?n=a:(n=a.url,r=Bb(a));const s=await(t||lu)(n,r);if(s.ok){const p=new Uint8Array(await s.arrayBuffer());return new co(p,e)}else throw new Error(s.statusText)}const Bb=a=>({method:a.method,headers:a.headers,body:a.body,mode:a.mode,credentials:a.credentials,cache:a.cache,redirect:a.redirect,referrer:a.referrer,integrity:a.integrity});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */function mo(a){return typeof a=="string"&&a.slice(0,7)==="file://"}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class ho extends uo{constructor(e,t={}){super(),this.input=e,this.options=t}async iterator(){if(mo(this.input)&&z().get("IS_NODE")){const e=require("fs");this.input=e.readFileSync(this.input.slice(7))}return new co(this.input,this.options)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */class yo extends uo{constructor(e,t={}){super(),this.url=e,this.fileOptions=t}async iterator(){return mo(this.url)?new ho(this.url,this.fileOptions).iterator():Rb(this.url,this.fileOptions)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */function jb(a,e={}){return new po(new yo(a),e)}function Wb(a){const e=qr(a);return Hr(async()=>e)}function qb(a){return Hr(async()=>{const e=await a();return qr(()=>e.next())})}async function Hb(a,e){return Et.create(a,e)}async function Ub(a){return At.create(a)}/** @license See the LICENSE file. */const fo="4.16.0";/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Gb=Object.freeze(Object.defineProperty({__proto__:null,CSVDataset:po,Dataset:tt,FileDataSource:ho,TextLineDataset:so,URLDataSource:yo,array:cu,csv:jb,func:Wb,generator:qb,microphone:Ub,version_data:fo,webcam:Hb,zip:mu},Symbol.toStringTag,{value:"Module"}));/** @license See the LICENSE file. */const go="4.16.0";/** @license See the LICENSE file. */const bo="4.16.0";/** @license See the LICENSE file. */const Kb="4.16.0";/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Jb={"tfjs-core":Fs,"tfjs-backend-cpu":go,"tfjs-backend-webgl":bo,"tfjs-data":fo,"tfjs-layers":Ur,"tfjs-converter":ro,tfjs:Kb},Qb=Object.freeze(Object.defineProperty({__proto__:null,Abs:du,Acos:hu,Acosh:yu,AdadeltaOptimizer:fu,AdagradOptimizer:gu,AdamOptimizer:bu,AdamaxOptimizer:Nu,Add:wu,AddN:zt,All:xu,Any:Su,ArgMax:Tu,ArgMin:vu,Asin:Ou,Asinh:_u,Atan:Au,Atan2:Eu,Atanh:Mu,AvgPool:ku,AvgPool3D:Iu,AvgPool3DGrad:Cu,AvgPoolGrad:Du,BatchMatMul:zu,BatchToSpaceND:Vu,Bincount:$u,BitwiseAnd:Vt,BroadcastArgs:$t,BroadcastTo:Lu,Callback:qs,CallbackList:Fu,Cast:Pu,Ceil:Ru,ClipByValue:Bu,Complex:ju,ComplexAbs:Wu,Concat:qu,Conv2D:Hu,Conv2DBackpropFilter:Uu,Conv2DBackpropInput:Gu,Conv3D:Ku,Conv3DBackpropFilterV2:Ju,Conv3DBackpropInputV2:Qu,Cos:Xu,Cosh:Zu,CropAndResize:Yu,Cumprod:el,Cumsum:tl,CustomCallback:al,DataStorage:nl,DenseBincount:rl,DepthToSpace:sl,DepthwiseConv2dNative:ol,DepthwiseConv2dNativeBackpropFilter:il,DepthwiseConv2dNativeBackpropInput:pl,Diag:Lt,Dilation2D:ul,Dilation2DBackpropFilter:ll,Dilation2DBackpropInput:cl,Draw:ml,get ENV(){return dl},EarlyStopping:Us,Einsum:hl,Elu:yl,EluGrad:fl,Environment:gl,Equal:bl,Erf:Nl,Exp:wl,ExpandDims:xl,Expm1:Sl,FFT:Tl,Fill:vl,FlipLeftRight:Ol,Floor:_l,FloorDiv:Al,FromPixels:El,FusedBatchNorm:Ml,FusedConv2D:kl,FusedDepthwiseConv2D:He,GPGPUContext:Il,GatherNd:Yt,GatherV2:Cl,GraphModel:Ot,Greater:Dl,GreaterEqual:zl,History:Vl,IFFT:$l,Identity:Ll,Imag:Fl,InputSpec:Pl,IsFinite:Rl,IsInf:Bl,IsNan:jl,KernelBackend:Wl,LRN:ql,LRNGrad:Hl,LayerVariable:Ul,LayersModel:Ge,LeakyRelu:Gl,Less:Kl,LessEqual:Jl,LinSpace:Ft,Log:Ql,Log1p:Xl,LogSoftmax:Zl,LogicalAnd:Yl,LogicalNot:ec,LogicalOr:tc,LogicalXor:ac,LowerBound:nc,MathBackendCPU:rc,MathBackendWebGL:sc,MatrixBandPart:oc,Max:ic,MaxPool:pc,MaxPool3D:uc,MaxPool3DGrad:lc,MaxPoolGrad:cc,MaxPoolWithArgmax:Rt,Maximum:mc,Mean:dc,Min:hc,Minimum:yc,MirrorPad:fc,Mod:gc,MomentumOptimizer:bc,Multinomial:jt,Multiply:Nc,Neg:wc,NonMaxSuppressionV3:xc,NonMaxSuppressionV4:Sc,NonMaxSuppressionV5:Tc,NotEqual:vc,OP_SCOPE_SUFFIX:pa,OneHot:Oc,OnesLike:_c,Optimizer:Ac,OptimizerConstructors:Ec,Pack:Mc,PadV2:kc,Pool:Ic,Pow:Cc,Prelu:Dc,Prod:zc,RMSPropOptimizer:Vc,RNN:Ke,RaggedGather:Wt,RaggedRange:qt,RaggedTensorToTensor:Ht,Range:$c,get Rank(){return Lc},Real:Fc,RealDiv:Pc,Reciprocal:Rc,get Reduction(){return Bc},Relu:jc,Relu6:Wc,Reshape:qc,ResizeBilinear:Hc,ResizeBilinearGrad:Uc,ResizeNearestNeighbor:Gc,ResizeNearestNeighborGrad:Kc,Reverse:Jc,RotateWithOffset:Qc,Round:Xc,Rsqrt:Zc,SGDOptimizer:Yc,ScatterNd:Xt,SearchSorted:Pt,Select:em,Selu:tm,Sequential:ia,Sigmoid:am,Sign:nm,Sin:rm,Sinh:sm,Slice:om,Softmax:im,Softplus:pm,SpaceToBatchND:um,SparseFillEmptyRows:lm,SparseReshape:cm,SparseSegmentMean:mm,SparseSegmentSum:dm,SparseToDense:Zt,SplitV:hm,Sqrt:ym,Square:fm,SquaredDifference:gm,StaticRegexReplace:bm,Step:Nm,StridedSlice:wm,StringNGrams:xm,StringSplit:Sm,StringToHashBucketFast:Tm,Sub:vm,Sum:Om,SymbolicTensor:_m,Tan:Am,Tanh:Em,Tensor:pe,TensorBuffer:$e,TensorScatterUpdate:Kt,Tile:Mm,TopK:km,Transform:Im,Transpose:Cm,Unique:Dm,Unpack:zm,UnsortedSegmentSum:Vm,UpperBound:$m,Variable:Lm,ZerosLike:Fm,_FusedMatMul:Pm,abs:ua,acos:la,acosh:ca,add:U,addN:Gr,all:ma,any:da,argMax:ha,argMin:ya,asin:fa,asinh:ga,atan:ba,atan2:Na,atanh:wa,avgPool:xa,avgPool3d:Sa,backend:Rm,backend_util:Bm,basicLSTMCell:Kr,batchNorm:Ta,batchNorm2d:va,batchNorm3d:Oa,batchNorm4d:_a,batchToSpaceND:Aa,bincount:Ea,bitwiseAnd:Jr,booleanMaskAsync:Ms,broadcastArgs:Qr,broadcastTo:Ma,broadcast_util:jm,browser:Wm,buffer:De,callbacks:sg,cast:ae,ceil:ka,clipByValue:Ia,clone:Xe,complex:Ca,concat:se,concat1d:Da,concat2d:za,concat3d:Va,concat4d:$a,constraints:ey,conv1d:La,conv2d:Fa,conv2dTranspose:Pa,conv3d:Ra,conv3dTranspose:Ba,copyRegisteredKernels:qm,cos:ja,cosh:Wa,cosineWindow:qa,cumprod:Ha,cumsum:Ua,customGrad:qe,data:Gb,denseBincount:Ga,deprecationWarn:Hm,depthToSpace:Ka,depthwiseConv2d:We,deregisterOp:ig,device_util:Um,diag:Xr,dilation2d:Ja,disableDeprecationWarnings:Gm,dispose:jr,disposeVariables:Km,div:Be,divNoNan:Qa,dot:Xa,dropout:Za,einsum:Ya,elu:en,enableDebugMode:Jm,enableProdMode:Qm,enclosingPowerOfTwo:tn,engine:Xm,ensureShape:Zr,env:z,equal:an,erf:nn,euclideanNorm:rn,exp:sn,expandDims:Ze,expm1:on,eye:pn,fft:un,fill:ln,findBackend:Zm,findBackendFactory:Ym,floor:cn,floorDiv:mn,forceHalfFloat:ed,fused:Vs,gather:Re,gatherND:Ds,gather_util:td,getBackend:ad,getGradient:nd,getKernel:rd,getKernelsForBackend:sd,gpgpu_util:od,grad:id,grads:pd,greater:dn,greaterEqual:hn,ifft:yn,imag:fn,image:Ye,inTopKAsync:zs,initializers:fy,input:Ps,io:it,irfft:gn,isFinite:bn,isInf:Nn,isNaN:wn,keep:P,kernel_impls:Jh,layers:$f,leakyRelu:xn,less:Sn,lessEqual:Tn,linalg:vn,linspace:Yr,loadGraphModel:Cb,loadGraphModelSync:Db,loadLayersModel:ud,localResponseNormalization:On,log:_n,log1p:An,logSigmoid:En,logSoftmax:Mn,logSumExp:kn,logicalAnd:In,logicalNot:Cn,logicalOr:Dn,logicalXor:zn,losses:Vn,lowerBound:es,matMul:B,math:Kh,max:$n,maxPool:Ln,maxPool3d:Fn,maxPoolWithArgmax:ts,maximum:Pn,mean:Rn,memory:ld,meshgrid:as,metrics:Zf,min:Bn,minimum:jn,mirrorPad:Wn,mod:qn,model:gy,models:Yf,moments:Hn,movingAverage:ks,mul:X,multiRNNCell:ns,multinomial:rs,neg:Un,nextFrame:cd,norm:Gn,notEqual:Kn,oneHot:be,ones:Z,onesLike:Jn,op:S,outerProduct:ss,pad:Y,pad1d:os,pad2d:is,pad3d:ps,pad4d:us,pool:Qn,pow:je,prelu:Xn,print:Zn,prod:Yn,profile:md,raggedGather:ls,raggedRange:cs,raggedTensorToTensor:ms,rand:ds,randomGamma:fs,randomNormal:ze,randomStandardNormal:gs,randomUniform:Ve,randomUniformInt:bs,range:er,ready:dd,real:tr,reciprocal:ar,registerBackend:hd,registerCallbackConstructor:Ny,registerGradient:yd,registerKernel:fd,registerOp:og,regularizers:ng,relu:nr,relu6:rr,removeBackend:gd,reshape:T,reverse:te,reverse1d:Ns,reverse2d:ws,reverse3d:xs,reverse4d:Ss,rfft:sr,round:or,rsqrt:ir,scalar:F,scatterND:Is,scatter_util:bd,searchSorted:Te,selu:pr,separableConv2d:ur,sequential:by,serialization:Nd,setBackend:wd,setPlatform:xd,setWebGLContext:Sd,setdiff1dAsync:Ts,shared:Td,sigmoid:oe,sign:lr,signal:cr,sin:mr,sinh:dr,slice:q,slice1d:hr,slice2d:yr,slice3d:fr,slice4d:gr,slice_util:vd,softmax:br,softplus:Nr,spaceToBatchND:wr,sparse:xr,sparseToDense:Cs,spectral:Sr,split:Tr,sqrt:vr,square:Or,squaredDifference:_r,squeeze:Pe,stack:ne,step:Ar,stridedSlice:Er,string:Mr,sub:le,sum:kr,sumOutType:Od,tan:Ir,tanh:ye,tensor:H,tensor1d:et,tensor2d:Ne,tensor3d:Cr,tensor4d:vs,tensor5d:Os,tensor6d:_s,tensorScatterUpdate:As,tensor_util:_d,test_util:yh,tidy:$,tile:Dr,time:Ad,topk:zr,train:Ed,transpose:Ue,truncatedNormal:Vr,unique:$r,unregisterGradient:Md,unregisterKernel:kd,unsortedSegmentSum:Lr,unstack:re,upcastType:Id,upperBound:Es,util:Cd,valueAndGrad:Dd,valueAndGrads:zd,variable:Fr,variableGrads:Vd,version:Jb,version_converter:ro,version_core:Fs,version_cpu:go,version_layers:Ur,version_webgl:bo,webgl:$d,webgl_util:Ld,where:Pr,whereAsync:st,zeros:Rr,zerosLike:Br},Symbol.toStringTag,{value:"Module"})),No=new de;No.compose(new he,new It,new he(.001,.001,.001));const Xb=new de().set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1);class wo{constructor({container:e,imageTargetSrc:t,maxTrack:n,uiLoading:r="yes",uiScanning:s="yes",uiError:p="yes",filterMinCF:i=null,filterBeta:u=null,warmupTolerance:l=null,missTolerance:c=null,userDeviceId:m=null,environmentDeviceId:d=null}){this.container=e,this.imageTargetSrc=t,this.maxTrack=n,this.filterMinCF=i,this.filterBeta=u,this.warmupTolerance=l,this.missTolerance=c,this.ui=new Rd({uiLoading:r,uiScanning:s,uiError:p}),this.userDeviceId=m,this.environmentDeviceId=d,this.shouldFaceUser=!1,this.scene=new Ct,this.cssScene=new Ct,this.renderer=new To({antialias:!0,alpha:!0}),this.cssRenderer=new Pd({antialias:!0}),this.renderer.outputEncoding=vo,this.renderer.setPixelRatio(window.devicePixelRatio),this.camera=new Oo,this.anchors=[],this.renderer.domElement.style.position="absolute",this.cssRenderer.domElement.style.position="absolute",this.container.appendChild(this.renderer.domElement),this.container.appendChild(this.cssRenderer.domElement),window.addEventListener("resize",this.resize.bind(this))}async start(){this.ui.showLoading(),await this._startVideo(),await this._startAR()}stop(){this.controller.stopProcessVideo(),this.video.srcObject.getTracks().forEach(function(e){e.stop()}),this.video.remove()}switchCamera(){this.shouldFaceUser=!this.shouldFaceUser,this.stop(),this.start()}addAnchor(e){const t=new Dt;t.visible=!1,t.matrixAutoUpdate=!1;const n={group:t,targetIndex:e,onTargetFound:null,onTargetLost:null,onTargetUpdate:null,css:!1,visible:!1};return this.anchors.push(n),this.scene.add(t),n}addCSSAnchor(e){const t=new Dt;t.visible=!1,t.matrixAutoUpdate=!1;const n={group:t,targetIndex:e,onTargetFound:null,onTargetLost:null,onTargetUpdate:null,css:!0,visible:!1};return this.anchors.push(n),this.cssScene.add(t),n}_startVideo(){return new Promise((e,t)=>{if(this.video=document.createElement("video"),this.video.setAttribute("autoplay",""),this.video.setAttribute("muted",""),this.video.setAttribute("playsinline",""),this.video.style.position="absolute",this.video.style.top="0px",this.video.style.left="0px",this.video.style.zIndex="-2",this.container.appendChild(this.video),!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){this.ui.showCompatibility(),t();return}const n={audio:!1,video:{}};this.shouldFaceUser?this.userDeviceId?n.video.deviceId={exact:this.userDeviceId}:n.video.facingMode="user":this.environmentDeviceId?n.video.deviceId={exact:this.environmentDeviceId}:n.video.facingMode="environment",navigator.mediaDevices.getUserMedia(n).then(r=>{this.video.addEventListener("loadedmetadata",()=>{this.video.setAttribute("width",this.video.videoWidth),this.video.setAttribute("height",this.video.videoHeight),e()}),this.video.srcObject=r}).catch(r=>{console.log("getUserMedia error",r),t()})})}_startAR(){return new Promise(async(e,t)=>{const n=this.video;this.container,this.controller=new Fd({inputWidth:n.videoWidth,inputHeight:n.videoHeight,filterMinCF:this.filterMinCF,filterBeta:this.filterBeta,warmupTolerance:this.warmupTolerance,missTolerance:this.missTolerance,maxTrack:this.maxTrack,onUpdate:s=>{if(s.type==="updateMatrix"){const{targetIndex:p,worldMatrix:i}=s;for(let u=0;u<this.anchors.length;u++)if(this.anchors[u].targetIndex===p){if(this.anchors[u].css?this.anchors[u].group.children.forEach(l=>{l.element.style.visibility=i===null?"hidden":"visible"}):this.anchors[u].group.visible=i!==null,i!==null){let l=new de;l.elements=[...i],l.multiply(this.postMatrixs[p]),this.anchors[u].css&&l.multiply(No),this.anchors[u].group.matrix=l}else this.anchors[u].group.matrix=Xb;this.anchors[u].visible&&i===null&&(this.anchors[u].visible=!1,this.anchors[u].onTargetLost&&this.anchors[u].onTargetLost()),!this.anchors[u].visible&&i!==null&&(this.anchors[u].visible=!0,this.anchors[u].onTargetFound&&this.anchors[u].onTargetFound()),this.anchors[u].onTargetUpdate&&this.anchors[u].onTargetUpdate()}this.anchors.reduce((u,l)=>u||l.visible,!1)?this.ui.hideScanning():this.ui.showScanning()}}}),this.resize();const{dimensions:r}=await this.controller.addImageTargets(this.imageTargetSrc);this.postMatrixs=[];for(let s=0;s<r.length;s++){const p=new he,i=new It,u=new he,[l,c]=r[s];p.x=l/2,p.y=l/2+(c-l)/2,u.x=l,u.y=l,u.z=l;const m=new de;m.compose(p,i,u),this.postMatrixs.push(m)}await this.controller.dummyRun(this.video),this.ui.hideLoading(),this.ui.showScanning(),this.controller.processVideo(this.video),e()})}resize(){const{renderer:e,cssRenderer:t,camera:n,container:r,video:s}=this;if(!s)return;this.video.setAttribute("width",this.video.videoWidth),this.video.setAttribute("height",this.video.videoHeight);let p,i;const u=s.videoWidth/s.videoHeight,l=r.clientWidth/r.clientHeight;u>l?(i=r.clientHeight,p=i*u):(p=r.clientWidth,i=p/u);const c=this.controller.getProjectionMatrix(),m=this.controller.inputWidth/this.controller.inputHeight;let d;m>l?d=this.video.width/this.controller.inputWidth:d=this.video.height/this.controller.inputHeight;let h,N;m>l?(h=r.clientHeight,h*=d):(N=r.clientWidth,h=N/this.controller.inputWidth*this.controller.inputHeight,h*=d);let f=r.clientHeight/h;const y=2*Math.atan(1/c[5]*f)*180/Math.PI,b=c[14]/(c[10]-1),v=c[14]/(c[10]+1);c[5]/c[0],n.fov=y,n.near=b,n.far=v,n.aspect=r.clientWidth/r.clientHeight,n.updateProjectionMatrix(),s.style.top=-(i-r.clientHeight)/2+"px",s.style.left=-(p-r.clientWidth)/2+"px",s.style.width=p+"px",s.style.height=i+"px";const _=e.domElement,x=t.domElement;_.style.position="absolute",_.style.left=0,_.style.top=0,_.style.width=r.clientWidth+"px",_.style.height=r.clientHeight+"px",x.style.position="absolute",x.style.left=0,x.style.top=0,x.style.width=r.clientWidth+"px",x.style.height=r.clientHeight+"px",e.setSize(r.clientWidth,r.clientHeight),t.setSize(r.clientWidth,r.clientHeight)}}window.MINDAR||(window.MINDAR={}),window.MINDAR.IMAGE||(window.MINDAR.IMAGE={}),window.MINDAR.IMAGE.MindARThree=wo,window.MINDAR.IMAGE.tf=Qb;export{wo as MindARThree};
