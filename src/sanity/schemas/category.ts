import { defineField, defineType } from 'sanity';

export const categorySchema = defineType({
  name: 'category',
  title: 'Post Category',
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
      name: 'order',
      title: 'Urutan Tampilan (Display Order)',
      type: 'number',
      description: 'Nomor urutan kategori pada filter tab (contoh: 1, 2, 3...)',
      initialValue: 1,
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
      order: 'order',
    },
    prepare({ title, color, order }) {
      const orderBadge = typeof order === 'number' ? `#${order} • ` : '';
      return {
        title: title || 'Unnamed Category',
        subtitle: `${orderBadge}${color ? `Color: ${color}` : 'No color set'}`,
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }, { field: 'title', direction: 'asc' }],
    },
  ],
});
