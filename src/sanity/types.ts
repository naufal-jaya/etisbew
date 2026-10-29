/**
 * TypeScript Interfaces untuk Data Backend Sanity
 * Sesuai skema: 'news'/'post', 'category', dan 'featuredPost'
 */

export interface PostCategory {
  _id?: string;
  title: string;
  slug?:
    | {
        current: string;
      }
    | string;
  color: string; // Kode hex warna khas kategori (contoh: '#00629B', '#10B981')
  description?: string;
  order?: number;
}

export interface PostInlineImage {
  _type: 'image' | 'inlineImage';
  asset?: {
    _ref?: string;
    _type?: 'reference';
    url?: string;
  } | any;
  alt?: string;
  caption?: string; // Teks deskripsi gambar di dalam post
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface PostBlockContent {
  _type: 'block' | 'inlineImage';
  [key: string]: any;
}

export interface PostBackendItem {
  _id: string;
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  slug:
    | {
        current: string;
      }
    | string;
  category: PostCategory;
  writer: string;
  publishedAt: string; // Tanggal publikasi post (ISO 8601 string)
  isFeatured?: boolean;
  coverImage: {
    _type?: 'image';
    asset?: any;
    alt?: string;
    caption?: string;
  } | string;
  summary: string; // Ringkasan teks post untuk ditaruh di bawah judul
  content?: PostBlockContent[]; // Isi teks post + inline images beserta deskripsi
}

// Backwards-compatible aliases
export type NewsCategory = PostCategory;
export type NewsInlineImage = PostInlineImage;
export type NewsBlockContent = PostBlockContent;
export type NewsItem = PostBackendItem;
