"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/styles";

interface CheckboxProps {
	id?: string;
	checked?: boolean;
	onCheckedChange?: (newChecked: boolean) => void;
	className?: string;
}

function Checkbox({ className, ...props }: CheckboxProps) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			{...props}
			className={cn(
				// Base styles
				"peer relative flex shrink-0 items-center justify-center transition-colors outline-none",

				// Shape
				"size-4 rounded-sm border border-border",

				// After pseudo
				"after:absolute after:-inset-x-3 after:-inset-y-2",

				// Disabled state
				"group-has-disabled/field:opacity-50",

				// Focus state
				"focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",

				// Disabled state
				"disabled:cursor-not-allowed disabled:opacity-50",

				// Invalid state
				"aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",

				// Checked state
				"data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",

				"dark:bg-input/30",
				className,
			)}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
			>
				<CheckIcon />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
}

export { Checkbox };
