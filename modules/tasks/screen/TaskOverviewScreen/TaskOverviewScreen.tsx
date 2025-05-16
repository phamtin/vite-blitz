import { useState } from "react";
import {
	Typography,
	Flex,
	type CollapseProps,
	Button,
	Table,
	type TableProps,
	Tooltip,
	Tag,
} from "antd";
import TaskController from "modules/tasks/components/TaskController/TaskController";
import { useQuery } from "@tanstack/react-query";
import api from "api/api";
import useAppState from "store";
import {
	TaskStatus,
	type TaskModel,
	type CreateTaskResponse,
} from "modules/tasks/types/task.types";
import type { FolderModel } from "modules/folder/types/folder.types";
import Loading from "components/Loading/Loading";
import useStyles from "./styled";
import { Neutral, Red } from "styles/colors";
import { ACTIVE_STATUSES } from "constants/constants";
import { groupImportantTask } from "modules/tasks/helper/task.helper";
import { useTaskStore } from "modules/tasks/store/task.store";
import TaskCollapse from "modules/tasks/components/TaskCollapse/TaskCollapse";
import { PlusIcon } from "@heroicons/react/16/solid";
import { LinkIcon } from "@heroicons/react/24/outline";

type GroupLabelProps = {
	label: string;
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

	const useQueryGetTasks = useQuery({
		queryKey: ["getTasks", activeFolder._id, query],
		queryFn: ({ signal }) => {
			const res: Promise<CreateTaskResponse> = api
				.get(`tasks?folderId=${activeFolder?._id}&query=${query}`, { signal })
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

	const columns: TableProps<TaskModel>["columns"] = [
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
			width: "30%",
			render: (text) => <Typography.Text strong>{text}</Typography.Text>,
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			width: "15%",
			render: (text) => <Tag>{text}</Tag>,
		},
		{
			title: "Address",
			dataIndex: "address",
			key: "address",
		},
		{
			title: "Tags",
			key: "tags",
			dataIndex: "tags",
			render: (_, { subTasks }) =>
				subTasks?.length ? (
					<Tooltip title={`This ticket has ${subTasks.length} sub-tasks`}>
						<Button size="small" type="text">
							<Flex gap={2}>
								<LinkIcon width={12} color={Neutral[700]} />
								<Typography.Text
									style={{ color: Neutral[600] }}
								>{`${subTasks.length}`}</Typography.Text>
							</Flex>
						</Button>
					</Tooltip>
				) : (
					"-"
				),
		},
	];

	const renderTaskCard = (tasks: TaskModel[]) => {
		return (
			<Table<TaskModel>
				size="small"
				showHeader={false}
				pagination={{ hideOnSinglePage: true }}
				columns={columns}
				dataSource={tasks}
			/>
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
				<Flex align="center">
					<Typography.Text strong style={{ fontSize: 15 }}>
						{`${label} ${length}`}&nbsp;&nbsp;
					</Typography.Text>
					{text && (
						<Typography.Text strong style={{ color: Red[600], fontSize: 12 }}>
							{text}
						</Typography.Text>
					)}
				</Flex>
				<Flex>
					<Button variant="outlined" shape="circle" icon={<PlusIcon width={16} />} />
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

			<TaskCollapse tasks={useQueryGetTasks.data} />
		</div>
	);
};

export default TaskOverviewScreen;
