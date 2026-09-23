# WORKFLOW: /novo-documento-orcamento
> **Objetivo**: Elaborar documentos profissionais de alta precisão: Propostas Comerciais, Orçamentos Detalhados de Software, Especificações de Projeto (TAP/EAP), Relatórios Técnicos/Executivos e Artigos Acadêmicos nos padrões ABNT/IEEE.

---

## 👥 SUBAGENTES E SKILLS ACIONADOS
- **Comandante**: `Maestro`
- **Executor Principal**: `subagent_docs_reports`
- **Skill Utilizada**: `docs-reports-pro`
- **Alinhamento Técnico**: `subagent_django_mysql`, `subagent_nextjs_frontend`, `subagent_vps_nodocker`, `subagent_security_guardian`

---

## 📋 FLUXO DE ELABORAÇÃO EM 4 PASSOS

### 1. Definição do Tipo de Documento
O usuário ou o Maestro define o artefato requerido:
- **Tipo A**: Orçamento Comercial & Proposta Técnica de Software.
- **Tipo B**: Termo de Abertura de Projeto (TAP) e Especificação de Requisitos.
- **Tipo C**: Relatório Executivo / Auditoria Técnica / Análise Post-Mortem.
- **Tipo D**: Artigo Científico / Trabalho Acadêmico (ABNT ou IEEE).

### 2. Levantamento de Parâmetros Críticos
- Identificação dos dados de entrada:
  - Entidades e modelos envolvidos.
  - Horas estimadas por squad/especialista.
  - Valores de hora ou marcos de entrega (Milestones).
  - Prazos e critérios de homologação e garantia.
  - Normas específicas (ex: ABNT NBR 10520 para citações, NBR 6023 para referências).

### 3. Redação Estruturada e Formatação de Elite
- Aplicação de tabelas Markdown detalhadas (breakdown financeiro, matriz de escopo e riscos).
- Inclusão de seções contratuais essenciais: Fora de Escopo, Validade, Condições de Pagamento e SLA.
- Aplicação de caixas semânticas GitHub (`[!NOTE]`, `[!IMPORTANT]`, `[!WARNING]`).

### 4. Revisão pelo Maestro & Conclusão
- O Maestro valida se o documento atende às metas técnicas e comerciais antes da entrega final ao usuário.
