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
      if (line.startsWith('</urlset>') || line.startsWith('</sitemapindex>')) return line;
      if (line.startsWith('<url>') || line.startsWith('</url>') || line.startsWith('<sitemap>') || line.startsWith('</sitemap>')) return '  ' + line;
      if (line.startsWith('<loc>') || line.startsWith('<lastmod>')) return '    ' + line;
      return line;
    })
    .join('\n') + '\n';
}

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

// 3. Format all sitemaps in dist and dist/client with clean, human- and machine-readable XML indentation
for (const dir of ['dist', 'dist/client']) {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.startsWith('sitemap') && file.endsWith('.xml')) {
        const filePath = path.join(dir, file);
        const rawXml = fs.readFileSync(filePath, 'utf8');
        const formatted = formatXml(rawXml);
        fs.writeFileSync(filePath, formatted, 'utf8');
      }
    }
  }
}

// 4. Create dist/_worker.js that forwards to the compiled Astro server entrypoint
if (fs.existsSync('dist/server/entry.mjs')) {
  fs.writeFileSync('dist/_worker.js', "export { default } from './server/entry.mjs';\n");
}

console.log('Successfully prepared Cloudflare Pages build artifacts with clean XML sitemaps.');
