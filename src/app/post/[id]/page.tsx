import { getPostById } from "@/actions/post";
import { auth } from "@/auth";
import { CommentsList } from "@/components/comment/comments-list";
import { CenteredContainer } from "@/components/container";
import { DetailedPost } from "@/components/post/detailed-post";
import { notFound } from "next/navigation";
import React from "react";

const Post = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();
  const post = await getPostById(session, id);
  if (!post || "error" in post) {
    notFound();
  }

  return (
    <CenteredContainer className="text-center">
      <div>
        <DetailedPost {...post} userName={post.user.userName} />
        <CommentsList comments={post.comments} postId={id} />
      </div>
    </CenteredContainer>
  );
};

export default Post;
