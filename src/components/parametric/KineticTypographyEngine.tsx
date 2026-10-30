import React from 'react';
import { interpolate, random, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface KineticTypographyEngineProps {
  text: string;
  mode?: 'scramble' | 'variable-morph' | 'mask-clip';
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  className?: string;
  style?: React.CSSProperties;
}

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export const KineticTypographyEngine: React.FC<KineticTypographyEngineProps> = ({
  text,
  mode = 'scramble',
  fontSize = 64,
  color = '#FFFFFF',
  fontFamily = "'JetBrains Mono', sans-serif",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (mode === 'scramble') {
    const textChars = text.split('');
    const revealedCount = Math.floor(
      interpolate(frame, [0, 45], [0, textChars.length], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    );

    const displayedText = textChars
      .map((char, idx) => {
        if (char === ' ') return ' ';
        if (idx < revealedCount) return char;
        const randSeed = frame * 100 + idx;
        const randomCharIdx = Math.floor(random(randSeed) * SCRAMBLE_CHARS.length);
        return SCRAMBLE_CHARS[randomCharIdx];
      })
      .join('');

    return (
      <div
        style={{
          fontSize: `${fontSize}px`,
          color,
          fontFamily,
          fontWeight: 'bold',
          letterSpacing: '2px',
          whiteSpace: 'pre-wrap',
          ...style,
        }}
      >
        {displayedText}
      </div>
    );
  }

  if (mode === 'variable-morph') {
    const weightVal = Math.round(
      interpolate(Math.sin(frame * 0.08), [-1, 1], [300, 900])
    );
    const letterSpacingVal = interpolate(
      Math.cos(frame * 0.06),
      [-1, 1],
      [0, 12]
    );

    return (
      <div
        style={{
          fontSize: `${fontSize}px`,
          color,
          fontFamily,
          fontWeight: weightVal,
          letterSpacing: `${letterSpacingVal}px`,
          transition: 'none',
          whiteSpace: 'pre-wrap',
          ...style,
        }}
      >
        {text}
      </div>
    );
  }

  // mode === 'mask-clip'
  const clipProgress = interpolate(frame, [0, 40], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const springPop = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  return (
    <div
      style={{
        overflow: 'hidden',
        display: 'inline-block',
        ...style,
      }}
    >
      <div
        style={{
          fontSize: `${fontSize}px`,
          color,
          fontFamily,
          fontWeight: 'bold',
          clipPath: `inset(0 ${100 - clipProgress}% 0 0)`,
          transform: `translateY(${(1 - springPop) * 30}px)`,
          whiteSpace: 'pre-wrap',
        }}
      >
        {text}
      </div>
    </div>
  );
};
