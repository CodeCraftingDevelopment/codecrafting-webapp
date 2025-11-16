import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth/password";

const prisma = new PrismaClient();

async function main() {
  // Créer un admin
  const adminPassword = await hashPassword("Passw0rd!");
  const _admin = await prisma.user.upsert({
    where: { email: "alice@codecrafting.fr" },
    update: {},
    create: {
      email: "alice@codecrafting.fr",
      name: "Alice Codecraft",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Créer un member
  const memberPassword = await hashPassword("Passw0rd!");
  const _member = await prisma.user.upsert({
    where: { email: "bob@codecrafting.fr" },
    update: {},
    create: {
      email: "bob@codecrafting.fr",
      name: "Bob Artisan",
      password: memberPassword,
      role: "MEMBER",
    },
  });
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
