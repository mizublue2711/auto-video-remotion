import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface SwissHudOverlayProps {
  primaryColor?: string;
  accentCyan?: string;
  cycleText?: string;
}

export const SwissHudOverlay: React.FC<SwissHudOverlayProps> = ({
  primaryColor = '#5322ff',
  accentCyan = '#00E5FF',
  cycleText = 'CYCLE: 10/10 PHASES',
}) => {
  const frame = useCurrentFrame();

  // Subtle value flickering for HUD telemetry
  const latencyFlicker = (0.4 + ((frame * 7) % 5) * 0.02).toFixed(2);
  const submeshFlicker = 4096 + ((frame * 13) % 23) - 11;
  const precisionFlicker = (99.98 + ((frame * 3) % 3) * 0.01).toFixed(2);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
        color: '#FFFFFF',
      }}
    >
      {/* TOP-LEFT HUD */}
      <div
        style={{
          position: 'absolute',
          top: '28px',
          left: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div
          style={{
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '2px',
            color: accentCyan,
            textTransform: 'uppercase',
          }}
        >
          + SYS RES // [1920X1080] :: 60 FPS
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div
            style={{
              padding: '4px 10px',
              backgroundColor: 'rgba(0, 229, 255, 0.1)',
              border: `1px solid ${accentCyan}`,
              borderRadius: '0px',
              fontSize: '11px',
              fontWeight: 700,
              color: accentCyan,
            }}
          >
            FPS: 60
          </div>
          <div
            style={{
              padding: '4px 10px',
              backgroundColor: 'rgba(0, 229, 255, 0.1)',
              border: `1px solid ${accentCyan}`,
              borderRadius: '0px',
              fontSize: '11px',
              fontWeight: 700,
              color: accentCyan,
            }}
          >
            LATENCY: {latencyFlicker}MS
          </div>
          <div
            style={{
              padding: '4px 10px',
              backgroundColor: 'rgba(0, 229, 255, 0.1)',
              border: `1px solid ${accentCyan}`,
              borderRadius: '0px',
              fontSize: '11px',
              fontWeight: 700,
              color: accentCyan,
            }}
          >
            SUBMESH_TRI: {submeshFlicker}
          </div>
        </div>
      </div>

      {/* TOP-RIGHT HUD */}
      <div
        style={{
          position: 'absolute',
          top: '28px',
          right: '32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '6px',
        }}
      >
        <div
          style={{
            padding: '6px 14px',
            backgroundColor: `${primaryColor}33`,
            border: `1px solid ${accentCyan}`,
            borderRadius: '0px',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '2px',
            color: '#FFFFFF',
          }}
        >
          FRM: {String(frame).padStart(4, '0')} // INFINITE LOOP
        </div>
        <div
          style={{
            fontSize: '11px',
            color: accentCyan,
            letterSpacing: '1px',
            opacity: 0.9,
          }}
        >
          SHELL_PHI: 1.618, PRECISION: {precisionFlicker}%
        </div>
        <div
          style={{
            fontSize: '10px',
            color: '#888888',
            letterSpacing: '1px',
          }}
        >
          {cycleText}
        </div>
      </div>

      {/* BOTTOM-LEFT HUD */}
      <div
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '6px 12px',
          backgroundColor: 'rgba(5, 5, 5, 0.85)',
          border: '1px solid #333333',
          borderRadius: '0px',
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            backgroundColor: accentCyan,
            boxShadow: `0 0 8px ${accentCyan}`,
          }}
        />
        <div
          style={{
            fontSize: '11px',
            color: '#DDDDDD',
            letterSpacing: '1px',
          }}
        >
          LAT: {latencyFlicker}MS | SUBMESH: ACTIVE | PHI: 1.618033
        </div>
      </div>

      {/* BOTTOM-RIGHT HUD */}
      <div
        style={{
          position: 'absolute',
          bottom: '28px',
          right: '32px',
          padding: '6px 12px',
          backgroundColor: 'rgba(5, 5, 5, 0.85)',
          border: `1px solid ${primaryColor}`,
          borderRadius: '0px',
          fontSize: '11px',
          fontWeight: 700,
          color: accentCyan,
          letterSpacing: '2px',
        }}
      >
        SWISS BRUTALISM // NO_BORDER_RADIUS
      </div>
    </div>
  );
};
