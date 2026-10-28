import React, { useState } from 'react';
import { Img } from 'remotion';

export interface AppMockup3DProps {
  mockupUrl: string;
  scale?: number;
  blurPx?: number;
  rotateX?: number;
  rotateY?: number;
  borderColor?: string;
  boxShadow?: string;
}

const DEFAULT_FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect width="800" height="450" fill="%230F172A" stroke="%2300E5FF" stroke-width="2"/><text x="400" y="225" font-family="monospace" font-size="24" fill="%2300E5FF" text-anchor="middle">ARTIFICIAL CRAFT // 60FPS</text></svg>';

export const AppMockup3D: React.FC<AppMockup3DProps> = ({
  mockupUrl,
  scale = 1,
  blurPx = 0,
  rotateX = 10,
  rotateY = -12,
  borderColor = '#00E5FF',
  boxShadow = '0 20px 50px rgba(0, 229, 255, 0.15)',
}) => {
  const [imageSrc, setImageSrc] = useState<string>(mockupUrl || DEFAULT_FALLBACK_IMAGE);

  return (
    <div style={{ perspective: '1200px', display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
          filter: `blur(${blurPx}px)`,
          boxShadow,
          border: `1px solid ${borderColor}`,
          transition: 'transform 0.1s ease',
        }}
      >
        <Img
          src={imageSrc}
          onError={() => setImageSrc(DEFAULT_FALLBACK_IMAGE)}
          style={{ width: '800px', display: 'block' }}
        />
      </div>
    </div>
  );
};
