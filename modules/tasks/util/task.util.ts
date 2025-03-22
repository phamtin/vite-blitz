import dayjs from "dayjs";
import type {
	CreateTaskRequest,
	UpdateTaskRequest,
	TaskModel,
} from "../types/task.types";

const toFormInitialValues = (task: TaskModel) => {
	return {
		_id: task._id,
		projectId: task.projectId || "",
		title: task.title,
		description: task.description,
		timing: {
			startDate: dayjs(task.timing.startDate),
			endDate: dayjs(task.timing.endDate),
		},
		assigneeInfo: task.assigneeInfo?.[0]._id || "",
		priority: task.priority,
		status: task.status,
		subTasks: task.subTasks,
		additionalInfo: task.additionalInfo,
		tags: task.tags,
		createdAt: dayjs(task.createdAt),
	};
};

const toCreateTaskRequest = (task: TaskModel): CreateTaskRequest => {
	const res = {
		projectId: task.projectId,
		title: task.title,
		description: task.description,
		timing: {
			startDate: task.timing?.startDate
				? dayjs(task.timing.startDate).startOf("day").toISOString()
				: undefined,
			endDate: task.timing?.endDate
				? dayjs(task.timing.endDate).endOf("day").toISOString()
				: undefined,
		},
		assigneeId: task.assigneeInfo?.[0]._id || "",
		priority: task.priority,
		status: task.status,
		subTasks: task.subTasks,
		additionalInfo: task.additionalInfo,
		tags: task.tags,
	};
	return res;
};

const toUpdateTaskRequest = (task: any): UpdateTaskRequest => {
	const res: UpdateTaskRequest = {};
	if (task.title) {
		res.title = task.title;
	}
	if (task.description) {
		res.description = task.description;
	}
	if (task.timing) {
		res.timing = {
			...res.timing,
			startDate: task.timing.startDate
				? dayjs(task.timing.startDate).startOf("day").toISOString()
				: undefined,
			endDate: task.timing.endDate
				? dayjs(task.timing.endDate).endOf("day").toISOString()
				: undefined,
		};
	}
	if (task.priority) {
		res.priority = task.priority;
	}
	if (task.status) {
		res.status = task.status;
	}
	if (task.assigneeInfo) {
		res.assigneeId = task.assigneeInfo;
	}
	if (task.subTasks) {
		res.subTasks = task.subTasks;
	}
	if (task.additionalInfo) {
		res.additionalInfo = task.additionalInfo;
	}
	if (task.tags) {
		res.tags = task.tags;
	}
	return res;
};

export { toCreateTaskRequest, toFormInitialValues, toUpdateTaskRequest };
