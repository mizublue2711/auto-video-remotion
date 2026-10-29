import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { SwissGridBackground } from '../components/SwissGridBackground';
import { SwissHudOverlay } from '../components/SwissHudOverlay';
import { KineticTypography } from '../components/KineticTypography';
import { BentoGrid3D } from '../components/BentoGrid3D';
import { MacCodeEditor } from '../components/MacCodeEditor';
import { DualEngineCard } from '../components/DualEngineCard';
import { IsometricMatrix3D } from '../components/IsometricMatrix3D';
import { MarqueeTicker } from '../components/MarqueeTicker';
import { InfiniteLoopProps } from '../schemas/infiniteLoopSchema';

export const InfiniteContinuousLoopScene: React.FC<InfiniteLoopProps> = ({
  backgroundColor = '#050505',
  gridColor = '#222222',
  primaryColor = '#5322ff',
  accentCyan = '#00E5FF',
  audioUrl = 'audio/signal-at-zero.mp3',
  bpm = 130,
  title = 'ARTIFICIAL CRAFT',
  slogan = 'COMPLEX DATA. PURE VISUAL ART.',
  bentoNode1 = 'AUTOMATION',
  bentoNode2 = 'PRECISION',
  bentoNode3 = 'SCALABILITY',
  rhymeLine1 = "Complexity is a fool’s spell.",
  rhymeLine2 = 'Simplify to build a shell.',
  rhymeLine3 = 'Data behind, pure art ahead.',
  codeSnippet = "import { AbsoluteFill } from 'remotion';\nexport const LogarithmicShell = () => ...",
  metric1 = 'DETERMINISTIC SLA: 99.99%',
  metric2 = 'FRAME_RATE: 60 FPS',
  metric3 = 'LATENCY: 1.4s',
  dualEngineNode1 = 'DIFY BRAIN',
  dualEngineNode2 = 'N8N MUSCLE',
  tickerText = 'SYS//CONTINUOUS_ENGINE :: 60FPS',
  cycleText = 'CYCLE: 10/10 PHASES',
  ctaUrl = 'https://artificialcraft.space/',
  overallScale = 1.6,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Beat pulse calculation based on 130 BPM
  const framesPerBeat = (60 * fps) / bpm; // ~27.692 frames/beat
  const frameInBeat = frame % framesPerBeat;
  const beatPulseSpring = spring({
    frame: frameInBeat,
    fps,
    config: { damping: 10, mass: 0.3 },
  });
  const beatScale = 1 + beatPulseSpring * 0.04;

  // 10-phase breakdown: 1800 frames total, 180 frames per phase
  const phaseIndex = Math.min(9, Math.floor(frame / 180));
  const phaseFrame = frame % 180; // 0 to 179

  // Submesh dispersion math for transitions (0 = fully formed, 1 = exploded/dispersed submesh)
  const dispersionIn = interpolate(phaseFrame, [0, 25], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dispersionOut = interpolate(phaseFrame, [155, 179], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Implosion loop-back at frame 1799 back to frame 0 origin
  const seamlessLoopFactor = interpolate(frame, [1740, 1799], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const activeDispersion = Math.max(dispersionIn, dispersionOut, seamlessLoopFactor);

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
        overflow: 'hidden',
      }}
    >
      {/* Audio Track */}
      {audioUrl && <Audio src={staticFile(audioUrl)} />}

      {/* Swiss Grid Background with Active Laser Scanner */}
      <SwissGridBackground
        backgroundColor={backgroundColor}
        gridColor={gridColor}
        accentColor={accentCyan}
        showScanLine={true}
      />

      {/* Main 3D Stage Container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${overallScale * beatScale})`,
          transition: 'transform 0.05s ease-out',
        }}
      >
        {/* PHASE 0: Title & Origin Core (Frames 0 - 179) */}
        {phaseIndex === 0 && (
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              opacity: 1 - activeDispersion * 0.8,
              transform: `scale(${1 - activeDispersion * 0.2})`,
            }}
          >
            <div
              style={{
                width: '120px',
                height: '120px',
                border: `3px solid ${primaryColor}`,
                backgroundColor: 'rgba(83, 34, 255, 0.15)',
                boxShadow: `0 0 30px ${accentCyan}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: accentCyan,
                  boxShadow: `0 0 20px ${accentCyan}`,
                }}
              />
            </div>
            <KineticTypography
              text={title}
              mode="scramble"
              color="#FFFFFF"
              accentColor={accentCyan}
              fontSize="52px"
            />
            <div
              style={{
                color: accentCyan,
                fontSize: '18px',
                letterSpacing: '3px',
                fontWeight: 700,
              }}
            >
              {slogan}
            </div>
          </div>
        )}

        {/* PHASE 1: Rhyme Line 1 & Vector Wireframe Lines (Frames 180 - 359) */}
        {phaseIndex === 1 && (
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
              opacity: 1 - activeDispersion * 0.8,
            }}
          >
            <svg width="600" height="120" style={{ overflow: 'visible' }}>
              <path
                d="M 0 60 L 200 10 L 400 110 L 600 60"
                fill="none"
                stroke={accentCyan}
                strokeWidth="3"
                style={{ filter: `drop-shadow(0 0 10px ${accentCyan})` }}
              />
              <circle cx="200" cy="10" r="8" fill={primaryColor} />
              <circle cx="400" cy="110" r="8" fill={primaryColor} />
            </svg>
            <KineticTypography
              text={rhymeLine1}
              mode="scramble"
              color="#FFFFFF"
              accentColor={accentCyan}
              fontSize="38px"
            />
          </div>
        )}

        {/* PHASE 2: Bento Grid 3D (Frames 360 - 539) */}
        {phaseIndex === 2 && (
          <BentoGrid3D
            node1={bentoNode1}
            node2={bentoNode2}
            node3={bentoNode3}
            primaryColor={primaryColor}
            accentCyan={accentCyan}
            scale={1.0}
            submeshDispersion={activeDispersion}
          />
        )}

        {/* PHASE 3: Rhyme Line 2 & Submesh Disintegration (Frames 540 - 719) */}
        {phaseIndex === 3 && (
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
              opacity: 1 - activeDispersion * 0.8,
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 60px)',
                gridGap: '12px',
              }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '60px',
                    height: '60px',
                    border: `1px solid ${primaryColor}`,
                    backgroundColor: i % 2 === 0 ? `${accentCyan}22` : 'transparent',
                    boxShadow: i % 3 === 0 ? `0 0 10px ${accentCyan}` : 'none',
                  }}
                />
              ))}
            </div>
            <KineticTypography
              text={rhymeLine2}
              mode="typewriter"
              color="#FFFFFF"
              accentColor={accentCyan}
              fontSize="38px"
            />
          </div>
        )}

        {/* PHASE 4: Mac Code Editor (Frames 720 - 899) */}
        {phaseIndex === 4 && (
          <MacCodeEditor
            codeSnippet={codeSnippet}
            primaryColor={primaryColor}
            accentCyan={accentCyan}
            scale={1.0}
            submeshDispersion={activeDispersion}
          />
        )}

        {/* PHASE 5: Metrics Display (Frames 900 - 1079) */}
        {phaseIndex === 5 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              alignItems: 'center',
              opacity: 1 - activeDispersion * 0.8,
            }}
          >
            {[metric1, metric2, metric3].map((m, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px 36px',
                  backgroundColor: 'rgba(10, 10, 20, 0.9)',
                  border: `2px solid ${idx === 0 ? accentCyan : primaryColor}`,
                  boxShadow: `0 0 20px ${idx === 0 ? accentCyan : primaryColor}66`,
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '2px',
                }}
              >
                {m}
              </div>
            ))}
          </div>
        )}

        {/* PHASE 6: Dual Engine Card (Frames 1080 - 1259) */}
        {phaseIndex === 6 && (
          <DualEngineCard
            node1={dualEngineNode1}
            node2={dualEngineNode2}
            primaryColor={primaryColor}
            accentCyan={accentCyan}
            scale={1.0}
            submeshDispersion={activeDispersion}
          />
        )}

        {/* PHASE 7: Isometric Matrix 3D (Frames 1260 - 1439) */}
        {phaseIndex === 7 && (
          <IsometricMatrix3D
            primaryColor={primaryColor}
            accentCyan={accentCyan}
            scale={1.0}
            submeshDispersion={activeDispersion}
          />
        )}

        {/* PHASE 8: Marquee Ticker & Rhyme Line 3 (Frames 1440 - 1619) */}
        {phaseIndex === 8 && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '40px',
              opacity: 1 - activeDispersion * 0.8,
            }}
          >
            <MarqueeTicker
              tickerText={tickerText}
              primaryColor={primaryColor}
              accentCyan={accentCyan}
            />
            <KineticTypography
              text={rhymeLine3}
              mode="scramble"
              color="#FFFFFF"
              accentColor={accentCyan}
              fontSize="38px"
            />
          </div>
        )}

        {/* PHASE 9: Implosion Back to Origin & CTA (Frames 1620 - 1799) */}
        {phaseIndex === 9 && (
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
              // On frame 1799, as seamlessLoopFactor -> 1, scale & structure implode exactly back to Phase 0 initial title
              transform: `scale(${interpolate(phaseFrame, [0, 179], [1.2, 1.0])})`,
              opacity: interpolate(phaseFrame, [0, 120, 179], [1, 1, 1]),
            }}
          >
            <div
              style={{
                width: '120px',
                height: '120px',
                border: `3px solid ${primaryColor}`,
                backgroundColor: 'rgba(83, 34, 255, 0.15)',
                boxShadow: `0 0 30px ${accentCyan}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: accentCyan,
                  boxShadow: `0 0 20px ${accentCyan}`,
                }}
              />
            </div>
            <KineticTypography
              text={title}
              mode="scramble"
              color="#FFFFFF"
              accentColor={accentCyan}
              fontSize="52px"
            />
            <div
              style={{
                padding: '10px 28px',
                backgroundColor: 'rgba(0, 229, 255, 0.1)',
                border: `2px solid ${accentCyan}`,
                color: accentCyan,
                fontSize: '20px',
                fontWeight: 800,
                letterSpacing: '3px',
              }}
            >
              {ctaUrl}
            </div>
          </div>
        )}
      </div>

      {/* Real-time flickering HUD Telemetry Overlay on top of all 3D layers */}
      <SwissHudOverlay
        primaryColor={primaryColor}
        accentCyan={accentCyan}
        cycleText={cycleText}
      />
    </AbsoluteFill>
  );
};
