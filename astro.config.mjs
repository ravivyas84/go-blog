import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import { addLazyLoadingToImages } from './src/lib/rehype-lazy-images.mjs';

export default defineConfig({
  site: 'https://ravivyas.com',
  outDir: './build',
  trailingSlash: 'always',
  integrations: [react()],
  build: {
    format: 'directory',
  },
  markdown: {
    gfm: true,
    smartypants: false,
    syntaxHighlight: false,
    rehypePlugins: [addLazyLoadingToImages],
  },
});
