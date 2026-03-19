'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/jak-to-funguje', label: 'Jak to funguje' },
  { href: '/pro-koho', label: 'Pro koho' },
  { href: '/cenik', label: 'Ceník' },
  { href: '/reference', label: 'Reference' },
  { href: '/faq', label: 'FAQ' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#0A0A0F]/95 backdrop-blur-xl border-b border-white/[0.06] py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C63FF] to-[#8B85FF] flex items-center justify-center shadow-lg shadow-[#6C63FF]/30">
              <span className="text-white font-black text-sm">W</span>
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              webdozitra<span className="text-[#6C63FF]">.cz</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-[#A0A0C0] hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/[0.05]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/kontakt"
              className="text-sm font-medium text-[#A0A0C0] hover:text-white transition-colors"
            >
              Kontakt
            </Link>
            <Link
              href="/objednat"
              className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm"
            >
              Chci web
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-3 pb-4 border-t border-white/[0.08] pt-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-[#A0A0C0] hover:text-white font-medium transition-colors rounded-lg hover:bg-white/[0.04]"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/kontakt"
                className="px-4 py-3 text-[#A0A0C0] hover:text-white font-medium transition-colors rounded-lg hover:bg-white/[0.04]"
                onClick={() => setIsOpen(false)}
              >
                Kontakt
              </Link>
              <Link
                href="/objednat"
                className="btn-primary mt-2 flex items-center justify-center gap-2 px-5 py-3 text-sm"
                onClick={() => setIsOpen(false)}
              >
                Chci web do 7 dnů
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
