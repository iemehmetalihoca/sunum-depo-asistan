// Asistanın beyni · Ürün Master sinir ağı (STAGE 1/2/3 sayfa içinde tanımlanır)
// Bu dosya sunumdaki canlı animasyonun kodudur. Metinleri ve renkleri buradan değiştirebilirsin.
const W=1664,H=752,F='Lato,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif';
const A=["Ürün türü","Raf ömrü","Depo yeri","Üretim yeri","Ürün grubu","Maya türü","Üretim tipi","Çıkış birimi","Paket etiketi","Birim/Paket","Paket KG","Birim KG","Açıklama"];
const P=[
["100000417","Lesafmaya Yaş Maya 500g","Lesafmaya 1/2",["YAŞ MAYA","40 gün","F001","TR1P","500","STANDART","KANBAN","PALET","KOLİ",108,12,1296,"İÇ PAZAR"]],
["100001690","Özmaya Yeşil 500g","Özmaya Yeşil",["YAŞ MAYA","30 gün","F001","TR1P","500","ÖZEL","—","PALET","KOLİ",108,12,1296,"İÇ PAZAR"]],
["100012150","LIS ST 202 – 20 kg IRAQ","LIS ST 202",["BI","184 gün","F003","—","—","—","—","TORBA","TORBA",1,20,20,"IRAK"]],
["100000422","Özmaya CYB 1000g Lebanon","Özmaya CYB 1 kg",["YAŞ MAYA","60 gün","F001","TR1P","1000","STANDART","—","PALET","KOLİ",108,12,1296,"LÜBNAN"]],
["100000450","Frigo Sıvı Maya 1050kg","Frigo Sıvı",["SIVI MAYA","21 gün","F001","—","1050","—","—","TANK","TANK",1,1050,1050,"İÇ PAZAR"]],
["100000453","Yuva ADYH 40x100g","Yuva ADYH 100g",["KURU MAYA","—","F002","—","—","—","—","KOLİ","KOLİ",1,4,4,"İÇ PAZAR"]],
["100000451","Kastalia Sıvı Maya 22kg","Kastalya Sıvı",["SIVI MAYA","30 gün","F001","TR1P","22","STANDART","—","KOLİ","KOLİ",1,22,22,"İÇ PAZAR"]]];
const IN=[["SAP Stok","parti · kg · tarih",250],["Yükleme Planı","Logistics · bayi",500]];
const OUT=["Maya Çıkış Excel","Eksik Ürünler","Nakilde (LLB)","Kalite Stok","KTF Formları","Uyarılar %30 · SKT"];
const cv=document.getElementById('c'),x=cv.getContext('2d');let s=1,ox=0,oy=0,dpr=1;
function rs(){dpr=devicePixelRatio||1;const w=innerWidth,h=innerHeight;cv.width=w*dpr;cv.height=h*dpr;s=Math.min(w/W,h/H);ox=(w-W*s)/2*dpr;oy=(h-H*s)/2*dpr}
addEventListener('resize',rs);rs();
const t0=performance.now(),CYC=3400,C={x:800,y:376},R=232;
const cl=v=>v<0?0:v>1?1:v,ea=t=>{t=cl(t);return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2},L=(a,b,t)=>a+(b-a)*t;
const fmt=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.');
const hue=i=>`hsl(${205+i*7},95%,${66}%)`;
function bz(a,b,c,d,t){const u=1-t;return u*u*u*a+3*u*u*t*b+3*u*t*t*c+t*t*t*d}
function rr(X,Y,w,h,r){x.beginPath();if(x.roundRect)x.roundRect(X,Y,w,h,r);else x.rect(X,Y,w,h)}
function txt(t,X,Y,sz,col,wt,al){x.font=(wt||400)+' '+sz+'px '+F;x.fillStyle=col;x.textAlign=al||'left';x.textBaseline='middle';x.fillText(t,X,Y)}
function glow(X,Y,r,col,a){const g=x.createRadialGradient(X,Y,0,X,Y,r);g.addColorStop(0,col);g.addColorStop(1,'rgba(0,0,0,0)');x.globalAlpha=a;x.fillStyle=g;x.beginPath();x.arc(X,Y,r,0,7);x.fill();x.globalAlpha=1}
const s1=i=>({x:1040,y:52+i*54.6}),rg=i=>{const a=-Math.PI/2+i*2*Math.PI/13;return{x:C.x+R*Math.cos(a),y:C.y+R*Math.sin(a)}};
const stars=[...Array(70)].map(()=>[Math.random()*W,Math.random()*H,Math.random()*6]);
const gal=[...Array(98)].map((_,i)=>[300+Math.random()*70,Math.random()*6.283,(Math.random()-.5)*.00012]);
let TT=0;const OUTON=()=>STAGE>2||(STAGE==2&&TT>4200);let parts=[],last=0,oglow=OUT.map(()=>0),pulse=0;
function spawn(now){
 if(STAGE<2)return;
 const k=Math.random();
 if(k<.55){const j=Math.random()<.5?0:1,I=IN[j];const left=[...Array(13).keys()].filter(i=>rg(i).x<C.x+20);const d=rg(left[Math.floor(Math.random()*left.length)]);
  parts.push({a:{x:410,y:I[2]},b:{x:560,y:I[2]},c:{x:d.x-120,y:d.y},d:d,t:0,v:.0011+Math.random()*.0005,col:j?'#bf5af2':'#64d2ff',nx:'core'})}
 else if(OUTON()){const o=Math.floor(Math.random()*6),oy2=C.y+(o-2.5)*112;const st=rg([1,2,3,4,5,10,11,12][Math.floor(Math.random()*8)]);
  parts.push({a:st,b:{x:st.x+140,y:st.y},c:{x:1230,y:oy2},d:{x:1350,y:oy2},t:0,v:.0012+Math.random()*.0005,col:'#2997ff',o:o})}
}
function frame(now){
 const t=Math.max(0,now-t0);TT=t;x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,cv.width,cv.height);x.setTransform(dpr*s,0,0,dpr*s,ox,oy);
 for(const st of stars){x.globalAlpha=.18+.18*Math.sin(t/900+st[2]);x.fillStyle='#9ab';x.fillRect(st[0],st[1],2,2)}x.globalAlpha=1;
 const k=Math.floor(t/CYC),ph=(t%CYC)/CYC,p=P[k%P.length],q=P[(k+P.length-1)%P.length];
 const m=STAGE==1?0:STAGE==2?ea((t-300)/1700):1;
 const pos=[...Array(13).keys()].map(i=>{const a=s1(i),b=rg(i);return{x:L(a.x,b.x,m),y:L(a.y,b.y,m)}});
 if(m<1){const al=1-m;x.globalAlpha=al;
  const cn={x:L(170,C.x,m),y:C.y},nn={x:L(530,C.x,m),y:C.y};
  x.strokeStyle='rgba(120,160,255,.35)';x.lineWidth=2;x.beginPath();x.moveTo(cn.x+110,cn.y);x.lineTo(nn.x-200,nn.y);x.stroke();
  for(let i=0;i<13;i++){x.strokeStyle='rgba(120,160,255,.22)';x.beginPath();x.moveTo(nn.x+200,nn.y);x.bezierCurveTo(880,376,900,pos[i].y,pos[i].x-10,pos[i].y);x.stroke()}
  x.globalAlpha=al;
  rr(cn.x-110,cn.y-34,220,68,34);x.fillStyle='rgba(41,151,255,.14)';x.fill();x.strokeStyle='#2997ff';x.stroke();
  txt('Ürün kodu',cn.x,cn.y-62,24,'#86868b',400,'center');txt(p[0],cn.x,cn.y,28,'#f5f5f7',600,'center');
  rr(nn.x-200,nn.y-34,400,68,34);x.fillStyle='rgba(191,90,242,.13)';x.fill();x.strokeStyle='#bf5af2';x.stroke();
  txt('SAP ürün adı',nn.x,nn.y-62,24,'#86868b',400,'center');x.textAlign='center';txt(ph>.22?p[1]:q[1],nn.x,nn.y,26,'#f5f5f7',600,'center');
  x.globalAlpha=1;
  if(STAGE==1){
   if(ph<.22){const u=ph/.22;for(let j=0;j<6;j++){const v=cl(u-j*.025);glow(L(280,330,v),376,18-j*2,'#64d2ff',.9-j*.14)}}
   for(let i=0;i<13;i++){const st=.22+i*.025,u=(ph-st)/.18;if(u>0&&u<1)for(let j=0;j<6;j++){const v=cl(u-j*.03);glow(bz(730,880,900,1030,v),bz(376,376,pos[i].y,pos[i].y,v),16-j*2,hue(i),.9-j*.14)}}
  }}
 if(m>0){x.globalAlpha=m;
  for(let i=0;i<13;i++){const a=pos[i];for(const d of[1,4]){const b=pos[(i+d)%13];x.strokeStyle='rgba(100,160,255,.14)';x.lineWidth=1.5;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}
   x.strokeStyle='rgba(100,160,255,.12)';x.beginPath();x.moveTo(a.x,a.y);x.lineTo(C.x,C.y);x.stroke()}
  pulse*=.96;glow(C.x,C.y,210+30*pulse,'rgba(41,151,255,.35)',.7+.3*Math.sin(t/700));
  x.strokeStyle='rgba(41,151,255,.6)';x.lineWidth=2;x.beginPath();x.arc(C.x,C.y,165,0,7);x.stroke();
  x.fillStyle='rgba(8,12,24,.78)';x.beginPath();x.arc(C.x,C.y,163,0,7);x.fill();
  const v=p[3],f=cl(ph/.12);x.globalAlpha=m*f;
  txt('ÜRÜN MASTER',C.x,C.y-86,24,'#86868b',600,'center');txt(p[2],C.x,C.y-38,30,'#f5f5f7',700,'center');
  if(v[9]>1){txt('1 '+v[7]+' = '+v[9]+' '+v[8],C.x,C.y+14,26,'#64d2ff',600,'center');txt('= '+fmt(v[11])+' KG',C.x,C.y+54,26,'#64d2ff',600,'center')}
  else{txt('1 '+v[7]+' = '+fmt(v[11])+' KG',C.x,C.y+14,26,'#64d2ff',600,'center');txt(v[0],C.x,C.y+54,24,'#86868b',400,'center')}
  txt(v[2]+' · '+v[12],C.x,C.y+96,24,'#86868b',400,'center');x.globalAlpha=1}
 for(let i=0;i<13;i++){const a=pos[i],st=.22+i*.025+.18,fl=STAGE==1?cl(1-(ph-st)/.15):cl(1-((ph+i*.02)%1)/.1);
  glow(a.x,a.y,26,hue(i),.25+.6*(ph>st||STAGE>1?fl:0));x.fillStyle=hue(i);x.beginPath();x.arc(a.x,a.y,7,0,7);x.fill();
  if(m<1){x.globalAlpha=1-m;const vv=STAGE==1&&ph<st?q[3][i]:p[3][i];txt(A[i],a.x+26,a.y,24,'#a1a1a6');txt(String(vv),a.x+250,a.y,26,'#f5f5f7',600);x.globalAlpha=1}}
 if(OUTON()){for(const g of gal){const an=g[1]+t*g[2];x.fillStyle='rgba(150,180,255,'+(.45*(STAGE==2?cl((t-4200)/1200):1))+')';x.beginPath();x.arc(C.x+g[0]*Math.cos(an),C.y+g[0]*Math.sin(an)*.98,1.8,0,7);x.fill()}}
 if(STAGE>1){IN.forEach((I,j)=>{const a=ea((t-(STAGE==2?1500:0)-j*200)/800);x.globalAlpha=a;const X=150-60*(1-a);
   rr(X-130,I[2]-50,260,100,22);x.fillStyle='rgba(255,255,255,.06)';x.fill();x.strokeStyle=j?'#bf5af2':'#64d2ff';x.lineWidth=2;x.stroke();
   txt(I[0],X,I[2]-14,28,'#f5f5f7',700,'center');txt(I[1],X,I[2]+22,24,'#86868b',400,'center');x.globalAlpha=1})}
 if(OUTON()){OUT.forEach((o,i)=>{const a=ea((t-(STAGE==2?4200:300)-i*140)/800),Y=C.y+(i-2.5)*112,X=1360+60*(1-a);oglow[i]*=.95;x.globalAlpha=a;
   rr(X,Y-38,300,76,20);x.fillStyle=`rgba(41,151,255,${.07+.25*oglow[i]})`;x.fill();x.strokeStyle=i==5?'#ff9f0a':'rgba(41,151,255,.8)';x.lineWidth=2;x.stroke();
   txt(o,X+150,Y,25,i==5?'#ffb340':'#f5f5f7',600,'center');x.globalAlpha=1})}
 if(t>(STAGE==2?2000:600)&&now-last>85){spawn(now);last=now}
 parts=parts.filter(z=>{z.t+=z.v*16;const u=cl(z.t);for(let j=0;j<5;j++){const v=cl(u-j*.02);glow(bz(z.a.x,z.b.x,z.c.x,z.d.x,v),bz(z.a.y,z.b.y,z.c.y,z.d.y,v),12-j*2,z.col,.85-j*.15)}
  if(z.t>=1){if(z.nx=='core'){parts.push({a:z.d,b:z.d,c:C,d:C,t:0,v:.003,col:z.col});}else if(z.o!=null)oglow[z.o]=1;else pulse=1;return false}return true});
 requestAnimationFrame(frame)}
requestAnimationFrame(frame);
