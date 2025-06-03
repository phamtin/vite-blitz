import {
	FolderOpenIcon,
	HashtagIcon,
	PencilIcon,
	PlusIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
	Button,
	Col,
	Collapse,
	DatePicker,
	Flex,
	Form,
	Input,
	Row,
	Select,
	Tag,
	Typography,
} from "antd";
import type { BaseOptionType } from "antd/es/select";
import Modal from "components/core/Modal/Modal";
import TaskPrioritySelector from "components/TaskPrioritySelector/TaskPrioritySelector";
import TaskStatusSelector from "components/TaskStatusSelector";
import dayjs from "dayjs";
import { FolderHook } from "modules/folder/hook/folder.hook";
import TaskApi from "modules/tasks/api/task.api";
import { DEFAULT_CREATE_TASK } from "modules/tasks/constants/task.constant";
import { getTaskOptions } from "modules/tasks/helper/task.helper";
import TaskHook from "modules/tasks/hook/task.hook";
import type {
	CreateTaskRequest,
	TaskMetadataForDropdown,
	TaskModel,
	TaskPriority,
	TaskStatus,
	UpdateTaskRequest,
} from "modules/tasks/types/task.types";
import {
	toCreateTaskRequest,
	toFormInitialValues,
	toUpdateTaskRequest,
} from "modules/tasks/util/task.util";
import useAppState from "store";
import { Neutral } from "styles/colors";
import useStyles from "./styled";
const { TextArea } = Input;
const { Text } = Typography;

const HeaderMetadata = ({ title }: { title: string }) => {
	return <Text style={{ fontWeight: 500, color: Neutral[600] }}>{title}</Text>;
};

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
		label: (
			<Flex gap={8} align="center">
				<img
					alt="avatar"
					src={item.profileInfo.avatar}
					style={{ width: "25px", height: "25px", borderRadius: "50%" }}
				/>
				{item.profileInfo.username}
			</Flex>
		),
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

	const onPriorityChange = (value: TaskPriority) => {
		form.setFieldValue("priority", value);
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
				<Col md={16}>
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

						<Form.Item<FormType> name="description">
							<TextArea placeholder="textarea with clear icon" allowClear rows={9} />
						</Form.Item>
						<div className={styles.options}>
							<Collapse size="small" ghost items={getTaskOptions(form)} />
						</div>
					</div>
				</Col>

				<Col md={8}>
					<div className={styles.metaData}>
						<div className={styles.metaBlock}>
							<Row align="middle">
								<Col xs={10}>
									<Flex gap={8}>
										<img src="/icons/status.svg" alt="status" />
										<HeaderMetadata title="Status" />
									</Flex>
								</Col>
								<Col xs={14}>
									<Form.Item<FormType> name="status">
										<TaskStatusSelector
											value={initialValues.status}
											onChange={onStatusChange}
										/>
									</Form.Item>
								</Col>
							</Row>
						</div>

						<div className={styles.metaBlock}>
							<Row align="middle">
								<Col xs={10}>
									<Flex gap={8}>
										<img src="/icons/flag.svg" alt="flag" />
										<HeaderMetadata title="Priority" />
									</Flex>
								</Col>
								<Col xs={14}>
									<Form.Item<FormType> name="priority">
										<TaskPrioritySelector
											value={initialValues.priority}
											onChange={onPriorityChange}
										/>
									</Form.Item>
								</Col>
							</Row>
						</div>

						<div className={styles.metaBlock}>
							<Row align="middle">
								<Col xs={10}>
									<Flex gap={8}>
										<img src="/icons/date.svg" alt="date" />
										<HeaderMetadata title="Created At" />
									</Flex>
								</Col>
								<Col xs={14}>
									<Text>
										{task?.createdAt
											? dayjs(task?.createdAt).format("YYYY-MM-DD")
											: "Now"}
										&nbsp;
									</Text>
								</Col>
							</Row>
						</div>

						<div className={styles.metaBlock}>
							<Row align="middle">
								<Col xs={9}>
									<Flex gap={8}>
										<img src="/icons/date.svg" alt="date" />
										<HeaderMetadata title="Start date" />
									</Flex>
								</Col>
								<Col xs={15}>
									<Form.Item<FormType> name={["timing", "startDate"]}>
										<DatePicker
											variant="borderless"
											placeholder="Start from"
											style={{ width: "100%" }}
										/>
									</Form.Item>
								</Col>
							</Row>
						</div>

						<div className={styles.metaBlock}>
							<Row align="middle">
								<Col xs={9}>
									<Flex gap={8}>
										<img src="/icons/duedate.svg" alt="date" />
										<HeaderMetadata title="Due to" />
									</Flex>
								</Col>
								<Col xs={15}>
									<Form.Item<FormType> name={["timing", "endDate"]}>
										<DatePicker
											variant="borderless"
											placeholder="Due to"
											style={{ width: "100%" }}
										/>
									</Form.Item>
								</Col>
							</Row>
						</div>

						<div className={styles.metaBlock}>
							<Row align="middle">
								<Col xs={9}>
									<Flex gap={8}>
										<FolderOpenIcon width={20} color={Neutral[500]} />
										<HeaderMetadata title="Project" />
									</Flex>
								</Col>
								<Col xs={15} className={styles.project}>
									<img src="/icons/folder.svg" alt="folder" />
									<Text style={{ marginLeft: "7px" }}>
										{activeFolder?.folderInfo.title}
									</Text>
								</Col>
							</Row>
						</div>

						<div className={styles.metaBlock}>
							<Row align="middle">
								<Col xs={9}>
									<Flex gap={8}>
										<UserCircleIcon width={20} color={Neutral[500]} />
										<HeaderMetadata title="Assignee" />
									</Flex>
								</Col>
								<Col xs={15}>
									<Form.Item<FormType> name="assigneeId">
										<Select
											placeholder="Assignee"
											variant="borderless"
											style={{ width: 131 }}
											suffixIcon={null}
											options={assignees}
										/>
									</Form.Item>
								</Col>
							</Row>
						</div>

						<Flex align="center" className={styles.metaBlock}>
							<Col xs={9}>
								<Flex gap={8}>
									<HashtagIcon width={20} color={Neutral[500]} />
									<HeaderMetadata title="Tags" />
								</Flex>
							</Col>
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
									style={{ minWidth: 100, marginLeft: "6px" }}
									variant="borderless"
									options={taskMetadata.tags}
								/>
							</Form.Item>
						</Flex>
					</div>
				</Col>
			</Row>
		</Modal>
	);
};

export default CreateEditTaskModal;
