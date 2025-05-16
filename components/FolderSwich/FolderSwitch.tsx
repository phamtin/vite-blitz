import { Flex, Tooltip, Avatar, Typography, Select, Tag } from "antd";
import useStyles from "./folder-switch.styled";
import type { BaseOptionType } from "antd/es/select";
import useAppState from "store/index";
import type { FolderModel } from "modules/folder/types/folder.types";

const { Title, Text } = Typography;

const FolderSwitch = () => {
	const { styles } = useStyles();

	const folderList = useAppState((state) => state.folders.list);
	const activeFolder = useAppState((state) => state.folders.activeFolder);
	const setActiveFolder = useAppState((state) => state.setActiveFolder);

	const items: BaseOptionType[] = folderList.map((item) => ({
		value: item._id,
		label: item.folderInfo.title,
		description: item.folderInfo.description,
		isDefault: item.folderInfo.isDefaultFolder,
	}));

	const onChange = (value: string) => {
		setActiveFolder(value);
		window.location.replace("/home");
	};

	const renderMemberAvatars = (folder: FolderModel | null) => {
		if (!folder) return [];

		const owner = folder.participantInfo.owner.profileInfo.username;
		const members = folder.participantInfo.members.map(
			(m) => m.profileInfo.username,
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
				defaultValue={activeFolder?._id}
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
					{renderMemberAvatars(activeFolder)}
				</Avatar.Group>
			</div>
		</div>
	);
};

export default FolderSwitch;
