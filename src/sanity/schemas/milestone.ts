import { defineType, defineField } from 'sanity';

export const milestoneSchema = defineType({
  name: 'milestone',
  title: 'Milestone',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g. 2025, 2026',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Milestone story or description paragraph',
    }),
    defineField({
      name: 'floatingImages',
      title: 'Floating Images',
      type: 'array',
      description: 'Floating background images for this milestone',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'year',
      subtitle: 'description',
    },
  },
});
