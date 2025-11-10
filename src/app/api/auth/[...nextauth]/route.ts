import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";

// NextAuth v4 handler pour Next.js 13+ App Router
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
