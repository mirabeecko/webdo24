'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Zap, Phone } from 'lucide-react';
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
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-[#050A08]/95 backdrop-blur-xl border-b border-white/[0.05] py-3' : 'bg-transparent py-5'
    )}>
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-[0_4px_16px_rgba(255,77,0,0.25)]"
              style={{background:'linear-gradient(135deg,#FF4D00,#FF8C00)'}}>
              <span className="text-white font-black text-sm">W</span>
            </div>
            <span className="font-black text-lg text-white tracking-tight">
              webdozitra<span className="text-[#FF4D00]">.cz</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href}
                className="px-4 py-2 text-sm font-medium text-[#7A9E8E] hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="tel:+420777734389" className="flex items-center gap-2 text-sm font-bold text-[#00C47A] hover:text-[#00E08B] transition-colors">
              <Phone className="w-4 h-4" />
              +420 777 734 389
            </a>
            <Link href="#kalkulacka" className="bg-[#FF4D00] hover:bg-[#FF6B2B] text-white flex items-center gap-1.5 px-5 py-2.5 text-sm font-black rounded-xl transition-all shadow-[0_4px_15px_rgba(255,77,0,0.3)]">
              <Zap className="w-3.5 h-3.5 fill-current" />
              CHCI WEB DO 24H
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {isOpen && (
          <div className="md:hidden mt-3 pb-4 border-t border-white/[0.06] pt-4">
            <div className="flex flex-col gap-1">
              {navLinks.map(l => (
                <Link key={l.href} href={l.href}
                  className="px-4 py-3 text-[#7A9E8E] hover:text-white font-medium transition-colors rounded-lg"
                  onClick={() => setIsOpen(false)}>{l.label}</Link>
              ))}
              <div className="px-4 py-4 flex flex-col gap-4">
                 <a href="tel:+420777734389" className="flex items-center gap-2 text-lg font-bold text-[#00C47A]">
                  <Phone className="w-5 h-5" />
                  +420 777 734 389
                </a>
                <Link href="#kalkulacka"
                  className="bg-[#FF4D00] text-white flex items-center justify-center gap-2 px-5 py-4 text-base font-black rounded-xl"
                  onClick={() => setIsOpen(false)}>
                  <Zap className="w-5 h-5 fill-current" />CHCI WEB DO 24 HODIN
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
