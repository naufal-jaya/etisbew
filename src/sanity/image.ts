import { createImageUrlBuilder } from '@sanity/image-url';
import { sanityClient, isSanityConfigured } from './client.ts';

let builder: any = null;

if (isSanityConfigured) {
  try {
    builder = createImageUrlBuilder(sanityClient);
  } catch (err) {
    console.warn('Failed to initialize Sanity image builder:', err);
  }
}

export function urlForImage(source: any): string | null {
  if (!source) return null;

  // Direct string URL
  if (typeof source === 'string') {
    if (source.startsWith('http://') || source.startsWith('https://') || source.startsWith('/')) {
      return source;
    }
    if (builder && source.startsWith('image-')) {
      try {
        return builder.image(source).auto('format').fit('max').url();
      } catch (e) {
        console.warn('Error resolving image ID:', e);
      }
    }
  }

  // Object with direct url
  if (source?.url && typeof source.url === 'string') {
    return source.url;
  }

  // Object with asset.url
  if (source?.asset?.url && typeof source.asset.url === 'string') {
    return source.asset.url;
  }

  // Sanity image asset or reference
  if (builder && (source?.asset || source?._ref)) {
    try {
      return builder.image(source).auto('format').fit('max').url();
    } catch (e) {
      console.warn('Error resolving Sanity image url:', e);
    }
  }

  return null;
}
