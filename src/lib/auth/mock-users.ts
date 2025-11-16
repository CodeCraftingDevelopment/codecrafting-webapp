export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "member";
}

export const mockUsers: MockUser[] = [
  {
    id: "1",
    name: "Alice Codecraft",
    email: "alice@codecrafting.fr",
    password: "Passw0rd!",
    role: "admin",
  },
  {
    id: "2",
    name: "Bob Artisan",
    email: "bob@codecrafting.fr",
    password: "Passw0rd!",
    role: "member",
  },
];

/**
 * Ajoute un nouvel utilisateur à la base de données mockée
 * @param name Nom de l'utilisateur
 * @param email Email de l'utilisateur
 * @param password Mot de passe de l'utilisateur
 * @returns L'utilisateur créé ou null si l'email existe déjà
 */
export function addUser(name: string, email: string, password: string): MockUser | null {
  // Vérifier si l'email existe déjà
  const existingUser = mockUsers.find(user => 
    user.email.toLowerCase() === email.toLowerCase()
  );
  
  if (existingUser) {
    return null; // Email déjà utilisé
  }
  
  // Créer le nouvel utilisateur
  const newUser: MockUser = {
    id: (mockUsers.length + 1).toString(),
    name,
    email,
    password,
    role: "member", // Par défaut, les nouveaux inscrits sont "member"
  };
  
  // Ajouter à la liste des utilisateurs
  mockUsers.push(newUser);
  
  return newUser;
}
