import type { CollapseProps, FormInstance } from "antd";
import { Typography } from "antd";
import SubTaskOption from "../components/CreateEditTaskModal/SubTaskOption/SubTaskOption";
import AdditionalInfoOption from "../components/CreateEditTaskModal/AdditionalInfoOption/AdditionalInfoOption";
import { type TaskModel, TaskPriority, TaskStatus } from "../types/task.types";

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

export { getTaskOptions, groupImportantTask };
