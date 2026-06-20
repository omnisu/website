"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * A client-side wrapper around `next-themes` Provider to handle theme switching in Next.js App Router.
 * injects the theme class into the `<html>` element and syncs with system preferences.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
	return (
		<NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
			{children}
		</NextThemesProvider>
	);
}
