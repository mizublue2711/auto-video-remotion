import { z } from 'zod';

export const videoSpecsSchema = z.object({
  fps: z.number().int().positive('fps must be a positive integer'),
  durationInFrames: z.number().int().positive('durationInFrames must be a positive integer'),
  width: z.number().int().positive('width must be a positive integer'),
  height: z.number().int().positive('height must be a positive integer'),
});

export type VideoSpecsConfig = z.infer<typeof videoSpecsSchema>;
