import React from 'react';
import { AbsoluteFill } from 'remotion';

export interface SwissGridBackgroundProps {
  backgroundColor?: string;
  gridColor?: string;
}

export const SwissGridBackground: React.FC<SwissGridBackgroundProps> = ({
  backgroundColor = '#0F172A',
  gridColor = 'rgba(255, 255, 255, 0.05)',
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }}
    />
  );
};
