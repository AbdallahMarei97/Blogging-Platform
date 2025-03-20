import Link from "next/link";

import { CenteredContainer } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <CenteredContainer className="text-center">
        <div className="space-y-2">
          <Badge variant="destructive" className="text-base font-semibold">
            404
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Page not found
          </h1>
          <p className="mb-8 text-lg text-gray-700">
            Sorry, we couldn&apos;t find the page you were looking for.
          </p>
          <Button asChild>
            <Link href="/">Go back to home page</Link>
          </Button>
        </div>
      </CenteredContainer>
    </>
  );
}
