// Soğuk depo doluluğu ve SHD 4 kararı · doluluk motoru (buildStockRiskAssessment) çıktısı
// Bu dosya sunumdaki canlı animasyonun kodudur. Metinleri ve renkleri buradan değiştirebilirsin.
const W=1664,H=716,T=15600,K=KROKI,SER=[0, 1, -7, -5, -2, -1, 2, 4, 7, 8, 11, 13, 16, 17, 20, 22, 25, 26, 29, 31, 34, 35, 38, 41, 43, 45, 47, 50, 51, 53, 55, 58, 59, 61, 63, 66, 68, 70, 72, 75, 77, 79, 81, 84, 86, 88, 90, 93, 95, 97, 25, 27, 30, 31, 33, 34, 36, 37, 38, 40, 41, 42, 44, 45, 46, 47, 49, 50, 51, 52, 53, 53, 54, 55, 55, 57, 58, 60, 61, 63, 64, 66, 67, 69, 70, 72, 73, 76, 78, 78, 78, 78, 78, 78, 78, 78, 78, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 18, 19, 22, 23, 25, 27, 29, 30, 32, 34, 36, 37, 40, 42];
const k=1.296,WX=x=>20+(x+117)*k,WY=y=>40+(403-y)*k;
const CAP=[58,87,80,60],AR=['DEPO1','DEPO2','DEPO3','DEPO4'],NM=['SHD 1','SHD 2','SHD 3','SHD 4'];
const SL=[];for(let i=0;i<K.s.length;i+=5)SL.push({x:K.s[i],y:K.s[i+1],w:K.s[i+2],h:K.s[i+3],a:K.areas[K.s[i+4]]});
const BY={};AR.forEach(a=>BY[a]=SL.filter(s=>s.a==a).sort((p,q)=>p.y-q.y||p.x-q.x));
const PH=[[120,'#30d158','Zirve 217 PLT · SHD 1–3 yeter, SHD 4 kapalı'],[160,'#ff9f0a','4 Eki 01:26 → SHD 4 aç · zirve 257 PLT'],[200,'#ff453a','3 Eki 16:12 SHD 4 · 4 Eki 05:59 o da dolu → ek alan']];
const X0=660,X1=1630,Y0=500,Yt=150,px=i=>X0+i*(X1-X0)/(SER.length-1),py=v=>Y0-(Y0-Yt)*v/320;
function line(S,n,col,al,lw){x.globalAlpha=al;x.strokeStyle=col;x.lineWidth=lw;x.beginPath();for(let i=0;i<=n;i++){const X=px(i),Y=py(S+SER[i]);i?x.lineTo(X,Y):x.moveTo(X,Y)}x.stroke();x.globalAlpha=1}
window.ANIM=()=>loop((tt,now)=>{const t=Math.min(tt,T-1),ph=Math.floor(t/5200),pt=t%5200,P=PH[ph],S=P[0];
 const n=Math.floor(cl(pt/3200)*(SER.length-1)),occ=S+SER[n];
 // kroki
 x.strokeStyle='rgba(200,210,230,.5)';x.lineWidth=1.5;x.beginPath();for(let i=0;i<K.w.length;i+=4){x.moveTo(WX(K.w[i]),WY(K.w[i+1]));x.lineTo(WX(K.w[i+2]),WY(K.w[i+3]))}x.stroke();
 SL.forEach(s=>{x.fillStyle=AR.includes(s.a)?'rgba(255,255,255,.07)':'rgba(255,255,255,.035)';x.fillRect(WX(s.x)+1,WY(s.y+s.h)+1,s.w*k-2,s.h*k-2)});
 let rem=occ;const f=[];CAP.forEach((c,i)=>{const v=Math.max(0,Math.min(c,rem));f.push(v);rem-=v});const over=Math.max(0,rem);
 AR.forEach((a,i)=>{const L=BY[a],m=Math.round(f[i]/CAP[i]*L.length);for(let j=0;j<m;j++){const s=L[j];x.fillStyle=i==3?'#ff9f0a':'#2997ff';x.fillRect(WX(s.x)+1,WY(s.y+s.h)+1,s.w*k-2,s.h*k-2)}
  const c=K.c[a],on=i<3||f[3]>0;rr(WX(c[0])-62,WY(c[1])-34,124,68,14);x.fillStyle='rgba(10,10,12,.82)';x.fill();if(i==3){x.strokeStyle=on?'#ff9f0a':'#3a3a3c';x.lineWidth=2;x.stroke()}
  txt(NM[i],WX(c[0]),WY(c[1])-12,24,i==3&&!on?'#86868b':'#f5f5f7',700,'center');txt(i==3&&!on?'kapalı':Math.round(f[i])+' / '+CAP[i],WX(c[0]),WY(c[1])+16,24,i==3?(on?'#ffb340':'#86868b'):'#a1a1a6',600,'center')});
 if(over>0){const c=K.c.DEPO4;rr(WX(c[0])-74,WY(c[1])+48,148,40,20);x.fillStyle='rgba(255,69,58,.2)';x.fill();txt('+'+Math.round(over)+' PLT yer yok',WX(c[0]),WY(c[1])+68,24,'#ff6961',700,'center')}
 txt('−18 · Frigo · bekleme alanları kapsam dışı',20,700,24,'#6e6e73');
 // header
 txt('Sabah 08:00 sayımı',X0-10,40,24,'#86868b',600);txt(S+' PLT',X0-10,86,52,'#f5f5f7',700);
 txt('Dolu yer · şu an',X1,40,24,'#86868b',600,'right');txt(Math.round(occ)+' PLT',X1,86,52,occ>285?'#ff6961':occ>225?'#ffb340':'#64d2ff',700,'right');
 // chart
 x.strokeStyle='#3a3a3c';x.lineWidth=2;x.beginPath();x.moveTo(X0,Y0);x.lineTo(X1,Y0);x.stroke();
 [[225,'#ff9f0a','SHD 1–3 · 225'],[285,'#30d158','+ SHD 4 · 285']].forEach(c=>{x.setLineDash([10,8]);x.strokeStyle=c[1];x.lineWidth=2;x.beginPath();x.moveTo(X0,py(c[0]));x.lineTo(X1,py(c[0]));x.stroke();x.setLineDash([]);txt(c[2],X1,py(c[0])-20,24,c[1],600,'right')});
 ['3 Eki','4 Eki','5 Eki','6 Eki'].forEach((d,i)=>txt(d,px(i*48),Y0+28,24,'#86868b',400,'center'));
 for(let q=0;q<ph;q++)line(PH[q][0],SER.length-1,PH[q][1],.28,3);
 line(S,n,P[1],1,4);glow(px(n),py(occ),22,P[1],.9);
 const ca=ea((pt-3300)/500);if(ca>0){x.globalAlpha=ca;rr(X0-10,552,X1-X0+10,60,30);x.fillStyle='rgba(255,255,255,.06)';x.fill();x.strokeStyle=P[1];x.lineWidth=2;x.stroke();txt(P[2],(X0+X1)/2,582,26,P[1],700,'center');x.globalAlpha=1}
 txt('Eşik (bu program): ≤ 128 PLT normal · 129–188 SHD 4 · 188+ ek alan',(X0+X1)/2,660,24,'#a1a1a6',400,'center');
});
