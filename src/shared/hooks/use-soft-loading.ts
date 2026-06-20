import { useEffect, useRef, useState } from "react";

interface Params {
	isLoading: boolean;
	showDelay?: number;
	minDisplayTime?: number;
}

/**

 * Makes the loading state more UX-accurate. Returns the flag, indicating that loading UI must be displayed.
 * If the outer `isLoading` becomes fullfilled too fast, hook does not even trigger.
 * If the outer `isLoading` lasts long enough, hook returns `true` until the outer `isLoading` is also `true`,
 * but no shorter than `minDisplayTime` ms.
 * 
 * @example
 * function FooForm() {
 * 	const form = useForm({
 * 		async onSubmit() {
 * 			await new Promise((resolve) => setTimeout(resolve, 50))
 * 		},
 * 	})
 *
 * 	// Real loading state
 * 	const isSubmitting = useStore(form.store, (store) => store.isSubmitting)
 * 	// UX-optimized loading state
 * 	const isLoading = useSoftLoading({ isLoading: isSubmitting })
 *
 * 	return (
 * 		<form
 * 			// Functional attributes are handled with real value
 * 			aria-busy={isSubmitting}
 * 			onSubmit={(e) => {
 * 				e.preventDefault()
 * 				form.handleSubmit()
 * 			}}
 * 		>
 * 			<Button aria-disabled={isSubmitting}>
 * 				<span>Save</span>
 * 				{isLoading && (
 * 					// Visual features are handled with UX-optimized state
 * 					<Loader />
 * 				)}
 * 			</Button>
 * 		</form>
 * 	)
 * }
 */
export function useSoftLoading({ isLoading, showDelay = 100, minDisplayTime = 200 }: Params) {
	const [shouldShowLoader, setShouldShowLoader] = useState(false);

	const showTimerRef = useRef<NodeJS.Timeout>(null);
	const hideTimerRef = useRef<NodeJS.Timeout>(null);
	const loaderShownAtRef = useRef<number>(0);

	useEffect(() => {
		function clearTimers() {
			showTimerRef.current && clearTimeout(showTimerRef.current);
			hideTimerRef.current && clearTimeout(hideTimerRef.current);
		}

		// Loading started. Just set the timeout to show loader and forget
		if (isLoading) {
			clearTimers();

			if (!shouldShowLoader) {
				showTimerRef.current = setTimeout(() => {
					setShouldShowLoader(true);
					loaderShownAtRef.current = Date.now();
				}, showDelay);
			}
		} else {
			// Loading finished, and loader was shown
			if (shouldShowLoader && loaderShownAtRef.current > 0) {
				// Find the time remaining for loader to live

				const elapsedTime = Date.now() - loaderShownAtRef.current;
				const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

				// If loader must live a bit, just hide it in this remaining time
				if (remainingTime > 0) {
					hideTimerRef.current = setTimeout(() => {
						setShouldShowLoader(false);
						loaderShownAtRef.current = 0;
					}, remainingTime);
				}

				// Loader lived enough - let em rip
				else {
					setShouldShowLoader(false);
					loaderShownAtRef.current = 0;
				}
			}

			// Loading also finished, but loader was not shown at all
			else {
				clearTimers();
				setShouldShowLoader(false);
				loaderShownAtRef.current = 0;
			}
		}

		return clearTimers;
	}, [isLoading, shouldShowLoader, showDelay, minDisplayTime]);

	return shouldShowLoader;
}
