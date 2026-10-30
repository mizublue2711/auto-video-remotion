import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface SubmeshMorphEngineProps {
  vertexCount?: number;
  radius?: number;
  primaryColor?: string;
  renderVertex?: (index: number, x: number, y: number) => React.ReactNode;
}

export const SubmeshMorphEngine: React.FC<SubmeshMorphEngineProps> = ({
  vertexCount = 12,
  radius = 200,
  primaryColor = '#00E5FF',
  renderVertex,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Morph progress oscillating between circle layout and polygon star layout
  const morphProgress = interpolate(
    Math.sin(frame * 0.04),
    [-1, 1],
    [0, 1]
  );

  const vertices = Array.from({ length: vertexCount }, (_, i) => {
    const baseAngle = (i / vertexCount) * Math.PI * 2;

    // Circle distance
    const rCircle = radius;
    // Morph distance (alternating inner/outer star polygon)
    const rPolygon = i % 2 === 0 ? radius * 1.4 : radius * 0.6;

    const currentRadius = interpolate(morphProgress, [0, 1], [rCircle, rPolygon]);

    const x = Math.cos(baseAngle) * currentRadius;
    const y = Math.sin(baseAngle) * currentRadius;

    return { i, x, y };
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
        {/* Render connecting mesh lines */}
        <svg
          style={{
            position: 'absolute',
            left: -500,
            top: -500,
            width: 1000,
            height: 1000,
            pointerEvents: 'none',
          }}
        >
          <polygon
            points={vertices.map((v) => `${v.x + 500},${v.y + 500}`).join(' ')}
            fill="none"
            stroke={primaryColor}
            strokeWidth="2"
            opacity={0.7}
            style={{ filter: `drop-shadow(0 0 8px ${primaryColor})` }}
          />
        </svg>

        {vertices.map((v) => (
          <div
            key={v.i}
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${v.x}px, ${v.y}px)`,
            }}
          >
            {renderVertex ? renderVertex(v.i, v.x, v.y) : (
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: primaryColor,
                  boxShadow: `0 0 12px ${primaryColor}`,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
