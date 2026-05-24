import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to conditionally join Tailwind CSS classes and intelligently merge conflicts
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
