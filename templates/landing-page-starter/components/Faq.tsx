'use client';

import React, { useState } from 'react';
import JsonLd from './JsonLd';

export default function Faq() {
  const faqs = [
    {
      q: 'O que é o Ecossistema Maestro para Antigravity?',
      a: 'É um conjunto orquestrado de 6 subagentes inteligentes especializados em desenvolvimento Full Stack (Python Django, Next.js, MySQL, QA, Segurança e Deploy VPS sem Docker).',
    },
    {
      q: 'Como funciona o deploy em VPS sem Docker?',
      a: 'A aplicação roda nativamente no Linux Ubuntu/Debian utilizando Gunicorn gerenciado pelo Systemd conectado via Unix Socket ao Nginx, com o Next.js orquestrado pelo PM2 e MySQL nativo. Isso proporciona máxima performance e menor consumo de RAM.',
    },
    {
      q: 'O que garante o Selo de Segurança?',
      a: 'O Selo de Segurança é emitido pelo Subagente Guardian após varredura estática que certifica conformidade com a OWASP Top 10, proteção de segredos, cookies seguros e cabeçalhos de defesa HTTP.',
    },
    {
      q: 'A landing page já vem pronta para ranquear no Google?',
      a: 'Sim! Ela já inclui dados estruturados Schema.org (JSON-LD), sitemap.ts, robots.ts e arquitetura calibrada para 100/100 nos Core Web Vitals do Google Lighthouse.',
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  // Schema.org para Rich Snippets no Google
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <section id="faq" className="py-24 border-t border-slate-800/60">
      {/* Schema.org Injetado no HTML para o Google */}
      <JsonLd data={faqSchema} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Tire suas dúvidas técnicas sobre a arquitetura e funcionamento do ecossistema.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-900/80 transition-colors"
                >
                  <span className="font-semibold text-slate-200 text-base sm:text-lg">
                    {faq.q}
                  </span>
                  <span className="text-indigo-400 font-bold text-xl">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-slate-400 text-sm sm:text-base leading-relaxed border-t border-slate-800/40 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
