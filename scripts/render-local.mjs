import { selectComposition, renderMedia, bundle } from '@remotion/renderer';
import fs from 'fs';
import path from 'path';

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

function loadInputProps(propsFilePath) {
  const resolvedPath = path.resolve(process.cwd(), propsFilePath);
  if (!fs.existsSync(resolvedPath)) {
    console.warn(`[Warning] Props file not found at: ${resolvedPath}. Using empty default props.`);
    return {};
  }
  try {
    const rawData = fs.readFileSync(resolvedPath, 'utf8');
    return JSON.parse(rawData);
  } catch (err) {
    console.error(`[Error] Failed to parse props file at ${propsFilePath}:`, err.message);
    process.exit(1);
  }
}

async function main() {
  const propsFile = getOption(['props-file', 'props', 'propsFile'], 'PROPS_FILE', './site-configs/artificial-craft.json');
  const compositionId = getOption(['composition-id', 'composition', 'compositionId'], 'COMPOSITION_ID', 'MasterDirectorScene');
  const outputFile = getOption(['output-file', 'output', 'outputFile'], 'OUTPUT_FILE', 'out/master-scene.mp4');
  const rawConcurrency = getOption(['concurrency'], 'CONCURRENCY', '2');
  const concurrency = parseInt(rawConcurrency, 10) || 2;

  console.log('=== Remotion Local Batch Renderer ===');
  console.log(`Props File: ${propsFile}`);
  console.log(`Composition ID: ${compositionId}`);
  console.log(`Output File: ${outputFile}`);
  console.log(`Concurrency: ${concurrency}`);

  let bundleDirectory = path.resolve(process.cwd(), 'dist/bundle');
  if (!fs.existsSync(bundleDirectory)) {
    console.log('[Info] Pre-built bundle not found. Bundling entry point src/index.ts...');
    const entryPoint = path.resolve(process.cwd(), 'src/index.ts');
    bundleDirectory = await bundle({
      entryPoint,
      outDir: path.resolve(process.cwd(), 'dist/bundle'),
    });
  }

  const inputProps = loadInputProps(propsFile);

  const selectOptions = {
    serveUrl: bundleDirectory,
    id: compositionId,
    inputProps,
  };

  console.log(`\n[Info] Selecting composition '${compositionId}'...`);
  const composition = await selectComposition(selectOptions);

  console.log(`[Info] Composition loaded: ${composition.id} (${composition.width}x${composition.height}, ${composition.durationInFrames} frames @ ${composition.fps} fps)`);

  const outputLocation = path.resolve(process.cwd(), outputFile);
  const outputDir = path.dirname(outputLocation);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`\n[Status] Rendering video to ${outputLocation}...`);
  await renderMedia({
    composition,
    serveUrl: bundleDirectory,
    outputLocation,
    inputProps,
    codec: 'h264',
    concurrency,
    onProgress: ({ progress }) => {
      const percent = Math.round(progress * 100);
      if (percent % 20 === 0 || percent === 100) {
        console.log(`[Status] Rendering progress: ${percent}%`);
      }
    },
  });

  console.log('\n=== Local Render Finished Successfully ===');
  console.log(`Saved output to: ${outputLocation}`);
}

main().catch((err) => {
  console.error('[Error] Local render script failed:', err);
  process.exit(1);
});
