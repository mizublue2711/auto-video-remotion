import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export interface SwissGridBackgroundProps {
  backgroundColor?: string;
  gridColor?: string;
  accentColor?: string;
  showScanLine?: boolean;
  showTelemetryCorners?: boolean;
  gridSize?: number;
}

export const SwissGridBackground: React.FC<SwissGridBackgroundProps> = ({
  backgroundColor = '#050505',
  gridColor = '#222222',
  accentColor = '#00E5FF',
  showScanLine = true,
  showTelemetryCorners = true,
  gridSize = 60,
}) => {
  const frame = useCurrentFrame();

  // Continuous laser scan line moving vertically down the canvas
  const scanLinePos = (frame * 6) % 1080;
  const scanOpacity = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.35, 0.75]
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
      {/* Laser Scan Line */}
      {showScanLine && (
        <div
          style={{
            position: 'absolute',
            top: `${scanLinePos}px`,
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: accentColor,
            boxShadow: `0 0 15px ${accentColor}, 0 0 30px ${accentColor}`,
            opacity: scanOpacity,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Swiss Telemetry Corner Markings */}
      {showTelemetryCorners && (
        <>
          {/* Top-Left */}
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

          {/* Top-Right */}
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

          {/* Bottom-Left */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              color: '#666666',
              fontSize: '10px',
              letterSpacing: '1px',
              zIndex: 2,
              userSelect: 'none',
            }}
          >
            LAT: 0.4MS | SUBMESH: ACTIVE | PHI: 1.618033
          </div>

          {/* Bottom-Right */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
              color: '#666666',
              fontSize: '10px',
              letterSpacing: '1px',
              zIndex: 2,
              userSelect: 'none',
            }}
          >
            SWISS BRUTALISM // NO_BORDER_RADIUS
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};
