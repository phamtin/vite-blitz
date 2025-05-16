import { type KeyboardEvent, useRef, useState } from "react";
import {
	Button,
	Flex,
	Divider,
	Segmented,
	Space,
	Typography,
	Input,
	type InputRef,
	Tooltip,
} from "antd";
import { PlusIcon, FunnelIcon } from "@heroicons/react/24/outline";

import FilterModal from "../FilterModal/FilterModal";
import CreateEditTaskModal from "../CreateEditTaskModal/CreateEditTaskModal";
import { FolderHook } from "modules/folder/hook/folder.hook";
import useStyles from "./styled";
import { useTaskStore } from "modules/tasks/store/task.store";

const { Title } = Typography;

type TaskControllerProps = {
	loading: boolean;
	onSearch: (value: string) => void;
	refetchData: () => void;
};

const TaskController = (props: TaskControllerProps) => {
	const { loading, onSearch, refetchData } = props;
	const { styles } = useStyles();
	const InputRef = useRef<InputRef>(null);

	const { viewingTask, viewTask } = useTaskStore();

	const participants = FolderHook.useGetParticipants();

	const [filtered, setFiltered] = useState<boolean>(false);
	const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false);

	const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			onSearch(InputRef?.current?.input?.value || "");
		}
	};

	const toggleFilter = () => {
		setFiltered(!filtered);
	};

	const onFilter = (filters: unknown) => {
		console.log("filters = ", filters);
	};

	const onCreate = () => {
		setIsOpenCreate(true);
	};

	const onClose = (refetch?: boolean) => {
		if (refetch) {
			refetchData();
		}
		if (viewingTask) {
			viewTask(undefined);
		}
		setIsOpenCreate(false);
	};

	return (
		<div className={styles.wrapper}>
			<Flex justify="space-between" align="flex-start" className={styles.title}>
				<Title level={3}>Task management</Title>
				<Flex align="center" gap={10}>
					<Button type="link" color="primary" onClick={toggleFilter}>
						Reset filters?
					</Button>
					<Tooltip title="Task filters">
						<Button onClick={toggleFilter}>
							<FunnelIcon width={18} />
						</Button>
					</Tooltip>
					<Button type="primary" onClick={onCreate}>
						<PlusIcon width={18} /> New task
					</Button>
				</Flex>
			</Flex>

			<Flex className={styles.layout}>
				<Space split={<Divider type="vertical" />}>
					<Segmented
						size="small"
						defaultValue="list"
						options={[
							{
								label: "List",
								value: "list",
							},
							{
								label: "Calendar",
								value: "calendar",
							},
						]}
					/>

					<Input.Search
						style={{ width: 500 }}
						placeholder="Quick search by task title"
						allowClear
						loading={loading}
						ref={InputRef}
						onKeyDown={handleKeyPress}
					/>
				</Space>
			</Flex>

			{filtered && (
				<FilterModal
					title="Find your tasks"
					participants={participants}
					onOk={onFilter}
					onClose={toggleFilter}
				/>
			)}

			{(isOpenCreate || viewingTask) && (
				<CreateEditTaskModal task={viewingTask} onClose={onClose} />
			)}
		</div>
	);
};

export default TaskController;
