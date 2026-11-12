import React, { useId } from 'react';

export interface EnergyGlassOrbProps {
  size?: number;
  velocityFactor?: number; // 0 to 1, drives dynamic squash & stretch
  glowIntensity?: number;  // 0 to 1
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const EnergyGlassOrb: React.FC<EnergyGlassOrbProps> = ({
  size = 220,
  velocityFactor = 0,
  glowIntensity = 1,
  children,
  style,
  className,
}) => {
  const uniqueId = useId().replace(/:/g, '');
  const ambientGlowId = `orb-ambient-glow-${uniqueId}`;
  const glassWashId = `orb-glass-wash-${uniqueId}`;

  // Physics & Deformation (Squash & Stretch volume preservation)
  const clampedVelocity = Math.max(0, Math.min(1, velocityFactor));
  const scaleX = 1 + clampedVelocity * 0.25;
  const scaleY = 1 - clampedVelocity * 0.2;
  const clampedGlow = Math.max(0, Math.min(1, glowIntensity));

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: size,
        height: size,
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {/* Dynamic Physics Deformation Container (Squash & Stretch) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${scaleX}, ${scaleY})`,
          transformOrigin: 'center center',
          filter: `drop-shadow(0 0 ${Math.round(size * 0.08)}px rgba(0, 229, 255, ${clampedGlow * 0.35}))`,
        }}
      >
        {/* Optical Depth Backing (Quartz Chamber) */}
        <div
          style={{
            position: 'absolute',
            width: '90%',
            height: '90%',
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.08) 0%, rgba(0, 229, 255, 0.04) 50%, rgba(2, 6, 23, 0.3) 100%)',
            boxShadow: 'inset 0 0 16px rgba(0, 229, 255, 0.12)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Floating Encapsulated Children Container (Scaled 60-70% cleanly centered) */}
        {children && (
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'scale(0.65)',
              transformOrigin: 'center center',
              zIndex: 1,
              pointerEvents: 'auto',
            }}
          >
            {children}
          </div>
        )}

        {/* Overlaid SVG: Optical Shielding, Glass Fresnels & Sheen Highlights */}
        <svg
          viewBox="0 0 200 200"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'visible',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <defs>
            {/* Ambient Glow Gradient */}
            <radialGradient id={ambientGlowId} cx="50%" cy="50%" r="50%">
              <stop offset="65%" stopColor="#00E5FF" stopOpacity="0" />
              <stop offset="90%" stopColor="#00E5FF" stopOpacity={clampedGlow * 0.35} />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
            </radialGradient>

            {/* Multi-stop Glass Wash: center at (80, 80) -> #FFFFFF (0.25) -> #E0F2FE (0.15) -> #00E5FF (0.4) */}
            <radialGradient
              id={glassWashId}
              cx="100"
              cy="100"
              r="90"
              fx="80"
              fy="80"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.25} />
              <stop offset="55%" stopColor="#E0F2FE" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity={0.4} />
            </radialGradient>
          </defs>

          {/* 1. Outer Radial Glow Halo */}
          <g id="orb-ambient-glow">
            <circle cx="100" cy="100" r="100" fill={`url(#${ambientGlowId})`} />
          </g>

          {/* 2. Glass Base Circle */}
          <g id="orb-glass-base">
            <circle cx="100" cy="100" r="90" fill={`url(#${glassWashId})`} />
          </g>

          {/* 3. Crisp Vector Edge Ring & Inner Shadow Ring */}
          <g id="orb-rim-fresnel">
            {/* Subtle inner shadow ring */}
            <circle
              cx="100"
              cy="100"
              r="88"
              fill="none"
              stroke="#003855"
              strokeWidth="1.5"
              opacity={0.35}
            />
            {/* Crisp outer vector edge ring */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#00E5FF"
              strokeWidth="2.5"
            />
          </g>

          {/* 4. Sheen Highlights (Specular Crest & Secondary Glint) */}
          <g id="orb-sheen-highlights">
            {/* Primary specular crest: Elegant curved crescent arc in upper-left quadrant */}
            <path
              d="M 50 50 Q 80 30 130 45 Q 90 40 60 70 Z"
              fill="#FFFFFF"
              opacity={0.75}
            />
            {/* Secondary bounce glint: Subtle elliptical glint near bottom-right rim */}
            <ellipse
              cx="150"
              cy="150"
              rx="12"
              ry="4.5"
              transform="rotate(-45 150 150)"
              fill="#00E5FF"
              opacity={0.4}
            />
          </g>
        </svg>
      </div>
    </div>
  );
};
