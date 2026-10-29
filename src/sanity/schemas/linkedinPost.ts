import { defineField, defineType } from 'sanity';

export const linkedinPostSchema = defineType({
  name: 'linkedinPost',
  title: 'LinkedIn Posts',
  type: 'document',
  fields: [
    defineField({
      name: 'externalUrl', title: 'LinkedIn Post Link', type: 'url',
      description: 'Paste the full https://www.linkedin.com/posts/... or /feed/update/... link. The card opens this link.',
      validation: (Rule) => Rule.required().uri({ scheme: ['https'] }).custom((value) => {
        if (!value) return true;
        try {
          const url = new URL(value);
          return url.protocol === 'https:' && !url.username && !url.password && !url.port &&
            (url.hostname === 'linkedin.com' || url.hostname.endsWith('.linkedin.com')) &&
            /^\/(posts\/[^/]+|feed\/update\/[^/]+)/.test(url.pathname)
            ? true : 'Enter a full HTTPS LinkedIn post link.';
        } catch { return 'Enter a valid LinkedIn post URL.'; }
      }),
    }),
    defineField({
      name: 'coverImage', title: 'First Image / Cover', type: 'image',
      options: { hotspot: true },
      description: 'Upload the original first image. Images and text are entered manually; the link is not scraped.',
      validation: (Rule) => Rule.required(),
      fields: [defineField({ name: 'alt', title: 'Image Description', type: 'string' })],
    }),
    defineField({
      name: 'publishedAt', title: 'Published Date', type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title', title: 'Title', type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary', title: 'Excerpt', type: 'text', rows: 3,
      description: 'A short preview displayed below the title and date on desktop cards.',
    }),
  ],
  preview: {
    select: { title: 'title', summary: 'summary', subtitle: 'externalUrl', media: 'coverImage' },
    prepare({ title, summary, subtitle, media }) {
      return { title: title || summary?.split(/\r?\n/).find((line: string) => line.trim()) || 'LinkedIn Post', subtitle, media };
    },
  },
  orderings: [{ title: 'Newest First', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
});
