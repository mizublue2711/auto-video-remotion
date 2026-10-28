import { Config } from '@remotion/cli/config';

Config.setStillImageFormat('png');
Config.setConcurrency(2);
Config.overrideWebpackConfig((currentConfiguration) => {
  return {
    ...currentConfiguration,
  };
});
