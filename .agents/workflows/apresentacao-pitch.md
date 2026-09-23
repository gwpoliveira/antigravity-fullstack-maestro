# WORKFLOW: /apresentacao-pitch
> **Objetivo**: Gerar materiais executivos de alto nível para produtos, SaaS, plataformas e soluções governamentais: Pitch Decks (slides), One-Pagers executivos, Roteiros de Demonstração ao Vivo e Propostas Comerciais de Valor.

---

## 👥 SUBAGENTES E SKILLS ACIONADOS
- **Comandante**: `Maestro`
- **Executor Principal**: `subagent_marketing_pitch`
- **Skill Utilizada**: `marketing-pitch-showcase`
- **Validação Técnica**: `subagent_django_mysql`, `subagent_nextjs_frontend`, `subagent_security_guardian`

---

## 📋 ROTEIRO DE EXECUÇÃO EM 4 ETAPAS

### 1. Diagnóstico de Audiência & Posicionamento
- Identificar quem é o tomador de decisão:
  - **Setor Público / Governamental** (TRE, Prefeituras, Tribunais): Foco em legalidade, transparência, LGPD, soberania de dados e impacto ao cidadão.
  - **B2B SaaS / Empresas**: Foco em ROI, redução de custos operacionais, produtividade e tempo de resposta.
  - **Investidores / Diretoria C-Level**: Foco em visão estratégica, tração, métricas e escalabilidade.

### 2. Geração do Pitch Deck Executivo (`APRESENTACAO_EXECUTIVA.md`)
- Estrutura em 10 slides inspirada no modelo Guy Kawasaki adaptado:
  1. Capa & Proposta de Valor Magnética
  2. A Dor Real do Mercado / Órgão
  3. A Solução & Os 3 Superpoderes da Aplicação
  4. Demonstração Visual & Fluxo de Experiência
  5. Diferencial Tecnológico (Zero Docker, PWA Offline, Alta Performance)
  6. Métricas Reais de Impacto & Tração
  7. Segurança de Nível Militar (Selo Guardian / OWASP)
  8. Cronograma de Implementação Acelerada
  9. Retorno do Investimento (ROI) e Benefício Social
  10. Próximos Passos & Chamada para Ação (CTA)
- Cada slide inclui **Speaker Notes** detalhando exatamente o que o orador deve falar e o tempo sugerido.

### 3. Síntese em One-Pager Executivo (`ONE_PAGER.md`)
- Documento condensado em uma única lauda para envio via PDF, WhatsApp ou impressos em reuniões de diretoria.
- Estruturado com badges de status, tabela comparativa com métodos obsoletos e contatos de homologação.

### 4. Roteiro Cronometrado de Demonstração ao Vivo (`ROTEIRO_DEMO_AO_VIVO.md`)
- Roteiro minuto a minuto (15 minutos padrão) com instrução de onde clicar na tela, o que enfatizar e como responder às 3 objeções mais difíceis da banca.
