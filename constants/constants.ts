import { TaskStatus } from "modules/tasks/types/task.types";

export const ACTIVE_STATUSES: TaskStatus[] = [
	TaskStatus.InProgress,
	TaskStatus.Done,
	TaskStatus.NotStartYet,
	TaskStatus.Pending,
];
