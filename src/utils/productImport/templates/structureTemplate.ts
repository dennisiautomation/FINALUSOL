import { generateBaseTemplate } from './baseTemplate';
import { generateExamples } from '../exampleGenerator';
import { PRODUCT_TEMPLATE_COLUMNS } from '../templateColumns';

export function generateStructureTemplate() {
  return generateBaseTemplate(
    'ESTRUTURAS',
    [
      'Template para importação de estruturas de fixação.',
      'Inclui todas as especificações técnicas necessárias.',
      '',
      'CAMPOS ESPECÍFICOS:',
      '- Tipo de Estrutura: fixed (fixa), adjustable (ajustável), roof (telhado), ground (solo)',
      '- Material: aluminum (alumínio), galvanized_steel (aço galvanizado), other (outro)',
      '- Peso Máximo Suportado (kg): Capacidade máxima de carga',
      '- Compatibilidade Telhado: Tipos suportados (fiber_cement,ceramic,metallic,other)',
      '- Compatível com Solo: true/false',
      '- Garantia (anos): Período de garantia do fabricante',
    ],
    [...PRODUCT_TEMPLATE_COLUMNS.BASIC_INFO, ...PRODUCT_TEMPLATE_COLUMNS.STRUCTURE],
    generateExamples.structures(3)
  );
}