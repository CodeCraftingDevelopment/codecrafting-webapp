import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

/**
 * Middleware NextAuth pour protéger des routes
 *
 * Ce middleware permet de protéger automatiquement des routes sans avoir à
 * vérifier l'authentification dans chaque page.
 *
 * Pour activer ce middleware:
 * 1. Renommez ce fichier en "middleware.ts" (supprimez ".example")
 * 2. Le middleware sera automatiquement appliqué aux routes définies dans "matcher"
 *
 * Documentation: https://next-auth.js.org/configuration/nextjs#middleware
 */

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Protection de la route /admin pour les admins uniquement
    if (path.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Cette fonction détermine si le middleware doit s'exécuter
      authorized: ({ token }) => !!token,
    },
  },
);

/**
 * Configuration du matcher
 * Définit les routes sur lesquelles le middleware doit s'appliquer
 */
export const config = {
  matcher: [
    /*
     * Routes protégées:
     * - /dashboard
     * - /admin
     * - /profile
     *
     * Exclut:
     * - /api/auth/* (routes NextAuth)
     * - /_next/* (fichiers Next.js)
     * - /favicon.ico, /robots.txt, etc.
     */
    "/dashboard/:path*",
    "/admin/:path*",
    "/profile/:path*",
  ],
};
