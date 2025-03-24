import { FontAxis, FontFamily, LoadStrat } from "./types";

export function loadGFont<A extends FontAxis>(
	family: FontFamily<A> | FontFamily<A>[],
	opt?: {
		text?: string;
		strat?: LoadStrat;
	},
): Promise<string> {
	const families = Array.isArray(family) ? family : [family];

	const href = `https://fonts.googleapis.com/css2?${families
		.map((family) => {
			if (typeof family === "string") family = { family };
			let spec = `family=${family.family.replaceAll(" ", "+")}`;
			if (!family.axis || Object.keys(family.axis).length === 0) return spec;

			const axes = (
				Array.isArray(family.axis) ? family.axis : [family.axis]
			).map((axis) =>
				Object.fromEntries(
					Object.entries(axis).sort(([axA], [axB]) => axA.localeCompare(axB)),
				),
			);
			return `${spec}:${Object.keys(axes[0]).join(",")}@${axes
				.map((axis) => Object.values(axis).join(","))
				.join(";")}`;
		})
		.join("&")}${
		opt?.text ? `&text=${encodeURIComponent(opt?.text)}` : ""
	}&display=${opt?.strat ?? "swap"}`;

	const loader = document.createElement("link");
	loader.rel = "preload";
	loader.as = "style";
	loader.href = href;

	const promise = new Promise<string>((res, rej) => {
		loader.onload = () => {
			loader.rel = "stylesheet";
			res(`Loaded GFont from ${href}`);
		};
		loader.onerror = () => {
			loader.remove();
			rej(`Failed to load GFont from ${href}`);
		};
	});

	document.head.appendChild(loader);
	return promise;
}
