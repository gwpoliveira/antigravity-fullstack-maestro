---
name: security-seal-audit
description: Protocolo de auditoria de segurança de código, banco de dados e infraestrutura para concessão do Selo de Segurança em aplicações SaaS, E-commerce, Apps e Jogos Full Stack.
---

# Skill: Auditoria e Concessão do Selo de Segurança

Este skill guia o processo de verificação estática, dinâmica e de infraestrutura para garantir que uma aplicação atenda aos padrões máximos de cibersegurança antes do lançamento.

---

## 1. MATRIZ DE TESTES DE SEGURANÇA (OWASP TOP 10)

| Vulnerabilidade | Verificação Automatizada & Manual | Ação Corretiva Mandatória |
| :--- | :--- | :--- |
| **A01: Broken Access Control** | Testar IDOR em `/api/recurso/{id}` com outro usuário logado. | Filtrar queries com `request.user` ou `request.tenant`. |
| **A02: Cryptographic Failures** | Buscar senhas em texto puro ou algoritmos fracos (MD5/SHA1). | Implementar `argon2` no `PASSWORD_HASHERS` do Django. |
| **A03: Injection (SQL & Command)** | Verificar se há queries concatenando strings sem ORM. | Usar ORM nativo ou parâmetros seguros `%s`. |
| **A04: Insecure Design** | Verificar falta de rate limiting em login/checkout. | Habilitar `django-ratelimit` ou throttling do DRF/Ninja. |
| **A05: Security Misconfiguration** | Checar `DEBUG=True` e headers ausentes. | Garantir `DEBUG=False` e habilitar `django-cors-headers` restrito. |
| **A06: Vulnerable Dependencies** | Rodar `pip-audit` e `npm audit`. | Atualizar pacotes com CVEs conhecidos. |
| **A07: Identification & Auth** | Testar brute force e expiração de tokens JWT. | Tokens de curta duração (15 min) + Refresh com rotação. |
| **A08: Software & Data Integrity** | Verificar integridade de webhooks de pagamento. | Validar assinatura criptográfica de webhooks (HMAC SHA-256). |
| **A09: Logging & Monitoring** | Verificar se dados sensíveis (senhas, cartões) vão para logs. | Mascarar dados com middleware de sanitização de log. |
| **A10: SSRF** | Validar se o backend faz requisições a URLs fornecidas por usuários. | Lista branca estrita de domínios permitidos. |

---

## 2. SCRIPTS DE AUDITORIA RÁPIDA

No terminal do projeto:

```bash
# Auditoria de dependências Python
pip install pip-audit safety
pip-audit

# Auditoria de dependências Node/Next.js
npm audit --audit-level=high

# Checagem nativa de segurança do Django
python manage.py check --deploy
```

---

## 3. CHECKLIST DE CABEÇALHOS HTTP NO NGINX

O Nginx na VPS deve conter os seguintes cabeçalhos no bloco `server`:

```nginx
# Prevenção de Clickjacking
add_header X-Frame-Options "SAMEORIGIN" always;

# Prevenção de MIME Sniffing
add_header X-Content-Type-Options "nosniff" always;

# Proteção XSS antiga para browsers legados
add_header X-XSS-Protection "1; mode=block" always;

# Política de Referrer estrita
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

# Forçar HTTPS por 1 ano (HSTS)
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

# Content Security Policy (ajustável por aplicação)
add_header Content-Security-Policy "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;" always;
```
