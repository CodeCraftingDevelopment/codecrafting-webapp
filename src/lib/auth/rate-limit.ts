/**
 * Rate limiting simple en mémoire pour protéger les endpoints critiques
 * Note: Reset lors du redémarrage du serveur (acceptable pour un déploiement single-instance)
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests = new Map<string, RateLimitEntry>();
  private cleanupInterval: NodeJS.Timeout;
  
  constructor(
    private maxRequests: number = 5,
    private windowMs: number = 15 * 60 * 1000 // 15 minutes
  ) {
    // Nettoyer les entrées expirées toutes les minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60 * 1000);
  }
  
  /**
   * Vérifie si une requête est autorisée
   * @param identifier Identifiant unique (IP, email, etc.)
   * @returns true si la requête est autorisée, false sinon
   */
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const entry = this.requests.get(identifier);
    
    // Si aucune entrée existe ou si la fenêtre est expirée
    if (!entry || now > entry.resetTime) {
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs
      });
      return true;
    }
    
    // Si le nombre de requêtes est dépassé
    if (entry.count >= this.maxRequests) {
      return false;
    }
    
    // Incrémenter le compteur
    entry.count++;
    return true;
  }
  
  /**
   * Obtenir le temps restant avant la réinitialisation
   * @param identifier Identifiant unique
   * @returns Temps restant en millisecondes
   */
  getResetTime(identifier: string): number {
    const entry = this.requests.get(identifier);
    return entry ? Math.max(0, entry.resetTime - Date.now()) : 0;
  }
  
  /**
   * Nettoyer les entrées expirées
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetTime) {
        this.requests.delete(key);
      }
    }
  }
  
  /**
   * Arrêter le rate limiter
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

// Instance globale pour l'endpoint d'inscription
export const registerRateLimiter = new RateLimiter(
  5, // Maximum 5 tentatives
  15 * 60 * 1000 // Par 15 minutes
);

// Instance globale pour l'endpoint de connexion
export const loginRateLimiter = new RateLimiter(
  10, // Maximum 10 tentatives
  15 * 60 * 1000 // Par 15 minutes
);
