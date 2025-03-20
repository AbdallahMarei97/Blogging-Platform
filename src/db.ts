import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/db/schema";

const drizzleClientSingleton = () => {
  const queryClient = process.env.POSTGRES_URL!;
  return drizzle(queryClient, { schema });
};

declare const globalThis: {
  drizzleGlobal: ReturnType<typeof drizzleClientSingleton>;
} & typeof global;

export const db = globalThis.drizzleGlobal ?? drizzleClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.drizzleGlobal = db;
