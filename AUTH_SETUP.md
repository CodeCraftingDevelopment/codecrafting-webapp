# Configuration NextAuth v4

## 📋 Variables d'environnement requises

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes:

```env
# NextAuth Secret (OBLIGATOIRE en production)
# Générer avec: openssl rand -base64 32
NEXTAUTH_SECRET=votre_secret_ici

# URL de l'application (optionnel en développement)
NEXTAUTH_URL=http://localhost:3000
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

Les utilisateurs mockés sont définis dans `src/lib/auth/mock-users.ts`:

| Email | Mot de passe | Rôle |
|-------|--------------|------|
| alice@codecrafting.fr | Passw0rd! | admin |
| bob@codecrafting.fr | Passw0rd! | member |

## 🏗️ Architecture NextAuth v4

### Fichiers principaux

- **`src/lib/auth/auth-options.ts`**: Configuration NextAuth (providers, callbacks, session)
- **`src/lib/auth/session.ts`**: Utilitaire pour récupérer la session côté serveur
- **`src/lib/auth/mock-users.ts`**: Base de données mockée d'utilisateurs
- **`src/app/api/auth/[...nextauth]/route.ts`**: Route API NextAuth (catch-all)
- **`src/app/login/page.tsx`**: Page de connexion
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

## ⚠️ Points d'attention

### Sécurité actuelle (développement uniquement)

1. **Mots de passe en clair**: Les mots de passe ne sont pas hashés
2. **Base de données mockée**: Les utilisateurs sont en dur dans le code
3. **Pas de validation email**: Aucune vérification d'email

### Migration vers la production

Pour passer en production, il faudra:

1. **Remplacer les mock users par une vraie base de données**
   - Utiliser Prisma, MongoDB, PostgreSQL, etc.
   - Ajouter un adapter NextAuth

2. **Hasher les mots de passe**
   ```bash
   npm install bcryptjs
   npm install -D @types/bcryptjs
   ```
   
   ```ts
   import bcrypt from "bcryptjs";
   
   // Lors de l'inscription
   const hashedPassword = await bcrypt.hash(password, 10);
   
   // Lors de la connexion
   const isValid = await bcrypt.compare(password, user.hashedPassword);
   ```

3. **Ajouter d'autres providers** (optionnel)
   - Google OAuth
   - GitHub OAuth
   - Email magic links

4. **Implémenter la récupération de mot de passe**

5. **Ajouter la validation et vérification d'email**

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
5. **Création utilisateur** : Ajout dans la base mockée avec rôle "member" par défaut
6. **Connexion automatique** : Si l'inscription réussit, l'utilisateur est connecté automatiquement
7. **Redirection** : Redirection vers la page d'accueil

### Fichiers d'inscription

- **`src/app/register/page.tsx`** : Page d'inscription avec formulaire et validation
- **`src/app/api/auth/register/route.ts`** : API route pour créer un nouvel utilisateur
- **`src/lib/auth/mock-users.ts`** : Fonction `addUser()` pour ajouter un utilisateur

### Sécurité de l'inscription

- Validation des entrées (email, longueur du mot de passe)
- Vérification des doublons d'email
- Mot de passe stocké en clair (⚠️ développement uniquement)
- Rôle par défaut : "member"

### Évolutions futures

Pour la production, prévoir :

1. **Hashage des mots de passe** avec bcrypt
2. **Vérification email** avec envoi de lien de confirmation
3. **Rate limiting** pour éviter les abus
4. **CAPTCHA** pour protéger contre les bots
5. **Base de données réelle** avec adapter NextAuth

## 📚 Documentation

- [NextAuth.js v4 Documentation](https://next-auth.js.org/)
- [Configuration Options](https://next-auth.js.org/configuration/options)
- [Credentials Provider](https://next-auth.js.org/configuration/providers/credentials)
- [Callbacks](https://next-auth.js.org/configuration/callbacks)
