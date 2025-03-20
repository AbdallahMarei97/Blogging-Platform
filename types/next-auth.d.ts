import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    userName: string;
  }

  interface User {
    userName: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userName: string;
  }
}
