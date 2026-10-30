import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export interface IsometricGridBgProps {
  backgroundColor?: string;
  primaryColor?: string;
  gridSize?: number;
  gridRows?: number;
  gridCols?: number;
}

export const IsometricGridBg: React.FC<IsometricGridBgProps> = ({
  backgroundColor = '#050505',
  primaryColor = '#00E5FF',
  gridRows = 16,
  gridCols = 16,
}) => {
  const frame = useCurrentFrame();

  const planeYTranslation = interpolate(frame % 180, [0, 180], [0, 60]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        overflow: 'hidden',
        perspective: '1200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '2000px',
          height: '2000px',
          display: 'grid',
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          gridTemplateRows: `repeat(${gridRows}, 1fr)`,
          gap: '12px',
          transform: `rotateX(60deg) rotateZ(-45deg) translateY(${planeYTranslation}px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {Array.from({ length: gridRows * gridCols }).map((_, idx) => {
          const r = Math.floor(idx / gridCols);
          const c = idx % gridCols;

          // Compute pulse opacity based on radial distance and frame
          const distFromCenter = Math.sqrt((r - gridRows / 2) ** 2 + (c - gridCols / 2) ** 2);
          const pulseWave = Math.sin(distFromCenter * 0.5 - frame * 0.08);
          const opacity = interpolate(pulseWave, [-1, 1], [0.08, 0.65]);
          const elevation = interpolate(pulseWave, [-1, 1], [0, 24]);

          return (
            <div
              key={idx}
              style={{
                borderRadius: '6px',
                border: `1px solid ${primaryColor}`,
                backgroundColor: `${primaryColor}10`,
                boxShadow: opacity > 0.4 ? `0 0 15px ${primaryColor}40` : 'none',
                opacity,
                transform: `translateZ(${elevation}px)`,
                transition: 'none',
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
