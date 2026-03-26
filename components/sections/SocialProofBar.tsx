import { Star, TrendingUp, Clock, Users } from 'lucide-react';

const stats = [
  { icon: Star, value: '4.9/5', label: 'průměrné hodnocení', color: '#00C47A' },
  { icon: Users, value: '100+', label: 'spuštěných webů', color: '#00C47A' },
  { icon: Clock, value: '< 24h', label: 'průměrná doba dodání', color: '#00C47A' },
  { icon: TrendingUp, value: '87 %', label: 'klientů se vrátí', color: '#00C47A' },
];

export default function SocialProofBar() {
  return (
    <section className="py-10 border-y" style={{background:'rgba(0,196,122,0.03)', borderColor:'rgba(0,196,122,0.1)'}}>
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2">
              <s.icon className="w-5 h-5" style={{color: s.color}} />
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="text-xs text-[#4A6055] uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
