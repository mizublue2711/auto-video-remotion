import React from 'react';
import { interpolate } from 'remotion';

export interface SwissGridBackgroundProps {
  frame: number;
  gridSize?: number;
  laserPos?: number;
  lineColor?: string;
  laserColor?: string;
}

export const SwissGridBackground: React.FC<SwissGridBackgroundProps> = ({
  frame,
  gridSize = 40,
  laserPos,
  lineColor = '#111',
  laserColor = 'rgba(0, 229, 255, 0.5)',
}) => {
  const currentLaserPos =
    laserPos ??
    interpolate(frame, [60, 90], [-20, 120], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* 1px CAD Lines Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(to right, ${lineColor} 1px, transparent 1px), linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)`,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          opacity: 0.3,
        }}
      />

      {/* Laser Scan Animation Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: '50px',
          border: '1px solid #222',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: `${currentLaserPos}%`,
            width: '100px',
            height: '100%',
            background: `linear-gradient(90deg, transparent, ${laserColor}, transparent)`,
            transform: 'skewX(-20deg)',
          }}
        />
      </div>
    </div>
  );
};
