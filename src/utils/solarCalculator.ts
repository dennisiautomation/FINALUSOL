import { SolarData, SolarSystemType } from '../types/solar';

export function calculateSystemSize(monthlyConsumption: number, solarIrradiation: number): number {
  // Convert monthly consumption to daily
  const dailyConsumption = monthlyConsumption / 30;
  
  // Calculate required system size in kWp
  // Formula: Daily consumption / (irradiation * performance ratio)
  const performanceRatio = 0.75; // System efficiency factor
  const systemSize = dailyConsumption / (solarIrradiation * performanceRatio);
  
  return Math.ceil(systemSize * 100) / 100; // Round to 2 decimal places
}

export function calculatePanelCount(systemSize: number, panelPower: number = 550): number {
  // Calculate number of panels needed
  // Formula: System size in Wp / panel power in W
  return Math.ceil((systemSize * 1000) / panelPower);
}

export function calculateArea(panelCount: number): number {
  // Average panel dimensions: 2m x 1m = 2m²
  const panelArea = 2;
  return panelCount * panelArea;
}

export function calculateSavings(
  monthlyConsumption: number,
  energyRate: number,
  systemCost: number
): {
  monthlySavings: number;
  annualSavings: number;
  paybackYears: number;
} {
  const monthlySavings = monthlyConsumption * energyRate * 0.95; // 95% efficiency
  const annualSavings = monthlySavings * 12;
  const paybackYears = systemCost / annualSavings;

  return {
    monthlySavings,
    annualSavings,
    paybackYears,
  };
}

export function estimateSystemCost(systemSize: number): number {
  // Average cost per kWp installed (including equipment and installation)
  const costPerKwp = 4500; // R$ 4.500,00 per kWp
  return systemSize * costPerKwp;
}