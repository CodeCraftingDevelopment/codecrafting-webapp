#!/bin/bash

# Configuration
GITHUB_TOKEN=""  # Remplacez par votre token GitHub
IMAGE_NAME="ghcr.io/codecraftingdevelopment/codecrafting-webapp:production"
CONTAINER_NAME="codecrafting-webapp"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages d'erreur
error_exit() {
    echo -e "${RED}Erreur: $1${NC}" >&2
    exit 1
}

# Vérification de Docker
if ! command -v docker &> /dev/null; then
    error_exit "Docker n'est pas installé. Veuillez installer Docker d'abord."
fi

# Vérification du token
if [ -z "$GITHUB_TOKEN" ]; then
    error_exit "Le token GitHub n'est pas défini. Modifiez le script pour ajouter votre token."
fi

# Authentification avec uniquement le token
echo -e "${YELLOW}Authentification auprès de GitHub Container Registry...${NC}"
echo "$GITHUB_TOKEN" | docker login ghcr.io -u "token" --password-stdin || {
    error_exit "Échec de l'authentification. Vérifiez votre token."
}

# Vérification des mises à jour
echo -e "${YELLOW}Vérification des mises à jour...${NC}"
LOCAL_IMAGE_ID=$(docker images -q $IMAGE_NAME 2> /dev/null)
docker pull $IMAGE_NAME || error_exit "Échec du téléchargement de l'image"
UPDATED_IMAGE_ID=$(docker images -q $IMAGE_NAME 2> /dev/null)

# Arrêt et suppression uniquement si une nouvelle version est disponible
if [ "$LOCAL_IMAGE_ID" != "$UPDATED_IMAGE_ID" ] || [ -z "$LOCAL_IMAGE_ID" ]; then
    echo -e "${YELLOW}Nouvelle version détectée, mise à jour en cours...${NC}"
    docker compose down || echo "Aucun conteneur à arrêter"
    
    # Suppression de l'ancienne image
    if [ -n "$LOCAL_IMAGE_ID" ]; then
        echo "Suppression de l'ancienne version de l'image..."
        docker rmi -f $LOCAL_IMAGE_ID 2> /dev/null || echo "Impossible de supprimer l'ancienne image"
    fi
else
    echo -e "${GREEN}Déjà à jour.${NC}"
fi

# Démarrage des conteneurs
echo -e "${YELLOW}Démarrage de l'application...${NC}"
docker compose up -d || error_exit "Échec du démarrage des conteneurs"

# Nettoyage
echo -e "${YELLOW}Nettoyage des images inutilisées...${NC}"
docker image prune -f

# Résultat
echo -e "\n${GREEN}Déploiement terminé avec succès !${NC}"
echo -e "L'application est disponible à l'adresse : http://localhost:80\n"

# Affichage des logs
#echo -e "${YELLOW}Affichage des logs (Ctrl+C pour quitter)...${NC}"
#docker logs -f "$CONTAINER_NAME"
