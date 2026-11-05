// @ts-check
// Astro's settings for the whole site.
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import sidenotes from './src/plugins/sidenotes.mjs';

// https://astro.build/config
export default defineConfig({
  markdown: {
    // Sätteri is Astro's Markdown engine. The sidenotes plugin turns Markdown footnotes into sidenotes:
    // inline on mobile, in the margin on wide screens.
    processor: satteri({ hastPlugins: [sidenotes] }),
  },
});
