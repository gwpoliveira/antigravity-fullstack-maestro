# WORKFLOW: /deploy-vps
> **Objetivo**: Gerar todos os arquivos de configuração de infraestrutura de alta performance para deploy direto em VPS Linux (Ubuntu/Debian) com Systemd, Gunicorn via Unix Socket, PM2 para Next.js, Nginx com SSL e MySQL nativo (100% sem Docker).

---

## 👥 SUBAGENTE E SKILL ACIONADOS
- **Sysadmin Chefe**: `subagent_vps_nodocker`
- **Skill Oficial**: `vps-nodocker-deploy`
- **Orquestrador**: `Maestro`

---

## 📋 ARTEFATOS ENTREGUES PELO WORKFLOW

1. **Arquivo Nginx (`/etc/nginx/sites-available/meu-app`)**:
   - Proxy reverso direcionando `/` para PM2 (`http://127.0.0.1:3000`).
   - Proxy reverso direcionando `/api/` e `/admin/` para socket Unix do Gunicorn (`unix:/run/gunicorn.sock`).
   - Servimento direto de arquivos estáticos (`/static/` e `/media/`) com cache headers.
2. **Serviço e Socket Systemd (`/etc/systemd/system/gunicorn.service` & `.socket`)**:
   - Execução do backend em ambiente virtual Python com reinício automático (`Restart=always`).
3. **Configuração PM2 (`ecosystem.config.js`)**:
   - Cluster mode para o Next.js, limite de memória e inicialização no boot.
4. **Script de Backup Diário do MySQL (`/var/scripts/backup-mysql.sh`)**:
   - Dump compactado com `mysqldump` + `gzip` agendado no cron para 03:00 com retenção de 7 dias.
5. **Comandos de Execução Rápida**:
   - Roteiro passo a passo para colar no terminal SSH do servidor.
