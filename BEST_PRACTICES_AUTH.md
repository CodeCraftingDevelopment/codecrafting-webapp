# Bonnes pratiques - Authentification NextAuth v4

## 🎯 Principes généraux

### 1. Toujours vérifier l'authentification côté serveur
❌ **Mauvais** - Vérification uniquement côté client:
```tsx
"use client";
export default function ProtectedPage() {
  const { data: session } = useSession();
  if (!session) return <div>Non autorisé</div>;
  return <div>Contenu protégé</div>;
}
```

✅ **Bon** - Vérification côté serveur:
```tsx
import { requireAuth } from "@/lib/auth/guards";

export default async function ProtectedPage() {
  await requireAuth(); // Redirige automatiquement si non authentifié
  return <div>Contenu protégé</div>;
}
```

**Pourquoi ?** La vérification côté client peut être contournée. Toujours protéger les données sensibles côté serveur.

### 2. Utiliser les bons outils selon le contexte

| Contexte | Outil recommandé | Exemple |
|----------|------------------|---------|
| Server Component | `auth()` ou `requireAuth()` | Page protégée |
| Client Component | `useSession()` ou `useRequireAuth()` | Composant interactif |
| API Route | `auth()` | Endpoint API |
| Server Action | `auth()` | Action formulaire |

### 3. Ne jamais exposer de données sensibles

❌ **Mauvais**:
```tsx
// Ne JAMAIS inclure le mot de passe dans la session
return {
  id: user.id,
  email: user.email,
  password: user.password, // ❌ DANGER !
};
```

✅ **Bon**:
```tsx
// Uniquement les données nécessaires
return {
  id: user.id,
  email: user.email,
  name: user.name,
  role: user.role,
};
```

## 🔐 Sécurité

### 1. Variables d'environnement

✅ **Obligatoire en production**:
```env
NEXTAUTH_SECRET=votre_secret_tres_long_et_aleatoire
NEXTAUTH_URL=https://votre-domaine.com
```

**Important**:
- `NEXTAUTH_SECRET` doit être unique et aléatoire (32+ caractères)
- Ne JAMAIS commiter le fichier `.env.local` dans Git
- Utiliser des secrets différents pour dev/staging/prod

### 2. Hashing des mots de passe

❌ **Actuel (développement uniquement)**:
```ts
if (user.password !== credentials.password) {
  return null;
}
```

✅ **Production**:
```ts
import bcrypt from "bcryptjs";

// Lors de l'inscription
const hashedPassword = await bcrypt.hash(password, 10);

// Lors de la connexion
const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);
if (!isValid) {
  return null;
}
```

### 3. Rate limiting

Implémenter une limitation des tentatives de connexion:

```ts
// Exemple avec un cache simple
const loginAttempts = new Map<string, number>();

async function authorize(credentials) {
  const attempts = loginAttempts.get(credentials.email) || 0;
  
  if (attempts >= 5) {
    throw new Error("Trop de tentatives. Réessayez dans 15 minutes.");
  }
  
  const user = await validateUser(credentials);
  
  if (!user) {
    loginAttempts.set(credentials.email, attempts + 1);
    return null;
  }
  
  loginAttempts.delete(credentials.email);
  return user;
}
```

### 4. HTTPS en production

⚠️ **Critique**: NextAuth nécessite HTTPS en production pour la sécurité des cookies.

```env
# Production
NEXTAUTH_URL=https://votre-domaine.com

# Développement local
NEXTAUTH_URL=http://localhost:3000
```

## 🏗️ Architecture

### 1. Séparation des responsabilités

```
src/lib/auth/
├── auth-options.ts    # Configuration NextAuth (providers, callbacks)
├── session.ts         # Utilitaires session serveur
├── guards.ts          # Protection des routes serveur
├── hooks.ts           # Hooks React pour le client
└── mock-users.ts      # Données de test (à remplacer en prod)
```

### 2. Protection des routes

**Niveau 1 - Server Component** (recommandé):
```tsx
import { requireAuth } from "@/lib/auth/guards";

export default async function Page() {
  const session = await requireAuth();
  return <div>Protégé</div>;
}
```

**Niveau 2 - Middleware** (optionnel):
```ts
// middleware.ts
export { default } from "next-auth/middleware";
export const config = { matcher: ["/dashboard/:path*"] };
```

**Niveau 3 - Client Component** (UI uniquement):
```tsx
"use client";
import { useRequireAuth } from "@/lib/auth/hooks";

export default function Component() {
  const { session } = useRequireAuth();
  return <div>Protégé</div>;
}
```

### 3. Gestion des rôles

✅ **Bonne pratique** - Vérification centralisée:
```tsx
// Utiliser les guards
import { requireAdmin } from "@/lib/auth/guards";

export default async function AdminPage() {
  await requireAdmin(); // Vérifie auth + rôle
  return <div>Admin</div>;
}
```

❌ **À éviter** - Vérification manuelle répétée:
```tsx
export default async function AdminPage() {
  const session = await auth();
  if (!session) redirect("/login");
  if (session.user.role !== "admin") redirect("/");
  return <div>Admin</div>;
}
```

## 📝 Callbacks NextAuth

### 1. Callback JWT

Ajouter des données personnalisées au token:

```ts
async jwt({ token, user, account, profile, trigger }) {
  // Première connexion
  if (user) {
    token.id = user.id;
    token.role = user.role;
  }
  
  // Mise à jour de la session (trigger: "update")
  if (trigger === "update") {
    // Recharger les données depuis la DB
    const updatedUser = await getUserById(token.id);
    token.role = updatedUser.role;
  }
  
  return token;
}
```

### 2. Callback Session

Exposer les données du token dans la session:

```ts
async session({ session, token }) {
  if (session.user) {
    session.user.id = token.sub;
    session.user.role = token.role;
  }
  return session;
}
```

### 3. Callback Redirect

Personnaliser les redirections:

```ts
async redirect({ url, baseUrl }) {
  // Redirection après connexion
  if (url.startsWith("/")) return `${baseUrl}${url}`;
  if (new URL(url).origin === baseUrl) return url;
  return baseUrl;
}
```

## 🧪 Tests

### 1. Tests unitaires

```ts
import { authOptions } from "@/lib/auth/auth-options";

describe("NextAuth Configuration", () => {
  it("should have credentials provider", () => {
    expect(authOptions.providers).toHaveLength(1);
    expect(authOptions.providers[0].id).toBe("credentials");
  });
  
  it("should use JWT strategy", () => {
    expect(authOptions.session?.strategy).toBe("jwt");
  });
});
```

### 2. Tests d'intégration

```ts
import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

describe("Protected Component", () => {
  it("should redirect when not authenticated", () => {
    render(
      <SessionProvider session={null}>
        <ProtectedComponent />
      </SessionProvider>
    );
    // Vérifier la redirection
  });
});
```

## 🚀 Performance

### 1. Caching de la session

```tsx
// Server Component
import { cache } from "react";
import { auth } from "@/lib/auth/session";

// Cache la session pour éviter les appels multiples
export const getSession = cache(async () => {
  return await auth();
});
```

### 2. Optimisation des callbacks

```ts
// Éviter les requêtes DB inutiles
async jwt({ token, user }) {
  // ❌ Mauvais - Requête à chaque vérification de token
  const dbUser = await db.user.findUnique({ where: { id: token.id } });
  
  // ✅ Bon - Uniquement lors de la première connexion
  if (user) {
    token.id = user.id;
    token.role = user.role;
  }
  return token;
}
```

## 📚 Ressources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/authentication)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

## ✅ Checklist de sécurité

Avant de déployer en production:

- [ ] `NEXTAUTH_SECRET` défini et unique
- [ ] HTTPS activé
- [ ] Mots de passe hashés (bcrypt)
- [ ] Rate limiting implémenté
- [ ] Validation des inputs
- [ ] Logs d'authentification
- [ ] Tests de sécurité effectués
- [ ] Base de données sécurisée
- [ ] Cookies sécurisés (httpOnly, secure, sameSite)
- [ ] Session timeout configuré
- [ ] Pas de données sensibles dans le JWT
- [ ] Protection CSRF active
