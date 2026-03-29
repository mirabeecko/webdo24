'use client';

export default function DekujemePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-16">
      <div className="max-w-xl mx-auto text-center">
        {/* Icon */}
        <div className="text-7xl mb-6">🚀</div>

        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
          Platba potvrzena.
          <br />
          <span className="text-yellow-400">Začínáme pracovat.</span>
        </h1>

        <p className="text-zinc-300 text-lg mb-10">
          Tým se pustil do práce.
          <br />
          Do 24 hodin od potvrzení zadání máš web online.
        </p>

        {/* Next steps */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-12 text-left space-y-5">
          {[
            { step: '1', time: 'Do 2 hodin', text: 'Obdržíš e-mail s návrhem textů jednotlivých stránek. Doplň požadavky a pošli nám potvrzen.' },
            { step: '2', time: 'Hned po potvrzení', text: 'Startuje 24hodinový termín. Logo a fotky zašli na podklady@webdo24.cz.' },
            { step: '3', time: 'Do 24 hodin', text: 'Web je live. Pošleme odkaz a instrukce pro napojení na vlastní doménu.' },
            { step: '4', time: 'Po spuštění', text: 'Máš nárok na 1 revizi zdarma — cokoliv upravit podle tvých požadavků.' },
          ].map((item) => (
            <div key={item.step} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-yellow-400 text-black font-black text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                {item.step}
              </div>
              <div>
                <div className="text-yellow-400 font-bold text-xs uppercase tracking-wide mb-0.5">
                  {item.time}
                </div>
                <div className="text-white font-medium text-sm">{item.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-8 text-sm text-center">
          <p className="text-zinc-400">Logo a fotky pošli na:</p>
          <a href="mailto:podklady@webdo24.cz" className="text-yellow-400 font-black text-lg">podklady@webdo24.cz</a>
          <p className="text-zinc-500 text-xs mt-1">E-mailem dostaneš výzvu s dalšími instrukcemi.</p>
        </div>

        <p className="text-zinc-600 text-sm">
          Dotazy? <a href="mailto:info@webdo24.cz" className="text-yellow-400 underline">info@webdo24.cz</a>
        </p>
      </div>
    </div>
  );
}
