import { Avatar, Button, Flex, Tag, Tooltip, Typography } from "antd";
import type { TaskModel } from "modules/tasks/types/task.types";
import { EllipsisHorizontalIcon, LinkIcon } from "@heroicons/react/24/outline";
import { Neutral, Red } from "styles/colors";
import type { ProjectModel } from "modules/project/types/project.types";
import EndTimeDiff from "./DiffTime";
import useStyles from "./styled";

const { Text } = Typography;

export type TaskCardListProps = {
	task: TaskModel;
	project: ProjectModel;
	onOpenTaskModal: (task:TaskModel) => void;
};

const TaskCardList = (props: TaskCardListProps) => {
	const { task, project, onOpenTaskModal } = props;
	const { styles } = useStyles({ task });

	const onDoubleClick = () => {
		onOpenTaskModal(task)
	};

	const taskTags = project.tags?.filter((tag) => task.tags?.includes(tag._id)) ?? [];

	return (
		<div className={styles.wrapper} onDoubleClick={onDoubleClick}>
			<Flex align="center" justify="space-between" className={styles.wrapperTask}>
				<Flex align="center" gap={10}>
					<div className={styles.priorityIndicator} />
					<Text className={styles.title}>{task.title}</Text>
					{!!taskTags.length &&
						taskTags.map((t) => (
							<Flex key={t._id}>
								<Tag color="error" bordered={false}>
									<Text style={{ color: Red[500], fontWeight: 500, fontSize: 11 }}>
										{t.name}
									</Text>
								</Tag>
							</Flex>
						))}
				</Flex>

				<Flex align="center" className={styles.infors}>
					<div className="avatarAssignee">
						<Tooltip title={task.assigneeInfo?.[0].profileInfo.fullname}>
							<Avatar size={24} src={task.assigneeInfo?.[0].profileInfo.avatar} />
						</Tooltip>
					</div>
					<div className="subTasks">
						{task.subTasks?.length ? (
							<Tooltip title={`This ticket has ${task.subTasks.length} sub-tasks`}>
								<Button size="small" type="text">
									<Flex gap={2}>
										<LinkIcon width={12} color={Neutral[700]} />
										<Text
											style={{ color: Neutral[600] }}
										>{`${task.subTasks.length}`}</Text>
									</Flex>
								</Button>
							</Tooltip>
						) : (
							"-"
						)}
					</div>
					<div className="timing">
						<EndTimeDiff task={task} />
					</div>
					<div className="options">
						<Button
							type="text"
							shape="circle"
							style={{ color: Neutral[600] }}
							icon={<EllipsisHorizontalIcon width={20} />}
						/>
					</div>
				</Flex>
			</Flex>
		</div>
	);
};

export default TaskCardList;
