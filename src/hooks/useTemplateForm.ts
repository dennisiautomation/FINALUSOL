import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { templateSchema } from '../schemas/templateSchema';
import { ProposalTemplate } from '../types/proposal';

export function useTemplateForm(template?: ProposalTemplate) {
  return useForm({
    resolver: zodResolver(templateSchema),
    defaultValues: template || {
      category: 'residential',
      sections: [],
      name: '',
      description: '',
    }
  });
}