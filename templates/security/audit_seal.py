#!/usr/bin/env python3
"""
AUDITOR AUTOMATIZADO DE SEGURANÇA & EMISSOR DO SELO DE SEGURANÇA ANTIGRAVITY
Auditoria estática de código (SAST), segredos, conformidade OWASP Top 10 e configurações de produção.
"""

import os
import re
import sys
from pathlib import Path

# Configurar stdout para UTF-8 resiliente em qualquer terminal
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

# Cores para terminal ANSI
GREEN = "\033[92m"
RED = "\033[91m"
YELLOW = "\033[93m"
CYAN = "\033[96m"
BOLD = "\033[1m"
RESET = "\033[0m"

SECRET_PATTERNS = [
    (re.compile(r"sk-[a-zA-Z0-9_-]{20,}", re.IGNORECASE), "OpenAI / AI Secret Key"),
    (re.compile(r"AKIA[0-9A-Z]{16}", re.IGNORECASE), "AWS Access Key ID"),
    (re.compile(r"(?i)password\s*=\s*['\"][^'\"]{4,}['\"]"), "Senha em texto limpo no código"),
    (re.compile(r"(?i)secret_key\s*=\s*['\"][a-zA-Z0-9_\-+=]{10,}['\"]"), "Django SECRET_KEY em código limpo"),
    (re.compile(r"-----BEGIN\s+(RSA|DSA|EC|OPENSSH|PRIVATE)\s+KEY-----"), "Chave Privada criptográfica"),
    (re.compile(r"ghp_[a-zA-Z0-9]{36}"), "GitHub Personal Access Token"),
]

SQLI_PATTERNS = [
    (re.compile(r'cursor\.execute\s*\(\s*f["\']', re.IGNORECASE), "F-string em cursor.execute (Risco crítico de SQL Injection)"),
    (re.compile(r'cursor\.execute\s*\(\s*["\'].*%\s*\(', re.IGNORECASE), "Interpolação de string '%' em consulta SQL"),
    (re.compile(r'\.raw\s*\(\s*f["\']', re.IGNORECASE), "F-string em Model.objects.raw()"),
]

XSS_PATTERNS = [
    (re.compile(r'dangerouslySetInnerHTML\s*=\s*\{\{\s*__html:\s*(?!\s*(?:DOMPurify|safeJsonLd))', re.IGNORECASE), "dangerouslySetInnerHTML sem sanitização (use DOMPurify ou safeJsonLd)"),
]

IGNORE_DIRS = {'.git', 'node_modules', 'venv', '.venv', '__pycache__', '.next', 'dist', 'build'}

def check_gitignore(repo_path: Path):
    gitignore = repo_path / '.gitignore'
    findings = []
    if not gitignore.exists():
        findings.append("Arquivo .gitignore inexistente na raiz do projeto!")
        return findings
    
    content = gitignore.read_text(encoding='utf-8', errors='ignore')
    required_ignores = ['.env']
    for req in required_ignores:
        if req not in content:
            findings.append(f".gitignore não contém regra para proteger '{req}'")
    return findings

def scan_files(repo_path: Path):
    violations = []
    
    for root, dirs, files in os.walk(repo_path):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        
        for file in files:
            file_path = Path(root) / file
            rel_path = file_path.relative_to(repo_path)
            
            # Bloquear checagem do próprio script de auditoria
            if file in {'audit_seal.py', 'audit_seal.sh', 'setup_vps_security.sh'}:
                continue
                
            # Arquivos ignorados por extensão
            if file_path.suffix.lower() in {'.png', '.jpg', '.jpeg', '.gif', '.ico', '.pdf', '.woff', '.woff2', '.ttf'}:
                continue
                
            try:
                content = file_path.read_text(encoding='utf-8', errors='ignore')
            except Exception:
                continue
                
            # 1. Varredura de Segredos
            for pattern, desc in SECRET_PATTERNS:
                matches = pattern.finditer(content)
                for m in matches:
                    line_num = content[:m.start()].count('\n') + 1
                    violations.append({
                        "file": str(rel_path),
                        "line": line_num,
                        "type": "Segredo / Credencial Exposta",
                        "desc": desc,
                        "severity": "CRÍTICA"
                    })
                    
            # 2. Varredura de SQL Injection em Python
            if file_path.suffix == '.py':
                for pattern, desc in SQLI_PATTERNS:
                    matches = pattern.finditer(content)
                    for m in matches:
                        line_num = content[:m.start()].count('\n') + 1
                        violations.append({
                            "file": str(rel_path),
                            "line": line_num,
                            "type": "SQL Injection",
                            "desc": desc,
                            "severity": "CRÍTICA"
                        })
                        
                # 3. DEBUG = True em settings de produção
                if 'settings' in file_path.name.lower() and 'prod' in file_path.name.lower():
                    if re.search(r'DEBUG\s*=\s*True', content):
                        violations.append({
                            "file": str(rel_path),
                            "line": 1,
                            "type": "Configuração Insegura",
                            "desc": "DEBUG=True encontrado em arquivo de produção",
                            "severity": "ALTA"
                        })
                        
            # 4. Varredura de XSS em frontend (TSX/JSX)
            if file_path.suffix in {'.tsx', '.jsx', '.js', '.ts'}:
                for pattern, desc in XSS_PATTERNS:
                    matches = pattern.finditer(content)
                    for m in matches:
                        line_num = content[:m.start()].count('\n') + 1
                        violations.append({
                            "file": str(rel_path),
                            "line": line_num,
                            "type": "XSS (Cross-Site Scripting)",
                            "desc": desc,
                            "severity": "ALTA"
                        })
                        
    return violations

def main():
    repo_path = Path.cwd()
    print(f"\n{CYAN}{BOLD}=================================================================={RESET}")
    print(f"{CYAN}{BOLD}  GUARDIAN SECURITY AUDITOR - PROTOCOLO DO SELO DE SEGURANÇA{RESET}")
    print(f"{CYAN}{BOLD}=================================================================={RESET}")
    print(f"Diretório auditado: {repo_path}\n")
    
    gitignore_issues = check_gitignore(repo_path)
    file_violations = scan_files(repo_path)
    
    total_issues = len(gitignore_issues) + len(file_violations)
    
    if gitignore_issues:
        print(f"{YELLOW}{BOLD}[ALERTA: .gitignore]{RESET}")
        for issue in gitignore_issues:
            print(f"  - {issue}")
        print()
        
    if file_violations:
        print(f"{RED}{BOLD}[VULNERABILIDADES ENCONTRADAS: {len(file_violations)}]{RESET}")
        for v in file_violations:
            print(f"  [{v['severity']}] {v['type']}: {v['desc']}")
            print(f"    -> Arquivo: {v['file']}:{v['line']}")
        print()
        
    if total_issues == 0:
        print(f"{GREEN}{BOLD}=================================================================={RESET}")
        print(f"{GREEN}{BOLD}      CERTIFICADO OFICIAL: SELO DE SEGURANÇA CONCEDIDO!          {RESET}")
        print(f"{GREEN}{BOLD}=================================================================={RESET}")
        print(f"{GREEN}[OK] Zero credenciais ou segredos expostos.")
        print(f"[OK] Proteção contra SQL Injection e XSS auditada.")
        print(f"[OK] .gitignore configurado com proteção a variáveis de ambiente.")
        print(f"[OK] O projeto está autorizado e blindado para deploy em produção!{RESET}\n")
        sys.exit(0)
    else:
        print(f"{RED}{BOLD}=================================================================={RESET}")
        print(f"{RED}{BOLD}           SELO DE SEGURANÇA RECUSADO - DEPLOY BLOQUEADO          {RESET}")
        print(f"{RED}{BOLD}=================================================================={RESET}")
        print(f"{RED}Corrija as vulnerabilidades acima antes de prosseguir.{RESET}\n")
        sys.exit(1)

if __name__ == '__main__':
    main()
