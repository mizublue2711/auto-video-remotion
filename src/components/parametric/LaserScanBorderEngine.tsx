import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export interface LaserScanBorderEngineProps {
  children?: React.ReactNode;
  primaryColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  style?: React.CSSProperties;
}

export const LaserScanBorderEngine: React.FC<LaserScanBorderEngineProps> = ({
  children,
  primaryColor = '#00E5FF',
  borderRadius = 16,
  borderWidth = 1,
  style,
}) => {
  const frame = useCurrentFrame();

  const angle = (frame * 3) % 360;

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: `${borderRadius}px`,
        padding: `${borderWidth}px`,
        background: `conic-gradient(from ${angle}deg at 50% 50%, transparent 0%, ${primaryColor} 25%, transparent 50%, ${primaryColor} 75%, transparent 100%)`,
        boxShadow: `0 0 15px ${primaryColor}40`,
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          borderRadius: `${borderRadius - borderWidth}px`,
          backgroundColor: '#0A0D14',
          height: '100%',
          width: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
};
