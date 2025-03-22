import { useState } from "react";
import { Collapse, Typography, Flex, type CollapseProps } from "antd";
import TaskController from "modules/tasks/components/TaskController/TaskController";
import { useQuery } from "@tanstack/react-query";
import api from "api/api";
import useAppState from "store";
import TaskCardList from "modules/tasks/components/TaskCardList/TaskCardList";
import {
  TaskStatus,
  type TaskModel,
  type CreateTaskResponse,
} from "modules/tasks/types/task.types";
import type { ProjectModel } from "modules/project/types/project.types";
import Loading from "components/Loading/Loading";
import useStyles from "./styled";
import { Red } from "styles/colors";
import { ACTIVE_STATUSES } from "constants/constants";
import { groupImportantTask } from "modules/tasks/helper/task.helper";
import { useTaskStore } from "modules/tasks/store/task.store";

type GroupLabelProps = {
  label: string;
  length: number;
  importants: { critical: number; high: number };
};

const TaskOverviewScreen = () => {
  const { styles } = useStyles();
  const activeProject = useAppState(
    (state) => state.projects.activeProject as ProjectModel
  );
  const {viewTask} = useTaskStore();

  const [query, setQuery] = useState("");

  const useQueryGetTasks = useQuery({
    queryKey: ["getTasks", activeProject._id, query],
    queryFn: ({ signal }) => {
      const res: Promise<CreateTaskResponse> = api
        .get(`tasks?projectId=${activeProject?._id}&query=${query}`, { signal })
        .json();
      return res;
    },
    select: (res) => {
      const tasks = res.data ?? [];
      const {
        importantTasks,
        notStartYetTasks,
        inProgressTasks,
        pendingTasks,
        doneTasks,
      } = groupImportantTask(tasks);

      const taskGroups: Record<TaskStatus, TaskModel[]> = {
        [TaskStatus.NotStartYet]: notStartYetTasks,
        [TaskStatus.InProgress]: inProgressTasks,
        [TaskStatus.Pending]: pendingTasks,
        [TaskStatus.Done]: doneTasks,
        [TaskStatus.Archived]: doneTasks,
      };
      return ACTIVE_STATUSES.map((status) => ({
        key: status,
        label: (
          <GroupLabel
            label={status}
            importants={importantTasks[status]}
            length={taskGroups[status].length}
          />
        ),
        children: renderTaskCard(taskGroups[status]),
      })) as CollapseProps["items"];
    },
  });

  const refetchData = () => {
    useQueryGetTasks.refetch();
  };

  const renderTaskCard = (tasks: TaskModel[]) => {
    return tasks.map((task) => (
      <TaskCardList
        key={task._id}
        task={task}
        project={activeProject as ProjectModel}
        onOpenTaskModal={viewTask}
      />
    ));
  };

  const GroupLabel = ({ label, length, importants }: GroupLabelProps) => {
    const { critical, high } = importants;
    let text = "";
    if (critical > 0) {
      text = `${critical} Critical`;
    } else if (high > 0) {
      text = `${high} High`;
    }
    return (
      <Flex align="center">
        <Typography.Text strong style={{ fontSize: 14 }}>
          {`${label}(${length})`}&nbsp;&nbsp;
        </Typography.Text>
        {text && (
          <Typography.Text strong style={{ color: Red[600], fontSize: 12 }}>
            {text}
          </Typography.Text>
        )}
      </Flex>
    );
  };

  const onSearch = (value: string) => {
    setQuery(value);
  };

  return (
    <div className={styles.wrapper}>
      <TaskController
        loading={useQueryGetTasks.isFetching}
        refetchData={refetchData}
        onSearch={onSearch}
      />

      <Loading loading={useQueryGetTasks.isLoading} />

      <div className={styles.list}>
        <Collapse
          size="small"
          ghost
          defaultActiveKey={ACTIVE_STATUSES}
          items={useQueryGetTasks.data}
        />
      </div>
    </div>
  );
};

export default TaskOverviewScreen;
