import fs from 'fs';
import path from 'path';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { universalMotionSchemaV2 } from '../src/schemas/universalMotionSchemaV2';

const jsonSchema = zodToJsonSchema(universalMotionSchemaV2, 'UniversalMotionSchemaV2');

const outputDir = path.join(process.cwd(), 'public', 'schemas');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'universal-motion-schema.json');
fs.writeFileSync(outputPath, JSON.stringify(jsonSchema, null, 2), 'utf-8');

console.log(`Successfully exported schema to ${outputPath}`);
