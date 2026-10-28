import React, { useMemo } from 'react';
import { interpolate, random } from 'remotion';

export interface KineticTypographyProps {
  text: string;
  frame: number;
  style?: 'text-clipping-reveal' | 'scramble-text' | 'variable-font-weight-morph' | 'marquee-continuous';
  scrambleChars?: string;
  fontSize?: number;
  color?: string;
  className?: string;
}

export const KineticTypography: React.FC<KineticTypographyProps> = ({
  text,
  frame,
  style = 'scramble-text',
  scrambleChars = '!@#$%^&*()_+-=0123456789CRAFT',
  fontSize = 20,
  color = '#888',
}) => {
  const scrambled = useMemo(() => {
    if (frame < 10) return '!@#$%^&*()';
    if (frame < 30) {
      return text
        .split('')
        .map((char) => (char === ' ' ? ' ' : scrambleChars[Math.floor(random(frame + char) * scrambleChars.length)]))
        .join('');
    }
    return text;
  }, [frame, text, scrambleChars]);

  if (style === 'text-clipping-reveal') {
    const clipPercent = interpolate(frame, [0, 45], [0, 100], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    return (
      <div
        style={{
          fontSize: `${fontSize}px`,
          color,
          clipPath: `polygon(0 0, ${clipPercent}% 0, ${clipPercent}% 100%, 0 100%)`,
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </div>
    );
  }

  if (style === 'variable-font-weight-morph') {
    const fontWeight = Math.round(
      interpolate(frame, [0, 60], [100, 900], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    );
    return (
      <div style={{ fontSize: `${fontSize}px`, color, fontWeight }}>
        {text}
      </div>
    );
  }

  if (style === 'marquee-continuous') {
    const offset = (frame * 3) % 1000;
    return (
      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>
        <div style={{ transform: `translateX(-${offset}px)`, display: 'inline-block', fontSize: `${fontSize}px`, color }}>
          {text} &nbsp;///&nbsp; {text} &nbsp;///&nbsp; {text}
        </div>
      </div>
    );
  }

  // Default: scramble-text
  return (
    <div style={{ fontSize: `${fontSize}px`, color }}>
      {scrambled}
    </div>
  );
};
