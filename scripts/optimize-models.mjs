#!/usr/bin/env node
/**
 * Model photos pipeline — the single place to swap a car.
 *
 *   assets-src/models/<id>.png   (transparent PNG, any size)   ->   public/images/models/<id>-<w>.webp
 *                                                                    src/data/model-images.json (manifest)
 *
 * <id> must match `id` in src/data/models.js. To replace a car: overwrite its PNG and run
 *   npm run images:models
 * Every place that shows the model (home grid, mega menu, mobile menu, sliders ...) reads the same registry.
 * Transparency is kept (lossy WebP with alpha). Widths above the source width are skipped (no upscaling).
 */
import { readdir, writeFile, mkdir } from 'node:fs/promises';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets-src/models';
const OUT = 'public/images/models';
const MANIFEST = 'src/data/model-images.json';
const WIDTHS = [400, 800, 1200];

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.png$/i.test(f)).sort();
const manifest = {};
let total = 0;

for (const file of files) {
  const id = path.basename(file, path.extname(file));
  const input = sharp(path.join(SRC, file));
  const { width, height } = await input.metadata();
  const widths = WIDTHS.filter((w) => w <= width);
  if (!widths.includes(width) && width < WIDTHS[WIDTHS.length - 1]) widths.push(width);
  for (const w of widths) {
    const out = path.join(OUT, `${id}-${w}.webp`);
    await sharp(path.join(SRC, file)).resize({ width: w }).webp({ quality: 82, alphaQuality: 92, effort: 6 }).toFile(out);
    total += (await stat(out)).size;
  }
  manifest[id] = { widths, width, height };
  console.log(`${id.padEnd(24)} ${width}x${height} -> ${widths.join(', ')}`);
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${files.length} models, ${Math.round(total / 1024)} KB of WebP written to ${OUT}, manifest: ${MANIFEST}`);
