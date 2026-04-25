import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    slug: z.string(),
    tags: z.array(z.string()).default([]),
    description: z.string().optional(),
    author: z.string().optional(),
    layout: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './pages' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    slug: z.string().optional(),
    tags: z.array(z.string()).default([]),
    description: z.string().optional(),
    author: z.string().optional(),
    layout: z.string().optional(),
  }),
});

export const collections = { posts, pages };
