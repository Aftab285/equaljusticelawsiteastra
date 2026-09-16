import fs from 'node:fs';
import path from 'node:path';

// Clean XML formatter with standard indentation
function formatXml(xml) {
  return xml
    .replace(/>\s*</g, '>\n<')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      if (line.startsWith('</urlset>')) return line;
      if (line.startsWith('<url>') || line.startsWith('</url>')) return '  ' + line;
      if (line.startsWith('<loc>') || line.startsWith('<lastmod>')) return '    ' + line;
      return line;
    })
    .join('\n') + '\n';
}

// 1. Copy all static files from dist/client to dist root so Cloudflare Pages finds index.html
if (fs.existsSync('dist/client')) {
  fs.cpSync('dist/client', 'dist', { recursive: true });
}

// 2. Promote generated sitemap to the single canonical /sitemap.xml
const sourceSitemap = fs.existsSync('dist/sitemap-0.xml')
  ? 'dist/sitemap-0.xml'
  : (fs.existsSync('dist/client/sitemap-0.xml') ? 'dist/client/sitemap-0.xml' : null);

if (sourceSitemap) {
  const rawXml = fs.readFileSync(sourceSitemap, 'utf8');
  const formatted = formatXml(rawXml);
  fs.writeFileSync('dist/sitemap.xml', formatted, 'utf8');
  if (fs.existsSync('dist/client')) {
    fs.writeFileSync('dist/client/sitemap.xml', formatted, 'utf8');
  }
}

// 3. Remove index and child sitemaps so ONLY /sitemap.xml is the single production sitemap
const redundantFiles = [
  'dist/sitemap-0.xml',
  'dist/sitemap-index.xml',
  'dist/client/sitemap-0.xml',
  'dist/client/sitemap-index.xml',
];

for (const file of redundantFiles) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
}

// 4. Create dist/_worker.js that forwards to the compiled Astro server entrypoint
if (fs.existsSync('dist/server/entry.mjs')) {
  fs.writeFileSync('dist/_worker.js', "export { default } from './server/entry.mjs';\n");
}

console.log('Successfully prepared Cloudflare Pages build artifacts with single sitemap.xml.');
