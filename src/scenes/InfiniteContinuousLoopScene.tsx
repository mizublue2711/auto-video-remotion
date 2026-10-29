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
import { RubikCube3D } from '../components/RubikCube3D';
import { BentoGrid3D } from '../components/BentoGrid3D';
import { MacCodeEditor } from '../components/MacCodeEditor';
import { DualEngineCard } from '../components/DualEngineCard';
import { IsometricMatrix3D } from '../components/IsometricMatrix3D';
import { MarqueeTicker } from '../components/MarqueeTicker';
import { InfiniteLoopProps } from '../schemas/infiniteLoopSchema';

// Dynamic Audio Energy Curve map matching explicit phase boundaries
const getAudioEnergy = (frame: number): number => {
  if (frame < 180) return 0.4; // Phase 1 (0 -> 180)
  if (frame < 720) return 0.8 + 0.4 * Math.sin(frame * 0.05); // Phase 2 (180 -> 720)
  if (frame < 900) return 1.3; // Phase 3 (720 -> 900)
  if (frame < 1170) return 1.5; // Phase 4 (900 -> 1170)
  if (frame < 1440) return 1.7; // Phase 5 (1170 -> 1440)
  if (frame < 1710) return 2.0; // Phase 6 (1440 -> 1710)
  if (frame < 1980) return 2.5 + 0.5 * (frame % 27 < 5 ? 1 : 0); // Phase 7 drop climax (1710 -> 1980)
  return Math.max(0.1, 1.5 * (1 - (frame - 1980) / 360)); // Phase 8 outro fade (1980 -> 2340)
};

export const InfiniteContinuousLoopScene: React.FC<InfiniteLoopProps> = ({
  backgroundColor = '#050505',
  gridColor = '#222222',
  primaryColor = '#5322ff',
  accentCyan = '#00E5FF',
  audioUrl = 'audio/signal-at-zero.mp3',
  bpm = 130,
  animationType = 'TYPEWRITER_CHAR',
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

  // Beat pulse calculation based on 130 BPM (~27.69 frames per beat)
  const framesPerBeat = (60 * fps) / bpm;
  const frameInBeat = frame % framesPerBeat;
  const beatPulseSpring = spring({
    frame: frameInBeat,
    fps,
    config: { damping: 10, mass: 0.3 },
  });
  const beatScale = 1 + beatPulseSpring * 0.04;

  // Audio energy & Dispersion math formula
  const audioEnergy = getAudioEnergy(frame);
  const effectiveDispersion =
    Math.abs(Math.sin((frame / 180) * Math.PI)) * audioEnergy;

  // Implosion loop-back at Frame 2339 back to Frame 0 origin
  const seamlessLoopFactor = interpolate(frame, [2280, 2339], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const activeDispersion = Math.max(effectiveDispersion, seamlessLoopFactor);

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
        overflow: 'hidden',
      }}
    >
      {/* Beat-synced Audio Track */}
      {audioUrl && <Audio src={staticFile(audioUrl)} />}

      {/* Swiss Grid Background with Dynamic Laser Scan Line */}
      <SwissGridBackground
        backgroundColor={backgroundColor}
        gridColor={gridColor}
        accentColor={accentCyan}
        showScanLine={true}
      />

      {/* Main Stage Container */}
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
        {/* PHASE 1: Swiss Grid & Laser Scan Initialization (Frames 0 -> 180) */}
        {frame >= 0 && frame < 180 && (
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              opacity: 1 - activeDispersion * 0.5,
              transform: `scale(${1 - activeDispersion * 0.15})`,
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
              animationType={animationType}
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

        {/* PHASE 2: Logarithmic Shell 3-Phase Script (Frames 180 -> 720) */}
        {frame >= 180 && frame < 720 && (
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '28px',
              opacity: 1 - activeDispersion * 0.5,
            }}
          >
            {/* SUB-PHASE 2A (Frames 180 -> 360): 3D Wireframe Spiral Expands + RhymeLine 1 */}
            {frame >= 180 && frame < 360 && (
              <>
                <svg width="600" height="140" style={{ overflow: 'visible' }}>
                  <path
                    d="M 0 70 Q 150 -20 300 70 T 600 70"
                    fill="none"
                    stroke={accentCyan}
                    strokeWidth="3"
                    style={{ filter: `drop-shadow(0 0 12px ${accentCyan})` }}
                  />
                  <circle cx="300" cy="70" r="10" fill={primaryColor} />
                </svg>
                <KineticTypography
                  text={rhymeLine1}
                  animationType="TYPEWRITER_CHAR"
                  color="#FFFFFF"
                  accentColor={accentCyan}
                  fontSize="38px"
                />
              </>
            )}

            {/* SUB-PHASE 2B (Frames 360 -> 540): Vertex Falloff Sweep + RhymeLine 2 */}
            {frame >= 360 && frame < 540 && (
              <>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 50px)',
                    gridGap: '12px',
                  }}
                >
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: '50px',
                        height: '50px',
                        border: `1px solid ${primaryColor}`,
                        backgroundColor: i % 2 === 0 ? `${accentCyan}22` : 'transparent',
                        boxShadow: i % 3 === 0 ? `0 0 10px ${accentCyan}` : 'none',
                      }}
                    />
                  ))}
                </div>
                <KineticTypography
                  text={rhymeLine2}
                  animationType="TRACK_MATTE_SLIDE"
                  color="#FFFFFF"
                  accentColor={accentCyan}
                  fontSize="38px"
                />
              </>
            )}

            {/* SUB-PHASE 2C (Frames 540 -> 720): Submesh Disintegration + RhymeLine 3 */}
            {frame >= 540 && frame < 720 && (
              <>
                <div
                  style={{
                    display: 'flex',
                    gap: '16px',
                  }}
                >
                  {[metric1, metric2, metric3].map((m, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px 20px',
                        backgroundColor: 'rgba(10,10,20,0.85)',
                        border: `1px solid ${accentCyan}`,
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#FFFFFF',
                      }}
                    >
                      {m}
                    </div>
                  ))}
                </div>
                <KineticTypography
                  text={rhymeLine3}
                  animationType="BLUR_TO_SHARP"
                  color="#FFFFFF"
                  accentColor={accentCyan}
                  fontSize="38px"
                />
              </>
            )}
          </div>
        )}

        {/* PHASE 3: 3D Rubik Cube Layer Rotations (Frames 720 -> 900) */}
        {frame >= 720 && frame < 900 && (
          <RubikCube3D
            primaryColor={primaryColor}
            accentCyan={accentCyan}
            scale={1.0}
            effectiveDispersion={activeDispersion}
          />
        )}

        {/* PHASE 4: Bento Grid 3D Cards with 3D Tilt (Frames 900 -> 1170) */}
        {frame >= 900 && frame < 1170 && (
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

        {/* PHASE 5: Mac Code Editor (Frames 1170 -> 1440) */}
        {frame >= 1170 && frame < 1440 && (
          <MacCodeEditor
            codeSnippet={codeSnippet}
            primaryColor={primaryColor}
            accentCyan={accentCyan}
            scale={1.0}
            submeshDispersion={activeDispersion}
          />
        )}

        {/* PHASE 6: Dual Engine Node Cards (Frames 1440 -> 1710) */}
        {frame >= 1440 && frame < 1710 && (
          <DualEngineCard
            node1={dualEngineNode1}
            node2={dualEngineNode2}
            primaryColor={primaryColor}
            accentCyan={accentCyan}
            scale={1.0}
            submeshDispersion={activeDispersion}
          />
        )}

        {/* PHASE 7: Isometric Matrix 3D Climax Drop (Frames 1710 -> 1980) */}
        {frame >= 1710 && frame < 1980 && (
          <IsometricMatrix3D
            primaryColor={primaryColor}
            accentCyan={accentCyan}
            scale={1.0}
            submeshDispersion={activeDispersion}
          />
        )}

        {/* PHASE 8: Marquee Ticker & Final Outro Implosion Back to Origin (Frames 1980 -> 2340) */}
        {frame >= 1980 && frame <= 2340 && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '36px',
              opacity: interpolate(frame, [1980, 2020, 2300, 2340], [0, 1, 1, 1]),
              transform: `scale(${interpolate(frame, [1980, 2340], [1.1, 1.0])})`,
            }}
          >
            <MarqueeTicker
              tickerText={tickerText}
              primaryColor={primaryColor}
              accentCyan={accentCyan}
            />

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
              animationType="STROKE_TRIM_PATH"
              color="#FFFFFF"
              accentColor={accentCyan}
              fontSize="48px"
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

      {/* Persistent HUD Overlay active across all frames (0 -> 2340) */}
      <SwissHudOverlay
        primaryColor={primaryColor}
        accentCyan={accentCyan}
        cycleText={cycleText}
      />
    </AbsoluteFill>
  );
};
