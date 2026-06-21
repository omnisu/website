import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/styles";

export interface NavigationMenuProps
	extends Pick<NavigationMenuPrimitive.Positioner.Props, "align"> {
	className?: string;
	children: ReactNode;
}

export function NavigationMenu({ align = "start", className, children }: NavigationMenuProps) {
	return (
		<NavigationMenuPrimitive.Root
			data-slot="navigation-menu"
			className={cn(
				"group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
				className,
			)}
		>
			{children}
			<NavigationMenuPositioner align={align} />
		</NavigationMenuPrimitive.Root>
	);
}

interface NavigationMenuListProps {
	className?: string;
	children: ReactNode;
}

function NavigationMenuList({ className, children }: NavigationMenuListProps) {
	return (
		<NavigationMenuPrimitive.List
			data-slot="navigation-menu-list"
			className={cn("group flex flex-1 list-none items-center justify-center gap-0", className)}
		>
			{children}
		</NavigationMenuPrimitive.List>
	);
}

interface NavigationMenuItemProps {
	className?: string;
	children: ReactNode;
}

function NavigationMenuItem({ className, children }: NavigationMenuItemProps) {
	return (
		<NavigationMenuPrimitive.Item
			data-slot="navigation-menu-item"
			className={cn("relative", className)}
		>
			{children}
		</NavigationMenuPrimitive.Item>
	);
}

export const navigationMenuTriggerStyle = cva([
	// Base styles
	"group/navigation-menu-trigger inline-flex items-center justify-center font-medium transition-all outline-none",

	// Shape
	"h-9 w-max rounded-lg px-2.5 py-1.5",

	// Hover state
	"hover:hover:bg-secondary/30",

	// Focus state
	"focus:hover:bg-secondary/30 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1",

	// Disabled state
	"disabled:pointer-events-none disabled:opacity-50",

	// Has opened popup
	"data-popup-open:bg-secondary/30 data-popup-open:hover:bg-secondary/30",

	"data-open:bg-secondary/30 data-open:hover:bg-secondary/30 data-open:focus:bg-secondary/30",
]);

interface NavigationMenuTriggerProps {
	className?: string;
	children: ReactNode;
}

function NavigationMenuTrigger({ className, children }: NavigationMenuTriggerProps) {
	return (
		<NavigationMenuPrimitive.Trigger
			data-slot="navigation-menu-trigger"
			className={cn(navigationMenuTriggerStyle(), "group", className)}
		>
			{children}{" "}
			<ChevronDownIcon
				className="relative top-px ml-1 size-3 transition duration-300 group-data-popup-open/navigation-menu-trigger:rotate-180 group-data-open/navigation-menu-trigger:rotate-180"
				aria-hidden="true"
			/>
		</NavigationMenuPrimitive.Trigger>
	);
}

interface NavigationMenuContentProps {
	className?: string;
	children: ReactNode;
}

function NavigationMenuContent({ className, children }: NavigationMenuContentProps) {
	return (
		<NavigationMenuPrimitive.Content
			data-slot="navigation-menu-content"
			className={cn(
				// Base styles
				"group-data-[viewport=false]/navigation-menu:text-foreground",
				// Ring
				"group-data-[viewport=false]/navigation-menu:ring-1 group-data-[viewport=false]/navigation-menu:ring-foreground/10 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",

				"group-data-[viewport=false]/navigation-menu:shadow",

				// Shape
				"h-full w-auto p-1",

				// Transitions
				"transition-[opacity,transform,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[viewport=false]/navigation-menu:duration-300 group-data-[viewport=false]/navigation-menu:data-open:animate-in group-data-[viewport=false]/navigation-menu:data-open:fade-in-0 group-data-[viewport=false]/navigation-menu:data-open:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-closed:animate-out group-data-[viewport=false]/navigation-menu:data-closed:fade-out-0 group-data-[viewport=false]/navigation-menu:data-closed:zoom-out-95",

				// Activation dirs
				"data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:data-activation-direction=left:translate-x-[50%] data-ending-style:data-activation-direction=right:translate-x-[-50%] data-starting-style:data-activation-direction=left:translate-x-[-50%] data-starting-style:data-activation-direction=right:translate-x-[50%]",

				// Motion dirs
				"data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out",

				className,
			)}
		>
			{children}
		</NavigationMenuPrimitive.Content>
	);
}

function NavigationMenuPositioner({
	className,
	side = "bottom",
	sideOffset = 8,
	align = "start",
	alignOffset = 0,
	...props
}: NavigationMenuPrimitive.Positioner.Props) {
	return (
		<NavigationMenuPrimitive.Portal>
			<NavigationMenuPrimitive.Positioner
				side={side}
				sideOffset={sideOffset}
				align={align}
				alignOffset={alignOffset}
				className={cn(
					"isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] data-instant:transition-none data-[side=bottom]:before:-top-2.5 data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0",
					className,
				)}
				{...props}
			>
				<NavigationMenuPrimitive.Popup className="data-[ending-style]:easing-[ease] xs:w-(--popup-width) relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-lg bg-[rgba(255,255,255,0.03)] backdrop-filter-[blur(20px)_saturate(1.4)] border-2 text-foreground border-[rgba(255,255,255,0.08)] shadow-[0_4px_24px_#00000026] transition-[opacity,transform,width,height,scale,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] outline-none data-ending-style:scale-90 data-ending-style:opacity-0 data-ending-style:duration-150 data-starting-style:scale-90 data-starting-style:opacity-0">
					<NavigationMenuPrimitive.Viewport className="relative size-full overflow-hidden" />
				</NavigationMenuPrimitive.Popup>
			</NavigationMenuPrimitive.Positioner>
		</NavigationMenuPrimitive.Portal>
	);
}

interface NavigationMenuLinkProps {
	className?: string;
	render: ReactElement;
}

function NavigationMenuLink({ className, render }: NavigationMenuLinkProps) {
	return (
		<NavigationMenuPrimitive.Link
			data-slot="navigation-menu-link"
			className={cn(
				"flex items-center gap-2 rounded-lg p-2 text-sm transition-all outline-none hover:bg-secondary/30 focus:bg-secondary/30 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 in-data-[slot=navigation-menu-content]:rounded-md data-active:bg-secondary/20 data-active:hover:bg-secondary/30 data-active:focus:bg-secondary/30 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			render={render}
		/>
	);
}

interface NavigationMenuIndicatorProps {
	className?: string;
}

function NavigationMenuIndicator({ className }: NavigationMenuIndicatorProps) {
	return (
		<NavigationMenuPrimitive.Icon
			data-slot="navigation-menu-indicator"
			className={cn(
				"top-full z-1 flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in",
				className,
			)}
		>
			<div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
		</NavigationMenuPrimitive.Icon>
	);
}

NavigationMenu.List = NavigationMenuList;
NavigationMenu.Item = NavigationMenuItem;
NavigationMenu.Trigger = NavigationMenuTrigger;
NavigationMenu.Content = NavigationMenuContent;
NavigationMenu.Link = NavigationMenuLink;
NavigationMenu.Indicator = NavigationMenuIndicator;
