// // These are example conversion factors. You should replace these with accurate data for your specific process.
// const WASTE_TO_FERTILIZER_RATIO = 0.5; // 1 kg of waste produces 0.5 kg of fertilizer
// const FERTILIZER_CO2_REDUCTION = 2.5; // 1 kg of fertilizer reduces 2.5 kg of CO2 emissions

// export function calculateEnvironmentalImpact(foodWasteKg) {
//   const fertilizerProduced = foodWasteKg * WASTE_TO_FERTILIZER_RATIO;
//   const co2Reduced = fertilizerProduced * FERTILIZER_CO2_REDUCTION;

//   return {
//     fertilizerProduced: fertilizerProduced.toFixed(2),
//     co2Reduced: co2Reduced.toFixed(2),
//     wasteReduced: foodWasteKg.toFixed(2),
//   };
// }
//////////////
// These are example conversion factors. Replace with accurate data for your specific process.
const WASTE_TO_FERTILIZER_RATIO = 0.5; // 1 kg of waste produces 0.5 kg of fertilizer
const FERTILIZER_CO2_REDUCTION = 2.5; // 1 kg of fertilizer reduces 2.5 kg of CO2 emissions
const WASTE_TO_LANDFILL_EMISSIONS = 0.61; // 1 kg of food waste in landfill produces 0.61 kg CO2e
const RECYCLING_EMISSIONS_REDUCTION = 0.18; // Recycling 1 kg of food waste reduces emissions by 0.18 kg CO2e

export function calculateEnvironmentalImpact(foodWasteKg) {
  const fertilizerProduced = foodWasteKg * WASTE_TO_FERTILIZER_RATIO;
  const co2ReducedFromFertilizer =
    fertilizerProduced * FERTILIZER_CO2_REDUCTION;
  const landfillEmissionsAvoided = foodWasteKg * WASTE_TO_LANDFILL_EMISSIONS;
  const recyclingEmissionsReduced = foodWasteKg * RECYCLING_EMISSIONS_REDUCTION;
  const totalCO2Reduced =
    co2ReducedFromFertilizer +
    landfillEmissionsAvoided +
    recyclingEmissionsReduced;

  return {
    fertilizerProduced: fertilizerProduced.toFixed(2),
    co2ReducedFromFertilizer: co2ReducedFromFertilizer.toFixed(2),
    landfillEmissionsAvoided: landfillEmissionsAvoided.toFixed(2),
    recyclingEmissionsReduced: recyclingEmissionsReduced.toFixed(2),
    totalCO2Reduced: totalCO2Reduced.toFixed(2),
    wasteReduced: foodWasteKg.toFixed(2),
  };
}
