import { DOT_MAP } from "modules/tasks/constants/task.constant";
import type { TaskStatus } from "modules/tasks/types/task.types";

const StatusDot = ({ status }: { status: TaskStatus }) => {
	const STYLE = {
		width: 15.6,
		height: 15.6,
		borderRadius: 100,
		background: DOT_MAP[status],
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};

	const STYLE_INNER = {
		width: 8,
		height: 8,
		borderRadius: 100,
		background: DOT_MAP[status],
	};

	const STYLE_INNER_WHITE = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: 13.6,
		height: 13.6,
		borderRadius: 100,
		background: "white",
	};

	return (
		<div style={STYLE}>
			<div style={STYLE_INNER_WHITE}>
				<div style={STYLE_INNER} />
			</div>
		</div>
	);
};

export default StatusDot;
