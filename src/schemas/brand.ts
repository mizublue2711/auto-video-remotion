import { z } from 'zod';

export const hexColorSchema = z
  .string()
  .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color string (e.g. #FFFFFF or #FFF)');

export const brandSchema = z.object({
  name: z.string().optional(),
  primaryColor: hexColorSchema,
  secondaryColor: hexColorSchema.optional(),
  backgroundColor: hexColorSchema,
  textColor: hexColorSchema.optional(),
  fontFamily: z.string().optional().default('system-ui, sans-serif'),
  logoUrl: z
    .string()
    .refine(
      (val) =>
        val.startsWith('http://') ||
        val.startsWith('https://') ||
        val.startsWith('data:') ||
        val.startsWith('/') ||
        val.startsWith('./'),
      'logoUrl must be a valid URL string or base64/SVG Data URI'
    )
    .or(z.string()),
});

export type BrandConfig = z.infer<typeof brandSchema>;
