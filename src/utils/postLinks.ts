/** Accept only public LinkedIn post URLs; this never fetches the remote page. */
export function normalizeLinkedInPostUrl(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  try {
    const url = new URL(value.trim());
    if (
      url.protocol !== 'https:' || url.username || url.password || url.port ||
      !(url.hostname === 'linkedin.com' || url.hostname.endsWith('.linkedin.com')) ||
      !/^\/(posts\/[^/]+|feed\/update\/[^/]+)/.test(url.pathname)
    ) return undefined;
    return url.href;
  } catch {
    return undefined;
  }
}

export function getPostHref(post: { slug: string; externalUrl?: string }): string {
  return normalizeLinkedInPostUrl(post.externalUrl) || `/posts/${post.slug}`;
}

/** Activities use the compact image/title/date layout, regardless of their source. */
export function isActivityPost(post: { type?: string; category?: { slug?: string } }): boolean {
  return post.category?.slug?.trim().toLowerCase() === 'activities' || post.type?.trim().toLowerCase() === 'activities';
}
