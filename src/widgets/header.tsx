"use client";

import { useEffect, useRef } from "react";
import { GlassCard } from "@/lib/ui/glass-card";
import { utils } from "@/lib/utils";

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
			<GlassCard
				className={utils.cn(
					"rounded-lg transition-all ease-in-out max-w-screen-2xl mx-auto",
					"group-data-inset:rounded-none group-data-inset:max-w-full",
				)}
			>
				<div className="mx-auto max-w-screen-2xl p-4">
					<span>egormorozov.dev</span>
				</div>
			</GlassCard>
		</header>
	);
}
