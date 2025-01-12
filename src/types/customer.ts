export interface CustomerAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface ConsumptionInfo {
  averageConsumption: number;
  monthlyHistory: Record<string, number>;
  tariffType: 'residential' | 'commercial' | 'rural' | 'industrial';
  powerCompany: string;
  voltage: '110' | '220' | '380';
}

export interface InstallationInfo {
  type: 'roof' | 'ground';
  availableArea: number;
  roofMaterial?: 'fiber_cement' | 'ceramic' | 'metallic' | 'other';
  roofOrientation?: 'north' | 'south' | 'east' | 'west';
  roofInclination?: number;
}

export interface LinkedUnit {
  document: string;
  address: CustomerAddress;
  averageConsumption: number;
}

export interface Customer {
  id: string;
  name: string;
  documentType: 'cpf' | 'cnpj';
  document: string;
  email: string;
  phone: string;
  address: CustomerAddress;
  consumptionInfo: ConsumptionInfo;
  installationInfo: InstallationInfo;
  generationType: 'individual' | 'shared' | 'remote';
  linkedUnits?: LinkedUnit[];
  representativeId: string;
  createdAt: Date;
  updatedAt: Date;
}