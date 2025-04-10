type AxisValue = number | `${number}` | `${number}..${number}`;

export type FontAxis = {
	ital?: AxisValue;
	wdth?: AxisValue;
	wght?: AxisValue;
	[axis: symbol]: AxisValue;
};

export type FontFamily<A extends FontAxis> =
	| string
	| {
			family: string;
			axis?: FontAxis | [A, ...Record<keyof A, AxisValue>[]];
	  };

export type LoadStrat = "auto" | "block" | "swap" | "fallback" | "optional";
