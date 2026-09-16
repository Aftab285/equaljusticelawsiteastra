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
        xhtml: true,
      },
      serialize(item) {
        if (item.url === 'https://equaljusticelawyers.com/' || item.url === 'https://equaljusticelawyers.com/es/') {
          item.links = [
            { lang: 'en', url: 'https://equaljusticelawyers.com/' },
            { lang: 'es', url: 'https://equaljusticelawyers.com/es/' },
            { lang: 'x-default', url: 'https://equaljusticelawyers.com/' },
          ];
        }
        return item;
      },
    }),
  ],
});
