import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";

export default async function NoPosts() {
  const session = await auth();
  return (
    <>
      <div className="container text-center mt-9">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            No Posts
          </h1>
          <p className="mb-4 text-lg text-gray-700">
            Sorry, there are no posts created yet.
          </p>
          <Button asChild>
            {session?.user ? (
              <Link href="/dashboard">
                Go to your dashboard to create posts
              </Link>
            ) : (
              <Link href="/login">Login to start creating posts</Link>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
