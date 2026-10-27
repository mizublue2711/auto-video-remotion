import { Composition } from 'remotion';
import { WebsiteShowcase } from './compositions/WebsiteShowcase';
import { UIShowcase } from './compositions/UIShowcase';
import { FeatureSpotlight } from './compositions/FeatureSpotlight';

import websiteConfig from '../site-configs/website-a.json';
import uiShowcaseConfig from '../site-configs/ui-showcase.json';
import featureSpotlightConfig from '../site-configs/feature-spotlight.json';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WebsiteShowcase"
        component={WebsiteShowcase}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
        defaultProps={websiteConfig}
      />
      <Composition
        id="UIShowcase"
        component={UIShowcase}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
        defaultProps={uiShowcaseConfig}
      />
      <Composition
        id="FeatureSpotlight"
        component={FeatureSpotlight}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
        defaultProps={featureSpotlightConfig}
      />
    </>
  );
};
