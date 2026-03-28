'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, Zap, Mail, Calculator as CalcIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  { title: 'Typ webu', description: 'Co budeme stavět?' },
  { title: 'Váš obor', description: 'Kde podnikáte?' },
  { title: 'Cíl projektu', description: 'Co je nejdůležitější?' },
  { title: 'Předběžná cena', description: 'Kolik to bude stát?' },
  { title: 'Získat nabídku', description: 'Kam ji máme poslat?' },
];

const websiteTypes = [
  { id: 'landing', label: 'Landing Page', price: 9800 },
  { id: 'firemni', label: 'Firemní web', price: 19600 },
  { id: 'eshop', label: 'E-shop', price: 39000 },
  { id: 'jine', label: 'Jiné / Speciální', price: 25000 },
];

const goals = [
  { id: 'prodej', label: 'Chci prodat produkt', multiplier: 1.2 },
  { id: 'kontakty', label: 'Chci sbírat kontakty', multiplier: 1.0 },
  { id: 'prezentace', label: 'Chci moderní prezentaci', multiplier: 0.9 },
];

export default function Calculator() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    type: '',
    industry: '',
    industryCustom: '',
    goal: '',
    email: '',
  });

  const calculatedPrice = Math.round(
    (websiteTypes.find((t) => t.id === data.type)?.price || 0) *
      (goals.find((g) => g.id === data.goal)?.multiplier || 1)
  );

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.email) return;
    
    // Save email and timestamp to localStorage for the closing page timer
    localStorage.setItem('user_email', data.email);
    localStorage.setItem('calculator_price', calculatedPrice.toString());
    
    router.push('/nabidka');
  };

  return (
    <section className="section-padding bg-[#050A08]" id="kalkulacka">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C47A]/10 border border-[#00C47A]/20 text-[#00C47A] text-xs font-bold uppercase tracking-wider mb-4">
              <CalcIcon className="w-3.5 h-3.5" />
              Interaktivní kalkulace
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Zjistěte cenu svého webu <span className="text-[#00C47A]">během 30 sekund</span>
            </h2>
          </div>

          <div className="glass-card rounded-3xl p-6 md:p-10 border-[#00C47A]/10">
            {/* Progress */}
            <div className="flex justify-between mb-8">
              {STEPS.map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                    step > i + 1 ? "bg-[#00C47A] text-black" : 
                    step === i + 1 ? "bg-[#00C47A] text-black ring-4 ring-[#00C47A]/20" : 
                    "bg-white/5 text-white/40"
                  )}>
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>

            <div className="min-h-[300px] flex flex-col">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{STEPS[step-1].title}</h3>
                <p className="text-[#909090]">{STEPS[step-1].description}</p>
              </div>

              <div className="flex-1">
                {step === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {websiteTypes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => { setData({...data, type: t.id}); handleNext(); }}
                        className={cn(
                          "p-6 rounded-2xl border text-left transition-all",
                          data.type === t.id ? "bg-[#00C47A]/10 border-[#00C47A] text-white" : "bg-white/5 border-white/10 text-[#909090] hover:border-white/20"
                        )}
                      >
                        <div className="font-bold text-lg mb-1">{t.label}</div>
                      </button>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div className="flex flex-col gap-4">
                    {['Gastro', 'Služby', 'Reality', 'E-commerce'].map((o) => (
                      <button
                        key={o}
                        onClick={() => { setData({...data, industry: o}); handleNext(); }}
                        className={cn(
                          "p-5 rounded-xl border text-left transition-all",
                          data.industry === o ? "bg-[#00C47A]/10 border-[#00C47A] text-white" : "bg-white/5 border-white/10 text-[#909090] hover:border-white/20"
                        )}
                      >
                        {o}
                      </button>
                    ))}
                    <div className="mt-2">
                      <label className="text-xs text-[#606060] uppercase font-bold mb-2 block">Jiné / Vlastní obor</label>
                      <input 
                        type="text" 
                        placeholder="Zadejte váš obor..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-[#00C47A] outline-none transition-all"
                        value={data.industryCustom}
                        onChange={(e) => setData({...data, industryCustom: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="flex flex-col gap-4">
                    {goals.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => { setData({...data, goal: g.id}); handleNext(); }}
                        className={cn(
                          "p-6 rounded-2xl border text-left transition-all",
                          data.goal === g.id ? "bg-[#00C47A]/10 border-[#00C47A] text-white" : "bg-white/5 border-white/10 text-[#909090] hover:border-white/20"
                        )}
                      >
                        <div className="font-bold text-lg">{g.label}</div>
                      </button>
                    ))}
                  </div>
                )}

                {step === 4 && (
                  <div className="text-center py-10">
                    <div className="text-[#909090] mb-2 uppercase tracking-widest font-bold text-sm">Standardní cena vašeho řešení</div>
                    <div className="text-6xl md:text-7xl font-black text-white mb-6">
                      {calculatedPrice.toLocaleString('cs-CZ')} <span className="text-2xl text-[#606060]">Kč</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-[#909090] text-sm">
                      <Zap className="w-4 h-4 text-[#00C47A]" />
                      Cena zahrnuje design, vývoj a spuštění do 24 hodin
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="text-center mb-4">
                      <p className="text-[#909090] text-lg">
                        Vaše kalkulace je připravena. Zadejte e-mail, kam vám ji máme okamžitě poslat spolu s detailní nabídkou.
                      </p>
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#606060] w-5 h-5" />
                      <input 
                        type="email" 
                        required
                        placeholder="vas@email.cz"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-14 py-5 text-white text-lg focus:border-[#00C47A] outline-none transition-all"
                        value={data.email}
                        onChange={(e) => setData({...data, email: e.target.value})}
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-[#00C47A] hover:bg-[#00E08B] text-black font-black py-5 rounded-2xl text-lg flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(0,196,122,0.3)]"
                    >
                      Zaslat kalkulaci a detailní nabídku
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    <p className="text-center text-[#505050] text-xs">
                      Žádný spam. Pouze vaše kalkulace a jedna výjimečná nabídka.
                    </p>
                  </form>
                )}
              </div>

              {step < 5 && (
                <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/5">
                  <button 
                    onClick={handleBack}
                    disabled={step === 1}
                    className={cn(
                      "flex items-center gap-2 text-[#606060] hover:text-white transition-all font-bold",
                      step === 1 && "opacity-0 pointer-events-none"
                    )}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Zpět
                  </button>
                  {step < 4 && (
                    <button 
                      onClick={handleNext}
                      disabled={step === 1 && !data.type || step === 2 && !data.industry && !data.industryCustom || step === 3 && !data.goal}
                      className="btn-primary px-8 py-3 flex items-center gap-2"
                    >
                      Pokračovat
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                  {step === 4 && (
                    <button 
                      onClick={handleNext}
                      className="btn-primary px-10 py-4 flex items-center gap-3 text-lg"
                    >
                      Získat tuto nabídku
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
