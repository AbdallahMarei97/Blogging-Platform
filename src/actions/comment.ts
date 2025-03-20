"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { db } from "@/db";
import { comment } from "@/db/schema";

export const createComment = async (postId: string, message: string) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized user");
    }

    const userId = session.user.id;

    await db.insert(comment).values({
      message,
      postId,
      userId,
    });
    revalidatePath(`/post/${postId}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "Failed to create comment",
    };
  }
};

export const deleteComment = async (
  commentId: string,
  postId: string,
  userId: string
) => {
  try {
    const session = await auth();

    if (!session?.user?.id || session?.user?.id !== userId) {
      throw new Error("Unauthorized user");
    }

    await db.delete(comment).where(eq(comment.id, commentId));
    revalidatePath(`/post/${postId}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      error: true,
      message: "Failed to delete comment",
    };
  }
};
