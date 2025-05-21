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
	Tag,
	Button,
} from "antd";
import Modal from "components/core/Modal/Modal";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import type { BaseOptionType } from "antd/es/select";
import { FolderHook } from "modules/folder/hook/folder.hook";
import { Neutral } from "styles/colors";
import TaskHook from "modules/tasks/hook/task.hook";
import type {
	CreateTaskRequest,
	TaskMetadataForDropdown,
	TaskModel,
	TaskPriority,
	TaskStatus,
	UpdateTaskRequest,
} from "modules/tasks/types/task.types";
import { getTaskOptions } from "modules/tasks/helper/task.helper";
import { DEFAULT_CREATE_TASK } from "modules/tasks/constants/task.constant";
import useStyles from "./styled";
import {
	toCreateTaskRequest,
	toFormInitialValues,
	toUpdateTaskRequest,
} from "modules/tasks/util/task.util";
import TaskApi from "modules/tasks/api/task.api";
import useAppState from "store";
import dayjs from "dayjs";
import TaskStatusSelector from "../TaskStatusSelector";

const { TextArea } = Input;
const { Text } = Typography;

type FormType = CreateTaskRequest | UpdateTaskRequest;

type Props = {
	task?: TaskModel;
	predefinedField?: {
		status?: TaskStatus;
		priority?: TaskPriority;
		assigneeId?: string;
	};
	onClose: (refetch: boolean) => void;
};

const CreateEditTaskModal = (props: Props) => {
	const { task, onClose } = props;
	const { styles } = useStyles();

	const taskId = task?._id || "";
	const isEdit = !!task?._id;
	const title = taskId ? "Edit Task" : "Create new task";

	const initialValues = isEdit
		? toFormInitialValues(task)
		: {
				...DEFAULT_CREATE_TASK,
				...props.predefinedField,
			};

	const { mutationCreateTask } = TaskApi.useCreateTask({ onClose });
	const { mutationUpdateTask } = TaskApi.useUpdateTask({ onClose, taskId });

	const [form] = Form.useForm<CreateTaskRequest>();

	const participantList = FolderHook.useGetParticipants();
	const activeFolder = useAppState((state) => state.folders.activeFolder);
	const taskMetadata = TaskHook.useGetTaskMetadata({
		usedForDropdown: true,
	}) as TaskMetadataForDropdown;

	const assignees: BaseOptionType[] = participantList.map((item) => ({
		value: item._id,
		label: item.profileInfo.username,
	}));

	const onSubmit = (values: FormType) => {
		if (isEdit && task) {
			const payload = toUpdateTaskRequest(values, task._id);
			mutationUpdateTask.mutate(payload);
			return;
		}
		const payload = toCreateTaskRequest(values, activeFolder?._id);
		mutationCreateTask.mutate(payload);
	};

	const onStatusChange = (value: TaskStatus) => {
		form.setFieldValue("status", value);
	};

	const onCloseModal = () => onClose(false);

	return (
		<Modal
			title={
				<Flex gap={6}>
					<Text>{title}</Text>
					<PencilIcon width={16} color={Neutral[500]} />
				</Flex>
			}
			footer={(_, { OkBtn, CancelBtn }) => (
				<>
					<CancelBtn />
					{!isEdit && (
						<Button color="primary" variant="filled">
							Save as Drafts
						</Button>
					)}
					<OkBtn />
				</>
			)}
			maskClosable={false}
			okButtonProps={{
				htmlType: "submit",
				loading: mutationCreateTask.isPending,
			}}
			okText={isEdit ? "Update" : "Create"}
			onCancel={onCloseModal}
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
						<Form.Item<FormType>
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
							<Form.Item<FormType> name="tags">
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
						</Flex>

						<Form.Item<FormType> name="description">
							<TextArea placeholder="textarea with clear icon" allowClear rows={9} />
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
							<Form.Item<FormType> name="status">
								<TaskStatusSelector
									value={initialValues.status}
									onChange={onStatusChange}
								/>
							</Form.Item>
						</div>

						<div className={styles.metaBlock}>
							<Text strong>Priority</Text>
							<Form.Item<FormType> name="priority">
								<Select
									variant="borderless"
									suffixIcon={null}
									placeholder="Priority"
									style={{ width: 131 }}
									options={taskMetadata.priorities}
								/>
							</Form.Item>
						</div>

						<div className={styles.metaBlock}>
							<Text strong>Assignee</Text>
							<Form.Item<FormType> name="assigneeId">
								<Select
									placeholder="Assignee"
									variant="borderless"
									style={{ width: 131 }}
									suffixIcon={null}
									options={assignees}
								/>
							</Form.Item>
						</div>

						<div className={styles.metaBlock}>
							<Text strong>Start Date</Text>
							<Form.Item<FormType> name={["timing", "startDate"]}>
								<DatePicker variant="borderless" placeholder="Start from" />
							</Form.Item>
						</div>
						<div className={styles.metaBlock}>
							<Text strong>Due Date</Text>
							<Form.Item<FormType> name={["timing", "endDate"]}>
								<DatePicker variant="borderless" placeholder="Due at" />
							</Form.Item>
						</div>
						<div className={styles.metaBlock}>
							<Text strong>Created At</Text>
							<Text>
								{task?.createdAt
									? dayjs(task?.createdAt).format("YYYY-MM-DD HH:mm")
									: "Now"}
								&nbsp;
							</Text>
						</div>
					</div>
				</Col>
			</Row>
		</Modal>
	);
};

export default CreateEditTaskModal;
