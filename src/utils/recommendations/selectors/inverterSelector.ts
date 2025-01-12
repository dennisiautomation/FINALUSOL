import { Product } from '../../../types/product';
import { SystemRequirements } from '../../../types/solar';

export function selectInverters(
  inverters: Product[],
  requirements: SystemRequirements,
  selectedPanels: Array<{ product: Product; quantity: number }>
): Array<{ product: Product; quantity: number; reason: string }> {
  const availableInverters = inverters.filter(p => p.type === 'inverter') as any[];

  if (availableInverters.length === 0 || selectedPanels.length === 0) {
    return [];
  }

  const totalPower = selectedPanels.reduce(
    (sum, { product, quantity }) => sum + (product as any).nominalPower * quantity,
    0
  ) / 1000; // Convert to kW

  // Find best matching inverter
  const selectedInverter = availableInverters.reduce((best, current) => {
    const bestDiff = Math.abs(best.maxCapacity - totalPower);
    const currentDiff = Math.abs(current.maxCapacity - totalPower);
    return currentDiff < bestDiff ? current : best;
  });

  const quantity = Math.ceil(totalPower / selectedInverter.maxCapacity);

  return [{
    product: selectedInverter,
    quantity,
    reason: `Inversor selecionado para potência total de ${totalPower.toFixed(2)}kW`
  }];
}