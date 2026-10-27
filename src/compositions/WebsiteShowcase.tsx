import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface Feature {
  title: string;
  description: string;
}

export interface WebsiteShowcaseProps {
  brand: {
    name: string;
    logoUrl: string;
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  features: Feature[];
  callToAction: {
    text: string;
    buttonColor: string;
  };
}

export const WebsiteShowcase: React.FC<WebsiteShowcaseProps> = ({
  brand = {
    name: 'Automated Video Engine',
    logoUrl: 'https://remotion.dev/img/logo-small.png',
    primaryColor: '#0052FF',
    backgroundColor: '#0F172A',
    textColor: '#FFFFFF',
  },
  hero = {
    title: 'Turn Any Website into Video',
    subtitle: 'Programmatic video generation powered by Remotion & Google Cloud Run',
  },
  features = [
    {
      title: 'Dynamic Parameterization',
      description: 'Pass custom JSON payloads to generate unique videos on demand.',
    },
    {
      title: 'Cloud Scale Rendering',
      description: 'Render videos fast with Google Cloud Run serverless infrastructure.',
    },
  ],
  callToAction = {
    text: 'Get Started at yourwebsite.com',
    buttonColor: '#22C55E',
  },
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Hero & Brand entry animation (Frame 0 - 30)
  const heroSpring = spring({
    frame,
    fps,
    config: { damping: 12 },
  });
  const heroOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const heroY = interpolate(heroSpring, [0, 1], [40, 0]);

  // CTA Banner entry animation at final frames (Frame 100 - 120)
  const ctaFrame = Math.max(0, frame - 100);
  const ctaSpring = spring({
    frame: ctaFrame,
    fps,
    config: { damping: 12 },
  });
  const ctaOpacity = interpolate(frame, [100, 115], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.85, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: brand.backgroundColor,
        color: brand.textColor,
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px 120px',
        boxSizing: 'border-box',
      }}
    >
      {/* Brand Header & Hero Section */}
      <div
        style={{
          opacity: heroOpacity,
          transform: `translateY(${heroY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '30px',
          }}
        >
          {brand.logoUrl && (
            <Img
              src={brand.logoUrl}
              style={{
                width: '64px',
                height: '64px',
                objectFit: 'contain',
              }}
            />
          )}
          <span
            style={{
              fontSize: '32px',
              fontWeight: '700',
              color: brand.primaryColor,
              letterSpacing: '1px',
            }}
          >
            {brand.name}
          </span>
        </div>

        <h1
          style={{
            fontSize: '64px',
            fontWeight: '800',
            margin: '0 0 20px 0',
            lineHeight: 1.15,
            color: brand.textColor,
          }}
        >
          {hero.title}
        </h1>
        <p
          style={{
            fontSize: '28px',
            color: '#94A3B8',
            margin: 0,
            maxWidth: '1000px',
            lineHeight: 1.4,
          }}
        >
          {hero.subtitle}
        </p>
      </div>

      {/* Features Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '40px',
          margin: '40px 0',
        }}
      >
        {features.map((feature, index) => {
          // Staggered feature animations starting at frame 35 and frame 55
          const startFrame = 35 + index * 20;
          const cardFrame = Math.max(0, frame - startFrame);
          const cardSpring = spring({
            frame: cardFrame,
            fps,
            config: { damping: 14 },
          });
          const cardOpacity = interpolate(
            frame,
            [startFrame, startFrame + 15],
            [0, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }
          );
          const cardY = interpolate(cardSpring, [0, 1], [50, 0]);

          return (
            <div
              key={index}
              style={{
                opacity: cardOpacity,
                transform: `translateY(${cardY}px)`,
                backgroundColor: '#1E293B',
                border: `2px solid ${brand.primaryColor}33`,
                borderRadius: '16px',
                padding: '36px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
              }}
            >
              <h3
                style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: brand.primaryColor,
                  margin: '0 0 12px 0',
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: '22px',
                  color: '#CBD5E1',
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Call To Action Banner */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: callToAction.buttonColor,
            color: '#FFFFFF',
            fontSize: '32px',
            fontWeight: '700',
            padding: '20px 48px',
            borderRadius: '50px',
            boxShadow: `0 10px 30px ${callToAction.buttonColor}66`,
            textAlign: 'center',
          }}
        >
          {callToAction.text}
        </div>
      </div>
    </AbsoluteFill>
  );
};
