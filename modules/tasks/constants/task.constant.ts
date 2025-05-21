import {
	type CreateTaskRequest,
	TaskPriority,
	TaskStatus,
} from "../types/task.types";
import type { ToDayjs } from "types/app.type";
import { Blue, Gray, Green, Orange, Red, Sky, Yellow } from "styles/colors";

const DEFAULT_CREATE_TASK: ToDayjs<CreateTaskRequest> = {
	title: "",
	folderId: "",
	timing: {},
	subTasks: [],
	status: TaskStatus.NotStartYet,
	priority: TaskPriority.Medium,
};

const BORDER_COLOR = {
	[TaskPriority.Low]: Blue[400],
	[TaskPriority.Medium]: Yellow[400],
	[TaskPriority.High]: Orange[400],
	[TaskPriority.Critical]: Red[600],
};

// This is used for preset color, required by Ant design
const BORDER_COLOR_PRESET = {
	[TaskStatus.NotStartYet]: "blue",
	[TaskStatus.InProgress]: "orange",
	[TaskStatus.Done]: "green",
	[TaskStatus.Pending]: "yellow",
	[TaskStatus.Archived]: "gray",
};

const STATUS_COLOR_MAP = {
	[TaskStatus.NotStartYet]: Sky,
	[TaskStatus.InProgress]: Orange,
	[TaskStatus.Done]: Green,
	[TaskStatus.Pending]: Yellow,
	[TaskStatus.Archived]: Gray,
};

const DOT_MAP: Record<TaskStatus, string> = {
	[TaskStatus.NotStartYet]: `linear-gradient(to bottom, ${STATUS_COLOR_MAP[TaskStatus.NotStartYet][300]}, ${STATUS_COLOR_MAP[TaskStatus.NotStartYet][500]})`,
	[TaskStatus.InProgress]: `linear-gradient(to bottom, ${STATUS_COLOR_MAP[TaskStatus.InProgress][300]}, ${STATUS_COLOR_MAP[TaskStatus.InProgress][500]})`,
	[TaskStatus.Done]: `linear-gradient(to bottom, ${STATUS_COLOR_MAP[TaskStatus.Done][300]}, ${STATUS_COLOR_MAP[TaskStatus.Done][500]})`,
	[TaskStatus.Pending]: `linear-gradient(to bottom, ${STATUS_COLOR_MAP[TaskStatus.Pending][300]}, ${STATUS_COLOR_MAP[TaskStatus.Pending][500]})`,
	[TaskStatus.Archived]: `linear-gradient(to bottom, ${STATUS_COLOR_MAP[TaskStatus.Archived][300]}, ${STATUS_COLOR_MAP[TaskStatus.Archived][500]})`,
};

export {
	DEFAULT_CREATE_TASK,
	BORDER_COLOR,
	BORDER_COLOR_PRESET,
	STATUS_COLOR_MAP,
	DOT_MAP,
};
