import { benefits } from '@/lib/data';

export default function Benefits() {
  return (
    <section className="section-padding bg-[#0A0A0F]">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="tag mb-5">Proč právě my</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Co dostanete navíc{' '}
            <span className="gradient-text">oproti konkurenci</span>
          </h2>
          <p className="text-[#6B6B8A] text-lg max-w-xl mx-auto">
            Nepracujeme jako šablonová továrna. Každý web stavíme s přemýšlením nad vaším cílem.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="glass-card-hover rounded-2xl p-6 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#6C63FF]/10 flex items-center justify-center text-2xl mb-4 group-hover:bg-[#6C63FF]/20 transition-colors">
                {benefit.icon}
              </div>
              <h3 className="font-bold text-white mb-2 text-base">{benefit.title}</h3>
              <p className="text-[#6B6B8A] text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
