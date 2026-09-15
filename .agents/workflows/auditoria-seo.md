# WORKFLOW: /auditoria-seo
> **Objetivo**: Auditar todas as páginas frontend para garantir 100/100 no Google Lighthouse em SEO e Core Web Vitals, com validação de Schema.org, sitemaps e Open Graph.

---

## 👥 SUBAGENTE E SKILL ACIONADOS
- **Líder de Frontend & SEO**: `subagent_nextjs_frontend`
- **Skill Oficial**: `nextjs-seo-master`
- **Orquestrador**: `Maestro`

---

## 📋 PONTOS DE VERIFICAÇÃO EXECUTADOS

1. **Validação de Schema.org (JSON-LD)**:
   - Presença de dados estruturados válidos (`SoftwareApplication`, `Organization`, `Product`, `FAQPage`).
   - Teste de sintaxe JSON sem erros de parsing.
2. **Auditoria de Core Web Vitals**:
   - **LCP (< 2.5s)**: Imagens de topo com `priority` e fontes gerenciadas por `next/font/google`.
   - **CLS (0.00)**: Imagens com dimensões explícitas e ausência de saltos visuais.
   - **INP (< 200ms)**: Interatividade reativa sem travamento de thread principal.
3. **Indexação & Rastreabilidade**:
   - `sitemap.ts` acessível em `/sitemap.xml` com links canônicos corretos.
   - `robots.ts` acessível em `/robots.txt` permitindo indexação e bloqueando áreas restritas (`/admin/`, `/api/`).
4. **Semântica HTML5**:
   - Exatamente um único `<h1>` por página.
   - Todos os botões e links com textos claros ou atributos `aria-label`.
   - Todas as imagens com texto alternativo `alt` relevante.
