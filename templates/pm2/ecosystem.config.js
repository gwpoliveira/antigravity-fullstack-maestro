// Configuração de Produção PM2 para Next.js (SSR / Bare-Metal)
// Localização: /var/www/meu-app/frontend/ecosystem.config.js

module.exports = {
  apps: [
    {
      name: 'nextjs-production-app',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      cwd: '/var/www/meu-app/frontend',
      // 'max' distribui os workers entre todos os núcleos de CPU da VPS
      instances: 'max',
      exec_mode: 'cluster',
      // Reiniciar suavemente em caso de uso excessivo de memória (leak protection)
      max_memory_restart: '500M',
      autorestart: true,
      watch: false,
      max_restarts: 10,
      restart_delay: 2000,
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
