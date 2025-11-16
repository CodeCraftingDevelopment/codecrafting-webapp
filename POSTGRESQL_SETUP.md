# 🐘 Guide d'installation PostgreSQL pour CodeCrafting

## 📋 Prérequis

- Node.js 18+ installé
- Docker et Docker Compose installés
- Git

## 🚀 Installation rapide

### 1. Cloner le projet (si nécessaire)
```bash
git clone <repository-url>
cd codecrafting-webapp
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Démarrer PostgreSQL avec Docker
```bash
docker-compose -f docker-compose-local.yml up -d postgres
```

### 4. Configurer les variables d'environnement
Créer un fichier `.env.local` à la racine :
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/codecrafting?schema=public"
NEXTAUTH_SECRET=votre_secret_tres_long_et_aleatoire_ici
NEXTAUTH_URL=http://localhost:3000

# Optionnel - Google OAuth
GOOGLE_CLIENT_ID=votre_google_client_id
GOOGLE_CLIENT_SECRET=votre_google_client_secret
```

### 5. Initialiser la base de données
```bash
# Générer le client Prisma
npm run db:generate

# Appliquer les migrations
npm run db:migrate

# Peupler la base de données avec les utilisateurs de test
npm run db:seed
```

### 6. Démarrer l'application
```bash
npm run dev
```

## 🔧 Commandes utiles

### Base de données
```bash
npm run db:studio    # Ouvrir Prisma Studio (interface visuelle)
npm run db:push      # Synchroniser le schéma avec la DB
npm run db:reset     # Réinitialiser la base de données
npm run db:migrate   # Créer et appliquer une nouvelle migration
```

### Docker
```bash
docker-compose -f docker-compose-local.yml up -d          # Démarrer tous les services
docker-compose -f docker-compose-local.yml down          # Arrêter tous les services
docker-compose -f docker-compose-local.yml logs postgres # Voir les logs PostgreSQL
```

## 👤 Utilisateurs de test

Après le seeding, vous pouvez vous connecter avec :

**Admin**
- Email: `alice@codecrafting.fr`
- Mot de passe: `Passw0rd!`
- Rôle: Admin

**Member**
- Email: `bob@codecrafting.fr` 
- Mot de passe: `Passw0rd!`
- Rôle: Member

## 🏗️ Architecture

```
docker-compose-local.yml
├── postgres (port 5432)
│   └── Base de données PostgreSQL
└── nextjs (port 3000)
    └── Application Next.js
```

## 🔒 Sécurité

- Mots de passe hashés avec bcrypt (12 rounds)
- Validation avancée des mots de passe
- Connexion sécurisée via SSL
- Rôles d'utilisateur (ADMIN/EMBER)

## 🚨 Dépannage

### Erreur de connexion à PostgreSQL
```bash
# Vérifier si PostgreSQL fonctionne
docker ps | grep postgres

# Redémarrer PostgreSQL
docker-compose -f docker-compose-local.yml restart postgres
```

### Erreur de migration
```bash
# Réinitialiser complètement la base de données
npm run db:reset
npm run db:seed
```

### Problème de dépendances
```bash
# Réinstaller toutes les dépendances
rm -rf node_modules package-lock.json
npm install
npm run db:generate
```

## 📚 Documentation complémentaire

- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js avec Prisma](https://next-auth.js.org/adapters/prisma)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**🎉 Félicitations !** Votre application CodeCrafting est maintenant configurée avec PostgreSQL !
