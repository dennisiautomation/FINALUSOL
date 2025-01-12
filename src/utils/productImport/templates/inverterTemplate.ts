import { generateBaseTemplate } from './baseTemplate';
import { generateExamples } from '../exampleGenerator';
import { PRODUCT_TEMPLATE_COLUMNS } from '../templateColumns';

export function generateInverterTemplate() {
  return generateBaseTemplate(
    'INVERSORES',
    [
      'Template para importação de inversores solares.',
      'Inclui todas as especificações técnicas necessárias.',
      '',
      'CAMPOS ESPECÍFICOS:',
      '- Capacidade Máxima (kWp): Potência máxima suportada',
      '- Eficiência (%): Eficiência de conversão',
      '- Tensões Compatíveis: Lista separada por vírgulas (110,220,380)',
      '- Número Máximo de Strings: Quantidade máxima de strings suportada',
      '- Monitoramento: Recursos disponíveis (wifi,app,other)',
      '- Garantia (anos): Período de garantia do fabricante',
    ],
    [...PRODUCT_TEMPLATE_COLUMNS.BASIC_INFO, ...PRODUCT_TEMPLATE_COLUMNS.INVERTER],
    generateExamples.inverters(3)
  );
}