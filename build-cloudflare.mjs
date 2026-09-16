import fs from 'node:fs';
import path from 'node:path';

// Function to pretty-print XML with proper indentation and newlines
function prettyXml(xmlContent) {
  const lines = xmlContent
    .replace(/>\s*</g, '>\n<')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  let indent = 0;
  const formatted = [];
  for (const line of lines) {
    if (line.startsWith('<?xml')) {
      formatted.push(line);
      continue;
    }
    if (line.startsWith('</')) {
      indent = Math.max(0, indent - 1);
    }
    formatted.push('  '.repeat(indent) + line);
    if (!line.startsWith('</') && !line.startsWith('<?') && !line.includes('</') && !line.endsWith('/>')) {
      indent++;
    }
  }
  return formatted.join('\n');
}

// 1. Format all generated sitemaps in dist/client
if (fs.existsSync('dist/client')) {
  const files = fs.readdirSync('dist/client');
  for (const file of files) {
    if (file.startsWith('sitemap') && file.endsWith('.xml')) {
      const filePath = path.join('dist/client', file);
      const rawXml = fs.readFileSync(filePath, 'utf8');
      const formattedXml = prettyXml(rawXml);
      fs.writeFileSync(filePath, formattedXml + '\n', 'utf8');
    }
  }
}

// 2. Copy all static files from dist/client to dist root so Cloudflare Pages finds index.html and sitemaps
if (fs.existsSync('dist/client')) {
  fs.cpSync('dist/client', 'dist', { recursive: true });
}

// 3. Ensure sitemaps at dist root are also formatted
if (fs.existsSync('dist')) {
  const files = fs.readdirSync('dist');
  for (const file of files) {
    if (file.startsWith('sitemap') && file.endsWith('.xml')) {
      const filePath = path.join('dist', file);
      const rawXml = fs.readFileSync(filePath, 'utf8');
      const formattedXml = prettyXml(rawXml);
      fs.writeFileSync(filePath, formattedXml + '\n', 'utf8');
    }
  }
}

// 4. Create dist/_worker.js that forwards to the compiled Astro server entrypoint
if (fs.existsSync('dist/server/entry.mjs')) {
  fs.writeFileSync('dist/_worker.js', "export { default } from './server/entry.mjs';\n");
}

console.log('Successfully prepared Cloudflare Pages build artifacts with formatted XML sitemaps.');
