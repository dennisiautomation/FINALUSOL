import React from 'react';
import { ProposalTemplate } from '../../types/proposal';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { templateSchema } from '../../schemas/templateSchema';
import { Button } from '../ui/Button';
import { ProposalTemplateEditor } from './ProposalTemplateEditor';
import { DEFAULT_SECTIONS } from '../../constants/proposalSections';

interface CreateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<ProposalTemplate>) => void;
  template?: ProposalTemplate;
}

export function CreateTemplateModal({
  isOpen,
  onClose,
  onSubmit,
  template,
}: CreateTemplateModalProps) {
  const methods = useForm({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      name: template?.name || '',
      description: template?.description || '',
      category: template?.category || 'residential',
      sections: template?.sections || DEFAULT_SECTIONS,
      styling: {
        primaryColor: template?.styling?.primaryColor || '#000000',
        secondaryColor: template?.styling?.secondaryColor || '#666666',
        fontFamily: template?.styling?.fontFamily || 'Arial',
        fontSize: template?.styling?.fontSize || '16px'
      }
    }
  });

  // Reset form when template changes
  React.useEffect(() => {
    if (template) {
      methods.reset({
        name: template.name,
        description: template.description,
        category: template.category,
        sections: template.sections,
        styling: template.styling
      });
    }
  }, [template, methods.reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-4xl">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <span className="sr-only">Fechar</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {template ? 'Editar Modelo' : 'Criar Novo Modelo'}
            </h2>

            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                <ProposalTemplateEditor />

                <div className="flex justify-end space-x-3">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {template ? 'Atualizar' : 'Criar'} Modelo
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}