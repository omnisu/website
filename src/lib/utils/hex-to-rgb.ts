/**
 * Converts a hexadecimal color code to an RGB array with values normalized to [0, 1].
 */
export function hexToRgb(hex: string) {
	const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return m
		? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
		: [1, 1, 1];
}
