import { FontAxis, FontFamily, LoadStrat } from "./types";

/**
 * Refer to https://github.com/CarbonicSoda/gfont-loader/blob/master/README.md for usage.
 */
export function loadGFont<A extends FontAxis>(
	family: FontFamily<A> | FontFamily<A>[],
	options?: { text?: string; strat?: LoadStrat },
): Promise<void> {
	const families = Array.isArray(family) ? family : [family];

	const href = `https://fonts.googleapis.com/css2?${families.map(getFamilyQuery).join("&")}${
		options?.text ? `&text=${encodeURIComponent(options.text)}` : ""
	}&display=${options?.strat ?? "swap"}`;

	const loader = document.createElement("link");
	loader.rel = "preload";
	loader.as = "style";
	loader.href = href;

	const loadPromise = new Promise<void>((res, rej) => {
		loader.onload = () => {
			loader.rel = "stylesheet";
			res();
		};
		loader.onerror = () => {
			loader.remove();
			rej(new Error(`failed to load gfont from ${href}`));
		};
	});

	document.head.appendChild(loader);

	return loadPromise;
}

function getFamilyQuery<A extends FontAxis>(family: FontFamily<A>): string {
	if (typeof family === "string") {
		family = { family };
	}

	const spec = `family=${family.family.replaceAll(" ", "+")}`;

	if (!family.axis || Object.keys(family.axis).length === 0) {
		return spec;
	}

	const axis = Array.isArray(family.axis) ? family.axis : [family.axis];

	const axes = axis
		.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)))
		.map((a) => {
			return Object.fromEntries(
				Object.entries(a).sort(([a], [b]) => a.localeCompare(b)),
			);
		});

	return `${spec}:${Object.keys(axes[0]).join(",")}@${axes
		.map((axis) => Object.values(axis).join(","))
		.join(";")}`;
}
