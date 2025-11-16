import { NextRequest, NextResponse } from "next/server";
import { addUser } from "@/lib/auth/mock-users";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validation des données reçues
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    // Validation basique
    if (typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Le nom doit contenir au moins 2 caractères." },
        { status: 400 }
      );
    }

    if (typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Veuillez entrer une adresse email valide." },
        { status: 400 }
      );
    }

    if (typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 6 caractères." },
        { status: 400 }
      );
    }

    // Ajouter l'utilisateur
    const newUser = addUser(name.trim(), email.trim().toLowerCase(), password);

    if (!newUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé." },
        { status: 409 }
      );
    }

    // Retourner l'utilisateur créé (sans le mot de passe)
    return NextResponse.json({
      message: "Inscription réussie !",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json(
      { error: "Une erreur serveur est survenue." },
      { status: 500 }
    );
  }
}
