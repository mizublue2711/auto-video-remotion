import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface FibonacciSpiralEngineProps {
  itemCount?: number;
  scaleFactor?: number;
  renderItem?: (index: number, x: number, y: number) => React.ReactNode;
}

const GOLDEN_ANGLE_RAD = 137.5 * (Math.PI / 180);

export const FibonacciSpiralEngine: React.FC<FibonacciSpiralEngineProps> = ({
  itemCount = 34,
  scaleFactor = 40,
  renderItem,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotOffset = frame * 0.01;

  const items = Array.from({ length: itemCount }, (_, i) => {
    const radius = Math.sqrt(i + 1) * scaleFactor;
    const angle = i * GOLDEN_ANGLE_RAD + rotOffset;

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    const springVal = spring({
      frame: frame - i * 2,
      fps,
      config: { damping: 12, stiffness: 90 },
    });

    return { i, x, y, springVal };
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ position: 'relative', width: 0, height: 0 }}>
        {items.map((item) => {
          const scale = interpolate(item.springVal, [0, 1], [0, 1]);
          return (
            <div
              key={item.i}
              style={{
                position: 'absolute',
                transform: `translate(-50%, -50%) translate(${item.x}px, ${item.y}px) scale(${scale})`,
              }}
            >
              {renderItem ? renderItem(item.i, item.x, item.y) : (
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#00E5FF',
                    boxShadow: '0 0 10px #00E5FF',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
