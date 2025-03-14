import dayjs from "dayjs";
import type { CreateTaskRequest } from "../types/task.types";

const toCreateTaskRequest = (
  projectId: string,
  values: CreateTaskRequest
): CreateTaskRequest => {
  const res = {
    projectId,
    title: values.title,
    description: values.description,
    timing: {
      startDate: values.timing?.startDate
        ? dayjs(values.timing.startDate).startOf("day").toISOString()
        : undefined,
      endDate: values.timing?.endDate
        ? dayjs(values.timing.endDate).endOf("day").toISOString()
        : undefined,
    },
    assigneeId: values.assigneeId,
    priority: values.priority,
    status: values.status,
    subTasks: values.subTasks,
    additionalInfo: values.additionalInfo,
    tags: values.tags,
  };
  return res;
};

export { toCreateTaskRequest };
