"use client";

import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import { utils } from "../utils";

// ============================================================================
// SHADER SOURCES
// ============================================================================

/**
 * Vertex Shader - Simple pass-through that positions a full-screen triangle.
 *
 * The triangle covers the entire clip space (from -1 to 1 on both axes),
 * which is more efficient than drawing a quad (2 triangles) and handles
 * edge cases better.
 */
const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

/**
 * Fragment Shader - Generates the aurora borealis effect.
 *
 * Uses Simplex noise to create organic, flowing patterns and applies
 * a horizontal color gradient with smooth alpha blending to simulate
 * ethereal light curtains.
 */
const FRAG = `#version 300 es
precision highp float;

// Uniforms passed from JavaScript
uniform float uTime;           // Animation time in seconds
uniform float uAmplitude;      // Controls the intensity/height of the aurora
uniform vec3 uColorStops[3];   // Three colors for the horizontal gradient
uniform vec2 uResolution;      // Viewport dimensions (width, height)
uniform float uBlend;          // Controls the softness of the aurora edges

out vec4 fragColor;

/**
 * 3D permutation function for noise generation.
 * Part of the Simplex noise implementation.
 */
vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

/**
 * 2D Simplex noise function.
 * Creates smooth, organic patterns that animate naturally.
 * 
 * @param v - 2D input coordinate
 * @returns Smooth noise value between -1.0 and 1.0
 */
float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

/**
 * ColorStop structure for gradient definition.
 * Associates a color with a position along the gradient.
 */
struct ColorStop {
  vec3 color;
  float position;
};

/**
 * Macro for evaluating a color ramp (gradient) at a given factor.
 * 
 * @param colors   - Array of ColorStop structs
 * @param factor   - Position along gradient (0.0 to 1.0)
 * @param finalColor - Output interpolated color
 */
#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  // Normalized pixel coordinates (0.0 to 1.0)
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  // Define three color stops at positions 0.0, 0.5, and 1.0
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);  // Left edge
  colors[1] = ColorStop(uColorStops[1], 0.5);  // Center
  colors[2] = ColorStop(uColorStops[2], 1.0);  // Right edge
  
  // Get gradient color based on horizontal position (uv.x)
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  
  // Generate organic height field using Simplex noise
  // Frequency: 2x horizontally, moving slowly with time
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);  // Exponential to create sharper peaks
  height = (uv.y * 2.0 - height + 0.2);
  
  // Base intensity is proportional to height
  float intensity = 0.6 * height;
  
  // Edge blending - creates soft, glowing transitions
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  // Final color = gradient color modulated by intensity, with alpha for soft glow
  vec3 auroraColor = intensity * rampColor;
  
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Props {
	/** Array of 3 hex color strings for the horizontal gradient (left, center, right) */
	colorStops?: string[];
	/** Controls the height/intensity of the aurora waves (default: 1.0) */
	amplitude?: number;
	/** Softness of the aurora edges, higher = more diffuse (default: 0.5) */
	blend?: number;
	/** Current time value for animation (optional, defaults to animation frame time) */
	time?: number;
	/** Animation speed multiplier (default: 1.0) */
	speed?: number;
	/** Additional CSS classes to apply to the container div */
	className?: string;
}

// ============================================================================
// REACT COMPONENT
// ============================================================================

/**
 * AuroraBackground Component
 *
 * Renders a dynamic, animated aurora borealis effect using WebGL.
 * The effect features:
 * - Organic, flowing wave patterns via Simplex noise
 * - Horizontal gradient with customizable colors
 * - Adjustable amplitude and edge softness
 * - Smooth, continuous animation
 * - Transparent background for overlaying on content
 *
 * @example
 * ```tsx
 * // Basic usage with default colors
 * <AuroraBackground />
 *
 * // Custom colors and intensity
 * <AuroraBackground
 *   colorStops={["#ff0000", "#00ff00", "#0000ff"]}
 *   amplitude={1.5}
 *   blend={0.3}
 *   className="rounded-lg shadow-lg"
 * />
 *
 * // Slow, subtle aurora
 * <AuroraBackground
 *   speed={0.3}
 *   amplitude={0.6}
 *   blend={0.7}
 * />
 * ```
 *
 * @remarks
 * - Requires a WebGL-capable browser
 * - The component automatically handles cleanup and context loss
 * - Best used as a full-screen or large background element
 * - For performance, the shader runs entirely on GPU
 * - The component uses `utils.cn()` for className merging (similar to clsx)
 */
export function AuroraBackground({ className, ...props }: Props) {
	// Destructure with defaults
	const {
		colorStops = ["#5227FF", "#7cff67", "#5227FF"], // Purple to green to purple
		amplitude = 1.0,
		blend = 0.5,
	} = props;

	// Use ref to access latest props in animation loop without re-registering
	// This allows props to update without tearing down and recreating the WebGL context
	const propsRef = useRef<Props>(props);
	propsRef.current = props;

	// DOM container reference for the WebGL canvas
	const ctnDom = useRef<HTMLDivElement>(null);

	// Animation loop should not re-run when props change - props are accessed via ref
	// biome-ignore lint/correctness/useExhaustiveDependencies: Valid use
	useEffect(() => {
		const ctn = ctnDom.current;
		if (!ctn) return;

		// ========================================================================
		// WEBGL INITIALIZATION
		// ========================================================================

		// Create WebGL renderer with transparency and antialiasing
		const renderer = new Renderer({
			alpha: true, // Enable transparency for overlaying on content
			premultipliedAlpha: true, // Optimize transparent rendering performance
			antialias: true, // Smooth edges for cleaner appearance
		});
		const gl = renderer.gl;

		// Configure blending for transparent aurora on dark background
		gl.clearColor(0, 0, 0, 0); // Clear to fully transparent
		gl.enable(gl.BLEND); // Enable alpha blending
		gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); // Standard alpha blending formula
		gl.canvas.style.backgroundColor = "transparent";

		let program: Program | undefined;

		// ========================================================================
		// RESIZE HANDLER
		// ========================================================================

		/**
		 * Adjusts renderer size and updates shader uniforms when container resizes.
		 * Ensures the effect always fills its container correctly, even on window resize
		 * or orientation changes.
		 */
		function resize() {
			if (!ctn) return;
			const width = ctn.offsetWidth;
			const height = ctn.offsetHeight;
			renderer.setSize(width, height);
			if (program) {
				// Update shader with new resolution for correct aspect ratio
				program.uniforms.uResolution.value = [width, height];
			}
		}
		window.addEventListener("resize", resize);

		// ========================================================================
		// GEOMETRY SETUP
		// ========================================================================

		// Create full-screen triangle (more efficient than a quad - saves 2 vertices and 1 draw call)
		const geometry = new Triangle(gl);
		if (geometry.attributes.uv) {
			// UVs not needed for this effect since we calculate coordinates from fragment position
			delete geometry.attributes.uv;
		}

		// Convert hex color strings to RGB arrays (0-1 range) for shader uniforms
		const colorStopsArray = colorStops.map((hex) => {
			const c = new Color(hex);
			return [c.r, c.g, c.b];
		});

		// ========================================================================
		// SHADER PROGRAM
		// ========================================================================

		program = new Program(gl, {
			vertex: VERT,
			fragment: FRAG,
			uniforms: {
				uTime: { value: 0 }, // Animation time
				uAmplitude: { value: amplitude }, // Wave intensity
				uColorStops: { value: colorStopsArray }, // Gradient colors
				uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] }, // Viewport size
				uBlend: { value: blend }, // Edge softness
			},
		});

		// Create mesh (combines geometry and program) and append canvas to DOM
		const mesh = new Mesh(gl, { geometry, program });
		ctn.appendChild(gl.canvas);

		// ========================================================================
		// ANIMATION LOOP
		// ========================================================================

		let animateId = 0;

		/**
		 * Main animation loop - runs at 60fps (or browser's refresh rate).
		 * Updates shader uniforms and re-renders each frame.
		 *
		 * @param t - Current timestamp in milliseconds from requestAnimationFrame
		 */
		const update = (t: number) => {
			animateId = requestAnimationFrame(update);

			// Get latest props (allows real-time updates without re-creating the effect)
			// time defaults to t * 0.01 to convert milliseconds to seconds and slow down animation
			const { time = t * 0.01, speed = 1.0 } = propsRef.current;

			if (program) {
				// Update all uniforms with current prop values
				program.uniforms.uTime.value = time * speed * 0.1; // Further speed adjustment
				program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? 1.0;
				program.uniforms.uBlend.value = propsRef.current.blend ?? blend;

				// Recalculate color stops if they changed (expensive but necessary for dynamic updates)
				const stops = propsRef.current.colorStops ?? colorStops;
				program.uniforms.uColorStops.value = stops.map((hex: string) => {
					const c = new Color(hex);
					return [c.r, c.g, c.b];
				});

				// Render the frame
				renderer.render({ scene: mesh });
			}
		};

		animateId = requestAnimationFrame(update);
		resize(); // Initial size setup

		// ========================================================================
		// CLEANUP
		// ========================================================================

		return () => {
			// Stop animation loop to prevent memory leaks
			cancelAnimationFrame(animateId);

			// Remove resize event listener
			window.removeEventListener("resize", resize);

			// Remove canvas from DOM
			if (ctn && gl.canvas.parentNode === ctn) {
				ctn.removeChild(gl.canvas);
			}

			// Force WebGL context loss to free GPU memory
			// This is important for preventing memory leaks in long-running apps
			gl.getExtension("WEBGL_lose_context")?.loseContext();
		};
	}, [amplitude]); // Only re-run if amplitude changes (other props handled via ref)

	// Render container div with merged className
	// utils.cn is a utility function that merges class names (similar to clsx or classnames)
	return <div ref={ctnDom} className={utils.cn("w-full h-full", className)} />;
}
