// Sunum motoru: 1920×1080 slaytları ekrana sığdırır, tuşlarla ilerletir,
// sadece görünen slaydın animasyonunu çalıştırır (diğerleri durur, performans için).
const slides = [...document.querySelectorAll('#stage > section')];
const stage = document.getElementById('stage');
const num = document.getElementById('num');
const notes = document.getElementById('notes');
const notesText = document.getElementById('notesText');
let cur = 0;

function fit() {
  const s = Math.min(innerWidth / 1920, innerHeight / 1080);
  stage.style.transform = `translate(-50%, -50%) scale(${s})`;
}
addEventListener('resize', fit);
fit();

function show(i) {
  i = Math.max(0, Math.min(slides.length - 1, i));
  slides.forEach((sl, k) => {
    sl.classList.toggle('active', k === i);
    sl.querySelectorAll('iframe.embed').forEach((f) => {
      if (k === i) f.src = f.dataset.src + '?t=' + Date.now(); // animasyonu baştan başlat
      else if (f.getAttribute('src')) f.removeAttribute('src');  // görünmeyeni durdur
    });
  });
  cur = i;
  reclaimFocus();
  num.textContent = (i + 1) + ' / ' + slides.length;
  const a = slides[i].querySelector('aside');
  notesText.textContent = a ? a.textContent : '';
  history.replaceState(null, '', '#' + (i + 1));
}

function key(k, e) {
  if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(k)) { e && e.preventDefault(); show(cur + 1); }
  else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k)) { e && e.preventDefault(); show(cur - 1); }
  else if (k === 'Home') show(0);
  else if (k === 'End') show(slides.length - 1);
  else if (k === 'r' || k === 'R') show(cur);                      // animasyonu tekrar oynat
  else if (k === 'n' || k === 'N') notes.hidden = !notes.hidden;   // konuşmacı notları
  else if (k === 'f' || k === 'F') {                                // tam ekran
    document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
  }
}
addEventListener('keydown', (e) => key(e.key, e));

// Klavye odağı hep sunumda kalsın: animasyona (iframe) tıklanınca odak oraya kaçıyor ve
// ok tuşları çalışmaz hale geliyordu. Odak bir animasyona geçer geçmez sunuma geri alınır.
function reclaimFocus() {
  const a = document.activeElement;
  if (a && a.tagName === 'IFRAME') { a.blur(); window.focus(); }
}
addEventListener('blur', () => setTimeout(reclaimFocus, 0));
// Yedek yol: animasyonun içinden gelen tuşlar (dosya çift tıkla açıldığında da çalışır).
addEventListener('message', (e) => {
  const d = e.data;
  if (d && d.deckKey) key(d.deckKey);
  else if (d && d.deckFocus) reclaimFocus();
});
// Ekranın sol çeyreğine tıklama geri, geri kalanı ileri
addEventListener('click', (e) => { if (!notes.contains(e.target)) show(e.clientX < innerWidth / 4 ? cur - 1 : cur + 1); });

show((parseInt(location.hash.slice(1)) || 1) - 1);
