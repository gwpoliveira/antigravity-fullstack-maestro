# WORKFLOW: /nova-landing-page
> **Objetivo**: Criar uma Landing Page completa de altíssima conversão, visual Obsidian/Neon premium, 100/100 no Google Lighthouse e dados estruturados Schema.org para ranqueamento imediato.

---

## 👥 SUBAGENTES E SKILLS ACIONADOS
- **Comandante**: `Maestro`
- **Executor Principal**: `subagent_nextjs_frontend`
- **Skills Utilizadas**: `premium-ui-system`, `nextjs-seo-master`
- **Validador de Qualidade**: `subagent_qa_testing` (Skill: `qa-automated-testing`)
- **Inspetor de Segurança**: `subagent_security_guardian` (Skill: `security-seal-audit`)

---

## 📋 ROTEIRO DE CONSTRUÇÃO EM 6 SEÇÕES

### 1. Header & Glassmorphism
- Barra superior fixa (`sticky top-0 z-50`) com efeito `backdrop-blur-md` e fundo translúcido `rgba(11, 15, 23, 0.8)`.
- Logotipo com detalhe em gradiente indigo/violeta.
- Links de navegação ancorados: `#features`, `#pricing`, `#faq`.
- Botão de CTA primário: "Começar Agora" com hover glow suave.

### 2. Hero Section Magnética (Foco em LCP < 2.5s)
- **Badge Superior**: *"✨ Lançamento Oficial: Nova Versão Disponível"*.
- **Título `H1` Único**: Proposta de valor clara, objetiva e focada na dor principal do cliente.
- **Subtítulo `P`**: 2 linhas explicando o diferencial do produto com contraste de texto suave (`#94A3B8`).
- **CTA Duplo**:
  - Botão Primário: "Criar Conta Gratuita" (fundo vibrante `#6366F1`, ícone de seta).
  - Botão Secundário: "Ver Demonstração" (contorno translúcido com ícone de play).
- **Mockup / Preview**: Imagem otimizada com `next/image` e atributo `priority` mandatório para eliminar atraso de LCP.

### 3. Prova Social Imediata
- Faixa com métricas de impacto (ex: *"Mais de 50.000 requisições processadas"*, *"99.9% de uptime garantido"*).
- Grade de logos de clientes parceiros em escala de cinza com opacidade 60%.

### 4. Grade de Recursos (Bento Grid Modular)
- Layout assimétrico com cartões de diferentes proporções.
- Cartão 1 (Destaque Grande): Visual com gráfico interativo ou animação suave.
- Cartão 2 & 3 (Médios): Ícones Lucide, títulos diretos e micro-descrições.
- Cartão 4 (Largo): Foco em velocidade, segurança ou integração.

### 5. Tabela de Preços (Pricing Cards) com Toggle
- Seletor de cobrança: **Mensal** / **Anual (Economize 20%)**.
- 3 Planos claros: *Starter*, *Pro (Mais Escolhido / Destaque com Borda Gradiente)* e *Enterprise*.
- Lista de recursos com ícones de check verde esmeralda (`#10B981`).

### 6. FAQ Interativo com Schema.org JSON-LD
- Accordion expansível sem travamento de renderização.
- Injeção obrigatória do componente `<JsonLd data={faqSchema} />` contendo o schema `FAQPage` para garantir rich snippets no Google.

---

## 🔒 AUDITORIA MANDATÓRIA ANTES DA ENTREGA
- [ ] Pontuação no Google Lighthouse: SEO = 100 e Performance > 90.
- [ ] Arquivos `app/sitemap.ts` e `app/robots.ts` presentes.
- [ ] Atributos `data-testid` presentes em todos os botões de ação para testes E2E.
- [ ] Zero erros de hidratação ou links quebrados.
