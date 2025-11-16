# Installation PostgreSQL Windows pour CodeCrafting

## 🚀 Installation rapide

### Option 1: Chocolatey (recommandé)
```powershell
# Installer Chocolatey si pas déjà fait
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Installer PostgreSQL
choco install postgresql
```

### Option 2: Installeur officiel
1. Télécharger depuis: https://www.postgresql.org/download/windows/
2. Lancer l'installeur (version recommandée: 15.x ou 16.x)
3. **Important**: Noter le mot de passe utilisateur `postgres` pendant l'installation

## 🗄️ Configuration de la base de données

### 1. Vérifier l'installation
```powershell
# Vérifier que PostgreSQL est installé
psql --version

# Vérifier que le service tourne
Get-Service postgresql*
```

### 2. Créer la base de données
```powershell
# Se connecter à PostgreSQL
psql -U postgres

# Dans psql, créer la base de données
CREATE DATABASE codecrafting;

# Vérifier la création
\l

# Quitter psql
\q
```

### 3. Configuration alternative avec pgAdmin
- Ouvrir pgAdmin (installé avec PostgreSQL)
- Se connecter avec le mot de passe défini pendant l'installation
- Faire clic droit → Databases → Create Database
- Nom: `codecrafting`

## 🔧 Configuration du projet

### 1. Mettre à jour .env
```bash
# Remplacer la ligne DATABASE_URL existante par:
DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@localhost:5432/codecrafting?schema=public"
```

### 2. Initialiser la base de données
```bash
# Installer les dépendances si nécessaire
npm install

# Générer Prisma Client et créer les tables
npm run db:setup

# Ou étape par étape:
npm run db:generate
npm run db:migrate
npm run db:seed
```

## 🚀 Lancer le développement

```bash
# Démarrer le serveur de développement
npm run dev
```

L'application sera disponible sur http://localhost:3000

## 🛠️ Commandes utiles

### PostgreSQL
```powershell
# Démarrer/arrêter le service PostgreSQL
Start-Service postgresql*
Stop-Service postgresql*

# Se connecter à la base de données
psql -U postgres -d codecrafting

# Voir les tables
\dt
```

### Projet
```bash
# Régénérer Prisma Client
npm run db:generate

# Voir les changements de schéma
npm run db:studio

# Réinitialiser la base de données
npm run db:reset
```

## 🔍 Dépannage

### Port déjà utilisé
Si le port 5432 est déjà pris:
```powershell
# Voir qui utilise le port
netstat -ano | findstr :5432

# Changer le port dans PostgreSQL (postgresql.conf)
# Et mettre à jour DATABASE_URL dans .env.local
```

### Connexion refusée
- Vérifier que le service PostgreSQL tourne
- Vérifier le mot de passe dans .env.local
- Vérifier que la base de données `codecrafting` existe

### Permissions Windows
Si problèmes de permissions:
- Lancer PowerShell en tant qu'administrateur
- Réinstaller PostgreSQL avec les droits appropriés

## 📋 Checklist avant de commencer

- [ ] PostgreSQL installé
- [ ] Service PostgreSQL démarré
- [ ] Base de données `codecrafting` créée
- [ ] .env.local configuré avec bon mot de passe
- [ ] `npm run db:setup` exécuté sans erreur
- [ ] `npm run dev` fonctionne

---

**Note**: Conservez Docker comme option de secours avec les commandes `npm run dev:docker` si besoin.
