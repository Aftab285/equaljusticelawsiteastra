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
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          es: 'es-US',
        },
      },
    }),
  ],
});
