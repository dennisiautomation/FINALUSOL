import { z } from 'zod';
import { baseProductSchema } from './baseProductSchema';

export const inverterSchema = baseProductSchema.extend({
  type: z.literal('inverter'),
  maxCapacity: z.number().min(0),
  efficiency: z.number().min(0).max(100),
  voltageCompatibility: z.array(z.enum(['110', '220', '380'])),
  monitoring: z.array(z.enum(['wifi', 'app', 'other'])),
  maxStrings: z.number().optional(),
});