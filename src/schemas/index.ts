import { z } from 'zod';
import { brandSchema } from './brand.js';
import { videoSpecsSchema } from './videoSpecs.js';
import {
  websiteShowcaseSchema,
  featureItemSchema,
  mediaAssetSchema,
  ctaSchema,
  heroSchema,
} from './websiteShowcase.js';
import { datasetShowcaseSchema } from './datasetShowcase.js';

export * from './brand.js';
export * from './videoSpecs.js';
export * from './websiteShowcase.js';
export * from './datasetShowcase.js';
export * from './logarithmicShellSchema';

export const RemotionConfigSchema = z.object({
  brand: brandSchema,
  videoSpecs: videoSpecsSchema.optional(),
  hero: heroSchema.optional(),
  title: z.string().min(1, 'Title cannot be empty').optional(),
  subtitle: z.string().min(1, 'Subtitle cannot be empty').optional(),
  description: z.string().min(1, 'Description cannot be empty').optional(),
  mediaAssets: z.array(mediaAssetSchema).optional(),
  features: z.array(featureItemSchema).optional(),
  cta: ctaSchema.optional(),
  callToAction: ctaSchema.optional(),
});

export type RemotionConfig = z.infer<typeof RemotionConfigSchema>;
