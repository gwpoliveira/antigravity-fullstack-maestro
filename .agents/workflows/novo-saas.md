# WORKFLOW: /novo-saas
> **Objetivo**: Inicializar um ecossistema SaaS Multi-tenant completo, com backend em Python Django, MySQL otimizado sem N+1, frontend em Next.js App Router com Dashboard executivo e isolamento absoluto de dados.

---

## 👥 SUBAGENTES E SKILLS ACIONADOS
- **Comandante**: `Maestro`
- **Backend & Dados**: `subagent_django_mysql` (Skill: `django-mysql-saas`)
- **Frontend & Dashboard**: `subagent_nextjs_frontend` (Skill: `premium-ui-system`)
- **Validador de Qualidade**: `subagent_qa_testing` (Skill: `qa-automated-testing`)
- **Inspetor de Segurança**: `subagent_security_guardian` (Skill: `security-seal-audit`)
- **Sysadmin**: `subagent_vps_nodocker` (Skill: `vps-nodocker-deploy`)

---

## 📋 ROTEIRO DE CONSTRUÇÃO

### 1. Modelagem do Core Multi-tenant (Django & MySQL)
- Criação da entidade `Tenant` com slug único e status ativo.
- Criação da classe abstrata `TenantBaseModel` e do manager `TenantManager` para filtragem automática por tenant.
- Configuração de autenticação JWT segura com cookies `HttpOnly` e rotação de refresh token.
- Configuração de índices compostos em tabelas críticas (`tenant`, `status`, `created_at`).

### 2. Dashboard Executivo do SaaS (Next.js)
- Layout com Sidebar retrátil e seletor de organização/tenant no rodapé.
- Cards de KPIs com estatísticas percentuais e comparativos mensais.
- Tabela de dados com paginação, filtros de status e busca instantânea com debounce.
- Dark mode Obsidian padrão com micro-interações refinadas.

### 3. Handoff de Qualidade & Testes (QA)
- Criação de testes com `pytest-django` validando que um usuário do Tenant A recebe 404 estrito ao tentar acessar registros do Tenant B.
- Criação de testes E2E com Playwright cobrindo login, navegação de métricas e logout.

### 4. Auditoria do Selo de Segurança (Guardian)
- Varredura de credenciais e segredos em `.env`.
- Verificação de proteção CSRF, sanitização XSS e ausência de SQL Injection.
- Emissão formal do Selo de Segurança.
