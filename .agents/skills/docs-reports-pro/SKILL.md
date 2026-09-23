---
name: docs-reports-pro
description: Elabora relatórios executivos e técnicos, orçamentos profissionais detalhados, projetos de engenharia/software (TAP, EAP, Memoriais Descritivos) e documentos acadêmicos nos padrões ABNT/IEEE. Use quando o usuário pedir para gerar relatórios, propostas de orçamento, especificação de projetos, artigos acadêmicos, contratos de escopo ou documentações formais de alta precisão.
---

# DOCS, REPORTS & PROFESSIONAL WRITING (ENGENHARIA DOCUMENTAL)

Habilidade especializada em estruturação, redação técnica e formatação de documentos profissionais, corporativos, orçamentários e acadêmicos com o mais alto rigor metodológico, clareza e padrão visual.

---

## 1. ARQUITETURA DE DOCUMENTOS PROFISSIONAIS & ORÇAMENTOS

### A. Proposta Comercial & Orçamento Detalhado de Software
Todo orçamento técnico gerado pelo ecossistema deve conter:
1. **Identificação e Validade**: Dados do cliente, emissor, data e prazo de validade da proposta (padrão: 15 ou 30 dias).
2. **Entendimento da Demanda**: Resumo executivo do problema e objetivo da solução.
3. **Escopo Detalhado (Incluso vs Não Incluso)**:
   - Divisão em módulos funcionais (ex: Autenticação, Painel Admin, Módulo PWA, Integração de Pagamento, etc.).
   - Lista explícita de itens *Fora de Escopo* para evitar scope creep.
4. **Composição de Custos e Horas (Breakdown Financeiro)**:
   - Tabela com fases/módulos, estimativa de horas (Desenvolvimento, Design UX/UI, QA, Sysadmin).
   - Valor/hora ou valor fechado por marco de entrega (Milestones).
5. **Custos Operacionais Recorrentes Estimados**:
   - Hospedagem VPS (estimativa mensal), domínios, licenças, APIs pagas e banco de dados.
6. **Cronograma de Entregas & Milestones**:
   - Fase 1: Setup & Arquitetura (Semana X)
   - Fase 2: Core Features & Testes (Semana Y)
   - Fase 3: Homologação, Selo de Segurança e Go-Live (Semana Z)
7. **Condições de Pagamento & Garantia**:
   - Parcelamento (ex: 30% entrada, 40% homologação, 30% entrega final).
   - Período de garantia e correção de bugs (padrão: 60 ou 90 dias).

### B. Projeto Técnico & Termo de Abertura de Projeto (TAP / Project Charter)
1. **Justificativa e Alinhamento Estratégico**: Por que este projeto é necessário e qual o ROI esperado.
2. **Critérios de Sucesso**: Indicadores chave de performance (KPIs) mensuráveis.
3. **Estrutura Analítica do Projeto (EAP / WBS)**: Decomposição hierárquica das entregas.
4. **Matriz de Riscos & Mitigações**:
   - Risco identificado | Probabilidade | Impacto | Ação Preventiva | Ação de Contingência.
5. **Stakeholders e Matriz RACI**:
   - Responsável (R), Aprovador (A), Consultado (C), Informado (I).

---

## 2. RELATÓRIOS TÉCNICOS & EXECUTIVOS

### A. Relatório de Auditoria e Diagnóstico de Sistema
- **Sumário Executivo**: Visão geral para diretoria em 1 parágrafo com status consolidado (Verde / Amarelo / Vermelho).
- **Metodologia de Inspeção**: Ferramentas e protocolos aplicados (SAST, DAST, benchmarks de concorrência, profiling de banco).
- **Achados e Vulnerabilidades Classificadas**:
  - Tabela: [ID] | [Componente] | [Severidade: Crítica/Alta/Média/Baixa] | [Impacto] | [Solução Recomendada].
- **Plano de Ação Corretiva**: Matriz de esforço vs. impacto para priorização imediata.

### B. Relatório Post-Mortem de Incidentes (Root Cause Analysis - RCA)
- **Linha do Tempo (Timeline)**: Horário exato de detecção, contenção, mitigação e resolução total.
- **Causa Raiz (Os 5 Porquês)**: Investigação causal profunda sem culpar indivíduos.
- **Impacto no Negócio**: Tempo de indisponibilidade (downtime), usuários afetados e perdas financeiras/operacionais.
- **Ações Preventivas Definitivas**: Tasks cadastradas para impedir reincidência.

---

## 3. PADRÃO ACADÊMICO & CIENTÍFICO (ABNT / IEEE)

### Estrutura Formal de Artigos e Relatórios Científicos:
1. **Cabeçalho**: Título claro e conciso, autores, afiliação institucional e e-mails de contato.
2. **Resumo / Abstract**: 150 a 250 palavras sintetizando contexto, objetivo, metodologia, resultados principais e conclusão.
3. **Palavras-chave / Keywords**: 3 a 5 termos canônicos separados por ponto e vírgula.
4. **Introdução**: Contextualização do problema, lacuna na literatura e objetivo do trabalho.
5. **Revisão da Literatura / Trabalhos Relacionados**: Estado da arte com citações no formato ABNT (SOBRENOME, Ano) ou IEEE [1].
6. **Metodologia / Arquitetura Proposta**: Detalhamento reprodutível de algoritmos, fluxos e instrumentos.
7. **Resultados e Discussão**: Tabelas comparativas, gráficos e análise crítica dos dados obtidos.
8. **Conclusões & Trabalhos Futuros**: Síntese das contribuições e próximos passos de pesquisa.
9. **Referências**: Lista padronizada rigorosamente de acordo com as normas eleitas.

---

## 4. CHECKLIST DE FORMATAÇÃO E TIPOGRAFIA DE ELITE

Ao produzir qualquer documento com esta skill:
- [ ] **Hierarquia Clara de Títulos**: Uso estrito de `#`, `##`, `###` sem pular níveis de cabeçalho.
- [ ] **Tabelas Normalizadas**: Colunas alinhadas, cabeçalhos destacados e formatação numérica uniforme (ex: `R$ 1.500,00`).
- [ ] **Caixas de Destaque Semânticas**:
  - `> [!NOTE]` para notas complementares e premissas.
  - `> [!IMPORTANT]` para cláusulas mandatórias, prazos fatais e responsabilidades.
  - `> [!WARNING]` para riscos contratuais ou limites de escopo.
- [ ] **Sumário Executivo Inicial (TOC)**: Para documentos acima de 3 páginas, incluir índice com links ancorados.
- [ ] **Prontidão para Impressão / PDF**: Evitar blocos de texto maciços sem respiro, usar quebras lógicas e paginação limpa.
