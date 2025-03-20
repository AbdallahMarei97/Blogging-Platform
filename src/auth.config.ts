import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  // By default, the `id` property does not exist on `token` or `session`.
  callbacks: {
    jwt({ token, user }) {
      // Extending the Session to include user's id
      if (user) {
        token.id = user.id;
        token.userName = user?.userName;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.userName = token.userName;

      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnLogin = nextUrl.pathname.startsWith("/login");
      const isOnRegister = nextUrl.pathname.startsWith("/sign-up");

      if (isOnDashboard) {
        return isLoggedIn;
      }

      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
