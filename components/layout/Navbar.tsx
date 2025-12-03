'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  variant?: 'default' | 'light';
}

const Navbar = ({ variant = 'default' }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/news', label: 'News' },
    { href: '#contact', label: 'Contact' },
  ];

  // Determine text colors based on scroll state and variant
  // If variant is 'light' (for white pages) and not scrolled, use dark text.
  // Otherwise (scrolled or default dark theme), use white text.
  const useDarkText = variant === 'light' && !isScrolled;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent',
        isScrolled
          ? 'glass-nav py-3 border-white/10'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className={cn(
              "text-2xl font-bold tracking-tight transition-colors",
              useDarkText ? "text-navy-900" : "text-white"
            )}>
              IEEE <span className="text-blue-400 group-hover:text-cyan-400 transition-colors">IPB</span>
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
                    ? "text-slate-600 hover:text-blue-600 hover:bg-blue-50" 
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pl-4">
                <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-500 font-bold rounded-full px-6 shadow-lg shadow-blue-500/20">
                    Join Us
                </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden p-2 rounded-full transition-colors",
              useDarkText ? "text-navy-900 hover:bg-slate-100" : "text-white hover:bg-white/10"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-deep-navy/95 backdrop-blur-xl border-b border-white/10 shadow-xl animate-in slide-in-from-top-5">
            <div className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 px-4 text-slate-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-500 font-bold rounded-lg">
                    Join Us
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
