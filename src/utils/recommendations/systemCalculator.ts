import { Customer } from '../../types/customer';
import { SOLAR_CONSTANTS } from '../../config/solarConstants';
import { calculateAverageConsumption } from '../calculations/consumption';

export function calculateSystemRequirements(customer: Customer) {
  const monthlyConsumption = customer.consumptionInfo.averageConsumption || 
    calculateAverageConsumption(customer.consumptionInfo.monthlyHistory);
  const { availableArea } = customer.installationInfo;

  if (!monthlyConsumption) {
    return {
      systemSize: 0,
      panelCount: 0,
      requiredArea: 0,
      isViable: false
    };
  }

  // Cálculo da potência necessária
  const dailyConsumption = monthlyConsumption / 30;
  const systemSize = dailyConsumption / (SOLAR_CONSTANTS.AVERAGE_SUN_HOURS * SOLAR_CONSTANTS.PERFORMANCE_RATIO);
  
  // Número de painéis necessários (usando painel de 550W como referência)
  const panelCount = Math.ceil((systemSize * 1000) / SOLAR_CONSTANTS.DEFAULT_PANEL_POWER);
  
  // Área necessária
  const requiredArea = panelCount * SOLAR_CONSTANTS.DEFAULT_PANEL_AREA;

  return {
    systemSize: Math.round(systemSize * 100) / 100, // kWp
    panelCount,
    requiredArea: Math.round(requiredArea * 100) / 100,
    isViable: requiredArea <= availableArea,
    availableArea
  };
}