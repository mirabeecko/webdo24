'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="bg-[#0A0A0F]/95 backdrop-blur-xl border-t border-white/[0.08] p-4">
        <Link
          href="/objednat"
          className="btn-primary flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold"
        >
          Chci web do 7 dnů
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
