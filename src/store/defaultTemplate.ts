import { ProposalTemplate } from '../types/proposal';
import { DEFAULT_SECTIONS } from '../components/templates/sections/DefaultSections';

export const DEFAULT_TEMPLATE: ProposalTemplate = {
  id: 'default-template',
  name: 'Modelo Padrão de Proposta',
  description: 'Modelo completo com todas as seções necessárias para uma proposta profissional',
  category: 'residential',
  sections: DEFAULT_SECTIONS.map((section, index) => ({
    id: `default-section-${index}`,
    type: section.type!,
    title: section.title!,
    content: section.content!,
    order: index,
    isRequired: section.isRequired
  })),
  validityDays: 10,
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true
};