'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ${
      visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    }`}>
      <div className="bg-[#080808]/95 backdrop-blur-xl border-t border-white/[0.06] p-4">
        <Link
          href="/objednat"
          className="btn-primary flex items-center justify-center gap-2 w-full py-4 text-sm font-bold"
        >
          <Zap className="w-4 h-4" />
          Chci web do 24 hodin
        </Link>
      </div>
    </div>
  );
}
