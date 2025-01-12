import { calculateSystemSize, calculatePanelCount, calculateArea } from '../utils/calculations/systemSize';
import { calculateSavings } from '../utils/calculations/financials';
import { calculateMonthlyProduction, calculateAnnualProduction } from '../utils/calculations/production';
import { SOLAR_CONSTANTS, ENERGY_RATES } from '../config/solarConstants';
import { ProposalCalculation, SolarSystemParams } from '../types/solar';

export class ProposalCalculator {
  calculate(params: SolarSystemParams): ProposalCalculation {
    // 1. Dimensionamento do sistema
    const systemSize = calculateSystemSize(
      params.monthlyConsumption,
      params.solarIrradiation
    );

    // 2. Cálculo de painéis e área
    const panelCount = calculatePanelCount(systemSize, params.selectedPanel?.nominalPower);
    const requiredArea = calculateArea(panelCount, params.selectedPanel?.area);

    // 3. Estimativa de produção
    const monthlyProduction = calculateMonthlyProduction(systemSize, params.solarIrradiation);
    const annualProduction = calculateAnnualProduction(monthlyProduction);

    // 4. Análise financeira
    const financials = calculateSavings({
      monthlyProduction,
      energyRate: ENERGY_RATES[params.state],
      tusdFioB: SOLAR_CONSTANTS.TUSD_FIO_B
    });

    return {
      technical: {
        systemSize,
        panelCount,
        requiredArea,
        monthlyProduction,
        annualProduction
      },
      financial: financials,
      isViable: requiredArea <= params.availableArea
    };
  }
}