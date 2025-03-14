import {
  TaskPriority,
  TaskStatus,
  type CreateTaskRequest,
} from "../types/task.types";

const DEFAULT_CREATE_TASK: CreateTaskRequest = {
  title: "",
  projectId: "",
  timing: {},
  status: TaskStatus.NotStartYet,
  priority: TaskPriority.Medium,
};

export { DEFAULT_CREATE_TASK };
