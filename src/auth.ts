import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./actions/user";
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "@/lib/utils"
import { authConfig } from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await getUserByEmail(
          credentials as { email: string; password: string }
        );
        if ("error" in user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }
        return user;
      },
    }),
  ],
});
