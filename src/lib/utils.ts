import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidImageUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url); // Parse the URL to ensure it's valid
    const pathname = parsedUrl.pathname; // Extract the path portion of the URL
    return /\.(jpeg|jpg|gif|png|webp|svg)$/.test(pathname); // Check the file extension in the path
  } catch {
    return false; // If the URL is invalid, return false
  }
}
