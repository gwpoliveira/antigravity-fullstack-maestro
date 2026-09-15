<#
.SYNOPSIS
Instalador automatizado do Ecossistema Maestro para Antigravity no Windows.
#>

$ErrorActionPreference = 'Stop'

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ">> Instalando Ecossistema Maestro no Antigravity (Windows)" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

$userHome = [System.Environment]::GetFolderPath('UserProfile')
$configDir = Join-Path $userHome ".gemini\config"
$pluginDir = Join-Path $configDir "plugins\fullstack-maestro-plugin"
$skillsDir = Join-Path $configDir "skills"
$scriptRoot = $PSScriptRoot

if (-not (Test-Path $configDir)) {
    Write-Host "Criando diretorio global do Antigravity em $configDir..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Force -Path $configDir | Out-Null
}

New-Item -ItemType Directory -Force -Path "$pluginDir\rules" | Out-Null
New-Item -ItemType Directory -Force -Path "$pluginDir\skills" | Out-Null
New-Item -ItemType Directory -Force -Path "$pluginDir\templates" | Out-Null
New-Item -ItemType Directory -Force -Path $skillsDir | Out-Null

Write-Host ">> Copiando templates de producao..." -ForegroundColor Yellow
Copy-Item -Recurse -Force "$scriptRoot\templates\*" "$pluginDir\templates\"

Write-Host ">> Registrando plugin global..." -ForegroundColor Yellow
Copy-Item -Force "$scriptRoot\AGENTS.md" "$pluginDir\rules\MAESTRO_ECOSYSTEM.md"

@{
    name = "fullstack-maestro-plugin"
    description = "Ecossistema global do Agente Regente MAESTRO e 6 Subagentes Especialistas para Full Stack Python Django, Next.js, MySQL, SaaS, E-commerce, Apps, Jogos, VPS sem Docker, Testes e Selo de Seguranca."
} | ConvertTo-Json | Set-Content -Encoding utf8 "$pluginDir\plugin.json"

# Copiar todas as Skills especializadas dinamicamente
$availableSkills = Get-ChildItem -Directory "$scriptRoot\.agents\skills"
foreach ($sDir in $availableSkills) {
    $sName = $sDir.Name
    $src = "$($sDir.FullName)\SKILL.md"
    if (Test-Path $src) {
        $pTarget = "$pluginDir\skills\$sName"
        $gTarget = "$skillsDir\$sName"
        New-Item -ItemType Directory -Force -Path $pTarget | Out-Null
        New-Item -ItemType Directory -Force -Path $gTarget | Out-Null
        Copy-Item -Force $src "$pTarget\SKILL.md"
        Copy-Item -Force $src "$gTarget\SKILL.md"
        Write-Host "   -> Skill instalada: $sName" -ForegroundColor Green
    }
}

# Registrar Subagentes como Skills Invocaveis
$subagents = @(
    @{ name = 'maestro-orchestrator'; file = "$scriptRoot\.agents\orchestrator\MAESTRO.md"; desc = 'Agente Regente e Tech Lead Supremo: orquestra os subagentes fullstack.' },
    @{ name = 'subagent-django-mysql'; file = "$scriptRoot\.agents\subagents\subagent_django_mysql.md"; desc = 'Subagente especialista em Python, Django, DRF, Ninja, MySQL otimizado e SaaS.' },
    @{ name = 'subagent-nextjs-frontend'; file = "$scriptRoot\.agents\subagents\subagent_nextjs_frontend.md"; desc = 'Subagente especialista em React, Next.js App Router, UI/UX premium e Landing Pages.' },
    @{ name = 'subagent-apps-games'; file = "$scriptRoot\.agents\subagents\subagent_apps_games.md"; desc = 'Subagente especialista em Apps PWA e Jogos Web 2D/3D (Canvas, PixiJS, Three.js).' },
    @{ name = 'subagent-security-guardian'; file = "$scriptRoot\.agents\subagents\subagent_security_guardian.md"; desc = 'Subagente auditor de seguranca OWASP Top 10 e emissor do Selo de Seguranca.' },
    @{ name = 'subagent-qa-testing'; file = "$scriptRoot\.agents\subagents\subagent_qa_testing.md"; desc = 'Subagente especialista em testes com Pytest-Django, Vitest e Playwright.' },
    @{ name = 'subagent-vps-nodocker'; file = "$scriptRoot\.agents\subagents\subagent_vps_nodocker.md"; desc = 'Subagente Sysadmin Bare-Metal Linux para VPS com Nginx, Systemd, PM2 e MySQL (Zero Docker).' }
)

foreach ($sa in $subagents) {
    if (Test-Path $sa.file) {
        $raw = Get-Content -Raw $sa.file
        $content = "---`nname: $($sa.name)`ndescription: $($sa.desc)`n---`n`n" + $raw
        
        $pTarget = "$pluginDir\skills\$($sa.name)"
        $gTarget = "$skillsDir\$($sa.name)"
        New-Item -ItemType Directory -Force -Path $pTarget | Out-Null
        New-Item -ItemType Directory -Force -Path $gTarget | Out-Null
        $content | Set-Content -Encoding utf8 "$pTarget\SKILL.md"
        $content | Set-Content -Encoding utf8 "$gTarget\SKILL.md"
    }
}

Write-Host "============================================================" -ForegroundColor Green
Write-Host "[OK] INSTALACAO CONCLUIDA COM SUCESSO!" -ForegroundColor Green
Write-Host "O Maestro e os 6 subagentes estao ativos em qualquer projeto." -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
