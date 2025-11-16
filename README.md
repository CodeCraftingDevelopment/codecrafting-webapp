# 🚀 CodeCrafting WebApp

Application web moderne pour la plateforme CodeCrafting, construite avec Next.js 15, Chakra UI v3 et TypeScript.

## ✨ Fonctionnalités

- 🔐 **Authentification complète** avec NextAuth.js v4
  - Connexion par email/mot de passe
  - Connexion Google OAuth
  - Inscription utilisateur
  - Rôles (Admin/Member)
- 🎨 **Interface moderne** avec Chakra UI v3
  - Thème sombre/clair
  - Design responsive
  - Composants accessibles
- 🗄️ **Base de données PostgreSQL** avec Prisma
- 🐳 **Docker** pour le développement local
- 📱 **Menu mobile optimisé** avec burger
- 🔒 **Sécurité** avec mots de passe hashés (bcrypt)

## 📋 Prérequis

- Node.js 18+ installé
- Docker et Docker Compose installés
- Git

## 🚀 Installation rapide

### 1. Cloner le projet
```bash
git clone <repository-url>
cd codecrafting-webapp
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
```bash
# Copier le fichier d'exemple
cp env.example .env.local

# Éditer .env.local avec vos valeurs
# Générer un secret NextAuth:
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### 4. Démarrer avec Docker (recommandé)
```bash
npm run docker:start
```

### 5. Alternative : Démarrage local
```bash
# Démarrer PostgreSQL uniquement
docker-compose -f docker-compose-local.yml up -d postgres

# Configurer la base de données
npm run db:push
npm run db:seed

# Démarrer l'application
npm run dev
```

## 🌐 Accès à l'application

- **Application**: http://localhost:3000
- **Base de données**: localhost:5433 (Docker)
- **Prisma Studio**: `npm run db:studio`

## 👤 Utilisateurs de test

Après le seeding, vous pouvez vous connecter avec :

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Admin | `alice@codecrafting.fr` | `Passw0rd!` |
| Member | `bob@codecrafting.fr` | `Passw0rd!` |

## 📚 Scripts disponibles

### Développement
```bash
npm run dev          # Démarrer le serveur de développement
npm run build        # Construire pour la production
npm run start        # Démarrer le serveur de production
npm run lint         # Vérifier la qualité du code avec Biome
npm run format       # Formater le code avec Biome
```

### Base de données
```bash
npm run db:generate  # Générer le client Prisma
npm run db:push      # Synchroniser le schéma avec la DB
npm run db:migrate   # Appliquer les migrations
npm run db:seed      # Peupler la base de données
npm run db:studio    # Ouvrir Prisma Studio
npm run db:reset     # Réinitialiser la base de données
```

### Docker
```bash
npm run docker:start # Démarrer l'environnement Docker complet
npm run docker:dev   # Démarrer les services Docker
npm run docker:down  # Arrêter les services Docker
```

## 🏗️ Architecture du projet

```
src/
├── app/                    # Pages Next.js 15 App Router
│   ├── (auth)/            # Routes d'authentification
│   ├── api/               # API routes
│   ├── dashboard/         # Tableau de bord
│   ├── admin/             # Administration
│   └── layout.tsx         # Layout principal
├── components/
│   ├── ui/                # Composants UI réutilisables
│   ├── auth/              # Composants d'authentification
│   └── images/            # Images et SVG
├── lib/
│   ├── auth/              # Configuration authentification
│   └── prisma.ts          # Client Prisma
├── theme/                 # Configuration Chakra UI
└── types/                 # Types TypeScript
```

## 🔧 Configuration

### Variables d'environnement principales

```env
# Authentification (obligatoire)
NEXTAUTH_SECRET=votre_secret_ici
NEXTAUTH_URL=http://localhost:3000

# Base de données
DATABASE_URL="postgresql://postgres:password@localhost:5433/codecrafting?schema=public"

# OAuth Google (optionnel)
GOOGLE_CLIENT_ID=votre_google_client_id
GOOGLE_CLIENT_SECRET=votre_google_client_secret
```

Voir `env.example` pour la liste complète des variables disponibles.

## 🧪 Tests et qualité

### Vérification de la configuration
```bash
node check-env.js
```

### Tests d'authentification
Consultez `AUTHENTICATION.md` pour la checklist complète des tests.

### Qualité du code
```bash
npm run lint      # Vérification avec Biome
npm run format    # Formatage automatique
```

## 📖 Documentation

- **[AUTHENTICATION.md](./AUTHENTICATION.md)** - Documentation complète de l'authentification
- **[POSTGRESQL_SETUP.md](./POSTGRESQL_SETUP.md)** - Guide d'installation PostgreSQL
- **[CHANGELOG.md](./CHANGELOG.md)** - Journal des modifications

## 🛠️ Technologies utilisées

- **Framework**: [Next.js 15](https://nextjs.org/) avec App Router
- **UI**: [Chakra UI v3](https://chakra-ui.com/)
- **Styling**: [Emotion](https://emotion.sh/) et [PandaCSS](https://panda-css.com/)
- **Base de données**: [PostgreSQL](https://www.postgresql.org/) avec [Prisma](https://www.prisma.io/)
- **Authentification**: [NextAuth.js v4](https://next-auth.js.org/)
- **TypeScript**: Support complet
- **Code quality**: [Biome](https://biomejs.dev/)
- **Containerisation**: [Docker](https://www.docker.com/)
- **Icons**: [React Icons](https://react-icons.com/)

## 🚨 Dépannage

### Problèmes courants

**Erreur de connexion à PostgreSQL**
```bash
# Vérifier si PostgreSQL fonctionne
docker ps | grep postgres

# Redémarrer PostgreSQL
docker-compose -f docker-compose-local.yml restart postgres
```

**Erreur de migration**
```bash
# Réinitialiser complètement la base de données
npm run db:reset
npm run db:seed
```

**Problème de dépendances**
```bash
# Réinstaller toutes les dépendances
rm -rf node_modules package-lock.json
npm install
npm run db:generate
```

## 🤝 Contribuer

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour détails.

## 📞 Support

Pour toute question ou problème :
- Email: support@codecrafting.fr
- Documentation: [AUTHENTICATION.md](./AUTHENTICATION.md)
- Issues: [GitHub Issues](https://github.com/votre-repo/issues)

---

**🎉 Merci d'utiliser CodeCrafting WebApp !**

