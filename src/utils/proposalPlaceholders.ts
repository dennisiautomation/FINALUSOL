import { Customer } from '../types/customer';
import { Product } from '../types/product';
import { TechnicalSummary, FinancialCalculation } from '../types/proposal';

export const PLACEHOLDERS = {
  // Cliente
  CUSTOMER_NAME: '{{CUSTOMER_NAME}}',
  CUSTOMER_EMAIL: '{{CUSTOMER_EMAIL}}',
  CUSTOMER_PHONE: '{{CUSTOMER_PHONE}}',
  CUSTOMER_ADDRESS: '{{CUSTOMER_ADDRESS}}',
  
  // Consumo
  MONTHLY_CONSUMPTION: '{{MONTHLY_CONSUMPTION}}',
  ENERGY_RATE: '{{ENERGY_RATE}}',
  
  // Dados Técnicos
  SYSTEM_POWER: '{{SYSTEM_POWER}}',
  MONTHLY_PRODUCTION: '{{MONTHLY_PRODUCTION}}',
  REQUIRED_AREA: '{{REQUIRED_AREA}}',
  ROOF_WEIGHT: '{{ROOF_WEIGHT}}',
  
  // Dados Financeiros
  MONTHLY_SAVINGS: '{{MONTHLY_SAVINGS}}',
  ANNUAL_SAVINGS: '{{ANNUAL_SAVINGS}}',
  PAYBACK_YEARS: '{{PAYBACK_YEARS}}',
  TOTAL_INVESTMENT: '{{TOTAL_INVESTMENT}}',
  
  // Data
  CURRENT_DATE: '{{CURRENT_DATE}}',
  VALIDITY_DATE: '{{VALIDITY_DATE}}',
} as const;

interface PlaceholderData {
  customer: Customer;
  technical: TechnicalSummary;
  financial: FinancialCalculation;
  products: Array<{ product: Product; quantity: number }>;
  validityDays: number;
}

export function replacePlaceholders(content: string, data: PlaceholderData): string {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  
  const formatDate = (date: Date) => 
    new Intl.DateTimeFormat('pt-BR').format(date);

  const replacements = {
    [PLACEHOLDERS.CUSTOMER_NAME]: data.customer.name,
    [PLACEHOLDERS.CUSTOMER_EMAIL]: data.customer.email,
    [PLACEHOLDERS.CUSTOMER_PHONE]: data.customer.phone,
    [PLACEHOLDERS.CUSTOMER_ADDRESS]: `${data.customer.address.street}, ${data.customer.address.number} - ${data.customer.address.city}/${data.customer.address.state}`,
    
    [PLACEHOLDERS.MONTHLY_CONSUMPTION]: `${data.customer.consumptionInfo.averageConsumption} kWh`,
    [PLACEHOLDERS.ENERGY_RATE]: formatCurrency(data.customer.consumptionInfo.energyRate),
    
    [PLACEHOLDERS.SYSTEM_POWER]: `${data.technical.totalPower.toFixed(2)} kWp`,
    [PLACEHOLDERS.MONTHLY_PRODUCTION]: `${data.technical.monthlyProduction.toFixed(2)} kWh`,
    [PLACEHOLDERS.REQUIRED_AREA]: `${data.technical.requiredArea.toFixed(2)} m²`,
    [PLACEHOLDERS.ROOF_WEIGHT]: `${data.technical.roofWeight.toFixed(2)} kg`,
    
    [PLACEHOLDERS.MONTHLY_SAVINGS]: formatCurrency(data.financial.monthlySavings),
    [PLACEHOLDERS.ANNUAL_SAVINGS]: formatCurrency(data.financial.annualSavings),
    [PLACEHOLDERS.PAYBACK_YEARS]: `${data.financial.estimatedPayback.toFixed(1)} anos`,
    [PLACEHOLDERS.TOTAL_INVESTMENT]: formatCurrency(data.financial.totalInvestment),
    
    [PLACEHOLDERS.CURRENT_DATE]: formatDate(new Date()),
    [PLACEHOLDERS.VALIDITY_DATE]: formatDate(new Date(Date.now() + data.validityDays * 24 * 60 * 60 * 1000)),
  };

  return Object.entries(replacements).reduce(
    (text, [placeholder, value]) => text.replace(new RegExp(placeholder, 'g'), value),
    content
  );
}