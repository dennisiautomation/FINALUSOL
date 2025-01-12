import { create } from 'zustand';
import { ProposalTemplate } from '../types/proposal';
import { DEFAULT_TEMPLATE } from './defaultTemplate';

interface TemplatesState {
  templates: ProposalTemplate[];
  activeTemplate: string | null;
  addTemplate: (template: ProposalTemplate) => void;
  updateTemplate: (id: string, data: Partial<ProposalTemplate>) => void;
  deleteTemplate: (id: string) => void;
  setActiveTemplate: (id: string | null) => void;
  duplicateTemplate: (id: string) => void;
  getTemplateById: (id: string) => ProposalTemplate | undefined;
}

export const useTemplatesStore = create<TemplatesState>((set, get) => ({
  templates: [DEFAULT_TEMPLATE],
  activeTemplate: DEFAULT_TEMPLATE.id,
  
  addTemplate: (template) =>
    set((state) => ({
      templates: [...state.templates, template],
    })),
    
  updateTemplate: (id, data) =>
    set((state) => ({
      templates: state.templates.map((temp) =>
        temp.id === id ? { ...temp, ...data, updatedAt: new Date() } : temp
      ),
    })),
    
  deleteTemplate: (id) =>
    set((state) => ({
      templates: state.templates.filter((temp) => temp.id !== id),
      activeTemplate: state.activeTemplate === id ? null : state.activeTemplate,
    })),
    
  setActiveTemplate: (id) =>
    set({ activeTemplate: id }),
    
  duplicateTemplate: (id) => {
    const template = get().templates.find(t => t.id === id);
    if (!template) return;

    const duplicate: ProposalTemplate = {
      ...template,
      id: Math.random().toString(36).substr(2, 9),
      name: `${template.name} (Cópia)`,
      sections: template.sections.map(s => ({ ...s, id: Math.random().toString(36).substr(2, 9) })),
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: false
    };

    set((state) => ({
      templates: [...state.templates, duplicate]
    }));
  },

  getTemplateById: (id) => {
    return get().templates.find(t => t.id === id);
  }
}));