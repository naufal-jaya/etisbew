import { createImageUrlBuilder } from '@sanity/image-url';
import { sanityClient, isSanityConfigured } from './client';

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
  
  // If source is already a direct string URL (e.g. from fallback or SVG)
  if (typeof source === 'string') {
    return source;
  }

  // If source has an asset property or is a sanity image reference
  if (builder && (source?.asset || source?._ref)) {
    try {
      return builder.image(source).auto('format').fit('max').url();
    } catch (e) {
      console.warn('Error resolving Sanity image url:', e);
    }
  }

  // Fallback if image asset has url string
  if (source?.asset?.url) {
    return source.asset.url;
  }

  return null;
}
