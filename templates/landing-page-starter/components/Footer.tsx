import React from 'react';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-slate-800/80 bg-slate-950 text-slate-500 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            M
          </span>
          <span className="font-semibold text-slate-300">Antigravity Maestro</span>
        </div>

        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} Desenvolvido com Antigravity Full Stack Maestro. Distribuído sob licença MIT.
        </p>

        <div className="flex items-center gap-6 text-slate-400">
          <a href="#features" className="hover:text-indigo-400 transition-colors">Recursos</a>
          <a href="#pricing" className="hover:text-indigo-400 transition-colors">Preços</a>
          <a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a>
        </div>
      </div>
    </footer>
  );
}
