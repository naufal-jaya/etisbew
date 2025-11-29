export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  coverImage?: any;
  body: any;
  author: {
    name: string;
    image?: any;
    role?: string;
  };
  categories?: Array<{
    title: string;
    slug: { current: string };
  }>;
}

export interface Author {
  _id: string;
  name: string;
  slug: { current: string };
  image?: any;
  role?: string;
  bio?: any;
}

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image?: any;
  bio?: string;
  email?: string;
  linkedin?: string;
  order?: number;
}

export interface About {
  _id: string;
  mission: string;
  vision: string;
  description?: any;
}

export interface SiteSettings {
  _id: string;
  title: string;
  description?: string;
  keywords?: string[];
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}
