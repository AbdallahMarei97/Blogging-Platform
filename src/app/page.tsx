import { getPosts } from "@/actions/post";
import { HeroImage } from "@/components/hero-image";
import NoPosts from "@/components/no-posts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { isValidImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();
  if ("error" in posts) {
    return <div>Failed to get posts</div>;
  }

  const postsWithValidImages = posts.map((post) => ({
    ...post,
    imagePath: isValidImageUrl(post.imagePath)
      ? post.imagePath
      : "/default_placeholder.png",
  }));

  return (
    <>
      <HeroImage
        title="Welcome to the Blogging Platform"
        subtitle="Discover amazing posts and stories"
      />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Posts Lists</h1>
        {postsWithValidImages.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {postsWithValidImages.map((post) => (
              <Link className="block" key={post.id} href={`/post/${post.id}`}>
                <Card className="shadow-md">
                  <Image
                    src={post.imagePath}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-md"
                  />
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="truncate line-clamp-1">{post.body}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <NoPosts />
        )}
      </div>
    </>
  );
}
