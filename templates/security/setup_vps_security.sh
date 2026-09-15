#!/bin/bash
# ==============================================================================
# SCRIPT DE HARDENING & SEGURANÇA BARE-METAL PARA VPS UBUNTU/DEBIAN
# Executa a blindagem do servidor sem utilização de Docker.
# ==============================================================================

set -e

if [ "$EUID" -ne 0 ]; then
  echo "[-] Este script deve ser executado como root (sudo)."
  exit 1
fi

echo "[+] 1. Configurando Firewall UFW..."
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp comment 'SSH seguro'
ufw allow 80/tcp comment 'Nginx HTTP'
ufw allow 443/tcp comment 'Nginx HTTPS'
# Ativa sem prompt
ufw --force enable
echo "[✓] Firewall UFW ativado com sucesso!"

echo "[+] 2. Configurando Fail2Ban contra ataques de força bruta..."
cat << 'EOF' > /etc/fail2ban/jail.local
[DEFAULT]
bantime = 1h
findtime = 10m
maxretry = 5

[sshd]
enabled = true
port = 22
maxretry = 3

[nginx-http-auth]
enabled = true

[nginx-botsearch]
enabled = true
EOF

systemctl restart fail2ban
systemctl enable fail2ban
echo "[✓] Fail2Ban ativo e monitorando!"

echo "[+] 3. Configurando rotina automatizada de Backup do MySQL..."
mkdir -p /var/backups/mysql
cat << 'EOF' > /usr/local/bin/backup_mysql.sh
#!/bin/bash
BACKUP_DIR="/var/backups/mysql"
DATE=$(date +%Y%m%d_%H%M%S)
# Realiza dump de todos os bancos com compressão máxima
mysqldump --all-databases --single-transaction --quick --lock-tables=false | gzip > "$BACKUP_DIR/db_backup_$DATE.sql.gz"
# Remove backups com mais de 7 dias
find "$BACKUP_DIR" -type f -name "*.sql.gz" -mtime +7 -delete
EOF

chmod +x /usr/local/bin/backup_mysql.sh

# Adicionar ao Crontab para rodar todo dia às 03:00 AM
CRON_JOB="0 3 * * * /usr/local/bin/backup_mysql.sh > /dev/null 2>&1"
(crontab -l 2>/dev/null | grep -Fv "/usr/local/bin/backup_mysql.sh" ; echo "$CRON_JOB") | crontab -
echo "[✓] Rotina de backup do MySQL configurada para as 03:00 AM diariamente!"

echo "=============================================================================="
echo "🎯 VPS BLINDADA COM SUCESSO! SELO DE SEGURANÇA ATIVO."
echo "=============================================================================="
