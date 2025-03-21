import React from "react";
import { getPostById } from "@/actions/post";
import { auth } from "@/auth";
import { CommentsList } from "@/components/comment/comments-list";
import { CenteredContainer } from "@/components/container";
import { DetailedPost } from "@/components/post/detailed-post";
import { notFound } from "next/navigation";

const Post = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();
  const post = await getPostById(id);
  if (!post || "error" in post) {
    notFound();
  }

  return (
    <CenteredContainer className="text-center h-180">
      <div className="border border-gray-200 rounded-lg shadow-lg pb-4 w-200">
        <DetailedPost {...post} userName={post.user.userName} />
        <CommentsList
          loggedInUserId={session?.user?.id}
          comments={post.comments}
          postId={id}
          postUserId={post.user.id}
        />
      </div>
    </CenteredContainer>
  );
};

export default Post;
