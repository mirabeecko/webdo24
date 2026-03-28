'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Zap, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#050A08]/95 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#00C47A] shadow-[0_4px_16px_rgba(0,196,122,0.35)]">
              <Zap className="w-4 h-4 text-[#050A08]" fill="currentColor" />
            </div>
            <span className="font-black text-lg text-white tracking-tight">
              Do<span className="text-[#00C47A]">24</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { href: '/#jak-to-funguje', label: 'Jak to funguje' },
              { href: '/#produkty', label: 'Produkty' },
              { href: '/#faq', label: 'FAQ' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-[#808080] hover:text-white transition-colors font-medium"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/objednat"
              className="btn-primary hidden md:flex items-center gap-1.5 px-5 py-2.5 text-sm"
            >
              <Zap className="w-3.5 h-3.5" />
              Objednat
            </Link>
            <button
              className="md:hidden p-2 text-[#808080] hover:text-white"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#050A08]/98 backdrop-blur-xl border-b border-white/5 px-6 pb-6">
          <nav className="flex flex-col gap-4 pt-4">
            {[
              { href: '/#jak-to-funguje', label: 'Jak to funguje' },
              { href: '/#produkty', label: 'Produkty' },
              { href: '/#faq', label: 'FAQ' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-[#A0A0A0] hover:text-white transition-colors font-medium"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/objednat"
              className="btn-primary flex items-center justify-center gap-2 px-5 py-3 text-sm mt-2"
              onClick={() => setOpen(false)}
            >
              <Zap className="w-4 h-4" />
              Objednat web
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
