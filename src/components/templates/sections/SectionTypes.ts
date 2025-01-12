export const SECTION_TYPES = {
  cover: {
    label: 'Capa',
    description: 'Página inicial da proposta'
  },
  introduction: {
    label: 'Introdução',
    description: 'Texto introdutório e apresentação'
  },
  technical: {
    label: 'Resumo Técnico',
    description: 'Especificações técnicas do sistema'
  },
  equipment: {
    label: 'Equipamentos',
    description: 'Lista de equipamentos e materiais'
  },
  benefits: {
    label: 'Benefícios',
    description: 'Vantagens do sistema solar'
  },
  financial: {
    label: 'Análise Financeira',
    description: 'Cálculos e projeções financeiras'
  },
  charts: {
    label: 'Gráficos',
    description: 'Visualizações e comparativos'
  },
  notes: {
    label: 'Observações',
    description: 'Notas e considerações finais'
  }
} as const;

export type SectionType = keyof typeof SECTION_TYPES;