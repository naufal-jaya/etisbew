import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About IEEE SB IPB',
    }),
    defineField({
      name: 'logo',
      title: 'IEEE SB IPB Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'introText',
      title: 'Introduction Text',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'vision',
      title: 'Vision Statement',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mission',
      title: 'Mission Points',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(3).max(5),
    }),
    defineField({
      name: 'timeline',
      title: 'History / Roadmap',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'year', type: 'string', title: 'Year' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
          ],
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'object',
      fields: [
        { name: 'activeMembers', type: 'number', title: 'Active Members Count' },
        { name: 'divisionsCount', type: 'number', title: 'Divisions Count' },
        { name: 'eventsHosted', type: 'number', title: 'Events Hosted' },
        { name: 'awardsWon', type: 'number', title: 'Awards Won' },
      ],
    }),
  ],
});
