/**
 * TypeScript Interfaces untuk Data Backend Sanity
 * Sesuai skema: 'news' dan 'category'
 */

export interface NewsCategory {
  _id?: string;
  title: string;
  slug?:
    | {
        current: string;
      }
    | string;
  color: string; // Kode hex warna khas kategori (contoh: '#00629B', '#10B981')
  description?: string;
}

export interface NewsInlineImage {
  _type: 'image' | 'inlineImage';
  asset?: {
    _ref?: string;
    _type?: 'reference';
    url?: string;
  } | any;
  alt?: string;
  caption?: string; // Teks deskripsi gambar di dalam artikel berita
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface NewsBlockContent {
  _type: 'block' | 'inlineImage';
  [key: string]: any;
}

export interface NewsItem {
  _id: string;
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  slug:
    | {
        current: string;
      }
    | string;
  category: NewsCategory;
  writer: string;
  publishedAt: string; // Tanggal publikasi berita (ISO 8601 string)
  isFeatured?: boolean;
  coverImage: {
    _type?: 'image';
    asset?: any;
    alt?: string;
    caption?: string;
  } | string;
  summary: string; // Ringkasan teks berita untuk ditaruh di bawah judul
  content?: NewsBlockContent[]; // Isi teks berita + inline images beserta deskripsi
}
