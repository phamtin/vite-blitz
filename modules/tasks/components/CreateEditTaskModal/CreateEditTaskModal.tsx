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
	TaskModel,
	UpdateTaskRequest,
} from "modules/tasks/types/task.types";
import { getTaskOptions } from "modules/tasks/helper/task.helper";
import { DEFAULT_CREATE_TASK } from "modules/tasks/constants/task.constant";
import { useMutation } from "@tanstack/react-query";
import useStyles from "./create-edit.styled";
import useAppState from "store";
import {
	toFormInitialValues,
	toCreateTaskRequest,
	toUpdateTaskRequest,
} from "modules/tasks/util/task.util";

const { TextArea } = Input;
const { Text } = Typography;

type Props = {
	task?: TaskModel;
	onClose: (refetch: boolean) => void;
};

const CreateEditTaskModal = (props: Props) => {
	const { styles } = useStyles();
	const { task, onClose } = props;

	const isEdit = !!task?._id;
	const title = task ? "Edit Task" : "Create new task";

	const [form] = Form.useForm<TaskModel>();

	const taskMetadata = TaskHook.useGetTaskMetadata({
		usedForDropdown: true,
	}) as TaskMetadataForDropdown;
	const activeProject = useAppState((state) => state.projects.activeProject);
	const participantList = ProjectHook.useGetParticipants();

	const mutationCreateTask = useMutation({
		mutationFn: (newTask: CreateTaskRequest) => {
			return api.post("tasks/create", { json: newTask }).json();
		},
		onSuccess: () => onClose(true),
	});

	const mutationUpdateTask = useMutation({
		mutationFn: (newTask: UpdateTaskRequest) => {
			return api.patch(`tasks/${(task as TaskModel)._id}`, { json: newTask }).json();
		},
		onSuccess: () => onClose(true),
	});

	const initialValues = isEdit ? toFormInitialValues(task) : DEFAULT_CREATE_TASK;

	const assignees: BaseOptionType[] = participantList.map((item) => ({
		value: item._id,
		label: item.profileInfo.fullname,
	}));

	const onSubmit = (values: TaskModel) => {
		if (isEdit) {
			return mutationUpdateTask.mutate(toUpdateTaskRequest(values));
		}
		mutationCreateTask.mutate(
			toCreateTaskRequest({
				...values,
				projectId: activeProject?._id || "",
			}),
		);
	};

	const onSelectAssignee = (value: string) => {
		const assigneeInfo = participantList.find((item) => item._id === value);
		form.setFieldValue("assigneeInfo", assigneeInfo?._id || "");
	};

	const onCloseModal = () => {
		onClose(false);
	};

	type FormType = typeof initialValues;

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
							<Form.Item<FormType> name="priority">
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
							<Form.Item<FormType> name={["assigneeInfo"]}>
								<Select
									onSelect={onSelectAssignee}
									placeholder="Assignee"
									variant="borderless"
									suffixIcon={null}
									style={{ width: 180 }}
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
					</div>
				</Col>
			</Row>
		</Modal>
	);
};

export default CreateEditTaskModal;
