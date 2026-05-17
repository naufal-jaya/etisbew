/* For News cards*/
"use client";
import { Twitter, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="bg-white rounded-xl p-4 lg:p-6 border border-slate-100 shadow-sm flex flex-col items-center">
      <h3 className="font-bold text-navy-900 mb-4 text-xs lg:text-sm uppercase tracking-wider text-center">
        Share
      </h3>

      <div className="flex lg:flex-col gap-3">
        <Button asChild variant="outline" size="icon" className="rounded-full hover:bg-slate-100 transition-colors">
          <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
            <span className="font-bold">X</span>
          </a>
        </Button>

        <Button asChild variant="outline" size="icon" className="rounded-full hover:bg-[#0077b5] hover:text-white transition-colors hover:border-[#0077b5]">
          <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-4 h-4" />
          </a>
        </Button>

        <Button asChild variant="outline" size="icon" className="rounded-full hover:bg-[#1877f2] hover:text-white transition-colors hover:border-[#1877f2]">
          <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
            <Facebook className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ShareButtons;
