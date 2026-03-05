#!/usr/bin/env node
// Usage: node scripts/capture-thumb.js <slug>
// Requires the dev server to be running at localhost:5173

import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: node scripts/capture-thumb.js <slug>');
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'thumbs');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 800 });

try {
  await page.goto(`http://localhost:5173/p/${slug}`, { waitUntil: 'networkidle', timeout: 15000 });
  // Let animations settle
  await page.waitForTimeout(800);
  // Clip below the nav bar (56px) to show only the prototype content
  await page.screenshot({
    path: join(outDir, `${slug}.png`),
    clip: { x: 0, y: 56, width: 1280, height: 744 },
  });
  console.log(`✓  Thumbnail saved → public/thumbs/${slug}.png`);
} catch (err) {
  console.error(`✗  Could not capture thumbnail: ${err.message}`);
  console.error('   Make sure the dev server is running: npm run dev');
  process.exit(1);
} finally {
  await browser.close();
}
