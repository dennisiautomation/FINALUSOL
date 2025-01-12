import { SOLAR_CONSTANTS } from '../../config/solarConstants';

export function calculateFinancials(
  monthlyProduction: number,
  energyRate: number,
  systemSize: number
): {
  monthlySavings: number;
  annualSavings: number;
  paybackYears: number;
  totalInvestment: number;
} {
  // Cálculo da economia mensal
  const monthlySavings = monthlyProduction * energyRate * (1 - SOLAR_CONSTANTS.TUSD_FIO_B);
  
  // Economia anual
  const annualSavings = monthlySavings * 12;
  
  // Investimento total baseado no custo por kWp
  const totalInvestment = systemSize * SOLAR_CONSTANTS.COST_PER_KWP;
  
  // Tempo de retorno em anos
  const paybackYears = totalInvestment / annualSavings;

  return {
    monthlySavings,
    annualSavings,
    paybackYears,
    totalInvestment
  };
}