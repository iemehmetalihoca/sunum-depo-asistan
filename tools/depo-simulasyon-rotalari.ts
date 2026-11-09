/**
 * Depo simülasyonu: hazır senaryolar için rota mesafesi ve araç tipine göre süre.
 * Projenin KENDİ motoru: calculateSimulationRoute (15 · Depo Simülasyonu).
 * Kullanım: node tools-out/depo-simulasyon-rotalari.mjs
 */
import { calculateSimulationRoute, simulationScenarios, vehicleProfiles } from "@/components/simulation/warehouseSimulationEngine";

for (const s of simulationScenarios) {
  const cols = vehicleProfiles.map((v) => {
    const r = calculateSimulationRoute(s.start_location_id, s.end_location_id, v.id);
    return r.ok ? `${v.name}: ${Math.round(r.operationSeconds)} sn` : `${v.name}: ${r.message}`;
  });
  const first = calculateSimulationRoute(s.start_location_id, s.end_location_id, vehicleProfiles[0].id);
  console.log(`${s.name} · ${Math.round(first.distanceCm / 100)} m  |  ${cols.join("  |  ")}`);
}
