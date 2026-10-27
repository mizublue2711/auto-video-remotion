const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
require('dotenv').config();

const { renderMediaOnCloudrun } = require('@remotion/cloudrun/client');

// Track rendering progress
let currentProgress = 0;
let isRenderComplete = false;

/**
 * Returns the current render progress (0 to 1).
 */
function getRenderProgress() {
  return currentProgress;
}

/**
 * Parses command line arguments to retrieve input props from a JSON file.
 */
function parseInputProps() {
  const args = process.argv.slice(2);
  let inputFilePath = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--input=')) {
      inputFilePath = args[i].split('=')[1];
    } else if (args[i] === '--input' && args[i + 1]) {
      inputFilePath = args[i + 1];
      i++;
    }
  }

  if (inputFilePath) {
    const resolvedPath = path.resolve(process.cwd(), inputFilePath);
    if (!fs.existsSync(resolvedPath)) {
      console.error(`Input JSON file not found at: ${resolvedPath}`);
      process.exit(1);
    }
    try {
      const fileContent = fs.readFileSync(resolvedPath, 'utf8');
      console.log(`Loaded input props from file: ${inputFilePath}`);
      return JSON.parse(fileContent);
    } catch (err) {
      console.error(`Failed to parse JSON from file ${inputFilePath}:`, err.message);
      process.exit(1);
    }
  }

  if (process.env.REMOTION_INPUT_PROPS) {
    try {
      return JSON.parse(process.env.REMOTION_INPUT_PROPS);
    } catch (err) {
      console.warn('REMOTION_INPUT_PROPS in .env is not valid JSON. Using empty props object.');
    }
  }

  console.log('No input JSON file provided via --input. Using default empty input props.');
  return {};
}

/**
 * Downloads a file from a URL to local destination.
 */
function downloadFile(url, destinationPath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destinationPath);

    client
      .get(url, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          // Follow redirect
          return downloadFile(response.headers.location, destinationPath)
            .then(resolve)
            .catch(reject);
        }

        if (response.statusCode !== 200) {
          return reject(new Error(`Failed to download file. HTTP Status Code: ${response.statusCode}`));
        }

        response.pipe(file);

        file.on('finish', () => {
          file.close(() => resolve(destinationPath));
        });
      })
      .on('error', (err) => {
        fs.unlink(destinationPath, () => {});
        reject(err);
      });
  });
}

async function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');

  if (args.includes('--help')) {
    console.log(`
Usage: node render-cloud.js [options]

Options:
  --input=<file.json>    Path to JSON file containing dynamic input props
  --dry-run              Simulate rendering and download for verification/testing
  --help                 Show this help message
`);
    process.exit(0);
  }

  const inputProps = parseInputProps();

  const region = process.env.GCP_REGION;
  const serviceName = process.env.REMOTION_SERVICE_NAME;
  const serveUrl = process.env.REMOTION_SERVE_URL;
  const composition = process.env.REMOTION_COMPOSITION_ID;

  if (isDryRun) {
    console.log('--- Dry Run Mode ---');
    console.log('Region:', region || 'us-central1');
    console.log('Service Name:', serviceName || 'remotion-render-service');
    console.log('Serve URL:', serveUrl || 'https://storage.googleapis.com/example/site');
    console.log('Composition:', composition || 'MainComposition');
    console.log('Input Props:', JSON.stringify(inputProps, null, 2));

    // Simulate progress polling loop
    const pollingInterval = setInterval(() => {
      currentProgress += 0.25;
      if (currentProgress > 1) currentProgress = 1;
      const progressPercent = Math.round(getRenderProgress() * 100);
      console.log(`Rendering progress: ${progressPercent}%`);

      if (currentProgress >= 1) {
        isRenderComplete = true;
        clearInterval(pollingInterval);
      }
    }, 2000);

    await new Promise((res) => setTimeout(res, 9000));

    const downloadsDir = path.resolve(process.cwd(), 'downloads');
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }
    const mockFilePath = path.join(downloadsDir, `render_dryrun_${Date.now()}.mp4`);
    fs.writeFileSync(mockFilePath, 'Mock video content for dry run');
    console.log(`Dry run complete. Saved mock video to: ${mockFilePath}`);
    return;
  }

  if (!region || !serviceName || !serveUrl || !composition) {
    console.error('Error: Missing required GCP or Remotion environment variables.');
    console.error('Please ensure GCP_REGION, REMOTION_SERVICE_NAME, REMOTION_SERVE_URL, and REMOTION_COMPOSITION_ID are set in your .env file.');
    process.exit(1);
  }

  // Ensure output downloads directory exists
  const downloadsDir = path.resolve(process.cwd(), 'downloads');
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
  }

  console.log(`Starting Cloud Run render for composition "${composition}"...`);

  // Polling loop using getRenderProgress() every 2 seconds
  const pollingInterval = setInterval(() => {
    const progressPercent = Math.round(getRenderProgress() * 100);
    console.log(`Rendering progress: ${progressPercent}%`);

    if (isRenderComplete) {
      clearInterval(pollingInterval);
    }
  }, 2000);

  try {
    const renderResult = await renderMediaOnCloudrun({
      region,
      serviceName,
      serveUrl,
      composition,
      inputProps,
      codec: 'h264',
      updateRenderProgress: (progress, error) => {
        if (error) {
          console.error('An error occurred during Cloud Run rendering step.');
        }
        currentProgress = progress;
      },
    });

    isRenderComplete = true;
    clearInterval(pollingInterval);

    if (renderResult.type === 'crash') {
      throw new Error(`Cloud Run service crashed: ${renderResult.message}`);
    }

    console.log(`Rendering finished successfully! Render ID: ${renderResult.renderId}`);

    const videoUrl = renderResult.publicUrl;
    if (!videoUrl) {
      console.log(`Public URL not available. Video stored in bucket: ${renderResult.cloudStorageUri}`);
      return;
    }

    const outputFileName = `render_${renderResult.renderId || Date.now()}.mp4`;
    const outputPath = path.join(downloadsDir, outputFileName);

    console.log(`Downloading video from ${videoUrl} to ${outputPath}...`);
    await downloadFile(videoUrl, outputPath);
    console.log(`Download complete! Video saved to ${outputPath}`);
  } catch (error) {
    isRenderComplete = true;
    clearInterval(pollingInterval);
    console.error('Render failed:', error.message);
    process.exit(1);
  }
}

main();
