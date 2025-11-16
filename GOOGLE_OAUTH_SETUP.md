# Guide de Configuration Google OAuth

## 📋 Prérequis

Avant de configurer Google OAuth, assurez-vous que les modifications du schéma Prisma sont appliquées :

```bash
# Générer le client Prisma avec les nouvelles modifications
npm run db:generate

# Créer et appliquer la migration pour rendre le champ password nullable
npm run db:migrate

# Redémarrer le serveur de développement
npm run dev:local
```

## 🔧 Configuration Google Console

1. **Créer un projet Google Cloud**
   - Allez sur [Google Cloud Console](https://console.cloud.google.com/)
   - Créez un nouveau projet ou sélectionnez-en un existant

2. **Activer Google+ API**
   - Dans la navigation, allez à "API et services" > "Bibliothèque"
   - Recherchez "Google+ API" et activez-la

3. **Créer des identifiants OAuth**
   - Allez à "API et services" > "Identifiants"
   - Cliquez sur "Créer des identifiants" > "ID client OAuth"
   - Sélectionnez "Application web"
   - Ajoutez les URI de redirection autorisés :
     - `http://localhost:3000/api/auth/callback/google` (développement)
     - `https://votre-domaine.com/api/auth/callback/google` (production)

4. **Récupérer les identifiants**
   - Notez votre `ID client` et `secret client`

## ⚙️ Configuration Variables d'Environnement

Dans votre fichier `.env.local` (créez-le à partir de `env.example`) :

```env
# Variables d'environnement - CodeCrafting WebApp

# Authentification
NEXTAUTH_SECRET=votre_secret_tres_long_et_aleatoire_ici
NEXTAUTH_URL=http://localhost:3000

# Base de données
DATABASE_URL="postgresql://postgres:password@localhost:5433/codecrafting?schema=public"

# Google OAuth
GOOGLE_CLIENT_ID=votre_google_client_id
GOOGLE_CLIENT_SECRET=votre_google_client_secret
```

## 🎯 Configuration des Rôles

Modifiez le fichier `src/lib/auth/google-role-mapping.ts` pour définir les rôles :

```typescript
export const googleRoleMapping: GoogleRoleMapping = {
  "admin@codecrafting.fr": "admin",
  "christophe.pauliac@gmail.com": "admin",
  // Ajoutez d'autres emails admin ici
  // Les utilisateurs non listés auront le rôle "member" par défaut
};
```

## 🚀 Démarrage

1. **Redémarrez le serveur de développement**
   ```bash
   npm run dev:local
   ```

2. **Testez la connexion**
   - Allez sur `http://localhost:3000/login`
   - Cliquez sur "Se connecter avec Google"
   - Authentifiez-vous avec votre compte Google

## 🔍 Vérification

Après la première connexion Google :
- Vérifiez que l'utilisateur est créé dans la base de données
- Le champ `password` devrait être `null`
- Le rôle devrait être correctement assigné selon le mapping
- La session devrait contenir les informations correctes

## 🐛 Dépannage

### Problèmes courants :

1. **"redirect_uri_mismatch"**
   - Vérifiez que l'URI de redirection dans Google Console correspond exactement à `NEXTAUTH_URL/api/auth/callback/google`

2. **"invalid_client"**
   - Vérifiez que `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` sont corrects

3. **Erreur de base de données**
   - Assurez-vous que la migration a été appliquée : `npm run db:migrate`

4. **Session non persistante**
   - Vérifiez que `NEXTAUTH_SECRET` est défini et correct

## 📝 Notes importantes

- Les utilisateurs Google n'ont pas de mot de passe dans la base de données
- Ils peuvent utiliser la connexion Google ET les fonctionnalités réservées aux membres
- Les rôles sont assignés automatiquement lors de la première connexion
- Les utilisateurs existants avec mot de passe peuvent continuer à utiliser l'authentification interne
