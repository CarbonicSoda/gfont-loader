export type AxisValue =
	| number
	| `${number}`
	| `${number}..${number}`
	| `${number};${string}` // limited typing support due to ts
	| `${number}..${number};${string}`; // limited typing support due to ts

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
