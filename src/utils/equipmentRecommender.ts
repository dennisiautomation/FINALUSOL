import { Customer } from '../types/customer';
import { Product } from '../types/product';
import { calculateSystemSize } from './solarCalculator';

interface RecommendationCriteria {
  systemSize: number;
  installationType: 'roof' | 'ground';
  roofMaterial?: string;
  voltage: string;
  availableArea: number;
}

interface EquipmentRecommendation {
  panels: Array<{ product: Product; quantity: number }>;
  inverters: Array<{ product: Product; quantity: number }>;
  structures: Array<{ product: Product; quantity: number }>;
  cables: Array<{ product: Product; quantity: number }>;
  stringBoxes: Array<{ product: Product; quantity: number }>;
}

export function recommendEquipment(
  customer: Customer,
  products: Product[],
  solarIrradiation: number = 4.5
): EquipmentRecommendation {
  const systemSize = calculateSystemSize(
    customer.consumptionInfo.averageConsumption,
    solarIrradiation
  );

  const criteria: RecommendationCriteria = {
    systemSize,
    installationType: customer.installationInfo.type,
    roofMaterial: customer.installationInfo.roofMaterial,
    voltage: customer.consumptionInfo.voltage,
    availableArea: customer.installationInfo.availableArea,
  };

  // 1. Selecionar painéis solares
  const recommendedPanels = selectSolarPanels(products, criteria);
  
  // 2. Selecionar inversores compatíveis
  const recommendedInverters = selectInverters(products, criteria, recommendedPanels);
  
  // 3. Selecionar estruturas de montagem
  const recommendedStructures = selectStructures(products, criteria, recommendedPanels);
  
  // 4. Selecionar cabos e conexões
  const recommendedCables = selectCables(products, criteria, recommendedPanels);
  
  // 5. Selecionar string boxes
  const recommendedStringBoxes = selectStringBoxes(products, criteria, recommendedInverters);

  return {
    panels: recommendedPanels,
    inverters: recommendedInverters,
    structures: recommendedStructures,
    cables: recommendedCables,
    stringBoxes: recommendedStringBoxes,
  };
}

function selectSolarPanels(
  products: Product[],
  criteria: RecommendationCriteria
): Array<{ product: Product; quantity: number }> {
  const availablePanels = products.filter(
    (p) => p.type === 'solar_panel'
  ) as Array<Product & { nominalPower: number; area: number }>;

  // Ordenar painéis por eficiência e potência
  const sortedPanels = availablePanels.sort((a, b) => {
    const efficiencyDiff = b.efficiency - a.efficiency;
    if (efficiencyDiff !== 0) return efficiencyDiff;
    return b.nominalPower - a.nominalPower;
  });

  // Selecionar o melhor painel que se encaixa na área disponível
  for (const panel of sortedPanels) {
    const panelsNeeded = Math.ceil((criteria.systemSize * 1000) / panel.nominalPower);
    const totalArea = panelsNeeded * panel.area;

    if (totalArea <= criteria.availableArea) {
      return [{
        product: panel,
        quantity: panelsNeeded,
      }];
    }
  }

  return [];
}

function selectInverters(
  products: Product[],
  criteria: RecommendationCriteria,
  selectedPanels: Array<{ product: Product; quantity: number }>
): Array<{ product: Product; quantity: number }> {
  if (selectedPanels.length === 0) return [];

  const availableInverters = products.filter(
    (p) => p.type === 'inverter'
  ) as Array<Product & { maxCapacity: number; voltageCompatibility: string[] }>;

  // Filtrar inversores compatíveis com a tensão do sistema
  const compatibleInverters = availableInverters.filter(
    (inv) => inv.voltageCompatibility.includes(criteria.voltage)
  );

  // Calcular potência total dos painéis
  const totalPower = selectedPanels.reduce(
    (sum, { product, quantity }) => sum + (product as any).nominalPower * quantity,
    0
  ) / 1000; // Converter para kW

  // Encontrar o inversor mais adequado
  const sortedInverters = compatibleInverters.sort((a, b) => {
    const aDiff = Math.abs(a.maxCapacity - totalPower);
    const bDiff = Math.abs(b.maxCapacity - totalPower);
    return aDiff - bDiff;
  });

  if (sortedInverters.length > 0) {
    const selectedInverter = sortedInverters[0];
    const quantity = Math.ceil(totalPower / selectedInverter.maxCapacity);
    
    return [{
      product: selectedInverter,
      quantity,
    }];
  }

  return [];
}

function selectStructures(
  products: Product[],
  criteria: RecommendationCriteria,
  selectedPanels: Array<{ product: Product; quantity: number }>
): Array<{ product: Product; quantity: number }> {
  if (selectedPanels.length === 0) return [];

  const availableStructures = products.filter(
    (p) => p.type === 'structure'
  ) as Array<Product & { 
    structureType: string;
    compatibility: { roof?: string[]; ground?: boolean };
  }>;

  // Filtrar estruturas compatíveis com o tipo de instalação
  const compatibleStructures = availableStructures.filter((structure) => {
    if (criteria.installationType === 'roof') {
      return structure.compatibility.roof?.includes(criteria.roofMaterial || '');
    }
    return structure.compatibility.ground;
  });

  if (compatibleStructures.length > 0) {
    // Selecionar a estrutura mais adequada
    const selectedStructure = compatibleStructures[0];
    const quantity = Math.ceil(selectedPanels[0].quantity / 4); // Aproximadamente 4 painéis por estrutura

    return [{
      product: selectedStructure,
      quantity,
    }];
  }

  return [];
}

function selectCables(
  products: Product[],
  criteria: RecommendationCriteria,
  selectedPanels: Array<{ product: Product; quantity: number }>
): Array<{ product: Product; quantity: number }> {
  if (selectedPanels.length === 0) return [];

  const availableCables = products.filter(
    (p) => p.type === 'cables'
  ) as Array<Product & { gauge: number }>;

  // Calcular comprimento estimado dos cabos (estimativa básica)
  const estimatedLength = Math.sqrt(criteria.availableArea) * 2 + 20; // metros

  // Selecionar cabos com bitola adequada
  const recommendedCables = availableCables
    .filter((cable) => cable.gauge >= 4) // Mínimo recomendado
    .sort((a, b) => a.gauge - b.gauge);

  if (recommendedCables.length > 0) {
    return [{
      product: recommendedCables[0],
      quantity: Math.ceil(estimatedLength),
    }];
  }

  return [];
}

function selectStringBoxes(
  products: Product[],
  criteria: RecommendationCriteria,
  selectedInverters: Array<{ product: Product; quantity: number }>
): Array<{ product: Product; quantity: number }> {
  if (selectedInverters.length === 0) return [];

  const availableStringBoxes = products.filter(
    (p) => p.type === 'string_box'
  ) as Array<Product & { compatibleInverters: string[] }>;

  // Filtrar string boxes compatíveis com os inversores selecionados
  const compatibleStringBoxes = availableStringBoxes.filter((sb) =>
    selectedInverters.some(({ product }) => 
      sb.compatibleInverters.includes(product.id)
    )
  );

  if (compatibleStringBoxes.length > 0) {
    return [{
      product: compatibleStringBoxes[0],
      quantity: selectedInverters[0].quantity,
    }];
  }

  return [];
}