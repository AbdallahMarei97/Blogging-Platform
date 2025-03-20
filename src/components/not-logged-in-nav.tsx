import Link from "next/link";

export const NotLoggedInNav = () => {
  return (
    <nav className="flex items-center gap-1">
      <Link
        className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
        href="/login/"
      >
        Login
      </Link>
      /
      <Link
        className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
        href="/sign-up/"
      >
        Sign Up
      </Link>
    </nav>
  );
};
