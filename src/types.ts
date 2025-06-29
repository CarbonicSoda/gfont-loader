export type FontAxisValue = number | `${number}` | `${number}..${number}`;

export interface FontAxis {
	ital?: FontAxisValue;
	wdth?: FontAxisValue;
	wght?: FontAxisValue;

	[axis: string]: FontAxisValue | undefined;
}

export type FontFamily<A extends FontAxis> =
	| string
	| { family: string; axis?: FontAxis | [A, ...Record<keyof A, FontAxisValue>[]] };

export type LoadStrat = "auto" | "block" | "swap" | "fallback" | "optional";
