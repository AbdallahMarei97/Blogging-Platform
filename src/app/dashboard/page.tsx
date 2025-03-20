import { getPostsByUserId } from "@/actions/post";
import { auth } from "@/auth";
import CreatePost from "@/components/post/create-post";
import { DataTable } from "@/components/data-table";
import { postColumns } from "@/components/post-column";
import React from "react";

const Dashboard = async () => {
  const session = await auth();
  const posts = await getPostsByUserId(session);

  if ("error" in posts) {
    return <div>No available posts for this user</div>;
  }

  return (
    <div>
      <CreatePost />
      <DataTable data={posts} columns={postColumns} />
    </div>
  );
};

export default Dashboard;
