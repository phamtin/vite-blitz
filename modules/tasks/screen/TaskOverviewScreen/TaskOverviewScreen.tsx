import { PlusIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { Button, Collapse, Flex, Table, Typography, type CollapseProps } from "antd";
import api from "api/api";
import Loading from "components/Loading/Loading";
import StatusDot from "components/TaskStatusSelector/StatusDot";
import { ACTIVE_STATUSES } from "constants/constants";
import type { FolderModel } from "modules/folder/types/folder.types";
import TaskApi from "modules/tasks/api/task.api";
import TaskController from "modules/tasks/components/TaskController/TaskController";
import {
  getTaskTableColumns,
  groupImportantTask,
} from "modules/tasks/helper/task.helper";
import { useTaskStore } from "modules/tasks/store/task.store";
import {
  TaskStatus,
  type CreateTaskResponse,
  type TaskModel,
} from "modules/tasks/types/task.types";
import { useEffect, useState } from "react";
import useAppState from "store";
import { Orange } from "styles/colors";
import useStyles from "./styled";

const { Text } = Typography;

type GroupLabelProps = {
  label: TaskStatus;
  length: number;
  importants: { critical: number; high: number };
};

const TaskOverviewScreen = () => {
  const { styles } = useStyles();
  const activeFolder = useAppState(
    (state) => state.folders.activeFolder as FolderModel,
  );
  const { viewTask } = useTaskStore();

  const [query, setQuery] = useState("");
  const [markDoneOrUndoneTask, setMarkDoneOrUndoneTask] = useState<TaskModel | null>(
    null,
  );

  const useQueryGetTasks = useQuery({
    queryKey: ["getTasks", activeFolder._id, query],
    queryFn: ({ signal }) => {
      const res: Promise<CreateTaskResponse> = api
        .get(`tasks`, { signal })
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
        [TaskStatus.Archived]: [],
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
        children: renderTaskTable(taskGroups[status]),
      })) as CollapseProps["items"];
    },
  });

  const onClose = () => {
    setMarkDoneOrUndoneTask(null);
    refetchData();
  };

  const { mutationUpdateTask } = TaskApi.useUpdateTask({
    onClose,
    taskId: markDoneOrUndoneTask?._id || "",
  });

  const refetchData = () => {
    useQueryGetTasks.refetch();
  };

  const onMarkDone = (task: TaskModel) => {
    setMarkDoneOrUndoneTask(task);
  };

  const onMarkUndone = (task: TaskModel) => {
    setMarkDoneOrUndoneTask(task);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!markDoneOrUndoneTask) return;

    if (markDoneOrUndoneTask.status === TaskStatus.Done) {
      mutationUpdateTask.mutate({ status: TaskStatus.InProgress });
    } else {
      mutationUpdateTask.mutate({ status: TaskStatus.Done });
    }
  }, [markDoneOrUndoneTask]);

  const renderTaskTable = (tasks: TaskModel[]) => {
    return (
      <Table<TaskModel>
        rowKey="_id"
        size="small"
        bordered={tasks.length > 0}
        showHeader={false}
        pagination={false}
        columns={getTaskTableColumns(activeFolder, onMarkDone, onMarkUndone)}
        dataSource={tasks}
        onRow={(record) => ({
          onDoubleClick: () => viewTask(record, {}),
        })}
      />
    );
  };

  const onCreateDefinedTask = (status: TaskStatus) => {
    viewTask(
      {
        _id: "",
        title: "",
        status,
        folderId: activeFolder._id,
        timing: {},
        createdAt: new Date(),
      },
      { status },
    );
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
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={8}>
          <StatusDot status={label} />
          <Flex align="center">
            <Text strong style={{ fontSize: 15 }}>
              {`${label}`}&nbsp;&nbsp;
            </Text>
            <div className={styles.badgeCount}>{length} Tasks</div>
          </Flex>
          <Text strong style={{ marginTop: 2, fontSize: 11, color: Orange[600] }}>
            {text}
          </Text>
        </Flex>
        <Flex>
          <Button
            variant="link"
            shape="circle"
            icon={<PlusIcon width={16} />}
            onClick={(e) => {
              e.stopPropagation();
              onCreateDefinedTask(label);
            }}
          />
        </Flex>
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

      <div className={styles.taskCollapse}>
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
