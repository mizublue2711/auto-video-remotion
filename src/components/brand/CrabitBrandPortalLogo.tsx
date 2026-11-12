import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface CrabitBrandPortalLogoProps {
  /** Size in pixels (width and height). Default: 320px */
  size?: number;
  /** Speed factor for shockwaves and animations. Default: 1 */
  pulseSpeed?: number;
  /** 0 to 1, drives swirling convergence of particle dust toward center. Default: 0 */
  portalSuctionStrength?: number;
  /** Optional inline CSS styles for root wrapper */
  style?: React.CSSProperties;
}

/** Precomputed 32 deterministic particles for the suction vortex dust */
const VORTEX_PARTICLES = Array.from({ length: 32 }).map((_, i) => {
  // Golden ratio angle scattering
  const baseAngle = (i * 137.5077 * Math.PI) / 180;
  // Distribute distance radially between 65px and 190px
  const baseRadius = 65 + ((i * 37) % 125);
  // Size variation between 1.2px and 2.8px
  const size = 1.2 + ((i * 5) % 3) * 0.8;
  // Brand color cycling
  const colors = ['#00E5FF', '#C084FC', '#FFFFFF', '#2563EB'];
  const color = colors[i % colors.length];
  return { id: i, baseAngle, baseRadius, size, color };
});

/** Helper to generate logarithmic spiral blade path centered at (200, 200) */
function generateLogarithmicSpiralArm(startAngleRad: number): string {
  const pointsOuter: [number, number][] = [];
  const pointsInner: [number, number][] = [];
  const steps = 28;
  const a = 36; // Inner radius
  const b = 0.225; // Growth rate
  const maxTheta = 2.3 * Math.PI; // ~1.15 turns

  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    const theta = t * maxTheta;
    const r = Math.min(192, a * Math.exp(b * theta));
    const angle = startAngleRad + theta;

    // Arm thickness tapers from ~16px near the base down to 2px at the outer tip
    const widthAngle = Math.max(0.015, (16 * (1 - t * 0.78)) / r);

    const xOuter = 200 + r * Math.cos(angle + widthAngle / 2);
    const yOuter = 200 + r * Math.sin(angle + widthAngle / 2);

    const xInner = 200 + r * Math.cos(angle - widthAngle / 2);
    const yInner = 200 + r * Math.sin(angle - widthAngle / 2);

    pointsOuter.push([xOuter, yOuter]);
    pointsInner.push([xInner, yInner]);
  }

  const parts: string[] = [];
  pointsOuter.forEach((pt, idx) => {
    parts.push(`${idx === 0 ? 'M' : 'L'} ${pt[0].toFixed(2)} ${pt[1].toFixed(2)}`);
  });
  for (let i = pointsInner.length - 1; i >= 0; i--) {
    parts.push(`L ${pointsInner[i][0].toFixed(2)} ${pointsInner[i][1].toFixed(2)}`);
  }
  parts.push('Z');
  return parts.join(' ');
}

// 4 logarithmic spiral arms spaced at 90-degree intervals
const SPIRAL_ARMS_PATHS = [0, 1, 2, 3].map((i) =>
  generateLogarithmicSpiralArm((i * Math.PI) / 2)
);

/** Helper to generate regular polygon points string for faceted shockwaves */
function getRegularPolygonPoints(
  cx: number,
  cy: number,
  radius: number,
  sides: number,
  rotationRad: number
): string {
  const pts: string[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides + rotationRad;
    const px = cx + radius * Math.cos(angle);
    const py = cy + radius * Math.sin(angle);
    pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
  }
  return pts.join(' ');
}

/**
 * CrabitBrandPortalLogo
 *
 * Master Brand Convergence & Halo Portal Component featuring:
 * 1. Logarithmic suction vortex arms spinning in Royal Blue & Deep Navy with particle dust
 * 2. Tri-color concentric polygonal & circular shockwaves (#00E5FF, #C084FC, #FFFFFF)
 * 3. Intense radial core aura (#00E5FF -> #0F172A)
 * 4. High-specular faceted Carat Diamond Crab emblem bounded in 120x120px with breathing pulse
 */
export const CrabitBrandPortalLogo: React.FC<CrabitBrandPortalLogoProps> = ({
  size = 320,
  pulseSpeed = 1,
  portalSuctionStrength = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const rawId = React.useId();
  const id = `crabit-portal-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  // Clamped portal suction strength [0, 1]
  const clampedSuction = Math.max(0, Math.min(1, portalSuctionStrength));

  // Vortex rotation: clockwise (frame * 3 * pulseSpeed) % 360
  const vortexRotation = (frame * 3 * pulseSpeed) % 360;

  // Breathing scale pulse: 1 + Math.sin(frame * 0.1 * pulseSpeed) * 0.05
  const breathingPulse = 1 + Math.sin(frame * 0.1 * pulseSpeed) * 0.05;

  // Base scale to fit mascot strictly within 120x120px area at center (x: 140 to 260, y: 140 to 260)
  // Native mascot width is ~344px (120 / 344 = 0.3488). With 0.342 * 1.05 = ~0.359 (max width ~123px).
  const emblemBaseScale = 0.342;
  const emblemFinalScale = emblemBaseScale * breathingPulse;

  // Claw micro-sway for dynamic life
  const clawCheerAngle = Math.sin(frame * 0.12 * pulseSpeed) * 2;

  // 3 Concentric shockwave rings parameters
  // Cycle period: 45 frames
  const shockwaveRings = [
    { offset: 0, stroke: '#00E5FF' },
    { offset: 15, stroke: '#C084FC' },
    { offset: 30, stroke: '#FFFFFF' },
  ].map((ring, idx) => {
    const ringFrame = frame * pulseSpeed - ring.offset;
    const normalizedFrame = ((ringFrame % 45) + 45) % 45;
    const progress = normalizedFrame / 45; // 0 to 1
    const radius = 60 + progress * (180 - 60); // 60px to 180px
    const opacity = 0.8 * (1 - progress); // 0.8 to 0
    return {
      id: idx,
      radius,
      opacity,
      stroke: ring.stroke,
      strokeWidth: 2.5,
      polygonRotation: (frame * 0.015 * pulseSpeed + idx * 0.25) % (Math.PI * 2),
    };
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        ...style,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Intense Core Radial Glow */}
          <radialGradient id={`${id}-portalCoreGlow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.6" />
            <stop offset="38%" stopColor="#2563EB" stopOpacity="0.32" />
            <stop offset="72%" stopColor="#0F172A" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </radialGradient>

          {/* Secondary Intense Center Bloom */}
          <radialGradient id={`${id}-centerBloom`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="28%" stopColor="#00E5FF" stopOpacity="0.65" />
            <stop offset="65%" stopColor="#C084FC" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
          </radialGradient>

          {/* Spiral Arm Gradient: Royal Blue (#2563EB) to Deep Navy (#0F172A) */}
          <linearGradient id={`${id}-spiralArmGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
            <stop offset="45%" stopColor="#1D4ED8" stopOpacity="0.5" />
            <stop offset="85%" stopColor="#0F172A" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.05" />
          </linearGradient>

          {/* Diamond Refractive & Specular Gradients */}
          <linearGradient id={`${id}-caratGlow`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#E0F7FA" />
            <stop offset="65%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>

          {/* High-specular Ice Purple Shimmer */}
          <linearGradient id={`${id}-purpleSheen`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#7E22CE" />
          </linearGradient>

          {/* Pincer Outer Left: Cyan -> Ice Purple -> White */}
          <linearGradient id={`${id}-pincerOuterLeftGrad`} x1="80%" y1="90%" x2="20%" y2="5%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="30%" stopColor="#00B4D8" />
            <stop offset="65%" stopColor="#00E5FF" />
            <stop offset="88%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Pincer Inner Left */}
          <linearGradient id={`${id}-pincerInnerLeftGrad`} x1="90%" y1="90%" x2="10%" y2="10%">
            <stop offset="0%" stopColor="#0077B6" />
            <stop offset="50%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#E0F7FA" />
          </linearGradient>

          {/* Pincer Outer Right */}
          <linearGradient id={`${id}-pincerOuterRightGrad`} x1="20%" y1="90%" x2="80%" y2="5%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="30%" stopColor="#7E22CE" />
            <stop offset="65%" stopColor="#C084FC" />
            <stop offset="88%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Pincer Inner Right */}
          <linearGradient id={`${id}-pincerInnerRightGrad`} x1="10%" y1="90%" x2="90%" y2="10%">
            <stop offset="0%" stopColor="#6B21A8" />
            <stop offset="50%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Spectacle Glass Ambient Light */}
          <linearGradient id={`${id}-spectacleGlass`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
            <stop offset="35%" stopColor="#C084FC" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* ================================================================= */}
        {/* LAYER 1: <g id="portal-suction-vortex">                           */}
        {/* ================================================================= */}
        <g
          id="portal-suction-vortex"
          transform={`rotate(${vortexRotation} 200 200)`}
          style={{ transformOrigin: '200px 200px' }}
        >
          {/* 4 Logarithmic Spiral Arms */}
          <g id="spiral-arms">
            {SPIRAL_ARMS_PATHS.map((pathData, idx) => (
              <path
                key={`spiral-arm-${idx}`}
                d={pathData}
                fill={`url(#${id}-spiralArmGrad)`}
                stroke="#00E5FF"
                strokeWidth="0.8"
                strokeOpacity="0.35"
              />
            ))}
          </g>

          {/* Swirling Outer Particle Dust & Inward Suction Trajectories */}
          <g id="vortex-particle-dust">
            {VORTEX_PARTICLES.map((p) => {
              // Normalized cycle loop for particle convergence
              const cycle = ((frame * 0.035 * pulseSpeed + p.id * 0.03125) % 1 + 1) % 1;

              // Radius converges toward center (minimum 32px) driven by portalSuctionStrength
              const currentRadius =
                p.baseRadius - (p.baseRadius - 32) * cycle * clampedSuction;

              // Swirl angular velocity accelerates as particles draw closer to center
              const angularAcceleration =
                clampedSuction * cycle * Math.PI * 4;
              const currentAngle =
                p.baseAngle + (frame * 0.04 * pulseSpeed) + angularAcceleration;

              const px = 200 + currentRadius * Math.cos(currentAngle);
              const py = 200 + currentRadius * Math.sin(currentAngle);

              // Dynamic opacity & glow intensity
              const pOpacity =
                (0.3 + 0.65 * (1 - cycle * clampedSuction * 0.4)) *
                (0.6 + 0.4 * clampedSuction);

              return (
                <g key={`particle-${p.id}`}>
                  {/* Subtle motion streak when suction is active */}
                  {clampedSuction > 0.25 && (
                    <line
                      x1={px}
                      y1={py}
                      x2={px - Math.cos(currentAngle) * (4 * clampedSuction)}
                      y2={py - Math.sin(currentAngle) * (4 * clampedSuction)}
                      stroke={p.color}
                      strokeWidth={p.size * 0.6}
                      strokeOpacity={pOpacity * 0.5}
                      strokeLinecap="round"
                    />
                  )}
                  {/* Dust grain */}
                  <circle
                    cx={px}
                    cy={py}
                    r={p.size}
                    fill={p.color}
                    opacity={pOpacity}
                  />
                </g>
              );
            })}
          </g>
        </g>

        {/* ================================================================= */}
        {/* LAYER 2: <g id="portal-concentric-shockwaves">                   */}
        {/* ================================================================= */}
        <g id="portal-concentric-shockwaves">
          {shockwaveRings.map((ring) => (
            <g key={`shockwave-${ring.id}`} opacity={ring.opacity}>
              {/* Primary Circular Shockwave */}
              <circle
                cx={200}
                cy={200}
                r={ring.radius}
                stroke={ring.stroke}
                strokeWidth={ring.strokeWidth}
                fill="none"
              />

              {/* Concentric Faceted Polygonal Ring (12-gon) */}
              <polygon
                points={getRegularPolygonPoints(
                  200,
                  200,
                  ring.radius,
                  12,
                  ring.polygonRotation
                )}
                stroke={ring.stroke}
                strokeWidth="1.2"
                strokeDasharray="6 4"
                strokeOpacity="0.65"
                fill="none"
              />

              {/* 4 Cardinal Diamond Vertex Accents on shockwave perimeter */}
              {[0, 1, 2, 3].map((cardinalIdx) => {
                const angle = (cardinalIdx * Math.PI) / 2 + ring.polygonRotation;
                const tickX = 200 + ring.radius * Math.cos(angle);
                const tickY = 200 + ring.radius * Math.sin(angle);
                return (
                  <polygon
                    key={`tick-${ring.id}-${cardinalIdx}`}
                    points={`${tickX},${tickY - 3} ${tickX + 3},${tickY} ${tickX},${tickY + 3} ${tickX - 3},${tickY}`}
                    fill={ring.stroke}
                    opacity="0.85"
                  />
                );
              })}
            </g>
          ))}
        </g>

        {/* ================================================================= */}
        {/* LAYER 3: <g id="portal-core-aura">                                */}
        {/* ================================================================= */}
        <g id="portal-core-aura">
          {/* Intense Radial Glow Backdrop */}
          <circle
            cx={200}
            cy={200}
            r={140}
            fill={`url(#${id}-portalCoreGlow)`}
          />
          {/* High-intensity Core Bloom with subtle pulse */}
          <circle
            cx={200}
            cy={200}
            r={76}
            fill={`url(#${id}-centerBloom)`}
            opacity={0.7 + Math.sin(frame * 0.14 * pulseSpeed) * 0.15}
          />
        </g>

        {/* ================================================================= */}
        {/* LAYER 4: <g id="portal-carat-crab-emblem">                       */}
        {/* Bounded in 120x120px area (x: 140 to 260, y: 140 to 260)          */}
        {/* ================================================================= */}
        <g
          id="portal-carat-crab-emblem"
          transform={`translate(200, 200) scale(${emblemFinalScale}) translate(-200, -162)`}
          style={{ transformOrigin: '200px 200px' }}
        >
          {/* 1. BACK LEGS (Rear Shadow Facets) */}
          <g
            id="layer-back-legs"
            stroke="#FFFFFF"
            strokeWidth="1.3"
            strokeOpacity="0.8"
            strokeLinejoin="round"
          >
            {/* Left Back Leg 1 */}
            <g id="back-leg-left-1">
              <polygon points="120,186 114,196 66,178 72,166" fill="#0077B6" />
              <polygon points="66,178 72,166 48,266 42,274" fill="#0096C7" />
            </g>
            {/* Left Back Leg 2 */}
            <g id="back-leg-left-2">
              <polygon points="122,212 114,222 56,214 62,202" fill="#0077B6" />
              <polygon points="56,214 62,202 34,282 28,290" fill="#023E8A" />
            </g>
            {/* Left Back Leg 3 */}
            <g id="back-leg-left-3">
              <polygon points="130,234 122,244 68,248 74,236" fill="#0077B6" />
              <polygon points="68,248 74,236 52,300 46,306" fill="#023E8A" />
            </g>

            {/* Right Back Leg 1 (with Ice Purple shadow depth) */}
            <g id="back-leg-right-1">
              <polygon points="280,186 286,196 334,178 328,166" fill="#6B21A8" />
              <polygon points="334,178 328,166 352,266 358,274" fill="#7E22CE" />
            </g>
            {/* Right Back Leg 2 */}
            <g id="back-leg-right-2">
              <polygon points="278,212 286,222 344,214 338,202" fill="#581C87" />
              <polygon points="344,214 338,202 366,282 372,290" fill="#3B0764" />
            </g>
            {/* Right Back Leg 3 */}
            <g id="back-leg-right-3">
              <polygon points="270,234 278,244 332,248 326,236" fill="#581C87" />
              <polygon points="332,248 326,236 348,300 354,306" fill="#3B0764" />
            </g>
          </g>

          {/* 2. CRYSTAL BODY (Polyhedral Diamond Carat Carapace) */}
          <g
            id="layer-crystal-body"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeOpacity="0.9"
            strokeLinejoin="round"
          >
            {/* Crown Apex & Light Gathering Facets: Diamond White (#FFFFFF) & Ice Purple (#C084FC) */}
            <polygon id="facet-crown-center" points="200,115 160,126 200,148 240,126" fill="#FFFFFF" />
            <polygon id="facet-crown-left" points="200,115 160,126 128,145 166,160" fill="#E0F7FA" />
            <polygon id="facet-crown-right" points="200,115 240,126 272,145 234,160" fill="#C084FC" />
            <polygon id="facet-crown-apex" points="200,115 166,160 200,148 234,160" fill="#FFFFFF" />

            {/* Shoulder Facets: Electric Cyan (#00E5FF) */}
            <polygon id="facet-shoulder-left" points="128,145 96,180 142,195 166,160" fill="#00E5FF" />
            <polygon id="facet-shoulder-right" points="272,145 304,180 258,195 234,160" fill="#00E5FF" />

            {/* Central Master Carat Diamond Cut */}
            <polygon id="facet-carat-top" points="200,148 166,172 200,188 234,172" fill="#FFFFFF" />
            <polygon id="facet-carat-mid-left" points="166,172 200,188 178,214 154,196" fill="#00E5FF" />
            <polygon id="facet-carat-mid-right" points="234,172 200,188 222,214 246,196" fill="#C084FC" />
            <polygon id="facet-carat-bottom" points="200,188 178,214 200,226 222,214" fill="#00E5FF" />

            {/* Surrounding Transition Facets */}
            <polygon id="facet-trans-upper-left" points="166,160 200,148 166,172" fill="#7DD3FC" />
            <polygon id="facet-trans-upper-right" points="234,160 200,148 234,172" fill="#E9D5FF" />
            <polygon id="facet-trans-side-left" points="166,160 166,172 154,196 142,195" fill="#00E5FF" />
            <polygon id="facet-trans-side-right" points="234,160 234,172 246,196 258,195" fill="#C084FC" />

            {/* Deep Crystal Flanks & Ribs */}
            <polygon id="facet-flank-deep-left" points="96,180 116,224 162,230 142,195" fill="#00B4D8" />
            <polygon id="facet-flank-deep-right" points="304,180 284,224 238,230 258,195" fill="#9333EA" />
            <polygon id="facet-lower-rib-left" points="142,195 154,196 178,214 200,226 162,230" fill="#0284C7" />
            <polygon id="facet-lower-rib-right" points="258,195 246,196 222,214 200,226 238,230" fill="#A855F7" />

            {/* Base & Keel Facets */}
            <polygon id="facet-base-flank-left" points="116,224 146,256 176,244 162,230" fill="#0077B6" />
            <polygon id="facet-base-flank-right" points="284,224 254,256 224,244 238,230" fill="#7E22CE" />
            <polygon id="facet-base-center-left" points="200,226 162,230 176,244 200,256" fill="#0077B6" />
            <polygon id="facet-base-center-right" points="200,226 238,230 224,244 200,256" fill="#6B21A8" />
            <polygon id="facet-keel-left" points="176,244 146,256 200,270 200,256" fill="#023E8A" />
            <polygon id="facet-keel-right" points="224,244 254,256 200,270 200,256" fill="#4C1D95" />
          </g>

          {/* 3. INTELLECT EYES (Wisdom Spectacles & Anime Sparkle Pupils) */}
          <g id="layer-intellect-eyes">
            {/* Eye Stalks */}
            <g id="eye-stalks" stroke="#FFFFFF" strokeWidth="1.2" strokeLinejoin="round">
              <polygon points="158,122 174,122 176,108 160,108" fill="#00B4D8" />
              <polygon points="226,122 242,122 240,108 224,108" fill="#9333EA" />
            </g>

            {/* Spectacle Lenses */}
            <circle cx="168" cy="98" r="24" fill={`url(#${id}-spectacleGlass)`} />
            <circle cx="232" cy="98" r="24" fill={`url(#${id}-spectacleGlass)`} />

            {/* Pupils */}
            <g id="pupils">
              {/* Left Eye */}
              <circle cx="168" cy="98" r="16" fill="#0F172A" />
              <path d="M 155 102 A 13 13 0 0 0 181 102 A 13 8.5 0 0 1 155 102" fill="#00E5FF" />
              <path d="M 159 104 A 9 9 0 0 0 177 104 A 9 5.5 0 0 1 159 104" fill="#E0F7FA" />
              <polygon
                points="164,88 167,93.5 173,95 167,96.5 164,102 161,96.5 155,95 161,93.5"
                fill="#FFFFFF"
              />
              <circle cx="173" cy="103" r="2.2" fill="#FFFFFF" />
              <circle cx="160" cy="102" r="1.2" fill="#FFFFFF" />

              {/* Right Eye */}
              <circle cx="232" cy="98" r="16" fill="#0F172A" />
              <path d="M 219 102 A 13 13 0 0 0 245 102 A 13 8.5 0 0 1 219 102" fill="#C084FC" />
              <path d="M 223 104 A 9 9 0 0 0 241 104 A 9 5.5 0 0 1 223 104" fill="#FFFFFF" />
              <polygon
                points="228,88 231,93.5 237,95 231,96.5 228,102 225,96.5 219,95 225,93.5"
                fill="#FFFFFF"
              />
              <circle cx="237" cy="103" r="2.2" fill="#FFFFFF" />
              <circle cx="224" cy="102" r="1.2" fill="#FFFFFF" />
            </g>

            {/* Spectacles Frames */}
            <g
              id="spectacles-contrast"
              fill="none"
              stroke="#0077B6"
              strokeWidth="4.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.45"
            >
              <circle cx="168" cy="98" r="24" />
              <circle cx="232" cy="98" r="24" />
              <path d="M 192 98 Q 200 92 208 98" />
            </g>
            <g
              id="spectacles-frame"
              fill="none"
              stroke="#FFFFFF"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="168" cy="98" r="24" strokeWidth="3.6" />
              <circle cx="232" cy="98" r="24" strokeWidth="3.6" />
              <path d="M 192 98 Q 200 92 208 98" strokeWidth="3.8" />
              <path d="M 144 98 L 134 96" strokeWidth="2.8" />
              <path d="M 256 98 L 266 96" strokeWidth="2.8" />
              <path d="M 152 86 A 21 21 0 0 1 176 80" strokeWidth="2.4" opacity="0.95" />
              <path d="M 216 86 A 21 21 0 0 1 240 80" strokeWidth="2.4" opacity="0.95" />
            </g>

            {/* Friendly Smile */}
            <path
              d="M 194 133 Q 200 138 206 133"
              fill="none"
              stroke="#0077B6"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </g>

          {/* 4. CRYSTAL CLAWS (Left & Right Pincers) */}
          <g
            id="layer-crystal-claws"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeOpacity="0.88"
            strokeLinejoin="round"
          >
            {/* Left Claw (with subtle sway) */}
            <g
              id="claw-left"
              style={{
                transformOrigin: '128px 145px',
                transform: `rotate(${-clawCheerAngle}deg)`,
              }}
            >
              <polygon points="128,145 114,164 94,148 106,132" fill="#0077B6" />
              <polygon points="106,132 94,148 72,130 84,112" fill="#00B4D8" />
              <polygon points="84,112 72,130 54,106 70,92" fill="#00E5FF" />
              <polygon points="70,92 54,106 38,78 62,68" fill="#00E5FF" />
              <polygon points="70,92 62,68 86,60 98,82" fill="#00B4D8" />
              <polygon points="70,92 98,82 84,112" fill="#0077B6" />
              {/* Outer & Inner Pincer Blades */}
              <polygon points="38,78 62,68 54,42" fill="#00E5FF" />
              <polygon points="54,42 62,68 62,18 48,16" fill={`url(#${id}-pincerOuterLeftGrad)`} />
              <polygon points="54,42 48,16 34,42 38,78" fill="#00B4D8" />
              <polygon points="62,68 86,60 84,40" fill="#00E5FF" />
              <polygon points="62,68 84,40 82,24" fill={`url(#${id}-pincerInnerLeftGrad)`} />
              <polygon points="86,60 84,40 98,54" fill="#0077B6" />
            </g>

            {/* Right Claw (with opposing sway and Ice Purple reflections) */}
            <g
              id="claw-right"
              style={{
                transformOrigin: '272px 145px',
                transform: `rotate(${clawCheerAngle}deg)`,
              }}
            >
              <polygon points="272,145 286,164 306,148 294,132" fill="#6B21A8" />
              <polygon points="294,132 306,148 328,130 316,112" fill="#9333EA" />
              <polygon points="316,112 328,130 346,106 330,92" fill="#C084FC" />
              <polygon points="330,92 346,106 362,78 338,68" fill="#C084FC" />
              <polygon points="330,92 338,68 314,60 302,82" fill="#9333EA" />
              <polygon points="330,92 302,82 316,112" fill="#6B21A8" />
              {/* Outer & Inner Pincer Blades */}
              <polygon points="362,78 338,68 346,42" fill="#C084FC" />
              <polygon points="346,42 338,68 338,18 352,16" fill={`url(#${id}-pincerOuterRightGrad)`} />
              <polygon points="346,42 352,16 366,42 362,78" fill="#9333EA" />
              <polygon points="338,68 314,60 316,40" fill="#C084FC" />
              <polygon points="338,68 316,40 318,24" fill={`url(#${id}-pincerInnerRightGrad)`} />
              <polygon points="314,60 316,40 302,54" fill="#6B21A8" />
            </g>
          </g>

          {/* 5. FRONT LEGS (Anterior Walking Legs) */}
          <g
            id="layer-front-legs"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeOpacity="0.88"
            strokeLinejoin="round"
          >
            {/* Front Leg Left 1 */}
            <g id="front-leg-left-1">
              <polygon points="120,186 116,174 68,158 72,166" fill="#00E5FF" />
              <polygon points="68,158 62,166 66,178 72,166" fill="#E0F7FA" />
              <polygon points="68,158 62,166 42,274 48,266" fill="#00E5FF" />
              <polygon points="48,266 42,274 45,276 51,269" fill="#E0F7FA" />
            </g>
            {/* Front Leg Left 2 */}
            <g id="front-leg-left-2">
              <polygon points="122,212 118,200 58,194 62,202" fill="#00E5FF" />
              <polygon points="58,194 52,202 56,214 62,202" fill="#E0F7FA" />
              <polygon points="58,194 52,202 28,290 34,282" fill="#00E5FF" />
              <polygon points="34,282 28,290 31,292 37,285" fill="#E0F7FA" />
            </g>
            {/* Front Leg Left 3 */}
            <g id="front-leg-left-3">
              <polygon points="130,234 126,222 70,228 74,236" fill="#00E5FF" />
              <polygon points="70,228 64,236 68,248 74,236" fill="#E0F7FA" />
              <polygon points="70,228 64,236 46,306 52,298" fill="#00E5FF" />
              <polygon points="52,298 46,306 49,308 55,301" fill="#E0F7FA" />
            </g>

            {/* Front Leg Right 1 (Cyan & Ice Purple Highlights) */}
            <g id="front-leg-right-1">
              <polygon points="280,186 284,174 332,158 328,166" fill="#C084FC" />
              <polygon points="332,158 338,166 334,178 328,166" fill="#FFFFFF" />
              <polygon points="332,158 338,166 358,274 352,266" fill="#00E5FF" />
              <polygon points="352,266 358,274 355,276 349,269" fill="#E0F7FA" />
            </g>
            {/* Front Leg Right 2 */}
            <g id="front-leg-right-2">
              <polygon points="278,212 282,200 342,194 338,202" fill="#C084FC" />
              <polygon points="342,194 348,202 344,214 338,202" fill="#FFFFFF" />
              <polygon points="342,194 348,202 372,290 366,282" fill="#00E5FF" />
              <polygon points="366,282 372,290 369,292 363,285" fill="#E0F7FA" />
            </g>
            {/* Front Leg Right 3 */}
            <g id="front-leg-right-3">
              <polygon points="270,234 274,222 330,228 326,236" fill="#C084FC" />
              <polygon points="330,228 336,236 332,248 326,236" fill="#FFFFFF" />
              <polygon points="330,228 336,236 354,306 348,298" fill="#00E5FF" />
              <polygon points="348,298 354,306 351,308 345,301" fill="#E0F7FA" />
            </g>
          </g>

          {/* 6. APEX SPECULAR GLINTS (Diamond Shimmer Flares) */}
          <g id="facet-diamond-glints">
            {/* Crown Apex Sparkle */}
            <polygon
              points="200,108 202,114 208,115 202,116 200,122 198,116 192,115 198,114"
              fill="#FFFFFF"
              opacity={0.85 + Math.sin(frame * 0.2 * pulseSpeed) * 0.15}
            />
            {/* Left Pincer Tip Sparkle */}
            <circle
              cx="48"
              cy="16"
              r="2.5"
              fill="#FFFFFF"
              opacity={0.8 + Math.cos(frame * 0.18 * pulseSpeed) * 0.2}
            />
            {/* Right Pincer Tip Sparkle */}
            <circle
              cx="352"
              cy="16"
              r="2.5"
              fill="#FFFFFF"
              opacity={0.8 + Math.sin(frame * 0.22 * pulseSpeed) * 0.2}
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
