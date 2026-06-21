"use client";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/styles";

export const toastManager = ToastPrimitive.createToastManager();

export function ToastProvider() {
	return (
		<ToastPrimitive.Provider toastManager={toastManager}>
			<ToastPrimitive.Portal>
				<ToastPrimitive.Viewport className="fixed top-4 left-1/2 z-200 mx-auto flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 flex-col items-center gap-2 sm:top-6">
					<ToastList />
				</ToastPrimitive.Viewport>
			</ToastPrimitive.Portal>
		</ToastPrimitive.Provider>
	);
}

function ToastList() {
	const { toasts } = ToastPrimitive.useToastManager();
	return toasts.map((toast) => (
		<ToastPrimitive.Root
			key={toast.id}
			toast={toast}
			swipeDirection="up"
			className={cn(
				"[--gap:0.75rem] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)+(var(--toast-index)*var(--gap))+var(--toast-swipe-movement-y))]",
				"absolute right-0 top-0 left-0 z-[calc(1000-var(--toast-index))] mx-auto max-w-100 origin-top",
				"transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--peek))+(var(--shrink)*var(--height))))_scale(var(--scale))]",
				"rounded-xl border border-border bg-surface p-4 shadow-xl",
				"after:absolute after:bottom-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
				"data-ending-style:opacity-0",
				"data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))]",
				"data-limited:opacity-0",
				"data-starting-style:transform-[translateY(-150%)]",
				"[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(-150%)]",
				"data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]",
				"data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]",
				"data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
				"data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
				"data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
				"data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
				"data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]",
				"data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]",
				"h-(--height) data-expanded:h-(--toast-height)",
				"[transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s]",
				"select-none",
			)}
		>
			<ToastPrimitive.Content
				className={cn(
					"overflow-hidden transition-opacity duration-250",
					"data-behind:pointer-events-none data-behind:opacity-0",
					"data-expanded:pointer-events-auto data-expanded:opacity-100",
				)}
			>
				<ToastPrimitive.Title className="text-sm font-medium text-surface-foreground mr-6" />
				<ToastPrimitive.Description className="text-sm text-muted/90 mt-0.5" />
				<ToastPrimitive.Close
					className={cn(
						"absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-md cursor-pointer",
						"border-none bg-transparent text-muted transition-colors duration-150",
						"hover:bg-secondary hover:text-foreground",
						"focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
					)}
					aria-label="Close"
				>
					<XIcon className="h-3.5 w-3.5" />
				</ToastPrimitive.Close>
			</ToastPrimitive.Content>
		</ToastPrimitive.Root>
	));
}
