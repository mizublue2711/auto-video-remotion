import fs from 'fs';
import path from 'path';
import { RemotionConfigSchema } from '../src/schemas/index.js';

function getJsonFilesFromPath(targetPath: string): string[] {
  if (!fs.existsSync(targetPath)) {
    return [];
  }
  const stat = fs.statSync(targetPath);
  if (stat.isFile()) {
    return targetPath.endsWith('.json') ? [targetPath] : [];
  }
  if (stat.isDirectory()) {
    const entries = fs.readdirSync(targetPath, { withFileTypes: true });
    let results: string[] = [];
    for (const entry of entries) {
      const fullPath = path.join(targetPath, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(getJsonFilesFromPath(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.json')) {
        results.push(fullPath);
      }
    }
    return results;
  }
  return [];
}

function resolveTargetPaths(args: string[]): string[] {
  if (args.length > 0) {
    let files: string[] = [];
    for (const arg of args) {
      files = files.concat(getJsonFilesFromPath(arg));
    }
    return files;
  }

  const defaultDirs = ['./site-configs', './configs'];
  let files: string[] = [];
  for (const dir of defaultDirs) {
    files = files.concat(getJsonFilesFromPath(dir));
  }
  return files;
}

function validateConfigs() {
  const cliArgs = process.argv.slice(2);
  const filesToValidate = resolveTargetPaths(cliArgs);

  if (filesToValidate.length === 0) {
    console.warn('No JSON configuration files found to validate.');
    process.exit(0);
  }

  console.log(`Scanning ${filesToValidate.length} JSON configuration file(s)...\n`);

  let hasErrors = false;
  const passedFiles: string[] = [];
  const failedFiles: string[] = [];

  for (const filePath of filesToValidate) {
    let rawData: string;
    try {
      rawData = fs.readFileSync(filePath, 'utf-8');
    } catch (err) {
      console.error(`❌ Failed to read file: ${filePath}`);
      console.error(`   Error: ${(err as Error).message}\n`);
      hasErrors = true;
      failedFiles.push(filePath);
      continue;
    }

    let parsedData: unknown;
    try {
      parsedData = JSON.parse(rawData);
    } catch (err) {
      console.error(`❌ Invalid JSON syntax in file: ${filePath}`);
      console.error(`   Error: ${(err as Error).message}\n`);
      hasErrors = true;
      failedFiles.push(filePath);
      continue;
    }

    const result = RemotionConfigSchema.safeParse(parsedData);

    if (!result.success) {
      hasErrors = true;
      failedFiles.push(filePath);
      console.error(`❌ Validation failed for: ${filePath}`);
      result.error.issues.forEach((issue) => {
        const fieldPath = issue.path.length > 0 ? issue.path.join('.') : 'root';
        console.error(`   - Field: [${fieldPath}] -> ${issue.message}`);
      });
      console.error('');
    } else {
      passedFiles.push(filePath);
      console.log(`✓ Passed: ${filePath}`);
    }
  }

  if (hasErrors) {
    console.error(`\nValidation complete with errors.`);
    console.error(`Failed files (${failedFiles.length}): ${failedFiles.join(', ')}`);
    console.error(`Passed files (${passedFiles.length}): ${passedFiles.join(', ')}`);
    process.exit(1);
  }

  console.log(`\n🎉 Success! All ${passedFiles.length} configuration file(s) passed validation:`);
  passedFiles.forEach((f) => console.log(`   - ${f}`));
  process.exit(0);
}

validateConfigs();
