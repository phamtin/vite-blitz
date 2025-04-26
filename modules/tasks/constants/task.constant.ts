import dayjs from "dayjs";
import {
	type CreateTaskRequest,
	TaskPriority,
	TaskStatus,
} from "../types/task.types";
import type { ToDayjs } from "types/app.type";

const DEFAULT_CREATE_TASK: ToDayjs<CreateTaskRequest> = {
	title: "",
	projectId: "",
	timing: {},
	subTasks: [],
	status: TaskStatus.NotStartYet,
	priority: TaskPriority.Medium,
};

export { DEFAULT_CREATE_TASK };
