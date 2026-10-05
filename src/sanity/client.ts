import { createClient } from '@sanity/client';

export const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID || import.meta.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = import.meta.env.PUBLIC_SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET || import.meta.env.NEXT_PUBLIC_SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'v2';
export const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || process.env.PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const isSanityConfigured = Boolean(projectId && projectId !== 'your-project-id');

export const sanityClient = createClient({
  projectId: isSanityConfigured ? projectId : 'placeholder',
  dataset,
  apiVersion,
  useCdn: false,
});
