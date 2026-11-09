# Araçlar · Gerçek veriyi yeniden üretmek (isteğe bağlı)

Sunumdaki rakamlar **projenin kendi hesap motorlarıyla** üretildi. Yeni bir hafta için aynı rakamları
kendin üretmek istersen bu iki script'i **asıl projenin (CEYHAN … V244) klasöründe** çalıştır.
Sunumu açmak için bunlara ihtiyacın yok.

## Hazırlık (bir kere)

Node.js 20 veya üstü gerekir.

1. Bu `tools` klasöründeki iki `.ts` dosyasını asıl projenin kök klasörüne, `tools-sunum/` adlı bir klasöre kopyala.
2. Proje klasöründe terminal aç: `npm install`

## 1) Üretim programı → depo girişi + SHD 4 kararı

```bash
npx esbuild tools-sunum/uretim-programi-analiz.ts --bundle --platform=node --format=esm --alias:@=./src --outfile=tools-out/uretim-programi-analiz.mjs
node tools-out/uretim-programi-analiz.mjs "haftalık üretim programı.xlsx" 2026-10-03T08:00 160
```

- 2. parametre: sabah sayımının tarihi-saati (boş bırakılırsa programın ilk sevkiyat günü 08:00)
- 3. parametre: o sabahki dolu yer (PLT). Verirsen SHD 4'ün açılacağı dakikayı da yazar.

Çıktı: günlük depo girişi, gece 22:00 → 08:00 girişleri, haftalık giriş/sevkiyat, **SHD 4 eşiği** ve motor uyarıları.
Kapasiteler `src/data/warehouse-capacities.json` dosyasından (Ayarlar → Depo listesi) okunur.

## 2) Depo simülasyonu rotaları

```bash
npx esbuild tools-sunum/depo-simulasyon-rotalari.ts --bundle --platform=node --format=esm --alias:@=./src --outfile=tools-out/depo-simulasyon-rotalari.mjs
node tools-out/depo-simulasyon-rotalari.mjs
```

Çıktı: her hazır senaryo için mesafe ve manuel / elektrikli / forklift operasyon süresi.

## Sunuma işlemek

Yeni rakamları sunuma koymak için ilgili animasyon dosyasındaki dizi değerlerini değiştir:
- Depo girişi: `embeds/js/depo-giris.js` → `A5`, `A1` (gece dakikaları), `DY` (günlük giriş)
- SHD doluluk: `embeds/js/shd-doluluk.js` → `SER` (saat saat doluluk), `PH` (senaryolar)
- Simülasyon: `embeds/data/kroki-soguk-depo.js` → `routes`
