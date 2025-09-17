# Étape 1 : Build
FROM node:22-alpine AS builder
WORKDIR /app

# Installation des dépendances
COPY package*.json ./
RUN npm ci

# Copie du code source
COPY . .

# Build de l'application Next.js
RUN npm run build

# Étape 2 : Runner standalone
FROM node:22-alpine AS runner
WORKDIR /app

# Définir l'environnement
ENV NODE_ENV=production
ENV PORT=3000

# Exposer le port
EXPOSE 3000

# Lancer le serveur standalone
CMD ["npm", "build"]
CMD ["node", ".next/standalone/server.js"]
