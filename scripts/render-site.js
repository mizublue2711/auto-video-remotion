#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { renderMediaOnCloudrun } from '@remotion/cloudrun/client';

dotenv.config();

/**
 * Helper to parse command line arguments into a dictionary.
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    composition: 'WebsiteShowcase',
    config: './site-configs/website-a.json',
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--composition=')) {
      options.composition = arg.split('=')[1];
    } else if (arg === '--composition' && args[i + 1]) {
      options.composition = args[i + 1];
      i++;
    } else if (arg.startsWith('--config=')) {
      options.config = arg.split('=')[1];
    } else if (arg === '--config' && args[i + 1]) {
      options.config = args[i + 1];
      i++;
    }
  }

  return options;
}

async function run() {
  const options = parseArgs();

  const configPath = path.resolve(process.cwd(), options.config);
  if (!fs.existsSync(configPath)) {
    console.error(`Error: Config file not found at ${configPath}`);
    process.exit(1);
  }

  let inputProps = {};
  try {
    const rawData = fs.readFileSync(configPath, 'utf8');
    inputProps = JSON.parse(rawData);
  } catch (err) {
    console.error(`Error reading or parsing config file ${configPath}:`, err.message);
    process.exit(1);
  }

  const serviceName = process.env.REMOTION_SERVICE_NAME || 'remotion-4-0-200-exec20241027';
  const region = process.env.GCP_REGION || 'us-east1';
  const serveUrl =
    process.env.REMOTION_SERVE_URL ||
    'https://storage.googleapis.com/remotioncloudrun-npwagxlt15/sites/my-video/index.html';

  console.log('--- Remotion Cloud Run Rendering Job ---');
  console.log(`Chosen Composition ID : ${options.composition}`);
  console.log(`Config File Path      : ${options.config}`);
  console.log(`Target Service Name   : ${serviceName}`);
  console.log(`GCP Region            : ${region}`);
  console.log(`Serve URL             : ${serveUrl}`);

  try {
    const result = await renderMediaOnCloudrun({
      serviceName,
      region,
      serveUrl,
      composition: options.composition,
      inputProps,
      codec: 'h264',
    });

    if (result.type === 'crash') {
      console.error('Render execution failed with crash:', result.message);
      process.exit(1);
    }

    console.log('\n Render Completed Successfully!');
    console.log(`Render ID         : ${result.renderId}`);
    console.log(`Cloud Storage URI : ${result.cloudStorageUri}`);
    if (result.publicUrl) {
      console.log(`Public Video URL  : ${result.publicUrl}`);
    }
  } catch (error) {
    console.error('Error triggering Cloud Run render:', error.message);
    process.exit(1);
  }
}

run();
