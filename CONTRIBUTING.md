# 🤝 Como Contribuir com o Ecossistema Maestro

Obrigado pelo seu interesse em aprimorar o **Maestro & Esquadrão Full Stack** para a comunidade Antigravity!

---

## 🌟 Como Você Pode Contribuir

1. **Novos Subagentes Especialistas**:
   - Criação de novos subagentes (ex: IA & LLM Fine-Tuning, Flutter/Mobile nativo, WebRTC streaming).
   - Seguir o padrão de persona em `.agents/subagents/subagent_nome.md`.
2. **Novas Skills Executáveis**:
   - Adicione novos procedimentos em `.agents/skills/<skill-name>/SKILL.md` com frontmatter YAML (`name`, `description`).
3. **Melhorias nos Templates de Produção**:
   - Otimizações para Nginx, PM2, Systemd ou configurações avançadas de banco de dados.
4. **Traduções e Documentação**:
   - Melhorias no `README.md` e adição de exemplos reais de uso.

---

## 🛠️ Passo a Passo para Enviar sua Contribuição

1. Faça um **Fork** do repositório no GitHub.
2. Crie uma branch para sua funcionalidade:
   ```bash
   git checkout -b feat/meu-novo-subagente
   ```
3. Realize suas alterações seguindo o padrão de alta qualidade estabelecido.
4. Teste localmente executando `.\install.ps1` ou `./install.sh`.
5. Faça o commit com mensagens claras:
   ```bash
   git commit -m "feat: adicionar subagente especialista em WebSockets e tempo real"
   ```
6. Envie para o seu fork:
   ```bash
   git push origin feat/meu-novo-subagente
   ```
7. Abra um **Pull Request (PR)** detalhando suas alterações!
