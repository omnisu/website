"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/styles";
import { AuroraBackground } from "./aurora-background";

interface Props {
	className?: string;
}

export function AuroraAtTop(props: Props) {
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

	const { resolvedTheme } = useTheme();

	return (
		<div className={cn("relative h-svh w-full", props.className)}>
			<div ref={sentinelRef} className="absolute top-0 h-px w-full" />

			<div
				ref={auroraWrapperRef}
				className="absolute inset-0 data-[at-top=true]:fixed data-[at-top=true]:top-0"
			>
				<AuroraBackground
					colorStops={
						resolvedTheme === "dark"
							? ["#030712", "#06b6d4", "#4f46e5"]
							: ["#00f2fe", "#0040ff", "#ffffff"]
					}
				/>
			</div>
		</div>
	);
}
