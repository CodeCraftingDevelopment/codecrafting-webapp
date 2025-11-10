"use server";

/**
 * Action serveur pour authentifier un utilisateur
 * 
 * Note: Dans NextAuth v4, il n'y a pas de méthode serveur native pour signIn.
 * Cette fonction n'est actuellement pas utilisée car la page de login
 * utilise le client-side signIn() de next-auth/react, qui est l'approche recommandée.
 * 
 * Pour une authentification côté serveur, il faudrait:
 * 1. Valider les credentials manuellement
 * 2. Créer une session via l'API NextAuth
 * 3. Gérer les cookies manuellement
 * 
 * L'approche client-side avec signIn() de next-auth/react est préférable.
 */
export async function authenticate(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Identifiants invalides" };
  }

  // Dans NextAuth v4, l'authentification doit se faire côté client
  // Cette fonction est conservée pour référence future
  return { 
    error: "Utilisez la méthode client-side signIn() de next-auth/react" 
  };
}
