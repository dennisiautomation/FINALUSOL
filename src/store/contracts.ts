import { create } from 'zustand';
import { ContractTemplate } from '../types';

interface ContractsState {
  templates: ContractTemplate[];
  activeTemplate: string | null;
  addTemplate: (template: ContractTemplate) => void;
  updateTemplate: (id: string, data: Partial<ContractTemplate>) => void;
  deleteTemplate: (id: string) => void;
  setActiveTemplate: (id: string | null) => void;
}

export const useContractsStore = create<ContractsState>((set) => ({
  templates: [],
  activeTemplate: null,
  addTemplate: (template) =>
    set((state) => ({
      templates: [...state.templates, template],
    })),
  updateTemplate: (id, data) =>
    set((state) => ({
      templates: state.templates.map((temp) =>
        temp.id === id ? { ...temp, ...data } : temp
      ),
    })),
  deleteTemplate: (id) =>
    set((state) => ({
      templates: state.templates.filter((temp) => temp.id !== id),
      activeTemplate: state.activeTemplate === id ? null : state.activeTemplate,
    })),
  setActiveTemplate: (id) =>
    set({ activeTemplate: id }),
}));