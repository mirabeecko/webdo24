import { benefits } from '@/lib/data';

export default function Benefits() {
  return (
    <section className="section-padding" style={{ background: 'linear-gradient(180deg, #080808 0%, #0d0808 100%)' }}>
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="tag mb-5">Proč webdozitra.cz</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Jiní slibují.{' '}
            <span className="gradient-text">My dodáváme do 24h.</span>
          </h2>
          <p className="text-[#606060] text-lg max-w-xl mx-auto">
            Žádné "brzy", žádné "pracujeme na tom". Jasný termín, pevná cena, garantovaný výsledek.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((b, i) => (
            <div key={i} className="glass-card-hover rounded-2xl p-6 group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-colors"
                style={{ background: 'rgba(255,77,0,0.1)', border: '1px solid rgba(255,77,0,0.15)' }}>
                {b.icon}
              </div>
              <h3 className="font-bold text-white mb-2 text-sm leading-snug">{b.title}</h3>
              <p className="text-[#606060] text-sm leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
