# Script PowerShell pour demarrer l'environnement CodeCrafting avec Docker

Write-Host "Demarrage de l'environnement CodeCrafting avec Docker..." -ForegroundColor Green

# Verifier si Docker est en cours d'execution
try {
    docker info > $null 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Docker n'est pas demarre. Veuillez demarrer Docker Desktop." -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "Docker n'est pas installe ou n'est pas demarre." -ForegroundColor Red
    exit 1
}

# Arreter les conteneurs existants
Write-Host "Arret des conteneurs existants..." -ForegroundColor Yellow
docker-compose -f docker-compose-local.yml down

# Demarrer les services
Write-Host "Demarrage des services avec Docker Compose..." -ForegroundColor Blue
docker-compose -f docker-compose-local.yml up -d

# Attendre que PostgreSQL soit pret
Write-Host "Attente du demarrage de PostgreSQL..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Configurer la variable d'environnement pour le host
$env:DATABASE_URL = "postgresql://postgres:password@localhost:5433/codecrafting?schema=public"

# Executer les migrations Prisma
Write-Host "Execution des migrations Prisma..." -ForegroundColor Cyan
& "C:\Program Files\nodejs\npm.cmd" run db:push

# Lancer le seed si necessaire
Write-Host "Initialisation des donnees..." -ForegroundColor Green
& "C:\Program Files\nodejs\npm.cmd" run db:seed

Write-Host "Environnement pret !" -ForegroundColor Green
Write-Host "Application disponible sur http://localhost:3000" -ForegroundColor Cyan
Write-Host "Base de donnees PostgreSQL sur localhost:5433" -ForegroundColor Blue
Write-Host "Pour arreter: npm run docker:down" -ForegroundColor Yellow