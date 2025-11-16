import { type NextRequest, NextResponse } from "next/server";
import { hashPassword, validatePasswordStrength } from "@/lib/auth/password";
import { registerRateLimiter } from "@/lib/auth/rate-limit";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting basé sur l'IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip")?.trim() ||
      "unknown";

    if (!registerRateLimiter.isAllowed(ip)) {
      const resetTime = registerRateLimiter.getResetTime(ip);
      return NextResponse.json(
        {
          error:
            "Trop de tentatives d'inscription. Veuillez réessayer plus tard.",
          resetTime: Math.ceil(resetTime / 1000), // en secondes
        },
        { status: 429 },
      );
    }

    const { name, email, password } = await request.json();

    // Validation des données reçues
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 },
      );
    }

    // Validation basique
    if (typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Le nom doit contenir au moins 2 caractères." },
        { status: 400 },
      );
    }

    if (typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Veuillez entrer une adresse email valide." },
        { status: 400 },
      );
    }

    if (typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 8 caractères." },
        { status: 400 },
      );
    }

    // Validation avancée du mot de passe
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: "Mot de passe faible", details: passwordValidation.errors },
        { status: 400 },
      );
    }

    // Vérifier si l'utilisateur existe déjà dans PostgreSQL
    const existingUser = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (existingUser) {
      // Vérifier si c'est un compte Google OAuth (sans mot de passe)
      if (!existingUser.password) {
        return NextResponse.json(
          {
            error:
              "Cet email est déjà associé à un compte Google. Veuillez vous connecter avec Google.",
            isGoogleAccount: true,
            suggestion:
              "Utilisez le bouton 'Se connecter avec Google' pour accéder à votre compte.",
          },
          { status: 409 },
        );
      } else {
        // Compte avec mot de passe existant
        return NextResponse.json(
          { error: "Cet email est déjà utilisé." },
          { status: 409 },
        );
      }
    }

    // Hasher le mot de passe avec bcrypt
    const hashedPassword = await hashPassword(password);

    // Créer l'utilisateur dans PostgreSQL
    const user = await prisma.user.create({
      data: {
        email: email.trim().toLowerCase(),
        name: name.trim(),
        password: hashedPassword,
        role: "MEMBER",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    // Retourner l'utilisateur créé (sans le mot de passe)
    return NextResponse.json({
      message: "Inscription réussie !",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.toLowerCase(),
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json(
      { error: "Une erreur serveur est survenue." },
      { status: 500 },
    );
  }
}
