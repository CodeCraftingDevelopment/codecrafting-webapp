import { redirect } from "next/navigation";
import { auth } from "./session";

/**
 * Vérifie qu'un utilisateur est authentifié
 * Redirige vers /login si non authentifié
 * 
 * @returns Session de l'utilisateur authentifié
 * @example
 * ```ts
 * export default async function ProtectedPage() {
 *   const session = await requireAuth();
 *   return <div>Bonjour {session.user.name}</div>;
 * }
 * ```
 */
export async function requireAuth() {
  const session = await auth();
  
  if (!session) {
    redirect("/login");
  }
  
  return session;
}

/**
 * Vérifie qu'un utilisateur est authentifié ET a le rôle admin
 * Redirige vers /login si non authentifié
 * Redirige vers / si authentifié mais pas admin
 * 
 * @returns Session de l'utilisateur admin
 * @example
 * ```ts
 * export default async function AdminPage() {
 *   const session = await requireAdmin();
 *   return <div>Page admin</div>;
 * }
 * ```
 */
export async function requireAdmin() {
  const session = await requireAuth();
  
  if (session.user.role !== "admin") {
    redirect("/");
  }
  
  return session;
}

/**
 * Vérifie qu'un utilisateur a un rôle spécifique
 * Redirige vers /login si non authentifié
 * Redirige vers / si le rôle ne correspond pas
 * 
 * @param role - Le rôle requis
 * @returns Session de l'utilisateur avec le rôle requis
 * @example
 * ```ts
 * export default async function MemberPage() {
 *   const session = await requireRole("member");
 *   return <div>Page membre</div>;
 * }
 * ```
 */
export async function requireRole(role: "admin" | "member") {
  const session = await requireAuth();
  
  if (session.user.role !== role) {
    redirect("/");
  }
  
  return session;
}

/**
 * Récupère la session de l'utilisateur (peut être null)
 * Utile pour les pages qui adaptent leur contenu selon l'état de connexion
 * 
 * @returns Session ou null
 * @example
 * ```ts
 * export default async function HomePage() {
 *   const session = await getOptionalAuth();
 *   
 *   return (
 *     <div>
 *       {session ? (
 *         <p>Bienvenue {session.user.name}</p>
 *       ) : (
 *         <p>Bienvenue, visiteur</p>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export async function getOptionalAuth() {
  return await auth();
}
