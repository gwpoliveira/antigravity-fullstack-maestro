---
name: vps-nodocker-deploy
description: Runbook e procedimentos automatizados para provisionar, implantar e manter aplicações Django, Next.js e MySQL diretamente em VPS Linux (Ubuntu/Debian) usando Systemd, Nginx e PM2, sem utilização de Docker.
---

# Skill: VPS Deploy 100% Sem Docker (Bare-Metal Linux)

Este skill contém os procedimentos exatos, comandos e rotinas para deploy direto no sistema operacional da sua VPS.

---

## 1. PREPARAÇÃO DO SERVIDOR (UBUNTU / DEBIAN)

Execute uma única vez no servidor recém-criado:

```bash
# Atualização do sistema
sudo apt update && sudo apt upgrade -y

# Instalação dos pacotes essenciais
sudo apt install -y curl wget git build-essential ufw fail2ban certbot python3-certbot-nginx

# Instalação do Nginx
sudo apt install -y nginx

# Instalação do Python e dependências de compilação
sudo apt install -y python3 python3-pip python3-venv libmysqlclient-dev pkg-config

# Instalação do MySQL Server
sudo apt install -y mysql-server

# Instalação do Node.js (v20 LTS) e PM2
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

---

## 2. CONFIGURAÇÃO DO MYSQL NATIVO

```bash
# Executar segurança interativa inicial
sudo mysql_secure_installation

# Criar banco e usuário da aplicação
sudo mysql -u root -p <<EOF
CREATE DATABASE IF NOT EXISTS app_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'app_user'@'localhost' IDENTIFIED BY 'SUA_SENHA_MUITO_SEGURA';
GRANT ALL PRIVILEGES ON app_database.* TO 'app_user'@'localhost';
FLUSH PRIVILEGES;
EOF
```

---

## 3. DEPLOY DO BACKEND DJANGO (SYSTEMD + GUNICORN)

Estrutura de pastas recomendada: `/var/www/meu-app/`

```bash
# Criar diretório do projeto e permissões
sudo mkdir -p /var/www/meu-app
sudo chown -R $USER:www-data /var/www/meu-app

# Criar virtualenv e instalar pacotes
cd /var/www/meu-app/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn

# Coletar estáticos e rodar migrações
python manage.py migrate
python manage.py collectstatic --noinput
```

### Arquivo Systemd Socket: `/etc/systemd/system/gunicorn.socket`
```ini
[Unit]
Description=Gunicorn Socket for Django Application

[Socket]
ListenStream=/run/gunicorn.sock
SocketUser=www-data
SocketGroup=www-data
SocketMode=660

[Install]
WantedBy=sockets.target
```

### Arquivo Systemd Service: `/etc/systemd/system/gunicorn.service`
```ini
[Unit]
Description=Gunicorn Daemon for Django Application
Requires=gunicorn.socket
After=network.target

[Service]
User=ubuntu
Group=www-data
WorkingDirectory=/var/www/meu-app/backend
ExecStart=/var/www/meu-app/backend/venv/bin/gunicorn \
          --access-logfile /var/log/gunicorn-access.log \
          --error-logfile /var/log/gunicorn-error.log \
          --workers 3 \
          --bind unix:/run/gunicorn.sock \
          core.wsgi:application
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

Ativar e iniciar:
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now gunicorn.socket
sudo systemctl enable --now gunicorn.service
```

---

## 4. DEPLOY DO FRONTEND NEXT.JS COM PM2

No diretório `/var/www/meu-app/frontend`:

```bash
cd /var/www/meu-app/frontend
npm ci
npm run build
```

### Arquivo `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [
    {
      name: 'nextjs-app',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      cwd: '/var/www/meu-app/frontend',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      max_memory_restart: '512M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
```

Iniciar com PM2:
```bash
pm2 start ecosystem.config.js --env production
pm2 startup systemd
pm2 save
```

---

## 5. NGINX REVERSE PROXY & CERTIFICADO SSL

Arquivo: `/etc/nginx/sites-available/meu-app.conf`

```nginx
server {
    server_name seu-dominio.com.br www.seu-dominio.com.br;

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Arquivos estáticos e de mídia do Django
    location /static/ {
        alias /var/www/meu-app/backend/staticfiles/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    location /media/ {
        alias /var/www/meu-app/backend/media/;
        expires 30d;
    }

    # API Django e Django Admin via Unix Socket
    location ~ ^/(api|admin)/ {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://unix:/run/gunicorn.sock;
    }

    # Frontend Next.js (SSR / Páginas)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Ativar site e gerar certificado SSL automático:
```bash
sudo ln -s /etc/nginx/sites-available/meu-app.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d seu-dominio.com.br -d www.seu-dominio.com.br
```

---

## 6. ROTINA DE ZERO-DOWNTIME RELOAD (ATUALIZAÇÃO DE CÓDIGO)

Crie um script `/var/www/meu-app/deploy.sh`:

```bash
#!/bin/bash
set -e
echo ">>> Iniciando Deploy Zero-Downtime..."

# Atualizar repositório
git pull origin main

# Backend
source /var/www/meu-app/backend/venv/bin/activate
pip install -r /var/www/meu-app/backend/requirements.txt
python /var/www/meu-app/backend/manage.py migrate
python /var/www/meu-app/backend/manage.py collectstatic --noinput
sudo systemctl reload gunicorn

# Frontend
cd /var/www/meu-app/frontend
npm ci
npm run build
pm2 reload ecosystem.config.js --env production

echo ">>> Deploy Concluído com Sucesso!"
```
