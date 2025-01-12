import { SOLAR_CONSTANTS } from '../../config/solarConstants';
import { SystemRequirements } from '../../types/solar';

export function calculateSystemRequirements(
  monthlyConsumption: number,
  radiation: number,
  efficiency: number = SOLAR_CONSTANTS.SYSTEM_EFFICIENCY
): SystemRequirements {
  const dailyConsumption = monthlyConsumption / 30;
  const systemSize = dailyConsumption / (radiation * efficiency);
  
  const panelCount = Math.ceil((systemSize * 1000) / SOLAR_CONSTANTS.DEFAULT_PANEL_POWER);
  const requiredArea = panelCount * SOLAR_CONSTANTS.DEFAULT_PANEL_AREA;

  return {
    systemSize: Math.ceil(systemSize * 100) / 100,
    panelCount,
    requiredArea: Math.ceil(requiredArea * 100) / 100
  };
}