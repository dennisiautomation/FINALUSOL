export type ProductType = 
  | 'solar_panel'
  | 'inverter'
  | 'structure'
  | 'cables'
  | 'string_box'
  | 'other';

export interface ProductBase {
  id: string;
  type: ProductType;
  model: string;
  manufacturer: string;
  description?: string;
  certifications?: File[];
  price: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  warranty: number;
}

export interface SolarPanel extends ProductBase {
  type: 'solar_panel';
  nominalPower: number;
  dimensions: {
    width: number;
    height: number;
  };
  weight: number;
  efficiency: number;
  area: number;
  compatibleStructures: string[];
}

export interface Inverter extends ProductBase {
  type: 'inverter';
  maxCapacity: number;
  voltageCompatibility: ('110' | '220' | '380')[];
  efficiency: number;
  monitoring: ('wifi' | 'app' | 'other')[];
  maxStrings?: number;
}

export interface Structure extends ProductBase {
  type: 'structure';
  structureType: 'fixed' | 'adjustable' | 'roof' | 'ground';
  material: 'aluminum' | 'galvanized_steel' | 'other';
  maxWeight: number;
  compatibility: {
    roof?: ('fiber_cement' | 'ceramic' | 'metallic' | 'other')[];
    ground?: boolean;
  };
}

export interface Cable extends ProductBase {
  type: 'cables';
  cableType: 'copper' | 'aluminum';
  gauge: number;
  maxLength?: number;
}

export interface StringBox extends ProductBase {
  type: 'string_box';
  maxCurrent?: number;
  maxVoltage?: number;
  compatibleInverters: string[];
}

export interface OtherProduct extends ProductBase {
  type: 'other';
  specifications: Record<string, string>;
}

export type Product = 
  | SolarPanel 
  | Inverter 
  | Structure 
  | Cable 
  | StringBox 
  | OtherProduct;