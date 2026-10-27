import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

export interface WebsiteShowcaseProps {
  logoUrl?: string;
  brandName?: string;
  heroHeadline?: string;
  heroSubtitle?: string;
  ctaText?: string;
  features?: FeatureItem[];
  primaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

export const WebsiteShowcase: React.FC<WebsiteShowcaseProps> = ({
  logoUrl,
  brandName = 'ACME Corp',
  heroHeadline = 'Build the Future with Modern Motion',
  heroSubtitle = 'High-performance 3D Lego assembly video template powered by Remotion',
  ctaText = 'Get Started Now',
  features = [
    {
      title: 'Modular Architecture',
      description: 'Lego-like snap assembly logic with 3D spring dynamics.',
      icon: '⚡',
    },
    {
      title: 'Cloud Run Scale',
      description: 'Render videos in parallel with zero idle server cost.',
      icon: '☁️',
    },
    {
      title: 'Glassmorphism Design',
      description: 'Elevated card aesthetics with dynamic subtle border glows.',
      icon: '✨',
    },
    {
      title: 'Ultra High Performance',
      description: '30 FPS smooth rendering tailored for dynamic web automation.',
      icon: '🚀',
    },
  ],
  primaryColor = '#6366f1',
  accentColor = '#8b5cf6',
  backgroundColor = '#0f172a',
  textColor = '#f8fafc',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Block 1: Header/Brand Bar (Frames 0 - 25) ---
  const block1Spring = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
      mass: 0.8,
    },
  });

  const block1TranslateY = interpolate(block1Spring, [0, 1], [-150, 0]);
  const block1Opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- Block 2: Hero Banner (Frames 15 - 40) ---
  const block2Frame = Math.max(0, frame - 15);
  const block2Spring = spring({
    frame: block2Frame,
    fps,
    config: {
      damping: 14,
      stiffness: 90,
    },
  });

  const block2TranslateX = interpolate(block2Spring, [0, 1], [-200, 0]);
  const block2RotateX = interpolate(block2Spring, [0, 1], [15, 0]);
  const block2Scale = interpolate(block2Spring, [0, 1], [0.8, 1.0]);
  const block2Opacity = interpolate(block2Frame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- Ambient Floating Animation (After frame 60) ---
  const ambientOffset =
    frame > 60 ? Math.sin(((frame - 60) / 30) * Math.PI) * 6 : 0;

  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor,
        color: textColor,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 60px',
        boxSizing: 'border-box',
        perspective: '1200px',
        overflow: 'hidden',
        transform: `translateY(${ambientOffset}px)`,
      }}
    >
      {/* Block 1: Header / Brand Bar */}
      <div
        style={{
          transform: `translateY(${block1TranslateY}px)`,
          opacity: block1Opacity,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 32px',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          marginBottom: '32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Logo"
              style={{ height: '36px', borderRadius: '8px' }}
            />
          ) : (
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '18px',
                color: '#fff',
              }}
            >
              {brandName.charAt(0)}
            </div>
          )}
          <span
            style={{ fontSize: '22px', fontWeight: '700', letterSpacing: '-0.5px' }}
          >
            {brandName}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '24px', opacity: 0.8, fontSize: '15px' }}>
          <span>Features</span>
          <span>Solutions</span>
          <span>Pricing</span>
        </div>
      </div>

      {/* Block 2: Hero Banner */}
      <div
        style={{
          transformStyle: 'preserve-3d',
          transform: `translateX(${block2TranslateX}px) rotateX(${block2RotateX}deg) scale(${block2Scale})`,
          opacity: block2Opacity,
          padding: '48px',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${primaryColor}40`,
          boxShadow: `0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 20px ${primaryColor}20`,
          textAlign: 'center',
          marginBottom: '40px',
        }}
      >
        <h1
          style={{
            fontSize: '48px',
            fontWeight: '800',
            margin: '0 0 16px 0',
            background: `linear-gradient(135deg, #ffffff 0%, ${accentColor} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-1px',
          }}
        >
          {heroHeadline}
        </h1>
        <p
          style={{
            fontSize: '18px',
            lineHeight: '1.6',
            color: '#94a3b8',
            maxWidth: '700px',
            margin: '0 auto 28px auto',
          }}
        >
          {heroSubtitle}
        </p>
        <button
          style={{
            padding: '14px 32px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
            color: '#ffffff',
            boxShadow: `0 10px 25px ${primaryColor}60`,
            cursor: 'pointer',
          }}
        >
          {ctaText}
        </button>
      </div>

      {/* Block 3: Feature Cards Grid (2-Column Grid) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
        }}
      >
        {features.map((feature, index) => {
          // Staggered delay: 5 frames per card, starting at frame 30
          const startFrame = 30 + index * 5;
          const cardFrame = Math.max(0, frame - startFrame);

          const cardSpring = spring({
            frame: cardFrame,
            fps,
            config: {
              damping: 12,
              stiffness: 100,
            },
          });

          const cardTranslateY = interpolate(cardSpring, [0, 1], [80, 0]);
          const cardOpacity = interpolate(cardFrame, [0, 6], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={index}
              style={{
                transform: `translateY(${cardTranslateY}px)`,
                opacity: cardOpacity,
                padding: '24px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                {feature.icon && (
                  <span style={{ fontSize: '24px' }}>{feature.icon}</span>
                )}
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0,
                    color: '#f1f5f9',
                  }}
                >
                  {feature.title}
                </h3>
              </div>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.5',
                  color: '#94a3b8',
                  margin: 0,
                }}
              >
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
