import { z } from 'zod';

export const representativeSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  cpf: z.string()
    .min(11, 'CPF inválido')
    .transform(val => val.replace(/\D/g, '')),
  phone: z.string()
    .min(10, 'Telefone inválido')
    .transform(val => val.replace(/\D/g, '')),
  address: z.object({
    street: z.string().min(1, 'Rua é obrigatória'),
    number: z.string().min(1, 'Número é obrigatório'),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, 'Bairro é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    state: z.string().min(2, 'Estado é obrigatório'),
    zipCode: z.string()
      .min(8, 'CEP inválido')
      .max(9, 'CEP inválido')
      .transform(val => val.replace(/\D/g, ''))
  }),
  region: z.string().min(2, 'Região é obrigatória'),
});