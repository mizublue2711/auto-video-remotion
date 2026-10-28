import { interpolate } from 'remotion';

export interface VelocityOptions {
  extrapolateLeft?: 'clamp' | 'identity' | 'extend';
  extrapolateRight?: 'clamp' | 'identity' | 'extend';
  maxBlurPx?: number;
  multiplier?: number;
}

/**
 * Calculates instantaneous velocity between current and previous frame
 * and returns frame-rate safe blur amount.
 */
export const interpolateVelocity = (
  frame: number,
  inputRange: readonly number[],
  outputRange: readonly number[],
  options: VelocityOptions = {}
): { currentVal: number; velocity: number; blurPx: number } => {
  const {
    extrapolateLeft = 'clamp',
    extrapolateRight = 'clamp',
    maxBlurPx = 8,
    multiplier = 0.4,
  } = options;

  const currentVal = interpolate(frame, inputRange, outputRange, {
    extrapolateLeft,
    extrapolateRight,
  });

  const prevFrame = Math.max(0, frame - 1);
  const prevVal = interpolate(prevFrame, inputRange, outputRange, {
    extrapolateLeft,
    extrapolateRight,
  });

  const velocity = Math.abs(currentVal - prevVal);
  const blurPx = Math.min(maxBlurPx, velocity * multiplier);

  return { currentVal, velocity, blurPx };
};
