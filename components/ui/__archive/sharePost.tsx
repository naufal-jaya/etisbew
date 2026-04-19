/* For News cards*/ 
'use client';

import { Button } from '@/components/ui/button';

interface ShareButtonsProps {
  url: string;
  title: string;
}

const ShareButtons = ({ url, title }: ShareButtonsProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
      <h3 className="font-bold text-navy-900 mb-4 text-sm uppercase tracking-wider">
        Share this article
      </h3>

      <div className="flex gap-2">
        <Button asChild variant="outline" size="sm" className="w-full">
          <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        </Button>

        <Button asChild variant="outline" size="sm" className="w-full">
          <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </Button>

        <Button asChild variant="outline" size="sm" className="w-full">
          <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ShareButtons;