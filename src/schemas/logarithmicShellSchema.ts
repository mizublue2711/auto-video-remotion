import { z } from 'zod';
import { brandSchema, hexColorSchema } from './brand';

export const metricItemSchema = z.object({
  label: z.string(),
  value: z.union([z.string(), z.number()]),
});

export const logarithmicShellSchema = z.object({
  brand: brandSchema.optional().default({
    name: 'ARTIFICIAL CRAFT',
    primaryColor: '#00E5FF',
    backgroundColor: '#050505',
    textColor: '#FFFFFF',
    logoUrl: 'https://artificialcraft.space/og.png',
  }),
  backgroundColor: hexColorSchema.default('#050505'),
  primaryAccent: hexColorSchema.default('#00E5FF'),
  gridColor: hexColorSchema.default('#222222'),
  phase1Text: z.string().default("Complexity is a fool’s spell."),
  phase2Text: z.string().default('Simplify to build a shell.'),
  phase3Text: z.string().default('Data behind, pure art ahead.'),
  headerText: z.string().default('ARTIFICIAL CRAFT'),
  sloganText: z.string().default('COMPLEX DATA. PURE VISUAL ART.'),
  urlText: z.string().default('https://artificialcraft.space/'),
  metrics: z.array(metricItemSchema).default([
    { label: 'FPS', value: '60' },
    { label: 'LATENCY', value: '0.4MS' },
    { label: 'SUBMESH_TRI', value: '4096' },
    { label: 'SHELL_PHI', value: '1.618' },
    { label: 'PRECISION', value: '99.99%' },
  ]),
});

export const LogarithmicShellSchema = logarithmicShellSchema;

export type LogarithmicShellProps = z.infer<typeof LogarithmicShellSchema>;
export type LogarithmicShellConfig = LogarithmicShellProps;
