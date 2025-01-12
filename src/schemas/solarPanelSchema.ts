import { z } from 'zod';
import { baseProductSchema } from './baseProductSchema';

export const solarPanelSchema = baseProductSchema.extend({
  type: z.literal('solar_panel'),
  nominalPower: z.number().min(1, 'Potência deve ser maior que zero'),
  dimensions: z.object({
    width: z.number().min(0).multipleOf(0.001),
    height: z.number().min(0).multipleOf(0.001),
  }),
  weight: z.number().min(0),
  efficiency: z.number().min(0).max(100),
  area: z.number().min(0),
});