import fs from 'node:fs';

// 1. Copy all static files from dist/client to dist root so Cloudflare Pages finds index.html
if (fs.existsSync('dist/client')) {
  fs.cpSync('dist/client', 'dist', { recursive: true });
}

// 2. Also ensure /sitemap.xml is available as pure XML for crawlers requesting that path directly
if (fs.existsSync('dist/sitemap-0.xml')) {
  fs.copyFileSync('dist/sitemap-0.xml', 'dist/sitemap.xml');
  if (fs.existsSync('dist/client')) {
    fs.copyFileSync('dist/sitemap-0.xml', 'dist/client/sitemap.xml');
  }
}

// 3. Create dist/_worker.js that forwards to the compiled Astro server entrypoint
if (fs.existsSync('dist/server/entry.mjs')) {
  fs.writeFileSync('dist/_worker.js', "export { default } from './server/entry.mjs';\n");
}

console.log('Successfully prepared Cloudflare Pages build artifacts.');
