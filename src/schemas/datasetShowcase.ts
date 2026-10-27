import { z } from 'zod';
import { brandSchema } from './brand.js';
import { videoSpecsSchema } from './videoSpecs.js';
import {
  featureItemSchema,
  mediaAssetSchema,
  ctaSchema,
  heroSchema,
} from './websiteShowcase.js';

export const datasetShowcaseSchema = z.object({
  brand: brandSchema.optional(),
  videoSpecs: videoSpecsSchema.optional(),
  title: z.string().min(1, 'Title cannot be empty').optional(),
  subtitle: z.string().min(1, 'Subtitle cannot be empty').optional(),
  description: z.string().min(1, 'Description cannot be empty').optional(),
  hero: heroSchema.optional(),
  mediaAssets: z.array(mediaAssetSchema).optional(),
  features: z.array(featureItemSchema).optional(),
  cta: ctaSchema.optional(),
  callToAction: ctaSchema.optional(),
});

export type DatasetShowcaseConfig = z.infer<typeof datasetShowcaseSchema>;
