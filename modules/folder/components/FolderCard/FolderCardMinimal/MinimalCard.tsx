import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import useStyles from "./styled";
import { Button, Card, Dropdown, type MenuProps, Typography } from "antd";
import type { FolderModel } from "modules/folder/types/folder.types";

const { Meta } = Card;
const { Paragraph, Text } = Typography;

type MinimalCardProps = {
	folder: FolderModel;
};

const MinimalCard = (props: MinimalCardProps) => {
	const { styles } = useStyles();
	const {
		folder: { _id, folderInfo },
	} = props;

	const items: MenuProps["items"] = [
		{
			key: "1",
			label: <Text>Go to task list</Text>,
		},
		{
			key: "2",
			label: <Text>Go to files</Text>,
		},
		{
			key: "3",
			label: <Text>Check statistics</Text>,
		},
	];

	return (
		<div key={_id} className={styles.wrapper}>
			<Card hoverable cover={<div />}>
				<Meta
					title={<Paragraph ellipsis={{ rows: 3 }}>{folderInfo.title}</Paragraph>}
				/>
				<Dropdown placement="topLeft" menu={{ items }} trigger={["click"]}>
					<Button
						ghost
						color="primary"
						shape="circle"
						icon={<EllipsisVerticalIcon width={16} />}
						className="btn-dot"
					/>
				</Dropdown>
			</Card>
		</div>
	);
};

export default MinimalCard;
