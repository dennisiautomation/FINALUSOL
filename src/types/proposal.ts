export interface TechnicalSummary {
  totalPower: number;
  monthlyProduction: number;
  requiredArea: number;
  roofWeight: number;
}

export interface FinancialCalculation {
  monthlySavings: number;
  annualSavings: number;
  estimatedPayback: number;
  totalInvestment: number;
}

export interface ProposalData {
  customer: any;
  products: Array<{
    product: any;
    quantity: number;
  }>;
  technical: TechnicalSummary;
  financial: FinancialCalculation;
  date: Date;
  validityDays: number;
}