#!/usr/bin/env bash
# Wrapper de Auditoria de Segurança para CI/CD e VPS
set -e
python3 "$(dirname "$0")/audit_seal.py"
