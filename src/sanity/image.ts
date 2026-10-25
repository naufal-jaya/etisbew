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
      return optimizeImageUrl(source);
    }
    if (builder && source.startsWith('image-')) {
      try {
        return builder.image(source).auto('format').width(1600).quality(80).fit('max').url();
      } catch (e) {
        console.warn('Error resolving image ID:', e);
      }
    }
  }

  // Object with direct url
  if (source?.url && typeof source.url === 'string') {
    return optimizeImageUrl(source.url);
  }

  // Object with asset.url
  if (source?.asset?.url && typeof source.asset.url === 'string') {
    return optimizeImageUrl(source.asset.url);
  }

  // Sanity image asset or reference
  if (builder && (source?.asset || source?._ref)) {
    try {
      return builder.image(source).auto('format').width(1600).quality(80).fit('max').url();
    } catch (e) {
      console.warn('Error resolving Sanity image url:', e);
    }
  }

  return null;
}

/** Transform only Sanity raster assets; local files, SVGs and other hosts stay intact. */
export function optimizeImageUrl(source: string, width = 1600, quality = 80): string {
  try {
    const url = new URL(source);
    if (url.hostname !== 'cdn.sanity.io' || !url.pathname.startsWith('/images/') || /\.svg$/i.test(url.pathname)) return source;
    url.searchParams.delete('fm');
    url.searchParams.set('auto', 'format');
    url.searchParams.set('w', String(width));
    url.searchParams.set('q', String(quality));
    url.searchParams.set('fit', 'max');
    return url.toString();
  } catch {
    return source;
  }
}

/** Browser selects a CDN variant from the rendered size and display density. */
export function responsiveImage(source: string, sizes: string, widths = [320, 480, 640, 960, 1280, 1600], quality = 80) {
  const src = optimizeImageUrl(source, widths[widths.length - 1], quality);
  if (src === source && !source.includes('cdn.sanity.io/images/')) return { src };
  if (/\.svg(?:[?#]|$)/i.test(source)) return { src: source };
  return {
    src,
    srcset: widths.map((width) => `${optimizeImageUrl(source, width, quality)} ${width}w`).join(', '),
    sizes,
  };
}
