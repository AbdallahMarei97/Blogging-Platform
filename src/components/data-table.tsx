"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import UpdatePost from "./post/update-post";
import { DeletePost } from "./post/delete-post";
import { deletePost } from "@/actions/post";

export interface TData {
  title: string;
  body: string;
  id: string;
  imagePath: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export function DataTable({ data }: { data: TData[] }) {
  return (
    <Table>
      {!data?.length && <TableCaption>No posts Available</TableCaption>}
      <TableHeader>
        <TableRow>
          <TableHead className="text-center w-30 whitespace-normal">
            Title
          </TableHead>
          <TableHead className="text-center max-w-46 whitespace-normal break-words">
            Body
          </TableHead>
          <TableHead className="text-center w-20">Created At</TableHead>
          <TableHead className="text-center w-36">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="text-center w-30 whitespace-normal">
              {item.title}
            </TableCell>
            <TableCell className="text-center max-w-46 whitespace-normal break-words">
              {item.body}
            </TableCell>
            <TableCell className="text-center w-20">
              {new Date(item.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-center w-36">
              <div className="flex justify-center space-x-2">
                <UpdatePost {...item} />
                <DeletePost
                  onConfirm={() => deletePost(item.id, item.userId)}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
