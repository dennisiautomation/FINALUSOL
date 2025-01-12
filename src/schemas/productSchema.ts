import { z } from 'zod';
import { solarPanelSchema } from './solarPanelSchema';
import { inverterSchema } from './inverterSchema';
import { baseProductSchema } from './baseProductSchema';

// Other product types
const structureSchema = baseProductSchema.extend({
  type: z.literal('structure'),
  structureType: z.enum(['fixed', 'adjustable', 'roof', 'ground']),
  material: z.enum(['aluminum', 'galvanized_steel', 'other']),
  maxWeight: z.number().min(0),
  compatibility: z.object({
    roof: z.array(z.enum(['fiber_cement', 'ceramic', 'metallic', 'other'])).optional(),
    ground: z.boolean().optional(),
  }),
});

const cableSchema = baseProductSchema.extend({
  type: z.literal('cables'),
  cableType: z.enum(['copper', 'aluminum']),
  gauge: z.number().min(0),
  maxLength: z.number().optional(),
});

const stringBoxSchema = baseProductSchema.extend({
  type: z.literal('string_box'),
  maxCurrent: z.number().optional(),
  maxVoltage: z.number().optional(),
  compatibleInverters: z.array(z.string()),
});

const otherProductSchema = baseProductSchema.extend({
  type: z.literal('other'),
  specifications: z.record(z.string()),
});

// Combined product schema
export const productSchema = z.discriminatedUnion('type', [
  solarPanelSchema,
  inverterSchema,
  structureSchema,
  cableSchema,
  stringBoxSchema,
  otherProductSchema,
]);

export type ProductSchema = z.infer<typeof productSchema>;