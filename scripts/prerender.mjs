#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the routes
const routesFile = join(__dirname, '../src/prerender-routes.ts');
let routes = [];

try {
  const routesContent = readFileSync(routesFile, 'utf-8');
  const routesMatch = routesContent.match(
    /export const PRERENDER_ROUTES = \[([\s\S]*?)\]/
  );
  if (routesMatch) {
    routes = routesMatch[1]
      .split(',')
      .map((route) => route.trim().replace(/['"]/g, ''))
      .filter((route) => route && route !== '');
  }
} catch (error) {
  console.warn(
    'Could not read routes from prerender-routes.ts, using default routes'
  );
  routes = ['/'];
}

console.log(`Found ${routes.length} routes to prerender`);

// Read the base index.html
const distDir = join(__dirname, '../dist/personal-blog-front/browser');
const indexHtml = readFileSync(join(distDir, 'index.html'), 'utf-8');

// For each route, create a directory structure and index.html
routes.forEach((route) => {
  const routePath = route === '/' ? '' : route;
  const outputDir = join(distDir, routePath);

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  // For now, we'll use the same index.html for all routes
  // This creates the proper static site structure
  const outputFile = join(outputDir, 'index.html');
  writeFileSync(outputFile, indexHtml);

  console.log(`Generated: ${outputFile}`);
});

// Create 404.html file in the root for static hosting services
const notFoundHtml = join(distDir, '404.html');
writeFileSync(notFoundHtml, indexHtml);
console.log(`Generated: ${notFoundHtml}`);

console.log('✅ Static site generation completed!');
console.log('📁 Files are available in: dist/personal-blog-front/browser/');
console.log('🚀 Deploy this folder to any static hosting service.');
console.log('');
console.log('Note: This creates a Single Page Application (SPA) structure.');
console.log(
  'Each route serves the same client-side app that will render the appropriate content.'
);
