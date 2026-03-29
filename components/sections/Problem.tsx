import { XCircle, CheckCircle2 } from 'lucide-react';

const problems = [
  { text: 'Agentura má termín za 6 týdnů' },
  { text: 'Nabídka přijde za 2 dny, pak schůzka' },
  { text: 'Cena 50–150 000 Kč bez záruky' },
  { text: 'Revize trvají další týdny' },
];

const solutions = [
  { text: 'Objednáte dnes, web máte zítra' },
  { text: 'Žádné schůzky — formulář za 5 minut' },
  { text: 'Pevná cena 9 900 Kč — vše v ceně' },
  { text: '1 revize webu zdarma po spuštění' },
];

export default function Problem() {
  return (
    <section className="section-padding bg-[#050A08]">
      <div className="container-custom">
        <div className="text-center mb-14">
          <div className="tag mb-5">Proč Do24</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Klasická agentura?{' '}
            <span className="gradient-text">Měsíce čekání.</span>
          </h2>
          <p className="text-[#606060] text-lg max-w-xl mx-auto">
            My to děláme jinak. Žádná byrokracie, žádné plýtvání časem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Problem column */}
          <div className="glass-card p-7">
            <div className="text-xs font-black text-red-400 uppercase tracking-widest mb-5">
              Klasická agentura
            </div>
            <ul className="flex flex-col gap-3.5">
              {problems.map((p) => (
                <li key={p.text} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500/70 flex-shrink-0 mt-0.5" />
                  <span className="text-[#707070] text-sm">{p.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution column */}
          <div className="accent-border rounded-2xl p-7">
            <div className="text-xs font-black text-[#00C47A] uppercase tracking-widest mb-5">
              webdo24.cz
            </div>
            <ul className="flex flex-col gap-3.5">
              {solutions.map((s) => (
                <li key={s.text} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00C47A] flex-shrink-0 mt-0.5" />
                  <span className="text-white text-sm font-medium">{s.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
