import { Product } from '../../types/product';

// Solar Panels
const solarPanelData: Product[] = [
  {
    id: 'sp-001',
    type: 'solar_panel',
    model: 'TSM-550DE19',
    manufacturer: 'TRINA',
    description: 'MÓDULO FOTOVOLTAICO TRINA 550W MONO VERTEX S+ DE19',
    price: 980,
    warranty: 25,
    nominalPower: 550,
    efficiency: 21.5,
    dimensions: {
      width: 1.096,
      height: 2.172
    },
    weight: 27.5,
    area: 2.38,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system'
  },
  {
    id: 'sp-002',
    type: 'solar_panel',
    model: 'TSM-600DE21',
    manufacturer: 'TRINA',
    description: 'MÓDULO FOTOVOLTAICO TRINA 600W MONO VERTEX S+ DE21',
    price: 1080,
    warranty: 25,
    nominalPower: 600,
    efficiency: 21.8,
    dimensions: {
      width: 1.096,
      height: 2.384
    },
    weight: 29.5,
    area: 2.61,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system'
  }
];

// Inverters
const inverterData: Product[] = [
  {
    id: 'inv-001',
    type: 'inverter',
    model: 'MIN 5000TL-X',
    manufacturer: 'Growatt',
    description: 'Inversor Growatt 5kW',
    price: 4500,
    warranty: 10,
    maxCapacity: 5,
    efficiency: 98.4,
    voltageCompatibility: ['220', '380'],
    monitoring: ['wifi', 'app'],
    maxStrings: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system'
  },
  {
    id: 'inv-002',
    type: 'inverter',
    model: 'MIN 8000TL-X',
    manufacturer: 'Growatt',
    description: 'Inversor Growatt 8kW',
    price: 6800,
    warranty: 10,
    maxCapacity: 8,
    efficiency: 98.6,
    voltageCompatibility: ['220', '380'],
    monitoring: ['wifi', 'app'],
    maxStrings: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system'
  }
];

// Structures
const structureData: Product[] = [
  {
    id: 'str-001',
    type: 'structure',
    model: 'RS-01',
    manufacturer: 'Romagnole',
    description: 'Estrutura para telhado cerâmico',
    price: 450,
    warranty: 12,
    structureType: 'roof',
    material: 'aluminum',
    maxWeight: 300,
    compatibility: {
      roof: ['ceramic', 'fiber_cement'],
      ground: false
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system'
  }
];

// Cables
const cablesData: Product[] = [
  {
    id: 'cab-001',
    type: 'cables',
    model: 'Solar 6mm²',
    manufacturer: 'Nexans',
    description: 'Cabo solar 6mm²',
    price: 8.5,
    warranty: 5,
    cableType: 'copper',
    gauge: 6,
    maxLength: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system'
  }
];

// String Boxes
const stringBoxData: Product[] = [
  {
    id: 'sb-001',
    type: 'string_box',
    model: 'SB-1000',
    manufacturer: 'Soprano',
    description: 'String Box 1000V',
    price: 350,
    warranty: 5,
    maxCurrent: 15,
    maxVoltage: 1000,
    compatibleInverters: ['inv-001', 'inv-002'],
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system'
  }
];

export const sampleProducts = [
  ...solarPanelData,
  ...inverterData,
  ...structureData,
  ...cablesData,
  ...stringBoxData
];