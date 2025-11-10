# 🚀 Guide de migration vers la production

## Vue d'ensemble

Ce guide vous accompagne pour migrer l'authentification mockée vers une solution production avec une vraie base de données.

## 📋 Checklist de migration

### Phase 1: Préparation (1-2h)
- [ ] Choisir la base de données (PostgreSQL recommandé)
- [ ] Installer Prisma
- [ ] Créer le schéma de base de données
- [ ] Configurer les variables d'environnement

### Phase 2: Implémentation (2-4h)
- [ ] Créer le modèle User dans Prisma
- [ ] Implémenter le hashing des mots de passe
- [ ] Adapter auth-options.ts pour utiliser la DB
- [ ] Créer les endpoints d'inscription
- [ ] Ajouter la validation des données

### Phase 3: Sécurité (1-2h)
- [ ] Implémenter le rate limiting
- [ ] Ajouter les logs d'authentification
- [ ] Configurer HTTPS
- [ ] Tester la sécurité

### Phase 4: Tests & Déploiement (2-3h)
- [ ] Tests unitaires
- [ ] Tests d'intégration
- [ ] Tests de charge
- [ ] Déploiement staging
- [ ] Déploiement production

## 🗄️ Étape 1: Configuration de la base de données

### Installation de Prisma

```bash
npm install prisma @prisma/client
npm install -D prisma
npx prisma init
```

### Schéma Prisma

Créez `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  password      String
  role          Role      @default(MEMBER)
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  accounts      Account[]
  sessions      Session[]
  
  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  
  @@unique([identifier, token])
  @@map("verification_tokens")
}

enum Role {
  ADMIN
  MEMBER
}
```

### Variables d'environnement

Mettez à jour `.env.local`:

```env
# NextAuth
NEXTAUTH_SECRET=votre_secret_genere
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/codecrafting?schema=public"
```

### Migration initiale

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## 🔐 Étape 2: Hashing des mots de passe

### Installation de bcrypt

```bash
npm install bcryptjs
npm install -D @types/bcryptjs
```

### Créer un utilitaire de hashing

Créez `src/lib/auth/password.ts`:

```typescript
import bcrypt from "bcryptjs";

/**
 * Hash un mot de passe
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

/**
 * Vérifie un mot de passe
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

/**
 * Valide la force d'un mot de passe
 */
export function validatePasswordStrength(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push("Le mot de passe doit contenir au moins 8 caractères");
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins une majuscule");
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins une minuscule");
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins un chiffre");
  }
  
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins un caractère spécial");
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}
```

## 🔄 Étape 3: Adapter auth-options.ts

### Créer un client Prisma

Créez `src/lib/prisma.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### Mettre à jour auth-options.ts

```typescript
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  
  pages: {
    signIn: "/login",
  },
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  
  providers: [
    CredentialsProvider({
      name: "Email et mot de passe",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Recherche de l'utilisateur dans la DB
        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        });

        if (!user) {
          return null;
        }

        // Vérification du mot de passe hashé
        const isValidPassword = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role.toLowerCase() as "admin" | "member",
        };
      },
    }),
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session.user && token.sub && token.role) {
        session.user.id = token.sub;
        session.user.role = token.role as "admin" | "member";
      }
      return session;
    },
  },
};
```

### Installer l'adapter Prisma

```bash
npm install @next-auth/prisma-adapter
```

## 📝 Étape 4: Endpoint d'inscription

Créez `src/app/api/auth/register/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, validatePasswordStrength } from "@/lib/auth/password";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      );
    }

    // Validation du mot de passe
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: "Mot de passe faible", details: passwordValidation.errors },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 409 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await hashPassword(password);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name,
        password: hashedPassword,
        role: "MEMBER",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { message: "Utilisateur créé avec succès", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
```

## 🔒 Étape 5: Rate Limiting

Créez `src/lib/rate-limit.ts`:

```typescript
import { NextRequest } from "next/server";

interface RateLimitStore {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitStore>();

export function rateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): { success: boolean; remaining: number } {
  const now = Date.now();
  const record = store.get(identifier);

  if (!record || now > record.resetTime) {
    store.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { success: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0 };
  }

  record.count++;
  return { success: true, remaining: limit - record.count };
}

export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
```

## 📊 Étape 6: Logs d'authentification

Créez `src/lib/auth/logger.ts`:

```typescript
import { prisma } from "@/lib/prisma";

export async function logAuthEvent(
  userId: string | null,
  event: "login" | "logout" | "failed_login" | "register",
  metadata?: Record<string, unknown>
) {
  try {
    // Vous pouvez créer une table AuthLog dans Prisma
    console.log({
      timestamp: new Date().toISOString(),
      userId,
      event,
      metadata,
    });
    
    // TODO: Sauvegarder dans la DB si nécessaire
  } catch (error) {
    console.error("Erreur lors du logging:", error);
  }
}
```

## 🧪 Étape 7: Tests

### Script de seed pour la DB

Créez `prisma/seed.ts`:

```typescript
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Créer un admin
  const adminPassword = await bcrypt.hash("Passw0rd!", 10);
  const admin = await prisma.user.upsert({
    where: { email: "alice@codecrafting.fr" },
    update: {},
    create: {
      email: "alice@codecrafting.fr",
      name: "Alice Codecraft",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Créer un member
  const memberPassword = await bcrypt.hash("Passw0rd!", 10);
  const member = await prisma.user.upsert({
    where: { email: "bob@codecrafting.fr" },
    update: {},
    create: {
      email: "bob@codecrafting.fr",
      name: "Bob Artisan",
      password: memberPassword,
      role: "MEMBER",
    },
  });

  console.log({ admin, member });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Ajoutez dans `package.json`:

```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

Exécutez:

```bash
npx prisma db seed
```

## 🚀 Étape 8: Déploiement

### Variables d'environnement production

```env
# NextAuth
NEXTAUTH_SECRET=secret_production_tres_long_et_aleatoire
NEXTAUTH_URL=https://votre-domaine.com

# Database
DATABASE_URL="postgresql://user:password@host:5432/db?schema=public"

# Optional
NODE_ENV=production
```

### Commandes de déploiement

```bash
# Build
npm run build

# Migrations
npx prisma migrate deploy

# Start
npm start
```

## ✅ Checklist finale

Avant de mettre en production:

- [ ] Base de données configurée et accessible
- [ ] Migrations Prisma appliquées
- [ ] Seed exécuté (utilisateurs de test)
- [ ] NEXTAUTH_SECRET unique et sécurisé
- [ ] HTTPS configuré
- [ ] Rate limiting actif
- [ ] Logs d'authentification fonctionnels
- [ ] Tests passés (voir TEST_AUTH.md)
- [ ] Backup de la base de données configuré
- [ ] Monitoring en place

## 📚 Ressources

- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth Prisma Adapter](https://next-auth.js.org/adapters/prisma)
- [bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)

## 🆘 Support

En cas de problème:
1. Vérifier les logs de l'application
2. Vérifier les logs de la base de données
3. Consulter [AUTH_SETUP.md](./AUTH_SETUP.md)
4. Consulter [BEST_PRACTICES_AUTH.md](./BEST_PRACTICES_AUTH.md)
