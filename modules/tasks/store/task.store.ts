import { create } from "zustand";
import type { TaskModel } from "../types/task.types";

interface TaskState {
	viewingTask: TaskModel | undefined;

	viewTask: (task: TaskModel | undefined) => void;
}

export const useTaskStore = create<TaskState>()((set) => ({
	viewingTask: undefined,

	viewTask: (task) => set({ viewingTask: task }),
}));
