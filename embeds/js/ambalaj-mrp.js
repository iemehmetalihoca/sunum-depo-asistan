// Ambalaj ve satın alma · ZTR_MD04 11.10.2026 · 400013371 selüloz
// Bu dosya sunumdaki canlı animasyonun kodudur. Metinleri ve renkleri buradan değiştirebilirsin.
const W=1664,H=716,T=16000,CD=KARTON;
// --- kroki (cm/10 units, y up) ---
const KS=1.82,FW=211,FH=239,FL=[['lower','ALT KAT · 194 zemin',22],['upper','ÜST KAT · 153 zemin',22+FW*KS+26]],TOP=150;
const fx=(o,v)=>o+v*KS,fy=v=>TOP+(FH-v)*KS;
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
const FLO={};FL.forEach(f=>{const d=CD[f[0]],S=[];for(let i=0;i<d.s.length;i+=4){const o=d.s[i+2],w=o?12:10,h=o?10:12;S.push({x:d.s[i],y:d.s[i+1],w,h,z:d.z[d.s[i+3]],b:rnd()})}FLO[f[0]]=S});
const Z4=FLO.lower.filter(s=>s.z=='Z-4').sort((a,b)=>a.y-b.y||a.x-b.x);
// --- MRP: ZTR_MD04 11.10.2026 · 400013371 selüloz (kg) ---
const N=45,ESS=15000,SR=[6965, 6965, 7965, 7965, 7965, 7965, 7965, 7965, 7965, 7181, 7181, 7181, 7181, 7181, 7176, 7176, 7176, 7176, 7176, 16176, 16176, 16170, 16170, 16170, 16170, 16170, 16170, 16170, 16170, 10805, 10805, 10805, 10805, 10805, 10805, 10805, 25805, 25805, 25805, 25805, 25805, 25805, 25805, 25805, 25805, 25805],SAS=[[2,'+1 t'],[19,'+9 t'],[36,'+15 t']],LB=['11 Eki','21 Eki','31 Eki','10 Kas','20 Kas'];
window.ANIM=()=>loop((tt,now)=>{const t=Math.min(tt,T-750),fo=1;x.globalAlpha=fo;
 const day=Math.min(N,cl((t-1800)/9000)*N),di=Math.min(N,Math.floor(day)),cur=SR[di];
 // header
 txt('Karton deposu · 347 zemin · 694 PLT',44,40,26,'#f5f5f7',700);txt('Onaylı kroki · gerçek koordinatlar · 500 kg/PLT · 2 istif',44,76,24,'#86868b');
 FL.forEach(f=>{const d=CD[f[0]],o=f[2];txt(f[1],o,TOP-24,24,'#a1a1a6',600);
  if(d.v.length){x.beginPath();d.v.forEach((p,i)=>i?x.lineTo(fx(o,p[0]),fy(p[1])):x.moveTo(fx(o,p[0]),fy(p[1])));x.closePath();x.fillStyle='rgba(255,255,255,.05)';x.fill()}
  x.strokeStyle='rgba(200,210,230,.45)';x.lineWidth=1.5;x.beginPath();for(let i=0;i<d.w.length;i+=4){x.moveTo(fx(o,d.w[i]),fy(d.w[i+1]));x.lineTo(fx(o,d.w[i+2]),fy(d.w[i+3]))}x.stroke();
  const ga=ea((t-200)/1200);
  FLO[f[0]].forEach(s=>{const X=fx(o,s.x),Y=fy(s.y+s.h),w=s.w*KS-2,h=s.h*KS-2;let c='rgba(255,255,255,.07)';
   if(s.z=='Z-4')c='rgba(41,151,255,.14)';x.globalAlpha=fo*ga;x.fillStyle=c;x.fillRect(X,Y,w,h)});x.globalAlpha=fo});
 // dynamic Z-1 -> Z-6
 const plt=cur/500,need=Math.ceil(plt/2),o=FL[0][2];
 Z4.forEach((s,i)=>{if(i>=need)return;const X=fx(o,s.x),Y=fy(s.y+s.h);x.fillStyle='#2997ff';x.fillRect(X,Y,s.w*KS-2,s.h*KS-2)});
 [['Z-4',CD.lower.c['Z-4']]].forEach(z=>{rr(fx(o,z[1][0])-30,fy(z[1][1])-18,60,36,18);x.fillStyle='rgba(10,10,12,.8)';x.fill();txt(z[0],fx(o,z[1][0]),fy(z[1][1]),24,'#f5f5f7',700,'center')});
 const lx=22;x.fillStyle='#2997ff';x.fillRect(lx,TOP+FH*KS+30,18,18);txt('Selüloz · Z-4 ana alan · '+need+' / 28 zemin',lx+28,TOP+FH*KS+39,24,'#c7c7cc');
 // MRP chart
 const X0=930,X1=1600,Y0=470,Y1=160,px=d=>X0+d*(X1-X0)/N,py=v=>Y0-(Y0-Y1)*v/30000;
 txt('Günlük MRP · selüloz kağıt 500 g',X0-20,40,26,'#f5f5f7',700);txt('SAP ZTR_MD04 · 11.10.2026 · stok + SAS − ihtiyaç',X0-20,76,24,'#86868b');
 x.strokeStyle='#3a3a3c';x.lineWidth=2;x.beginPath();x.moveTo(X0-20,Y0);x.lineTo(X1+30,Y0);x.stroke();
 [0,10,20,30,40].forEach((d,i)=>txt(LB[i],px(d),Y0+28,24,'#86868b',400,'center'));
 x.setLineDash([10,8]);x.strokeStyle='#ff9f0a';x.beginPath();x.moveTo(X0-20,py(ESS));x.lineTo(X1+30,py(ESS));x.stroke();x.setLineDash([]);txt('Emniyet stoku 15 t',X0-20,py(ESS)-22,24,'#ffb340',600);
 if(day>0){const g=x.createLinearGradient(0,Y1,0,Y0);g.addColorStop(0,'rgba(41,151,255,.35)');g.addColorStop(1,'rgba(41,151,255,0)');
  x.beginPath();x.moveTo(px(0),Y0);for(let d=0;d<=di;d++)x.lineTo(px(d),py(SR[d]));x.lineTo(px(di),Y0);x.fillStyle=g;x.fill();
  x.beginPath();for(let d=0;d<=di;d++){const X=px(d),Y=py(SR[d]);d?x.lineTo(X,Y):x.moveTo(X,Y)}x.strokeStyle='#2997ff';x.lineWidth=4;x.stroke();
  SAS.forEach(s=>{if(di>=s[0]){const X=px(s[0]),Y=py(SR[s[0]]);glow(X,Y,26,'#30d158',.6);rr(X-58,Y-62,116,38,19);x.fillStyle='rgba(48,209,88,.18)';x.fill();txt('SAS '+s[1],X,Y-43,24,'#30d158',700,'center')}});
  x.strokeStyle='#ff9f0a';x.lineWidth=6;for(let d=1;d<=di;d++){if(SR[d]<ESS&&SR[d-1]<ESS){x.beginPath();x.moveTo(px(d-1),py(SR[d-1]));x.lineTo(px(d),py(SR[d]));x.stroke()}}
  const h=[px(di),py(cur)];glow(h[0],h[1],22,'#64d2ff',.9);txt((cur/1000).toFixed(1).replace('.',',')+' t',h[0]+(di>38?-14:14),h[1]+(di>38?34:-30),24,'#f5f5f7',600,di>38?'right':'left')}
 // decision
 const ca=ea((t-11000)/700);if(ca>0){x.globalAlpha=fo*ca;rr(X0-20,548,720,60,30);x.fillStyle='rgba(255,159,10,.14)';x.fill();x.strokeStyle='#ff9f0a';x.lineWidth=2;x.stroke();
  txt('11–29 Eki emniyet altında → 30 Eki SAS’ı öne çek',X0+340,578,26,'#ffb340',700,'center');
  txt('Gerçek veri · 400013371 · SAP’ye yazmaz, öneri verir',X0+340,652,24,'#86868b',400,'center')}
 const dd=new Date(Date.UTC(2026,9,11+di));txt(dd.getUTCDate()+' '+['Eki','Kas'][dd.getUTCMonth()-9],X1+30,40,26,'#64d2ff',700,'right');
 x.globalAlpha=1});
