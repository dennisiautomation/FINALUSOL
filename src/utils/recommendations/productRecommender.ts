import { Customer } from '../../types/customer';
import { Product } from '../../types/product';
import { calculateSystemRequirements } from './systemCalculator';
import { selectPanels } from './selectors/panelSelector';
import { selectInverters } from './selectors/inverterSelector';
import { selectStructures } from './selectors/structureSelector';
import { selectCables } from './selectors/cableSelector';
import { selectStringBox } from './selectors/stringBoxSelector';

export function recommendProducts(customer: Customer, products: Product[]) {
  const requirements = calculateSystemRequirements(customer);
  
  // Separate products by type
  const panels = products.filter(p => p.type === 'solar_panel');
  const inverters = products.filter(p => p.type === 'inverter');
  const structures = products.filter(p => p.type === 'structure');
  const cables = products.filter(p => p.type === 'cables');
  const stringBoxes = products.filter(p => p.type === 'string_box');

  // Select products
  const recommendedPanels = selectPanels(panels, requirements);
  const recommendedInverters = selectInverters(inverters, requirements, recommendedPanels);
  const recommendedStructures = selectStructures(
    structures,
    requirements,
    customer.installationInfo.type,
    customer.installationInfo.roofMaterial
  );
  const recommendedCables = selectCables(cables, requirements);
  const recommendedStringBox = selectStringBox(stringBoxes, recommendedInverters);

  const recommendations = [
    ...recommendedPanels,
    ...recommendedInverters,
    ...recommendedStructures,
    ...recommendedCables,
    ...recommendedStringBox
  ].filter(item => item.product && item.quantity > 0);

  return {
    recommendations,
    requirements
  };
}