import { z } from 'zod';

export const baseProductSchema = z.object({
  model: z.string().min(2, 'Modelo deve ter pelo menos 2 caracteres'),
  manufacturer: z.string().min(2, 'Fabricante deve ter pelo menos 2 caracteres'),
  description: z.string().optional(),
  price: z.number().min(0, 'Preço deve ser maior que zero'),
  warranty: z.number().min(0, 'Garantia deve ser maior que zero'),
});