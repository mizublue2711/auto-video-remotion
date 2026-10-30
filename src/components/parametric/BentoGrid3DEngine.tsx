import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface BentoGrid3DEngineProps {
  rotateXDeg?: number;
  rotateYDeg?: number;
  children?: React.ReactNode;
  columns?: number;
  gap?: number;
}

export const BentoGrid3DEngine: React.FC<BentoGrid3DEngineProps> = ({
  rotateXDeg = 20,
  rotateYDeg = -15,
  children,
  columns = 3,
  gap = 24,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const floatY = Math.sin(frame * 0.04) * 12;
  const dynRotateX = rotateXDeg + Math.sin(frame * 0.03) * 4;
  const dynRotateY = rotateYDeg + Math.cos(frame * 0.025) * 4;

  return (
    <AbsoluteFill
      style={{
        perspective: '1200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`,
          transformStyle: 'preserve-3d',
          transform: `
            rotateX(${dynRotateX}deg)
            rotateY(${dynRotateY}deg)
            translateY(${floatY}px)
            scale(${entrance})
          `,
          boxShadow: '0 30px 60px rgba(0,0,0,0.7), 0 0 40px rgba(0, 229, 255, 0.15)',
          borderRadius: '24px',
          padding: '32px',
          backgroundColor: 'rgba(15, 18, 28, 0.85)',
          border: '1px solid rgba(0, 229, 255, 0.2)',
          backdropFilter: 'blur(16px)',
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
