import type { APIRoute } from 'astro';

// Legacy URLs from this domain's previous use (e.g. /shop/items/Q80764161).
// Google still has tens of thousands of them on file. Returning 410 Gone
// tells Google they were removed on purpose, so it drops them from the index
// faster than a 404 and stops wasting crawl budget on them.
// Do NOT block /shop/ in robots.txt: Google has to crawl these URLs to see the 410.
export const prerender = false;

const body = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex" />
    <title>Page removed | Equal Justice Lawyers</title>
  </head>
  <body>
    <h1>This page has been permanently removed</h1>
    <p><a href="https://equaljusticelawyers.com/">Go to the Equal Justice Lawyers homepage</a></p>
  </body>
</html>`;

const gone: APIRoute = () =>
  new Response(body, {
    status: 410,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex',
      'Cache-Control': 'public, max-age=86400',
    },
  });

export const GET = gone;
export const HEAD = gone;
