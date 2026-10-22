import { defineField, defineType } from 'sanity';

export const featuredPostSchema = defineType({
  name: 'featuredPost',
  title: 'Featured Posts',
  type: 'document',
  fields: [
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'news' }],
      description: 'Pilih post yang ingin dijadikan featured post pada carousel.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampilan (Display Order)',
      type: 'number',
      description: 'Nomor urutan tampilan pada carousel (contoh: 1 untuk kartu kiri, 2 untuk tengah/aktif, 3 untuk kanan, dst).',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'post.title',
      writer: 'post.writer',
      category: 'post.category.title',
      media: 'post.coverImage',
      order: 'order',
    },
    prepare({ title, writer, category, media, order }) {
      const badges = [
        typeof order === 'number' ? `#${order}` : null,
        category ? `[${category}]` : null,
        writer ? `by ${writer}` : null,
      ]
        .filter(Boolean)
        .join(' • ');

      return {
        title: title || 'Pilih Post...',
        subtitle: badges || 'Belum ada post yang dipilih',
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
