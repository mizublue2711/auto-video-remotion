import { z } from 'zod';

export const universalMotionSchemaV2 = z.object({
  bgPreset: z.enum([
    'SwissGridHUD',
    'CyberpunkMatrixBg',
    'IsometricGridBg',
    'ParticleTunnelBg',
    'QuantumWaveformBg',
    'HolographicBlueprintBg',
    'HyperdriveGridBg',
    'VolumetricFogHUD',
    'AnomalousNoiseField'
  ]).default('SwissGridHUD'),
  primaryColor: z.string().default('#00E5FF'),
  backgroundColor: z.string().default('#050505'),
  cameraZoomMin: z.number().min(0.5).max(2.0).step(0.05).default(0.85),
  cameraZoomMax: z.number().min(1.0).max(3.0).step(0.05).default(1.65),
  rotateXBaseDeg: z.number().min(-90).max(90).step(1).default(28),
  dispersionMax: z.number().min(0.0).max(0.5).step(0.01).default(0.12),
});

export type UniversalMotionPropsV2 = z.infer<typeof universalMotionSchemaV2>;
