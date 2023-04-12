
/**
 * 
 * @param energyConsumption Ein Array aus allen Verbräuchen der drei Verbrauchsjahre für die primäre Energiequelle
 * @param additionalEnergyConsumption Ein Array aus allen Verbräuchen der drei Verbrauchsjahre für die sekundäre Energiequelle
 * @param waterHeatingPortion Der Anteil den Warmwasser am Energieverbrauch ausgemacht hat
 * @param climateFactors Ein Array aus drei Klimafaktoren für die Verbrauchsjahre
 * @param area Die Nutzfläche des Gebäudes
 * @param conversionFactor Der Umrechnungsfaktor des Energieträgers
 * @param calorificValueFactor Der Heizwertfaktor des Energieträgers
 * @returns Den Performance Wert den das Gebäude erzielt hat.
 */
export function calculateEnergyPerformanceScore(
	energyConsumption: number[],
	additionalEnergyConsumption: number[],
	waterHeatingPortion: number,
	climateFactors: number[],
	area: number,
	conversionFactor: number,
	calorificValueFactor: number
): number {
	// Alle Werte müssen in kWh umgerechnet werden.
	let energyConsumptionKWh = energyConsumption.map((x) => convertEnergyConsumptionToKWh(x, conversionFactor, calorificValueFactor))
	let additionalEnergyConsumptionKWh = additionalEnergyConsumption.map((x) => convertEnergyConsumptionToKWh(x, conversionFactor, calorificValueFactor))
	let heatingPortion = 1 - (waterHeatingPortion / 100);
	

	return (heatingPortion * (energyConsumptionKWh[0] + additionalEnergyConsumptionKWh[0]) * climateFactors[0] +
		(waterHeatingPortion / 100) * (energyConsumptionKWh[0] + additionalEnergyConsumptionKWh[0]) +
		heatingPortion * (energyConsumptionKWh[1] + additionalEnergyConsumptionKWh[1]) * climateFactors[1] +
		(waterHeatingPortion / 100) * (energyConsumptionKWh[1] + additionalEnergyConsumptionKWh[1]) +
		heatingPortion * (energyConsumptionKWh[2] + additionalEnergyConsumptionKWh[2]) * climateFactors[2] +
		(waterHeatingPortion / 100) * (energyConsumptionKWh[2] + additionalEnergyConsumptionKWh[2])) /
	3 /
	(area || 1);
}

function convertEnergyConsumptionToKWh(consumption: number, conversionFactor: number, calorificValueFactor: number): number {
 return (consumption * conversionFactor) / calorificValueFactor;
}
