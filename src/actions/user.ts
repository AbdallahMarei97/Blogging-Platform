"use server";

import bcrypt from "bcryptjs";

import { db } from "@/db";
import { user } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

type User = InferSelectModel<typeof user>;

export async function createUser({
  userName,
  email,
  password,
}: Pick<User, "userName" | "email" | "password">) {
  try {
    const existingUser = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db
      .insert(user)
      .values({
        userName,
        email,
        password: hashedPassword,
      })
      .returning({ insertedId: user.id });

    if (!newUser) {
      throw new Error("Failed to create user");
    }

    return newUser;
  } catch (error) {
    console.error(error);

    return {
      error: true,
      message: "Failed to create user",
    };
  }
}

export async function getUserByEmail({
  email,
  password,
}: Pick<User, "email" | "password">) {
  try {
    const user = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });

    if (!user) {
      throw new Error("User doesn't exist");
    }

    const { password: dbPassword, ...rest } = user;
    const passwordsMatch = await bcrypt.compare(password, dbPassword);

    if (!passwordsMatch) {
      throw new Error("Passwords don't match");
    }

    return rest;
  } catch (error) {
    console.error(error);

    return {
      error: true,
      message: "Failed to get user",
    };
  }
}
