import { Select, Flex, Typography } from "antd";
import TaskHook from "modules/tasks/hook/task.hook";
import StatusDot from "./StatusDot";
import {
	type TaskMetadataForDropdown,
	TaskStatus,
} from "modules/tasks/types/task.types";
import { type CSSProperties, useState } from "react";
import type { BaseOptionType } from "antd/es/select";
import type { FlattenOptionData } from "rc-select/lib/interface";
import { Neutral } from "styles/colors";

const { Text } = Typography;

type TaskStatusSelectorProps = {
	value?: TaskStatus;
	onChange: (value: TaskStatus) => void;
};

const TaskStatusSelector = (props: TaskStatusSelectorProps) => {
	const { value = TaskStatus.NotStartYet } = props;

	const taskMetadata = TaskHook.useGetTaskMetadata({
		usedForDropdown: true,
	}) as TaskMetadataForDropdown;

	const [val, setVal] = useState<TaskStatus>(value);

	const options = taskMetadata.status.map((item) => ({
		value: item.value,
		label: (
			<Flex align="center" gap={8}>
				<StatusDot status={item.value as TaskStatus} />
				<Text style={{ fontWeight: 500 }}>{item.label}</Text>
			</Flex>
		),
	}));

	const STYLE: CSSProperties = {
		width: "100%",
		minWidth: 120,
		border: `1.5px solid ${Neutral[300]}`,
		borderRadius: 8,
		boxShadow: `0px 0.5px 4px ${Neutral[200]}`,
	};

	const onHandleChange = (value: TaskStatus) => {
		setVal(value);
		props.onChange(value);
	};

	const optionRenderer = (option: FlattenOptionData<BaseOptionType>) => {
		if (!option.value) {
			return null;
		}
		return (
			<Flex align="center" gap={8}>
				<Text>{option.label}</Text>
			</Flex>
		);
	};

	return (
		<Select
			suffixIcon={null}
			style={STYLE}
			styles={{
				popup: { root: { width: 180 } },
			}}
			defaultValue={val}
			placeholder="Status"
			variant="borderless"
			options={options}
			optionRender={optionRenderer}
			onChange={onHandleChange}
		/>
	);
};

export default TaskStatusSelector;
