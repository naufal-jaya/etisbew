import { normalizeLinkedInPostUrl, isActivityPost } from '../utils/postLinks.ts';
import { sanityClient, isSanityConfigured } from '../sanity/client.ts';
import { urlForImage } from '../sanity/image.ts';

export interface PostCategory {
  _id?: string;
  title: string;
  slug: string;
  color: string;
  description?: string;
}

export interface PostItem {
  id: string;
  title: string;
  type: string; // e.g. "Tech Insight", "IEEEnsight", "Activities"
  author: string;
  image: string;
  slug: string;
  externalUrl?: string;
  publishedAt?: string;
  isFeatured?: boolean;
  category?: PostCategory;
  summary?: string;
  caption?: string;
  alt?: string;
  content?: any;
}

// Fallback featured posts (used only when Sanity is unavailable)
export const fallbackFeaturedPosts: PostItem[] = [
  {
    id: 'f-1',
    title: 'Precision Agriculture: Using Autonomous Drones for High-Yield Crop Monitoring',
    type: 'Tech Insight',
    author: 'Naufal Farkova',
    image: 'https://picsum.photos/seed/drone-tech/1024/600',
    slug: 'precision-agriculture-drones',
    publishedAt: '2026-08-01T10:00:00.000Z',
    isFeatured: true,
    category: {
      title: 'Tech Insight',
      slug: 'tech-insight',
      color: '#1338BE',
    },
    summary:
      'Explore how cutting-edge autonomous aerial robotics and multi-spectral imaging are transforming precision farming and crop yield prediction at IPB University.',
    content: `
      <p>Autonomous drone monitoring in agriculture leverages multi-spectral sensors and AI-driven photogrammetry to provide real-time health analysis of crops.</p>
      <p>By detecting chlorosis, soil moisture variations, and pest infestations before they become visible to the naked eye, modern farmers can reduce chemical inputs while maximizing output.</p>
    `,
  },
  {
    id: 'f-2',
    title: 'How the Activated Sludge Process Powers Modern Urban Wastewater Treatment',
    type: 'Tech Insight',
    author: 'Naufal Farkova',
    image: 'https://picsum.photos/seed/sludge-water/1024/600',
    slug: 'activated-sludge-wastewater',
    publishedAt: '2026-07-25T14:30:00.000Z',
    isFeatured: true,
    category: {
      title: 'Tech Insight',
      slug: 'tech-insight',
      color: '#1338BE',
    },
    summary:
      'A deep dive into biochemical oxygen demand reduction, microbial ecosystems, and aeration engineering that keep municipal water systems sustainable.',
    content: `
      <p>The activated sludge process utilizes a biological floc composed of bacteria and protozoa to treat sewage and industrial wastewaters.</p>
      <p>Through controlled oxygenation in aeration tanks, microbes metabolize organic matter into carbon dioxide, water, and new cellular mass.</p>
    `,
  },
  {
    id: 'f-3',
    title: 'Biomimetic Sensors: Harnessing Botanical Mechanisms for Next-Gen Robotics',
    type: 'Tech Insight',
    author: 'Naufal Farkova',
    image: 'https://picsum.photos/seed/bio-botany/1024/600',
    slug: 'biomimetic-sensors-robotics',
    publishedAt: '2026-07-15T09:15:00.000Z',
    isFeatured: true,
    category: {
      title: 'Tech Insight',
      slug: 'tech-insight',
      color: '#1338BE',
    },
    summary:
      'Investigating plant kinematics, thigmonastic leaf motion, and cellulose microstructure to engineer ultra-sensitive tactile sensors.',
    content: `
      <p>Botanical kinematics offers elegant, energy-efficient solutions for soft robotics and sensor engineering.</p>
      <p>By mimicking the rapid turgor pressure changes found in sensitive plant leaves, researchers are creating flexible actuators with zero continuous power draw.</p>
    `,
  },
];

// Fallback recent posts
export const fallbackRecentPosts: PostItem[] = [
  {
    id: 'r-1',
    title: 'Engineering Smart Grid Micro-Inverters for Rural Electrification',
    type: 'Tech Insight',
    author: 'Naufal Farkova',
    image: 'https://picsum.photos/seed/urban-infra/600/340',
    slug: 'smart-grid-micro-inverters',
    publishedAt: '2026-07-10T08:00:00.000Z',
    category: {
      title: 'Tech Insight',
      slug: 'tech-insight',
      color: '#1338BE',
    },
    summary:
      'Designing low-cost distributed inverter architectures that stabilize decentralized solar arrays across rural communities.',
  },
  {
    id: 'r-2',
    title: 'IoT Hydroponic Nutrient Dosing Systems with Automated Telemetry',
    type: 'Activities',
    author: 'Ariq Yusuf',
    image: 'https://picsum.photos/seed/smart-terrace/600/340',
    slug: 'iot-hydroponic-nutrient-dosing',
    publishedAt: '2026-07-05T11:20:00.000Z',
    category: {
      title: 'Activities',
      slug: 'activities',
      color: '#F59E0B',
    },
    summary:
      'A hands-on student chapter project implementing automated electrical conductivity and pH regulation in vertical hydroponic systems.',
  },
  {
    id: 'r-3',
    title: 'IEEE SB IPB Strategic Workshop: Advancing Student Research',
    type: 'IEEEnsight',
    author: 'IEEE SB IPB',
    image: 'https://picsum.photos/seed/solar-sunset/600/340',
    slug: 'ieee-sb-ipb-strategic-workshop',
    publishedAt: '2026-06-28T16:00:00.000Z',
    category: {
      title: 'IEEEnsight',
      slug: 'ieeensight',
      color: '#10B981',
    },
    summary:
      'Highlights and key takeaways from our executive committee visioning session for the upcoming international student branch programs.',
  },
  {
    id: 'r-4',
    title: 'Biological Effluent Analysis & Sensor Validation in Campus Lab',
    type: 'Tech Insight',
    author: 'Naufal Farkova',
    image: 'https://picsum.photos/seed/effluent-lab/600/340',
    slug: 'biological-effluent-analysis',
    publishedAt: '2026-06-20T13:45:00.000Z',
    category: {
      title: 'Tech Insight',
      slug: 'tech-insight',
      color: '#1338BE',
    },
    summary:
      'Validating experimental optical dissolved oxygen probes against standard Winkler titration methods in university laboratories.',
  },
];

// Compatibility exports
export const featuredPosts: PostItem[] = fallbackFeaturedPosts;
export const recentPosts: PostItem[] = fallbackRecentPosts;

// Default categories fallback
export const defaultCategories: PostCategory[] = [
  { title: 'All Post', slug: 'all', color: '#000000' },
  { title: 'Tech Insight', slug: 'tech-insight', color: '#1338BE' },
  { title: 'IEEEnsight', slug: 'ieeensight', color: '#10B981' },
  { title: 'Activities', slug: 'activities', color: '#F59E0B' },
];

function slugify(text: string): string {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

// Map raw Sanity news/post document to clean PostItem
export function mapSanityNewsToPostItem(item: any): PostItem {
  const isLinkedIn = item._type === 'linkedinPost';
  const title = item.title?.trim() || (isLinkedIn ? item.summary?.split(/\r?\n/).find((line: string) => line.trim())?.trim().slice(0, 160) : '') || 'Untitled Post';
  const rawSlug = typeof item.slug === 'string' ? item.slug : item.slug?.current;
  const slug = isLinkedIn ? `linkedin-${item._id}` : rawSlug || slugify(title);

  const category = isLinkedIn ? item.activitiesCategory : item.category;
  const categoryTitle = isLinkedIn ? 'Activities' : category?.title || 'Tech Insight';
  const categoryColor = category?.color || (isLinkedIn ? '#F59E0B' : '#1338BE');
  const categorySlug = isLinkedIn ? 'activities' :
    typeof category?.slug === 'string'
      ? category.slug
      : category?.slug?.current || slugify(categoryTitle);

  const coverUrl =
    item.coverImage?.url ||
    urlForImage(item.coverImage) ||
    'https://picsum.photos/seed/ieee-posts/1024/600';

  return {
    id: item._id,
    title,
    type: categoryTitle,
    author: item.writer || 'IEEE SB IPB',
    image: coverUrl,
    slug,
    externalUrl: isLinkedIn ? normalizeLinkedInPostUrl(item.externalUrl) : undefined,
    publishedAt: item.publishedAt || item._createdAt || new Date().toISOString(),
    isFeatured: Boolean(item.isFeatured),
    category: {
      _id: category?._id,
      title: categoryTitle,
      color: categoryColor,
      slug: categorySlug,
      description: category?.description,
    },
    summary: item.summary || '',
    caption: item.coverImage?.caption || '',
    alt: item.coverImage?.alt || title,
    content: item.content,
  };
}

const POSTS_GROQ_QUERY = `*[_type in ["news", "post", "linkedinPost"]] | order(publishedAt desc, _createdAt desc) {
  _id,
  _type,
  _createdAt,
  "activitiesCategory": select(_type == "linkedinPost" => *[_type == "category" && slug.current == "activities"][0]{_id, title, slug, color, description}),
  title,
  externalUrl,
  slug,
  publishedAt,
  isFeatured,
  writer,
  summary,
  category->{
    _id,
    title,
    slug,
    color,
    description
  },
  coverImage {
    asset,
    alt,
    caption,
    "url": asset->url
  },
  content[] {
    ...,
    _type == "inlineImage" => {
      asset,
      alt,
      caption,
      "url": asset->url
    }
  }
}`;

export const NEWS_GROQ_QUERY = POSTS_GROQ_QUERY;

const CATEGORIES_GROQ_QUERY = `*[_type == "category"] | order(order asc, _createdAt asc, title asc) {
  _id,
  title,
  slug,
  color,
  description,
  order
}`;

// Query all individual 'featuredPost' documents from CMS, ordered by 'order' then creation date
const FEATURED_POSTS_GROQ_QUERY = `*[_type == "featuredPost"] | order(order asc, _createdAt asc) {
  _id,
  order,
  post->{
    _id,
    _type,
    _createdAt,
    "activitiesCategory": select(_type == "linkedinPost" => *[_type == "category" && slug.current == "activities"][0]{_id, title, slug, color, description}),
    title,
    externalUrl,
    slug,
    publishedAt,
    isFeatured,
    writer,
    summary,
    category->{
      _id,
      title,
      slug,
      color,
      description
    },
    coverImage {
      asset,
      alt,
      caption,
      "url": asset->url
    },
    content[] {
      ...,
      _type == "inlineImage" => {
        asset,
        alt,
        caption,
        "url": asset->url
      }
    }
  }
}`;

// A successful empty response is different from an unavailable CMS.
async function fetchSanityPosts(): Promise<{ available: boolean; posts: PostItem[] }> {
  if (!isSanityConfigured) return { available: false, posts: [] };
  try {
    const raw = await sanityClient.fetch(POSTS_GROQ_QUERY);
    if (!Array.isArray(raw)) throw new Error('Invalid Sanity posts response');
    return {
      available: true,
      posts: raw.filter((item: any) => item._type !== 'linkedinPost' || normalizeLinkedInPostUrl(item.externalUrl)).map(mapSanityNewsToPostItem),
    };
  } catch (err) {
    console.warn('Could not fetch posts from Sanity CMS, fallback will be used:', err);
    return { available: false, posts: [] };
  }
}

export async function getSanityPosts(): Promise<PostItem[]> {
  return (await fetchSanityPosts()).posts;
}

// Backwards-compatible alias
export const getSanityNews = getSanityPosts;

// Fetch categories from Sanity backend (with resilient fallback if CMS unavailable)
export async function getAllCategories(): Promise<PostCategory[]> {
  const result: PostCategory[] = [{ title: 'All Post', slug: 'all', color: '#000000' }];

  if (isSanityConfigured) {
    try {
      const sanityCats = await sanityClient.fetch(CATEGORIES_GROQ_QUERY);
      if (Array.isArray(sanityCats) && sanityCats.length > 0) {
        for (const cat of sanityCats) {
          const slug =
            typeof cat.slug === 'string'
              ? cat.slug
              : cat.slug?.current || slugify(cat.title);
          result.push({
            _id: cat._id,
            title: cat.title,
            slug,
            color: cat.color || '#00629B',
            description: cat.description,
            order: cat.order,
          });
        }
        return result;
      }
    } catch (err) {
      console.warn('Could not fetch categories from Sanity CMS:', err);
    }
  }

  // Fallback only if Sanity is offline or returned no categories
  for (const def of defaultCategories) {
    if (def.slug === 'all') continue;
    result.push(def);
  }

  return result;
}

// Returns featured posts: Supports CMS 'featuredPost' individual documents (1 post per document), with resilient fallbacks
export async function getFeaturedPosts(): Promise<PostItem[]> {
  return selectFeaturedPosts(await fetchSanityPosts());
}

async function selectFeaturedPosts(snapshot: { available: boolean; posts: PostItem[] }): Promise<PostItem[]> {
  const result: PostItem[] = [];

  // 1. Check for individual 'featuredPost' documents in Sanity CMS
  if (isSanityConfigured) {
    try {
      const featuredDocs = await sanityClient.fetch(FEATURED_POSTS_GROQ_QUERY);
      if (Array.isArray(featuredDocs) && featuredDocs.length > 0) {
        for (const doc of featuredDocs) {
          if (!doc.post || !(doc.post.title || doc.post.summary)) continue;
          if (doc.post._type === 'linkedinPost' && !normalizeLinkedInPostUrl(doc.post.externalUrl)) continue;
          const post = mapSanityNewsToPostItem({ ...doc.post, isFeatured: true });
          if (isActivityPost(post)) continue;
          if (!result.some((existing) => existing.slug === post.slug)) result.push(post);
        }
      }
    } catch (err) {
      console.warn('Could not fetch featuredPost docs from Sanity CMS:', err);
    }
  }

  // 2. If no featuredPost documents in CMS yet, check posts flagged with isFeatured
  const sanityPosts = snapshot.posts.filter((post) => !isActivityPost(post));
  const sanityFeatured = sanityPosts.filter((p) => p.isFeatured);

  for (const item of sanityFeatured) {
    if (result.length >= 3) break;
    if (!result.some((p) => p.slug === item.slug)) {
      result.push(item);
    }
  }

  // 3. If still fewer than 3, fill with latest published posts from Sanity
  for (const item of sanityPosts) {
    if (result.length >= 3) break;
    if (!result.some((p) => p.slug === item.slug)) {
      result.push(item);
    }
  }

  // Never pad a successful CMS response with dummy posts.
  if (!snapshot.available && result.length === 0) return fallbackFeaturedPosts.filter((post) => !isActivityPost(post));
  return result.slice(0, 3);
}

// Return up to four CMS posts, excluding the featured selection.
export async function getRecentPosts(): Promise<PostItem[]> {
  const snapshot = await fetchSanityPosts();
  const featured = await selectFeaturedPosts(snapshot);
  const featuredSlugs = new Set(featured.map((p) => p.slug));
  const source = snapshot.available ? snapshot.posts : fallbackRecentPosts;
  return source.filter((post) => !isActivityPost(post) && !featuredSlugs.has(post.slug)).slice(0, 4);
}

export async function getAllPosts(): Promise<PostItem[]> {
  const snapshot = await fetchSanityPosts();
  return snapshot.available ? snapshot.posts : [...fallbackFeaturedPosts, ...fallbackRecentPosts];
}

// Get post by slug
export async function getPostBySlug(slug: string): Promise<PostItem | null> {
  const all = await getAllPosts();
  return all.find((p) => !p.externalUrl && p.slug === slug) || null;
}

export const mapSanityPostToPostItem = mapSanityNewsToPostItem;

// Re-export Sanity backend types for convenience
export type {
  PostCategory,
  PostBackendItem,
  PostInlineImage,
  PostBlockContent,
  NewsCategory,
  NewsItem,
  NewsInlineImage,
  NewsBlockContent,
} from '../sanity/types';
