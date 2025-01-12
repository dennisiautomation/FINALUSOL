import { Product } from '../../../types/product';
import { SystemRequirements } from '../../../types/solar';

export function selectCables(
  cables: Product[],
  requirements: SystemRequirements
): Array<{ product: Product; quantity: number; reason: string }> {
  const availableCables = cables.filter(p => p.type === 'cables') as any[];

  if (availableCables.length === 0) {
    return [];
  }

  // Estimate cable length based on area
  const estimatedLength = Math.sqrt(requirements.requiredArea) * 2 + 20; // meters

  const selectedCable = availableCables.find(cable => cable.gauge >= 4) || availableCables[0];

  return [{
    product: selectedCable,
    quantity: Math.ceil(estimatedLength),
    reason: `Cabo dimensionado para distância estimada de ${Math.ceil(estimatedLength)}m`
  }];
}