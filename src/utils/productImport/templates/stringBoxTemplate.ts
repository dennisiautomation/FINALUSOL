import { generateBaseTemplate } from './baseTemplate';
import { generateExamples } from '../exampleGenerator';
import { PRODUCT_TEMPLATE_COLUMNS } from '../templateColumns';

export function generateStringBoxTemplate() {
  return generateBaseTemplate(
    'STRING BOX',
    [
      'Template para importação de string boxes.',
      'Inclui todas as especificações técnicas necessárias.',
      '',
      'CAMPOS ESPECÍFICOS:',
      '- Corrente Máxima (A): Corrente máxima suportada',
      '- Tensão Máxima (V): Tensão máxima suportada',
      '- Inversores Compatíveis: Lista de códigos separados por vírgula',
      '- Garantia (anos): Período de garantia do fabricante',
    ],
    [...PRODUCT_TEMPLATE_COLUMNS.BASIC_INFO, ...PRODUCT_TEMPLATE_COLUMNS.STRING_BOX],
    generateExamples.stringBoxes(3)
  );
}