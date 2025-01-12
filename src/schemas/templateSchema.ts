import { z } from 'zod';

export const templateSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  category: z.enum(['residential', 'commercial', 'industrial']),
  coverLayout: z.any().optional(),
  sections: z.array(z.object({
    id: z.string(),
    type: z.enum(['introduction', 'technical', 'equipment', 'financial', 'charts', 'benefits', 'notes']),
    title: z.string(),
    content: z.string().optional(),
    order: z.number()
  }))
});