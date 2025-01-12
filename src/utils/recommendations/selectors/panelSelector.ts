import { Product } from '../../../types/product';
import { SystemRequirements } from '../../../types/solar';

export function selectPanels(
  panels: Product[],
  requirements: SystemRequirements
): Array<{ product: Product; quantity: number; reason: string }> {
  const availablePanels = panels.filter(p => p.type === 'solar_panel') as any[];

  if (availablePanels.length === 0) {
    return [];
  }

  // Sort by efficiency and power
  const sortedPanels = availablePanels.sort((a, b) => {
    const efficiencyDiff = b.efficiency - a.efficiency;
    return efficiencyDiff !== 0 ? efficiencyDiff : b.nominalPower - a.nominalPower;
  });

  const selectedPanel = sortedPanels[0];
  const panelsNeeded = Math.ceil((requirements.systemSize * 1000) / selectedPanel.nominalPower);
  
  return [{
    product: selectedPanel,
    quantity: panelsNeeded,
    reason: `Painel selecionado por maior eficiência (${selectedPanel.efficiency}%) e potência (${selectedPanel.nominalPower}W)`
  }];
}