import React from "react";
import { NotLoggedInNav } from "./not-logged-in-nav";
import { LoggedInNav } from "./logged-in-nav";
import { auth } from "@/auth";
import Link from "next/link";

const Header = async () => {
  const session = await auth();
  return (
    <div className="supports-backdrop-blur:bg-background/60 sticky left-0 right-0 top-0 z-20 border-b bg-background/95 px-4 backdrop-blur">
      <div className="flex h-14 items-center justify-between gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tighter md:text-2xl"
        >
          Blogging Platform
        </Link>
        <div className="flex items-center gap-2">
          {!session?.user ? (
            <NotLoggedInNav />
          ) : (
            <LoggedInNav
              name={session?.user?.userName}
              email={session?.user?.email}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
