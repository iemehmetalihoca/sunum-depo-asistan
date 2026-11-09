/**
 * Üretim programı → depo girişi + soğuk depo doluluğu (SHD 4 kararı)
 * Projenin KENDİ motorlarını çalıştırır: readWeeklyProductionProgram, buildWarehouseStockProjection, buildStockRiskAssessment.
 *
 * Kullanım (proje klasöründe, npm install yapılmışken) — README'ye bak:
 *   node tools-out/uretim-programi-analiz.mjs <program.xlsx> [referans ISO, örn 2026-10-03T08:00] [sabah dolu yer, örn 160]
 */
import fs from "node:fs";
import { readWeeklyProductionProgram, listWeeklyProductionProgramSheets } from "@/features/excel/readWeeklyProductionProgram";
import { buildWarehouseStockProjection, ALL_PROGRAM_PRODUCTS } from "@/features/production-program/buildWarehouseStockProjection";
import { buildStockRiskAssessment } from "@/features/production-program/buildStockRiskAssessment";
import products from "@/data/products.json";
import capacities from "@/data/warehouse-capacities.json";

const [, , xlsxPath, refArg, slotsArg] = process.argv;
if (!xlsxPath) { console.error("Kullanım: node uretim-programi-analiz.mjs <program.xlsx> [2026-10-03T08:00] [160]"); process.exit(1); }

const cap = (name: string) => Number((capacities as any[]).find((c) => c.area === name)?.capacityPallet ?? 0);
const NORMAL = cap("SHD 1") + cap("SHD 2") + cap("SHD 3");
const BUFFER = cap("SHD 4");

const file = new File([fs.readFileSync(xlsxPath)], xlsxPath.split(/[\\/]/).pop() || "program.xlsx");
const sheets = await listWeeklyProductionProgramSheets(file, products as any);
const sheetName = (sheets[0] as any)?.sheetName ?? (sheets[0] as any)?.name;
const a = await readWeeklyProductionProgram(file, sheetName, products as any, 0);

// 1) Günlük depo girişi (palet)
const daily = new Map<string, { g500: number; g1kg: number }>();
for (const b of a.inboundBuckets) {
  const d = b.warehouseAvailableIso.slice(0, 10);
  const row = daily.get(d) ?? { g500: 0, g1kg: 0 };
  if (b.lineText.startsWith("1 kg")) row.g1kg += b.palletEquivalent; else row.g500 += b.palletEquivalent;
  daily.set(d, row);
}
console.log("\n== Günlük depo girişi (PLT) ==");
for (const [d, r] of [...daily].sort()) console.log(d, "500 g:", r.g500.toFixed(1), " 1 kg:", r.g1kg.toFixed(1), " toplam:", (r.g500 + r.g1kg).toFixed(1));

// 2) Gece 22:00 → 08:00 girişleri
console.log("\n== Gece girişi (önceki gün 22:00 → 08:00) ==");
for (const d of [...daily.keys()].sort()) {
  const prev = new Date(Date.parse(d + "T00:00:00Z") - 86400000).toISOString().slice(0, 10);
  const nb = a.inboundBuckets.filter((b) => b.warehouseAvailableIso >= `${prev}T22:00` && b.warehouseAvailableIso <= `${d}T08:00`);
  const g5 = nb.filter((b) => !b.lineText.startsWith("1 kg")).reduce((s, b) => s + b.palletEquivalent, 0);
  const g1 = nb.filter((b) => b.lineText.startsWith("1 kg")).reduce((s, b) => s + b.palletEquivalent, 0);
  if (g5 || g1) console.log(d, "08:00'e kadar → 500 g:", g5.toFixed(0), " 1 kg:", g1.toFixed(0));
}

// 3) Doluluk ve SHD 4 kararı
const ref = refArg || (a.demandRows[0] ? `${a.demandRows[0].dateIso}T08:00` : "");
const proj = buildWarehouseStockProjection({ analysis: a, products: products as any, baseline: { mode: "MANUAL", referenceIso: ref, manualTotalKg: 1 }, selectedMaterialCode: ALL_PROGRAM_PRODUCTS });
const run = (s: number) => buildStockRiskAssessment({ projection: proj, analysis: a, products: products as any, settings: { missingUnknownPallets: 0, delayUnknownHours: 0, initialOccupiedSlots: s, warehouseCapacitySlots: NORMAL } });
const z = run(0).occupied;
const peakDelta = z.peakSlots ?? 0;
console.log(`\n== Doluluk (referans ${ref}) ==`);
console.log(`Kapasite: SHD 1–3 = ${NORMAL} PLT, SHD 4 buffer = ${BUFFER} PLT`);
console.log(`Hafta: giriş ${z.totalInboundSlots} yer, sevkiyat ${z.totalOutboundSlots} yer, sabaha göre zirve +${peakDelta}`);
console.log(`Eşik: sabah ≤ ${NORMAL - peakDelta} PLT → SHD 1–3 yeter · ${NORMAL - peakDelta + 1}–${NORMAL + BUFFER - peakDelta} → SHD 4 · üstü → ek alan`);
if (slotsArg) {
  const r = run(Number(slotsArg)).occupied;
  const r2 = buildStockRiskAssessment({ projection: proj, analysis: a, products: products as any, settings: { missingUnknownPallets: 0, delayUnknownHours: 0, initialOccupiedSlots: Number(slotsArg), warehouseCapacitySlots: NORMAL + BUFFER } }).occupied;
  console.log(`Sabah ${slotsArg} PLT → zirve ${r.peakSlots} · SHD 4 açılış: ${r.firstOverCapacityIso ?? "gerekmez"} · SHD 4 de dolu: ${r2.firstOverCapacityIso ?? "hayır"}`);
}
console.log("\n== Motor uyarıları ==");
for (const w of a.warnings) console.log("-", w);
