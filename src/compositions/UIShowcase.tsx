import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface UIShowcaseProps {
  brand?: {
    name?: string;
    logoUrl?: string;
    primaryColor?: string;
    accentColor?: string;
    backgroundColor?: string;
    textColor?: string;
  };
  hero?: {
    badge?: string;
    title?: string;
    subtitle?: string;
  };
  showcaseCard?: {
    previewImageUrl?: string;
    caption?: string;
  };
  features?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  callToAction?: {
    label?: string;
    url?: string;
  };
}

export const UIShowcase: React.FC<UIShowcaseProps> = ({
  brand = {
    name: 'DesignCraft',
    primaryColor: '#ec4899',
    accentColor: '#8b5cf6',
    backgroundColor: '#090d16',
    textColor: '#f8fafc',
  },
  hero = {
    badge: 'UI SHOWCASE',
    title: 'Interactive Design Tokens',
    subtitle: 'Modular component architecture with 3D spatial assembly.',
  },
  showcaseCard = {
    previewImageUrl: 'https://picsum.photos/800/450',
    caption: 'Live Component Preview & Theme Inspector',
  },
  features = [
    {
      title: '3D Lego Assembly',
      description: 'Snap components dynamically in 3D spatial canvas.',
      icon: '🧩',
    },
    {
      title: 'Glassmorphism UI',
      description: 'Elevated blur surfaces with customizable glowing borders.',
      icon: '✨',
    },
    {
      title: 'Theme Synchronized',
      description: 'Seamless color variable propagation across templates.',
      icon: '🎨',
    },
    {
      title: 'High FPS Export',
      description: 'Fluid 60 FPS video rendering ready for Cloud Run.',
      icon: '⚡',
    },
  ],
  callToAction = {
    label: 'Explore Component Library',
  },
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const primaryColor = brand.primaryColor || '#ec4899';
  const accentColor = brand.accentColor || '#8b5cf6';
  const backgroundColor = brand.backgroundColor || '#090d16';
  const textColor = brand.textColor || '#f8fafc';

  // --- Header / Brand (Frames 0-25) ---
  const headerSpring = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const headerTranslateY = interpolate(headerSpring, [0, 1], [-100, 0]);

  // --- 3D Showcase Preview Card (Frames 15-45) ---
  const previewFrame = Math.max(0, frame - 15);
  const previewSpring = spring({ frame: previewFrame, fps, config: { damping: 14, stiffness: 80 } });
  const previewRotateX = interpolate(previewSpring, [0, 1], [35, 10]);
  const previewRotateY = interpolate(previewSpring, [0, 1], [-20, 0]);
  const previewScale = interpolate(previewSpring, [0, 1], [0.7, 1.0]);

  // Ambient floating on showcase card
  const floatingOffset = frame > 45 ? Math.sin(((frame - 45) / 30) * Math.PI) * 8 : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        color: textColor,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '40px 60px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        perspective: '1200px',
        overflow: 'hidden',
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          transform: `translateY(${headerTranslateY}px)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 28px',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
            }}
          >
            {brand.name ? brand.name.charAt(0) : 'U'}
          </div>
          <span style={{ fontSize: '20px', fontWeight: '700' }}>{brand.name}</span>
        </div>
        {hero.badge && (
          <span
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '1px',
              background: `linear-gradient(135deg, ${primaryColor}40, ${accentColor}40)`,
              border: `1px solid ${primaryColor}`,
            }}
          >
            {hero.badge}
          </span>
        )}
      </div>

      {/* Main Grid: Left Hero/Showcase + Right Staggered Features */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '28px', flex: 1 }}>
        {/* Left Column: Hero & 3D Tilt Preview Card */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
          <div>
            <h1
              style={{
                fontSize: '40px',
                fontWeight: '800',
                margin: '0 0 12px 0',
                background: `linear-gradient(135deg, #ffffff 0%, ${primaryColor} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {hero.title}
            </h1>
            <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              {hero.subtitle}
            </p>
          </div>

          {/* 3D Showcase Card */}
          <div
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${previewRotateX}deg) rotateY(${previewRotateY}deg) scale(${previewScale}) translateY(${floatingOffset}px)`,
              padding: '20px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${primaryColor}50`,
              boxShadow: `0 25px 50px rgba(0,0,0,0.6), 0 0 30px ${primaryColor}30`,
            }}
          >
            {showcaseCard.previewImageUrl && (
              <img
                src={showcaseCard.previewImageUrl}
                alt="Showcase Preview"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                }}
              />
            )}
            {showcaseCard.caption && (
              <p style={{ margin: '12px 0 0 0', fontSize: '14px', color: '#cbd5e1', textAlign: 'center' }}>
                {showcaseCard.caption}
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Staggered Feature Cards Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
          {features.map((item, idx) => {
            const cardDelay = 25 + idx * 6;
            const cardFrame = Math.max(0, frame - cardDelay);
            const cardSpring = spring({ frame: cardFrame, fps, config: { damping: 12, stiffness: 100 } });
            const cardTranslateX = interpolate(cardSpring, [0, 1], [100, 0]);
            const cardOpacity = interpolate(cardFrame, [0, 6], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={idx}
                style={{
                  transform: `translateX(${cardTranslateX}px)`,
                  opacity: cardOpacity,
                  padding: '18px 22px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                {item.icon && <span style={{ fontSize: '26px' }}>{item.icon}</span>}
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '17px', color: '#f8fafc' }}>
                    {item.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', lineHeight: 1.4 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}

          {callToAction.label && (
            <button
              style={{
                marginTop: '10px',
                padding: '14px 28px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '700',
                border: 'none',
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                color: '#ffffff',
                boxShadow: `0 10px 25px ${primaryColor}50`,
                cursor: 'pointer',
              }}
            >
              {callToAction.label} →
            </button>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
