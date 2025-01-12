import { generateBaseTemplate } from './baseTemplate';
import { generateExamples } from '../exampleGenerator';
import { PRODUCT_TEMPLATE_COLUMNS } from '../templateColumns';

export function generateSolarPanelTemplate() {
  return generateBaseTemplate(
    'PAINÉIS SOLARES',
    [
      'Template para importação de painéis solares fotovoltaicos.',
      'Inclui todas as especificações técnicas necessárias.',
      '',
      'CAMPOS ESPECÍFICOS:',
      '- Potência Nominal (W): Potência do painel em Watts',
      '- Eficiência (%): Eficiência de conversão',
      '- Dimensões: Largura e altura em metros',
      '- Peso (kg): Peso do painel',
      '- Área (m²): Área total do painel',
      '- Garantia (anos): Período de garantia do fabricante',
    ],
    [...PRODUCT_TEMPLATE_COLUMNS.BASIC_INFO, ...PRODUCT_TEMPLATE_COLUMNS.SOLAR_PANEL],
    generateExamples.solarPanels(3)
  );
}