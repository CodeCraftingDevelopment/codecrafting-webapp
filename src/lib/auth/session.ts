import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth-options";

/**
 * Récupère la session côté serveur (Server Components, API Routes, Server Actions)
 * @returns Session object ou null si non authentifié
 */
export async function auth() {
  return await getServerSession(authOptions);
}
