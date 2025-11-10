"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Hook personnalisé pour vérifier l'authentification côté client
 * Redirige automatiquement vers /login si non authentifié
 * 
 * @returns Session et status
 * @example
 * ```tsx
 * "use client";
 * 
 * export default function ProtectedComponent() {
 *   const { session, status } = useRequireAuth();
 *   
 *   if (status === "loading") {
 *     return <div>Chargement...</div>;
 *   }
 *   
 *   return <div>Bonjour {session.user.name}</div>;
 * }
 * ```
 */
export function useRequireAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return { session, status };
}

/**
 * Hook personnalisé pour vérifier le rôle admin côté client
 * Redirige vers /login si non authentifié
 * Redirige vers / si authentifié mais pas admin
 * 
 * @returns Session et status
 * @example
 * ```tsx
 * "use client";
 * 
 * export default function AdminComponent() {
 *   const { session, status } = useRequireAdmin();
 *   
 *   if (status === "loading") {
 *     return <div>Chargement...</div>;
 *   }
 *   
 *   return <div>Page admin</div>;
 * }
 * ```
 */
export function useRequireAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/");
    }
  }, [status, session, router]);

  return { session, status };
}

/**
 * Hook personnalisé pour vérifier un rôle spécifique côté client
 * 
 * @param role - Le rôle requis
 * @returns Session et status
 * @example
 * ```tsx
 * "use client";
 * 
 * export default function MemberComponent() {
 *   const { session, status } = useRequireRole("member");
 *   
 *   if (status === "loading") {
 *     return <div>Chargement...</div>;
 *   }
 *   
 *   return <div>Page membre</div>;
 * }
 * ```
 */
export function useRequireRole(role: "admin" | "member") {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user?.role !== role) {
      router.push("/");
    }
  }, [status, session, role, router]);

  return { session, status };
}
