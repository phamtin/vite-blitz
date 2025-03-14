import {
  Form,
  Button,
  Input,
  Card,
  Select,
  Flex,
  Typography,
  type FormInstance,
} from "antd";
import useStyles from "./style";
import { XCircleIcon } from "@heroicons/react/24/outline";
import TaskHook from "modules/tasks/hook/task.hook";
import type {
  CreateTaskRequest,
  TaskMetadataForDropdown,
} from "modules/tasks/types/task.types";
import Icon from "components/Icon/Icon";
import { Red } from "styles/colors";

const { Text } = Typography;
const { TextArea } = Input;

type SubTaskOptionProps = {
  form: FormInstance;
};

const SubTaskOption = ({ form }: SubTaskOptionProps) => {
  const { styles } = useStyles();
  const taskMetadata = TaskHook.useGetTaskMetadata({
    usedForDropdown: true,
  }) as TaskMetadataForDropdown;

  const onChangePriority = (value: string, index: number) => {
    form.setFieldValue(`subTasks[${index}].priority`, value);
  };

  const onChangeStatus = (value: string, index: number) => {
    form.setFieldValue(`subTasks[${index}].status`, value);
  };

  return (
    <div className={styles.wrapper}>
      <Form.List name="subTasks">
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
            {fields.map(({ key, ..._field }, index) => (
              <Flex key={key} align="flex-start" gap={8}>
                <Card
                  size="small"
                  title={
                    <Form.Item<CreateTaskRequest["subTasks"]>
                      name={[_field.name, "title"]}
                      rules={[
                        { required: true, message: "Please input a title" },
                      ]}
                    >
                      <Input
                        autoFocus={index === fields.length - 1}
                        variant="borderless"
                        placeholder="Summary subtask.."
                        styles={{
                          input: { fontWeight: 700, fontStyle: "italic" },
                        }}
                      />
                    </Form.Item>
                  }
                >
                  <Form.Item<CreateTaskRequest["subTasks"]>
                    {..._field}
                    label={<Text strong>Description</Text>}
                    name={[_field.name, "description"]}
                  >
                    <TextArea
                      variant="filled"
                      placeholder="textarea with clear icon"
                      allowClear
                      rows={2}
                    />
                  </Form.Item>

                  <Flex>
                    <Form.Item<CreateTaskRequest["subTasks"]>
                      {..._field}
                      label={<Text strong>Status</Text>}
                      name={[_field.name, "status"]}
                    >
                      <Select
                        variant="borderless"
                        suffixIcon={null}
                        style={{ width: 140, marginRight: 200 }}
                        placeholder="Status"
                        options={taskMetadata.status}
                      />
                    </Form.Item>
                    <Form.Item<CreateTaskRequest["subTasks"]>
                      {..._field}
                      label={<Text strong>Priority</Text>}
                      name={[_field.name, "priority"]}
                    >
                      <Select
                        variant="borderless"
                        placeholder="Priority"
                        style={{ width: 140 }}
                        options={taskMetadata.priorities}
                      />
                    </Form.Item>
                  </Flex>
                </Card>
                <Icon
                  clickable
                  background={false}
                  color={Red[500]}
                  size="small"
                  icon={
                    <XCircleIcon
                      onClick={() => {
                        remove(_field.name);
                      }}
                    />
                  }
                />
              </Flex>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Add Subtask
            </Button>
          </div>
        )}
      </Form.List>
    </div>
  );
};

export default SubTaskOption;
