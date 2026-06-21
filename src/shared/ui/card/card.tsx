import type { ReactNode } from "react";
import { cn } from "@/lib/styles";

interface CardProps {
	className?: string;
	size?: "default" | "sm";
	children: ReactNode;
}

/**
 * A card component that supports various sizes and layout options.
 * Utilizes compound components for headers, titles, descriptions, content, and footers.
 *
 * @example
 * <Card size="default">
 *   <Card.Header>
 *     <Card.Title>Card Title</Card.Title>
 *     <Card.Description>Card description text goes here.</Card.Description>
 *     <Card.Action><button>Close</button></Card.Action>
 *   </Card.Header>
 *
 *   <Card.Content>Main card body content.</Card.Content>
 *   <Card.Footer>Footer metadata or action buttons.</Card.Footer>
 * </Card>
 */
export function Card({ size = "default", children, className }: CardProps) {
	return (
		<div
			data-slot="card"
			data-size={size}
			className={cn(
				// Base styles
				"group/card flex flex-col overflow-hidden rounded-lg text-sm",

				// Background & borders
				"bg-[rgba(255,255,255,0.03)] backdrop-filter-[blur(20px)_saturate(1.4)] border-2 border-[rgba(255,255,255,0.08)] shadow-[0_4px_24px_#00000026]",

				// With footer
				"has-data-[slot=card-footer]:pb-0 data-[size=sm]:has-data-[slot=card-footer]:pb-0",

				// Images-related
				"*:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl has-[>img:first-child]:pt-0",

				"gap-(--card-spacing) py-(--card-spacing) [--card-spacing:--spacing(4)] data-[size=sm]:[--card-spacing:--spacing(3)]",
				className,
			)}
		>
			{children}
		</div>
	);
}

interface CardHeaderProps {
	children: ReactNode;
	className?: string;
}

function CardHeader({ children, className }: CardHeaderProps) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				// Base styles
				"group/card-header @container/card-header grid auto-rows-min items-start gap-1",

				// With action
				"has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",

				"px-(--card-spacing) [.border-b]:pb-(--card-spacing)",
				className,
			)}
		>
			{children}
		</div>
	);
}

interface CardTitleProps {
	children: ReactNode;
	className?: string;
}

function CardTitle({ children, className }: CardTitleProps) {
	return (
		<div
			data-slot="card-title"
			className={cn(
				"text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
				className,
			)}
		>
			{children}
		</div>
	);
}

interface CardDescriptionProps {
	children: ReactNode;
	className?: string;
}

function CardDescription({ children, className }: CardDescriptionProps) {
	return (
		<div data-slot="card-description" className={cn("text-sm text-muted-foreground", className)}>
			{children}
		</div>
	);
}

interface CardActionProps {
	children: ReactNode;
	className?: string;
}

function CardAction({ children, className }: CardActionProps) {
	return (
		<div
			data-slot="card-action"
			className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
		>
			{children}
		</div>
	);
}

interface CardContentProps {
	children: ReactNode;
	className?: string;
}

function CardContent({ children, className }: CardContentProps) {
	return (
		<div data-slot="card-content" className={cn("px-(--card-spacing)", className)}>
			{children}
		</div>
	);
}

interface CardContentProps {
	children: ReactNode;
	className?: string;
}

function CardFooter({ children, className }: CardContentProps) {
	return (
		<div
			data-slot="card-footer"
			className={cn(
				"flex items-center border-t-2 border-[rgba(255,255,255,0.08)] p-(--card-spacing)",
				className,
			)}
		>
			{children}
		</div>
	);
}

Card.Header = CardHeader;
Card.Footer = CardFooter;
Card.Title = CardTitle;
Card.Action = CardAction;
Card.Description = CardDescription;
Card.Content = CardContent;
