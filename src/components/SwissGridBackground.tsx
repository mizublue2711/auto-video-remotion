import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export interface SwissGridBackgroundProps {
  backgroundColor?: string;
  gridColor?: string;
  accentColor?: string;
  gridSize?: number;
  showScanLine?: boolean;
  showTelemetryCorners?: boolean;
}

export const SwissGridBackground: React.FC<SwissGridBackgroundProps> = ({
  backgroundColor = '#050505',
  gridColor = '#222222',
  accentColor = '#00E5FF',
  gridSize = 60,
  showScanLine = true,
  showTelemetryCorners = false,
}) => {
  const frame = useCurrentFrame();

  // CAD radar scanning effect based on frame % 180
  const scanCycle = (frame % 180) / 180; // 0 -> 1
  const scanLineY = interpolate(scanCycle, [0, 1], [0, 1080]);
  const scanLineX = interpolate(scanCycle, [0, 1], [0, 1920]);

  const laserOpacity = interpolate(
    Math.sin((frame / 180) * Math.PI * 2),
    [-1, 1],
    [0.6, 0.95]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
        backgroundSize: `${gridSize}px ${gridSize}px`,
        overflow: 'hidden',
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
      }}
    >
      {showScanLine && (
        <>
          {/* Horizontal glowing laser scan line */}
          <div
            style={{
              position: 'absolute',
              top: `${scanLineY}px`,
              left: 0,
              right: 0,
              height: '2px',
              background: `linear-gradient(90deg, transparent 0%, ${accentColor} 30%, ${accentColor} 70%, transparent 100%)`,
              boxShadow: `0 0 15px ${accentColor}, 0 0 30px ${accentColor}`,
              opacity: laserOpacity,
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          {/* Vertical glowing laser scan line */}
          <div
            style={{
              position: 'absolute',
              left: `${scanLineX}px`,
              top: 0,
              bottom: 0,
              width: '2px',
              background: `linear-gradient(180deg, transparent 0%, ${accentColor} 30%, ${accentColor} 70%, transparent 100%)`,
              boxShadow: `0 0 15px ${accentColor}, 0 0 30px ${accentColor}`,
              opacity: laserOpacity * 0.7,
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          {/* Radar sweep glow sector overlay */}
          <div
            style={{
              position: 'absolute',
              top: `${scanLineY - 120}px`,
              left: 0,
              right: 0,
              height: '120px',
              background: `linear-gradient(180deg, transparent 0%, ${accentColor}12 100%)`,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        </>
      )}

      {showTelemetryCorners && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              color: accentColor,
              fontSize: '11px',
              letterSpacing: '2px',
              opacity: 0.8,
              zIndex: 2,
              userSelect: 'none',
            }}
          >
            + SYS_REF // [1920x1080] :: 60 FPS
          </div>
          <div
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              color: accentColor,
              fontSize: '11px',
              letterSpacing: '2px',
              opacity: 0.8,
              zIndex: 2,
              textAlign: 'right',
              userSelect: 'none',
            }}
          >
            FRM: {String(frame).padStart(4, '0')} // LOGARITHMIC_SHELL
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};
