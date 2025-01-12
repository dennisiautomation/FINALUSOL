import { SOLAR_CONSTANTS } from '../../config/solarConstants';
import { FinancialCalculation } from '../../types/proposal';

interface FinancialParams {
  monthlyProduction: number;
  energyRate: number;
  totalInvestment: number;
}

export function calculateFinancials(params: FinancialParams): FinancialCalculation {
  const { monthlyProduction, energyRate, totalInvestment } = params;

  // Calculate monthly savings
  const monthlySavings = monthlyProduction * energyRate * (1 - SOLAR_CONSTANTS.TUSD_FIO_B);
  
  // Calculate annual savings
  const annualSavings = monthlySavings * 12;
  
  // Calculate payback period in years
  const estimatedPayback = totalInvestment / annualSavings;

  return {
    monthlySavings,
    annualSavings,
    estimatedPayback,
    totalInvestment
  };
}