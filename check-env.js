/**
 * Script de diagnostic pour vérifier la configuration NextAuth
 * Exécuter avec: node check-env.js
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🔍 Vérification de la configuration NextAuth...\n");

// Vérifier l'existence du fichier .env.local
const envPath = path.join(__dirname, ".env.local");
const envExists = fs.existsSync(envPath);

console.log(
  `1. Fichier .env.local: ${envExists ? "✅ Existe" : "❌ Manquant"}`,
);

console.log(
  `1. Fichier .env.local path: ${envPath}`,
);

if (envExists) {
  try {
    const envContent = fs.readFileSync(envPath, "utf-8");
    const lines = envContent
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"));

    console.log("   Lignes détectées:");
    lines.forEach((line, index) => {
      console.log(`     [${index}] ${JSON.stringify(line)}`);
    });

    console.log(`   Nombre de variables: ${lines.length}`);

    // Vérifier NEXTAUTH_SECRET
    const hasSecret = lines.some((line) => line.startsWith("NEXTAUTH_SECRET="));
    console.log(
      `2. NEXTAUTH_SECRET: ${hasSecret ? "✅ Défini" : "❌ Manquant"}`,
    );

    if (hasSecret) {
      const secretLine = lines.find((line) =>
        line.startsWith("NEXTAUTH_SECRET="),
      );
      const secret = secretLine.split("=")[1]?.trim();

      if (!secret) {
        console.log("   ⚠️  NEXTAUTH_SECRET est vide");
      } else if (secret.length < 32) {
        console.log(
          `   ⚠️  NEXTAUTH_SECRET trop court (${secret.length} caractères, minimum 32 recommandé)`,
        );
      } else {
        console.log(
          `   ✅ NEXTAUTH_SECRET valide (${secret.length} caractères)`,
        );
      }
    }

    // Vérifier NEXTAUTH_URL
    const hasUrl = lines.some((line) => line.startsWith("NEXTAUTH_URL="));
    console.log(
      `3. NEXTAUTH_URL: ${hasUrl ? "✅ Défini" : "⚠️  Optionnel (utilise http://localhost:3000 par défaut)"}`,
    );
  } catch (error) {
    console.error("❌ Erreur lors de la lecture du fichier:", error.message);
  }
} else {
  console.log("\n❌ Le fichier .env.local est manquant !");
  console.log("\n📝 Pour le créer, exécutez dans PowerShell:");
  console.log(
    "$secret = [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))",
  );
  console.log(
    '"NEXTAUTH_SECRET=$secret" | Out-File -FilePath .env.local -Encoding utf8',
  );
}

console.log("\n✅ Vérification terminée");
console.log("\n💡 Si vous avez modifié .env.local:");
console.log("   1. Supprimez les cookies du navigateur (next-auth.*)");
console.log("   2. Redémarrez le serveur (npm run dev)");
console.log("   3. Reconnectez-vous");
