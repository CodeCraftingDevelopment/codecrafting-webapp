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
    maxAge: 7 * 24 * 60 * 60, // 7 jours (réduit de 30 jours pour la sécurité)
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
          // Vérifier s'il s'agit bien d'un compte Google OAuth
          const googleAccount = await prisma.account.findFirst({
            where: { 
              userId: user.id,
              provider: "google"
            }
          });
          
          if (!googleAccount) {
            return null; // Compte sans mot de passe mais pas Google OAuth
          }
          
          return null; // Compte Google OAuth - utiliser connexion Google
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
      const isDebug = process.env.NEXTAUTH_DEBUG === "true";
      
      // Valider que l'email est présent pour les connexions Google
      if (account?.provider === "google") {
        if (!user.email) {
          if (isDebug) {
            console.log("Google sign-in rejected: no email provided");
          }
          return false;
        }
        
        // Vérifier les domaines autorisés
        const allowedDomains = process.env.GOOGLE_ALLOWED_DOMAINS?.split(",").map(domain => domain.trim().toLowerCase()).filter(Boolean);
        
        if (allowedDomains && allowedDomains.length > 0) {
          const emailDomain = user.email.split("@")[1]?.toLowerCase();
          if (!emailDomain || !allowedDomains.includes(emailDomain)) {
            if (isDebug) {
              console.log(`Google sign-in rejected: domain ${emailDomain} not in allowed domains [${allowedDomains.join(", ")}]`);
            }
            return false;
          }
        }
        
        // Vérifier si l'utilisateur existe déjà avec un mot de passe (compte email/mdp)
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email.toLowerCase() },
          select: { password: true }
        });
        
        if (existingUser?.password) {
          if (isDebug) {
            console.log(`Google sign-in rejected: email ${user.email} already has password account`);
          }
          return false;
        }
        
        if (isDebug) {
          console.log(`Google sign-in approved for: ${user.email}`);
        }
      }
      
      // Toutes les connexions autorisées sont validées
      return true;
    },

    /**
     * Callback JWT: appelé lors de la création/mise à jour du token JWT
     * Permet d'ajouter des données personnalisées (rôle) au token
     */
    async jwt({ token, user, account, trigger, session }) {
      const isDebug = process.env.NEXTAUTH_DEBUG === "true";
      
      if (isDebug) {
        console.log("JWT Callback - Input:", { 
          token: token?.email, 
          user: user?.email, 
          account: account?.provider, 
          trigger 
        });
      }
      
      // Initialisation du token avec les données utilisateur (premier login)
      if (user) {
        token.id = user.id;
        token.email = user.email;
        
        // Pour les utilisateurs Google, utiliser le rôle depuis la base de données comme source de vérité
        if (account?.provider === "google" && user.email) {
          // Récupérer le rôle depuis la base de données
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { role: true }
          });
          
          // Utiliser le rôle de la BDD, ou le mapping pour nouveaux utilisateurs
          token.role = dbUser?.role.toLowerCase() || getGoogleUserRole(user.email);
          token.provider = "google";
          
          if (isDebug) {
            console.log("Google user auth:", { 
              userId: user.id, 
              email: user.email, 
              dbRole: dbUser?.role,
              assignedRole: token.role 
            });
          }
        } else {
          // Pour les utilisateurs credentials, utiliser le rôle depuis la base de données
          token.role = user.role;
          token.provider = "credentials";
        }
      }
      
      // NOTE: Le fallback DB a été supprimé pour optimiser les performances
      // Le rôle est maintenant toujours stocké dans le token JWT
      // Si le rôle est manquant, c'est qu'il y a un problème de configuration
      
      if (isDebug) {
        console.log("JWT Callback - Output:", { 
          email: token.email, 
          role: token.role, 
          provider: token.provider 
        });
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
