import { create } from "zustand";
import type { TaskModel, TaskPriority, TaskStatus } from "../types/task.types";

interface TaskState {
	viewingTask: TaskModel | undefined;
	/**
	 *  Used when create new task with custom predefined field
	 */
	predefinedField: {
		status?: TaskStatus;
		priority?: TaskPriority;
		assigneeId?: string;
	};

	viewTask: (
		task: TaskModel | undefined,
		predefinedField: {
			status?: TaskStatus;
			priority?: TaskPriority;
			assigneeId?: string;
		},
	) => void;
}

export const useTaskStore = create<TaskState>()((set) => ({
	viewingTask: undefined,
	predefinedField: {},

	viewTask: (task, predefinedField) => {
		set({ viewingTask: task, predefinedField: predefinedField });
	},
}));
