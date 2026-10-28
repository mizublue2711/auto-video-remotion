import React, { useMemo, useState } from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  random,
  Img,
} from 'remotion';
import { MasterSceneInputProps } from '../types/motion-schema';

const DEFAULT_FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect width="800" height="450" fill="%230F172A" stroke="%2300E5FF" stroke-width="2"/><text x="400" y="225" font-family="monospace" font-size="24" fill="%2300E5FF" text-anchor="middle">ARTIFICIAL CRAFT // 60FPS</text></svg>';

export const MasterDirectorScene: React.FC<MasterSceneInputProps> = ({
  title,
  slogan,
  mockupUrl,
  metrics,
  config,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [imageSrc, setImageSrc] = useState<string>(mockupUrl || DEFAULT_FALLBACK_IMAGE);

  // STAGE 1: INTRO KINETIC TYPOGRAPHY (Frame 0 -> 45)
  const introStart = config?.storyboardTimeline.intro.startFrame ?? 0;
  const introEnd = config?.storyboardTimeline.intro.endFrame ?? 45;
  const introProgress = interpolate(frame, [introStart, introEnd], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.5)),
  });

  // STAGE 2: ENVIRONMENT GRID (Frame 40 -> 70)
  const envStart = config?.storyboardTimeline.environment.startFrame ?? 40;
  const envEnd = config?.storyboardTimeline.environment.endFrame ?? 70;
  const gridLineWidth = interpolate(frame, [envStart, envEnd], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // STAGE 3: LASER SCAN ACTIVATION (Frame 60 -> 90)
  const actStart = config?.storyboardTimeline.activation.startFrame ?? 60;
  const actEnd = config?.storyboardTimeline.activation.endFrame ?? 90;
  const laserPos = interpolate(frame, [actStart, actEnd], [-20, 120], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // STAGE 4: CONTENT 3D REVEAL (Frame 80 -> End)
  const revealStart = config?.storyboardTimeline.contentReveal.startFrame ?? 80;
  const mockupSpring = spring({
    frame: frame - revealStart,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // DEPTH & VELOCITY BLUR CALCULATIONS
  const maxBlur = config?.cameraAndDepthTokens.depthOfFieldBlur.maxBlurPx ?? 8;
  const currentY = interpolate(frame, [80, 120], [150, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const prevY = interpolate(Math.max(0, frame - 1), [80, 120], [150, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const velocity = Math.abs(currentY - prevY);
  const dofBlur = Math.min(maxBlur, velocity * 0.4);

  // SCRAMBLE TEXT GENERATOR
  const scrambleChars = config?.kineticTypographyTokens.scrambleChars ?? '!@#$%^&*()_+-=0123456789CRAFT';
  const scrambledSlogan = useMemo(() => {
    if (frame < 10) return '!@#$%^&*()';
    if (frame < 30) {
      return slogan
        .split('')
        .map((char) => (char === ' ' ? ' ' : scrambleChars[Math.floor(random(frame + char) * scrambleChars.length)]))
        .join('');
    }
    return slogan;
  }, [frame, slogan, scrambleChars]);

  const isGlitchFrame = frame > 60 && random(frame) < 0.08;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#050505',
        color: '#FFF',
        fontFamily: 'JetBrains Mono, monospace',
        filter: isGlitchFrame ? 'invert(0.1) hue-rotate(90deg)' : 'none',
      }}
    >
      {/* BACKGROUND BRUTALIST GRID */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.3 * (gridLineWidth / 100),
        }}
      />

      {/* LASER SCAN BORDER */}
      <div style={{ position: 'absolute', inset: '50px', border: '1px solid #222', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: `${laserPos}%`,
            width: '100px',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.5), transparent)',
            transform: 'skewX(-20deg)',
          }}
        />
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <div
        style={{
          padding: '80px',
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* HEADER */}
        <div>
          <div style={{ color: '#00E5FF', fontSize: '14px', marginBottom: '8px' }}>
            SYS//TELEMETRY: 60FPS AUTOMATION
          </div>
          <h1
            style={{
              fontSize: '56px',
              margin: 0,
              textTransform: 'uppercase',
              transform: `translateY(${(1 - introProgress) * 40}px)`,
            }}
          >
            {title}
          </h1>
          <div style={{ color: '#888', fontSize: '20px', marginTop: '10px' }}>{scrambledSlogan}</div>
        </div>

        {/* 3D MOCKUP WITH DEPTH OF FIELD */}
        <div style={{ perspective: '1200px', display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              transform: `rotateX(10deg) rotateY(-12deg) scale(${mockupSpring}) translateY(${currentY}px)`,
              filter: `blur(${dofBlur}px)`,
              boxShadow: '0 20px 50px rgba(0, 229, 255, 0.15)',
              border: '1px solid #00E5FF',
            }}
          >
            <Img
              src={imageSrc}
              onError={() => setImageSrc(DEFAULT_FALLBACK_IMAGE)}
              style={{ width: '800px', display: 'block' }}
            />
          </div>
        </div>

        {/* FOOTER METRICS */}
        <div style={{ display: 'flex', gap: '40px' }}>
          {metrics.map((m, idx) => (
            <div key={idx} style={{ borderLeft: '2px solid #00E5FF', paddingLeft: '12px' }}>
              <div style={{ fontSize: '12px', color: '#666' }}>{m.label}</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
