// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://equaljusticelawyers.com',
  trailingSlash: 'always',
  adapter: cloudflare(),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/api/'),
      namespaces: {
        news: false,
        image: false,
        video: false,
        xhtml: false,
      },
    }),
  ],
});
