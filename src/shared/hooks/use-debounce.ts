import { useEffect, useState } from "react";

/**
 * Delays updating a value until a specified delay has passed.
 * Useful for debouncing rapid inputs like search queries.
 *
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 300);
 */
export function useDebounce<T>(value: T, delay = 500) {
	const [debouncedState, setDebouncedState] = useState<T>(value);

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedState(value), delay);
		return () => {
			clearTimeout(timeout);
		};
	}, [value, delay]);

	return debouncedState;
}
