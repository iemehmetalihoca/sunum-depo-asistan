// Sıradaki adım · RPA sabah akışı (planlanan) · 1. gün geçer, 2. gün güvence kapısında durur
// Bu dosya sunumdaki canlı animasyonun kodudur. Metinleri ve renkleri buradan değiştirebilirsin.
const W=1664,H=716,T=18000,C=9000;
const CK=["Yükleme planı · palet/koli/kg","Ürün master eşleşmesi","Sevk yaşı ≤ raf ömrü %30","Dosya tarihi & kayıt sayısı"];
const OUT=[["Maya çıkış formu","→ sevkiyat ekibi"],["Eksik ürünler","→ ilgili kişiler"],["Kalite stok listesi","→ kalite departmanı"]];
const N={sap:[40,140,290,96],mail:[40,300,290,96],asi:[430,186,300,160],gate:[905,266],o:[1080,0,560,92]};
const oyy=i=>104+i*124;
function node(b,on,col,t1,t2){card(b[0],b[1],b[2],b[3],on?col:'#3a3a3c',on?'rgba(41,151,255,.10)':'rgba(255,255,255,.04)');txt(t1,b[0]+24,b[1]+b[3]/2-16,26,on?'#f5f5f7':'#a1a1a6',700);txt(t2,b[0]+24,b[1]+b[3]/2+18,24,on?'#c7c7cc':'#6e6e73')}
function link(a,b,on,col,u){x.strokeStyle=on?col:'rgba(120,130,150,.35)';x.lineWidth=2;x.beginPath();x.moveTo(a[0],a[1]);x.bezierCurveTo((a[0]+b[0])/2,a[1],(a[0]+b[0])/2,b[1],b[0],b[1]);x.stroke();
 if(on&&u!=null&&u>=0&&u<=1)for(let j=0;j<5;j++){const v=cl(u-j*.03);glow(bz(a[0],(a[0]+b[0])/2,(a[0]+b[0])/2,b[0],v),bz(a[1],a[1],b[1],b[1],v),12-j*2,col,.9-j*.15)}}
window.ANIM=()=>loop((tt,now)=>{const t=Math.min(tt,C-550),cy=FAIL?1:0,u=t,fail=FAIL,fo=1;x.globalAlpha=fo;
 const mm=Math.min(12,Math.floor(u/C*14)),clk='07:'+(mm<10?'0':'')+mm;
 // clock
 txt(clk,40,60,52,'#f5f5f7',700);txt(fail?'Sabah akışı · 2. gün':'Sabah akışı · 1. gün',215,64,24,'#86868b',600);
 const sOn=u>200,mOn=u>1300,aOn=u>2500,gOn=u>4000;
 node(N.sap,sOn,'#64d2ff','SAP','Stok Excel’ini indir');
 if(sOn){const f=cl((u-200)/900);rr(N.sap[0]+24,N.sap[1]+N.sap[3]-14,(N.sap[2]-48)*f,5,3);x.fillStyle='#64d2ff';x.fill()}
 node(N.mail,mOn,'#bf5af2','Mail','Yükleme planı ekini al');
 if(mOn){const f=cl((u-1300)/900);rr(N.mail[0]+24,N.mail[1]+N.mail[3]-14,(N.mail[2]-48)*f,5,3);x.fillStyle='#bf5af2';x.fill()}
 const A=N.asi;link([N.sap[0]+N.sap[2],N.sap[1]+48],[A[0],A[1]+50],aOn,'#64d2ff',(u-2500)/800);link([N.mail[0]+N.mail[2],N.mail[1]+48],[A[0],A[1]+110],aOn,'#bf5af2',(u-2600)/800);
 if(aOn)glow(A[0]+A[2]/2,A[1]+A[3]/2,170,'rgba(41,151,255,.35)',.5+.2*Math.sin(t/200));
 card(A[0],A[1],A[2],A[3],aOn?'#2997ff':'#3a3a3c',aOn?'rgba(41,151,255,.14)':'rgba(255,255,255,.04)');
 txt('Depo Operasyon',A[0]+A[2]/2,A[1]+48,28,aOn?'#f5f5f7':'#a1a1a6',700,'center');txt('Asistanı',A[0]+A[2]/2,A[1]+84,28,aOn?'#f5f5f7':'#a1a1a6',700,'center');
 txt(aOn?(u<4000?'çalışıyor…':'hazır'):'bekliyor',A[0]+A[2]/2,A[1]+124,24,aOn?'#64d2ff':'#6e6e73',600,'center');
 // gate
 const G=N.gate;link([A[0]+A[2],A[1]+80],[G[0]-78,G[1]],gOn,'#2997ff',(u-3800)/500);
 const nOk=fail?Math.min(1,Math.floor(cl((u-4200)/1400)*4)):Math.floor(cl((u-4200)/1400)*4.01),failed=fail&&u>4500,passed=!fail&&u>5600;
 const gc=failed?'#ff453a':passed?'#30d158':gOn?'#ff9f0a':'#3a3a3c';
 x.save();x.translate(G[0],G[1]);x.rotate(Math.PI/4);rr(-55,-55,110,110,14);x.fillStyle=failed?'rgba(255,69,58,.18)':passed?'rgba(48,209,88,.16)':'rgba(255,159,10,.10)';x.fill();x.strokeStyle=gc;x.lineWidth=3;x.stroke();x.restore();
 if(failed||passed)glow(G[0],G[1],110,gc,.35+.15*Math.sin(t/180));
 txt(failed?'DUR':passed?'GEÇTİ':'KONTROL',G[0],G[1],24,gc=='#3a3a3c'?'#6e6e73':gc,800,'center');
 txt('Güvence kapısı',G[0],G[1]+104,24,'#a1a1a6',600,'center');
 // checklist
 CK.forEach((c,i)=>{const X=40+(i%2)*470,Y=440+Math.floor(i/2)*52;let st=0;
  if(fail){if(i==0&&u>4500)st=2}else if(i<nOk)st=1;
  const col=st==1?'#30d158':st==2?'#ff453a':'#3a3a3c';rr(X,Y-16,32,32,8);x.fillStyle=st?col:'rgba(255,255,255,.05)';x.fill();x.strokeStyle=col;x.lineWidth=2;x.stroke();
  if(st)txt(st==1?'✓':'✕',X+16,Y,22,'#0a0a0c',800,'center');txt(c,X+46,Y,24,st==2?'#ff6961':st?'#f5f5f7':'#86868b',st?600:400)});
 // outputs
 OUT.forEach((o,i)=>{const Y=oyy(i),b=[N.o[0],Y,N.o[2],N.o[3]],st=u-(5600+i*500);const sent=!fail&&st>500,held=failed;
  link([G[0]+78,G[1]],[b[0],Y+46],!fail&&st>0,'#30d158',st/500);
  card(b[0],b[1],b[2],b[3],sent?'#30d158':held?'#5a2a2a':'#3a3a3c',sent?'rgba(48,209,88,.10)':'rgba(255,255,255,.04)');
  txt('✉',b[0]+30,Y+46,30,sent?'#30d158':held?'#ff6961':'#6e6e73',400,'center');
  txt(o[0],b[0]+64,Y+30,26,sent?'#f5f5f7':held?'#86868b':'#a1a1a6',700);txt(o[1],b[0]+64,Y+62,24,sent?'#c7c7cc':'#6e6e73');
  txt(sent?'gönderildi':held?'bekletildi':'',b[0]+b[2]-24,Y+46,24,sent?'#30d158':'#ff6961',600,'right')});
 // banner
 const ba=ea((u-(fail?5000:7200))/500);if(ba>0){x.globalAlpha=fo*ba;const col=fail?'#ff453a':'#30d158';rr(40,560,1600,72,36);x.fillStyle=fail?'rgba(255,69,58,.14)':'rgba(48,209,88,.12)';x.fill();x.strokeStyle=col;x.lineWidth=2;x.stroke();
  txt(fail?'Durdu: sipariş 18 PLT, araç 14 PLT → hiçbir mail gitmedi, onay için bana bildirildi':'07:12 · üç mail gitti · insan dokunmadı · her adım kayıt altında',840,596,26,fail?'#ff6961':'#30d158',700,'center');x.globalAlpha=fo}
 txt('Jidoka 自働化: hata varsa makine durur, insana sorar',840,676,24,'#86868b',400,'center');
 x.globalAlpha=1});
