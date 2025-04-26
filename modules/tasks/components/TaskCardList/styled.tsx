import { createStyles } from "antd-style";
import { Blue, Neutral, Red, Sky, Yellow } from "styles/colors";
import type { TaskCardListProps } from "./TaskCardList";
import { TaskPriority } from "modules/tasks/types/task.types";

const BORDER_COLOR = {
	[TaskPriority.Low]: Blue[400],
	[TaskPriority.Medium]: Yellow[400],
	[TaskPriority.High]: "orange",
	[TaskPriority.Critical]: Red[600],
};

const useStyles = createStyles(({ token }, props: Partial<TaskCardListProps>) => ({
	wrapper: {
		width: "100%",
		position: "relative",
		padding: 6,
		paddingLeft: 4,
		borderBottom: `1px solid ${Neutral[200]}`,
		borderLeft: `1px solid ${Neutral[200]}`,
		borderRight: `1px solid ${Neutral[200]}`,
		backgroundColor: "white",
		overflow: "hidden",

		"&:first-child": {
			borderTop: `1px solid ${Neutral[200]}`,
			borderTopLeftRadius: token.borderRadiusLG,
			borderTopRightRadius: token.borderRadiusLG,
		},

		"&:last-child": {
			borderBottomLeftRadius: token.borderRadiusLG,
			borderBottomRightRadius: token.borderRadiusLG,
		},

		"&:hover": {
			backgroundColor: Sky[50],
		},
	},

	wrapperTask: {
		paddingLeft: token.paddingXS,
	},

	priorityIndicator: {
		width: 14,
		height: 14,
		borderRadius: 999,
		backgroundColor: BORDER_COLOR[props.task?.priority ?? TaskPriority.Medium],
	},

	title: {
		fontWeight: 600,
		color: Neutral[900],
		fontSize: 13,
		"&:hover": {
			textDecoration: "underline",
			cursor: "pointer",
		},
	},

	description: {
		width: "50%",
		margin: "0px !important",
		color: Neutral[500],
		fontWeight: 500,
	},

	infors: {
		".avatarAssignee": {
			width: 100,
			userSelect: "none",
		},
		".subTasks": {
			width: 100,
			height: 22,
			marginRight: token.marginLG,
			userSelect: "none",
		},
		".timing": {
			width: 100,
			marginRight: token.marginLG,
			".textDiffTime": {
				color: Neutral[600],
				fontWeight: 600,
				fontSize: 11,
				userSelect: "none",
			},
		},
	},
}));

export default useStyles;
