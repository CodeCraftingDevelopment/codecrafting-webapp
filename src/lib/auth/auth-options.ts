import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getGoogleUserRole } from "@/lib/auth/google-role-mapping";
import { mockUsers } from "@/lib/auth/mock-users";

/**
 * Recherche un utilisateur par email (insensible à la casse)
 */
const findUserByEmail = (email: string) =>
  mockUsers.find((user) => user.email.toLowerCase() === email.toLowerCase());

/**
 * Configuration NextAuth v4
 * Documentation: https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  // Secret pour signer les tokens JWT (OBLIGATOIRE en production)
  secret: process.env.NEXTAUTH_SECRET,

  // Pages personnalisées
  pages: {
    signIn: "/login",
  },

  // Stratégie de session: JWT (requis pour CredentialsProvider)
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },

  // Providers d'authentification
  providers: [
    // Provider Google pour l'authentification OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Provider Credentials pour l'authentification par email/mot de passe
    CredentialsProvider({
      // Nom affiché sur la page de connexion
      name: "Email et mot de passe",

      // Définition des champs du formulaire
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "exemple@codecrafting.fr",
        },
        password: {
          label: "Mot de passe",
          type: "password",
        },
      },

      /**
       * Fonction d'autorisation appelée lors de la tentative de connexion
       * Retourne un objet User si les credentials sont valides, null sinon
       */
      async authorize(credentials) {
        // Validation des credentials
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Recherche de l'utilisateur
        const user = findUserByEmail(credentials.email);

        // Vérification du mot de passe
        // ⚠️ ATTENTION: En production, utiliser bcrypt.compare() ou similar
        if (!user || user.password !== credentials.password) {
          return null;
        }

        // Retourne l'objet utilisateur (sera ajouté au JWT)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  // Callbacks pour personnaliser le comportement
  callbacks: {
    /**
     * Callback JWT: appelé lors de la création/mise à jour du token
     * Permet d'ajouter des données personnalisées au JWT
     */
    async jwt({ token, user }) {
      // Lors de la première connexion, user est défini
      if (user) {
        // ID de l'utilisateur : utiliser user.id (Credentials) ou token.sub (Google) avec fallback UUID
        token.id = user.id || token.sub || crypto.randomUUID();

        // Rôle de l'utilisateur :
        // - Credentials: user.role est déjà défini
        // - Google: lookup via email avec fallback "member"
        const userRole =
          (user as any).role || getGoogleUserRole(user.email || "");
        token.role = userRole;
      }
      return token;
    },

    /**
     * Callback Session: appelé lors de la récupération de la session
     * Permet d'ajouter des données du JWT à la session
     */
    async session({ session, token }) {
      if (session.user && token.id && token.role) {
        session.user.id = token.id;
        session.user.role = token.role as "admin" | "member";
      }
      return session;
    },
  },
};
