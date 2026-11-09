// LESAFFRE TEMASI · Animasyonlar koyu zemin için çizildi; bu dosya her rengi Lesaffre paletine (krem zemin) çevirir.
// Her animasyon sayfasında ilk script olarak yüklenir. Bir rengi değiştirmek için aşağıdaki tabloyu düzenle:
// sol taraf koyu temadaki renk (r,g,b), sağ taraf açık temadaki karşılığı.
(function () {
  const M = {
    '245,245,247': [27, 27, 27],     // ana yazı → koyu (#1B1B1B)
    '199,199,204': [58, 58, 60],
    '161,161,166': [75, 81, 71],     // ikincil yazı (#4B5147)
    '134,134,139': [111, 102, 86],   // üçüncül yazı, sıcak gri (#6F6656)
    '110,110,115': [168, 156, 134],  // sönük yazı (#A89C86)
    '142,142,147': [138, 123, 96],   // vizon (#8A7B60)
    '58,58,60': [217, 205, 186],     // pasif çerçeve (#D9CDBA)
    '44,44,48': [230, 220, 203], '44,44,46': [230, 220, 203],
    '10,10,12': [255, 255, 255],     // koyu panel / ✓ işareti → beyaz
    '8,12,24': [255, 255, 255], '20,20,24': [255, 255, 255],
    '100,210,255': [19, 89, 117],    // camgöbeği → Lesaffre petrol (#135975) · SAP stok
    '41,151,255': [8, 58, 145],      // mavi → Lesaffre mavisi (#083A91)
    '191,90,242': [121, 28, 65],     // mor → Lesaffre bordo (#791C41) · yükleme planı
    '255,159,10': [240, 138, 0],     // turuncu → Lesaffre turuncu (#F08A00)
    '255,179,64': [179, 89, 0],      // turuncu yazı (koyu)
    '48,209,88': [84, 121, 61],      // yeşil → Lesaffre yeşil (#54793D)
    '255,69,58': [200, 16, 46],      // kırmızı
    '255,105,97': [179, 38, 30],     // kırmızı yazı
    '94,92,230': [46, 95, 181],      // çivit (araç rengi)
    '90,42,42': [232, 176, 170],
    '153,170,187': [196, 188, 175],  // arka plan noktaları (#C4BCAF)
    '100,160,255': [8, 58, 145], '120,160,255': [8, 58, 145], '150,180,255': [60, 90, 160],
    '120,130,150': [138, 123, 96], '120,120,120': [160, 150, 135], '200,210,230': [138, 123, 96]
  };
  const cache = new Map();
  function hex(h) {
    h = h.slice(1);
    if (h.length === 3 || h.length === 4) h = h.split('').map((c) => c + c).join('');
    const n = parseInt(h.slice(0, 6), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255, h.length === 8 ? parseInt(h.slice(6), 16) / 255 : 1];
  }
  function conv(v) {
    let r, g, b, a = 1, m;
    const s = v.trim().toLowerCase();
    if (s[0] === '#') [r, g, b, a] = hex(s);
    else if ((m = s.match(/^rgba?\(([^)]*)\)$/))) {
      const p = m[1].split(',').map((q) => parseFloat(q));
      [r, g, b] = p; a = p.length > 3 ? p[3] : 1;
    } else if ((m = s.match(/^hsla?\(([^,]+),([^,]+)%,([^,]+)%(?:,([^)]+))?\)$/))) {
      let l = parseFloat(m[3]); if (l > 55) l = Math.round(l * 0.6);
      return `hsla(${Math.round(parseFloat(m[1]) * 0.35 + 145)},${Math.min(parseFloat(m[2]), 80)}%,${l}%,${m[4] === undefined ? 1 : m[4]})`;
    } else return v;
    const k = r + ',' + g + ',' + b;
    let o;
    if (k === '255,255,255') { o = [255, 255, 255]; if (a < 1) a = Math.min(0.9, a * 12); } // yarı saydam panel → krem üstünde beyaz kart
    else if (k === '0,0,0') o = a === 0 ? [247, 239, 228] : [247, 239, 228]; // parıltı sonu / etiket zemini (krem)
    else if (M[k]) o = M[k];
    else {
      const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      o = lum > 0.75 ? [r * 0.6, g * 0.6, b * 0.6] : lum < 0.08 ? [247, 239, 228] : [r, g, b];
    }
    if ((k === '10,10,12' || k === '8,12,24' || k === '20,20,24') && a < 1) a = Math.min(0.95, a + 0.1);
    return `rgba(${o.map(Math.round).join(',')},${a})`;
  }
  function LC(v) {
    if (typeof v !== 'string') return v;
    let r = cache.get(v);
    if (r === undefined) { r = conv(v); cache.set(v, r); }
    return r;
  }
  const P = CanvasRenderingContext2D.prototype;
  for (const k of ['fillStyle', 'strokeStyle', 'shadowColor']) {
    const d = Object.getOwnPropertyDescriptor(P, k);
    Object.defineProperty(P, k, { get: d.get, set(v) { d.set.call(this, LC(v)); }, configurable: true });
  }
  const add = CanvasGradient.prototype.addColorStop;
  CanvasGradient.prototype.addColorStop = function (o, c) {
    let v = LC(c);
    // Büyük parıltılar (hale) açık zeminde leke gibi durmasın diye daha şeffaf çizilir; küçük parçacıklar aynı kalır.
    if (this.__halo && typeof v === 'string') v = v.replace(/,([\d.]+)\)$/, (m, a) => ',' + (parseFloat(a) * 0.35).toFixed(3) + ')');
    add.call(this, o, v);
  };
  const rad = P.createRadialGradient;
  P.createRadialGradient = function (x0, y0, r0, x1, y1, r1) { const g = rad.call(this, x0, y0, r0, x1, y1, r1); g.__halo = r1 > 40; return g; };
})();
