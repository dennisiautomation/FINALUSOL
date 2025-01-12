import { SOLAR_CONSTANTS } from '../../config/solarConstants';

export function calculateSystemSize(monthlyConsumption: number, solarIrradiation: number): number {
  if (!monthlyConsumption || !solarIrradiation || monthlyConsumption <= 0 || solarIrradiation <= 0) {
    return 0;
  }
  
  // Convert monthly consumption to daily
  const dailyConsumption = monthlyConsumption / 30;
  
  // Calculate required system size in kWp
  // Formula: Daily consumption / (solar irradiation * performance ratio)
  const systemSize = dailyConsumption / (solarIrradiation * SOLAR_CONSTANTS.PERFORMANCE_RATIO);
  
  return Math.max(0, Math.round(systemSize * 100) / 100);
}

export function calculateMonthlyProduction(systemSize: number, solarIrradiation: number): number {
  if (!systemSize || !solarIrradiation || systemSize <= 0 || solarIrradiation <= 0) {
    return 0;
  }
  
  // Monthly production = System size * solar irradiation * days * performance ratio
  const monthlyProduction = systemSize * solarIrradiation * 30 * SOLAR_CONSTANTS.PERFORMANCE_RATIO;
  
  return Math.max(0, Math.round(monthlyProduction * 100) / 100);
}

export function calculatePanelCount(systemSize: number): number {
  if (!systemSize || systemSize <= 0) {
    return 0;
  }
  // Convert system size from kWp to Wp and divide by panel power
  return Math.max(1, Math.ceil((systemSize * 1000) / SOLAR_CONSTANTS.DEFAULT_PANEL_POWER));
}

export function calculateArea(panelCount: number): number {
  if (!panelCount || panelCount <= 0) {
    return 0;
  }
  const area = panelCount * SOLAR_CONSTANTS.DEFAULT_PANEL_AREA;
  return Math.max(0, Math.round(area * 100) / 100);
}