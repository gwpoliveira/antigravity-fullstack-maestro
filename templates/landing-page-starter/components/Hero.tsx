import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 text-center">
      {/* Background Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge Superior */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-8">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Versão 2.0 Disponível: Experimente Gratuitamente</span>
        </div>

        {/* H1 Principal com Palavra-Chave */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 max-w-4xl mx-auto leading-tight">
          Acelere seu Desenvolvimento com <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">Agentes Inteligentes</span>
        </h1>

        {/* Subtítulo Descritivo */}
        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Orquestração autônoma de ponta a ponta: do backend Django e MySQL de alta performance até interfaces Next.js ultra-refinadas com deploy em VPS sem Docker.
        </p>

        {/* Bloco de CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#pricing"
            data-testid="hero-primary-cta"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base shadow-lg shadow-indigo-600/30 transition-all duration-200 active:scale-95"
          >
            Começar Agora Gratuitamente
          </a>
          <a
            href="#features"
            data-testid="hero-secondary-cta"
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-300 font-medium text-base transition-all duration-200"
          >
            Ver Recursos & Demonstração
          </a>
        </div>

        {/* Mockup da Aplicação com Priority para LCP */}
        <div className="mt-16 relative rounded-2xl border border-slate-800 bg-slate-900/60 p-2 shadow-2xl backdrop-blur-xl">
          <div className="rounded-xl overflow-hidden bg-slate-950 aspect-[16/9] relative flex items-center justify-center border border-slate-800/80">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <p className="text-slate-300 font-semibold text-lg">Interface Executiva de Alta Velocidade</p>
              <p className="text-slate-500 text-sm mt-1">Lighthouse 100/100 • Zero CLS • Resposta em 30ms</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
