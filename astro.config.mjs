// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://equaljusticelawyers.com',
  adapter: cloudflare(),
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/api/') &&
        !page.includes('/admin/') &&
        !page.includes('/test/') &&
        !page.includes('/preview/') &&
        !page.includes('/404'),
      lastmod: new Date(),
      namespaces: {
        news: false,
        xhtml: false,
        image: false,
        video: false,
      },
    }),
  ],
});
