import type { ReactNode } from "react";
import { cn } from "@/lib/styles";

interface Props {
	className?: string;
	children: ReactNode;
}

/**
 * A layout component that constraints the maximum width of content
 * and centers it horizontally on ultra-wide screens.
 */
export function Section(props: Props) {
	return (
		<section className={cn("max-w-screen-2xl 2xl:mx-auto", props.className)}>
			{props.children}
		</section>
	);
}
