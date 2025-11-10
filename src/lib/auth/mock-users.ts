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
