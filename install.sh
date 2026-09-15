#!/usr/bin/env bash
# ==============================================================================
# Instalador do Ecossistema Maestro para Antigravity (Linux & macOS)
# ==============================================================================

set -e

echo -e "\033[1;36m============================================================\033[0m"
echo -e "\033[1;36m🚀 Instalando Ecossistema Maestro no Antigravity (Linux/macOS)\033[0m"
echo -e "\033[1;36m============================================================\033[0m"

CONFIG_DIR="$HOME/.gemini/config"
PLUGIN_DIR="$CONFIG_DIR/plugins/fullstack-maestro-plugin"
SKILLS_DIR="$CONFIG_DIR/skills"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

mkdir -p "$PLUGIN_DIR/rules" "$PLUGIN_DIR/skills" "$PLUGIN_DIR/templates" "$SKILLS_DIR"

echo -e "\033[1;33m📦 Copiando templates de produção...\033[0m"
cp -r "$SCRIPT_DIR/templates/"* "$PLUGIN_DIR/templates/"

echo -e "\033[1;33m⚙️ Registrando plugin global...\033[0m"
cp "$SCRIPT_DIR/AGENTS.md" "$PLUGIN_DIR/rules/MAESTRO_ECOSYSTEM.md"

cat << 'EOF' > "$PLUGIN_DIR/plugin.json"
{
  "name": "fullstack-maestro-plugin",
  "description": "Ecossistema global do Agente Regente MAESTRO e 6 Subagentes Especialistas para Full Stack Python Django, Next.js, MySQL, SaaS, E-commerce, Apps, Jogos, VPS sem Docker, Testes e Selo de Segurança."
}
EOF

# Skills base
for skill in vps-nodocker-deploy security-seal-audit premium-ui-system; do
  if [ -f "$SCRIPT_DIR/.agents/skills/$skill/SKILL.md" ]; then
    mkdir -p "$PLUGIN_DIR/skills/$skill" "$SKILLS_DIR/$skill"
    cp "$SCRIPT_DIR/.agents/skills/$skill/SKILL.md" "$PLUGIN_DIR/skills/$skill/SKILL.md"
    cp "$SCRIPT_DIR/.agents/skills/$skill/SKILL.md" "$SKILLS_DIR/$skill/SKILL.md"
  fi
done

echo -e "\033[1;32m============================================================\033[0m"
echo -e "\033[1;32m✅ INSTALAÇÃO CONCLUÍDA! O ecossistema já está global no Antigravity.\033[0m"
echo -e "\033[1;32m============================================================\033[0m"
