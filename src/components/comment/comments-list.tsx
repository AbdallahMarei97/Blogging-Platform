"use client";
import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { deleteComment } from "@/actions/comment";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CreateComment } from "./create-comment";

interface Comment {
  id: string;
  message: string;
  createdAt: Date;
  user: {
    userName: string;
    id: string;
  };
}

interface CommentsListProps {
  comments: Comment[];
  postId: string;
  loggedInUserId: string | undefined;
  postUserId: string | undefined;
}

export const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  postId,
  loggedInUserId = "",
  postUserId,
}) => {
  const [isPending, startTransition] = useTransition();

  const onDelete = async (id: string, userId: string) => {
    startTransition(async () => {
      await deleteComment(id, postId, userId);
    });
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="cursor-pointer" variant="outline">
          Open Comments
        </Button>
      </SheetTrigger>
      <SheetContent className="p-4 overflow-y-scroll">
        <SheetHeader>
          {loggedInUserId ? (
            <SheetTitle>Add Comment</SheetTitle>
          ) : (
            <SheetTitle>Login to add comment</SheetTitle>
          )}
        </SheetHeader>
        <div className="space-y-4">
          {comments.length ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="border rounded-lg p-4 shadow-md flex justify-between items-start"
              >
                <div>
                  <p className="text-gray-800 w-48 mb-2 break-words">
                    {comment.message}
                  </p>
                  <p className="text-sm text-gray-500">
                    Created by:{" "}
                    <span className="font-medium">{comment.user.userName}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Created on:{" "}
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {(loggedInUserId === comment.user.id ||
                  postUserId === loggedInUserId) && (
                  <Button
                    disabled={isPending}
                    onClick={() => onDelete(comment.id, comment.user.id)}
                    variant="destructive"
                    className="cursor-pointer"
                  >
                    Delete
                  </Button>
                )}
              </div>
            ))
          ) : (
            <p className="text-center">No comments yet</p>
          )}
        </div>
        {loggedInUserId && <CreateComment postId={postId} />}
      </SheetContent>
    </Sheet>
  );
};
