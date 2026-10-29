import { z } from 'zod';
import { brandSchema } from './brand';
import { videoSpecsSchema } from './videoSpecs';
import {
  websiteShowcaseSchema,
  featureItemSchema,
  mediaAssetSchema,
  ctaSchema,
  heroSchema,
} from './websiteShowcase';
import { datasetShowcaseSchema } from './datasetShowcase';

export * from './brand';
export * from './videoSpecs';
export * from './websiteShowcase';
export * from './datasetShowcase';
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
