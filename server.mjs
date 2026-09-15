import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist');
const PORT = 4321;

// Load .env if present
try {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envLines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of envLines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [k, ...v] = trimmed.split('=');
        if (k && !process.env[k.trim()]) process.env[k.trim()] = v.join('=').trim();
      }
    }
  }
} catch (e) {}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);

  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  // Handle /api/contact form submissions via Resend API
  if (req.method === 'POST' && reqPath === '/api/contact') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body || '{}');
        const apiKey = process.env.RESEND_API_KEY;
        const recipient = 'aftabnew77@gmail.com';
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'Equal Justice Lawyers <onboarding@resend.dev>';

        const source = data.source || 'Website Contact / Evaluation Form';
        const fullName = data.full_name || data.name || data.contactName || 'Anonymous / Not Provided';
        const email = data.email || 'Not Provided';
        const phone = data.phone || data.contactPhone || data.contact || 'Not Provided';
        const caseType = data.case_type || data.caseType || 'General Legal Inquiry';
        const county = data.county || 'Not Specified';
        const timeframe = data.timeframe || 'Not Specified';
        const hasAttorney = data.has_attorney || data.hasAttorney || 'No';
        const summary = data.incident_summary || data.summary || data.notes || 'No description provided';
        const lang = data.preferred_language || (data.isSpanish ? 'Español' : 'English');

        const html = `
          <!DOCTYPE html>
          <html>
          <head><meta charset="utf-8"></head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f4eee3; padding: 24px; color: #1c2822;">
            <div style="max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #c8a04a; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
              <div style="background: #122019; padding: 22px; text-align: center; border-bottom: 3px solid #c8a04a;">
                <h1 style="color: #fff; margin: 0; font-size: 20px; letter-spacing: 0.05em;">EQUAL JUSTICE LAWYERS</h1>
                <p style="color: #c8a04a; margin: 5px 0 0; font-size: 13px; font-weight: bold; text-transform: uppercase;">New Case Intake Lead</p>
              </div>
              <div style="padding: 24px;">
                <div style="display:inline-block; background:#c8a04a; color:#122019; font-weight:bold; font-size:12px; padding:3px 10px; border-radius:15px; margin-bottom:15px;">${source}</div>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666; width: 35%;">Full Name:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>${fullName}</strong></td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Email:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Phone / Contact:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${phone}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Case Type:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>${caseType}</strong></td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">California County:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${county}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Incident Timeframe:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${timeframe}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Current Attorney:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${hasAttorney}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">Language:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${lang}</td></tr>
                </table>
                <div style="margin-top: 18px; font-weight: bold; font-size: 14px;">Details / Summary:</div>
                <div style="background: #fbf8f2; border-left: 3px solid #c8a04a; padding: 12px; margin-top: 6px; font-size: 14px; line-height: 1.5;">${String(summary).replace(/\n/g, '<br>')}</div>
              </div>
              <div style="background: #122019; padding: 12px; text-align: center; font-size: 12px; color: #ccc;">
                Equal Justice Lawyers Intake System • Confidential
              </div>
            </div>
          </body>
          </html>
        `;

        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [recipient],
            subject: `[New Lead: ${caseType}] ${fullName}`,
            html: html
          })
        });

        const resendData = await resendRes.json();
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ success: resendRes.ok, data: resendData }));
      } catch (e) {
        res.writeHead(500, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  let filePath = path.join(DIST_DIR, reqPath);

  // Security check: ensure filePath is inside DIST_DIR
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at:`);
  console.log(`- Local:   http://localhost:${PORT}/`);
  console.log(`- Network: http://127.0.0.1:${PORT}/`);
});
