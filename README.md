# Depo Operasyon Asistanı — Sunum (Lesaffre teması)

Ceyhan Depo · Genel Müdür sunumu · 14 slayt, 11'i canlı animasyonlu. Animasyonlar bir kez oynar ve son karede durur (beyin hariç); slayta geri gelince baştan başlar.

## Lesaffre teması hakkında

Bu klasör, sunumun Lesaffre kurumsal şablonuna ("Canva ile Fikirden Etkiye") göre giydirilmiş halidir; içerik, sıra ve konuşmacı notları aynı.
- Krem zemin (#F7EFE4), bordodan turuncuya çerçeve, sağ üstte kurumsal desen, altta LESAFFRE logosu + çizgi + sayfa numarası.
- Başlıklar şablondaki gibi Roma rakamlı: I. Sabah zinciri · II. Beyin · III. Ürünün yolculuğu · IV. Pilot ve sıradaki adım · V. Misyon ve vizyon.
- Renkler: Lesaffre mavisi #083A91, turuncu #F08A00, bordo #791C41, petrol #135975, yeşil #54793D, vizon #8A7B60. Yazı tipi: Lato.
- Kapak şablondaki bölüm sayfası düzeninde: turuncu panel, mavi rozet logo, bağ manzarası.
- Logo, rozet, desen ve fotoğraf şablonun kendisinden alındı (`assets/`).
- Tema kuralları `deck.css` dosyasının sonunda; animasyon renkleri `embeds/lib/lesaffre.js` içindeki tabloda.

## VS Code'da çalıştırma

1. Zip'i aç, **`Depo-Operasyon-Asistani-Sunum`** klasörünü VS Code ile aç (*File → Open Folder*).
2. Terminali aç (*Terminal → New Terminal*) ve yaz:
   ```bash
   npm start
   ```
3. Tarayıcıda **http://localhost:5175** adresini aç. (Koyu tema 5173, açık tema 5174 portunda; hepsi aynı anda açık olabilir.)

`npm install` gerekmez; hiçbir paket kullanılmıyor. Sadece **Node.js** kurulu olmalı (nodejs.org, LTS sürümü).

**Alternatifler**
- **F5** → "Sunumu Chrome'da aç": sunucuyu başlatır ve Chrome'u açar.
- **Ctrl+Shift+B**: sadece sunucuyu başlatır.
- **Live Server** eklentisi: `index.html` → sağ tık → *Open with Live Server*.
- Port doluysa: `PORT=8080 npm start` (Windows PowerShell: `$env:PORT=8080; npm start`).

> `index.html`'e çift tıklayarak da açılır, ama animasyonların sorunsuz çalışması için sunucuyla açmanı öneririm.

## GitHub'da yayınlama (link ile paylaşma)

`.github/workflows/pages.yml` sunumu GitHub Pages'te yayınlar. Sitede sadece sunum dosyaları yer alır; `tools/`, `server.js` ve bu README yayınlanmaz.

1. GitHub'da yeni bir repo aç ve bu klasörün **içindekileri** reponun köküne yükle. `index.html` doğrudan kökte olmalı, `.github` klasörü de gelmeli. Bu klasör gizli olduğu için web'den sürükle-bırak yaparken görünmeyebilir. En kolayı GitHub Desktop ya da `git push`.
2. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. **Actions** sekmesinde "Sunumu yayınla" çalışır. Çalışmadıysa **Run workflow**'a bas. 1–2 dakika sürer.
4. Link: `https://<kullanıcı-adı>.github.io/<repo-adı>/`. Belirli bir slayt için sonuna `#6` gibi numara ekle.

Sonraki her değişiklikte dosyaları `main` dalına yüklemen yeter; site kendiliğinden güncellenir.

## Sunarken

| Tuş | İşlev |
|---|---|
| → · Boşluk · tık | Sonraki slayt |
| ← | Önceki slayt |
| **F** | Tam ekran |
| **N** | Konuşmacı notları (okuyacağın metinler) |
| Home / End | İlk / son slayt |
| R | Bu slaytın animasyonunu tekrar oynat (veya animasyonun sol üstündeki ↻ tuşu) |

Belirli bir slayttan başlamak için adresin sonuna `#6` gibi numara ekle.

## Slaytlar

| # | Slayt | Canlı | Veri kaynağı |
|---|---|---|---|
| 1 | Kapak · 2–3 sa · ≈ 0 hata · 120 bin+ satır kod | | |
| 2 | Bugünkü yol: 22 modül, tek sistem (içindekiler) | | 5 bölüm · 22 modülün haritası |
| 3 | Maya çıkış ve VPM3: tek zincir | ● | Eskiden/şimdi · 31.10.2026 VPM3 raporu |
| 4–5 | Asistanın beyni · Girdi → beyin → çıktı | ● | Ürün master |
| 6 | Maya sevk yaşı metriği | ● | Ekim 2026 KTF (882 kayıt) |
| 7 | Depo girişi: her paletin dakikası | ● | Haftalık üretim programı → motor |
| 8 | Soğuk depo doluluğu ve SHD 4 kararı | ● | Program + sevkiyat → doluluk motoru |
| 9 | Depo simülasyonu: paletten TIR'a | ● | Kroki + rota motoru |
| 10 | Yükleme planı: rota ve kontrol | ● | 17.10.2026 yükleme planı |
| 11 | Ambalaj ve satın alma kararı (pilot) | ● | ZTR_MD04 11.10.2026 |
| 12 | Sıradaki adım: insansız sabah (RPA) | ● | Güvence kapısı geçti → mailler gitti |
| 13 | Hata varsa durur, insana sorar | ● | Güvence kapısı durdu (Jidoka) |
| 14 | Misyon ve vizyon | | Bugün otomasyon · sıradaki RPA · gelecek yapay zekâ |

## Klasör yapısı

```
index.html            Bütün slaytlar (metinleri buradan düzenle; her slayt bir <section>)
deck.css · deck.js    Sunum motoru (ölçekleme, tuşlar, notlar)
server.js             Bağımlılıksız yerel sunucu
embeds/
  speed.html …        Her canlı slaydın sayfası (index.html bunları iframe ile gösterir)
  js/                 Animasyon kodları — renk, metin, rakam buradan değişir
  data/               Kroki ve harita verileri (projeden çıkarıldı)
  lib/common.js       Ortak çizim yardımcıları
tools/                (İsteğe bağlı) Gerçek veriyi projenin motorlarıyla yeniden üretme
.vscode/              F5 / Ctrl+Shift+B ayarları
```

## Düzenleme ipuçları

- **Slayt metni:** `index.html` içinde ilgili `SLAYT n` yorumunu bul.
- **Konuşmacı notu:** aynı slayttaki `<aside>…</aside>`.
- **Animasyondaki rakamlar:** `embeds/js/<dosya>.js` en üstteki diziler (ör. `depo-giris.js` → `DY`).
- **Yeni hafta verisi:** `tools/README.md`.

Inter yazı tipi internetten yüklenir; internet yoksa sistem yazı tipi kullanılır.
Sunumdaki yükleme planında şoför, telefon, plaka ve müşteri unvanı bilerek gösterilmedi.
