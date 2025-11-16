import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Middleware pour protéger les routes et gérer l'authentification
 * Exécuté au niveau edge avant que la requête n'atteigne les pages
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Routes publiques qui ne nécessitent pas d'authentification
  const publicPaths = [
    "/",
    "/login",
    "/register",
    "/about",
    "/api/auth",
    "/_next",
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml",
  ];
  
  // Vérifier si la route actuelle est publique
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(path)
  );
  
  // Si c'est une route publique, autoriser l'accès
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // Routes admin qui nécessitent le rôle admin
  const adminPaths = [
    "/admin",
  ];
  
  const isAdminPath = adminPaths.some(path => 
    pathname === path || pathname.startsWith(path)
  );
  
  try {
    // Utiliser getToken() pour l'edge runtime compatibility
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    // Si l'utilisateur n'est pas authentifié, rediriger vers login
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Si c'est une route admin, vérifier le rôle
    if (isAdminPath && token.role !== "admin") {
      // Rediriger vers la page d'accueil si pas admin
      return NextResponse.redirect(new URL("/", request.url));
    }
    
    // Autoriser l'accès
    return NextResponse.next();
    
  } catch (error) {
    // En cas d'erreur de session, rediriger vers login
    console.error("Middleware auth error:", error);
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

/**
 * Configuration du matcher pour définir quelles routes utilisent le middleware
 * Exclut les routes statiques et les assets
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
