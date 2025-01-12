import { Customer } from '../../types/customer';
import { SOLAR_CONSTANTS } from '../../config/solarConstants';
import { calculateShadowLoss } from './losses';
import { validateInstallationRequirements } from './validation';

interface SystemRequirementsResult {
  systemSize: number;
  panelCount: number;
  requiredArea: number;
  roofLoad: number;
  isViable: boolean;
  limitations: string[];
}

export function calculateSystemRequirements(
  customer: Customer,
  solarIrradiation: number
): SystemRequirementsResult {
  const limitations: string[] = [];
  
  // 1. Calculate base system size
  const monthlyConsumption = customer.consumptionInfo.averageConsumption;
  const dailyConsumption = monthlyConsumption / 30;
  
  // Consider losses
  const totalLosses = calculateSystemLosses(customer);
  const adjustedEfficiency = SOLAR_CONSTANTS.PERFORMANCE_RATIO * (1 - totalLosses);
  
  // Calculate required system size with losses
  const systemSize = dailyConsumption / (solarIrradiation * adjustedEfficiency);
  
  // 2. Calculate panel requirements
  const panelCount = Math.ceil((systemSize * 1000) / SOLAR_CONSTANTS.DEFAULT_PANEL_POWER);
  const requiredArea = panelCount * SOLAR_CONSTANTS.DEFAULT_PANEL_AREA;
  
  // 3. Calculate structural requirements
  const roofLoad = calculateRoofLoad(panelCount);
  
  // 4. Validate installation requirements
  const { isViable, validationLimitations } = validateInstallationRequirements({
    customer,
    requiredArea,
    roofLoad
  });
  
  limitations.push(...validationLimitations);

  return {
    systemSize: Math.round(systemSize * 100) / 100,
    panelCount,
    requiredArea: Math.round(requiredArea * 100) / 100,
    roofLoad: Math.round(roofLoad * 100) / 100,
    isViable,
    limitations
  };
}

function calculateSystemLosses(customer: Customer): number {
  let totalLosses = 0;
  
  // Temperature losses (higher in warmer regions)
  const temperatureLoss = 0.004; // 0.4% per degree above 25°C
  
  // Shading losses based on surroundings
  const shadingLoss = calculateShadowLoss(customer.installationInfo);
  
  // Dirt and dust losses
  const soilingLoss = 0.02; // 2% standard loss
  
  // Wiring losses
  const wiringLoss = 0.02; // 2% standard loss
  
  totalLosses = temperatureLoss + shadingLoss + soilingLoss + wiringLoss;
  return Math.min(totalLosses, 0.3); // Cap at 30% total losses
}

function calculateRoofLoad(panelCount: number): number {
  const panelWeight = 25; // kg per panel
  const mountingWeight = 5; // kg per panel for mounting hardware
  const totalWeight = panelCount * (panelWeight + mountingWeight);
  return totalWeight;
}