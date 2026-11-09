// Sabah zinciri · SAP stok + yükleme planı → FIFO maya çıkış → güvence → çıktılar → VPM3 (31.10.2026 gerçek tablo)
// Bu dosya sunumdaki canlı animasyonun kodudur. Metinleri ve renkleri buradan değiştirebilirsin.
const W=1664,H=716,T=21000;
const OLD=["SAP’den elle parti, kg","Hesap makinesiyle palet","Excel’e elle giriş","VPM3 tablosu elle"];
const CK=["Palet · koli · kg kontrolü","Sevk yaşı ≤ raf ömrü %30","Yaşlanan stok (7+ gün)","BI & kuru maya SKT"];
const OUTS=["Maya çıkış Excel’i","Parti dağılımlı yükleme planı","Eksik ürünler","Nakildeki ürünler (LLB)","Kalite stok listesi","KTF formları"];
const IN=[[20,200,260,110,'SAP stok · 08:00','parti · kg · ÜT','#64d2ff'],[20,380,260,110,'Yükleme planı','Logistics · palet','#bf5af2']];
const FX=330,FY=170,FW=345,FH=390,OX=712,OW=352,VX=1090,VY=150,VW=554,VH=500;
const oyy=i=>244+i*56;
function curve(a,b,on,col,u){x.strokeStyle=on?col:'rgba(120,130,150,.3)';x.lineWidth=2;x.beginPath();x.moveTo(a[0],a[1]);x.bezierCurveTo((a[0]+b[0])/2,a[1],(a[0]+b[0])/2,b[1],b[0],b[1]);x.stroke();
 if(on&&u!=null&&u>=0&&u<=1)for(let j=0;j<5;j++){const v=cl(u-j*.03);glow(bz(a[0],(a[0]+b[0])/2,(a[0]+b[0])/2,b[0],v),bz(a[1],a[1],b[1],b[1],v),12-j*2,col,.9-j*.15)}}
function poly(P,on,col,u){x.save();x.setLineDash([9,8]);x.strokeStyle=on?col:'rgba(120,130,150,.3)';x.lineWidth=2;x.beginPath();P.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke();x.restore();
 if(!on||u==null||u<0||u>1)return;const L=[0];for(let i=1;i<P.length;i++)L.push(L[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));
 for(let j=0;j<5;j++){const d=cl(u-j*.02)*L[L.length-1];let i=1;while(i<P.length-1&&L[i]<d)i++;const f=(d-L[i-1])/Math.max(1,L[i]-L[i-1]);glow(L2(P[i-1][0],P[i][0],f),L2(P[i-1][1],P[i][1],f),12-j*2,col,.9-j*.15)}}
const L2=(a,b,t)=>a+(b-a)*t;
window.ANIM=()=>loop((tt,now)=>{const t=Math.min(tt,16200),fo=1;x.globalAlpha=fo;
 // ESKİDEN
 x.globalAlpha=fo;txt('ESKİDEN',42,35,22,'#86868b',700);
 OLD.forEach((s,i)=>{const on=t>300+i*600,X=150+i*320;rr(X,12,300,46,23);x.fillStyle=on?'rgba(255,159,10,.14)':'rgba(255,255,255,.05)';x.fill();x.strokeStyle=on?'#ff9f0a':'#3a3a3c';x.lineWidth=1.5;x.stroke();txt(s,X+150,35,22,on?'#ffb340':'#86868b',600,'center')});
 const hrs=cl((t-300)/2400)*2.5;txt('⏱ '+(hrs<2?hrs.toFixed(1).replace('.',',')+' sa':'2–3 sa / gün'),1644,35,26,'#ffb340',700,'right');
 x.globalAlpha=fo;x.fillStyle='#2c2c30';x.fillRect(20,76,1624,1);
 const N=t>2900;txt('ŞİMDİ',42,108,22,N?'#64d2ff':'#3a3a3c',700);
 if(N){const mm=Math.min(9,Math.floor((t-2900)/1400));txt('07:0'+mm+' · tek yükleme, tek zincir',112,108,24,'#86868b',600)}
 // inputs
 IN.forEach((b,i)=>{const on=t>3200+i*300;card(b[0],b[1],b[2],b[3],on?b[6]:'#3a3a3c',on?'rgba(41,151,255,.08)':'rgba(255,255,255,.03)');txt(b[4],b[0]+22,b[1]+40,26,on?'#f5f5f7':'#6e6e73',700);txt(b[5],b[0]+22,b[1]+76,22,on?'#a1a1a6':'#6e6e73');
  curve([b[0]+b[2],b[1]+55],[FX,FY+150+i*90],on,b[6],(t-3600-i*300)/700)});
 // FIFO
 const fOn=t>4200;if(fOn)glow(FX+FW/2,FY+FH/2,210,'rgba(41,151,255,.3)',.45+.15*Math.sin(t/220));
 card(FX,FY,FW,FH,fOn?'#2997ff':'#3a3a3c',fOn?'rgba(41,151,255,.12)':'rgba(255,255,255,.03)');
 txt('Maya çıkış · FIFO',FX+24,FY+38,28,fOn?'#f5f5f7':'#6e6e73',700);txt('Tahditsiz → Kalite → Nakil',FX+24,FY+74,22,fOn?'#a1a1a6':'#6e6e73');
 const pl=Math.round(cl((t-4400)/1600)*45);txt(pl+' PLT',FX+24,FY+128,48,fOn?'#64d2ff':'#3a3a3c',700);txt('master: kg ↔ koli ↔ palet',FX+24,FY+172,22,fOn?'#86868b':'#3a3a3c');
 txt('Güvence',FX+24,FY+214,22,t>5800?'#30d158':'#3a3a3c',700);
 CK.forEach((c,i)=>{const on=t>5800+i*350,Y=FY+250+i*36;x.fillStyle=on?'#30d158':'#3a3a3c';rr(FX+24,Y-10,20,20,5);x.fill();if(on)txt('✓',FX+34,Y,15,'#0a0a0c',800,'center');txt(c,FX+54,Y,22,on?'#c7c7cc':'#6e6e73')});
 // outputs
 txt('Çıktılar',OX,FY+18,26,t>7300?'#f5f5f7':'#3a3a3c',700);
 OUTS.forEach((o,i)=>{const on=t>7400+i*380,Y=oyy(i);curve([FX+FW,FY+FH/2],[OX-6,Y],on,'#2997ff',(t-7400-i*380)/380);
  rr(OX,Y-21,OW,42,21);x.fillStyle=on?'rgba(41,151,255,.12)':'rgba(255,255,255,.03)';x.fill();x.strokeStyle=on?(i==0?'#64d2ff':'#2997ff'):'#2c2c30';x.lineWidth=i==0&&on?2.5:1;x.stroke();
  txt((on?'✓ ':'')+o,OX+18,Y,23,on?'#f5f5f7':'#6e6e73',i==0?700:400)});
 // VPM3 card + links
 const vOn=t>9900;card(VX,VY,VW,VH,vOn?'#64d2ff':'#3a3a3c',vOn?'rgba(100,210,255,.06)':'rgba(255,255,255,.02)');
 txt('VPM3 · 08:00',VX+24,VY+38,30,vOn?'#f5f5f7':'#6e6e73',700);txt('31 Ekim 2026',VX+VW-24,VY+38,22,'#86868b',400,'right');
 const sx=IN[0][0]+IN[0][2]/2;poly([[sx,IN[0][1]],[sx,140],[VX+80,140],[VX+80,VY]],t>10100,'#64d2ff',(t-10100)/1100);
 if(t>10300){x.globalAlpha=fo*ea((t-10300)/500);rr(760,124,280,32,16);x.fillStyle='#000';x.fill();txt('aynı SAP stok dosyası',900,140,22,'#64d2ff',600,'center');x.globalAlpha=fo}
 curve([OX+OW,oyy(0)],[VX,VY+120],t>10700,'#2997ff',(t-10700)/700);
 const r1=ea((t-11000)/500),r2=ea((t-11500)/500);
 x.globalAlpha=fo*r1;txt('Yaş maya stok',VX+24,VY+88,22,'#86868b');txt('324 t',VX+24,VY+128,44,'#f5f5f7',700);x.globalAlpha=fo;
 x.globalAlpha=fo*r2;txt('Sevkiyat · 4 araç',VX+290,VY+88,22,'#86868b');txt('58,4 t',VX+290,VY+128,44,'#f5f5f7',700);x.globalAlpha=fo;
 const gy=VY+184;if(t>12000){txt('Tüm 500 g İç Pazar · 45 PLT · ÜT’den yaş',VX+24,gy,22,'#86868b');
  const n=Math.floor(cl((t-12200)/2000)*45);for(let k=0;k<n;k++){const old=k>=40,cx=VX+24+(k%15)*34,cy=gy+22+Math.floor(k/15)*34;rr(cx,cy,28,28,6);x.fillStyle=old?'#ff9f0a':'#2997ff';x.fill()}
  if(n>=45){txt('■ ≤ 3 gün: 40',VX+24,gy+146,22,'#64d2ff',600);txt('■ 4 gün: 5',VX+210,gy+146,22,'#ffb340',600)}}
 if(t>14300){const mv=ea((t-14300)/1200)*88.9;txt('Yalın metrik',VX+24,gy+196,22,'#86868b');txt('%'+mv.toFixed(1).replace('.',','),VX+24,gy+246,60,'#64d2ff',700);
  if(t>15300){x.globalAlpha=fo*ea((t-15300)/500);txt('Uygunsuz: 5 PLT',VX+290,gy+200,24,'#ffb340',700);txt('Özmaya 500 g · 4 gün',VX+290,gy+234,22,'#c7c7cc');txt('ÜT 27.10 · AL26A02831',VX+290,gy+266,22,'#86868b');x.globalAlpha=fo}}
 x.globalAlpha=1});
