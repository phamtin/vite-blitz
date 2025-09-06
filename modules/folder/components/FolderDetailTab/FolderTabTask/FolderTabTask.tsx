import { PlusIcon } from "@heroicons/react/24/outline";
import { Button, Collapse, Flex, Table, Typography, type CollapseProps } from "antd";
import Loading from "components/Loading/Loading";
import StatusDot from "components/TaskStatusSelector/StatusDot";
import { ACTIVE_STATUSES } from "constants/constants";
import type { FolderModel } from "modules/folder/types/folder.types";
import TaskApi from "modules/tasks/api/task.api";
import TaskController from "modules/tasks/components/TaskController/TaskController";
import { TASK_FIELDS } from "modules/tasks/constants/task.constant";
import {
  getTaskTableColumns,
  groupImportantTask,
} from "modules/tasks/helper/task.helper";
import useStyles from "modules/tasks/screen/TaskOverviewScreen/styled";
import { useTaskStore } from "modules/tasks/store/task.store";
import { TaskStatus, type TaskModel } from "modules/tasks/types/task.types";
import { useEffect, useState } from "react";
import { Orange } from "styles/colors";

const { Text } = Typography;

type GroupLabelProps = {
  label: TaskStatus;
  length: number;
  importants: { critical: number; high: number };
};

interface FolderTabTaskProps {
  folder: FolderModel;
}

const FolderTabTask = ({folder}: FolderTabTaskProps) => {
  const { styles } = useStyles();
  const folderId = folder._id
  const { viewTask } = useTaskStore();

  const [query, setQuery] = useState("");
  const [markDoneOrUndoneTask, setMarkDoneOrUndoneTask] = useState<TaskModel | null>(
    null,
  );

  const useGetTasks = TaskApi.useGetTasks({
    folderIds: [folderId],
    query,
    fields: TASK_FIELDS.Overview,
  });

  const splitTaskIntoGroups = (tasks: TaskModel[]): CollapseProps["items"] => {
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
    })) satisfies CollapseProps["items"];
  };

  const onClose = () => {
    setMarkDoneOrUndoneTask(null);
    refetchData();
  };

  const { mutationUpdateTask } = TaskApi.useUpdateTask({
    onClose,
    taskId: markDoneOrUndoneTask?._id || "",
  });

  const refetchData = () => {
    useGetTasks.refetch();
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
        columns={getTaskTableColumns(folder, onMarkDone, onMarkUndone)}
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
        folderId: folderId,
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
        loading={useGetTasks.isFetching}
        refetchData={refetchData}
        onSearch={onSearch}
      />

      <Loading loading={useGetTasks.isLoading} />

      <div className={styles.taskCollapse}>
        <Collapse
          size="small"
          ghost
          defaultActiveKey={ACTIVE_STATUSES}
          items={splitTaskIntoGroups(useGetTasks.data ?? [])}
        />
      </div>
    </div>
  );
};

export default FolderTabTask;
