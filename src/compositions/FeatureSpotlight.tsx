import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface FeatureSpotlightProps {
  brand?: {
    name?: string;
    logoUrl?: string;
    primaryColor?: string;
    accentColor?: string;
    backgroundColor?: string;
    textColor?: string;
  };
  feature?: {
    title?: string;
    description?: string;
    icon?: string;
    codeSnippetOrImage?: string;
  };
  callToAction?: {
    label?: string;
    url?: string;
  };
}

export const FeatureSpotlight: React.FC<FeatureSpotlightProps> = ({
  brand = {
    name: 'DevPulse',
    primaryColor: '#10b981',
    accentColor: '#06b6d4',
    backgroundColor: '#020617',
    textColor: '#f8fafc',
  },
  feature = {
    title: 'Instant Edge Function Deployment',
    description: 'Deploy serverless functions globally in under 50ms with automatic zero-downtime rollouts.',
    icon: '🚀',
    codeSnippetOrImage: "export default async function handler(req) {\n  const data = await req.json();\n  return Response.json({ status: 'deployed', timestamp: Date.now() });\n}",
  },
  callToAction = {
    label: 'Read Release Notes',
  },
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const primaryColor = brand.primaryColor || '#10b981';
  const accentColor = brand.accentColor || '#06b6d4';
  const backgroundColor = brand.backgroundColor || '#020617';
  const textColor = brand.textColor || '#f8fafc';

  // --- Main Container Spring Zoom-In (Frames 0 - 30) ---
  const containerSpring = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const containerScale = interpolate(containerSpring, [0, 1], [0.85, 1.0]);
  const containerOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- Code Typing / Reveal Effect (Frames 15 - 60) ---
  const snippet = feature.codeSnippetOrImage || '';
  const typingChars = Math.floor(
    interpolate(frame, [15, 55], [0, snippet.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const displayedSnippet = snippet.substring(0, typingChars);

  // --- CTA Spring Popup (Frames 40+) ---
  const ctaFrame = Math.max(0, frame - 40);
  const ctaSpring = spring({ frame: ctaFrame, fps, config: { damping: 12, stiffness: 100 } });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.8, 1.0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        color: textColor,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        padding: '50px 70px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: containerOpacity,
        transform: `scale(${containerScale})`,
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '18px',
              fontFamily: 'sans-serif',
            }}
          >
            {brand.name ? brand.name.charAt(0) : 'D'}
          </div>
          <span style={{ fontSize: '22px', fontWeight: '700', fontFamily: 'sans-serif' }}>
            {brand.name}
          </span>
        </div>
        <span
          style={{
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '700',
            fontFamily: 'sans-serif',
            color: primaryColor,
            background: `${primaryColor}20`,
            border: `1px solid ${primaryColor}60`,
          }}
        >
          FEATURE SPOTLIGHT
        </span>
      </div>

      {/* Center Highlight Box */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '36px',
          alignItems: 'center',
          padding: '36px',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${primaryColor}40`,
          boxShadow: `0 30px 60px rgba(0,0,0,0.6), inset 0 0 30px ${primaryColor}15`,
        }}
      >
        {/* Left Side: Title & Description */}
        <div style={{ fontFamily: 'sans-serif' }}>
          {feature.icon && <span style={{ fontSize: '42px', display: 'block', marginBottom: '16px' }}>{feature.icon}</span>}
          <h2
            style={{
              fontSize: '36px',
              fontWeight: '800',
              margin: '0 0 16px 0',
              lineHeight: 1.2,
              background: `linear-gradient(135deg, #ffffff 0%, ${primaryColor} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {feature.title}
          </h2>
          <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
            {feature.description}
          </p>
        </div>

        {/* Right Side: Code / Graphic Preview Box with Typing Effect */}
        <div
          style={{
            padding: '24px',
            borderRadius: '16px',
            backgroundColor: '#090d16',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Mac-style Window Controls */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
          </div>

          <pre
            style={{
              margin: 0,
              fontSize: '13px',
              color: '#38bdf8',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              lineHeight: 1.5,
              flex: 1,
            }}
          >
            <code>{displayedSnippet}</code>
            <span style={{ opacity: Math.floor(frame / 10) % 2 === 0 ? 1 : 0, color: primaryColor }}>|</span>
          </pre>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', fontFamily: 'sans-serif' }}>
        {callToAction.label && (
          <button
            style={{
              transform: `scale(${ctaScale})`,
              padding: '16px 36px',
              borderRadius: '14px',
              fontSize: '16px',
              fontWeight: '700',
              border: 'none',
              background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
              color: '#ffffff',
              boxShadow: `0 12px 30px ${primaryColor}60`,
              cursor: 'pointer',
            }}
          >
            {callToAction.label} →
          </button>
        )}
      </div>
    </AbsoluteFill>
  );
};
