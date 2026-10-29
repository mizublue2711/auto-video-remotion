import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { SwissGridBackground } from '../components/SwissGridBackground';
import { SwissHudOverlay } from '../components/SwissHudOverlay';
import { KineticTypography } from '../components/KineticTypography';
import { LogarithmicSpiral3D } from '../components/LogarithmicSpiral3D';
import { RubikCube3D } from '../components/RubikCube3D';
import { BentoGrid3D } from '../components/BentoGrid3D';
import { MacCodeEditor } from '../components/MacCodeEditor';
import { DualEngineCard } from '../components/DualEngineCard';
import { IsometricMatrix3D } from '../components/IsometricMatrix3D';
import { MarqueeTicker } from '../components/MarqueeTicker';
import { InfiniteLoopProps } from '../schemas/infiniteLoopSchema';

// Continuous harmonic sine wave audio energy curve matching explicit phase boundaries
const getAudioEnergy = (frame: number): number => {
  const smoothPulse = (1 + Math.sin((2 * Math.PI * frame) / 27.69)) / 2;
  if (frame < 180) return 0.4; // Phase 1 (0 -> 180)
  if (frame < 720) return 0.8 + 0.4 * Math.sin(frame * 0.05); // Phase 2 (180 -> 720)
  if (frame < 900) return 1.3; // Phase 3 (720 -> 900)
  if (frame < 1170) return 1.5; // Phase 4 (900 -> 1170)
  if (frame < 1440) return 1.7; // Phase 5 (1170 -> 1440)
  if (frame < 1710) return 2.0; // Phase 6 (1440 -> 1710)
  if (frame < 1980) return 2.5 + 0.5 * smoothPulse; // Phase 7 drop climax (1710 -> 1980)
  return Math.max(0.1, 1.5 * (1 - (frame - 1980) / 360)); // Phase 8 outro fade (1980 -> 2340)
};

export const InfiniteContinuousLoopScene: React.FC<InfiniteLoopProps> = ({
  backgroundColor = '#050505',
  gridColor = '#222222',
  primaryColor = '#5322ff',
  accentCyan = '#00E5FF',
  audioUrl = 'audio/signal-at-zero.mp3',
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
  dualEngineNode1 = 'DIFY BRAIN',
  dualEngineNode2 = 'N8N MUSCLE',
  tickerText = 'SYS//CONTINUOUS_ENGINE :: 60FPS',
  cycleText = 'CYCLE: 10/10 PHASES',
  ctaUrl = 'https://artificialcraft.space/',
  overallScale = 1.6,
}) => {
  const frame = useCurrentFrame();

  // Continuous harmonic sine wave (no legacy stutter) based on ~27.69 frames per beat @ 130 BPM
  const smoothPulse = (1 + Math.sin((2 * Math.PI * frame) / 27.69)) / 2;
  const beatScale = 1 + smoothPulse * 0.04;

  // Cinematic Camera Push-In (Frames 60 -> 360 / Sec 1 -> 6)
  const cameraScale = interpolate(frame, [60, 360], [0.75, 1.60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Audio energy calculation
  const audioEnergy = getAudioEnergy(frame);

  // Hardcoded dispersion amount for frame >= 720 so content cards never fly off-screen and remain readable
  const dispersionAmount =
    frame >= 720
      ? 0.12
      : Math.abs(Math.sin((frame / 180) * Math.PI)) * audioEnergy;

  // 3D Euler rotations channeled from music (Frames 720 -> 2340 / Sec 12 -> 39)
  const rotationY =
    interpolate(frame, [720, 2340], [0, 1080]) +
    Math.sin((2 * Math.PI * frame) / 27.69) * 12 * audioEnergy;
  const rotationX = Math.cos((Math.PI * frame) / 180) * 8 * audioEnergy;

  // Outro implosion (Frames 1980 -> 2340 / Sec 33 -> 39) back to origin (0,0,0) for seamless looping into Frame 0
  const outroProgress = interpolate(frame, [1980, 2340], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });
  const outroScale = interpolate(outroProgress, [0, 1], [1.0, 0.0]);
  const outroOpacity = interpolate(outroProgress, [0, 0.9, 1], [1.0, 0.8, 0.0]);

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

      {/* Main Stage Container with Cinematic Camera Push-In & Continuous Harmonic Pulse */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${cameraScale * beatScale * (overallScale / 1.6)})`,
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
              opacity: 1 - dispersionAmount * 0.5,
              transform: `scale(${1 - dispersionAmount * 0.15})`,
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
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* SUB-PHASE 2A (Frames 180 -> 360 / Sec 3 -> 6): 3D Spiral wireframe expands + Rhyme line 1 */}
            {frame >= 180 && frame < 360 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '24px',
                  zIndex: 10,
                }}
              >
                <LogarithmicSpiral3D
                  phase={1}
                  phaseProgress={(frame - 180) / 180}
                  accentColor={accentCyan}
                  secondaryColor="#FFFFFF"
                  gridColor={gridColor}
                />
                <div style={{ zIndex: 20, marginTop: '280px' }}>
                  <KineticTypography
                    text={rhymeLine1}
                    animationType="TYPEWRITER_CHAR"
                    color="#FFFFFF"
                    accentColor={accentCyan}
                    fontSize="38px"
                  />
                </div>
              </div>
            )}

            {/* SUB-PHASE 2B (Frames 360 -> 540 / Sec 6 -> 9): Vertex falloff sweep + Rhyme line 2 */}
            {frame >= 360 && frame < 540 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '24px',
                  zIndex: 10,
                }}
              >
                <LogarithmicSpiral3D
                  phase={2}
                  phaseProgress={(frame - 360) / 180}
                  accentColor={accentCyan}
                  secondaryColor="#FFFFFF"
                  gridColor={gridColor}
                />
                <div style={{ zIndex: 20, marginTop: '280px' }}>
                  <KineticTypography
                    text={rhymeLine2}
                    animationType="TRACK_MATTE_SLIDE"
                    color="#FFFFFF"
                    accentColor={accentCyan}
                    fontSize="38px"
                  />
                </div>
              </div>
            )}

            {/* SUB-PHASE 2C (Frames 540 -> 720 / Sec 9 -> 12): Submesh disintegration + Rhyme line 3 */}
            {frame >= 540 && frame < 720 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '24px',
                  zIndex: 10,
                }}
              >
                <LogarithmicSpiral3D
                  phase={3}
                  phaseProgress={(frame - 540) / 180}
                  accentColor={accentCyan}
                  secondaryColor="#FFFFFF"
                  gridColor={gridColor}
                />
                <div style={{ zIndex: 20, marginTop: '280px' }}>
                  <KineticTypography
                    text={rhymeLine3}
                    animationType="BLUR_TO_SHARP"
                    color="#FFFFFF"
                    accentColor={accentCyan}
                    fontSize="38px"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* PHASES 3 -> 8 (Frames 720 -> 2340): 3D Euler Rotations Container */}
        {frame >= 720 && frame <= 2340 && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              perspective: '1200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${frame >= 1980 ? outroScale : 1})`,
                opacity: frame >= 1980 ? outroOpacity : 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              {/* PHASE 3: 3D Rubik Cube Face Rotations (Frames 720 -> 900 / Sec 12 -> 15) */}
              {frame >= 720 && frame < 900 && (
                <RubikCube3D
                  primaryColor={primaryColor}
                  accentCyan={accentCyan}
                  scale={1.0}
                  effectiveDispersion={dispersionAmount}
                />
              )}

              {/* PHASE 4: Bento Grid 3D Cards with 3D Tilt (Frames 900 -> 1170 / Sec 15 -> 19.5) */}
              {frame >= 900 && frame < 1170 && (
                <BentoGrid3D
                  node1={bentoNode1}
                  node2={bentoNode2}
                  node3={bentoNode3}
                  primaryColor={primaryColor}
                  accentCyan={accentCyan}
                  scale={1.0}
                  submeshDispersion={dispersionAmount}
                />
              )}

              {/* PHASE 5: Mac Code Editor (Frames 1170 -> 1440 / Sec 19.5 -> 24) */}
              {frame >= 1170 && frame < 1440 && (
                <MacCodeEditor
                  codeSnippet={codeSnippet}
                  primaryColor={primaryColor}
                  accentCyan={accentCyan}
                  scale={1.0}
                  submeshDispersion={dispersionAmount}
                />
              )}

              {/* PHASE 6: Dual Engine Card (Frames 1440 -> 1710 / Sec 24 -> 28.5) */}
              {frame >= 1440 && frame < 1710 && (
                <DualEngineCard
                  node1={dualEngineNode1}
                  node2={dualEngineNode2}
                  primaryColor={primaryColor}
                  accentCyan={accentCyan}
                  scale={1.0}
                  submeshDispersion={dispersionAmount}
                />
              )}

              {/* PHASE 7: Isometric Matrix 3D (Frames 1710 -> 1980 / Sec 28.5 -> 33) */}
              {frame >= 1710 && frame < 1980 && (
                <IsometricMatrix3D
                  primaryColor={primaryColor}
                  accentCyan={accentCyan}
                  scale={1.0}
                  submeshDispersion={dispersionAmount}
                />
              )}

              {/* PHASE 8: Outro Implosion Back to Origin (Frames 1980 -> 2340 / Sec 33 -> 39) */}
              {frame >= 1980 && frame <= 2340 && (
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '36px',
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
          </div>
        )}
      </div>

      {/* Persistent Swiss HUD Overlay active across all frames (0 -> 2340) */}
      <SwissHudOverlay
        primaryColor={primaryColor}
        accentCyan={accentCyan}
        cycleText={cycleText}
      />
    </AbsoluteFill>
  );
};
