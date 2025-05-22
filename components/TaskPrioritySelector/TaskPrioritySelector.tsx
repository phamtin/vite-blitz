import { type CSSProperties, useState } from "react";
import Select from "antd/es/select";
import {
	TaskPriority,
	type TaskMetadataForDropdown,
} from "modules/tasks/types/task.types";
import TaskHook from "modules/tasks/hook/task.hook";
import { Flex, Typography } from "antd";
import { FlagIcon } from "icons/FlagIcon";
import { PRIORITY_COLOR_MAP } from "modules/tasks/constants/task.constant";

const { Text } = Typography;

type TaskPrioritySelectorProps = {
	value?: TaskPriority;
	onChange: (value: TaskPriority) => void;
};

const TaskPrioritySelector = (props: TaskPrioritySelectorProps) => {
	const taskMetadata = TaskHook.useGetTaskMetadata({
		usedForDropdown: true,
	}) as TaskMetadataForDropdown;

	const [val, setVal] = useState<TaskPriority>(props.value || TaskPriority.Low);

	const onHandleChange = (value: TaskPriority) => {
		setVal(value);
		props.onChange(value);
	};

	const options = taskMetadata.priorities.map((item) => ({
		value: item.value,
		label: (
			<Flex align="center" gap={5}>
				<FlagIcon fill={PRIORITY_COLOR_MAP[item.value as TaskPriority].text} />
				<Text
					style={{
						fontWeight: 500,
						color: PRIORITY_COLOR_MAP[item.value as TaskPriority].text,
					}}
				>
					{item.label}
				</Text>
			</Flex>
		),
	}));

	const STYLE: CSSProperties = {
		maxWidth: "max-content",
		border: `1px solid ${PRIORITY_COLOR_MAP[val].border}`,
		backgroundColor: PRIORITY_COLOR_MAP[val].bg,
		borderRadius: 999,
	};

	return (
		<Select
			variant="borderless"
			suffixIcon={null}
			style={STYLE}
			placeholder="Priority"
			styles={{
				popup: { root: { width: 180 } },
			}}
			defaultValue={val}
			options={options}
			onChange={onHandleChange}
		/>
	);
};

export default TaskPrioritySelector;
