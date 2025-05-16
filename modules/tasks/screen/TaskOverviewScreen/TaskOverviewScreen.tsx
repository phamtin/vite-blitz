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
	Collapse,
	Badge,
} from "antd";
import TaskController from "modules/tasks/components/TaskController/TaskController";
import { useQuery } from "@tanstack/react-query";
import api from "api/api";
import useAppState from "store";
import {
	TaskStatus,
	type TaskModel,
	type CreateTaskResponse,
	type TaskPriority,
} from "modules/tasks/types/task.types";
import type { FolderModel } from "modules/folder/types/folder.types";
import Loading from "components/Loading/Loading";
import useStyles from "./styled";
import { Neutral, Red } from "styles/colors";
import { ACTIVE_STATUSES } from "constants/constants";
import { groupImportantTask } from "modules/tasks/helper/task.helper";
import { useTaskStore } from "modules/tasks/store/task.store";
import {
	EllipsisHorizontalIcon,
	LinkIcon,
	PlusIcon,
} from "@heroicons/react/24/outline";
import { BORDER_COLOR } from "modules/tasks/constants/task.constant";

const { Text } = Typography;

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
				children: renderTaskTable(taskGroups[status]),
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
			render: (text, record) => (
				<Flex align="center" gap={6}>
					<Badge color={BORDER_COLOR[record.priority as TaskPriority]} />
					<Text strong>{text}</Text>
				</Flex>
			),
		},
		{
			title: "Tags",
			dataIndex: "tags",
			key: "tags",
			width: "30%",
			render: (text: TaskModel["tags"]) => {
				const taskTags =
					activeFolder.tags?.filter((tag) => text?.includes(tag._id)) ?? [];

				return (
					<Flex gap={2}>
						{!!taskTags.length &&
							taskTags.map((t) => (
								<Flex key={t._id}>
									<Tag color="error" bordered={false}>
										<Text style={{ color: Red[500], fontWeight: 500, fontSize: 11 }}>
											{t.name}
										</Text>
									</Tag>
								</Flex>
							))}
					</Flex>
				);
			},
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
								<Text style={{ color: Neutral[600] }}>{`${subTasks.length}`}</Text>
							</Flex>
						</Button>
					</Tooltip>
				) : (
					"-"
				),
		},
		{
			title: "Action",
			key: "action",
			render: () => (
				<Button type="text" icon={<EllipsisHorizontalIcon width={20} />} />
			),
		},
	];

	const renderTaskTable = (tasks: TaskModel[]) => {
		return (
			<Table<TaskModel>
				rowKey="_id"
				size="small"
				showHeader={false}
				pagination={{ hideOnSinglePage: true }}
				columns={columns}
				dataSource={tasks}
				onRow={(record) => ({
					onDoubleClick: () => viewTask(record),
				})}
			/>
		);
	};

	const GroupLabel = ({ label, length }: GroupLabelProps) => {
		return (
			<Flex align="center" justify="space-between">
				<Flex align="center">
					<Flex align="center">
						<Text strong style={{ fontSize: 15 }}>
							{`${label}`}&nbsp;&nbsp;
						</Text>
						{!!length && <Badge color={Neutral[500]} count={length} />}
					</Flex>
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
