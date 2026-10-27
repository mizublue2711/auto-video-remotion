import React from 'react';
import { Composition } from 'remotion';
import { WebsiteShowcase } from './compositions/WebsiteShowcase';
import websiteAConfig from '../site-configs/website-a.json';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="WebsiteShowcase"
        component={WebsiteShowcase}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={websiteAConfig}
      />
    </>
  );
};
