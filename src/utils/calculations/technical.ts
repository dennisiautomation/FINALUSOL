import { Product } from '../../types/product';
import { TechnicalSummary } from '../../types/proposal';
import { calculateMonthlyProduction } from './systemSize';
import { SOLAR_CONSTANTS } from '../../config/solarConstants';

interface SolarPanel extends Product {
  nominalPower: number;
  area: number;
  weight: number;
}

export function calculateTechnicalSummary(
  selectedProducts: Array<{ product: Product; quantity: number }>,
  solarIrradiation: number = SOLAR_CONSTANTS.AVERAGE_SUN_HOURS
): TechnicalSummary {
  // Calculate total power from solar panels
  const totalPower = selectedProducts
    .filter(({ product }): product is SolarPanel => 
      product.type === 'solar_panel' && 
      'nominalPower' in product
    )
    .reduce((sum, { product, quantity }) => 
      sum + (product.nominalPower * quantity) / 1000, 0); // Convert W to kWp

  // Calculate monthly production using location-specific irradiation
  const monthlyProduction = calculateMonthlyProduction(totalPower, solarIrradiation);

  // Calculate required area
  const requiredArea = selectedProducts
    .filter(({ product }): product is SolarPanel => 
      product.type === 'solar_panel' && 
      'area' in product
    )
    .reduce((sum, { product, quantity }) => 
      sum + (product.area * quantity), 0);

  // Calculate total weight on roof
  const roofWeight = selectedProducts
    .filter(({ product }): product is SolarPanel => 
      product.type === 'solar_panel' && 
      'weight' in product
    )
    .reduce((sum, { product, quantity }) => 
      sum + (product.weight * quantity), 0);

  return {
    totalPower: Math.round(totalPower * 100) / 100,
    monthlyProduction: Math.round(monthlyProduction * 100) / 100,
    requiredArea: Math.round(requiredArea * 100) / 100,
    roofWeight: Math.round(roofWeight * 100) / 100
  };
}