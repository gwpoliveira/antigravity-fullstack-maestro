# ECOSSISTEMA DE AGENTES ESPECIALISTAS & MAESTRO (TECH LEAD)
> **Arquitetura Multi-Agente Corporativa para Antigravity IDE / Gemini CLI**

---

## 1. VISÃO GERAL DO ECOSSISTEMA

O ecossistema opera sob uma hierarquia de engenharia de software de padrão internacional. O **MAESTRO** atua como Tech Lead e Arquiteto-Chefe, orquestrando 6 subagentes especialistas e suas respectivas skills dedicadas:

```
                  ┌──────────────────────────────────────────┐
                  │    MAESTRO (Agente Orquestrador & TL)    │
                  └─────────────────────┬────────────────────┘
                                        │
        ┌───────────────┬───────────────┴───────────────┬───────────────┐
        ▼               ▼               ▼               ▼               ▼
 ┌──────────────┐┌──────────────┐ ┌──────────────┐ ┌──────────────┐┌──────────────┐
 │   DJANGO     ││   NEXT.JS    │ │ APPS/GAMES   │ │     QA       ││  GUARDIAN    │
 │   & MYSQL    ││   & REACT    │ │ SPECIALIST   │ │  & TESTES    ││ (SEGURANÇA)  │
 └──────┬───────┘└──────┬───────┘ └──────┬───────┘ └──────┬───────┘└──────┬───────┘
        │               │                │                │               │
        └───────────────┴────────────────┼────────────────┴───────────────┘
                                         ▼
                        ┌──────────────────────────────┐
                        │   VPS BARE-METAL SYSADMIN    │
                        │    (Deploy 100% Sem Docker)  │
                        └──────────────────────────────┘
```

---

## 2. DIRETRIZES FUNDAMENTAIS DO ECOSSISTEMA

### Regra 1: Selo de Segurana Inegociável (Security by Design)
- Nenhuma funcionalidade é concluída sem passar pelo crivo do **Guardian**.
- Proteção nativa contra: SQL Injection, Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), Broken Authentication, Mass Assignment e Vazamento de Segredos.
- Nenhuma credencial em código limpo. Uso estrito de variáveis de ambiente (`.env`).
- Script automatizado obrigatório: `templates/security/audit_seal.py` aprovado sem ressalvas.

### Regra 2: Qualidade Visual e UX Premium
- Nada de layouts genéricos, tipografias padrão de navegador ou cores primárias saturadas.
- Paletas calibradas, modo escuro sofisticado, tipografias modernas (Inter, Outfit, Plus Jakarta Sans), micro-interações elegantes e responsividade impecável.

### Regra 3: Infraestrutura VPS sem Docker (Bare-Metal Linux)
- A infraestrutura opera diretamente nos serviços nativos do Linux (Ubuntu/Debian):
  - **Reverse Proxy & SSL**: Nginx otimizado com HTTP/2, Gzip/Brotli, cache estático e Certbot.
  - **Backend Python/Django**: Gunicorn rodando como daemon gerenciado pelo `systemd` via Unix Socket.
  - **Frontend Next.js**: Build de produção (`next build`) orquestrado pelo `PM2` em cluster mode.
  - **Banco de Dados**: MySQL Server instalado nativamente no host (Zero Docker), com pool de conexões e rotinas diárias de backup (`mysqldump`).
  - **Segurança de Servidor**: UFW firewall ativo (portas 22, 80, 443 liberadas apenas) e Fail2ban protegendo SSH.

### Regra 4: Testes Automatizados Mandatórios
- Backend: Suíte de testes com `pytest-django`, cobrindo modelos, views/endpoints, autenticação e isolamento multi-tenant.
- Frontend: Testes de componentes com Vitest/Testing Library e testes críticos E2E com Playwright. Cobertura mínima de 85%.

---

## 3. CATÁLOGO DE SUBAGENTES & SKILLS VINCULADAS

| Subagente | Arquivo de Definição | Skill Dedicada | Especialidade Principal |
| :--- | :--- | :--- | :--- |
| **Maestro** | [MAESTRO.md](file:///.agents/orchestrator/MAESTRO.md) | `maestro-orchestrator` | Orquestração, planejamento, decomposição de tarefas e garantia de entrega. |
| **Django & MySQL** | [subagent_django_mysql.md](file:///.agents/subagents/subagent_django_mysql.md) | [`django-mysql-saas`](file:///.agents/skills/django-mysql-saas/SKILL.md) | Python, Django, DRF/Ninja, Multi-tenancy, transações atômicas e Celery. |
| **Next.js & Frontend** | [subagent_nextjs_frontend.md](file:///.agents/subagents/subagent_nextjs_frontend.md) | [`premium-ui-system`](file:///.agents/skills/premium-ui-system/SKILL.md), [`nextjs-seo-master`](file:///.agents/skills/nextjs-seo-master/SKILL.md) | Next.js App Router, React, Design Obsidian, Schema.org e SEO no topo do Google. |
| **Apps & Games** | [subagent_apps_games.md](file:///.agents/subagents/subagent_apps_games.md) | [`game-canvas-pwa`](file:///.agents/skills/game-canvas-pwa/SKILL.md) | PWAs 100% offline, Canvas 2D, PixiJS, Three.js, Game Loops e Gamificação. |
| **Guardian (Segurança)** | [subagent_security_guardian.md](file:///.agents/subagents/subagent_security_guardian.md) | [`security-seal-audit`](file:///.agents/skills/security-seal-audit/SKILL.md) | Auditoria de segurança OWASP Top 10, sanitização e Selo de Segurança. |
| **QA & Testes** | [subagent_qa_testing.md](file:///.agents/subagents/subagent_qa_testing.md) | [`qa-automated-testing`](file:///.agents/skills/qa-automated-testing/SKILL.md) | Pytest-Django, FactoryBoy, testes cross-tenant e Playwright E2E. |
| **VPS Sysadmin** | [subagent_vps_nodocker.md](file:///.agents/subagents/subagent_vps_nodocker.md) | [`vps-nodocker-deploy`](file:///.agents/skills/vps-nodocker-deploy/SKILL.md) | Nginx, Systemd, Gunicorn, PM2, MySQL nativo, SSL e automação de VPS. |

---

## 4. FLUXO DE TRABALHO & PROTOCOLO DE HANDOFF

1. **Recepção e Diagnóstico (Maestro)**:
   - O Maestro analisa a demanda, decompõe em pacotes técnicos e aciona os especialistas.
2. **Construção do Core (Django & Next.js)**:
   - **Handoff Backend -> Frontend**: Django exporta schemas das entidades para o Next.js integrar sem descompasso.
3. **Validação de Qualidade (QA)**:
   - **Handoff Frontend -> QA**: Next.js fornece seletores `data-testid` em botões e formulários críticos para a suíte E2E do Playwright.
4. **Inspeção de Segurança (Guardian)**:
   - **Handoff QA -> Guardian**: Com os testes passando (85%+ cobertura), o Guardian roda o script SAST e emite o Selo de Segurança.
5. **Preparação para Produção (VPS Sysadmin)**:
   - **Handoff Guardian -> Sysadmin**: Com o Selo aprovado, o Sysadmin gera os arquivos de configuração prontos para a VPS sem Docker.

---

## 5. PROTOCOLO DE REJEIÇÃO AUTOMÁTICA & ROLLBACK (CIRCUITO FECHADO)

Se um portão de qualidade falhar, o pipeline não é forçado:
- **Falha em QA**: Gera um ticket de rejeição técnico com arquivo e linha com erro, retornando para correção no Backend ou Frontend.
- **Falha de Segurança**: O script `audit_seal.py` retorna código de saída `1` e bloqueia o Sysadmin de gerar scripts de deploy até a sanitização completa de segredos ou riscos OWASP.

---

## 6. O LEDGER DE ESTADO DO PROJETO (`.agents/PROJECT_STATE.md`)

Todo projeto gerenciado pelo ecossistema mantém um arquivo de registro vivo (`.agents/PROJECT_STATE.md`) que rastreia:
- Status de cada Quality Gate (Django, Next.js, QA, Guardian, VPS).
- Histórico de iterações e correções.
- Mapa de arquivos gerados por camada.
