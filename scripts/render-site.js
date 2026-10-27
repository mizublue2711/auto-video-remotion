#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { renderMediaOnCloudrun } from '@remotion/cloudrun/client';

/**
 * Helper to parse CLI arguments for JSON config path.
 * Defaults to './site-configs/website-a.json' if no argument is supplied.
 */
function getJsonConfigPath() {
  const args = process.argv.slice(2);
  let configPath = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--input=')) {
      configPath = args[i].split('=')[1];
    } else if (args[i] === '--input' && args[i + 1]) {
      configPath = args[i + 1];
      i++;
    } else if (!args[i].startsWith('--') && !configPath) {
      configPath = args[i];
    }
  }

  return configPath || './site-configs/website-a.json';
}

/**
 * Helper to parse the JSON input props file.
 */
function loadInputProps(filePath) {
  const resolvedPath = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`[Error] Configuration file not found at: ${resolvedPath}`);
    process.exit(1);
  }

  try {
    const rawData = fs.readFileSync(resolvedPath, 'utf8');
    const parsed = JSON.parse(rawData);
    console.log(`[Info] Successfully loaded site configuration from: ${filePath}`);
    return parsed;
  } catch (error) {
    console.error(`[Error] Failed to parse JSON configuration file at ${filePath}:`, error.message);
    process.exit(1);
  }
}

async function renderSite() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');
  const configFilePath = getJsonConfigPath();
  const inputProps = loadInputProps(configFilePath);

  const renderConfig = {
    serviceName: 'remotion-4-0-200-exec20241027',
    region: 'us-east1',
    serveUrl: 'https://storage.googleapis.com/remotioncloudrun-npwagxlt15/sites/my-video/index.html',
    composition: 'WebsiteShowcase',
    inputProps,
    codec: 'h264',
  };

  console.log('=== Starting Site Video Render ===');
  console.log(`Composition: ${renderConfig.composition}`);
  console.log(`Service Name: ${renderConfig.serviceName}`);
  console.log(`Region: ${renderConfig.region}`);
  console.log(`Serve URL: ${renderConfig.serveUrl}`);
  console.log('Input Props:', JSON.stringify(inputProps, null, 2));

  if (isDryRun) {
    console.log('\n--- Dry Run Mode Enabled ---');
    console.log('[Status] Simulating render request...');
    const mockRenderId = `dryrun-${Date.now()}`;
    const mockBucketUrl = `gs://remotioncloudrun-npwagxlt15/renders/${mockRenderId}/out.mp4`;
    console.log('[Status] Render Completed (Simulated)');
    console.log(`Render ID: ${mockRenderId}`);
    console.log(`Bucket URL: ${mockBucketUrl}`);
    return;
  }

  try {
    console.log('\n[Status] Dispatching render job to Remotion Cloud Run...');

    let lastProgress = 0;
    const renderResult = await renderMediaOnCloudrun({
      ...renderConfig,
      updateRenderProgress: (progress, error) => {
        if (error) {
          console.error('[Error] Cloud Run render progress error:', error);
        } else {
          const currentProgress = Math.round(progress * 100);
          if (currentProgress >= lastProgress + 10 || currentProgress === 100) {
            console.log(`[Status] Rendering progress: ${currentProgress}%`);
            lastProgress = currentProgress;
          }
        }
      },
    });

    if (renderResult.type === 'crash') {
      console.error('[Error] Cloud Run service crashed:', renderResult.message);
      process.exit(1);
    }

    console.log('\n=== Render Job Finished Successfully ===');
    console.log(`Render ID: ${renderResult.renderId}`);
    console.log(`Bucket URL / Cloud Storage URI: ${renderResult.cloudStorageUri || 'N/A'}`);
    if (renderResult.publicUrl) {
      console.log(`Public Video URL: ${renderResult.publicUrl}`);
    }
  } catch (error) {
    console.error('\n[Error] Cloud Run render failed:', error.message);
    process.exit(1);
  }
}

renderSite();
