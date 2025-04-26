import type { Dayjs } from "dayjs";

export type SidebarWidth = "220px" | "54px";

export type ActiveTab = "home" | "tasks" | "meetings";

export type Theme = "light" | "dark";

export type AttributePattern = {
	k: string;
	v: string;
};

export type RecursivePartial<T> = NonNullable<T> extends object
	? {
			[P in keyof T]?: NonNullable<T[P]> extends (infer U)[]
				? RecursivePartial<U>[]
				: NonNullable<T[P]> extends object
					? RecursivePartial<T[P]>
					: T[P];
		}
	: T;

export type ToDayjs<T> = T extends Date
	? Dayjs
	: T extends any[]
		? ToDayjs<T[number]>[]
		: T extends Record<string, any>
			? { [K in keyof T]: ToDayjs<T[K]> }
			: T;
