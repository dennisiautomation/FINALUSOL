export interface SystemRequirements {
  systemSize: number;    // in kWp
  panelCount: number;    // number of panels needed
  requiredArea: number;  // in m²
}

export interface ProductionEstimates {
  daily: number;    // kWh/day
  monthly: number;  // kWh/month
  annual: number;   // kWh/year
}

export interface FinancialAnalysis {
  monthlySavings: number;    // R$/month
  annualSavings: number;     // R$/year
  totalInvestment: number;   // R$
  paybackYears: number;      // years
}

export interface SolarCalculation {
  location: Location;
  radiation: number;
  systemRequirements: SystemRequirements;
  production: ProductionEstimates;
  financials: FinancialAnalysis;
  isViable: boolean;
}