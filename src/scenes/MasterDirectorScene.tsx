import React from 'react';
import { AbsoluteFill } from 'remotion';
import { AppMockup3D } from '../components/AppMockup3D';
import { KineticTypography } from '../components/KineticTypography';
import { SwissGridBackground } from '../components/SwissGridBackground';

export interface MasterDirectorSceneProps {
  title?: string;
  subtitle?: string;
  primaryColor?: string;
  backgroundColor?: string;
}

export const MasterDirectorScene: React.FC<MasterDirectorSceneProps> = ({
  title = 'NEXT-GEN VIDEO AUTOMATION',
  primaryColor = '#0052FF',
  backgroundColor = '#0F172A',
}) => {
  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px',
        boxSizing: 'border-box',
      }}
    >
      <SwissGridBackground backgroundColor={backgroundColor} />

      <div style={{ zIndex: 1, textAlign: 'center', marginBottom: '40px' }}>
        <KineticTypography text={title} color="#FFFFFF" />
      </div>

      <div style={{ zIndex: 1, width: '100%', height: '500px' }}>
        <AppMockup3D primaryColor={primaryColor} />
      </div>
    </AbsoluteFill>
  );
};
