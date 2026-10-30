import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface ContinuousMarqueeEngineProps {
  children: React.ReactNode;
  speed?: number;
  itemWidth?: number;
  style?: React.CSSProperties;
}

export const ContinuousMarqueeEngine: React.FC<ContinuousMarqueeEngineProps> = ({
  children,
  speed = 4,
  itemWidth = 600,
  style,
}) => {
  const frame = useCurrentFrame();

  const translateX = (frame * speed) % itemWidth;

  return (
    <div
      style={{
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          transform: `translateX(-${translateX}px)`,
          willChange: 'transform',
        }}
      >
        <div style={{ display: 'flex', minWidth: `${itemWidth}px` }}>{children}</div>
        <div style={{ display: 'flex', minWidth: `${itemWidth}px` }}>{children}</div>
        <div style={{ display: 'flex', minWidth: `${itemWidth}px` }}>{children}</div>
      </div>
    </div>
  );
};
