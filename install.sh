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

mkdir -p "$PLUGIN_DIR/rules" "$PLUGIN_DIR/skills" "$PLUGIN_DIR/workflows" "$PLUGIN_DIR/templates" "$SKILLS_DIR" "$CONFIG_DIR/workflows"

echo -e "\033[1;33m📦 Copiando templates de produção...\033[0m"
cp -r "$SCRIPT_DIR/templates/"* "$PLUGIN_DIR/templates/"

if [ -d "$SCRIPT_DIR/.agents/workflows" ]; then
  echo -e "\033[1;33m⚡ Copiando workflows executáveis...\033[0m"
  cp -r "$SCRIPT_DIR/.agents/workflows/"* "$PLUGIN_DIR/workflows/"
  cp -r "$SCRIPT_DIR/.agents/workflows/"* "$CONFIG_DIR/workflows/"
fi

echo -e "\033[1;33m⚙️ Registrando plugin global...\033[0m"
cp "$SCRIPT_DIR/AGENTS.md" "$PLUGIN_DIR/rules/MAESTRO_ECOSYSTEM.md"

cat << 'EOF' > "$PLUGIN_DIR/plugin.json"
{
  "name": "fullstack-maestro-plugin",
  "description": "Ecossistema global do Agente Regente MAESTRO e 7 Subagentes Especialistas para Full Stack Python Django, Next.js, MySQL, SaaS, E-commerce, Apps, Jogos, VPS sem Docker, Testes e Selo de Segurança."
}
EOF

# Copiar todas as Skills especializadas dinamicamente
for skill_dir in "$SCRIPT_DIR/.agents/skills"/*; do
  if [ -d "$skill_dir" ] && [ -f "$skill_dir/SKILL.md" ]; then
    skill=$(basename "$skill_dir")
    mkdir -p "$PLUGIN_DIR/skills/$skill" "$SKILLS_DIR/$skill"
    cp "$skill_dir/SKILL.md" "$PLUGIN_DIR/skills/$skill/SKILL.md"
    cp "$skill_dir/SKILL.md" "$SKILLS_DIR/$skill/SKILL.md"
    echo "   -> Skill instalada: $skill"
  fi
done

echo -e "\033[1;32m============================================================\033[0m"
echo -e "\033[1;32m✅ INSTALAÇÃO CONCLUÍDA! O ecossistema já está global no Antigravity.\033[0m"
echo -e "\033[1;32m============================================================\033[0m"
