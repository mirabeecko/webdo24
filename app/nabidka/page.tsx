'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Zap, ShieldCheck, Star, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { packages } from '@/lib/data';

const COUNTDOWN_TIME = 10 * 60; // 10 minutes

export default function NabidkaPage() {
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_TIME);
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState(0);
  const [discountActive, setDiscountActive] = useState(true);

  useEffect(() => {
    // Get stored data
    const storedEmail = localStorage.getItem('user_email');
    const storedPrice = localStorage.getItem('calculator_price');
    const startTime = localStorage.getItem('offer_start_time');
    
    if (storedEmail) setEmail(storedEmail);
    if (storedPrice) setPrice(parseInt(storedPrice));
    
    if (startTime) {
      const elapsed = Math.floor((Date.now() - parseInt(startTime)) / 1000);
      const remaining = Math.max(0, COUNTDOWN_TIME - elapsed);
      setTimeLeft(remaining);
      if (remaining === 0) setDiscountActive(false);
    } else {
      localStorage.setItem('offer_start_time', Date.now().toString());
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setDiscountActive(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <main className="min-h-screen bg-[#050A08] pt-32 pb-20">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          
          {/* Urgency Header */}
          <div className="text-center mb-16 relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF4D00]/10 border border-[#FF4D00]/20 text-[#FF4D00] text-sm font-black uppercase tracking-widest mb-6 animate-pulse">
              <Clock className="w-4 h-4" />
              Časově omezená nabídka
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight leading-tight">
              Vaše nabídka je připravena, <br />
              <span className="text-[#FF4D00] underline decoration-4 underline-offset-8">ale máme pro vás něco lepšího...</span>
            </h1>
            
            <p className="text-[#909090] text-xl max-w-2xl mx-auto mb-10">
              Právě jsme vám na e-mail <span className="text-white font-bold">{email || '...'}</span> zaslali standardní kalkulaci. 
              Pokud se ale rozhodnete <span className="text-white font-bold">právě teď</span>, získáte web za polovinu.
            </p>

            {/* Timer */}
            <div className="flex flex-col items-center justify-center gap-4 py-8 bg-white/5 border border-white/10 rounded-3xl relative overflow-hidden group">
              {discountActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D00]/5 to-transparent pointer-events-none" />
              )}
              
              <div className="text-xs uppercase font-black tracking-[0.3em] text-[#606060]">Tato nabídka vyprší za</div>
              <div className={cn(
                "text-7xl md:text-8xl font-black font-mono transition-all",
                discountActive ? "text-white" : "text-[#FF4D00] opacity-50"
              )}>
                {formatTime(timeLeft)}
              </div>
              
              {!discountActive && (
                <div className="flex items-center gap-2 text-[#FF4D00] font-bold">
                  <AlertCircle className="w-5 h-5" />
                  PLATNOST NABÍDKY VYPRŠELA
                </div>
              )}
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {packages.map((pkg) => (
              <div key={pkg.id} className={cn(
                "relative flex flex-col p-8 rounded-3xl transition-all duration-500",
                pkg.highlighted 
                  ? "bg-gradient-to-b from-[#0A1A12] to-[#050A08] border-2 border-[#00C47A] shadow-[0_0_50px_rgba(0,196,122,0.15)] scale-105 z-10" 
                  : "bg-white/5 border border-white/10 opacity-90"
              )}>
                {pkg.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00C47A] text-black font-black px-4 py-1 rounded-full text-xs uppercase">
                    {pkg.badge}
                  </div>
                )}
                
                <div className="mb-8">
                  <div className="text-xs font-black text-[#00C47A] tracking-widest uppercase mb-2">{pkg.name}</div>
                  
                  {discountActive ? (
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-2 text-[#606060] line-through decoration-[#FF4D00]/60 decoration-2">
                        <span className="text-2xl font-bold">{pkg.originalPrice}</span>
                        <span className="text-sm">Kč</span>
                      </div>
                      <div className="flex items-baseline gap-2 text-white">
                        <span className="text-5xl font-black">{pkg.price}</span>
                        <span className="text-2xl font-bold text-[#00C47A]">Kč</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-2 text-white">
                      <span className="text-5xl font-black">{pkg.originalPrice}</span>
                      <span className="text-2xl font-bold text-[#606060]">Kč</span>
                    </div>
                  )}
                  
                  <div className="text-[10px] text-[#505050] mt-1 uppercase font-bold tracking-wider">{pkg.priceNote}</div>
                </div>

                <ul className="flex flex-col gap-3 mb-10 flex-grow">
                  {pkg.features.slice(0, 6).map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#909090]">
                      <ShieldCheck className="w-4 h-4 text-[#00C47A] flex-shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <button 
                  className={cn(
                    "w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all",
                    pkg.highlighted 
                      ? "bg-[#00C47A] hover:bg-[#00E08B] text-black shadow-[0_10px_30px_rgba(0,196,122,0.2)]" 
                      : "bg-white/10 hover:bg-white/20 text-white"
                  )}
                >
                  OBJEDNAT TEĎ SE SLEVOU
                </button>
              </div>
            ))}
          </div>

          {/* Trust Bar */}
          <div className="glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1 text-[#FF8C00]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                <span className="ml-2 text-white font-bold">4.9 / 5</span>
              </div>
              <div className="text-sm text-[#606060]">Na základě 120+ hodnocení spokojených klientů</div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-black text-white">100%</div>
                <div className="text-[10px] uppercase font-bold text-[#606060]">Garance vrácení peněz</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex flex-col items-center">
                <div className="text-2xl font-black text-white">24h</div>
                <div className="text-[10px] uppercase font-bold text-[#606060]">Rychlost dodání</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex flex-col items-center">
                <div className="text-2xl font-black text-white">777+</div>
                <div className="text-[10px] uppercase font-bold text-[#606060]">Podpora 24/7</div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="text-sm text-[#909090] mb-1">Potřebujete poradit?</div>
              <a href="tel:+420777734389" className="text-xl font-black text-white hover:text-[#00C47A] transition-colors">
                +420 777 734 389
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
