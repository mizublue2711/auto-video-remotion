import React from 'react';
import { Composition } from 'remotion';

// Import Master Scene đúng vị trí thư mục src/scenes/
import { MasterDirectorScene } from './scenes/MasterDirectorScene';
import { WebsiteShowcase, WebsiteShowcaseProps } from './compositions/WebsiteShowcase';
import websiteAConfig from '../site-configs/website-a.json';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Master Director Scene - Đã dời về src/scenes/ */}
      <Composition
        id="MasterDirectorScene"
        component={MasterDirectorScene}
        durationInFrames={180}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          title: 'ARTIFICIAL CRAFT',
          slogan: 'FPS MEETS AI AUTOMATION',
          mockupUrl: 'https://artificialcraft.space/og.png',
          metrics: [
            { label: 'FPS', value: '60' },
            { label: 'PRECISION SLA', value: '99.99%' },
          ],
        }}
      />

      {/* Website Showcase Composition */}
      <Composition
        id="WebsiteShowcase"
        component={WebsiteShowcase}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={websiteAConfig as WebsiteShowcaseProps}
      />
    </>
  );
};
