// Depo simülasyonu · calculateSimulationRoute çıktısı (4 senaryo × 3 araç)
// Bu dosya sunumdaki canlı animasyonun kodudur. Metinleri ve renkleri buradan değiştirebilirsin.
const W=1664,H=716,T=14000,K=KROKI;
const k=1.02,WX=x=>40+(x+117)*k,WY=y=>24+(403-y)*k;
const SL=[];for(let i=0;i<K.s.length;i+=5)SL.push({x:K.s[i],y:K.s[i+1],w:K.s[i+2],h:K.s[i+3]});
const R=K.routes.map(r=>{const P=r.pts.map(p=>[WX(p[0]),WY(p[1])]);let L=[0];for(let i=1;i<P.length;i++)L.push(L[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));return{...r,P,L,len:L[L.length-1]}});
const NM={F65:'SHD 3 · F65',D56:'SHD 2 · D56',B38:'SHD 1 · B38',P14:'Bekleme · P14'},COL=['#64d2ff','#5e5ce6','#bf5af2','#30d158'];
function at(r,d){for(let i=1;i<r.P.length;i++)if(d<=r.L[i]){const u=(d-r.L[i-1])/Math.max(1e-6,r.L[i]-r.L[i-1]);return[L(r.P[i-1][0],r.P[i][0],u),L(r.P[i-1][1],r.P[i][1],u)]}return r.P[r.P.length-1]}
window.ANIM=()=>loop((tt,now)=>{const t=tt%T,ph=Math.floor(t/3500),pt=t%3500,r=R[ph],c=COL[ph];
 x.strokeStyle='rgba(200,210,230,.5)';x.lineWidth=1.5;x.beginPath();for(let i=0;i<K.w.length;i+=4){x.moveTo(WX(K.w[i]),WY(K.w[i+1]));x.lineTo(WX(K.w[i+2]),WY(K.w[i+3]))}x.stroke();
 SL.forEach(s=>{x.fillStyle='rgba(120,130,150,.35)';x.fillRect(WX(s.x)+1,WY(s.y+s.h)+1,s.w*k-2,s.h*k-2)});
 const tr=K.tir;x.fillStyle='rgba(255,255,255,.08)';x.strokeStyle='#86868b';x.lineWidth=2;rr(WX(tr[0]-tr[3]/2),WY(tr[1]),tr[3]*k,(tr[1]-tr[2])*k,6);x.fill();x.stroke();txt('TIR',WX(tr[0]),WY((tr[1]+tr[2])/2),24,'#a1a1a6',700,'center');
 for(let q=0;q<ph;q++){const o=R[q];x.globalAlpha=.25;x.strokeStyle=COL[q];x.lineWidth=3;x.beginPath();o.P.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke();x.globalAlpha=1}
 const d=ea(pt/2600)*r.len;x.strokeStyle=c;x.lineWidth=5;x.beginPath();x.moveTo(r.P[0][0],r.P[0][1]);for(let i=1;i<r.P.length;i++){if(r.L[i]>d){const h=at(r,d);x.lineTo(h[0],h[1]);break}x.lineTo(r.P[i][0],r.P[i][1])}x.stroke();
 const s0=r.P[0];glow(s0[0],s0[1],26,c,.6);x.fillStyle=c;x.fillRect(s0[0]-7,s0[1]-7,14,14);
 const h=at(r,d);glow(h[0],h[1],30,'#ffffff',.5);x.fillStyle='#f5f5f7';x.beginPath();x.arc(h[0],h[1],8,0,7);x.fill();
 rr(s0[0]-60,s0[1]-56,120,40,20);x.fillStyle='rgba(10,10,12,.85)';x.fill();txt(r.id,s0[0],s0[1]-36,24,c,700,'center');
 // panel
 const PX=560;txt('Paletten TIR’a · motorun hesapladığı rota',PX,48,28,'#f5f5f7',700);txt('Dolu palet üstünden geçmez · araç genişliği + pay kontrol edilir',PX,86,24,'#86868b');
 const cols=[PX,PX+300,PX+470,PX+640,PX+830],hd=['Başlangıç','Mesafe','Manuel','Elektrikli','Forklift'];
 hd.forEach((v,i)=>txt(v,cols[i],150,24,'#86868b',600,i?'left':'left'));x.fillStyle='#2c2c30';x.fillRect(PX,172,1040,2);
 R.forEach((o,i)=>{const Y=214+i*70,on=i==ph;if(on){rr(PX-16,Y-30,1072,60,14);x.fillStyle='rgba(255,255,255,.07)';x.fill()}
  x.fillStyle=COL[i];x.beginPath();x.arc(PX+6,Y,7,0,7);x.fill();
  txt(NM[o.id],PX+24,Y,26,on?'#f5f5f7':'#a1a1a6',on?700:400);txt(o.m+' m',cols[1],Y,26,on?'#f5f5f7':'#a1a1a6',600);
  ['MANUEL_TRANSPALET','ELEKTRIKLI_TRANSPALET','FORKLIFT_REFERANS'].forEach((v,j)=>txt(o.t[v]+' sn',cols[2+j],Y,26,on?(j==1?'#64d2ff':'#f5f5f7'):'#a1a1a6',on&&j==1?700:400))});
 txt('Toplam operasyon süresi: alma + sürüş + bırakma',PX,520,24,'#86868b');
 const ca=ea((pt-2600)/400);if(ca>0){x.globalAlpha=ca;rr(PX-16,560,1072,64,32);x.fillStyle='rgba(41,151,255,.12)';x.fill();x.strokeStyle=c;x.lineWidth=2;x.stroke();
  txt(NM[r.id]+' → TIR: '+r.m+' m · elektrikli transpalet '+r.t.ELEKTRIKLI_TRANSPALET+' sn',PX+520,592,26,'#f5f5f7',700,'center');x.globalAlpha=1}
 txt('Gerçek kroki · 337 palet yeri · forklift yol ağı',PX,680,24,'#6e6e73');
});
