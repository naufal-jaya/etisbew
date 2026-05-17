"use client";
import { useState } from "react";
import { Linkedin, Send, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
  url: string;
  title: string;
}

const ShareButtons = ({ url, title }: ShareButtonsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setIsOpen(false);
  };

  return (
    <div className="fixed left-4 lg:left-8 top-[80%] -translate-y-1/2 z-50 flex flex-col gap-3 items-center">
      {/* The expanding menu */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 origin-bottom ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
        }`}
      >
        <Button
          onClick={handleCopy}
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10 shadow-lg bg-white hover:bg-slate-100 border-slate-200"
          title="Copy Link"
        >
          <Link2 className="w-4 h-4 text-slate-700" />
        </Button>

        <Button
          asChild
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10 shadow-lg bg-white hover:bg-[#25D366] hover:border-[#25D366] group border-slate-200"
          title="Share on WhatsApp"
        >
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="w-4 h-4 fill-current text-slate-700 group-hover:text-white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
          </a>
        </Button>

        <Button
          asChild
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10 shadow-lg bg-white hover:bg-[#000000] hover:border-black group border-slate-200"
          title="Share on X"
        >
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="w-3.5 h-3.5 fill-current text-slate-700 group-hover:text-white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </Button>

        <Button
          asChild
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10 shadow-lg bg-white hover:bg-[#0077b5] hover:border-[#0077b5] group border-slate-200"
          title="Share on LinkedIn"
        >
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-4 h-4 text-slate-700 group-hover:text-white" />
          </a>
        </Button>
      </div>

      {/* Main toggle button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="rounded-full w-12 h-12 shadow-xl bg-[#28313C] hover:bg-[#1f262e] text-white z-10 transition-transform hover:scale-105"
      >
        <Send className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default ShareButtons;
