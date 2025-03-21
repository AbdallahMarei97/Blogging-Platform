import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./actions/user";
import { authConfig } from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await getUserByEmail(
          credentials as { email: string; password: string }
        );
        if ("error" in user) {
          throw new Error("Invalid credentials.");
        }
        return user;
      },
    }),
  ],
});
