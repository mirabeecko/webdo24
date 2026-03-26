import { Check, X } from 'lucide-react';

const rows = [
  { feature: 'Spuštění do 24 hodin', us: true, agency: false, wix: false },
  { feature: 'Pevná cena předem', us: true, agency: false, wix: true },
  { feature: 'Záruka vrácení zálohy', us: true, agency: false, wix: false },
  { feature: 'Vlastní kód (ne šablona)', us: true, agency: true, wix: false },
  { feature: 'SEO optimalizace v ceně', us: true, agency: false, wix: false },
  { feature: 'Mobile-first design', us: true, agency: true, wix: true },
  { feature: 'Jeden kontakt, plná zodpovědnost', us: true, agency: false, wix: false },
  { feature: 'Žádné měsíční poplatky za CMS', us: true, agency: false, wix: false },
];

export default function CompareTable() {
  return (
    <section className="section-padding bg-[#050A08]">
      <div className="container-custom">
        <div className="text-center mb-14">
          <div className="tag mb-5">Přímé srovnání</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Proč ne agenturu.{' '}
            <span className="gradient-text">Proč ne Wix.</span>
          </h2>
          <p className="text-[#4A6055] text-lg max-w-lg mx-auto">
            Transparentní srovnání — žádné marketingové kličky.
          </p>
        </div>

        <div className="max-w-3xl mx-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left pb-4 text-[#4A6055] font-medium w-1/2">Funkce</th>
                <th className="pb-4 text-center">
                  <div className="inline-flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-[#050A08]"
                      style={{background:'linear-gradient(135deg,#00C47A,#00E08A)'}}>W</div>
                    <span className="text-white font-bold text-xs">Webdozitra</span>
                  </div>
                </th>
                <th className="pb-4 text-center">
                  <div className="inline-flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-xs font-bold text-[#606060]">A</div>
                    <span className="text-[#505050] text-xs">Agentura</span>
                  </div>
                </th>
                <th className="pb-4 text-center">
                  <div className="inline-flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-xs font-bold text-[#606060]">W</div>
                    <span className="text-[#505050] text-xs">Wix/šablona</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-t border-white/[0.05]">
                  <td className="py-3.5 text-[#9AB5A8] pr-4">{row.feature}</td>
                  <td className="py-3.5 text-center">
                    {row.us
                      ? <Check className="w-5 h-5 text-[#00C47A] mx-auto" />
                      : <X className="w-4 h-4 text-[#3A5045] mx-auto" />}
                  </td>
                  <td className="py-3.5 text-center">
                    {row.agency
                      ? <Check className="w-4 h-4 text-[#4A6055] mx-auto" />
                      : <X className="w-4 h-4 text-[#282828] mx-auto" />}
                  </td>
                  <td className="py-3.5 text-center">
                    {row.wix
                      ? <Check className="w-4 h-4 text-[#4A6055] mx-auto" />
                      : <X className="w-4 h-4 text-[#282828] mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
