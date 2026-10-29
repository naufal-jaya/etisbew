export function getShareContent(title: string, author: string, currentUrl: string) {
  const url = new URL(currentUrl);
  url.hash = '';
  const introduction = `Read this article by ${author} from IEEE Student Branch IPB: "${title}"`;
  const message = `${introduction}\n${url.href}`;
  const whatsapp = new URL('https://api.whatsapp.com/send');
  whatsapp.searchParams.set('text', message);
  const x = new URL('https://twitter.com/intent/tweet');
  x.searchParams.set('text', introduction);
  x.searchParams.set('url', url.href);
  const linkedin = new URL('https://www.linkedin.com/sharing/share-offsite/');
  linkedin.searchParams.set('url', url.href);

  return {
    url: url.href,
    message,
    links: { whatsapp: whatsapp.href, x: x.href, linkedin: linkedin.href },
  };
}
