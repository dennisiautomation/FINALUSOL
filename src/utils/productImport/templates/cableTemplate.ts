import { generateBaseTemplate } from './baseTemplate';
import { generateExamples } from '../exampleGenerator';
import { PRODUCT_TEMPLATE_COLUMNS } from '../templateColumns';

export function generateCableTemplate() {
  return generateBaseTemplate(
    'CABOS E CONEXÕES',
    [
      'Template para importação de cabos e conexões.',
      'Inclui todas as especificações técnicas necessárias.',
      '',
      'CAMPOS ESPECÍFICOS:',
      '- Tipo de Cabo: copper (cobre), aluminum (alumínio)',
      '- Bitola (mm²): Seção transversal do cabo',
      '- Comprimento Máximo (m): Comprimento máximo recomendado',
      '- Garantia (anos): Período de garantia do fabricante',
    ],
    [...PRODUCT_TEMPLATE_COLUMNS.BASIC_INFO, ...PRODUCT_TEMPLATE_COLUMNS.CABLES],
    generateExamples.cables(3)
  );
}