import { Customer } from '../types/customer';
import { Product } from '../types/product';
import { TechnicalSummary, FinancialCalculation } from '../types/proposal';

export function calculateTechnicalSummary(
  customer: Customer,
  products: Array<{ product: Product; quantity: number }>
): TechnicalSummary {
  // Cálculo da potência total
  const totalPower = products
    .filter(({ product }) => product.type === 'solar_panel')
    .reduce((sum, { product, quantity }) => {
      return sum + (product as any).nominalPower * quantity;
    }, 0);

  // Cálculo da produção mensal estimada (kWh)
  // Usando média de 4.5 horas de sol pico por dia
  const monthlyProduction = totalPower * 4.5 * 30 * 0.8; // 80% de eficiência do sistema

  // Cálculo da área necessária
  const requiredArea = products
    .filter(({ product }) => product.type === 'solar_panel')
    .reduce((sum, { product, quantity }) => {
      return sum + (product as any).area * quantity;
    }, 0);

  // Cálculo do peso total no telhado
  const roofWeight = products.reduce((sum, { product, quantity }) => {
    return sum + ((product as any).weight || 0) * quantity;
  }, 0);

  return {
    totalPower,
    monthlyProduction,
    requiredArea,
    roofWeight,
  };
}

export function calculateFinancials(
  customer: Customer,
  products: Array<{ product: Product; quantity: number }>,
  technicalSummary: TechnicalSummary
): FinancialCalculation {
  // Cálculo do investimento total
  const totalInvestment = products.reduce((sum, { product, quantity }) => {
    return sum + product.price * quantity;
  }, 0);

  // Tarifa média de energia (R$/kWh) - pode ser personalizado por região
  const averageEnergyRate = 0.85;

  // Economia mensal
  const monthlySavings = technicalSummary.monthlyProduction * averageEnergyRate;

  // Economia anual
  const annualSavings = monthlySavings * 12;

  // Payback estimado em anos
  const estimatedPayback = totalInvestment / annualSavings;

  return {
    monthlySavings,
    annualSavings,
    estimatedPayback,
    totalInvestment,
  };
}