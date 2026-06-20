import { useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query and returns its matching state.
 * Safe for Server-Side Rendering (SSR).
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)");
 */
export function useMediaQuery(query: string) {
	return useSyncExternalStore(
		// Subscription
		(cbq) => {
			if (typeof window === "undefined") {
				return () => {};
			}

			const mq = window.matchMedia(query);
			mq.addEventListener("change", cbq);
			return () => mq.removeEventListener("change", cbq);
		},

		// Client and server value getters
		() => window.matchMedia(query).matches,
		() => false,
	);
}
