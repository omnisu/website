import type { ComponentProps } from "react";
import { utils } from "../utils";

interface Props extends ComponentProps<"div"> {}

export function GlassCard({ className, ...props }: Props) {
	return (
		<div
			{...props}
			className={utils.cn(
				"bg-[rgba(255,255,255,0.03)] backdrop-filter-[blur(20px)_saturate(1.4)]",
				"border border-[rgba(255,255,255,0.08)] shadow-[0_4px_24px_#00000026]",
				className,
			)}
		/>
	);
}
