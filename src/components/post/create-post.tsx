"use client";
import React from "react";
import { FormValues, PostForm } from "../post-form";
import { Button } from "../ui/button";
import { createPost } from "@/actions/post";
import { toast } from "sonner";

const CreatePost = () => {
  const onSubmit = async (data: FormValues) => {
    console.log(data);

    const post = await createPost(data);
    if ("error" in post) {
      toast("Failed to create post");
    } else {
      toast("Post created successfully");
    }
  };
  return (
    <div>
      <PostForm
        title="Create Post"
        buttonText="Create Post"
        onSubmit={onSubmit}
        dialogTrigger={
          <Button className="ml-auto block cursor-pointer">Create Post</Button>
        }
      />
    </div>
  );
};

export default CreatePost;
