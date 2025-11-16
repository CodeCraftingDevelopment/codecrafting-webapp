#!/bin/bash

echo "🐳 Démarrage de l'environnement CodeCrafting avec Docker..."

# Vérifier si Docker est en cours d'exécution
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker n'est pas démarré. Veuillez démarrer Docker Desktop."
    exit 1
fi

# Arrêter les conteneurs existants
echo "🛑 Arrêt des conteneurs existants..."
docker-compose -f docker-compose-local.yml down

# Démarrer les services
echo "🚀 Démarrage des services avec Docker Compose..."
docker-compose -f docker-compose-local.yml up -d --build

# Attendre que PostgreSQL soit prêt
echo "⏳ Attente du démarrage de PostgreSQL..."
sleep 15

# Exécuter les migrations Prisma
echo "🔄 Exécution des migrations Prisma..."
docker-compose -f docker-compose-local.yml exec -T nextjs npx prisma migrate deploy

# Lancer le seed si nécessaire
echo "🌱 Initialisation des données..."
docker-compose -f docker-compose-local.yml exec -T nextjs npx prisma db seed

echo "✅ Environnement prêt !"
echo "🌐 Application disponible sur http://localhost:3000"
echo "🗄️  Base de données PostgreSQL sur localhost:5433"
echo "📊 Voir les logs: npm run logs"
echo "🛑 Arrêter: npm run stop"
