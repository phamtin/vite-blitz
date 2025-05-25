import { Flex, Select, Typography } from "antd";
import TaskHook from "modules/tasks/hook/task.hook";
import {
  type TaskMetadataForDropdown,
  TaskStatus,
} from "modules/tasks/types/task.types";
import { type CSSProperties, useState } from "react";
import { Neutral } from "styles/colors";
import StatusDot from "./StatusDot";

const { Text } = Typography;

type TaskStatusSelectorProps = {
  value?: TaskStatus;
  onChange: (value: TaskStatus) => void;
};

const STYLE: CSSProperties = {
  width: "fit-content",
  // minWidth: 120,
  border: `1.5px solid ${Neutral[300]}`,
  borderRadius: 8,
  boxShadow: `0px 0.5px 4px ${Neutral[200]}`,
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

  const onHandleChange = (value: TaskStatus) => {
    setVal(value);
    props.onChange(value);
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
      onChange={onHandleChange}
    />
  );
};

export default TaskStatusSelector;
