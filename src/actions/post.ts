"use server";

import { eq, InferSelectModel } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import type { Session } from "next-auth";

import { auth } from "@/auth";
import { db } from "@/db";
import { post } from "@/db/schema";

type Post = InferSelectModel<typeof post>;

export const getPosts = async () => {
  try {
    const filteredPosts = await db.query.post.findMany({
      with: {
        user: {
          columns: {
            id: true,
            userName: true,
          },
        },
      },
    });

    return filteredPosts;
  } catch (error) {
    console.error(error);

    return {
      error: true,
      message: "Failed to get post",
    };
  }
};

export const getPostsByUserId = async (session: Session | null) => {
  try {
    if (!session?.user?.id) {
      throw new Error("Unauthorized user");
    }

    const userId = session.user.id;

    const postsByUserId = await db.query.post.findMany({
      where: (post, { eq }) => eq(post.userId, userId),
    });

    return postsByUserId;
  } catch (error) {
    console.error(error);

    return {
      error: true,
      message: "Failed to get post",
    };
  }
};

export const getPostById = async (session: Session | null, id: string) => {
  try {
    const post = await db.query.post.findFirst({
      where: (post, { eq }) => eq(post.id, id),
      with: {
        user: {
          columns: {
            userName: true,
            id: true,
          },
        },
        comments: {
          with: {
            user: {
              columns: {
                userName: true,
                id: true,
              },
            },
          },
        },
      },
    });

    if (session?.user?.id !== post?.userId) {
      return undefined;
    }

    return post;
  } catch (error) {
    console.error(error);

    return {
      error: true,
      message: "Failed to get post",
    };
  }
};

export const deletePost = async (id: string, userId?: string) => {
  try {
    const session = await auth();

    if (!session?.user?.id || session?.user?.id !== userId) {
      throw new Error("Unauthorized user");
    }

    await db.delete(post).where(eq(post.id, id));
  } catch (error) {
    console.error(error);

    return {
      error: true,
      message: "Failed to delete post",
    };
  }
  revalidatePath("/dashboard");
};

export const updatePost = async ({
  id,
  title,
  imagePath,
  body,
  userId,
}: Omit<Post, "createdAt" | "updatedAt">) => {
  try {
    const session = await auth();
    const sessionUserId = session?.user?.id;

    if (!id || !sessionUserId || userId !== sessionUserId) {
      throw new Error("Unauthorized user");
    }

    await db
      .update(post)
      .set({
        title,
        imagePath,
        body,
      })
      .where(eq(post.id, id));

    revalidatePath("/dashboard");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      error: true,
      message: "Failed to update post",
    };
  }
};

export const createPost = async ({
  title,
  imagePath,
  body,
}: Pick<Post, "title" | "imagePath" | "body">) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized user");
    }

    const userId = session.user.id;

    await db
      .insert(post)
      .values({
        title,
        imagePath,
        body,
        userId: userId,
      })
      .returning();
    revalidatePath("/dashboard");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      error: true,
      message: "Failed to create post",
    };
  }
};
