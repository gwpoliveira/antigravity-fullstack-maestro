'use client';

import React, { useState } from 'react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      desc: 'Perfeito para validação rápida de MVPs e projetos solo.',
      price: isAnnual ? 'R$ 49' : 'R$ 69',
      period: '/mês',
      features: [
        'Até 5 tenants ativos',
        'Backend Django & MySQL integrado',
        'Frontend Next.js App Router',
        'Auditoria de Segurança básica',
      ],
      isPopular: false,
    },
    {
      name: 'Professional',
      desc: 'A escolha definitiva para SaaS e E-commerces em escala.',
      price: isAnnual ? 'R$ 149' : 'R$ 199',
      period: '/mês',
      features: [
        'Tenants ilimitados',
        'Zero N+1 Queries garantido',
        'Selo de Segurança Guardian Completo',
        'SEO 100/100 com Rich Snippets',
        'Scripts de Deploy VPS Bare-Metal',
      ],
      isPopular: true,
    },
    {
      name: 'Enterprise',
      desc: 'Para software houses e times com alta demanda transacional.',
      price: isAnnual ? 'R$ 399' : 'R$ 499',
      period: '/mês',
      features: [
        'Tudo do plano Professional',
        'Suporte a Jogos & PWAs a 60 FPS',
        'Auditoria de código e Pentest dedicado',
        'Infraestrutura Multi-VPS e Failover',
        'SLA de 99.9% com suporte prioritário',
      ],
      isPopular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 border-t border-slate-800/60 bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
            Planos Transparentes e Previsíveis
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Sem surpresas no final do mês. Escolha o plano ideal para a fase do seu negócio.
          </p>

          {/* Toggle Anual / Mensal */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full border border-slate-800 bg-slate-900/70">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                !isAnnual ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                isAnnual ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Anual</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                -20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 border transition-all duration-300 relative flex flex-col justify-between ${
                plan.isPopular
                  ? 'border-indigo-500/60 bg-slate-900/80 shadow-2xl shadow-indigo-600/10 scale-105 z-10'
                  : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold tracking-wide uppercase shadow">
                  Mais Escolhido
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-slate-100">{plan.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{plan.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-100">{plan.price}</span>
                  <span className="text-slate-500 text-sm">{plan.period}</span>
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/60">
                <button
                  data-testid={`pricing-plan-${plan.name.toLowerCase()}-btn`}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
                    plan.isPopular
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                      : 'border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-200'
                  }`}
                >
                  Selecionar Plano
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
