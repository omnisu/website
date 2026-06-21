"use client";

import { CircleAlertIcon, CircleDashedIcon, SnowflakeIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { GithubIcon } from "@/icons/github-icon";
import { cn } from "@/lib/styles";
import { NavigationMenu, navigationMenuTriggerStyle } from "@/ui/navigation-menu";

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
					"bg-[rgba(255,255,255,0.03)] backdrop-filter-[blur(20px)_saturate(1.4)] transform-gpu",
					"border-2 border-[rgba(255,255,255,0.08)] shadow-[0_4px_24px_#00000026]",

					"rounded-lg transition-all ease-in-out max-w-screen-2xl mx-auto",
					"group-data-inset:rounded-none group-data-inset:max-w-full",
				)}
			>
				<div className="mx-auto max-w-screen-2xl px-4 h-16 flex items-center justify-between">
					<SnowflakeIcon className="text-blue-900 dark:text-blue-500 size-10" />

					<NavigationMenu>
						<NavigationMenu.List>
							<NavigationMenu.Item>
								<NavigationMenu.Trigger>Example item</NavigationMenu.Trigger>
								<NavigationMenu.Content>
									<ul className="w-96">
										<ListItem href="/docs" title="Title">
											Short description.
										</ListItem>
										<ListItem href="/docs/installation" title="Whats up?">
											Fine thank u
										</ListItem>
									</ul>
								</NavigationMenu.Content>
							</NavigationMenu.Item>

							<NavigationMenu.Item>
								<NavigationMenu.Trigger>Second item</NavigationMenu.Trigger>
								<NavigationMenu.Content>
									<ul className="grid w-50">
										<li>
											<NavigationMenu.Link
												render={
													<Link href="#" className="flex-row items-center gap-2">
														<CircleAlertIcon />
														Backlog
													</Link>
												}
											/>
											<NavigationMenu.Link
												render={
													<Link href="#" className="flex-row items-center gap-2">
														<CircleDashedIcon />
														To Do
													</Link>
												}
											/>
										</li>
									</ul>
								</NavigationMenu.Content>
							</NavigationMenu.Item>
							<NavigationMenu.Item>
								<NavigationMenu.Link
									className={navigationMenuTriggerStyle()}
									render={
										<Link href="/docs">
											<GithubIcon className="size-6" />
										</Link>
									}
								/>
							</NavigationMenu.Item>
						</NavigationMenu.List>
					</NavigationMenu>
				</div>
			</div>
		</header>
	);
}

function ListItem({
	title,
	children,
	href,
	...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
	return (
		<li {...props}>
			<NavigationMenu.Link
				render={
					<Link href={href}>
						<div className="flex flex-col gap-1 text-sm">
							<div className="leading-none font-medium">{title}</div>
							<div className="line-clamp-2 text-muted-foreground">{children}</div>
						</div>
					</Link>
				}
			/>
		</li>
	);
}
