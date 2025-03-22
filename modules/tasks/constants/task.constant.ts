import dayjs from "dayjs";
import { type TaskModel, TaskPriority, TaskStatus } from "../types/task.types";
import type { ToDayjs } from "types/app.type";

const DEFAULT_CREATE_TASK: ToDayjs<TaskModel> = {
	_id: "",
	title: "",
	projectId: "",
	timing: {},
	status: TaskStatus.NotStartYet,
	priority: TaskPriority.Medium,
	createdAt: dayjs(),
};

export { DEFAULT_CREATE_TASK };
