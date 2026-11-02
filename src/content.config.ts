// Content collections: sets of Markdown files that Astro checks against a schema at build time.
// "writing" = every .md file in src/content/writing/. The file name becomes the URL (/writing/<file-name>/).
// A missing or wrongly typed field (e.g. a date that isn't a date) stops the build instead of shipping a broken page.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),          // one or two sentences for the Writing list and the meta description
    published: z.coerce.date(),   // first published, YYYY-MM-DD
    updated: z.coerce.date().optional(), // last changed, YYYY-MM-DD; defaults to published
    draft: z.boolean().default(false),   // true = built nowhere, so a piece can sit in the repo unpublished
  }),
});

export const collections = { writing };
