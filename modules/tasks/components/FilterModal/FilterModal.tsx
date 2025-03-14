import { Modal, Tag, DatePicker, Select, Row, Col, Typography } from "antd";
import dayjs from "dayjs";
import type { Participant } from "modules/account/types/account.types";
import { TaskPriority, TaskStatus } from "modules/tasks/types/task.types";
import { useState } from "react";
import useStyles from "./style";

const { Text, Paragraph } = Typography;

type FilterModalProps = {
	title: string;
	participants: Participant[];
	onOk: (payload: unknown) => void;
	onClose: () => void;
};

const FilterModal = (props: FilterModalProps) => {
	const { title, participants, onOk, onClose } = props;
	const { styles } = useStyles();

	const [filters, setFilters] = useState<Record<string, Date | string[]>>({});

	const assignees = participants.map((p) => ({
		label: p.profileInfo.fullname,
		value: p._id,
	}));

	const taskStatus = Object.values(TaskStatus).map((s) => ({
		label: s,
		value: s,
	}));

	const taskPriority = Object.values(TaskPriority).map((s) => ({
		label: s,
		value: s,
	}));

	const handleAssigneeChange = (value: string[]) => {
		setFilters((prev) => ({ ...prev, assignee: value }));
	};

	const handleStatusChange = (value: string[]) => {
		setFilters((prev) => ({ ...prev, status: value }));
	};

	const handlePriorityChange = (value: string[]) => {
		setFilters((prev) => ({ ...prev, priority: value }));
	};

	const onChangeStartDate = (date: string) => {
		setFilters((prev) => ({
			...prev,
			startDate: dayjs(date).startOf("day").toDate(),
		}));
	};

	const onChangeEndDate = (date: string) => {
		setFilters((prev) => ({
			...prev,
			endDate: dayjs(date).endOf("day").toDate(),
		}));
	};

	const onSubmit = () => {
		onOk(filters);
	};

	return (
		<Modal
			open
			title={
				<div>
					{title}
					<br />
					<div style={{ marginBottom: 20 }}>
						<Text type="secondary" italic>
							Empty criterias will not be applied
						</Text>
					</div>
				</div>
			}
			onOk={onSubmit}
			maskClosable={false}
			onCancel={onClose}
			onClose={onClose}
		>
			<Row>
				<Col xs={6}>
					<Paragraph strong>Assignee</Paragraph>
				</Col>
				<Col xs={18}>
					<Select
						suffixIcon={null}
						className={styles.filterSelector}
						mode="multiple"
						showSearch={false}
						prefix={<Tag>Assignee</Tag>}
						onChange={handleAssigneeChange}
						options={assignees}
					/>
				</Col>
			</Row>
			<br />
			<Row>
				<Col xs={6}>
					<Paragraph strong>Task priority</Paragraph>
				</Col>
				<Col xs={18}>
					<Select
						suffixIcon={null}
						className={styles.filterSelector}
						mode="multiple"
						showSearch={false}
						prefix={<Tag>Priority</Tag>}
						onChange={handlePriorityChange}
						options={taskPriority}
					/>
				</Col>
			</Row>
			<br />
			<Row>
				<Col xs={6}>
					<Paragraph strong>Task status</Paragraph>
				</Col>
				<Col xs={18}>
					<Select
						suffixIcon={null}
						className={styles.filterSelector}
						mode="multiple"
						showSearch={false}
						prefix={<Tag>Status</Tag>}
						onChange={handleStatusChange}
						options={taskStatus}
					/>
				</Col>
			</Row>
			<br />
			<Row>
				<Col xs={6}>
					<Paragraph strong>Start date from</Paragraph>
				</Col>
				<Col xs={18}>
					<DatePicker variant="filled" onChange={onChangeStartDate} />
				</Col>
			</Row>
			<br />
			<Row>
				<Col xs={6}>
					<Paragraph strong>Due date before</Paragraph>
				</Col>
				<Col xs={18}>
					<DatePicker variant="filled" onChange={onChangeEndDate} />
				</Col>
			</Row>
			<br />
		</Modal>
	);
};

export default FilterModal;
