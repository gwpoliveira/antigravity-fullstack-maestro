---
name: premium-ui-system
description: Sistema de design, tokens de estilização, componentes e padrões visuais de altíssimo nível para criação de interfaces modernas, landing pages de alta conversão, dashboards SaaS e e-commerces em React e Next.js.
---

# Skill: Premium UI & High-Conversion Design System

Este skill padroniza os conceitos de design visual de nível internacional para evitar telas genéricas e criar interfaces elegantes, funcionais e com alta taxa de retenção.

---

## 1. PALETA DE CORES "OBSIDIAN & NEON" (DARK MODE REFINADO)

Evite o preto puro `#000000` em toda a interface; utilize camadas de profundidade:

- **Fundo Primário (Deep Slate)**: `#0B0F17` (profundo e confortável aos olhos).
- **Superfície dos Cards (Card Surface)**: `#111827` com borda `1px solid rgba(255, 255, 255, 0.07)`.
- **Superfície Elevada (Hover/Dropdowns)**: `#1E293B`.
- **Acento Primário (Electric Indigo)**: `#6366F1` (ativo) / `#4F46E5` (hover).
- **Acento de Sucesso (Emerald Glow)**: `#10B981`.
- **Acento de Atenção (Amber Warm)**: `#F59E0B`.
- **Texto Principal**: `#F8FAFC` (branco suave, nunca branco ofuscante).
- **Texto Secundário**: `#94A3B8` (legibilidade com contraste aprovado WCAG AA).

---

## 2. ANATOMIA DE UMA LANDING PAGE DE ALTA CONVERSÃO

1. **Header Fixo / Glassmorphism**:
   - Logo sutil, links essenciais e botão de CTA com destaque visual (`backdrop-filter: blur(12px)`).
2. **Hero Section de Impacto**:
   - Badge superior interativo (ex: *"✨ Novo: Versão 2.0 disponível"*).
   - Título (`H1`) poderoso focado no benefício principal e dor do cliente.
   - Subtítulo explicativo direto ao ponto.
   - Bloco de CTA duplo: Botão primário com preenchimento vibrante + Botão secundário "Ver Demonstração" com contorno e ícone.
   - Mockup visual / Vídeo preview da aplicação com moldura translúcida e sombra projetada suave.
3. **Prova Social Imediata**:
   - Métricas em tempo real (ex: *"Mais de 10.000 transações processadas"*, logos de clientes em escala de cinza com opacidade 60%).
4. **Grade de Funcionalidades (Bento Grid)**:
   - Layout modular em cartões de tamanhos variados destacando features com ícones, mini-demonstrações e micro-animações.
5. **Tabela de Preços Transparente (Pricing Cards)**:
   - Destaque no plano mais popular com borda em gradiente e badge "Mais Escolhido".
   - Toggle Mensal / Anual (com desconto visível, ex: *"Economize 20%"*).
6. **FAQ Expansível (Accordion)** e **Rodapé Completo**.

---

## 3. PADRÕES DE SAAS DASHBOARD

- **Sidebar de Navegação**:
  - Ícones consistentes (Lucide Icons).
  - Indicador ativo com barra lateral colorida e fundo suave.
  - Perfil do usuário e alternador de organização/tenant no rodapé da barra.
- **Cards de Métricas (KPIs)**:
  - Valor principal grande e legível.
  - Indicador de tendência (ex: badge verde `+14.2% vs mês anterior`).
  - Mini-gráfico de linha ou sparkline indicativo.
- **Tabelas de Dados Avançadas**:
  - Filtros rápidos por status.
  - Campo de busca instantâneo com debounce.
  - Ações em linha (editar, deletar, visualizar) em menu suspenso ou botões discretos.
  - Estados vazios (*Empty States*) ilustrados e com ação recomendada clara.
