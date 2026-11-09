// Animasyon ↔ sunum köprüsü. Her animasyon sayfası bunu yükler.
// postMessage kullanılır: index.html dosyaya çift tıklanarak açıldığında da çalışır.
(function(){
  const send=m=>parent.postMessage(m,'*');
  // Animasyonun içindeyken basılan tuşlar sunuma iletilir (ok tuşları çalışmaya devam eder).
  addEventListener('keydown',e=>{if(e.key.startsWith('Arrow')||e.key===' ')e.preventDefault();send({deckKey:e.key})});
  // Animasyona tıklanınca klavye odağı sunuma geri verilir.
  addEventListener('pointerdown',()=>send({deckFocus:1}));
  // Telefonda animasyonun üstünde parmakla kaydırma da slayt değiştirir.
  let tx=null,ty=null;
  addEventListener('touchstart',e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});
  addEventListener('touchend',e=>{if(tx===null)return;const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;tx=null;
    if(Math.abs(dx)>30&&Math.abs(dx)>Math.abs(dy))send({deckKey:dx<0?'ArrowRight':'ArrowLeft'})},{passive:true});
})();
