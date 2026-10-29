import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface KineticTypographyProps {
  text?: string;
  color?: string;
  accentColor?: string;
  mode?: 'scramble' | 'typewriter' | 'spring' | 'clip';
  fontSize?: string | number;
  letterSpacing?: string;
  className?: string;
}

const HEX_ASCII_GLYPHS = '0123456789ABCDEFabcdef!@#$%^&*()_+-=[]{}|;:,.<>?/X';

export const KineticTypography: React.FC<KineticTypographyProps> = ({
  text = 'DYNAMIC MOTION ENGINE',
  color = '#FFFFFF',
  accentColor = '#00E5FF',
  mode = 'scramble',
  fontSize = '48px',
  letterSpacing = '2px',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chars = text.split('');
  const totalChars = chars.length;

  if (mode === 'spring') {
    const words = text.split(' ');
    return (
      <div
        style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
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
                fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
                fontWeight: '800',
                color,
                letterSpacing,
                display: 'inline-block',
                textTransform: 'uppercase',
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    );
  }

  if (mode === 'typewriter') {
    const charsRevealed = Math.min(totalChars, Math.floor(frame / 2));
    const revealedText = text.slice(0, charsRevealed);
    const showCursor = Math.floor(frame / 15) % 2 === 0;

    return (
      <div
        style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
          fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
          fontWeight: '700',
          color,
          letterSpacing,
          textTransform: 'uppercase',
          display: 'inline-block',
        }}
      >
        <span>{revealedText}</span>
        <span
          style={{
            color: accentColor,
            opacity: showCursor ? 1 : 0,
            marginLeft: '2px',
          }}
        >
          _
        </span>
      </div>
    );
  }

  if (mode === 'clip') {
    const progress = spring({
      frame,
      fps,
      config: { damping: 15, mass: 0.8 },
    });
    const clipWidth = interpolate(progress, [0, 1], [0, 100]);

    return (
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
            fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
            fontWeight: '800',
            color,
            letterSpacing,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            clipPath: `polygon(0 0, ${clipWidth}% 0, ${clipWidth}% 100%, 0 100%)`,
          }}
        >
          {text}
        </div>
      </div>
    );
  }

  // Scramble / Matrix decode effect
  return (
    <div
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
        fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
        fontWeight: '700',
        letterSpacing,
        textTransform: 'uppercase',
      }}
    >
      {chars.map((char, index) => {
        if (char === ' ') {
          return <span key={index} style={{ width: '0.4em' }} />;
        }

        const charStartFrame = index * 2;
        const decodeFrames = 18;
        const charFrame = frame - charStartFrame;

        if (charFrame < 0) {
          return (
            <span
              key={index}
              style={{
                opacity: 0.3,
                color: `${accentColor}55`,
              }}
            >
              0x
            </span>
          );
        }

        const isResolved = charFrame >= decodeFrames;
        let displayChar = char;

        if (!isResolved) {
          const glyphIndex = (frame * 11 + index * 17) % HEX_ASCII_GLYPHS.length;
          displayChar = HEX_ASCII_GLYPHS[glyphIndex];
        }

        return (
          <span
            key={index}
            style={{
              color: isResolved ? color : accentColor,
              opacity: isResolved ? 1 : 0.9,
              textShadow: !isResolved ? `0 0 10px ${accentColor}` : 'none',
            }}
          >
            {displayChar}
          </span>
        );
      })}
    </div>
  );
};
