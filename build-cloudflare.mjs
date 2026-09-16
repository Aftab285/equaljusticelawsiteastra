import fs from 'node:fs';
import path from 'node:path';

// Function to format XML with clean indentation and newlines
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

// 1. Copy all static files from dist/client to dist root so Cloudflare Pages finds index.html
if (fs.existsSync('dist/client')) {
  fs.cpSync('dist/client', 'dist', { recursive: true });
}

// 2. Ensure standard sitemap.xml exists alongside sitemap-index.xml and sitemap-0.xml
if (fs.existsSync('dist/sitemap-0.xml')) {
  fs.copyFileSync('dist/sitemap-0.xml', 'dist/sitemap.xml');
  if (fs.existsSync('dist/client')) {
    fs.copyFileSync('dist/sitemap-0.xml', 'dist/client/sitemap.xml');
  }
} else if (fs.existsSync('dist/sitemap-index.xml')) {
  fs.copyFileSync('dist/sitemap-index.xml', 'dist/sitemap.xml');
  if (fs.existsSync('dist/client')) {
    fs.copyFileSync('dist/sitemap-index.xml', 'dist/client/sitemap.xml');
  }
}

// 3. Attach XSL stylesheet & format all sitemaps in dist and dist/client
for (const dir of ['dist', 'dist/client']) {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.startsWith('sitemap') && file.endsWith('.xml')) {
        const filePath = path.join(dir, file);
        let rawXml = fs.readFileSync(filePath, 'utf8');
        if (!rawXml.includes('xml-stylesheet')) {
          rawXml = rawXml.replace(
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>'
          );
        }
        const formatted = prettyXml(rawXml);
        fs.writeFileSync(filePath, formatted + '\n', 'utf8');
      }
    }
  }
}

// 4. Create dist/_worker.js that forwards to the compiled Astro server entrypoint
if (fs.existsSync('dist/server/entry.mjs')) {
  fs.writeFileSync('dist/_worker.js', "export { default } from './server/entry.mjs';\n");
}

console.log('Successfully prepared Cloudflare Pages build artifacts with styled XML sitemaps.');
