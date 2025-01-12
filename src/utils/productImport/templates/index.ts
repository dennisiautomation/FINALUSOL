import { generateSolarPanelTemplate } from './solarPanelTemplate';
import { generateInverterTemplate } from './inverterTemplate';
import { generateStructureTemplate } from './structureTemplate';
import { generateCableTemplate } from './cableTemplate';
import { generateStringBoxTemplate } from './stringBoxTemplate';

export const PRODUCT_TEMPLATES = {
  solarPanel: generateSolarPanelTemplate,
  inverter: generateInverterTemplate,
  structure: generateStructureTemplate,
  cable: generateCableTemplate,
  stringBox: generateStringBoxTemplate
};

export type ProductTemplateType = keyof typeof PRODUCT_TEMPLATES;