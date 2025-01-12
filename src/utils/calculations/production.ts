import { SOLAR_CONSTANTS } from '../../config/solarConstants';
import { ProductionEstimates } from '../../types/solar';

export function calculateProduction(
  systemSize: number,
  radiation: number,
  efficiency: number = SOLAR_CONSTANTS.SYSTEM_EFFICIENCY
): ProductionEstimates {
  const dailyProduction = systemSize * radiation * efficiency;
  const monthlyProduction = dailyProduction * 30;
  const annualProduction = monthlyProduction * 12;

  return {
    daily: Math.round(dailyProduction * 100) / 100,
    monthly: Math.round(monthlyProduction * 100) / 100,
    annual: Math.round(annualProduction * 100) / 100
  };
}