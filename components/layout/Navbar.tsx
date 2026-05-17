"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  variant?: "default" | "light";
}

const Navbar = ({ variant = "default" }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  ];

  const useDarkText = variant === "light" && !isScrolled;

  return (
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
            <div className={cn(
              "text-2xl font-bold tracking-tight transition-colors",
              useDarkText ? "text-navy-900 hover:text-navy-700" : "text-white hover:text-white/70"
            )}>
              IEEE{" "}
              <span className={cn(
                "transition-colors",
                useDarkText ? "text-navy-900 group-hover:text-navy-700" : "text-blue-400 group-hover:text-blue-500"
              )}>
                IPB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-all",
                  useDarkText 
                    ? "text-slate-700 hover:text-black hover:bg-black/5" 
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
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
          <div className={cn(
            "md:hidden absolute top-full left-0 right-0 backdrop-blur-xl border-b shadow-xl animate-in slide-in-from-top-5",
            useDarkText ? "bg-white/95 border-slate-200" : "bg-deep-navy/95 border-white/10"
          )}>
            <div className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block py-3 px-4 rounded-lg transition-colors font-medium",
                    useDarkText 
                      ? "text-navy-900 hover:bg-slate-100" 
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4"></div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
