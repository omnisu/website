import type { ReactNode } from "react";
import { utils } from "../utils";

interface Props {
	className?: string;
	children: ReactNode;
}

export function Section(props: Props) {
	return (
		<section className={utils.cn("max-w-screen-2xl 2xl:mx-auto", props.className)}>
			{props.children}
		</section>
	);
}
