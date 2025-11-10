This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Webapp for codecrafting company.

### Install dependencies
```bash
npm install
```

### Configuration

**Important**: Avant de lancer l'application, configurez les variables d'environnement:

1. Créez un fichier `.env.local` à la racine du projet
2. Ajoutez la variable `NEXTAUTH_SECRET` (voir [AUTH_SETUP.md](./AUTH_SETUP.md))

```bash
# Générer un secret (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### Run for development
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication

Ce projet utilise **NextAuth.js v4** pour l'authentification.

📖 **Documentation complète**: [AUTH_SETUP.md](./AUTH_SETUP.md)

**Utilisateurs de test**:
- Admin: `alice@codecrafting.fr` / `Passw0rd!`
- Member: `bob@codecrafting.fr` / `Passw0rd!`

## Plugins 
This project use :
- Biome : https://biomejs.dev/fr/
- Turbopack : https://nextjs.org/docs/app/api-reference/turbopack
- Chakra UI : https://chakra-ui.com/
- Next auth : https://next-auth.js.org/

