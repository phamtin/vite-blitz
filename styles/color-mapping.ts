import type { PresetColorKey } from "antd/es/theme/internal";
import {
	Blue,
	Green,
	Red,
	Orange,
	Yellow,
	Violet,
	Lime,
	Pink,
	Cyan,
} from "./colors";

const GRADIENT_MAPPING: Record<
	PresetColorKey,
	{ startColor: string; endColor: string }
> = {
	blue: { startColor: Blue["400"], endColor: Blue["600"] },
	green: { startColor: Green["400"], endColor: Green["600"] },
	red: { startColor: Red["400"], endColor: Red["600"] },
	orange: { startColor: Orange["400"], endColor: Orange["600"] },
	yellow: { startColor: Yellow["400"], endColor: Yellow["600"] },
	volcano: { startColor: Orange["600"], endColor: Orange["800"] },
	geekblue: { startColor: Blue["400"], endColor: Blue["600"] },
	lime: { startColor: Lime["400"], endColor: Lime["600"] },
	gold: { startColor: Yellow["600"], endColor: Yellow["700"] },
	purple: { startColor: Violet["400"], endColor: Violet["600"] },
	cyan: { startColor: Cyan["400"], endColor: Cyan["600"] },
	magenta: { startColor: Red["400"], endColor: Red["600"] },
	pink: { startColor: Pink["400"], endColor: Pink["600"] },
};

export { GRADIENT_MAPPING };
