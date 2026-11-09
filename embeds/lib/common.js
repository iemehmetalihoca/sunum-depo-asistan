// Ortak çizim yardımcıları (canvas, ölçek, parlama, parçacık, döngü).
// Her animasyon dosyası önce W ve H'yi tanımlar, sonra bu dosya yüklenir ve window.ANIM() çağrılır.
const F='Lato,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif';
const cv=document.getElementById('c'),x=cv.getContext('2d');let s=1,ox=0,oy=0,dpr=1;
function rs(){dpr=devicePixelRatio||1;const w=innerWidth,h=innerHeight;cv.width=w*dpr;cv.height=h*dpr;s=Math.min(w/W,h/H);ox=(w-W*s)/2*dpr;oy=(h-H*s)/2*dpr}
addEventListener('resize',rs);rs();
let t0=performance.now();const cl=v=>v<0?0:v>1?1:v,ea=t=>{t=cl(t);return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2},L=(a,b,t)=>a+(b-a)*t;
function bz(a,b,c,d,t){const u=1-t;return u*u*u*a+3*u*u*t*b+3*u*t*t*c+t*t*t*d}
function rr(X,Y,w,h,r){x.beginPath();if(x.roundRect)x.roundRect(X,Y,w,h,r);else x.rect(X,Y,w,h)}
function txt(t,X,Y,sz,col,wt,al){x.font=(wt||400)+' '+sz+'px '+F;x.fillStyle=col;x.textAlign=al||'left';x.textBaseline='middle';x.fillText(t,X,Y)}
function glow(X,Y,r,col,a){const g=x.createRadialGradient(X,Y,0,X,Y,r);g.addColorStop(0,col);g.addColorStop(1,'rgba(0,0,0,0)');x.globalAlpha=a;x.fillStyle=g;x.beginPath();x.arc(X,Y,r,0,7);x.fill();x.globalAlpha=1}
const stars=[...Array(60)].map(()=>[Math.random()*W,Math.random()*H,Math.random()*6]);
function bg(t){for(const st of stars){x.globalAlpha=.14+.14*Math.sin(t/900+st[2]);x.fillStyle='#9ab';x.fillRect(st[0],st[1],2,2)}x.globalAlpha=1}
function card(X,Y,w,h,stroke,fill){rr(X,Y,w,h,20);x.fillStyle=fill||'rgba(255,255,255,.05)';x.fill();x.strokeStyle=stroke;x.lineWidth=2;x.stroke()}
let parts=[];
function runParts(){parts=parts.filter(z=>{z.t+=z.v*16;const u=cl(z.t);for(let j=0;j<5;j++){const v=cl(u-j*.02);const X=bz(z.a.x,z.b.x,z.c.x,z.d.x,v),Y=bz(z.a.y,z.b.y,z.c.y,z.d.y,v);if(z.sq){x.globalAlpha=1-j*.2;x.fillStyle=z.col;x.fillRect(X-9,Y-9,18,18);x.globalAlpha=1;break}glow(X,Y,12-j*2,z.col,.85-j*.15)}if(z.t>=1){z.done&&z.done();return false}return true})}
function loop(f){requestAnimationFrame(function fr(now){const t=Math.max(0,now-t0);x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,cv.width,cv.height);x.setTransform(dpr*s,0,0,dpr*s,ox,oy);bg(t);f(t,now);runParts();requestAnimationFrame(fr)})}

// Sol üstteki ↻ tuşu: animasyonu sayfadan çıkmadan baştan oynatır (beyin ve depo simülasyonu hariç).
if(!document.body.hasAttribute('data-noreplay')){const b=document.createElement('button');b.id='rp';b.title='Tekrar oynat';b.setAttribute('aria-label','Tekrar oynat');b.textContent='↻';
 b.onclick=e=>{e.stopPropagation();t0=performance.now();parts=[];b.blur();parent.postMessage({deckFocus:1},'*')};document.body.appendChild(b)}
if(window.ANIM)window.ANIM();
