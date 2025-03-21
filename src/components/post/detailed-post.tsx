import React from "react";
import Image from "next/image";
import { isValidImageUrl } from "@/lib/utils";

interface PostProps {
  title: string;
  body: string;
  userName: string;
  imagePath: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export const DetailedPost: React.FC<PostProps> = ({
  title,
  body,
  imagePath,
  createdAt,
  updatedAt,
  userName,
}) => {
  const imageUrl = isValidImageUrl(imagePath)
    ? imagePath
    : "/default_placeholder.png";
  return (
    <div className="p-4">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={imageUrl}
          alt={title}
          width={300}
          height={200}
          objectFit="cover"
          className="rounded-t-lg h-48 w-full object-cover"
        />
      </div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 w-48 mx-auto mb-4 break-words">{body}</p>
      <div className="text-sm text-gray-500">
        <p>Created By: {userName ? userName : "not available"}</p>
        <p>
          Created At:{" "}
          {createdAt
            ? new Date(createdAt).toLocaleDateString()
            : "not available"}
        </p>
        <p>
          Updated At:{" "}
          {updatedAt
            ? new Date(updatedAt).toLocaleDateString()
            : "not available"}
        </p>
      </div>
    </div>
  );
};
