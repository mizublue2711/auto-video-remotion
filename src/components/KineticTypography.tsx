import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface KineticTypographyProps {
  text?: string;
  color?: string;
}

export const KineticTypography: React.FC<KineticTypographyProps> = ({
  text = 'DYNAMIC MOTION ENGINE',
  color = '#FFFFFF',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(' ');

  return (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {words.map((word, i) => {
        const delay = i * 5;
        const wordFrame = Math.max(0, frame - delay);
        const wordSpring = spring({
          frame: wordFrame,
          fps,
          config: { damping: 12 },
        });

        const opacity = interpolate(wordFrame, [0, 10], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const translateY = interpolate(wordSpring, [0, 1], [40, 0]);

        return (
          <span
            key={i}
            style={{
              opacity,
              transform: `translateY(${translateY}px)`,
              fontSize: '56px',
              fontWeight: '800',
              color,
              letterSpacing: '-1px',
              display: 'inline-block',
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
