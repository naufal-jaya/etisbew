"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  variant?: "default" | "light";
}

const Navbar = ({ variant = "default" }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMatchmakingModal, setShowMatchmakingModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/news", label: "News" },
    { href: "https://ieee-ipb-matchmakieeeng.vercel.app", isExternal: true },
  ];

  const useDarkText = variant === "light" && !isScrolled;

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
          isScrolled
            ? "glass-nav py-3 border-white/10"
            : "bg-transparent py-5 border-transparent",
        )}
      >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span
              aria-label="IEEE IPB Student Branch"
              role="img"
              className={cn(
                "block aspect-[679/116] w-32 shrink-0 bg-current sm:w-40",
                "[mask-image:url('/images/layout/Logo_IEEE_IPB.svg')] [mask-position:left_center] [mask-repeat:no-repeat] [mask-size:contain]",
                "[-webkit-mask-image:url('/images/layout/Logo_IEEE_IPB.svg')] [-webkit-mask-position:left_center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]",
                useDarkText ? "text-black" : "text-white",
              )}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              if (link.isExternal) {
                return (
                  <button
                    key={link.href}
                    onClick={() => setShowMatchmakingModal(true)}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all cursor-pointer",
                      useDarkText
                        ? "text-slate-700 hover:text-black hover:bg-black/5"
                        : "text-slate-300 hover:text-white hover:bg-white/5",
                    )}
                  >
                    <Sparkle size={26} fill="currentColor" stroke="none" className="-translate-y-[0.5px]" />
                    {link.label}
                  </button>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition-all",
                    useDarkText
                      ? "text-slate-700 hover:text-black hover:bg-black/5"
                      : "text-slate-300 hover:text-white hover:bg-white/5",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pl-4"></div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden p-2 rounded-full transition-colors",
              useDarkText
                ? "text-navy-900 hover:bg-slate-100"
                : "text-white hover:bg-white/10",
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            className={cn(
              "md:hidden absolute top-full left-0 right-0 backdrop-blur-xl border-b shadow-xl animate-in slide-in-from-top-5",
              useDarkText
                ? "bg-white/95 border-slate-200"
                : "bg-deep-navy/95 border-white/10",
            )}
          >
            <div className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => {
                if (link.isExternal) {
                  return (
                    <button
                      key={link.href}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setShowMatchmakingModal(true);
                      }}
                      className={cn(
                        "flex items-center gap-2 w-full text-left py-3 px-4 rounded-lg transition-colors font-medium cursor-pointer",
                        useDarkText
                          ? "text-navy-900 hover:bg-slate-100"
                          : "text-slate-300 hover:bg-white/5 hover:text-white",
                      )}
                    >
                      <Sparkle size={30} fill="currentColor" stroke="none" />
                      {link.label}
                    </button>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block py-3 px-4 rounded-lg transition-colors font-medium",
                      useDarkText
                        ? "text-navy-900 hover:bg-slate-100"
                        : "text-slate-300 hover:bg-white/5 hover:text-white",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4"></div>
            </div>
          </div>
        )}
      </div>

      </nav>

      {showMatchmakingModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
            onClick={() => setShowMatchmakingModal(false)}
          />

          {/* Card */}
          <div className="relative w-full max-w-md bg-[#121820] rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200 z-10 flex flex-col items-center text-center">
            <h3 className="text-white font-bold text-lg mb-2 flex items-center justify-center gap-2">
              <span>Redirect to</span>
              <img
                src="/images/matchmakieeeng/MatchmakIEEEng.png"
                alt="MatchmakIEEEng Logo"
                className="h-4 sm:h-6 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]"
              />
            </h3>

            <p className="text-slate-400 text-sm sm:w-3/4 leading-relaxed mb-6">
              This will take you to MatchmakIEEEng app featured for <b>IEEE SB IPB members only</b>
            </p>

            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => setShowMatchmakingModal(false)}
                className="flex-1 py-2.5 border border-white/10 hover:bg-white/5 text-white/80 rounded-xl transition-all cursor-pointer text-sm font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowMatchmakingModal(false);
                  window.open("https://ieee-ipb-matchmakieeeng.vercel.app", "_blank");
                }}
                className="flex-1 py-2.5 bg-[#16357B] hover:bg-[#1a4299] text-white rounded-xl transition-all cursor-pointer text-sm font-medium"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
