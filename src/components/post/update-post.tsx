"use client";
import React from "react";
import { FormValues, PostForm } from "../post-form";
import { Button } from "../ui/button";
import { updatePost } from "@/actions/post";
import { toast } from "sonner";
import { InferSelectModel } from "drizzle-orm";
import { post } from "@/db/schema";

type Post = InferSelectModel<typeof post>;

const UpdatePost = ({ title, body, imagePath, id, userId }: Post) => {
  const onSubmit = async (data: FormValues) => {
    console.log(data);

    const post = await updatePost({ ...data, id, userId });
    if ("error" in post) {
      toast("Failed to update post");
    } else {
      toast("Post Updated successfully");
    }
  };
  return (
    <div>
      <PostForm
        defaultValues={{ title, body, imagePath }}
        title="Edit Post"
        buttonText="Edit Post"
        onSubmit={onSubmit}
        dialogTrigger={<Button className="ml-auto block">Edit Post</Button>}
      />
    </div>
  );
};

export default UpdatePost;
