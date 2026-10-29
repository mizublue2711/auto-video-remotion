import React from 'react';
import { Composition } from 'remotion';

// Import Master Scene đúng vị trí thư mục src/scenes/
import { MasterDirectorScene } from './scenes/MasterDirectorScene';
import { WebsiteShowcase, WebsiteShowcaseProps } from './compositions/WebsiteShowcase';
import websiteAConfig from '../site-configs/website-a.json';

import { LogarithmicShellScene } from './scenes/LogarithmicShellScene';
import { LogarithmicShellSchema } from './schemas/logarithmicShellSchema';
import logarithmicShellConfig from '../site-configs/logarithmic-shell-v1.json';

import { InfiniteContinuousLoopScene } from './scenes/InfiniteContinuousLoopScene';
import { InfiniteLoopSchema } from './schemas/infiniteLoopSchema';
import infiniteLoopConfig from '../site-configs/infinite-loop-v1.json';

import { websiteShowcaseSchema } from './schemas/websiteShowcase';
import { RemotionConfigSchema } from './schemas/index';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Master Director Scene - Đã dời về src/scenes/ */}
      <Composition
        id="MasterDirectorScene"
        component={MasterDirectorScene}
        schema={RemotionConfigSchema}
        durationInFrames={180}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={RemotionConfigSchema.parse({
          brand: {
            name: 'ARTIFICIAL CRAFT',
            primaryColor: '#00E5FF',
            backgroundColor: '#050505',
          },
          title: 'ARTIFICIAL CRAFT',
          subtitle: 'FPS MEETS AI AUTOMATION',
        })}
      />

      {/* Website Showcase Composition */}
      <Composition
        id="WebsiteShowcase"
        component={WebsiteShowcase}
        schema={websiteShowcaseSchema}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={websiteShowcaseSchema.parse(websiteAConfig) as WebsiteShowcaseProps}
      />

      {/* Logarithmic Shell Composition */}
      <Composition
        id="LogarithmicShell-V1"
        component={LogarithmicShellScene}
        schema={LogarithmicShellSchema}
        durationInFrames={2700}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={LogarithmicShellSchema.parse(logarithmicShellConfig)}
      />

      {/* Infinite Continuous Loop Composition */}
      <Composition
        id="InfiniteContinuousLoop-V1"
        component={InfiniteContinuousLoopScene}
        schema={InfiniteLoopSchema}
        durationInFrames={1800}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={InfiniteLoopSchema.parse(infiniteLoopConfig)}
      />
    </>
  );
};
