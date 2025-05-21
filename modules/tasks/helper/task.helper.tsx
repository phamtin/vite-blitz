import type { CollapseProps, FormInstance, TableProps } from "antd";
import { Badge, Button, Flex, Tag, Tooltip, Typography } from "antd";
import { EllipsisHorizontalIcon, LinkIcon } from "@heroicons/react/24/outline";
import SubTaskOption from "../components/CreateEditTaskModal/SubTaskOption/SubTaskOption";
import AdditionalInfoOption from "../components/CreateEditTaskModal/AdditionalInfoOption/AdditionalInfoOption";
import { type TaskModel, TaskPriority, TaskStatus } from "../types/task.types";
import { BORDER_COLOR_PRESET, BORDER_COLOR } from "../constants/task.constant";
import { Neutral, Red } from "styles/colors";
import EndTimeDiff from "../components/DiffTime/DiffTime";
import type { FolderModel } from "modules/folder/types/folder.types";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon as CheckCircleIconOutline } from "@heroicons/react/24/outline";

const { Text } = Typography;

const getTaskOptions = (form: FormInstance): CollapseProps["items"] => {
	const options = [
		{
			key: "1",
			label: <Typography.Text strong>Subtasks</Typography.Text>,
			children: <SubTaskOption form={form} />,
		},
		{
			key: "2",
			label: <Typography.Text strong>Notes/Additional Info</Typography.Text>,
			children: <AdditionalInfoOption form={form} />,
		},
		{
			key: "3",
			label: <Typography.Text strong>Attachments</Typography.Text>,
			children: null,
		},
	];

	return options;
};

const groupImportantTask = (tasks: TaskModel[]) => {
	const notStartYetTasks = [];
	const inProgressTasks = [];
	const pendingTasks = [];
	const doneTasks = [];
	const importantTasks: Record<TaskStatus, { critical: number; high: number }> = {
		[TaskStatus.NotStartYet]: { critical: 0, high: 0 },
		[TaskStatus.InProgress]: { critical: 0, high: 0 },
		[TaskStatus.Pending]: { critical: 0, high: 0 },
		[TaskStatus.Done]: { critical: 0, high: 0 },
		[TaskStatus.Archived]: { critical: 0, high: 0 },
	};
	for (let i = 0; i < tasks.length; i++) {
		const t = tasks[i];
		if (t.status === TaskStatus.NotStartYet) {
			notStartYetTasks.push(t);
			importantTasks[TaskStatus.NotStartYet].critical +=
				t.priority === TaskPriority.Critical ? 1 : 0;
			importantTasks[TaskStatus.NotStartYet].high +=
				t.priority === TaskPriority.High ? 1 : 0;
		}
		if (t.status === TaskStatus.InProgress) {
			inProgressTasks.push(t);
			importantTasks[TaskStatus.InProgress].critical +=
				t.priority === TaskPriority.Critical ? 1 : 0;
			importantTasks[TaskStatus.InProgress].high +=
				t.priority === TaskPriority.High ? 1 : 0;
		}
		if (t.status === TaskStatus.Pending) {
			pendingTasks.push(t);
			importantTasks[TaskStatus.Pending].critical +=
				t.priority === TaskPriority.Critical ? 1 : 0;
			importantTasks[TaskStatus.Pending].high +=
				t.priority === TaskPriority.High ? 1 : 0;
		}
		if (t.status === TaskStatus.Done) {
			doneTasks.push(t); //  Do not count on done tasks
		}
	}

	return {
		importantTasks,
		notStartYetTasks,
		inProgressTasks,
		doneTasks,
		pendingTasks,
	};
};

const getTaskTableColumns = (
	activeFolder: FolderModel,
	onMarkDone: (task: TaskModel) => void,
	onMarkUndone: (task: TaskModel) => void,
): TableProps<TaskModel>["columns"] => [
	{
		title: " ",
		dataIndex: "markDone",
		key: "markDone",
		width: "30px",
		render: (_, record) => {
			const icon =
				record.status === TaskStatus.Done ? (
					<CheckCircleIcon width={20} style={{ color: Neutral[500] }} />
				) : (
					<CheckCircleIconOutline width={20} style={{ color: Neutral[500] }} />
				);

			const onClick = () =>
				record.status === TaskStatus.Done
					? onMarkUndone(record)
					: onMarkDone(record);

			const tooltipText =
				record.status === TaskStatus.Done ? "Mark as undone" : "Mark as done";
			return (
				<Tooltip title={tooltipText}>
					<Button type="text" variant="outlined" icon={icon} onClick={onClick} />
				</Tooltip>
			);
		},
	},
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
		width: "25%",
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
		width: "10%",
		render: (text: TaskModel["status"]) => (
			<Tag color={BORDER_COLOR_PRESET[text as TaskStatus]}>{text}</Tag>
		),
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
		title: "Timing",
		dataIndex: "timing",
		key: "timing",
		render: (_, row) => (
			<div className="timing">
				<EndTimeDiff task={row} />
			</div>
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

export { getTaskOptions, groupImportantTask, getTaskTableColumns };
