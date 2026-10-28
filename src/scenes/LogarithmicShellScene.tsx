import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  Series,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { SwissGridBackground } from '../components/SwissGridBackground';
import { KineticTypography } from '../components/KineticTypography';
import { MetricBadge } from '../components/MetricBadge';
import { LogarithmicSpiral3D } from '../components/LogarithmicSpiral3D';
import { LogarithmicShellProps } from '../schemas/logarithmicShellSchema';

export const LogarithmicShellScene: React.FC<LogarithmicShellProps> = ({
  brand = {
    name: 'ARTIFICIAL CRAFT',
    logoUrl: 'https://artificialcraft.space/og.png',
    primaryColor: '#00E5FF',
    backgroundColor: '#050505',
    textColor: '#FFFFFF',
  },
  backgroundColor = '#050505',
  primaryAccent = '#00E5FF',
  gridColor = '#222222',
  phase1Text = 'Complexity is a fool’s spell.',
  phase2Text = 'Simplify to build a shell.',
  phase3Text = 'Data behind, pure art ahead.',
  headerText = 'ARTIFICIAL CRAFT',
  sloganText = 'COMPLEX DATA. PURE VISUAL ART.',
  urlText = 'https://artificialcraft.space/',
  metrics = [
    { label: 'FPS', value: '60' },
    { label: 'LATENCY', value: '0.4MS' },
    { label: 'SUBMESH_TRI', value: '4096' },
    { label: 'SHELL_PHI', value: '1.618' },
    { label: 'PRECISION', value: '99.99%' },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
        overflow: 'hidden',
      }}
    >
      {/* Universal Grid Background & Laser Scan Line */}
      <SwissGridBackground
        backgroundColor={backgroundColor}
        gridColor={gridColor}
        accentColor={primaryAccent}
        showScanLine={true}
        showTelemetryCorners={true}
      />

      {/* Top Telemetry Metric Badges Ribbon */}
      <div
        style={{
          position: 'absolute',
          top: '60px',
          left: '60px',
          right: '60px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 20,
        }}
      >
        <div style={{ display: 'flex', gap: '12px' }}>
          {metrics.slice(0, 3).map((metric, idx) => (
            <MetricBadge
              key={idx}
              label={metric.label}
              value={metric.value}
              accentColor={primaryAccent}
              borderColor={gridColor}
            />
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {metrics.slice(3).map((metric, idx) => (
            <MetricBadge
              key={idx}
              label={metric.label}
              value={metric.value}
              accentColor={primaryAccent}
              borderColor={gridColor}
            />
          ))}
        </div>
      </div>

      {/* Orchestrated Timeline Sequences (Total 2,700 Frames) */}
      <Series>
        {/* Phase 1: Skeletal Ticking Pulse (Frames 0 -> 600 / 10s) */}
        <Series.Sequence durationInFrames={600}>
          <Phase1View
            text={phase1Text}
            accentColor={primaryAccent}
            logoUrl={brand.logoUrl}
          />
        </Series.Sequence>

        {/* Phase 2: Arpeggiated Synth & Forge Dynamic (Frames 600 -> 1440 / 14s) */}
        <Series.Sequence durationInFrames={840}>
          <Phase2View text={phase2Text} accentColor={primaryAccent} />
        </Series.Sequence>

        {/* Phase 3: Sub-Bass Braams & Submesh Purge (Frames 1440 -> 2160 / 12s) */}
        <Series.Sequence durationInFrames={720}>
          <Phase3View text={phase3Text} accentColor={primaryAccent} />
        </Series.Sequence>

        {/* Phase 4: Full Orchestral Strings & Seamless Loop Outro (Frames 2160 -> 2700 / 9s) */}
        <Series.Sequence durationInFrames={540}>
          <Phase4View
            headerText={headerText}
            sloganText={sloganText}
            urlText={urlText}
            accentColor={primaryAccent}
            logoUrl={brand.logoUrl}
          />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

// ==========================================
// PHASE 1 SUB-SCENE (Frames 0 -> 600)
// ==========================================
const Phase1View: React.FC<{
  text: string;
  accentColor: string;
  logoUrl?: string;
}> = ({ text, accentColor }) => {
  const frame = useCurrentFrame();
  const progress = frame / 600;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LogarithmicSpiral3D
        phase={1}
        phaseProgress={progress}
        accentColor={accentColor}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '120px',
          textAlign: 'center',
          zIndex: 15,
          padding: '16px 32px',
          backgroundColor: 'rgba(5, 5, 5, 0.75)',
          border: `1px solid ${accentColor}40`,
        }}
      >
        <KineticTypography
          text={text}
          mode="scramble"
          color="#FFFFFF"
          accentColor={accentColor}
          fontSize="36px"
        />
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// PHASE 2 SUB-SCENE (Frames 600 -> 1440)
// ==========================================
const Phase2View: React.FC<{
  text: string;
  accentColor: string;
}> = ({ text, accentColor }) => {
  const frame = useCurrentFrame();
  const progress = frame / 840;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LogarithmicSpiral3D
        phase={2}
        phaseProgress={progress}
        accentColor={accentColor}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '120px',
          textAlign: 'center',
          zIndex: 15,
          padding: '16px 32px',
          backgroundColor: 'rgba(5, 5, 5, 0.85)',
          border: `1px solid ${accentColor}`,
        }}
      >
        <KineticTypography
          text={text}
          mode="typewriter"
          color="#FFFFFF"
          accentColor={accentColor}
          fontSize="36px"
        />
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// PHASE 3 SUB-SCENE (Frames 1440 -> 2160)
// ==========================================
const Phase3View: React.FC<{
  text: string;
  accentColor: string;
}> = ({ text, accentColor }) => {
  const frame = useCurrentFrame();
  const progress = frame / 720;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Split/Grid telemetry columns */}
      <div
        style={{
          position: 'absolute',
          left: '80px',
          top: '180px',
          bottom: '180px',
          width: '2px',
          backgroundColor: `${accentColor}60`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '80px',
          top: '180px',
          bottom: '180px',
          width: '2px',
          backgroundColor: `${accentColor}60`,
        }}
      />

      <LogarithmicSpiral3D
        phase={3}
        phaseProgress={progress}
        accentColor={accentColor}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '120px',
          textAlign: 'center',
          zIndex: 15,
          padding: '16px 32px',
          backgroundColor: 'rgba(5, 5, 5, 0.9)',
          border: `1px solid ${accentColor}`,
        }}
      >
        <KineticTypography
          text={text}
          mode="scramble"
          color="#FFFFFF"
          accentColor={accentColor}
          fontSize="36px"
        />
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// PHASE 4 SUB-SCENE (Frames 2160 -> 2700)
// ==========================================
const Phase4View: React.FC<{
  headerText: string;
  sloganText: string;
  urlText: string;
  accentColor: string;
  logoUrl?: string;
}> = ({ headerText, sloganText, urlText, accentColor, logoUrl }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = frame / 540;

  const sloganSpring = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 14 },
  });

  const urlSpring = spring({
    frame: Math.max(0, frame - 60),
    fps,
    config: { damping: 14 },
  });

  // Whip-pan blur simulation near transition
  const blurAmount = interpolate(frame, [0, 15], [8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
        filter: blurAmount > 0.1 ? `blur(${blurAmount}px)` : 'none',
      }}
    >
      <LogarithmicSpiral3D
        phase={4}
        phaseProgress={progress}
        accentColor={accentColor}
        logoUrl={logoUrl}
        headerText={headerText}
      />

      {/* Slogan Reveal */}
      <div
        style={{
          position: 'absolute',
          bottom: '180px',
          zIndex: 15,
          opacity: sloganSpring,
          transform: `translateY(${interpolate(sloganSpring, [0, 1], [30, 0])}px)`,
        }}
      >
        <KineticTypography
          text={sloganText}
          mode="clip"
          color="#CCCCCC"
          accentColor={accentColor}
          fontSize="24px"
          letterSpacing="4px"
        />
      </div>

      {/* URL Reveal */}
      <div
        style={{
          position: 'absolute',
          bottom: '120px',
          zIndex: 15,
          opacity: urlSpring,
          transform: `translateY(${interpolate(urlSpring, [0, 1], [20, 0])}px)`,
          padding: '8px 20px',
          border: `1px solid ${accentColor}`,
          backgroundColor: 'rgba(5, 5, 5, 0.95)',
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
            fontSize: '18px',
            fontWeight: '700',
            color: accentColor,
            letterSpacing: '2px',
          }}
        >
          {urlText}
        </span>
      </div>
    </AbsoluteFill>
  );
};
