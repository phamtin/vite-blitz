import { Flex, Tooltip, Avatar, Typography, Select, Tag } from "antd";
import useStyles from "./project-switch.styled";
import type { BaseOptionType } from "antd/es/select";
import useAppState from "store/index";
import type { ProjectModel } from "modules/project/types/project.types";

const { Title, Text } = Typography;

const ProjectSwitch = () => {
	const { styles } = useStyles();

	const projectList = useAppState((state) => state.projects.list);
	const activeProject = useAppState((state) => state.projects.activeProject);
	const setActiveProject = useAppState((state) => state.setActiveProject);

	const items: BaseOptionType[] = projectList.map((item) => ({
		value: item._id,
		label: item.projectInfo.title,
		description: item.projectInfo.description,
		isDefault: item.projectInfo.isDefaultProject,
	}));

	const onChange = (value: string) => {
		setActiveProject(value);
		window.location.replace("/home");
	};

	const renderMemberAvatars = (project: ProjectModel | null) => {
		if (!project) return [];

		const owner = project.participantInfo.owner.profileInfo.fullname;
		const members = project.participantInfo.members.map(
			(m) => m.profileInfo.fullname,
		);

		return [owner, ...members].map((m) => (
			<Tooltip key={m} title={m}>
				<Avatar />
			</Tooltip>
		));
	};

	return (
		<div className={styles.wrapper}>
			<Select
				dropdownStyle={{ width: 300 }}
				size="large"
				showSearch
				optionFilterProp="label"
				onChange={onChange}
				options={items}
				defaultValue={activeProject?._id}
				optionRender={(option) => (
					<Flex justify="space-between" align="center">
						<div>
							<Title level={5}>{option.label}</Title>
							<Text type="secondary" italic ellipsis>
								{option.data.description}
							</Text>
						</div>
						{option.data.isDefault && <Tag>Default</Tag>}
					</Flex>
				)}
				filterOption={(input, option) =>
					((option?.label as string) ?? "")
						.toLowerCase()
						.includes(input.toLowerCase())
				}
			/>
			<div className={styles.members}>
				<Avatar.Group
					max={{
						count: 2,
						style: { color: "#f56a00", backgroundColor: "#fde3cf" },
					}}
				>
					{renderMemberAvatars(activeProject)}
				</Avatar.Group>
			</div>
		</div>
	);
};

export default ProjectSwitch;
