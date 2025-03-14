import {
  Form,
  DatePicker,
  Select,
  Row,
  Col,
  Typography,
  Input,
  Collapse,
  Flex,
  Tooltip,
  Tag,
  Button,
} from "antd";
import api from "api/api";

import Modal from "components/core/Modal/Modal";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import type { BaseOptionType } from "antd/es/select";
import { ProjectHook } from "modules/project/hook/project.hook";
import { Neutral } from "styles/colors";
import TaskHook from "modules/tasks/hook/task.hook";
import type {
  CreateTaskRequest,
  TaskMetadataForDropdown,
} from "modules/tasks/types/task.types";
import { getTaskOptions } from "modules/tasks/helper/task.helper";
import { DEFAULT_CREATE_TASK } from "modules/tasks/constants/task.constant";
import { useMutation } from "@tanstack/react-query";
import useStyles from "./create-edit.styled";
import useAppState from "store";
import { toCreateTaskRequest } from "modules/tasks/util/task.util";

const { TextArea } = Input;
const { Text } = Typography;

type FilterModalProps = {
  title?: string;
  onClose: (refetch: boolean) => void;
};

const CreateEditTaskModal = (props: FilterModalProps) => {
  const { styles } = useStyles();
  const { title = "Create New Task ", onClose } = props;

  const [form] = Form.useForm<CreateTaskRequest>();

  const activeProject = useAppState((state) => state.projects.activeProject);
  const participantList = ProjectHook.useGetParticipants();
  const taskMetadata = TaskHook.useGetTaskMetadata({
    usedForDropdown: true,
  }) as TaskMetadataForDropdown;

  const mutationCreateTask = useMutation({
    mutationFn: (newTask: CreateTaskRequest) => {
      return api.post("tasks/create", { json: newTask }).json();
    },
    onSuccess: (data) => {
      onClose(true);
    },
  });

  const items: BaseOptionType[] = participantList.map((item) => ({
    value: item._id,
    label: item.profileInfo.fullname,
  }));

  const initialValues: CreateTaskRequest = {
    ...DEFAULT_CREATE_TASK,
  };

  const onSubmit = (values: CreateTaskRequest) => {
    if (!activeProject) {
      return;
    }
    const payload = toCreateTaskRequest(activeProject._id, values);
    mutationCreateTask.mutate(payload);
  };

  const onCloseModal = () => {
    onClose(false);
  };

  return (
    <Modal
      title={
        <Flex gap={6}>
          <Text>{title}</Text>
          <PencilIcon width={16} color={Neutral[500]} />
        </Flex>
      }
      maskClosable={false}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <Button color="primary" variant="filled">
            Save as Drafts
          </Button>
          <OkBtn />
        </>
      )}
      okButtonProps={{
        htmlType: "submit",
        loading: mutationCreateTask.isPending,
      }}
      okText="Create"
      onCancel={onCloseModal}
      onClose={onCloseModal}
      modalRender={(dom) => (
        <Form
          name="create_edit_task"
          form={form}
          autoComplete="off"
          initialValues={initialValues}
          onFinish={onSubmit}
        >
          {dom}
        </Form>
      )}
    >
      <Row>
        <Col md={17}>
          <div className={styles.mainData}>
            <Form.Item<CreateTaskRequest>
              name="title"
              rules={[{ required: true, message: "Please input a title" }]}
            >
              <Input
                className={styles.titleInput}
                size="large"
                variant="borderless"
                placeholder="Summary"
              />
            </Form.Item>

            <Flex align="center" style={{ marginBottom: 8 }}>
              <Tooltip title="Add tags for this task">
                <Form.Item<CreateTaskRequest> name="tags">
                  <Select
                    mode="multiple"
                    suffixIcon={null}
                    showSearch={false}
                    placeholder={
                      <Tag>
                        <Flex align="center">
                          <PlusIcon width={12} /> Tags
                        </Flex>
                      </Tag>
                    }
                    style={{ minWidth: 100 }}
                    variant="borderless"
                    options={taskMetadata.tags}
                  />
                </Form.Item>
              </Tooltip>
            </Flex>

            <Form.Item<CreateTaskRequest> name="description">
              <TextArea
                placeholder="textarea with clear icon"
                allowClear
                rows={9}
              />
            </Form.Item>
            <div className={styles.options}>
              <Collapse size="small" ghost items={getTaskOptions(form)} />
            </div>
          </div>
        </Col>

        <Col md={7}>
          <div className={styles.metaData}>
            <div className={styles.metaBlock}>
              <Text strong>Status</Text>
              <Form.Item<CreateTaskRequest> name="status">
                <Select
                  variant="borderless"
                  suffixIcon={null}
                  style={{ width: 140 }}
                  placeholder="Status"
                  options={taskMetadata.status}
                />
              </Form.Item>
            </div>

            <div className={styles.metaBlock}>
              <Text strong>Priority</Text>
              <Form.Item<CreateTaskRequest> name="priority">
                <Select
                  variant="borderless"
                  suffixIcon={null}
                  placeholder="Priority"
                  style={{ width: 140 }}
                  options={taskMetadata.priorities}
                />
              </Form.Item>
            </div>

            <div className={styles.metaBlock}>
              <Text strong>Assignee</Text>
              <Form.Item<CreateTaskRequest> name="assigneeId">
                <Select
                  placeholder="Assignee"
                  variant="borderless"
                  suffixIcon={null}
                  style={{ width: 180 }}
                  options={items}
                />
              </Form.Item>
            </div>

            <div className={styles.metaBlock}>
              <Text strong>Start Date</Text>
              <Form.Item<CreateTaskRequest> name={["timing", "startDate"]}>
                <DatePicker variant="borderless" placeholder="Start from" />
              </Form.Item>
            </div>
            <div className={styles.metaBlock}>
              <Text strong>Due Date</Text>
              <Form.Item<CreateTaskRequest> name={["timing", "endDate"]}>
                <DatePicker variant="borderless" placeholder="Due at" />
              </Form.Item>
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default CreateEditTaskModal;
