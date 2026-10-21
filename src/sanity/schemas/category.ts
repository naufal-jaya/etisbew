import { defineField, defineType } from 'sanity';

export const categorySchema = defineType({
  name: 'category',
  title: 'News Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string',
      description: 'e.g. Tech Insight, Campus Event, Community, Workshop',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Category Accent Color (Hex)',
      type: 'string',
      description: 'Warna khas kategori dalam format hex (contoh: #00629B untuk IEEE Blue, #10B981, #F59E0B, #EF4444, #8B5CF6)',
      initialValue: '#00629B',
      validation: (Rule) =>
        Rule.required()
          .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
            name: 'hex color',
            invert: false,
          })
          .error('Masukkan kode hex warna yang valid, diawali dengan # (contoh: #00629B)'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Deskripsi singkat mengenai topik kategori ini',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      color: 'color',
    },
    prepare({ title, color }) {
      return {
        title: title || 'Unnamed Category',
        subtitle: color ? `Color: ${color}` : 'No color set',
      };
    },
  },
});
