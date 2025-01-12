import { Customer } from '../../types/customer';

interface ValidationParams {
  customer: Customer;
  requiredArea: number;
  roofLoad: number;
}

interface ValidationResult {
  isViable: boolean;
  validationLimitations: string[];
}

export function validateInstallationRequirements(params: ValidationParams): ValidationResult {
  const { customer, requiredArea, roofLoad } = params;
  const limitations: string[] = [];
  let isViable = true;

  // 1. Area validation
  if (requiredArea > customer.installationInfo.availableArea) {
    limitations.push(`Área necessária (${requiredArea}m²) maior que área disponível (${customer.installationInfo.availableArea}m²)`);
    isViable = false;
  }

  // 2. Structural validation for roof installations
  if (customer.installationInfo.type === 'roof') {
    const maxRoofLoad = getMaxRoofLoad(customer.installationInfo.roofMaterial);
    if (roofLoad > maxRoofLoad) {
      limitations.push(`Peso do sistema (${roofLoad}kg) excede limite do telhado (${maxRoofLoad}kg)`);
      isViable = false;
    }
  }

  // 3. Legal requirements
  const legalLimitations = validateLegalRequirements(customer);
  if (legalLimitations.length > 0) {
    limitations.push(...legalLimitations);
    isViable = false;
  }

  return { isViable, validationLimitations: limitations };
}

function getMaxRoofLoad(material?: string): number {
  const loadLimits: Record<string, number> = {
    ceramic: 200,    // kg/m²
    metallic: 150,   // kg/m²
    fiber_cement: 100, // kg/m²
    other: 100
  };
  return loadLimits[material || 'other'] || 100;
}

function validateLegalRequirements(customer: Customer): string[] {
  const limitations: string[] = [];

  // Check minimum consumption (50 kWh/month according to ANEEL)
  if (customer.consumptionInfo.averageConsumption < 50) {
    limitations.push('Consumo mensal abaixo do mínimo exigido pela ANEEL (50 kWh/mês)');
  }

  // Validate power company requirements
  const powerCompanyLimits = validatePowerCompanyLimits(customer);
  if (powerCompanyLimits) {
    limitations.push(powerCompanyLimits);
  }

  return limitations;
}

function validatePowerCompanyLimits(customer: Customer): string | null {
  const { powerCompany, voltage } = customer.consumptionInfo;
  
  // Example power company specific validations
  const requirements: Record<string, { minVoltage: string }> = {
    'enel': { minVoltage: '220' },
    'cpfl': { minVoltage: '220' },
    'light': { minVoltage: '220' }
  };

  const companyReq = requirements[powerCompany];
  if (companyReq && voltage < companyReq.minVoltage) {
    return `Tensão mínima para ${powerCompany} deve ser ${companyReq.minVoltage}V`;
  }

  return null;
}