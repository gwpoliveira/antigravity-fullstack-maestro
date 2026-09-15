import React from 'react';

export default function BentoGrid() {
  const features = [
    {
      title: 'Isolamento Multi-tenant Absoluto',
      desc: 'Blindagem contra vazamento de dados entre clientes corporativos usando TenantBaseModel no Django e particionamento em nível de query.',
      icon: '🛡️',
      className: 'md:col-span-2 md:row-span-1',
    },
    {
      title: 'Deploy VPS 100% Sem Docker',
      desc: 'Performance pura do Linux: Gunicorn via Unix Socket, PM2 para SSR e MySQL nativo com latência residual zero.',
      icon: '⚡',
      className: 'md:col-span-1 md:row-span-1',
    },
    {
      title: 'Design Obsidian & Dark Mode',
      desc: 'Paletas calibradas, micro-interações táteis e tipografia nobre que encantam os usuários no primeiro segundo.',
      icon: '🎨',
      className: 'md:col-span-1 md:row-span-1',
    },
    {
      title: 'SEO no Topo do Google (100/100)',
      desc: 'Schema.org JSON-LD para Rich Snippets, sitemap.ts automático e Core Web Vitals com LCP abaixo de 1.8 segundos.',
      icon: '📈',
      className: 'md:col-span-2 md:row-span-1',
    },
  ];

  return (
    <section id="features" className="py-24 border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
            Engenharia de Alto Desempenho em Cada Detalhe
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Arquitetura concebida para desenvolvedores exigentes que não abrem mão de velocidade, segurança e acabamento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/70 hover:border-slate-700/80 transition-all duration-300 relative group overflow-hidden ${feat.className}`}
            >
              <div className="text-4xl mb-4">{feat.icon}</div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2 group-hover:text-indigo-400 transition-colors">
                {feat.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
