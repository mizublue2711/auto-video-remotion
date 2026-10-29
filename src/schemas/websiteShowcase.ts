import { z } from 'zod';
import { brandSchema } from './brand';
import { videoSpecsSchema } from './videoSpecs';

export const featureItemSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty'),
  icon: z.string().default(''),
  description: z.string().min(1, 'Description cannot be empty'),
});

export type FeatureItem = z.infer<typeof featureItemSchema>;

export const mediaAssetSchema = z.object({
  type: z.enum(['image', 'video']),
  src: z.string().min(1, 'Source URL or path cannot be empty'),
  alt: z.string().default(''),
});

export type MediaAsset = z.infer<typeof mediaAssetSchema>;

export const ctaSchema = z.object({
  text: z.string().min(1, 'CTA text cannot be empty'),
  url: z.string().default(''),
  buttonColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color string')
    .default('#0052FF'),
});

export type CTAConfig = z.infer<typeof ctaSchema>;

export const heroSchema = z.object({
  title: z.string().min(1, 'Hero title cannot be empty'),
  subtitle: z.string().min(1, 'Hero subtitle cannot be empty'),
  description: z.string().default(''),
});

export type HeroConfig = z.infer<typeof heroSchema>;

export const websiteShowcaseSchema = z.object({
  brand: brandSchema.optional(),
  videoSpecs: videoSpecsSchema.optional(),
  title: z.string().default(''),
  subtitle: z.string().default(''),
  description: z.string().default(''),
  hero: heroSchema.optional(),
  mediaAssets: z.array(mediaAssetSchema).optional(),
  features: z.array(featureItemSchema).optional(),
  cta: ctaSchema.optional(),
  callToAction: ctaSchema.optional(),
});

export type WebsiteShowcaseConfig = z.infer<typeof websiteShowcaseSchema>;
