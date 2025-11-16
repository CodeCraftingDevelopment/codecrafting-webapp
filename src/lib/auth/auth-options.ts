import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { verifyPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/prisma";
import { getGoogleUserRole } from "@/lib/auth/google-role-mapping";

/**
 * Configuration NextAuth v4
 * Documentation: https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  // Adapter Prisma pour la persistance des sessions et comptes
  adapter: PrismaAdapter(prisma),

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
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
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

        // Recherche de l'utilisateur dans PostgreSQL
        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        });

        // Vérification si l'utilisateur existe
        if (!user) {
          return null;
        }

        // Les utilisateurs OAuth n'ont pas de mot de passe
        if (!user.password) {
          return null;
        }

        // Vérification du mot de passe hashé avec bcrypt
        const isValidPassword = await verifyPassword(
          credentials.password,
          user.password,
        );

        if (!isValidPassword) {
          return null;
        }

        // Retourne l'objet utilisateur (sera ajouté à la session)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role.toLowerCase() as "admin" | "member",
        };
      },
    }),
  ],

  // Callbacks pour personnaliser le comportement
  callbacks: {
    /**
     * Callback signIn: appelé lors de la tentative de connexion
     * Permet de valider la connexion - le rôle sera assigné dans jwt callback
     */
    async signIn({ user, account }) {
      // Valider que l'email est présent pour les connexions Google
      if (account?.provider === "google" && !user.email) {
        return false;
      }
      
      // Toutes les connexions sont autorisées
      return true;
    },

    /**
     * Callback JWT: appelé lors de la création/mise à jour du token JWT
     * Permet d'ajouter des données personnalisées (rôle) au token
     */
    async jwt({ token, user, account, trigger, session }) {
      // Initialisation du token avec les données utilisateur
      if (user) {
        token.id = user.id;
        token.email = user.email;
        
        // Pour les utilisateurs Google, utiliser le mapping de rôle
        if (account?.provider === "google" && user.email) {
          const role = getGoogleUserRole(user.email);
          token.role = role;
          token.provider = "google";
          
          // Mettre à jour le rôle dans la base de données SEULEMENT lors de la première connexion
          try {
            await prisma.user.update({
              where: { id: user.id },
              data: { role: role.toUpperCase() as "ADMIN" | "MEMBER" },
            });
          } catch (error) {
            // L'erreur n'est pas critique - le token a déjà le rôle correct
            console.warn("Impossible de mettre à jour le rôle utilisateur:", error);
          }
        } else {
          // Pour les utilisateurs credentials, utiliser le rôle depuis la base de données
          token.role = user.role;
          token.provider = "credentials";
        }
      }
      
      // Rafraîchissement du token : récupérer le rôle depuis la base de données
      // si le provider n'est plus disponible (typique sur les refresh)
      if (!token.role && token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { role: true },
        });
        
        if (dbUser) {
          token.role = dbUser.role.toLowerCase();
        }
      }
      
      return token;
    },

    /**
     * Callback Session: appelé lors de la récupération de la session
     * Permet d'ajouter des données du token JWT à la session client
     */
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as "admin" | "member";
      }
      return session;
    },
  },
};
