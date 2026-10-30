import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export interface VelocityBlurEngineProps {
  children: React.ReactNode;
  maxBlur?: number;
  motionFn?: (frame: number) => { x: number; y: number };
  style?: React.CSSProperties;
}

export const VelocityBlurEngine: React.FC<VelocityBlurEngineProps> = ({
  children,
  maxBlur = 20,
  motionFn,
  style,
}) => {
  const frame = useCurrentFrame();

  // Default motion: sinusoidal harmonic Y displacement
  const defaultMotion = (f: number) => ({
    x: Math.sin(f * 0.1) * 100,
    y: Math.sin(f * 0.15) * 200,
  });

  const getPos = motionFn || defaultMotion;

  const currentPos = getPos(frame);
  const prevPos = getPos(Math.max(0, frame - 1));

  // Velocity derivative: delta distance per frame
  const deltaX = currentPos.x - prevPos.x;
  const deltaY = currentPos.y - prevPos.y;
  const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  const blurAmount = interpolate(velocity, [0, 40], [0, maxBlur], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        transform: `translate(${currentPos.x}px, ${currentPos.y}px)`,
        filter: blurAmount > 0.5 ? `blur(${blurAmount.toFixed(1)}px)` : 'none',
        willChange: 'transform, filter',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
