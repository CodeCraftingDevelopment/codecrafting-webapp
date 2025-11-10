"use server";

import { signIn } from "@/lib/auth/session";

export async function authenticate(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("Identifiants invalides");
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if ((error as { message?: string | undefined }).message) {
      throw error;
    }

    throw new Error("Impossible de se connecter avec ces identifiants.");
  }
}
