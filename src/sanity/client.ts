import { createClient } from '@sanity/client';

const getEnvVar = (name: string): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[name]) {
    return import.meta.env[name];
  }
  if (typeof process !== 'undefined' && process.env && process.env[name]) {
    return process.env[name];
  }
  return '';
};

export const projectId = getEnvVar('PUBLIC_SANITY_PROJECT_ID') || getEnvVar('NEXT_PUBLIC_SANITY_PROJECT_ID') || '';
export const dataset = getEnvVar('PUBLIC_SANITY_DATASET') || getEnvVar('NEXT_PUBLIC_SANITY_DATASET') || 'v2';
export const apiVersion = getEnvVar('PUBLIC_SANITY_API_VERSION') || '2024-01-01';

export const isSanityConfigured = Boolean(projectId && projectId !== 'your-project-id');

export const sanityClient = createClient({
  projectId: isSanityConfigured ? projectId : 'placeholder',
  dataset,
  apiVersion,
  useCdn: false,
});
