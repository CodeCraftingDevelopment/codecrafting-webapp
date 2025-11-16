/**
 * Mapping des rôles pour les utilisateurs s'authentifiant via Google
 * Permet d'assigner des rôles spécifiques aux comptes Google connus
 */

export interface GoogleRoleMapping {
  [email: string]: "admin" | "member";
}

/**
 * Configuration des rôles pour les utilisateurs Google
 * Ajoutez ici les emails des utilisateurs qui doivent avoir des rôles spécifiques
 */
export const googleRoleMapping: GoogleRoleMapping = {
  // Exemples - remplacez par les vrais emails
  "admin@codecrafting.fr": "admin",
  "christophe.pauliac@gmail.com": "admin",

  // Les utilisateurs non listés auront le rôle "member" par défaut
};

/**
 * Récupère le rôle d'un utilisateur Google basé sur son email
 * @param email Email de l'utilisateur Google
 * @returns Le rôle ("admin" ou "member")
 */
export const getGoogleUserRole = (email: string): "admin" | "member" => {
  return googleRoleMapping[email.toLowerCase()] || "member";
};

/**
 * Vérifie si un email est dans la liste des mappings
 * @param email Email à vérifier
 * @returns true si l'email a un mapping spécifique
 */
export const hasGoogleRoleMapping = (email: string): boolean => {
  return email.toLowerCase() in googleRoleMapping;
};
