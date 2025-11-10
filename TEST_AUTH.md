# Plan de test - Authentification NextAuth v4

## ✅ Checklist de test

### 1. Configuration initiale

- [ ] Fichier `.env.local` créé avec `NEXTAUTH_SECRET`
- [ ] Application démarre sans erreur (`npm run dev`)
- [ ] Aucune erreur dans la console du navigateur

### 2. Page de connexion (`/login`)

#### Tests fonctionnels
- [ ] La page `/login` s'affiche correctement
- [ ] Le formulaire contient les champs email et mot de passe
- [ ] Le bouton "Se connecter" est présent

#### Tests de validation
- [ ] Connexion avec email vide → Message d'erreur
- [ ] Connexion avec mot de passe vide → Message d'erreur
- [ ] Connexion avec email invalide → Message d'erreur "Email ou mot de passe invalide"
- [ ] Connexion avec mot de passe incorrect → Message d'erreur "Email ou mot de passe invalide"

#### Tests de connexion réussie
- [ ] Connexion avec `alice@codecrafting.fr` / `Passw0rd!` → Redirection vers `/`
- [ ] Connexion avec `bob@codecrafting.fr` / `Passw0rd!` → Redirection vers `/`

### 3. Header / Navigation

#### Utilisateur non connecté
- [ ] Icône utilisateur (FiUser) visible
- [ ] Clic sur l'icône → Redirection vers `/login`
- [ ] Pas de menu déroulant

#### Utilisateur connecté (Member - Bob)
- [ ] Nom de l'utilisateur affiché dans le header ("Bob Artisan")
- [ ] Clic sur le nom → Menu déroulant s'ouvre
- [ ] Menu contient "Dashboard"
- [ ] Menu ne contient PAS "Administration"
- [ ] Menu contient "Se déconnecter"

#### Utilisateur connecté (Admin - Alice)
- [ ] Nom de l'utilisateur affiché dans le header ("Alice Codecraft")
- [ ] Clic sur le nom → Menu déroulant s'ouvre
- [ ] Menu contient "Dashboard"
- [ ] Menu contient "Administration"
- [ ] Menu contient "Se déconnecter"

### 4. Page Dashboard (`/dashboard`)

#### Accès non authentifié
- [ ] Accès direct à `/dashboard` sans connexion → Redirection vers `/login`

#### Accès authentifié (Bob - Member)
- [ ] Page s'affiche correctement
- [ ] Nom affiché: "Bob Artisan"
- [ ] Email affiché: "bob@codecrafting.fr"
- [ ] Rôle affiché: "member"
- [ ] ID utilisateur affiché: "2"
- [ ] Encadré "Accès Admin" NON visible

#### Accès authentifié (Alice - Admin)
- [ ] Page s'affiche correctement
- [ ] Nom affiché: "Alice Codecraft"
- [ ] Email affiché: "alice@codecrafting.fr"
- [ ] Rôle affiché: "admin"
- [ ] ID utilisateur affiché: "1"
- [ ] Encadré "Accès Admin" visible

### 5. Page Admin (`/admin`)

#### Accès non authentifié
- [ ] Accès direct à `/admin` sans connexion → Redirection vers `/login`

#### Accès authentifié (Bob - Member)
- [ ] Accès à `/admin` en tant que member → Redirection vers `/`

#### Accès authentifié (Alice - Admin)
- [ ] Page s'affiche correctement
- [ ] Titre "Administration" visible
- [ ] Message de bienvenue avec nom: "Bienvenue, Alice Codecraft"
- [ ] Liste des fonctionnalités admin affichée

### 6. Déconnexion

#### Depuis le menu
- [ ] Clic sur "Se déconnecter" dans le menu
- [ ] Redirection vers la page d'accueil
- [ ] Header affiche l'icône utilisateur (non connecté)
- [ ] Accès à `/dashboard` → Redirection vers `/login`

### 7. Session persistante

#### Rafraîchissement de page
- [ ] Se connecter avec Alice
- [ ] Rafraîchir la page (`F5`)
- [ ] Session toujours active (nom affiché dans le header)
- [ ] Accès à `/dashboard` fonctionne sans reconnexion

#### Nouvel onglet
- [ ] Se connecter avec Alice dans l'onglet 1
- [ ] Ouvrir un nouvel onglet (onglet 2)
- [ ] Accéder à `/dashboard` dans l'onglet 2
- [ ] Session active dans l'onglet 2 (pas de redirection vers login)

### 8. Tests de sécurité

#### JWT Token
- [ ] Ouvrir DevTools → Application → Cookies
- [ ] Cookie `next-auth.session-token` présent après connexion
- [ ] Cookie supprimé après déconnexion

#### Protection des routes
- [ ] Impossible d'accéder à `/dashboard` sans être connecté
- [ ] Impossible d'accéder à `/admin` en tant que member
- [ ] Redirection automatique vers `/login` ou `/`

### 9. Tests de performance

#### Temps de chargement
- [ ] Page de login charge en < 1s
- [ ] Connexion réussie en < 2s
- [ ] Changement de page authentifié en < 500ms

#### Console
- [ ] Aucune erreur dans la console
- [ ] Aucun warning NextAuth
- [ ] Aucun warning React

### 10. Tests de compatibilité

#### Navigateurs
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (si disponible)

#### Responsive
- [ ] Mobile (< 768px) - Menu utilisateur fonctionne
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (> 1024px)

## 🐛 Problèmes connus

Documentez ici les problèmes rencontrés:

| Problème | Sévérité | Status | Solution |
|----------|----------|--------|----------|
| Exemple: Session non persistante | Haute | ❌ | Vérifier NEXTAUTH_SECRET |
|  |  |  |  |

## 📊 Résultats des tests

- **Date du test**: ___________
- **Testeur**: ___________
- **Version**: 0.2.0
- **Tests réussis**: ___ / 60
- **Tests échoués**: ___
- **Taux de réussite**: ___%

## 🚀 Prochaines étapes

Après validation de tous les tests:
- [ ] Créer un fichier `.env.production` pour la production
- [ ] Implémenter le hashing des mots de passe (bcrypt)
- [ ] Connecter une vraie base de données
- [ ] Ajouter des tests automatisés (Jest/Playwright)
- [ ] Configurer le CI/CD pour les tests d'authentification
