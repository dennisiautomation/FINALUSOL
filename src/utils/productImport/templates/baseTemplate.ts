export function generateBaseTemplate(
  title: string,
  description: string[],
  columns: { label: string; required?: boolean; options?: string[] }[],
  examples: string[][]
): string {
  const instructions = [
    '### INSTRUÇÕES ###',
    '- Campos com * são obrigatórios',
    '- Use ponto (.) como separador decimal',
    '- Para listas, separe valores com vírgula',
    '- Não altere a ordem das colunas',
    '',
    '### DESCRIÇÃO ###',
    ...description,
    '',
    '### COLUNAS ###'
  ];

  const columnDescriptions = columns.map(col => {
    let desc = `${col.label}${col.required ? ' *' : ''}`;
    if (col.options) {
      desc += ` (Opções: ${col.options.join(' | ')})`;
    }
    return desc;
  });

  const headers = columns.map(col => col.label);

  return [
    `### ${title} ###`,
    '',
    ...instructions,
    ...columnDescriptions,
    '',
    '### DADOS ###',
    headers.join(';'),
    ...examples.map(row => row.map(cell => `"${cell}"`).join(';'))
  ].join('\n');
}