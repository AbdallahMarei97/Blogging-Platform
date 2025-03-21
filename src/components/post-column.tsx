"use client";
import { deletePost } from "@/actions/post";
import { type Column } from "./data-table";
import { type post } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { DeletePost } from "./post/delete-post";
import UpdatePost from "./post/update-post";

type Post = InferSelectModel<typeof post>;

export const postColumns: Column<Post>[] = [
  {
    id: "title",
    header: "Title",
    accessorKey: "title",
    className: "w-30 whitespace-normal",
    cell: (item) => item.title,
  },
  {
    id: "body",
    header: "Body",
    accessorKey: "body",
    className: "max-w-46 whitespace-normal break-words",
    cell: (item) => item.body,
  },
  {
    id: "createdAt",
    header: "Created At",
    accessorKey: "createdAt",
    className: "w-20",
    cell: (item) => new Date(item.createdAt).toLocaleDateString(),
  },
  {
    id: "action",
    header: "Action",
    className: "w-36",
    cell: (item) => (
      <div className="flex justify-center space-x-2">
        <UpdatePost {...item} />
        <DeletePost onConfirm={() => deletePost(item.id, item.userId)} />
      </div>
    ),
  },
];
