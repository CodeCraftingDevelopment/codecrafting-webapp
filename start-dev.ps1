# Script PowerShell pour démarrer l'environnement CodeCrafting

Write-Host "🚀 Démarrage de l'environnement CodeCrafting..." -ForegroundColor Green

# Vérifier si Docker est en cours d'exécution
try {
    docker info > $null 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Docker n'est pas démarré. Veuillez démarrer Docker Desktop." -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Docker n'est pas installé ou n'est pas démarré. Veuillez démarrer Docker Desktop." -ForegroundColor Red
    exit 1
}

# Arrêter les conteneurs existants
Write-Host "🛑 Arrêt des conteneurs existants..." -ForegroundColor Yellow
docker-compose -f docker-compose-local.yml down

# Démarrer les services
Write-Host "🐳 Démarrage des services avec Docker Compose..." -ForegroundColor Blue
docker-compose -f docker-compose-local.yml up -d

# Attendre que PostgreSQL soit prêt
Write-Host "⏳ Attente du démarrage de PostgreSQL..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Exécuter les migrations Prisma
Write-Host "🔄 Exécution des migrations Prisma..." -ForegroundColor Cyan
& "C:\Program Files\nodejs\npm.cmd" run prisma:migrate:deploy

# Lancer le seed si nécessaire
Write-Host "🌱 Initialisation des données..." -ForegroundColor Green
& "C:\Program Files\nodejs\npm.cmd" run prisma:db:seed

Write-Host "✅ Environnement prêt !" -ForegroundColor Green
Write-Host "🌐 Application disponible sur http://localhost:3000" -ForegroundColor Cyan
Write-Host "Base de donnees PostgreSQL sur localhost:5432" -ForegroundColor Blue