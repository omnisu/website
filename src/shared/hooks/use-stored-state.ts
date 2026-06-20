import { type Dispatch, type SetStateAction, useCallback, useSyncExternalStore } from "react";
import * as v from "valibot";

type StorageType = "localStorage" | "sessionStorage";

function getStorage(type: StorageType): Storage | null {
	if (typeof window === "undefined") {
		return null;
	}
	return type === "sessionStorage" ? window.sessionStorage : window.localStorage;
}

/**
 * Syncs state with localStorage/sessionStorage, validates via Valibot,
 * and automatically listens to cross-tab storage changes.
 *
 * @example
 * const UserSchema = v.object({ name: v.string(), age: v.number() });
 * const [user, setUser] = useStoredState("user-data", UserSchema, { name: "Guest", age: 0 });
 */
export function useStoredState<
	TSchema extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
>(
	key: string,
	schema: TSchema,
	initialValue: v.InferOutput<TSchema>,
	storageType: StorageType = "localStorage",
): [v.InferOutput<TSchema>, Dispatch<SetStateAction<v.InferOutput<TSchema>>>] {
	const subscribeToSource = useCallback((callback: () => void) => {
		if (typeof window === "undefined") {
			return () => {};
		}

		window.addEventListener("storage", callback);
		return () => {
			window.removeEventListener("storage", callback);
		};
	}, []);

	const readFromSource = useCallback(() => {
		const storage = getStorage(storageType);
		if (!storage) {
			return initialValue;
		}

		try {
			const item = storage.getItem(key);
			if (!item) {
				return initialValue;
			}

			const result = v.safeParse(schema, JSON.parse(item));
			return result.success ? result.output : initialValue;
		} catch {
			return initialValue;
		}
	}, [key, schema, initialValue, storageType]);

	const state = useSyncExternalStore(
		subscribeToSource,
		readFromSource,
		() => initialValue, // SSR fallback
	);

	const setState = useCallback(
		(
			value: v.InferOutput<TSchema> | ((prev: v.InferOutput<TSchema>) => v.InferOutput<TSchema>),
		) => {
			const storage = getStorage(storageType);
			if (!storage) {
				return;
			}

			try {
				const currentStore = readFromSource();
				const newValue = value instanceof Function ? value(currentStore) : value;

				storage.setItem(key, JSON.stringify(newValue));

				// Dispatch a local event so other components in the SAME tab also update immediately
				window.dispatchEvent(new Event("storage"));
			} catch {}
		},
		[key, storageType, readFromSource],
	);

	return [state, setState];
}
