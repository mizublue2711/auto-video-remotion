import React from 'react';
import { AbsoluteFill, interpolate, random, useCurrentFrame } from 'remotion';

export interface AnomalousNoiseFieldProps {
  backgroundColor?: string;
  primaryColor?: string;
  particleCount?: number;
}

export const AnomalousNoiseField: React.FC<AnomalousNoiseFieldProps> = ({
  backgroundColor = '#050505',
  primaryColor = '#00E5FF',
  particleCount = 100,
}) => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: particleCount }, (_, idx) => {
    const seed = idx * 777;
    const baseX = random(seed) * 1920;
    const baseY = random(seed + 1) * 1080;

    // Free dispersion wandering motion using harmonic sine waves
    const dispX = Math.sin(frame * 0.03 + idx) * 40 + Math.cos(frame * 0.01 + idx * 2) * 20;
    const dispY = Math.cos(frame * 0.025 + idx) * 40 + Math.sin(frame * 0.015 + idx * 3) * 20;

    const opacity = interpolate(
      Math.sin(frame * 0.05 + seed),
      [-1, 1],
      [0.15, 0.85]
    );

    const size = 2 + (idx % 4) * 1.5;

    return {
      x: baseX + dispX,
      y: baseY + dispY,
      opacity,
      size,
    };
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        overflow: 'hidden',
      }}
    >
      {particles.map((p, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            backgroundColor: primaryColor,
            boxShadow: `0 0 8px ${primaryColor}`,
            opacity: p.opacity,
            pointerEvents: 'none',
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
