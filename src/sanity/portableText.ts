import { urlForImage, responsiveImage } from './image.ts';

export function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderSpan(span: any, markDefs: any[] = []): string {
  let text = escapeHtml(span.text || '');
  if (!span.marks || span.marks.length === 0) return text;

  for (const mark of span.marks) {
    if (mark === 'strong') {
      text = `<strong>${text}</strong>`;
    } else if (mark === 'em') {
      text = `<em>${text}</em>`;
    } else if (mark === 'code') {
      text = `<code class="bg-neutral-100 text-neutral-800 px-1.5 py-0.5 rounded text-sm font-mono">${text}</code>`;
    } else if (mark === 'underline') {
      text = `<u>${text}</u>`;
    } else {
      const def = markDefs.find((d) => d._key === mark);
      if (def && def._type === 'link' && def.href) {
        text = `<a href="${escapeHtml(def.href)}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800 transition-colors">${text}</a>`;
      }
    }
  }
  return text;
}

export function renderPortableTextToHtml(blocks: any): string {
  if (!blocks) return '';
  if (typeof blocks === 'string') return blocks;
  if (!Array.isArray(blocks)) return '';

  const html: string[] = [];
  let currentList: 'ul' | 'ol' | null = null;

  const closeList = () => {
    if (currentList) {
      html.push(`</${currentList}>`);
      currentList = null;
    }
  };

  for (const block of blocks) {
    // Inline Image or Image block
    if (block._type === 'inlineImage' || block._type === 'image') {
      closeList();
      const imgUrl = urlForImage(block.url || block);
      const alt = escapeHtml(block.alt || 'Post image');
      const caption = block.caption ? escapeHtml(block.caption) : '';

      if (imgUrl) {
        const image = responsiveImage(imgUrl, '(max-width: 1023px) 100vw, 70vw');
        html.push(`
          <figure class="my-8 mx-auto w-full lg:max-w-[70%]">
            <img
              src="${escapeHtml(image.src)}"
              ${image.srcset ? `srcset="${escapeHtml(image.srcset)}" sizes="${image.sizes}"` : ''}
              alt="${alt}"
              class="block w-auto h-auto max-w-full max-h-[600px] mx-auto drop-shadow-lg"
              loading="lazy"
            />
            ${caption
            ? `<figcaption class="mt-3 text-center text-xs sm:text-sm text-neutral-500">${caption}</figcaption>`
            : ''
          }
          </figure>
        `);
      }
      continue;
    }

    // Standard Block
    if (block._type === 'block') {
      const markDefs = block.markDefs || [];
      const childrenHtml = (block.children || [])
        .map((span: any) => renderSpan(span, markDefs))
        .join('');

      // If block is completely empty, don't generate empty tags unless it's a break
      if (!childrenHtml.trim() && !block.listItem) {
        continue;
      }

      // List item
      if (block.listItem) {
        const listTag = block.listItem === 'bullet' ? 'ul' : 'ol';
        const listClass =
          block.listItem === 'bullet'
            ? 'list-disc pl-6 mb-4 space-y-1 text-neutral-800'
            : 'list-decimal pl-6 mb-4 space-y-1 text-neutral-800';

        if (currentList !== listTag) {
          closeList();
          currentList = listTag;
          html.push(`<${listTag} class="${listClass}">`);
        }
        html.push(`<li class="leading-relaxed">${childrenHtml}</li>`);
        continue;
      }

      closeList();

      const style = block.style || 'normal';
      switch (style) {
        case 'h2':
          html.push(
            `<h2 class="text-2xl sm:text-3xl font-bold mt-8 mb-4 text-neutral-900 tracking-tight">${childrenHtml}</h2>`
          );
          break;
        case 'h3':
          html.push(
            `<h3 class="text-xl sm:text-2xl font-bold mt-6 mb-3 text-neutral-900 tracking-tight">${childrenHtml}</h3>`
          );
          break;
        case 'h4':
          html.push(
            `<h4 class="text-lg sm:text-xl font-semibold mt-4 mb-2 text-neutral-900">${childrenHtml}</h4>`
          );
          break;
        case 'blockquote':
          html.push(
            `<blockquote class="border-l-4 border-[#00629B] pl-4 py-2 italic my-6 text-neutral-700 bg-neutral-50 rounded-r">${childrenHtml}</blockquote>`
          );
          break;
        default:
          html.push(
            `<p class="mb-4 leading-relaxed text-neutral-800 text-sm sm:text-base">${childrenHtml}</p>`
          );
          break;
      }
    }
  }

  closeList();
  return html.join('\n');
}
