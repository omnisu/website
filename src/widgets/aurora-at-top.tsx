"use client";

import { useEffect, useRef } from "react";
import { AuroraBackground } from "@/lib/ui/aurora-background";

export function AuroraAtTop() {
	const sentinelRef = useRef<HTMLDivElement>(null);
	const auroraWrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const sentinel = sentinelRef.current;
		const wrapper = auroraWrapperRef.current;
		if (!sentinel || !wrapper) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					wrapper.setAttribute("data-at-top", "true");
				} else {
					wrapper.setAttribute("data-at-top", "false");
				}
			},
			{ threshold: 0 },
		);

		observer.observe(sentinel);

		return () => observer.disconnect();
	}, []);

	return (
		<div className="relative h-svh w-full">
			<div ref={sentinelRef} className="absolute top-0 h-px w-full" />

			<div
				ref={auroraWrapperRef}
				className="absolute inset-0 data-[at-top=true]:fixed data-[at-top=true]:top-0"
			>
				<AuroraBackground />
			</div>
		</div>
	);
}
