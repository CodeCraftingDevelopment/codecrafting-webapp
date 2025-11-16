# 📚 Documentation Authentification CodeCrafting

## 📋 Variables d'environnement requises

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes:

```env
# NextAuth Secret (OBLIGATOIRE en production)
# Générer avec: openssl rand -base64 32
NEXTAUTH_SECRET=votre_secret_ici

# URL de l'application (optionnel en développement)
NEXTAUTH_URL=http://localhost:3000

# Base de données PostgreSQL
DATABASE_URL="postgresql://postgres:password@localhost:5432/codecrafting?schema=public"

# Optionnel - Google OAuth
GOOGLE_CLIENT_ID=votre_google_client_id
GOOGLE_CLIENT_SECRET=votre_google_client_secret
```

### Génération du secret

**Windows (PowerShell):**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

**Linux/Mac:**
```bash
openssl rand -base64 32
```

## 🔐 Utilisateurs de test

Les utilisateurs sont créés automatiquement avec le script `prisma/seed.ts`:

| Email | Mot de passe | Rôle |
|-------|--------------|------|
| alice@codecrafting.fr | Passw0rd! | admin |
| bob@codecrafting.fr | Passw0rd! | member |

## 🏗️ Architecture NextAuth v4

### Fichiers principaux

- **`src/lib/auth/auth-options.ts`**: Configuration NextAuth (providers, callbacks, session)
- **`src/lib/auth/session.ts`**: Utilitaire pour récupérer la session côté serveur
- **`src/lib/auth/password.ts`**: Utilitaires de hashage de mots de passe
- **`src/app/api/auth/[...nextauth]/route.ts`**: Route API NextAuth (catch-all)
- **`src/app/login/page.tsx`**: Page de connexion
- **`src/app/register/page.tsx`**: Page d'inscription
- **`src/types/next-auth.d.ts`**: Extensions TypeScript pour NextAuth

### Utilisation

#### 1. Authentification côté client (Composants Client)

```tsx
"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Chargement...</p>;
  }

  if (status === "unauthenticated") {
    return <button onClick={() => signIn()}>Se connecter</button>;
  }

  return (
    <div>
      <p>Connecté en tant que {session?.user?.email}</p>
      <p>Rôle: {session?.user?.role}</p>
      <button onClick={() => signOut()}>Se déconnecter</button>
    </div>
  );
}
```

#### 2. Authentification côté serveur (Server Components)

```tsx
import { auth } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Page protégée</h1>
      <p>Bonjour {session.user.name}</p>
      <p>Rôle: {session.user.role}</p>
    </div>
  );
}
```

#### 3. API Routes

```ts
import { auth } from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: "Non authentifié" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    user: session.user,
  });
}
```

#### 4. Vérification du rôle

```tsx
import { auth } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  return <h1>Page Admin</h1>;
}
```

## 📝 Processus d'inscription

### Flux d'inscription utilisateur

1. **Accès à l'inscription** : L'utilisateur clique sur "S'inscrire" dans le header ou visite `/register`
2. **Formulaire d'inscription** : L'utilisateur remplit le formulaire avec :
   - Nom (minimum 2 caractères)
   - Email (format valide)
   - Mot de passe (minimum 6 caractères)
   - Confirmation du mot de passe
3. **Validation client** : Le formulaire est validé côté client avant envoi
4. **API d'inscription** : Envoi à `POST /api/auth/register`
5. **Création utilisateur** : Ajout dans la base de données avec rôle "member" par défaut
6. **Hashage du mot de passe** : Le mot de passe est hashé avec bcrypt
7. **Connexion automatique** : Si l'inscription réussit, l'utilisateur est connecté automatiquement
8. **Redirection** : Redirection vers la page d'accueil

### Fichiers d'inscription

- **`src/app/register/page.tsx`** : Page d'inscription avec formulaire et validation
- **`src/app/api/auth/register/route.ts`** : API route pour créer un nouvel utilisateur
- **`src/lib/auth/password.ts`** : Fonctions de hashage et validation

### Sécurité de l'inscription

- Validation des entrées (email, longueur du mot de passe)
- Vérification des doublons d'email
- Mot de passe hashé avec bcrypt (12 rounds)
- Rôle par défaut : "member"

## 🧪 Tests d'authentification

### Checklist de test

#### Configuration initiale
- [ ] Fichier `.env.local` créé avec `NEXTAUTH_SECRET`
- [ ] Application démarre sans erreur (`npm run dev`)
- [ ] Base de données PostgreSQL accessible

#### Page de connexion
- [ ] La page `/login` s'affiche correctement
- [ ] Connexion avec identifiants valides fonctionne
- [ ] Connexion avec identifiants invalides affiche une erreur
- [ ] Connexion Google fonctionnelle (si configuré)

#### Header / Navigation
- [ ] Utilisateur non connecté : icône utilisateur visible
- [ ] Utilisateur connecté : nom affiché avec menu déroulant
- [ ] Menu contient "Dashboard" pour tous les utilisateurs
- [ ] Menu contient "Administration" uniquement pour les admins

#### Pages protégées
- [ ] `/dashboard` inaccessible sans connexion
- [ ] `/admin` inaccessible sans connexion
- [ ] `/admin` inaccessible pour les members
- [ ] Déconnexion fonctionne correctement

## 🚀 Déploiement et production

### Points d'attention pour la production

1. **Variables d'environnement sécurisées**
   - `NEXTAUTH_SECRET` doit être un secret fort et unique
   - `DATABASE_URL` doit utiliser SSL/TLS
   - Ne jamais exposer les secrets dans le code

2. **Base de données**
   - Utiliser PostgreSQL en production
   - Configurer les backups réguliers
   - Activer les connexions SSL

3. **Sécurité**
   - Activer HTTPS
   - Configurer les headers CSP
   - Utiliser des cookies sécurisés

### Migration vers la production

Pour passer en production, s'assurer de :

1. **Configuration complète** : toutes les variables d'environnement définies
2. **Base de données** : PostgreSQL avec migrations appliquées
3. **HTTPS** : certificat SSL configuré
4. **Domaine** : `NEXTAUTH_URL` pointant vers le domaine de production
5. **Providers OAuth** : IDs et secrets configurés si utilisés

## 📚 Documentation complémentaire

- [NextAuth.js v4 Documentation](https://next-auth.js.org/)
- [Configuration Options](https://next-auth.js.org/configuration/options)
- [Credentials Provider](https://next-auth.js.org/configuration/providers/credentials)
- [Callbacks](https://next-auth.js.org/configuration/callbacks)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
