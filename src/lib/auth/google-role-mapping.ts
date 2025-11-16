/**
 * Mapping des rôles pour les utilisateurs s'authentifiant via Google
 * Permet d'assigner des rôles spécifiques aux comptes Google connus
 */

export interface GoogleRoleMapping {
  [email: string]: "admin" | "member";
}

/**
 * Configuration des rôles pour les utilisateurs Google
 * Récupérée depuis les variables d'environnement pour plus de sécurité
 */
export const googleRoleMapping: GoogleRoleMapping = (() => {
  const mapping: GoogleRoleMapping = {};
  
  // Récupérer les emails admin depuis les variables d'environnement
  const adminEmails = process.env.GOOGLE_ADMIN_EMAILS?.split(",").map(email => email.trim().toLowerCase()).filter(Boolean) || [];
  
  // Assigner le rôle admin aux emails spécifiés
  adminEmails.forEach(email => {
    if (email) {
      mapping[email] = "admin";
    }
  });
  
  return mapping;
})();

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
