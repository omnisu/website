"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/styles";

/**
 * Header Component
 */
export function Header() {
	const headerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const header = headerRef.current;
		if (!header) return;

		/**
		 * Handles scroll events and toggles the data-inset attribute.
		 * This avoids React's rendering cycle and delegates styling to CSS.
		 */
		const handleScroll = () => {
			const isScrolled = window.scrollY > 100;

			if (isScrolled) {
				header.setAttribute("data-inset", "true");
			} else {
				header.removeAttribute("data-inset");
			}
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
			header.removeAttribute("data-inset");
		};
	}, []);

	return (
		<header
			ref={headerRef}
			className="group fixed top-0 left-0 right-0 z-50 p-4 transition-[padding] ease-in-out data-inset:p-0"
		>
			<div
				className={cn(
					"bg-[rgba(255,255,255,0.03)] backdrop-filter-[blur(20px)_saturate(1.4)]",
					"border border-[rgba(255,255,255,0.08)] shadow-[0_4px_24px_#00000026]",

					"rounded-lg transition-all ease-in-out max-w-screen-2xl mx-auto",
					"group-data-inset:rounded-none group-data-inset:max-w-full",
				)}
			>
				<div className="mx-auto max-w-screen-2xl p-4">
					<span>Hello?</span>
				</div>
			</div>
		</header>
	);
}
