"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";

import { LogOut, LayoutDashboard } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const LoggedInNav = ({
  name,
  email,
}: {
  name: string | null | undefined;
  email: string | null | undefined;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="line-clamp-2 text-sm font-medium leading-none">
              {name}
            </p>
            <p className="truncate text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/dashboard/" className="flex w-full items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => signOut({ redirectTo: "/login" })}
        >
          <button className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
