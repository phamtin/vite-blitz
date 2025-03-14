import useAppState from "store";
import {
  type TaskMetadata,
  TaskPriority,
  TaskStatus,
} from "../types/task.types";
import type { DefaultOptionType } from "antd/es/select";

type Props = {
  usedForDropdown?: boolean;
};

const useGetTaskMetadata = (props?: Props): TaskMetadata => {
  const activeProject = useAppState((state) => state.projects.activeProject);

  if (!activeProject) {
    return { status: [], priorities: [], tags: [] };
  }

  if (props?.usedForDropdown) {
    const status: DefaultOptionType[] = Object.keys(TaskStatus).map((key) => ({
      value: key,
      label: key,
    }));

    const priorities: DefaultOptionType[] = Object.keys(TaskPriority).map(
      (key) => ({
        value: key,
        label: key,
      })
    );

    const tags: DefaultOptionType[] =
      activeProject.tags?.map(({ _id, name }) => ({
        value: _id,
        label: name,
      })) ?? [];

    return { status, priorities, tags };
  }

  const status = Object.values(TaskStatus);

  const priorities = Object.values(TaskPriority);

  const tags = activeProject.tags ?? [];

  return { status, priorities, tags };
};

const TaskHook = {
  useGetTaskMetadata,
};

export default TaskHook;
