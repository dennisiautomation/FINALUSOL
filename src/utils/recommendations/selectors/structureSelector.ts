import { Product } from '../../../types/product';
import { SystemRequirements } from '../../../types/solar';

export function selectStructures(
  structures: Product[],
  requirements: SystemRequirements,
  installationType: 'roof' | 'ground',
  roofMaterial?: string
): Array<{ product: Product; quantity: number; reason: string }> {
  const availableStructures = structures.filter(p => p.type === 'structure') as any[];

  if (availableStructures.length === 0) {
    return [];
  }

  // Filter compatible structures
  const compatibleStructures = availableStructures.filter(structure => {
    if (installationType === 'roof') {
      return structure.compatibility?.roof?.includes(roofMaterial);
    }
    return structure.compatibility?.ground;
  });

  if (compatibleStructures.length === 0) {
    return [];
  }

  const selectedStructure = compatibleStructures[0];
  const quantity = Math.ceil(requirements.panelCount / 4); // Approximately 4 panels per structure

  return [{
    product: selectedStructure,
    quantity,
    reason: `Estrutura compatível com instalação em ${installationType === 'roof' ? 'telhado' : 'solo'}`
  }];
}