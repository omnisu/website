"use client";

import { useEffect, useRef } from "react";

/**
 * Header Component
 */
export function Header() {
	const headerRef = useRef<HTMLDivElement>(null);
	const innerHeaderRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const header = headerRef.current;
		const innerHeader = innerHeaderRef.current;

		if (!header || !innerHeader) return;

		/**
		 * Handles scroll events and applies classes directly to DOM elements.
		 * This is more reliable than useState as it avoids React's rendering cycle
		 * and ensures immediate class application.
		 */
		const handleScroll = () => {
			const isScrolled = window.scrollY > 100;

			if (isScrolled) {
				// When scrolled: remove padding, remove rounded corners, flatten to edges
				header.classList.remove("p-4");
				header.classList.add("p-0");
				innerHeader.classList.remove("rounded-lg");
				innerHeader.classList.add("rounded-none", "mx-0");
			} else {
				// When at top: restore padding and rounded corners
				header.classList.remove("p-0");
				header.classList.add("p-4");
				innerHeader.classList.remove("rounded-none", "mx-0");
				innerHeader.classList.add("rounded-lg");
			}
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (header && innerHeader) {
				header.classList.remove("p-0");
				header.classList.add("p-4");
				innerHeader.classList.remove("rounded-none", "mx-0");
				innerHeader.classList.add("mx-4", "rounded-lg");
			}
		};
	}, []);

	return (
		<div ref={headerRef} className="fixed top-0 left-0 right-0 z-50 p-4 transition-all ease-in-out">
			<header
				ref={innerHeaderRef}
				className="
          transition-all ease-in-out
          p-4 rounded-lg
          bg-[rgba(255,255,255,0.03)]
          border border-[rgba(255,255,255,0.08)]
          backdrop-filter-[blur(20px)_saturate(1.4)]
          shadow-[0_4px_24px_#00000026]
        "
			>
				<span>Test</span>
			</header>
		</div>
	);
}
