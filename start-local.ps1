# Script PowerShell pour démarrer l'environnement CodeCrafting avec PostgreSQL local

Write-Host "🚀 Démarrage de l'environnement CodeCrafting (PostgreSQL local)..." -ForegroundColor Green

# Vérifier si PostgreSQL est en cours d'exécution
try {
    $process = Get-Process | Where-Object { $_.ProcessName -like '*postgres*' }
    if ($process) {
        Write-Host "✅ PostgreSQL est déjà en cours d'exécution" -ForegroundColor Green
    } else {
        Write-Host "❌ PostgreSQL n'est pas démarré" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Impossible de vérifier l'état de PostgreSQL" -ForegroundColor Red
    exit 1
}

# Configurer la variable d'environnement
$env:DATABASE_URL = "postgresql://postgres:Lorient,56@localhost:5432/codecrafting?schema=public"
Write-Host "🔧 DATABASE_URL configurée" -ForegroundColor Yellow

# Exécuter les migrations Prisma
Write-Host "🔄 Exécution des migrations Prisma..." -ForegroundColor Cyan
& "C:\Program Files\nodejs\npm.cmd" run db:push

# Lancer le seed si nécessaire
Write-Host "🌱 Initialisation des données..." -ForegroundColor Green
& "C:\Program Files\nodejs\npm.cmd" run db:seed

# Démarrer l'application Next.js
Write-Host "🌐 Démarrage de l'application Next.js..." -ForegroundColor Blue
& "C:\Program Files\nodejs\npm.cmd" run dev

Write-Host "✅ Environnement prêt !" -ForegroundColor Green
Write-Host "🌐 Application disponible sur http://localhost:3000" -ForegroundColor Cyan
Write-Host "🗄️ Base de données PostgreSQL sur localhost:5432" -ForegroundColor Blue