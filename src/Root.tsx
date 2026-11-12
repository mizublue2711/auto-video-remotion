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

import { StudyGearConvergenceScene } from './scenes/StudyGearConvergenceScene';
import { MasterCompositeScene } from './scenes/MasterCompositeScene';
import { StudyGearConvergenceSchema } from './schemas/studyGearConvergenceSchema';
import studyGearConvergenceConfig from '../site-configs/study-gear-convergence.json';

import { websiteShowcaseSchema } from './schemas/websiteShowcase';
import { RemotionConfigSchema } from './schemas/index';
import { PropPhoneScreenUI } from './components/props/PropPhoneScreenUI';

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
        component={WebsiteShowcase as React.FC<any>}
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

      {/* Infinite Continuous Loop Composition - Upgraded to 2,340 frames (39.0s @ 60FPS) */}
      <Composition
        id="InfiniteContinuousLoop-V1"
        component={InfiniteContinuousLoopScene}
        schema={InfiniteLoopSchema}
        durationInFrames={2340}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={InfiniteLoopSchema.parse(infiniteLoopConfig)}
      />

      {/* Scene 3: Study Gear Convergence (Burst -> Arc Swap -> Vortex Suction) */}
      <Composition
        id="StudyGearConvergence-Scene3"
        component={StudyGearConvergenceScene as React.FC<any>}
        schema={StudyGearConvergenceSchema}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={StudyGearConvergenceSchema.parse(studyGearConvergenceConfig)}
      />

      {/* Backward-compatibility alias for Scene 2.5 */}
      <Composition
        id="StudyGearConvergence-Scene2.5"
        component={StudyGearConvergenceScene as React.FC<any>}
        schema={StudyGearConvergenceSchema}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={StudyGearConvergenceSchema.parse(studyGearConvergenceConfig)}
      />

      {/* Master Container: Scene 3 Master Composite */}
      <Composition
        id="MasterCompositeScene"
        component={MasterCompositeScene as React.FC<any>}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Prop Phone Screen UI - Fintech mobile viewport for chroma compositing */}
      <Composition
        id="PropPhoneScreenUI"
        component={PropPhoneScreenUI}
        durationInFrames={180}
        fps={60}
        width={400}
        height={860}
        defaultProps={{
          balance: 125000,
          userName: 'Kim Min-jun',
          solveStreak: 7,
        }}
      />
    </>
  );
};
