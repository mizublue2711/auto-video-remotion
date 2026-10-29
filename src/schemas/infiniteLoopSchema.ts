import { z } from 'zod';
import { brandSchema, hexColorSchema } from './brand';

export const infiniteLoopSchema = z.object({
  brand: brandSchema.default({
    name: 'ARTIFICIAL CRAFT',
    primaryColor: '#5322ff',
    backgroundColor: '#050505',
    textColor: '#FFFFFF',
    logoUrl: 'https://remotion.dev/img/logo-small.png',
  }),
  backgroundColor: hexColorSchema.default('#050505'),
  gridColor: hexColorSchema.default('#222222'),
  primaryColor: hexColorSchema.default('#5322ff'),
  accentCyan: hexColorSchema.default('#00E5FF'),
  audioUrl: z.string().default('audio/signal-at-zero.mp3'),
  bpm: z.number().default(130),
  animationType: z
    .enum([
      'TYPEWRITER_CHAR',
      'TRACK_MATTE_SLIDE',
      'BLUR_TO_SHARP',
      'STROKE_TRIM_PATH',
    ])
    .default('TYPEWRITER_CHAR'),
  title: z.string().default('ARTIFICIAL CRAFT'),
  slogan: z.string().default('COMPLEX DATA. PURE VISUAL ART.'),
  bentoNode1: z.string().default('AUTOMATION'),
  bentoNode2: z.string().default('PRECISION'),
  bentoNode3: z.string().default('SCALABILITY'),
  rhymeLine1: z.string().default('Complexity is a fool’s spell.'),
  rhymeLine2: z.string().default('Simplify to build a shell.'),
  rhymeLine3: z.string().default('Data behind, pure art ahead.'),
  codeSnippet: z.string().default("import { AbsoluteFill } from 'remotion';\nexport const LogarithmicShell = () => ..."),
  metric1: z.string().default('DETERMINISTIC SLA: 99.99%'),
  metric2: z.string().default('FRAME_RATE: 60 FPS'),
  metric3: z.string().default('LATENCY: 1.4s'),
  dualEngineNode1: z.string().default('DIFY BRAIN'),
  dualEngineNode2: z.string().default('N8N MUSCLE'),
  tickerText: z.string().default('SYS//CONTINUOUS_ENGINE :: 60FPS'),
  cycleText: z.string().default('CYCLE: 10/10 PHASES'),
  ctaUrl: z.string().default('https://artificialcraft.space/'),
  overallScale: z.number().default(1.6),
});

export const InfiniteLoopSchema = infiniteLoopSchema;
export type InfiniteLoopProps = z.infer<typeof InfiniteLoopSchema>;
