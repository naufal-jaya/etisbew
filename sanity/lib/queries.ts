import { groq } from 'next-sanity';

// Get all blog posts
export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage,
    "author": author->{
      name,
      image,
      role
    },
    "categories": categories[]->{ 
      title, 
      slug 
    }
  }
`;

// Get single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage,
    body,
    "author": author->{
      name,
      image,
      role
    },
    "categories": categories[]->{ 
      title, 
      slug 
    }
  }
`;

// Get latest posts (limit)
export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage,
    "author": author->{
      name,
      image
    }
  }
`;

// Get all categories
export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`;

// Get posts by category
export const postsByCategoryQuery = groq`
  *[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage,
    "author": author->{
      name,
      image
    },
    "categories": categories[]->{ 
      title, 
      slug 
    }
  }
`;

// Get all services
export const allServicesQuery = groq`
  *[_type == "service"] | order(_createdAt asc) {
    _id,
    title,
    description,
    icon
  }
`;

// Get all divisions
export const allDivisionsQuery = groq`
  *[_type == "division"] | order(order asc) {
    _id,
    name,
    description,
    icon
  }
`;

// Get all team members
export const allTeamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    image,
    bio,
    email,
    linkedin,
    "division": division->{
      _id,
      name
    },
    subdivision
  }
`;

// Get about information
export const aboutQuery = groq`
  *[_type == "about"][0] {
    _id,
    mission,
    vision,
    description
  }
`;

// Get site settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    title,
    description,
    keywords,
    email,
    phone,
    address,
    socialLinks
  }
`;

// Get related posts (exclude current post)
export const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $slug] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage,
    "author": author->{
      name,
      image
    }
  }
`;

// Get about page content
export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    _id,
    title,
    logo,
    introText,
    vision,
    mission,
    timeline,
    stats
  }
`;

// Get all divisions
export const divisionsQuery = groq`
  *[_type == "division"] | order(order asc) {
    _id,
    name,
    description,
    icon,
    order,
    subdivisions
  }
`;

// Get Divisions with Members
export const divisionsWithMembersQuery = groq`
  *[_type == "division"] | order(order asc) {
    _id,
    name,
    description,
    subdivisions,
    "members": *[_type == "teamMember" && references(^._id)] | order(order asc) {
      _id,
      name,
      role,
      image,
      subdivision,
      linkedin
    }
  }
`;
