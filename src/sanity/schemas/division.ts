import { defineField, defineType } from 'sanity';

export const divisionSchema = defineType({
  name: 'division',
  title: 'Division',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Division ID / Code',
      type: 'string',
      description: 'Short code (max 3 letters, e.g. hr, cnm, edu, ext, inf, bph)',
      validation: (Rule) =>
        Rule.required()
          .max(3)
          .error('Division ID must be 3 letters at maximum'),
    }),
    defineField({
      name: 'name',
      title: 'Division Name',
      type: 'string',
      description: 'e.g. Human Resources, Creative & Marketing',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'groupPhoto',
      title: 'Group Photo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverPhotos',
      title: 'Cover Photos (Marquee)',
      type: 'array',
      description: 'Upload multiple cover photos (portrait ~15:19 ratio) to be used alternately across the running cards in the marquee',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'member',
          title: 'Member',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              description: 'e.g. Director, Manager, Staff',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'photo',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'linkedin',
              title: 'LinkedIn Username',
              type: 'string',
              description: 'Optional username, e.g. "johndoe"',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'photo',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Unnamed Member',
                subtitle: subtitle || 'No role specified',
                media,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'id',
      media: 'groupPhoto',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Unnamed Division',
        subtitle: subtitle ? `[${subtitle.toUpperCase()}]` : 'No ID',
        media,
      };
    },
  },
});
