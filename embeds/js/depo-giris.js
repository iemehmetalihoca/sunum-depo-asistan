// Depo girişi · gerçek üretim programı motor çıktısı (2→3 Ekim gecesi + günlük giriş)
// Bu dosya sunumdaki canlı animasyonun kodudur. Metinleri ve renkleri buradan değiştirebilirsin.
const W=1664,H=716,T=14000;
const A5=[5, 25, 45, 64, 84, 104, 124, 143, 163, 183, 203, 222, 242, 262, 282, 301, 321, 341, 361, 380, 400, 420, 440, 459, 479, 499, 519, 599],A1=[48, 144, 240],DY=[["30.09", 48, 8], ["01.10", 58, 15], ["02.10", 57, 15], ["03.10", 70, 24], ["04.10", 65, 15], ["05.10", 14, 0], ["06.10", 70, 14], ["07.10", 56, 15], ["08.10", 0, 11]];
const MC=[["M1","KANBAN",1,100],["M2","KANBAN",1,190],["VERPA","boşta",0,280],["1 KG","Almarai",2,470]];
let c5=0,c1=0,a5=0,a1=0;
window.ANIM=()=>loop((tt,now)=>{const t=Math.min(tt,T-650),fo=1;if(t<60){c5=0;c1=0;a5=0;a1=0;parts=[]}
 const mins=600*cl(t/6500),n5=A5.filter(m=>m<=mins).length,n1=A1.filter(m=>m<=mins).length;
 const R5={x:460,y:190},R1={x:460,y:470};
 MC.forEach(m=>{const on=m[2]>0,col=m[2]==2?'#bf5af2':'#64d2ff';if(on)glow(160,m[3],90,col,.12+.08*Math.sin(t/300+m[3]));
  card(30,m[3]-38,260,76,on?col:'#3a3a3c');txt(m[0],52,m[3],28,on?'#f5f5f7':'#6e6e73',700);txt(m[1],270,m[3],24,on?'#a1a1a6':'#6e6e73',400,'right');
  const R=m[2]==2?R1:R5;x.strokeStyle=on?'rgba(120,160,255,.35)':'rgba(120,120,120,.2)';x.lineWidth=2;x.beginPath();x.moveTo(290,m[3]);x.bezierCurveTo(330,m[3],330,R.y,R.x-100,R.y);x.stroke();
  if(on&&t<6500){const u=((t/900)+m[3]/97)%1;glow(bz(290,330,330,R.x-100,u),bz(m[3],m[3],R.y,R.y,u),12,col,.9)}});
 [[R5,'500 g robot','#64d2ff'],[R1,'1 kg robot','#bf5af2']].forEach(r=>{card(r[0].x-100,r[0].y-36,200,72,r[2],'rgba(41,151,255,.1)');txt(r[1],r[0].x,r[0].y,26,'#f5f5f7',600,'center')});
 card(610,70,290,600,'#2997ff','rgba(41,151,255,.06)');
 const hm=(22*60+Math.floor(mins))%1440,hh=Math.floor(hm/60),mm=hm%60;txt((hh<10?'0':'')+hh+':'+(mm<10?'0':'')+mm,755,122,44,'#f5f5f7',700,'center');txt('2 → 3 Ekim gecesi',755,168,24,'#86868b',400,'center');
 while(c5<n5){c5++;const k=c5-1;parts.push({a:{x:R5.x+100,y:R5.y},b:{x:590,y:R5.y},c:{x:590,y:230},d:{x:640+(k%8)*30+11,y:230+Math.floor(k/8)*30+11},t:0,v:.004,col:'#2997ff',sq:1,done:()=>a5++})}
 while(c1<n1){c1++;const k=c1-1;parts.push({a:{x:R1.x+100,y:R1.y},b:{x:590,y:R1.y},c:{x:590,y:470},d:{x:640+(k%8)*30+11,y:470+Math.floor(k/8)*30+11},t:0,v:.004,col:'#bf5af2',sq:1,done:()=>a1++})}
 for(let k=0;k<a5;k++){x.fillStyle='#2997ff';x.fillRect(640+(k%8)*30+2,230+Math.floor(k/8)*30+2,18,18)}
 for(let k=0;k<a1;k++){x.fillStyle='#bf5af2';x.fillRect(640+(k%8)*30+2,470+Math.floor(k/8)*30+2,18,18)}
 txt('500 g · '+n5+' PLT',755,382,26,'#64d2ff',700,'center');txt('1 kg · '+n1+' PLT',755,530,26,'#bf5af2',700,'center');
 if(mins>=599)txt('08:00 · 31 PLT hazır',755,620,24,'#30d158',600,'center');
 x.globalAlpha=fo;txt('Program haftası · günlük depo girişi',980,96,28,'#f5f5f7',700);txt('PLT',1630,96,24,'#6e6e73',400,'right');
 const X0=1000,X1=1630,Y0=510,Yt=170,n=DY.length,bw=(X1-X0)/n,MX=100,py=v=>Y0-(Y0-Yt)*v/MX;
 x.strokeStyle='#3a3a3c';x.lineWidth=2;x.beginPath();x.moveTo(X0,Y0);x.lineTo(X1,Y0);x.stroke();
 DY.forEach((d,i)=>{const a=ea((t-6600-i*160)/700),X=X0+i*bw+10,w=bw-20,h5=(Y0-py(d[1]))*a,h1=(Y0-py(d[2]))*a;
  txt(d[0],X+w/2,Y0+28,24,'#86868b',400,'center');if(a<=0)return;
  rr(X,Y0-h5,w,Math.max(h5,1),6);x.fillStyle='#2997ff';x.fill();if(h1>0){rr(X,Y0-h5-h1-3,w,Math.max(h1,1),6);x.fillStyle='#bf5af2';x.fill()}
  if(a>.95)txt(String(d[1]+d[2]),X+w/2,Y0-h5-h1-24,24,'#f5f5f7',600,'center');
  if(i==3&&a>.95){x.strokeStyle='#30d158';x.lineWidth=2;rr(X-4,Y0-h5-h1-42,w+8,h5+h1+46,8);x.stroke()}});
 x.fillStyle='#2997ff';x.fillRect(1000,590,18,18);txt('500 g',1026,599,24,'#c7c7cc');x.fillStyle='#bf5af2';x.fillRect(1120,590,18,18);txt('1 kg',1146,599,24,'#c7c7cc');txt('motor çıktısı · gerçek program',1630,599,24,'#6e6e73',400,'right');
 const ca=ea((t-9800)/700);if(ca>0){x.globalAlpha=ca*fo;rr(1000,638,630,60,30);x.fillStyle='rgba(255,159,10,.14)';x.fill();x.strokeStyle='#ff9f0a';x.lineWidth=2;x.stroke();
  txt('Kontrol: “KANBAN 30” hıza sığmıyor → +53 dk',1315,668,24,'#ffb340',700,'center')}
 x.globalAlpha=1});
