import assert from 'node:assert/strict';
import { normalizeLinkedInPostUrl, getPostHref, isActivityPost } from '../src/utils/postLinks.ts';

// All CMS requests in this test are fixtures; no remote calls or writes.
process.env.PUBLIC_SANITY_PROJECT_ID = 'test-project';
const { sanityClient } = await import('../src/sanity/client.ts');
const { mapSanityNewsToPostItem, getSanityPosts, getFeaturedPosts, getPostBySlug, getAllPosts, getRecentPosts } = await import('../src/data/posts.ts');

const url = 'https://www.linkedin.com/posts/ieeesbipb_activity-1234567890';
assert.equal(normalizeLinkedInPostUrl(` ${url} `), url);
assert.ok(normalizeLinkedInPostUrl('https://linkedin.com/feed/update/urn:li:activity:123/'));
for (const bad of ['javascript:alert(1)', 'http://linkedin.com/posts/test', 'https://linkedin.com.evil.example/posts/test', 'https://example.com/posts/test', 'https://linkedin.com/company/ieeesbipb', 'https://evil@linkedin.com/posts/test', '', null]) {
  assert.equal(normalizeLinkedInPostUrl(bad), undefined);
}
const linked = {
  _id: 'linkedin-test', _type: 'linkedinPost', externalUrl: url,
  summary: '\n  First line becomes the card title\nMore preview text',
  publishedAt: '2026-10-29T08:00:00Z',
  coverImage: { url: 'https://cdn.example.com/cover.jpg', alt: 'Our team' },
};
const article = { _id: 'article-test', _type: 'news', title: 'Local article', slug: { current: 'local-article' }, publishedAt: '2026-10-28T08:00:00Z' };
const post = mapSanityNewsToPostItem(linked);
assert.equal(post.title, 'First line becomes the card title');
assert.equal(post.category.slug, 'activities');
assert.equal(post.category.title, 'Activities');
assert.equal(post.category.color, '#F59E0B');
assert.equal(post.author, 'IEEE SB IPB');
assert.equal(post.image, linked.coverImage.url);
assert.equal(getPostHref(post), url);
assert.equal(getPostHref(mapSanityNewsToPostItem(article)), '/posts/local-article');
const categorized = mapSanityNewsToPostItem({
  ...linked,
  category: { title: 'Tech Insight', slug: { current: 'tech-insight' } },
  activitiesCategory: { _id: 'activities', title: 'Activities', slug: { current: 'activities' }, color: '#123456' },
});
assert.equal(categorized.category.slug, 'activities', 'LinkedIn posts always use Activities, including legacy entries');
assert.equal(categorized.category.color, '#123456', 'Activities keeps its current CMS color');
assert.equal(categorized.category._id, 'activities');
assert.equal(mapSanityNewsToPostItem({ ...linked, title: 'Custom title' }).title, 'Custom title');

const originalFetch = sanityClient.fetch;
sanityClient.fetch = async (query) => query.includes('_type == "featuredPost"')
  ? [{ post: linked }, { post: linked }, { post: null }]
  : [linked, article, { ...linked, _id: 'invalid', externalUrl: 'https://evil.example/posts/test' }];
try {
  const posts = await getSanityPosts();
  assert.equal(posts.length, 2, 'Invalid external links must not appear');
  const featured = await getFeaturedPosts();
  assert.equal(featured.filter((item) => item.id === linked._id).length, 0, 'Activities must not appear in featured selections, even when manually selected');
  assert.equal(getPostHref(featured[0]), '/posts/local-article');
  assert.equal(await getPostBySlug(post.slug), null, 'External cards must not resolve as local articles');
  assert.equal((await getPostBySlug('local-article')).id, article._id);
  assert.equal((await getAllPosts()).length, 2, 'Successful CMS fetch must not append dummy posts');
  assert.equal(featured.length, 1, 'Small featured selections must not be padded');
  assert.deepEqual(await getRecentPosts(), [], 'No recent CMS posts means no dummy cards');
  const activity = { ...article, _id: 'local-activity', slug: { current: 'local-activity' }, category: { title: 'Activities', slug: { current: 'activities' } }, isFeatured: true };
  const articles = Array.from({ length: 5 }, (_, index) => ({ ...article, _id: `article-${index}`, slug: { current: `article-${index}` } }));
  sanityClient.fetch = async (query) => query.includes('_type == "featuredPost"') ? [{ post: linked }, { post: activity }] : [linked, activity, ...articles];
  assert.equal((await getAllPosts()).length, 7, 'Activities remain in the main listing');
  assert.ok((await getFeaturedPosts()).every((item) => !isActivityPost(item)));
  const recent = await getRecentPosts();
  assert.equal(recent.length, 2);
  assert.ok(recent.every((item) => !isActivityPost(item)));
  sanityClient.fetch = async () => [];
  assert.deepEqual(await getAllPosts(), [], 'Successful empty CMS must remain empty');
  assert.deepEqual(await getFeaturedPosts(), []);
  assert.deepEqual(await getRecentPosts(), []);
  sanityClient.fetch = async () => { throw new Error('Simulated offline CMS'); };
  const originalWarn = console.warn;
  console.warn = () => {};
  try {
    assert.equal((await getAllPosts()).length, 7, 'Offline CMS retains local fallback posts');
    assert.equal((await getFeaturedPosts()).length, 3);
    assert.equal((await getRecentPosts()).length, 3);
    assert.ok((await getRecentPosts()).every((item) => !isActivityPost(item))); 
  } finally { console.warn = originalWarn; }

} finally {
  sanityClient.fetch = originalFetch;
}
console.log('LinkedIn post URL validation, mapping, featured selection, and article routing passed.');

assert.equal(isActivityPost({ category: { slug: 'activities' } }), true);
assert.equal(isActivityPost({ type: 'Activities' }), true);
assert.equal(isActivityPost({ category: { slug: 'tech-insight' }, type: 'Tech Insight' }), false);
assert.equal(getPostHref({ slug: 'campus-workshop' }), '/posts/campus-workshop');
console.log('Activities layout selection preserves local article links.');

const titleOnly = mapSanityNewsToPostItem({ ...linked, title: 'Title-only LinkedIn post', summary: undefined });
assert.equal(titleOnly.title, 'Title-only LinkedIn post');
assert.equal(titleOnly.summary, '');
assert.equal(titleOnly.category.slug, 'activities');
assert.equal(getPostHref(titleOnly), url);
