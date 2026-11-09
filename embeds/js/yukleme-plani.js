// Yükleme planı · 17 Ekim 2026 gerçek planı
// Bu dosya sunumdaki canlı animasyonun kodudur. Metinleri ve renkleri buradan değiştirebilirsin.
const W=1664,H=716,T=15000;
const D=BAYI_NOKTALARI;
const TR=[[26.05,40.6],[26.4,41.75],[28.0,41.98],[29.1,41.25],[30.5,41.15],[31.5,41.3],[33.3,42.0],[35.1,42.05],[36.3,41.35],[37.6,41.1],[38.6,40.95],[40.1,40.95],[41.55,41.5],[42.8,41.55],[43.5,41.0],[43.7,40.2],[44.8,39.7],[44.3,38.9],[44.25,37.9],[44.8,37.3],[43.4,37.3],[42.3,37.1],[40.8,37.1],[39.3,36.7],[38.2,36.85],[36.7,36.85],[36.55,36.2],[36.1,35.85],[35.9,36.5],[35.5,36.6],[34.6,36.8],[33.9,36.25],[32.6,36.1],[31.2,36.8],[30.5,36.35],[29.6,36.2],[28.3,36.7],[27.3,36.95],[27.1,37.7],[26.3,38.25],[26.8,38.7],[26.1,39.45],[26.2,40.05],[26.6,40.35]];
const k=63,PX=l=>20+(l-25.9)*k*.777,PY=b=>170+(42.2-b)*k;
function inP(lo,la){let c=0;for(let i=0,j=TR.length-1;i<TR.length;j=i++){const a=TR[i],b=TR[j];if((a[1]>la)!=(b[1]>la)&&lo<(b[0]-a[0])*(la-a[1])/(b[1]-a[1])+a[0])c=!c}return c}
const G=[];for(let X=20;X<960;X+=12)for(let Y=170;Y<590;Y+=12){const lo=25.9+(X-20)/(k*.777),la=42.2-(Y-170)/k;if(inP(lo,la))G.push([X,Y])}
const DP=[];for(let i=0;i<D.length;i+=2)DP.push([PX(D[i]),PY(D[i+1]),Math.random()]);
const DEP=[PX(35.80),PY(37.02)];
const V=[["Araç 1", "İzmir · Bornova", [[27.225, 38.434]], "1", "2,5", "#64d2ff", 1], ["Araç 2", "Kadirli · Çorum · Amasya · Samsun · Ünye", [[36.092, 37.363], [34.942, 40.576], [35.814, 40.618], [35.831, 40.651], [36.246, 41.339], [36.421, 41.238], [37.283, 41.126], [37.294, 41.122]], "9", "11,8", "#5e5ce6", 8], ["Araç 3", "Osmaniye · Gaziantep · Nizip · Birecik", [[36.255, 37.075], [37.43, 37.084], [37.804, 37.005], [37.983, 36.985]], "13", "16,8", "#bf5af2", 4], ["Araç 4", "Gaziantep · Vakfıkebir · Trabzon · Rize", [[37.335, 37.043], [39.277, 41.047], [39.673, 40.995], [40.531, 41.025]], "13", "17,2", "#30d158", 4]];
const R=V.map((v,i)=>{const p=[DEP,...v[2].map(q=>[PX(q[0]),PY(q[1])])],S=[];
 for(let j=0;j<p.length-1;j++){const a=p[j],b=p[j+1],dx=b[0]-a[0],dy=b[1]-a[1],m=[(a[0]+b[0])/2-dy*.18,(a[1]+b[1])/2+dx*.18];for(let s=0;s<=24;s++){const u=s/24;S.push([(1-u)*(1-u)*a[0]+2*u*(1-u)*m[0]+u*u*b[0],(1-u)*(1-u)*a[1]+2*u*(1-u)*m[1]+u*u*b[1]])}}
 return{p,S,st:2200+i*1000}});

window.ANIM=()=>loop((tt,now)=>{const t=Math.min(tt,T-750),fo=1;x.globalAlpha=fo;
 const ga=ea(t/900);for(const g of G){x.globalAlpha=fo*ga*.3;x.fillStyle='#8e8e93';x.fillRect(g[0]-1.5,g[1]-1.5,3,3)}
 DP.forEach(d=>{const a=ea((t-500-d[2]*900)/500);if(a<=0)return;x.globalAlpha=fo*a*.75;x.fillStyle='#c7c7cc';x.beginPath();x.arc(d[0],d[1],2.6,0,7);x.fill()});x.globalAlpha=fo;
 if(t>1500)txt('Müşteri master · 379 teslimat noktası',30,650,24,'#86868b',400);
 R.forEach((r,i)=>{const u=cl((t-r.st)/2000),n=Math.floor(u*(r.S.length-1));if(u<=0)return;const col=V[i][5];
  x.strokeStyle=col;x.lineWidth=3;x.globalAlpha=fo*.85;x.beginPath();for(let s=0;s<=n;s++){const q=r.S[s];s?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1])}x.stroke();x.globalAlpha=fo;
  const h=r.S[n];if(u<1)glow(h[0],h[1],22,col,.95);
  r.p.slice(1).forEach((q,j)=>{if(n>=(j+1)*25-1){glow(q[0],q[1],16,col,.5);x.fillStyle=col;x.beginPath();x.arc(q[0],q[1],6,0,7);x.fill()}})});
 glow(DEP[0],DEP[1],60+8*Math.sin(t/300),'#ffffff',.35);x.fillStyle='#f5f5f7';x.beginPath();x.arc(DEP[0],DEP[1],9,0,7);x.fill();
 if(t>1200){rr(DEP[0]-70,DEP[1]+20,140,40,20);x.fillStyle='rgba(20,20,24,.85)';x.fill();txt('Ceyhan depo',DEP[0],DEP[1]+40,24,'#f5f5f7',600,'center')}
 // panel
 card(1000,40,660,640,'#2c2c30','rgba(255,255,255,.04)');txt('17 Ekim 2026 · Cumartesi planı',1030,82,26,'#f5f5f7',700);txt('4 araç · 36 PLT · 48,4 t',1030,118,24,'#64d2ff',700);
 V.forEach((v,i)=>{const a=ea((R[i].st-t)/-600);if(a<=0)return;const Y=178+i*80;x.globalAlpha=fo*a;
  x.fillStyle=v[5];x.beginPath();x.arc(1040,Y,9,0,7);x.fill();txt(v[0]+' · '+v[6]+' teslimat',1062,Y,26,'#f5f5f7',600);txt(v[3]+' PLT · '+v[4]+' t',1634,Y,24,'#c7c7cc',600,'right');
  txt(v[1],1062,Y+32,24,'#86868b');x.globalAlpha=fo});
 const ka=ea((t-7800)/700);if(ka>0){x.globalAlpha=fo*ka;rr(1030,506,600,150,20);x.fillStyle='rgba(255,159,10,.12)';x.fill();x.strokeStyle='#ff9f0a';x.lineWidth=2;x.stroke();
  txt('Kontrol bekleyen',1056,540,24,'#ffb340',700);txt('İzmir müşterisi · Özmaya 500 g · 18 PLT',1056,578,24,'#f5f5f7',600);
  txt('En büyük uygun araç 14 PLT → kontrollü split',1056,616,24,'#c7c7cc');x.globalAlpha=fo}
 x.globalAlpha=1});
