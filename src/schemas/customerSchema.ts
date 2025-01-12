import { z } from 'zod';
import { addressSchema } from './addressSchema';

export const customerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  documentType: z.enum(['cpf', 'cnpj']),
  document: z.string().min(11, 'Documento inválido'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  address: addressSchema,
  consumptionInfo: z.object({
    monthlyHistory: z.record(z.number()),
    tariffType: z.enum(['residential', 'commercial', 'rural', 'industrial']),
    powerCompany: z.string().min(1, 'Concessionária é obrigatória'),
    voltage: z.enum(['110', '220', '380']),
    averageConsumption: z.number().min(0)
  }),
  installationInfo: z.object({
    type: z.enum(['roof', 'ground']),
    availableArea: z.number().min(1, 'Área mínima de 1 m²'),
    roofMaterial: z.enum(['fiber_cement', 'ceramic', 'metallic', 'other']).optional(),
    roofOrientation: z.enum(['north', 'south', 'east', 'west']).optional(),
    roofInclination: z.number().optional()
  }),
  generationType: z.enum(['individual', 'shared', 'remote']),
  linkedUnits: z.array(z.object({
    document: z.string(),
    address: addressSchema,
    averageConsumption: z.number()
  })).optional()
});