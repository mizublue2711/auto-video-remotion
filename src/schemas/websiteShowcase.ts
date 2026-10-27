import { z } from 'zod';
import { brandSchema } from './brand.js';
import { videoSpecsSchema } from './videoSpecs.js';

export const featureItemSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty'),
  icon: z.string().optional(),
  description: z.string().min(1, 'Description cannot be empty'),
});

export type FeatureItem = z.infer<typeof featureItemSchema>;

export const mediaAssetSchema = z.object({
  type: z.enum(['image', 'video']),
  src: z.string().min(1, 'Source URL or path cannot be empty'),
  alt: z.string().optional(),
});

export type MediaAsset = z.infer<typeof mediaAssetSchema>;

export const ctaSchema = z.object({
  text: z.string().min(1, 'CTA text cannot be empty'),
  url: z.string().optional(),
  buttonColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color string')
    .optional(),
});

export type CTAConfig = z.infer<typeof ctaSchema>;

export const heroSchema = z.object({
  title: z.string().min(1, 'Hero title cannot be empty'),
  subtitle: z.string().min(1, 'Hero subtitle cannot be empty'),
  description: z.string().min(1, 'Hero description cannot be empty').optional(),
});

export type HeroConfig = z.infer<typeof heroSchema>;

export const websiteShowcaseSchema = z.object({
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

export type WebsiteShowcaseConfig = z.infer<typeof websiteShowcaseSchema>;
