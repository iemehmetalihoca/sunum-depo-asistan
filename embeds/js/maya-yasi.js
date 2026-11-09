// Maya sevk yaşı metriği · Ekim 2026 KTF (882 kayıt) · Tüm 500 İç Pazar %83,9
// Bu dosya sunumdaki canlı animasyonun kodudur. Metinleri ve renkleri buradan değiştirebilirsin.
const W=1664,H=716,T=14000;
const BK=[["≤1 gün",238908,1],["2 gün",625764,1],["3 gün",823668,1],["4 gün",291504,0],["5+ gün",32784,0]];
const GR=[["500 Kanban · İç",84.5,0],["500 diğer · İç",79.0,0],["Tüm 500 · İç",83.9,1],["500 + 1000",76.0,0],["Tüm TR1P",71.5,0]];
const RW=[["Hasmaya 24x500g",2],["Lesafmaya Yaş Maya 500g",2],["Hasmaya 24x500g",4],["Özmaya Yaş Maya 500g",3],["Yuva 500g POPP",7],["Özmaya Yeşil 500g",2],["Özmaya Hızlı 500g",3],["Hasmaya 24x500g",1],["Lesafmaya Yaş Maya 500g",3],["Özmaya Mayazim Plus",2],["Özmaya Yaş Maya 500g",5],["Lesafmaya Yaş Maya 500g",1]];
const MET=83.9,TOT=BK.reduce((a,b)=>a+b[1],0),MX=823668;
const bx=i=>520+i*108;let last=0;
window.ANIM=()=>loop((tt,now)=>{const t=Math.min(tt,T-650),fo=1;x.globalAlpha=1;
 // file card
 card(40,60,330,596,'#64d2ff');txt('KTF.xlsx',70,106,30,'#f5f5f7',700);txt('Ekim 2026 · 882 kayıt',70,146,24,'#86868b');
 x.save();rr(50,182,310,464,12);x.clip();const sc=(t/1100)%RW.length;
 for(let k=0;k<11;k++){const i=Math.floor(sc)+k,y=214+(k-(sc%1))*52,r=RW[i%RW.length];const n=r[0].length>17?r[0].slice(0,16)+'…':r[0];
  txt(n,70,y,24,'#c7c7cc');txt(r[1]+' g',340,y,24,r[1]<=3?'#64d2ff':'#ff9f0a',700,'right')}x.restore();
 // particles
 if(t<7000&&now-last>70){last=now;let r=Math.random()*TOT,b=0;while(r>BK[b][1]){r-=BK[b][1];b++}
  const y0=200+Math.random()*420,X=bx(b)+40,hh=380*BK[b][1]/MX*ea(t/7000);parts.push({a:{x:370,y:y0},b:{x:450,y:y0},c:{x:X,y:150},d:{x:X,y:600-hh},t:0,v:.0016,col:BK[b][2]?'#2997ff':'#ff9f0a'})}
 // buckets
 const gp=ea((t-300)/6700);x.globalAlpha=fo;
 x.strokeStyle='rgba(41,151,255,.8)';x.lineWidth=2;x.beginPath();x.moveTo(bx(0),132);x.lineTo(bx(2)+80,132);x.stroke();txt('0–3 gün · uygun',(bx(0)+bx(2)+80)/2,104,24,'#64d2ff',600,'center');
 x.strokeStyle='rgba(255,159,10,.8)';x.beginPath();x.moveTo(bx(3),132);x.lineTo(bx(4)+80,132);x.stroke();txt('3+ · dışı',(bx(3)+bx(4)+80)/2,104,24,'#ffb340',600,'center');
 BK.forEach((k,i)=>{const h=380*k[1]/MX*gp,X=bx(i);const g=x.createLinearGradient(0,600-h,0,600);g.addColorStop(0,k[2]?'#2997ff':'#ff9f0a');g.addColorStop(1,k[2]?'rgba(41,151,255,.25)':'rgba(255,159,10,.25)');
  rr(X,600-h,80,Math.max(h,1),10);x.fillStyle=g;x.fill();txt(k[0],X+40,632,24,'#a1a1a6',400,'center');if(gp>.98)txt(Math.round(k[1]/1000)+' t',X+40,600-h-22,24,'#f5f5f7',600,'center')});
 x.strokeStyle='#3a3a3c';x.beginPath();x.moveTo(500,600);x.lineTo(1060,600);x.stroke();
 // gauge
 const C={x:1380,y:286},gv=ea((t-7000)/1800)*MET;
 x.lineWidth=24;x.lineCap='round';x.strokeStyle='rgba(255,255,255,.08)';x.beginPath();x.arc(C.x,C.y,140,0,7);x.stroke();
 if(gv>0){const g=x.createLinearGradient(C.x-140,0,C.x+140,0);g.addColorStop(0,'#64d2ff');g.addColorStop(1,'#bf5af2');x.strokeStyle=g;x.beginPath();x.arc(C.x,C.y,140,-Math.PI/2,-Math.PI/2+gv/100*6.283);x.stroke()}
 x.lineCap='butt';txt('Tüm 500 · İç Pazar',C.x,C.y-50,24,'#86868b',400,'center');txt('%'+gv.toFixed(1).replace('.',','),C.x,C.y+6,60,'#f5f5f7',700,'center');
 txt('Ekim · yalın metrik',C.x,C.y+56,24,'#86868b',400,'center');
 if(t>8600)txt('Ort. sevk yaşı 2,63 gün',C.x,470,26,'#f5f5f7',600,'center');
 // groups
 if(t>9000){txt('5 metrik grubu',1180,526,24,'#86868b',600);GR.forEach((g,i)=>{const a=ea((t-9000-i*200)/700),Y=562+i*32;x.globalAlpha=fo*a;
  txt(g[0],1180,Y,24,g[2]?'#f5f5f7':'#a1a1a6',g[2]?700:400);rr(1400,Y-7,170,14,7);x.fillStyle='rgba(255,255,255,.08)';x.fill();
  rr(1400,Y-7,Math.max(1,170*g[1]/100*a),14,7);x.fillStyle=g[2]?'#64d2ff':'#2997ff';x.fill();txt(g[1].toFixed(1).replace('.',','),1640,Y,24,g[2]?'#f5f5f7':'#a1a1a6',600,'right');x.globalAlpha=fo})}
 x.globalAlpha=1});
