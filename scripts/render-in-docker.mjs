import { selectComposition, renderMedia } from '@remotion/renderer';
import fs from 'fs';
import path from 'path';

/**
 * Helper to get argument value from CLI flags or Environment Variable, falling back to a default value.
 */
function getOption(cliFlags, envVarName, defaultValue) {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    for (const flag of cliFlags) {
      if (arg.startsWith(`--${flag}=`)) {
        return arg.substring(flag.length + 3);
      }
      if (arg === `--${flag}` && i + 1 < args.length && !args[i + 1].startsWith('--')) {
        return args[i + 1];
      }
    }
  }
  if (process.env[envVarName]) {
    return process.env[envVarName];
  }
  return defaultValue;
}

/**
 * Load and parse JSON props file.
 */
function loadInputProps(propsFilePath) {
  const resolvedPath = path.resolve(process.cwd(), propsFilePath);
  if (!fs.existsSync(resolvedPath)) {
    console.warn(`[Warning] Props file not found at: ${resolvedPath}. Proceeding with default empty props.`);
    return {};
  }
  try {
    const rawData = fs.readFileSync(resolvedPath, 'utf8');
    const parsed = JSON.parse(rawData);
    console.log(`[Info] Successfully loaded props from: ${propsFilePath}`);
    return parsed;
  } catch (err) {
    console.error(`[Error] Failed to parse props file at ${propsFilePath}:`, err.message);
    process.exit(1);
  }
}

async function main() {
  const propsFile = getOption(['props-file', 'props', 'propsFile'], 'PROPS_FILE', './site-configs/artificial-craft.json');
  const compositionId = getOption(['composition-id', 'composition', 'compositionId'], 'COMPOSITION_ID', 'WebsiteShowcase');
  const outputFile = getOption(['output-file', 'output', 'outputFile'], 'OUTPUT_FILE', 'out.mp4');
  const rawConcurrency = getOption(['concurrency'], 'CONCURRENCY', '2');
  const concurrency = parseInt(rawConcurrency, 10) || 2;

  console.log('=== Remotion Docker Runner ===');
  console.log(`Props File: ${propsFile}`);
  console.log(`Composition ID: ${compositionId}`);
  console.log(`Output File: ${outputFile}`);
  console.log(`Concurrency: ${concurrency}`);

  const bundleDirectory = path.resolve(process.cwd(), 'dist/bundle');
  if (!fs.existsSync(bundleDirectory)) {
    console.error(`[Error] Bundle directory not found at: ${bundleDirectory}`);
    console.error(`Please build/bundle the project first via: npx remotion bundle src/index.ts --out-dir=dist/bundle`);
    process.exit(1);
  }

  const inputProps = loadInputProps(propsFile);

  const chromiumFlags = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
  ];

  const browserExecutable =
    process.env.REMOTION_CHROME_EXECUTABLE ||
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    '/usr/bin/chromium';

  const selectOptions = {
    serveUrl: bundleDirectory,
    id: compositionId,
    inputProps,
    chromiumOptions: {
      args: chromiumFlags,
    },
  };

  if (fs.existsSync(browserExecutable)) {
    selectOptions.browserExecutable = browserExecutable;
  }

  console.log(`\n[Info] Selecting composition '${compositionId}'...`);
  let composition;
  try {
    composition = await selectComposition(selectOptions);
  } catch (err) {
    console.error(`[Error] Failed to select composition '${compositionId}':`, err.message);
    process.exit(1);
  }

  console.log(`[Info] Composition found: ${composition.id} (${composition.width}x${composition.height}, ${composition.durationInFrames} frames @ ${composition.fps} fps)`);

  const outputLocation = path.resolve(process.cwd(), outputFile);

  const renderOptions = {
    composition,
    serveUrl: bundleDirectory,
    outputLocation,
    inputProps,
    codec: 'h264',
    concurrency,
    chromiumOptions: {
      args: chromiumFlags,
    },
    onProgress: ({ progress }) => {
      const percent = Math.round(progress * 100);
      if (percent % 10 === 0 || percent === 100) {
        console.log(`[Status] Rendering progress: ${percent}%`);
      }
    },
  };

  if (fs.existsSync(browserExecutable)) {
    renderOptions.browserExecutable = browserExecutable;
  }

  console.log(`\n[Status] Starting video render...`);
  try {
    await renderMedia(renderOptions);
    console.log(`\n=== Render Completed Successfully ===`);
    console.log(`Output saved to: ${outputLocation}`);
  } catch (err) {
    console.error(`\n[Error] Render failed:`, err.message);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('[Error] Unhandled error in runner script:', err);
  process.exit(1);
});
