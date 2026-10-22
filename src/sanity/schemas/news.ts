import { defineArrayMember, defineField, defineType } from 'sanity';

export const newsSchema = defineType({
  name: 'news',
  title: 'Posts',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Post (Title)',
      type: 'string',
      description: 'Teks judul post utama',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Post Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Pilih kategori post (kategori memiliki warna khas masing-masing)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'writer',
      title: 'Writer / Penulis Post',
      type: 'string',
      description: 'Nama penulis post',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Tanggal Post',
      type: 'datetime',
      description: 'Tanggal & waktu publikasi post',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Gambar Cover Post',
      type: 'image',
      description: 'Gambar utama untuk thumbnail dan header kartu post',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text (Alt)',
          description: 'Deskripsi gambar untuk aksesibilitas dan SEO',
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption / Credit Gambar',
        }),
      ],
    }),
    defineField({
      name: 'summary',
      title: 'Ringkasan Teks Post (Excerpt)',
      type: 'text',
      rows: 3,
      description: 'Ringkasan singkat post untuk ditampilkan di bawah judul pada kartu / preview',
      validation: (Rule) =>
        Rule.required()
          .max(300)
          .warning('Disarankan maksimal 300 karakter agar tampilan kartu tetap rapi'),
    }),
    defineField({
      name: 'content',
      title: 'Teks Konten Post',
      description:
        'Teks isi post lengkap. Anda dapat menyisipkan gambar di dalam paragraf dan memberikan teks deskripsi pada setiap gambar.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL Link',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          name: 'inlineImage',
          title: 'Gambar Dalam Post',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text (Alt)',
              description: 'Deskripsi singkat gambar untuk aksesibilitas',
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Deskripsi Gambar / Caption',
              description: 'Teks keterangan atau deskripsi yang muncul di bawah gambar',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      writer: 'writer',
      categoryName: 'category.title',
      categoryColor: 'category.color',
      media: 'coverImage',
      date: 'publishedAt',
    },
    prepare({ title, writer, categoryName, media, date }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : '';
      const badges = [
        categoryName ? `[${categoryName}]` : null,
        writer ? `by ${writer}` : null,
        formattedDate,
      ]
        .filter(Boolean)
        .join(' • ');

      return {
        title: title || 'Untitled Post',
        subtitle: badges,
        media,
      };
    },
  },
});
