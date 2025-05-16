import {
	type CreateTaskRequest,
	TaskPriority,
	TaskStatus,
} from "../types/task.types";
import type { ToDayjs } from "types/app.type";
import { Blue, Orange, Red, Yellow } from "styles/colors";

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

export { DEFAULT_CREATE_TASK, BORDER_COLOR };
