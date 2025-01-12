import { PRODUCT_TEMPLATE_COLUMNS } from './templateColumns';
import { generateExamples } from './exampleGenerator';

function generateCSVContent(columns: any[], examples: any[]): string {
  // Cabeçalho com instruções específicas
  const instructions = [
    '# INSTRUÇÕES',
    '- Campos com * são obrigatórios',
    '- Use ponto (.) como separador decimal',
    '- Para listas, separe valores com vírgula',
    '- Não altere a ordem das colunas',
    '',
    '# COLUNAS'
  ];

  // Descrição das colunas
  const columnDescriptions = columns.map(col => {
    let desc = `${col.label}${col.required ? ' *' : ''}`;
    if (col.options) {
      desc += ` (Opções: ${col.options.join(' | ')})`;
    }
    return desc;
  });

  // Cabeçalho das colunas
  const headers = columns.map(col => col.label);

  // Monta o CSV
  return [
    ...instructions,
    ...columnDescriptions,
    '',
    '# DADOS',
    headers.join(';'),
    ...examples.map(row => row.map(cell => `"${cell}"`).join(';'))
  ].join('\n');
}

export function generateProductTemplateCSV(): string {
  const sections = [
    {
      name: 'PAINÉIS SOLARES',
      description: [
        'Especificações técnicas dos painéis fotovoltaicos.',
        'Inclui potência, eficiência, dimensões e outras características.',
      ],
      columns: [...PRODUCT_TEMPLATE_COLUMNS.BASIC_INFO, ...PRODUCT_TEMPLATE_COLUMNS.SOLAR_PANEL],
      examples: generateExamples.solarPanels(5)
    },
    {
      name: 'INVERSORES',
      description: [
        'Dados dos inversores solares.',
        'Inclui capacidade, compatibilidade e recursos de monitoramento.',
      ],
      columns: [...PRODUCT_TEMPLATE_COLUMNS.BASIC_INFO, ...PRODUCT_TEMPLATE_COLUMNS.INVERTER],
      examples: generateExamples.inverters(5)
    },
    {
      name: 'ESTRUTURAS',
      description: [
        'Informações sobre estruturas de fixação.',
        'Inclui tipo, material e compatibilidade.',
      ],
      columns: [...PRODUCT_TEMPLATE_COLUMNS.BASIC_INFO, ...PRODUCT_TEMPLATE_COLUMNS.STRUCTURE],
      examples: generateExamples.structures(5)
    },
    {
      name: 'CABOS',
      description: [
        'Especificações de cabos e conexões.',
        'Inclui tipo, bitola e comprimento.',
      ],
      columns: [...PRODUCT_TEMPLATE_COLUMNS.BASIC_INFO, ...PRODUCT_TEMPLATE_COLUMNS.CABLES],
      examples: generateExamples.cables(5)
    },
    {
      name: 'STRING BOX',
      description: [
        'Dados das string boxes.',
        'Inclui corrente, tensão e compatibilidade.',
      ],
      columns: [...PRODUCT_TEMPLATE_COLUMNS.BASIC_INFO, ...PRODUCT_TEMPLATE_COLUMNS.STRING_BOX],
      examples: generateExamples.stringBoxes(5)
    }
  ];

  // Instruções gerais
  const generalInstructions = [
    '### INSTRUÇÕES GERAIS ###',
    '1. Este arquivo contém modelos para importação de diferentes tipos de produtos',
    '2. Cada seção tem suas próprias colunas específicas',
    '3. Siga o formato dos exemplos fornecidos',
    '4. Não misture diferentes tipos de produtos na mesma planilha',
    '5. Salve cada tipo de produto em um arquivo CSV separado',
    '',
    'Para importar:',
    '1. Copie a seção desejada para um novo arquivo',
    '2. Preencha os dados seguindo o formato',
    '3. Salve como CSV com separador ponto e vírgula (;)',
    '4. Use a função "Importar Produtos" no sistema',
    '',
    ''
  ].join('\n');

  // Gera cada seção
  const sectionContent = sections.map(section => {
    const header = [
      `### ${section.name} ###`,
      ...section.description,
      ''
    ].join('\n');

    return header + generateCSVContent(section.columns, section.examples);
  });

  return generalInstructions + sectionContent.join('\n\n');
}